"use client";

import { OpenAICompatibleRouterTrialResultPanel } from "@/lib/codexforge/openai-compatible-router-trial-result/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAICompatibleRouterTrialResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-router-trial-result"
      workspaceLabel="OpenAI-Compatible Router Trial Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAICompatibleRouterTrialResultPanel />
    </CodexForgeAppShell>
  );
}
