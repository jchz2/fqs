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
