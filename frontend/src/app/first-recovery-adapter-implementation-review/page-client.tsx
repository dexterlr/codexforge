"use client";

import { FirstRecoveryAdapterImplementationReviewPanel } from "@/lib/codexforge/first-recovery-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRecoveryAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-recovery-adapter-implementation-review"
      workspaceLabel="First Recovery Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRecoveryAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
