"use client";

import { GuardedFileWriteHandoffPreviewPanel } from "@/lib/codexforge/guarded-file-write-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedFileWriteHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-file-write-handoff-preview"
      workspaceLabel="Guarded File Write Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedFileWriteHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
