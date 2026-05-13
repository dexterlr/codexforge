"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildKnowledgeTopology,
  buildRecommendationFixtureAgents,
  buildRecommendationFixtureContext,
  buildRecommendationFixtureEvents,
  buildRecommendationFixtureGraph,
  buildRecommendationFixtureMemory,
  buildRecommendationFixtureTopology,
  buildRuntimeRecommendations,
  summarizeRuntimeRecommendations,
  type CodexForgeRuntimeRecommendation,
} from "@/lib/codexforge/brain/runtime";
import { BrainInsightInspector } from "./brain-insight-inspector";
import { BrainRecommendationCard } from "./brain-recommendation-card";

type BrainRecommendationsPanelProps = {
  graph?: CodexForgeBrainGraph;
};

export function BrainRecommendationsPanel({ graph }: BrainRecommendationsPanelProps) {
  const { recommendations, summary } = useMemo(() => {
    const useFixture = !graph || graph.nodes.length === 0;
    const sourceGraph = useFixture ? buildRecommendationFixtureGraph() : graph;
    const events = useFixture ? buildRecommendationFixtureEvents() : [];
    const cognitiveMemory = useFixture ? buildRecommendationFixtureMemory() : undefined;
    const predictiveContext = useFixture ? buildRecommendationFixtureContext() : undefined;
    const semanticTopology = useFixture
      ? buildRecommendationFixtureTopology()
      : buildKnowledgeTopology({ graph: sourceGraph, events });
    const recommendations = buildRuntimeRecommendations({
      graph: sourceGraph,
      events,
      cognitiveMemory,
      predictiveContext,
      semanticTopology,
      agents: useFixture ? buildRecommendationFixtureAgents() : undefined,
      now: sourceGraph.meta.updatedAt,
      limit: 12,
    });
    return {
      recommendations,
      summary: summarizeRuntimeRecommendations(recommendations, sourceGraph.meta.updatedAt),
    };
  }, [graph]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = recommendations.find((item) => item.id === selectedId) ?? recommendations[0] ?? null;

  return (
    <section data-codexforge-brain-recommendations-panel style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Runtime recommendations</div>
          <h2 style={titleStyle}>Recommended next attention</h2>
        </div>
        <span style={pillStyle}>read-only</span>
      </div>

      <div data-codexforge-brain-recommendations-summary style={summaryStyle}>
        <SummaryStat label="Total" value={String(summary.total)} />
        <SummaryStat label="Critical" value={String(summary.severityCounts.critical)} />
        <SummaryStat label="High" value={String(summary.severityCounts.high)} />
        <SummaryStat label="Read-only" value={String(summary.readOnlyActions)} />
        <SummaryStat label="Approval" value={String(summary.approvalRequiredActions)} />
      </div>

      <div data-codexforge-brain-recommendation-next-action style={nextActionStyle}>
        <strong>{summary.nextSafeAction?.label ?? "Inspect graph overview"}</strong>
        <span>{summary.nextSafeAction?.description ?? "Review the preserved graph before taking action."}</span>
      </div>

      <div data-codexforge-brain-approval-boundary style={approvalStyle}>
        Approval boundary: recommendations are advisory only. Mutation, command, external, and render actions require explicit approval outside this panel.
      </div>

      <div style={layoutStyle}>
        <div style={cardsStyle}>
          {recommendations.slice(0, 8).map((recommendation) => (
            <BrainRecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onInspect={(item: CodexForgeRuntimeRecommendation) => setSelectedId(item.id)}
            />
          ))}
        </div>
        <BrainInsightInspector recommendation={selected} />
      </div>
    </section>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={summaryStatStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "radial-gradient(circle at 18% 0%, rgba(14,165,233,0.18), transparent 34%), rgba(15,23,42,0.84)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const summaryStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 100px), 1fr))",
  gap: 8,
};

const summaryStatStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const nextActionStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
};

const approvalStyle: CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(251,191,36,0.18)",
  background: "rgba(251,191,36,0.08)",
  color: "rgba(254,243,199,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(270px, 0.34fr)",
  gap: 12,
  alignItems: "start",
};

const cardsStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
  gap: 10,
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
