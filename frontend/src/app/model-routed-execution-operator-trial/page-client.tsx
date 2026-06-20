"use client";

import { ModelRoutedExecutionOperatorTrialPanel } from "@/lib/codexforge/model-routed-execution-operator-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRoutedExecutionOperatorTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-routed-execution-operator-trial"
      workspaceLabel="Model-Routed Execution Operator Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRoutedExecutionOperatorTrialPanel />
    </CodexForgeAppShell>
  );
}
