"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdCapabilityRegistryPanel } from "@/lib/codexforge/jarvisd-capability-registry/components";

export default function JarvisdCapabilitiesPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-capabilities"
      workspaceLabel="Jarvisd Capabilities"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdCapabilityRegistryPanel />
    </CodexForgeAppShell>
  );
}
