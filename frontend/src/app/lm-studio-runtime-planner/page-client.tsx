"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LmStudioRuntimePlannerPanel } from "@/lib/codexforge/lm-studio-runtime-planner/components";

export default function LmStudioRuntimePlannerPageClient() {
  return (
    <CodexForgeAppShell activePath="/lm-studio-runtime-planner" workspaceLabel="LM Studio" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LmStudioRuntimePlannerPanel />
    </CodexForgeAppShell>
  );
}
