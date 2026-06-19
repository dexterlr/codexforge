"use client";

import { FirstBackendAdapterContractCandidatePanel } from "@/lib/codexforge/first-backend-adapter-contract-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBackendAdapterContractCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-backend-adapter-contract-candidate"
      workspaceLabel="First Backend Adapter Contract Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstBackendAdapterContractCandidatePanel />
    </CodexForgeAppShell>
  );
}
