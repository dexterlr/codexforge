"use client";

import { WorkflowPackageValidatorLiveBridgePanel } from "@/lib/codexforge/workflow-package-validator-live-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkflowValidatorLiveBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workflow-validator-live-bridge"
      workspaceLabel="Workflow Validator Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <WorkflowPackageValidatorLiveBridgePanel />
    </CodexForgeAppShell>
  );
}
