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
        <rect width="420" height="420" fill="#f7f3ea" />
        <path
          d="M30 110 C90 40, 135 105, 205 80 S320 58, 388 112"
          fill="none"
          stroke="#b5c9a3"
          strokeLinecap="round"
          strokeWidth="7"
        />
        <path
          d="M34 282 C96 208, 146 316, 202 250 S303 176, 382 224"
          fill="none"
          stroke="#9bb898"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M88 78 C126 176, 258 128, 334 304"
          fill="none"
          stroke="#88a88c"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M44 342 C128 300, 170 362, 238 330 S316 288, 388 340"
          fill="none"
          stroke="#dce7ca"
          strokeLinecap="round"
          strokeWidth="6"
        />
        {[
          ["74", "110", "#88a88c"],
          ["150", "92", "#9bb898"],
          ["248", "92", "#b5c9a3"],
          ["344", "124", "#cfcfb2"],
          ["72", "282", "#d7e3c1"],
          ["178", "276", "#dce7ca"],
          ["274", "218", "#a8bc94"],
          ["346", "246", "#88a88c"],
          ["116", "344", "#b5c9a3"],
          ["258", "330", "#9bb898"],
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
