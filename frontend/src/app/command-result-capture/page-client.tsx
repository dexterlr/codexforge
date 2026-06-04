"use client";

import { CommandResultCapturePanel } from "@/lib/codexforge/command-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandResultCapturePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-result-capture"
      workspaceLabel="Command Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandResultCapturePanel />
    </CodexForgeAppShell>
  );
}
