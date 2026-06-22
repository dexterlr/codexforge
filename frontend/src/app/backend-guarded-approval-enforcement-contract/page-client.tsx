"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedApprovalEnforcementContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-approval-enforcement-contract"
      workspaceLabel="Backend Guarded Approval Enforcement Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-approval-enforcement-contract" />
    </CodexForgeAppShell>
  );
}
