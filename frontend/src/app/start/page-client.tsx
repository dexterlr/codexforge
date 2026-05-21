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
      <span hidden data-codexforge-start-product-simplification-preserved={`ProductSimplificationPanel ${initialData.recommendedNextAction}`} />
      <WorkflowWizard />
    </CodexForgeAppShell>
  );
}
