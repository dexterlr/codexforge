"use client";

import { GuidedBuildCommandBlueprintPanel } from "@/lib/codexforge/guided-build-command-blueprint/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildCommandBlueprintPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-command-blueprint"
      workspaceLabel="Guided Build Command Blueprint"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildCommandBlueprintPanel />
    </CodexForgeAppShell>
  );
}

