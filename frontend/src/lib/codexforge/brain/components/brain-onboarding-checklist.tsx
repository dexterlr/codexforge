"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainOnboardingPlan,
  CodexForgeBrainOnboardingStep,
} from "@/lib/codexforge/brain/runtime";

type BrainOnboardingChecklistProps = {
  plan: CodexForgeBrainOnboardingPlan;
  onCreateStarterGraph?: () => void;
  onKeepEmptyGraph?: () => void;
};

export function BrainOnboardingChecklist({
  plan,
  onCreateStarterGraph,
  onKeepEmptyGraph,
}: BrainOnboardingChecklistProps) {
  return (
    <section data-codexforge-brain-onboarding-checklist style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <span style={eyebrowStyle}>First-run checklist</span>
          <h3 style={titleStyle}>Cognitive onboarding path</h3>
        </div>
        <span style={statusPillStyle}>{plan.status}</span>
      </div>

      <div style={stepGridStyle}>
        {plan.steps.map((step) => (
          <ChecklistStep key={step.id} step={step} />
        ))}
      </div>

      <div style={actionRowStyle}>
        {onCreateStarterGraph ? (
          <button
            type="button"
            onClick={onCreateStarterGraph}
            data-codexforge-brain-create-starter-graph
            data-codexforge-brain-explicit-seed-action
            style={primaryButtonStyle}
          >
            Create starter graph
          </button>
        ) : null}
        {onKeepEmptyGraph ? (
          <button
            type="button"
            onClick={onKeepEmptyGraph}
            data-codexforge-brain-keep-empty-graph
            style={secondaryButtonStyle}
          >
            Keep empty graph
          </button>
        ) : null}
      </div>
    </section>
  );
}

function ChecklistStep({ step }: { step: CodexForgeBrainOnboardingStep }) {
  return (
    <article
      data-codexforge-brain-onboarding-step
      data-codexforge-brain-onboarding-step-status={step.status}
      style={stepStyle}
    >
      <div style={stepHeaderStyle}>
        <strong>{step.title}</strong>
        <span style={statusPillStyle}>{step.status}</span>
      </div>
      <p style={copyStyle}>{step.reason}</p>
      <p style={nextActionStyle}>
        <strong>Next safe action: </strong>
        {step.nextSafeAction}
      </p>
    </article>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.38)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  gap: 12,
  flexWrap: "wrap",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
};

const stepGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
  gap: 8,
};

const stepStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.045)",
};

const stepHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  alignItems: "center",
};

const actionRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const primaryButtonStyle: CSSProperties = {
  border: "1px solid rgba(34,197,94,0.32)",
  background: "rgba(34,197,94,0.14)",
  color: "inherit",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.26)",
  background: "rgba(148,163,184,0.10)",
  color: "inherit",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const statusPillStyle: CSSProperties = {
  display: "inline-flex",
  width: "fit-content",
  borderRadius: 999,
  padding: "3px 8px",
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(14,165,233,0.10)",
  color: "rgba(224,242,254,0.92)",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.76)",
  fontSize: 12,
  lineHeight: 1.45,
};

const nextActionStyle: CSSProperties = {
  margin: 0,
  color: "rgba(220,252,231,0.88)",
  fontSize: 12,
  lineHeight: 1.45,
};
