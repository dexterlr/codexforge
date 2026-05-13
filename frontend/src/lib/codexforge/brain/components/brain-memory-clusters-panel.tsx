import type { CSSProperties } from "react";
import { clusterMemorySignals } from "@/lib/codexforge/brain/runtime";
import type { CodexForgeBrainPanelDataAdapterResult } from "@/lib/codexforge/brain/runtime";
import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import { BrainLiveDataBoundary } from "./brain-live-data-boundary";

type BrainMemoryClustersPanelProps = {
  graph: CodexForgeBrainGraph;
  panelData?: CodexForgeBrainPanelDataAdapterResult;
};

const MEMORY_KINDS = new Set(["memory", "decision", "note"]);

export function BrainMemoryClustersPanel({ graph, panelData }: BrainMemoryClustersPanelProps) {
  const memoryNodes = graph.nodes.filter((node) => MEMORY_KINDS.has(node.kind));
  const clusters = clusterMemorySignals({ nodes: memoryNodes, limit: 5 });
  const pinned = memoryNodes.filter((node) => node.meta.pinned).slice(0, 4);
  const highConfidence = memoryNodes
    .filter((node) => node.meta.importance === "critical" || node.meta.importance === "high")
    .slice(0, 4);
  const stale = memoryNodes
    .filter((node) => node.meta.archived || node.meta.status === "archived")
    .slice(0, 4);
  const contradictions = memoryNodes
    .filter((node) => textForNode(node).toLowerCase().includes("contradict"))
    .slice(0, 4);

  return (
    <section data-codexforge-brain-memory-clusters style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Cognitive memory</div>
          <h2 style={titleStyle}>Memory and knowledge clusters</h2>
        </div>
        <BrainLiveDataBoundary panelId="memory" panelData={panelData} />
      </div>
      <div style={metricGridStyle}>
        <Metric label="Readiness" value={memoryNodes.length > 0 ? "available" : "warming"} />
        <Metric label="Memory nodes" value={String(memoryNodes.length)} />
        <Metric label="Clusters" value={String(clusters.length)} />
        <Metric label="Pinned" value={String(pinned.length)} />
      </div>
      <div style={twoColumnStyle}>
        <List title="Cluster summaries" items={clusters.map((cluster) => `${cluster.summary.label}: ${cluster.summary.itemCount} items. ${cluster.summary.nextAction}`)} />
        <List title="Pinned concepts" items={pinned.map(labelForNode)} />
        <List title="High-confidence concepts" items={highConfidence.map(labelForNode)} />
        <List title="Stale concepts" items={stale.map(labelForNode)} />
        <List title="Contradiction concepts" items={contradictions.map(labelForNode)} />
      </div>
    </section>
  );
}

function textForNode(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  return [data.label, data.summary, data.content, data.text, data.description]
    .filter((value): value is string => typeof value === "string")
    .join(" ");
}

function labelForNode(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  return String(data.label ?? data.summary ?? data.content ?? data.text ?? node.id);
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <div style={eyebrowStyle}>{label}</div>
      <strong>{value}</strong>
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
          <div style={emptyStyle}>No matching memory signals yet.</div>
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

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
  flexWrap: "wrap",
};

const metricGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))",
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

const twoColumnStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
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
