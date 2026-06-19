"use client";

import { ModelTaskClassificationMatrixPanel } from "@/lib/codexforge/model-task-classification-matrix/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelTaskClassificationMatrixPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-task-classification-matrix"
      workspaceLabel="Model Task Classification Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelTaskClassificationMatrixPanel />
    </CodexForgeAppShell>
  );
}
