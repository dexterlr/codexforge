"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdLocalApiHandshakePanel } from "@/lib/codexforge/jarvisd-local-api-handshake/components";

export default function JarvisdApiHandshakePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-api-handshake"
      workspaceLabel="Jarvisd Handshake"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdLocalApiHandshakePanel />
    </CodexForgeAppShell>
  );
}
