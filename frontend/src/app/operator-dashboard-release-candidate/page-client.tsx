"use client";

import { OperatorDashboardReleaseCandidatePanel } from "@/lib/codexforge/operator-dashboard-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OperatorDashboardReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/operator-dashboard-release-candidate"
      workspaceLabel="Dashboard RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OperatorDashboardReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
