"use client";

import { LocalImageGenerationTrialResultCapturePanel } from "@/lib/codexforge/local-image-generation-trial-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalImageGenerationResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-image-generation-result"
      workspaceLabel="Local Image Result"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalImageGenerationTrialResultCapturePanel />
    </CodexForgeAppShell>
  );
}
