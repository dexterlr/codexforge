"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { OperatorDemoModePanel } from "@/lib/codexforge/operator-demo-mode/components";

export default function DemoPageClient() {
  return <CodexForgeAppShell activePath="/demo" workspaceLabel="Demo the coding MVP" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-demo-route="Operator Demo Mode route imports/renders OperatorDemoModePanel Demo the coding MVP Start demo Product Trial /product-trial Operator Runbook /runbook MVP Experience Lock /mvp-experience Real Manual MVP Trial /code-flow/real-trial MVP Polish Demo Final /code-flow/final-polish What this proves What remains manual no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
    <div style={linkRow}><Link href="/product-trial" style={primaryHandoffLink}>Run product trial</Link><Link href="/onboarding" style={handoffLink}>Onboarding</Link><Link href="/runbook" style={handoffLink}>Runbook</Link><Link href="/mvp-experience" style={handoffLink}>MVP lock</Link><Link href="/code-flow/live-run" style={handoffLink}>Live run</Link></div>
    <OperatorDemoModePanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
