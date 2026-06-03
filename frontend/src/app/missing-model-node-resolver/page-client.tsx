"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { MissingModelNodeResolverPanel } from "@/lib/codexforge/missing-model-node-resolver/components";

export default function MissingModelNodeResolverPageClient() {
  return (
    <CodexForgeAppShell activePath="/missing-model-node-resolver" workspaceLabel="Missing Items" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <MissingModelNodeResolverPanel />
    </CodexForgeAppShell>
  );
}
