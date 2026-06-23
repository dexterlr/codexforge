"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLocalModelBridgeCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-local-model-bridge-candidate"
      workspaceLabel="First Local Model Bridge Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="first-local-model-bridge-candidate" />
    </CodexForgeAppShell>
  );
}
