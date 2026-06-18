"use client";

import { AdapterImplementationOperatorTrialReviewPanel } from "@/lib/codexforge/adapter-implementation-operator-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationOperatorTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-operator-trial-review"
      workspaceLabel="Adapter Implementation Operator Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationOperatorTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
