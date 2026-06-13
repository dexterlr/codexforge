"use client";

import { BetaWorkflowDocumentationReviewPanel } from "@/lib/codexforge/beta-workflow-documentation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaWorkflowDocumentationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-workflow-documentation-review"
      workspaceLabel="Beta Documentation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaWorkflowDocumentationReviewPanel />
    </CodexForgeAppShell>
  );
}
