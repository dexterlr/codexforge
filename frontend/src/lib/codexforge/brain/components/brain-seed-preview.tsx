"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CodexForgeBrainSeedGraphPlan } from "@/lib/codexforge/brain/runtime";

type BrainSeedPreviewProps = {
  plan: CodexForgeBrainSeedGraphPlan;
};

export function BrainSeedPreview({ plan }: BrainSeedPreviewProps) {
  return (
    <section
      data-codexforge-brain-seed-preview
      data-codexforge-brain-seed-readonly-preview
      style={panelStyle}
    >
      <div style={headerStyle}>
        <div>
          <span style={eyebrowStyle}>Deterministic starter preview</span>
          <h3 style={titleStyle}>Seed graph preview</h3>
        </div>
        <span style={statusPillStyle}>{plan.status}</span>
      </div>

      <div style={policyGridStyle}>
        <div data-codexforge-brain-no-silent-seed style={policyStyle}>
          <strong>No background creation</strong>
          <span>Nothing is persisted unless you press Create starter graph.</span>
        </div>
        <div data-codexforge-brain-no-overwrite-seed style={policyStyle}>
          <strong>No overwrite policy</strong>
          <span>Creation is blocked when the current graph already has data.</span>
        </div>
      </div>

      <div style={summaryGridStyle}>
        <Metric label="Nodes" value={String(plan.summary.nodeCount)} />
        <Metric label="Edges" value={String(plan.summary.edgeCount)} />
        <Metric label="Source" value={plan.sourceLabel} />
      </div>

      <div style={sectionGridStyle}>
        <PreviewList title="Seed nodes">
          {plan.nodePlans.map((nodePlan) => (
            <article
              key={nodePlan.graphNode.id}
              data-codexforge-brain-seed-node
              style={itemStyle}
            >
              <strong>{nodePlan.graphNode.data.label}</strong>
              <span>{nodePlan.graphNode.kind}</span>
              <p>{nodePlan.reason}</p>
            </article>
          ))}
        </PreviewList>

        <PreviewList title="Seed edges">
          {plan.edgePlans.map((edgePlan) => (
            <article
              key={edgePlan.graphEdge.id}
              data-codexforge-brain-seed-edge
              style={itemStyle}
            >
              <strong>{edgePlan.graphEdge.label ?? edgePlan.graphEdge.kind}</strong>
              <span>
                {edgePlan.graphEdge.from} {"->"} {edgePlan.graphEdge.to}
              </span>
              <p>{edgePlan.reason}</p>
            </article>
          ))}
        </PreviewList>
      </div>

      <PreviewList title="Seed quality diagnostics">
        {plan.qualityGates.map((gate) => (
          <article
            key={gate.id}
            data-codexforge-brain-seed-quality-gate
            style={{
              ...itemStyle,
              borderColor: gate.passed
                ? "rgba(34,197,94,0.22)"
                : "rgba(248,113,113,0.32)",
            }}
          >
            <div style={itemHeaderStyle}>
              <strong>{gate.label}</strong>
              <span style={statusPillStyle}>{gate.status}</span>
            </div>
            <p>{gate.reason}</p>
            <span>{gate.nextSafeAction}</span>
          </article>
        ))}
      </PreviewList>
    </section>
  );
}

function PreviewList({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={listStyle}>
      <h4 style={listTitleStyle}>{title}</h4>
      <div style={listGridStyle}>{children}</div>
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
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.46)",
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

const policyGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
  gap: 8,
};

const policyStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.94)",
  fontSize: 12,
  lineHeight: 1.45,
};

const summaryGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 8,
};

const sectionGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 10,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const listTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 13,
  color: "rgba(226,232,240,0.86)",
};

const listGridStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  maxHeight: 360,
  overflow: "auto",
  paddingRight: 3,
};

const itemStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.045)",
  fontSize: 12,
  lineHeight: 1.45,
  minWidth: 0,
};

const itemHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
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
