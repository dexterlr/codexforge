"use client";

import { BackendAdapterSandboxPreviewPanel } from "@/lib/codexforge/backend-adapter-sandbox-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterSandboxPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-sandbox-preview"
      workspaceLabel="Backend Adapter Sandbox Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterSandboxPreviewPanel />
    </CodexForgeAppShell>
  );
}
