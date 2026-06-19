"use client";

import { BackendAdapterDryRunCandidatePanel } from "@/lib/codexforge/backend-adapter-dry-run-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterDryRunCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-dry-run-candidate"
      workspaceLabel="Backend Adapter Dry-Run Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterDryRunCandidatePanel />
    </CodexForgeAppShell>
  );
}
