"use client";

import { EvidenceStoreModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/evidence-store-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-model-routed-execution-preview"
      workspaceLabel="Evidence Store Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
