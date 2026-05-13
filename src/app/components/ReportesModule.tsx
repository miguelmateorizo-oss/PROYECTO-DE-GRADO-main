import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  BarChart3, 
  Download,
  FileText,
  TrendingUp,
  Calendar,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { toast } from 'sonner';

export function ReportesModule() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Datos de producción documental
  const produccionData = [
    { mes: 'Ene', entradas: 45, salidas: 32, internas: 18 },
    { mes: 'Feb', entradas: 52, salidas: 38, internas: 22 },
    { mes: 'Mar', entradas: 48, salidas: 35, internas: 20 },
    { mes: 'Abr', entradas: 61, salidas: 42, internas: 25 },
    { mes: 'May', entradas: 55, salidas: 40, internas: 23 },
    { mes: 'Jun', entradas: 58, salidas: 43, internas: 24 },
  ];

  // Datos por dependencia
  const dependenciaData = [
    { name: 'Secretaría General', documentos: 245, porcentaje: 28 },
    { name: 'Gerencia', documentos: 198, porcentaje: 23 },
    { name: 'Jurídica', documentos: 165, porcentaje: 19 },
    { name: 'Contratación', documentos: 142, porcentaje: 16 },
    { name: 'Archivo', documentos: 120, porcentaje: 14 },
  ];

  // Datos de tiempo de respuesta
  const tiempoRespuestaData = [
    { rango: '0-2 días', cantidad: 45 },
    { rango: '3-5 días', cantidad: 68 },
    { rango: '6-10 días', cantidad: 42 },
    { rango: '11-15 días', cantidad: 18 },
    { rango: '>15 días', cantidad: 7 },
  ];

  // Datos de tipos documentales
  const tiposDocumentalesData = [
    { name: 'Oficios', value: 320, color: '#3b82f6' },
    { name: 'Memorandos', value: 180, color: '#8b5cf6' },
    { name: 'Resoluciones', value: 95, color: '#10b981' },
    { name: 'Contratos', value: 142, color: '#f59e0b' },
    { name: 'Circulares', value: 68, color: '#ef4444' },
    { name: 'Otros', value: 125, color: '#6b7280' },
  ];

  // Datos de cumplimiento TRD
  const cumplimientoTRDData = [
    { mes: 'Ene', cumplimiento: 92 },
    { mes: 'Feb', cumplimiento: 94 },
    { mes: 'Mar', cumplimiento: 91 },
    { mes: 'Abr', cumplimiento: 96 },
    { mes: 'May', cumplimiento: 95 },
    { mes: 'Jun', cumplimiento: 97 },
  ];

  const handleExportReport = (reportType: string) => {
    toast.success(`Exportando reporte: ${reportType}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-orange-600 bg-gradient-to-r from-orange-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reportes y Estadísticas
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Módulo de generación de reportes estadísticos y analíticos para la toma de decisiones 
                y cumplimiento de indicadores de gestión documental.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-white">
                  ISO 15489 - Gestión de Documentos
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Indicadores de Gestión
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Ley 594 de 2000
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles de filtrado */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Período de análisis
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes">Este mes</SelectItem>
                  <SelectItem value="trimestre">Este trimestre</SelectItem>
                  <SelectItem value="semestre">Este semestre</SelectItem>
                  <SelectItem value="año">Este año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Año
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => handleExportReport('Reporte General')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Todo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores clave */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documentos Procesados</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">1,847</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
              </div>
              <FileText className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo Promedio</p>
                <p className="text-3xl font-bold text-green-600 mt-2">2.8 días</p>
                <p className="text-xs text-green-600 mt-1">-15% más rápido</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cumplimiento TRD</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">95%</p>
                <p className="text-xs text-green-600 mt-1">+3% vs mes anterior</p>
              </div>
              <Activity className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa de Respuesta</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">97%</p>
                <p className="text-xs text-green-600 mt-1">+2% vs mes anterior</p>
              </div>
              <Calendar className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de reportes */}
      <Tabs defaultValue="produccion">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="produccion">Producción Documental</TabsTrigger>
          <TabsTrigger value="dependencias">Por Dependencia</TabsTrigger>
          <TabsTrigger value="tiempos">Tiempos de Respuesta</TabsTrigger>
          <TabsTrigger value="cumplimiento">Cumplimiento</TabsTrigger>
        </TabsList>

        {/* Producción Documental */}
        <TabsContent value="produccion" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Producción Mensual por Tipo</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleExportReport('Producción Mensual')}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={produccionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="mes" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="entradas" fill="#10b981" name="Entrada" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="salidas" fill="#8b5cf6" name="Salida" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="internas" fill="#3b82f6" name="Interna" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Distribución por Tipo Documental</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleExportReport('Tipos Documentales')}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={tiposDocumentalesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {tiposDocumentalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Resumen estadístico */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Resumen Estadístico</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Entradas</p>
                  <p className="text-2xl font-bold text-green-600">319</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Salidas</p>
                  <p className="text-2xl font-bold text-purple-600">230</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Internas</p>
                  <p className="text-2xl font-bold text-blue-600">132</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total General</p>
                  <p className="text-2xl font-bold text-orange-600">681</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Por Dependencia */}
        <TabsContent value="dependencias" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Producción por Dependencia</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('Por Dependencia')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {dependenciaData.map((dep, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{dep.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{dep.porcentaje}%</span>
                        <span className="text-sm font-bold text-gray-900">{dep.documentos}</span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${dep.porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tiempos de Respuesta */}
        <TabsContent value="tiempos" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Análisis de Tiempos de Respuesta</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('Tiempos de Respuesta')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={tiempoRespuestaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#888" fontSize={12} />
                  <YAxis dataKey="rango" type="category" stroke="#888" fontSize={12} width={100} />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Tiempo Promedio</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">2.8 días</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Tiempo Mínimo</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">0.5 días</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Tiempo Máximo</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">18 días</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cumplimiento */}
        <TabsContent value="cumplimiento" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Cumplimiento de TRD y Normativa</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('Cumplimiento')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cumplimientoTRDData}>
                  <defs>
                    <linearGradient id="colorCumplimiento" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="mes" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} domain={[80, 100]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="cumplimiento" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCumplimiento)"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-green-600">
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-1">Cumplimiento TRD</p>
                    <p className="text-3xl font-bold text-green-600">95%</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-600">
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-1">Cumplimiento Normativo</p>
                    <p className="text-3xl font-bold text-blue-600">97%</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-600">
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-1">Meta Institucional</p>
                    <p className="text-3xl font-bold text-purple-600">90%</p>
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
