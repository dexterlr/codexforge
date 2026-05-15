import type { CSSProperties } from "react";
import type { TaskAutopilotRiskPolicy } from "@/lib/codexforge/task-autopilot";

export function TaskRiskPolicyPanel({ policy }: { policy: TaskAutopilotRiskPolicy }) {
  return (
    <section style={panel} data-codexforge-task-risk-policy-panel>
      <div style={eyebrow}>Risk policy</div>
      <strong style={title}>Policy blocks auto-run and direct graph mutation</strong>
      <div style={grid}>
        {policy.rules.map((rule) => (
          <div key={rule.id} style={ruleCard}>
            <span style={pill}>{rule.state}</span>
            <strong>{rule.label}</strong>
            <span style={body}>{rule.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gap: 8 };
const ruleCard: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.12)", paddingTop: 8, display: "grid", gap: 5, minWidth: 0 };
const pill: CSSProperties = { color: "#99f6e4", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
