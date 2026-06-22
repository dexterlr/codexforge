"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledGuidedOperatorRunHardeningReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-guided-operator-run-hardening-release-candidate" workspaceLabel="Controlled Guided Operator Run Hardening Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="controlled-guided-operator-run-hardening-release-candidate" />
    </CodexForgeAppShell>
  );
}
