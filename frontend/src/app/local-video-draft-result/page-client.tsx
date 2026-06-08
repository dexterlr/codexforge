"use client";

import { LocalVideoDraftTrialResultCapturePanel } from "@/lib/codexforge/local-video-draft-trial-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalVideoDraftResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-video-draft-result"
      workspaceLabel="Local Video Draft Result"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalVideoDraftTrialResultCapturePanel />
    </CodexForgeAppShell>
  );
}
