"use client";
import {
  MAIN_PAGES_START_LINKS,
  MainPagesGodTierUxHandoffRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { NoviceFirstTaskPanel } from "@/lib/codexforge/novice-first-task/components";

export default function FirstTaskPageClient() {
  return <CodexForgeAppShell activePath="/first-task" workspaceLabel="First safe task" nextActionContext={{ wantsOperatorOverview: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-first-task-route="NoviceFirstTaskPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <MainPagesGodTierUxHandoffRail
      eyebrow="review-only UX upgrade"
      title="First task command lane"
      summary="This surface keeps the first task calm and deliberate: understand the change, preview the result, then leave execution to guarded approval paths."
      links={MAIN_PAGES_START_LINKS}
      tone="workflow"
    />
    <NoviceFirstTaskPanel />
  </CodexForgeAppShell>;
}
