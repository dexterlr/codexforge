"use client";

import { MvpEndToEndGuidedTrialPanel } from "@/lib/codexforge/mvp-end-to-end-guided-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MvpEndToEndGuidedTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/mvp-end-to-end-guided-trial"
      workspaceLabel="Guided Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MvpEndToEndGuidedTrialPanel />
    </CodexForgeAppShell>
  );
}
