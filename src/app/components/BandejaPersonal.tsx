import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import {
  Inbox,
  Clock,
  CheckCircle2,
  Send,
  Eye,
  MessageSquare,
  FileText,
  User,
  Building,
  Calendar,
  AlertCircle,
  Upload,
  Paperclip
} from 'lucide-react';
import type { CorrespondenciaGeneral } from '../types/correspondencia';
import type { UserSession } from './LoginScreen';
import type { RespuestaDocumento } from '../types/respuesta-documento';
import { mediosRespuesta } from '../data/medios-respuesta';
import { toast } from 'sonner';

interface BandejaPersonalProps {
  user: UserSession;
  correspondencias: CorrespondenciaGeneral[];
  onResponder: (corrId: number, respuestaData: RespuestaDocumento) => void;
  onVerDetalle: (corr: CorrespondenciaGeneral) => void;
}

export function BandejaPersonal({ user, correspondencias, onResponder, onVerDetalle }: BandejaPersonalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCorr, setSelectedCorr] = useState<CorrespondenciaGeneral | null>(null);
  const [observaciones, setObservaciones] = useState('');
  const [medioRespuesta, setMedioRespuesta] = useState('1');
  const [adjuntos, setAdjuntos] = useState<File[]>([]);

  // Filtrar correspondencias según el usuario
  const correspondenciasFiltradas = correspondencias.filter(corr => {
    // Si es ventanilla, ver todas
    if (user.rol === 'VENTANILLA' || user.rol === 'ADMINISTRADOR') {
      return true;
    }
    // Si es responsable de área, ver solo las asignadas a su dependencia
    return corr.FK_PERSONA_DESTINO === user.id;
  });

  const pendientes = correspondenciasFiltradas.filter(c => c.estadoDocumento === 'RADICADO' || c.estadoDocumento === 'ASIGNADO');
  const enProceso = correspondenciasFiltradas.filter(c => c.estadoDocumento === 'EN PROCESO');
  const finalizadas = correspondenciasFiltradas.filter(c => c.estadoDocumento === 'RESPONDIDO' || c.estadoDocumento === 'ARCHIVADO');

  const handleOpenDialog = (corr: CorrespondenciaGeneral) => {
    setSelectedCorr(corr);
    setObservaciones('');
    setMedioRespuesta('1');
    setAdjuntos([]);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedCorr) return;

    if (!observaciones.trim()) {
      toast.error('Debes escribir las observaciones de la respuesta');
      return;
    }

    const medioSeleccionado = mediosRespuesta.find(m => m.value === medioRespuesta);
    if (medioSeleccionado?.requiere_adjunto && adjuntos.length === 0) {
      toast.error(`El medio "${medioSeleccionado.label}" requiere adjuntar un documento de respuesta`);
      return;
    }

    const respuestaData = {
      respuesta: observaciones,
      medioRespuesta: medioRespuesta,
      adjuntos: adjuntos.map(file => file.name)
    };

    onResponder(selectedCorr.PK_CORRESPONDENCIA, respuestaData);
    
    toast.success('Respuesta enviada exitosamente', {
      description: `El documento ${selectedCorr.numero_radicado} ha sido respondido`
    });

    setDialogOpen(false);
    setSelectedCorr(null);
    setObservaciones('');
    setMedioRespuesta('1');
    setAdjuntos([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdjuntos(Array.from(e.target.files));
    }
  };

  const getEstadoBadge = (estado: string) => {
    const colores: Record<string, string> = {
      'RADICADO': 'bg-blue-500',
      'ASIGNADO': 'bg-orange-500',
      'EN PROCESO': 'bg-yellow-500',
      'RESPONDIDO': 'bg-green-500',
      'ARCHIVADO': 'bg-gray-500'
    };
    return colores[estado] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header con información del usuario */}
      <Card className="border-l-4 border-l-green-600 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.nombre}</h2>
                <p className="text-gray-600 mt-1">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.dependenciaNombre}</span>
                </div>
                <Badge className="mt-2 bg-green-600">
                  {user.rol === 'VENTANILLA' ? 'Ventanilla Única' : user.rol === 'ADMINISTRADOR' ? 'Administrador' : 'Responsable de Área'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 text-white rounded-lg">
                <Inbox className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Por Atender</p>
                <p className="text-3xl font-bold text-gray-900">{pendientes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 text-white rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En Proceso</p>
                <p className="text-3xl font-bold text-gray-900">{enProceso.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 text-white rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Finalizadas</p>
                <p className="text-3xl font-bold text-gray-900">{finalizadas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documentos Pendientes */}
      {pendientes.length > 0 && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Documentos Pendientes de Atención ({pendientes.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {pendientes.map((corr) => (
                <Card key={corr.PK_CORRESPONDENCIA} className="border-l-4 border-l-orange-500 hover:shadow-md transition-all">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="font-mono text-sm text-gray-600">{corr.numero_radicado}</span>
                          <Badge className={getEstadoBadge(corr.estadoDocumento)}>
                            {corr.estadoDocumento}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{corr.asunto}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            <span>De: {corr.remitenteNombre}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{corr.fecha}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => onVerDetalle(corr)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Ver
                        </Button>
                        <Button
                          onClick={() => handleOpenDialog(corr)}
                          size="sm"
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <Send className="h-4 w-4" />
                          Responder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentos en Proceso */}
      {enProceso.length > 0 && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-white border-b">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Documentos en Proceso ({enProceso.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {enProceso.map((corr) => (
                <Card key={corr.PK_CORRESPONDENCIA} className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="font-mono text-sm text-gray-600">{corr.numero_radicado}</span>
                          <Badge className={getEstadoBadge(corr.estadoDocumento)}>
                            {corr.estadoDocumento}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{corr.asunto}</h4>
                        <div className="text-sm text-gray-600">
                          <span>De: {corr.remitenteNombre} | {corr.fecha}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => onVerDetalle(corr)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Ver
                        </Button>
                        <Button
                          onClick={() => handleOpenDialog(corr)}
                          size="sm"
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <Send className="h-4 w-4" />
                          Responder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentos Finalizados */}
      {finalizadas.length > 0 && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Documentos Finalizados ({finalizadas.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              {finalizadas.slice(0, 5).map((corr) => (
                <div
                  key={corr.PK_CORRESPONDENCIA}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onVerDetalle(corr)}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{corr.asunto}</p>
                    <p className="text-xs text-gray-600 mt-1">{corr.numero_radicado}</p>
                  </div>
                  <Badge className="bg-green-600">
                    {corr.estadoDocumento}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sin documentos */}
      {correspondenciasFiltradas.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Inbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes documentos asignados
            </h3>
            <p className="text-gray-600">
              Cuando se te asigne correspondencia, aparecerá aquí.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dialog de Respuesta - COMPLETO CON TODA LA INFORMACIÓN */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-600" />
              Responder Documento - {selectedCorr?.numero_radicado}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para responder al documento de correspondencia asignado, con toda la información del documento original y campos para la respuesta.
            </DialogDescription>
          </DialogHeader>

          {selectedCorr && (
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* SECCIÓN 1: INFORMACIÓN COMPLETA DEL DOCUMENTO ORIGINAL */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader className="bg-blue-100 border-b-2 border-blue-200">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Información del Documento a Responder
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fila 1 */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-600">Número de Radicado</Label>
                      <p className="font-mono text-sm font-bold text-gray-900 bg-white p-2 rounded border border-blue-200">
                        {selectedCorr.numero_radicado}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-600">Estado Actual</Label>
                      <div>
                        <Badge className={getEstadoBadge(selectedCorr.estadoDocumento)}>
                          {selectedCorr.estadoDocumento}
                        </Badge>
                      </div>
                    </div>

                    {/* Fila 2 */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-600">Fecha de Radicación</Label>
                      <p className="text-sm text-gray-900 bg-white p-2 rounded border border-blue-200">
                        {selectedCorr.fecha} - {selectedCorr.hora}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-600">Tipo de Correspondencia</Label>
                      <p className="text-sm text-gray-900 bg-white p-2 rounded border border-blue-200">
                        {selectedCorr.tipoCorrespondencia}
                      </p>
                    </div>

                    {/* Fila 3 - Asunto (ocupa toda la fila) */}
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs font-semibold text-gray-600">Asunto del Documento</Label>
                      <p className="text-sm text-gray-900 bg-white p-3 rounded border border-blue-200">
                        {selectedCorr.asunto}
                      </p>
                    </div>

                    {/* Fila 4 - Información del Remitente */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-600">Remitente</Label>
                      <p className="text-sm text-gray-900 bg-white p-2 rounded border border-blue-200 flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        {selectedCorr.remitenteNombre}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-600">Destinatario</Label>
                      <p className="text-sm text-gray-900 bg-white p-2 rounded border border-blue-200 flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        {selectedCorr.destinoNombre}
                      </p>
                    </div>

                    {/* Fila 5 - Observaciones originales */}
                    {selectedCorr.observaciones && (
                      <div className="space-y-1 md:col-span-2">
                        <Label className="text-xs font-semibold text-gray-600">Observaciones del Radicador</Label>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded border border-blue-200 whitespace-pre-wrap">
                          {selectedCorr.observaciones}
                        </p>
                      </div>
                    )}

                    {/* Archivo Adjunto Original */}
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs font-semibold text-gray-600">Documento Adjunto Original</Label>
                      <div className="bg-white p-3 rounded border-2 border-blue-300 flex items-center gap-3">
                        <Paperclip className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">documento_original.pdf</p>
                          <p className="text-xs text-gray-500">Documento enviado desde ventanilla única</p>
                        </div>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Eye className="h-4 w-4" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SECCIÓN 2: FORMULARIO DE RESPUESTA */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader className="bg-green-100 border-b-2 border-green-200">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Send className="h-5 w-5 text-green-600" />
                    Formulario de Respuesta
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {/* Campo 1: Observaciones de la Respuesta */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Observaciones de la Respuesta *
                    </Label>
                    <Textarea
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      placeholder="Escribe aquí tu respuesta al documento. Por ejemplo: 'Se da respuesta al oficio informando que...'"
                      rows={6}
                      className="resize-none bg-white border-green-300 focus:border-green-500"
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {observaciones.length} caracteres
                      </p>
                      {observaciones.length < 10 && (
                        <p className="text-xs text-red-500">Mínimo 10 caracteres</p>
                      )}
                    </div>
                  </div>

                  {/* Campo 2: Medio de Respuesta */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Medio de Respuesta *
                    </Label>
                    <Select value={medioRespuesta} onValueChange={setMedioRespuesta}>
                      <SelectTrigger className="w-full bg-white border-green-300">
                        <SelectValue placeholder="Selecciona cómo vas a responder" />
                      </SelectTrigger>
                      <SelectContent>
                        {mediosRespuesta.map(medio => (
                          <SelectItem key={medio.value} value={medio.value}>
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{medio.label}</span>
                              <span className="text-xs text-gray-500">{medio.descripcion}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {mediosRespuesta.find(m => m.value === medioRespuesta)?.requiere_adjunto && (
                      <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Este medio requiere adjuntar un documento de respuesta
                      </p>
                    )}
                  </div>

                  {/* Campo 3: Adjuntar Documento de Respuesta */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Documento de Respuesta
                      {mediosRespuesta.find(m => m.value === medioRespuesta)?.requiere_adjunto && (
                        <span className="text-red-500"> *</span>
                      )}
                    </Label>
                    <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-white">
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="adjuntos"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Label
                        htmlFor="adjuntos"
                        className="flex flex-col items-center gap-3 cursor-pointer"
                      >
                        <div className="p-3 bg-green-100 rounded-full">
                          <Upload className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">
                            Haz clic aquí para subir archivos
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, Word, Imágenes (Max 10MB por archivo)
                          </p>
                        </div>
                      </Label>

                      {/* Lista de archivos adjuntos */}
                      {adjuntos.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Archivos seleccionados ({adjuntos.length}):
                          </p>
                          <ul className="space-y-2">
                            {adjuntos.map((file, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm p-2 bg-green-50 rounded border border-green-200">
                                <Paperclip className="h-4 w-4 text-green-600" />
                                <span className="flex-1 font-medium">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(2)} KB
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mensaje informativo */}
              <Card className="border-l-4 border-l-blue-600 bg-blue-50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Información importante:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-800">
                        <li>Al enviar la respuesta, se notificará automáticamente al remitente original</li>
                        <li>El documento quedará marcado como "RESPONDIDO" en el sistema</li>
                        <li>Tu respuesta quedará registrada con tu nombre y fecha/hora</li>
                        <li>Asegúrate de adjuntar el documento si es requerido</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Botones de acción - Fijos al final */}
          <div className="border-t pt-4 flex justify-end gap-3 bg-white">
            <Button variant="outline" onClick={() => setDialogOpen(false)} size="lg">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 gap-2"
              size="lg"
            >
              <Send className="h-4 w-4" />
              Enviar Respuesta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}