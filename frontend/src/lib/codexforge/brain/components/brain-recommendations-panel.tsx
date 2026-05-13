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
  type CodexForgeBrainPanelDataAdapterResult,
  type CodexForgeRuntimeRecommendation,
} from "@/lib/codexforge/brain/runtime";
import { BrainInsightInspector } from "./brain-insight-inspector";
import { BrainRecommendationCard } from "./brain-recommendation-card";
import { BrainReadOnlyBadge, BrainSectionHeader } from "./ui";
import { BrainLiveDataBoundary } from "./brain-live-data-boundary";

type BrainRecommendationsPanelProps = {
  graph?: CodexForgeBrainGraph;
  panelData?: CodexForgeBrainPanelDataAdapterResult;
};

export function BrainRecommendationsPanel({
  graph,
  panelData,
}: BrainRecommendationsPanelProps) {
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
    <section
      data-codexforge-brain-recommendations-panel
      data-codexforge-brain-overflow-guard
      style={panelStyle}
    >
      <BrainSectionHeader
        eyebrow="Runtime recommendations"
        title="Recommended next attention"
        description="Deterministic advisory signals only; actions remain outside this panel."
        status={
          <div style={statusRowStyle}>
            <BrainLiveDataBoundary panelId="recommendations" panelData={panelData} />
            <BrainReadOnlyBadge label="read-only advisory" />
          </div>
        }
      />

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

      <div data-codexforge-brain-responsive-grid style={layoutStyle}>
        <div data-codexforge-brain-overflow-guard style={cardsStyle}>
          {recommendations.slice(0, 8).map((recommendation) => (
            <BrainRecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onInspect={(item: CodexForgeRuntimeRecommendation) => setSelectedId(item.id)}
            />
          ))}
        </div>
        <div data-codexforge-brain-recommendation-inspector-card style={inspectorCardStyle}>
          <BrainInsightInspector recommendation={selected} />
        </div>
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
  borderRadius: 18,
  border: "1px solid rgba(125,211,252,0.24)",
  background: "radial-gradient(circle at 18% 0%, rgba(14,165,233,0.20), transparent 34%), linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.72))",
  minWidth: 0,
  maxHeight: 720,
  overflow: "auto",
  boxShadow: "0 18px 60px rgba(2,6,23,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
};

const statusRowStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

const summaryStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))",
  gap: 8,
};

const summaryStatStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
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
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const approvalStyle: CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(251,191,36,0.18)",
  background: "rgba(251,191,36,0.08)",
  color: "rgba(254,243,199,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
  gap: 12,
  alignItems: "start",
};

const cardsStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: 10,
  maxHeight: 560,
  overflow: "auto",
  minWidth: 0,
  paddingRight: 2,
};

const inspectorCardStyle: CSSProperties = {
  display: "grid",
  minWidth: 0,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
