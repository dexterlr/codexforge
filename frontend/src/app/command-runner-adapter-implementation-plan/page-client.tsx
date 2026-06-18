"use client";

import { CommandRunnerAdapterImplementationPlanPanel } from "@/lib/codexforge/command-runner-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-adapter-implementation-plan"
      workspaceLabel="Command Runner Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
