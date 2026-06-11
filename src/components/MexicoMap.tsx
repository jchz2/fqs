'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { ESTADOS } from '@/lib/data'

const GEO_URL =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/mexico/mexico-states.json'

const GEO_NAME_MAP: Record<string, string> = {
  'México': 'Estado de México',
  'Distrito Federal': 'Ciudad de México',
  'Querétaro de Arteaga': 'Querétaro',
  'Coahuila de Zaragoza': 'Coahuila',
  'Puebla': 'Puebla',
  'Guanajuato': 'Guanajuato',
  'Aguascalientes': 'Aguascalientes',
  'San Luis Potosí': 'San Luis Potosí',
  'Sonora': 'Sonora',
  'Baja California': 'Baja California',
  'Toluca': 'Toluca',
}

export default function MexicoMap() {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <div className="relative w-full">
      {tooltip && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-navy border border-electric/30 text-white text-xs px-3 py-1.5 rounded-full z-10 pointer-events-none whitespace-nowrap">
          {tooltip}
        </div>
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-102, 24], scale: 1200 }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawName = geo.properties.name as string
              const mapped = GEO_NAME_MAP[rawName] ?? rawName
              const active = (ESTADOS as readonly string[]).includes(mapped)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => active && setTooltip(mapped)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { fill: active ? '#2563EB' : '#1A2B4A', stroke: '#0d1929', strokeWidth: 0.5, outline: 'none' },
                    hover: { fill: active ? '#3b82f6' : '#1e3a5f', stroke: '#0d1929', strokeWidth: 0.5, outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
