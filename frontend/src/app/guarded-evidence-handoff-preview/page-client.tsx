"use client";

import { GuardedEvidenceHandoffPreviewPanel } from "@/lib/codexforge/guarded-evidence-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedEvidenceHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-evidence-handoff-preview"
      workspaceLabel="Guarded Evidence Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedEvidenceHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
