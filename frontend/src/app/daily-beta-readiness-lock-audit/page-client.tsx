"use client";

import { DailyBetaReadinessLockAuditPanel } from "@/lib/codexforge/daily-beta-readiness-lock-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaReadinessLockAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-readiness-lock-audit"
      workspaceLabel="Readiness Lock Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaReadinessLockAuditPanel />
    </CodexForgeAppShell>
  );
}
