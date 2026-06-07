"use client";

import { PatchApplyResultCapturePanel } from "@/lib/codexforge/patch-apply-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchApplyResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-apply-result"
      workspaceLabel="Patch Apply Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchApplyResultCapturePanel />
    </CodexForgeAppShell>
  );
}
