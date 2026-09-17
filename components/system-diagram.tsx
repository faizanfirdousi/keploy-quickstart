function HatchDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
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
}) {
  const inset = 8;
  return (
    <g>
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
      <rect
        x={x + inset}
        y={y + inset}
        width={width - inset * 2}
        height={height - inset * 2}
        fill="none"
        stroke={innerStroke}
        strokeWidth="1.15"
        strokeDasharray="4 4"
      />
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + width / 2}
          y={
            y +
            height / 2 +
            (i - (lines.length - 1) / 2) * 16
          }
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ececec"
          fontSize="13"
          fontWeight="500"
          letterSpacing="0.16em"
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
}: {
  cx: number;
  top: number;
  rx: number;
  ry: number;
  body: number;
  hatch: string;
  clipId: string;
  lines: string[];
}) {
  const bottom = top + body;
  const left = cx - rx;
  const right = cx + rx;

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
      </defs>
      <rect
        x={left}
        y={top}
        width={rx * 2}
        height={body}
        fill={`url(#${hatch})`}
        clipPath={`url(#${clipId})`}
      />
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
          fill="#ececec"
          fontSize="11"
          fontWeight="500"
          letterSpacing="0.14em"
          fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function RequestDot({ path }: { path: string }) {
  return (
    <circle className="sysdiag-dot" r="4.5" fill="#f97316">
      <animateMotion
        path={path}
        dur="6.8s"
        repeatCount="indefinite"
        calcMode="linear"
        keyTimes="0;0.16;0.22;0.38;0.48;0.64;0.70;0.86;1"
        keyPoints="0;0.143;0.143;0.5;0.5;0.64;0.64;1;1"
      />
    </circle>
  );
}

function HopLabel({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#8a8a8a"
      fontSize="10"
      fontWeight="500"
      letterSpacing="0.18em"
      fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    >
      {children}
    </text>
  );
}

function DesktopDiagram() {
  return (
    <svg
      className="hidden h-auto w-full md:block"
      viewBox="0 0 820 280"
      role="img"
      aria-label="Request flow from the client to the Go API, then to PostgreSQL"
    >
      <HatchDefs prefix="sys-d" />
      <rect width="820" height="280" fill="#0c0c0c" />

      <DashedBox
        x={48}
        y={96}
        width={152}
        height={88}
        hatch="sys-d-hatch"
        stroke="#8d8d8d"
        innerStroke="#6f6f6f"
        lines={['CLIENT']}
      />
      <DashedBox
        x={316}
        y={76}
        width={176}
        height={128}
        hatch="sys-d-hatch-green"
        stroke="#22c55e"
        innerStroke="#4ade80"
        outerDashed={false}
        lines={['GO API']}
      />
      <Cylinder
        cx={690}
        top={68}
        rx={84}
        ry={22}
        body={144}
        hatch="sys-d-hatch-blue"
        clipId="sys-d-cyl"
        lines={['POSTGRESQL']}
      />

      <path
        d="M 200 140 H 316"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.4"
        strokeDasharray="5 6"
      />
      <path
        d="M 492 140 H 606"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.4"
        strokeDasharray="5 6"
      />

      <HopLabel x={258} y={168}>
        HTTP
      </HopLabel>
      <HopLabel x={549} y={168}>
        SQL
      </HopLabel>

      <RequestDot path="M 200 140 H 316 H 492 H 606 H 492 H 316 H 200" />
    </svg>
  );
}

function MobileDiagram() {
  return (
    <svg
      className="block h-auto w-full md:hidden"
      viewBox="0 0 320 520"
      role="img"
      aria-label="Request flow from the client to the Go API, then to PostgreSQL"
    >
      <HatchDefs prefix="sys-m" />
      <rect width="320" height="520" fill="#0c0c0c" />

      <DashedBox
        x={86}
        y={28}
        width={148}
        height={76}
        hatch="sys-m-hatch"
        stroke="#8d8d8d"
        innerStroke="#6f6f6f"
        lines={['CLIENT']}
      />
      <DashedBox
        x={76}
        y={184}
        width={168}
        height={104}
        hatch="sys-m-hatch-green"
        stroke="#22c55e"
        innerStroke="#4ade80"
        outerDashed={false}
        lines={['GO API']}
      />
      <Cylinder
        cx={160}
        top={368}
        rx={78}
        ry={16}
        body={118}
        hatch="sys-m-hatch-blue"
        clipId="sys-m-cyl"
        lines={['POSTGRESQL']}
      />

      <path
        id="sys-m-http"
        d="M 160 104 V 184"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.4"
        strokeDasharray="5 6"
      />
      <path
        id="sys-m-sql"
        d="M 160 288 V 368"
        fill="none"
        stroke="#6b6b6b"
        strokeWidth="1.4"
        strokeDasharray="5 6"
      />

      <HopLabel x={196} y={150}>
        HTTP
      </HopLabel>
      <HopLabel x={196} y={334}>
        SQL
      </HopLabel>

      <RequestDot path="M 160 104 V 184 V 288 V 368 V 288 V 184 V 104" />
    </svg>
  );
}

export function SystemDiagram() {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden bg-[#0c0c0c]">
        <DesktopDiagram />
        <MobileDiagram />
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        One request: Client → Go API → PostgreSQL, then the response comes back the same way.
      </figcaption>
    </figure>
  );
}
