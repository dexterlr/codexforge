"use client";

import { OpenAICompatibleConnectionTestPreviewPanel } from "@/lib/codexforge/openai-compatible-connection-test-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAICompatibleConnectionTestPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-connection-test-preview"
      workspaceLabel="OpenAI-Compatible Connection Test Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAICompatibleConnectionTestPreviewPanel />
    </CodexForgeAppShell>
  );
}
