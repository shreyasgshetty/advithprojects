import { memo } from 'react'

/**
 * ArchitecturalBlueprintCanvas
 * 
 * Renders high-precision CAD / architectural drafting schematics
 * when real photographic covers are pending.
 * Designed to look like an authentic draftsman's drawing sheet.
 */
function ArchitecturalBlueprintCanvas({ project, className = '' }) {
  const category = project?.category || 'architecture'
  const id = (project?.id || 'AP-000').toUpperCase()
  const photo = project?.coverImage || null

  if (photo) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-900 ${className}`}>
        <img
          src={photo}
          alt={id}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#121316] select-none text-slate-400 font-mono ${className}`}
      aria-hidden="true"
    >
      {/* CAD drafting grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Neutral vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(18,19,22,0.95) 80%)',
        }}
      />

      {/* Corner crosshairs */}
      <div className="absolute top-3 left-3 text-[10px] text-white/30">+</div>
      <div className="absolute top-3 right-3 text-[10px] text-white/30">+</div>
      <div className="absolute bottom-3 left-3 text-[10px] text-white/30">+</div>
      <div className="absolute bottom-3 right-3 text-[10px] text-white/30">+</div>

      {/* Top HUD metadata */}
      <div className="absolute top-3.5 left-6 right-6 flex items-center justify-between text-[9px] tracking-widest uppercase text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
          DWG // {id}
        </span>
        <span>SCALE 1:100</span>
      </div>

      {/* Center SVG Schematic Diagram based on Category */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {category === 'architecture' && (
          <svg
            viewBox="0 0 280 180"
            fill="none"
            className="w-full h-full max-h-44 text-slate-300 stroke-current opacity-85"
            strokeWidth="1.2"
          >
            {/* Ground datum line */}
            <line x1="20" y1="150" x2="260" y2="150" strokeDasharray="4 4" strokeOpacity="0.4" />
            <text x="24" y="162" fill="currentColor" fillOpacity="0.4" fontSize="8" stroke="none">DATUM 0.00</text>

            {/* Massing volume 1 */}
            <rect x="50" y="80" width="100" height="70" fill="rgba(255,255,255,0.03)" stroke="currentColor" />
            {/* Cantilever Upper Floor */}
            <rect x="70" y="45" width="130" height="45" fill="rgba(255,255,255,0.06)" stroke="currentColor" />
            
            {/* Ribbon Glazing */}
            <line x1="80" y1="65" x2="190" y2="65" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="80" y1="68" x2="190" y2="68" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.5" />

            {/* Vertical Louvers */}
            <line x1="60" y1="90" x2="60" y2="140" strokeDasharray="2 2" strokeOpacity="0.5" />
            <line x1="70" y1="90" x2="70" y2="140" strokeDasharray="2 2" strokeOpacity="0.5" />
            <line x1="80" y1="90" x2="80" y2="140" strokeDasharray="2 2" strokeOpacity="0.5" />

            {/* Dimension guides */}
            <line x1="210" y1="45" x2="210" y2="150" stroke="#F87171" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="206" y1="45" x2="214" y2="45" stroke="#F87171" strokeWidth="1" />
            <line x1="206" y1="150" x2="214" y2="150" stroke="#F87171" strokeWidth="1" />
            <text x="216" y="100" fill="#F87171" fontSize="7" stroke="none">H: 9.8m</text>
          </svg>
        )}

        {category === 'construction' && (
          <svg
            viewBox="0 0 280 180"
            fill="none"
            className="w-full h-full max-h-44 text-slate-300 stroke-current opacity-85"
            strokeWidth="1.2"
          >
            {/* Grid coordinate axes */}
            <line x1="40" y1="30" x2="40" y2="155" strokeDasharray="3 3" strokeOpacity="0.4" />
            <line x1="140" y1="30" x2="140" y2="155" strokeDasharray="3 3" strokeOpacity="0.4" />
            <line x1="240" y1="30" x2="240" y2="155" strokeDasharray="3 3" strokeOpacity="0.4" />
            <line x1="30" y1="50" x2="250" y2="50" strokeDasharray="3 3" strokeOpacity="0.4" />
            <line x1="30" y1="135" x2="250" y2="135" strokeDasharray="3 3" strokeOpacity="0.4" />

            {/* Axis tags */}
            <circle cx="40" cy="22" r="7" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="0.8" />
            <text x="38" y="25" fill="currentColor" fontSize="7" stroke="none">A</text>
            <circle cx="140" cy="22" r="7" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="0.8" />
            <text x="138" y="25" fill="currentColor" fontSize="7" stroke="none">B</text>
            <circle cx="240" cy="22" r="7" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="0.8" />
            <text x="238" y="25" fill="currentColor" fontSize="7" stroke="none">C</text>

            {/* RCC Footing Pads & Columns */}
            {[
              { x: 40, y: 50 },
              { x: 140, y: 50 },
              { x: 240, y: 50 },
              { x: 40, y: 135 },
              { x: 140, y: 135 },
              { x: 240, y: 135 },
            ].map((col, i) => (
              <g key={i}>
                {/* Footing pad */}
                <rect x={col.x - 16} y={col.y - 14} width="32" height="28" fill="rgba(255,255,255,0.05)" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.6" />
                {/* Concrete Column Core */}
                <rect x={col.x - 7} y={col.y - 7} width="14" height="14" fill="#DC2626" fillOpacity="0.8" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            ))}

            {/* Tie Beams */}
            <line x1="40" y1="50" x2="240" y2="50" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="40" y1="135" x2="240" y2="135" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="40" y1="50" x2="40" y2="135" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="140" y1="50" x2="140" y2="135" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="240" y1="50" x2="240" y2="135" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
          </svg>
        )}

        {category === 'interiors' && (
          <svg
            viewBox="0 0 280 180"
            fill="none"
            className="w-full h-full max-h-44 text-slate-300 stroke-current opacity-85"
            strokeWidth="1.2"
          >
            {/* Outer Room Perimeter */}
            <rect x="35" y="30" width="210" height="120" stroke="currentColor" strokeWidth="1.8" fill="rgba(255,255,255,0.03)" />

            {/* Partition Wall */}
            <line x1="130" y1="30" x2="130" y2="105" stroke="currentColor" strokeWidth="1.6" />
            
            {/* Door swing arc */}
            <path d="M 130 105 A 25 25 0 0 1 155 130" stroke="#DC2626" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="130" y1="105" x2="155" y2="105" stroke="#DC2626" strokeWidth="1.2" />

            {/* Custom Joinery / Wardrobe Bank */}
            <rect x="42" y="38" width="80" height="16" fill="rgba(251,146,60,0.15)" stroke="#FB923C" strokeWidth="1" />
            <text x="50" y="49" fill="#FB923C" fontSize="7" stroke="none">JOINERY BANK</text>

            {/* Seating / Furniture wireframe */}
            <rect x="160" y="65" width="60" height="40" rx="3" stroke="#38BDF8" strokeWidth="1.2" fill="rgba(56,189,248,0.06)" />
            <rect x="175" y="75" width="30" height="20" rx="2" stroke="#38BDF8" strokeWidth="0.8" />
            <text x="170" y="125" fill="currentColor" fillOpacity="0.5" fontSize="7" stroke="none">LOUNGE ZONE</text>
          </svg>
        )}
      </div>

      {/* Bottom HUD metadata */}
      <div className="absolute bottom-3.5 left-6 right-6 flex items-center justify-between text-[9px] tracking-widest uppercase text-white/40">
        <span>ARCHITECTURAL DRAWING SHEET</span>
        <span className="text-red-400/90 font-semibold">{category.toUpperCase()}</span>
      </div>
    </div>
  )
}

export default memo(ArchitecturalBlueprintCanvas)
