"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalMachineCapabilityPanel } from "@/lib/codexforge/local-machine-capability/components";

export default function LocalMachinePageClient() {
  return (
    <CodexForgeAppShell activePath="/local-machine" workspaceLabel="Local Machine" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalMachineCapabilityPanel />
    </CodexForgeAppShell>
  );
}
