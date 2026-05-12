import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import { buildPredictiveContext } from "./predictive-context";

export const CODEXFORGE_PREDICTIVE_CONTEXT_FIXED_TS = 1_776_000_000_000;

export function buildPredictiveContextFixtureGraph(): CodexForgeBrainGraph {
  const ts = CODEXFORGE_PREDICTIVE_CONTEXT_FIXED_TS;
  return {
    version: 2,
    meta: { createdAt: ts - 10_000, updatedAt: ts, workspaceId: "fixture" },
    nodes: [
      {
        id: "task-phase-4a",
        kind: "task",
        data: {
          label: "Phase 4A predictive context",
          goal: "Assemble relevant tasks, memories, files, risks, architecture signals, prior executions, and next safe actions.",
          nextAction: "Run predictive context smoke.",
        },
        meta: { createdAt: ts - 9_000, updatedAt: ts - 1_000, status: "active", importance: "critical", pinned: true },
      },
      {
        id: "memory-runtime-pure",
        kind: "memory",
        data: {
          label: "Runtime modules are pure",
          memoryType: "decision",
          content: "Runtime context modules accept data inputs and must not read files.",
          tags: ["runtime", "architecture"],
        },
        meta: { createdAt: ts - 8_000, updatedAt: ts - 2_000, status: "active", importance: "high" },
      },
      {
        id: "diff-context-file",
        kind: "diff",
        data: {
          label: "predictive-context.ts diff",
          filePath: "src/lib/codexforge/brain/runtime/context/predictive-context.ts",
          patchPreview: "exports buildPredictiveContext",
        },
        meta: { createdAt: ts - 7_000, updatedAt: ts - 3_000, status: "active", importance: "high" },
      },
      {
        id: "run-smoke",
        kind: "run",
        data: {
          label: "Predictive context smoke",
          phase: "validation",
          resultSummary: "Failure recovered by fixed timestamp fixtures.",
        },
        meta: { createdAt: ts - 6_000, updatedAt: ts - 500, status: "done", importance: "medium" },
      },
      {
        id: "blocked-files-api",
        kind: "task",
        data: {
          label: "Files API integration blocker",
          goal: "Keep Files API predictive signals optional and read-only.",
        },
        meta: { createdAt: ts - 5_000, updatedAt: ts - 400, status: "blocked", importance: "high" },
      },
    ],
    edges: [
      {
        id: "edge-task-memory",
        kind: "references",
        from: "task-phase-4a",
        to: "memory-runtime-pure",
        meta: { createdAt: ts - 4_000, updatedAt: ts - 4_000 },
      },
      {
        id: "edge-task-diff",
        kind: "produced",
        from: "task-phase-4a",
        to: "diff-context-file",
        meta: { createdAt: ts - 3_000, updatedAt: ts - 3_000 },
      },
    ],
  };
}

export function buildPredictiveContextFixtureEvents(): CodexForgeBrainRuntimeEvent[] {
  const ts = CODEXFORGE_PREDICTIVE_CONTEXT_FIXED_TS;
  return [
    {
      id: "evt-task",
      type: "task.created",
      ts: ts - 4_000,
      actor: "runtime",
      payload: {
        taskId: "task-phase-4a",
        goal: "Build predictive context engine foundations.",
        nodeId: "task-phase-4a",
      },
    },
    {
      id: "evt-failure",
      type: "failure.detected",
      ts: ts - 3_000,
      actor: "tool",
      payload: {
        failureId: "failure-files-api",
        taskId: "task-phase-4a",
        message: "Files API helper was unavailable during integration.",
        severity: "high",
        recoverable: true,
        nodeId: "blocked-files-api",
      },
    },
    {
      id: "evt-recovery",
      type: "recovery.detected",
      ts: ts - 2_000,
      actor: "assistant",
      payload: {
        recoveryId: "recovery-files-api",
        failureId: "failure-files-api",
        taskId: "task-phase-4a",
        message: "Restored bounded read-only server helper integration.",
        strategy: "restore-minimal-contract",
        nodeId: "run-smoke",
      },
    },
    {
      id: "evt-diff",
      type: "diff.generated",
      ts: ts - 1_000,
      actor: "assistant",
      payload: {
        diffId: "diff-context-file",
        executionId: "run-smoke",
        filePath: "src/lib/codexforge/brain/runtime/context/predictive-context.ts",
        status: "active",
        nodeId: "diff-context-file",
      },
    },
  ];
}

export function buildPredictiveContextFixtureFiles() {
  const ts = CODEXFORGE_PREDICTIVE_CONTEXT_FIXED_TS;
  return [
    {
      path: "src/lib/codexforge/brain/runtime/context/predictive-context.ts",
      summary: "Builds deterministic predictive context from supplied runtime data.",
      concepts: ["runtime context", "predictive context", "architecture"],
      riskLevel: "high" as const,
      updatedAt: ts - 1_000,
    },
    {
      path: "scripts/smoke-codexforge-predictive-context.ps1",
      summary: "Protects Phase 4A deterministic context contracts.",
      concepts: ["smoke validation", "predictive context"],
      riskLevel: "medium" as const,
      updatedAt: ts - 500,
    },
  ];
}

export function buildPredictiveContextFixture() {
  return buildPredictiveContext({
    graph: buildPredictiveContextFixtureGraph(),
    events: buildPredictiveContextFixtureEvents(),
    fileIntelligence: buildPredictiveContextFixtureFiles(),
    activeFocus: {
      filePath: "src/lib/codexforge/brain/runtime/context/predictive-context.ts",
      taskId: "task-phase-4a",
      nodeIds: ["task-phase-4a", "diff-context-file"],
      text: "predictive context runtime files risks architecture smoke validation",
    },
    now: CODEXFORGE_PREDICTIVE_CONTEXT_FIXED_TS,
  });
}
