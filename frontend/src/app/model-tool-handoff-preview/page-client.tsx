"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelToolHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-tool-handoff-preview"
      workspaceLabel="Model Tool Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="model-tool-handoff-preview" />
    </CodexForgeAppShell>
  );
}
