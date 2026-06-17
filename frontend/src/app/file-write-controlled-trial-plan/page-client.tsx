"use client";

import { FileWriteControlledTrialPlanPanel } from "@/lib/codexforge/file-write-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-controlled-trial-plan"
      workspaceLabel="File Write Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
