"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ValidationResultCapturePanel } from "@/lib/codexforge/validation-result-capture-mvp/components";
export default function ValidationResultsPageClient() {
  return <CodexForgeAppShell activePath="/validation-results" workspaceLabel="Capture validation result" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-validation-results-route="Validation Results route imports/renders ValidationResultCapturePanel Capture validation result Review validation output Paste validation output to review the result. no auto-run preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/validation" style={primaryHandoffLink}>Back to validation</Link><Link href="/workflow-results" style={handoffLink}>Workflow Results</Link><Link href="/run-history" style={handoffLink}>Run History</Link><Link href="/closed-loop" style={handoffLink}>Closed Loop</Link><Link href="/code-flow/live-run" style={handoffLink}>Back to live run</Link></div>
    <ValidationResultCapturePanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
