"use client";

import { UniversalBuilderRecoveryReviewPanel } from "@/lib/codexforge/universal-builder-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-recovery-review"
      workspaceLabel="Universal Builder Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
