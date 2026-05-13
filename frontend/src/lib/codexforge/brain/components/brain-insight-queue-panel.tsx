"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildInsightQueue,
  buildKnowledgeTopology,
  buildRecommendationFixtureQueue,
  buildRuntimeRecommendations,
  summarizeInsightQueue,
  type CodexForgeRuntimeInsight,
} from "@/lib/codexforge/brain/runtime";
import { BrainInsightInspector } from "./brain-insight-inspector";
import { buildStableReactKey } from "./brain-react-key";

type BrainInsightQueuePanelProps = {
  graph?: CodexForgeBrainGraph;
};

export function BrainInsightQueuePanel({ graph }: BrainInsightQueuePanelProps) {
  const queue = useMemo(() => {
    const useFixture = !graph || graph.nodes.length === 0;
    if (useFixture) return buildRecommendationFixtureQueue();
    const recommendations = buildRuntimeRecommendations({
      graph,
      events: [],
      semanticTopology: buildKnowledgeTopology({ graph, events: [] }),
      now: graph.meta.updatedAt,
      limit: 18,
    });
    return buildInsightQueue({ recommendations, generatedAt: graph.meta.updatedAt });
  }, [graph]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = queue.insights.find((item) => item.id === selectedId) ?? queue.insights[0] ?? null;
  const severityGroups = Object.entries(queue.groups.bySeverity)
    .sort(([left], [right]) => severityRank(right) - severityRank(left) || left.localeCompare(right));
  const kindGroups = Object.entries(queue.groups.byKind).slice(0, 6);
  const statusGroups = Object.entries(queue.groups.byStatus).slice(0, 6);

  return (
    <section
      data-codexforge-brain-insight-queue-panel
      data-codexforge-brain-autonomous-insight-queue
      style={panelStyle}
    >
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Autonomous insight queue</div>
          <h2 style={titleStyle}>Attention queue</h2>
        </div>
        <span style={pillStyle}>no background execution</span>
      </div>

      <div data-codexforge-brain-insight-queue-summary style={summaryStyle}>
        {summarizeInsightQueue(queue)}
      </div>

      <div style={metricGridStyle}>
        <Metric label="Total" value={String(queue.summary.total)} />
        <Metric label="Critical" value={String(queue.summary.critical)} />
        <Metric label="High" value={String(queue.summary.high)} />
        <Metric label="Needs review" value={String(queue.summary.needsReview)} />
        <Metric label="Blocked" value={String(queue.summary.blocked)} />
        <Metric label="Approval" value={String(queue.summary.approvalRequiredActions)} />
      </div>

      <div style={layoutStyle}>
        <div style={mainStyle}>
          <Group title="By severity" groups={severityGroups} onSelect={setSelectedId} />
          <Group title="By kind" groups={kindGroups} onSelect={setSelectedId} />
          <Group title="By status" groups={statusGroups} onSelect={setSelectedId} />
        </div>
        <BrainInsightInspector insight={selected} />
      </div>
    </section>
  );
}

function severityRank(value: string): number {
  switch (value) {
    case "critical":
      return 5;
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 1;
  }
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Group({
  title,
  groups,
  onSelect,
}: {
  title: string;
  groups: [string, CodexForgeRuntimeInsight[]][];
  onSelect: (id: string) => void;
}) {
  return (
    <section data-codexforge-brain-insight-queue-group style={groupStyle}>
      <div style={eyebrowStyle}>{title}</div>
      <div style={groupGridStyle}>
        {groups.map(([label, insights], index) => (
          <div key={buildStableReactKey("insight-group", [title, label], index)} style={bucketStyle}>
            <div style={bucketHeaderStyle}>
              <strong>{label}</strong>
              <span>{insights.length}</span>
            </div>
            {insights.slice(0, 4).map((insight) => (
              <button
                key={insight.id}
                type="button"
                data-codexforge-brain-insight-queue-item
                onClick={() => onSelect(insight.id)}
                style={itemStyle}
              >
                <strong>{insight.title}</strong>
                <span>{insight.kind} / {insight.status} / {insight.confidence.toFixed(2)}</span>
              </button>
            ))}
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
  background: "radial-gradient(circle at 22% 0%, rgba(20,184,166,0.17), transparent 32%), rgba(15,23,42,0.84)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const summaryStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
};

const metricGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(270px, 0.34fr)",
  gap: 12,
  alignItems: "start",
};

const mainStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const groupStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const groupGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 8,
};

const bucketStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const bucketHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  fontSize: 12,
};

const itemStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  textAlign: "left",
  padding: 8,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(2,6,23,0.36)",
  color: "inherit",
  cursor: "pointer",
  fontSize: 11,
  lineHeight: 1.4,
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(14,165,233,0.14)",
  color: "rgba(186,230,253,0.92)",
  fontSize: 10,
  fontWeight: 900,
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
