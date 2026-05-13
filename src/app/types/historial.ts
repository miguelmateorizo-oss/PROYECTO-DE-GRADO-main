export interface HistorialDocumento {
  PK_HISTORIAL_DOCUMENTO: number;
  FK_DOCUMENTO: number;
  FK_ESTADO_DOCUMENTO: number;
  FECHA_EVENTO: Date | string;
  OBSERVACIONES: string;
  FECHACREADO: Date | string;
  CREADOPOR: string; // Nombre del usuario que realizó el cambio
  FECHAACTUALIZADO?: Date | string;
  ACTUALIZADOPOR?: string;
  
  // Campos calculados para visualización
  estadoNombre?: string;
  nombreUsuario?: string;
}

// Helper para crear entrada de historial
export const crearEntradaHistorial = (
  fkDocumento: number,
  fkEstadoDocumento: number,
  observaciones: string,
  creadoPor: string
): HistorialDocumento => {
  const fechaActual = new Date();
  return {
    PK_HISTORIAL_DOCUMENTO: Math.floor(Math.random() * 10000),
    FK_DOCUMENTO: fkDocumento,
    FK_ESTADO_DOCUMENTO: fkEstadoDocumento,
    FECHA_EVENTO: fechaActual,
    OBSERVACIONES: observaciones,
    FECHACREADO: fechaActual,
    CREADOPOR: creadoPor
  };
};