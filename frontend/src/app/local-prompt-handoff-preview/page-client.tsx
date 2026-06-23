"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalPromptHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-prompt-handoff-preview"
      workspaceLabel="Local Prompt Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-prompt-handoff-preview" />
    </CodexForgeAppShell>
  );
}
