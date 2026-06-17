"use client";

import { RecoveryRetryBoundaryPanel } from "@/lib/codexforge/recovery-retry-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryRetryBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-retry-boundary"
      workspaceLabel="Recovery Retry Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryRetryBoundaryPanel />
    </CodexForgeAppShell>
  );
}
