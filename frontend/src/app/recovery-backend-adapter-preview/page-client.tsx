"use client";

import { RecoveryBackendAdapterPreviewPanel } from "@/lib/codexforge/recovery-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-backend-adapter-preview"
      workspaceLabel="Recovery Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
