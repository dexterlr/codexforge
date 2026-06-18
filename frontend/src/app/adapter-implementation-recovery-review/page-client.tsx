"use client";

import { AdapterImplementationRecoveryReviewPanel } from "@/lib/codexforge/adapter-implementation-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-recovery-review"
      workspaceLabel="Adapter Implementation Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
