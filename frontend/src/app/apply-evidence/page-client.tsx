"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ApplyEvidenceCapturePanel } from "@/lib/codexforge/apply-evidence-capture-mvp/components";
export default function ApplyEvidencePageClient() {
  return <CodexForgeAppShell activePath="/apply-evidence" workspaceLabel="Capture apply evidence" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-apply-evidence-route="Apply Evidence route imports/renders ApplyEvidenceCapturePanel Capture apply evidence Copy evidence pack no auto-apply no auto-run preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/guarded-apply-mvp" style={primaryHandoffLink}>Back to guarded apply MVP</Link><Link href="/validation-results" style={handoffLink}>Capture validation result</Link><Link href="/code-flow/live-run" style={handoffLink}>Back to live run</Link></div>
    <ApplyEvidenceCapturePanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
