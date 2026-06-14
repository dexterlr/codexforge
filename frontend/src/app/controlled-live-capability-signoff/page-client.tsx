"use client";

import { ControlledLiveCapabilitySignoffPanel } from "@/lib/codexforge/controlled-live-capability-signoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledLiveCapabilitySignoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-live-capability-signoff"
      workspaceLabel="Controlled Live Signoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledLiveCapabilitySignoffPanel />
    </CodexForgeAppShell>
  );
}
