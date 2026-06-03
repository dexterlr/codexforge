"use client";

import { ProjectRiskSecretsScannerPanel } from "@/lib/codexforge/project-risk-secrets-scanner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectRiskSecretsScanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-risk-secrets-scan"
      workspaceLabel="Risk Scan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectRiskSecretsScannerPanel />
    </CodexForgeAppShell>
  );
}
