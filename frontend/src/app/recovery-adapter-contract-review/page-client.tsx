"use client";

import { RecoveryAdapterContractReviewPanel } from "@/lib/codexforge/recovery-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-adapter-contract-review"
      workspaceLabel="Recovery Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
