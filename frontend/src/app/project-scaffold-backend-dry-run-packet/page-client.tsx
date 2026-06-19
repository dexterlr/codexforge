"use client";

import { ProjectScaffoldBackendDryRunPacketPanel } from "@/lib/codexforge/project-scaffold-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-backend-dry-run-packet"
      workspaceLabel="Project Scaffold Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
