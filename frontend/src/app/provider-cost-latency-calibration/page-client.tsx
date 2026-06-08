"use client";

import { ProviderCostLatencyResultCalibrationPanel } from "@/lib/codexforge/provider-cost-latency-result-calibration/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderCostLatencyCalibrationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-cost-latency-calibration"
      workspaceLabel="Cost Calibration"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderCostLatencyResultCalibrationPanel />
    </CodexForgeAppShell>
  );
}
