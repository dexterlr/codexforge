"use client";

import { CodebaseChangePlanLiveContextIntegrationPanel } from "@/lib/codexforge/codebase-change-plan-live-context-integration/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ChangePlanLiveContextPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/change-plan-live-context"
      workspaceLabel="Plan Context"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodebaseChangePlanLiveContextIntegrationPanel />
    </CodexForgeAppShell>
  );
}
