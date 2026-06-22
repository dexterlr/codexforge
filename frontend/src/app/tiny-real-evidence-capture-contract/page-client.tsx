"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealEvidenceCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-evidence-capture-contract"
      workspaceLabel="Tiny Real Evidence Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-evidence-capture-contract" />
    </CodexForgeAppShell>
  );
}
