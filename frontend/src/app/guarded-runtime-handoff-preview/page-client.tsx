"use client";

import { GuardedRuntimeHandoffPreviewPanel } from "@/lib/codexforge/guarded-runtime-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedRuntimeHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-runtime-handoff-preview"
      workspaceLabel="Guarded Runtime Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedRuntimeHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
