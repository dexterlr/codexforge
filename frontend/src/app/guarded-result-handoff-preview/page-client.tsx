"use client";

import { GuardedResultHandoffPreviewPanel } from "@/lib/codexforge/guarded-result-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedResultHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-result-handoff-preview"
      workspaceLabel="Guarded Result Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedResultHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
