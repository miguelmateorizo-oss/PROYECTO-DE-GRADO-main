import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import type { CorrespondenciaGeneral } from '../types/correspondencia';
import type { HistorialDocumento } from '../types/historial';
import { documentos } from '../data/mock-data';
import { mediosRespuesta } from '../data/medios-respuesta';
import { 
  estadosDocumento, 
  tiposCorrespondencia,
  mediosRecepcion,
  tiposDocumentales,
  seriesDocumentales,
  subseriesDocumentales,
  confidencialidades,
  soportes
} from '../data/catalogos';

// Helper para formatear fechas
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

interface DocumentoDetailProps {
  open: boolean;
  onClose: () => void;
  correspondencia: CorrespondenciaGeneral | null;
  respuestaInfo?: {
    observaciones: string;
    medioRespuesta: string;
    adjuntos: string[];
    fechaRespuesta: string;
    responsable: string;
  } | null;
}

export function DocumentoDetail({ 
  open, 
  onClose, 
  correspondencia,
  respuestaInfo
}: DocumentoDetailProps) {
  if (!correspondencia) return null;

  // Buscar el documento asociado
  const documento = documentos.find(d => d.PK_DOCUMENTO === correspondencia.FK_DOCUMENTO);
  
  // Buscar datos relacionados
  const tipoCorr = tiposCorrespondencia.find(t => t.PK_TIPO_CORRESPONDENCIA === correspondencia.FK_TIPO_CORRESPONDENCIA);
  const medioRec = mediosRecepcion.find(m => m.PK_MEDIO_RECEPCION === correspondencia.FK_MEDIO_RECEPCION);
  const estadoDoc = estadosDocumento.find(e => e.PK_ESTADO_DOCUMENTO === documento?.FK_ESTADO_DOCUMENTO);
  
  const tipoDoc = tiposDocumentales.find(t => t.PK_TIPO_DOCUMENTAL === documento?.FK_TIPO_DOCUMENTAL);
  const serie = seriesDocumentales.find(s => s.PK_SERIE_DOCUMENTAL === documento?.FK_SERIE_DOCUMENTAL);
  const subserie = subseriesDocumentales.find(s => s.PK_SUBSERIE_DOCUMENTAL === documento?.FK_SUBSERIE_DOCUMENTAL);
  const confidencialidad = confidencialidades.find(c => c.PK_CONFIDENCIALIDAD === documento?.FK_CONFIDENCIALIDAD);
  const soporte = soportes.find(s => s.PK_SOPORTE === documento?.FK_SOPORTE);

  const getEstadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      'RADICADO': 'bg-blue-100 text-blue-800',
      'EN PROCESO': 'bg-yellow-100 text-yellow-800',
      'ASIGNADO': 'bg-purple-100 text-purple-800',
      'RESPONDIDO': 'bg-green-100 text-green-800',
      'ARCHIVADO': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[estado] || 'bg-gray-100 text-gray-800'}>
        {estado}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              <span>Detalle de Correspondencia</span>
            </div>
            {estadoDoc && getEstadoBadge(estadoDoc.nombre)}
          </DialogTitle>
          <DialogDescription>
            Aquí puedes ver todos los detalles de la correspondencia, incluyendo información de radicación, remitente, destinatario, documento, clasificación documental, observaciones, respuesta y historial.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información de Radicación */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Información de Radicación</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Número de Radicado</p>
                  <p className="font-mono font-semibold text-lg">
                    {correspondencia.numero_radicado}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Tipo de Correspondencia</p>
                  <p className="font-medium">{tipoCorr?.descripcion}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Fecha de Radicación</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="font-medium">
                      {formatDate(correspondencia.fecha)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Hora</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <p className="font-medium">{correspondencia.hora}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Medio de Recepción</p>
                  <p className="font-medium">{medioRec?.descripcion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remitente y Destinatario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {correspondencia.FK_EMPRESA_REMITE ? (
                    <Building className="h-5 w-5 text-green-600" />
                  ) : (
                    <User className="h-5 w-5 text-green-600" />
                  )}
                  <h3 className="font-semibold">Remitente</h3>
                </div>
                <p className="font-medium">{correspondencia.remitenteNombre}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Destinatario</h3>
                </div>
                <p className="font-medium">{correspondencia.destinoNombre}</p>
              </CardContent>
            </Card>
          </div>

          {/* Información del Documento */}
          {documento && (
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-lg">Información del Documento</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Asunto</p>
                    <p className="font-medium text-lg">{documento.asunto}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Número de Documento</p>
                      <p className="font-mono font-medium">{documento.numero_documento}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Tipo Documental</p>
                      <p className="font-medium">{tipoDoc?.nombre}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Número de Folios</p>
                      <p className="font-medium">{documento.numero_folios}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Número de Anexos</p>
                      <p className="font-medium">{documento.numero_anexos}</p>
                    </div>

                    {documento.descripcion_anexos && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Descripción de Anexos</p>
                        <p className="font-medium">{documento.descripcion_anexos}</p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documento.fecha_vencimiento && (
                      <div>
                        <p className="text-sm text-gray-600">Fecha de Vencimiento</p>
                        <p className="font-medium">
                          {formatDate(documento.fecha_vencimiento)}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-gray-600">Soporte</p>
                      <p className="font-medium">{soporte?.nombre}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Confidencialidad</p>
                      <Badge>{confidencialidad?.nombre}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Clasificación Documental (TRD) */}
          {documento && (
            <Card className="border-l-4 border-l-indigo-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Paperclip className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold">Clasificación Documental (TRD)</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Serie Documental</p>
                    <p className="font-medium">
                      {serie?.codigo} - {serie?.nombre}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Subserie Documental</p>
                    <p className="font-medium">
                      {subserie?.codigo} - {subserie?.nombre}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Tipo Documental</p>
                    <p className="font-medium">
                      {tipoDoc?.codigo} - {tipoDoc?.nombre}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observaciones */}
          {correspondencia.observaciones && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold">Observaciones</h3>
                </div>
                <p className="text-gray-700">{correspondencia.observaciones}</p>
              </CardContent>
            </Card>
          )}

          {/* Respuesta */}
          {respuestaInfo && (
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Respuesta</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Observaciones</p>
                    <p className="font-medium text-lg">{respuestaInfo.observaciones}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Medio de Respuesta</p>
                      <p className="font-medium">{respuestaInfo.medioRespuesta}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Fecha de Respuesta</p>
                      <p className="font-medium">
                        {formatDate(respuestaInfo.fechaRespuesta)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Responsable</p>
                      <p className="font-medium">{respuestaInfo.responsable}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {respuestaInfo.adjuntos.length > 0 && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Adjuntos</p>
                        <div className="space-y-2">
                          {respuestaInfo.adjuntos.map((adjunto, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Paperclip className="h-4 w-4 text-gray-500" />
                              <p className="font-medium">{adjunto}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Historial del Documento */}
          <Card className="border-l-4 border-l-cyan-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-cyan-600" />
                Historial del Documento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Timeline vertical */}
                <div className="relative border-l-2 border-cyan-200 pl-6 space-y-6 ml-3">
                  {/* Evento 1: Radicado */}
                  <div className="relative">
                    <div className="absolute -left-[1.7rem] w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-500">RADICADO</Badge>
                        <span className="text-xs text-gray-600">
                          {formatDate(correspondencia.fecha)} {correspondencia.hora}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Documento radicado en el sistema
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Por: Usuario Ventanilla
                      </p>
                    </div>
                  </div>

                  {/* Evento 2: Asignado */}
                  {correspondencia.estadoDocumento !== 'RADICADO' && (
                    <div className="relative">
                      <div className="absolute -left-[1.7rem] w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-4 border-white">
                        <Send className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-purple-500">ASIGNADO</Badge>
                          <span className="text-xs text-gray-600">
                            {formatDate(correspondencia.fecha)} 
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          Documento asignado a {correspondencia.destinoNombre}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Por: Usuario Ventanilla
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Evento 3: En Proceso */}
                  {(correspondencia.estadoDocumento === 'EN PROCESO' || correspondencia.estadoDocumento === 'RESPONDIDO' || correspondencia.estadoDocumento === 'ARCHIVADO') && (
                    <div className="relative">
                      <div className="absolute -left-[1.7rem] w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-white">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-yellow-500">EN PROCESO</Badge>
                          <span className="text-xs text-gray-600">
                            {formatDate(correspondencia.fecha)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          Documento en proceso de revisión
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Por: {correspondencia.destinoNombre}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Evento 4: Respondido */}
                  {(correspondencia.estadoDocumento === 'RESPONDIDO' || correspondencia.estadoDocumento === 'ARCHIVADO') && respuestaInfo && (
                    <div className="relative">
                      <div className="absolute -left-[1.7rem] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-500">RESPONDIDO</Badge>
                          <span className="text-xs text-gray-600">
                            {formatDate(respuestaInfo.fechaRespuesta)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          Documento respondido vía {respuestaInfo.medioRespuesta}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Por: {respuestaInfo.responsable}
                        </p>
                        {respuestaInfo.adjuntos.length > 0 && (
                          <p className="text-xs text-gray-600 mt-1">
                            📎 {respuestaInfo.adjuntos.length} archivo(s) adjunto(s)
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Evento 5: Archivado */}
                  {correspondencia.estadoDocumento === 'ARCHIVADO' && (
                    <div className="relative">
                      <div className="absolute -left-[1.7rem] w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center border-4 border-white">
                        <Paperclip className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-gray-500">ARCHIVADO</Badge>
                          <span className="text-xs text-gray-600">
                            {formatDate(correspondencia.fecha)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          Documento archivado según TRD
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Por: Sistema
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}