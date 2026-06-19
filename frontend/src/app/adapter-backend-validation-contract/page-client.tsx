"use client";

import { AdapterBackendValidationContractPanel } from "@/lib/codexforge/adapter-backend-validation-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterBackendValidationContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-backend-validation-contract"
      workspaceLabel="Adapter Backend Validation Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterBackendValidationContractPanel />
    </CodexForgeAppShell>
  );
}
