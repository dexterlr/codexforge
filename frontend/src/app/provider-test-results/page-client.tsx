"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderTestResultCapturePanel } from "@/lib/codexforge/provider-test-result-capture/components";

export default function ProviderTestResultsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-test-results"
      workspaceLabel="Provider Results"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderTestResultCapturePanel />
    </CodexForgeAppShell>
  );
}
