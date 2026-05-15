"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import {
  buildBrainMemoryIndex,
  buildBrainRecallHandoff,
  buildBrainRecallResults,
  buildBrainRecallSummary,
} from "../index";
import {
  buildChatRecallContext,
  buildChatRecallGroundingPolicy,
  buildChatRecallHandoff,
  buildChatRecallSafetyBoundary,
  buildChatRecallSelection,
  type ChatRecallPreparedContext,
} from "@/lib/codexforge/chat-recall";
import { BrainRecallHandoffPanel } from "./BrainRecallHandoffPanel";
import { BrainRecallResultsPanel } from "./BrainRecallResultsPanel";
import { BrainRecallSafetyNotice } from "./BrainRecallSafetyNotice";
import { BrainRecallSearchBox } from "./BrainRecallSearchBox";
import { BrainRecallSummaryPanel } from "./BrainRecallSummaryPanel";
import { BrainRelatedContextPanel } from "./BrainRelatedContextPanel";

type BrainRecallPanelProps = {
  graph: CodexForgeBrainGraph;
  initialQuery?: string;
  compact?: boolean;
};

export function BrainRecallPanel({ graph, initialQuery = "memory safety", compact = false }: BrainRecallPanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const recallResults = useMemo(
    () => buildBrainRecallResults({ graph, query, limit: compact ? 5 : 12 }),
    [compact, graph, query]
  );
  const summary = useMemo(() => buildBrainRecallSummary(recallResults), [recallResults]);
  const handoff = useMemo(() => buildBrainRecallHandoff(recallResults.results, summary), [recallResults.results, summary]);
  const chatRecallPayload = useMemo(() => {
    const selection = buildChatRecallSelection({
      results: recallResults.results,
      selectedResultIds: handoff.selectedResultIds,
    });
    const context = buildChatRecallContext({
      selection,
      results: recallResults.results,
    });
    const policy = buildChatRecallGroundingPolicy({ selection, context });
    const safety = buildChatRecallSafetyBoundary();
    const chatHandoff = buildChatRecallHandoff({ context, policy, safety });
    const payload: ChatRecallPreparedContext = {
      selection,
      context,
      policy,
      safety,
      handoff: chatHandoff,
    };

    return JSON.stringify(payload);
  }, [handoff.selectedResultIds, recallResults.results]);
  const index = useMemo(() => buildBrainMemoryIndex(graph), [graph]);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const selectedResult =
    recallResults.results.find((result) => result.id === selectedResultId) ??
    recallResults.results[0] ??
    null;

  return (
    <section
      data-codexforge-brain-recall-panel
      data-codexforge-brain-recall-mode="deterministic local recall no graph mutation inspect before editing"
      style={panel(compact)}
    >
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Brain Recall</span>
          <h2 style={title}>Search approved Brain memory</h2>
          <p style={body}>
            Deterministic local recall over {index.itemCount} approved graph nodes. No graph mutation.
          </p>
        </div>
        <span style={pill}>local-first recall</span>
      </div>
      <BrainRecallSafetyNotice />
      <BrainRecallSearchBox query={query} onQueryChange={setQuery} />
      <BrainRecallSummaryPanel summary={summary} />
      <div style={layout(compact)}>
        <BrainRecallResultsPanel
          results={recallResults.results}
          selectedResultId={selectedResult?.id ?? null}
          onSelectResult={setSelectedResultId}
        />
        <div style={side}>
          <BrainRelatedContextPanel context={selectedResult?.relatedContext ?? null} />
          {!compact ? (
            <BrainRecallHandoffPanel
              handoff={handoff}
              chatRecallPayload={chatRecallPayload}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function panel(compact: boolean): CSSProperties {
  return {
    border: "1px solid rgba(147,197,253,0.18)",
    background: "linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.72))",
    borderRadius: 8,
    padding: compact ? 12 : 16,
    display: "grid",
    gap: 12,
    minWidth: 0,
  };
}

function layout(compact: boolean): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: compact ? "1fr" : "minmax(0, 1.05fr) minmax(min(100%, 360px), 0.95fr)",
    gap: 12,
    minWidth: 0,
  };
}

const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const side: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { fontSize: 11, textTransform: "uppercase", color: "#93c5fd", fontWeight: 900, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "6px 8px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
