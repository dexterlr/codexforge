"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ShotLibraryReuseSystemPanel } from "@/lib/codexforge/shot-library-reuse-system/components";

export default function ShotLibraryPageClient() {
  return (
    <CodexForgeAppShell activePath="/shot-library" workspaceLabel="Shot Library" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ShotLibraryReuseSystemPanel />
    </CodexForgeAppShell>
  );
}
