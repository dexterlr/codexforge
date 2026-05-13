import type { CSSProperties } from "react";
import { buildRuntimeTimeline } from "@/lib/codexforge/brain/runtime";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import type { CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime";

type BrainTimelinePanelProps = {
  graph: CodexForgeBrainGraph;
};

export function BrainTimelinePanel({ graph }: BrainTimelinePanelProps) {
  const events = graph.nodes
    .map((node): CodexForgeBrainRuntimeEvent | null => {
      const label = labelForNode(node);
      const ts = node.meta.updatedAt ?? node.meta.createdAt;

      if (node.kind === "task") {
        return {
          id: `timeline:${node.id}`,
          type: "task.updated",
          ts,
          actor: "system",
          source: { type: "derived", id: node.id, label },
          payload: { taskId: node.id, summary: label, status: node.meta.status },
        };
      }

      if (node.kind === "run") {
        const status = node.meta.status === "error" ? "failed" : "completed";

        return {
          id: `timeline:${node.id}`,
          type: "execution.completed",
          ts,
          actor: "system",
          source: { type: "derived", id: node.id, label },
          payload: { executionId: node.id, resultSummary: label, status },
        };
      }

      if (node.kind === "memory" || node.kind === "decision" || node.kind === "note") {
        return {
          id: `timeline:${node.id}`,
          type: "memory.promoted",
          ts,
          actor: "system",
          source: { type: "derived", id: node.id, label },
          payload: {
            memoryId: node.id,
            memoryType: node.kind === "memory" ? "fact" : "note",
            content: label,
            importance: node.meta.importance,
          },
        };
      }

      return null;
    })
    .filter((event): event is CodexForgeBrainRuntimeEvent => Boolean(event));
  const rows = buildRuntimeTimeline(events).slice(0, 8);

  return (
    <section data-codexforge-brain-timeline style={panelStyle}>
      <div>
        <div style={eyebrowStyle}>Runtime timeline</div>
        <h2 style={titleStyle}>Deterministic graph-derived rows</h2>
      </div>
      <div style={listStyle}>
        {rows.length > 0 ? (
          rows.map((row) => (
            <div key={row.id} style={rowStyle}>
              <div style={rowTopStyle}>
                <strong>{row.label}</strong>
                <span style={pillStyle}>{row.importance}</span>
              </div>
              <span style={mutedStyle}>{row.summary}</span>
              <span style={stampStyle}>{row.timestamp}</span>
            </div>
          ))
        ) : (
          <div style={emptyStyle}>No timeline rows available yet.</div>
        )}
      </div>
    </section>
  );
}

function labelForNode(node: CodexForgeBrainGraph["nodes"][number]): string {
  const data = node.data as Record<string, unknown>;
  return String(data.label ?? data.summary ?? data.goal ?? data.content ?? data.text ?? node.id);
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.76)",
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const rowStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
  lineHeight: 1.45,
};

const rowTopStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  alignItems: "center",
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(14,165,233,0.14)",
  color: "rgba(186,230,253,0.92)",
  fontSize: 10,
  fontWeight: 900,
};

const mutedStyle: CSSProperties = {
  color: "rgba(226,232,240,0.76)",
};

const stampStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
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

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};
