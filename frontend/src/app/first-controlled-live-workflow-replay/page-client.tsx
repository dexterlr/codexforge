"use client";

import { FirstControlledLiveWorkflowReplayPanel } from "@/lib/codexforge/first-controlled-live-workflow-replay/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-live-workflow-replay"
      workspaceLabel="Controlled Replay"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLiveWorkflowReplayPanel />
    </CodexForgeAppShell>
  );
}
