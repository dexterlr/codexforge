"use client";

import { LocalModelProviderTrialReviewPanel } from "@/lib/codexforge/local-model-provider-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelProviderTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-provider-trial-review"
      workspaceLabel="Local Model Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelProviderTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
