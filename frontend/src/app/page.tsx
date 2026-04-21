import type { CSSProperties } from "react";
import Link from "next/link";

const PRODUCT_NAME = "CodexForge";

const PRIMARY_ACTIONS = [
  {
    href: "/ai",
    label: "Open workspace",
    description:
      "Go into the main CodexForge surface for planning, chat, memory, execution, and structured workflow guidance.",
    variant: "primary" as const,
  },
  {
    href: "/history",
    label: "View activity",
    description:
      "Review saved activity and the current legacy data surface while it evolves into real workspace history.",
    variant: "secondary" as const,
  },
  {
    href: "/entry",
    label: "Open legacy entry",
    description:
      "Use the existing data-entry screen while the product transitions away from the old test-harness flow.",
    variant: "ghost" as const,
  },
] as const;

const PRODUCT_PILLARS = [
  {
    title: "Structured planning",
    text:
      "Turn rough requests into goals, steps, risks, files, commands, and next actions without losing context.",
  },
  {
    title: "Local-first resilience",
    text:
      "Keep the workspace useful when remote providers fail, time out, or are intentionally disabled.",
  },
  {
    title: "Memory that matters",
    text:
      "Preserve useful decisions, project facts, task state, and reusable context across the workspace.",
  },
  {
    title: "Safe execution flow",
    text:
      "Move through planning, approvals, diff previews, snapshots, and controlled execution instead of blind mutation.",
  },
  {
    title: "Research and design",
    text:
      "Support architecture thinking, investigation, comparison, and product reasoning from the same frontend.",
  },
  {
    title: "Real product direction",
    text:
      "This is no longer a generic starter. It should become the serious CodexForge entry point and control surface.",
  },
] as const;

const CURRENT_STATUS = [
  {
    label: "Primary surface",
    value: "/ai workspace",
  },
  {
    label: "Mode",
    value: "Local-first",
  },
  {
    label: "Execution path",
    value: "Approval-oriented",
  },
  {
    label: "State",
    value: "Active migration",
  },
] as const;

const ROADMAP = [
  "Make /ai the unquestioned main CodexForge workspace.",
  "Replace remaining legacy wording and old test-harness framing.",
  "Turn /history into real workspace history for plans, runs, diffs, memory, and events.",
  "Keep backend usage optional with stable local fallback behavior.",
  "Expand repo-aware tooling and execution visibility without bloating the UI.",
] as const;

const PRODUCT_AREAS = [
  "Planning",
  "Memory",
  "Execution",
  "Research",
  "Repo tooling",
  "Workflows",
  "Operator approvals",
  "Local fallback",
] as const;

export default function Home() {
  return (
    <main style={page}>
      <div style={shell}>
        <header style={topBar}>
          <div style={brand}>
            <div aria-hidden="true" style={logo} />
            <div style={brandTextWrap}>
              <div style={brandTitle}>{PRODUCT_NAME}</div>
              <div style={brandSubtitle}>AI developer workspace</div>
            </div>
          </div>

          <nav style={topNav}>
            <Link href="/ai" style={linkPillPrimary}>
              Workspace
            </Link>
            <Link href="/history" style={linkPillGhost}>
              Activity
            </Link>
            <Link href="/entry" style={linkPillGhost}>
              Legacy entry
            </Link>
          </nav>
        </header>

        <section style={heroCard}>
          <div style={heroInner}>
            <div style={heroStatusRow}>
              <span style={badge}>
                <span aria-hidden="true" style={statusDot} />
                Local-first • backend-optional • product migration live
              </span>

              <span style={metaText}>
                fast UI • operator direction • structured workflow surface
              </span>
            </div>

            <div style={heroGrid}>
              <div style={heroMain}>
                <h1 style={heroTitle}>
                  Build a real workspace for{" "}
                  <span style={gradientText}>
                    planning, memory, research, and safe execution
                  </span>
                  .
                </h1>

                <p style={heroSubtitle}>
                  <b>{PRODUCT_NAME}</b> should feel like an AI developer assistant
                  and research copilot, not a starter template. The home page should
                  clearly route into the real workspace, explain the product direction,
                  and make the current migration state obvious instead of pretending the
                  old flow is still the main app.
                </p>

                <div style={ctaRow}>
                  <Link href="/ai" style={ctaPrimary}>
                    Open CodexForge workspace
                    <span aria-hidden="true" style={{ opacity: 0.82 }}>
                      →
                    </span>
                  </Link>

                  <Link href="/history" style={ctaSecondary}>
                    View activity
                  </Link>

                  <a
                    href="/api/codexforge/run"
                    target="_blank"
                    rel="noreferrer"
                    style={ctaTertiary}
                  >
                    Engine route
                  </a>
                </div>
              </div>

              <aside style={statusPanel}>
                <div style={statusPanelTitle}>Current product posture</div>

                <div style={statusGrid}>
                  {CURRENT_STATUS.map((item) => (
                    <div key={item.label} style={statusCard}>
                      <div style={statusCardLabel}>{item.label}</div>
                      <div style={statusCardValue}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div style={statusNote}>
                  Treat <code style={code}>/ai</code> as the main product surface.
                  <code style={code}> /history</code> and
                  <code style={code}> /entry</code> remain available during migration,
                  but they are support pages, not the identity of the product.
                </div>
              </aside>
            </div>

            <div style={quickLinksGrid}>
              {PRIMARY_ACTIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={
                    item.variant === "primary"
                      ? quickLinkPrimary
                      : item.variant === "secondary"
                        ? quickLinkSecondary
                        : quickLinkGhost
                  }
                >
                  <div style={quickLinkTitle}>{item.label}</div>
                  <div style={quickLinkText}>{item.description}</div>
                </Link>
              ))}
            </div>

            <div style={sectionLabel}>Core product pillars</div>

            <div style={featureGrid}>
              {PRODUCT_PILLARS.map((item) => (
                <div key={item.title} style={miniCard}>
                  <div style={miniTitle}>{item.title}</div>
                  <div style={miniText}>{item.text}</div>
                </div>
              ))}
            </div>

            <div style={sectionLabel}>Target capabilities</div>

            <div style={tagRow}>
              {PRODUCT_AREAS.map((item) => (
                <div key={item} style={tagChip}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <footer style={bottomStrip}>
            <div style={bottomBlock}>
              <div style={bottomTitle}>Near-term upgrades</div>

              <ul style={roadmapList}>
                {ROADMAP.map((item) => (
                  <li key={item} style={roadmapItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={bottomSide}>
              <div style={tipCard}>
                <div style={tipTitle}>What Home should do now</div>
                <div style={tipText}>
                  Act as a clean front door into the real CodexForge product,
                  explain the migration clearly, and steer people into the workspace
                  instead of centering old test data flows.
                </div>
              </div>

              <div style={tipCard}>
                <div style={tipTitle}>Design rule</div>
                <div style={tipText}>
                  Keep it sharp, readable, and purposeful. The page should feel
                  product-level, not like a temporary dev placeholder.
                </div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

/* =========================
   Styles
========================= */

const page: CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  display: "grid",
  placeItems: "center",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.16), transparent 55%)," +
    "radial-gradient(700px 400px at 50% 90%, rgba(236,72,153,0.10), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: CSSProperties = {
  width: "100%",
  maxWidth: 1160,
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

const brandTextWrap: CSSProperties = {
  display: "grid",
  gap: 2,
  lineHeight: 1.1,
};

const brandTitle: CSSProperties = {
  fontWeight: 800,
  letterSpacing: 0.2,
};

const brandSubtitle: CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
};

const logo: CSSProperties = {
  width: 30,
  height: 30,
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
  gap: 20,
};

const heroStatusRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
};

const heroGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.4fr 0.9fr",
  gap: 18,
  alignItems: "start",
};

const heroMain: CSSProperties = {
  display: "grid",
  gap: 18,
};

const statusPanel: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

const statusPanelTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  opacity: 0.84,
};

const statusGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const statusCard: CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  display: "grid",
  gap: 4,
};

const statusCardLabel: CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  fontWeight: 900,
};

const statusCardValue: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
};

const statusNote: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  opacity: 0.82,
};

const heroTitle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(34px, 5vw, 58px)",
  lineHeight: 1.03,
  letterSpacing: -0.9,
  maxWidth: 940,
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
  maxWidth: 820,
  fontSize: 16,
  lineHeight: 1.65,
  opacity: 0.92,
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

const metaText: CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
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

const quickLinksGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const quickLinkBase: CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 14,
  borderRadius: 16,
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.10)",
};

const quickLinkPrimary: CSSProperties = {
  ...quickLinkBase,
  background: "rgba(99,102,241,0.16)",
  color: "white",
};

const quickLinkSecondary: CSSProperties = {
  ...quickLinkBase,
  background: "rgba(255,255,255,0.05)",
  color: "white",
};

const quickLinkGhost: CSSProperties = {
  ...quickLinkBase,
  background: "rgba(255,255,255,0.03)",
  color: "rgba(255,255,255,0.9)",
};

const quickLinkTitle: CSSProperties = {
  fontWeight: 900,
  fontSize: 15,
};

const quickLinkText: CSSProperties = {
  fontSize: 13,
  opacity: 0.82,
  lineHeight: 1.5,
};

const sectionLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 1,
  opacity: 0.72,
};

const featureGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
  opacity: 0.86,
  lineHeight: 1.5,
};

const tagRow: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const tagChip: CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 12,
  fontWeight: 800,
  opacity: 0.92,
};

const bottomStrip: CSSProperties = {
  padding: "16px 18px",
  borderTop: "1px solid rgba(255,255,255,0.10)",
  display: "grid",
  gridTemplateColumns: "1.3fr 0.9fr",
  gap: 16,
  background: "rgba(0,0,0,0.18)",
};

const bottomBlock: CSSProperties = {
  display: "grid",
  gap: 10,
};

const bottomTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  opacity: 0.88,
};

const roadmapList: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  display: "grid",
  gap: 8,
};

const roadmapItem: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  opacity: 0.84,
};

const bottomSide: CSSProperties = {
  display: "grid",
  gap: 12,
};

const tipCard: CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 6,
};

const tipTitle: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  opacity: 0.82,
};

const tipText: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.55,
  opacity: 0.8,
};

const code: CSSProperties = {
  padding: "2px 6px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
};