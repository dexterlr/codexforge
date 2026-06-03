"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { OpenAiCompatibleLiveTestPanel } from "@/lib/codexforge/openai-compatible-live-test/components";

export default function OpenAiCompatibleLiveTestPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-live-test"
      workspaceLabel="OpenAI Test"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAiCompatibleLiveTestPanel />
    </CodexForgeAppShell>
  );
}
