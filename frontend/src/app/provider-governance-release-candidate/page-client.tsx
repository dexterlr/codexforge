"use client";

import { ProviderGovernanceReleaseCandidatePanel } from "@/lib/codexforge/provider-governance-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderGovernanceReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-governance-release-candidate"
      workspaceLabel="Provider Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderGovernanceReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
