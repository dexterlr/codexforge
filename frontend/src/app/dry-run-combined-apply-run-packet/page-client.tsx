"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunCombinedApplyRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-combined-apply-run-packet"
      workspaceLabel="Dry-Run Combined Apply Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="dry-run-combined-apply-run-packet" />
    </CodexForgeAppShell>
  );
}
