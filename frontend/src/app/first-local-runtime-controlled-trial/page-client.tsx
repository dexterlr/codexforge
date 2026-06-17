"use client";

import { FirstLocalRuntimeControlledTrialPanel } from "@/lib/codexforge/first-local-runtime-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLocalRuntimeControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-local-runtime-controlled-trial"
      workspaceLabel="First Local Runtime Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstLocalRuntimeControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
