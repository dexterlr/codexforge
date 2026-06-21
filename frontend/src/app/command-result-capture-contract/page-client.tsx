"use client";

import { CommandResultCaptureContractPanel } from "@/lib/codexforge/command-result-capture-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandResultCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-result-capture-contract"
      workspaceLabel="Command Result Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandResultCaptureContractPanel />
    </CodexForgeAppShell>
  );
}
