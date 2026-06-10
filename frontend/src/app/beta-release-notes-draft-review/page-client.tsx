"use client";

import { BetaReleaseNotesDraftReviewPanel } from "@/lib/codexforge/beta-release-notes-draft-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaReleaseNotesDraftReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-release-notes-draft-review"
      workspaceLabel="Beta Release Notes"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaReleaseNotesDraftReviewPanel />
    </CodexForgeAppShell>
  );
}
