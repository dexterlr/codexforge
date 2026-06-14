"use client";

import { UnifiedSettingsPreferencesReviewPanel } from "@/lib/codexforge/unified-settings-preferences-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-settings-preferences-review"
      workspaceLabel="Settings Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedSettingsPreferencesReviewPanel />
    </CodexForgeAppShell>
  );
}
