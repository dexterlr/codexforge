"use client";

import { LocalModelLiveCallGuardReviewPanel } from "@/lib/codexforge/local-model-live-call-guard-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-live-call-guard-review"
      workspaceLabel="Local Model Live Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelLiveCallGuardReviewPanel />
    </CodexForgeAppShell>
  );
}
