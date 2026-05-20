"use client";

import type { BridgeHealthProfile } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthPanel, grid, pill, titleStyle } from "./shared";

export function BridgeHealthProfilePanel({ profiles }: { profiles: BridgeHealthProfile[] }) {
  return (
    <HealthPanel marker="BridgeHealthProfilePanel renders">
      <h2 style={titleStyle}>Health Profiles</h2>
      <div style={grid}>
        {profiles.map((profile, index) => (
          <article key={buildLocalBridgeHealthReactKey("profile", profile.id, index)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span style={pill}>{profile.readinessStatus}</span>
            <strong>{profile.label}</strong>
            <span>Configured: {String(profile.configured)}</span>
            <span style={{ color: "#cbd5e1", overflowWrap: "break-word" }}>Missing: {profile.missingConfiguration.join(", ") || "none"}</span>
            <span style={{ color: "#bfdbfe", overflowWrap: "break-word" }}>{profile.safetyNote}</span>
          </article>
        ))}
      </div>
    </HealthPanel>
  );
}
