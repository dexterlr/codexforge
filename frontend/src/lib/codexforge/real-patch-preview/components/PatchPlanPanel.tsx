import type { CSSProperties } from "react";
import type { RealPatchPreviewPlan } from "../real-patch-preview-types";

export function PatchPlanPanel({ plan }: { plan: RealPatchPreviewPlan | null }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-plan-panel="PatchPlanPanel renders deterministic patch plan no mutation approval boundary"
    >
      <div style={eyebrow}>Patch Plan</div>
      {plan ? (
        <>
          <strong style={title}>{plan.goal}</strong>
          <p style={copy}>{plan.currentBehaviorSummary}</p>
          <p style={copy}>{plan.proposedBehaviorSummary}</p>
          <div style={list}>
            {plan.steps.map((step) => (
              <div key={step.id} style={item}>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </div>
            ))}
          </div>
          <p style={copy}>{plan.approvalBoundary}</p>
        </>
      ) : (
        <p style={copy}>Plan appears after a preview is prepared.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 13, lineHeight: 1.35, overflowWrap: "anywhere" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 7 };
const item: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.18)", borderRadius: 8, display: "grid", gap: 4, fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere", padding: 8 };
