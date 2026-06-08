"use client";

import { OdysseusReferenceArchitectureSpikePanel } from "@/lib/codexforge/odysseus-reference-architecture-spike/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OdysseusReferenceArchitecturePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/odysseus-reference-architecture"
      workspaceLabel="Odysseus Reference Architecture"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OdysseusReferenceArchitectureSpikePanel />
    </CodexForgeAppShell>
  );
}
