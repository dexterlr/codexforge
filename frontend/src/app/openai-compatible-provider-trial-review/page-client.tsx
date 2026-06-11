"use client";

import { OpenAICompatibleProviderTrialReviewPanel } from "@/lib/codexforge/openai-compatible-provider-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAICompatibleProviderTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-provider-trial-review"
      workspaceLabel="OpenAI Provider Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAICompatibleProviderTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
