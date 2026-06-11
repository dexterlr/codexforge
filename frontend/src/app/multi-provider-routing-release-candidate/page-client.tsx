"use client";

import { MultiProviderRoutingReleaseCandidatePanel } from "@/lib/codexforge/multi-provider-routing-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MultiProviderRoutingReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-provider-routing-release-candidate"
      workspaceLabel="Routing Release RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiProviderRoutingReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
