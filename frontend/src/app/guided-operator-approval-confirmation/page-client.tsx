"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorApprovalConfirmationPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-approval-confirmation" workspaceLabel="Guided Operator Approval Confirmation" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-approval-confirmation" />
    </CodexForgeAppShell>
  );
}
