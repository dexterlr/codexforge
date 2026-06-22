"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-recovery-preview" workspaceLabel="Local Change Recovery Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-recovery-preview" />
    </CodexForgeAppShell>
  );
}
