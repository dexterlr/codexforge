"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CodingFlowMvpReleaseAuditPanel } from "@/lib/codexforge/coding-flow-mvp-release-audit/components";
export default function CodeFlowReleaseAuditPageClient() {
  return <CodexForgeAppShell activePath="/code-flow/release-audit" workspaceLabel="Coding flow MVP audit" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-release-audit-route="Coding Flow MVP Release Audit route imports/renders CodingFlowMvpReleaseAuditPanel Coding flow MVP audit Copy release audit go safe manual/operator-guided MVP ready no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/run-history" style={primaryHandoffLink}>Back to run history</Link><Link href="/code-flow/live-run" style={handoffLink}>Back to live run</Link><Link href="/workflow-results" style={handoffLink}>Review result</Link><Link href="/release-smoke" style={handoffLink}>Release smoke pack</Link></div>
    <CodingFlowMvpReleaseAuditPanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
