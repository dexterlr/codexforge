"use client";

import { UnrealAdapterPreviewPanel } from "@/lib/codexforge/unreal-adapter-preview/components/UnrealAdapterPreviewPanel";
import type { UnrealAdapterPreviewModel } from "@/lib/codexforge/unreal-adapter-preview";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: UnrealAdapterPreviewModel;
};

export default function UnrealPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell activePath="/unreal" workspaceLabel="Unreal cinematic" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <span hidden data-codexforge-unreal-friendly-copy="Unreal cinematic Review Unreal plan Preview only" />
      <UnrealAdapterPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
