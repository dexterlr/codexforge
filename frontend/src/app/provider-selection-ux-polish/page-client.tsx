"use client";

import { ProviderSelectionUxPolishPanel } from "@/lib/codexforge/provider-selection-ux-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderSelectionUxPolishPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-selection-ux-polish"
      workspaceLabel="Provider Selection"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderSelectionUxPolishPanel />
    </CodexForgeAppShell>
  );
}
