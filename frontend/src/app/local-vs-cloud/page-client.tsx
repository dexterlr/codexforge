"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVsCloudDecisionExplainerPanel } from "@/lib/codexforge/local-vs-cloud-decision-explainer/components";

export default function LocalVsCloudPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-vs-cloud" workspaceLabel="Local vs Cloud" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalVsCloudDecisionExplainerPanel />
    </CodexForgeAppShell>
  );
}
