'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { MASCOTA_URL, STATS, CLIENTES, WHATSAPP_URL } from '@/lib/data'

const BULLETS = [
  { texto: 'Inspecciones, sorteos y campañas en patios', gold: false },
  { texto: 'Ingenieros residentes y seguimiento de proyectos', gold: false },
  { texto: 'Certificaciones ISO 9001, 45001, 14001, 27001', gold: false },
  { texto: 'Reflasheos · Presencia en 21 plantas activas', gold: true },
]

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden px-6 py-16"
      style={{ background: 'linear-gradient(160deg, #060c18 0%, #0d1929 40%, #1A2B4A 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-24 right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)' }} />
      <div className="absolute bottom-16 left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <motion.div className="flex-1" variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 bg-electric/10 border border-electric/30 text-electric-light text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
              ✓ Folio 229542 · Empresa certificada · 20+ años
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            Tu aliado en{' '}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">
              ingeniería de calidad
            </span>{' '}
            automotriz
          </motion.h1>

          <motion.p variants={item} className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">
            Respaldo técnico especializado donde tu línea de producción lo necesita — en 11 estados de México.
          </motion.p>

          <motion.ul variants={container} className="mb-7 space-y-2">
            {BULLETS.map((b, i) => (
              <motion.li key={i} variants={item} className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${b.gold ? 'bg-gold' : 'bg-electric'}`} />
                <span className="text-slate-400 text-xs">{b.texto}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="flex items-center gap-4 mb-10">
            <a href="#servicios" className="bg-electric hover:bg-blue-700 text-white text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded transition-colors">
              Conocer servicios →
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#25d366] text-xs font-semibold">
              <span className="w-8 h-8 rounded-full bg-[#25d366]/15 border border-[#25d366]/30 flex items-center justify-center text-sm">💬</span>
              WhatsApp directo
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-2 flex-wrap pt-7 border-t border-white/[0.07]">
            <span className="text-slate-500 text-[9px] tracking-widest uppercase mr-2">Clientes</span>
            {CLIENTES.map((c) => (
              <span key={c} className="bg-white/[0.04] border border-white/[0.08] text-slate-500 text-[9px] font-bold tracking-wide px-2.5 py-1 rounded">
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="flex-shrink-0 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}>
          <div className="relative">
            <div className="absolute -inset-5 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 65%)' }} />
            <div className="animate-rotate-slow absolute -inset-2.5 rounded-full border-2 border-dashed border-gold/40" />
            <motion.div
              className="relative w-44 h-44 rounded-full border-4 border-gold/60 shadow-[0_0_40px_rgba(212,175,55,0.25)] overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image src={MASCOTA_URL} alt="Inspector FQS" fill className="object-cover" priority />
            </motion.div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 w-full">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.etiqueta} className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2.5 text-center">
                <div className="text-electric text-xl font-black leading-none">{s.valor}</div>
                <div className="text-slate-500 text-[8px] uppercase tracking-widest mt-1">{s.etiqueta}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
