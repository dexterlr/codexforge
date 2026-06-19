"use client";

import { AdapterBackendAuditContractPanel } from "@/lib/codexforge/adapter-backend-audit-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterBackendAuditContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-backend-audit-contract"
      workspaceLabel="Adapter Backend Audit Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterBackendAuditContractPanel />
    </CodexForgeAppShell>
  );
}
