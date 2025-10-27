import { useMemo } from "react";

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateRandomAvatar() {
  return {
    skinTone: randomFrom(["#f1c27d", "#e0ac69", "#c68642", "#8d5524"]),
    hairStyle: randomFrom(["short", "messy", "spiky"]),
    hairColor: randomFrom(["#2f2f2f", "#4a2c2a", "#1f1f1f", "#6b7280", "#1e293b"]),
    eyeColor: randomFrom(["#0ea5e9", "#22c55e", "#a855f7", "#1e40af"]),
    eyeStyle: randomFrom(["normal", "smile", "serious"]),
    outfit: randomFrom(["hoodie", "tee", "jacket"]),
    accent: randomFrom(["none", "blush"]) ,
  };
}

function Hair({ style, color }) {
  if (style === "short") {
    return (
      <path d="M50 35 C40 25, 60 25, 50 35 Z" fill={color} />
    );
  }
  if (style === "messy") {
    return (
      <g fill={color}>
        <path d="M34 38 C40 22, 60 22, 66 38 Q50 30,34 38" />
        <path d="M42 22 l-4 8" stroke={color} strokeWidth="2" />
        <path d="M58 22 l4 8" stroke={color} strokeWidth="2" />
      </g>
    );
  }
  // spiky
  return (
    <g fill={color}>
      <path d="M34 38 L40 22 L46 38 Z" />
      <path d="M46 38 L52 20 L58 38 Z" />
      <path d="M58 38 L64 23 L68 38 Z" />
    </g>
  );
}

function Eyes({ color, style }) {
  if (style === "smile") {
    return (
      <g>
        <path d="M40 52 q5 4 10 0" stroke="#111827" strokeWidth="2" fill="none" />
        <path d="M60 52 q5 4 10 0" stroke="#111827" strokeWidth="2" fill="none" />
      </g>
    );
  }
  if (style === "serious") {
    return (
      <g>
        <line x1="40" y1="49" x2="50" y2="49" stroke="#111827" strokeWidth="2" />
        <line x1="60" y1="49" x2="70" y2="49" stroke="#111827" strokeWidth="2" />
        <circle cx="46" cy="53" r="3" fill={color} />
        <circle cx="64" cy="53" r="3" fill={color} />
      </g>
    );
  }
  return (
    <g>
      <circle cx="46" cy="53" r="4" fill={color} />
      <circle cx="64" cy="53" r="4" fill={color} />
      <circle cx="46" cy="53" r="1.5" fill="#fff" />
      <circle cx="64" cy="53" r="1.5" fill="#fff" />
    </g>
  );
}

function Outfit({ type }) {
  if (type === "hoodie") {
    return (
      <g>
        <path d="M30 80 q20 -10 40 0 q6 2 10 12 H20 q4 -10 10 -12 Z" fill="#0ea5e9" />
        <path d="M35 80 q15 -8 30 0" stroke="#fff" strokeWidth="2" fill="none" />
      </g>
    );
  }
  if (type === "jacket") {
    return (
      <g>
        <path d="M25 80 q25 -14 50 0 v18 H25 Z" fill="#334155" />
        <path d="M50 80 v18" stroke="#e5e7eb" strokeWidth="2" />
      </g>
    );
  }
  return (
    <path d="M25 82 h50 v16 H25 Z" fill="#10b981" />
  );
}

function Blush() {
  return (
    <g opacity=".6">
      <ellipse cx="38" cy="60" rx="4" ry="2.2" fill="#fb7185" />
      <ellipse cx="72" cy="60" rx="4" ry="2.2" fill="#fb7185" />
    </g>
  );
}

export default function Avatar({ config }) {
  const cfg = useMemo(() => config, [config]);
  return (
    <svg viewBox="0 0 100 110" width="320" height="352" className="rounded-xl shadow border bg-white">
      <defs>
        <clipPath id="faceClip">
          <ellipse cx="50" cy="55" rx="22" ry="26" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="100" height="110" fill="#f8fafc" />

      {/* Neck */}
      <rect x="45" y="70" width="10" height="12" fill={cfg.skinTone} />

      {/* Outfit */}
      <Outfit type={cfg.outfit} />

      {/* Face */}
      <g clipPath="url(#faceClip)">
        <ellipse cx="50" cy="55" rx="22" ry="26" fill={cfg.skinTone} />
        <Eyes color={cfg.eyeColor} style={cfg.eyeStyle} />
        {/* Nose */}
        <path d="M50 56 q-1 4 2 5" stroke="#78350f" strokeWidth="1.5" fill="none" />
        {/* Mouth */}
        <path d="M45 66 q5 4 10 0" stroke="#b91c1c" strokeWidth="1.5" fill="none" />
        {cfg.accent === "blush" ? <Blush /> : null}
      </g>

      {/* Hair */}
      <g>
        <Hair style={cfg.hairStyle} color={cfg.hairColor} />
      </g>

      {/* Ears */}
      <ellipse cx="27" cy="57" rx="3" ry="4" fill={cfg.skinTone} />
      <ellipse cx="73" cy="57" rx="3" ry="4" fill={cfg.skinTone} />
    </svg>
  );
}
