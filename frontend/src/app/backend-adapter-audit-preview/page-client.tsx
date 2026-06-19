"use client";

import { BackendAdapterAuditPreviewPanel } from "@/lib/codexforge/backend-adapter-audit-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterAuditPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-audit-preview"
      workspaceLabel="Backend Adapter Audit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterAuditPreviewPanel />
    </CodexForgeAppShell>
  );
}
