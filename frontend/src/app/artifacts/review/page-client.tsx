"use client";

import { CreativeArtifactReviewBoard } from "@/lib/codexforge/creative-artifact-review";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ArtifactsReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/artifacts/review"
      workspaceLabel="Artifact Review"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
    >
      <CreativeArtifactReviewBoard />
    </CodexForgeAppShell>
  );
}
