// ============================================
// TIPOS DE DATOS
// ============================================

// ── PILAR ──
export interface Pilar {
  PK_PILAR: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

// ── DEPENDENCIA (ÁREA) ──
export interface Dependencia {
  PK_DEPENDENCIA: number;
  FK_PILAR: number;
  codigo: string;
  nombre: string;
  cargo: string;          // Cargo asociado al área (ej. Auxiliar)
  descripcion: string;
  estado: string;
}

export interface Rol {
  PK_ROL: number;
  FK_DEPENDENCIA: number;
  nombre_rol: string;
  descripcion: string;
  estado: string;
}

// ── PERSONA (estructura real BD) ──
export interface Persona {
  PK_PERSONA: number;
  FK_ROL: number;
  FK_DEPENDENCIAS: number;          // FK directa a la dependencia/área
  TIPO_DOCUMENTO: string;           // CC, TI, CE, PAS...
  NUMEROIDENTIFICACION: string;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE?: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO?: string;
  GENERO?: string;                  // M, F, NB
  TIPO_PERSONA?: string;
  DIRECCION?: string;
  CORREOELECTRONICO: string;
  TELEFONO?: string;
  CORREGIMIENTO?: string;
  RESGUARDO?: string;
  VEREDA?: string;
  COD_DEPMUN?: string;
  FECHACREADO?: string;
  CREADOPOR?: string;
  FECHAACTUALIZADO?: string;
  ACTUALIZADOPOR?: string;
  FK_TIPO_PERSONA?: number;
  DEPARTAMENTO?: string;
  MUNICIPIO?: string;
  // Computed
  nombreCompleto?: string;
  // Aliases para retrocompatibilidad
  primer_nombre?: string;
  segundo_nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  tipo_identificacion?: string;
  numero_identificacion?: string;
  correo_electronico?: string;
  celular?: string;
}

export interface Empresa {
  PK_EMPRESA: number;
  FK_TIPO_EMPRESA: number;
  nombre_empresa: string;
  nit: string;
  direccion: string;
  telefono?: string;
  correo?: string;
}

export interface TipoCorrespondencia {
  PK_TIPO_CORRESPONDENCIA: number;
  codigo: string;
  descripcion: string;
}

export interface MedioRecepcion {
  PK_MEDIO_RECEPCION: number;
  codigo: string;
  descripcion: string;
}

export interface TipoRemitente {
  PK_TIPO_REMITENTE: number;
  codigo: string;
  descripcion: string;
}

export interface SerieDocumental {
  PK_SERIE_DOCUMENTAL: number;
  codigo: string;
  nombre: string;
  descripcion: string;
}

export interface SubserieDocumental {
  PK_SUBSERIE_DOCUMENTAL: number;
  FK_SERIE_DOCUMENTAL: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export interface TipoDocumental {
  PK_TIPO_DOCUMENTAL: number;
  FK_SUBSERIE_DOCUMENTAL: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export interface Confidencialidad {
  PK_CONFIDENCIALIDAD: number;
  nombre: string;
}

export interface SoporteDocumental {
  PK_SOPORTE: number;
  nombre: string;
}

export interface EstadoDocumento {
  PK_ESTADO_DOCUMENTO: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export interface Documento {
  PK_DOCUMENTO: number;
  FK_TIPO_DOCUMENTAL: number;
  FK_SERIE_DOCUMENTAL: number;
  FK_SUBSERIE_DOCUMENTAL: number;
  FK_CONFIDENCIALIDAD: number;
  FK_SOPORTE: number;
  FK_ESTADO_DOCUMENTO: number;
  asunto: string;
  numero_documento: string;
  numero_folios: number;
  numero_anexos: number;
  descripcion_anexos?: string;
  fecha_radicacion: string;
  fecha_vencimiento?: string;
}

export interface CorrespondenciaGeneral {
  PK_CORRESPONDENCIA: number;
  FK_PERSONA_REMITE?: number;
  FK_EMPRESA_REMITE?: number;
  FK_PERSONA_DESTINO: number;
  FK_TIPO_CORRESPONDENCIA: number;
  FK_MEDIO_RECEPCION: number;
  FK_TIPO_REMITENTE: number;
  FK_DOCUMENTO: number;
  fecha: string;
  hora: string;
  numero_radicado: string;
  estado_correspondencia: string;
  observaciones?: string;
  // Campos calculados
  remitenteNombre?: string;
  destinoNombre?: string;
  tipoCorrespondencia?: string;
  estadoDocumento?: string;
  asunto?: string;
}

export interface ModoDistribucion {
  PK_MODO_DISTRIBUCION: number;
  codigo: string;
  nombre: string;
  descripcion: string;
}

export interface DistribucionDocumento {
  PK_DISTRIBUCION: number;
  FK_DOCUMENTO: number;
  FK_DEPENDENCIA_ORIGEN: number;
  FK_DEPENDENCIA_DESTINO: number;
  FK_PERSONA_DESTINO: number;
  FK_MODO_DISTRIBUCION: number;
  fecha_distribucion: string;
  fecha_recibido?: string;
  estado: string;
  observaciones?: string;
}

export interface DocumentoAdjunto {
  PK_ADJUNTO: number;
  FK_DOCUMENTO: number;
  nombre_archivo: string;
  ruta: string;
  tipo_archivo: string;
  tamano: string;
  fecha_carga: string;
}