"use client";

import { GuardedCommandHandoffPreviewPanel } from "@/lib/codexforge/guarded-command-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedCommandHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-command-handoff-preview"
      workspaceLabel="Guarded Command Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedCommandHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
