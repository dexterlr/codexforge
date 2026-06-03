"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { OllamaModelPullStatusPlannerPanel } from "@/lib/codexforge/ollama-model-pull-status-planner/components";

export default function OllamaModelPlannerPageClient() {
  return (
    <CodexForgeAppShell activePath="/ollama-model-planner" workspaceLabel="Ollama Planner" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <OllamaModelPullStatusPlannerPanel />
    </CodexForgeAppShell>
  );
}
