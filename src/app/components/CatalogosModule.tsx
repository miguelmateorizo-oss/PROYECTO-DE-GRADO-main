import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, Building2, List } from 'lucide-react';
import { PersonasModule } from './PersonasModule';
import { EmpresasModule } from './EmpresasModule';

export function CatalogosModule() {
  const [activeTab, setActiveTab] = useState('personas');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-indigo-600 bg-gradient-to-r from-indigo-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <List className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Catálogos del Sistema</h2>
              <p className="text-gray-600 mt-1">Administra personas y empresas del sistema</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="personas" className="gap-2">
            <Users className="h-4 w-4" />
            Personas
          </TabsTrigger>
          <TabsTrigger value="empresas" className="gap-2">
            <Building2 className="h-4 w-4" />
            Empresas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personas" className="mt-6">
          <PersonasModule />
        </TabsContent>

        <TabsContent value="empresas" className="mt-6">
          <EmpresasModule />
        </TabsContent>
      </Tabs>
    </div>
  );
}
