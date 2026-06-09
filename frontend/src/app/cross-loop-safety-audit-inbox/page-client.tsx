"use client";

import { CrossLoopSafetyAuditInboxPanel } from "@/lib/codexforge/cross-loop-safety-audit-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossLoopSafetyAuditInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-loop-safety-audit-inbox"
      workspaceLabel="Safety Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossLoopSafetyAuditInboxPanel />
    </CodexForgeAppShell>
  );
}
