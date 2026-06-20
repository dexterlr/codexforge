"use client";

import { WebsiteBuilderTargetPacketPanel } from "@/lib/codexforge/website-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WebsiteBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/website-builder-target-packet"
      workspaceLabel="Website Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <WebsiteBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
