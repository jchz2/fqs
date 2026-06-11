'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import { SERVICIOS } from '@/lib/data'

const MVV = [
  {
    icono: '🎯',
    titulo: 'Misión',
    texto: 'Proveer servicios de ingeniería de calidad confiables y oportunos a la industria automotriz, siendo el socio estratégico que garantiza la continuidad de producción.',
    valores: undefined,
  },
  {
    icono: '🔭',
    titulo: 'Visión',
    texto: 'Ser la empresa líder en México en servicios de calidad automotriz, reconocida por nuestra presencia nacional, capacidad de respuesta y excelencia técnica.',
    valores: undefined,
  },
  {
    icono: '⭐',
    titulo: 'Valores',
    texto: undefined,
    valores: ['Compromiso con el cliente', 'Integridad y transparencia', 'Excelencia técnica', 'Responsabilidad y puntualidad', 'Trabajo en equipo'],
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function AutomotiveSupport() {
  return (
    <section id="servicios" className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #060c18 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Automotive Support</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-2">
            Calidad que{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">respalda</span>{' '}
            tu operación
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl mb-12">
            Somos el equipo técnico que tu planta necesita cuando los estándares no admiten margen de error.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {MVV.map((card, i) => (
            <FadeIn key={card.titulo} delay={i * 0.1}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric to-transparent" />
                <div className="text-3xl mb-3">{card.icono}</div>
                <div className="text-electric text-[10px] tracking-widest uppercase font-bold mb-3">{card.titulo}</div>
                {card.texto ? (
                  <p className="text-slate-400 text-xs leading-relaxed">{card.texto}</p>
                ) : (
                  <ul className="space-y-1.5">
                    {card.valores?.map((v) => (
                      <li key={v} className="flex items-center gap-2 text-slate-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {v}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <SectionLabel>Nuestros Servicios</SectionLabel>
          <h2 className="text-4xl font-black leading-tight mb-8">
            5 servicios{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">especializados</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {SERVICIOS.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <div className={`bg-white/[0.03] border rounded-xl p-7 h-full relative overflow-hidden group transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/40 ${s.destacado ? 'md:col-span-2 border-electric/25 bg-electric/[0.05]' : 'border-white/[0.07]'}`}>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-slate-500 text-[10px] font-bold tracking-widest mb-4">{s.numero}</div>
                <div className="text-3xl mb-4">{s.icono}</div>
                <h3 className="text-white font-bold text-base mb-2">{s.titulo}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.descripcion}</p>
                {s.destacado && (
                  <span className="inline-block mt-4 bg-electric/[0.12] border border-electric/25 text-electric text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                    Servicio principal
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
