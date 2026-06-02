"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalKeyframeGenerationMvpPanel } from "@/lib/codexforge/local-keyframe-generation-mvp/components";

export default function LocalKeyframesPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-keyframes" workspaceLabel="Local Keyframes MVP" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalKeyframeGenerationMvpPanel />
    </CodexForgeAppShell>
  );
}
