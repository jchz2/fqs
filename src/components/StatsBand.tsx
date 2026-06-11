import { STATS } from '@/lib/data'

export default function StatsBand() {
  return (
    <div className="bg-electric/[0.06] border-t border-b border-electric/15 py-7 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.etiqueta}>
            <div className="text-electric text-3xl font-black leading-none">{s.valor}</div>
            <div className="text-slate-500 text-[9px] uppercase tracking-widest mt-1.5">{s.etiqueta}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
