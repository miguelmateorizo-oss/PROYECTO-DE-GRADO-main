import { useState, useRef, useEffect } from 'react';
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
  FileText, 
  User, 
  Building, 
  Upload,
  Save,
  X,
  Paperclip,
  Shield,
  Calendar,
  Hash,
  Trash2,
  Link,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  ChevronDown,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';
import { CrearPersonaModal } from './CrearPersonaModal';
import type { Persona } from '../types/correspondencia';

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

interface RadicacionFormWizardProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function RadicacionFormWizard({ open, onClose, onSave }: RadicacionFormWizardProps) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [formData, setFormData] = useState({
    tipoCorrespondencia: '',
    medioRecepcion: '',
    fechaRecepcion: new Date().toISOString().split('T')[0],
    tipoRemitente: '',
    remitentePersona: '',
    remitenteEmpresa: '',
    destinatario: '',
    pilarDestino: '',
    dependenciaDestino: '',
    asunto: '',
    numeroDocumento: '',
    numeroFolios: '',
    numeroAnexos: '',
    descripcionAnexos: '',
    observaciones: '',
    referenciaExterna: '',
    rutaDocumentoFisico: '',
    fechaVencimiento: '',
    tipoDocumental: '',
    serieDocumental: '',
    subserieDocumental: '',
    confidencialidad: '',
    soporte: '',
  });

  // ── Estado del buscador de destinatario ──
  const [personaBusqueda, setPersonaBusqueda] = useState('');
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const personaSearchRef = useRef<HTMLDivElement>(null);

  // ── Estado del modal de crear persona ──
  const [crearPersonaOpen, setCrearPersonaOpen] = useState(false);
  const [personasLocales, setPersonasLocales] = useState<Persona[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (personaSearchRef.current && !personaSearchRef.current.contains(e.target as Node)) {
        setPersonaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const personasFiltradas = personaBusqueda.trim().length >= 1
    ? [...personas, ...personasLocales].filter(p => {
        const nombre = [p.PRIMER_NOMBRE, p.SEGUNDO_NOMBRE, p.PRIMER_APELLIDO, p.SEGUNDO_APELLIDO]
          .filter(Boolean).join(' ').toLowerCase();
        const busq = personaBusqueda.toLowerCase();
        return nombre.includes(busq) || p.NUMEROIDENTIFICACION.includes(busq) || (p.CORREOELECTRONICO ?? '').toLowerCase().includes(busq);
      })
    : [...personas, ...personasLocales];

  const handleSelectDestinatario = (persona: typeof personas[0]) => {
    const dep = dependencias.find(d => d.PK_DEPENDENCIA === persona.FK_DEPENDENCIAS);
    setFormData(prev => ({
      ...prev,
      destinatario: String(persona.PK_PERSONA),
      dependenciaDestino: dep ? String(dep.PK_DEPENDENCIA) : '',
      pilarDestino: dep ? String(dep.FK_PILAR) : '',
    }));
    setPersonaBusqueda(
      [persona.PRIMER_NOMBRE, persona.SEGUNDO_NOMBRE, persona.PRIMER_APELLIDO, persona.SEGUNDO_APELLIDO]
        .filter(Boolean).join(' ')
    );
    setPersonaDropdownOpen(false);
  };

  const handleLimpiarDestinatario = () => {
    setFormData(prev => ({ ...prev, destinatario: '', dependenciaDestino: '', pilarDestino: '' }));
    setPersonaBusqueda('');
  };

  const handlePersonaCreada = (persona: Persona) => {
    setPersonasLocales(prev => [...prev, persona]);
    handleSelectDestinatario(persona);
    toast.success('Persona registrada y seleccionada como destinataria');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const newFiles: FileUpload[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${selectedFiles.length} archivo(s) agregado(s)`);
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.info('Archivo removido');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const resetForm = () => {
    setFiles([]);
    setPersonaBusqueda('');
    setPersonaDropdownOpen(false);
    setFormData({
      tipoCorrespondencia: '',
      medioRecepcion: '',
      fechaRecepcion: new Date().toISOString().split('T')[0],
      tipoRemitente: '',
      remitentePersona: '',
      remitenteEmpresa: '',
      destinatario: '',
      pilarDestino: '',
      dependenciaDestino: '',
      asunto: '',
      numeroDocumento: '',
      numeroFolios: '',
      numeroAnexos: '',
      descripcionAnexos: '',
      observaciones: '',
      referenciaExterna: '',
      rutaDocumentoFisico: '',
      fechaVencimiento: '',
      tipoDocumental: '',
      serieDocumental: '',
      subserieDocumental: '',
      confidencialidad: '',
      soporte: '',
    });
  };

  const handleSubmit = () => {
    // Validaciones
    if (!formData.tipoCorrespondencia || !formData.medioRecepcion) {
      toast.error('Seleccione el tipo de correspondencia y el medio de recepción');
      return;
    }
    if (!formData.tipoRemitente) {
      toast.error('Seleccione el tipo de remitente');
      return;
    }
    if (formData.tipoRemitente === '1' && !formData.remitentePersona) {
      toast.error('Seleccione la persona remitente');
      return;
    }
    if ((formData.tipoRemitente === '2' || formData.tipoRemitente === '3') && !formData.remitenteEmpresa) {
      toast.error('Seleccione la empresa o entidad remitente');
      return;
    }
    if (!formData.destinatario || !formData.dependenciaDestino) {
      toast.error('Seleccione el destinatario y la dependencia');
      return;
    }
    if (!formData.asunto || formData.asunto.trim().length < 10) {
      toast.error('El asunto debe tener al menos 10 caracteres');
      return;
    }
    if (!formData.serieDocumental || !formData.subserieDocumental || !formData.tipoDocumental) {
      toast.error('Complete la clasificación TRD (Serie, Subserie y Tipo Documental)');
      return;
    }

    const fecha = new Date();
    const year = fecha.getFullYear();
    const consecutivo = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    const numeroRadicado = `RAD-${year}-${consecutivo}`;

    const dataToSave = {
      ...formData,
      numeroRadicado,
      fecha: formData.fechaRecepcion,
      hora: fecha.toTimeString().split(' ')[0],
      estado: 'RADICADO',
      archivos: files
    };

    onSave(dataToSave);
    toast.success(`Documento radicado exitosamente: ${numeroRadicado}`, {
      description: 'El documento ha sido registrado en el sistema'
    });
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    const hasData = Object.entries(formData).some(([key, val]) =>
      key !== 'fechaRecepcion' && val !== ''
    );
    if (hasData || files.length > 0) {
      if (window.confirm('¿Está seguro que desea cancelar? Se perderán los datos ingresados.')) {
        resetForm();
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <>
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="!max-w-[96vw] !w-[96vw] max-h-[95vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-green-700 to-green-600">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Registrar Nuevo Documento</div>
              <div className="text-sm font-normal text-green-100 mt-0.5">
                Complete todos los campos para radicar el documento en el sistema SIGECOR
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario paso a paso para registrar un nuevo documento de correspondencia en el sistema SIGECOR con todos los campos requeridos por la Ley 594 del 2000.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-gray-50">

          {/* ── SECCIÓN 1: INFORMACIÓN BÁSICA ── */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 bg-blue-50 rounded-t-lg border-b border-blue-100">
              <CardTitle className="text-base flex items-center gap-2 text-blue-800">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                <Hash className="h-4 w-4" />
                Información Básica de la Correspondencia
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-5 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    Tipo de Correspondencia <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.tipoCorrespondencia}
                    onValueChange={(v) => handleInputChange('tipoCorrespondencia', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCorrespondencia.map(tipo => (
                        <SelectItem key={tipo.PK_TIPO_CORRESPONDENCIA} value={String(tipo.PK_TIPO_CORRESPONDENCIA)}>
                          <div className="flex items-center gap-2">
                            {tipo.codigo === 'ENT' && <span>📥</span>}
                            {tipo.codigo === 'SAL' && <span>📤</span>}
                            {tipo.codigo === 'INT' && <span>🔄</span>}
                            {tipo.descripcion}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    Medio de Recepción <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.medioRecepcion}
                    onValueChange={(v) => handleInputChange('medioRecepcion', v)}
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

                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Fecha de Recepción
                  </Label>
                  <Input
                    type="date"
                    value={formData.fechaRecepcion}
                    onChange={(e) => handleInputChange('fechaRecepcion', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── SECCIÓN 2: REMITENTE ── */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 bg-green-50 rounded-t-lg border-b border-green-100">
              <CardTitle className="text-base flex items-center gap-2 text-green-800">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                <User className="h-4 w-4" />
                ¿Quién envía el documento? — Remitente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-5 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    Tipo de Remitente <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.tipoRemitente}
                    onValueChange={(v) => {
                      handleInputChange('tipoRemitente', v);
                      handleInputChange('remitentePersona', '');
                      handleInputChange('remitenteEmpresa', '');
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

                {formData.tipoRemitente === '1' && (
                  <div className="md:col-span-2">
                    <Label className="flex items-center gap-1 mb-1.5">
                      Persona Remitente <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.remitentePersona}
                      onValueChange={(v) => handleInputChange('remitentePersona', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione persona" />
                      </SelectTrigger>
                      <SelectContent>
                        {personas.map(persona => (
                          <SelectItem key={persona.PK_PERSONA} value={String(persona.PK_PERSONA)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{persona.nombreCompleto}</span>
                              <span className="text-xs text-gray-500">{persona.numero_identificacion}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(formData.tipoRemitente === '2' || formData.tipoRemitente === '3') && (
                  <div className="md:col-span-2">
                    <Label className="flex items-center gap-1 mb-1.5">
                      Empresa / Entidad Remitente <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.remitenteEmpresa}
                      onValueChange={(v) => handleInputChange('remitenteEmpresa', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        {empresas.map(empresa => (
                          <SelectItem key={empresa.PK_EMPRESA} value={String(empresa.PK_EMPRESA)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{empresa.nombre_empresa}</span>
                              <span className="text-xs text-gray-500">NIT: {empresa.nit}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {!formData.tipoRemitente && (
                  <div className="md:col-span-2 flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    Seleccione primero el tipo de remitente para ver las opciones disponibles
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ── SECCIÓN 3: DESTINATARIO ── */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 bg-purple-50 rounded-t-lg border-b border-purple-100">
              <CardTitle className="text-base flex items-center gap-2 text-purple-800">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                <Building className="h-4 w-4" />
                ¿Para quién es? — Destinatario
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-5 pb-5 space-y-4">

              {/* ── BUSCADOR DE PERSONA ── */}
              <div ref={personaSearchRef} className="relative">
                <div className="flex items-end justify-between mb-1">
                  <Label className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-purple-600" />
                    Buscar Persona Destinataria <span className="text-red-500">*</span>
                  </Label>
                  {/* ── Botón Registrar nueva persona ── */}
                  <button
                    type="button"
                    onClick={() => {
                      setPersonaDropdownOpen(false);
                      setCrearPersonaOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 hover:border-emerald-400 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    + Registrar nueva persona
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Escriba el nombre, apellido o número de identificación — Pilar, Área y Cargo se autocompletarán
                </p>

                {/* Input de búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-10 h-10 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder='Ej: "Rosa Mestizo"  o  "1061234009"  o  "diana..."'
                    value={personaBusqueda}
                    onChange={(e) => {
                      setPersonaBusqueda(e.target.value);
                      setPersonaDropdownOpen(true);
                      if (!e.target.value) handleLimpiarDestinatario();
                    }}
                    onFocus={() => setPersonaDropdownOpen(true)}
                  />
                  {formData.destinatario ? (
                    <button
                      type="button"
                      onClick={handleLimpiarDestinatario}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                      title="Limpiar selección"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  )}
                </div>

                {/* Dropdown de resultados */}
                {personaDropdownOpen && !formData.destinatario && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-md border shadow-xl max-h-72 overflow-y-auto">
                    {personasFiltradas.length === 0 ? (
                      <div className="flex flex-col gap-3 px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                          No se encontraron personas con ese criterio
                        </div>
                        <button
                          type="button"
                          onClick={() => { setPersonaDropdownOpen(false); setCrearPersonaOpen(true); }}
                          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-2.5 rounded-md transition-colors"
                        >
                          <UserPlus className="h-4 w-4" />
                          Registrar "{personaBusqueda}" como nueva persona
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="sticky top-0 px-3 py-1.5 text-xs text-gray-500 bg-gray-50 border-b">
                          {personasFiltradas.length} persona(s) encontrada(s)
                          {personaBusqueda.trim() === '' && ' — escriba para filtrar'}
                        </div>
                        {personasFiltradas.map(persona => {
                          const dep = dependencias.find(d => d.PK_DEPENDENCIA === persona.FK_DEPENDENCIAS);
                          const pilar = pilares.find(p => p.PK_PILAR === dep?.FK_PILAR);
                          const nombreCompleto = [persona.PRIMER_NOMBRE, persona.SEGUNDO_NOMBRE, persona.PRIMER_APELLIDO, persona.SEGUNDO_APELLIDO]
                            .filter(Boolean).join(' ');
                          return (
                            <button
                              key={persona.PK_PERSONA}
                              type="button"
                              className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors border-b last:border-0 flex items-start gap-3"
                              onClick={() => handleSelectDestinatario(persona)}
                            >
                              {/* Avatar */}
                              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                                {persona.PRIMER_NOMBRE?.[0]}{persona.PRIMER_APELLIDO?.[0]}
                              </div>
                              {/* Info principal */}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-sm leading-tight">{nombreCompleto}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  <span className="font-medium">{persona.TIPO_DOCUMENTO}</span>{' '}
                                  {persona.NUMEROIDENTIFICACION}
                                </p>
                                <p className="text-xs text-gray-400 truncate mt-0.5">{persona.CORREOELECTRONICO}</p>
                              </div>
                              {/* Badge pilar + área */}
                              <div className="shrink-0 text-right space-y-1 max-w-[150px]">
                                {pilar && (
                                  <span className={`inline-block text-xs px-2 py-0.5 rounded font-semibold ${
                                    pilar.PK_PILAR === 1 ? 'bg-blue-100 text-blue-700' :
                                    pilar.PK_PILAR === 2 ? 'bg-purple-100 text-purple-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {pilar.nombre}
                                  </span>
                                )}
                                {dep && (
                                  <p className="text-xs text-gray-400 leading-tight">{dep.nombre}</p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* ── PANEL DE AUTOCOMPLETADO (visible al seleccionar) ── */}
              {formData.destinatario && (() => {
                const dep = dependencias.find(d => d.PK_DEPENDENCIA === Number(formData.dependenciaDestino));
                const pilar = pilares.find(p => p.PK_PILAR === Number(formData.pilarDestino));
                const persona = personas.find(p => p.PK_PERSONA === Number(formData.destinatario));
                const nombreCompleto = [persona?.PRIMER_NOMBRE, persona?.SEGUNDO_NOMBRE, persona?.PRIMER_APELLIDO, persona?.SEGUNDO_APELLIDO]
                  .filter(Boolean).join(' ');
                return (
                  <div className="rounded-xl border border-purple-200 overflow-hidden">
                    {/* Cabecera del panel */}
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-purple-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                        <span className="text-sm font-semibold text-white">Destinatario confirmado — datos autocompletados</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleLimpiarDestinatario}
                        className="text-purple-200 hover:text-white text-xs underline underline-offset-2"
                      >
                        Cambiar
                      </button>
                    </div>

                    <div className="p-4 bg-purple-50 space-y-3">
                      {/* Tarjeta de persona */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-100 shadow-sm">
                        <div className="w-11 h-11 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold shrink-0">
                          {persona?.PRIMER_NOMBRE?.[0]}{persona?.PRIMER_APELLIDO?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{nombreCompleto}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            <span className="font-medium">{persona?.TIPO_DOCUMENTO}</span>{' '}
                            {persona?.NUMEROIDENTIFICACION}
                          </p>
                          <p className="text-xs text-gray-400 truncate">{persona?.CORREOELECTRONICO}</p>
                        </div>
                        <User className="h-5 w-5 text-purple-300 shrink-0" />
                      </div>

                      {/* Jerarquía en 3 celdas */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* Pilar */}
                        <div className="bg-white rounded-lg border border-purple-100 p-3">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Pilar</p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-base leading-none">
                              {pilar?.PK_PILAR === 1 ? '⚙️' : pilar?.PK_PILAR === 2 ? '⚖️' : '💰'}
                            </span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              pilar?.PK_PILAR === 1 ? 'bg-blue-100 text-blue-700' :
                              pilar?.PK_PILAR === 2 ? 'bg-purple-100 text-purple-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {pilar?.nombre ?? '—'}
                            </span>
                          </div>
                        </div>

                        {/* Área */}
                        <div className="bg-white rounded-lg border border-purple-100 p-3">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Área / Dependencia</p>
                          <p className="text-xs font-semibold text-gray-800 leading-snug">{dep?.nombre ?? '—'}</p>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">{dep?.codigo}</p>
                        </div>

                        {/* Cargo */}
                        <div className="bg-white rounded-lg border border-purple-100 p-3">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Cargo</p>
                          <span className="inline-block text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {dep?.cargo ?? '—'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

            </CardContent>
          </Card>

          {/* ── SECCIÓN 4: INFORMACIÓN DEL DOCUMENTO ── */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 bg-orange-50 rounded-t-lg border-b border-orange-100">
              <CardTitle className="text-base flex items-center gap-2 text-orange-800">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">4</div>
                <FileText className="h-4 w-4" />
                Información del Documento
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-5 pb-5 space-y-4">
              {/* Asunto */}
              <div>
                <Label className="flex items-center gap-1 mb-1.5">
                  Asunto <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.asunto}
                  onChange={(e) => handleInputChange('asunto', e.target.value)}
                  placeholder="Describa el asunto del documento (mínimo 10 caracteres)"
                  rows={3}
                />
                <p className="text-xs text-gray-400 mt-1">{formData.asunto.length} caracteres ingresados</p>
              </div>

              {/* Número doc, folios, anexos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 block">Número de Documento</Label>
                  <Input
                    value={formData.numeroDocumento}
                    onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                    placeholder="Ej: OFI-2026-001"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Número de Folios</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.numeroFolios}
                    onChange={(e) => handleInputChange('numeroFolios', e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-400 mt-1">Cantidad de hojas del documento</p>
                </div>
                <div>
                  <Label className="mb-1.5 block">Número de Anexos</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.numeroAnexos}
                    onChange={(e) => handleInputChange('numeroAnexos', e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-400 mt-1">Cantidad de documentos anexos</p>
                </div>
              </div>

              {/* Descripción de Anexos — condicional */}
              {Number(formData.numeroAnexos) > 0 && (
                <div>
                  <Label className="mb-1.5 block">Descripción de Anexos</Label>
                  <Textarea
                    value={formData.descripcionAnexos}
                    onChange={(e) => handleInputChange('descripcionAnexos', e.target.value)}
                    placeholder="Describa los anexos incluidos"
                    rows={2}
                  />
                </div>
              )}

              {/* Fecha vencimiento y Observaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Fecha de Vencimiento <span className="text-gray-400 text-xs">(opcional)</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.fechaVencimiento}
                    onChange={(e) => handleInputChange('fechaVencimiento', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Observaciones</Label>
                  <Textarea
                    value={formData.observaciones}
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
                    placeholder="Observaciones adicionales sobre el documento"
                    rows={2}
                  />
                </div>
              </div>

              <Separator />

              {/* Referencia e Identificación Física */}
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-3">
                  <FolderOpen className="h-4 w-4" />
                  Referencia e Identificación Física
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-1 mb-1.5">
                      <Link className="h-3.5 w-3.5 text-amber-600" />
                      Referencia Externa
                    </Label>
                    <Input
                      value={formData.referenciaExterna}
                      onChange={(e) => handleInputChange('referenciaExterna', e.target.value)}
                      placeholder="Ej: Ref. Oficio 2024-001, Contrato N° 123..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Número o código del documento externo relacionado
                    </p>
                  </div>
                  <div>
                    <Label className="flex items-center gap-1 mb-1.5">
                      <FolderOpen className="h-3.5 w-3.5 text-amber-600" />
                      Ruta del Documento en Físico
                    </Label>
                    <Input
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
            </CardContent>
          </Card>

          {/* ── SECCIÓN 5: CLASIFICACIÓN DOCUMENTAL TRD ── */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 bg-indigo-50 rounded-t-lg border-b border-indigo-100">
              <CardTitle className="text-base flex items-center gap-2 text-indigo-800">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">5</div>
                <Shield className="h-4 w-4" />
                Clasificación Documental — TRD
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-5 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    Serie Documental <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.serieDocumental}
                    onValueChange={(v) => {
                      handleInputChange('serieDocumental', v);
                      handleInputChange('subserieDocumental', '');
                      handleInputChange('tipoDocumental', '');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione serie" />
                    </SelectTrigger>
                    <SelectContent>
                      {seriesDocumentales.map(serie => (
                        <SelectItem key={serie.PK_SERIE_DOCUMENTAL} value={String(serie.PK_SERIE_DOCUMENTAL)}>
                          <div className="flex flex-col">
                            <span className="font-medium">{serie.nombre}</span>
                            <span className="text-xs text-gray-500">{serie.codigo}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    Subserie Documental <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.subserieDocumental}
                    onValueChange={(v) => {
                      handleInputChange('subserieDocumental', v);
                      handleInputChange('tipoDocumental', '');
                    }}
                    disabled={!formData.serieDocumental}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.serieDocumental ? 'Seleccione subserie' : 'Primero seleccione una serie'} />
                    </SelectTrigger>
                    <SelectContent>
                      {subseriesDocumentales
                        .filter(sub => sub.FK_SERIE_DOCUMENTAL === Number(formData.serieDocumental))
                        .map(subserie => (
                          <SelectItem key={subserie.PK_SUBSERIE_DOCUMENTAL} value={String(subserie.PK_SUBSERIE_DOCUMENTAL)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{subserie.nombre}</span>
                              <span className="text-xs text-gray-500">{subserie.codigo}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-1 mb-1.5">
                    Tipo Documental <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.tipoDocumental}
                    onValueChange={(v) => handleInputChange('tipoDocumental', v)}
                    disabled={!formData.subserieDocumental}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.subserieDocumental ? 'Seleccione tipo' : 'Primero seleccione una subserie'} />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDocumentales
                        .filter(tipo => tipo.FK_SUBSERIE_DOCUMENTAL === Number(formData.subserieDocumental))
                        .map(tipo => (
                          <SelectItem key={tipo.PK_TIPO_DOCUMENTAL} value={String(tipo.PK_TIPO_DOCUMENTAL)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{tipo.nombre}</span>
                              <span className="text-xs text-gray-500">{tipo.codigo}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-1">Ej: Oficio, Memorando, Circular, Resolución…</p>
                </div>

                <div>
                  <Label className="mb-1.5 block">Confidencialidad</Label>
                  <Select
                    value={formData.confidencialidad}
                    onValueChange={(v) => handleInputChange('confidencialidad', v)}
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

                <div className="md:col-span-2">
                  <Label className="mb-1.5 block">Soporte Documental</Label>
                  <Select
                    value={formData.soporte}
                    onValueChange={(v) => handleInputChange('soporte', v)}
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

          {/* ── SECCIÓN 6: CARGA DE ARCHIVOS ── */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 bg-teal-50 rounded-t-lg border-b border-teal-100">
              <CardTitle className="text-base flex items-center gap-2 text-teal-800">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">6</div>
                <Upload className="h-4 w-4" />
                Adjuntar Archivos Digitales
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-5 pb-5">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <span className="text-teal-600 font-semibold hover:text-teal-700">
                    Haga clic para seleccionar archivos
                  </span>
                  <span className="text-gray-500"> o arrastre aquí</span>
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  PDF, Word, Excel, Imágenes — Máx. 10 MB por archivo
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Archivos cargados ({files.length})
                    </span>
                    <Badge variant="outline" className="text-teal-700 border-teal-300">
                      {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))} total
                    </Badge>
                  </div>
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {files.length === 0 && (
                <p className="text-xs text-amber-600 mt-3 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Se recomienda adjuntar al menos el documento principal digitalizado
                </p>
              )}
            </CardContent>
          </Card>

          {/* ── AVISO NORMATIVO ── */}
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">Cumplimiento Normativo — Ley 594 de 2000 / Acuerdo 001-2024</p>
              <p className="text-green-700 text-xs">
                Al radicar este documento, certifica que la información es verídica y que el registro cumple con los 
                lineamientos de gestión documental de la Asociación Indígena del Cauca (AIC). 
                El sistema generará automáticamente el número de radicado, registrará la fecha/hora exacta y 
                notificará al destinatario asignado.
              </p>
            </div>
          </div>

        </div>

        {/* ── FOOTER CON BOTONES ── */}
        <div className="flex justify-between items-center px-6 py-4 border-t bg-white">
          <Button variant="outline" onClick={handleCancel} className="gap-2">
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="gap-2 bg-green-600 hover:bg-green-700 text-white px-6"
          >
            <Save className="h-4 w-4" />
            Radicar Documento
          </Button>
        </div>
      </DialogContent>
    </Dialog>

      {/* ── Modal de Crear Persona ── */}
      <CrearPersonaModal
        open={crearPersonaOpen}
        onClose={() => setCrearPersonaOpen(false)}
        onPersonaCreada={handlePersonaCreada}
        busquedaInicial={personaBusqueda}
      />
    </>
  );
}