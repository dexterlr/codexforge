"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderSettingsExportImportReviewPanel } from "@/lib/codexforge/provider-settings-export-import-review/components";

export default function ProviderSettingsReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-settings-review"
      workspaceLabel="Settings Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderSettingsExportImportReviewPanel />
    </CodexForgeAppShell>
  );
}
