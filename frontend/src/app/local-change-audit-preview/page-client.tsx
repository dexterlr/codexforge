"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeAuditPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-audit-preview" workspaceLabel="Local Change Audit Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-audit-preview" />
    </CodexForgeAppShell>
  );
}
