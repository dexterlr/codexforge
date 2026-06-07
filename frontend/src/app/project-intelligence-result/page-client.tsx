"use client";

import { ProjectIntelligenceResultCapturePanel } from "@/lib/codexforge/project-intelligence-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectIntelligenceResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-intelligence-result"
      workspaceLabel="Intel Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectIntelligenceResultCapturePanel />
    </CodexForgeAppShell>
  );
}
