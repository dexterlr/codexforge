"use client";

import { EvidenceStoreBackendAdapterPreviewPanel } from "@/lib/codexforge/evidence-store-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-backend-adapter-preview"
      workspaceLabel="Evidence Store Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
