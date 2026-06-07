"use client";

import { OpenAiCompatibleLiveTestTrialPanel } from "@/lib/codexforge/openai-compatible-live-test-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAiCompatibleLiveTestTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-live-test-trial"
      workspaceLabel="OpenAI Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAiCompatibleLiveTestTrialPanel />
    </CodexForgeAppShell>
  );
}
