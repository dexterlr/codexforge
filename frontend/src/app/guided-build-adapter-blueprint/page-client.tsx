"use client";

import { GuidedBuildAdapterBlueprintPanel } from "@/lib/codexforge/guided-build-adapter-blueprint/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildAdapterBlueprintPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-adapter-blueprint"
      workspaceLabel="Guided Build Adapter Blueprint"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildAdapterBlueprintPanel />
    </CodexForgeAppShell>
  );
}

