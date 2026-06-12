"use client";

import { ResearchProviderTrialReviewPanel } from "@/lib/codexforge/research-provider-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchProviderTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-provider-trial-review"
      workspaceLabel="Research Provider Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchProviderTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
