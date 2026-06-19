"use client";

import { SpecialistImageModelProviderPreviewPanel } from "@/lib/codexforge/specialist-image-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistImageModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-image-model-provider-preview"
      workspaceLabel="Specialist Image Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistImageModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
