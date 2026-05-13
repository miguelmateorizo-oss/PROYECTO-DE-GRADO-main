import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  FileText, 
  User, 
  Building, 
  Calendar,
  Clock,
  Hash,
  Paperclip,
  Save,
  X,
  Link,
  FolderOpen
} from 'lucide-react';
import { toast } from 'sonner';

// Importar catálogos
import {
  tiposCorrespondencia,
  mediosRecepcion,
  tiposRemitente,
  tiposDocumentales,
  seriesDocumentales,
  subseriesDocumentales,
  confidencialidades,
  soportes,
  personas,
  empresas,
  dependencias,
  pilares
} from '../data/catalogos';

interface RadicacionFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function RadicacionForm({ open, onClose, onSave }: RadicacionFormProps) {
  const [tipoRemitente, setTipoRemitente] = useState<string>('');
  const [formData, setFormData] = useState({
    tipoCorrespondencia: '',
    medioRecepcion: '',
    tipoRemitente: '',
    remitentePersona: '',
    remitenteEmpresa: '',
    destinatario: '',
    pilarDestino: '',
    dependenciaDestino: '',
    asunto: '',
    numeroDocumento: '',
    tipoDocumental: '',
    serieDocumental: '',
    subserieDocumental: '',
    confidencialidad: '',
    soporte: '',
    numeroFolios: '',
    numeroAnexos: '',
    descripcionAnexos: '',
    referenciaExterna: '',
    rutaDocumentoFisico: '',
    observaciones: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.tipoCorrespondencia || !formData.asunto || !formData.destinatario) {
      toast.error('Por favor complete los campos obligatorios');
      return;
    }

    // Generar número de radicado
    const fecha = new Date();
    const year = fecha.getFullYear();
    const consecutivo = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    const numeroRadicado = `RAD-${year}-${consecutivo}`;

    const dataToSave = {
      ...formData,
      numeroRadicado,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      estado: 'RADICADO'
    };

    onSave(dataToSave);
    toast.success(`Documento radicado exitosamente: ${numeroRadicado}`);
    onClose();
    
    // Reset form
    setFormData({
      tipoCorrespondencia: '',
      medioRecepcion: '',
      tipoRemitente: '',
      remitentePersona: '',
      remitenteEmpresa: '',
      destinatario: '',
      pilarDestino: '',
      dependenciaDestino: '',
      asunto: '',
      numeroDocumento: '',
      tipoDocumental: '',
      serieDocumental: '',
      subserieDocumental: '',
      confidencialidad: '',
      soporte: '',
      numeroFolios: '',
      numeroAnexos: '',
      descripcionAnexos: '',
      referenciaExterna: '',
      rutaDocumentoFisico: '',
      observaciones: ''
    });
    setTipoRemitente('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-6 w-6" />
            Radicar Nueva Correspondencia
          </DialogTitle>
          <DialogDescription>
            Complete los campos para radicar una nueva correspondencia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información de Correspondencia */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Información de Correspondencia</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoCorrespondencia">
                    Tipo de Correspondencia <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.tipoCorrespondencia}
                    onValueChange={(value) => handleInputChange('tipoCorrespondencia', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCorrespondencia.map(tipo => (
                        <SelectItem key={tipo.PK_TIPO_CORRESPONDENCIA} value={String(tipo.PK_TIPO_CORRESPONDENCIA)}>
                          {tipo.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="medioRecepcion">Medio de Recepción</Label>
                  <Select
                    value={formData.medioRecepcion}
                    onValueChange={(value) => handleInputChange('medioRecepcion', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione medio" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediosRecepcion.map(medio => (
                        <SelectItem key={medio.PK_MEDIO_RECEPCION} value={String(medio.PK_MEDIO_RECEPCION)}>
                          {medio.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remitente */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Remitente</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tipoRemitente">Tipo de Remitente</Label>
                  <Select
                    value={formData.tipoRemitente}
                    onValueChange={(value) => {
                      handleInputChange('tipoRemitente', value);
                      setTipoRemitente(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposRemitente.map(tipo => (
                        <SelectItem key={tipo.PK_TIPO_REMITENTE} value={String(tipo.PK_TIPO_REMITENTE)}>
                          {tipo.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {tipoRemitente === '1' && (
                  <div>
                    <Label htmlFor="remitentePersona">Persona</Label>
                    <Select
                      value={formData.remitentePersona}
                      onValueChange={(value) => handleInputChange('remitentePersona', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione persona" />
                      </SelectTrigger>
                      <SelectContent>
                        {personas.map(persona => (
                          <SelectItem key={persona.PK_PERSONA} value={String(persona.PK_PERSONA)}>
                            {persona.nombreCompleto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(tipoRemitente === '2' || tipoRemitente === '3') && (
                  <div>
                    <Label htmlFor="remitenteEmpresa">Empresa/Entidad</Label>
                    <Select
                      value={formData.remitenteEmpresa}
                      onValueChange={(value) => handleInputChange('remitenteEmpresa', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        {empresas.map(empresa => (
                          <SelectItem key={empresa.PK_EMPRESA} value={String(empresa.PK_EMPRESA)}>
                            {empresa.nombre_empresa}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Destinatario */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Destinatario</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dependenciaDestino">
                    Pilar <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.pilarDestino}
                    onValueChange={(value) => {
                      handleInputChange('pilarDestino', value);
                      handleInputChange('dependenciaDestino', '');
                      handleInputChange('destinatario', '');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione pilar" />
                    </SelectTrigger>
                    <SelectContent>
                      {pilares.map(p => (
                        <SelectItem key={p.PK_PILAR} value={String(p.PK_PILAR)}>
                          {p.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    Área / Dependencia <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.dependenciaDestino}
                    onValueChange={(value) => {
                      handleInputChange('dependenciaDestino', value);
                      handleInputChange('destinatario', '');
                    }}
                    disabled={!formData.pilarDestino}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.pilarDestino ? 'Seleccione área' : 'Primero seleccione un pilar'} />
                    </SelectTrigger>
                    <SelectContent>
                      {dependencias
                        .filter(d => d.FK_PILAR === Number(formData.pilarDestino))
                        .map(dep => (
                          <SelectItem key={dep.PK_DEPENDENCIA} value={String(dep.PK_DEPENDENCIA)}>
                            {dep.nombre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="destinatario">
                    Persona Destino <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.destinatario}
                    onValueChange={(value) => handleInputChange('destinatario', value)}
                    disabled={!formData.dependenciaDestino}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.dependenciaDestino ? 'Seleccione persona' : 'Primero seleccione el área'} />
                    </SelectTrigger>
                    <SelectContent>
                      {personas
                        .filter(p => p.FK_DEPENDENCIAS === Number(formData.dependenciaDestino))
                        .map(persona => (
                          <SelectItem key={persona.PK_PERSONA} value={String(persona.PK_PERSONA)}>
                            {[persona.PRIMER_NOMBRE, persona.SEGUNDO_NOMBRE, persona.PRIMER_APELLIDO, persona.SEGUNDO_APELLIDO].filter(Boolean).join(' ')}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del Documento */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold">Información del Documento</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="asunto">
                    Asunto <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="asunto"
                    value={formData.asunto}
                    onChange={(e) => handleInputChange('asunto', e.target.value)}
                    placeholder="Describa el asunto del documento"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="numeroDocumento">Número de Documento</Label>
                    <Input
                      id="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                      placeholder="Ej: OFI-2026-001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="numeroFolios">Número de Folios</Label>
                    <Input
                      id="numeroFolios"
                      type="number"
                      value={formData.numeroFolios}
                      onChange={(e) => handleInputChange('numeroFolios', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="numeroAnexos">Número de Anexos</Label>
                    <Input
                      id="numeroAnexos"
                      type="number"
                      value={formData.numeroAnexos}
                      onChange={(e) => handleInputChange('numeroAnexos', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                {Number(formData.numeroAnexos) > 0 && (
                  <div>
                    <Label htmlFor="descripcionAnexos">Descripción de Anexos</Label>
                    <Textarea
                      id="descripcionAnexos"
                      value={formData.descripcionAnexos}
                      onChange={(e) => handleInputChange('descripcionAnexos', e.target.value)}
                      placeholder="Describa los anexos"
                      rows={2}
                    />
                  </div>
                )}

                {/* Referencia Externa y Ruta Física */}
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-3">
                    <FolderOpen className="h-4 w-4" />
                    Referencia e Identificación Física
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referenciaExterna" className="flex items-center gap-1">
                        <Link className="h-3.5 w-3.5 text-amber-600" />
                        Referencia Externa
                      </Label>
                      <Input
                        id="referenciaExterna"
                        value={formData.referenciaExterna}
                        onChange={(e) => handleInputChange('referenciaExterna', e.target.value)}
                        placeholder="Ej: Ref. Oficio 2024-001, Contrato N° 123..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Número o código de referencia del documento externo relacionado
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="rutaDocumentoFisico" className="flex items-center gap-1">
                        <FolderOpen className="h-3.5 w-3.5 text-amber-600" />
                        Ruta del Documento en Físico
                      </Label>
                      <Input
                        id="rutaDocumentoFisico"
                        value={formData.rutaDocumentoFisico}
                        onChange={(e) => handleInputChange('rutaDocumentoFisico', e.target.value)}
                        placeholder="Ej: Archivo Central / Caja 12 / Carpeta 3..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ubicación física donde reposa el documento original
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clasificación Documental */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Paperclip className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold">Clasificación Documental (TRD)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serieDocumental">Serie Documental</Label>
                  <Select
                    value={formData.serieDocumental}
                    onValueChange={(value) => handleInputChange('serieDocumental', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione serie" />
                    </SelectTrigger>
                    <SelectContent>
                      {seriesDocumentales.map(serie => (
                        <SelectItem key={serie.PK_SERIE_DOCUMENTAL} value={String(serie.PK_SERIE_DOCUMENTAL)}>
                          {serie.codigo} - {serie.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subserieDocumental">Subserie Documental</Label>
                  <Select
                    value={formData.subserieDocumental}
                    onValueChange={(value) => handleInputChange('subserieDocumental', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione subserie" />
                    </SelectTrigger>
                    <SelectContent>
                      {subseriesDocumentales
                        .filter(sub => !formData.serieDocumental || sub.FK_SERIE_DOCUMENTAL === Number(formData.serieDocumental))
                        .map(subserie => (
                          <SelectItem key={subserie.PK_SUBSERIE_DOCUMENTAL} value={String(subserie.PK_SUBSERIE_DOCUMENTAL)}>
                            {subserie.codigo} - {subserie.nombre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tipoDocumental">Tipo Documental</Label>
                  <Select
                    value={formData.tipoDocumental}
                    onValueChange={(value) => handleInputChange('tipoDocumental', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDocumentales
                        .filter(tipo => !formData.subserieDocumental || tipo.FK_SUBSERIE_DOCUMENTAL === Number(formData.subserieDocumental))
                        .map(tipo => (
                          <SelectItem key={tipo.PK_TIPO_DOCUMENTAL} value={String(tipo.PK_TIPO_DOCUMENTAL)}>
                            {tipo.codigo} - {tipo.nombre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="confidencialidad">Confidencialidad</Label>
                  <Select
                    value={formData.confidencialidad}
                    onValueChange={(value) => handleInputChange('confidencialidad', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      {confidencialidades.map(conf => (
                        <SelectItem key={conf.PK_CONFIDENCIALIDAD} value={String(conf.PK_CONFIDENCIALIDAD)}>
                          {conf.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="soporte">Soporte Documental</Label>
                  <Select
                    value={formData.soporte}
                    onValueChange={(value) => handleInputChange('soporte', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione soporte" />
                    </SelectTrigger>
                    <SelectContent>
                      {soportes.map(sop => (
                        <SelectItem key={sop.PK_SOPORTE} value={String(sop.PK_SOPORTE)}>
                          {sop.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                value={formData.observaciones}
                onChange={(e) => handleInputChange('observaciones', e.target.value)}
                placeholder="Observaciones adicionales"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Radicar Documento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}