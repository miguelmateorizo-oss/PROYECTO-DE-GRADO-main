import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ArrowDown,
  ArrowUp,
  RefreshCw,
  Clock,
  AlertCircle,
  FolderOpen,
  CheckCircle2,
  Archive,
  Shield,
  BarChart3,
  Users,
  Building,
  Settings,
  FileText,
  ChevronRight
} from 'lucide-react';

interface ModulosDashboardProps {
  onModuleClick: (moduleId: string) => void;
  stats: {
    entrada: number;
    salida: number;
    pendientes: number;
    vencidos: number;
  };
}

export function ModulosDashboard({ onModuleClick, stats }: ModulosDashboardProps) {
  const modulos = [
    {
      id: 'correspondencia',
      title: 'CORRESPONDENCIA',
      description: 'Gestión de documentos que entran, salen o circulan internamente',
      icon: FileText,
      color: 'green',
      submodulos: [
        {
          id: 'entrada',
          title: 'Documentos Recibidos',
          description: 'Correos y oficios que llegan a la AIC',
          icon: ArrowDown,
          count: stats.entrada,
          color: 'bg-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500'
        },
        {
          id: 'salida',
          title: 'Documentos Enviados',
          description: 'Comunicaciones que la AIC envía',
          icon: ArrowUp,
          count: stats.salida,
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500'
        },
        {
          id: 'interna',
          title: 'Comunicación Interna',
          description: 'Documentos entre áreas de la AIC',
          icon: RefreshCw,
          count: 0,
          color: 'bg-purple-500',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-500'
        }
      ]
    },
    {
      id: 'bandejas',
      title: 'MIS TAREAS',
      description: 'Documentos que debo revisar, atender o que ya terminé',
      icon: Clock,
      color: 'orange',
      submodulos: [
        {
          id: 'pendientes',
          title: 'Por Revisar',
          description: 'Documentos nuevos sin revisar',
          icon: Clock,
          count: stats.pendientes,
          color: 'bg-orange-500',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-500',
          urgent: stats.pendientes > 0
        },
        {
          id: 'vencidos',
          title: 'Urgentes',
          description: 'Próximos a vencer - ¡Atención!',
          icon: AlertCircle,
          count: stats.vencidos,
          color: 'bg-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          urgent: stats.vencidos > 0,
          pulse: stats.vencidos > 0
        },
        {
          id: 'proceso',
          title: 'En Trámite',
          description: 'Documentos que estoy atendiendo',
          icon: FolderOpen,
          count: 0,
          color: 'bg-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500'
        },
        {
          id: 'finalizados',
          title: 'Terminados',
          description: 'Documentos completados',
          icon: CheckCircle2,
          count: 0,
          color: 'bg-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500'
        }
      ]
    },
    {
      id: 'archivo',
      title: 'ARCHIVO Y CLASIFICACIÓN',
      description: 'Organización y clasificación de documentos según las normas',
      icon: Archive,
      color: 'purple',
      submodulos: [
        {
          id: 'archivo',
          title: 'Archivo General',
          description: 'Documentos organizados y almacenados',
          icon: Archive,
          count: null,
          color: 'bg-purple-500',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-500'
        },
        {
          id: 'trd',
          title: 'Clasificación TRD',
          description: 'Cómo clasificar y guardar documentos',
          icon: Shield,
          count: null,
          color: 'bg-indigo-500',
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-500'
        },
        {
          id: 'reportes',
          title: 'Reportes',
          description: 'Estadísticas e informes',
          icon: BarChart3,
          count: null,
          color: 'bg-teal-500',
          bgColor: 'bg-teal-50',
          borderColor: 'border-teal-500'
        }
      ]
    },
    {
      id: 'administracion',
      title: 'ADMINISTRACIÓN',
      description: 'Configuración de usuarios, áreas y parámetros del sistema',
      icon: Settings,
      color: 'gray',
      submodulos: [
        {
          id: 'usuarios',
          title: 'Usuarios',
          description: 'Gestionar usuarios del sistema',
          icon: Users,
          count: null,
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500'
        },
        {
          id: 'dependencias',
          title: 'Áreas y Oficinas',
          description: 'Estructura de la organización',
          icon: Building,
          count: null,
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500'
        },
        {
          id: 'configuracion',
          title: 'Configuración',
          description: 'Ajustes generales del sistema',
          icon: Settings,
          count: null,
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {modulos.map((modulo) => {
        const ModuloIcon = modulo.icon;
        
        return (
          <div key={modulo.id} className="space-y-4">
            {/* Título del módulo */}
            <div className="flex items-center gap-3">
              <div className={`p-3 bg-${modulo.color}-100 rounded-lg`}>
                <ModuloIcon className={`h-6 w-6 text-${modulo.color}-600`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{modulo.title}</h3>
                <p className="text-sm text-gray-600">{modulo.description}</p>
              </div>
            </div>

            {/* Submódulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulo.submodulos.map((submodulo) => {
                const SubIcon = submodulo.icon;
                
                return (
                  <Card
                    key={submodulo.id}
                    className={`border-l-4 ${submodulo.borderColor} ${submodulo.bgColor} hover:shadow-lg transition-all cursor-pointer group relative`}
                    onClick={() => onModuleClick(submodulo.id)}
                  >
                    {submodulo.pulse && (
                      <span className="absolute -top-2 -right-2 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                      </span>
                    )}
                    
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-3 ${submodulo.color} text-white rounded-lg`}>
                          <SubIcon className="h-6 w-6" />
                        </div>
                        {submodulo.count !== null && (
                          <Badge className={`${submodulo.color} text-white text-lg px-3 py-1 ${submodulo.urgent ? 'animate-pulse' : ''}`}>
                            {submodulo.count}
                          </Badge>
                        )}
                      </div>

                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700">
                        {submodulo.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {submodulo.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700">
                        <span className="mr-2">Ir al módulo</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Ayuda */}
      <Card className="border-l-4 border-l-blue-600 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-500 text-white rounded-lg">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">¿Necesitas ayuda?</h4>
              <p className="text-sm text-gray-700 mb-3">
                Haz clic en cualquier módulo para acceder a su funcionalidad. 
                Los números en las tarjetas indican la cantidad de documentos en cada estado.
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span><strong>Documentos Recibidos:</strong> Los que llegan a la AIC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span><strong>Documentos Enviados:</strong> Los que la AIC envía</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span><strong>Por Revisar:</strong> Documentos nuevos que debes atender</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span><strong>Urgentes:</strong> Documentos próximos a vencer</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
