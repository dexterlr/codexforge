"use client";

import { UniversalBuilderMvpCandidatePanel } from "@/lib/codexforge/universal-builder-mvp-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderMvpCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-mvp-candidate"
      workspaceLabel="Universal Builder MVP Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderMvpCandidatePanel />
    </CodexForgeAppShell>
  );
}
