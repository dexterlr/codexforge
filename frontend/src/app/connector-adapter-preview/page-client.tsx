"use client";

import { ConnectorAdapterPreviewPanel } from "@/lib/codexforge/connector-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-adapter-preview"
      workspaceLabel="Connector Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
