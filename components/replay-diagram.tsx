'use client';

// ─────────────────────────────────────────────────────────────────────────────
//  Shared primitives — identical design language to record-diagram.tsx
// ─────────────────────────────────────────────────────────────────────────────

function HatchDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <filter id={`${prefix}-blur`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
      <pattern id={`${prefix}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#121212" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#3f3f3f" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${prefix}-hatch-green`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#07140b" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#1c7a3a" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${prefix}-hatch-orange`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#170a04" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#c2410c" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${prefix}-hatch-blue`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#07101c" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#1d4f94" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${prefix}-hatch-purple`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#11071c" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#7e22ce" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${prefix}-hatch-emerald`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#031a0e" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#065f46" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${prefix}-hatch-red`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#1c0404" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#991b1b" strokeWidth="1.4" />
      </pattern>

      <marker id={`${prefix}-arrow-gray`}    viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 8 5 L 0 8 z" fill="#8d8d8d" /></marker>
      <marker id={`${prefix}-arrow-orange`}  viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 8 5 L 0 8 z" fill="#f97316" /></marker>
      <marker id={`${prefix}-arrow-blue`}    viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 8 5 L 0 8 z" fill="#3b82f6" /></marker>
      <marker id={`${prefix}-arrow-purple`}  viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 8 5 L 0 8 z" fill="#c084fc" /></marker>
      <marker id={`${prefix}-arrow-emerald`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 8 5 L 0 8 z" fill="#34d399" /></marker>
      <marker id={`${prefix}-arrow-red`}     viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 8 5 L 0 8 z" fill="#f87171" /></marker>
    </defs>
  );
}

function DashedBox({
  x, y, width, height, hatch, stroke, innerStroke,
  outerDashed = true, lines, prefix,
}: {
  x: number; y: number; width: number; height: number;
  hatch: string; stroke: string; innerStroke: string;
  outerDashed?: boolean; lines: string[]; prefix: string;
}) {
  const inset = 8;
  const innerW = width - inset * 2;
  const innerH = height - inset * 2;
  const clipId = `${hatch}-clip-${Math.round(x)}-${Math.round(y)}`;
  const tint = hatch.includes('green')   ? '#07140b'
             : hatch.includes('orange')  ? '#170a04'
             : hatch.includes('blue')    ? '#07101c'
             : hatch.includes('purple')  ? '#11071c'
             : hatch.includes('emerald') ? '#031a0e'
             : hatch.includes('red')     ? '#1c0404'
             : '#121212';
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={x + inset} y={y + inset} width={innerW} height={innerH} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={width} height={height}
        fill={`url(#${hatch})`} stroke={stroke} strokeWidth="1.6"
        strokeDasharray={outerDashed ? '6 5' : undefined} />
      <g clipPath={`url(#${clipId})`}>
        <rect x={x + inset} y={y + inset} width={innerW} height={innerH}
          fill={`url(#${hatch})`} filter={`url(#${prefix}-blur)`} />
      </g>
      <rect x={x + inset} y={y + inset} width={innerW} height={innerH}
        fill={tint} fillOpacity="0.84" />
      <rect x={x + inset} y={y + inset} width={innerW} height={innerH}
        fill="none" stroke={innerStroke} strokeWidth="1.15" strokeDasharray="4 4" />
      {lines.map((line, i) => (
        <text
          key={`${line}-${i}`}
          x={x + width / 2}
          y={y + height / 2 + (i - (lines.length - 1) / 2) * 16}
          textAnchor="middle" dominantBaseline="middle"
          fill="#f4f4f5"
          fontSize={i === 0 ? '12' : '10'}
          fontWeight={i === 0 ? '600' : '500'}
          letterSpacing="0.14em"
          fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function StreamLine({ d, stroke, markerEnd, dur = '0.9s' }: {
  d: string; stroke: string; markerEnd?: string; dur?: string;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={stroke} strokeOpacity="0.22" strokeWidth="1.6" strokeDasharray="4 4" />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2.2" strokeDasharray="7 7" markerEnd={markerEnd}>
        <animate attributeName="stroke-dashoffset" from="28" to="0" dur={dur} repeatCount="indefinite" />
      </path>
    </g>
  );
}

function RequestDot({ path, fill = '#f97316', dur = '5.4s' }: {
  path: string; fill?: string; dur?: string;
}) {
  return (
    <circle className="sysdiag-dot" r="4.5" fill={fill}>
      <animateMotion path={path} dur={dur} repeatCount="indefinite" calcMode="linear" />
    </circle>
  );
}

function HopLabel({ x, y, children, fill = '#8a8a8a' }: {
  x: number; y: number; children: string; fill?: string;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={fill}
      fontSize="9.5" fontWeight="500" letterSpacing="0.16em"
      fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    >
      {children}
    </text>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Desktop  840 × 520
//
//  Layout mirrors record diagram exactly:
//    Row 1 (top):    KEPLOY TEST MODE (orange, centered)
//    Row 2 (center): YAML FILES (purple, left) | GO APP (green, center) | KEPLOY MOCK DB (blue, right)
//    Row 3 (bottom): COMPARE (gray, centered)
//    Row 4 (footer): PASS (emerald, left)   FAIL (red, right)
// ─────────────────────────────────────────────────────────────────────────────
function DesktopReplayDiagram() {
  //  All x/y/w/h chosen to match record-diagram.tsx geometry exactly.
  //  Go App:  x=315  y=166  w=210  h=114  →  right edge=525, cx=420, bottom=280
  //  Left box: x=40  y=174  w=148  h=92   →  right edge=188, cy=220
  //  Right box: x=652 y=174  w=148  h=92  →  left edge=652,  cy=220
  //  Top box:  x=330 y=38   w=180  h=68   →  bottom=106, cx=420
  //  Bottom box: x=270 y=398 w=300 h=94   →  top=398, cx=420

  return (
    <svg
      className="hidden h-auto w-full md:block"
      viewBox="0 0 840 520"
      role="img"
      aria-label="Keploy test replay: YAML test cases → Keploy replay engine → Go App → Keploy mock DB → Compare → PASS or FAIL"
    >
      <HatchDefs prefix="rep-d" />
      <rect width="840" height="520" fill="#0c0c0c" />

      {/* ── Top: Keploy Test Mode ── */}
      <DashedBox
        x={330} y={38} width={180} height={68}
        hatch="rep-d-hatch-orange" stroke="#f97316" innerStroke="#fb923c"
        prefix="rep-d" lines={['KEPLOY', 'TEST MODE (REPLAY)']}
      />

      {/* ── Center Row ── */}

      {/* Left: Recorded YAML (analogous to CLIENT in record diagram) */}
      <DashedBox
        x={40} y={174} width={148} height={92}
        hatch="rep-d-hatch-purple" stroke="#a855f7" innerStroke="#c084fc"
        prefix="rep-d" lines={['YAML FILES', 'TESTCASE + MOCKS']}
      />

      {/* Center: Go Application */}
      <DashedBox
        x={315} y={166} width={210} height={114}
        hatch="rep-d-hatch-green" stroke="#22c55e" innerStroke="#4ade80"
        outerDashed={false}
        prefix="rep-d" lines={['GO APPLICATION', 'ECHO URL SHORTENER']}
      />

      {/* Right: Keploy Mock DB (analogous to PostgreSQL in record diagram) */}
      <DashedBox
        x={652} y={174} width={148} height={92}
        hatch="rep-d-hatch-blue" stroke="#3b82f6" innerStroke="#60a5fa"
        prefix="rep-d" lines={['KEPLOY MOCK', 'PORT 5432 (VIRTUAL)']}
      />

      {/* ── Bottom: Compare ── */}
      <DashedBox
        x={270} y={348} width={300} height={94}
        hatch="rep-d-hatch" stroke="#8d8d8d" innerStroke="#6f6f6f"
        prefix="rep-d" lines={['COMPARE', 'RECORDED  vs  ACTUAL']}
      />

      {/* ── Footer: PASS / FAIL ── */}
      <DashedBox
        x={90} y={474} width={136} height={34}
        hatch="rep-d-hatch-emerald" stroke="#10b981" innerStroke="#34d399"
        prefix="rep-d" lines={['PASS']}
      />
      <DashedBox
        x={614} y={474} width={136} height={34}
        hatch="rep-d-hatch-red" stroke="#ef4444" innerStroke="#f87171"
        prefix="rep-d" lines={['FAIL']}
      />

      {/* ════ Connections ════ */}

      {/* Keploy Test → Go App  (top stream, animated) */}
      <StreamLine d="M 420 106 V 166" stroke="#f97316" markerEnd="url(#rep-d-arrow-orange)" dur="0.85s" />
      <HopLabel x={420} y={138} fill="#fb923c">HTTP REPLAY</HopLabel>

      {/* YAML → Go App  (left horizontal, static — same as Client↔GoApp in record) */}
      <path d="M 188 210 H 315" fill="none" stroke="#a855f7" strokeWidth="1.3" strokeDasharray="5 5" markerEnd="url(#rep-d-arrow-purple)" />
      <HopLabel x={251} y={198} fill="#c084fc">LOADS TESTS</HopLabel>

      {/* Go App → Keploy Mock  (right horizontal, static — same as SQL QUERY) */}
      <path d="M 525 200 H 652" fill="none" stroke="#3b82f6" strokeWidth="1.3" strokeDasharray="5 5" markerEnd="url(#rep-d-arrow-blue)" />
      <HopLabel x={588} y={188} fill="#60a5fa">SQL QUERY</HopLabel>

      {/* Keploy Mock → Go App  (return — same as SQL RESULT) */}
      <path d="M 652 242 H 525" fill="none" stroke="#3b82f6" strokeWidth="1.3" strokeDasharray="5 5" markerEnd="url(#rep-d-arrow-blue)" />
      <HopLabel x={588} y={258} fill="#60a5fa">MOCKED RESULT</HopLabel>

      {/* Go App → Compare  (bottom stream, animated) */}
      <StreamLine d="M 420 280 V 348" stroke="#c084fc" markerEnd="url(#rep-d-arrow-purple)" dur="0.85s" />
      <HopLabel x={420} y={317} fill="#c084fc">ACTUAL RESPONSE</HopLabel>

      {/* Compare → PASS */}
      <StreamLine d="M 340 442 L 158 474" stroke="#10b981" markerEnd="url(#rep-d-arrow-emerald)" dur="1.1s" />

      {/* Compare → FAIL */}
      <StreamLine d="M 500 442 L 682 474" stroke="#ef4444" markerEnd="url(#rep-d-arrow-red)" dur="1.1s" />

      {/* Animated dot — traces the full replay journey:
          YAML right edge (188,210) → through Go App → Mock DB via SQL QUERY line →
          Bezier U-turn at Mock DB → back to Go App right edge via MOCKED RESULT line.
          Open path: snaps back to YAML and repeats, showing one complete request cycle. */}
      <RequestDot
        path="M 188 210 H 652 C 680 210, 680 242, 652 242 H 525"
        fill="#a855f7"
        dur="3.8s"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Mobile  320 × 700
//  Same structure as MobileRecordDiagram — strictly vertical stack
// ─────────────────────────────────────────────────────────────────────────────
function MobileReplayDiagram() {
  const cx = 160;
  return (
    <svg
      className="block h-auto w-full md:hidden"
      viewBox="0 0 320 720"
      role="img"
      aria-label="Keploy test replay diagram (mobile): YAML → Keploy replay → Go App → Mock DB → Compare → PASS/FAIL"
    >
      <HatchDefs prefix="rep-m" />
      <rect width="320" height="720" fill="#0c0c0c" />

      {/* Keploy Test Mode */}
      <DashedBox x={70} y={28} width={180} height={62}
        hatch="rep-m-hatch-orange" stroke="#f97316" innerStroke="#fb923c"
        prefix="rep-m" lines={['KEPLOY TEST', '(REPLAY MODE)']}
      />

      {/* YAML Files */}
      <DashedBox x={70} y={134} width={180} height={68}
        hatch="rep-m-hatch-purple" stroke="#a855f7" innerStroke="#c084fc"
        prefix="rep-m" lines={['YAML FILES', 'TESTCASE + MOCKS']}
      />

      {/* Go App */}
      <DashedBox x={65} y={248} width={190} height={84}
        hatch="rep-m-hatch-green" stroke="#22c55e" innerStroke="#4ade80"
        outerDashed={false}
        prefix="rep-m" lines={['GO APPLICATION', 'ECHO SHORTENER']}
      />

      {/* Keploy Mock DB */}
      <DashedBox x={70} y={380} width={180} height={72}
        hatch="rep-m-hatch-blue" stroke="#3b82f6" innerStroke="#60a5fa"
        prefix="rep-m" lines={['KEPLOY MOCK', 'PORT 5432 (VIRTUAL)']}
      />

      {/* Compare */}
      <DashedBox x={50} y={496} width={220} height={76}
        hatch="rep-m-hatch" stroke="#8d8d8d" innerStroke="#6f6f6f"
        prefix="rep-m" lines={['COMPARE', 'RECORDED vs ACTUAL']}
      />

      {/* PASS */}
      <DashedBox x={22} y={612} width={108} height={32}
        hatch="rep-m-hatch-emerald" stroke="#10b981" innerStroke="#34d399"
        prefix="rep-m" lines={['PASS']}
      />

      {/* FAIL */}
      <DashedBox x={190} y={612} width={108} height={32}
        hatch="rep-m-hatch-red" stroke="#ef4444" innerStroke="#f87171"
        prefix="rep-m" lines={['FAIL']}
      />

      {/* ═══ Connections ═══ */}

      {/* Test Mode → YAML */}
      <StreamLine d={`M ${cx} 90 V 134`} stroke="#f97316" markerEnd="url(#rep-m-arrow-orange)" dur="0.85s" />
      <HopLabel x={200} y={114} fill="#fb923c">INITIATES</HopLabel>

      {/* YAML → Go App */}
      <path d={`M ${cx} 202 V 248`} fill="none" stroke="#a855f7" strokeWidth="1.3" strokeDasharray="4 4" markerEnd="url(#rep-m-arrow-purple)" />
      <HopLabel x={200} y={228} fill="#c084fc">HTTP REPLAY</HopLabel>

      {/* Go App → Mock DB */}
      <path d={`M ${cx} 332 V 380`} fill="none" stroke="#3b82f6" strokeWidth="1.3" strokeDasharray="4 4" markerEnd="url(#rep-m-arrow-blue)" />
      <HopLabel x={200} y={358} fill="#60a5fa">SQL → MOCK</HopLabel>

      {/* Mock DB → Compare */}
      <StreamLine d={`M ${cx} 452 V 496`} stroke="#c084fc" markerEnd="url(#rep-m-arrow-purple)" dur="0.9s" />
      <HopLabel x={200} y={476} fill="#c084fc">RESPONSE</HopLabel>

      {/* Compare → PASS */}
      <StreamLine d="M 108 572 L 76 612" stroke="#10b981" markerEnd="url(#rep-m-arrow-emerald)" dur="1.1s" />

      {/* Compare → FAIL */}
      <StreamLine d="M 212 572 L 244 612" stroke="#ef4444" markerEnd="url(#rep-m-arrow-red)" dur="1.1s" />

      {/* Animated dot — straight vertical path down the spine */}
      <RequestDot
        path={`M ${cx} 202 V 290 V 380 V 332 V 290 V 452`}
        fill="#a855f7"
        dur="5s"
      />
    </svg>
  );
}

export function ReplayDiagram() {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden bg-[#0c0c0c]">
        <DesktopReplayDiagram />
        <MobileReplayDiagram />
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Keploy in test mode: the replay engine fires recorded HTTP requests at the Go app,
        intercepts SQL calls with a virtual Keploy mock DB, then compares the actual
        response against the recorded one — PASS if they match, FAIL if they differ.
      </figcaption>
    </figure>
  );
}

