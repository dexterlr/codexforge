"use client";

import { FirstDryRunExecutionArmCandidatePanel } from "@/lib/codexforge/first-dry-run-execution-arm-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstDryRunExecutionArmCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-dry-run-execution-arm-candidate"
      workspaceLabel="First Dry-Run Execution Arm Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstDryRunExecutionArmCandidatePanel />
    </CodexForgeAppShell>
  );
}
