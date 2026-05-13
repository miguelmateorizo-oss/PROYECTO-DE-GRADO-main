import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Archive, 
  Search, 
  FileText, 
  TrendingUp,
  Download,
  Upload,
  Package,
  Clock,
  CheckCircle2,
  ArrowRightLeft,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface ArchivoItem {
  id: string;
  codigo: string;
  nombre: string;
  dependencia: string;
  ubicacion: string;
  folios: number;
  estado: string;
  fechaTransferencia: string;
}

export function ArchivoModule() {
  const [activeTab, setActiveTab] = useState('inventario');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para inventario
  const inventarioData: ArchivoItem[] = [
    {
      id: '1',
      codigo: 'CAJ-2024-001',
      nombre: 'Correspondencia General - Enero 2024',
      dependencia: 'Secretaría General',
      ubicacion: 'Estante A1-B2-C3',
      folios: 450,
      estado: 'Activo',
      fechaTransferencia: '2024-02-01'
    },
    {
      id: '2',
      codigo: 'CAJ-2024-002',
      nombre: 'Contratos 2024 - Lote 1',
      dependencia: 'Contratación',
      ubicacion: 'Estante B2-C3-D1',
      folios: 1200,
      estado: 'Activo',
      fechaTransferencia: '2024-02-15'
    },
    {
      id: '3',
      codigo: 'CAJ-2023-045',
      nombre: 'Actos Administrativos 2023',
      dependencia: 'Jurídica',
      ubicacion: 'Estante C3-D1-E2',
      folios: 850,
      estado: 'Transferido',
      fechaTransferencia: '2023-12-20'
    }
  ];

  // Datos de transferencias documentales
  const transferenciasData = [
    {
      id: '1',
      tipo: 'Primaria',
      origen: 'Archivo de Gestión - Gerencia',
      destino: 'Archivo Central',
      fecha: '2024-01-15',
      estado: 'Completada',
      unidades: 15
    },
    {
      id: '2',
      tipo: 'Secundaria',
      origen: 'Archivo Central',
      destino: 'Archivo Histórico',
      fecha: '2024-01-20',
      estado: 'En Proceso',
      unidades: 8
    },
    {
      id: '3',
      tipo: 'Primaria',
      origen: 'Archivo de Gestión - Jurídica',
      destino: 'Archivo Central',
      fecha: '2024-02-05',
      estado: 'Pendiente',
      unidades: 12
    }
  ];

  const getEstadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      'Activo': 'bg-green-100 text-green-800 border-green-300',
      'Transferido': 'bg-blue-100 text-blue-800 border-blue-300',
      'En Préstamo': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Eliminado': 'bg-red-100 text-red-800 border-red-300',
      'Completada': 'bg-green-100 text-green-800 border-green-300',
      'En Proceso': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Pendiente': 'bg-orange-100 text-orange-800 border-orange-300'
    };
    
    return (
      <Badge className={`${colors[estado] || 'bg-gray-100 text-gray-800'} border font-medium`}>
        {estado}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-600 bg-gradient-to-r from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Archive className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestión de Archivo
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Sistema Integral de Conservación de Documentos (SICD) - Gestión del ciclo vital del documento 
                desde su producción hasta su disposición final.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-white">
                  Acuerdo 027 de 2006 AGN
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Acuerdo 038 de 2002 AGN
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Ley 594 de 2000
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unidades Documentales</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">156</p>
                <Progress value={75} className="mt-3 h-2" />
              </div>
              <Package className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cajas Archivadas</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">1,243</p>
                <Progress value={60} className="mt-3 h-2" />
              </div>
              <Archive className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Folios Totales</p>
                <p className="text-3xl font-bold text-green-600 mt-2">45,680</p>
                <Progress value={85} className="mt-3 h-2" />
              </div>
              <FileText className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transferencias 2024</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">23</p>
                <Progress value={45} className="mt-3 h-2" />
              </div>
              <ArrowRightLeft className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de gestión */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventario" className="gap-2">
            <FileText className="h-4 w-4" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="transferencias" className="gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            Transferencias
          </TabsTrigger>
          <TabsTrigger value="prestamos" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Préstamos
          </TabsTrigger>
          <TabsTrigger value="disposicion" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Disposición Final
          </TabsTrigger>
        </TabsList>

        {/* Tab Inventario */}
        <TabsContent value="inventario" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  Inventario Documental
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Nueva Unidad
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
                    placeholder="Buscar por código, nombre o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="transferido">Transferido</SelectItem>
                    <SelectItem value="prestamo">En Préstamo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabla */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Código</TableHead>
                      <TableHead className="font-semibold">Nombre</TableHead>
                      <TableHead className="font-semibold">Dependencia</TableHead>
                      <TableHead className="font-semibold">Ubicación</TableHead>
                      <TableHead className="font-semibold text-center">Folios</TableHead>
                      <TableHead className="font-semibold">Estado</TableHead>
                      <TableHead className="font-semibold">F. Transferencia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventarioData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-purple-50 transition-colors">
                        <TableCell className="font-mono text-sm font-semibold text-purple-600">
                          {item.codigo}
                        </TableCell>
                        <TableCell className="font-medium">{item.nombre}</TableCell>
                        <TableCell className="text-sm text-gray-600">{item.dependencia}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {item.ubicacion}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">{item.folios}</TableCell>
                        <TableCell>{getEstadoBadge(item.estado)}</TableCell>
                        <TableCell className="text-sm text-gray-600">{item.fechaTransferencia}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Transferencias */}
        <TabsContent value="transferencias" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                Transferencias Documentales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Información normativa */}
              <Card className="border-l-4 border-l-blue-600 mb-6">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Archive className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-2">Tipos de Transferencias:</p>
                      <ul className="space-y-1">
                        <li><strong>Primaria:</strong> Del Archivo de Gestión al Archivo Central</li>
                        <li><strong>Secundaria:</strong> Del Archivo Central al Archivo Histórico</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabla de transferencias */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Tipo</TableHead>
                      <TableHead className="font-semibold">Origen</TableHead>
                      <TableHead className="font-semibold">Destino</TableHead>
                      <TableHead className="font-semibold">Fecha</TableHead>
                      <TableHead className="font-semibold text-center">Unidades</TableHead>
                      <TableHead className="font-semibold">Estado</TableHead>
                      <TableHead className="font-semibold text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transferenciasData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-50 transition-colors">
                        <TableCell>
                          <Badge className={item.tipo === 'Primaria' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                            {item.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{item.origen}</TableCell>
                        <TableCell className="text-sm">{item.destino}</TableCell>
                        <TableCell className="text-sm text-gray-600">{item.fecha}</TableCell>
                        <TableCell className="text-center font-semibold">{item.unidades}</TableCell>
                        <TableCell>{getEstadoBadge(item.estado)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6">
                <Button className="w-full md:w-auto">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Nueva Transferencia
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Préstamos */}
        <TabsContent value="prestamos" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Control de Préstamos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gestión de Préstamos Documentales
                </h3>
                <p className="text-gray-600 mb-4">
                  Control de préstamo y devolución de documentos conforme al Acuerdo 042 de 2002 AGN
                </p>
                <Button>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Registrar Préstamo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Disposición Final */}
        <TabsContent value="disposicion" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Disposición Final de Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Card className="border-l-4 border-l-orange-600">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Tipos de Disposición Final:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600 mb-2" />
                        <h5 className="font-semibold text-gray-900 mb-1">Conservación Total</h5>
                        <p className="text-sm text-gray-600">
                          Documentos con valor permanente que pasan al Archivo Histórico
                        </p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600 mb-2" />
                        <h5 className="font-semibold text-gray-900 mb-1">Selección</h5>
                        <p className="text-sm text-gray-600">
                          Documentos de los cuales se seleccionan muestras representativas
                        </p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-red-600 mb-2" />
                        <h5 className="font-semibold text-gray-900 mb-1">Eliminación</h5>
                        <p className="text-sm text-gray-600">
                          Documentos sin valor que se eliminan mediante acta del Comité de Archivo
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                        <h5 className="font-semibold text-gray-900 mb-1">Microfilmación</h5>
                        <p className="text-sm text-gray-600">
                          Documentos que se reproducen en medios técnicos para su conservación
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">
                        Los procesos de disposición final requieren autorización del Comité de Archivo 
                        y cumplimiento del Acuerdo 027 de 2006 del AGN
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
