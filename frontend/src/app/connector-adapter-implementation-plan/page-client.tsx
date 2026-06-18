"use client";

import { ConnectorAdapterImplementationPlanPanel } from "@/lib/codexforge/connector-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-adapter-implementation-plan"
      workspaceLabel="Connector Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
