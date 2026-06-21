"use client";

import { CommandEvidenceCaptureContractPanel } from "@/lib/codexforge/command-evidence-capture-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandEvidenceCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-evidence-capture-contract"
      workspaceLabel="Command Evidence Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandEvidenceCaptureContractPanel />
    </CodexForgeAppShell>
  );
}
