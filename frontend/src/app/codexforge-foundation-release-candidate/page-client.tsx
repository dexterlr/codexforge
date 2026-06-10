"use client";

import { FoundationReleaseCandidatePanel } from "@/lib/codexforge/foundation-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FoundationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-foundation-release-candidate"
      workspaceLabel="Foundation RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FoundationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
