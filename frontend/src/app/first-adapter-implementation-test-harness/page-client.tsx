"use client";

import { FirstAdapterImplementationTestHarnessPanel } from "@/lib/codexforge/first-adapter-implementation-test-harness/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAdapterImplementationTestHarnessPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-adapter-implementation-test-harness"
      workspaceLabel="First Adapter Implementation Test Harness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAdapterImplementationTestHarnessPanel />
    </CodexForgeAppShell>
  );
}
