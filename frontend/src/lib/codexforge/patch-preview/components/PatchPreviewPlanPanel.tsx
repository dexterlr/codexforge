"use client";

import type { CSSProperties } from "react";
import type { CodexForgePatchPreviewPlan } from "../patch-preview-types";
import { summarizePatchPreviewPlan } from "../patch-preview-summary";

function keyPart(value: string, index: number): string {
  return `${value.toLowerCase().replace(/[^a-z0-9._-]+/g, "-")}-${index}`;
}

export function PatchPreviewPlanPanel({ plan }: { plan: CodexForgePatchPreviewPlan }) {
  return (
    <section data-codexforge-patch-preview-plan-panel style={panel}>
      <div style={eyebrow}>Preview Plan</div>
      <p style={body}>{summarizePatchPreviewPlan(plan)}</p>
      <div style={grid}>
        <InfoBlock label="Goal" value={plan.goal} />
        <InfoBlock label="File role" value={plan.fileRole} />
        <InfoBlock label="Brain context" value={plan.relatedBrainContextSummary} />
        <InfoBlock label="Policy posture" value={plan.capabilityPolicyPosture} />
      </div>
      <div style={list}>
        {plan.previewSteps.map((step, index) => (
          <div key={keyPart(step.id, index)} style={stepCard(step.status)}>
            <strong>{step.label}</strong>
            <span style={status}>{step.status}</span>
            <span>{step.detail}</span>
          </div>
        ))}
      </div>
      <div style={safetyStrip}>
        <strong>Preview only</strong>
        <span>{plan.noMutationGuarantee}</span>
      </div>
    </section>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={infoBlock}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  ...textGuard,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.66,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.82,
  ...textGuard,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
  gap: 8,
  ...textGuard,
};

const infoBlock: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.20)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
  ...textGuard,
};

const list: CSSProperties = {
  display: "grid",
  gap: 8,
  ...textGuard,
};

function stepCard(statusValue: string): CSSProperties {
  return {
    border:
      statusValue === "blocked"
        ? "1px solid rgba(248,113,113,0.32)"
        : statusValue === "current"
          ? "1px solid rgba(56,189,248,0.32)"
          : "1px solid rgba(255,255,255,0.10)",
    background:
      statusValue === "blocked"
        ? "rgba(248,113,113,0.10)"
        : statusValue === "current"
          ? "rgba(56,189,248,0.10)"
          : "rgba(0,0,0,0.18)",
    borderRadius: 8,
    padding: 10,
    display: "grid",
    gap: 5,
    fontSize: 12,
    lineHeight: 1.4,
    ...textGuard,
  };
}

const status: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.66,
};

const safetyStrip: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.30)",
  background: "rgba(52,211,153,0.10)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.45,
  ...textGuard,
};
