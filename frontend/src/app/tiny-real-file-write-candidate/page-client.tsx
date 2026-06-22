"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealFileWriteCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-file-write-candidate"
      workspaceLabel="Tiny Real File Write Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-file-write-candidate" />
    </CodexForgeAppShell>
  );
}
