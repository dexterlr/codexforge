"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AuditCaptureFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/audit-capture-failure-handling"
      workspaceLabel="Audit Capture Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="audit-capture-failure-handling" />
    </CodexForgeAppShell>
  );
}
