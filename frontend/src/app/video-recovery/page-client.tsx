"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoFailureRecoveryFlowPanel } from "@/lib/codexforge/video-failure-recovery-flow/components";

export default function VideoRecoveryPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-recovery" workspaceLabel="Video Recovery" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoFailureRecoveryFlowPanel />
    </CodexForgeAppShell>
  );
}
