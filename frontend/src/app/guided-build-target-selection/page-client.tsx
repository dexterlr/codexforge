"use client";

import { GuidedBuildTargetSelectionPanel } from "@/lib/codexforge/guided-build-target-selection/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildTargetSelectionPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-target-selection"
      workspaceLabel="Guided Build Target Selection"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildTargetSelectionPanel />
    </CodexForgeAppShell>
  );
}

