"use client";

import { AutomationAdapterContractReviewPanel } from "@/lib/codexforge/automation-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-adapter-contract-review"
      workspaceLabel="Automation Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
