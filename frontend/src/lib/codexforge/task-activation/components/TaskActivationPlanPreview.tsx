import type { CSSProperties } from "react";
import type { ActivatedTaskPlan } from "@/lib/codexforge/task-activation";

export function TaskActivationPlanPreview({ plan }: { plan: ActivatedTaskPlan | null }) {
  return (
    <section style={panel} data-codexforge-task-activation-plan-preview>
      <div style={eyebrow}>Active task plan preview</div>
      <h2 style={heading}>{plan ? plan.goal : "Preview requires explicit approval"}</h2>
      <p style={body}>
        {plan
          ? `${plan.recommendedFirstAction} ${plan.noRunGuarantee}`
          : "No active task is set silently. Preview the plan only after review approval."}
      </p>
      <div style={steps}>
        {(plan?.steps ?? []).map((step) => (
          <div key={step.id} style={stepCard}>
            <span style={pill}>{step.gate}</span>
            <strong style={stepTitle}>{step.label}</strong>
            <span style={body}>{step.text}</span>
            <span style={detail}>{step.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(8,13,24,0.82)", borderRadius: 8, padding: 16, display: "grid", gap: 11, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const detail: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere" };
const steps: CSSProperties = { display: "grid", gap: 8 };
const stepCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.46)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const pill: CSSProperties = { color: "#bae6fd", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const stepTitle: CSSProperties = { overflowWrap: "anywhere" };
