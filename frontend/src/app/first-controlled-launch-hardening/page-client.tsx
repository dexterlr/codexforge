"use client";

import { FirstControlledLaunchHardeningPanel } from "@/lib/codexforge/first-controlled-launch-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLaunchHardeningPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-launch-hardening"
      workspaceLabel="First Controlled Launch Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLaunchHardeningPanel />
    </CodexForgeAppShell>
  );
}
