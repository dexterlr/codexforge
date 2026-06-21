"use client";

import { FileWritePathGuardPanel } from "@/lib/codexforge/file-write-path-guard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWritePathGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-path-guard"
      workspaceLabel="File Write Path Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWritePathGuardPanel />
    </CodexForgeAppShell>
  );
}
