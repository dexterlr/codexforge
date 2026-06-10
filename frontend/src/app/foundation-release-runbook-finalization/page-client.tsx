"use client";

import { FoundationReleaseRunbookFinalizationPanel } from "@/lib/codexforge/foundation-release-runbook-finalization/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FoundationReleaseRunbookFinalizationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/foundation-release-runbook-finalization"
      workspaceLabel="Release Runbook"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FoundationReleaseRunbookFinalizationPanel />
    </CodexForgeAppShell>
  );
}
