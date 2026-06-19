"use client";

import { BackendAdapterApprovalPreviewPanel } from "@/lib/codexforge/backend-adapter-approval-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-approval-preview"
      workspaceLabel="Backend Adapter Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterApprovalPreviewPanel />
    </CodexForgeAppShell>
  );
}
