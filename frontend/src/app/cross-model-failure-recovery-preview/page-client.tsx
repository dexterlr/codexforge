"use client";

import { CrossModelFailureRecoveryPreviewPanel } from "@/lib/codexforge/cross-model-failure-recovery-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossModelFailureRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-model-failure-recovery-preview"
      workspaceLabel="Cross-Model Failure Recovery Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossModelFailureRecoveryPreviewPanel />
    </CodexForgeAppShell>
  );
}
