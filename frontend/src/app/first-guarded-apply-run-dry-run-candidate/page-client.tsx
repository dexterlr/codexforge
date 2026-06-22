"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGuardedApplyRunDryRunCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-guarded-apply-run-dry-run-candidate"
      workspaceLabel="First Guarded Apply Run Dry-Run Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="first-guarded-apply-run-dry-run-candidate" />
    </CodexForgeAppShell>
  );
}
