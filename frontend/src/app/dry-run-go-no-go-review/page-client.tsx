"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunGoNoGoReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-go-no-go-review"
      workspaceLabel="Dry-Run Go No Go Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="dry-run-go-no-go-review" />
    </CodexForgeAppShell>
  );
}
