import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Eye, 
  Search, 
  Filter,
  FileText,
  Calendar,
  User,
  Building,
  Download,
  MoreVertical,
  Share2,
  Archive,
  Printer
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { CorrespondenciaGeneral } from '../types/correspondencia';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CorrespondenciaTableProps {
  correspondencias: CorrespondenciaGeneral[];
  onViewDetail: (correspondencia: CorrespondenciaGeneral) => void;
  title?: string;
  subtitle?: string;
}

export function CorrespondenciaTable({ 
  correspondencias, 
  onViewDetail,
  title = 'Bandeja de Correspondencia',
  subtitle = 'Gestión y seguimiento de documentos'
}: CorrespondenciaTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('TODOS');
  const [filterEstado, setFilterEstado] = useState<string>('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCorrespondencias = correspondencias.filter(corr => {
    const matchSearch = 
      corr.numero_radicado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      corr.asunto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      corr.remitenteNombre?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchFilter = 
      filterTipo === 'TODOS' || 
      corr.tipoCorrespondencia === filterTipo;

    const matchEstado =
      filterEstado === 'TODOS' ||
      corr.estadoDocumento === filterEstado;

    return matchSearch && matchFilter && matchEstado;
  });

  // Paginación
  const totalPages = Math.ceil(filteredCorrespondencias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredCorrespondencias.slice(startIndex, endIndex);

  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, { className: string, label: string }> = {
      'RADICADO': { className: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Radicado' },
      'EN PROCESO': { className: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'En Proceso' },
      'ASIGNADO': { className: 'bg-purple-100 text-purple-800 border-purple-300', label: 'Asignado' },
      'RESPONDIDO': { className: 'bg-green-100 text-green-800 border-green-300', label: 'Respondido' },
      'ARCHIVADO': { className: 'bg-gray-100 text-gray-800 border-gray-300', label: 'Archivado' },
      'ACTIVO': { className: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Activo' },
      'PENDIENTE': { className: 'bg-orange-100 text-orange-800 border-orange-300', label: 'Pendiente' }
    };
    
    const config = variants[estado] || { className: 'bg-gray-100 text-gray-800 border-gray-300', label: estado };
    return (
      <Badge className={`${config.className} border font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const getTipoBadge = (tipo: string) => {
    const colors: Record<string, string> = {
      'ENTRADA': 'bg-green-100 text-green-800 border-green-300',
      'SALIDA': 'bg-purple-100 text-purple-800 border-purple-300',
      'INTERNA': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    
    return (
      <Badge className={`${colors[tipo] || 'bg-gray-100 text-gray-800'} border font-medium`}>
        {tipo}
      </Badge>
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-green-600" />
              {title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por radicado, asunto o remitente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los tipos</SelectItem>
              <SelectItem value="ENTRADA">Entrada</SelectItem>
              <SelectItem value="SALIDA">Salida</SelectItem>
              <SelectItem value="INTERNA">Interna</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los estados</SelectItem>
              <SelectItem value="RADICADO">Radicado</SelectItem>
              <SelectItem value="EN PROCESO">En Proceso</SelectItem>
              <SelectItem value="ASIGNADO">Asignado</SelectItem>
              <SelectItem value="RESPONDIDO">Respondido</SelectItem>
              <SelectItem value="ARCHIVADO">Archivado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabla */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Radicado</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold">Fecha</TableHead>
                  <TableHead className="font-semibold">Remitente</TableHead>
                  <TableHead className="font-semibold">Asunto</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="text-right font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <FileText className="h-12 w-12 text-gray-300" />
                        <p className="font-medium">No se encontraron documentos</p>
                        <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((corr) => (
                    <TableRow key={corr.PK_CORRESPONDENCIA} className="hover:bg-green-50 transition-colors">
                      <TableCell className="font-mono text-sm font-semibold text-green-600">
                        {corr.numero_radicado}
                      </TableCell>
                      <TableCell>
                        {getTipoBadge(corr.tipoCorrespondencia || '')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {format(new Date(corr.fecha), 'dd/MM/yyyy', { locale: es })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {corr.FK_EMPRESA_REMITE ? (
                            <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          ) : (
                            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-sm truncate max-w-[200px]" title={corr.remitenteNombre}>
                            {corr.remitenteNombre}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <span className="text-sm truncate block" title={corr.asunto}>
                          {corr.asunto}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(corr.estadoDocumento || corr.estado_correspondencia)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetail(corr)}
                            className="gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Ver
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Compartir
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Descargar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archivar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Paginación */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
            <span className="font-medium">{Math.min(endIndex, filteredCorrespondencias.length)}</span> de{' '}
            <span className="font-medium">{filteredCorrespondencias.length}</span> registros
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && <span className="px-2">...</span>}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}