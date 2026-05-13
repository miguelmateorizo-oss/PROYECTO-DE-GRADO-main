import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  User,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Building,
  IdCard,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  ChevronRight,
  Search,
  Users,
  Briefcase,
  ChevronDown,
  Star,
  Wand2,
} from 'lucide-react';
import { toast } from 'sonner';
import { dependencias, pilares, personas } from '../data/catalogos';
import type { Persona } from '../types/correspondencia';

interface CrearPersonaModalProps {
  open: boolean;
  onClose: () => void;
  onPersonaCreada: (persona: Persona) => void;
  busquedaInicial?: string;
}

type TipoPersonaOpt = 'NATURAL' | 'JURIDICA' | 'DINAMIZADOR' | '';

const TIPO_PERSONA_OPTS: {
  value: TipoPersonaOpt;
  label: string;
  icon: React.ReactNode;
  desc: string;
  active: string;
  ring: string;
}[] = [
  {
    value: 'NATURAL',
    label: 'Natural',
    icon: <User className="h-5 w-5" />,
    desc: 'Ciudadano o funcionario',
    active: 'border-blue-500 bg-blue-50 text-blue-700',
    ring: 'ring-blue-400',
  },
  {
    value: 'JURIDICA',
    label: 'Jurídica',
    icon: <Briefcase className="h-5 w-5" />,
    desc: 'Empresa u organización',
    active: 'border-purple-500 bg-purple-50 text-purple-700',
    ring: 'ring-purple-400',
  },
  {
    value: 'DINAMIZADOR',
    label: 'Dinamizador',
    icon: <Star className="h-5 w-5" />,
    desc: 'Dinamizador del sistema',
    active: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    ring: 'ring-emerald-400',
  },
];

const TIPOS_DOCUMENTO = ['CC', 'TI', 'CE', 'PA', 'NIT', 'RC'];
const TIPOS_DOCUMENTO_JUR = ['NIT', 'CC', 'CE'];
// Natural excluye NIT (es exclusivo de Jurídica)
const TIPOS_DOCUMENTO_NAT = ['CC', 'TI', 'CE', 'PA', 'RC'];

const GENEROS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'NB', label: 'No binario' },
  { value: 'NR', label: 'Prefiero no responder' },
];

const DEPARTAMENTOS_MUNICIPIOS: Record<string, string[]> = {
  Cauca: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Caldono', 'Silvia', 'Toribío', 'Corinto'],
  Valle: ['Cali', 'Palmira', 'Buenaventura', 'Tuluá'],
  Nariño: ['Pasto', 'Tumaco', 'Ipiales'],
  Huila: ['Neiva', 'Pitalito', 'La Plata'],
};

const emptyForm = {
  TIPO_DOCUMENTO: '',
  NUMEROIDENTIFICACION: '',
  PRIMER_NOMBRE: '',
  SEGUNDO_NOMBRE: '',
  PRIMER_APELLIDO: '',
  SEGUNDO_APELLIDO: '',
  GENERO: '',
  CORREOELECTRONICO: '',
  TELEFONO: '',
  DIRECCION: '',
  DEPARTAMENTO: '',
  MUNICIPIO: '',
  CORREGIMIENTO: '',
  RESGUARDO: '',
  VEREDA: '',
  COD_DEPMUN: '',
  pilar: '',
  FK_DEPENDENCIAS: '',
};

// Convierte una Persona del catálogo a valores de formulario
function personaToForm(p: Persona) {
  const dep = dependencias.find(d => d.PK_DEPENDENCIA === p.FK_DEPENDENCIAS);
  return {
    TIPO_DOCUMENTO: p.TIPO_DOCUMENTO ?? '',
    NUMEROIDENTIFICACION: p.NUMEROIDENTIFICACION ?? '',
    PRIMER_NOMBRE: p.PRIMER_NOMBRE ?? '',
    SEGUNDO_NOMBRE: p.SEGUNDO_NOMBRE ?? '',
    PRIMER_APELLIDO: p.PRIMER_APELLIDO ?? '',
    SEGUNDO_APELLIDO: p.SEGUNDO_APELLIDO ?? '',
    GENERO: p.GENERO ?? '',
    CORREOELECTRONICO: p.CORREOELECTRONICO ?? '',
    TELEFONO: p.TELEFONO ?? '',
    DIRECCION: p.DIRECCION ?? '',
    DEPARTAMENTO: p.DEPARTAMENTO ?? '',
    MUNICIPIO: p.MUNICIPIO ?? '',
    CORREGIMIENTO: p.CORREGIMIENTO ?? '',
    RESGUARDO: p.RESGUARDO ?? '',
    VEREDA: p.VEREDA ?? '',
    COD_DEPMUN: (p as any).COD_DEPMUN ?? '',
    pilar: dep ? String(dep.FK_PILAR) : '',
    FK_DEPENDENCIAS: p.FK_DEPENDENCIAS ? String(p.FK_DEPENDENCIAS) : '',
  };
}

export function CrearPersonaModal({
  open,
  onClose,
  onPersonaCreada,
  busquedaInicial = '',
}: CrearPersonaModalProps) {
  const [tipoPersona, setTipoPersona] = useState<TipoPersonaOpt>('');
  const [form, setForm] = useState({ ...emptyForm });
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});

  // ── Buscador Dinamizador ──
  const [dinamBusqueda, setDinamBusqueda] = useState(busquedaInicial);
  const [dinamDropdownOpen, setDinamDropdownOpen] = useState(false);
  const [dinamAutocompletado, setDinamAutocompletado] = useState(false);
  const dinamRef = useRef<HTMLDivElement>(null);

  // ── Buscador Natural / Jurídica ──
  const [pasosBusqueda, setPasosBusqueda] = useState('');
  const [pasosDropdownOpen, setPasosDropdownOpen] = useState(false);
  const [pasosAutocompletado, setPasosAutocompletado] = useState(false);
  const pasosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dinamRef.current && !dinamRef.current.contains(e.target as Node)) {
        setDinamDropdownOpen(false);
      }
      if (pasosRef.current && !pasosRef.current.contains(e.target as Node)) {
        setPasosDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dinamizadoresFiltrados = dinamBusqueda.trim().length >= 1
    ? personas.filter(p => {
        const nombre = [p.PRIMER_NOMBRE, p.SEGUNDO_NOMBRE, p.PRIMER_APELLIDO, p.SEGUNDO_APELLIDO]
          .filter(Boolean).join(' ').toLowerCase();
        const busq = dinamBusqueda.toLowerCase();
        return nombre.includes(busq) || p.NUMEROIDENTIFICACION.includes(busq);
      })
    : personas;

  // Filtra personas según tipo: Jurídica → NIT, Natural → sin NIT
  const pasosFiltrados = (() => {
    const busq = pasosBusqueda.trim().toLowerCase();
    return personas.filter(p => {
      const esJuridica = p.TIPO_DOCUMENTO === 'NIT' || p.TIPO_PERSONA === 'JURIDICA';
      if (tipoPersona === 'JURIDICA' && !esJuridica) return false;
      if (tipoPersona === 'NATURAL' && esJuridica) return false;
      if (!busq) return true;
      const nombre = [p.PRIMER_NOMBRE, p.SEGUNDO_NOMBRE, p.PRIMER_APELLIDO, p.SEGUNDO_APELLIDO]
        .filter(Boolean).join(' ').toLowerCase();
      return nombre.includes(busq) || p.NUMEROIDENTIFICACION.includes(busq);
    });
  })();

  // ── Helpers ──
  const set = (field: keyof typeof emptyForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const municipiosDisponibles = form.DEPARTAMENTO
    ? DEPARTAMENTOS_MUNICIPIOS[form.DEPARTAMENTO] ?? []
    : [];

  const dependenciasFiltradas = form.pilar
    ? dependencias.filter(d => d.FK_PILAR === Number(form.pilar))
    : [];

  // ── Validación paso 1 ──
  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.TIPO_DOCUMENTO) e.TIPO_DOCUMENTO = 'Requerido';
    if (!form.NUMEROIDENTIFICACION.trim()) e.NUMEROIDENTIFICACION = 'Requerido';
    if (!form.PRIMER_NOMBRE.trim()) e.PRIMER_NOMBRE = 'Requerido';
    if (!form.PRIMER_APELLIDO.trim()) e.PRIMER_APELLIDO = 'Requerido';
    if (tipoPersona === 'NATURAL' || tipoPersona === 'DINAMIZADOR') {
      if (!form.GENERO) e.GENERO = 'Requerido';
    }
    if (!form.CORREOELECTRONICO.trim()) {
      e.CORREOELECTRONICO = 'Requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.CORREOELECTRONICO)) {
      e.CORREOELECTRONICO = 'Correo inválido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Validación paso 2 ──
  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.pilar) e.pilar = 'Requerido';
    if (!form.FK_DEPENDENCIAS) e.FK_DEPENDENCIAS = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Dinamizador: paso único que valida TODO
  const validateDinamizador = () => {
    const ok1 = validateStep1();
    if (!ok1) return false;
    return validateStep2();
  };

  const handleNext = () => { if (validateStep1()) setStep(2); };

  const handleGuardar = () => {
    const valid = tipoPersona === 'DINAMIZADOR' ? validateDinamizador() : validateStep2();
    if (!valid) return;
    buildAndSave();
  };

  const buildAndSave = () => {
    const dep = dependencias.find(d => d.PK_DEPENDENCIA === Number(form.FK_DEPENDENCIAS));
    const nuevaPersona: Persona = {
      PK_PERSONA: Date.now(),
      FK_ROL: 2,
      FK_DEPENDENCIAS: Number(form.FK_DEPENDENCIAS),
      TIPO_DOCUMENTO: form.TIPO_DOCUMENTO,
      NUMEROIDENTIFICACION: form.NUMEROIDENTIFICACION,
      PRIMER_NOMBRE: form.PRIMER_NOMBRE,
      SEGUNDO_NOMBRE: form.SEGUNDO_NOMBRE || undefined,
      PRIMER_APELLIDO: form.PRIMER_APELLIDO,
      SEGUNDO_APELLIDO: form.SEGUNDO_APELLIDO || undefined,
      GENERO: form.GENERO,
      TIPO_PERSONA: tipoPersona === 'JURIDICA' ? 'JURIDICA' : tipoPersona === 'DINAMIZADOR' ? 'DINAMIZADOR' : 'FUNCIONARIO',
      CORREOELECTRONICO: form.CORREOELECTRONICO,
      TELEFONO: form.TELEFONO || undefined,
      DIRECCION: form.DIRECCION || undefined,
      DEPARTAMENTO: form.DEPARTAMENTO || undefined,
      MUNICIPIO: form.MUNICIPIO || undefined,
      CORREGIMIENTO: form.CORREGIMIENTO || undefined,
      RESGUARDO: form.RESGUARDO || undefined,
      VEREDA: form.VEREDA || undefined,
      FECHACREADO: new Date().toISOString().split('T')[0],
      CREADOPOR: 'VENTANILLA',
      primer_nombre: form.PRIMER_NOMBRE,
      primer_apellido: form.PRIMER_APELLIDO,
      tipo_identificacion: form.TIPO_DOCUMENTO,
      numero_identificacion: form.NUMEROIDENTIFICACION,
      correo_electronico: form.CORREOELECTRONICO,
      nombreCompleto: [form.PRIMER_NOMBRE, form.SEGUNDO_NOMBRE, form.PRIMER_APELLIDO, form.SEGUNDO_APELLIDO]
        .filter(Boolean).join(' '),
    };
    toast.success(`Persona registrada: ${nuevaPersona.nombreCompleto}`, {
      description: `Área: ${dep?.nombre ?? '—'} | ${form.TIPO_DOCUMENTO} ${form.NUMEROIDENTIFICACION}`,
    });
    onPersonaCreada(nuevaPersona);
    handleClose();
  };

  // ── Seleccionar un dinamizador del buscador → autocompleta form ──
  const handleSeleccionarDinamizador = (p: Persona) => {
    setForm(personaToForm(p));
    setDinamBusqueda(p.nombreCompleto ?? '');
    setDinamDropdownOpen(false);
    setDinamAutocompletado(true);
    setErrors({});
    toast.success('Datos autocompletados — puede editarlos antes de guardar', {
      description: p.nombreCompleto,
    });
  };

  const handleLimpiarDinamizador = () => {
    setDinamAutocompletado(false);
    setDinamBusqueda('');
    setForm({ ...emptyForm });
    setErrors({});
  };

  // ── Seleccionar persona existente en Natural / Jurídica ──
  const handleSeleccionarPasos = (p: Persona) => {
    setForm(personaToForm(p));
    setPasosBusqueda(p.nombreCompleto ?? '');
    setPasosDropdownOpen(false);
    setPasosAutocompletado(true);
    setErrors({});
    toast.success('Datos autocompletados — puede editarlos antes de guardar', {
      description: p.nombreCompleto,
    });
  };

  const handleLimpiarPasos = () => {
    setPasosAutocompletado(false);
    setPasosBusqueda('');
    setForm({ ...emptyForm, TIPO_DOCUMENTO: tipoPersona === 'JURIDICA' ? 'NIT' : '' });
    setErrors({});
  };

  // ── Reset & close ──
  const handleClose = () => {
    setTipoPersona('');
    setForm({ ...emptyForm });
    setStep(1);
    setErrors({});
    setDinamBusqueda('');
    setDinamAutocompletado(false);
    setDinamDropdownOpen(false);
    setPasosBusqueda('');
    setPasosAutocompletado(false);
    setPasosDropdownOpen(false);
    onClose();
  };

  const handleTipoChange = (v: TipoPersonaOpt) => {
    setTipoPersona(v);
    // Jurídica → precarga NIT automáticamente, el usuario no lo selecciona
    setForm({ ...emptyForm, TIPO_DOCUMENTO: v === 'JURIDICA' ? 'NIT' : '' });
    setStep(1);
    setErrors({});
    setDinamBusqueda(busquedaInicial);
    setDinamAutocompletado(false);
    setPasosBusqueda('');
    setPasosAutocompletado(false);
    setPasosDropdownOpen(false);
  };

  const FieldError = ({ field }: { field: keyof typeof emptyForm }) =>
    errors[field] ? (
      <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" /> {errors[field]}
      </p>
    ) : null;

  const esPasos = tipoPersona === 'NATURAL' || tipoPersona === 'JURIDICA';
  const esDinamizador = tipoPersona === 'DINAMIZADOR';

  // ── Pilar / Área preview (shared) ──
  const pilarPreview = form.FK_DEPENDENCIAS
    ? (() => {
        const dep = dependencias.find(d => d.PK_DEPENDENCIA === Number(form.FK_DEPENDENCIAS));
        const pilarObj = pilares.find(p => p.PK_PILAR === Number(form.pilar));
        return { dep, pilarObj };
      })()
    : null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!max-w-2xl !w-[95vw] max-h-[92vh] overflow-hidden flex flex-col p-0">

        {/* ══ HEADER ══ */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b bg-gradient-to-r from-emerald-700 to-emerald-600 shrink-0">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Registrar Nueva Persona</p>
              <DialogDescription className="text-xs font-normal text-emerald-100 mt-0.5">
                Seleccione el tipo de persona para continuar con el registro
              </DialogDescription>
            </div>
            <button
              onClick={handleClose}
              className="ml-auto p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        {/* ══ SELECTOR TIPO PERSONA ══ */}
        <div className="px-6 py-4 bg-gray-50 border-b shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Tipo de persona <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-3 gap-3">
            {TIPO_PERSONA_OPTS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleTipoChange(opt.value as TipoPersonaOpt)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center ${
                  tipoPersona === opt.value
                    ? `${opt.active} shadow-md scale-[1.02]`
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tipoPersona === opt.value && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
                <div className={`p-2 rounded-lg ${tipoPersona === opt.value ? 'bg-white/60' : 'bg-gray-100'}`}>
                  {opt.icon}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{opt.label}</p>
                  <p className="text-xs leading-snug mt-0.5 opacity-75">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ══ INDICADOR PASOS (solo Natural / Jurídica) ══ */}
        {esPasos && (
          <div className="px-6 py-2.5 bg-white border-b shrink-0">
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 text-sm font-medium ${step === 1 ? 'text-emerald-700' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                  {step === 2 ? <CheckCircle2 className="h-3.5 w-3.5" /> : '1'}
                </div>
                Datos personales
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <div className={`flex items-center gap-2 text-sm font-medium ${step === 2 ? 'text-emerald-700' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                Pilar y área asignada
              </div>
            </div>
          </div>
        )}

        {/* ══ CUERPO SCROLLABLE ══ */}
        <div className="flex-1 overflow-y-auto bg-white">

          {/* Sin tipo seleccionado */}
          {!tipoPersona && (
            <div className="flex flex-col items-center justify-center h-full py-16 text-gray-400">
              <Users className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm font-medium">Seleccione el tipo de persona para continuar</p>
              <p className="text-xs mt-1 opacity-70">Elija una opción en la sección superior</p>
            </div>
          )}

          {/* ══════════════════════════════════════════
              DINAMIZADOR — buscador + formulario completo
          ══════════════════════════════════════════ */}
          {esDinamizador && (
            <div className="px-6 py-5 space-y-5">

              {/* ── Buscador inteligente ── */}
              <div ref={dinamRef} className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-emerald-600" />
                  <Label className="flex items-center gap-1">
                    Buscar Dinamizador existente <span className="text-red-500">*</span>
                  </Label>
                  {dinamAutocompletado && (
                    <Badge className="ml-auto bg-emerald-100 text-emerald-700 border border-emerald-300 gap-1">
                      <Wand2 className="h-3 w-3" /> Autocompletado
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Ingrese el nombre completo o número de identificación — todos los campos se autocompletarán
                </p>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    className={`w-full pl-9 pr-10 h-10 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                      dinamAutocompletado ? 'border-emerald-400 bg-emerald-50' : 'border-input bg-background'
                    }`}
                    placeholder='Ej: "Rosa Mestizo" o "1061234009"'
                    value={dinamBusqueda}
                    onChange={e => {
                      setDinamBusqueda(e.target.value);
                      setDinamDropdownOpen(true);
                      if (!e.target.value) handleLimpiarDinamizador();
                    }}
                    onFocus={() => setDinamDropdownOpen(true)}
                  />
                  {dinamAutocompletado ? (
                    <button
                      type="button"
                      onClick={handleLimpiarDinamizador}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                      title="Limpiar selección"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  )}
                </div>

                {/* Dropdown resultados */}
                {dinamDropdownOpen && !dinamAutocompletado && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-md border shadow-xl max-h-56 overflow-y-auto">
                    {dinamizadoresFiltrados.length === 0 ? (
                      <div className="flex items-center gap-2 px-4 py-4 text-sm text-gray-500">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        No se encontraron dinamizadores con ese criterio
                      </div>
                    ) : (
                      <>
                        <div className="sticky top-0 px-3 py-1.5 text-xs text-gray-500 bg-gray-50 border-b">
                          {dinamizadoresFiltrados.length} dinamizador(es) encontrado(s)
                          {dinamBusqueda.trim() === '' && ' — escriba para filtrar'}
                        </div>
                        {dinamizadoresFiltrados.map(p => {
                          const dep = dependencias.find(d => d.PK_DEPENDENCIA === p.FK_DEPENDENCIAS);
                          const pilar = pilares.find(pl => pl.PK_PILAR === dep?.FK_PILAR);
                          return (
                            <button
                              key={p.PK_PERSONA}
                              type="button"
                              className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors border-b last:border-0 flex items-start gap-3"
                              onClick={() => handleSeleccionarDinamizador(p)}
                            >
                              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                                {p.PRIMER_NOMBRE?.[0]}{p.PRIMER_APELLIDO?.[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-sm leading-tight">{p.nombreCompleto}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  <span className="font-medium">{p.TIPO_DOCUMENTO}</span> {p.NUMEROIDENTIFICACION}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{p.CORREOELECTRONICO}</p>
                              </div>
                              <div className="shrink-0 text-right space-y-1 max-w-[140px]">
                                {pilar && (
                                  <span className={`inline-block text-xs px-2 py-0.5 rounded font-semibold ${
                                    pilar.PK_PILAR === 1 ? 'bg-blue-100 text-blue-700' :
                                    pilar.PK_PILAR === 2 ? 'bg-purple-100 text-purple-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>{pilar.nombre}</span>
                                )}
                                {dep && <p className="text-xs text-gray-400 leading-tight">{dep.nombre}</p>}
                              </div>
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Banner autocompletado */}
              {dinamAutocompletado && (
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-300">
                  <Wand2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-emerald-800">Campos autocompletados desde el sistema</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Puede editar cualquier campo antes de guardar</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLimpiarDinamizador}
                    className="text-xs text-emerald-600 hover:text-emerald-800 underline underline-offset-2 shrink-0"
                  >
                    Limpiar
                  </button>
                </div>
              )}

              <Separator />

              {/* ── SECCIÓN: Identificación ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <IdCard className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Identificación</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">
                      Tipo de Documento <span className="text-red-500">*</span>
                    </Label>
                    <Select value={form.TIPO_DOCUMENTO} onValueChange={v => set('TIPO_DOCUMENTO', v)}>
                      <SelectTrigger className={errors.TIPO_DOCUMENTO ? 'border-red-400' : ''}>
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIPOS_DOCUMENTO.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FieldError field="TIPO_DOCUMENTO" />
                  </div>
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">
                      Número de Identificación <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={form.NUMEROIDENTIFICACION}
                      onChange={e => set('NUMEROIDENTIFICACION', e.target.value)}
                      placeholder="Ej: 1061234001"
                      className={errors.NUMEROIDENTIFICACION ? 'border-red-400' : ''}
                    />
                    <FieldError field="NUMEROIDENTIFICACION" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* ── SECCIÓN: Nombres ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Nombres y Apellidos</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Primer Nombre <span className="text-red-500">*</span></Label>
                    <Input value={form.PRIMER_NOMBRE} onChange={e => set('PRIMER_NOMBRE', e.target.value)} placeholder="Ej: Rosa" className={errors.PRIMER_NOMBRE ? 'border-red-400' : ''} />
                    <FieldError field="PRIMER_NOMBRE" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Segundo Nombre <span className="text-gray-400 text-xs">(opcional)</span></Label>
                    <Input value={form.SEGUNDO_NOMBRE} onChange={e => set('SEGUNDO_NOMBRE', e.target.value)} placeholder="Ej: Elena" />
                  </div>
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Primer Apellido <span className="text-red-500">*</span></Label>
                    <Input value={form.PRIMER_APELLIDO} onChange={e => set('PRIMER_APELLIDO', e.target.value)} placeholder="Ej: Mestizo" className={errors.PRIMER_APELLIDO ? 'border-red-400' : ''} />
                    <FieldError field="PRIMER_APELLIDO" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Segundo Apellido <span className="text-gray-400 text-xs">(opcional)</span></Label>
                    <Input value={form.SEGUNDO_APELLIDO} onChange={e => set('SEGUNDO_APELLIDO', e.target.value)} placeholder="Ej: Casamachin" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* ── SECCIÓN: Género y Contacto ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Género y Contacto</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Género <span className="text-red-500">*</span></Label>
                    <Select value={form.GENERO} onValueChange={v => set('GENERO', v)}>
                      <SelectTrigger className={errors.GENERO ? 'border-red-400' : ''}>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENEROS.map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FieldError field="GENERO" />
                  </div>
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Teléfono <span className="text-gray-400 text-xs">(opcional)</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input value={form.TELEFONO} onChange={e => set('TELEFONO', e.target.value)} placeholder="3001234567" className="pl-9" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-1.5 flex items-center gap-1">Correo Electrónico <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input value={form.CORREOELECTRONICO} onChange={e => set('CORREOELECTRONICO', e.target.value)} placeholder="nombre@aic.gov.co" type="email" className={`pl-9 ${errors.CORREOELECTRONICO ? 'border-red-400' : ''}`} />
                    </div>
                    <FieldError field="CORREOELECTRONICO" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* ── SECCIÓN: Ubicación ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Ubicación <span className="text-gray-400 font-normal normal-case text-xs">(opcional)</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 block">Departamento</Label>
                    <Select value={form.DEPARTAMENTO} onValueChange={v => { set('DEPARTAMENTO', v); set('MUNICIPIO', ''); }}>
                      <SelectTrigger><SelectValue placeholder="Seleccione departamento" /></SelectTrigger>
                      <SelectContent>
                        {Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Municipio</Label>
                    <Select value={form.MUNICIPIO} onValueChange={v => set('MUNICIPIO', v)} disabled={!form.DEPARTAMENTO}>
                      <SelectTrigger><SelectValue placeholder={form.DEPARTAMENTO ? 'Seleccione municipio' : 'Primero seleccione departamento'} /></SelectTrigger>
                      <SelectContent>
                        {municipiosDisponibles.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Dirección</Label>
                    <Input value={form.DIRECCION} onChange={e => set('DIRECCION', e.target.value)} placeholder="Calle / Carrera / Vereda..." />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Corregimiento</Label>
                    <Input value={form.CORREGIMIENTO} onChange={e => set('CORREGIMIENTO', e.target.value)} placeholder="Ej: Silvia" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Resguardo Indígena</Label>
                    <Input value={form.RESGUARDO} onChange={e => set('RESGUARDO', e.target.value)} placeholder="Ej: Nasa Kiwe" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Vereda</Label>
                    <Input value={form.VEREDA} onChange={e => set('VEREDA', e.target.value)} placeholder="Ej: El Centro" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Código DIVIPOLA (COD_DEPMUN)</Label>
                    <Input value={form.COD_DEPMUN} onChange={e => set('COD_DEPMUN', e.target.value)} placeholder="Ej: 19001" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* ── SECCIÓN: Dependencia (extra Dinamizador) ── */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Asignación Organizacional</h3>
                  <Badge className="ml-auto text-xs bg-emerald-50 text-emerald-700 border border-emerald-300">
                    <Star className="h-3 w-3 mr-1" /> Requerido para Dinamizador
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Seleccione el pilar y el área a la que pertenecerá el dinamizador en la estructura de la AIC.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Pilar <span className="text-red-500">*</span></Label>
                    <Select value={form.pilar} onValueChange={v => { set('pilar', v); set('FK_DEPENDENCIAS', ''); }}>
                      <SelectTrigger className={errors.pilar ? 'border-red-400' : ''}>
                        <SelectValue placeholder="Seleccione pilar" />
                      </SelectTrigger>
                      <SelectContent>
                        {pilares.map(p => (
                          <SelectItem key={p.PK_PILAR} value={String(p.PK_PILAR)}>
                            <div className="flex items-center gap-2">
                              <span>{p.PK_PILAR === 1 ? '⚙️' : p.PK_PILAR === 2 ? '⚖️' : '💰'}</span>
                              <span className="font-medium">{p.nombre}</span>
                              <span className="text-xs text-gray-400">— {p.descripcion}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="pilar" />
                  </div>
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Área / Dependencia <span className="text-red-500">*</span></Label>
                    <Select value={form.FK_DEPENDENCIAS} onValueChange={v => set('FK_DEPENDENCIAS', v)} disabled={!form.pilar}>
                      <SelectTrigger className={errors.FK_DEPENDENCIAS ? 'border-red-400' : ''}>
                        <SelectValue placeholder={form.pilar ? 'Seleccione área' : 'Primero seleccione un pilar'} />
                      </SelectTrigger>
                      <SelectContent>
                        {dependenciasFiltradas.map(dep => (
                          <SelectItem key={dep.PK_DEPENDENCIA} value={String(dep.PK_DEPENDENCIA)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{dep.nombre}</span>
                              <span className="text-xs text-gray-400">{dep.codigo} · Cargo: {dep.cargo}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="FK_DEPENDENCIAS" />
                  </div>

                  {/* Vista previa pilar / área / cargo */}
                  {pilarPreview && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pilar</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          pilarPreview.pilarObj?.PK_PILAR === 1 ? 'bg-blue-100 text-blue-700' :
                          pilarPreview.pilarObj?.PK_PILAR === 2 ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>{pilarPreview.pilarObj?.nombre}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Área</p>
                        <p className="text-xs font-semibold text-gray-800 leading-snug">{pilarPreview.dep?.nombre}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Cargo</p>
                        <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                          {pilarPreview.dep?.cargo}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              NATURAL / JURÍDICA — Paso 1
          ══════════════════════════════════════════ */}
          {esPasos && step === 1 && (
            <div className="px-6 py-5 space-y-5">

              {/* ── Buscador existente Natural / Jurídica ── */}
              <div ref={pasosRef} className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-blue-600" />
                  <Label className="text-sm font-semibold text-gray-700">
                    Buscar persona existente en el sistema
                  </Label>
                  {pasosAutocompletado && (
                    <Badge className="ml-auto bg-blue-100 text-blue-700 border border-blue-300 gap-1">
                      <Wand2 className="h-3 w-3" /> Autocompletado
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {tipoPersona === 'JURIDICA'
                    ? 'Busque por razón social o NIT — si ya existe se autocompletarán los campos'
                    : 'Busque por nombre o número de identificación — si ya existe se autocompletarán los campos'}
                </p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    className={`w-full pl-9 pr-10 h-10 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                      pasosAutocompletado ? 'border-blue-400 bg-blue-50' : 'border-input bg-background'
                    }`}
                    placeholder={
                      tipoPersona === 'JURIDICA'
                        ? 'Ej: "Empresa AIC S.A.S." o "900123456"'
                        : 'Ej: "Rosa Mestizo" o "1061234001"'
                    }
                    value={pasosBusqueda}
                    onChange={e => {
                      setPasosBusqueda(e.target.value);
                      setPasosDropdownOpen(true);
                      if (!e.target.value) handleLimpiarPasos();
                    }}
                    onFocus={() => setPasosDropdownOpen(true)}
                  />
                  {pasosAutocompletado ? (
                    <button
                      type="button"
                      onClick={handleLimpiarPasos}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                      title="Limpiar selección y llenar manualmente"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  )}
                </div>

                {/* Dropdown de resultados */}
                {pasosDropdownOpen && !pasosAutocompletado && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-md border shadow-xl max-h-60 overflow-y-auto">
                    {pasosFiltrados.length === 0 ? (
                      <div className="px-4 py-5">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {pasosBusqueda.trim()
                                ? `No se encontró "${pasosBusqueda}" en el sistema`
                                : 'No hay personas registradas de este tipo'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Complete los campos del formulario a continuación para registrar una nueva persona.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setPasosDropdownOpen(false); }}
                          className="mt-3 w-full text-center text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2"
                        >
                          Llenar datos manualmente →
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="sticky top-0 px-3 py-1.5 text-xs text-gray-500 bg-gray-50 border-b flex items-center justify-between">
                          <span>{pasosFiltrados.length} resultado(s){pasosBusqueda.trim() === '' && ' — escriba para filtrar'}</span>
                          <button
                            type="button"
                            onClick={() => setPasosDropdownOpen(false)}
                            className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2"
                          >
                            Llenar manualmente
                          </button>
                        </div>
                        {pasosFiltrados.map(p => {
                          const dep = dependencias.find(d => d.PK_DEPENDENCIA === p.FK_DEPENDENCIAS);
                          const pilar = pilares.find(pl => pl.PK_PILAR === dep?.FK_PILAR);
                          return (
                            <button
                              key={p.PK_PERSONA}
                              type="button"
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b last:border-0 flex items-start gap-3"
                              onClick={() => handleSeleccionarPasos(p)}
                            >
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${
                                tipoPersona === 'JURIDICA'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {p.PRIMER_NOMBRE?.[0]}{p.PRIMER_APELLIDO?.[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-sm leading-tight">{p.nombreCompleto}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  <span className="font-medium">{p.TIPO_DOCUMENTO}</span> {p.NUMEROIDENTIFICACION}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{p.CORREOELECTRONICO}</p>
                              </div>
                              {pilar && (
                                <div className="shrink-0 text-right space-y-1">
                                  <span className={`inline-block text-xs px-2 py-0.5 rounded font-semibold ${
                                    pilar.PK_PILAR === 1 ? 'bg-blue-100 text-blue-700' :
                                    pilar.PK_PILAR === 2 ? 'bg-purple-100 text-purple-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>{pilar.nombre}</span>
                                  {dep && <p className="text-xs text-gray-400 leading-tight">{dep.nombre}</p>}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Banner autocompletado */}
              {pasosAutocompletado && (
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-xl border border-blue-300">
                  <Wand2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-800">Datos encontrados y autocompletados</p>
                    <p className="text-xs text-blue-600 mt-0.5">Puede editar cualquier campo antes de continuar</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLimpiarPasos}
                    className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 shrink-0"
                  >
                    Limpiar
                  </button>
                </div>
              )}

              <Separator />

              {/* Identificación */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <IdCard className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Identificación</h3>
                  <Badge className="ml-auto text-xs" variant="outline">
                    {tipoPersona === 'JURIDICA' ? '🏢 Jurídica' : '👤 Natural'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Tipo de Documento <span className="text-red-500">*</span></Label>
                    {tipoPersona === 'JURIDICA' ? (
                      /* Jurídica: NIT fijo, asignado automáticamente — no editable */
                      <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-purple-300 bg-purple-50 cursor-not-allowed">
                        <IdCard className="h-4 w-4 text-purple-500 shrink-0" />
                        <span className="font-semibold text-purple-800 text-sm">NIT</span>
                        <span className="ml-auto text-xs text-purple-400 italic">Automático</span>
                      </div>
                    ) : (
                      /* Natural: todos los tipos excepto NIT */
                      <Select value={form.TIPO_DOCUMENTO} onValueChange={v => set('TIPO_DOCUMENTO', v)}>
                        <SelectTrigger className={errors.TIPO_DOCUMENTO ? 'border-red-400' : ''}>
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS_DOCUMENTO_NAT.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FieldError field="TIPO_DOCUMENTO" />
                  </div>
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">
                      {tipoPersona === 'JURIDICA' ? 'Número de Identificación (NIT)' : 'Número de Identificación'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={form.NUMEROIDENTIFICACION}
                      onChange={e => set('NUMEROIDENTIFICACION', e.target.value)}
                      placeholder={tipoPersona === 'JURIDICA' ? 'Ej: 900123456-7' : 'Ej: 1061234001'}
                      className={errors.NUMEROIDENTIFICACION ? 'border-red-400' : ''}
                    />
                    <FieldError field="NUMEROIDENTIFICACION" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Nombres */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    {tipoPersona === 'JURIDICA' ? 'Razón Social / Representante' : 'Nombres y Apellidos'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">
                      {tipoPersona === 'JURIDICA' ? 'Razón Social' : 'Primer Nombre'} <span className="text-red-500">*</span>
                    </Label>
                    <Input value={form.PRIMER_NOMBRE} onChange={e => set('PRIMER_NOMBRE', e.target.value)} placeholder={tipoPersona === 'JURIDICA' ? 'Ej: Empresa ABC S.A.S.' : 'Ej: Rosa'} className={errors.PRIMER_NOMBRE ? 'border-red-400' : ''} />
                    <FieldError field="PRIMER_NOMBRE" />
                  </div>
                  {tipoPersona === 'NATURAL' && (
                    <div>
                      <Label className="mb-1.5 block">Segundo Nombre <span className="text-gray-400 text-xs">(opcional)</span></Label>
                      <Input value={form.SEGUNDO_NOMBRE} onChange={e => set('SEGUNDO_NOMBRE', e.target.value)} placeholder="Ej: Elena" />
                    </div>
                  )}
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">
                      {tipoPersona === 'JURIDICA' ? 'Nombre Representante Legal' : 'Primer Apellido'} <span className="text-red-500">*</span>
                    </Label>
                    <Input value={form.PRIMER_APELLIDO} onChange={e => set('PRIMER_APELLIDO', e.target.value)} placeholder={tipoPersona === 'JURIDICA' ? 'Ej: Juan Pérez' : 'Ej: Mestizo'} className={errors.PRIMER_APELLIDO ? 'border-red-400' : ''} />
                    <FieldError field="PRIMER_APELLIDO" />
                  </div>
                  {tipoPersona === 'NATURAL' && (
                    <div>
                      <Label className="mb-1.5 block">Segundo Apellido <span className="text-gray-400 text-xs">(opcional)</span></Label>
                      <Input value={form.SEGUNDO_APELLIDO} onChange={e => set('SEGUNDO_APELLIDO', e.target.value)} placeholder="Ej: Casamachin" />
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Género y Contacto */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    {tipoPersona === 'JURIDICA' ? 'Contacto' : 'Género y Contacto'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {tipoPersona === 'NATURAL' && (
                    <div>
                      <Label className="mb-1.5 flex items-center gap-1">Género <span className="text-red-500">*</span></Label>
                      <Select value={form.GENERO} onValueChange={v => set('GENERO', v)}>
                        <SelectTrigger className={errors.GENERO ? 'border-red-400' : ''}>
                          <SelectValue placeholder="Seleccione género" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENEROS.map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FieldError field="GENERO" />
                    </div>
                  )}
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Teléfono <span className="text-gray-400 text-xs">(opcional)</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input value={form.TELEFONO} onChange={e => set('TELEFONO', e.target.value)} placeholder="3001234567" className="pl-9" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-1.5 flex items-center gap-1">Correo Electrónico <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input value={form.CORREOELECTRONICO} onChange={e => set('CORREOELECTRONICO', e.target.value)} placeholder="nombre@aic.gov.co" type="email" className={`pl-9 ${errors.CORREOELECTRONICO ? 'border-red-400' : ''}`} />
                    </div>
                    <FieldError field="CORREOELECTRONICO" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ubicación */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Ubicación <span className="text-gray-400 font-normal normal-case text-xs">(opcional)</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 block">Departamento</Label>
                    <Select value={form.DEPARTAMENTO} onValueChange={v => { set('DEPARTAMENTO', v); set('MUNICIPIO', ''); }}>
                      <SelectTrigger><SelectValue placeholder="Seleccione departamento" /></SelectTrigger>
                      <SelectContent>
                        {Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Municipio</Label>
                    <Select value={form.MUNICIPIO} onValueChange={v => set('MUNICIPIO', v)} disabled={!form.DEPARTAMENTO}>
                      <SelectTrigger><SelectValue placeholder={form.DEPARTAMENTO ? 'Seleccione municipio' : 'Primero seleccione departamento'} /></SelectTrigger>
                      <SelectContent>
                        {municipiosDisponibles.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Dirección</Label>
                    <Input value={form.DIRECCION} onChange={e => set('DIRECCION', e.target.value)} placeholder="Calle / Carrera / Vereda..." />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Corregimiento</Label>
                    <Input value={form.CORREGIMIENTO} onChange={e => set('CORREGIMIENTO', e.target.value)} placeholder="Ej: Silvia" />
                  </div>
                  {tipoPersona === 'NATURAL' && (
                    <>
                      <div>
                        <Label className="mb-1.5 block">Resguardo Indígena</Label>
                        <Input value={form.RESGUARDO} onChange={e => set('RESGUARDO', e.target.value)} placeholder="Ej: Nasa Kiwe" />
                      </div>
                      <div>
                        <Label className="mb-1.5 block">Vereda</Label>
                        <Input value={form.VEREDA} onChange={e => set('VEREDA', e.target.value)} placeholder="Ej: El Centro" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              NATURAL / JURÍDICA — Paso 2
          ══════════════════════════════════════════ */}
          {esPasos && step === 2 && (
            <div className="px-6 py-5 space-y-5">
              {/* Resumen */}
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-11 h-11 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                  {form.PRIMER_NOMBRE[0]}{form.PRIMER_APELLIDO[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {[form.PRIMER_NOMBRE, form.SEGUNDO_NOMBRE, form.PRIMER_APELLIDO, form.SEGUNDO_APELLIDO].filter(Boolean).join(' ')}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-medium">{form.TIPO_DOCUMENTO}</span> {form.NUMEROIDENTIFICACION}
                    {form.CORREOELECTRONICO && <span className="ml-2 text-gray-400">· {form.CORREOELECTRONICO}</span>}
                  </p>
                </div>
                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-300 border">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Paso 1 OK
                </Badge>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Asignación Organizacional</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Seleccione el pilar y el área a la que pertenecerá esta persona en la estructura de la AIC.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Pilar <span className="text-red-500">*</span></Label>
                    <Select value={form.pilar} onValueChange={v => { set('pilar', v); set('FK_DEPENDENCIAS', ''); }}>
                      <SelectTrigger className={errors.pilar ? 'border-red-400' : ''}>
                        <SelectValue placeholder="Seleccione pilar" />
                      </SelectTrigger>
                      <SelectContent>
                        {pilares.map(p => (
                          <SelectItem key={p.PK_PILAR} value={String(p.PK_PILAR)}>
                            <div className="flex items-center gap-2">
                              <span>{p.PK_PILAR === 1 ? '⚙️' : p.PK_PILAR === 2 ? '⚖️' : '💰'}</span>
                              <span className="font-medium">{p.nombre}</span>
                              <span className="text-xs text-gray-400">— {p.descripcion}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="pilar" />
                  </div>
                  <div>
                    <Label className="mb-1.5 flex items-center gap-1">Área / Dependencia <span className="text-red-500">*</span></Label>
                    <Select value={form.FK_DEPENDENCIAS} onValueChange={v => set('FK_DEPENDENCIAS', v)} disabled={!form.pilar}>
                      <SelectTrigger className={errors.FK_DEPENDENCIAS ? 'border-red-400' : ''}>
                        <SelectValue placeholder={form.pilar ? 'Seleccione área' : 'Primero seleccione un pilar'} />
                      </SelectTrigger>
                      <SelectContent>
                        {dependenciasFiltradas.map(dep => (
                          <SelectItem key={dep.PK_DEPENDENCIA} value={String(dep.PK_DEPENDENCIA)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{dep.nombre}</span>
                              <span className="text-xs text-gray-400">{dep.codigo} · Cargo: {dep.cargo}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="FK_DEPENDENCIAS" />
                  </div>

                  {pilarPreview && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pilar</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          pilarPreview.pilarObj?.PK_PILAR === 1 ? 'bg-blue-100 text-blue-700' :
                          pilarPreview.pilarObj?.PK_PILAR === 2 ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>{pilarPreview.pilarObj?.nombre}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Área</p>
                        <p className="text-xs font-semibold text-gray-800 leading-snug">{pilarPreview.dep?.nombre}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Cargo</p>
                        <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{pilarPreview.dep?.cargo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══ FOOTER ══ */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-400">
            {!tipoPersona && 'Seleccione el tipo de persona para continuar'}
            {esDinamizador && 'Formulario único — todos los campos en una sola vista'}
            {esPasos && (step === 1 ? 'Paso 1 de 2 — Datos personales' : 'Paso 2 de 2 — Asignación organizacional')}
          </div>
          <div className="flex items-center gap-2">
            {esPasos && step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)}>← Volver</Button>
            )}
            <Button variant="outline" onClick={handleClose}>Cancelar</Button>

            {/* Natural / Jurídica paso 1 */}
            {esPasos && step === 1 && (
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Siguiente →
              </Button>
            )}
            {/* Natural / Jurídica paso 2 */}
            {esPasos && step === 2 && (
              <Button onClick={handleGuardar} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <Save className="h-4 w-4" />
                Guardar y seleccionar
              </Button>
            )}
            {/* Dinamizador — formulario único */}
            {esDinamizador && (
              <Button onClick={handleGuardar} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <Save className="h-4 w-4" />
                Guardar y seleccionar
              </Button>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}