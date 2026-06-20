"use client";

import { GuidedBuildApprovalQueuePanel } from "@/lib/codexforge/guided-build-approval-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildApprovalQueuePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-approval-queue"
      workspaceLabel="Guided Build Approval Queue"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildApprovalQueuePanel />
    </CodexForgeAppShell>
  );
}

