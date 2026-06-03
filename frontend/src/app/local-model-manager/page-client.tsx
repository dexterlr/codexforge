"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalModelManagerPanel } from "@/lib/codexforge/local-model-manager/components";

export default function LocalModelManagerPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-model-manager" workspaceLabel="Local Models" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalModelManagerPanel />
    </CodexForgeAppShell>
  );
}
