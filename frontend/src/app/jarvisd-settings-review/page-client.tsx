"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdSettingsExportImportReviewPanel } from "@/lib/codexforge/jarvisd-settings-export-import-review/components";

export default function JarvisdSettingsReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-settings-review"
      workspaceLabel="Jarvisd Settings"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdSettingsExportImportReviewPanel />
    </CodexForgeAppShell>
  );
}
