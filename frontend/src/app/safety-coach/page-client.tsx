"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { PlainEnglishSafetyCoachPanel } from "@/lib/codexforge/plain-english-safety-coach/components";

export default function SafetyCoachPageClient() {
  return <CodexForgeAppShell activePath="/safety-coach" workspaceLabel="Safety coach" nextActionContext={{ wantsOperatorOverview: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-safety-coach-route="PlainEnglishSafetyCoachPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <div style={linkRow}><Link href="/credentials" style={primaryHandoffLink}>Credential safety</Link><Link href="/ai-providers" style={handoffLink}>Provider profiles</Link><Link href="/token-router" style={handoffLink}>Token routing safety</Link></div>
    <PlainEnglishSafetyCoachPanel />
  </CodexForgeAppShell>;
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
