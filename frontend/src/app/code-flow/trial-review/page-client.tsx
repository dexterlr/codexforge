"use client";

import { CodingFlowTrialReviewPanel } from "@/lib/codexforge/coding-flow-trial-review/components/CodingFlowTrialReviewPanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodeFlowTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow/trial-review"
      workspaceLabel="Coding Trial Review"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-coding-flow-trial-review-route="Coding Trial Review route imports/renders CodingFlowTrialReviewPanel Review the coding trial Copy trial review no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary" />
      <CodingFlowTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
