"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ArtifactThumbnailGeneratorPanel } from "@/lib/codexforge/artifact-thumbnail-generator/components";

export default function ArtifactThumbnailsPageClient() {
  return (
    <CodexForgeAppShell activePath="/artifact-thumbnails" workspaceLabel="Artifact Thumbnails" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ArtifactThumbnailGeneratorPanel />
    </CodexForgeAppShell>
  );
}
