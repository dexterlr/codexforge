"use client";

import type { SandboxNextActionPlan } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function SandboxNextActionPanel({ plan }: { plan: SandboxNextActionPlan }) {
  return (
    <SandboxPanel marker="SandboxNextActionPanel renders">
      <h2 style={titleStyle}>Next Action</h2>
      <span style={pill}>{plan.selected.actionId}</span>
      <strong style={safeText}>{plan.selected.label}</strong>
      <p style={{ margin: 0, color: "#cbd5e1", ...safeText }}>{plan.selected.reason}</p>
      <a href={plan.selected.route} style={{ color: "#ccfbf1", fontWeight: 900, textDecoration: "none", ...safeText }}>
        Open selected route
      </a>
      <div style={{ display: "grid", gap: 7, minWidth: 0 }}>
        {plan.candidates.map((action) => (
          <span key={buildCreativeExecutionSandboxReactKey("next-action", action.actionId)} style={{ color: "#cbd5e1", ...safeText }}>
            {action.label}: {action.reason}
          </span>
        ))}
      </div>
      <SandboxList title="Next action summary" items={plan.summary} />
    </SandboxPanel>
  );
}
