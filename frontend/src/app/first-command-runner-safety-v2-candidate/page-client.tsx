"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCommandRunnerSafetyV2CandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-command-runner-safety-v2-candidate"
      workspaceLabel="First Command Runner Safety v2 Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="first-command-runner-safety-v2-candidate" />
    </CodexForgeAppShell>
  );
}
