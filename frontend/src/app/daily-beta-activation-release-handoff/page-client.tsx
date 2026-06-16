"use client";

import { DailyBetaActivationReleaseHandoffPanel } from "@/lib/codexforge/daily-beta-activation-release-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationReleaseHandoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-release-handoff"
      workspaceLabel="Activation Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationReleaseHandoffPanel />
    </CodexForgeAppShell>
  );
}
