import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  UserCheck,
  UserX,
  Shield,
  Key,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';
import { personas, roles, dependencias } from '../data/catalogos';

export function UsuariosModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const getEstadoBadge = (estado: boolean) => {
    return estado ? (
      <Badge className="bg-green-100 text-green-800 border-green-300 border">
        <UserCheck className="h-3 w-3 mr-1" />
        Activo
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 border-red-300 border">
        <UserX className="h-3 w-3 mr-1" />
        Inactivo
      </Badge>
    );
  };

  const getRolBadge = (rolId: number) => {
    const rol = roles.find(r => r.PK_ROL === rolId);
    const colors: Record<string, string> = {
      'ADMINISTRADOR': 'bg-red-100 text-red-800',
      'RADICADOR': 'bg-blue-100 text-blue-800',
      'GESTOR': 'bg-purple-100 text-purple-800',
      'CONSULTA': 'bg-gray-100 text-gray-800'
    };
    
    return rol ? (
      <Badge className={`${colors[rol.nombre_rol] || 'bg-gray-100 text-gray-800'} border`}>
        <Shield className="h-3 w-3 mr-1" />
        {rol.nombre_rol}
      </Badge>
    ) : null;
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleSaveUser = () => {
    toast.success('Usuario guardado exitosamente');
    setDialogOpen(false);
  };

  const handleDeleteUser = (userId: number) => {
    toast.success('Usuario eliminado exitosamente');
  };

  const handleResetPassword = (userId: number) => {
    toast.success('Contraseña restablecida. Se ha enviado un correo al usuario.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-indigo-600 bg-gradient-to-r from-indigo-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestión de Usuarios
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Administración de usuarios, roles y permisos del sistema de correspondencia. 
                Control de acceso basado en roles (RBAC) conforme a la política de seguridad institucional.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-white">
                  Autenticación Segura
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Control de Acceso
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Auditoría de Usuarios
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usuarios</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{personas.length}</p>
              </div>
              <Users className="h-10 w-10 text-indigo-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuarios Activos</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{personas.length}</p>
              </div>
              <UserCheck className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Roles Configurados</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{roles.length}</p>
              </div>
              <Shield className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sesiones Activas</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">3</p>
              </div>
              <UserCheck className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de usuarios */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Lista de Usuarios
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreateUser}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Búsqueda */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, correo o identificación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                {roles.map(rol => (
                  <SelectItem key={rol.PK_ROL} value={String(rol.PK_ROL)}>
                    {rol.nombre_rol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabla */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Usuario</TableHead>
                  <TableHead className="font-semibold">Identificación</TableHead>
                  <TableHead className="font-semibold">Correo Electrónico</TableHead>
                  <TableHead className="font-semibold">Rol</TableHead>
                  <TableHead className="font-semibold">Dependencia</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personas.map((persona) => {
                  const rol = roles.find(r => r.PK_ROL === persona.FK_ROL);
                  const dependencia = dependencias.find(d => d.PK_DEPENDENCIA === rol?.FK_DEPENDENCIA);
                  
                  return (
                    <TableRow key={persona.PK_PERSONA} className="hover:bg-indigo-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-indigo-600 text-white">
                              {persona.primer_nombre[0]}{persona.primer_apellido[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{persona.nombreCompleto}</p>
                            <p className="text-xs text-gray-500">{persona.celular || 'Sin teléfono'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{persona.numero_identificacion}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          {persona.correo_electronico}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRolBadge(persona.FK_ROL)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {dependencia?.nombre || 'Sin asignar'}
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(true)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditUser(persona)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleResetPassword(persona.PK_PERSONA)}
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteUser(persona.PK_PERSONA)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Roles y permisos */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Roles y Permisos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((rol) => {
              const usuariosConRol = personas.filter(p => p.FK_ROL === rol.PK_ROL).length;
              const dependencia = dependencias.find(d => d.PK_DEPENDENCIA === rol.FK_DEPENDENCIA);
              
              return (
                <Card key={rol.PK_ROL} className="border-l-4 border-l-purple-600">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{rol.nombre_rol}</h4>
                        <p className="text-sm text-gray-600 mt-1">{rol.descripcion}</p>
                      </div>
                      <Badge variant="outline">{usuariosConRol} usuarios</Badge>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500">
                        Dependencia: <span className="font-medium text-gray-700">{dependencia?.nombre}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para crear/editar usuario */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para {selectedUser ? 'editar' : 'crear'} un usuario del sistema SIGECOR con sus datos personales y configuración de acceso.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primer Nombre</Label>
                <Input placeholder="Primer nombre" />
              </div>
              <div>
                <Label>Segundo Nombre</Label>
                <Input placeholder="Segundo nombre" />
              </div>
              <div>
                <Label>Primer Apellido</Label>
                <Input placeholder="Primer apellido" />
              </div>
              <div>
                <Label>Segundo Apellido</Label>
                <Input placeholder="Segundo apellido" />
              </div>
              <div>
                <Label>Tipo de Identificación</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                    <SelectItem value="PA">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Número de Identificación</Label>
                <Input placeholder="Número" />
              </div>
              <div>
                <Label>Correo Electrónico</Label>
                <Input type="email" placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <Label>Celular</Label>
                <Input placeholder="300 123 4567" />
              </div>
              <div>
                <Label>Rol</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(rol => (
                      <SelectItem key={rol.PK_ROL} value={String(rol.PK_ROL)}>
                        {rol.nombre_rol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado</Label>
                <Select defaultValue="activo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveUser}>
                Guardar Usuario
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}