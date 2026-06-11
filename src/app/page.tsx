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
