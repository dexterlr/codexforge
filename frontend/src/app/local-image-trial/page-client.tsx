"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealLocalImageGenerationTrialPanel } from "@/lib/codexforge/real-local-image-generation-trial/components";

export default function LocalImageTrialPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-image-trial" workspaceLabel="Local Image Trial" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealLocalImageGenerationTrialPanel />
    </CodexForgeAppShell>
  );
}
