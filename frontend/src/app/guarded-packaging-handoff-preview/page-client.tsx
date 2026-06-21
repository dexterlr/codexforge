"use client";

import { GuardedPackagingHandoffPreviewPanel } from "@/lib/codexforge/guarded-packaging-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedPackagingHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-packaging-handoff-preview"
      workspaceLabel="Guarded Packaging Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedPackagingHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
