"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CreativePromptMemoryPanel } from "@/lib/codexforge/creative-prompt-memory/components";

export default function CreativeMemoryPageClient() {
  return (
    <CodexForgeAppShell activePath="/creative-memory" workspaceLabel="Creative Memory" nextActionContext={{ hasCreativeWork: true, hasMemoryReview: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CreativePromptMemoryPanel />
    </CodexForgeAppShell>
  );
}
