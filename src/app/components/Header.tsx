import { Bell, User, LogOut, Settings, HelpCircle, Shield, FileText } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const notifications = [
    { id: 1, message: 'Nuevo documento radicado RAD-2026-0008', time: '5 min', unread: true },
    { id: 2, message: 'Documento próximo a vencer: OFI-2026-001', time: '1 hora', unread: true },
    { id: 3, message: 'Documento asignado a su bandeja', time: '2 horas', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10
 h-11  rounded-full flex items-center justify-center overflow-hidden">
                <img 
    src="data:image/png;base64,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"
    alt="Logo AIC"
    className="w-full h-full object-cover"
  />
            </div>
            <div>
              <h1 className="font-bold text-lg">AIC - SIGECOR</h1>
              <p className="text-xs text-green-100">Asociación Indígena del Cauca</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Normatividad */}
          <div className="hidden md:flex items-center gap-2 bg-green-800 px-3 py-1.5 rounded-lg">
            <Shield className="h-4 w-4 text-green-200" />
            <div className="text-xs">
              <div className="font-semibold">Ley 594/2000</div>
              <div className="text-green-200">Act. 001-2024</div>
            </div>
          </div>

          {/* Notificaciones */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-green-800">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start py-3">
                  <div className="flex items-start gap-2 w-full">
                    {notif.unread && (
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-1.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${notif.unread ? 'font-medium' : ''}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-green-600">
                Ver todas las notificaciones
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Ayuda */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-green-800">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-white hover:bg-green-800">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-600 text-white">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">Administrador Sistema</div>
                  <div className="text-xs text-green-200">AIC - Correspondencia</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Barra de información adicional */}
      <div className="bg-green-800 px-4 py-2 text-xs flex items-center justify-between border-t border-green-700">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-100">Sistema Activo</span>
          </div>
          <div className="text-green-200">
            <span className="font-medium text-white">Asociación Indígena del Cauca</span> - Sistema de Gestión Documental
          </div>
        </div>
        <div className="text-green-200">
          {new Date().toLocaleDateString('es-CO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </header>
  );
}