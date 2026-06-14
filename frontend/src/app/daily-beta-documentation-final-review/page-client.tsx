"use client";

import { DailyBetaDocumentationFinalReviewPanel } from "@/lib/codexforge/daily-beta-documentation-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaDocumentationFinalReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-documentation-final-review"
      workspaceLabel="Daily Beta Documentation"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaDocumentationFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
