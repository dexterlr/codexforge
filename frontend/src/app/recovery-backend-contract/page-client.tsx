"use client";

import { RecoveryBackendContractPanel } from "@/lib/codexforge/recovery-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-backend-contract"
      workspaceLabel="Recovery Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryBackendContractPanel />
    </CodexForgeAppShell>
  );
}
