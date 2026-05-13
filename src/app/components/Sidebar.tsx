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
  XCircle,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

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

export function Sidebar({ activeTab, onTabChange, onNewRadicacion, stats }: SidebarProps) {
  const menuSections = [
    {
      title: 'Principal',
      items: [
        { 
          id: 'dashboard', 
          icon: Home, 
          label: 'Dashboard', 
          badge: null,
          description: 'Vista general del sistema'
        },
      ]
    },
    {
      title: 'Correspondencia',
      items: [
        { 
          id: 'entrada', 
          icon: Inbox, 
          label: 'Entrada', 
          badge: stats.entrada,
          description: 'Documentos recibidos'
        },
        { 
          id: 'salida', 
          icon: Send, 
          label: 'Salida', 
          badge: stats.salida,
          description: 'Documentos enviados'
        },
        { 
          id: 'interna', 
          icon: FileText, 
          label: 'Interna', 
          badge: null,
          description: 'Comunicación interna'
        },
      ]
    },
    {
      title: 'Bandejas',
      items: [
        { 
          id: 'pendientes', 
          icon: Clock, 
          label: 'Pendientes', 
          badge: stats.pendientes,
          description: 'Por revisar',
          color: 'text-orange-600'
        },
        { 
          id: 'vencidos', 
          icon: AlertCircle, 
          label: 'Por Vencer', 
          badge: stats.vencidos,
          description: 'Próximos a vencer',
          color: 'text-red-600'
        },
        { 
          id: 'proceso', 
          icon: FolderOpen, 
          label: 'En Proceso', 
          badge: null,
          description: 'En trámite'
        },
        { 
          id: 'finalizados', 
          icon: CheckCircle2, 
          label: 'Finalizados', 
          badge: null,
          description: 'Completados',
          color: 'text-green-600'
        },
      ]
    },
    {
      title: 'Gestión',
      items: [
        { 
          id: 'archivo', 
          icon: Archive, 
          label: 'Archivo', 
          badge: null,
          description: 'Gestión documental'
        },
        { 
          id: 'trd', 
          icon: Shield, 
          label: 'TRD', 
          badge: null,
          description: 'Tabla de retención'
        },
        { 
          id: 'reportes', 
          icon: BarChart3, 
          label: 'Reportes', 
          badge: null,
          description: 'Estadísticas y reportes'
        },
      ]
    },
    {
      title: 'Administración',
      items: [
        { 
          id: 'usuarios', 
          icon: Users, 
          label: 'Usuarios', 
          badge: null,
          description: 'Gestión de usuarios'
        },
        { 
          id: 'dependencias', 
          icon: Building, 
          label: 'Dependencias', 
          badge: null,
          description: 'Áreas y departamentos'
        },
        { 
          id: 'configuracion', 
          icon: Settings, 
          label: 'Configuración', 
          badge: null,
          description: 'Ajustes del sistema'
        },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Botón de nueva radicación */}
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onNewRadicacion}
          className="w-full justify-start gap-2 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          <div className="text-left">
            <div className="font-semibold">Nueva Radicación</div>
            <div className="text-xs opacity-90">Registrar documento</div>
          </div>
        </Button>
      </div>

      {/* Menú de navegación */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {menuSections.map((section, index) => (
            <div key={section.title}>
              {index > 0 && <Separator className="my-4" />}
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                  {section.title}
                </h3>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={`
                        w-full justify-start gap-3 h-auto py-3 px-3
                        ${isActive ? 'bg-green-50 text-green-700 border-l-4 border-green-600' : 'hover:bg-gray-50'}
                        transition-all duration-200
                      `}
                      onClick={() => onTabChange(item.id)}
                    >
                      <Icon className={`h-5 w-5 flex-shrink-0 ${item.color || (isActive ? 'text-green-600' : 'text-gray-500')}`} />
                      <div className="flex-1 text-left min-w-0">
                        <div className={`text-sm font-medium ${isActive ? 'text-green-700' : 'text-gray-700'}`}>
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {item.description}
                        </div>
                      </div>
                      {item.badge !== null && item.badge > 0 && (
                        <Badge 
                          variant={isActive ? 'default' : 'secondary'}
                          className={`ml-auto flex-shrink-0 ${
                            isActive 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-center text-gray-600">
          <div className="font-semibold text-gray-800">SIGECOR v2.0</div>
          <div className="mt-1">Cumplimiento Ley 594/2000</div>
          <div className="text-gray-500">Actualización 001-2024</div>
        </div>
      </div>
    </aside>
  );
}