"use client";

import { ComfyUiAdapterPreviewPanel } from "@/lib/codexforge/comfyui-adapter-preview/components";
import type { ComfyUiAdapterPreviewModel } from "@/lib/codexforge/comfyui-adapter-preview";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: ComfyUiAdapterPreviewModel;
};

export default function ComfyUiPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell activePath="/comfyui" workspaceLabel="ComfyUI workflow" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false}>
      <span hidden data-codexforge-comfyui-friendly-copy="ComfyUI workflow Review ComfyUI plan Preview only" />
      <ComfyUiAdapterPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
