"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CodingFlowLiveRunPanel } from "@/lib/codexforge/coding-flow-live-run-mvp/components";
export default function CodeFlowLiveRunPageClient() {
  return <CodexForgeAppShell activePath="/code-flow/live-run" workspaceLabel="Run the coding flow" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-live-run-route="Coding Flow Live Run route imports/renders CodingFlowLiveRunPanel Run the coding flow Follow one safe path from file to validation result. Real Manual MVP Trial /code-flow/real-trial Real Trial Friction Patch /code-flow/real-trial-fixes no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow} data-codexforge-live-run-primary-action="one primary action marker"><Link href="/files" style={primaryHandoffLink}>Next: pick a file</Link><details style={secondaryHandoffs}><summary style={secondarySummary}>Related steps</summary><div style={secondaryLinkStack}><Link href="/code-flow/real-trial" style={handoffLink}>Run real trial</Link><Link href="/guarded-apply-mvp" style={handoffLink}>Review apply</Link><Link href="/validation-results" style={handoffLink}>Validate</Link></div></details></div>
    <CodingFlowLiveRunPanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10, alignItems: "flex-start" };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
const secondaryHandoffs: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, color: "#cbd5e1", padding: "7px 9px" };
const secondarySummary: CSSProperties = { cursor: "pointer", fontSize: 12, fontWeight: 900, lineHeight: 1.2 };
const secondaryLinkStack: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 };
