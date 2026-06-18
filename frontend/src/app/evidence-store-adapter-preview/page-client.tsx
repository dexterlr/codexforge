"use client";

import { EvidenceStoreAdapterPreviewPanel } from "@/lib/codexforge/evidence-store-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-adapter-preview"
      workspaceLabel="Evidence Store Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
