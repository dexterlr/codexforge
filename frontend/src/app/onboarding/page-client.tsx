"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { MvpOnboardingPanel } from "@/lib/codexforge/mvp-onboarding/components";

export default function OnboardingPageClient() {
  return <CodexForgeAppShell activePath="/onboarding" workspaceLabel="Start with CodexForge" nextActionContext={{ wantsOperatorOverview: true, hasRegressionOrFixWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-onboarding-route="MvpOnboardingPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <div style={linkRow} data-codexforge-onboarding-first-task="First safe task /first-task Safety Coach /safety-coach no goal selected helpful empty state">
      <Link href="/first-task" style={primaryHandoffLink}>First safe task</Link>
      <Link href="/safety-coach" style={handoffLink}>Safety coach</Link>
      <Link href="/ai-providers" style={handoffLink}>AI provider profiles</Link>
      <Link href="/provider-adapters" style={handoffLink}>Optional adapter review</Link>
      <Link href="/credentials" style={handoffLink}>Credential safety</Link>
    </div>
    <MvpOnboardingPanel />
  </CodexForgeAppShell>;
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
