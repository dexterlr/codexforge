"use client";

import { ModelRouterTrialCockpitPanel } from "@/lib/codexforge/model-router-trial-cockpit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterTrialCockpitPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-trial-cockpit"
      workspaceLabel="Model Router Trial Cockpit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterTrialCockpitPanel />
    </CodexForgeAppShell>
  );
}
