"use client";

import { LocalOutputArtifactCaptureLiveBridgePanel } from "@/lib/codexforge/local-output-artifact-capture-live-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalOutputArtifactCapturePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-output-artifact-capture"
      workspaceLabel="Local Output Artifact Capture"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalOutputArtifactCaptureLiveBridgePanel />
    </CodexForgeAppShell>
  );
}
