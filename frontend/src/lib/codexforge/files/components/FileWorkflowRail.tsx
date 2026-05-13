"use client";

import type { CSSProperties } from "react";
import { buildCodexForgeFileReactKey } from "../file-search";
import type { CodexForgeFileWorkflow } from "../file-workflow";

export function FileWorkflowRail({ workflow }: { workflow: CodexForgeFileWorkflow }) {
  return (
    <section data-codexforge-file-workflow-rail style={panel}>
      <div style={eyebrow}>File workflow</div>
      <p style={summary}>{workflow.selectedFile.name} moves through inspect, understand, plan, preview, and approval gates.</p>
      <div style={steps}>
        {workflow.steps.map((step, index) => (
          <div
            key={buildCodexForgeFileReactKey("workflow-step", [workflow.selectedFile.path, step.id], index)}
            style={stepCard(step.status)}
          >
            <span style={stepStatus}>{step.status}</span>
            <strong>{step.label}</strong>
            <span style={stepDetail}>{step.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.64,
};

const summary: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
};

const steps: CSSProperties = {
  display: "grid",
  gap: 8,
};

function stepCard(status: string): CSSProperties {
  return {
    border:
      status === "current"
        ? "1px solid rgba(52,211,153,0.42)"
        : status === "blocked"
          ? "1px solid rgba(248,113,113,0.34)"
          : "1px solid rgba(255,255,255,0.10)",
    background:
      status === "current"
        ? "rgba(52,211,153,0.12)"
        : status === "blocked"
          ? "rgba(248,113,113,0.10)"
          : "rgba(0,0,0,0.18)",
    borderRadius: 8,
    padding: 10,
    display: "grid",
    gap: 5,
    minWidth: 0,
  };
}

const stepStatus: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const stepDetail: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.4,
  opacity: 0.76,
};
