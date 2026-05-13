import type { CSSProperties } from "react";
import { clusterMemorySignals } from "@/lib/codexforge/brain/runtime";
import type { CodexForgeBrainPanelDataAdapterResult } from "@/lib/codexforge/brain/runtime";
import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import { BrainLiveDataBoundary } from "./brain-live-data-boundary";
import { buildStableReactKey } from "./brain-react-key";

type BrainMemoryClustersPanelProps = {
  graph: CodexForgeBrainGraph;
  panelData?: CodexForgeBrainPanelDataAdapterResult;
};

const MEMORY_KINDS = new Set(["memory", "decision", "note"]);
const MAX_UNIQUE_CLUSTER_SUMMARIES = 4;

type VisualSummaryItem = {
  text: string;
  duplicateCount: number;
};

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
  const uniqueClusterSummaries = summarizeUniqueVisualItems(
    clusters.map((cluster) => `${cluster.summary.label}: ${cluster.summary.itemCount} items. ${cluster.summary.nextAction}`),
    MAX_UNIQUE_CLUSTER_SUMMARIES
  );

  return (
    <section data-codexforge-brain-memory-clusters data-codexforge-brain-overflow-guard style={panelStyle}>
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
        <List title="Cluster summaries" items={uniqueClusterSummaries} deduped />
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

function summarizeUniqueVisualItems(items: readonly string[], limit: number): VisualSummaryItem[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    const normalized = item.trim().replace(/\s+/g, " ");
    if (!normalized) continue;
    counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .slice(0, limit)
    .map(([text, duplicateCount]) => ({ text, duplicateCount }));
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <div style={eyebrowStyle}>{label}</div>
      <strong>{value}</strong>
    </div>
  );
}

function List({
  title,
  items,
  deduped = false,
}: {
  title: string;
  items: readonly string[] | readonly VisualSummaryItem[];
  deduped?: boolean;
}) {
  return (
    <div style={listPanelStyle}>
      <div style={sectionTitleStyle}>{title}</div>
      <div style={listStyle}>
        {items.length > 0 ? (
          items.map((item, index) => {
            const text = typeof item === "string" ? item : item.text;
            const duplicateCount = typeof item === "string" ? 1 : item.duplicateCount;

            return (
            <div key={buildStableReactKey("memory-cluster-row", [title, text], index)} style={rowStyle}>
              <span>{text}</span>
              {deduped && duplicateCount > 1 ? (
                <span style={duplicateStyle}>x{duplicateCount}</span>
              ) : null}
            </div>
            );
          })
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
  borderRadius: 18,
  border: "1px solid rgba(125,211,252,0.22)",
  background:
    "radial-gradient(circle at 14% 0%, rgba(34,197,94,0.12), transparent 32%), linear-gradient(145deg, rgba(15,23,42,0.86), rgba(2,6,23,0.68))",
  minWidth: 0,
  maxHeight: 620,
  overflow: "auto",
  boxShadow: "0 18px 60px rgba(2,6,23,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 10,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 11,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const twoColumnStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 10,
};

const listPanelStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const rowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 8,
  alignItems: "start",
  padding: "8px 9px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(255,255,255,0.045)",
  color: "rgba(226,232,240,0.86)",
  fontSize: 12,
  lineHeight: 1.45,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const duplicateStyle: CSSProperties = {
  borderRadius: 999,
  padding: "2px 7px",
  border: "1px solid rgba(125,211,252,0.18)",
  color: "rgba(186,230,253,0.9)",
  fontSize: 10,
  fontWeight: 900,
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
