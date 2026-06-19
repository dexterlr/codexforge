"use client";

import { FirstBackendAdapterImplementationPreviewCandidatePanel } from "@/lib/codexforge/first-backend-adapter-implementation-preview-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBackendAdapterImplementationPreviewCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-backend-adapter-implementation-preview-candidate"
      workspaceLabel="First Backend Adapter Implementation Preview Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstBackendAdapterImplementationPreviewCandidatePanel />
    </CodexForgeAppShell>
  );
}
