"use client";

import type { BridgeHealthCheckPlan } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthList, HealthPanel, pill, titleStyle } from "./shared";

export function BridgeHealthCheckPlanPanel({ plan }: { plan: BridgeHealthCheckPlan }) {
  return (
    <HealthPanel marker="BridgeHealthCheckPlanPanel renders">
      <h2 style={titleStyle}>Health Check Plan</h2>
      <HealthList title="Plan summary" items={plan.summary} />
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {plan.checks.map((check, index) => (
          <div key={buildLocalBridgeHealthReactKey("check", check.id, index)} style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: 10, alignItems: "start", minWidth: 0 }}>
            <span style={pill}>{check.status}</span>
            <span style={{ overflowWrap: "break-word" }}><strong>{check.label}</strong>: {check.detail}</span>
          </div>
        ))}
      </div>
    </HealthPanel>
  );
}
