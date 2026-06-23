"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainPackCatalogPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-pack-catalog-preview"
      workspaceLabel="Domain Pack Catalog Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-pack-catalog-preview" />
    </CodexForgeAppShell>
  );
}
