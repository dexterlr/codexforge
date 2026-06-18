"use client";

import { RecoveryAdapterImplementationPlanPanel } from "@/lib/codexforge/recovery-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-adapter-implementation-plan"
      workspaceLabel="Recovery Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
