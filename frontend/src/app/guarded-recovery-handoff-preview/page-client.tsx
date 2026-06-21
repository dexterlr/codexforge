"use client";

import { GuardedRecoveryHandoffPreviewPanel } from "@/lib/codexforge/guarded-recovery-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedRecoveryHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-recovery-handoff-preview"
      workspaceLabel="Guarded Recovery Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedRecoveryHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
