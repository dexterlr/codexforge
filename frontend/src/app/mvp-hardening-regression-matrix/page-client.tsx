"use client";

import { MvpHardeningRegressionMatrixPanel } from "@/lib/codexforge/mvp-hardening-regression-matrix/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MvpHardeningRegressionMatrixPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/mvp-hardening-regression-matrix"
      workspaceLabel="Hardening Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MvpHardeningRegressionMatrixPanel />
    </CodexForgeAppShell>
  );
}
