"use client";

import { PatchResultCapturePanel } from "@/lib/codexforge/patch-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchResultCapturePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-result-capture"
      workspaceLabel="Patch Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchResultCapturePanel />
    </CodexForgeAppShell>
  );
}
