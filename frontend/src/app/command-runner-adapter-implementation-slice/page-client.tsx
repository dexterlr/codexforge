"use client";

import { CommandRunnerAdapterImplementationSlicePanel } from "@/lib/codexforge/command-runner-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-adapter-implementation-slice"
      workspaceLabel="Command Runner Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
