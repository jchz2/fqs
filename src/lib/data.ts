export const OEM_COLORS: Record<string, string> = {
  ford: '#2563EB',
  gm: '#e53e3e',
  stellantis: '#ed8936',
  bmw: '#4299e1',
  audi: '#f6e05e',
  vw: '#48bb78',
  other: '#9f7aea',
}

export const ESTADOS = [
  'Estado de México',
  'Toluca',
  'Ciudad de México',
  'Querétaro',
  'Puebla',
  'Guanajuato',
  'Aguascalientes',
  'San Luis Potosí',
  'Coahuila',
  'Sonora',
  'Baja California',
] as const

export const PLANTAS: { nombre: string; oem: keyof typeof OEM_COLORS }[] = [
  { nombre: 'Ford CSAP', oem: 'ford' },
  { nombre: 'Ford HSAP', oem: 'ford' },
  { nombre: 'Ford IEPC', oem: 'ford' },
  { nombre: 'Stellantis TAP', oem: 'stellantis' },
  { nombre: 'Stellantis Derramadero', oem: 'stellantis' },
  { nombre: 'American Axle Silao', oem: 'other' },
  { nombre: 'GM Silao', oem: 'gm' },
  { nombre: 'GM San Luis Potosí', oem: 'gm' },
  { nombre: 'GM Ramos Arizpe', oem: 'gm' },
  { nombre: 'BMW San Luis Potosí', oem: 'bmw' },
  { nombre: 'Audi Puebla', oem: 'audi' },
  { nombre: 'Volkswagen Puebla', oem: 'vw' },
  { nombre: 'Android Cututitlán', oem: 'other' },
  { nombre: 'Android Hermosillo', oem: 'other' },
  { nombre: 'Android Saltillo', oem: 'other' },
  { nombre: 'Mazda Celaya', oem: 'other' },
  { nombre: 'Nissan Aguascalientes', oem: 'other' },
  { nombre: 'IAC Hermosillo', oem: 'other' },
  { nombre: 'Grupo Antolin Toluca', oem: 'other' },
  { nombre: 'ZF Toluca', oem: 'other' },
  { nombre: 'ZF San Luis Potosí', oem: 'other' },
]

export const SERVICIOS = [
  {
    id: 'inspeccion',
    numero: '01',
    icono: '🔍',
    titulo: 'Inspección y Sorteos',
    descripcion:
      'Revisión 100% de componentes críticos en línea o fuera de ella. Separamos piezas conformes de no conformes con criterios definidos por el cliente, garantizando que solo las partes correctas lleguen a producción.',
    destacado: true,
  },
  {
    id: 'residente',
    numero: '02',
    icono: '👷',
    titulo: 'Ingeniero Residente',
    descripcion:
      'Personal técnico certificado integrado en tu planta, con presencia continua para monitorear procesos, resolver incidencias y mantener los estándares de calidad.',
    destacado: false,
  },
  {
    id: 'reflasheos',
    numero: '03',
    icono: '⚡',
    titulo: 'Reflasheos',
    descripcion:
      'Actualización de software en módulos electrónicos automotrices (ECU/TCU). Ejecutamos en planta o en patio con equipos calibrados y personal certificado.',
    destacado: false,
  },
  {
    id: 'seguimiento',
    numero: '04',
    icono: '📊',
    titulo: 'Seguimiento de Proyectos',
    descripcion:
      'Gestión y monitoreo de proyectos de calidad con reportes en tiempo real, KPIs definidos y comunicación directa con tu equipo de ingeniería.',
    destacado: false,
  },
  {
    id: 'campanas',
    numero: '05',
    icono: '🚗',
    titulo: 'Campañas en Patios',
    descripcion:
      'Inspección y corrección de vehículos en patios de distribuidores y plantas. Equipo móvil listo para despliegue en cualquiera de nuestros 11 estados.',
    destacado: false,
  },
] as const

export const NORMAS_ISO = [
  { numero: '9001', nombre: 'Calidad' },
  { numero: '45001', nombre: 'Seguridad' },
  { numero: '14001', nombre: 'Ambiental' },
  { numero: '27001', nombre: 'Info. Segura' },
  { numero: '29001', nombre: 'Petróleo' },
  { numero: '19001', nombre: 'Auditorías' },
] as const

export const SERVICIOS_CONSULTORIA = [
  { icono: '📋', titulo: 'Diagnóstico y Brechas', subtitulo: 'Evaluación inicial vs. norma requerida' },
  { icono: '📐', titulo: 'Diseño del SGC', subtitulo: 'Documentación y procedimientos' },
  { icono: '🎓', titulo: 'Capacitación', subtitulo: 'Formación del equipo interno' },
  { icono: '✅', titulo: 'Auditorías Internas', subtitulo: 'Preparación para certificadora' },
] as const

export const CLIENTES = ['Ford', 'GM', 'Stellantis', 'BMW', 'Audi', 'Volkswagen'] as const

export const CONTACTO = {
  directorGeneral: {
    nombre: 'Ricardo Hernández',
    rol: 'Director General',
    emails: ['ricardo_hernandez@fqs.mx', 'admin@fqs.mx'],
    telefonos: ['+52 55 8070 4800', '+52 55 5106 0550'],
  },
  consultoria: {
    nombre: 'Jonatan Hernández',
    rol: 'Director de Consultoría',
    emails: ['consultoria@fqs.mx', 'jonatan_hernandez@fqs.mx'],
    telefonos: ['+52 55 8070 4800'],
  },
} as const

export const REDES_SOCIALES = [
  {
    nombre: 'LinkedIn',
    url: 'https://www.linkedin.com/company/fast-quality-services-mx/',
    icono: 'linkedin',
  },
  {
    nombre: 'Facebook',
    url: 'https://www.facebook.com/pages/FQS-Fast-Quality-Sevices/406034329554134',
    icono: 'facebook',
  },
] as const

export const STATS = [
  { valor: '20+', etiqueta: 'Años' },
  { valor: '11', etiqueta: 'Estados' },
  { valor: '21', etiqueta: 'Plantas' },
  { valor: '6+', etiqueta: 'OEMs' },
] as const

export const MASCOTA_URL =
  'https://fqs.mx/_assets/media/b1a1b31465ab2e49aeaa9dd16aafb29f.png'

export const WHATSAPP_URL =
  'https://wa.me/525580704800?text=Hola%2C%20me%20interesa%20conocer%20sus%20servicios.'
