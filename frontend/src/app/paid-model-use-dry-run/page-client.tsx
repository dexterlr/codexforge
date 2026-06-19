"use client";

import { PaidModelUseDryRunPanel } from "@/lib/codexforge/paid-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaidModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paid-model-use-dry-run"
      workspaceLabel="Paid Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PaidModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

