"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealCommandCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-command-candidate"
      workspaceLabel="Tiny Real Command Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-command-candidate" />
    </CodexForgeAppShell>
  );
}
