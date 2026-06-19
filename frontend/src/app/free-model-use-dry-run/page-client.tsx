"use client";

import { FreeModelUseDryRunPanel } from "@/lib/codexforge/free-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FreeModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/free-model-use-dry-run"
      workspaceLabel="Free Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FreeModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

