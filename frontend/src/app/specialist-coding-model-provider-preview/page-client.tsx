"use client";

import { SpecialistCodingModelProviderPreviewPanel } from "@/lib/codexforge/specialist-coding-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistCodingModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-coding-model-provider-preview"
      workspaceLabel="Specialist Coding Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistCodingModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
