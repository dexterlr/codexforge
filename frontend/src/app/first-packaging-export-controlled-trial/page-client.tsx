"use client";

import { FirstPackagingExportControlledTrialPanel } from "@/lib/codexforge/first-packaging-export-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstPackagingExportControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-packaging-export-controlled-trial"
      workspaceLabel="First Packaging Export Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstPackagingExportControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
