"use client";

import { SharedModelMemoryAccessPreviewPanel } from "@/lib/codexforge/shared-model-memory-access-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SharedModelMemoryAccessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shared-model-memory-access-preview"
      workspaceLabel="Shared Model Memory Access Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SharedModelMemoryAccessPreviewPanel />
    </CodexForgeAppShell>
  );
}
