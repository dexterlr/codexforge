"use client";

import { ProjectRiskSecretsScanLiveTrialPanel } from "@/lib/codexforge/project-risk-secrets-scan-live-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectRiskScanLiveTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-risk-scan-live-trial"
      workspaceLabel="Risk Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectRiskSecretsScanLiveTrialPanel />
    </CodexForgeAppShell>
  );
}
