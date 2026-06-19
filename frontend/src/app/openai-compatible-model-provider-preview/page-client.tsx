"use client";

import { OpenAICompatibleModelProviderPreviewPanel } from "@/lib/codexforge/openai-compatible-model-provider-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAICompatibleModelProviderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-model-provider-preview"
      workspaceLabel="OpenAI-Compatible Model Provider Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAICompatibleModelProviderPreviewPanel />
    </CodexForgeAppShell>
  );
}
