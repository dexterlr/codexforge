"use client";

import { BetaIssueTriageReviewPanel } from "@/lib/codexforge/beta-issue-triage-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaIssueTriageReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-issue-triage-review"
      workspaceLabel="Beta Issue Triage"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaIssueTriageReviewPanel />
    </CodexForgeAppShell>
  );
}
