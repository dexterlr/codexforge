"use client";

import { WorkflowProfileRegistryPanel } from "@/lib/codexforge/workflow-profile-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkflowProfileRegistryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workflow-profile-registry"
      workspaceLabel="Workflow Profile Registry"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <WorkflowProfileRegistryPanel />
    </CodexForgeAppShell>
  );
}
