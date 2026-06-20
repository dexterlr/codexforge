"use client";

import { GuidedBuildRequirementChecklistPanel } from "@/lib/codexforge/guided-build-requirement-checklist/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildRequirementChecklistPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-requirement-checklist"
      workspaceLabel="Guided Build Requirement Checklist"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildRequirementChecklistPanel />
    </CodexForgeAppShell>
  );
}

