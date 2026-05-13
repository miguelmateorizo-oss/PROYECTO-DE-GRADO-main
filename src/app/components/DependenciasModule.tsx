import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
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
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Building, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Users,
  FileText,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';
import { dependencias, roles, personas } from '../data/catalogos';
import { pilares } from '../data/catalogos';

export function DependenciasModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDep, setSelectedDep] = useState<any>(null);

  const getEstadoBadge = (estado: string) => {
    return estado === 'ACTIVO' ? (
      <Badge className="bg-green-100 text-green-800 border-green-300 border">
        Activo
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 border-red-300 border">
        Inactivo
      </Badge>
    );
  };

  const handleCreateDependencia = () => {
    setSelectedDep(null);
    setDialogOpen(true);
  };

  const handleEditDependencia = (dep: any) => {
    setSelectedDep(dep);
    setDialogOpen(true);
  };

  const handleSaveDependencia = () => {
    toast.success('Dependencia guardada exitosamente');
    setDialogOpen(false);
  };

  const handleDeleteDependencia = (depId: number) => {
    toast.success('Dependencia eliminada exitosamente');
  };

  // Calcular estadísticas por dependencia
  const getDependenciaStats = (depId: number) => {
    const rolesEnDep = roles.filter(r => r.FK_DEPENDENCIA === depId);
    const usuariosEnDep = personas.filter(p =>
      p.FK_DEPENDENCIAS === depId || rolesEnDep.some(r => r.PK_ROL === p.FK_ROL)
    );
    return {
      roles: rolesEnDep.length,
      usuarios: usuariosEnDep.length
    };
  };

  const getPilarNombre = (fkPilar: number) => {
    return pilares.find(p => p.PK_PILAR === fkPilar)?.nombre ?? '—';
  };

  const getPilarColor = (fkPilar: number) => {
    if (fkPilar === 1) return 'bg-blue-100 text-blue-700';
    if (fkPilar === 2) return 'bg-purple-100 text-purple-700';
    if (fkPilar === 3) return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-cyan-600 bg-gradient-to-r from-cyan-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-100 rounded-lg">
              <Building className="h-8 w-8 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestión de Dependencias
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Administración de la estructura organizacional de la entidad. Gestión de áreas, 
                departamentos y unidades administrativas para la correcta distribución de correspondencia.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-white">
                  Estructura Organizacional
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Gestión de Áreas
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Asignación de Roles
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
                <p className="text-sm text-gray-600">Total Dependencias</p>
                <p className="text-3xl font-bold text-cyan-600 mt-2">{dependencias.length}</p>
              </div>
              <Building className="h-10 w-10 text-cyan-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dependencias Activas</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {dependencias.filter(d => d.estado === 'ACTIVO').length}
                </p>
              </div>
              <Building className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Roles Asignados</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{roles.length}</p>
              </div>
              <Users className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuarios Totales</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{personas.length}</p>
              </div>
              <Users className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de dependencias */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-cyan-600" />
              Lista de Dependencias
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreateDependencia}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Dependencia
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
                placeholder="Buscar por código o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Código</TableHead>
                  <TableHead className="font-semibold">Pilar</TableHead>
                  <TableHead className="font-semibold">Nombre del Área</TableHead>
                  <TableHead className="font-semibold">Cargo</TableHead>
                  <TableHead className="font-semibold text-center">Usuarios</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dependencias.map((dep) => {
                  const stats = getDependenciaStats(dep.PK_DEPENDENCIA);
                  
                  return (
                    <TableRow key={dep.PK_DEPENDENCIA} className="hover:bg-cyan-50 transition-colors">
                      <TableCell className="font-mono text-sm font-semibold text-cyan-600">
                        {dep.codigo}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getPilarColor(dep.FK_PILAR)}`}>
                          {getPilarNombre(dep.FK_PILAR)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-cyan-100 rounded-lg">
                            <Building className="h-4 w-4 text-cyan-600" />
                          </div>
                          <span className="font-medium text-gray-900">{dep.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{dep.cargo}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-semibold">
                          {stats.usuarios}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(dep.estado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditDependencia(dep)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteDependencia(dep.PK_DEPENDENCIA)}
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

      {/* Organigrama visual */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cyan-600" />
            Estructura Organizacional
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {dependencias.map((dep) => {
              const stats = getDependenciaStats(dep.PK_DEPENDENCIA);
              const rolesEnDep = roles.filter(r => r.FK_DEPENDENCIA === dep.PK_DEPENDENCIA);
              
              return (
                <Card key={dep.PK_DEPENDENCIA} className="border-l-4 border-l-cyan-600">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-cyan-100 rounded-lg">
                          <Building className="h-6 w-6 text-cyan-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{dep.nombre}</h4>
                          <p className="text-sm text-gray-600 mt-1">{dep.descripcion}</p>
                          <div className="flex gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {stats.usuarios} usuarios
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {dep.codigo}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {getEstadoBadge(dep.estado)}
                    </div>

                    {rolesEnDep.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-3">Roles en esta dependencia:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {rolesEnDep.map((rol) => {
                            const usuariosConRol = personas.filter(p => p.FK_ROL === rol.PK_ROL).length;
                            return (
                              <div key={rol.PK_ROL} className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-900">{rol.nombre_rol}</p>
                                <p className="text-xs text-gray-600 mt-1">{usuariosConRol} usuarios</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para crear/editar dependencia */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDep ? 'Editar Dependencia' : 'Nueva Dependencia'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para {selectedDep ? 'editar' : 'crear'} una dependencia en el sistema SIGECOR con su información organizacional.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Código de Dependencia</Label>
                <Input placeholder="Ej: DEP-01" defaultValue={selectedDep?.codigo} />
              </div>
              <div>
                <Label>Estado</Label>
                <select className="w-full border rounded-md px-3 py-2" defaultValue={selectedDep?.estado || 'ACTIVO'}>
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Nombre de la Dependencia</Label>
              <Input placeholder="Nombre completo" defaultValue={selectedDep?.nombre} />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea 
                placeholder="Descripción de las funciones y responsabilidades" 
                rows={3}
                defaultValue={selectedDep?.descripcion}
              />
            </div>
            
            <Card className="border-l-4 border-l-blue-600 bg-blue-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Nota importante:</p>
                    <p>Las dependencias deben corresponder con la estructura organizacional oficial de la entidad. 
                    Cada dependencia puede tener múltiples roles asignados para la gestión documental.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveDependencia}>
                Guardar Dependencia
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}