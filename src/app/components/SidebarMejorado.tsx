import { 
  Home, 
  Inbox, 
  Send, 
  FileText,
  Users,
  Building,
  Archive,
  BarChart3,
  Settings,
  Shield,
  Clock,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  Plus,
  HelpCircle,
  ArrowDown,
  ArrowUp,
  RefreshCw,
  UserCircle,
  Building2,
  List
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewRadicacion: () => void;
  stats: {
    total: number;
    entrada: number;
    salida: number;
    pendientes: number;
    vencidos: number;
  };
}

export function SidebarMejorado({ activeTab, onTabChange, onNewRadicacion, stats }: SidebarProps) {
  const menuSections = [
    {
      title: 'INICIO',
      color: 'text-blue-600',
      items: [
        { 
          id: 'dashboard', 
          icon: Home, 
          label: 'Mi Escritorio', 
          badge: null,
          description: 'Ver resumen general',
          tooltip: 'Aquí encontrarás un resumen de toda tu correspondencia y estadísticas importantes'
        },
        { 
          id: 'mibandeja', 
          icon: Inbox, 
          label: 'Mi Bandeja Personal', 
          badge: stats.pendientes,
          description: 'Mis documentos asignados',
          tooltip: 'Documentos asignados específicamente a mí para revisar y responder',
          highlight: stats.pendientes > 0,
          iconColor: 'text-blue-600'
        },
      ]
    },
    {
      title: 'CORRESPONDENCIA RECIBIDA Y ENVIADA',
      color: 'text-green-600',
      items: [
        { 
          id: 'entrada', 
          icon: ArrowDown, 
          label: 'Documentos Recibidos', 
          badge: stats.entrada,
          description: 'Correos y oficios que llegan',
          tooltip: 'Todos los documentos que han llegado a la institución (correos, oficios, comunicaciones)',
          iconColor: 'text-green-600'
        },
        { 
          id: 'salida', 
          icon: ArrowUp, 
          label: 'Documentos Enviados', 
          badge: stats.salida,
          description: 'Documentos que se envían',
          tooltip: 'Documentos que la institución envía hacia afuera (respuestas, oficios salientes)',
          iconColor: 'text-blue-600'
        },
        { 
          id: 'interna', 
          icon: RefreshCw, 
          label: 'Comunicación Interna', 
          badge: null,
          description: 'Entre áreas de la institución',
          tooltip: 'Documentos que circulan entre las diferentes áreas de la institución',
          iconColor: 'text-purple-600'
        },
      ]
    },
    {
      title: 'MIS TAREAS Y PENDIENTES',
      color: 'text-orange-600',
      items: [
        { 
          id: 'pendientes', 
          icon: Clock, 
          label: 'Por Revisar', 
          badge: stats.pendientes,
          description: 'Documentos sin revisar',
          tooltip: 'Documentos nuevos que aún no has revisado y debes atender',
          color: 'text-orange-600',
          highlight: stats.pendientes > 0
        },
        { 
          id: 'vencidos', 
          icon: AlertCircle, 
          label: 'Urgentes', 
          badge: stats.vencidos,
          description: 'Próximos a vencerse',
          tooltip: 'Documentos que están próximos a vencer - ¡Atención prioritaria!',
          color: 'text-red-600',
          highlight: stats.vencidos > 0,
          pulseAnimation: stats.vencidos > 0
        },
        { 
          id: 'proceso', 
          icon: FolderOpen, 
          label: 'En Trámite', 
          badge: null,
          description: 'Documentos en gestión',
          tooltip: 'Documentos que ya estás atendiendo o gestionando',
          iconColor: 'text-yellow-600'
        },
        { 
          id: 'finalizados', 
          icon: CheckCircle2, 
          label: 'Terminados', 
          badge: null,
          description: 'Documentos completados',
          tooltip: 'Documentos que ya fueron completados y archivados',
          color: 'text-green-600'
        },
      ]
    },
    {
      title: 'ARCHIVO Y ORGANIZACIÓN',
      color: 'text-purple-600',
      items: [
        { 
          id: 'archivo', 
          icon: Archive, 
          label: 'Archivo', 
          badge: null,
          description: 'Gestión de archivo',
          tooltip: 'Organización y almacenamiento de documentos según normativa'
        },
        { 
          id: 'trd', 
          icon: Shield, 
          label: 'Clasificación TRD', 
          badge: null,
          description: 'Tablas de retención',
          tooltip: 'Tabla de Retención Documental - Cómo clasificar y cuánto tiempo guardar documentos'
        },
        { 
          id: 'reportes', 
          icon: BarChart3, 
          label: 'Reportes', 
          badge: null,
          description: 'Estadísticas e informes',
          tooltip: 'Consulta estadísticas y genera reportes de tu gestión'
        },
      ]
    },
    {
      title: 'CONFIGURACIÓN DEL SISTEMA',
      color: 'text-gray-600',
      items: [
        { 
          id: 'usuarios', 
          icon: Users, 
          label: 'Usuarios', 
          badge: null,
          description: 'Gestión de usuarios',
          tooltip: 'Administrar usuarios y permisos del sistema'
        },
        { 
          id: 'catalogos', 
          icon: List, 
          label: 'Catálogos', 
          badge: null,
          description: 'Personas y empresas',
          tooltip: 'Administrar catálogos de personas y empresas del sistema'
        },
        { 
          id: 'dependencias', 
          icon: Building, 
          label: 'Áreas y Oficinas', 
          badge: null,
          description: 'Estructura organizacional',
          tooltip: 'Gestionar las diferentes áreas y oficinas de la institución'
        },
        { 
          id: 'configuracion', 
          icon: Settings, 
          label: 'Configuración', 
          badge: null,
          description: 'Ajustes del sistema',
          tooltip: 'Configurar parámetros generales del sistema'
        },
      ]
    }
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <aside className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-8.5rem)] flex flex-col shadow-sm">
        {/* Botón de nueva radicación MUY DESTACADO */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-green-50 to-white">
          <Button
            onClick={onNewRadicacion}
            className="w-full justify-center gap-3 h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            size="lg"
          >
            <div className="bg-white rounded-full p-2">
              <Plus className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-base">Registrar Documento</div>
              <div className="text-xs opacity-90">Nuevo radicado de correspondencia</div>
            </div>
          </Button>
          
          {/* Ayuda rápida */}
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800">
                <span className="font-semibold">¿Primera vez?</span>
                <p className="mt-1 text-blue-700">Haz clic en "Registrar Documento" para ingresar un nuevo oficio o comunicación.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {menuSections.map((section, index) => (
              <div key={section.title}>
                {index > 0 && <Separator className="my-4" />}
                <div className="mb-3">
                  <h3 className={`text-xs font-bold ${section.color} uppercase tracking-wider px-3 flex items-center gap-2`}>
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const hasHighlight = item.highlight;
                    
                    return (
                      <Tooltip key={item.id}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isActive ? 'secondary' : 'ghost'}
                            className={`
                              w-full justify-start gap-3 h-auto py-4 px-3 relative
                              ${isActive 
                                ? 'bg-green-50 text-green-700 border-l-4 border-green-600 shadow-sm' 
                                : 'hover:bg-gray-50'
                              }
                              ${hasHighlight && !isActive ? 'bg-orange-50 border-l-4 border-orange-400' : ''}
                              transition-all duration-200
                            `}
                            onClick={() => onTabChange(item.id)}
                          >
                            {item.pulseAnimation && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            )}
                            
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-green-100' : hasHighlight ? 'bg-orange-100' : 'bg-gray-100'}`}>
                              <Icon className={`h-5 w-5 ${
                                item.iconColor 
                                  ? item.iconColor 
                                  : item.color 
                                    ? item.color 
                                    : isActive 
                                      ? 'text-green-600' 
                                      : 'text-gray-600'
                              }`} />
                            </div>
                            
                            <div className="flex-1 text-left min-w-0">
                              <div className={`text-sm font-semibold ${
                                item.color 
                                  ? item.color 
                                  : isActive 
                                    ? 'text-green-700' 
                                    : 'text-gray-700'
                              }`}>
                                {item.label}
                              </div>
                              <div className="text-xs text-gray-500 truncate">
                                {item.description}
                              </div>
                            </div>
                            
                            {item.badge !== null && item.badge > 0 && (
                              <Badge 
                                className={`ml-auto flex-shrink-0 min-w-[24px] justify-center ${
                                  isActive 
                                    ? 'bg-green-600 text-white' 
                                    : hasHighlight
                                      ? 'bg-orange-500 text-white animate-pulse'
                                      : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer del sidebar mejorado */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-br from-green-50 to-white">
          <div className="text-xs text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AIC</span>
              </div>
            </div>
            <div className="font-bold text-gray-800 mb-1">Asociación Indígena del Cauca</div>
            <div className="text-gray-600 mb-2">Sistema de Gestión de Correspondencia</div>
            <div className="flex items-center justify-center gap-1 text-green-700 mb-1">
              <Shield className="h-3 w-3" />
              <span className="font-medium">Cumple Ley 594/2000</span>
            </div>
            <div className="text-gray-500">Actualización 001-2024</div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="text-gray-500">SIGECOR v2.0</div>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}