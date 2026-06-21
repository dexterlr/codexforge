"use client";

import { SimulatedRuntimeEnvironmentReviewPanel } from "@/lib/codexforge/simulated-runtime-environment-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeEnvironmentReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-environment-review"
      workspaceLabel="Simulated Runtime Environment Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeEnvironmentReviewPanel />
    </CodexForgeAppShell>
  );
}
