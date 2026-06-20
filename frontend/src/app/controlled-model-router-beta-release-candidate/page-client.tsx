"use client";

import { ControlledModelRouterBetaReleaseCandidatePanel } from "@/lib/codexforge/controlled-model-router-beta-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledModelRouterBetaReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-model-router-beta-release-candidate"
      workspaceLabel="Controlled Model Router Beta Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledModelRouterBetaReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
