/* global React */
// Robot car SVG — animated drives across the hero stage

function RobotCar() {
  return (
    <svg className="robot" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* signal pulses from ultrasonic sensor */}
      <g transform="translate(220, 80)">
        <circle r="6" fill="none" stroke="var(--accent)" strokeWidth="2.5">
          <animate attributeName="r" values="6;30" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <circle r="6" fill="none" stroke="var(--accent)" strokeWidth="2.5">
          <animate attributeName="r" values="6;30" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* shadow */}
      <ellipse cx="130" cy="180" rx="100" ry="6" fill="rgba(11,11,14,0.18)" />

      {/* antenna */}
      <line x1="80" y1="60" x2="80" y2="20" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="18" r="6" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" />

      {/* claw arm */}
      <g>
        <rect x="180" y="50" width="12" height="40" fill="var(--ink)" rx="3" />
        <rect x="170" y="42" width="38" height="12" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" rx="3" />
        <path d="M 168 45 L 162 35 M 210 45 L 216 35" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* body */}
      <rect x="40" y="70" width="200" height="80" fill="var(--blue)" stroke="var(--ink)" strokeWidth="3" rx="14" />

      {/* body highlights */}
      <rect x="50" y="78" width="180" height="8" fill="rgba(255,255,255,0.25)" rx="4" />

      {/* eye / camera */}
      <rect x="56" y="92" width="40" height="34" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" rx="6" />
      <circle cx="76" cy="109" r="8" fill="var(--ink)" />
      <circle cx="78" cy="106" r="2.5" fill="var(--paper)" />

      {/* control panel */}
      <rect x="108" y="92" width="64" height="34" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.5" rx="6" />
      <circle cx="120" cy="105" r="3" fill="var(--accent)" />
      <circle cx="132" cy="105" r="3" fill="var(--mint)" />
      <circle cx="144" cy="105" r="3" fill="var(--ink)" />
      <rect x="114" y="114" width="48" height="6" fill="var(--ink)" rx="2" />

      {/* ultrasonic sensor (front) */}
      <rect x="220" y="84" width="20" height="32" fill="var(--ink)" rx="4" />
      <circle cx="230" cy="94" r="5" fill="var(--paper)" />
      <circle cx="230" cy="106" r="5" fill="var(--paper)" />

      {/* wheels */}
      <g className="wheel" style={{transformOrigin: '78px 158px'}}>
        <circle cx="78" cy="158" r="22" fill="var(--ink)" />
        <circle cx="78" cy="158" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        <line x1="78" y1="146" x2="78" y2="170" stroke="var(--ink)" strokeWidth="3" />
        <line x1="66" y1="158" x2="90" y2="158" stroke="var(--ink)" strokeWidth="3" />
      </g>
      <g className="wheel back" style={{transformOrigin: '202px 158px'}}>
        <circle cx="202" cy="158" r="22" fill="var(--ink)" />
        <circle cx="202" cy="158" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        <line x1="202" y1="146" x2="202" y2="170" stroke="var(--ink)" strokeWidth="3" />
        <line x1="190" y1="158" x2="214" y2="158" stroke="var(--ink)" strokeWidth="3" />
      </g>
    </svg>
  );
}

// Snap-block icon set used in highlights
function HLIcon({ kind }) {
  const stroke = "var(--ink)";
  const sw = 2.5;
  switch (kind) {
    case "tech":
      return (
        <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
          <rect x="12" y="20" width="36" height="24" fill="var(--paper)" stroke={stroke} strokeWidth={sw} rx="4" />
          <circle cx="20" cy="48" r="4" fill={stroke} />
          <circle cx="40" cy="48" r="4" fill={stroke} />
          <rect x="22" y="14" width="16" height="8" fill="var(--accent)" stroke={stroke} strokeWidth={sw} rx="2" />
          <circle cx="22" cy="30" r="2.5" fill="var(--accent)" />
          <circle cx="30" cy="30" r="2.5" fill={stroke} />
          <circle cx="38" cy="30" r="2.5" fill={stroke} />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
          <rect x="8" y="14" width="26" height="10" fill="var(--accent)" stroke={stroke} strokeWidth={sw} rx="3" />
          <rect x="14" y="24" width="32" height="10" fill="var(--blue)" stroke={stroke} strokeWidth={sw} rx="3" />
          <rect x="10" y="34" width="28" height="10" fill="var(--mint)" stroke={stroke} strokeWidth={sw} rx="3" />
        </svg>
      );
    case "hands":
      return (
        <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
          <circle cx="30" cy="30" r="18" fill="var(--paper)" stroke={stroke} strokeWidth={sw} />
          <path d="M 14 30 A 16 16 0 0 1 46 30" fill="none" stroke="var(--accent)" strokeWidth={sw + 1} strokeLinecap="round" />
          <line x1="30" y1="22" x2="30" y2="34" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <line x1="30" y1="34" x2="38" y2="40" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
          <path d="M 30 8 L 38 22 L 52 24 L 42 34 L 44 48 L 30 42 L 16 48 L 18 34 L 8 24 L 22 22 Z"
            fill="var(--primary)" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    default: return null;
  }
}

window.RobotCar = RobotCar;
window.HLIcon = HLIcon;
