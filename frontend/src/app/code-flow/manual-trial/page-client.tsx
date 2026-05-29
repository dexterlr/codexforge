"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CodingFlowLiveManualTrialPanel } from "@/lib/codexforge/coding-flow-live-manual-trial/components";

export default function CodeFlowManualTrialPageClient() {
  return <CodexForgeAppShell activePath="/code-flow/manual-trial" workspaceLabel="Run a manual coding trial" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-manual-trial-route="Coding Flow Live Manual Trial route imports/renders CodingFlowLiveManualTrialPanel Run a manual coding trial Start guided manual trial no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/code-flow/live-run" style={primaryHandoffLink}>Back to live run</Link><Link href="/code-flow/friction-fixes" style={handoffLink}>Friction fixes</Link><Link href="/release-smoke" style={handoffLink}>Release smoke pack</Link><Link href="/run-history" style={handoffLink}>Run history</Link></div>
    <CodingFlowLiveManualTrialPanel />
  </CodexForgeAppShell>;
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
