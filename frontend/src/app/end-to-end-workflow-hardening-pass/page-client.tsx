"use client";

import { EndToEndWorkflowHardeningPassPanel } from "@/lib/codexforge/end-to-end-workflow-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndWorkflowHardeningPassPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-workflow-hardening-pass"
      workspaceLabel="End-to-End Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndWorkflowHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
