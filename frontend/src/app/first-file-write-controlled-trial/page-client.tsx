"use client";

import { FirstFileWriteControlledTrialPanel } from "@/lib/codexforge/first-file-write-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstFileWriteControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-file-write-controlled-trial"
      workspaceLabel="First File Write Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstFileWriteControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
