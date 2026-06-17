"use client";

import { CommandRunnerAdapterContractReviewPanel } from "@/lib/codexforge/command-runner-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-adapter-contract-review"
      workspaceLabel="Command Runner Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
