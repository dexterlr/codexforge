"use client";

import { GuidedBuildArchitectureSketchPanel } from "@/lib/codexforge/guided-build-architecture-sketch/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildArchitectureSketchPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-architecture-sketch"
      workspaceLabel="Guided Build Architecture Sketch"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildArchitectureSketchPanel />
    </CodexForgeAppShell>
  );
}

