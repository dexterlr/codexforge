"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealLocalKeyframeGenerationTrialPanel } from "@/lib/codexforge/real-local-keyframe-generation-trial/components";

export default function LocalKeyframeTrialPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-keyframe-trial" workspaceLabel="Local Keyframe Trial" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealLocalKeyframeGenerationTrialPanel />
    </CodexForgeAppShell>
  );
}
