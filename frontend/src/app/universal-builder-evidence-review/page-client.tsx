"use client";

import { UniversalBuilderEvidenceReviewPanel } from "@/lib/codexforge/universal-builder-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-evidence-review"
      workspaceLabel="Universal Builder Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
