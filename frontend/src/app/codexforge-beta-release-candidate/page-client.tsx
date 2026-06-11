"use client";

import { CodexForgeBetaReleaseCandidatePanel } from "@/lib/codexforge/codexforge-beta-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeBetaReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-beta-release-candidate"
      workspaceLabel="Beta RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeBetaReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
