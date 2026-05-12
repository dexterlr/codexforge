import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeMemoryContradiction } from "../memory";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import { clampScore } from "./relevance-engine";

export type CodexForgePrioritizedRisk = {
  id: string;
  label: string;
  severity: "low" | "medium" | "high" | "critical";
  score: number;
  confidence: number;
  timestamp: number;
  reasons: string[];
  mitigation: string;
  nextSafeAction: string;
};

export type CodexForgeRiskPrioritizerInput = {
  graph?: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  contradictionCandidates?: readonly CodexForgeMemoryContradiction[];
  filePaths?: readonly string[];
  mutationContext?: "none" | "preview" | "approval-required" | "mutation-requested";
  now?: number;
  staleAfterMs?: number;
};

const SEVERITY_WEIGHT = { low: 0.25, medium: 0.5, high: 0.78, critical: 1 } as const;

function highRiskPath(path: string): string | null {
  const lower = path.replaceAll("\\", "/").toLowerCase();
  if (lower.includes("/app/api/")) return "api-boundary";
  if (lower.includes("/brain/runtime/")) return "runtime-boundary";
  if (lower.includes("/tools/")) return "tool-mutation-boundary";
  if (lower.includes("scripts/smoke-")) return "validation-contract";
  return null;
}

function severityFromScore(score: number): CodexForgePrioritizedRisk["severity"] {
  if (score >= 0.9) return "critical";
  if (score >= 0.7) return "high";
  if (score >= 0.42) return "medium";
  return "low";
}

function risk(args: Omit<CodexForgePrioritizedRisk, "score"> & { score?: number }): CodexForgePrioritizedRisk {
  const score = clampScore(args.score ?? SEVERITY_WEIGHT[args.severity]);
  return { ...args, score };
}

export function prioritizeContextRisks(
  input: CodexForgeRiskPrioritizerInput
): CodexForgePrioritizedRisk[] {
  const risks: CodexForgePrioritizedRisk[] = [];

  for (const event of input.events ?? []) {
    if (event.type !== "failure.detected") continue;
    const severity = event.payload.severity ?? "medium";
    risks.push(
      risk({
        id: `event:${event.payload.failureId}`,
        label: event.payload.message,
        severity,
        confidence: event.payload.recoverable === false ? 0.92 : 0.78,
        timestamp: event.ts,
        reasons: [`failure.detected:${severity}`],
        mitigation: event.payload.recoverable === false ? "Stop and inspect failure before mutation." : "Pair failure with latest recovery or validation evidence.",
        nextSafeAction: "Inspect failure details and run the narrowest relevant validation.",
      })
    );
  }

  for (const node of input.graph?.nodes ?? []) {
    if (node.meta.status !== "blocked" && node.meta.status !== "error") continue;
    risks.push(
      risk({
        id: `node:${node.id}`,
        label: `${node.kind} ${node.id} is ${node.meta.status}`,
        severity: node.meta.status === "error" ? "high" : "medium",
        confidence: 0.72,
        timestamp: node.meta.updatedAt ?? node.meta.createdAt,
        reasons: [`graph-node:${node.meta.status}`],
        mitigation: "Resolve or explicitly route around the graph node before depending on it.",
        nextSafeAction: "Check linked tasks, failures, and validation state.",
      })
    );
  }

  for (const contradiction of input.contradictionCandidates ?? []) {
    const severity = severityFromScore(contradiction.riskScore);
    risks.push(
      risk({
        id: `memory:${contradiction.id}`,
        label: contradiction.reason,
        severity,
        confidence: clampScore(0.45 + contradiction.riskScore * 0.45),
        timestamp: 0,
        reasons: [
          "memory-contradiction",
          contradiction.reason,
          ...contradiction.opposingTerms.map((term) => `opposes:${term}`),
        ],
        mitigation: "Prefer newer, pinned, and higher confidence memories until the conflict is resolved.",
        nextSafeAction: "Surface both memory candidates before acting on either.",
        score: contradiction.riskScore,
      })
    );
  }

  for (const path of input.filePaths ?? []) {
    const reason = highRiskPath(path);
    if (!reason) continue;
    risks.push(
      risk({
        id: `file:${path}`,
        label: `High-risk file path: ${path}`,
        severity: reason === "tool-mutation-boundary" ? "high" : "medium",
        confidence: 0.68,
        timestamp: 0,
        reasons: [`path:${reason}`],
        mitigation: "Keep edits scoped and verify with build plus targeted smoke.",
        nextSafeAction: "Inspect callers and validation coverage before editing.",
      })
    );
  }

  if (input.mutationContext && input.mutationContext !== "none") {
    risks.push(
      risk({
        id: `mutation:${input.mutationContext}`,
        label: `Mutation context: ${input.mutationContext}`,
        severity: input.mutationContext === "mutation-requested" ? "high" : "medium",
        confidence: 0.74,
        timestamp: input.now ?? 0,
        reasons: [`mutation-context:${input.mutationContext}`],
        mitigation: "Use preview or approval-aware paths before applying changes.",
        nextSafeAction: "Confirm write scope and validation plan.",
      })
    );
  }

  const staleAfterMs = input.staleAfterMs ?? 24 * 60 * 60 * 1000;
  if (
    typeof input.now === "number" &&
    typeof input.graph?.meta.updatedAt === "number" &&
    input.now - input.graph.meta.updatedAt > staleAfterMs
  ) {
    risks.push(
      risk({
        id: "graph:stale",
        label: "Runtime graph is stale",
        severity: "medium",
        confidence: 0.7,
        timestamp: input.graph.meta.updatedAt,
        reasons: ["graph-staleness"],
        mitigation: "Refresh or reduce the latest events before trusting predictions.",
        nextSafeAction: "Rebuild context from current runtime events.",
      })
    );
  }

  return risks.sort(
    (a, b) =>
      b.score - a.score ||
      b.confidence - a.confidence ||
      b.timestamp - a.timestamp ||
      a.id.localeCompare(b.id)
  );
}

export function summarizePrioritizedRisks(
  risks: readonly CodexForgePrioritizedRisk[]
): string {
  if (risks.length === 0) return "No prioritized context risks.";
  const top = risks[0];
  return `${risks.length} prioritized risks. Top risk: ${top.severity} ${top.label}.`;
}
