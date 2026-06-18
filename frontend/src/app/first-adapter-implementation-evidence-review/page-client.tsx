"use client";

import { FirstAdapterImplementationEvidenceReviewPanel } from "@/lib/codexforge/first-adapter-implementation-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAdapterImplementationEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-adapter-implementation-evidence-review"
      workspaceLabel="First Adapter Implementation Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAdapterImplementationEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
