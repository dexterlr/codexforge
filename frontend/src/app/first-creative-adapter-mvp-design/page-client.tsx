"use client";

import { FirstCreativeAdapterMvpDesignPanel } from "@/lib/codexforge/first-creative-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCreativeAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-creative-adapter-mvp-design"
      workspaceLabel="First Creative Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstCreativeAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
