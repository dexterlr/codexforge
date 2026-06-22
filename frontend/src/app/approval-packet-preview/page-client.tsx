"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalPacketPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-packet-preview"
      workspaceLabel="Approval Packet Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="approval-packet-preview" />
    </CodexForgeAppShell>
  );
}
