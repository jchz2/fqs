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

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static controlled JSON-LD schema, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
