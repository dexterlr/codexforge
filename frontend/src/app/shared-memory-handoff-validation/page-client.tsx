"use client";

import { SharedMemoryHandoffValidationPanel } from "@/lib/codexforge/shared-memory-handoff-validation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SharedMemoryHandoffValidationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shared-memory-handoff-validation"
      workspaceLabel="Shared Memory Handoff Validation"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SharedMemoryHandoffValidationPanel />
    </CodexForgeAppShell>
  );
}

