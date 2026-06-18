"use client";

import { FirstCommandRunnerAdapterMvpDesignPanel } from "@/lib/codexforge/first-command-runner-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCommandRunnerAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-command-runner-adapter-mvp-design"
      workspaceLabel="First Command Runner Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstCommandRunnerAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
