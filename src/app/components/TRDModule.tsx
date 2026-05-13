import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
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
import { Shield, Plus, Edit, Trash2, Search, ChevronRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

// Tipos
interface RegistroTRD {
  // Serie
  PK_SERIE: number;
  SERIE_CODIGO: string;
  SERIE_NOMBRE: string;
  SERIE_DESCRIPCION: string;
  SERIE_TIEMPO_RESP_DIAS: number;
  
  // Subserie
  PK_SUBSERIE: number;
  SUBSERIE_CODIGO: string;
  SUBSERIE_NOMBRE: string;
  SUBSERIE_DESCRIPCION: string;
  RETENCION_AG_ANOS: number;
  RETENCION_AC_ANOS: number;
  DISPOSICION_FINAL: string;
  SUBSERIE_ESTADO: string;
  
  // Tipo Documental
  PK_TIPO: number;
  TIPO_CODIGO: string;
  TIPO_NOMBRE: string;
  TIPO_DESCRIPCION: string;
  TIPO_ESTADO: string;
  
  FECHACREADO: string;
  CREADOPOR: string;
}

export function TRDModule() {
  const [registros, setRegistros] = useState<RegistroTRD[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState<RegistroTRD | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    // Serie Documental
    SERIE_CODIGO: '',
    SERIE_NOMBRE: '',
    SERIE_DESCRIPCION: '',
    SERIE_TIEMPO_RESP_DIAS: '0',
    
    // Subserie Documental
    SUBSERIE_CODIGO: '',
    SUBSERIE_NOMBRE: '',
    SUBSERIE_DESCRIPCION: '',
    RETENCION_AG_ANOS: '0',
    RETENCION_AC_ANOS: '0',
    DISPOSICION_FINAL: 'CT',
    SUBSERIE_ESTADO: 'ACTIVO',
    
    // Tipo Documental
    TIPO_CODIGO: '',
    TIPO_NOMBRE: '',
    TIPO_DESCRIPCION: '',
    TIPO_ESTADO: 'ACTIVO'
  });

  const handleOpenDialog = (registro?: RegistroTRD) => {
    if (registro) {
      setEditingRegistro(registro);
      setFormData({
        SERIE_CODIGO: registro.SERIE_CODIGO,
        SERIE_NOMBRE: registro.SERIE_NOMBRE,
        SERIE_DESCRIPCION: registro.SERIE_DESCRIPCION,
        SERIE_TIEMPO_RESP_DIAS: registro.SERIE_TIEMPO_RESP_DIAS.toString(),
        SUBSERIE_CODIGO: registro.SUBSERIE_CODIGO,
        SUBSERIE_NOMBRE: registro.SUBSERIE_NOMBRE,
        SUBSERIE_DESCRIPCION: registro.SUBSERIE_DESCRIPCION,
        RETENCION_AG_ANOS: registro.RETENCION_AG_ANOS.toString(),
        RETENCION_AC_ANOS: registro.RETENCION_AC_ANOS.toString(),
        DISPOSICION_FINAL: registro.DISPOSICION_FINAL,
        SUBSERIE_ESTADO: registro.SUBSERIE_ESTADO,
        TIPO_CODIGO: registro.TIPO_CODIGO,
        TIPO_NOMBRE: registro.TIPO_NOMBRE,
        TIPO_DESCRIPCION: registro.TIPO_DESCRIPCION,
        TIPO_ESTADO: registro.TIPO_ESTADO
      });
    } else {
      setEditingRegistro(null);
      setFormData({
        SERIE_CODIGO: '',
        SERIE_NOMBRE: '',
        SERIE_DESCRIPCION: '',
        SERIE_TIEMPO_RESP_DIAS: '0',
        SUBSERIE_CODIGO: '',
        SUBSERIE_NOMBRE: '',
        SUBSERIE_DESCRIPCION: '',
        RETENCION_AG_ANOS: '0',
        RETENCION_AC_ANOS: '0',
        DISPOSICION_FINAL: 'CT',
        SUBSERIE_ESTADO: 'ACTIVO',
        TIPO_CODIGO: '',
        TIPO_NOMBRE: '',
        TIPO_DESCRIPCION: '',
        TIPO_ESTADO: 'ACTIVO'
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    // Validaciones
    if (!formData.SERIE_CODIGO || !formData.SERIE_NOMBRE) {
      toast.error('Por favor completa los campos de Serie Documental');
      return;
    }
    if (!formData.SUBSERIE_CODIGO || !formData.SUBSERIE_NOMBRE) {
      toast.error('Por favor completa los campos de Subserie Documental');
      return;
    }
    if (!formData.TIPO_CODIGO || !formData.TIPO_NOMBRE) {
      toast.error('Por favor completa los campos de Tipo Documental');
      return;
    }

    if (editingRegistro) {
      // Actualizar registro existente
      setRegistros(prev => prev.map(r => 
        r.PK_TIPO === editingRegistro.PK_TIPO
          ? {
              ...r,
              ...formData,
              SERIE_TIEMPO_RESP_DIAS: parseInt(formData.SERIE_TIEMPO_RESP_DIAS),
              RETENCION_AG_ANOS: parseInt(formData.RETENCION_AG_ANOS),
              RETENCION_AC_ANOS: parseInt(formData.RETENCION_AC_ANOS),
            }
          : r
      ));
      toast.success('Registro TRD actualizado exitosamente');
    } else {
      // Crear nuevo registro completo
      const nuevoRegistro: RegistroTRD = {
        PK_SERIE: Math.floor(Math.random() * 10000),
        PK_SUBSERIE: Math.floor(Math.random() * 10000),
        PK_TIPO: Math.floor(Math.random() * 10000),
        ...formData,
        SERIE_TIEMPO_RESP_DIAS: parseInt(formData.SERIE_TIEMPO_RESP_DIAS),
        RETENCION_AG_ANOS: parseInt(formData.RETENCION_AG_ANOS),
        RETENCION_AC_ANOS: parseInt(formData.RETENCION_AC_ANOS),
        FECHACREADO: new Date().toISOString(),
        CREADOPOR: 'Usuario Actual'
      };
      setRegistros(prev => [nuevoRegistro, ...prev]);
      toast.success('Registro TRD creado exitosamente', {
        description: 'Se creó la Serie, Subserie y Tipo Documental'
      });
    }

    setDialogOpen(false);
  };

  const handleDelete = (registro: RegistroTRD) => {
    if (window.confirm(`¿Eliminar el registro completo de TRD?\n\nSerie: ${registro.SERIE_NOMBRE}\nSubserie: ${registro.SUBSERIE_NOMBRE}\nTipo: ${registro.TIPO_NOMBRE}`)) {
      setRegistros(prev => prev.filter(r => r.PK_TIPO !== registro.PK_TIPO));
      toast.success('Registro TRD eliminado');
    }
  };

  const filteredRegistros = registros.filter(r =>
    r.SERIE_NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.SERIE_CODIGO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.SUBSERIE_NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.SUBSERIE_CODIGO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.TIPO_NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.TIPO_CODIGO.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-indigo-600 bg-gradient-to-r from-indigo-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tabla de Retención Documental (TRD)</h2>
                <p className="text-gray-600 mt-1">Gestión completa de Series, Subseries y Tipos Documentales - Ley 594/2000</p>
              </div>
            </div>
            <Button onClick={() => handleOpenDialog()} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              Nuevo Registro TRD
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{registros.length}</p>
              <p className="text-sm text-gray-600 mt-1">Registros TRD</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {new Set(registros.map(r => r.PK_SERIE)).size}
              </p>
              <p className="text-sm text-gray-600 mt-1">Series</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {new Set(registros.map(r => r.PK_SUBSERIE)).size}
              </p>
              <p className="text-sm text-gray-600 mt-1">Subseries</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {registros.filter(r => r.TIPO_ESTADO === 'ACTIVO').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Tipos Activos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Registros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registros de TRD</CardTitle>
            <div className="flex items-center gap-2 max-w-sm">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar en TRD..."
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
                  <TableHead>Jerarquía TRD</TableHead>
                  <TableHead>Retención</TableHead>
                  <TableHead>Disposición Final</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistros.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No hay registros de TRD. Haz clic en "Nuevo Registro TRD" para crear uno.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRegistros.map((registro) => (
                    <TableRow key={registro.PK_TIPO}>
                      <TableCell>
                        <div className="space-y-2">
                          {/* Serie */}
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-800">SERIE</Badge>
                            <span className="font-mono text-sm">{registro.SERIE_CODIGO}</span>
                            <span className="font-medium">{registro.SERIE_NOMBRE}</span>
                          </div>
                          
                          {/* Subserie */}
                          <div className="flex items-center gap-2 pl-4">
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <Badge className="bg-green-100 text-green-800">SUBSERIE</Badge>
                            <span className="font-mono text-sm">{registro.SUBSERIE_CODIGO}</span>
                            <span className="font-medium">{registro.SUBSERIE_NOMBRE}</span>
                          </div>
                          
                          {/* Tipo Documental */}
                          <div className="flex items-center gap-2 pl-8">
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <Badge className="bg-purple-100 text-purple-800">TIPO</Badge>
                            <span className="font-mono text-sm">{registro.TIPO_CODIGO}</span>
                            <span className="font-medium">{registro.TIPO_NOMBRE}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">AG:</span> {registro.RETENCION_AG_ANOS} años
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">AC:</span> {registro.RETENCION_AC_ANOS} años
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          registro.DISPOSICION_FINAL === 'CT' ? 'bg-green-100 text-green-800' :
                          registro.DISPOSICION_FINAL === 'E' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {registro.DISPOSICION_FINAL === 'CT' ? 'Conservación Total' :
                           registro.DISPOSICION_FINAL === 'E' ? 'Eliminación' : 'Selección'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={registro.TIPO_ESTADO === 'ACTIVO' ? 'default' : 'outline'}>
                          {registro.TIPO_ESTADO}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenDialog(registro)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(registro)} className="text-red-600">
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

      {/* DIALOG: Formulario Unificado */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRegistro ? 'Editar Registro TRD' : 'Nuevo Registro TRD Completo'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para {editingRegistro ? 'editar' : 'crear'} un registro completo de Tabla de Retención Documental incluyendo serie, subserie, tipos documentales y tiempos de retención.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* 1. SERIE DOCUMENTAL */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge className="bg-blue-600">1</Badge>
                  Serie Documental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Código de Serie *</Label>
                    <Input
                      value={formData.SERIE_CODIGO}
                      onChange={(e) => setFormData({...formData, SERIE_CODIGO: e.target.value})}
                      placeholder="Ej: 100"
                    />
                  </div>
                  <div>
                    <Label>Tiempo de Respuesta (días)</Label>
                    <Input
                      type="number"
                      value={formData.SERIE_TIEMPO_RESP_DIAS}
                      onChange={(e) => setFormData({...formData, SERIE_TIEMPO_RESP_DIAS: e.target.value})}
                      placeholder="Ej: 15"
                    />
                  </div>
                </div>
                <div>
                  <Label>Nombre de la Serie *</Label>
                  <Input
                    value={formData.SERIE_NOMBRE}
                    onChange={(e) => setFormData({...formData, SERIE_NOMBRE: e.target.value})}
                    placeholder="Ej: Gestión Administrativa"
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={formData.SERIE_DESCRIPCION}
                    onChange={(e) => setFormData({...formData, SERIE_DESCRIPCION: e.target.value})}
                    placeholder="Descripción de la serie documental"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. SUBSERIE DOCUMENTAL */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge className="bg-green-600">2</Badge>
                  Subserie Documental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Código de Subserie *</Label>
                    <Input
                      value={formData.SUBSERIE_CODIGO}
                      onChange={(e) => setFormData({...formData, SUBSERIE_CODIGO: e.target.value})}
                      placeholder="Ej: 100.01"
                    />
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Select value={formData.SUBSERIE_ESTADO} onValueChange={(value) => setFormData({...formData, SUBSERIE_ESTADO: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVO">Activo</SelectItem>
                        <SelectItem value="INACTIVO">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Nombre de la Subserie *</Label>
                  <Input
                    value={formData.SUBSERIE_NOMBRE}
                    onChange={(e) => setFormData({...formData, SUBSERIE_NOMBRE: e.target.value})}
                    placeholder="Ej: Actas de Reunión"
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={formData.SUBSERIE_DESCRIPCION}
                    onChange={(e) => setFormData({...formData, SUBSERIE_DESCRIPCION: e.target.value})}
                    placeholder="Descripción de la subserie"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Retención AG (años) *</Label>
                    <Input
                      type="number"
                      value={formData.RETENCION_AG_ANOS}
                      onChange={(e) => setFormData({...formData, RETENCION_AG_ANOS: e.target.value})}
                      placeholder="Ej: 5"
                    />
                    <p className="text-xs text-gray-500 mt-1">Archivo de Gestión</p>
                  </div>
                  <div>
                    <Label>Retención AC (años) *</Label>
                    <Input
                      type="number"
                      value={formData.RETENCION_AC_ANOS}
                      onChange={(e) => setFormData({...formData, RETENCION_AC_ANOS: e.target.value})}
                      placeholder="Ej: 10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Archivo Central</p>
                  </div>
                  <div>
                    <Label>Disposición Final *</Label>
                    <Select value={formData.DISPOSICION_FINAL} onValueChange={(value) => setFormData({...formData, DISPOSICION_FINAL: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CT">CT - Conservación Total</SelectItem>
                        <SelectItem value="E">E - Eliminación</SelectItem>
                        <SelectItem value="S">S - Selección</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 3. TIPO DOCUMENTAL */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge className="bg-purple-600">3</Badge>
                  Tipo Documental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Código del Tipo *</Label>
                    <Input
                      value={formData.TIPO_CODIGO}
                      onChange={(e) => setFormData({...formData, TIPO_CODIGO: e.target.value})}
                      placeholder="Ej: 100.01.001"
                    />
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Select value={formData.TIPO_ESTADO} onValueChange={(value) => setFormData({...formData, TIPO_ESTADO: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVO">Activo</SelectItem>
                        <SelectItem value="INACTIVO">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Nombre del Tipo *</Label>
                  <Input
                    value={formData.TIPO_NOMBRE}
                    onChange={(e) => setFormData({...formData, TIPO_NOMBRE: e.target.value})}
                    placeholder="Ej: Acta de Comité Directivo"
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={formData.TIPO_DESCRIPCION}
                    onChange={(e) => setFormData({...formData, TIPO_DESCRIPCION: e.target.value})}
                    placeholder="Descripción del tipo documental"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                <Plus className="h-4 w-4" />
                {editingRegistro ? 'Actualizar Registro TRD' : 'Crear Registro TRD Completo'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}