"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoGenerationSafetyAuditPanel } from "@/lib/codexforge/video-generation-safety-audit/components";

export default function VideoSafetyAuditPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-safety-audit" workspaceLabel="Video Safety Audit" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoGenerationSafetyAuditPanel />
    </CodexForgeAppShell>
  );
}
