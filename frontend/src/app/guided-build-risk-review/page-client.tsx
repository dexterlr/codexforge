"use client";

import { GuidedBuildRiskReviewPanel } from "@/lib/codexforge/guided-build-risk-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildRiskReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-risk-review"
      workspaceLabel="Guided Build Risk Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildRiskReviewPanel />
    </CodexForgeAppShell>
  );
}

