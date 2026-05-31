"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ValidationResultCapturePanel } from "@/lib/codexforge/validation-result-capture-mvp/components";
export default function ValidationResultsPageClient() {
  return <CodexForgeAppShell activePath="/validation-results" workspaceLabel="Capture validation result" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-validation-results-route="Validation Results route imports/renders ValidationResultCapturePanel Capture validation result Review validation output Paste validation output to review it copy commands only recovery playbook /runbook passed / failed / unknown failures route to /closed-loop pass routes to /workflow-results and /run-history no fake pass Validation Capture Hardening /validation-results/hardening no auto-run preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/workflow-results" style={primaryHandoffLink}>Next: review result</Link><Link href="/runbook" style={handoffLink}>Recovery playbook</Link><Link href="/validation-results/hardening" style={handoffLink}>Capture guide</Link><Link href="/closed-loop" style={handoffLink}>Failed: closed loop</Link><Link href="/run-history" style={handoffLink}>Run history</Link></div>
    <ValidationResultCapturePanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
