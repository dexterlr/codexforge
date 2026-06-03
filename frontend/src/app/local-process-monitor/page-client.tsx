"use client";

import { LocalProcessMonitorPreviewPanel } from "@/lib/codexforge/local-process-monitor-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalProcessMonitorPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-process-monitor"
      workspaceLabel="Process Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalProcessMonitorPreviewPanel />
    </CodexForgeAppShell>
  );
}
