"use client";

import { LocalModelBridgeDryRunPanel } from "@/lib/codexforge/local-model-bridge-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelBridgeDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-bridge-dry-run"
      workspaceLabel="Local Model Bridge Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeDryRunPanel />
    </CodexForgeAppShell>
  );
}
