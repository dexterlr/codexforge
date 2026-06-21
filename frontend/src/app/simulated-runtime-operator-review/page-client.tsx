"use client";

import { SimulatedRuntimeOperatorReviewPanel } from "@/lib/codexforge/simulated-runtime-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-operator-review"
      workspaceLabel="Simulated Runtime Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
