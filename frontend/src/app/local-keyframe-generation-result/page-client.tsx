"use client";

import { LocalKeyframeGenerationTrialResultCapturePanel } from "@/lib/codexforge/local-keyframe-generation-trial-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalKeyframeGenerationResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-keyframe-generation-result"
      workspaceLabel="Local Keyframe Result"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalKeyframeGenerationTrialResultCapturePanel />
    </CodexForgeAppShell>
  );
}
