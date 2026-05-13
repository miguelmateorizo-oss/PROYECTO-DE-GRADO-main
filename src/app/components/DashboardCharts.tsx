import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';

export function DashboardCharts() {
  // Datos para gráfico de barras - Correspondencia por mes
  const monthlyData = [
    { mes: 'Ene', entrada: 45, salida: 32, interna: 18 },
    { mes: 'Feb', entrada: 52, salida: 38, interna: 22 },
    { mes: 'Mar', entrada: 48, salida: 35, interna: 20 },
    { mes: 'Abr', entrada: 61, salida: 42, interna: 25 },
    { mes: 'May', entrada: 55, salida: 40, interna: 23 },
    { mes: 'Jun', entrada: 58, salida: 43, interna: 24 },
  ];

  // Datos para gráfico de torta - Estados
  const estadosData = [
    { name: 'Radicado', value: 25, color: '#3b82f6' },
    { name: 'En Proceso', value: 35, color: '#eab308' },
    { name: 'Asignado', value: 15, color: '#a855f7' },
    { name: 'Respondido', value: 20, color: '#10b981' },
    { name: 'Archivado', value: 5, color: '#6b7280' },
  ];

  // Datos para gráfico de líneas - Tendencia semanal
  const weeklyData = [
    { dia: 'Lun', documentos: 12 },
    { dia: 'Mar', documentos: 19 },
    { dia: 'Mié', documentos: 15 },
    { dia: 'Jue', documentos: 22 },
    { dia: 'Vie', documentos: 18 },
    { dia: 'Sáb', documentos: 8 },
    { dia: 'Dom', documentos: 3 },
  ];

  // Datos de dependencias con más documentos
  const dependenciasData = [
    { name: 'Secretaría General', value: 45 },
    { name: 'Gerencia', value: 38 },
    { name: 'Jurídica', value: 32 },
    { name: 'Contratación', value: 28 },
    { name: 'Archivo', value: 22 },
  ];

  const COLORS = ['#3b82f6', '#eab308', '#a855f7', '#10b981', '#6b7280'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Gráfico de correspondencia mensual */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Correspondencia Mensual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} id="chart-monthly">
              <CartesianGrid key="grid-monthly" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="xaxis-monthly" dataKey="mes" stroke="#888" fontSize={12} />
              <YAxis key="yaxis-monthly" stroke="#888" fontSize={12} />
              <Tooltip 
                key="tooltip-monthly"
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend key="legend-monthly" />
              <Bar key="bar-entrada" dataKey="entrada" fill="#10b981" name="Entrada" radius={[8, 8, 0, 0]} />
              <Bar key="bar-salida" dataKey="salida" fill="#a855f7" name="Salida" radius={[8, 8, 0, 0]} />
              <Bar key="bar-interna" dataKey="interna" fill="#3b82f6" name="Interna" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de estados */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-purple-600" />
            Distribución por Estado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart id="chart-pie-estados">
              <Pie
                key="pie-estados"
                data={estadosData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {estadosData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="tooltip-pie" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de tendencia semanal */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Tendencia Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData} id="chart-line-weekly">
              <CartesianGrid key="grid-weekly" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="xaxis-weekly" dataKey="dia" stroke="#888" fontSize={12} />
              <YAxis key="yaxis-weekly" stroke="#888" fontSize={12} />
              <Tooltip 
                key="tooltip-weekly"
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                key="line-weekly"
                type="monotone" 
                dataKey="documentos" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de dependencias */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600" />
            Documentos por Dependencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dependenciasData} layout="vertical" id="chart-bar-dependencias">
              <CartesianGrid key="grid-dep" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="xaxis-dep" type="number" stroke="#888" fontSize={12} />
              <YAxis key="yaxis-dep" dataKey="name" type="category" stroke="#888" fontSize={12} width={120} />
              <Tooltip 
                key="tooltip-dep"
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar key="bar-dep" dataKey="value" fill="#f59e0b" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}