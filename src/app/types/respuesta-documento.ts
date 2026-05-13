export interface RespuestaDocumento {
  PK_RESPUESTA_DOCUMENTO: number;
  FK_DOCUMENTO_ORIGEN: number; // El documento que se está respondiendo (desde ventanilla)
  FK_DOCUMENTO_RESPUESTA?: number; // El documento adjunto en la respuesta
  fecha_respuesta: string;
  FK_MEDIO_RESPUESTA: number; // 1=Email, 2=Físico, 3=Oficio, etc.
  observaciones: string;
  fecha_creado: string;
  creado_por: number; // ID del usuario que está respondiendo
  
  // Campos adicionales para visualización
  nombreUsuario?: string;
  medioRespuestaNombre?: string;
  nombreDocumentoAdjunto?: string;
}

export interface MedioRespuesta {
  PK_MEDIO_RESPUESTA: number;
  nombre: string;
  descripcion: string;
  requiere_adjunto: boolean;
}
