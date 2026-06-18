"use client";

import { FirstResearchAdapterMvpDesignPanel } from "@/lib/codexforge/first-research-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstResearchAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-research-adapter-mvp-design"
      workspaceLabel="First Research Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstResearchAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
