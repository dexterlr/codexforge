"use client";

import { ModelRoutedExecutionValidationReviewPanel } from "@/lib/codexforge/model-routed-execution-validation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRoutedExecutionValidationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-routed-execution-validation-review"
      workspaceLabel="Model-Routed Execution Validation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRoutedExecutionValidationReviewPanel />
    </CodexForgeAppShell>
  );
}
