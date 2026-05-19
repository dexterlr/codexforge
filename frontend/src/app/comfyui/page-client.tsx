"use client";

import { ComfyUiAdapterPreviewPanel } from "@/lib/codexforge/comfyui-adapter-preview/components";
import type { ComfyUiAdapterPreviewModel } from "@/lib/codexforge/comfyui-adapter-preview";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: ComfyUiAdapterPreviewModel;
};

export default function ComfyUiPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell activePath="/comfyui" workspaceLabel="ComfyUI Adapter Preview" nextActionContext={{ hasCreativeWork: true }}>
      <ComfyUiAdapterPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}

