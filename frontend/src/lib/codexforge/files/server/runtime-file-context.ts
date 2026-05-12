import {
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
  buildCognitiveMemoryFixtureEvents,
  buildCognitiveMemoryFixtureNodes,
  buildPredictiveContextFixture,
} from "@/lib/codexforge/brain/runtime";
import type { CodexForgeFileNode, CodexForgeFileRuntimeContextSignal } from "../types";

function signal(args: CodexForgeFileRuntimeContextSignal): CodexForgeFileRuntimeContextSignal {
  return args;
}

export function buildRuntimeFileContextSignals(
  selectedFile: CodexForgeFileNode
): CodexForgeFileRuntimeContextSignal[] {
  const lowerPath = selectedFile.path.toLowerCase();
  const memoryNodes = buildCognitiveMemoryFixtureNodes();
  const memoryEvents = buildCognitiveMemoryFixtureEvents();
  const predictiveContext = buildPredictiveContextFixture();
  const predictiveSignals = predictiveContext.signals
    .filter((item) => item.ref?.path === selectedFile.path || lowerPath.includes("runtime"))
    .slice(0, 3)
    .map((item) =>
      signal({
        id: `${selectedFile.path}:predictive:${item.id}`,
        filePath: selectedFile.path,
        label: `Predictive ${item.kind}`,
        source: "predictive-context",
        strength: item.score >= 0.7 ? "strong" : "medium",
        detail: item.label,
        score: item.score,
        confidence: item.confidence,
        reasons: item.reasons,
      })
    );
  const signals: CodexForgeFileRuntimeContextSignal[] = [
    signal({
      id: `${selectedFile.path}:runtime-events`,
      filePath: selectedFile.path,
      label: "Runtime event vocabulary",
      source: "runtime",
      strength: lowerPath.includes("runtime") || lowerPath.includes("route") ? "strong" : "medium",
      detail: `${CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES.length} canonical runtime event types available for context alignment.`,
    }),
    ...predictiveSignals,
  ];

  if (lowerPath.includes("memory") || lowerPath.includes("files")) {
    signals.push(
      signal({
        id: `${selectedFile.path}:memory-fixtures`,
        filePath: selectedFile.path,
        label: "Cognitive memory fixtures",
        source: "memory",
        strength: "strong",
        detail: `${memoryNodes.length} memory nodes and ${memoryEvents.length} memory events provide deterministic local context.`,
      })
    );
  }

  if (lowerPath.includes("/tools/")) {
    signals.push(
      signal({
        id: `${selectedFile.path}:tool-boundary`,
        filePath: selectedFile.path,
        label: "Local tool boundary",
        source: "tool",
        strength: "strong",
        detail: "Tool files are treated as guarded workspace adapters and surfaced as higher-risk integration points.",
      })
    );
  }

  if (lowerPath.includes("scripts/smoke-")) {
    signals.push(
      signal({
        id: `${selectedFile.path}:smoke-coverage`,
        filePath: selectedFile.path,
        label: "Smoke validation",
        source: "smoke",
        strength: "strong",
        detail: "Smoke files are linked into execution history as deterministic validation context.",
      })
    );
  }

  return signals.sort((a, b) => a.id.localeCompare(b.id));
}
