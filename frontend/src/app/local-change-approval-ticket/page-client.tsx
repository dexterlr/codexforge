"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeApprovalTicketPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-approval-ticket" workspaceLabel="Local Change Approval Ticket" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-approval-ticket" />
    </CodexForgeAppShell>
  );
}
