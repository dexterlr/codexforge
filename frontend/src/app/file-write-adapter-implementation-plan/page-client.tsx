"use client";

import { FileWriteAdapterImplementationPlanPanel } from "@/lib/codexforge/file-write-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-adapter-implementation-plan"
      workspaceLabel="File Write Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
