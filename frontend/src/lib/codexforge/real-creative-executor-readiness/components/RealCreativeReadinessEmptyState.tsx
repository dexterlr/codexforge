"use client";

import { ReadinessPanel, body } from "./shared";

export function RealCreativeReadinessEmptyState({ reason = "Readiness audit metadata is missing." }: { reason?: string }) {
  return (
    <ReadinessPanel title="Empty State" marker="RealCreativeReadinessEmptyState renders audit-only no execution">
      <p style={body}>{reason}</p>
    </ReadinessPanel>
  );
}
