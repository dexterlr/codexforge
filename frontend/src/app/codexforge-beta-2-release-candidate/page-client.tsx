"use client";

import { CodexForgeBetaTwoReleaseCandidatePanel } from "@/lib/codexforge/codexforge-beta-2-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeBetaTwoReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-beta-2-release-candidate"
      workspaceLabel="CodexForge Beta 2 RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeBetaTwoReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
