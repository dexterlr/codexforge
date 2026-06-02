"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AssetDependencyTrackerPanel } from "@/lib/codexforge/asset-dependency-tracker/components";

export default function VideoAssetsPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-assets" workspaceLabel="Video Assets" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <AssetDependencyTrackerPanel />
    </CodexForgeAppShell>
  );
}
