"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { WorkflowResultPersistencePanel } from "@/lib/codexforge/workflow-result-persistence/components";

export default function WorkflowResultsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workflow-results"
      workspaceLabel="Review workflow results"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-workflow-results-route="Workflow Results route imports/renders WorkflowResultPersistencePanel Review workflow results Capture what happened route failures prepare a clean handoff no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <WorkflowResultPersistencePanel />
    </CodexForgeAppShell>
  );
}
