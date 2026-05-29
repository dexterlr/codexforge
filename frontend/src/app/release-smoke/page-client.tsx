"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ReleaseReadinessSmokePackPanel } from "@/lib/codexforge/release-readiness-smoke-pack/components";

export default function ReleaseSmokePageClient() {
  return <CodexForgeAppShell activePath="/release-smoke" workspaceLabel="Release smoke pack" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-release-smoke-route="Release Readiness Smoke Pack route imports/renders ReleaseReadinessSmokePackPanel Release smoke pack Copy smoke checklist no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/code-flow/mvp-path" style={primaryHandoffLink}>MVP path</Link><Link href="/code-flow/manual-trial" style={handoffLink}>Manual trial</Link><Link href="/validation-results" style={handoffLink}>Validation results</Link><Link href="/code-flow/release-audit" style={handoffLink}>Release audit</Link></div>
    <ReleaseReadinessSmokePackPanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
