"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalFirstRouterDryRunPanel } from "@/lib/codexforge/local-first-router-dry-run/components";

export default function LocalFirstRouterDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-first-router-dry-run"
      workspaceLabel="Router Dry Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalFirstRouterDryRunPanel />
    </CodexForgeAppShell>
  );
}
