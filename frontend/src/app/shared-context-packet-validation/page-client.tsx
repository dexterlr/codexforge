"use client";

import { SharedContextPacketValidationPanel } from "@/lib/codexforge/shared-context-packet-validation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SharedContextPacketValidationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shared-context-packet-validation"
      workspaceLabel="Shared Context Packet Validation"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SharedContextPacketValidationPanel />
    </CodexForgeAppShell>
  );
}

