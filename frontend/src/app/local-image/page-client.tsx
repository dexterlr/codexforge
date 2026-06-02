"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalImageGenerationMvpPanel } from "@/lib/codexforge/local-image-generation-mvp/components";

export default function LocalImagePageClient() {
  return (
    <CodexForgeAppShell activePath="/local-image" workspaceLabel="Local Image MVP" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalImageGenerationMvpPanel />
    </CodexForgeAppShell>
  );
}
