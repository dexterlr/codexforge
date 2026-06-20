"use client";

import { GuidedBuildEvidencePlanPanel } from "@/lib/codexforge/guided-build-evidence-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildEvidencePlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-evidence-plan"
      workspaceLabel="Guided Build Evidence Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildEvidencePlanPanel />
    </CodexForgeAppShell>
  );
}

