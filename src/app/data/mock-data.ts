import type { CorrespondenciaGeneral, Documento, DistribucionDocumento } from '../types/correspondencia';

// ============================================
// DOCUMENTOS DE EJEMPLO
// ============================================
export const documentos: Documento[] = [
  {
    PK_DOCUMENTO: 1,
    FK_TIPO_DOCUMENTAL: 1, // OFICIO
    FK_SERIE_DOCUMENTAL: 1,
    FK_SUBSERIE_DOCUMENTAL: 1,
    FK_CONFIDENCIALIDAD: 1, // PÚBLICA
    FK_SOPORTE: 2, // DIGITAL
    FK_ESTADO_DOCUMENTO: 1, // RADICADO
    asunto: 'Solicitud de información contractual',
    numero_documento: 'OFI-2026-001',
    numero_folios: 3,
    numero_anexos: 2,
    descripcion_anexos: 'Cédula de ciudadanía, RUT',
    fecha_radicacion: '2026-02-10',
    fecha_vencimiento: '2026-02-25'
  },
  {
    PK_DOCUMENTO: 2,
    FK_TIPO_DOCUMENTAL: 2, // MEMORANDO
    FK_SERIE_DOCUMENTAL: 1,
    FK_SUBSERIE_DOCUMENTAL: 2,
    FK_CONFIDENCIALIDAD: 2, // INTERNA
    FK_SOPORTE: 2,
    FK_ESTADO_DOCUMENTO: 2, // EN PROCESO
    asunto: 'Convocatoria a reunión de coordinación',
    numero_documento: 'MEM-2026-045',
    numero_folios: 1,
    numero_anexos: 0,
    fecha_radicacion: '2026-02-09',
    fecha_vencimiento: '2026-02-12'
  },
  {
    PK_DOCUMENTO: 3,
    FK_TIPO_DOCUMENTAL: 5, // CONTRATO
    FK_SERIE_DOCUMENTAL: 2,
    FK_SUBSERIE_DOCUMENTAL: 3,
    FK_CONFIDENCIALIDAD: 3, // CONFIDENCIAL
    FK_SOPORTE: 3, // MIXTO
    FK_ESTADO_DOCUMENTO: 3, // ASIGNADO
    asunto: 'Contrato de prestación de servicios profesionales',
    numero_documento: 'CON-2026-012',
    numero_folios: 15,
    numero_anexos: 5,
    descripcion_anexos: 'Propuesta técnica, certificados, hojas de vida',
    fecha_radicacion: '2026-02-08',
    fecha_vencimiento: '2026-03-08'
  },
  {
    PK_DOCUMENTO: 4,
    FK_TIPO_DOCUMENTAL: 4, // RESOLUCIÓN
    FK_SERIE_DOCUMENTAL: 3,
    FK_SUBSERIE_DOCUMENTAL: 4,
    FK_CONFIDENCIALIDAD: 1,
    FK_SOPORTE: 2,
    FK_ESTADO_DOCUMENTO: 4, // RESPONDIDO
    asunto: 'Resolución de asignación de funciones',
    numero_documento: 'RES-2026-078',
    numero_folios: 5,
    numero_anexos: 1,
    descripcion_anexos: 'Acta de posesión',
    fecha_radicacion: '2026-02-05',
    fecha_vencimiento: '2026-02-20'
  },
  {
    PK_DOCUMENTO: 5,
    FK_TIPO_DOCUMENTAL: 1,
    FK_SERIE_DOCUMENTAL: 1,
    FK_SUBSERIE_DOCUMENTAL: 1,
    FK_CONFIDENCIALIDAD: 1,
    FK_SOPORTE: 1, // FÍSICO
    FK_ESTADO_DOCUMENTO: 1,
    asunto: 'Petición de copias de documentos',
    numero_documento: 'OFI-2026-002',
    numero_folios: 2,
    numero_anexos: 0,
    fecha_radicacion: '2026-02-10',
    fecha_vencimiento: '2026-02-25'
  },
  {
    PK_DOCUMENTO: 6,
    FK_TIPO_DOCUMENTAL: 3, // CIRCULAR
    FK_SERIE_DOCUMENTAL: 1,
    FK_SUBSERIE_DOCUMENTAL: 2,
    FK_CONFIDENCIALIDAD: 1,
    FK_SOPORTE: 2,
    FK_ESTADO_DOCUMENTO: 5, // ARCHIVADO
    asunto: 'Circular sobre normativa de teletrabajo',
    numero_documento: 'CIR-2026-003',
    numero_folios: 4,
    numero_anexos: 1,
    descripcion_anexos: 'Formato de autorización',
    fecha_radicacion: '2026-01-15',
    fecha_vencimiento: '2026-01-30'
  },
  {
    PK_DOCUMENTO: 7,
    FK_TIPO_DOCUMENTAL: 1,
    FK_SERIE_DOCUMENTAL: 1,
    FK_SUBSERIE_DOCUMENTAL: 1,
    FK_CONFIDENCIALIDAD: 2,
    FK_SOPORTE: 2,
    FK_ESTADO_DOCUMENTO: 2,
    asunto: 'Solicitud de auditoría interna',
    numero_documento: 'OFI-2026-003',
    numero_folios: 8,
    numero_anexos: 3,
    descripcion_anexos: 'Estados financieros, Balance, Inventario',
    fecha_radicacion: '2026-02-07',
    fecha_vencimiento: '2026-02-22'
  }
];

// ============================================
// CORRESPONDENCIA GENERAL
// ============================================
export const correspondencias: CorrespondenciaGeneral[] = [
  {
    PK_CORRESPONDENCIA: 1,
    FK_PERSONA_REMITE: 2, // María García
    FK_PERSONA_DESTINO: 1, // Admin
    FK_TIPO_CORRESPONDENCIA: 1, // ENTRADA
    FK_MEDIO_RECEPCION: 4, // PLATAFORMA WEB
    FK_TIPO_REMITENTE: 1, // PERSONA NATURAL
    FK_DOCUMENTO: 1,
    fecha: '2026-02-10',
    hora: '09:15:00',
    numero_radicado: 'RAD-2026-0001',
    estado_correspondencia: 'ACTIVO',
    observaciones: 'Documento recibido por plataforma web',
    remitenteNombre: 'María José García López',
    destinoNombre: 'Administrador Sistema',
    tipoCorrespondencia: 'ENTRADA',
    estadoDocumento: 'RADICADO',
    asunto: 'Solicitud de información contractual'
  },
  {
    PK_CORRESPONDENCIA: 2,
    FK_PERSONA_REMITE: 1,
    FK_PERSONA_DESTINO: 3, // Carlos Rodríguez
    FK_TIPO_CORRESPONDENCIA: 3, // INTERNA
    FK_MEDIO_RECEPCION: 4,
    FK_TIPO_REMITENTE: 1,
    FK_DOCUMENTO: 2,
    fecha: '2026-02-09',
    hora: '14:30:00',
    numero_radicado: 'RAD-2026-0002',
    estado_correspondencia: 'EN PROCESO',
    observaciones: 'Memorando interno',
    remitenteNombre: 'Administrador Sistema',
    destinoNombre: 'Carlos Rodríguez Martínez',
    tipoCorrespondencia: 'INTERNA',
    estadoDocumento: 'EN PROCESO',
    asunto: 'Convocatoria a reunión de coordinación'
  },
  {
    PK_CORRESPONDENCIA: 3,
    FK_EMPRESA_REMITE: 3, // Constructora
    FK_PERSONA_DESTINO: 5, // Juan Pérez
    FK_TIPO_CORRESPONDENCIA: 1,
    FK_MEDIO_RECEPCION: 1, // VENTANILLA
    FK_TIPO_REMITENTE: 2, // EMPRESA
    FK_DOCUMENTO: 3,
    fecha: '2026-02-08',
    hora: '10:00:00',
    numero_radicado: 'RAD-2026-0003',
    estado_correspondencia: 'ASIGNADO',
    observaciones: 'Contrato entregado en ventanilla',
    remitenteNombre: 'Constructora del Valle Ltda',
    destinoNombre: 'Juan Pérez Gómez',
    tipoCorrespondencia: 'ENTRADA',
    estadoDocumento: 'ASIGNADO',
    asunto: 'Contrato de prestación de servicios profesionales'
  },
  {
    PK_CORRESPONDENCIA: 4,
    FK_PERSONA_REMITE: 1,
    FK_PERSONA_DESTINO: 4, // Ana Fernández
    FK_TIPO_CORRESPONDENCIA: 2, // SALIDA
    FK_MEDIO_RECEPCION: 2, // CORREO
    FK_TIPO_REMITENTE: 1,
    FK_DOCUMENTO: 4,
    fecha: '2026-02-05',
    hora: '11:45:00',
    numero_radicado: 'RAD-2026-0004',
    estado_correspondencia: 'RESPONDIDO',
    observaciones: 'Resolución enviada por correo electrónico',
    remitenteNombre: 'Administrador Sistema',
    destinoNombre: 'Ana Lucía Fernández',
    tipoCorrespondencia: 'SALIDA',
    estadoDocumento: 'RESPONDIDO',
    asunto: 'Resolución de asignación de funciones'
  },
  {
    PK_CORRESPONDENCIA: 5,
    FK_PERSONA_REMITE: 4,
    FK_PERSONA_DESTINO: 3,
    FK_TIPO_CORRESPONDENCIA: 1,
    FK_MEDIO_RECEPCION: 1,
    FK_TIPO_REMITENTE: 1,
    FK_DOCUMENTO: 5,
    fecha: '2026-02-10',
    hora: '08:30:00',
    numero_radicado: 'RAD-2026-0005',
    estado_correspondencia: 'ACTIVO',
    observaciones: 'Petición de copias - Soporte físico',
    remitenteNombre: 'Ana Lucía Fernández',
    destinoNombre: 'Carlos Rodríguez Martínez',
    tipoCorrespondencia: 'ENTRADA',
    estadoDocumento: 'RADICADO',
    asunto: 'Petición de copias de documentos'
  },
  {
    PK_CORRESPONDENCIA: 6,
    FK_PERSONA_REMITE: 1,
    FK_PERSONA_DESTINO: 2,
    FK_TIPO_CORRESPONDENCIA: 2,
    FK_MEDIO_RECEPCION: 2,
    FK_TIPO_REMITENTE: 1,
    FK_DOCUMENTO: 6,
    fecha: '2026-01-15',
    hora: '16:00:00',
    numero_radicado: 'RAD-2026-0006',
    estado_correspondencia: 'ARCHIVADO',
    observaciones: 'Circular enviada a todas las dependencias',
    remitenteNombre: 'Administrador Sistema',
    destinoNombre: 'María José García López',
    tipoCorrespondencia: 'SALIDA',
    estadoDocumento: 'ARCHIVADO',
    asunto: 'Circular sobre normativa de teletrabajo'
  },
  {
    PK_CORRESPONDENCIA: 7,
    FK_EMPRESA_REMITE: 2, // Alcaldía
    FK_PERSONA_DESTINO: 1,
    FK_TIPO_CORRESPONDENCIA: 1,
    FK_MEDIO_RECEPCION: 3, // MENSAJERÍA
    FK_TIPO_REMITENTE: 3, // ENTIDAD PÚBLICA
    FK_DOCUMENTO: 7,
    fecha: '2026-02-07',
    hora: '13:20:00',
    numero_radicado: 'RAD-2026-0007',
    estado_correspondencia: 'EN PROCESO',
    observaciones: 'Solicitud de auditoría enviada por mensajería',
    remitenteNombre: 'Alcaldía Municipal',
    destinoNombre: 'Administrador Sistema',
    tipoCorrespondencia: 'ENTRADA',
    estadoDocumento: 'EN PROCESO',
    asunto: 'Solicitud de auditoría interna'
  }
];

// ============================================
// DISTRIBUCIÓN DE DOCUMENTOS
// ============================================
export const distribuciones: DistribucionDocumento[] = [
  {
    PK_DISTRIBUCION: 1,
    FK_DOCUMENTO: 1,
    FK_DEPENDENCIA_ORIGEN: 2, // Secretaría General
    FK_DEPENDENCIA_DESTINO: 5, // Contratación
    FK_PERSONA_DESTINO: 5, // Juan Pérez
    FK_MODO_DISTRIBUCION: 4, // Sistema Interno
    fecha_distribucion: '2026-02-10T10:30:00',
    fecha_recibido: '2026-02-10T11:00:00',
    estado: 'RECIBIDO',
    observaciones: 'Documento asignado para revisión'
  },
  {
    PK_DISTRIBUCION: 2,
    FK_DOCUMENTO: 2,
    FK_DEPENDENCIA_ORIGEN: 1, // Gerencia
    FK_DEPENDENCIA_DESTINO: 3, // Archivo
    FK_PERSONA_DESTINO: 3, // Carlos Rodríguez
    FK_MODO_DISTRIBUCION: 4,
    fecha_distribucion: '2026-02-09T15:00:00',
    estado: 'PENDIENTE',
    observaciones: 'Pendiente de recibir'
  },
  {
    PK_DISTRIBUCION: 3,
    FK_DOCUMENTO: 3,
    FK_DEPENDENCIA_ORIGEN: 2,
    FK_DEPENDENCIA_DESTINO: 4, // Jurídica
    FK_PERSONA_DESTINO: 4, // Ana Fernández
    FK_MODO_DISTRIBUCION: 1, // Físico
    fecha_distribucion: '2026-02-08T11:15:00',
    fecha_recibido: '2026-02-08T14:30:00',
    estado: 'RECIBIDO',
    observaciones: 'Contrato entregado para revisión legal'
  },
  {
    PK_DISTRIBUCION: 4,
    FK_DOCUMENTO: 7,
    FK_DEPENDENCIA_ORIGEN: 2,
    FK_DEPENDENCIA_DESTINO: 1, // Gerencia
    FK_PERSONA_DESTINO: 1,
    FK_MODO_DISTRIBUCION: 2, // Correo Electrónico
    fecha_distribucion: '2026-02-07T14:00:00',
    estado: 'EN PROCESO',
    observaciones: 'Solicitud de auditoría para aprobación'
  }
];
