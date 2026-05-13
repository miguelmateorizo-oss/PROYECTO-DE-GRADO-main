import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Users, MapPin, Phone, Mail, Globe, FileText } from 'lucide-react';

export function InfoInstitucional() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Información Principal */}
      <Card className="md:col-span-2 border-l-4 border-l-green-600">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">AIC</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Asociación Indígena del Cauca
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Organización que representa y trabaja por el bienestar de las comunidades indígenas del departamento del Cauca, 
                promoviendo el desarrollo integral, la autonomía territorial y la preservación de la identidad cultural de los pueblos indígenas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Popayán, Cauca - Colombia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Tel: (602) XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">info@aicauca.org.co</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">www.aicauca.org.co</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sistema de Gestión */}
      <Card className="border-l-4 border-l-blue-600">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">SIGECOR</h4>
              <p className="text-xs text-gray-600">Sistema Integral de Gestión de Correspondencia</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Versión:</span>
              <Badge variant="outline">v2.0</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Estado:</span>
              <Badge className="bg-green-100 text-green-800">Operativo</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Actualización:</span>
              <Badge variant="outline">2024</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cumplimiento Normativo */}
      <Card className="md:col-span-3 border-l-4 border-l-purple-600 bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-3">Cumplimiento Normativo y Legal</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-sm text-gray-900 mb-1">Ley 594 de 2000</div>
                  <div className="text-xs text-gray-600">Ley General de Archivos</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-sm text-gray-900 mb-1">Decreto 1080/2015</div>
                  <div className="text-xs text-gray-600">Sector Cultura - Archivos</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-sm text-gray-900 mb-1">Acuerdo 004/2013</div>
                  <div className="text-xs text-gray-600">TRD - AGN</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-sm text-gray-900 mb-1">Act. 001-2024</div>
                  <div className="text-xs text-gray-600">Actualización vigente</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Misión y Visión */}
      <Card className="md:col-span-2 border-l-4 border-l-orange-600">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Misión
              </h4>
              <p className="text-sm text-gray-700">
                Representar, defender y promover los derechos colectivos e individuales de las comunidades indígenas del Cauca, 
                fortaleciendo la autonomía, identidad cultural y desarrollo integral de los pueblos originarios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Visión
              </h4>
              <p className="text-sm text-gray-700">
                Ser una organización líder y reconocida en la defensa y promoción de los derechos de los pueblos indígenas, 
                consolidando procesos organizativos autónomos y sostenibles que garanticen el buen vivir de las comunidades.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valores */}
      <Card className="border-l-4 border-l-teal-600">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Valores Institucionales</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-teal-600 rounded-full" />
              Autonomía
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-teal-600 rounded-full" />
              Solidaridad
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-teal-600 rounded-full" />
              Unidad
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-teal-600 rounded-full" />
              Territorio
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-teal-600 rounded-full" />
              Cultura
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
