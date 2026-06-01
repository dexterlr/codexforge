"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoDraftComparisonModePanel } from "@/lib/codexforge/video-draft-comparison-mode/components";

export default function VideoComparePageClient() {
  return (
    <CodexForgeAppShell activePath="/video-compare" workspaceLabel="Video Compare" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoDraftComparisonModePanel />
    </CodexForgeAppShell>
  );
}
