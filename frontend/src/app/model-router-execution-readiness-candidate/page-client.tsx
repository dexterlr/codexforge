"use client";

import { ModelRouterExecutionReadinessCandidatePanel } from "@/lib/codexforge/model-router-execution-readiness-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterExecutionReadinessCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-execution-readiness-candidate"
      workspaceLabel="Model Router Execution Readiness Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterExecutionReadinessCandidatePanel />
    </CodexForgeAppShell>
  );
}
