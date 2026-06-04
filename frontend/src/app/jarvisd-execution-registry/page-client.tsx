"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdCapabilityExecutionRegistryPanel } from "@/lib/codexforge/jarvisd-capability-execution-registry/components";

export default function JarvisdExecutionRegistryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-execution-registry"
      workspaceLabel="Jarvisd Execution Registry"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdCapabilityExecutionRegistryPanel />
    </CodexForgeAppShell>
  );
}
