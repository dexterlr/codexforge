"use client";

import { SpecialistVideoModelProviderPreviewPanel } from "@/lib/codexforge/specialist-video-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistVideoModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-video-model-provider-preview"
      workspaceLabel="Specialist Video Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistVideoModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
