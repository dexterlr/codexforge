"use client";

import { CreativeProviderTrialReviewPanel } from "@/lib/codexforge/creative-provider-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeProviderTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-provider-trial-review"
      workspaceLabel="Creative Provider Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeProviderTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
