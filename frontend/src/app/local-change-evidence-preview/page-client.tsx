"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-evidence-preview" workspaceLabel="Local Change Evidence Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-evidence-preview" />
    </CodexForgeAppShell>
  );
}
