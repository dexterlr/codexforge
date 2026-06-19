"use client";

import { LocalModelUseDryRunPanel } from "@/lib/codexforge/local-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-use-dry-run"
      workspaceLabel="Local Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

