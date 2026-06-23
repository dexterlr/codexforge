"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainClassifierRunnerPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-classifier-runner-preview"
      workspaceLabel="Domain Classifier Runner Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-classifier-runner-preview" />
    </CodexForgeAppShell>
  );
}
