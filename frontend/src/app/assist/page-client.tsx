"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AssistedCodingModePanel } from "@/lib/codexforge/assisted-coding-mode/components";

export default function AssistPageClient() {
  return <CodexForgeAppShell activePath="/assist" workspaceLabel="Assisted coding mode" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-assist-route="AssistedCodingModePanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority no goal selected helpful empty state recommends /first-task for new users" />
    <div style={linkRow}><Link href="/first-task" style={primaryHandoffLink}>New here: First safe task</Link><Link href="/help-empty-states" style={handoffLink}>Help for empty states</Link><Link href="/provider-setup" style={handoffLink}>Provider setup</Link><Link href="/token-router" style={handoffLink}>Token router</Link></div>
    <AssistedCodingModePanel />
  </CodexForgeAppShell>;
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
