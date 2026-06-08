"use client";

import { ResearchCitationDraftReviewPanel } from "@/lib/codexforge/research-citation-draft-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchCitationDraftReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-citation-draft-review"
      workspaceLabel="Research Citation Draft Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchCitationDraftReviewPanel />
    </CodexForgeAppShell>
  );
}
