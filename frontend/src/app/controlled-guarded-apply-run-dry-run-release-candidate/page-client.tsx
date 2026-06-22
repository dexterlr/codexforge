"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledGuardedApplyRunDryRunReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-guarded-apply-run-dry-run-release-candidate"
      workspaceLabel="Controlled Guarded Apply Run Dry-Run Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="controlled-guarded-apply-run-dry-run-release-candidate" />
    </CodexForgeAppShell>
  );
}
