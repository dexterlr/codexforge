"use client";

import { FileWriteApplyHoldPanel } from "@/lib/codexforge/file-write-apply-hold/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteApplyHoldPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-apply-hold"
      workspaceLabel="File Write Apply Hold"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteApplyHoldPanel />
    </CodexForgeAppShell>
  );
}
