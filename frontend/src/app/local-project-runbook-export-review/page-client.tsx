"use client";

import { LocalProjectRunbookExportReviewPanel } from "@/lib/codexforge/local-project-runbook-export-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalProjectRunbookExportReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-project-runbook-export-review"
      workspaceLabel="Runbook Export"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalProjectRunbookExportReviewPanel />
    </CodexForgeAppShell>
  );
}
