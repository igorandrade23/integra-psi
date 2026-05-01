type WireNetworkProps = {
  className?: string;
};

export function WireNetwork({ className = "" }: WireNetworkProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border-soft bg-surface-strong ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 420 420" className="h-full w-full">
        <rect width="420" height="420" fill="#fffaf1" />
        <path
          d="M30 110 C90 40, 135 105, 205 80 S320 58, 388 112"
          fill="none"
          stroke="#e3b23c"
          strokeLinecap="round"
          strokeWidth="7"
        />
        <path
          d="M34 282 C96 208, 146 316, 202 250 S303 176, 382 224"
          fill="none"
          stroke="#126c86"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M88 78 C126 176, 258 128, 334 304"
          fill="none"
          stroke="#d85c4a"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M44 342 C128 300, 170 362, 238 330 S316 288, 388 340"
          fill="none"
          stroke="#1f7a4d"
          strokeLinecap="round"
          strokeWidth="6"
        />
        {[
          ["74", "110", "#1f7a4d"],
          ["150", "92", "#d85c4a"],
          ["248", "92", "#126c86"],
          ["344", "124", "#e3b23c"],
          ["72", "282", "#126c86"],
          ["178", "276", "#e3b23c"],
          ["274", "218", "#1f7a4d"],
          ["346", "246", "#d85c4a"],
          ["116", "344", "#d85c4a"],
          ["258", "330", "#126c86"],
        ].map(([cx, cy, fill]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            fill={fill}
            opacity="0.92"
            r="16"
          />
        ))}
      </svg>
    </div>
  );
}
