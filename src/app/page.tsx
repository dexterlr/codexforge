import type { CSSProperties } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main style={page}>
      <div style={shell}>
        {/* Top bar */}
        <header style={topBar}>
          <div style={brand}>
            <div aria-hidden="true" style={logo} />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>
                Health Tracker
              </div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Local-first starter (testbed)
              </div>
            </div>
          </div>

          <nav style={topNav}>
            <Link href="/entry" style={linkPillPrimary}>
              Add today’s entry
            </Link>
            <Link href="/history" style={linkPillGhost}>
              View history
            </Link>
          </nav>
        </header>

        {/* Hero card */}
        <section style={heroCard}>
          <div style={heroInner}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={badge}>
                <span aria-hidden="true" style={statusDot} />
                Offline-friendly • local-first
              </span>
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                fast UI • no heavy dependencies
              </span>
            </div>

            <h1 style={heroTitle}>
              Track daily health in{" "}
              <span style={gradientText}>seconds</span>.
            </h1>

            <p style={heroSubtitle}>
              Record <b>weight</b>, <b>steps</b>, <b>water</b>, <b>sleep</b>, and{" "}
              <b>notes</b>. Built as a clean baseline you can reuse for future
              projects (including AI-powered features).
            </p>

            <div style={ctaRow}>
              <Link href="/entry" style={ctaPrimary}>
                Add today’s entry <span aria-hidden="true" style={{ opacity: 0.8 }}>→</span>
              </Link>

              <Link href="/history" style={ctaSecondary}>
                View history
              </Link>

              <a
                href="http://127.0.0.1:8000/openapi.json"
                target="_blank"
                rel="noreferrer"
                style={ctaTertiary}
              >
                Backend API docs
              </a>
            </div>

            {/* Feature grid */}
            <div style={featureGrid}>
              <div style={miniCard}>
                <div style={miniTitle}>Local storage first</div>
                <div style={miniText}>
                  Offline by default, responsive UI. (We’ll wire storage next.)
                </div>
              </div>

              <div style={miniCard}>
                <div style={miniTitle}>Simple, fast UI</div>
                <div style={miniText}>
                  Minimal JS, sensible layout, scales without bloat.
                </div>
              </div>

              <div style={miniCard}>
                <div style={miniTitle}>Reusable testbed</div>
                <div style={miniText}>
                  This repo is intentionally a starter for future “real” apps + AI hooks.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <footer style={bottomStrip}>
            <div style={{ fontSize: 12, opacity: 0.78 }}>
              Next: wire <code style={code}>/entry</code> +{" "}
              <code style={code}>/history</code> to local storage, then add AI-assisted insights.
            </div>
            <div style={{ fontSize: 12, opacity: 0.65 }}>
              Tip: keep it fast—avoid heavy UI libraries unless you truly need them.
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

/* =========================
   Styles (fast, no libs)
========================= */

const page: CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  display: "grid",
  placeItems: "center",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.18), transparent 55%)," +
    "radial-gradient(700px 400px at 50% 90%, rgba(236,72,153,0.12), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: CSSProperties = {
  width: "100%",
  maxWidth: 980,
  display: "grid",
  gap: 18,
};

const topBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(10px)",
};

const brand: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const logo: CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 10,
  background:
    "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(16,185,129,0.85))",
  boxShadow: "0 10px 30px rgba(99,102,241,0.18)",
};

const topNav: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const heroCard: CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  overflow: "hidden",
};

const heroInner: CSSProperties = {
  padding: "clamp(18px, 4vw, 34px)",
  display: "grid",
  gap: 18,
};

const heroTitle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(34px, 5vw, 56px)",
  lineHeight: 1.03,
  letterSpacing: -0.8,
};

const gradientText: CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const heroSubtitle: CSSProperties = {
  margin: 0,
  maxWidth: 720,
  fontSize: 16,
  lineHeight: 1.6,
  opacity: 0.9,
};

const badge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 12,
  fontWeight: 800,
};

const statusDot: CSSProperties = {
  display: "inline-block",
  width: 8,
  height: 8,
  borderRadius: 999,
  background: "rgba(16,185,129,0.95)",
  boxShadow: "0 0 0 4px rgba(16,185,129,0.15)",
  marginRight: 8,
};

const ctaRow: CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
};

const linkPillBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 12px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 13,
  textDecoration: "none",
  userSelect: "none",
};

const linkPillPrimary: CSSProperties = {
  ...linkPillBase,
  background: "white",
  color: "black",
  border: "1px solid rgba(255,255,255,0.18)",
};

const linkPillGhost: CSSProperties = {
  ...linkPillBase,
  background: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.18)",
};

const ctaBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
  letterSpacing: 0.2,
  border: "1px solid rgba(255,255,255,0.18)",
  userSelect: "none",
};

const ctaPrimary: CSSProperties = {
  ...ctaBase,
  background:
    "linear-gradient(135deg, rgba(99,102,241,1) 0%, rgba(16,185,129,1) 100%)",
  color: "white",
  boxShadow: "0 18px 60px rgba(99,102,241,0.16)",
};

const ctaSecondary: CSSProperties = {
  ...ctaBase,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};

const ctaTertiary: CSSProperties = {
  ...ctaBase,
  background: "transparent",
  color: "rgba(255,255,255,0.85)",
};

const featureGrid: CSSProperties = {
  marginTop: 6,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const miniCard: CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

const miniTitle: CSSProperties = {
  fontWeight: 900,
  marginBottom: 6,
};

const miniText: CSSProperties = {
  fontSize: 13,
  opacity: 0.85,
  lineHeight: 1.45,
};

const bottomStrip: CSSProperties = {
  padding: "12px 18px",
  borderTop: "1px solid rgba(255,255,255,0.10)",
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  background: "rgba(0,0,0,0.18)",
};

const code: CSSProperties = {
  padding: "2px 6px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
};
