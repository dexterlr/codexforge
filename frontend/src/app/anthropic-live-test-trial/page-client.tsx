"use client";

import { AnthropicLiveTestTrialPanel } from "@/lib/codexforge/anthropic-live-test-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AnthropicLiveTestTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/anthropic-live-test-trial"
      workspaceLabel="Anthropic Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AnthropicLiveTestTrialPanel />
    </CodexForgeAppShell>
  );
}
