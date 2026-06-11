import { CONTACTO } from '@/lib/data'

export default function InfoBand() {
  const { telefonos, emails } = CONTACTO.directorGeneral
  return (
    <div className="bg-electric/[0.08] border-t border-b border-electric/15 py-2.5 px-6 text-center text-slate-500 text-[9px] tracking-widest uppercase">
      Disponibles 24/7 &nbsp;·&nbsp;{' '}
      <a href={`tel:${telefonos[0].replace(/\s/g, '')}`} className="text-electric hover:underline">{telefonos[0]}</a>
      &nbsp;·&nbsp;
      <a href={`tel:${telefonos[1].replace(/\s/g, '')}`} className="text-electric hover:underline">{telefonos[1]}</a>
      &nbsp;·&nbsp;
      <a href={`mailto:${emails[1]}`} className="text-electric hover:underline">{emails[1]}</a>
    </div>
  )
}
