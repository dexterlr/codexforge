"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainGoalIntakeRunnerPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-goal-intake-runner-preview"
      workspaceLabel="Domain Goal Intake Runner Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-goal-intake-runner-preview" />
    </CodexForgeAppShell>
  );
}
