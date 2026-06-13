"use client";

import { FirstProviderLiveCallTrialReviewPanel } from "@/lib/codexforge/first-provider-live-call-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-provider-live-call-trial-review"
      workspaceLabel="Provider Live Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstProviderLiveCallTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
