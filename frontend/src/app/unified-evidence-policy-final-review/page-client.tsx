"use client";

import { UnifiedEvidencePolicyFinalReviewPanel } from "@/lib/codexforge/unified-evidence-policy-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-evidence-policy-final-review"
      workspaceLabel="Evidence Policy Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedEvidencePolicyFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
