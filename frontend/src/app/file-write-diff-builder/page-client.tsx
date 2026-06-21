"use client";

import { FileWriteDiffBuilderPanel } from "@/lib/codexforge/file-write-diff-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteDiffBuilderPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-diff-builder"
      workspaceLabel="File Write Diff Builder"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteDiffBuilderPanel />
    </CodexForgeAppShell>
  );
}
