# FQS Fast Quality Services — Rediseño Web

**Fecha:** 2026-06-10  
**Estado:** Aprobado por cliente  
**Proyecto:** `/Users/jncrls/workspace/fqs`

---

## Resumen

Sitio web de una sola página (SPA) para FQS Fast Quality Services, empresa mexicana de ingeniería de calidad automotriz con 20+ años de experiencia. El objetivo es generar confianza inmediata en ingenieros, gerentes de calidad y directores de planta de la industria automotriz.

---

## Stack Técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | Framer Motion |
| Email | Resend (API Route server-side) |
| Mapa | react-simple-maps (SVG México) |
| Hosting | Cloudflare Pages with Functions |
| Adapter | `@cloudflare/next-on-pages` |

**Arquitectura:** páginas estáticas pre-renderizadas (SSG) + una API Route serverless para el formulario de contacto. La API key de Resend vive únicamente en el servidor (Cloudflare Function), nunca expuesta al cliente.

---

## Identidad Visual

### Paleta de colores
```
--color-navy:       #1A2B4A   (fondo principal)
--color-navy-deep:  #0d1929   (fondo hero / secciones oscuras)
--color-blue:       #2563EB   (acento principal, CTAs)
--color-blue-light: #60a5fa   (gradientes, texto accent)
--color-gold:       #d4af37   (sello FQS, acentos secundarios)
--color-gold-dark:  #b8962e   (sombras del sello)
--color-whatsapp:   #25d366   (botón WhatsApp)
--text-primary:     #ffffff
--text-secondary:   #94a3b8
--text-muted:       #475569
```

### Tipografía
- **Fuente:** Inter (Google Fonts) — pesos 400, 600, 700, 800, 900
- **Headings:** 900 weight, letter-spacing negativo
- **Body:** 400/600, line-height 1.6-1.7

### Mascota / Logo
- URL: `https://fqs.mx/_assets/media/b1a1b31465ab2e49aeaa9dd16aafb29f.png`
- Inspector FQS con gorra azul, lentes rojos, chaleco naranja dentro de sello circular dorado
- Aparece en: navbar (36px), hero (180px con anillo giratorio), footer (36px)

---

## Estructura de la Página

```
/
├── <Navbar>          sticky, blur, logo + nav links + CTA
├── <Hero>            fold completo con mascota + stats + clientes
├── <InfoBand>        banda de contacto rápido
├── <AutomotiveSupport>
│   ├── MVV           Misión, Visión, Valores
│   └── Servicios     5 tarjetas (grid 3 cols, Inspección = 2 cols)
├── <StatsBand>       11 estados / 21 plantas / 20+ años / 6 OEMs
├── <Consultoria>     ISOs + servicios + card Jonatan Hernández
├── <PresenciaNacional>  mapa SVG + lista de estados + lista de plantas
├── <Contacto>        formulario + info Ricardo Hernández + WhatsApp
├── <Footer>          logo + links + copyright
└── <WhatsAppFAB>     botón flotante fijo en toda la página
```

---

## Secciones Detalladas

### 1. Navbar
- Sticky con `backdrop-blur` al hacer scroll
- Logo: sello dorado (imagen oficial fqs.mx) + wordmark "FQS" + subtítulo "Fast Quality Services"
- Links: Servicios · Consultoría · Presencia · Contacto
- CTA: botón "Cotizar →" → scroll al formulario de contacto
- Íconos de redes sociales: LinkedIn + Facebook
- Mobile: hamburger menu con drawer

### 2. Hero
- Fondo: `linear-gradient(160deg, #060c18, #0d1929, #1A2B4A)` + grid sutil de líneas `rgba(37,99,235,0.04)`
- Glows de profundidad: radial azul (derecha) + radial dorado (izquierda inferior)
- **Columna izquierda:**
  - Badge: "✓ Folio 229542 · Empresa certificada · 20+ años"
  - H1: "Tu aliado en ingeniería de calidad automotriz"
  - Descripción breve
  - 4 bullets con dot indicator (3 azules + 1 dorado)
  - CTAs: "Conocer servicios →" + "WhatsApp directo"
  - Strip de clientes: Ford · GM · Stellantis · BMW · Audi · Volkswagen
- **Columna derecha:**
  - Mascota oficial (180px) con anillo giratorio dorado + glow
  - 3 stat cards: 20+ Años / 11 Estados / 21 Plantas
- **Animaciones:** fade-in al cargar, float continuo en mascota, bullets con stagger delay

### 3. Automotive Support

#### MVV (3 cards)
- Misión: respaldo técnico especializado para continuidad de producción
- Visión: empresa líder nacional en calidad automotriz
- Valores: Compromiso · Integridad · Excelencia · Responsabilidad · Trabajo en equipo

#### 5 Servicios
| # | Servicio | Layout |
|---|---|---|
| 01 | Inspección y Sorteos | 2 columnas (destacado) |
| 02 | Ingeniero Residente | 1 columna |
| 03 | Reflasheos | 1 columna |
| 04 | Seguimiento de Proyectos | 1 columna |
| 05 | Campañas en Patios | 1 columna |

Grid: 3 columnas desktop, 2 tablet, 1 mobile. Hover: borde azul + línea inferior animada.

### 4. Consultoría

#### Normas ISO manejadas
`9001` · `45001` · `14001` · `27001` · `29001` · `19001`

#### Servicios de consultoría
1. Diagnóstico y Brechas
2. Diseño del SGC
3. Capacitación
4. Auditorías Internas

#### Card de contacto: Jonatan Hernández
- Email: `consultoria@fqs.mx` · `jonatan_hernandez@fqs.mx`
- Tel: `+52 55 8070 4800`
- CTA: "Solicitar consulta gratuita →" → scroll a formulario

### 5. Presencia Nacional

#### 11 Estados
1. Estado de México
2. Toluca
3. Ciudad de México
4. Querétaro
5. Puebla
6. Guanajuato
7. Aguascalientes
8. San Luis Potosí
9. Coahuila
10. Sonora
11. Baja California

#### 21 Plantas (color-coded por OEM)
| Planta | OEM | Color |
|---|---|---|
| Ford CSAP / HSAP / IEPC | Ford | Azul `#2563EB` |
| Stellantis TAP / Derramadero | Stellantis | Naranja `#ed8936` |
| GM Silao / SLP / Ramos Arizpe | GM | Rojo `#e53e3e` |
| BMW San Luis Potosí | BMW | Celeste `#4299e1` |
| Audi Puebla | Audi | Amarillo `#f6e05e` |
| Volkswagen Puebla | VW | Verde `#48bb78` |
| American Axle, Android (3), Mazda, Nissan, IAC, Grupo Antolin, ZF (2) | Otros | Morado `#9f7aea` |

**Mapa:** SVG interactivo de México con `react-simple-maps`. Los 11 estados con cobertura se resaltan en `#2563EB` con tooltip al hover mostrando plantas en ese estado.

### 6. Contacto

#### Formulario
Campos: Nombre · Empresa · Email · Servicio (select) · Mensaje  
Destino: `admin@fqs.mx` vía Resend  
API Route: `POST /api/contact` (Cloudflare Function)  
Validación: client-side + server-side  
Estados: loading spinner → success message → error message

#### Datos de contacto
| Rol | Nombre | Email | Tel |
|---|---|---|---|
| Director General | Ricardo Hernández | `ricardo_hernandez@fqs.mx` · `admin@fqs.mx` | +52 55 8070 4800 · +52 55 5106 0550 |
| Consultoría | Jonatan Hernández | `consultoria@fqs.mx` · `jonatan_hernandez@fqs.mx` | +52 55 8070 4800 |

#### WhatsApp
- URL: `https://wa.me/525580704800?text=Hola%2C%20me%20interesa%20conocer%20sus%20servicios.`
- Aparece en: hero (botón), sección contacto (card), FAB flotante

### 7. Footer
- Logo + "FQS Fast Quality Services · Folio 229542"
- Links de navegación
- Íconos LinkedIn + Facebook
- Copyright: "© 2025 FQS Fast Quality Services · Todos los derechos reservados"

### 8. WhatsApp FAB
- Posición: `fixed bottom-7 right-7`
- Color: `#25d366` con box-shadow verde
- Animación: float continuo (bounce suave)
- Visible en toda la página en todo momento

---

## Redes Sociales

| Red | URL | Incluir |
|---|---|---|
| LinkedIn | `https://www.linkedin.com/company/fast-quality-services-mx/` | ✅ |
| Facebook | `https://www.facebook.com/pages/FQS-Fast-Quality-Sevices/406034329554134` | ✅ |
| Instagram | — | ❌ No tiene |

---

## Integraciones Funcionales

### Resend (formulario de contacto)
- Package: `resend` npm
- API Route: `src/app/api/contact/route.ts`
- Variables de entorno: `RESEND_API_KEY` (en Cloudflare Pages → Settings → Environment Variables)
- Template: HTML email con datos del formulario → destinatario `admin@fqs.mx`
- Cuenta: nueva, por configurar en resend.com

### Cloudflare Pages
- Adapter: `@cloudflare/next-on-pages`
- Build command: `npx @cloudflare/next-on-pages`
- Output directory: `.vercel/output/static`
- Compatibilidad: `nodejs_compat` flag requerido en Cloudflare
- Dominio: `fqs.mx` (DNS apunta a Cloudflare Pages)

---

## SEO

- `metadata` export en `src/app/layout.tsx` con title, description, keywords
- `og:image`, `og:title`, `og:description` para Open Graph
- `robots.txt` y `sitemap.xml` generados estáticamente
- Schema.org `LocalBusiness` JSON-LD
- Alt text en todas las imágenes
- Headings semánticos (H1 único por página)

---

## Responsividad

| Breakpoint | Layout |
|---|---|
| Mobile (< 768px) | 1 columna, hero apilado, hamburger nav |
| Tablet (768-1024px) | 2 columnas, grid de servicios 2 cols |
| Desktop (> 1024px) | Layout completo según mockups |

---

## Animaciones (Framer Motion)

- Hero: fade-in + slide-up al cargar (stagger 0.1s por elemento)
- Mascota: float continuo (y: ±8px, 3s loop)
- Anillo mascota: rotate 360° continuo (10s)
- Cards MVV / Servicios: fade-in + slide-up al entrar en viewport (Intersection Observer)
- Números ISO: counter-up animation al entrar en viewport
- WhatsApp FAB: bounce suave continuo
- Hover en cards: translateY(-2px) + border-color transition

---

## Estructura de Archivos

```
fqs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # metadata SEO, fonts
│   │   ├── page.tsx            # página principal (importa secciones)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # Resend API Route
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── InfoBand.tsx
│   │   ├── AutomotiveSupport.tsx
│   │   ├── StatsBand.tsx
│   │   ├── Consultoria.tsx
│   │   ├── PresenciaNacional.tsx
│   │   ├── MexicoMap.tsx       # react-simple-maps
│   │   ├── Contacto.tsx
│   │   ├── ContactForm.tsx     # formulario con estado
│   │   ├── Footer.tsx
│   │   └── WhatsAppFAB.tsx
│   └── lib/
│       └── data.ts             # estados, plantas, servicios (constantes)
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.ts              # Cloudflare compat (next-on-pages)
├── wrangler.toml               # Cloudflare config
└── .env.local                  # RESEND_API_KEY (no commit)
```

---

## Variables de Entorno

```bash
# .env.local (desarrollo)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Cloudflare Pages → Settings → Environment Variables (producción)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Pendientes / Notas

- Confirmar con FQS si Toluca es un estado separado o debe listarse como parte del Estado de México
- Las URLs de Facebook/LinkedIn están confirmadas por el cliente
- La cuenta de Resend debe crearse en resend.com y verificar el dominio `fqs.mx`
- El dominio `fqs.mx` debe apuntar sus DNS a Cloudflare Pages después del deploy
