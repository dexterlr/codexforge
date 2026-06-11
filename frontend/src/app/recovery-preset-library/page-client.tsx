"use client";

import { RecoveryPresetLibraryPanel } from "@/lib/codexforge/recovery-preset-library/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryPresetLibraryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-preset-library"
      workspaceLabel="Recovery Presets"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryPresetLibraryPanel />
    </CodexForgeAppShell>
  );
}
