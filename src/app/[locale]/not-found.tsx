import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111113] text-[var(--off-white)] px-6 relative overflow-hidden">
      {/* Faint grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Brand */}
        <div className="mb-6">
          <span className="text-lg font-bold tracking-[-0.02em] text-[var(--off-white)]">BRIN</span>
          <span className="text-lg font-bold tracking-[-0.02em] text-[var(--copper)]">METALL</span>
        </div>

        {/* Large 404 */}
        <h1 className="text-[clamp(6rem,20vw,14rem)] font-extrabold text-[var(--copper)] leading-none tracking-[-0.04em] text-stamped">
          404
        </h1>

        {/* Accent line */}
        <div className="w-16 h-[2px] bg-[var(--copper)] my-6 accent-line-shimmer" />

        {/* Message */}
        <p className="text-sm sm:text-base text-[var(--titanium)] uppercase tracking-[0.1em] mb-10">
          Page not found
        </p>

        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-7 py-3.5 border border-[var(--copper)] text-[var(--copper)] text-[13px] uppercase tracking-[0.1em] font-semibold active:bg-[var(--copper)] active:text-[var(--graphite)] md:hover:bg-[var(--copper)] md:hover:text-[var(--graphite)] transition-colors duration-300 min-h-[48px]"
        >
          <span>Home</span>
          <div className="w-5 h-[1px] bg-current" />
        </Link>
      </div>
    </div>
  );
}
