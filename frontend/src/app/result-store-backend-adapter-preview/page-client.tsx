"use client";

import { ResultStoreBackendAdapterPreviewPanel } from "@/lib/codexforge/result-store-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-backend-adapter-preview"
      workspaceLabel="Result Store Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
