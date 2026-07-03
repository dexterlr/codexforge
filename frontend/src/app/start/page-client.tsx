"use client";

import {
  MAIN_PAGES_START_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxReviewBoundaryPanel,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { ProductSimplificationSummary } from "@/lib/codexforge/product-simplification";
import { WorkflowWizard } from "@/lib/codexforge/workflow-wizard/components";

type StartPageClientProps = {
  initialData: ProductSimplificationSummary;
};

export default function StartPageClient({ initialData }: StartPageClientProps) {
  return (
    <CodexForgeAppShell
      activePath="/start"
      workspaceLabel="Start"
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-start-product-simplification-preserved={`ProductSimplificationPanel ${initialData.recommendedNextAction} Fix code clear /code-flow guided option /code-flow/live-run locked MVP path /code-flow/mvp-path Run manual coding trial /code-flow/manual-trial Run real coding MVP trial /code-flow/real-trial Manual product trial /product-trial Demo the coding MVP /demo Audit coding MVP /code-flow/release-audit Coding MVP RC /code-flow/rc Choose a workflow Coding Trial secondary /code-flow/trial Review trial run /code-flow/trial-review Coding UX Fixes /code-flow/ux-fixes advanced routes secondary Review run history /run-history route handoff includes /run-history Workflow Wizard references Trial Review after Coding Trial`} />
      <MainPagesGodTierUxHandoffRail
        eyebrow="Main Pages God Tier UX Upgrade"
        title="Choose the next safe operator path"
        summary="Start keeps the first workflow focused: pick a path, review the handoff, and keep protected actions behind explicit gates."
        links={MAIN_PAGES_START_LINKS}
        tone="workflow"
      />
      <MainPagesGodTierUxReviewBoundaryPanel title="Start page review-only safety boundary" />
      <WorkflowWizard />
    </CodexForgeAppShell>
  );
}
