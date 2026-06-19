"use client";

import { SpecialistResearchModelProviderPreviewPanel } from "@/lib/codexforge/specialist-research-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistResearchModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-research-model-provider-preview"
      workspaceLabel="Specialist Research Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistResearchModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
