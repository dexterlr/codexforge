"use client";

import { ControlledModelUseReleaseCandidatePanel } from "@/lib/codexforge/controlled-model-use-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledModelUseReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-model-use-release-candidate"
      workspaceLabel="Controlled Model Use Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledModelUseReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}

