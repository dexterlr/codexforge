"use client";

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
      <span hidden data-codexforge-start-product-simplification-preserved={`ProductSimplificationPanel ${initialData.recommendedNextAction} Try coding flow Coding Trial /code-flow/trial Review trial run /code-flow/trial-review Review run history /run-history route handoff includes /run-history Workflow Wizard references Trial Review after Coding Trial`} />
      <WorkflowWizard />
    </CodexForgeAppShell>
  );
}
