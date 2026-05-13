import type { CSSProperties } from "react";
import {
  buildPredictiveContext,
  summarizePredictiveContext,
} from "@/lib/codexforge/brain/runtime";
import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";

type BrainPredictionPanelProps = {
  graph: CodexForgeBrainGraph;
  selectedNode?: CodexForgeBrainNode | null;
};

export function BrainPredictionPanel({ graph, selectedNode }: BrainPredictionPanelProps) {
  const result = buildPredictiveContext({
    graph,
    activeFocus: selectedNode
      ? {
          text: labelForNode(selectedNode),
          filePath: pathForNode(selectedNode),
          nodeIds: [selectedNode.id],
          taskId: selectedNode.kind === "task" ? selectedNode.id : undefined,
        }
      : undefined,
  });

  return (
    <section data-codexforge-brain-prediction style={panelStyle}>
      <div>
        <div style={eyebrowStyle}>Predictive context</div>
        <h2 style={titleStyle}>Next context signals</h2>
      </div>
      <div style={calloutStyle}>{summarizePredictiveContext(result)}</div>
      <div style={twoColumnStyle}>
        <List title="Likely next files" items={result.relevantFiles.map((signal) => signal.label)} />
        <List title="Related risks" items={result.risks.map((risk) => `${risk.label}: ${risk.nextSafeAction}`)} />
        <List title="Relevant concepts" items={result.relevantMemories.map((signal) => signal.label)} />
        <List title="Task focus" items={[result.taskFocus.activeGoal, result.taskFocus.nextSafeAction]} />
        <List title="Architecture retrieval" items={[`${result.architecturalConcepts.subsystem}: ${result.architecturalConcepts.relatedConcepts.join(", ") || "context available"}`]} />
      </div>
    </section>
  );
}

function labelForNode(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  return String(data.label ?? data.summary ?? data.goal ?? data.content ?? node.id);
}

function pathForNode(node: CodexForgeBrainNode): string | undefined {
  const data = node.data as Record<string, unknown>;
  return typeof data.filePath === "string"
    ? data.filePath
    : typeof data.path === "string"
      ? data.path
      : typeof data.repoPath === "string"
        ? data.repoPath
        : undefined;
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div style={listPanelStyle}>
      <div style={sectionTitleStyle}>{title}</div>
      <div style={listStyle}>
        {items.filter(Boolean).length > 0 ? (
          items.filter(Boolean).map((item) => (
            <div key={item} style={rowStyle}>
              {item}
            </div>
          ))
        ) : (
          <div style={emptyStyle}>No signal available yet.</div>
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

const twoColumnStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 10,
};

const calloutStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  fontSize: 12,
  lineHeight: 1.5,
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
