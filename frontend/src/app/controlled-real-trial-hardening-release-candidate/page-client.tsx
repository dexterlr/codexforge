"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledRealTrialHardeningReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-real-trial-hardening-release-candidate"
      workspaceLabel="Controlled Real Trial Hardening Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="controlled-real-trial-hardening-release-candidate" />
    </CodexForgeAppShell>
  );
}
