"use client";

import { DailyBetaOneActivationLockAuditPanel } from "@/lib/codexforge/daily-beta-1-activation-lock-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationLockAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-lock-audit"
      workspaceLabel="Daily Beta 1 Activation Lock Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationLockAuditPanel />
    </CodexForgeAppShell>
  );
}
