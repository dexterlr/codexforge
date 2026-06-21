"use client";

import { ControlledDryRunExecutionHandoffReleaseCandidatePanel } from "@/lib/codexforge/controlled-dry-run-execution-handoff-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledDryRunExecutionHandoffReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-dry-run-execution-handoff-release-candidate"
      workspaceLabel="Controlled Dry-Run Execution Handoff Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledDryRunExecutionHandoffReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
