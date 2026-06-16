"use client";

import { DailyBetaOneControlledLaunchCandidatePanel } from "@/lib/codexforge/daily-beta-1-controlled-launch-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledLaunchCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-launch-candidate"
      workspaceLabel="Daily Beta 1 Controlled Launch Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledLaunchCandidatePanel />
    </CodexForgeAppShell>
  );
}
