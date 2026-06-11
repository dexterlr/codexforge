"use client";

import { OperatorCockpitReleaseCandidatePanel } from "@/lib/codexforge/operator-cockpit-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OperatorCockpitReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/operator-cockpit-release-candidate"
      workspaceLabel="Operator Cockpit RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OperatorCockpitReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
