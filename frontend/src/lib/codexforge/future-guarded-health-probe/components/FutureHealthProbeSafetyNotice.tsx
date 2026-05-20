"use client";

import { ProbePanel, ProbeList } from "./shared";

export function FutureHealthProbeSafetyNotice() {
  return (
    <ProbePanel title="Safety Boundary" marker="FutureHealthProbeSafetyNotice renders metadata-only manual-first no creative job execution no render execution no arbitrary command no arbitrary endpoint no file writes preserve latest-message authority">
      <ProbeList
        title="Guardrails"
        items={[
          "Future Guarded Health Probe is metadata-only or manual-first by default.",
          "No creative job execution, no render execution, no local app launch, no file writes.",
          "No arbitrary command, no arbitrary endpoint, no provider API call, and no automatic persistence.",
          "Preserve latest-message authority before accepting supplied manual evidence.",
        ]}
      />
    </ProbePanel>
  );
}
