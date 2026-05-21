"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type {
  OperatorHomeNextAction,
  OperatorHomeSessionSummary,
  OperatorHomeSurface,
} from "../operator-home-types";

type OperatorHomeHeroProps = {
  surface: OperatorHomeSurface;
  sessionSummary: OperatorHomeSessionSummary;
  nextAction: OperatorHomeNextAction;
  copiedLabel: string | null;
};

export function OperatorHomeHero({
  surface,
  sessionSummary,
  nextAction,
  copiedLabel,
}: OperatorHomeHeroProps) {
  return (
    <section
      style={hero}
      data-codexforge-operator-home-hero="OperatorHomeHero renders local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority"
    >
      <div style={copy}>
        <span style={eyebrow}>CodexForge Phase 40</span>
        <h1 style={headline}>{surface.identity} Operator Home Dashboard</h1>
        <p style={lede}>{surface.subtitle}</p>
        <p style={posture}>{surface.posture}</p>
        <div style={actionRow}>
          <Link href="/start" style={primaryLink}>
            Start here
          </Link>
          <Link href={nextAction.href} style={primaryLink}>
            {nextAction.title}
          </Link>
          <Link href="/ai" style={secondaryLink}>
            AI Workspace
          </Link>
          <Link href="/stabilization" style={secondaryLink}>
            Stabilization
          </Link>
          <span style={copyPill}>{copiedLabel ? `${copiedLabel} copied` : "copy-only handoffs"}</span>
        </div>
      </div>
      <div style={stats}>
        <HeroStat label="Routes" value={String(sessionSummary.routeCount)} />
        <HeroStat label="Ready" value={String(sessionSummary.readyCount)} />
        <HeroStat label="Warnings" value={String(sessionSummary.warningCount)} />
        <HeroStat label="Blocked" value={String(sessionSummary.blockedCount)} />
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
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

const hero: CSSProperties = {
  alignItems: "center",
  border: "1px solid rgba(45,212,191,0.22)",
  background:
    "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.82))",
  borderRadius: 8,
  display: "grid",
  gap: 18,
  gridTemplateColumns: "minmax(0, 1fr)",
  minWidth: 0,
  padding: 22,
  width: "100%",
};

const copy: CSSProperties = {
  display: "grid",
  gap: 11,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#5eead4",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  ...safeText,
};

const headline: CSSProperties = {
  fontSize: 44,
  letterSpacing: 0,
  lineHeight: 1.04,
  margin: 0,
  maxWidth: 980,
  ...displayText,
};

const lede: CSSProperties = {
  color: "#dbeafe",
  fontSize: 15,
  lineHeight: 1.58,
  margin: 0,
  maxWidth: 960,
  ...safeText,
};

const posture: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  maxWidth: 940,
  ...safeText,
};

const actionRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};

const linkBase: CSSProperties = {
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 900,
  padding: "10px 12px",
  textDecoration: "none",
  ...safeText,
};

const primaryLink: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(45,212,191,0.36)",
  background: "linear-gradient(135deg, rgba(20,184,166,0.9), rgba(14,165,233,0.82))",
  color: "#021014",
};

const secondaryLink: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(14,165,233,0.1)",
  color: "#e0f2fe",
};

const copyPill: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.62)",
  color: "#cbd5e1",
};

const stats: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  minWidth: 0,
};

const stat: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.48)",
  borderRadius: 8,
  display: "grid",
  gap: 5,
  minWidth: 0,
  padding: 14,
};

const statLabel: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 850,
  textTransform: "uppercase",
  ...safeText,
};

const statValue: CSSProperties = {
  color: "#ccfbf1",
  fontSize: 28,
  lineHeight: 1,
  ...safeText,
};
