import { useState } from 'react';
import { Header } from './components/Header';
import { SidebarMejorado } from './components/SidebarMejorado';
import { Breadcrumbs } from './components/Breadcrumbs';
import { DashboardStats } from './components/DashboardStats';
import { DashboardCharts } from './components/DashboardCharts';
import { InfoInstitucional } from './components/InfoInstitucional';
import { ModulosDashboard } from './components/ModulosDashboard';
import { LoginScreen, UserSession } from './components/LoginScreen';
import { BandejaPersonal } from './components/BandejaPersonal';
import { CorrespondenciaTable } from './components/CorrespondenciaTable';
import { RadicacionFormWizard } from './components/RadicacionFormWizard';
import { TipoCorrespondenciaSelector } from './components/TipoCorrespondenciaSelector';
import { CorrespondenciaSalida } from './components/CorrespondenciaSalida';
import { DocumentoDetail } from './components/DocumentoDetail';
import { TRDModule } from './components/TRDModule';
import { ArchivoModule } from './components/ArchivoModule';
import { ReportesModule } from './components/ReportesModule';
import { UsuariosModule } from './components/UsuariosModule';
import { DependenciasModule } from './components/DependenciasModule';
import { CatalogosModule } from './components/CatalogosModule';
import { Toaster } from './components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { AlertCircle, TrendingUp, Clock, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import type { CorrespondenciaGeneral } from './types/correspondencia';
import type { HistorialDocumento } from './types/historial';
import { crearEntradaHistorial } from './types/historial';
import { correspondencias as initialCorrespondencias } from './data/mock-data';
import { estadosDocumento } from './data/catalogos';
import { mediosRespuesta } from './data/medios-respuesta';
import { toast } from 'sonner';

export default function App() {
  // Estado de autenticación
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [radicacionOpen, setRadicacionOpen] = useState(false);
  const [salidaOpen, setSalidaOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCorrespondencia, setSelectedCorrespondencia] = useState<CorrespondenciaGeneral | null>(null);
  const [correspondencias, setCorrespondencias] = useState<CorrespondenciaGeneral[]>(initialCorrespondencias);
  const [respuestas, setRespuestas] = useState<Record<number, any>>({});
  const [historialDocumentos, setHistorialDocumentos] = useState<Record<number, HistorialDocumento[]>>({});

  // Función para abrir el selector de tipo
  const handleNewDocument = () => {
    setSelectorOpen(true);
  };

  // Función cuando se selecciona un tipo
  const handleTipoSelected = (tipo: 'ENTRADA' | 'SALIDA' | 'INTERNA') => {
    if (tipo === 'SALIDA') {
      setSalidaOpen(true);
    } else {
      setRadicacionOpen(true);
    }
  };

  // Si no hay usuario, mostrar pantalla de login
  if (!user) {
    return (
      <>
        <LoginScreen onLogin={setUser} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Calcular estadísticas
  const totalCorrespondencia = correspondencias.length;
  const entrada = correspondencias.filter(c => c.FK_TIPO_CORRESPONDENCIA === 1).length;
  const salida = correspondencias.filter(c => c.FK_TIPO_CORRESPONDENCIA === 2).length;
  const interna = correspondencias.filter(c => c.FK_TIPO_CORRESPONDENCIA === 3).length;
  
  const radicados = correspondencias.filter(c => c.estadoDocumento === 'RADICADO').length;
  const enProceso = correspondencias.filter(c => c.estadoDocumento === 'EN PROCESO').length;
  const respondidos = correspondencias.filter(c => c.estadoDocumento === 'RESPONDIDO').length;
  const archivados = correspondencias.filter(c => c.estadoDocumento === 'ARCHIVADO').length;

  // Documentos próximos a vencer (ejemplo: en los próximos 5 días)
  const vencidos = 2;

  const handleViewDetail = (corr: CorrespondenciaGeneral) => {
    setSelectedCorrespondencia(corr);
    setDetailOpen(true);
  };

  const handleSaveRadicacion = (data: any) => {
    const newCorrespondencia: CorrespondenciaGeneral = {
      PK_CORRESPONDENCIA: correspondencias.length + 1,
      FK_PERSONA_REMITE: Number(data.remitentePersona) || undefined,
      FK_EMPRESA_REMITE: Number(data.remitenteEmpresa) || undefined,
      FK_PERSONA_DESTINO: Number(data.destinatario),
      FK_TIPO_CORRESPONDENCIA: Number(data.tipoCorrespondencia),
      FK_MEDIO_RECEPCION: Number(data.medioRecepcion),
      FK_TIPO_REMITENTE: Number(data.tipoRemitente),
      FK_DOCUMENTO: correspondencias.length + 1,
      fecha: data.fecha,
      hora: data.hora,
      numero_radicado: data.numeroRadicado,
      estado_correspondencia: 'ACTIVO',
      observaciones: data.observaciones,
      remitenteNombre: 'Remitente',
      destinoNombre: 'Destinatario',
      tipoCorrespondencia: data.tipoCorrespondencia === '1' ? 'ENTRADA' : data.tipoCorrespondencia === '2' ? 'SALIDA' : 'INTERNA',
      estadoDocumento: 'ASIGNADO',
      asunto: data.asunto
    };
    
    setCorrespondencias([newCorrespondencia, ...correspondencias]);
    
    // Simular notificación por email
    toast.success('Documento asignado correctamente', {
      description: `Se ha enviado notificación por email al responsable del área`
    });
  };

  const handleResponderCorrespondencia = (corrId: number, respuestaData: any) => {
    // Crear el registro de respuesta
    const fechaActual = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toLocaleTimeString('es-CO', { hour12: false });
    
    const medioRespuestaTexto = mediosRespuesta.find(m => m.value === respuestaData.medioRespuesta)?.label || 'Correo Electrónico';
    
    const nuevaRespuesta = {
      PK_RESPUESTA_DOCUMENTO: Math.floor(Math.random() * 10000),
      FK_DOCUMENTO_ORIGEN: corrId,
      FK_DOCUMENTO_RESPUESTA: respuestaData.adjuntos && respuestaData.adjuntos.length > 0 
        ? Math.floor(Math.random() * 10000) // ID del documento adjunto
        : undefined,
      fecha_respuesta: fechaActual,
      FK_MEDIO_RESPUESTA: parseInt(respuestaData.medioRespuesta) || 1,
      observaciones: respuestaData.respuesta,
      fecha_creado: `${fechaActual} ${horaActual}`,
      creado_por: user!.id,
      nombreUsuario: user!.nombre,
      medioRespuestaTexto: medioRespuestaTexto,
      nombreDocumentoAdjunto: respuestaData.adjuntos && respuestaData.adjuntos.length > 0
        ? respuestaData.adjuntos.join(', ')
        : undefined,
      adjuntos: respuestaData.adjuntos || []
    };
    
    // Guardar la respuesta en el estado
    setRespuestas(prev => ({
      ...prev,
      [corrId]: nuevaRespuesta
    }));
    
    // Actualizar el estado del documento
    setCorrespondencias(prev => 
      prev.map(corr => 
        corr.PK_CORRESPONDENCIA === corrId
          ? { 
              ...corr, 
              estadoDocumento: 'RESPONDIDO',
              observaciones: (corr.observaciones || '') + `\n\n[${fechaActual} ${horaActual}] ${user!.nombre}: ${respuestaData.respuesta}`
            }
          : corr
      )
    );
    
    // Aquí guardarías nuevaRespuesta en tu base de datos
    console.log('Nueva respuesta guardada:', nuevaRespuesta);
    
    // Simular notificación de email al remitente original
    toast.success('Respuesta registrada exitosamente', {
      description: 'Se ha enviado notificación al remitente original'
    });
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      setUser(null);
      setActiveTab('dashboard');
      toast.info('Sesión cerrada correctamente');
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbMap: Record<string, { label: string }[]> = {
      dashboard: [{ label: 'Dashboard' }],
      entrada: [{ label: 'Correspondencia' }, { label: 'Entrada' }],
      salida: [{ label: 'Correspondencia' }, { label: 'Salida' }],
      interna: [{ label: 'Correspondencia' }, { label: 'Interna' }],
      pendientes: [{ label: 'Bandejas' }, { label: 'Pendientes' }],
      vencidos: [{ label: 'Bandejas' }, { label: 'Por Vencer' }],
      proceso: [{ label: 'Bandejas' }, { label: 'En Proceso' }],
      finalizados: [{ label: 'Bandejas' }, { label: 'Finalizados' }],
      archivo: [{ label: 'Gestión' }, { label: 'Archivo' }],
      trd: [{ label: 'Gestión' }, { label: 'TRD' }],
      reportes: [{ label: 'Gestión' }, { label: 'Reportes' }],
      usuarios: [{ label: 'Administración' }, { label: 'Usuarios' }],
      dependencias: [{ label: 'Administración' }, { label: 'Dependencias' }],
      catalogos: [{ label: 'Administración' }, { label: 'Catálogos' }],
      configuracion: [{ label: 'Administración' }, { label: 'Configuración' }],
    };
    return breadcrumbMap[activeTab] || [{ label: 'Inicio' }];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header onMenuClick={() => {}} />

      <div className="flex pt-[8.5rem]">
        {/* Sidebar */}
        <SidebarMejorado
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNewRadicacion={handleNewDocument}
          stats={{
            total: totalCorrespondencia,
            entrada,
            salida,
            pendientes: radicados,
            vencidos
          }}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            <Breadcrumbs items={getBreadcrumbs()} />

            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Panel de Control</h2>
                    <p className="text-gray-600 mt-1">Vista general del sistema de correspondencia</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>

                {/* Información del Usuario Actual */}
                <Card className="border-l-4 border-l-green-600 bg-gradient-to-r from-green-50 to-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{user.nombre}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-green-600">
                            {user.rol === 'VENTANILLA' ? 'Ventanilla Única' : user.rol === 'ADMINISTRADOR' ? 'Administrador' : 'Responsable de Área'}
                          </Badge>
                          {user.dependenciaNombre && (
                            <Badge variant="outline">{user.dependenciaNombre}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <DashboardStats
                  totalCorrespondencia={totalCorrespondencia}
                  entrada={entrada}
                  salida={salida}
                  pendientes={radicados}
                  enProceso={enProceso}
                  respondidos={respondidos}
                  archivados={archivados}
                />

                {/* Alertas y notificaciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-l-4 border-l-red-500 bg-red-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Documentos por vencer</p>
                          <p className="text-2xl font-bold text-red-600">2</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tendencia mensual</p>
                          <p className="text-2xl font-bold text-blue-600">+12%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tiempo promedio</p>
                          <p className="text-2xl font-bold text-green-600">2.5 días</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DashboardCharts />

                {/* Módulos del Sistema */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Módulos del Sistema</h3>
                  <p className="text-gray-600 mb-6">Selecciona un módulo para acceder a sus funcionalidades</p>
                  <ModulosDashboard
                    onModuleClick={(moduleId) => setActiveTab(moduleId)}
                    stats={{
                      entrada,
                      salida,
                      pendientes: radicados,
                      vencidos
                    }}
                  />
                </div>

                {/* Información Institucional */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Información Institucional</h3>
                  <InfoInstitucional />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                      <CardTitle>Últimos Documentos Radicados</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {correspondencias.slice(0, 5).map((corr) => (
                          <div
                            key={corr.PK_CORRESPONDENCIA}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-gray-100"
                            onClick={() => handleViewDetail(corr)}
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900">{corr.asunto}</p>
                              <p className="text-xs text-gray-600 font-mono mt-1">{corr.numero_radicado}</p>
                            </div>
                            <Badge className="ml-2">
                              {corr.estadoDocumento}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                      <CardTitle>Estado de Documentos</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {estadosDocumento.map((estado) => {
                          const count = correspondencias.filter(
                            c => c.estadoDocumento === estado.nombre
                          ).length;
                          const percentage = totalCorrespondencia > 0 
                            ? (count / totalCorrespondencia) * 100 
                            : 0;
                          
                          return (
                            <div key={estado.PK_ESTADO_DOCUMENTO}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">{estado.nombre}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
                                  <span className="text-sm font-bold text-gray-900 w-8 text-right">{count}</span>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Correspondencia Entrada */}
            {activeTab === 'entrada' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Correspondencia de Entrada</h2>
                  <p className="text-gray-600 mt-1">Documentos recibidos por la entidad</p>
                </div>
                <CorrespondenciaTable
                  correspondencias={correspondencias.filter(c => c.FK_TIPO_CORRESPONDENCIA === 1)}
                  onViewDetail={handleViewDetail}
                  title="Documentos de Entrada"
                  subtitle="Gestión de correspondencia recibida"
                />
              </div>
            )}

            {/* Correspondencia Salida */}
            {activeTab === 'salida' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Correspondencia de Salida</h2>
                  <p className="text-gray-600 mt-1">Documentos enviados por la entidad</p>
                </div>
                <CorrespondenciaTable
                  correspondencias={correspondencias.filter(c => c.FK_TIPO_CORRESPONDENCIA === 2)}
                  onViewDetail={handleViewDetail}
                  title="Documentos de Salida"
                  subtitle="Gestión de correspondencia enviada"
                />
              </div>
            )}

            {/* Correspondencia Interna */}
            {activeTab === 'interna' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Correspondencia Interna</h2>
                  <p className="text-gray-600 mt-1">Comunicación entre dependencias</p>
                </div>
                <CorrespondenciaTable
                  correspondencias={correspondencias.filter(c => c.FK_TIPO_CORRESPONDENCIA === 3)}
                  onViewDetail={handleViewDetail}
                  title="Documentos Internos"
                  subtitle="Gestión de correspondencia interna"
                />
              </div>
            )}

            {/* Pendientes */}
            {activeTab === 'pendientes' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Documentos Pendientes</h2>
                  <p className="text-gray-600 mt-1">Documentos que requieren atención</p>
                </div>
                <CorrespondenciaTable
                  correspondencias={correspondencias.filter(c => c.estadoDocumento === 'RADICADO')}
                  onViewDetail={handleViewDetail}
                  title="Bandeja de Pendientes"
                  subtitle="Documentos pendientes de revisión"
                />
              </div>
            )}

            {/* Mi Bandeja Personal */}
            {activeTab === 'mibandeja' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Mi Bandeja Personal</h2>
                    <p className="text-gray-600 mt-1">Documentos asignados a mí para revisar y responder</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
                <BandejaPersonal
                  user={user}
                  correspondencias={correspondencias}
                  onResponder={handleResponderCorrespondencia}
                  onVerDetalle={handleViewDetail}
                />
              </div>
            )}

            {/* Por Vencer */}
            {activeTab === 'vencidos' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Documentos Próximos a Vencer</h2>
                  <p className="text-gray-600 mt-1">Documentos que requieren atención urgente</p>
                </div>
                <Card className="border-l-4 border-l-red-500 bg-red-50 mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-900">Atención Requerida</p>
                        <p className="text-sm text-red-700">
                          Hay {vencidos} documentos que vencen en los próximos 5 días
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <CorrespondenciaTable
                  correspondencias={correspondencias.slice(0, 2)}
                  onViewDetail={handleViewDetail}
                  title="Documentos por Vencer"
                  subtitle="Requieren atención urgente"
                />
              </div>
            )}

            {/* En Proceso */}
            {activeTab === 'proceso' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Documentos en Proceso</h2>
                  <p className="text-gray-600 mt-1">Documentos en trámite</p>
                </div>
                <CorrespondenciaTable
                  correspondencias={correspondencias.filter(c => c.estadoDocumento === 'EN PROCESO' || c.estadoDocumento === 'ASIGNADO')}
                  onViewDetail={handleViewDetail}
                  title="Documentos en Trámite"
                  subtitle="Documentos siendo procesados"
                />
              </div>
            )}

            {/* Finalizados */}
            {activeTab === 'finalizados' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Documentos Finalizados</h2>
                  <p className="text-gray-600 mt-1">Documentos completados</p>
                </div>
                <CorrespondenciaTable
                  correspondencias={correspondencias.filter(c => c.estadoDocumento === 'RESPONDIDO' || c.estadoDocumento === 'ARCHIVADO')}
                  onViewDetail={handleViewDetail}
                  title="Documentos Completados"
                  subtitle="Documentos finalizados y archivados"
                />
              </div>
            )}

            {/* Otras secciones - Módulos completados */}
            {activeTab === 'archivo' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Gestión de Archivo</h2>
                  <p className="text-gray-600 mt-1">Sistema Integral de Conservación de Documentos</p>
                </div>
                <ArchivoModule />
              </div>
            )}

            {activeTab === 'trd' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Tabla de Retención Documental</h2>
                  <p className="text-gray-600 mt-1">Gestión de TRD - Ley 594 de 2000</p>
                </div>
                <TRDModule />
              </div>
            )}

            {activeTab === 'reportes' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Reportes y Estadísticas</h2>
                  <p className="text-gray-600 mt-1">Indicadores de gestión documental</p>
                </div>
                <ReportesModule />
              </div>
            )}

            {activeTab === 'usuarios' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h2>
                  <p className="text-gray-600 mt-1">Administración de usuarios y roles</p>
                </div>
                <UsuariosModule />
              </div>
            )}

            {activeTab === 'dependencias' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Gestión de Dependencias</h2>
                  <p className="text-gray-600 mt-1">Estructura organizacional</p>
                </div>
                <DependenciasModule />
              </div>
            )}

            {activeTab === 'catalogos' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Gestión de Catálogos</h2>
                  <p className="text-gray-600 mt-1">Administración de catálogos</p>
                </div>
                <CatalogosModule />
              </div>
            )}

            {activeTab === 'configuracion' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h2>
                  <p className="text-gray-600 mt-1">Parámetros y ajustes generales</p>
                </div>
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Configuración del Sistema
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Parametrización y ajustes del sistema SIGECOR
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      <Card className="border-l-4 border-l-blue-600">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Parámetros Generales</h4>
                          <p className="text-sm text-gray-600">Configuración básica del sistema</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-green-600">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Radicación</h4>
                          <p className="text-sm text-gray-600">Formato de consecutivos y plantillas</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-600">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Notificaciones</h4>
                          <p className="text-sm text-gray-600">Configuración de alertas y avisos</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-orange-600">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Seguridad</h4>
                          <p className="text-sm text-gray-600">Políticas de acceso y auditoría</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modales */}
      <RadicacionFormWizard
        open={radicacionOpen}
        onClose={() => setRadicacionOpen(false)}
        onSave={handleSaveRadicacion}
      />

      <CorrespondenciaSalida
        open={salidaOpen}
        onClose={() => setSalidaOpen(false)}
      />

      <DocumentoDetail
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        correspondencia={selectedCorrespondencia}
        respuestaInfo={
          selectedCorrespondencia && respuestas[selectedCorrespondencia.PK_CORRESPONDENCIA]
            ? {
                observaciones: respuestas[selectedCorrespondencia.PK_CORRESPONDENCIA].observaciones,
                medioRespuesta: respuestas[selectedCorrespondencia.PK_CORRESPONDENCIA].medioRespuestaTexto,
                adjuntos: respuestas[selectedCorrespondencia.PK_CORRESPONDENCIA].adjuntos,
                fechaRespuesta: respuestas[selectedCorrespondencia.PK_CORRESPONDENCIA].fecha_respuesta,
                responsable: respuestas[selectedCorrespondencia.PK_CORRESPONDENCIA].nombreUsuario
              }
            : null
        }
      />

      <TipoCorrespondenciaSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={handleTipoSelected}
      />

      <Toaster position="top-right" richColors />
    </div>
  );
}