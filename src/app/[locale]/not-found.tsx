import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--graphite)] text-[var(--off-white)] px-6">
      <h1 className="text-8xl font-bold text-[var(--copper)] mb-4">404</h1>
      <p className="text-xl text-[var(--titanium)] mb-8">
        Page not found
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--copper)] text-[var(--copper)] hover:bg-[var(--copper)] hover:text-[var(--graphite)] transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
