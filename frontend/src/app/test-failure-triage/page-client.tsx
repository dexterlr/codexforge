"use client";

import { TestFailureTriageRouterPanel } from "@/lib/codexforge/test-failure-triage-router/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestFailureTriagePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-failure-triage"
      workspaceLabel="Failure Triage"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestFailureTriageRouterPanel />
    </CodexForgeAppShell>
  );
}
