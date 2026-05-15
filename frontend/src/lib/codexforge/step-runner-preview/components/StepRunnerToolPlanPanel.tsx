import type { CSSProperties } from "react";
import type { StepRunnerToolPlan } from "../step-runner-preview-types";

export function StepRunnerToolPlanPanel({ toolPlan }: { toolPlan: StepRunnerToolPlan }) {
  return (
    <section
      style={panel}
      data-codexforge-step-runner-tool-plan-panel="StepRunnerToolPlanPanel renders read-file list-files search-project read-only write-file apply-diff run-command run-tests build-web-app broker-execution blocked"
    >
      <div style={eyebrow}>Tool Plan</div>
      <h2 style={heading}>Proposed tool posture: {toolPlan.proposedTool.mode}</h2>
      <article style={proposed}>
        <strong style={toolName}>{toolPlan.proposedTool.toolName}</strong>
        <p style={body}>{toolPlan.proposedTool.reason}</p>
        <p style={muted}>{toolPlan.proposedTool.sideEffectSummary}</p>
        <p style={muted}>Safe alternative: {toolPlan.proposedTool.safeAlternative}</p>
      </article>
      <div style={grid}>
        {toolPlan.tools.map((tool) => (
          <article key={tool.id} style={toolCard}>
            <div style={rowTop}>
              <strong style={toolName}>{tool.toolName}</strong>
              <span style={posture}>{tool.mode}</span>
            </div>
            <p style={body}>{tool.reason}</p>
            <p style={muted}>
              Approval: {tool.approvalRequired ? tool.requiredApprovalLabel ?? "required" : "not required"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const proposed: CSSProperties = { border: "1px solid rgba(45,212,191,0.26)", background: "rgba(20,184,166,0.10)", borderRadius: 8, padding: 11, display: "grid", gap: 6, minWidth: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 9, minWidth: 0 };
const toolCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 11, display: "grid", gap: 7, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" };
const toolName: CSSProperties = { fontSize: 13, color: "#f8fafc", overflowWrap: "anywhere" };
const posture: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere" };
