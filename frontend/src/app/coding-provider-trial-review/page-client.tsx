"use client";

import { CodingProviderTrialReviewPanel } from "@/lib/codexforge/coding-provider-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodingProviderTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/coding-provider-trial-review"
      workspaceLabel="Coding Provider Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodingProviderTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
