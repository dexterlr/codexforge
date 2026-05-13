import type { CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";

type BrainRiskPanelProps = {
  graph: CodexForgeBrainGraph;
};

export function BrainRiskPanel({ graph }: BrainRiskPanelProps) {
  const staleContext = graph.nodes.filter((node) => node.meta.archived).length;
  const risks = [
    {
      label: "Schema drift",
      status: graph.version === 2 ? "contained" : "review",
      next: "Keep extending src/lib/codexforge/brain/graph/types.ts before runtime consumers.",
    },
    {
      label: "Stale context",
      status: staleContext > 0 ? `${staleContext} archived nodes` : "low",
      next: "Prefer active and pinned context before routing memories into work.",
    },
    {
      label: "Direct UI mutation risk",
      status: "contained",
      next: "Route future command actions through runtime adapters instead of command-center panels.",
    },
    {
      label: "Approval boundary risk",
      status: "visible",
      next: "Keep execution and write operations behind explicit approval gates.",
    },
    {
      label: "External execution risk",
      status: "contained",
      next: "Keep this phase read-only and avoid command, network, or model calls in panels.",
    },
  ];

  return (
    <section data-codexforge-brain-risk style={panelStyle}>
      <div>
        <div style={eyebrowStyle}>Runtime risks</div>
        <h2 style={titleStyle}>Risk posture</h2>
      </div>
      <div style={riskGridStyle}>
        {risks.map((risk) => (
          <div key={risk.label} style={riskStyle}>
            <strong>{risk.label}</strong>
            <span style={mutedStyle}>{risk.status}</span>
            <span style={nextStyle}>Next safe action: {risk.next}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.76)",
};

const riskGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 10,
};

const riskStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
  lineHeight: 1.45,
};

const mutedStyle: CSSProperties = {
  color: "rgba(226,232,240,0.72)",
};

const nextStyle: CSSProperties = {
  color: "rgba(187,247,208,0.88)",
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};
