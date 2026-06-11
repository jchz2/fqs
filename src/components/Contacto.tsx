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
