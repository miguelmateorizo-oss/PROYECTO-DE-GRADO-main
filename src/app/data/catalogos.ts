import type {
  Confidencialidad,
  SoporteDocumental,
  EstadoDocumento,
  TipoCorrespondencia,
  MedioRecepcion,
  ModoDistribucion,
  TipoRemitente,
  Dependencia,
  Pilar,
  Rol,
  SerieDocumental,
  SubserieDocumental,
  TipoDocumental,
  Persona,
  Empresa
} from '../types/correspondencia';

// ============================================
// CONFIDENCIALIDAD
// ============================================
export const confidencialidades: Confidencialidad[] = [
  { PK_CONFIDENCIALIDAD: 1, nombre: 'PÚBLICA' },
  { PK_CONFIDENCIALIDAD: 2, nombre: 'INTERNA' },
  { PK_CONFIDENCIALIDAD: 3, nombre: 'CONFIDENCIAL' },
  { PK_CONFIDENCIALIDAD: 4, nombre: 'RESERVADA' }
];

// ============================================
// SOPORTE DOCUMENTAL
// ============================================
export const soportes: SoporteDocumental[] = [
  { PK_SOPORTE: 1, nombre: 'FÍSICO' },
  { PK_SOPORTE: 2, nombre: 'DIGITAL' },
  { PK_SOPORTE: 3, nombre: 'MIXTO' }
];

// ============================================
// ESTADO DOCUMENTO
// ============================================
export const estadosDocumento: EstadoDocumento[] = [
  { PK_ESTADO_DOCUMENTO: 1, codigo: 'RAD', nombre: 'RADICADO', descripcion: 'Documento radicado', estado: 'ACTIVO' },
  { PK_ESTADO_DOCUMENTO: 2, codigo: 'PRO', nombre: 'EN PROCESO', descripcion: 'Documento en trámite', estado: 'ACTIVO' },
  { PK_ESTADO_DOCUMENTO: 3, codigo: 'ASI', nombre: 'ASIGNADO', descripcion: 'Documento asignado', estado: 'ACTIVO' },
  { PK_ESTADO_DOCUMENTO: 4, codigo: 'RES', nombre: 'RESPONDIDO', descripcion: 'Documento respondido', estado: 'ACTIVO' },
  { PK_ESTADO_DOCUMENTO: 5, codigo: 'ARC', nombre: 'ARCHIVADO', descripcion: 'Documento archivado', estado: 'ACTIVO' }
];

// ============================================
// TIPO CORRESPONDENCIA
// ============================================
export const tiposCorrespondencia: TipoCorrespondencia[] = [
  { PK_TIPO_CORRESPONDENCIA: 1, codigo: 'ENT', descripcion: 'ENTRADA' },
  { PK_TIPO_CORRESPONDENCIA: 2, codigo: 'SAL', descripcion: 'SALIDA' },
  { PK_TIPO_CORRESPONDENCIA: 3, codigo: 'INT', descripcion: 'INTERNA' }
];

// ============================================
// MEDIO RECEPCIÓN
// ============================================
export const mediosRecepcion: MedioRecepcion[] = [
  { PK_MEDIO_RECEPCION: 1, codigo: 'VEN', descripcion: 'VENTANILLA' },
  { PK_MEDIO_RECEPCION: 2, codigo: 'COR', descripcion: 'CORREO ELECTRÓNICO' },
  { PK_MEDIO_RECEPCION: 3, codigo: 'MEN', descripcion: 'MENSAJERÍA' },
  { PK_MEDIO_RECEPCION: 4, codigo: 'WEB', descripcion: 'PLATAFORMA WEB' }
];

// ============================================
// MODO DISTRIBUCIÓN
// ============================================
export const modosDistribucion: ModoDistribucion[] = [
  { PK_MODO_DISTRIBUCION: 1, codigo: 'FIS', nombre: 'FÍSICO', descripcion: 'Entrega física' },
  { PK_MODO_DISTRIBUCION: 2, codigo: 'COR', nombre: 'CORREO ELECTRÓNICO', descripcion: 'Envío por correo' },
  { PK_MODO_DISTRIBUCION: 3, codigo: 'MEN', nombre: 'MENSAJERÍA', descripcion: 'Entrega por mensajería' },
  { PK_MODO_DISTRIBUCION: 4, codigo: 'INT', nombre: 'SISTEMA INTERNO', descripcion: 'Distribución interna' }
];

// ============================================
// TIPO REMITENTE
// ============================================
export const tiposRemitente: TipoRemitente[] = [
  { PK_TIPO_REMITENTE: 1, codigo: 'NAT', descripcion: 'PERSONA NATURAL' },
  { PK_TIPO_REMITENTE: 2, codigo: 'EMP', descripcion: 'EMPRESA' },
  { PK_TIPO_REMITENTE: 3, codigo: 'ENT', descripcion: 'ENTIDAD PÚBLICA' }
];

// ============================================
// PILARES (agrupador jerárquico de áreas)
// ============================================
export const pilares: Pilar[] = [
  { PK_PILAR: 1, nombre: 'TÉCNICO', descripcion: 'Áreas de gestión técnica y tecnológica', estado: 'ACTIVO' },
  { PK_PILAR: 2, nombre: 'JURÍDICO', descripcion: 'Áreas de gestión jurídica y supervisión', estado: 'ACTIVO' },
  { PK_PILAR: 3, nombre: 'FINANCIERO', descripcion: 'Áreas de gestión financiera y contable', estado: 'ACTIVO' }
];

// ============================================
// DEPENDENCIAS / ÁREAS (estructura real AIC)
// PILAR → ÁREA → CARGO
// ============================================
export const dependencias: Dependencia[] = [
  // ── PILAR TÉCNICO ──
  {
    PK_DEPENDENCIA: 1,
    FK_PILAR: 1,
    codigo: 'TEC-01',
    nombre: 'GESTIÓN DE ATENCIÓN AL COMUNERO',
    cargo: 'Auxiliar',
    descripcion: 'Atención y orientación a comuneros de la AIC',
    estado: 'ACTIVO'
  },
  {
    PK_DEPENDENCIA: 2,
    FK_PILAR: 1,
    codigo: 'TEC-02',
    nombre: 'GESTIÓN TIC-S',
    cargo: 'Auxiliar',
    descripcion: 'Tecnologías de la Información y Comunicación en Salud',
    estado: 'ACTIVO'
  },
  {
    PK_DEPENDENCIA: 3,
    FK_PILAR: 1,
    codigo: 'TEC-03',
    nombre: 'GESTIÓN DE AUDITORÍA DE LA PRESTACIÓN DE SERVICIOS EN SALUD',
    cargo: 'Auxiliar',
    descripcion: 'Auditoría y control de calidad en prestación de servicios de salud',
    estado: 'ACTIVO'
  },
  // ── PILAR JURÍDICO ──
  {
    PK_DEPENDENCIA: 4,
    FK_PILAR: 2,
    codigo: 'JUR-01',
    nombre: 'GESTIÓN DE LA SUPERVISIÓN',
    cargo: 'Auxiliar',
    descripcion: 'Supervisión de contratos y convenios institucionales',
    estado: 'ACTIVO'
  },
  {
    PK_DEPENDENCIA: 5,
    FK_PILAR: 2,
    codigo: 'JUR-02',
    nombre: 'GESTIÓN DE LA CONTRATACIÓN',
    cargo: 'Auxiliar',
    descripcion: 'Procesos de contratación pública y privada de la AIC',
    estado: 'ACTIVO'
  },
  {
    PK_DEPENDENCIA: 6,
    FK_PILAR: 2,
    codigo: 'JUR-03',
    nombre: 'GESTIÓN JURÍDICA',
    cargo: 'Auxiliar',
    descripcion: 'Asesoría y representación legal de la organización',
    estado: 'ACTIVO'
  },
  // ── PILAR FINANCIERO ──
  {
    PK_DEPENDENCIA: 7,
    FK_PILAR: 3,
    codigo: 'FIN-01',
    nombre: 'GESTIÓN DE CARTERA',
    cargo: 'Auxiliar',
    descripcion: 'Control y recuperación de cartera institucional',
    estado: 'ACTIVO'
  },
  {
    PK_DEPENDENCIA: 8,
    FK_PILAR: 3,
    codigo: 'FIN-02',
    nombre: 'GESTIÓN DE TESORERIA',
    cargo: 'Auxiliar',
    descripcion: 'Manejo de recursos financieros y pagos de la AIC',
    estado: 'ACTIVO'
  },
  {
    PK_DEPENDENCIA: 9,
    FK_PILAR: 3,
    codigo: 'FIN-03',
    nombre: 'GESTIÓN DE LA CONTABILIDAD',
    cargo: 'Auxiliar',
    descripcion: 'Registro y control contable de la organización',
    estado: 'ACTIVO'
  }
];

// ============================================
// ROL
// ============================================
export const roles: Rol[] = [
  { PK_ROL: 1, FK_DEPENDENCIA: 1, nombre_rol: 'ADMINISTRADOR', descripcion: 'Control total del sistema', estado: 'ACTIVO' },
  { PK_ROL: 2, FK_DEPENDENCIA: 2, nombre_rol: 'RADICADOR', descripcion: 'Registro de documentos', estado: 'ACTIVO' },
  { PK_ROL: 3, FK_DEPENDENCIA: 3, nombre_rol: 'GESTOR', descripcion: 'Gestión documental', estado: 'ACTIVO' },
  { PK_ROL: 4, FK_DEPENDENCIA: 4, nombre_rol: 'CONSULTA', descripcion: 'Solo lectura', estado: 'ACTIVO' }
];

// ============================================
// SERIE DOCUMENTAL
// ============================================
export const seriesDocumentales: SerieDocumental[] = [
  { PK_SERIE_DOCUMENTAL: 1, codigo: 'SD-01', nombre: 'Gestión administrativa', descripcion: 'Documentos administrativos' },
  { PK_SERIE_DOCUMENTAL: 2, codigo: 'SD-02', nombre: 'Gestión contractual', descripcion: 'Documentos contractuales' },
  { PK_SERIE_DOCUMENTAL: 3, codigo: 'SD-03', nombre: 'Gestión jurídica', descripcion: 'Documentos legales' }
];

// ============================================
// SUBSERIE DOCUMENTAL
// ============================================
export const subseriesDocumentales: SubserieDocumental[] = [
  { PK_SUBSERIE_DOCUMENTAL: 1, FK_SERIE_DOCUMENTAL: 1, codigo: 'SSD-01', nombre: 'Correspondencia recibida', descripcion: 'Documentos recibidos', estado: 'ACTIVO' },
  { PK_SUBSERIE_DOCUMENTAL: 2, FK_SERIE_DOCUMENTAL: 1, codigo: 'SSD-02', nombre: 'Correspondencia enviada', descripcion: 'Documentos enviados', estado: 'ACTIVO' },
  { PK_SUBSERIE_DOCUMENTAL: 3, FK_SERIE_DOCUMENTAL: 2, codigo: 'SSD-03', nombre: 'Contratación', descripcion: 'Documentos contractuales', estado: 'ACTIVO' },
  { PK_SUBSERIE_DOCUMENTAL: 4, FK_SERIE_DOCUMENTAL: 3, codigo: 'SSD-04', nombre: 'Actos administrativos', descripcion: 'Resoluciones y actos', estado: 'ACTIVO' }
];

// ============================================
// TIPO DOCUMENTAL
// ============================================
export const tiposDocumentales: TipoDocumental[] = [
  { PK_TIPO_DOCUMENTAL: 1, FK_SUBSERIE_DOCUMENTAL: 1, codigo: 'TD-01', nombre: 'OFICIO', descripcion: 'Comunicación oficial', estado: 'ACTIVO' },
  { PK_TIPO_DOCUMENTAL: 2, FK_SUBSERIE_DOCUMENTAL: 1, codigo: 'TD-02', nombre: 'MEMORANDO', descripcion: 'Comunicación interna', estado: 'ACTIVO' },
  { PK_TIPO_DOCUMENTAL: 3, FK_SUBSERIE_DOCUMENTAL: 2, codigo: 'TD-03', nombre: 'CIRCULAR', descripcion: 'Información general', estado: 'ACTIVO' },
  { PK_TIPO_DOCUMENTAL: 4, FK_SUBSERIE_DOCUMENTAL: 4, codigo: 'TD-04', nombre: 'RESOLUCIÓN', descripcion: 'Acto administrativo', estado: 'ACTIVO' },
  { PK_TIPO_DOCUMENTAL: 5, FK_SUBSERIE_DOCUMENTAL: 3, codigo: 'TD-05', nombre: 'CONTRATO', descripcion: 'Documento contractual', estado: 'ACTIVO' }
];

// ============================================
// PERSONAS (estructura real BD AIC)
// Solo se muestran en selector: PRIMER_NOMBRE + SEGUNDO_NOMBRE + PRIMER_APELLIDO + SEGUNDO_APELLIDO
// ============================================
export const personas: Persona[] = [
  {
    PK_PERSONA: 1,
    FK_ROL: 1,
    FK_DEPENDENCIAS: 1,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234001',
    PRIMER_NOMBRE: 'Luz',
    SEGUNDO_NOMBRE: 'Marina',
    PRIMER_APELLIDO: 'Yule',
    SEGUNDO_APELLIDO: 'Pechené',
    GENERO: 'F',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Carrera 7 # 4-23, Popayán',
    CORREOELECTRONICO: 'luz.yule@aic.gov.co',
    TELEFONO: '3124560001',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-01-15',
    CREADOPOR: 'ADMIN',
    // Retrocompat
    primer_nombre: 'Luz', primer_apellido: 'Yule',
    tipo_identificacion: 'CC', numero_identificacion: '1061234001',
    correo_electronico: 'luz.yule@aic.gov.co',
    nombreCompleto: 'Luz Marina Yule Pechené'
  },
  {
    PK_PERSONA: 2,
    FK_ROL: 2,
    FK_DEPENDENCIAS: 2,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234002',
    PRIMER_NOMBRE: 'Andrés',
    SEGUNDO_NOMBRE: 'Felipe',
    PRIMER_APELLIDO: 'Trochez',
    SEGUNDO_APELLIDO: 'Güegia',
    GENERO: 'M',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Calle 5 # 8-12, Popayán',
    CORREOELECTRONICO: 'andres.trochez@aic.gov.co',
    TELEFONO: '3134560002',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-01-15',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Andrés', primer_apellido: 'Trochez',
    tipo_identificacion: 'CC', numero_identificacion: '1061234002',
    correo_electronico: 'andres.trochez@aic.gov.co',
    nombreCompleto: 'Andrés Felipe Trochez Güegia'
  },
  {
    PK_PERSONA: 3,
    FK_ROL: 3,
    FK_DEPENDENCIAS: 3,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234003',
    PRIMER_NOMBRE: 'Sandra',
    SEGUNDO_NOMBRE: 'Milena',
    PRIMER_APELLIDO: 'Conda',
    SEGUNDO_APELLIDO: 'Ul',
    GENERO: 'F',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Cra 3 # 10-45, Popayán',
    CORREOELECTRONICO: 'sandra.conda@aic.gov.co',
    TELEFONO: '3144560003',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-02-01',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Sandra', primer_apellido: 'Conda',
    tipo_identificacion: 'CC', numero_identificacion: '1061234003',
    correo_electronico: 'sandra.conda@aic.gov.co',
    nombreCompleto: 'Sandra Milena Conda Ul'
  },
  {
    PK_PERSONA: 4,
    FK_ROL: 4,
    FK_DEPENDENCIAS: 4,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234004',
    PRIMER_NOMBRE: 'Hernán',
    SEGUNDO_NOMBRE: 'Darío',
    PRIMER_APELLIDO: 'Morales',
    SEGUNDO_APELLIDO: 'Tombé',
    GENERO: 'M',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Calle 2 # 5-78, Popayán',
    CORREOELECTRONICO: 'hernan.morales@aic.gov.co',
    TELEFONO: '3154560004',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-02-10',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Hernán', primer_apellido: 'Morales',
    tipo_identificacion: 'CC', numero_identificacion: '1061234004',
    correo_electronico: 'hernan.morales@aic.gov.co',
    nombreCompleto: 'Hernán Darío Morales Tombé'
  },
  {
    PK_PERSONA: 5,
    FK_ROL: 2,
    FK_DEPENDENCIAS: 5,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234005',
    PRIMER_NOMBRE: 'Diana',
    SEGUNDO_NOMBRE: 'Carolina',
    PRIMER_APELLIDO: 'Velasco',
    SEGUNDO_APELLIDO: 'Pilcué',
    GENERO: 'F',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Cra 9 # 3-11, Popayán',
    CORREOELECTRONICO: 'diana.velasco@aic.gov.co',
    TELEFONO: '3164560005',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'Nasa Kiwe',
    VEREDA: 'El Centro',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-03-01',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Diana', primer_apellido: 'Velasco',
    tipo_identificacion: 'CC', numero_identificacion: '1061234005',
    correo_electronico: 'diana.velasco@aic.gov.co',
    nombreCompleto: 'Diana Carolina Velasco Pilcué'
  },
  {
    PK_PERSONA: 6,
    FK_ROL: 3,
    FK_DEPENDENCIAS: 6,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234006',
    PRIMER_NOMBRE: 'Javier',
    SEGUNDO_NOMBRE: 'Ernesto',
    PRIMER_APELLIDO: 'Güetio',
    SEGUNDO_APELLIDO: 'Secué',
    GENERO: 'M',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Calle 8 # 2-34, Popayán',
    CORREOELECTRONICO: 'javier.guetio@aic.gov.co',
    TELEFONO: '3174560006',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-03-15',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Javier', primer_apellido: 'Güetio',
    tipo_identificacion: 'CC', numero_identificacion: '1061234006',
    correo_electronico: 'javier.guetio@aic.gov.co',
    nombreCompleto: 'Javier Ernesto Güetio Secué'
  },
  {
    PK_PERSONA: 7,
    FK_ROL: 4,
    FK_DEPENDENCIAS: 7,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234007',
    PRIMER_NOMBRE: 'Esperanza',
    SEGUNDO_NOMBRE: 'del Carmen',
    PRIMER_APELLIDO: 'Quiguanás',
    SEGUNDO_APELLIDO: 'Orozco',
    GENERO: 'F',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Cra 5 # 6-90, Popayán',
    CORREOELECTRONICO: 'esperanza.quiguanas@aic.gov.co',
    TELEFONO: '3184560007',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-04-01',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Esperanza', primer_apellido: 'Quiguanás',
    tipo_identificacion: 'CC', numero_identificacion: '1061234007',
    correo_electronico: 'esperanza.quiguanas@aic.gov.co',
    nombreCompleto: 'Esperanza del Carmen Quiguanás Orozco'
  },
  {
    PK_PERSONA: 8,
    FK_ROL: 2,
    FK_DEPENDENCIAS: 8,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234008',
    PRIMER_NOMBRE: 'Carlos',
    SEGUNDO_NOMBRE: 'Arturo',
    PRIMER_APELLIDO: 'Pasu',
    SEGUNDO_APELLIDO: 'Dagua',
    GENERO: 'M',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Cra 11 # 9-23, Popayán',
    CORREOELECTRONICO: 'carlos.pasu@aic.gov.co',
    TELEFONO: '3194560008',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-04-10',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Carlos', primer_apellido: 'Pasu',
    tipo_identificacion: 'CC', numero_identificacion: '1061234008',
    correo_electronico: 'carlos.pasu@aic.gov.co',
    nombreCompleto: 'Carlos Arturo Pasu Dagua'
  },
  {
    PK_PERSONA: 9,
    FK_ROL: 3,
    FK_DEPENDENCIAS: 9,
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '1061234009',
    PRIMER_NOMBRE: 'Rosa',
    SEGUNDO_NOMBRE: 'Elena',
    PRIMER_APELLIDO: 'Mestizo',
    SEGUNDO_APELLIDO: 'Casamachin',
    GENERO: 'F',
    TIPO_PERSONA: 'FUNCIONARIO',
    DIRECCION: 'Cra 4 # 7-56, Popayán',
    CORREOELECTRONICO: 'rosa.mestizo@aic.gov.co',
    TELEFONO: '3004560009',
    CORREGIMIENTO: 'Popayán',
    RESGUARDO: 'N/A',
    VEREDA: 'N/A',
    COD_DEPMUN: '19001',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    FECHACREADO: '2024-04-20',
    CREADOPOR: 'ADMIN',
    primer_nombre: 'Rosa', primer_apellido: 'Mestizo',
    tipo_identificacion: 'CC', numero_identificacion: '1061234009',
    correo_electronico: 'rosa.mestizo@aic.gov.co',
    nombreCompleto: 'Rosa Elena Mestizo Casamachin'
  }
];

// ============================================
// EMPRESAS
// ============================================
export const empresas: Empresa[] = [
  {
    PK_EMPRESA: 1,
    FK_TIPO_EMPRESA: 2,
    nombre_empresa: 'Empresa Ejemplo S.A.S',
    nit: '900123456',
    direccion: 'Dirección principal',
    telefono: '6012345678',
    correo: 'contacto@empresa.com'
  },
  {
    PK_EMPRESA: 2,
    FK_TIPO_EMPRESA: 1,
    nombre_empresa: 'Alcaldía Municipal',
    nit: '800123456',
    direccion: 'Centro Administrativo Municipal',
    telefono: '6019876543',
    correo: 'contacto@alcaldia.gov.co'
  },
  {
    PK_EMPRESA: 3,
    FK_TIPO_EMPRESA: 2,
    nombre_empresa: 'Constructora del Valle Ltda',
    nit: '900987654',
    direccion: 'Zona Industrial',
    telefono: '6015551234',
    correo: 'info@constructora.com'
  }
];