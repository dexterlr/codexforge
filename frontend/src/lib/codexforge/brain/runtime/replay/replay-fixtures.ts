import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { buildAgentRuntimeFixturePlan } from "@/lib/codexforge/agents/runtime";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import { buildBrainRuntimeLineage } from "./lineage-builder";
import type { CodexForgeBrainLineageGraph } from "./replay-types";

export const CODEXFORGE_BRAIN_REPLAY_FIXTURE_TS = 1_735_776_000_000;

export function buildBrainReplayFixtureEvents(): CodexForgeBrainRuntimeEvent[] {
  const ts = CODEXFORGE_BRAIN_REPLAY_FIXTURE_TS;
  return [
    {
      id: "fixture:event:message",
      type: "message.created",
      ts,
      actor: "user",
      payload: {
        messageId: "fixture-message",
        role: "user",
        text: "Add runtime replay and lineage inspection to the brain command center.",
        nodeId: "message:fixture",
      },
    },
    {
      id: "fixture:event:task",
      type: "task.created",
      ts: ts + 1_000,
      actor: "runtime",
      payload: {
        taskId: "fixture-task",
        goal: "Explain how the runtime reached its current state.",
        sourceMessageId: "fixture-message",
        nodeId: "task:fixture",
      },
    },
    {
      id: "fixture:event:execution-start",
      type: "execution.started",
      ts: ts + 2_000,
      actor: "tool",
      payload: {
        executionId: "fixture-execution",
        taskId: "fixture-task",
        label: "Build replay lineage surfaces",
        command: "read-only builder invocation",
        nodeId: "run:fixture",
      },
    },
    {
      id: "fixture:event:diff",
      type: "diff.generated",
      ts: ts + 3_000,
      actor: "tool",
      payload: {
        diffId: "fixture-diff",
        executionId: "fixture-execution",
        filePath: "src/lib/codexforge/brain/runtime/replay",
        patchPreview: "Add replay runtime package and read-only panels.",
        status: "active",
        nodeId: "diff:fixture",
      },
    },
    {
      id: "fixture:event:failure",
      type: "failure.detected",
      ts: ts + 4_000,
      actor: "runtime",
      payload: {
        failureId: "fixture-failure",
        executionId: "fixture-execution",
        taskId: "fixture-task",
        message: "Live runtime event feed is not wired yet.",
        severity: "high",
        recoverable: true,
        nodeId: "failure:fixture",
      },
    },
    {
      id: "fixture:event:recovery",
      type: "recovery.detected",
      ts: ts + 5_000,
      actor: "runtime",
      payload: {
        recoveryId: "fixture-recovery",
        failureId: "fixture-failure",
        executionId: "fixture-execution",
        taskId: "fixture-task",
        message: "Use deterministic fixture-backed replay until live events arrive.",
        strategy: "fixture fallback",
        nodeId: "recovery:fixture",
      },
    },
    {
      id: "fixture:event:memory",
      type: "memory.promoted",
      ts: ts + 6_000,
      actor: "runtime",
      payload: {
        memoryId: "fixture-memory",
        content: "Replay must be read-only and deterministic.",
        memoryType: "decision",
        importance: "high",
        sourceNodeIds: ["task:fixture"],
        nodeId: "memory:fixture",
      },
    },
    {
      id: "fixture:event:concept",
      type: "concept.synthesized",
      ts: ts + 7_000,
      actor: "runtime",
      payload: {
        conceptId: "fixture-concept",
        label: "Runtime lineage",
        summary: "Connect messages, tasks, executions, diffs, failures, recoveries, memory, and agents.",
        confidence: 0.91,
        sourceNodeIds: ["memory:fixture"],
        sourceEventIds: ["fixture:event:memory"],
        nodeId: "tag:fixture-concept",
      },
    },
    {
      id: "fixture:event:agent-approval",
      type: "task.updated",
      ts: ts + 8_000,
      actor: "runtime",
      source: { type: "agent-runtime", id: "ExecutionAgent", label: "CodexForge Agent Runtime" },
      metadata: { agentRole: "ExecutionAgent", permission: "approval-required", risk: "high" },
      payload: {
        taskId: "fixture-task",
        status: "blocked",
        summary: "ExecutionAgent requires approval for mutating runtime state.",
        nextAction: "Keep replay UX read-only.",
      },
    },
  ];
}

export function buildBrainReplayFixtureGraph(): CodexForgeBrainGraph {
  const ts = CODEXFORGE_BRAIN_REPLAY_FIXTURE_TS;
  return {
    version: 2,
    nodes: [
      { id: "message:fixture", kind: "message", data: { label: "Replay request", role: "user", text: "Add replay lineage UX.", ts }, meta: { createdAt: ts, updatedAt: ts, status: "done", importance: "medium" } },
      { id: "task:fixture", kind: "task", data: { label: "Replay lineage task", goal: "Explain how runtime reached current state." }, meta: { createdAt: ts + 1_000, updatedAt: ts + 8_000, status: "blocked", importance: "high" } },
      { id: "run:fixture", kind: "run", data: { label: "Replay builder run", resultSummary: "Runtime replay package planned." }, meta: { createdAt: ts + 2_000, updatedAt: ts + 5_000, status: "error", importance: "high" } },
      { id: "diff:fixture", kind: "diff", data: { label: "Replay package diff", filePath: "src/lib/codexforge/brain/runtime/replay" }, meta: { createdAt: ts + 3_000, updatedAt: ts + 3_000, status: "active", importance: "medium" } },
      { id: "memory:fixture", kind: "memory", data: { label: "Replay read-only constraint", memoryType: "decision", content: "Replay must be deterministic and read-only." }, meta: { createdAt: ts + 6_000, updatedAt: ts + 6_000, status: "done", importance: "high" } },
      { id: "tag:fixture-concept", kind: "tag", data: { label: "Runtime lineage", value: "runtime-lineage" }, meta: { createdAt: ts + 7_000, updatedAt: ts + 7_000, status: "done", importance: "medium" } },
      { id: "failure:fixture", kind: "note", data: { label: "Missing live feed", text: "Live runtime event feed is not wired yet." }, meta: { createdAt: ts + 4_000, updatedAt: ts + 4_000, status: "error", importance: "high" } },
      { id: "recovery:fixture", kind: "note", data: { label: "Fixture fallback", text: "Use fixture-backed replay." }, meta: { createdAt: ts + 5_000, updatedAt: ts + 5_000, status: "active", importance: "medium" } },
    ],
    edges: [
      { id: "edge:message-task", kind: "triggered_by", from: "message:fixture", to: "task:fixture", meta: { createdAt: ts + 1_000, updatedAt: ts + 1_000 } },
      { id: "edge:task-run", kind: "executed_in", from: "task:fixture", to: "run:fixture", meta: { createdAt: ts + 2_000, updatedAt: ts + 2_000 } },
      { id: "edge:run-diff", kind: "produced", from: "run:fixture", to: "diff:fixture", meta: { createdAt: ts + 3_000, updatedAt: ts + 3_000 } },
      { id: "edge:run-failure", kind: "references", from: "run:fixture", to: "failure:fixture", meta: { createdAt: ts + 4_000, updatedAt: ts + 4_000 } },
      { id: "edge:failure-recovery", kind: "derived_from", from: "failure:fixture", to: "recovery:fixture", meta: { createdAt: ts + 5_000, updatedAt: ts + 5_000 } },
      { id: "edge:memory-concept", kind: "derived_from", from: "memory:fixture", to: "tag:fixture-concept", meta: { createdAt: ts + 7_000, updatedAt: ts + 7_000 } },
    ],
    meta: { createdAt: ts, updatedAt: ts + 8_000 },
  };
}

export function buildBrainReplayFixtureLineage(): CodexForgeBrainLineageGraph {
  return buildBrainRuntimeLineage({
    graph: buildBrainReplayFixtureGraph(),
    events: buildBrainReplayFixtureEvents(),
    agentPlan: buildAgentRuntimeFixturePlan("high-risk-mutation"),
  });
}
