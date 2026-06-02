"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealApprovedComfyUiSubmitTrialPanel } from "@/lib/codexforge/real-approved-comfyui-submit-trial/components";

export default function ComfyUiSubmitTrialPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-submit-trial" workspaceLabel="ComfyUI Submit Trial" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealApprovedComfyUiSubmitTrialPanel />
    </CodexForgeAppShell>
  );
}
