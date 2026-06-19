"use client";

import { OpenAICompatibleModelUseDryRunPanel } from "@/lib/codexforge/openai-compatible-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAICompatibleModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-model-use-dry-run"
      workspaceLabel="OpenAI-Compatible Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAICompatibleModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

