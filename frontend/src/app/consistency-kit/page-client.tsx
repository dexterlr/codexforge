"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CharacterBrandConsistencyKitPanel } from "@/lib/codexforge/character-brand-consistency-kit/components";

export default function ConsistencyKitPageClient() {
  return (
    <CodexForgeAppShell activePath="/consistency-kit" workspaceLabel="Consistency Kit" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CharacterBrandConsistencyKitPanel />
    </CodexForgeAppShell>
  );
}
