import type { CSSProperties } from "react";
import {
  evaluateBrainRuntimeHealth,
  getCodexForgeBrainRuntimeContract,
  summarizeBrainRuntimeHealth,
} from "@/lib/codexforge/brain/runtime";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";

type BrainRuntimeHealthPanelProps = {
  graph: CodexForgeBrainGraph;
};

export function BrainRuntimeHealthPanel({ graph }: BrainRuntimeHealthPanelProps) {
  const report = evaluateBrainRuntimeHealth();
  const contract = getCodexForgeBrainRuntimeContract();
  const graphSummary =
    graph.nodes.length > 0
      ? `${graph.nodes.length} nodes and ${graph.edges.length} edges loaded`
      : "Graph is empty; runtime contract is still available";

  return (
    <section data-codexforge-brain-runtime-health style={panelStyle}>
      <Header title="Runtime Health" eyebrow="Contract readiness" />
      <div style={metricGridStyle}>
        <Metric label="Runtime" value={report.version} />
        <Metric label="Graph data" value={graphSummary} />
        <Metric label="Cognitive memory" value={report.cognitiveMemoryReady ? "ready" : "warming"} />
        <Metric label="Findings" value={`${report.risks.length} risks / ${report.warnings.length} warnings`} />
      </div>
      <div style={calloutStyle}>{summarizeBrainRuntimeHealth(report)}</div>
      <div style={twoColumnStyle}>
        <List title="Canonical schema" items={[contract.canonicalSchemaPath]} />
        <List title="Required APIs" items={contract.requiredApis} />
      </div>
      <List title="Next safe steps" items={contract.nextSafeSteps.slice(0, 4)} />
    </section>
  );
}

function Header({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <div>
      <div style={eyebrowStyle}>{eyebrow}</div>
      <h2 style={titleStyle}>{title}</h2>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <div style={eyebrowStyle}>{label}</div>
      <strong style={metricValueStyle}>{value}</strong>
    </div>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div style={listPanelStyle}>
      <div style={sectionTitleStyle}>{title}</div>
      <div style={listStyle}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item} style={rowStyle}>
              {item}
            </div>
          ))
        ) : (
          <div style={emptyStyle}>No data available yet.</div>
        )}
      </div>
    </div>
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

const metricGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 10,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.045)",
};

const metricValueStyle: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.35,
};

const calloutStyle: CSSProperties = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  fontSize: 13,
  lineHeight: 1.55,
};

const twoColumnStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 10,
};

const listPanelStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const rowStyle: CSSProperties = {
  padding: "8px 9px",
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.86)",
  fontSize: 12,
  lineHeight: 1.45,
};

const emptyStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontSize: 12,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const sectionTitleStyle: CSSProperties = {
  ...eyebrowStyle,
  color: "rgba(226,232,240,0.78)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};
