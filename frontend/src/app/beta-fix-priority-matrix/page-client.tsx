"use client";

import { BetaFixPriorityMatrixPanel } from "@/lib/codexforge/beta-fix-priority-matrix/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaFixPriorityMatrixPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-fix-priority-matrix"
      workspaceLabel="Beta Fix Priority"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaFixPriorityMatrixPanel />
    </CodexForgeAppShell>
  );
}
