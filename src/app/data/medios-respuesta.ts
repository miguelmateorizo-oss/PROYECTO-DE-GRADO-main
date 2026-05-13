import { MedioRespuesta } from '../types/respuesta-documento';

export const mediosRespuesta = [
  {
    value: '1',
    label: 'Correo Electrónico',
    descripcion: 'Respuesta enviada por email',
    requiere_adjunto: false
  },
  {
    value: '2',
    label: 'Oficio Físico',
    descripcion: 'Respuesta en documento físico',
    requiere_adjunto: true
  },
  {
    value: '3',
    label: 'Oficio Digital (PDF)',
    descripcion: 'Respuesta en documento digital',
    requiere_adjunto: true
  },
  {
    value: '4',
    label: 'Memorando',
    descripcion: 'Memorando interno',
    requiere_adjunto: true
  },
  {
    value: '5',
    label: 'Comunicación Interna',
    descripcion: 'Comunicación entre dependencias',
    requiere_adjunto: false
  },
  {
    value: '6',
    label: 'Telefónica',
    descripcion: 'Respuesta por llamada telefónica',
    requiere_adjunto: false
  },
  {
    value: '7',
    label: 'Presencial',
    descripcion: 'Respuesta en persona',
    requiere_adjunto: false
  }
];