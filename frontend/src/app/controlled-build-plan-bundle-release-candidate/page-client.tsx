"use client";

import { ControlledBuildPlanBundleReleaseCandidatePanel } from "@/lib/codexforge/controlled-build-plan-bundle-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBuildPlanBundleReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-build-plan-bundle-release-candidate"
      workspaceLabel="Controlled Build Plan Bundle Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledBuildPlanBundleReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
