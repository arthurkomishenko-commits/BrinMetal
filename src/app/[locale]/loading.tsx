export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "0.25em",
          lineHeight: 1,
          margin: 0,
        }}
      >
        <span style={{ color: "#f5f5f0" }}>BRIN</span>
        <span style={{ color: "#c4956a" }}>METAL</span>
      </p>

      <div
        style={{
          marginTop: "1.5rem",
          width: "clamp(160px, 30vw, 280px)",
          height: "2px",
          backgroundColor: "rgba(196, 149, 106, 0.15)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#c4956a",
            borderRadius: "1px",
            animation: "loading-line 1.8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Inline keyframes -- server component, no JS needed */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes loading-line {
              0%   { width: 0%; margin-left: 0; }
              50%  { width: 100%; margin-left: 0; }
              100% { width: 0%; margin-left: 100%; }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes loading-line {
                0%, 100% { width: 100%; margin-left: 0; }
              }
            }
          `,
        }}
      />
    </div>
  );
}
