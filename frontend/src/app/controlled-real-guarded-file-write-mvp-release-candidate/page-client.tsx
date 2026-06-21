"use client";

import { ControlledRealGuardedFileWriteMvpReleaseCandidatePanel } from "@/lib/codexforge/controlled-real-guarded-file-write-mvp-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledRealGuardedFileWriteMvpReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-real-guarded-file-write-mvp-release-candidate"
      workspaceLabel="Controlled Real Guarded File Write MVP Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledRealGuardedFileWriteMvpReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
