"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { TrialFrictionFixPassPanel } from "@/lib/codexforge/trial-friction-fix-pass/components";

export default function CodeFlowFrictionFixesPageClient() {
  return <CodexForgeAppShell activePath="/code-flow/friction-fixes" workspaceLabel="Fix trial friction" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-friction-fixes-route="Trial Friction Fix Pass route imports/renders TrialFrictionFixPassPanel Fix trial friction Copy friction fix plan no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/code-flow/manual-trial" style={primaryHandoffLink}>Back to manual trial</Link><Link href="/code-flow/live-run" style={handoffLink}>Live run</Link><Link href="/validation-results" style={handoffLink}>Validation results</Link><Link href="/run-history" style={handoffLink}>Run history</Link></div>
    <TrialFrictionFixPassPanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
