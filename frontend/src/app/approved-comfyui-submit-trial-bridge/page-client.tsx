"use client";

import { ApprovedComfyUiSubmitTrialBridgePanel } from "@/lib/codexforge/approved-comfyui-submit-trial-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovedComfyUiSubmitTrialBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approved-comfyui-submit-trial-bridge"
      workspaceLabel="Approved ComfyUI Submit Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApprovedComfyUiSubmitTrialBridgePanel />
    </CodexForgeAppShell>
  );
}
