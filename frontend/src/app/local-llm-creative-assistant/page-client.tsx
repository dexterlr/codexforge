"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalLlmCreativeAssistantPanel } from "@/lib/codexforge/local-llm-creative-assistant/components";

export default function LocalLlmCreativeAssistantPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-llm-creative-assistant" workspaceLabel="Prompt Assistant" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalLlmCreativeAssistantPanel />
    </CodexForgeAppShell>
  );
}
