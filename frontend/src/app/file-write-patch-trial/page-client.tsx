"use client";

import { FileWritePatchTrialGatePanel } from "@/lib/codexforge/file-write-patch-trial-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWritePatchTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-patch-trial"
      workspaceLabel="Patch Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWritePatchTrialGatePanel />
    </CodexForgeAppShell>
  );
}
