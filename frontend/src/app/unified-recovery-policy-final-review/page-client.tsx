"use client";

import { UnifiedRecoveryPolicyFinalReviewPanel } from "@/lib/codexforge/unified-recovery-policy-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-recovery-policy-final-review"
      workspaceLabel="Recovery Policy Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedRecoveryPolicyFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
