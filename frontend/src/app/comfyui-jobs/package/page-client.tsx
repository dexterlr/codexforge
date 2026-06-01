"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiJobPackageBuilderPanel } from "@/lib/codexforge/comfyui-job-package-builder/components";

export default function ComfyUiJobPackagePageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-jobs/package" workspaceLabel="ComfyUI Job Package" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiJobPackageBuilderPanel />
    </CodexForgeAppShell>
  );
}
