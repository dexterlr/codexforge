"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExitCodeNormalizationContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/exit-code-normalization-contract"
      workspaceLabel="Exit Code Normalization Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="exit-code-normalization-contract" />
    </CodexForgeAppShell>
  );
}
