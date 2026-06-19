"use client";

import { LocalRuntimeBackendAdapterPreviewPanel } from "@/lib/codexforge/local-runtime-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-backend-adapter-preview"
      workspaceLabel="Local Runtime Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
