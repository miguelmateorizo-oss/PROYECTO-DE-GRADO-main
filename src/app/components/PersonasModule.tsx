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
import { Users, Plus, Edit, Trash2, Search, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import type { Persona } from '../types/entidades';

export function PersonasModule() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    TIPO_DOCUMENTO: 'CC',
    NUMEROIDENTIFICACION: '',
    PRIMERNOMBRE: '',
    SEGUNDONOMBRE: '',
    PRIMERAPELLIDO: '',
    SEGUNDOAPELLIDO: '',
    GENERO: 'M',
    TIPO_PERSONA: 'NATURAL',
    DIRECCION: '',
    CORREOELECTRONICO: '',
    TELEFONO: '',
    CORREGIMIENTO: '',
    RESGUARDO: '',
    VEREDA: '',
    FK_ROL: '',
    FK_DEPENDENCIAS: ''
  });

  const handleOpenDialog = (persona?: Persona) => {
    if (persona) {
      setEditingPersona(persona);
      setFormData({
        TIPO_DOCUMENTO: persona.TIPO_DOCUMENTO,
        NUMEROIDENTIFICACION: persona.NUMEROIDENTIFICACION,
        PRIMERNOMBRE: persona.PRIMERNOMBRE,
        SEGUNDONOMBRE: persona.SEGUNDONOMBRE || '',
        PRIMERAPELLIDO: persona.PRIMERAPELLIDO,
        SEGUNDOAPELLIDO: persona.SEGUNDOAPELLIDO || '',
        GENERO: persona.GENERO,
        TIPO_PERSONA: persona.TIPO_PERSONA,
        DIRECCION: persona.DIRECCION || '',
        CORREOELECTRONICO: persona.CORREOELECTRONICO,
        TELEFONO: persona.TELEFONO || '',
        CORREGIMIENTO: persona.CORREGIMIENTO || '',
        RESGUARDO: persona.RESGUARDO || '',
        VEREDA: persona.VEREDA || '',
        FK_ROL: persona.FK_ROL?.toString() || '',
        FK_DEPENDENCIAS: persona.FK_DEPENDENCIAS?.toString() || ''
      });
    } else {
      setEditingPersona(null);
      setFormData({
        TIPO_DOCUMENTO: 'CC',
        NUMEROIDENTIFICACION: '',
        PRIMERNOMBRE: '',
        SEGUNDONOMBRE: '',
        PRIMERAPELLIDO: '',
        SEGUNDOAPELLIDO: '',
        GENERO: 'M',
        TIPO_PERSONA: 'NATURAL',
        DIRECCION: '',
        CORREOELECTRONICO: '',
        TELEFONO: '',
        CORREGIMIENTO: '',
        RESGUARDO: '',
        VEREDA: '',
        FK_ROL: '',
        FK_DEPENDENCIAS: ''
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    // Validaciones
    if (!formData.NUMEROIDENTIFICACION || !formData.PRIMERNOMBRE || !formData.PRIMERAPELLIDO || !formData.CORREOELECTRONICO) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    if (editingPersona) {
      // Actualizar persona existente
      setPersonas(prev => prev.map(p => 
        p.PK_PERSONA === editingPersona.PK_PERSONA
          ? {
              ...p,
              ...formData,
              FK_ROL: formData.FK_ROL ? parseInt(formData.FK_ROL) : undefined,
              FK_DEPENDENCIAS: formData.FK_DEPENDENCIAS ? parseInt(formData.FK_DEPENDENCIAS) : undefined,
              FECHAACTUALIZADO: new Date().toISOString(),
              ACTUALIZADOPOR: 1,
              nombreCompleto: `${formData.PRIMERNOMBRE} ${formData.SEGUNDONOMBRE || ''} ${formData.PRIMERAPELLIDO} ${formData.SEGUNDOAPELLIDO || ''}`.trim()
            }
          : p
      ));
      toast.success('Persona actualizada exitosamente');
    } else {
      // Crear nueva persona
      const nuevaPersona: Persona = {
        PK_PERSONA: Math.floor(Math.random() * 10000),
        ...formData,
        FK_ROL: formData.FK_ROL ? parseInt(formData.FK_ROL) : undefined,
        FK_DEPENDENCIAS: formData.FK_DEPENDENCIAS ? parseInt(formData.FK_DEPENDENCIAS) : undefined,
        FECHACREADO: new Date().toISOString(),
        CREADOPOR: 1,
        nombreCompleto: `${formData.PRIMERNOMBRE} ${formData.SEGUNDONOMBRE || ''} ${formData.PRIMERAPELLIDO} ${formData.SEGUNDOAPELLIDO || ''}`.trim()
      };
      setPersonas(prev => [nuevaPersona, ...prev]);
      toast.success('Persona creada exitosamente');
    }

    setDialogOpen(false);
  };

  const handleDelete = (persona: Persona) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${persona.nombreCompleto}?`)) {
      setPersonas(prev => prev.filter(p => p.PK_PERSONA !== persona.PK_PERSONA));
      toast.success('Persona eliminada exitosamente');
    }
  };

  const filteredPersonas = personas.filter(persona =>
    persona.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.NUMEROIDENTIFICACION.includes(searchTerm) ||
    persona.CORREOELECTRONICO.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Personas</h2>
                <p className="text-gray-600 mt-1">Administra el catálogo de personas del sistema</p>
              </div>
            </div>
            <Button onClick={() => handleOpenDialog()} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Nueva Persona
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{personas.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Personas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {personas.filter(p => p.TIPO_PERSONA === 'NATURAL').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Personas Naturales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {personas.filter(p => p.FK_ROL).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Con Rol Asignado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {personas.filter(p => p.FK_DEPENDENCIAS).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Con Dependencia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y Tabla */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listado de Personas</CardTitle>
            <div className="flex items-center gap-2 max-w-sm">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nombre, identificación o email..."
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
                  <TableHead>Identificación</TableHead>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersonas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No hay personas registradas. Haz clic en "Nueva Persona" para agregar una.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPersonas.map((persona) => (
                    <TableRow key={persona.PK_PERSONA}>
                      <TableCell className="font-mono">{persona.TIPO_DOCUMENTO} {persona.NUMEROIDENTIFICACION}</TableCell>
                      <TableCell className="font-medium">{persona.nombreCompleto}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{persona.TIPO_PERSONA}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{persona.CORREOELECTRONICO}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {persona.TELEFONO && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{persona.TELEFONO}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{persona.GENERO}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(persona)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(persona)}
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPersona ? 'Editar Persona' : 'Nueva Persona'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para {editingPersona ? 'editar' : 'crear'} una persona en el sistema SIGECOR con todos sus datos personales y de contacto.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información Personal */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de Documento *</Label>
                    <Select value={formData.TIPO_DOCUMENTO} onValueChange={(value) => setFormData({...formData, TIPO_DOCUMENTO: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                        <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                        <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                        <SelectItem value="PA">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Número de Identificación *</Label>
                    <Input
                      value={formData.NUMEROIDENTIFICACION}
                      onChange={(e) => setFormData({...formData, NUMEROIDENTIFICACION: e.target.value})}
                      placeholder="Ej: 1234567890"
                    />
                  </div>

                  <div>
                    <Label>Primer Nombre *</Label>
                    <Input
                      value={formData.PRIMERNOMBRE}
                      onChange={(e) => setFormData({...formData, PRIMERNOMBRE: e.target.value})}
                      placeholder="Ej: Juan"
                    />
                  </div>

                  <div>
                    <Label>Segundo Nombre</Label>
                    <Input
                      value={formData.SEGUNDONOMBRE}
                      onChange={(e) => setFormData({...formData, SEGUNDONOMBRE: e.target.value})}
                      placeholder="Ej: Carlos"
                    />
                  </div>

                  <div>
                    <Label>Primer Apellido *</Label>
                    <Input
                      value={formData.PRIMERAPELLIDO}
                      onChange={(e) => setFormData({...formData, PRIMERAPELLIDO: e.target.value})}
                      placeholder="Ej: Pérez"
                    />
                  </div>

                  <div>
                    <Label>Segundo Apellido</Label>
                    <Input
                      value={formData.SEGUNDOAPELLIDO}
                      onChange={(e) => setFormData({...formData, SEGUNDOAPELLIDO: e.target.value})}
                      placeholder="Ej: García"
                    />
                  </div>

                  <div>
                    <Label>Género *</Label>
                    <Select value={formData.GENERO} onValueChange={(value) => setFormData({...formData, GENERO: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                        <SelectItem value="O">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tipo de Persona *</Label>
                    <Select value={formData.TIPO_PERSONA} onValueChange={(value) => setFormData({...formData, TIPO_PERSONA: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NATURAL">Persona Natural</SelectItem>
                        <SelectItem value="JURIDICA">Persona Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de Contacto */}
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
                      value={formData.CORREOELECTRONICO}
                      onChange={(e) => setFormData({...formData, CORREOELECTRONICO: e.target.value})}
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  <div>
                    <Label>Teléfono</Label>
                    <Input
                      value={formData.TELEFONO}
                      onChange={(e) => setFormData({...formData, TELEFONO: e.target.value})}
                      placeholder="3001234567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Dirección</Label>
                    <Input
                      value={formData.DIRECCION}
                      onChange={(e) => setFormData({...formData, DIRECCION: e.target.value})}
                      placeholder="Calle 123 # 45-67"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ubicación Indígena */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">Ubicación (Específico para AIC)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Resguardo</Label>
                    <Input
                      value={formData.RESGUARDO}
                      onChange={(e) => setFormData({...formData, RESGUARDO: e.target.value})}
                      placeholder="Nombre del resguardo"
                    />
                  </div>

                  <div>
                    <Label>Vereda</Label>
                    <Input
                      value={formData.VEREDA}
                      onChange={(e) => setFormData({...formData, VEREDA: e.target.value})}
                      placeholder="Nombre de la vereda"
                    />
                  </div>

                  <div>
                    <Label>Corregimiento</Label>
                    <Input
                      value={formData.CORREGIMIENTO}
                      onChange={(e) => setFormData({...formData, CORREGIMIENTO: e.target.value})}
                      placeholder="Nombre del corregimiento"
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
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                {editingPersona ? 'Actualizar' : 'Crear'} Persona
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}