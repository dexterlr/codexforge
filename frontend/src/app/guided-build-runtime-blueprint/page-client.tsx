"use client";

import { GuidedBuildRuntimeBlueprintPanel } from "@/lib/codexforge/guided-build-runtime-blueprint/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildRuntimeBlueprintPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-runtime-blueprint"
      workspaceLabel="Guided Build Runtime Blueprint"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildRuntimeBlueprintPanel />
    </CodexForgeAppShell>
  );
}

