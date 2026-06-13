"use client";

import { FirstLocalModelLiveTrialReviewPanel } from "@/lib/codexforge/first-local-model-live-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-local-model-live-trial-review"
      workspaceLabel="Local Model Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstLocalModelLiveTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
