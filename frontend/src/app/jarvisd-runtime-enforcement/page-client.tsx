"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdPermissionRuntimeEnforcementPanel } from "@/lib/codexforge/jarvisd-permission-runtime-enforcement/components";

export default function JarvisdRuntimeEnforcementPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-runtime-enforcement"
      workspaceLabel="Jarvisd Runtime Enforcement"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdPermissionRuntimeEnforcementPanel />
    </CodexForgeAppShell>
  );
}
