"use client";

import { SafeLocalProjectIndexerPanel } from "@/lib/codexforge/safe-local-project-indexer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SafeProjectIndexerPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/safe-project-indexer"
      workspaceLabel="Indexer"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SafeLocalProjectIndexerPanel />
    </CodexForgeAppShell>
  );
}
