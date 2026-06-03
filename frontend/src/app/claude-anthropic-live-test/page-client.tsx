"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ClaudeAnthropicLiveTestPanel } from "@/lib/codexforge/claude-anthropic-live-test/components";

export default function ClaudeAnthropicLiveTestPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/claude-anthropic-live-test"
      workspaceLabel="Claude Test"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ClaudeAnthropicLiveTestPanel />
    </CodexForgeAppShell>
  );
}
