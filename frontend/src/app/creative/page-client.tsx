"use client";

import { CreativeProductionStudio } from "@/lib/codexforge/creative/components/CreativeProductionStudio";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { CreativeContext } from "@/lib/codexforge/creative";

type CreativePageClientProps = {
  initialData: CreativeContext;
};

export default function CreativePageClient({ initialData }: CreativePageClientProps) {
  return (
    <CodexForgeAppShell activePath="/creative" workspaceLabel="Plan creative work" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false}>
      <span hidden data-codexforge-creative-friendly-copy="Plan creative work Blender scene ComfyUI image workflow Unreal cinematic Video render plan Artifact review advanced adapter details secondary Preview only" />
      <CreativeProductionStudio context={initialData} />
    </CodexForgeAppShell>
  );
}
