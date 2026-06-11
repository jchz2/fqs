declare module 'react-simple-maps' {
  import { ComponentProps, CSSProperties } from 'react'

  interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
  }

  interface GeographiesChildrenProps {
    geographies: Geography[]
  }

  interface ComposableMapProps {
    projection?: string
    projectionConfig?: { center?: [number, number]; scale?: number }
    style?: CSSProperties
    children?: React.ReactNode
  }

  interface GeographiesProps {
    geography: string | object
    children: (props: GeographiesChildrenProps) => React.ReactNode
  }

  interface GeographyStyleSpec {
    fill?: string
    stroke?: string
    strokeWidth?: number
    outline?: string
  }

  interface GeographyProps {
    geography: Geography
    style?: {
      default?: GeographyStyleSpec
      hover?: GeographyStyleSpec
      pressed?: GeographyStyleSpec
    }
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onClick?: () => void
    key?: string
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element
  export function Geographies(props: GeographiesProps): JSX.Element
  export function Geography(props: GeographyProps): JSX.Element
}
