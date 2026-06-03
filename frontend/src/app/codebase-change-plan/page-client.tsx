"use client";

import { CodebaseChangePlanBuilderPanel } from "@/lib/codexforge/codebase-change-plan-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodebaseChangePlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codebase-change-plan"
      workspaceLabel="Change Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodebaseChangePlanBuilderPanel />
    </CodexForgeAppShell>
  );
}
