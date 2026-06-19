"use client";

import { ModelOutputEvidencePacketPanel } from "@/lib/codexforge/model-output-evidence-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelOutputEvidencePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-output-evidence-packet"
      workspaceLabel="Model Output Evidence Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelOutputEvidencePacketPanel />
    </CodexForgeAppShell>
  );
}
