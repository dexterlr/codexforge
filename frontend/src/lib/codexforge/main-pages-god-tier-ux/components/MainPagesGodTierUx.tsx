"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  GUARDED_VIDEO_PIPELINE_STEPS,
  MAIN_PAGES_DEFAULT_METRICS,
  MAIN_PAGES_GOD_TIER_UX_MARKERS,
  MAIN_PAGES_REVIEW_ONLY_BOUNDARIES,
} from "../main-pages-god-tier-ux-data";
import type {
  MainPagesGodTierUxLink,
  MainPagesGodTierUxMetric,
  MainPagesGodTierUxPanelProps,
  MainPagesGodTierUxPipelineStep,
  MainPagesGodTierUxState,
  MainPagesGodTierUxTone,
} from "../main-pages-god-tier-ux-types";

const markerText = MAIN_PAGES_GOD_TIER_UX_MARKERS.join(" | ");

export function MainPagesGodTierUxBoundaryMarker({
  label = "Main Pages God Tier UX Upgrade",
}: {
  label?: string;
}) {
  return (
    <span
      hidden
      data-codexforge-main-pages-god-tier-ux={markerText}
      data-codexforge-main-pages-god-tier-ux-label={label}
    />
  );
}

export function MainPagesGodTierUxHero({
  eyebrow,
  title,
  summary,
  actions,
  metrics = MAIN_PAGES_DEFAULT_METRICS,
  tone = "home",
  statusLabel = "review-only UX upgrade",
}: {
  eyebrow: string;
  title: string;
  summary: string;
  actions: readonly MainPagesGodTierUxLink[];
  metrics?: readonly MainPagesGodTierUxMetric[];
  tone?: MainPagesGodTierUxTone;
  statusLabel?: string;
}) {
  return (
    <section
      style={{ ...heroShell, ...toneSurface(tone) }}
      data-codexforge-main-pages-hero={markerText}
      aria-label={title}
    >
      <MainPagesGodTierUxBoundaryMarker label={title} />
      <div style={heroCopy}>
        <span style={eyebrowStyle}>{eyebrow}</span>
        <h1 style={heroTitle}>{title}</h1>
        <p style={heroSummary}>{summary}</p>
        <div style={actionRow} aria-label="Primary workflow routes">
          {actions.map((action, index) => (
            <Link
              key={`${action.href}-${action.label}`}
              href={action.href}
              style={index === 0 ? primaryLink : secondaryLink}
            >
              <span style={actionLabel}>{action.label}</span>
              <span style={actionDetail}>{action.detail}</span>
            </Link>
          ))}
        </div>
      </div>
      <aside style={heroPanel} aria-label="Operator status summary">
        <span style={statusPill}>{statusLabel}</span>
        <div style={metricGrid}>
          {metrics.map((metric) => (
            <MetricTile key={`${metric.label}-${metric.value}`} metric={metric} />
          ))}
        </div>
      </aside>
    </section>
  );
}

export function MainPagesGodTierUxStatusRail({
  title = "Execution boundaries",
  metrics = MAIN_PAGES_DEFAULT_METRICS,
  tone = "workflow",
}: {
  title?: string;
  metrics?: readonly MainPagesGodTierUxMetric[];
  tone?: MainPagesGodTierUxTone;
}) {
  return (
    <section
      style={{ ...railShell, ...toneSurface(tone) }}
      data-codexforge-main-pages-status-rail={markerText}
      aria-label={title}
    >
      <MainPagesGodTierUxBoundaryMarker label={title} />
      <div style={railIntro}>
        <span style={eyebrowStyle}>premium command center</span>
        <h2 style={sectionTitle}>{title}</h2>
      </div>
      <div style={railGrid}>
        {metrics.map((metric) => (
          <MetricTile key={`${metric.label}-${metric.value}`} metric={metric} compact />
        ))}
      </div>
    </section>
  );
}

export function MainPagesGodTierUxHandoffRail({
  eyebrow,
  title,
  summary,
  links,
  tone = "workflow",
}: MainPagesGodTierUxPanelProps & {
  links: readonly MainPagesGodTierUxLink[];
}) {
  return (
    <section
      style={{ ...handoffShell, ...toneSurface(tone) }}
      data-codexforge-main-pages-handoff-rail={markerText}
      aria-label={title}
    >
      <MainPagesGodTierUxBoundaryMarker label={title} />
      <div style={handoffCopy}>
        <span style={eyebrowStyle}>{eyebrow}</span>
        <h2 style={sectionTitle}>{title}</h2>
        <p style={panelCopy}>{summary}</p>
      </div>
      <div style={handoffLinks}>
        {links.map((link) => (
          <Link key={`${link.href}-${link.label}`} href={link.href} style={compactLink}>
            <span style={actionLabel}>{link.label}</span>
            <span style={actionDetail}>{link.detail}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function GuardedVideoPipelineRail({
  title = "Guarded video pipeline",
  steps = GUARDED_VIDEO_PIPELINE_STEPS,
  compact = false,
}: {
  title?: string;
  steps?: readonly MainPagesGodTierUxPipelineStep[];
  compact?: boolean;
}) {
  return (
    <section
      style={compact ? compactPipelineShell : pipelineShell}
      data-codexforge-guarded-video-pipeline={markerText}
      aria-label={title}
    >
      <MainPagesGodTierUxBoundaryMarker label={title} />
      <div style={pipelineHeader}>
        <span style={eyebrowStyle}>guarded video pipeline</span>
        <h2 style={sectionTitle}>{title}</h2>
        <p style={panelCopy}>
          Provider gateway to controlled video dry run remains review-only. Artifact export, publish gateway, queue
          dispatch, worker orchestration, render execution, and downloads are not live from this UI layer.
        </p>
      </div>
      <div style={pipelineGrid}>
        {steps.map((step, index) => (
          <article key={step.id} style={pipelineStep}>
            <span style={stepIndex}>{String(index + 1).padStart(2, "0")}</span>
            <div style={stepTrack} />
            <h3 style={stepTitle}>{step.label}</h3>
            <p style={stepDetail}>{step.detail}</p>
            <span style={stateBadge(step.state)}>{formatState(step.state)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MainPagesGodTierUxReviewBoundaryPanel({
  title = "Review-only execution boundary",
}: {
  title?: string;
}) {
  return (
    <section
      style={boundaryShell}
      data-codexforge-main-pages-review-boundary={markerText}
      aria-label={title}
    >
      <MainPagesGodTierUxBoundaryMarker label={title} />
      <span style={eyebrowStyle}>review-only UX upgrade</span>
      <h2 style={sectionTitle}>{title}</h2>
      <div style={boundaryGrid}>
        {MAIN_PAGES_REVIEW_ONLY_BOUNDARIES.map((boundary) => (
          <span key={boundary} style={boundaryPill}>
            {boundary}
          </span>
        ))}
      </div>
    </section>
  );
}

function MetricTile({
  metric,
  compact = false,
}: {
  metric: MainPagesGodTierUxMetric;
  compact?: boolean;
}) {
  return (
    <article style={compact ? compactMetric : metricTile}>
      <span style={metricLabel}>{metric.label}</span>
      <strong style={metricValue}>{metric.value}</strong>
      <span style={metricDetail}>{metric.detail}</span>
      <span style={stateBadge(metric.state)}>{formatState(metric.state)}</span>
    </article>
  );
}

function formatState(state: MainPagesGodTierUxState): string {
  if (state === "ready") return "Ready";
  if (state === "review") return "Review";
  if (state === "planned") return "Planned";
  return "Blocked";
}

function stateBadge(state: MainPagesGodTierUxState): CSSProperties {
  return {
    ...badgeBase,
    ...(state === "ready"
      ? readyBadge
      : state === "review"
        ? reviewBadge
        : state === "planned"
          ? plannedBadge
          : blockedBadge),
  };
}

function toneSurface(tone: MainPagesGodTierUxTone): CSSProperties {
  if (tone === "provider") return providerSurface;
  if (tone === "video") return videoSurface;
  if (tone === "review") return reviewSurface;
  if (tone === "cockpit") return cockpitSurface;
  if (tone === "workflow") return workflowSurface;
  return homeSurface;
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const displayText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "normal",
  wordBreak: "normal",
};

const homeSurface: CSSProperties = {
  borderColor: "rgba(45,212,191,0.24)",
  background:
    "linear-gradient(135deg, rgba(3,7,18,0.96), rgba(15,23,42,0.86) 42%, rgba(49,46,129,0.42))",
};

const workflowSurface: CSSProperties = {
  borderColor: "rgba(125,211,252,0.2)",
  background:
    "linear-gradient(135deg, rgba(8,13,28,0.94), rgba(15,23,42,0.74) 52%, rgba(30,64,175,0.22))",
};

const providerSurface: CSSProperties = {
  borderColor: "rgba(94,234,212,0.24)",
  background:
    "linear-gradient(135deg, rgba(6,78,59,0.34), rgba(15,23,42,0.78) 48%, rgba(67,56,202,0.24))",
};

const videoSurface: CSSProperties = {
  borderColor: "rgba(251,191,36,0.24)",
  background:
    "linear-gradient(135deg, rgba(69,26,3,0.32), rgba(15,23,42,0.78) 48%, rgba(30,64,175,0.24))",
};

const reviewSurface: CSSProperties = {
  borderColor: "rgba(216,180,254,0.24)",
  background:
    "linear-gradient(135deg, rgba(88,28,135,0.24), rgba(15,23,42,0.78) 52%, rgba(4,47,46,0.26))",
};

const cockpitSurface: CSSProperties = {
  borderColor: "rgba(34,211,238,0.28)",
  background:
    "linear-gradient(135deg, rgba(8,47,73,0.34), rgba(15,23,42,0.84) 48%, rgba(88,28,135,0.24))",
};

const heroShell: CSSProperties = {
  alignItems: "stretch",
  border: "1px solid",
  borderRadius: 8,
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  minWidth: 0,
  overflow: "hidden",
  padding: 22,
  width: "100%",
  ...safeText,
};

const heroCopy: CSSProperties = {
  alignContent: "center",
  display: "grid",
  gap: 13,
  minWidth: 0,
};

const eyebrowStyle: CSSProperties = {
  color: "#5eead4",
  fontSize: 11,
  fontWeight: 950,
  lineHeight: 1.2,
  textTransform: "uppercase",
  ...safeText,
};

const heroTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 40,
  letterSpacing: 0,
  lineHeight: 1.02,
  margin: 0,
  maxWidth: 960,
  ...displayText,
};

const heroSummary: CSSProperties = {
  color: "#dbeafe",
  fontSize: 15,
  lineHeight: 1.58,
  margin: 0,
  maxWidth: 940,
  ...safeText,
};

const actionRow: CSSProperties = {
  display: "grid",
  gap: 9,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 158px), 1fr))",
  maxWidth: 840,
  minWidth: 0,
};

const linkBase: CSSProperties = {
  borderRadius: 8,
  display: "grid",
  gap: 4,
  minHeight: 74,
  minWidth: 0,
  padding: "11px 12px",
  textDecoration: "none",
  ...safeText,
};

const primaryLink: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(94,234,212,0.48)",
  background: "linear-gradient(135deg, rgba(94,234,212,0.96), rgba(56,189,248,0.86))",
  color: "#021014",
};

const secondaryLink: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(125,211,252,0.2)",
  background: "rgba(15,23,42,0.54)",
  color: "#e0f2fe",
};

const compactLink: CSSProperties = {
  ...secondaryLink,
  minHeight: 66,
};

const actionLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 950,
  lineHeight: 1.15,
  ...safeText,
};

const actionDetail: CSSProperties = {
  fontSize: 11,
  fontWeight: 760,
  lineHeight: 1.35,
  opacity: 0.78,
  ...safeText,
};

const heroPanel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.36)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 14,
};

const statusPill: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.28)",
  background: "rgba(20,184,166,0.12)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 950,
  lineHeight: 1.25,
  padding: "7px 9px",
  width: "fit-content",
  ...safeText,
};

const metricGrid: CSSProperties = {
  display: "grid",
  gap: 9,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))",
  minWidth: 0,
};

const metricTile: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.15)",
  background: "rgba(15,23,42,0.58)",
  borderRadius: 8,
  display: "grid",
  gap: 5,
  minWidth: 0,
  padding: 12,
  ...safeText,
};

const compactMetric: CSSProperties = {
  ...metricTile,
  padding: 10,
};

const metricLabel: CSSProperties = {
  color: "#94a3b8",
  fontSize: 10,
  fontWeight: 900,
  lineHeight: 1.2,
  textTransform: "uppercase",
  ...safeText,
};

const metricValue: CSSProperties = {
  color: "#f8fafc",
  fontSize: 18,
  lineHeight: 1.1,
  ...safeText,
};

const metricDetail: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 11,
  lineHeight: 1.35,
  ...safeText,
};

const badgeBase: CSSProperties = {
  border: "1px solid",
  borderRadius: 8,
  fontSize: 10,
  fontWeight: 950,
  lineHeight: 1.2,
  padding: "4px 6px",
  width: "fit-content",
  ...safeText,
};

const readyBadge: CSSProperties = {
  borderColor: "rgba(74,222,128,0.35)",
  background: "rgba(20,83,45,0.24)",
  color: "#dcfce7",
};

const reviewBadge: CSSProperties = {
  borderColor: "rgba(125,211,252,0.28)",
  background: "rgba(14,165,233,0.12)",
  color: "#e0f2fe",
};

const plannedBadge: CSSProperties = {
  borderColor: "rgba(251,191,36,0.32)",
  background: "rgba(69,26,3,0.18)",
  color: "#fef3c7",
};

const blockedBadge: CSSProperties = {
  borderColor: "rgba(251,113,133,0.34)",
  background: "rgba(127,29,29,0.18)",
  color: "#ffe4e6",
};

const railShell: CSSProperties = {
  alignItems: "center",
  border: "1px solid",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  minWidth: 0,
  padding: 14,
  ...safeText,
};

const railIntro: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const railGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  minWidth: 0,
};

const handoffShell: CSSProperties = {
  border: "1px solid",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  minWidth: 0,
  padding: 14,
  ...safeText,
};

const handoffCopy: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const handoffLinks: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
  minWidth: 0,
};

const sectionTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 20,
  lineHeight: 1.2,
  margin: 0,
  ...displayText,
};

const panelCopy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  ...safeText,
};

const pipelineShell: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.24)",
  background:
    "linear-gradient(135deg, rgba(69,26,3,0.22), rgba(15,23,42,0.84) 52%, rgba(8,47,73,0.24))",
  borderRadius: 8,
  display: "grid",
  gap: 14,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const compactPipelineShell: CSSProperties = {
  ...pipelineShell,
  padding: 14,
};

const pipelineHeader: CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const pipelineGrid: CSSProperties = {
  display: "grid",
  gap: 9,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  minWidth: 0,
};

const pipelineStep: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.36)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minHeight: 132,
  minWidth: 0,
  padding: 11,
  ...safeText,
};

const stepIndex: CSSProperties = {
  color: "#fde68a",
  fontSize: 11,
  fontWeight: 950,
};

const stepTrack: CSSProperties = {
  background: "linear-gradient(90deg, rgba(251,191,36,0.8), rgba(45,212,191,0.16))",
  borderRadius: 8,
  height: 2,
  minWidth: 0,
};

const stepTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 14,
  lineHeight: 1.2,
  margin: 0,
  ...safeText,
};

const stepDetail: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 11,
  lineHeight: 1.35,
  margin: 0,
  ...safeText,
};

const boundaryShell: CSSProperties = {
  border: "1px solid rgba(251,113,133,0.22)",
  background: "linear-gradient(135deg, rgba(127,29,29,0.12), rgba(15,23,42,0.78))",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 14,
  ...safeText,
};

const boundaryGrid: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
  minWidth: 0,
};

const boundaryPill: CSSProperties = {
  border: "1px solid rgba(251,113,133,0.18)",
  background: "rgba(2,6,23,0.28)",
  borderRadius: 8,
  color: "#ffe4e6",
  fontSize: 11,
  fontWeight: 850,
  lineHeight: 1.25,
  padding: "6px 8px",
  ...safeText,
};
