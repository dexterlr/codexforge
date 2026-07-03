"use client";

import { GuardedVideoPipelineRail } from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoResultReviewInboxPanel } from "@/lib/codexforge/video-result-review-inbox/components";

export default function VideoReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-review" workspaceLabel="Video Review" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuardedVideoPipelineRail title="Video review guarded pipeline" compact />
      <VideoResultReviewInboxPanel />
    </CodexForgeAppShell>
  );
}
