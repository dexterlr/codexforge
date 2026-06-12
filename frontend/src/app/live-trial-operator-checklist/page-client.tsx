"use client";

import { LiveTrialOperatorChecklistPanel } from "@/lib/codexforge/live-trial-operator-checklist/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LiveTrialOperatorChecklistPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-trial-operator-checklist"
      workspaceLabel="Live Trial Checklist"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveTrialOperatorChecklistPanel />
    </CodexForgeAppShell>
  );
}
