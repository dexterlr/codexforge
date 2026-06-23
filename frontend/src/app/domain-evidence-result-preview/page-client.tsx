"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainEvidenceResultPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-evidence-result-preview"
      workspaceLabel="Domain Evidence Result Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-evidence-result-preview" />
    </CodexForgeAppShell>
  );
}
