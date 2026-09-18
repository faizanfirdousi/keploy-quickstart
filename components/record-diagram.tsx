function HatchDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <filter id={`${prefix}-blur`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
      <pattern
        id={`${prefix}-hatch`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="8" height="8" fill="#121212" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#3f3f3f" strokeWidth="1.4" />
      </pattern>
      <pattern
        id={`${prefix}-hatch-green`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="8" height="8" fill="#07140b" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#1c7a3a" strokeWidth="1.4" />
      </pattern>
      <pattern
        id={`${prefix}-hatch-blue`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="8" height="8" fill="#07101c" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#1d4f94" strokeWidth="1.4" />
      </pattern>
      <pattern
        id={`${prefix}-hatch-orange`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="8" height="8" fill="#170a04" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#c2410c" strokeWidth="1.4" />
      </pattern>
      <pattern
        id={`${prefix}-hatch-purple`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="8" height="8" fill="#11071c" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#7e22ce" strokeWidth="1.4" />
      </pattern>

      <marker
        id={`${prefix}-arrow-gray`}
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#8d8d8d" />
      </marker>
      <marker
        id={`${prefix}-arrow-orange`}
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#f97316" />
      </marker>
      <marker
        id={`${prefix}-arrow-blue`}
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#3b82f6" />
      </marker>
      <marker
        id={`${prefix}-arrow-purple`}
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#c084fc" />
      </marker>
    </defs>
  );
}

function DashedBox({
  x,
  y,
  width,
  height,
  hatch,
  stroke,
  innerStroke,
  outerDashed = true,
  lines,
  badge,
  prefix,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  hatch: string;
  stroke: string;
  innerStroke: string;
  outerDashed?: boolean;
  lines: string[];
  badge?: string;
  prefix: string;
}) {
  const inset = 8;
  const innerW = width - inset * 2;
  const innerH = height - inset * 2;
  const clipId = `${hatch}-clip-${Math.round(x)}-${Math.round(y)}`;

  const tint = hatch.includes('green')
    ? '#07140b'
    : hatch.includes('blue')
      ? '#07101c'
      : hatch.includes('orange')
        ? '#170a04'
        : hatch.includes('purple')
          ? '#11071c'
          : '#121212';

  return (
    <g>
      {badge && (
        <g>
          <rect
            x={x + width / 2 - 55}
            y={y - 12}
            width={110}
            height={18}
            rx={4}
            fill="#1c1917"
            stroke={stroke}
            strokeWidth="1"
          />
          <text
            x={x + width / 2}
            y={y - 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#f97316"
            fontSize="9"
            fontWeight="600"
            letterSpacing="0.12em"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          >
            {badge}
          </text>
        </g>
      )}

      {/* 1. Outer full-intensity zigzag pattern */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${hatch})`}
        stroke={stroke}
        strokeWidth="1.6"
        strokeDasharray={outerDashed ? '6 5' : undefined}
      />

      {/* 2. Inner box: blurred zigzag pattern */}
      <g clipPath={`url(#${clipId})`}>
        <rect
          x={x + inset}
          y={y + inset}
          width={innerW}
          height={innerH}
          fill={`url(#${hatch})`}
          filter={`url(#${prefix}-blur)`}
        />
      </g>

      {/* 3. Translucent fill overlay */}
      <rect
        x={x + inset}
        y={y + inset}
        width={innerW}
        height={innerH}
        fill={tint}
        fillOpacity="0.84"
      />

      {/* 4. Inner dashed border */}
      <rect
        x={x + inset}
        y={y + inset}
        width={innerW}
        height={innerH}
        fill="none"
        stroke={innerStroke}
        strokeWidth="1.15"
        strokeDasharray="4 4"
      />

      {/* 5. Crisp readable text */}
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + width / 2}
          y={y + height / 2 + (i - (lines.length - 1) / 2) * 16}
          textAnchor="middle"
          dominantBaseline="middle"
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

function Cylinder({
  cx,
  top,
  rx,
  ry,
  body,
  hatch,
  clipId,
  lines,
  prefix,
}: {
  cx: number;
  top: number;
  rx: number;
  ry: number;
  body: number;
  hatch: string;
  clipId: string;
  lines: string[];
  prefix: string;
}) {
  const bottom = top + body;
  const left = cx - rx;
  const right = cx + rx;

  const inset = 8;
  const innerLeft = left + inset;
  const innerRx = rx - inset;
  const innerTop = top + ry + 4;
  const innerBottom = bottom - ry - 4;
  const innerHeight = innerBottom - innerTop;
  const innerClipId = `${clipId}-inner`;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path
            d={`M ${left} ${top + ry}
                L ${left} ${bottom - ry}
                A ${rx} ${ry} 0 0 0 ${right} ${bottom - ry}
                L ${right} ${top + ry}
                A ${rx} ${ry} 0 0 1 ${left} ${top + ry}
                Z`}
          />
        </clipPath>
        <clipPath id={innerClipId}>
          <rect
            x={innerLeft}
            y={innerTop}
            width={innerRx * 2}
            height={innerHeight}
            rx={innerRx / 2}
          />
        </clipPath>
      </defs>

      {/* Outer cylinder body with sharp full-intensity hatch */}
      <rect
        x={left}
        y={top}
        width={rx * 2}
        height={body}
        fill={`url(#${hatch})`}
        clipPath={`url(#${clipId})`}
      />

      {/* Inner blurred hatch */}
      <g clipPath={`url(#${innerClipId})`}>
        <rect
          x={innerLeft}
          y={innerTop}
          width={innerRx * 2}
          height={innerHeight}
          fill={`url(#${hatch})`}
          filter={`url(#${prefix}-blur)`}
        />
      </g>

      {/* Inner translucent overlay */}
      <rect
        x={innerLeft}
        y={innerTop}
        width={innerRx * 2}
        height={innerHeight}
        rx={innerRx / 2}
        fill="#07101c"
        fillOpacity="0.84"
      />

      {/* Cylinder outlines and ellipses */}
      <path
        d={`M ${left} ${top + ry}
            L ${left} ${bottom - ry}
            A ${rx} ${ry} 0 0 0 ${right} ${bottom - ry}
            L ${right} ${top + ry}`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.6"
        strokeDasharray="6 5"
      />
      <ellipse
        cx={cx}
        cy={bottom - ry}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.35"
        strokeDasharray="5 4"
      />
      <ellipse
        cx={cx}
        cy={top + ry}
        rx={rx}
        ry={ry}
        fill={`url(#${hatch})`}
        stroke="#3b82f6"
        strokeWidth="1.6"
        strokeDasharray="6 5"
      />

      {lines.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={top + body / 2 + 6 + (i - (lines.length - 1) / 2) * 16}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f4f4f5"
          fontSize={i === 0 ? '11' : '10'}
          fontWeight={i === 0 ? '600' : '400'}
          letterSpacing="0.14em"
          fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function StreamLine({
  d,
  stroke,
  markerEnd,
  dur = '0.9s',
}: {
  d: string;
  stroke: string;
  markerEnd?: string;
  dur?: string;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeOpacity="0.22"
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="2.2"
        strokeDasharray="7 7"
        markerEnd={markerEnd}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="28"
          to="0"
          dur={dur}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

function RequestDot({
  path,
  fill = '#f97316',
  dur = '5.4s',
}: {
  path: string;
  fill?: string;
  dur?: string;
}) {
  return (
    <circle className="sysdiag-dot" r="4.5" fill={fill}>
      <animateMotion
        path={path}
        dur={dur}
        repeatCount="indefinite"
        calcMode="linear"
      />
    </circle>
  );
}

function HopLabel({
  x,
  y,
  children,
  fill = '#8a8a8a',
}: {
  x: number;
  y: number;
  children: string;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={fill}
      fontSize="9.5"
      fontWeight="500"
      letterSpacing="0.16em"
      fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    >
      {children}
    </text>
  );
}

function DesktopRecordDiagram() {
  return (
    <svg
      className="hidden h-auto w-full md:block"
      viewBox="0 0 840 520"
      role="img"
      aria-label="Keploy Record mode: capturing HTTP requests, PostgreSQL queries, and writing testcases and mocks"
    >
      <HatchDefs prefix="rec-d" />
      <rect width="840" height="520" fill="#0c0c0c" />

      {/* Top: Keploy Record Mode */}
      <DashedBox
        x={330}
        y={38}
        width={180}
        height={68}
        badge="keploy record"
        hatch="rec-d-hatch-orange"
        stroke="#f97316"
        innerStroke="#fb923c"
        prefix="rec-d"
        lines={['KEPLOY', 'RECORD MODE (eBPF)']}
      />

      {/* Center Row: Client, Go App, PostgreSQL */}
      <DashedBox
        x={40}
        y={174}
        width={148}
        height={92}
        hatch="rec-d-hatch"
        stroke="#8d8d8d"
        innerStroke="#6f6f6f"
        prefix="rec-d"
        lines={['CLIENT', 'curl / POST /url']}
      />

      <DashedBox
        x={315}
        y={166}
        width={210}
        height={114}
        hatch="rec-d-hatch-green"
        stroke="#22c55e"
        innerStroke="#4ade80"
        outerDashed={false}
        prefix="rec-d"
        lines={['GO APPLICATION', 'ECHO URL SHORTENER']}
      />

      <Cylinder
        cx={725}
        top={154}
        rx={75}
        ry={18}
        body={128}
        hatch="rec-d-hatch-blue"
        clipId="rec-d-cyl"
        prefix="rec-d"
        lines={['POSTGRESQL DB', 'PORT 5432']}
      />

      {/* Bottom: Generated Artifacts */}
      <DashedBox
        x={270}
        y={398}
        width={300}
        height={94}
        hatch="rec-d-hatch-purple"
        stroke="#a855f7"
        innerStroke="#c084fc"
        prefix="rec-d"
        lines={[
          'keploy/ DIRECTORY',
          'TEST CASES: tests/test-1.yml',
          'MOCKS: mocks.yaml',
        ]}
      />

      {/* Top Stream: Keploy Record Mode -> Go App (Continuous streaming line) */}
      <StreamLine
        d="M 420 106 V 166"
        stroke="#f97316"
        markerEnd="url(#rec-d-arrow-orange)"
        dur="0.85s"
      />
      <HopLabel x={420} y={136} fill="#fb923c">
        INSTRUMENTS (eBPF)
      </HopLabel>

      {/* Lines: Client <-> Go App */}
      <path
        d="M 188 200 H 315"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.3"
        strokeDasharray="5 5"
        markerEnd="url(#rec-d-arrow-gray)"
      />
      <HopLabel x={251} y={188}>
        HTTP REQUEST
      </HopLabel>

      <path
        d="M 315 240 H 188"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.3"
        strokeDasharray="5 5"
        markerEnd="url(#rec-d-arrow-gray)"
      />
      <HopLabel x={251} y={256}>
        RESPONSE (JSON)
      </HopLabel>

      {/* Lines: Go App <-> Postgres */}
      <path
        d="M 525 200 H 650"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.3"
        strokeDasharray="5 5"
        markerEnd="url(#rec-d-arrow-blue)"
      />
      <HopLabel x={587} y={188} fill="#60a5fa">
        SQL QUERY
      </HopLabel>

      <path
        d="M 650 240 H 525"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.3"
        strokeDasharray="5 5"
        markerEnd="url(#rec-d-arrow-blue)"
      />
      <HopLabel x={587} y={256} fill="#60a5fa">
        SQL RESULT
      </HopLabel>

      {/* Bottom Stream: Go App -> keploy/ DIRECTORY (Continuous streaming line) */}
      <StreamLine
        d="M 420 280 V 398"
        stroke="#c084fc"
        markerEnd="url(#rec-d-arrow-purple)"
        dur="0.85s"
      />
      <HopLabel x={420} y={342} fill="#c084fc">
        CAPTURED BY KEPLOY → GENERATES FILES
      </HopLabel>

      {/* Single smooth round-trip orange dot:
          Client -> HTTP REQUEST -> Go App -> SQL QUERY -> Postgres DB ->
          loops smoothly to SQL RESULT -> Go App -> RESPONSE (JSON) -> Client -> loops smoothly */}
      <RequestDot
        path="M 188 200 H 650 C 678 200, 678 240, 650 240 H 188 C 160 240, 160 200, 188 200 Z"
        fill="#f97316"
        dur="5.4s"
      />
    </svg>
  );
}

function MobileRecordDiagram() {
  return (
    <svg
      className="block h-auto w-full md:hidden"
      viewBox="0 0 320 700"
      role="img"
      aria-label="Keploy Record mode diagram: Client, Go API, PostgreSQL, and Keploy generated files"
    >
      <HatchDefs prefix="rec-m" />
      <rect width="320" height="700" fill="#0c0c0c" />

      {/* Top: Keploy Record */}
      <DashedBox
        x={70}
        y={36}
        width={180}
        height={62}
        badge="keploy record"
        hatch="rec-m-hatch-orange"
        stroke="#f97316"
        innerStroke="#fb923c"
        prefix="rec-m"
        lines={['KEPLOY RECORD', '(eBPF MODE)']}
      />

      {/* Client */}
      <DashedBox
        x={80}
        y={144}
        width={160}
        height={64}
        hatch="rec-m-hatch"
        stroke="#8d8d8d"
        innerStroke="#6f6f6f"
        prefix="rec-m"
        lines={['CLIENT', 'curl / POST /url']}
      />

      {/* Go App */}
      <DashedBox
        x={65}
        y={254}
        width={190}
        height={84}
        hatch="rec-m-hatch-green"
        stroke="#22c55e"
        innerStroke="#4ade80"
        outerDashed={false}
        prefix="rec-m"
        lines={['GO APPLICATION', 'ECHO SHORTENER']}
      />

      {/* PostgreSQL */}
      <Cylinder
        cx={160}
        top={382}
        rx={74}
        ry={15}
        body={100}
        hatch="rec-m-hatch-blue"
        clipId="rec-m-cyl"
        prefix="rec-m"
        lines={['POSTGRESQL DB', 'PORT 5432']}
      />

      {/* Generated Artifacts */}
      <DashedBox
        x={40}
        y={544}
        width={240}
        height={86}
        hatch="rec-m-hatch-purple"
        stroke="#a855f7"
        innerStroke="#c084fc"
        prefix="rec-m"
        lines={[
          'keploy/ ARTIFACTS',
          'TEST CASES: test-1.yml',
          'MOCKS: mocks.yaml',
        ]}
      />

      {/* Vertical connectors */}
      <StreamLine
        d="M 160 98 V 144"
        stroke="#f97316"
        markerEnd="url(#rec-m-arrow-orange)"
        dur="0.85s"
      />
      <HopLabel x={195} y={122} fill="#fb923c">
        eBPF
      </HopLabel>

      <path
        d="M 160 208 V 254"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.3"
        strokeDasharray="4 4"
        markerEnd="url(#rec-m-arrow-gray)"
      />
      <HopLabel x={198} y={234}>
        HTTP
      </HopLabel>

      <path
        d="M 160 338 V 382"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.3"
        strokeDasharray="4 4"
        markerEnd="url(#rec-m-arrow-blue)"
      />
      <HopLabel x={198} y={362} fill="#60a5fa">
        SQL
      </HopLabel>

      <StreamLine
        d="M 160 482 V 544"
        stroke="#a855f7"
        markerEnd="url(#rec-m-arrow-purple)"
        dur="0.85s"
      />
      <HopLabel x={160} y={518} fill="#c084fc">
        CAPTURED BY KEPLOY
      </HopLabel>

      {/* Mobile Animated Dot */}
      <RequestDot
        path="M 160 208 V 254 V 382 V 338 V 208"
        fill="#f97316"
        dur="4.5s"
      />
    </svg>
  );
}

export function RecordDiagram() {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden bg-[#0c0c0c]">
        <DesktopRecordDiagram />
        <MobileRecordDiagram />
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Keploy in record mode: eBPF instruments the application, captures real HTTP and PostgreSQL interactions, and outputs reproducible test cases and mocks.
      </figcaption>
    </figure>
  );
}
