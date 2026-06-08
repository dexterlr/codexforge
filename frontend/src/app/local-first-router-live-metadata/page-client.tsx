"use client";

import { LocalFirstRouterDryRunLiveMetadataIntegrationPanel } from "@/lib/codexforge/local-first-router-dry-run-live-metadata-integration/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalFirstRouterLiveMetadataPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-first-router-live-metadata"
      workspaceLabel="Router Metadata"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalFirstRouterDryRunLiveMetadataIntegrationPanel />
    </CodexForgeAppShell>
  );
}
