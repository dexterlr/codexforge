"use client";

import { ConnectorAdapterContractReviewPanel } from "@/lib/codexforge/connector-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-adapter-contract-review"
      workspaceLabel="Connector Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
