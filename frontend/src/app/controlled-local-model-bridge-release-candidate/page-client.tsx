"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledLocalModelBridgeReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-local-model-bridge-release-candidate"
      workspaceLabel="Controlled Local Model Bridge Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="controlled-local-model-bridge-release-candidate" />
    </CodexForgeAppShell>
  );
}
