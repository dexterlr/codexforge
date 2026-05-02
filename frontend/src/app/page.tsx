import type { CSSProperties } from "react";
import Link from "next/link";

const PRODUCT_NAME = "CodexForge";

type ActionVariant = "primary" | "secondary" | "ghost";

type ActionLink = {
  href: string;
  label: string;
  description: string;
  variant: ActionVariant;
};

type SurfaceCard = {
  title: string;
  path: string;
  summary: string;
  status: string;
};

type Pillar = {
  title: string;
  text: string;
};

type StatusItem = {
  label: string;
  value: string;
};

type HighlightStat = {
  label: string;
  value: string;
  detail: string;
};

const PRIMARY_ACTIONS: readonly ActionLink[] = [
  {
    href: "/ai",
    label: "Open workspace",
    description:
      "Enter the main CodexForge surface for planning, chat, memory, execution, and structured workflow guidance.",
    variant: "primary",
  },
  {
    href: "/clawd",
    label: "Open operator",
    description:
      "Use the approval-driven operator surface for snapshot, plan, diff, apply, test, and checkpoint flows.",
    variant: "secondary",
  },
  {
    href: "/history",
    label: "View activity",
    description:
      "Review saved activity, launches, and evolving workspace history instead of raw legacy lists.",
    variant: "secondary",
  },
  {
    href: "/brain",
    label: "Inspect brain graph",
    description:
      "Open the local graph memory inspector to review nodes, edges, relationships, and saved workspace context.",
    variant: "ghost",
  },
  {
    href: "/entry",
    label: "Quick launch",
    description:
      "Prepare a structured draft and send it straight into the AI workspace with activity tracking.",
    variant: "ghost",
  },
] as const;

const PRODUCT_PILLARS: readonly Pillar[] = [
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
    title: "Operator visibility",
    text:
      "Expose the real execution loop through a proper operator page instead of sending users into API endpoints.",
  },
] as const;

const CURRENT_STATUS: readonly StatusItem[] = [
  {
    label: "Primary surface",
    value: "/ai workspace",
  },
  {
    label: "Operator surface",
    value: "/clawd",
  },
  {
    label: "Brain inspector",
    value: "/brain",
  },
  {
    label: "Execution path",
    value: "Approval-oriented",
  },
] as const;

const HIGHLIGHT_STATS: readonly HighlightStat[] = [
  {
    label: "Primary entry point",
    value: "/ai",
    detail: "Main workspace for active product work.",
  },
  {
    label: "Execution control",
    value: "/clawd",
    detail: "Human approval before apply and test flow.",
  },
  {
    label: "Memory surface",
    value: "/brain",
    detail: "Inspect graph state and connected context.",
  },
  {
    label: "Launch flow",
    value: "/entry",
    detail: "Quick-start into the workspace with activity tracking.",
  },
] as const;

const ROADMAP: readonly string[] = [
  "Make /ai the unquestioned main CodexForge workspace.",
  "Treat /clawd as the explicit operator control surface instead of exposing raw JSON routes.",
  "Replace remaining legacy wording and old test-harness framing.",
  "Turn /history into real workspace history for plans, runs, diffs, memory, and events.",
  "Keep backend usage optional with stable local fallback behavior.",
] as const;

const PRODUCT_AREAS: readonly string[] = [
  "Planning",
  "Memory",
  "Execution",
  "Research",
  "Repo tooling",
  "Workflows",
  "Operator approvals",
  "Local fallback",
] as const;

const SURFACE_MAP: readonly SurfaceCard[] = [
  {
    title: "AI workspace",
    path: "/ai",
    summary:
      "Main working surface for conversation, planning, memory, structured replies, and local-first execution state.",
    status: "Primary",
  },
  {
    title: "Operator",
    path: "/clawd",
    summary:
      "Explicit operator UI for snapshot, plan approval, diff approval, apply, test, and checkpoint workflows.",
    status: "Execution",
  },
  {
    title: "Brain graph",
    path: "/brain",
    summary:
      "Inspector for local graph memory, connected context, saved nodes, and relationships across the workspace.",
    status: "Memory",
  },
  {
    title: "Activity",
    path: "/history",
    summary:
      "Workspace history for launches, notes, task flow, and evolving project activity rather than raw legacy screens.",
    status: "History",
  },
] as const;

function getQuickLinkStyle(variant: ActionVariant): CSSProperties {
  switch (variant) {
    case "primary":
      return quickLinkPrimary;
    case "secondary":
      return quickLinkSecondary;
    default:
      return quickLinkGhost;
  }
}

function SectionHeader(props: { label: string; hint: string }) {
  return (
    <div style={sectionHeader}>
      <div style={sectionLabel}>{props.label}</div>
      <div style={sectionHint}>{props.hint}</div>
    </div>
  );
}

function StatusMetric(props: StatusItem) {
  return (
    <div style={statusCard}>
      <div style={statusCardLabel}>{props.label}</div>
      <div style={statusCardValue}>{props.value}</div>
    </div>
  );
}

function HighlightCard(props: HighlightStat) {
  return (
    <div style={highlightCard}>
      <div style={highlightLabel}>{props.label}</div>
      <div style={highlightValue}>{props.value}</div>
      <div style={highlightDetail}>{props.detail}</div>
    </div>
  );
}

function SurfaceLinkCard(props: SurfaceCard) {
  return (
    <Link href={props.path} style={surfaceCard}>
      <div style={surfaceTopRow}>
        <div style={surfacePath}>{props.path}</div>
        <div style={surfaceStatus}>{props.status}</div>
      </div>
      <div style={surfaceTitle}>{props.title}</div>
      <div style={surfaceText}>{props.summary}</div>
    </Link>
  );
}

function PillarCard(props: Pillar) {
  return (
    <div style={miniCard}>
      <div style={miniTitle}>{props.title}</div>
      <div style={miniText}>{props.text}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={page}>
      <div style={shell}>
        <header style={topBar}>
          <div style={brand}>
            <div aria-hidden="true" style={logo} />
            <div style={brandTextWrap}>
              <div style={brandTitle}>{PRODUCT_NAME}</div>
              <div style={brandSubtitle}>Local-first AI developer workspace</div>
            </div>
          </div>

          <nav aria-label="Primary navigation" style={topNav}>
            <Link href="/ai" style={linkPillPrimary}>
              Workspace
            </Link>
            <Link href="/clawd" style={linkPillGhost}>
              Operator
            </Link>
            <Link href="/history" style={linkPillGhost}>
              Activity
            </Link>
            <Link href="/brain" style={linkPillGhost}>
              Brain
            </Link>
            <Link href="/entry" style={linkPillGhost}>
              Quick launch
            </Link>
          </nav>
        </header>

        <section style={heroCard}>
          <div style={heroInner}>
            <div style={heroStatusRow}>
              <span style={badge}>
                <span aria-hidden="true" style={statusDot} />
                Local-first • backend-optional • product migration active
              </span>

              <span style={metaText}>
                real workspace • operator surface • memory graph • safe execution
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
                  <b>{PRODUCT_NAME}</b> should feel like an AI developer
                  assistant and research copilot, not a starter template. This
                  page is the front door into the real product surfaces:
                  workspace, operator, activity, graph memory, and quick launch.
                </p>

                <div style={ctaRow}>
                  <Link href="/ai" style={ctaPrimary}>
                    Open CodexForge workspace
                    <span aria-hidden="true" style={arrowIcon}>
                      →
                    </span>
                  </Link>

                  <Link href="/clawd" style={ctaSecondary}>
                    Open operator
                  </Link>

                  <Link href="/entry" style={ctaTertiary}>
                    Quick launch
                  </Link>
                </div>

                <div style={ctaSupportText}>
                  Start in the workspace for planning and conversation. Use the
                  operator for approval-driven execution. Use history and brain
                  to inspect continuity and state.
                </div>
              </div>

              <aside style={statusPanel}>
                <div style={statusPanelTitle}>Current product posture</div>

                <div style={statusGrid}>
                  {CURRENT_STATUS.map((item) => (
                    <StatusMetric key={item.label} {...item} />
                  ))}
                </div>

                <div style={statusNote}>
                  Treat <code style={code}>/ai</code> as the main product
                  surface. Use <code style={code}> /clawd</code> for the
                  operator loop, <code style={code}> /brain</code> for graph
                  memory inspection, and <code style={code}> /history</code> for
                  activity review. <code style={code}> /entry</code> is a fast
                  launch surface, not the product identity.
                </div>
              </aside>
            </div>

            <div style={highlightGrid}>
              {HIGHLIGHT_STATS.map((item) => (
                <HighlightCard key={item.label} {...item} />
              ))}
            </div>

            <SectionHeader
              label="Start here"
              hint="Fast routes into the real product surfaces"
            />

            <div style={quickLinksGrid}>
              {PRIMARY_ACTIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={getQuickLinkStyle(item.variant)}
                >
                  <div style={quickLinkTitleRow}>
                    <div style={quickLinkTitle}>{item.label}</div>
                    <div style={quickLinkArrow} aria-hidden="true">
                      →
                    </div>
                  </div>
                  <div style={quickLinkText}>{item.description}</div>
                </Link>
              ))}
            </div>

            <SectionHeader
              label="Product surfaces"
              hint="Each page should have a clear job inside one coherent system"
            />

            <div style={surfaceGrid}>
              {SURFACE_MAP.map((item) => (
                <SurfaceLinkCard key={item.path} {...item} />
              ))}
            </div>

            <SectionHeader
              label="Why this product exists"
              hint="The workspace should stay grounded, useful, and execution-safe"
            />

            <div style={whyCard}>
              <div style={whyTitle}>A serious local-first working environment</div>
              <div style={whyText}>
                CodexForge is moving toward a real operating surface for
                developer work: planning, approvals, memory, research, and
                execution. The product should stay useful even when remote
                systems fail, keep humans in control of change, and make state
                visible across the whole app.
              </div>
            </div>

            <SectionHeader
              label="Core product pillars"
              hint="The product should grow without becoming vague or unsafe"
            />

            <div style={featureGrid}>
              {PRODUCT_PILLARS.map((item) => (
                <PillarCard key={item.title} {...item} />
              ))}
            </div>

            <SectionHeader
              label="Target capabilities"
              hint="The workspace should expand while preserving clarity"
            />

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
                  route clearly to workspace, operator, history, brain, and
                  quick launch, and keep implementation routes behind the UI.
                </div>
              </div>

              <div style={tipCard}>
                <div style={tipTitle}>Design rule</div>
                <div style={tipText}>
                  Product surfaces should link to product surfaces. Navigation
                  should make the whole app feel like one system, not a set of
                  disconnected tools.
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
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
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
  flexWrap: "wrap",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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

const highlightGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
};

const highlightCard: CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 6,
};

const highlightLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  opacity: 0.68,
};

const highlightValue: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
};

const highlightDetail: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.78,
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

const ctaSupportText: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.76,
};

const arrowIcon: CSSProperties = {
  opacity: 0.82,
  lineHeight: 1,
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

const sectionHeader: CSSProperties = {
  display: "grid",
  gap: 4,
};

const sectionLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 1,
  opacity: 0.72,
};

const sectionHint: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  opacity: 0.72,
};

const quickLinksGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const quickLinkBase: CSSProperties = {
  display: "grid",
  gap: 10,
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

const quickLinkTitleRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
};

const quickLinkTitle: CSSProperties = {
  fontWeight: 900,
  fontSize: 15,
};

const quickLinkArrow: CSSProperties = {
  fontSize: 16,
  opacity: 0.72,
};

const quickLinkText: CSSProperties = {
  fontSize: 13,
  opacity: 0.82,
  lineHeight: 1.5,
};

const surfaceGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const surfaceCard: CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 14,
  borderRadius: 16,
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
};

const surfaceTopRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
};

const surfacePath: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  opacity: 0.72,
};

const surfaceStatus: CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 11,
  fontWeight: 800,
  opacity: 0.86,
};

const surfaceTitle: CSSProperties = {
  fontWeight: 900,
  fontSize: 15,
};

const surfaceText: CSSProperties = {
  fontSize: 13,
  opacity: 0.84,
  lineHeight: 1.55,
};

const whyCard: CSSProperties = {
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(99,102,241,0.18)",
  background:
    "linear-gradient(180deg, rgba(99,102,241,0.10), rgba(255,255,255,0.03))",
  display: "grid",
  gap: 8,
};

const whyTitle: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
};

const whyText: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  opacity: 0.9,
  maxWidth: 900,
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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