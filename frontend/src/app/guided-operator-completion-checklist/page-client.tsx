"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorCompletionChecklistPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-completion-checklist" workspaceLabel="Guided Operator Completion Checklist" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-completion-checklist" />
    </CodexForgeAppShell>
  );
}
