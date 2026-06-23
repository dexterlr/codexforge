"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FrontUserFacingRunnerShellPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/front-user-facing-runner-shell"
      workspaceLabel="Front User-Facing Runner Shell"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="front-user-facing-runner-shell" />
    </CodexForgeAppShell>
  );
}
