"use client";

import { CodexForgeEndToEndDailyBetaCandidatePanel } from "@/lib/codexforge/codexforge-end-to-end-daily-beta-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeEndToEndDailyBetaCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-end-to-end-daily-beta-candidate"
      workspaceLabel="E2E Daily Beta"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeEndToEndDailyBetaCandidatePanel />
    </CodexForgeAppShell>
  );
}
