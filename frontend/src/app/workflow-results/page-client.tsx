"use client";

import {
  MAIN_PAGES_REVIEW_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
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
      <span hidden data-codexforge-workflow-results-route="Workflow Results route imports/renders WorkflowResultPersistencePanel Capture result Copy workflow handoff memory candidate optional reviewed raw export details lower Capture what happened route failures prepare a clean handoff no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <MainPagesGodTierUxHandoffRail
        eyebrow="premium command center"
        title="Workflow result command lane"
        summary="Results are handled as review packets: capture context, decide next action, and keep memory promotion or persistence explicit."
        links={MAIN_PAGES_REVIEW_LINKS}
        tone="review"
      />
      <MainPagesGodTierUxStatusRail title="Workflow result boundaries" tone="review" />
      <span hidden data-codexforge-workflow-results-run-history="Coding Trial trial result handoff option Workflow Results references Run History /run-history export and handoff can mention run history no auto-persistence" />
      <span hidden data-codexforge-workflow-results-trial-review="Workflow Results references Trial Review result handoff can link to /code-flow/trial-review when workflow kind is coding trial no auto-persistence Coding Flow Trial Review" />
      <span hidden data-codexforge-workflow-results-mvp="Apply Evidence /apply-evidence Validation Result Capture /validation-results Coding Flow Live Run /code-flow/live-run First Successful Coding Run /code-flow/successful-run Coding Flow MVP Release Audit /code-flow/release-audit consume/copy apply evidence validation result capture" />
      <WorkflowResultPersistencePanel />
    </CodexForgeAppShell>
  );
}
