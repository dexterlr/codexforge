"use client";

import { SecretsTokenStorageRegressionSweepPanel } from "@/lib/codexforge/secrets-token-storage-regression-sweep/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SecretsTokenStorageRegressionSweepPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/secrets-token-storage-regression-sweep"
      workspaceLabel="Secrets Sweep"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SecretsTokenStorageRegressionSweepPanel />
    </CodexForgeAppShell>
  );
}
