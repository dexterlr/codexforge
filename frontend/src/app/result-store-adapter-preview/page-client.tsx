"use client";

import { ResultStoreAdapterPreviewPanel } from "@/lib/codexforge/result-store-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-adapter-preview"
      workspaceLabel="Result Store Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
