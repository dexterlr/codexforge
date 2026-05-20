"use client";

import type { BridgeHealthNextActionPlan } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthList, HealthPanel, copyButton, pill, titleStyle } from "./shared";

export function BridgeHealthNextActionPanel({ plan, onCopy }: { plan: BridgeHealthNextActionPlan; onCopy: (label: string, text: string) => void }) {
  return (
    <HealthPanel marker="BridgeHealthNextActionPanel renders">
      <h2 style={titleStyle}>Next Action</h2>
      <span style={pill}>{plan.selected.id}</span>
      <strong>{plan.selected.label}</strong>
      <p style={{ margin: 0, color: "#cbd5e1", overflowWrap: "break-word" }}>{plan.selected.reason}</p>
      <button type="button" style={copyButton} onClick={() => onCopy("Copy selected next action", plan.selected.copyPrompt)}>Copy selected next action</button>
      <HealthList title="Next action summary" items={plan.summary} />
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {plan.candidates.map((action, index) => (
          <span key={buildLocalBridgeHealthReactKey("action", action.id, index)} style={{ color: "#cbd5e1", overflowWrap: "break-word" }}>{action.label}: {action.reason}</span>
        ))}
      </div>
    </HealthPanel>
  );
}
