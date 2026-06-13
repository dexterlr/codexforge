"use client";

import { ProviderLiveResponseCaptureReviewPanel } from "@/lib/codexforge/provider-live-response-capture-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-live-response-capture-review"
      workspaceLabel="Provider Response Capture"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLiveResponseCaptureReviewPanel />
    </CodexForgeAppShell>
  );
}
