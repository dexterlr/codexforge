"use client";

import { ResearchSummaryDraftBuilderPanel } from "@/lib/codexforge/research-summary-draft-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchSummaryDraftBuilderPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-summary-draft-builder"
      workspaceLabel="Research Summary Draft Builder"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchSummaryDraftBuilderPanel />
    </CodexForgeAppShell>
  );
}
