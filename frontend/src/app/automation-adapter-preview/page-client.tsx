"use client";

import { AutomationAdapterPreviewPanel } from "@/lib/codexforge/automation-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-adapter-preview"
      workspaceLabel="Automation Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
