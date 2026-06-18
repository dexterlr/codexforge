"use client";

import { FirstResultStoreAdapterMvpDesignPanel } from "@/lib/codexforge/first-result-store-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstResultStoreAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-result-store-adapter-mvp-design"
      workspaceLabel="First Result Store Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstResultStoreAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
