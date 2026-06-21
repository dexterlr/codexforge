"use client";

import { GuardedAdapterHandoffPreviewPanel } from "@/lib/codexforge/guarded-adapter-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedAdapterHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-adapter-handoff-preview"
      workspaceLabel="Guarded Adapter Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedAdapterHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
