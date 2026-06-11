interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 text-electric text-xs tracking-widest uppercase mb-3">
      <span className="block w-6 h-0.5 bg-electric" />
      {children}
    </div>
  )
}
