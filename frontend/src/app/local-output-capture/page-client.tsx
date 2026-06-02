"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealLocalOutputArtifactCapturePanel } from "@/lib/codexforge/real-local-output-artifact-capture/components";

export default function LocalOutputCapturePageClient() {
  return (
    <CodexForgeAppShell activePath="/local-output-capture" workspaceLabel="Local Output Capture" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealLocalOutputArtifactCapturePanel />
    </CodexForgeAppShell>
  );
}
