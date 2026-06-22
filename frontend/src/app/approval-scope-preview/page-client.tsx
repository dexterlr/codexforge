"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalScopePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-scope-preview"
      workspaceLabel="Approval Scope Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="approval-scope-preview" />
    </CodexForgeAppShell>
  );
}
