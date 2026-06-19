"use client";

import { ControlledModelUseCandidatePanel } from "@/lib/codexforge/controlled-model-use-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledModelUseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-model-use-candidate"
      workspaceLabel="Controlled Model Use Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledModelUseCandidatePanel />
    </CodexForgeAppShell>
  );
}
