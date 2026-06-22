"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceRequirementPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-requirement-preview"
      workspaceLabel="Evidence Requirement Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="evidence-requirement-preview" />
    </CodexForgeAppShell>
  );
}
