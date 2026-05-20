"use client";

import { HealthPanel, titleStyle } from "./shared";

export function LocalBridgeHealthEmptyState({ reason }: { reason: string }) {
  return (
    <HealthPanel marker="LocalBridgeHealthEmptyState renders">
      <h2 style={titleStyle}>Local Bridge Health Unavailable</h2>
      <p style={{ margin: 0, color: "#cbd5e1", overflowWrap: "break-word" }}>{reason}</p>
    </HealthPanel>
  );
}
