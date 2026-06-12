"use client";

import { ProviderPermissionPresetsPanel } from "@/lib/codexforge/provider-permission-presets/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderPermissionPresetsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-permission-presets"
      workspaceLabel="Provider Permissions"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderPermissionPresetsPanel />
    </CodexForgeAppShell>
  );
}
