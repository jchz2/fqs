'use client'

import { useState, FormEvent } from 'react'

const SERVICIOS_OPTIONS = [
  'Inspección / Sorteos',
  'Ingeniero Residente',
  'Reflasheos',
  'Seguimiento de Proyectos',
  'Campañas en Patios',
  'Consultoría ISO',
  'Otro',
]

interface FormState {
  nombre: string
  empresa: string
  email: string
  servicio: string
  mensaje: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: FormState = { nombre: '', empresa: '', email: '', servicio: '', mensaje: '' }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Error al enviar el mensaje. Intenta de nuevo.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Error de conexión. Verifica tu internet e intenta de nuevo.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold mb-2">Mensaje enviado correctamente</h3>
        <p className="text-slate-400 text-sm mb-6">Nos pondremos en contacto contigo en menos de 24 horas.</p>
        <button onClick={() => setStatus('idle')} className="text-electric text-sm hover:underline">
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const cls = 'w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-electric/50 focus:bg-electric/[0.05] transition-colors'

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de contacto" role="form" className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8">
      <h3 className="text-lg font-bold mb-1.5">Solicitar información</h3>
      <p className="text-slate-500 text-xs mb-6">Todos los campos son requeridos · Respuesta en menos de 24 horas</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Nombre completo</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre completo" required className={cls} />
        </div>
        <div>
          <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Empresa</label>
          <input type="text" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" required className={cls} />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Correo electrónico</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" required className={cls} />
      </div>

      <div className="mb-3">
        <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Servicio requerido</label>
        <select name="servicio" value={form.servicio} onChange={handleChange} required className={`${cls} appearance-none`}>
          <option value="">Selecciona un servicio...</option>
          {SERVICIOS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-slate-500 text-[10px] tracking-widest uppercase mb-1.5">Mensaje</label>
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Describe brevemente tu necesidad..." required rows={4} className={`${cls} resize-none`} />
      </div>

      {status === 'error' && (
        <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">{errorMsg}</div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full py-3.5 bg-gradient-to-r from-electric to-blue-700 text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje →'}
      </button>
      <p className="text-slate-600 text-[10px] text-center mt-3">Enviado a admin@fqs.mx · Respuesta en &lt; 24 horas</p>
    </form>
  )
}
