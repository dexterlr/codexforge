"use client";

import { AgentPluginRegistryComparisonPanel } from "@/lib/codexforge/agent-plugin-registry-comparison/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AgentPluginRegistryComparisonPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/agent-plugin-registry-comparison"
      workspaceLabel="Agent Plugin Registry Comparison"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AgentPluginRegistryComparisonPanel />
    </CodexForgeAppShell>
  );
}
