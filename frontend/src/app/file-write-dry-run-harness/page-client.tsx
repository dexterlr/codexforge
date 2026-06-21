"use client";

import { FileWriteDryRunHarnessPanel } from "@/lib/codexforge/file-write-dry-run-harness/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteDryRunHarnessPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-dry-run-harness"
      workspaceLabel="File Write Dry Run Harness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteDryRunHarnessPanel />
    </CodexForgeAppShell>
  );
}
