"use client";

import { LocalModelLiveOutputCaptureReviewPanel } from "@/lib/codexforge/local-model-live-output-capture-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-live-output-capture-review"
      workspaceLabel="Local Output Capture"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelLiveOutputCaptureReviewPanel />
    </CodexForgeAppShell>
  );
}
