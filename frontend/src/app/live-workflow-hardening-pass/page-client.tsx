"use client";

import { LiveWorkflowHardeningPassPanel } from "@/lib/codexforge/live-workflow-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-workflow-hardening-pass"
      workspaceLabel="Live Hardening Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveWorkflowHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
