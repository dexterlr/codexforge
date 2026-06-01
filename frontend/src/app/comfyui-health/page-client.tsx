"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiLocalHealthPanel } from "@/lib/codexforge/comfyui-local-health-check/components";

export default function ComfyUiHealthPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-health" workspaceLabel="ComfyUI Health" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiLocalHealthPanel />
    </CodexForgeAppShell>
  );
}
