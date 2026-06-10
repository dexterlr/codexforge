"use client";

import { FailureRecoveryPlaybookFinalizationPanel } from "@/lib/codexforge/failure-recovery-playbook-finalization/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FailureRecoveryPlaybookFinalizationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/failure-recovery-playbook-finalization"
      workspaceLabel="Recovery Playbook"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FailureRecoveryPlaybookFinalizationPanel />
    </CodexForgeAppShell>
  );
}
