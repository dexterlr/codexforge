import type { CSSProperties } from "react";
import Link from "next/link";
import {
  CODEXFORGE_ROUTES,
  CodexForgeGlobalNav,
} from "@/lib/codexforge/navigation";

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
    label: "Workspace",
    description:
      "Plan, chat, route context, and coordinate local-first AI engineering work.",
    variant: "primary",
  },
  {
    href: "/brain",
    label: "Brain",
    description:
      "Inspect graph memory, connected project context, relationships, and saved workspace state.",
    variant: "secondary",
  },
  {
    href: "/files",
    label: "Files",
    description:
      "Review file context, safe patch previews, and approval-first file workflow handoffs.",
    variant: "secondary",
  },
  {
    href: "/runs",
    label: "Runs",
    description:
      "Track operator run queues, approvals, safety gates, and execution state.",
    variant: "secondary",
  },
  {
    href: "/capabilities",
    label: "Capabilities",
    description:
      "Open the capability cockpit for tool readiness, routing, and production workflows.",
    variant: "ghost",
  },
  {
    href: "/creative",
    label: "Creative",
    description:
      "Plan creative production, previews, artifacts, and approval-safe render handoffs.",
    variant: "ghost",
  },
  {
    href: "/history",
    label: "History",
    description:
      "Review activity intelligence, launches, notes, and evolving workspace history.",
    variant: "ghost",
  },
  {
    href: "/clawd",
    label: "Operator",
    description:
      "Use the approval-driven operator surface for snapshot, plan, diff, apply, test, and checkpoint flows.",
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
    title: "Local-first workspace",
    text:
      "Keep planning, chat, context, files, and execution visible even when remote providers are unavailable.",
  },
  {
    title: "Memory and continuity",
    text:
      "Preserve useful graph memory, activity, project facts, decisions, and reusable context across surfaces.",
  },
  {
    title: "Preview-first file work",
    text:
      "Route file changes through context review, safe patch previews, and approval-aware workflows.",
  },
  {
    title: "Operator-safe runs",
    text:
      "Move through plans, run queues, approvals, diffs, tests, and checkpoints without blind mutation.",
  },
  {
    title: "Capability cockpit",
    text:
      "Expose tool readiness, routing, production capability, and safety boundaries from one control layer.",
  },
  {
    title: "Creative planning",
    text:
      "Support storyboards, render plans, artifact previews, and creative handoffs without leaving CodexForge.",
  },
] as const;

const CURRENT_STATUS: readonly StatusItem[] = [
  {
    label: "Primary surface",
    value: "/ai",
  },
  {
    label: "Memory and files",
    value: "/brain + /files",
  },
  {
    label: "Runs and operator",
    value: "/runs + /clawd",
  },
  {
    label: "Production surfaces",
    value: "/capabilities + /creative",
  },
] as const;

const HIGHLIGHT_STATS: readonly HighlightStat[] = [
  {
    label: "AI Workspace",
    value: "/ai",
    detail: "Main surface for planning, chat, and local-first engineering.",
  },
  {
    label: "Files Command Center",
    value: "/files",
    detail: "File context, previews, and safe patch workflow.",
  },
  {
    label: "Operator Run Center",
    value: "/runs",
    detail: "Run queues, approvals, execution gates, and operator state.",
  },
  {
    label: "Creative Studio",
    value: "/creative",
    detail: "Creative production planning with preview-safe handoffs.",
  },
] as const;

const ROADMAP: readonly string[] = [
  "Keep all major product surfaces reachable from Home and obvious entry points.",
  "Make /ai, /brain, /files, /runs, /capabilities, and /creative feel like one operating system.",
  "Keep preview and approval boundaries clear before file or operator execution.",
  "Turn /history into activity intelligence for plans, runs, diffs, memory, and events.",
  "Preserve stable local-first fallback behavior across the workspace.",
] as const;

const PRODUCT_AREAS: readonly string[] = [
  "Planning",
  "Memory",
  "Files",
  "Runs",
  "Execution",
  "Capabilities",
  "Creative",
  "Operator approvals",
  "Local fallback",
] as const;

const SURFACE_MAP: readonly SurfaceCard[] = [
  {
    title: "AI Workspace",
    path: "/ai",
    summary:
      "Main working surface for chat, planning, structured replies, memory routing, and local-first engineering state.",
    status: "Primary",
  },
  {
    title: "Brain Command Center",
    path: "/brain",
    summary:
      "Graph memory inspector for connected context, saved nodes, relationships, and workspace continuity.",
    status: "Memory",
  },
  {
    title: "Files Command Center / Safe Patch Preview",
    path: "/files",
    summary:
      "File context surface for safe patch preview, file workflow, and approval-first handoffs.",
    status: "Files",
  },
  {
    title: "Operator Run Center",
    path: "/runs",
    summary:
      "Run queue and execution status surface for operator-safe approvals, gates, and runtime visibility.",
    status: "Runs",
  },
  {
    title: "Capability Cockpit",
    path: "/capabilities",
    summary:
      "Capability routing, tool readiness, production affordances, and safety boundary visibility.",
    status: "Capabilities",
  },
  {
    title: "Creative Production Studio",
    path: "/creative",
    summary:
      "Creative planning surface for briefs, storyboards, render queues, artifacts, and patch handoffs.",
    status: "Creative",
  },
  {
    title: "History / Activity Intelligence",
    path: "/history",
    summary:
      "Workspace history for launches, notes, task flow, memory, runs, and evolving project activity.",
    status: "History",
  },
  {
    title: "Operator / Clawd",
    path: "/clawd",
    summary:
      "Explicit operator UI for snapshot, plan approval, diff approval, apply, test, and checkpoint workflows.",
    status: "Operator",
  },
  {
    title: "Quick Launch",
    path: "/entry",
    summary:
      "Fast launch surface for structured drafts that feed back into the main AI workspace.",
    status: "Launch",
  },
] as const;

const GLOBAL_ROUTE_SUMMARY = CODEXFORGE_ROUTES.map(
  (route) => `${route.shortLabel}: ${route.description}`
);

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
        <CodexForgeGlobalNav />

        <section style={heroCard}>
          <div style={heroInner}>
            <div style={heroStatusRow}>
              <span style={badge}>
                <span aria-hidden="true" style={statusDot} />
                Local-first / preview-first / operator-safe
              </span>

              <span style={metaText}>
                memory + files + runs + capabilities + creative planning
              </span>
            </div>

            <div style={heroGrid}>
              <div style={heroMain}>
                <h1 style={heroTitle}>
                  CodexForge is a local-first AI engineering workspace for{" "}
                  <span style={gradientText}>
                    memory, files, runs, capabilities, and creative planning
                  </span>
                  .
                </h1>

                <p style={heroSubtitle}>
                  <b>{PRODUCT_NAME}</b> is the front door into a coherent
                  local-first operating system for engineering work. Use it to
                  plan with memory, inspect files, preview changes, coordinate
                  runs, manage capabilities, and shape creative production while
                  keeping approval and operator safety visible.
                </p>

                <div style={ctaRow}>
                  <Link href="/ai" style={ctaPrimary}>
                    Open Workspace
                    <span aria-hidden="true" style={arrowIcon}>
                      -&gt;
                    </span>
                  </Link>

                  <Link href="/files" style={ctaSecondary}>
                    Open Files
                  </Link>

                  <Link href="/runs" style={ctaTertiary}>
                    Open Runs
                  </Link>
                </div>

                <div style={ctaSupportText}>
                  Start in Workspace for planning and conversation. Use Brain,
                  Files, Runs, Capabilities, Creative, History, and Operator as
                  focused surfaces inside the same system.
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
                  surface. Use <code style={code}>/brain</code> for memory,{" "}
                  <code style={code}>/files</code> for file workflow,{" "}
                  <code style={code}>/runs</code> for run control,{" "}
                  <code style={code}>/capabilities</code> for capability
                  routing, <code style={code}>/creative</code> for production
                  planning, and <code style={code}>/clawd</code> for the
                  operator loop.
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
                      -&gt;
                    </div>
                  </div>
                  <div style={quickLinkText}>{item.description}</div>
                </Link>
              ))}
            </div>

            <SectionHeader
              label="System surfaces"
              hint={GLOBAL_ROUTE_SUMMARY.slice(0, 3).join(" / ")}
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
                CodexForge brings memory, files, runs, capabilities, creative
                planning, history, and operator controls into one local-first
                AI engineering workspace. The product should stay useful when
                remote systems fail, preview meaningful change before approval,
                and keep humans in control of execution.
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
                  route clearly to workspace, brain, files, runs, capabilities,
                  creative, history, operator, and quick launch, and keep
                  implementation routes behind the UI.
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
  padding: "clamp(12px, 3vw, 30px)",
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
  gap: 12,
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
  minWidth: 0,
};

const statusCardLabel: CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: 0,
  fontWeight: 900,
};

const statusCardValue: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  overflowWrap: "anywhere",
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
  minWidth: 0,
};

const highlightLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  opacity: 0.68,
};

const highlightValue: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  overflowWrap: "anywhere",
};

const highlightDetail: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.78,
};

const heroTitle: CSSProperties = {
  margin: 0,
  fontSize: 44,
  lineHeight: 1.03,
  letterSpacing: 0,
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

const ctaBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
  letterSpacing: 0,
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
  letterSpacing: 0,
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
  minWidth: 0,
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
  minWidth: 0,
  overflowWrap: "anywhere",
};

const quickLinkArrow: CSSProperties = {
  fontSize: 16,
  opacity: 0.72,
};

const quickLinkText: CSSProperties = {
  fontSize: 13,
  opacity: 0.82,
  lineHeight: 1.5,
  overflowWrap: "anywhere",
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
  minWidth: 0,
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
  letterSpacing: 0,
  textTransform: "uppercase",
  opacity: 0.72,
  overflowWrap: "anywhere",
};

const surfaceStatus: CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 11,
  fontWeight: 800,
  opacity: 0.86,
  whiteSpace: "nowrap",
};

const surfaceTitle: CSSProperties = {
  fontWeight: 900,
  fontSize: 15,
  overflowWrap: "anywhere",
};

const surfaceText: CSSProperties = {
  fontSize: 13,
  opacity: 0.84,
  lineHeight: 1.55,
  overflowWrap: "anywhere",
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
