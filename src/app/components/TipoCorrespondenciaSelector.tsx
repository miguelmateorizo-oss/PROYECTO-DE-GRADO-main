import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';

interface TipoCorrespondenciaSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (tipo: 'ENTRADA' | 'SALIDA' | 'INTERNA') => void;
}

export function TipoCorrespondenciaSelector({ open, onClose, onSelect }: TipoCorrespondenciaSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Seleccione el Tipo de Correspondencia</DialogTitle>
          <DialogDescription>
            Elija el tipo de documento que desea radicar en el sistema
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-gray-600 mb-6">
            ¿Qué tipo de documento desea radicar?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ENTRADA */}
            <button 
              className="p-0 border-0 bg-transparent cursor-pointer w-full"
              onClick={() => {
                onSelect('ENTRADA');
                onClose();
              }}
            >
              <Card className="hover:shadow-lg transition-all border-2 hover:border-green-500 h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowDown className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">ENTRADA</h3>
                  <p className="text-sm text-gray-600">
                    Documentos recibidos de personas, empresas o entidades externas
                  </p>
                </CardContent>
              </Card>
            </button>

            {/* SALIDA */}
            <button 
              className="p-0 border-0 bg-transparent cursor-pointer w-full"
              onClick={() => {
                onSelect('SALIDA');
                onClose();
              }}
            >
              <Card className="hover:shadow-lg transition-all border-2 hover:border-blue-500 h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">SALIDA</h3>
                  <p className="text-sm text-gray-600">
                    Documentos que la AIC envía a destinatarios externos
                  </p>
                </CardContent>
              </Card>
            </button>

            {/* INTERNA */}
            <button 
              className="p-0 border-0 bg-transparent cursor-pointer w-full"
              onClick={() => {
                onSelect('INTERNA');
                onClose();
              }}
            >
              <Card className="hover:shadow-lg transition-all border-2 hover:border-purple-500 h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">INTERNA</h3>
                  <p className="text-sm text-gray-600">
                    Comunicaciones entre dependencias de la AIC
                  </p>
                </CardContent>
              </Card>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}