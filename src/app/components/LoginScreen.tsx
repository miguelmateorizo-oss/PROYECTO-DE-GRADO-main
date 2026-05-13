import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, User, Lock, Building, LogIn } from 'lucide-react';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (user: UserSession) => void;
}

export interface UserSession {
  id: number;
  nombre: string;
  email: string;
  rol: 'VENTANILLA' | 'RESPONSABLE_AREA' | 'ADMINISTRADOR';
  dependencia?: number;
  dependenciaNombre?: string;
}

// Usuarios de prueba
const usuariosPrueba = [
  {
    id: 1,
    nombre: 'María González',
    email: 'maria.gonzalez@aic.org.co',
    password: 'ventanilla123',
    rol: 'VENTANILLA' as const,
    dependencia: null,
    dependenciaNombre: 'Ventanilla Única'
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@aic.org.co',
    password: 'juridica123',
    rol: 'RESPONSABLE_AREA' as const,
    dependencia: 1,
    dependenciaNombre: 'Dirección Jurídica'
  },
  {
    id: 3,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@aic.org.co',
    password: 'administrativa123',
    rol: 'RESPONSABLE_AREA' as const,
    dependencia: 2,
    dependenciaNombre: 'Dirección Administrativa'
  },
  {
    id: 4,
    nombre: 'Pedro Sánchez',
    email: 'pedro.sanchez@aic.org.co',
    password: 'financiera123',
    rol: 'RESPONSABLE_AREA' as const,
    dependencia: 3,
    dependenciaNombre: 'Dirección Financiera'
  },
  {
    id: 5,
    nombre: 'Laura Torres',
    email: 'laura.torres@aic.org.co',
    password: 'admin123',
    rol: 'ADMINISTRADOR' as const,
    dependencia: null,
    dependenciaNombre: 'Administración General'
  }
];

export function LoginScreen({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const usuario = usuariosPrueba.find(
        u => u.email === email && u.password === password
      );

      if (usuario) {
        toast.success(`¡Bienvenido(a) ${usuario.nombre}!`, {
          description: `Has iniciado sesión como ${usuario.rol === 'VENTANILLA' ? 'Ventanilla Única' : usuario.rol === 'ADMINISTRADOR' ? 'Administrador' : 'Responsable de ' + usuario.dependenciaNombre}`
        });
        
        onLogin({
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          dependencia: usuario.dependencia || undefined,
          dependenciaNombre: usuario.dependenciaNombre
        });
      } else {
        toast.error('Credenciales incorrectas', {
          description: 'Por favor verifica tu correo y contraseña'
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Panel Izquierdo - Información */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
<div className="w-300
 h-160  rounded-full flex items-center justify-center overflow-hidden">
  <img 
    src="https://www.cric-colombia.org/portal/wp-content/uploads/2020/02/aic-logo-ultimo-696x851.png"
    alt="Logo AIC"
    className="w-full h-full object-cover"
  />
</div>
            {/* <div>
              <h1 className="text-3xl font-bold text-gray-900">SIGECOR</h1>
              <p className="text-gray-600">Sistema de Gestión de Correspondencia</p>
            </div> */}
          </div>

          {/* <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Asociación Indígena del Cauca
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Sistema integral para la gestión documental y correspondencia, 
              cumpliendo con la Ley 594 de 2000 y sus actualizaciones.
            </p>
          </div> */}

          {/* <Card className="border-l-4 border-l-green-600 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sistema Seguro</h3>
                  <p className="text-sm text-gray-700">
                    Acceso controlado mediante usuario y contraseña. 
                    Cada área tiene su propia bandeja de correspondencia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold text-gray-900">Funcionalidades:</p>
            <ul className="space-y-1 ml-4">
              <li>✓ Radicación de documentos</li>
              <li>✓ Asignación por dependencias</li>
              <li>✓ Notificaciones automáticas</li>
              <li>✓ Seguimiento y trazabilidad</li>
              <li>✓ Cumplimiento normativo</li>
            </ul>
          </div> */}
        </div>

        {/* Panel Derecho - Login */}
        <Card className="shadow-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <LogIn className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@aic.org.co"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                size="lg"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-gray-900 mb-3">Usuarios de Prueba:</p>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="p-2 bg-white rounded border">
                  <p className="font-medium">Ventanilla Única:</p>
                  <p>maria.gonzalez@aic.org.co / ventanilla123</p>
                </div>
                <div className="p-2 bg-white rounded border">
                  <p className="font-medium">Responsable Jurídica:</p>
                  <p>carlos.rodriguez@aic.org.co / juridica123</p>
                </div>
                <div className="p-2 bg-white rounded border">
                  <p className="font-medium">Responsable Administrativa:</p>
                  <p>ana.martinez@aic.org.co / administrativa123</p>
                </div>
                <div className="p-2 bg-white rounded border">
                  <p className="font-medium">Administrador:</p>
                  <p>laura.torres@aic.org.co / admin123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
