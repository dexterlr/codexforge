"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { DraftSideBySidePlaybackReviewPanel } from "@/lib/codexforge/draft-side-by-side-playback-review/components";

export default function DraftPlaybackReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/draft-playback-review" workspaceLabel="Draft Playback Review" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DraftSideBySidePlaybackReviewPanel />
    </CodexForgeAppShell>
  );
}
