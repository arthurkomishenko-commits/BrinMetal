export function ShimmerDivider() {
  return (
    <div className="relative h-[3px]">
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      {/* Traveling copper light */}
      <div className="divider-shimmer absolute inset-0" />
      {/* Secondary slower shimmer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ animationDelay: "3s" }}
      >
        <div
          className="absolute inset-0 w-[30%]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(196,149,106,0.15), transparent)",
            animation: "shimmer-line 10s ease-in-out infinite 3s",
          }}
        />
      </div>
    </div>
  );
}
