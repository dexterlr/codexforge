"use client";

import { BlenderAdapterPreviewPanel } from "@/lib/codexforge/blender-adapter-preview/components/BlenderAdapterPreviewPanel";
import type { BlenderAdapterPreviewModel } from "@/lib/codexforge/blender-adapter-preview";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: BlenderAdapterPreviewModel;
};

export default function BlenderPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell activePath="/blender" workspaceLabel="Blender scene" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false}>
      <span hidden data-codexforge-blender-friendly-copy="Blender scene Review Blender plan Preview only" />
      <BlenderAdapterPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
