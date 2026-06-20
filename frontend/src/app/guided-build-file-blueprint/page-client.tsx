"use client";

import { GuidedBuildFileBlueprintPanel } from "@/lib/codexforge/guided-build-file-blueprint/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildFileBlueprintPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-file-blueprint"
      workspaceLabel="Guided Build File Blueprint"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildFileBlueprintPanel />
    </CodexForgeAppShell>
  );
}

