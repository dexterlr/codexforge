"use client";

import { OpenAICompatibleProviderTestPacketPanel } from "@/lib/codexforge/openai-compatible-provider-test-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OpenAICompatibleProviderTestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/openai-compatible-provider-test-packet"
      workspaceLabel="OpenAI-Compatible Provider Test Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OpenAICompatibleProviderTestPacketPanel />
    </CodexForgeAppShell>
  );
}
