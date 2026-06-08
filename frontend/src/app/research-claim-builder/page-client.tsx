"use client";

import { ResearchClaimBuilderPanel } from "@/lib/codexforge/research-claim-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchClaimBuilderPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-claim-builder"
      workspaceLabel="Research Claim Builder"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchClaimBuilderPanel />
    </CodexForgeAppShell>
  );
}
