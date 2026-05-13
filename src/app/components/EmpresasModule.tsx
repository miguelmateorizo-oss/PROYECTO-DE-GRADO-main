import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Building2, Plus, Edit, Trash2, Search, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import type { Empresa } from '../types/entidades';

export function EmpresasModule() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    FK_TIPOEMPRESA: '1',
    NIT: '',
    NOMBRE: '',
    DEPARTAMENTO: 'Cauca',
    MUNICIPIO: 'Popayán',
    DIRECCION: '',
    TELEFONO: '',
    CORREO_ELECTRONICO: ''
  });

  const tiposEmpresa = [
    { value: '1', label: 'Pública' },
    { value: '2', label: 'Privada' },
    { value: '3', label: 'Mixta' },
    { value: '4', label: 'ONG' },
    { value: '5', label: 'Cooperativa' },
    { value: '6', label: 'Fundación' }
  ];

  const handleOpenDialog = (empresa?: Empresa) => {
    if (empresa) {
      setEditingEmpresa(empresa);
      setFormData({
        FK_TIPOEMPRESA: empresa.FK_TIPOEMPRESA.toString(),
        NIT: empresa.NIT,
        NOMBRE: empresa.NOMBRE,
        DEPARTAMENTO: empresa.DEPARTAMENTO,
        MUNICIPIO: empresa.MUNICIPIO,
        DIRECCION: empresa.DIRECCION,
        TELEFONO: empresa.TELEFONO,
        CORREO_ELECTRONICO: empresa.CORREO_ELECTRONICO
      });
    } else {
      setEditingEmpresa(null);
      setFormData({
        FK_TIPOEMPRESA: '1',
        NIT: '',
        NOMBRE: '',
        DEPARTAMENTO: 'Cauca',
        MUNICIPIO: 'Popayán',
        DIRECCION: '',
        TELEFONO: '',
        CORREO_ELECTRONICO: ''
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    // Validaciones
    if (!formData.NIT || !formData.NOMBRE || !formData.CORREO_ELECTRONICO) {
      toast.error('Por favor completa los campos obligatorios (NIT, Nombre, Email)');
      return;
    }

    if (editingEmpresa) {
      // Actualizar empresa existente
      setEmpresas(prev => prev.map(e => 
        e.PK_EMPRESA === editingEmpresa.PK_EMPRESA
          ? {
              ...e,
              ...formData,
              FK_TIPOEMPRESA: parseInt(formData.FK_TIPOEMPRESA),
              FECHAACTUALIZADO: new Date().toISOString(),
              ACTUALIZADOPOR: 1,
              tipoEmpresaNombre: tiposEmpresa.find(t => t.value === formData.FK_TIPOEMPRESA)?.label
            }
          : e
      ));
      toast.success('Empresa actualizada exitosamente');
    } else {
      // Crear nueva empresa
      const nuevaEmpresa: Empresa = {
        PK_EMPRESA: Math.floor(Math.random() * 10000),
        ...formData,
        FK_TIPOEMPRESA: parseInt(formData.FK_TIPOEMPRESA),
        FECHACREADO: new Date().toISOString(),
        CREADOPOR: 1,
        tipoEmpresaNombre: tiposEmpresa.find(t => t.value === formData.FK_TIPOEMPRESA)?.label
      };
      setEmpresas(prev => [nuevaEmpresa, ...prev]);
      toast.success('Empresa creada exitosamente');
    }

    setDialogOpen(false);
  };

  const handleDelete = (empresa: Empresa) => {
    if (window.confirm(`¿Estás seguro de eliminar la empresa ${empresa.NOMBRE}?`)) {
      setEmpresas(prev => prev.filter(e => e.PK_EMPRESA !== empresa.PK_EMPRESA));
      toast.success('Empresa eliminada exitosamente');
    }
  };

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.NIT.includes(searchTerm) ||
    empresa.CORREO_ELECTRONICO.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-600 bg-gradient-to-r from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Empresas</h2>
                <p className="text-gray-600 mt-1">Administra el catálogo de empresas del sistema</p>
              </div>
            </div>
            <Button onClick={() => handleOpenDialog()} className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
              Nueva Empresa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{empresas.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Empresas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {empresas.filter(e => e.FK_TIPOEMPRESA === 1).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Públicas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {empresas.filter(e => e.FK_TIPOEMPRESA === 2).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Privadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {empresas.filter(e => e.FK_TIPOEMPRESA === 4).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">ONGs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y Tabla */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listado de Empresas</CardTitle>
            <div className="flex items-center gap-2 max-w-sm">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nombre, NIT o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIT</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmpresas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No hay empresas registradas. Haz clic en "Nueva Empresa" para agregar una.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmpresas.map((empresa) => (
                    <TableRow key={empresa.PK_EMPRESA}>
                      <TableCell className="font-mono">{empresa.NIT}</TableCell>
                      <TableCell className="font-medium">{empresa.NOMBRE}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{empresa.tipoEmpresaNombre}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{empresa.MUNICIPIO}, {empresa.DEPARTAMENTO}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{empresa.CORREO_ELECTRONICO}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{empresa.TELEFONO}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(empresa)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(empresa)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Crear/Editar */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEmpresa ? 'Editar Empresa' : 'Nueva Empresa'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para {editingEmpresa ? 'editar' : 'crear'} una empresa o entidad jurídica en el sistema SIGECOR.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información Básica */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>NIT *</Label>
                    <Input
                      value={formData.NIT}
                      onChange={(e) => setFormData({...formData, NIT: e.target.value})}
                      placeholder="123456789-0"
                    />
                  </div>

                  <div>
                    <Label>Tipo de Empresa *</Label>
                    <Select value={formData.FK_TIPOEMPRESA} onValueChange={(value) => setFormData({...formData, FK_TIPOEMPRESA: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposEmpresa.map(tipo => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label>Nombre de la Empresa *</Label>
                    <Input
                      value={formData.NOMBRE}
                      onChange={(e) => setFormData({...formData, NOMBRE: e.target.value})}
                      placeholder="Ej: Asociación Indígena del Cauca"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ubicación */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Ubicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Departamento *</Label>
                    <Input
                      value={formData.DEPARTAMENTO}
                      onChange={(e) => setFormData({...formData, DEPARTAMENTO: e.target.value})}
                      placeholder="Ej: Cauca"
                    />
                  </div>

                  <div>
                    <Label>Municipio *</Label>
                    <Input
                      value={formData.MUNICIPIO}
                      onChange={(e) => setFormData({...formData, MUNICIPIO: e.target.value})}
                      placeholder="Ej: Popayán"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Dirección *</Label>
                    <Input
                      value={formData.DIRECCION}
                      onChange={(e) => setFormData({...formData, DIRECCION: e.target.value})}
                      placeholder="Calle 123 # 45-67"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.CORREO_ELECTRONICO}
                      onChange={(e) => setFormData({...formData, CORREO_ELECTRONICO: e.target.value})}
                      placeholder="empresa@ejemplo.com"
                    />
                  </div>

                  <div>
                    <Label>Teléfono *</Label>
                    <Input
                      value={formData.TELEFONO}
                      onChange={(e) => setFormData({...formData, TELEFONO: e.target.value})}
                      placeholder="6021234567"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
                {editingEmpresa ? 'Actualizar' : 'Crear'} Empresa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}