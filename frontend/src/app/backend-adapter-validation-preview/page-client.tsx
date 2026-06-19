"use client";

import { BackendAdapterValidationPreviewPanel } from "@/lib/codexforge/backend-adapter-validation-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterValidationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-validation-preview"
      workspaceLabel="Backend Adapter Validation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterValidationPreviewPanel />
    </CodexForgeAppShell>
  );
}
