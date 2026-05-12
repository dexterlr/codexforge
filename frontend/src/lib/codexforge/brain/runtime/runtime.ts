import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import {
  appendEvent,
  createBrainRuntimeEventStore,
  filterEvents,
  listEvents,
} from "./event-store";
import { reduceGraph } from "./graph-reducer";
import { assembleContext } from "./context-assembler";
import { rankMemory } from "./memory-ranker";
import { createEpisode } from "./episode-manager";
import { synthesizeConcepts } from "./concept-synthesizer";
import { extractExecutionLineage } from "./execution-lineage";
import { scoreSemanticLinks } from "./semantic-links";
import type {
  CodexForgeBrainAssembleContextInput,
  CodexForgeBrainEventStore,
  CodexForgeBrainRuntimeContext,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventInput,
} from "./runtime-types";

export type CodexForgeBrainRuntimeRunInput = {
  graph: CodexForgeBrainGraph;
  store?: CodexForgeBrainEventStore;
  events?: CodexForgeBrainRuntimeEvent[];
  eventInputs?: CodexForgeBrainRuntimeEventInput[];
  focusNodeIds?: string[];
  now?: number;
};

export type CodexForgeBrainRuntimeRunResult = {
  graph: CodexForgeBrainGraph;
  store: CodexForgeBrainEventStore;
  context: CodexForgeBrainRuntimeContext;
  memory: ReturnType<typeof rankMemory>;
  concepts: ReturnType<typeof synthesizeConcepts>;
  lineage: ReturnType<typeof extractExecutionLineage>;
  semanticLinks: ReturnType<typeof scoreSemanticLinks>;
};

export {
  appendEvent,
  createBrainRuntimeEventStore,
  filterEvents,
  listEvents,
  reduceGraph,
  assembleContext,
  rankMemory,
  createEpisode,
  synthesizeConcepts,
  extractExecutionLineage,
  scoreSemanticLinks,
};

export function buildCognitiveRuntimeContext(
  input: CodexForgeBrainAssembleContextInput
): CodexForgeBrainRuntimeContext {
  return assembleContext(input);
}

export function runBrainRuntime(
  input: CodexForgeBrainRuntimeRunInput
): CodexForgeBrainRuntimeRunResult {
  let store = input.store ?? createBrainRuntimeEventStore(input.events ?? []);

  for (const eventInput of input.eventInputs ?? []) {
    store = appendEvent(store, eventInput).store;
  }

  const graph = reduceGraph({
    graph: input.graph,
    events: store.events,
    now: input.now,
  });

  const context = assembleContext({
    graph,
    events: store.events,
    focusNodeIds: input.focusNodeIds,
    now: input.now,
  });

  return {
    graph,
    store,
    context,
    memory: rankMemory({
      graph,
      events: store.events,
      focusNodeIds: input.focusNodeIds,
      now: input.now,
    }),
    concepts: synthesizeConcepts({
      graph,
      events: store.events,
    }),
    lineage: extractExecutionLineage({
      graph,
      events: store.events,
    }),
    semanticLinks: scoreSemanticLinks({
      graph,
      focusNodeIds: input.focusNodeIds,
    }),
  };
}
