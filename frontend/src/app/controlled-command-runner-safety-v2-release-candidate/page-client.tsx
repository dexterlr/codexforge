"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledCommandRunnerSafetyV2ReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-command-runner-safety-v2-release-candidate"
      workspaceLabel="Controlled Command Runner Safety v2 Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="controlled-command-runner-safety-v2-release-candidate" />
    </CodexForgeAppShell>
  );
}
