"use client";

import { ControlledModelRouterReadinessCandidatePanel } from "@/lib/codexforge/controlled-model-router-readiness-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledModelRouterReadinessCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-model-router-readiness-candidate"
      workspaceLabel="Controlled Model Router Readiness Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledModelRouterReadinessCandidatePanel />
    </CodexForgeAppShell>
  );
}
