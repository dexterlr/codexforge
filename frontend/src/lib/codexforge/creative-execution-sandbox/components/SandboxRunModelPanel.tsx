"use client";

import type { SandboxRunModel } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxMetric, SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function SandboxRunModelPanel({ runModel }: { runModel: SandboxRunModel }) {
  return (
    <SandboxPanel marker="SandboxRunModelPanel renders">
      <h2 style={titleStyle}>Run Model</h2>
      <span style={pill}>simulation-only</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 }}>
        <SandboxMetric label="Run" value={runModel.runId} />
        <SandboxMetric label="Risk" value={runModel.riskPosture} />
        <SandboxMetric label="Review" value={runModel.reviewRequired ? "required" : "not required" } />
      </div>
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {runModel.lifecycleSteps.map((step) => (
          <article key={buildCreativeExecutionSandboxReactKey("run-step", step.stepId, step.order)} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 }}>
            <strong style={safeText}>{step.order}. {step.label}</strong>
            <span style={pill}>{step.status}</span>
            <span style={{ color: "#cbd5e1", ...safeText }}>{step.detail}</span>
            <span style={{ color: "#99f6e4", fontSize: 12, ...safeText }}>{step.sideEffectSummary}</span>
          </article>
        ))}
      </div>
      <SandboxList title="Run model summary" items={runModel.summary} />
    </SandboxPanel>
  );
}
