export interface Persona {
  PK_PERSONA: number;
  FK_ROL?: number;
  TIPO_DOCUMENTO: string;
  FK_DEPENDENCIAS?: number;
  NUMEROIDENTIFICACION: string;
  PRIMERNOMBRE: string;
  SEGUNDONOMBRE?: string;
  PRIMERAPELLIDO: string;
  SEGUNDOAPELLIDO?: string;
  GENERO: string;
  TIPO_PERSONA: string;
  DIRECCION?: string;
  CORREOELECTRONICO: string;
  TELEFONO?: string;
  CORREGIMIENTO?: string;
  RESGUARDO?: string;
  VEREDA?: string;
  COD_DEPUNI?: string;
  FECHACREADO: string;
  CREADOPOR: number;
  FECHAACTUALIZADO?: string;
  ACTUALIZADOPOR?: number;
  
  // Campos calculados para visualización
  nombreCompleto?: string;
  rolNombre?: string;
  dependenciaNombre?: string;
}

export interface Empresa {
  PK_EMPRESA: number;
  FK_TIPOEMPRESA: number;
  DEPARTAMENTO: string;
  MUNICIPIO: string;
  NIT: string;
  NOMBRE: string;
  DIRECCION: string;
  TELEFONO: string;
  CORREO_ELECTRONICO: string;
  FECHACREADO: string;
  CREADOPOR: number;
  FECHAACTUALIZADO?: string;
  ACTUALIZADOPOR?: number;
  
  // Campo calculado para visualización
  tipoEmpresaNombre?: string;
}

export interface TipoEmpresa {
  PK_TIPOEMPRESA: number;
  nombre: string;
  descripcion: string;
}
