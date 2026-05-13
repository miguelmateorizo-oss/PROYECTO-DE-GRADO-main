import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
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
export class RegistrarPersonaComponent {
  // Estado del paso actual y tipo de persona seleccionado
  pasoActual = signal(1);
  tipoSeleccionado = signal<string | null>(null);

  // Corregido: EventEmitter debe venir de @angular/core
  @Output() cerrarModal = new EventEmitter<void>();

  personaForm: FormGroup;
  tiposPersona: any[] = [];

  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogoService,
  ) {
    this.personaForm = this.fb.group({
      FK_TIPO_PERSONA: ['', Validators.required],
      FK_ROL: [''],
      TIPO_DOCUMENTO: ['', Validators.required],
      NUMEROIDENTIFICACION: ['', Validators.required],

      PRIMER_NOMBRE: ['', Validators.required],
      SEGUNDO_NOMBRE: [''],
      PRIMER_APELLIDO: ['', Validators.required],
      SEGUNDO_APELLIDO: [''],

      GENERO: [''],
      DIRECCION: [''],
      CORREOELECTRONICO: ['', Validators.email],
      TELEFONO: [''],

      CORREGIMIENTO: [''],
      RESGUARDO: [''],
      VEREDA: [''],

      COD_DEPMUN: [''],
      DEPARTAMENTO: [''],
      MUNICIPIO: [''],

      FK_DEPENDENCIAS: [''],
    });
  }

  ngOnInit(): void {
    // Aquí podrías cargar datos necesarios para el formulario, como tipos de persona o roles
    this.listarTipoPersonas();
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }

  listarTipoPersonas() {
    this.catalogoService.getTipoPersonas().then((tipoPersona) => {
      this.tiposPersona = tipoPersona;
      console.log('Tipos de personas obtenidos:', this.tiposPersona);
    });
  }

  siguientePaso(): void {
    if (this.personaForm.get('identificacion')?.valid) {
      this.pasoActual.set(2);
    }
  }

  async guardar(): Promise<void> {
    if (this.personaForm.invalid) {
      this.personaForm.markAllAsTouched();
      return;
    }

    try {
      const nuevaPersona = {
        nuevapersona: {
          ...this.personaForm.value,
          TIPO_PERSONA: this.tipoSeleccionado()?.toUpperCase(),
          FECHACREADO: new Date(),
          CREADOPOR: 'SYSTEM',
          FECHAACTUALIZADO: null,
          ACTUALIZADOPOR: null,
        },
      };

      console.log('Enviando al backend:', nuevaPersona);

      const response = await this.catalogoService.crearPersona(nuevaPersona);

      console.log('Persona creada:', response);

      this.cerrar();
    } catch (error) {
      console.error('Error creando persona:', error);
    }
  }
}
