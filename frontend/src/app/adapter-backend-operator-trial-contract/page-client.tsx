"use client";

import { AdapterBackendOperatorTrialContractPanel } from "@/lib/codexforge/adapter-backend-operator-trial-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterBackendOperatorTrialContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-backend-operator-trial-contract"
      workspaceLabel="Adapter Backend Operator Trial Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterBackendOperatorTrialContractPanel />
    </CodexForgeAppShell>
  );
}
