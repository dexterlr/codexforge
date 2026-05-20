"use client";

import { BlenderAdapterPreviewPanel } from "@/lib/codexforge/blender-adapter-preview/components/BlenderAdapterPreviewPanel";
import type { BlenderAdapterPreviewModel } from "@/lib/codexforge/blender-adapter-preview";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: BlenderAdapterPreviewModel;
};

export default function BlenderPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell activePath="/blender" workspaceLabel="Blender Adapter Preview" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false}>
      <BlenderAdapterPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
