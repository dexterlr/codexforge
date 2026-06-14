"use client";

import { UnifiedResultPolicyFinalReviewPanel } from "@/lib/codexforge/unified-result-policy-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-result-policy-final-review"
      workspaceLabel="Result Policy Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedResultPolicyFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
