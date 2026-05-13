import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  FileText, 
  Inbox, 
  Send, 
  Clock, 
  CheckCircle,
  Archive,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Progress } from './ui/progress';

interface DashboardStatsProps {
  totalCorrespondencia: number;
  entrada: number;
  salida: number;
  pendientes: number;
  enProceso: number;
  respondidos: number;
  archivados: number;
}

export function DashboardStats({
  totalCorrespondencia,
  entrada,
  salida,
  pendientes,
  enProceso,
  respondidos,
  archivados
}: DashboardStatsProps) {
  const stats = [
    {
      title: 'Total Correspondencia',
      value: totalCorrespondencia,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      gradient: 'from-green-500 to-green-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Entrada',
      value: entrada,
      icon: Inbox,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      gradient: 'from-emerald-500 to-emerald-600',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Salida',
      value: salida,
      icon: Send,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      gradient: 'from-teal-500 to-teal-600',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Pendientes',
      value: pendientes,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      gradient: 'from-orange-500 to-orange-600',
      change: '-3%',
      changeType: 'decrease'
    },
    {
      title: 'En Proceso',
      value: enProceso,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      gradient: 'from-yellow-500 to-yellow-600',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Respondidos',
      value: respondidos,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      gradient: 'from-green-500 to-green-600',
      change: '+20%',
      changeType: 'increase'
    },
    {
      title: 'Archivados',
      value: archivados,
      icon: Archive,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      gradient: 'from-gray-500 to-gray-600',
      change: '+10%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const percentage = totalCorrespondencia > 0 ? (stat.value / totalCorrespondencia) * 100 : 0;
        
        return (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-green-600 relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className={`text-xs font-medium flex items-center gap-1 ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? '↑' : '↓'} {stat.change}
                </div>
              </div>
              
              <div className="mt-3">
                <Progress value={percentage} className="h-1.5" />
                <p className="text-xs text-gray-500 mt-1">
                  {percentage.toFixed(1)}% del total
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}