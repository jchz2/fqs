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
