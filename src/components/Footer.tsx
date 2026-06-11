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
