"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVideoDraftMvpPanel } from "@/lib/codexforge/local-video-draft-mvp/components";

export default function LocalVideoDraftPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-video-draft" workspaceLabel="Local Video Draft MVP" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalVideoDraftMvpPanel />
    </CodexForgeAppShell>
  );
}
