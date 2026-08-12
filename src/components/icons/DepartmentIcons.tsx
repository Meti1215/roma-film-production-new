import React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number | string
}

const CHARCOAL = '#544E47'

const UnifiedSvg = ({
  strokeWidth = 2,
  className,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
}

// Paper & Sanitary Products Icon: premium paper roll + subtle sheet lines (unified bronze + charcoal)
export const PaperIcon = ({ strokeWidth = 2, className, ...props }: IconProps) => {
  return (
    <UnifiedSvg strokeWidth={strokeWidth} className={className} {...props}>
      {/* Roll body */}
      <path d="M15 7c0 1.66-2.02 3-5 3s-5-1.34-5-3 2.02-3 5-3 5 1.34 5 3z" />
      <path d="M5 7v9c0 1.66 2.02 3 5 3s5-1.34 5-3V7" />

      {/* Roll core + inner geometry */}
      <ellipse cx="10" cy="7" rx="1.6" ry="0.85" />
      <path d="M15 9h5c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H9.5" />

      {/* Subtle charcoal “sanitary sheets” */}
      <path
        d="M10.8 12.2h5.8"
        stroke={CHARCOAL}
        strokeWidth={1.4}
        strokeDasharray="2 2"
        className="opacity-80"
      />
      <path
        d="M10.8 15.8h5.8"
        stroke={CHARCOAL}
        strokeWidth={1.4}
        strokeDasharray="2 2"
        className="opacity-80"
      />
    </UnifiedSvg>
  )
}

// Hospitality & Wellness Icon: premium key silhouette + subtle charcoal inner strokes (unified bronze + charcoal)
export const HospitalityIcon = ({ strokeWidth = 2, className, ...props }: IconProps) => {
  return (
    <UnifiedSvg strokeWidth={strokeWidth} className={className} {...props}>
      {/* Key head */}
      <circle cx="12" cy="7.2" r="4" />

      {/* Key shank */}
      <path d="M12 11.2v10" />

      {/* Key teeth (kept minimal at small sizes) */}
      <path d="M12 14.2h3v2h-3" />
      <path d="M12 17.2h3v2h-3" />

      {/* Charcoal inner cross */}
      <path
        d="M12 5.8v3"
        stroke={CHARCOAL}
        strokeWidth={1.4}
        className="opacity-80"
      />
      <path
        d="M10.6 7.2h2.8"
        stroke={CHARCOAL}
        strokeWidth={1.4}
        className="opacity-80"
      />

      {/* Small “spark” treated as charcoal detail (same treatment across set) */}
      <path
        d="M18.1 4.2l.4.8.8.4-.8.4-.4.8-.4-.8-.8-.4.8-.4z"
        fill={CHARCOAL}
      />
    </UnifiedSvg>
  )
}

// Minch Coal Mining PLC Icon: geometric coal crystal + pickaxe arc with unified bronze + charcoal facets
export const CoalMiningIcon = ({ strokeWidth = 2, className, ...props }: IconProps) => {
  return (
    <UnifiedSvg strokeWidth={strokeWidth} className={className} {...props}>
      {/* Pickaxe arc */}
      <path d="M3.8 14.2c2.7-3.2 7-4.7 10.2-4.7s7.5 1.5 10.2 4.7" />

      {/* Pickaxe handle */}
      <path d="M14.6 9.6L6 18.2" />

      {/* Coal crystal (primary outline) */}
      <path d="M13.1 13.1l4.1-3 4.1 3-1.6 5.1h-5l-0.6-5.1z" />

      {/* Charcoal facet accents */}
      <path
        d="M17.1 10.2l.6 8"
        stroke={CHARCOAL}
        strokeWidth={1.2}
        className="opacity-70"
      />
      <path
        d="M15.2 13.4l2.1-1.6 1.4 1.2"
        stroke={CHARCOAL}
        strokeWidth={1.2}
        className="opacity-80"
      />

      {/* Small energy marker (bronze via currentColor fill) */}
      <path
        d="M20.1 3.6l.5.8.8.5-.8.5-.5.8-.5-.8-.8-.5.8-.5z"
        fill="currentColor"
        stroke="none"
      />
    </UnifiedSvg>
  )
}

