"use client";

import { ProviderLiveCallGuardReviewPanel } from "@/lib/codexforge/provider-live-call-guard-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-live-call-guard-review"
      workspaceLabel="Provider Live Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLiveCallGuardReviewPanel />
    </CodexForgeAppShell>
  );
}
