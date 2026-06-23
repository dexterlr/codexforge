"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainRecoveryRoutePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-recovery-route-preview"
      workspaceLabel="Domain Recovery Route Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-recovery-route-preview" />
    </CodexForgeAppShell>
  );
}
