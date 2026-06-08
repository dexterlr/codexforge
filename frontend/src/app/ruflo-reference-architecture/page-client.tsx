"use client";

import { RufloReferenceArchitectureSpikePanel } from "@/lib/codexforge/ruflo-reference-architecture-spike/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RufloReferenceArchitecturePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/ruflo-reference-architecture"
      workspaceLabel="Ruflo Reference Architecture"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RufloReferenceArchitectureSpikePanel />
    </CodexForgeAppShell>
  );
}
