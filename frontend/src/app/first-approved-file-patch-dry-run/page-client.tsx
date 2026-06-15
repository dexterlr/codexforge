"use client";

import { FirstApprovedFilePatchDryRunPanel } from "@/lib/codexforge/first-approved-file-patch-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedFilePatchDryRunPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-file-patch-dry-run"
      workspaceLabel="File Patch Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedFilePatchDryRunPanel />
    </CodexForgeAppShell>
  );
}
