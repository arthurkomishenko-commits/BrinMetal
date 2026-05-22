export function ShimmerDivider() {
  return (
    <div className="relative h-[5px] overflow-hidden">
      {/* Deep shadow gap -- structural separation */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.03) 60%, rgba(0,0,0,0.4))",
        }}
      />
      {/* Imperfect weld seam -- uneven copper line */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-[3%] right-[3%] h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(196,149,106,0.06) 5%, rgba(196,149,106,0.18) 12%, rgba(196,149,106,0.08) 25%, rgba(196,149,106,0.22) 35%, rgba(196,149,106,0.05) 48%, rgba(196,149,106,0.15) 58%, rgba(196,149,106,0.1) 72%, rgba(196,149,106,0.2) 85%, rgba(196,149,106,0.04) 95%, transparent 100%)",
          filter: "blur(0.3px)",
        }}
      />
      {/* Traveling gleam */}
      <div className="divider-shimmer absolute inset-0" />
    </div>
  );
}
