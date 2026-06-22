"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealAuditCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-audit-capture-contract"
      workspaceLabel="Tiny Real Audit Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-audit-capture-contract" />
    </CodexForgeAppShell>
  );
}
