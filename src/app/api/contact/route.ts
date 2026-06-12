export const runtime = 'edge'

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactPayload {
  nombre: string
  empresa: string
  email: string
  servicio: string
  mensaje: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePayload(
  body: unknown
): { valid: true; data: ContactPayload } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Cuerpo de la solicitud inválido' }
  }
  const { nombre, empresa, email, servicio, mensaje } = body as Record<string, unknown>
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0)
    return { valid: false, error: 'El nombre es requerido' }
  if (!empresa || typeof empresa !== 'string' || empresa.trim().length === 0)
    return { valid: false, error: 'La empresa es requerida' }
  if (!email || typeof email !== 'string' || !isValidEmail(email))
    return { valid: false, error: 'El correo electrónico es inválido' }
  if (!servicio || typeof servicio !== 'string' || servicio.trim().length === 0)
    return { valid: false, error: 'El servicio es requerido' }
  if (!mensaje || typeof mensaje !== 'string' || mensaje.trim().length === 0)
    return { valid: false, error: 'El mensaje es requerido' }
  return { valid: true, data: { nombre, empresa, email, servicio, mensaje } }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const validation = validatePayload(body)
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { nombre, empresa, email, servicio, mensaje } = validation.data

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

  const emailHtml = [
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">',
    '<div style="background:#1A2B4A;padding:24px;border-radius:8px 8px 0 0;">',
    '<h2 style="color:#ffffff;margin:0;">Nuevo mensaje desde fqs.mx</h2>',
    '</div>',
    '<div style="background:#f8f9fa;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">',
    '<p><strong>Nombre:</strong> ' + esc(nombre) + '</p>',
    '<p><strong>Empresa:</strong> ' + esc(empresa) + '</p>',
    '<p><strong>Correo:</strong> ' + esc(email) + '</p>',
    '<p><strong>Servicio:</strong> ' + esc(servicio) + '</p>',
    '<p><strong>Mensaje:</strong></p>',
    '<div style="background:#fff;padding:16px;border-radius:6px;border:1px solid #e2e8f0;">' + esc(mensaje).replace(/\n/g, '<br>') + '</div>',
    '</div>',
    '</div>',
  ].join('')

  const { error } = await resend.emails.send({
    from: 'FQS Sitio Web <no-reply@fqs.mx>',
    to: ['admin@fqs.mx'],
    replyTo: email,
    subject: 'Nuevo contacto web: ' + servicio + ' — ' + empresa,
    html: emailHtml,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Intenta de nuevo.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
