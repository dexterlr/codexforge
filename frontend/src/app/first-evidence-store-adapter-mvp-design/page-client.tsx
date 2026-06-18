"use client";

import { FirstEvidenceStoreAdapterMvpDesignPanel } from "@/lib/codexforge/first-evidence-store-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstEvidenceStoreAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-evidence-store-adapter-mvp-design"
      workspaceLabel="First Evidence Store Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstEvidenceStoreAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
