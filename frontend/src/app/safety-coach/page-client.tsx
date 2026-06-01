"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { PlainEnglishSafetyCoachPanel } from "@/lib/codexforge/plain-english-safety-coach/components";

export default function SafetyCoachPageClient() {
  return <CodexForgeAppShell activePath="/safety-coach" workspaceLabel="Safety coach" nextActionContext={{ wantsOperatorOverview: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-safety-coach-route="PlainEnglishSafetyCoachPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <PlainEnglishSafetyCoachPanel />
  </CodexForgeAppShell>;
}
