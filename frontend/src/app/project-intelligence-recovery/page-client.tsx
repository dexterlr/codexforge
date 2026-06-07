"use client";

import { ProjectIntelligenceRecoveryFlowPanel } from "@/lib/codexforge/project-intelligence-recovery-flow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectIntelligenceRecoveryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-intelligence-recovery"
      workspaceLabel="Intel Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectIntelligenceRecoveryFlowPanel />
    </CodexForgeAppShell>
  );
}
