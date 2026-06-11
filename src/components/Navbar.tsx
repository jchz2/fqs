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
