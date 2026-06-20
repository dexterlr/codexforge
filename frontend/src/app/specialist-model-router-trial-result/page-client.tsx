"use client";

import { SpecialistModelRouterTrialResultPanel } from "@/lib/codexforge/specialist-model-router-trial-result/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistModelRouterTrialResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-model-router-trial-result"
      workspaceLabel="Specialist Model Router Trial Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistModelRouterTrialResultPanel />
    </CodexForgeAppShell>
  );
}
