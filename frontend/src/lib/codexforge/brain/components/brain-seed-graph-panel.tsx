"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainOnboardingPlan,
  CodexForgeBrainSeedGraphPlan,
} from "@/lib/codexforge/brain/runtime";
import { BrainOnboardingChecklist } from "./brain-onboarding-checklist";
import { BrainSeedPreview } from "./brain-seed-preview";

type BrainSeedGraphPanelProps = {
  seedPlan: CodexForgeBrainSeedGraphPlan;
  onboardingPlan: CodexForgeBrainOnboardingPlan;
  onCreateStarterGraph?: () => void;
  onKeepEmptyGraph?: () => void;
};

export function BrainSeedGraphPanel({
  seedPlan,
  onboardingPlan,
  onCreateStarterGraph,
  onKeepEmptyGraph,
}: BrainSeedGraphPanelProps) {
  const blocked = seedPlan.status === "blocked";

  return (
    <section data-codexforge-brain-seed-graph-panel style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <span style={eyebrowStyle}>Starter graph workflow</span>
          <h2 style={titleStyle}>Bootstrap a useful Brain graph</h2>
          <p style={copyStyle}>
            The starter graph is a deterministic preview of runtime, memory,
            files, agents, safety, recommendations, health, snapshot, and panel
            concepts. Creation happens only from the explicit action below.
          </p>
        </div>
        <div style={summaryGridStyle}>
          <Metric label="Seed nodes" value={String(seedPlan.summary.nodeCount)} />
          <Metric label="Seed edges" value={String(seedPlan.summary.edgeCount)} />
          <Metric label="Status" value={seedPlan.status} />
        </div>
      </div>

      <div style={actionRowStyle}>
        {onCreateStarterGraph ? (
          <button
            type="button"
            onClick={onCreateStarterGraph}
            disabled={blocked}
            data-codexforge-brain-create-starter-graph
            data-codexforge-brain-explicit-seed-action
            style={{
              ...primaryButtonStyle,
              opacity: blocked ? 0.55 : 1,
              cursor: blocked ? "not-allowed" : "pointer",
            }}
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
        <span
          data-codexforge-brain-seed-readonly-preview
          style={readOnlyPillStyle}
        >
          Read-only preview
        </span>
      </div>

      <BrainSeedPreview plan={seedPlan} />
      <BrainOnboardingChecklist
        plan={onboardingPlan}
        onCreateStarterGraph={onCreateStarterGraph}
        onKeepEmptyGraph={onKeepEmptyGraph}
      />
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <span style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.28)",
  background:
    "radial-gradient(circle at 20% 0%, rgba(14,165,233,0.18), transparent 34%), rgba(15,23,42,0.92)",
  color: "rgba(241,245,249,0.96)",
  boxShadow: "0 28px 90px rgba(0,0,0,0.28)",
};

const headerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)",
  gap: 14,
  alignItems: "start",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 24,
  lineHeight: 1.12,
};

const copyStyle: CSSProperties = {
  margin: "8px 0 0",
  color: "rgba(226,232,240,0.78)",
  fontSize: 13,
  lineHeight: 1.55,
  maxWidth: 860,
};

const summaryGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
};

const actionRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
};

const primaryButtonStyle: CSSProperties = {
  border: "1px solid rgba(34,197,94,0.34)",
  background: "rgba(34,197,94,0.16)",
  color: "inherit",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 900,
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

const readOnlyPillStyle: CSSProperties = {
  display: "inline-flex",
  borderRadius: 999,
  padding: "6px 10px",
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(14,165,233,0.10)",
  color: "rgba(224,242,254,0.92)",
  fontSize: 11,
  fontWeight: 900,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.045)",
  fontSize: 12,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
