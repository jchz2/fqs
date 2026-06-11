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
