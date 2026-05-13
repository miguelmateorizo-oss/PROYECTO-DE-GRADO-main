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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Send, 
  User, 
  MapPin, 
  Phone,
  Mail,
  Building,
  FileText,
  Upload,
  Truck,
  DollarSign,
  Shield,
  AlertCircle,
  Calendar,
  Paperclip,
  CheckCircle2,
  Link,
  FolderOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  seriesDocumentales, 
  subseriesDocumentales, 
  dependencias,
  confidencialidades,
  tiposDocumentales
} from '../data/catalogos';

interface CorrespondenciaSalidaProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const TIPOS_IDENTIFICACION = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
  { value: 'TI', label: 'Tarjeta de Identidad' }
];

const MEDIOS_ENVIO = [
  { value: 'CORREO_ELECTRONICO', label: 'Correo Electrónico' },
  { value: 'MENSAJERIA', label: 'Mensajería' },
  { value: 'CORREO_CERTIFICADO', label: 'Correo Certificado' },
  { value: 'ENTREGA_PERSONAL', label: 'Entrega Personal' },
  { value: 'OTRO', label: 'Otro' }
];

const EMPRESAS_MENSAJERIA = [
  { value: 'SERVIENTREGA', label: 'Servientrega' },
  { value: 'COORDINADORA', label: 'Coordinadora' },
  { value: 'DEPRISA', label: 'Deprisa' },
  { value: 'ENVÍA', label: 'Envía' },
  { value: 'TCC', label: 'TCC' },
  { value: 'OTRO', label: 'Otro' }
];

const ESTADOS_ENVIO = [
  { value: 'PENDIENTE', label: 'Pendiente de Envío' },
  { value: 'EN_TRANSITO', label: 'En Tránsito' },
  { value: 'ENTREGADO', label: 'Entregado' },
  { value: 'DEVUELTO', label: 'Devuelto' }
];

const PRIORIDADES = [
  { value: 'BAJA', label: 'Baja' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'ALTA', label: 'Alta' },
  { value: 'URGENTE', label: 'Urgente' }
];

const DEPARTAMENTOS_COLOMBIA = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
  'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare',
  'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo',
  'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
  'Valle del Cauca', 'Vaupés', 'Vichada'
];

export function CorrespondenciaSalida({ open, onClose, onSave }: CorrespondenciaSalidaProps) {
  const [formData, setFormData] = useState({
    // Información Básica
    fechaEnvio: new Date().toISOString().split('T')[0],
    asunto: '',
    
    // Destinatario
    destinatarioNombre: '',
    destinatarioTipoId: '',
    destinatarioNumeroId: '',
    destinatarioDireccion: '',
    destinatarioCiudad: '',
    destinatarioDepartamento: '',
    destinatarioCelular: '',
    destinatarioTelefono: '',
    destinatarioEmail: '',
    
    // Remitente
    dependenciaRemitente: '',
    funcionarioRemitente: '',
    cargoRemitente: '',
    
    // Documento
    numeroFolios: '',
    numeroAnexos: '',
    medioEnvio: '',
    prioridad: 'MEDIA',
    clasificacionSeguridad: '',
    
    // TRD
    serieDocumental: '',
    subserieDocumental: '',
    tipoDocumental: '',
    
    // Referencia y Ubicación Física
    referenciaExterna: '',
    rutaDocumentoFisico: '',
    
    // Envío
    numeroGuia: '',
    empresaMensajeria: '',
    costoEnvio: '',
    estadoEnvio: 'PENDIENTE',
    
    // Adicional
    observaciones: ''
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    setFiles(Array.from(selectedFiles));
    toast.success(`${selectedFiles.length} archivo(s) seleccionado(s)`);
  };

  const handleSubmit = () => {
    // Validaciones
    if (!formData.destinatarioNombre || !formData.destinatarioTipoId || !formData.destinatarioNumeroId) {
      toast.error('Complete la información del destinatario');
      return;
    }
    if (!formData.asunto || formData.asunto.trim().length < 10) {
      toast.error('El asunto debe tener al menos 10 caracteres');
      return;
    }
    if (!formData.dependenciaRemitente || !formData.funcionarioRemitente) {
      toast.error('Complete la información del remitente');
      return;
    }
    if (!formData.medioEnvio) {
      toast.error('Seleccione el medio de envío');
      return;
    }
    if (!formData.serieDocumental || !formData.subserieDocumental) {
      toast.error('Complete la clasificación TRD');
      return;
    }

    // Generar número de radicado
    const numeroRadicado = `SAL-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;

    const documentoSalida = {
      ...formData,
      numeroRadicado,
      tipoCorrespondencia: 'SALIDA',
      fechaRadicacion: new Date().toISOString(),
      archivos: files,
      estado: 'RADICADO'
    };

    onSave && onSave(documentoSalida);
    toast.success('Correspondencia de salida radicada exitosamente', {
      description: `Número de radicado: ${numeroRadicado}`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Send className="h-6 w-6 text-blue-600" />
            Correspondencia de Salida
          </DialogTitle>
          <DialogDescription>
            Complete la información para radicar una correspondencia de salida.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 1. INFORMACIÓN BÁSICA */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Envío *</Label>
                  <Input
                    type="date"
                    value={formData.fechaEnvio}
                    onChange={(e) => handleInputChange('fechaEnvio', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Fecha en que se envía el documento</p>
                </div>
                <div>
                  <Label>Prioridad *</Label>
                  <Select value={formData.prioridad} onValueChange={(value) => handleInputChange('prioridad', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORIDADES.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Asunto *</Label>
                <Textarea
                  value={formData.asunto}
                  onChange={(e) => handleInputChange('asunto', e.target.value)}
                  placeholder="Describa el asunto del documento (mínimo 10 caracteres)"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Debe tener al menos 10 caracteres</p>
              </div>
            </CardContent>
          </Card>

          {/* 2. INFORMACIÓN DEL DESTINATARIO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Información del Destinatario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Nombre/Razón Social *</Label>
                  <Input
                    value={formData.destinatarioNombre}
                    onChange={(e) => handleInputChange('destinatarioNombre', e.target.value)}
                    placeholder="Nombre completo o razón social del destinatario"
                  />
                </div>
                <div>
                  <Label>Tipo de Identificación *</Label>
                  <Select value={formData.destinatarioTipoId} onValueChange={(value) => handleInputChange('destinatarioTipoId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_IDENTIFICACION.map(tipo => (
                        <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Número de Identificación *</Label>
                  <Input
                    value={formData.destinatarioNumeroId}
                    onChange={(e) => handleInputChange('destinatarioNumeroId', e.target.value)}
                    placeholder="Número de documento"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Dirección *</Label>
                  <Input
                    value={formData.destinatarioDireccion}
                    onChange={(e) => handleInputChange('destinatarioDireccion', e.target.value)}
                    placeholder="Dirección completa de envío"
                  />
                </div>
                <div>
                  <Label>Departamento *</Label>
                  <Select value={formData.destinatarioDepartamento} onValueChange={(value) => handleInputChange('destinatarioDepartamento', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTAMENTOS_COLOMBIA.map(dep => (
                        <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Ciudad/Municipio *</Label>
                  <Input
                    value={formData.destinatarioCiudad}
                    onChange={(e) => handleInputChange('destinatarioCiudad', e.target.value)}
                    placeholder="Ciudad o municipio"
                  />
                </div>
                <div>
                  <Label>Celular *</Label>
                  <Input
                    value={formData.destinatarioCelular}
                    onChange={(e) => handleInputChange('destinatarioCelular', e.target.value)}
                    placeholder="3001234567"
                  />
                </div>
                <div>
                  <Label>Teléfono</Label>
                  <Input
                    value={formData.destinatarioTelefono}
                    onChange={(e) => handleInputChange('destinatarioTelefono', e.target.value)}
                    placeholder="6012345678"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Correo Electrónico *</Label>
                  <Input
                    type="email"
                    value={formData.destinatarioEmail}
                    onChange={(e) => handleInputChange('destinatarioEmail', e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. INFORMACIÓN DEL REMITENTE */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-600" />
                Información del Remitente (AIC)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Dependencia Remitente *</Label>
                  <Select value={formData.dependenciaRemitente} onValueChange={(value) => handleInputChange('dependenciaRemitente', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione dependencia" />
                    </SelectTrigger>
                    <SelectContent>
                      {dependencias && dependencias.length > 0 && dependencias.map(dep => (
                        dep && dep.PK_DEPENDENCIA && (
                          <SelectItem key={dep.PK_DEPENDENCIA} value={dep.PK_DEPENDENCIA.toString()}>
                            {dep.NOMBRE || 'Sin nombre'}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Funcionario Remitente *</Label>
                  <Input
                    value={formData.funcionarioRemitente}
                    onChange={(e) => handleInputChange('funcionarioRemitente', e.target.value)}
                    placeholder="Nombre del funcionario"
                  />
                </div>
                <div>
                  <Label>Cargo del Remitente *</Label>
                  <Input
                    value={formData.cargoRemitente}
                    onChange={(e) => handleInputChange('cargoRemitente', e.target.value)}
                    placeholder="Cargo del funcionario"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. CLASIFICACIÓN Y DOCUMENTO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                Clasificación Documental (TRD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Serie Documental *</Label>
                  <Select value={formData.serieDocumental} onValueChange={(value) => handleInputChange('serieDocumental', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione serie" />
                    </SelectTrigger>
                    <SelectContent>
                      {seriesDocumentales && seriesDocumentales.length > 0 && seriesDocumentales.map(serie => (
                        serie && serie.PK_SERIE_DOCUMENTAL && (
                          <SelectItem key={serie.PK_SERIE_DOCUMENTAL} value={serie.PK_SERIE_DOCUMENTAL.toString()}>
                            {serie.NOMBRE || 'Sin nombre'}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subserie Documental *</Label>
                  <Select value={formData.subserieDocumental} onValueChange={(value) => handleInputChange('subserieDocumental', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione subserie" />
                    </SelectTrigger>
                    <SelectContent>
                      {subseriesDocumentales && subseriesDocumentales.length > 0 && subseriesDocumentales.map(subserie => (
                        subserie && subserie.PK_SUB_SERIE_DOCUMENTAL && (
                          <SelectItem key={subserie.PK_SUB_SERIE_DOCUMENTAL} value={subserie.PK_SUB_SERIE_DOCUMENTAL.toString()}>
                            {subserie.NOMBRE || 'Sin nombre'}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo Documental *</Label>
                  <Select value={formData.tipoDocumental} onValueChange={(value) => handleInputChange('tipoDocumental', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDocumentales && tiposDocumentales.length > 0 && tiposDocumentales.map(tipo => (
                        tipo && tipo.PK_TIPO_DOCUMENTAL && (
                          <SelectItem key={tipo.PK_TIPO_DOCUMENTAL} value={tipo.PK_TIPO_DOCUMENTAL.toString()}>
                            {tipo.nombre || 'Sin nombre'}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Ejemplo: Oficio, Memorando, Circular, etc.</p>
                </div>
                <div>
                  <Label>Clasificación de Seguridad *</Label>
                  <Select value={formData.clasificacionSeguridad} onValueChange={(value) => handleInputChange('clasificacionSeguridad', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione clasificación" />
                    </SelectTrigger>
                    <SelectContent>
                      {confidencialidades && confidencialidades.length > 0 && confidencialidades.map(conf => (
                        conf && conf.PK_CONFIDENCIALIDAD && (
                          <SelectItem key={conf.PK_CONFIDENCIALIDAD} value={conf.PK_CONFIDENCIALIDAD.toString()}>
                            {conf.nombre || 'Sin nombre'}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Número de Folios *</Label>
                  <Input
                    type="number"
                    value={formData.numeroFolios}
                    onChange={(e) => handleInputChange('numeroFolios', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cantidad de hojas del documento</p>
                </div>
                <div>
                  <Label>Número de Anexos *</Label>
                  <Input
                    type="number"
                    value={formData.numeroAnexos}
                    onChange={(e) => handleInputChange('numeroAnexos', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cantidad de documentos anexos</p>
                </div>
              </div>
              <Separator />
              {/* Referencia Externa y Ruta Física */}
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-3">
                  <FolderOpen className="h-4 w-4" />
                  Referencia e Identificación Física
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-1">
                      <Link className="h-3.5 w-3.5 text-amber-600" />
                      Referencia Externa
                    </Label>
                    <Input
                      value={formData.referenciaExterna}
                      onChange={(e) => handleInputChange('referenciaExterna', e.target.value)}
                      placeholder="Ej: Ref. Oficio 2024-001, Contrato N° 123..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Número o código de referencia del documento externo relacionado
                    </p>
                  </div>
                  <div>
                    <Label className="flex items-center gap-1">
                      <FolderOpen className="h-3.5 w-3.5 text-amber-600" />
                      Ruta del Documento en Físico
                    </Label>
                    <Input
                      value={formData.rutaDocumentoFisico}
                      onChange={(e) => handleInputChange('rutaDocumentoFisico', e.target.value)}
                      placeholder="Ej: Archivo Central / Caja 12 / Carpeta 3..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ubicación física donde reposa el documento original (dependencia, caja, carpeta)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. INFORMACIÓN DE ENVÍO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5 text-cyan-600" />
                Información de Envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Medio de Envío *</Label>
                  <Select value={formData.medioEnvio} onValueChange={(value) => handleInputChange('medioEnvio', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione medio de envío" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEDIOS_ENVIO.map(medio => (
                        <SelectItem key={medio.value} value={medio.value}>{medio.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Estado del Envío *</Label>
                  <Select value={formData.estadoEnvio} onValueChange={(value) => handleInputChange('estadoEnvio', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS_ENVIO.map(estado => (
                        <SelectItem key={estado.value} value={estado.value}>{estado.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Información de Mensajería - Siempre visible */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Empresa de Mensajería</Label>
                  <Select value={formData.empresaMensajeria} onValueChange={(value) => handleInputChange('empresaMensajeria', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPRESAS_MENSAJERIA.map(empresa => (
                        <SelectItem key={empresa.value} value={empresa.value}>{empresa.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Solo si aplica mensajería</p>
                </div>
                <div>
                  <Label>Número de Guía de Envío</Label>
                  <Input
                    value={formData.numeroGuia}
                    onChange={(e) => handleInputChange('numeroGuia', e.target.value)}
                    placeholder="Ej: 123456789"
                  />
                  <p className="text-xs text-gray-500 mt-1">Número de rastreo de la mensajería</p>
                </div>
                <div>
                  <Label>Costo de Envío</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      type="number"
                      value={formData.costoEnvio}
                      onChange={(e) => handleInputChange('costoEnvio', e.target.value)}
                      placeholder="0"
                      className="pl-10"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Valor en pesos colombianos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. ARCHIVO ADJUNTO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5 text-indigo-600" />
                Archivo Digital Adjunto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-indigo-600 hover:text-indigo-700 font-medium">Seleccionar archivos</span>
                  <span className="text-gray-600"> o arrastrar aquí</span>
                </Label>
                <p className="text-xs text-gray-500 mt-2">PDF, Word, Excel, imágenes (Máx. 10MB por archivo)</p>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                {files.length > 0 && (
                  <div className="mt-4">
                    <Badge className="bg-green-500">{files.length} archivo(s) seleccionado(s)</Badge>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-center gap-2">
                          <Paperclip className="h-3 w-3" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 7. OBSERVACIONES */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                Observaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.observaciones}
                onChange={(e) => handleInputChange('observaciones', e.target.value)}
                placeholder="Observaciones adicionales sobre el documento o envío (opcional)"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">Agregue cualquier información adicional relevante para el envío</p>
            </CardContent>
          </Card>

          {/* RESUMEN Y BOTONES */}
          <Card className="bg-green-50 border-2 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900">Revisión Final</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Verifique que toda la información sea correcta antes de radicar la correspondencia de salida.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Radicar Correspondencia de Salida
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}