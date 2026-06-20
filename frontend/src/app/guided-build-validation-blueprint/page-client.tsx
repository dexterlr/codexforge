"use client";

import { GuidedBuildValidationBlueprintPanel } from "@/lib/codexforge/guided-build-validation-blueprint/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildValidationBlueprintPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-validation-blueprint"
      workspaceLabel="Guided Build Validation Blueprint"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildValidationBlueprintPanel />
    </CodexForgeAppShell>
  );
}

