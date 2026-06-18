"use client";

import { UniversalAdapterBackedExecutionPreviewCandidatePanel } from "@/lib/codexforge/universal-adapter-backed-execution-preview-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalAdapterBackedExecutionPreviewCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-adapter-backed-execution-preview-candidate"
      workspaceLabel="Universal Adapter-Backed Execution Preview Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalAdapterBackedExecutionPreviewCandidatePanel />
    </CodexForgeAppShell>
  );
}
