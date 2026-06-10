# FQS Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el sitio web de una sola página para FQS Fast Quality Services con Next.js 15, Tailwind CSS, Framer Motion, formulario via Resend, y desplegado en Cloudflare Pages.

**Architecture:** Páginas estáticas pre-renderizadas (SSG) con una API Route serverless para el formulario de contacto. Cada sección es un componente React independiente ensamblado en `page.tsx`. Toda la información del negocio vive centralizada en `src/lib/data.ts`.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Resend · react-simple-maps · @cloudflare/next-on-pages

---

## Mapa de Archivos

| Archivo | Responsabilidad |
|---|---|
| `src/lib/data.ts` | Constantes de negocio: estados, plantas, servicios, contactos, normas ISO |
| `src/app/layout.tsx` | Root layout, metadata SEO, Inter font |
| `src/components/JsonLd.tsx` | Schema.org JSON-LD para SEO (LocalBusiness) |
| `src/app/globals.css` | Tailwind directives, variables CSS de paleta de colores |
| `src/app/page.tsx` | Ensamblado de todas las secciones en orden |
| `src/app/api/contact/route.ts` | POST handler que llama Resend y retorna JSON |
| `src/components/Navbar.tsx` | Navbar sticky con blur en scroll, hamburger mobile |
| `src/components/Hero.tsx` | Hero completo: badge, H1, bullets, CTAs, mascota, stats, clientes |
| `src/components/InfoBand.tsx` | Banda de contacto rápido debajo del hero |
| `src/components/AutomotiveSupport.tsx` | MVV (3 cards) + 5 servicios (grid) |
| `src/components/StatsBand.tsx` | Banda de estadísticas: 11 estados / 21 plantas / 20+ años / 6 OEMs |
| `src/components/Consultoria.tsx` | Grid ISOs + lista de servicios + card Jonatan Hernández |
| `src/components/PresenciaNacional.tsx` | Layout con MexicoMap + lista estados + lista plantas |
| `src/components/MexicoMap.tsx` | SVG interactivo de México con react-simple-maps |
| `src/components/Contacto.tsx` | Layout: ContactForm + card Ricardo + card WhatsApp |
| `src/components/ContactForm.tsx` | Formulario con validación, loading y estados de éxito/error |
| `src/components/Footer.tsx` | Logo, links, redes sociales, copyright |
| `src/components/WhatsAppFAB.tsx` | Botón flotante fijo de WhatsApp |
| `src/components/SectionLabel.tsx` | Componente compartido: etiqueta de sección con línea azul |
| `next.config.ts` | Config de Next.js para Cloudflare next-on-pages |
| `wrangler.toml` | Config de Cloudflare Pages |
| `public/robots.txt` | SEO robots |
| `public/sitemap.xml` | SEO sitemap |
| `__tests__/api/contact.test.ts` | Tests del API route de Resend |
| `__tests__/components/ContactForm.test.tsx` | Tests de validación y estados del formulario |

---

## Task 1: Inicializar proyecto Next.js

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `src/app/globals.css`

- [ ] **Paso 1: Crear el proyecto Next.js**

```bash
cd /Users/jncrls/workspace/fqs
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-git
```

Responder en el CLI:
- Would you like to use ESLint? → Yes
- Would you like to use Turbopack? → Yes

- [ ] **Paso 2: Instalar dependencias**

```bash
npm install framer-motion resend react-simple-maps
npm install -D @cloudflare/next-on-pages vercel @types/react-simple-maps
```

- [ ] **Paso 3: Configurar `next.config.ts`**

Reemplazar el contenido con:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fqs.mx',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Paso 4: Configurar `tailwind.config.ts`**

Reemplazar el contenido con:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A2B4A',
          deep: '#0d1929',
          darker: '#060c18',
        },
        electric: {
          DEFAULT: '#2563EB',
          light: '#60a5fa',
        },
        gold: {
          DEFAULT: '#d4af37',
          dark: '#b8962e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'rotate 10s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Paso 5: Configurar `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --color-navy: #1A2B4A;
  --color-navy-deep: #0d1929;
  --color-navy-darker: #060c18;
  --color-electric: #2563EB;
  --color-electric-light: #60a5fa;
  --color-gold: #d4af37;
  --color-gold-dark: #b8962e;
  --color-whatsapp: #25d366;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-navy-darker);
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: rgba(37, 99, 235, 0.3);
}
```

- [ ] **Paso 6: Crear `.env.local`**

```bash
echo "RESEND_API_KEY=re_REPLACE_WITH_REAL_KEY" > .env.local
echo ".env.local" >> .gitignore
```

- [ ] **Paso 7: Crear `wrangler.toml`**

```toml
name = "fqs-website"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

pages_build_output_dir = ".vercel/output/static"

[vars]
# RESEND_API_KEY se configura en Cloudflare Pages dashboard
```

- [ ] **Paso 8: Verificar que el proyecto arranca**

```bash
npm run dev
```

Abrir `http://localhost:3000` — debe mostrar la página default de Next.js. Ctrl+C para detener.

- [ ] **Paso 9: Commit inicial**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 15 project with Tailwind, Framer Motion, Resend"
```

---

## Task 2: Capa de datos

**Files:**
- Create: `src/lib/data.ts`

- [ ] **Paso 1: Crear `src/lib/data.ts`**

```typescript
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
```

- [ ] **Paso 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sin errores.

- [ ] **Paso 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add centralized business data constants"
```

---

## Task 3: API Route de contacto (Resend)

**Files:**
- Create: `src/app/api/contact/route.ts`
- Create: `__tests__/api/contact.test.ts`
- Create: `jest.config.ts`

- [ ] **Paso 1: Instalar dependencias de test**

```bash
npm install -D jest @types/jest ts-jest jest-environment-node
```

Crear `jest.config.ts`:

```typescript
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
```

Agregar en `package.json` dentro de `"scripts"`:
```json
"test": "jest"
```

- [ ] **Paso 2: Escribir el test del API route**

Crear `__tests__/api/contact.test.ts`:

```typescript
import { POST } from '@/app/api/contact/route'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  it('returns 400 when required fields are missing', async () => {
    const req = makeRequest({ nombre: 'Test' })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
  })

  it('returns 200 and sends email when all fields are valid', async () => {
    const req = makeRequest({
      nombre: 'Juan García',
      empresa: 'Planta Norte SA',
      email: 'juan@planta.com',
      servicio: 'Inspección / Sorteos',
      mensaje: 'Necesito cotización para sorteo de 5000 piezas.',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 when email format is invalid', async () => {
    const req = makeRequest({
      nombre: 'Juan García',
      empresa: 'Planta Norte SA',
      email: 'not-an-email',
      servicio: 'Reflasheos',
      mensaje: 'Mensaje de prueba',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Paso 3: Ejecutar test para confirmar que falla**

```bash
npm test -- __tests__/api/contact.test.ts
```

Esperado: FAIL — "Cannot find module '@/app/api/contact/route'"

- [ ] **Paso 4: Implementar `src/app/api/contact/route.ts`**

```typescript
export const runtime = 'edge'

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactPayload {
  nombre: string
  empresa: string
  email: string
  servicio: string
  mensaje: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePayload(
  body: unknown
): { valid: true; data: ContactPayload } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Cuerpo de la solicitud inválido' }
  }
  const { nombre, empresa, email, servicio, mensaje } = body as Record<string, unknown>
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0)
    return { valid: false, error: 'El nombre es requerido' }
  if (!empresa || typeof empresa !== 'string' || empresa.trim().length === 0)
    return { valid: false, error: 'La empresa es requerida' }
  if (!email || typeof email !== 'string' || !isValidEmail(email))
    return { valid: false, error: 'El correo electrónico es inválido' }
  if (!servicio || typeof servicio !== 'string' || servicio.trim().length === 0)
    return { valid: false, error: 'El servicio es requerido' }
  if (!mensaje || typeof mensaje !== 'string' || mensaje.trim().length === 0)
    return { valid: false, error: 'El mensaje es requerido' }
  return { valid: true, data: { nombre, empresa, email, servicio, mensaje } }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const validation = validatePayload(body)
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { nombre, empresa, email, servicio, mensaje } = validation.data

  const emailHtml = [
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">',
    '<div style="background:#1A2B4A;padding:24px;border-radius:8px 8px 0 0;">',
    '<h2 style="color:#ffffff;margin:0;">Nuevo mensaje desde fqs.mx</h2>',
    '</div>',
    '<div style="background:#f8f9fa;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">',
    '<p><strong>Nombre:</strong> ' + nombre + '</p>',
    '<p><strong>Empresa:</strong> ' + empresa + '</p>',
    '<p><strong>Correo:</strong> ' + email + '</p>',
    '<p><strong>Servicio:</strong> ' + servicio + '</p>',
    '<p><strong>Mensaje:</strong></p>',
    '<div style="background:#fff;padding:16px;border-radius:6px;border:1px solid #e2e8f0;">' + mensaje + '</div>',
    '</div>',
    '</div>',
  ].join('')

  const { error } = await resend.emails.send({
    from: 'FQS Sitio Web <no-reply@fqs.mx>',
    to: ['admin@fqs.mx'],
    replyTo: email,
    subject: 'Nuevo contacto web: ' + servicio + ' — ' + empresa,
    html: emailHtml,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Intenta de nuevo.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Paso 5: Ejecutar tests y verificar que pasan**

```bash
npm test -- __tests__/api/contact.test.ts
```

Esperado: 3 tests PASS

- [ ] **Paso 6: Commit**

```bash
git add src/app/api/contact/route.ts __tests__/api/contact.test.ts jest.config.ts package.json
git commit -m "feat: add Resend contact form API route with validation"
```

---

## Task 4: Root Layout, SEO y JSON-LD

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/JsonLd.tsx`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Paso 1: Crear `src/components/JsonLd.tsx`**

Este componente inyecta el schema.org JSON-LD para SEO. El contenido es completamente controlado (viene de nuestras constantes, nunca de input de usuario).

```typescript
export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'FQS Fast Quality Services',
    description:
      'Empresa de ingeniería de calidad automotriz con presencia en 11 estados de México',
    url: 'https://fqs.mx',
    telephone: '+52-55-8070-4800',
    email: 'admin@fqs.mx',
    address: { '@type': 'PostalAddress', addressCountry: 'MX' },
    areaServed: { '@type': 'Country', name: 'México' },
    foundingDate: '2004',
    sameAs: [
      'https://www.linkedin.com/company/fast-quality-services-mx/',
      'https://www.facebook.com/pages/FQS-Fast-Quality-Sevices/406034329554134',
    ],
  }

  // Content is a controlled static object — not user input.
  // JSON.stringify produces safe output with no executable code.
  // eslint-disable-next-line react/no-danger
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static controlled JSON-LD schema, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Paso 2: Actualizar `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'FQS Fast Quality Services — Ingeniería de Calidad Automotriz',
  description:
    'Empresa mexicana especializada en ingeniería de calidad automotriz. Inspecciones, ingenieros residentes, reflasheos, certificaciones ISO y más. Presencia en 11 estados de México.',
  keywords: [
    'ingeniería de calidad automotriz',
    'inspección automotriz México',
    'certificación ISO automotriz',
    'ingenieros residentes calidad',
    'FQS Fast Quality Services',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://fqs.mx',
    siteName: 'FQS Fast Quality Services',
    title: 'FQS — Ingeniería de Calidad Automotriz en México',
    description:
      'Más de 20 años respaldando la calidad de Ford, GM, BMW, Audi, VW y Stellantis en 11 estados de México.',
    images: [
      {
        url: 'https://fqs.mx/_assets/media/b1a1b31465ab2e49aeaa9dd16aafb29f.png',
        width: 512,
        height: 512,
        alt: 'FQS Fast Quality Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FQS — Ingeniería de Calidad Automotriz',
    description: 'Inspecciones, certificaciones ISO y más en 11 estados de México.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Paso 3: Crear `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://fqs.mx/sitemap.xml
```

- [ ] **Paso 4: Crear `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fqs.mx/</loc>
    <lastmod>2026-06-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Paso 5: Commit**

```bash
git add src/app/layout.tsx src/components/JsonLd.tsx public/robots.txt public/sitemap.xml
git commit -m "feat: add SEO metadata, JSON-LD schema, robots.txt and sitemap"
```

---

## Task 5: Componente compartido SectionLabel

**Files:**
- Create: `src/components/SectionLabel.tsx`

- [ ] **Paso 1: Crear `src/components/SectionLabel.tsx`**

```typescript
interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 text-electric text-xs tracking-widest uppercase mb-3">
      <span className="block w-6 h-0.5 bg-electric" />
      {children}
    </div>
  )
}
```

- [ ] **Paso 2: Commit**

```bash
git add src/components/SectionLabel.tsx
git commit -m "feat: add shared SectionLabel component"
```

---

## Task 6: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Paso 1: Crear `src/components/Navbar.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MASCOTA_URL, REDES_SOCIALES } from '@/lib/data'

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#consultoria', label: 'Consultoría' },
  { href: '#presencia', label: 'Presencia' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-darker/90 backdrop-blur-md border-b border-electric/20 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 h-16">
        <a href="#" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-gold/50 shadow-[0_0_16px_rgba(212,175,55,0.3)] overflow-hidden flex-shrink-0">
            <Image src={MASCOTA_URL} alt="FQS Logo" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-widest text-white">FQS</div>
            <div className="text-[9px] text-slate-500 tracking-wide">Fast Quality Services</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-400 hover:text-white text-[11px] tracking-widest uppercase transition-colors">
              {link.label}
            </a>
          ))}
          {REDES_SOCIALES.map((red) => (
            <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer"
              className="text-slate-500 hover:text-electric transition-colors text-sm" aria-label={red.nombre}>
              {red.icono === 'linkedin' ? '💼' : '📘'}
            </a>
          ))}
          <a href="#contacto" className="bg-electric hover:bg-blue-700 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded transition-colors">
            Cotizar →
          </a>
        </div>

        <button className="md:hidden ml-auto text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy-darker/95 backdrop-blur-md border-t border-electric/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-300 text-sm tracking-wide py-1" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="bg-electric text-white text-xs font-bold tracking-widest uppercase px-4 py-3 rounded text-center mt-2" onClick={() => setMenuOpen(false)}>
            Cotizar →
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Paso 2: Crear `src/app/page.tsx` inicial con solo Navbar**

```typescript
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen bg-navy-deep flex items-center justify-center text-white text-2xl">
        En construcción
      </div>
    </main>
  )
}
```

- [ ] **Paso 3: Verificar en el browser**

```bash
npm run dev
```

Abrir `http://localhost:3000`. Verificar: logo visible, links presentes, navbar se vuelve opaca al scrollear.

- [ ] **Paso 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/page.tsx
git commit -m "feat: add sticky Navbar with blur on scroll and mobile hamburger"
```

---

## Task 7: Hero

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Paso 1: Crear `src/components/Hero.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MASCOTA_URL, STATS, CLIENTES, WHATSAPP_URL } from '@/lib/data'

const BULLETS = [
  { texto: 'Inspecciones, sorteos y campañas en patios', gold: false },
  { texto: 'Ingenieros residentes y seguimiento de proyectos', gold: false },
  { texto: 'Certificaciones ISO 9001, 45001, 14001, 27001', gold: false },
  { texto: 'Reflasheos · Presencia en 21 plantas activas', gold: true },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden px-6 py-16"
      style={{ background: 'linear-gradient(160deg, #060c18 0%, #0d1929 40%, #1A2B4A 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-24 right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)' }} />
      <div className="absolute bottom-16 left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <motion.div className="flex-1" variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 bg-electric/10 border border-electric/30 text-electric-light text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
              ✓ Folio 229542 · Empresa certificada · 20+ años
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            Tu aliado en{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">
              ingeniería de calidad
            </span>{' '}
            automotriz
          </motion.h1>

          <motion.p variants={item} className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">
            Respaldo técnico especializado donde tu línea de producción lo necesita — en 11 estados de México.
          </motion.p>

          <motion.ul variants={container} className="mb-7 space-y-2">
            {BULLETS.map((b, i) => (
              <motion.li key={i} variants={item} className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${b.gold ? 'bg-gold' : 'bg-electric'}`} />
                <span className="text-slate-400 text-xs">{b.texto}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="flex items-center gap-4 mb-10">
            <a href="#servicios" className="bg-electric hover:bg-blue-700 text-white text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded transition-colors">
              Conocer servicios →
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#25d366] text-xs font-semibold">
              <span className="w-8 h-8 rounded-full bg-[#25d366]/15 border border-[#25d366]/30 flex items-center justify-center text-sm">💬</span>
              WhatsApp directo
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-2 flex-wrap pt-7 border-t border-white/[0.07]">
            <span className="text-slate-500 text-[9px] tracking-widest uppercase mr-2">Clientes</span>
            {CLIENTES.map((c) => (
              <span key={c} className="bg-white/[0.04] border border-white/[0.08] text-slate-500 text-[9px] font-bold tracking-wide px-2.5 py-1 rounded">
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="flex-shrink-0 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}>
          <div className="relative">
            <div className="absolute -inset-5 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 65%)' }} />
            <div className="animate-rotate-slow absolute -inset-2.5 rounded-full border-2 border-dashed border-gold/40" />
            <motion.div
              className="relative w-44 h-44 rounded-full border-4 border-gold/60 shadow-[0_0_40px_rgba(212,175,55,0.25)] overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image src={MASCOTA_URL} alt="Inspector FQS" fill className="object-cover" priority />
            </motion.div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 w-full">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.etiqueta} className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2.5 text-center">
                <div className="text-electric text-xl font-black leading-none">{s.valor}</div>
                <div className="text-slate-500 text-[8px] uppercase tracking-widest mt-1">{s.etiqueta}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Paso 2: Actualizar `page.tsx`**

```typescript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}
```

- [ ] **Paso 3: Verificar en browser**

```bash
npm run dev
```

Verificar: mascota animada (float + glow), anillo giratorio, bullets con stagger, strip de clientes.

- [ ] **Paso 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with mascota animation and client strip"
```

---

## Task 8: InfoBand, AutomotiveSupport y StatsBand

**Files:**
- Create: `src/components/InfoBand.tsx`
- Create: `src/components/AutomotiveSupport.tsx`
- Create: `src/components/StatsBand.tsx`

- [ ] **Paso 1: Crear `src/components/InfoBand.tsx`**

```typescript
import { CONTACTO } from '@/lib/data'

export default function InfoBand() {
  const { telefonos, emails } = CONTACTO.directorGeneral
  return (
    <div className="bg-electric/[0.08] border-t border-b border-electric/15 py-2.5 px-6 text-center text-slate-500 text-[9px] tracking-widest uppercase">
      Disponibles 24/7 &nbsp;·&nbsp;{' '}
      <a href={`tel:${telefonos[0].replace(/\s/g, '')}`} className="text-electric hover:underline">{telefonos[0]}</a>
      &nbsp;·&nbsp;
      <a href={`tel:${telefonos[1].replace(/\s/g, '')}`} className="text-electric hover:underline">{telefonos[1]}</a>
      &nbsp;·&nbsp;
      <a href={`mailto:${emails[1]}`} className="text-electric hover:underline">{emails[1]}</a>
    </div>
  )
}
```

- [ ] **Paso 2: Crear `src/components/AutomotiveSupport.tsx`**

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import { SERVICIOS } from '@/lib/data'

const MVV = [
  {
    icono: '🎯',
    titulo: 'Misión',
    texto: 'Proveer servicios de ingeniería de calidad confiables y oportunos a la industria automotriz, siendo el socio estratégico que garantiza la continuidad de producción.',
  },
  {
    icono: '🔭',
    titulo: 'Visión',
    texto: 'Ser la empresa líder en México en servicios de calidad automotriz, reconocida por nuestra presencia nacional, capacidad de respuesta y excelencia técnica.',
  },
  {
    icono: '⭐',
    titulo: 'Valores',
    valores: ['Compromiso con el cliente', 'Integridad y transparencia', 'Excelencia técnica', 'Responsabilidad y puntualidad', 'Trabajo en equipo'],
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function AutomotiveSupport() {
  return (
    <section id="servicios" className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #060c18 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Automotive Support</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-2">
            Calidad que{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">respalda</span>{' '}
            tu operación
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl mb-12">
            Somos el equipo técnico que tu planta necesita cuando los estándares no admiten margen de error.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {MVV.map((card, i) => (
            <FadeIn key={card.titulo} delay={i * 0.1}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric to-transparent" />
                <div className="text-3xl mb-3">{card.icono}</div>
                <div className="text-electric text-[10px] tracking-widest uppercase font-bold mb-3">{card.titulo}</div>
                {card.texto ? (
                  <p className="text-slate-400 text-xs leading-relaxed">{card.texto}</p>
                ) : (
                  <ul className="space-y-1.5">
                    {card.valores?.map((v) => (
                      <li key={v} className="flex items-center gap-2 text-slate-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {v}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <SectionLabel>Nuestros Servicios</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-8">
            5 servicios{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">especializados</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {SERVICIOS.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <div className={`bg-white/[0.03] border rounded-xl p-7 h-full relative overflow-hidden group transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/40 ${s.destacado ? 'md:col-span-2 border-electric/25 bg-electric/[0.05]' : 'border-white/[0.07]'}`}>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-slate-500 text-[10px] font-bold tracking-widest mb-4">{s.numero}</div>
                <div className="text-3xl mb-4">{s.icono}</div>
                <h3 className="text-white font-bold text-base mb-2">{s.titulo}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.descripcion}</p>
                {s.destacado && (
                  <span className="inline-block mt-4 bg-electric/[0.12] border border-electric/25 text-electric text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                    Servicio principal
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Paso 3: Crear `src/components/StatsBand.tsx`**

```typescript
import { STATS } from '@/lib/data'

export default function StatsBand() {
  return (
    <div className="bg-electric/[0.06] border-t border-b border-electric/15 py-7 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.etiqueta}>
            <div className="text-electric text-3xl font-black leading-none">{s.valor}</div>
            <div className="text-slate-500 text-[9px] uppercase tracking-widest mt-1.5">{s.etiqueta}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Paso 4: Actualizar `page.tsx`**

```typescript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import InfoBand from '@/components/InfoBand'
import AutomotiveSupport from '@/components/AutomotiveSupport'
import StatsBand from '@/components/StatsBand'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <InfoBand />
      <AutomotiveSupport />
      <StatsBand />
    </main>
  )
}
```

- [ ] **Paso 5: Verificar en browser**

```bash
npm run dev
```

Verificar: cards MVV con fade-in al scroll, servicio "Inspección" ocupa 2 columnas, StatsBand visible.

- [ ] **Paso 6: Commit**

```bash
git add src/components/InfoBand.tsx src/components/AutomotiveSupport.tsx src/components/StatsBand.tsx src/app/page.tsx
git commit -m "feat: add InfoBand, AutomotiveSupport (MVV + services) and StatsBand"
```

---

## Task 9: Consultoría

**Files:**
- Create: `src/components/Consultoria.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Paso 1: Crear `src/components/Consultoria.tsx`**

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import { NORMAS_ISO, SERVICIOS_CONSULTORIA, CONTACTO } from '@/lib/data'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function Consultoria() {
  const { consultoria } = CONTACTO
  return (
    <section id="consultoria" className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060c18 0%, #0d1929 50%, #1A2B4A 100%)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionLabel>Consultoría</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-2">
            Certificaciones ISO{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">que abren puertas</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl mb-12">
            Acompañamos a tu empresa desde el diagnóstico hasta la certificación exitosa.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <FadeIn>
              <SectionLabel>Normas que manejamos</SectionLabel>
              <div className="grid grid-cols-3 gap-3 mt-3 mb-10">
                {NORMAS_ISO.map((iso, i) => (
                  <motion.div key={iso.numero} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-lg py-4 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-transparent" />
                    <div className="text-gold text-xl font-black">{iso.numero}</div>
                    <div className="text-slate-500 text-[9px] tracking-wide mt-1">{iso.nombre}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-3">
                {SERVICIOS_CONSULTORIA.map((s) => (
                  <div key={s.titulo} className="flex items-center gap-4 p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                    <span className="text-xl flex-shrink-0">{s.icono}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{s.titulo}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{s.subtitulo}</div>
                    </div>
                    <span className="text-electric text-base">→</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="bg-electric/[0.08] border border-electric/20 rounded-xl p-7">
              <h3 className="text-lg font-bold mb-1.5">¿Necesitas una certificación ISO?</h3>
              <p className="text-slate-500 text-xs mb-6">Habla directo con nuestro especialista en consultoría</p>
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-white/[0.06]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-blue-700 flex items-center justify-center text-xl flex-shrink-0">👨‍💼</div>
                <div>
                  <div className="font-bold text-sm">{consultoria.nombre}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{consultoria.rol} · FQS</div>
                </div>
              </div>
              <div className="space-y-2.5 mb-6">
                {consultoria.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="flex items-center gap-2.5 text-slate-400 text-xs hover:text-white transition-colors">
                    <span className="w-7 h-7 rounded bg-white/[0.05] flex items-center justify-center text-xs">✉️</span>
                    {email}
                  </a>
                ))}
                {consultoria.telefonos.map((tel) => (
                  <a key={tel} href={`tel:${tel.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-slate-400 text-xs hover:text-white transition-colors">
                    <span className="w-7 h-7 rounded bg-white/[0.05] flex items-center justify-center text-xs">📞</span>
                    {tel}
                  </a>
                ))}
              </div>
              <a href="#contacto" className="block bg-gradient-to-r from-electric to-blue-700 text-white text-center text-xs font-bold tracking-widest uppercase py-3.5 rounded-lg hover:opacity-90 transition-opacity">
                Solicitar consulta gratuita →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Paso 2: Agregar a `page.tsx`**

```typescript
// Agregar import:
import Consultoria from '@/components/Consultoria'
// Agregar en JSX después de <StatsBand />:
// <Consultoria />
```

- [ ] **Paso 3: Verificar en browser** — ISOs con acento dorado, card de Jonatan con emails clickeables.

- [ ] **Paso 4: Commit**

```bash
git add src/components/Consultoria.tsx src/app/page.tsx
git commit -m "feat: add Consultoria section with ISO grid and contact card"
```

---

## Task 10: Presencia Nacional

**Files:**
- Create: `src/components/MexicoMap.tsx`
- Create: `src/components/PresenciaNacional.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Paso 1: Crear `src/components/MexicoMap.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { ESTADOS } from '@/lib/data'

const GEO_URL =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/mexico/mexico-states.json'

const GEO_NAME_MAP: Record<string, string> = {
  'México': 'Estado de México',
  'Distrito Federal': 'Ciudad de México',
  'Querétaro de Arteaga': 'Querétaro',
  'Coahuila de Zaragoza': 'Coahuila',
  'Puebla': 'Puebla',
  'Guanajuato': 'Guanajuato',
  'Aguascalientes': 'Aguascalientes',
  'San Luis Potosí': 'San Luis Potosí',
  'Sonora': 'Sonora',
  'Baja California': 'Baja California',
}

export default function MexicoMap() {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <div className="relative w-full">
      {tooltip && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-navy border border-electric/30 text-white text-xs px-3 py-1.5 rounded-full z-10 pointer-events-none whitespace-nowrap">
          {tooltip}
        </div>
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-102, 24], scale: 1200 }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawName = geo.properties.name as string
              const mapped = GEO_NAME_MAP[rawName] ?? rawName
              const active = (ESTADOS as readonly string[]).includes(mapped)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => active && setTooltip(mapped)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { fill: active ? '#2563EB' : '#1A2B4A', stroke: '#0d1929', strokeWidth: 0.5, outline: 'none' },
                    hover: { fill: active ? '#3b82f6' : '#1e3a5f', stroke: '#0d1929', strokeWidth: 0.5, outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
```

- [ ] **Paso 2: Crear `src/components/PresenciaNacional.tsx`**

```typescript
'use client'

import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import { ESTADOS, PLANTAS, OEM_COLORS, CLIENTES, STATS } from '@/lib/data'

const MexicoMap = dynamic(() => import('./MexicoMap'), { ssr: false })

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function PresenciaNacional() {
  return (
    <section id="presencia" className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060c18 0%, #0a0f1a 100%)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionLabel>Presencia Nacional</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-2">
            Donde tu planta opera,{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">FQS está</span>
          </h2>
          <p className="text-slate-500 text-sm mb-12">11 estados · 21 plantas de ensamble · Respuesta rápida en todo el país</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 mb-10">
          <FadeIn>
            <div className="bg-white/[0.02] border border-electric/15 rounded-xl p-6">
              <div className="text-slate-500 text-[9px] tracking-widest uppercase mb-4">Cobertura en México</div>
              <MexicoMap />
              <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-electric inline-block" /> Con cobertura FQS</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-navy inline-block border border-white/10" /> Sin cobertura</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="text-slate-500 text-[9px] tracking-widest uppercase mb-3">Estados con cobertura</div>
            <div className="space-y-1.5 mb-8">
              {ESTADOS.map((estado, i) => (
                <div key={estado} className="flex items-center gap-3 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg hover:border-electric/30 hover:bg-electric/[0.05] transition-all">
                  <span className="text-electric text-[10px] font-bold tracking-wide min-w-[22px]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-slate-200 text-xs font-semibold flex-1">{estado}</span>
                  <span className="w-2 h-2 rounded-full bg-electric shadow-[0_0_4px_rgba(37,99,235,0.6)]" />
                </div>
              ))}
            </div>
            <div className="bg-gold/[0.05] border border-gold/20 rounded-xl p-4">
              <div className="text-gold text-[9px] tracking-widest uppercase mb-3">Clientes en estas ubicaciones</div>
              <div className="flex flex-wrap gap-2">
                {CLIENTES.map((c) => (
                  <span key={c} className="bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-bold tracking-wide px-3 py-1.5 rounded">{c}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
            <div className="font-bold text-base mb-1">21 Plantas de Ensamble</div>
            <div className="text-slate-500 text-xs mb-5">Presencia activa en plantas de los principales OEMs de México</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {PLANTAS.map((planta) => (
                <div key={planta.nombre} className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <span className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: OEM_COLORS[planta.oem], boxShadow: `0 0 4px ${OEM_COLORS[planta.oem]}80` }} />
                  <span className="text-slate-400 text-xs">{planta.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {STATS.map((s) => (
              <div key={s.etiqueta} className="bg-electric/[0.07] border border-electric/15 rounded-xl py-5 text-center">
                <div className="text-electric text-3xl font-black leading-none">{s.valor}</div>
                <div className="text-slate-500 text-[9px] uppercase tracking-widest mt-1.5">{s.etiqueta}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Paso 3: Agregar a `page.tsx`**

```typescript
import PresenciaNacional from '@/components/PresenciaNacional'
// En JSX después de <Consultoria />: <PresenciaNacional />
```

- [ ] **Paso 4: Verificar en browser** — mapa visible con estados azules, lista de 11 estados, 21 plantas con dots de color.

- [ ] **Paso 5: Commit**

```bash
git add src/components/MexicoMap.tsx src/components/PresenciaNacional.tsx src/app/page.tsx
git commit -m "feat: add PresenciaNacional with interactive Mexico SVG map"
```

---

## Task 11: ContactForm, Contacto y tests

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/Contacto.tsx`
- Create: `__tests__/components/ContactForm.test.tsx`
- Modify: `jest.config.ts`
- Modify: `src/app/page.tsx`

- [ ] **Paso 1: Instalar React Testing Library**

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

Actualizar `jest.config.ts`:

```typescript
import type { Config } from 'jest'

const config: Config = {
  projects: [
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/api/**/*.test.ts'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
    },
    {
      displayName: 'jsdom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/components/**/*.test.tsx'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
      setupFilesAfterFramework: ['@testing-library/jest-dom'],
    },
  ],
}

export default config
```

- [ ] **Paso 2: Escribir test del ContactForm**

Crear `__tests__/components/ContactForm.test.tsx`:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

global.fetch = jest.fn()

describe('ContactForm', () => {
  beforeEach(() => { jest.clearAllMocks() })

  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nombre de tu empresa')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('correo@empresa.com')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Describe brevemente tu necesidad...')).toBeInTheDocument()
  })

  it('shows success message when API returns 200', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    render(<ContactForm />)
    await userEvent.type(screen.getByPlaceholderText('Tu nombre completo'), 'Juan García')
    await userEvent.type(screen.getByPlaceholderText('Nombre de tu empresa'), 'Planta Norte')
    await userEvent.type(screen.getByPlaceholderText('correo@empresa.com'), 'juan@planta.com')
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Inspección / Sorteos')
    await userEvent.type(screen.getByPlaceholderText('Describe brevemente tu necesidad...'), 'Cotización para sorteo')
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => { expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument() })
  })

  it('shows error message when API returns 500', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error al enviar' }),
    })
    render(<ContactForm />)
    await userEvent.type(screen.getByPlaceholderText('Tu nombre completo'), 'Juan')
    await userEvent.type(screen.getByPlaceholderText('Nombre de tu empresa'), 'Planta')
    await userEvent.type(screen.getByPlaceholderText('correo@empresa.com'), 'juan@planta.com')
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Reflasheos')
    await userEvent.type(screen.getByPlaceholderText('Describe brevemente tu necesidad...'), 'Mensaje test')
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => { expect(screen.getByText(/error al enviar/i)).toBeInTheDocument() })
  })
})
```

- [ ] **Paso 3: Ejecutar test para confirmar que falla**

```bash
npm test -- --testPathPattern="ContactForm"
```

Esperado: FAIL — "Cannot find module '@/components/ContactForm'"

- [ ] **Paso 4: Crear `src/components/ContactForm.tsx`**

```typescript
'use client'

import { useState, FormEvent } from 'react'

const SERVICIOS_OPTIONS = [
  'Inspección / Sorteos',
  'Ingeniero Residente',
  'Reflasheos',
  'Seguimiento de Proyectos',
  'Campañas en Patios',
  'Consultoría ISO',
  'Otro',
]

interface FormState {
  nombre: string
  empresa: string
  email: string
  servicio: string
  mensaje: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: FormState = { nombre: '', empresa: '', email: '', servicio: '', mensaje: '' }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Error al enviar el mensaje. Intenta de nuevo.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Error de conexión. Verifica tu internet e intenta de nuevo.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold mb-2">Mensaje enviado correctamente</h3>
        <p className="text-slate-400 text-sm mb-6">Nos pondremos en contacto contigo en menos de 24 horas.</p>
        <button onClick={() => setStatus('idle')} className="text-electric text-sm hover:underline">
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const cls = 'w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-electric/50 focus:bg-electric/[0.05] transition-colors'

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de contacto" role="form" className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8">
      <h3 className="text-lg font-bold mb-1.5">Solicitar información</h3>
      <p className="text-slate-500 text-xs mb-6">Todos los campos son requeridos · Respuesta en menos de 24 horas</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Nombre completo</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre completo" required className={cls} />
        </div>
        <div>
          <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Empresa</label>
          <input type="text" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" required className={cls} />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Correo electrónico</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" required className={cls} />
      </div>

      <div className="mb-3">
        <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Servicio requerido</label>
        <select name="servicio" value={form.servicio} onChange={handleChange} required className={`${cls} appearance-none`}>
          <option value="">Selecciona un servicio...</option>
          {SERVICIOS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Mensaje</label>
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Describe brevemente tu necesidad..." required rows={4} className={`${cls} resize-none`} />
      </div>

      {status === 'error' && (
        <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">{errorMsg}</div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full py-3.5 bg-gradient-to-r from-electric to-blue-700 text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje →'}
      </button>
      <p className="text-slate-600 text-[10px] text-center mt-3">Enviado a admin@fqs.mx · Respuesta en &lt; 24 horas</p>
    </form>
  )
}
```

- [ ] **Paso 5: Crear `src/components/Contacto.tsx`**

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import ContactForm from './ContactForm'
import { CONTACTO, WHATSAPP_URL, REDES_SOCIALES } from '@/lib/data'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function Contacto() {
  const { directorGeneral } = CONTACTO
  return (
    <section id="contacto" className="py-20 px-6 relative overflow-hidden border-t border-electric/15"
      style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #060c18 100%)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <SectionLabel>Contacto</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-2">
            Hablemos de{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">tu proyecto</span>
          </h2>
          <p className="text-slate-500 text-sm mb-12">Cuéntanos qué necesitas. Respondemos en menos de 24 horas.</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn><ContactForm /></FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                <div className="text-electric text-[10px] tracking-widest uppercase font-bold mb-4">Director General</div>
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06]">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy to-electric flex items-center justify-center text-lg flex-shrink-0 border-2 border-electric/30">👨‍💼</div>
                  <div>
                    <div className="font-bold text-sm">{directorGeneral.nombre}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{directorGeneral.rol} · FQS</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {directorGeneral.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="flex items-center gap-2.5 text-slate-400 text-xs hover:text-white transition-colors">
                      <span className="w-2 h-2 rounded-full bg-electric flex-shrink-0" />{email}
                    </a>
                  ))}
                  {directorGeneral.telefonos.map((tel) => (
                    <a key={tel} href={`tel:${tel.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-slate-400 text-xs hover:text-white transition-colors">
                      <span className="w-2 h-2 rounded-full bg-electric flex-shrink-0" />{tel}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-[#25d366]/[0.06] border border-[#25d366]/20 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#25d366]/15 border border-[#25d366]/30 flex items-center justify-center text-2xl flex-shrink-0">💬</div>
                <div className="flex-1">
                  <div className="text-[#25d366] font-bold text-sm">WhatsApp directo</div>
                  <div className="text-slate-500 text-xs mt-0.5 mb-3">Respuesta rápida · Sin formularios</div>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-[#25d366] text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-green-400 transition-colors">
                    Abrir chat →
                  </a>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                <div className="text-slate-500 text-[10px] tracking-widest uppercase mb-3">Síguenos</div>
                <div className="flex gap-3">
                  {REDES_SOCIALES.map((red) => (
                    <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-base hover:border-electric/40 transition-colors"
                      aria-label={red.nombre}>
                      {red.icono === 'linkedin' ? '💼' : '📘'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Paso 6: Ejecutar todos los tests**

```bash
npm test
```

Esperado: todos los tests PASS (API route + ContactForm).

- [ ] **Paso 7: Agregar a `page.tsx`**

```typescript
import Contacto from '@/components/Contacto'
// En JSX después de <PresenciaNacional />: <Contacto />
```

Verificar en browser: formulario visible, estados de éxito/error al probar el submit.

- [ ] **Paso 8: Commit**

```bash
git add src/components/ContactForm.tsx src/components/Contacto.tsx __tests__/components/ContactForm.test.tsx jest.config.ts
git commit -m "feat: add ContactForm with Resend integration and Contacto section"
```

---

## Task 12: Footer y WhatsAppFAB

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/WhatsAppFAB.tsx`

- [ ] **Paso 1: Crear `src/components/Footer.tsx`**

```typescript
import Image from 'next/image'
import { MASCOTA_URL, REDES_SOCIALES } from '@/lib/data'

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#consultoria', label: 'Consultoría' },
  { href: '#presencia', label: 'Presencia' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-[#030609] border-t border-white/[0.05] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 border-gold/40 overflow-hidden flex-shrink-0">
            <Image src={MASCOTA_URL} alt="FQS Logo" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-black tracking-widest">FQS</div>
            <div className="text-[9px] text-slate-600">Fast Quality Services · Folio 229542</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-600 hover:text-slate-400 text-[10px] tracking-widest uppercase transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            {REDES_SOCIALES.map((red) => (
              <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xs hover:border-electric/30 transition-colors"
                aria-label={red.nombre}>
                {red.icono === 'linkedin' ? '💼' : '📘'}
              </a>
            ))}
          </div>
          <div className="text-[10px] text-slate-700">
            © {new Date().getFullYear()} FQS Fast Quality Services · Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Paso 2: Crear `src/components/WhatsAppFAB.tsx`**

```typescript
import { WHATSAPP_URL } from '@/lib/data'

export default function WhatsAppFAB() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center text-2xl shadow-[0_4px_24px_rgba(37,211,102,0.4)] animate-bounce-slow hover:scale-110 transition-transform"
    >
      💬
    </a>
  )
}
```

- [ ] **Paso 3: Commit**

```bash
git add src/components/Footer.tsx src/components/WhatsAppFAB.tsx
git commit -m "feat: add Footer with social links and WhatsApp FAB"
```

---

## Task 13: Ensamblado final

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Paso 1: Reemplazar `src/app/page.tsx` con ensamblado completo**

```typescript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import InfoBand from '@/components/InfoBand'
import AutomotiveSupport from '@/components/AutomotiveSupport'
import StatsBand from '@/components/StatsBand'
import Consultoria from '@/components/Consultoria'
import PresenciaNacional from '@/components/PresenciaNacional'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <InfoBand />
      <AutomotiveSupport />
      <StatsBand />
      <Consultoria />
      <PresenciaNacional />
      <Contacto />
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
```

- [ ] **Paso 2: Revisión completa en browser**

```bash
npm run dev
```

Recorrer la página de arriba a abajo verificando:
- [ ] Navbar sticky con blur al scrollear
- [ ] Mascota animada con float + anillo dorado giratorio
- [ ] Hero bullets con stagger fade-in
- [ ] InfoBand con teléfonos y email clickeables
- [ ] MVV con 3 cards y animación al entrar en viewport
- [ ] Servicio "Inspección" ocupa 2 columnas en desktop
- [ ] ISOs con línea superior dorada
- [ ] Mapa de México con 11 estados azules
- [ ] 21 plantas con dots de color por OEM
- [ ] Formulario: submit muestra spinner, luego mensaje de éxito
- [ ] Card de Ricardo con emails y teléfonos clickeables
- [ ] WhatsApp FAB visible y flotante en toda la página
- [ ] Footer con LinkedIn y Facebook

- [ ] **Paso 3: Verificar responsividad**

En DevTools, activar vista mobile (375px):
- [ ] Hamburger menu funcional y cierra al navegar
- [ ] Hero en columna única, mascota debajo del copy
- [ ] Formulario sin overflow horizontal
- [ ] Plantas grid en 2 columnas

- [ ] **Paso 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble complete FQS single-page website"
```

---

## Task 14: Configurar y desplegar en Cloudflare Pages

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`

- [ ] **Paso 1: Agregar scripts de Cloudflare en `package.json`**

En `"scripts"` agregar:
```json
"build:cf": "npx @cloudflare/next-on-pages",
"preview:cf": "npx wrangler pages dev .vercel/output/static"
```

- [ ] **Paso 2: Build de Next.js estándar**

```bash
npm run build
```

Esperado: build exitoso sin errores TypeScript ni de compilación.

- [ ] **Paso 3: Build para Cloudflare**

```bash
npm run build:cf
```

Esperado: directorio `.vercel/output/static` creado.

- [ ] **Paso 4: Autenticar con Cloudflare**

```bash
npx wrangler login
```

Abre el browser para autenticarse con la cuenta de Cloudflare.

- [ ] **Paso 5: Crear proyecto en Cloudflare Pages**

```bash
npx wrangler pages project create fqs-website
```

- [ ] **Paso 6: Primer deploy**

```bash
npx wrangler pages deploy .vercel/output/static --project-name=fqs-website
```

Esperado: URL de preview tipo `https://fqs-website.pages.dev`

- [ ] **Paso 7: Configurar variable de entorno en Cloudflare Pages**

Ir al dashboard de Cloudflare Pages → proyecto `fqs-website` → Settings → Environment Variables → agregar:

```
Variable: RESEND_API_KEY
Value:    re_tu_api_key_real_de_resend.com
```

Activar para Production y Preview. Hacer un re-deploy para que tome efecto:

```bash
npx wrangler pages deploy .vercel/output/static --project-name=fqs-website
```

- [ ] **Paso 8: Configurar dominio personalizado**

En Cloudflare Pages → proyecto `fqs-website` → Custom Domains → Add domain → `fqs.mx`

Seguir las instrucciones de Cloudflare para actualizar los registros DNS del dominio.

- [ ] **Paso 9: Commit final**

```bash
git add package.json
git commit -m "feat: add Cloudflare Pages build scripts and deploy configuration"
```

---

## Checklist de Verificación Final

En la URL de producción (`https://fqs.mx`):

- [ ] Mascota oficial de `fqs.mx` carga correctamente
- [ ] El formulario envía email a `admin@fqs.mx` (probar con datos reales)
- [ ] WhatsApp FAB abre chat con mensaje predefinido "Hola, me interesa conocer sus servicios."
- [ ] LinkedIn y Facebook abren en nueva pestaña con URLs correctas
- [ ] Mapa de México muestra los 11 estados en azul
- [ ] Sitio completamente funcional en mobile (iPhone SE 375px)
- [ ] Sin errores en la consola del browser
- [ ] Lighthouse: Performance ≥ 90 · SEO = 100 · Accessibility ≥ 90

---

## Comandos Clave

```bash
npm run dev          # Desarrollo local → http://localhost:3000
npm test             # Ejecutar todos los tests
npm run build        # Build estándar de Next.js
npm run build:cf     # Build para Cloudflare Pages
npx tsc --noEmit     # Verificar TypeScript sin compilar
```
