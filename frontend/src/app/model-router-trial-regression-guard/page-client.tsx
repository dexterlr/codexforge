"use client";

import { ModelRouterTrialRegressionGuardPanel } from "@/lib/codexforge/model-router-trial-regression-guard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterTrialRegressionGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-trial-regression-guard"
      workspaceLabel="Model Router Trial Regression Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterTrialRegressionGuardPanel />
    </CodexForgeAppShell>
  );
}
