"use client";

import { CreativeLocalBridgeRealWorldTrialReviewPanel } from "@/lib/codexforge/creative-local-bridge-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeLocalBridgeRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-local-bridge-real-world-trial-review"
      workspaceLabel="Creative Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeLocalBridgeRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
