"use client";

import { BuildPlanValidationManifestPacketPanel } from "@/lib/codexforge/build-plan-validation-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanValidationManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-validation-manifest-packet"
      workspaceLabel="Build Plan Validation Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanValidationManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
