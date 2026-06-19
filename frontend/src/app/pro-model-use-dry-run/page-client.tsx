"use client";

import { ProModelUseDryRunPanel } from "@/lib/codexforge/pro-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pro-model-use-dry-run"
      workspaceLabel="Pro Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

