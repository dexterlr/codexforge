"use client";

import { ResearchEvidenceReviewInboxPanel } from "@/lib/codexforge/research-evidence-review-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchEvidenceInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-evidence-inbox"
      workspaceLabel="Research Evidence Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchEvidenceReviewInboxPanel />
    </CodexForgeAppShell>
  );
}
