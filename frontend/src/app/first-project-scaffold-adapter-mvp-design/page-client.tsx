"use client";

import { FirstProjectScaffoldAdapterMvpDesignPanel } from "@/lib/codexforge/first-project-scaffold-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProjectScaffoldAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-project-scaffold-adapter-mvp-design"
      workspaceLabel="First Project Scaffold Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstProjectScaffoldAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
