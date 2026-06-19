"use client";

import { SpecialistModelConnectionTestPreviewPanel } from "@/lib/codexforge/specialist-model-connection-test-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistModelConnectionTestPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-model-connection-test-preview"
      workspaceLabel="Specialist Model Connection Test Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistModelConnectionTestPreviewPanel />
    </CodexForgeAppShell>
  );
}
