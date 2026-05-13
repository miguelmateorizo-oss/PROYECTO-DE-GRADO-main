import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent implements OnInit {
  // Signals para manejo de estado
  pasoActual = signal(0); // 0=Selección tipo, 1=Datos personales, 2=Ubicación, 3=Asignación
  tipoSeleccionado = signal<string | null>(null);
  guardando = signal(false);

  // Event Emitter para cerrar el modal
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() personaRegistrada = new EventEmitter<any>();

  // Formulario reactivo
  personaForm: FormGroup;

  // Datos de catálogos
  tiposPersona: any[] = [];
  departamentos: any[] = [];
  municipiosFiltrados: any[] = [];
  pilares: any[] = [];
  areasFiltradas: any[] = [];
  cargosFiltrados: any[] = [];
  roles: any[] = [];

  // Lista completa de municipios (para filtrado)
  private municipiosTodos: any[] = [];
  private areasTodas: any[] = [];
  private cargosTodos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogoService
  ) {
    this.personaForm = this.fb.group({
      // Tipo de persona
      FK_TIPO_PERSONA: ['', Validators.required],

      // Identificación
      TIPO_DOCUMENTO: ['', Validators.required],
      NUMEROIDENTIFICACION: ['', Validators.required],

      // Nombres y apellidos
      PRIMER_NOMBRE: ['', Validators.required],
      SEGUNDO_NOMBRE: [''],
      PRIMER_APELLIDO: ['', Validators.required],
      SEGUNDO_APELLIDO: [''],

      // Información adicional
      GENERO: [''],
      DIRECCION: [''],
      CORREOELECTRONICO: ['', [Validators.email]],
      TELEFONO: [''],

      // Ubicación territorial
      CORREGIMIENTO: [''],
      RESGUARDO: [''],
      VEREDA: [''],

      // Ubicación geográfica
      COD_DEPMUN: [''],
      DEPARTAMENTO: [''],
      MUNICIPIO: [''],

      // Asignación organizacional
      FK_PILAR: ['', Validators.required],
      FK_DEPENDENCIAS: ['', Validators.required],
      FK_CARGO: [''],
      FK_ROL: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.cargarDatosIniciales();
  }

  /**
   * Carga todos los datos necesarios para el formulario
   */
  private async cargarDatosIniciales(): Promise<void> {
    try {
      // Cargar tipos de persona
      const tiposResp = await this.catalogoService.getTipoPersonas();
      this.tiposPersona = tiposResp || [];

      // Cargar departamentos (datos mock o desde servicio)
      this.departamentos = await this.obtenerDepartamentos();
      this.municipiosTodos = await this.obtenerMunicipios();

      // Cargar pilares
      this.pilares = await this.catalogoService.getPilares();

      // Cargar áreas (dependencias)
      const areasResp = await this.catalogoService.getDependencias();
      this.areasTodas = areasResp || [];

      // Cargar cargos
      const cargosResp = await this.catalogoService.getCargos();
      this.cargosTodos = cargosResp || [];

      // Cargar roles
      this.roles = await this.catalogoService.getRoles();

      console.log('Datos iniciales cargados correctamente');
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  }

  /**
   * Selecciona el tipo de persona y actualiza el formulario
   */
  seleccionarTipo(codigo: string): void {
    this.tipoSeleccionado.set(codigo);
    const tipoObj = this.tiposPersona.find(t => t.CODIGO === codigo);
    if (tipoObj) {
      this.personaForm.patchValue({
        FK_TIPO_PERSONA: tipoObj.PK_TIPO_PERSONA
      });
    }
  }

  /**
   * Avanza al siguiente paso con validación
   */
  siguientePaso(): void {
    const pasoActualVal = this.pasoActual();

    // Validaciones por paso
    if (pasoActualVal === 0) {
      if (!this.tipoSeleccionado()) {
        alert('Por favor seleccione el tipo de persona');
        return;
      }
      this.pasoActual.set(1);
    } else if (pasoActualVal === 1) {
      // Validar campos obligatorios del paso 1
      const camposRequeridos = [
        'TIPO_DOCUMENTO',
        'NUMEROIDENTIFICACION',
        'PRIMER_NOMBRE',
        'PRIMER_APELLIDO'
      ];

      let valido = true;
      camposRequeridos.forEach(campo => {
        const control = this.personaForm.get(campo);
        if (control && !control.value) {
          control.markAsTouched();
          valido = false;
        }
      });

      if (!valido) {
        alert('Por favor complete todos los campos obligatorios');
        return;
      }

      this.pasoActual.set(2);
    } else if (pasoActualVal === 2) {
      // Validar email si está presente
      const emailControl = this.personaForm.get('CORREOELECTRONICO');
      if (emailControl && emailControl.value && emailControl.invalid) {
        emailControl.markAsTouched();
        alert('Por favor ingrese un correo electrónico válido');
        return;
      }

      this.pasoActual.set(3);
    }
  }

  /**
   * Retrocede al paso anterior
   */
  pasoAnterior(): void {
    const pasoActualVal = this.pasoActual();
    if (pasoActualVal > 0) {
      this.pasoActual.set(pasoActualVal - 1);
    }
  }

  /**
   * Cuando cambia el departamento, filtra los municipios
   */
  onDepartamentoChange(): void {
    const codigoDepartamento = this.personaForm.get('DEPARTAMENTO')?.value;
    
    if (codigoDepartamento) {
      this.municipiosFiltrados = this.municipiosTodos.filter(
        m => m.codigoDepartamento === codigoDepartamento
      );
    } else {
      this.municipiosFiltrados = [];
    }

    // Limpiar municipio seleccionado
    this.personaForm.patchValue({ MUNICIPIO: '' });
  }

  /**
   * Cuando cambia el pilar, filtra las áreas
   */
  onPilarChange(): void {
    const pkPilar = this.personaForm.get('FK_PILAR')?.value;
    
    if (pkPilar) {
      this.areasFiltradas = this.areasTodas.filter(
        a => a.FK_PILAR === parseInt(pkPilar)
      );
    } else {
      this.areasFiltradas = [];
    }

    // Limpiar selecciones dependientes
    this.personaForm.patchValue({ 
      FK_DEPENDENCIAS: '',
      FK_CARGO: ''
    });
    this.cargosFiltrados = [];
  }

  /**
   * Cuando cambia la dependencia, filtra los cargos
   */
  onDependenciaChange(): void {
    const pkDependencia = this.personaForm.get('FK_DEPENDENCIAS')?.value;
    
    if (pkDependencia) {
      this.cargosFiltrados = this.cargosTodos.filter(
        c => c.FK_DEPENDENCIAS === parseInt(pkDependencia)
      );
    } else {
      this.cargosFiltrados = [];
    }

    // Limpiar cargo seleccionado
    this.personaForm.patchValue({ FK_CARGO: '' });
  }

  /**
   * Convierte el valor de un campo a mayúsculas
   */
  convertirAMayusculas(nombreCampo: string): void {
    const control = this.personaForm.get(nombreCampo);
    if (control && control.value) {
      control.setValue(control.value.toUpperCase(), { emitEvent: false });
    }
  }

  /**
   * Verifica si debe mostrar un error en un campo
   */
  mostrarError(nombreCampo: string): boolean {
    const control = this.personaForm.get(nombreCampo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Obtiene el nombre del pilar seleccionado
   */
  obtenerNombrePilar(): string {
    const pkPilar = this.personaForm.get('FK_PILAR')?.value;
    const pilar = this.pilares.find(p => p.PK_PILAR === parseInt(pkPilar));
    return pilar ? pilar.NOMBRE : '';
  }

  /**
   * Obtiene el nombre del área seleccionada
   */
  obtenerNombreArea(): string {
    const pkArea = this.personaForm.get('FK_DEPENDENCIAS')?.value;
    const area = this.areasFiltradas.find(a => a.PK_DEPENDENCIAS === parseInt(pkArea));
    return area ? area.NOMBRE : '';
  }

  /**
   * Obtiene el nombre del cargo seleccionado
   */
  obtenerNombreCargo(): string {
    const pkCargo = this.personaForm.get('FK_CARGO')?.value;
    const cargo = this.cargosFiltrados.find(c => c.PK_CARGO === parseInt(pkCargo));
    return cargo ? cargo.NOMBRE : '';
  }

  /**
   * Guarda la nueva persona en el sistema
   */
  async guardar(): Promise<void> {
    // Marcar todos los campos como tocados para mostrar errores
    this.personaForm.markAllAsTouched();

    // Validar campos obligatorios finales
    const camposObligatorios = ['FK_PILAR', 'FK_DEPENDENCIAS'];
    let valido = true;

    camposObligatorios.forEach(campo => {
      const control = this.personaForm.get(campo);
      if (control && !control.value) {
        valido = false;
      }
    });

    if (!valido) {
      alert('Por favor complete todos los campos obligatorios del formulario');
      return;
    }

    if (this.personaForm.invalid) {
      alert('Por favor corrija los errores en el formulario');
      return;
    }

    this.guardando.set(true);

    try {
      // Preparar objeto para enviar al backend
      const nuevaPersona = {
        nuevapersona: {
          ...this.personaForm.value,
          TIPO_PERSONA: this.tipoSeleccionado()?.toUpperCase(),
          FECHACREADO: new Date().toISOString(),
          CREADOPOR: this.obtenerUsuarioActual(),
          FECHAACTUALIZADO: null,
          ACTUALIZADOPOR: null,
          ESTADO: 'ACTIVO'
        },
      };

      console.log('Enviando al backend:', nuevaPersona);

      const response = await this.catalogoService.crearPersona(nuevaPersona);

      console.log('Persona creada exitosamente:', response);

      // Emitir evento de persona registrada
      this.personaRegistrada.emit(response);

      // Mostrar mensaje de éxito
      alert('¡Persona registrada exitosamente!');

      // Cerrar modal
      this.cerrar();
    } catch (error: any) {
      console.error('Error creando persona:', error);
      alert(
        error?.message || 
        'Ocurrió un error al registrar la persona. Por favor intente nuevamente.'
      );
    } finally {
      this.guardando.set(false);
    }
  }

  /**
   * Cierra el modal
   */
  cerrar(): void {
    this.cerrarModal.emit();
  }

  /**
   * Cierra el modal si se hace clic fuera de él
   */
  cerrarSiClickFuera(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrar();
    }
  }

  /**
   * Obtiene el usuario actual del sistema
   */
  private obtenerUsuarioActual(): string {
    // TODO: Implementar lógica real de autenticación
    // Por ahora retorna un valor de ejemplo
    return 'ADMIN_SISTEMA';
  }

  /**
   * Obtiene la lista de departamentos
   * TODO: Implementar servicio real
   */
  private async obtenerDepartamentos(): Promise<any[]> {
    return [
      { codigo: '19', nombre: 'CAUCA' },
      { codigo: '76', nombre: 'VALLE DEL CAUCA' },
      { codigo: '52', nombre: 'NARIÑO' },
      { codigo: '73', nombre: 'TOLIMA' },
      { codigo: '25', nombre: 'CUNDINAMARCA' },
      { codigo: '11', nombre: 'BOGOTÁ D.C.' },
    ];
  }

  /**
   * Obtiene la lista de municipios
   * TODO: Implementar servicio real
   */
  private async obtenerMunicipios(): Promise<any[]> {
    return [
      // Cauca
      { codigo: '19001', nombre: 'POPAYÁN', codigoDepartamento: '19' },
      { codigo: '19050', nombre: 'SANTANDER DE QUILICHAO', codigoDepartamento: '19' },
      { codigo: '19075', nombre: 'CALDONO', codigoDepartamento: '19' },
      { codigo: '19100', nombre: 'CALOTO', codigoDepartamento: '19' },
      { codigo: '19137', nombre: 'CORINTO', codigoDepartamento: '19' },
      { codigo: '19256', nombre: 'GUACHENÉ', codigoDepartamento: '19' },
      { codigo: '19318', nombre: 'JAMBALÓ', codigoDepartamento: '19' },
      { codigo: '19355', nombre: 'MIRANDA', codigoDepartamento: '19' },
      { codigo: '19473', nombre: 'PÁEZ', codigoDepartamento: '19' },
      { codigo: '19513', nombre: 'PIENDAMÓ', codigoDepartamento: '19' },
      { codigo: '19548', nombre: 'PUERTO TEJADA', codigoDepartamento: '19' },
      { codigo: '19573', nombre: 'ROSAS', codigoDepartamento: '19' },
      { codigo: '19622', nombre: 'SILVIA', codigoDepartamento: '19' },
      { codigo: '19693', nombre: 'TORIBÍO', codigoDepartamento: '19' },
      { codigo: '19698', nombre: 'TOTORÓ', codigoDepartamento: '19' },
      // Valle del Cauca
      { codigo: '76001', nombre: 'CALI', codigoDepartamento: '76' },
      { codigo: '76111', nombre: 'BUENAVENTURA', codigoDepartamento: '76' },
      { codigo: '76020', nombre: 'ALCALÁ', codigoDepartamento: '76' },
      // Nariño
      { codigo: '52001', nombre: 'PASTO', codigoDepartamento: '52' },
      { codigo: '52019', nombre: 'ALBÁN', codigoDepartamento: '52' },
      // Tolima
      { codigo: '73001', nombre: 'IBAGUÉ', codigoDepartamento: '73' },
      // Cundinamarca
      { codigo: '25001', nombre: 'AGUA DE DIOS', codigoDepartamento: '25' },
      // Bogotá
      { codigo: '11001', nombre: 'BOGOTÁ D.C.', codigoDepartamento: '11' },
    ];
  }
}
