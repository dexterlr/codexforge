"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceCaptureFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-capture-failure-handling"
      workspaceLabel="Evidence Capture Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="evidence-capture-failure-handling" />
    </CodexForgeAppShell>
  );
}
