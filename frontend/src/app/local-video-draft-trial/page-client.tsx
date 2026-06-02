"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealLocalVideoDraftTrialPanel } from "@/lib/codexforge/real-local-video-draft-trial/components";

export default function LocalVideoDraftTrialPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-video-draft-trial" workspaceLabel="Local Video Draft Trial" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealLocalVideoDraftTrialPanel />
    </CodexForgeAppShell>
  );
}
