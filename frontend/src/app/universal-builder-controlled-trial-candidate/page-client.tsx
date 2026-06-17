"use client";

import { UniversalBuilderControlledTrialCandidatePanel } from "@/lib/codexforge/universal-builder-controlled-trial-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderControlledTrialCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-controlled-trial-candidate"
      workspaceLabel="Universal Builder Controlled Trial Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderControlledTrialCandidatePanel />
    </CodexForgeAppShell>
  );
}
