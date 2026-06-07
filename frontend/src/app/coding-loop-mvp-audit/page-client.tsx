"use client";

import { CodingLoopMvpAuditPanel } from "@/lib/codexforge/coding-loop-mvp-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodingLoopMvpAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/coding-loop-mvp-audit"
      workspaceLabel="Coding Loop MVP Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodingLoopMvpAuditPanel />
    </CodexForgeAppShell>
  );
}
