"use client";

import { RecoveryAdapterPreviewPanel } from "@/lib/codexforge/recovery-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-adapter-preview"
      workspaceLabel="Recovery Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
