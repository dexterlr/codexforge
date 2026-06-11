"use client";

import { UnifiedWorkspaceSearchReleaseCandidatePanel } from "@/lib/codexforge/unified-workspace-search-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedWorkspaceSearchReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-workspace-search-release-candidate"
      workspaceLabel="Unified Search RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedWorkspaceSearchReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
