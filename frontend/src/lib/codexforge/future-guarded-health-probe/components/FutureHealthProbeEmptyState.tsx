"use client";

import { ProbePanel } from "./shared";

export function FutureHealthProbeEmptyState({ reason }: { reason: string }) {
  return (
    <ProbePanel title="Health Probe Unavailable" marker="FutureHealthProbeEmptyState renders metadata-only manual-first">
      <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.5 }}>{reason}</p>
    </ProbePanel>
  );
}
