"use client";

import { ResearchWorkspaceReleaseCandidatePanel } from "@/lib/codexforge/research-workspace-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchWorkspaceReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-workspace-release-candidate"
      workspaceLabel="Research Workspace Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchWorkspaceReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
