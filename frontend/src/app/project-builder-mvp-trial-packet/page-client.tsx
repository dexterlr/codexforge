"use client";

import { ProjectBuilderMvpTrialPacketPanel } from "@/lib/codexforge/project-builder-mvp-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectBuilderMvpTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-builder-mvp-trial-packet"
      workspaceLabel="Project Builder MVP Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectBuilderMvpTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
