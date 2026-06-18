"use client";

import { FirstLocalRuntimeAdapterMvpDesignPanel } from "@/lib/codexforge/first-local-runtime-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLocalRuntimeAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-local-runtime-adapter-mvp-design"
      workspaceLabel="First Local Runtime Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstLocalRuntimeAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
