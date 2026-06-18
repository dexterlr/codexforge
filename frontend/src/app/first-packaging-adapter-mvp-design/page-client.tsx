"use client";

import { FirstPackagingAdapterMvpDesignPanel } from "@/lib/codexforge/first-packaging-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstPackagingAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-packaging-adapter-mvp-design"
      workspaceLabel="First Packaging Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstPackagingAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
