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
