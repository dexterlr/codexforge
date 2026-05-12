import type {
  CodexForgeBrainNode,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";

const FIXTURE_NOW: CodexForgeBrainTimestamp = 1_714_000_000_000;
const ONE_DAY = 24 * 60 * 60 * 1000;

function memoryNode(args: {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  importance: CodexForgeBrainNode["meta"]["importance"];
  status: CodexForgeBrainNode["meta"]["status"];
  pinned?: boolean;
  archived?: boolean;
  tags?: string[];
}): CodexForgeBrainNode<"memory"> {
  return {
    id: args.id,
    kind: "memory",
    data: {
      label: args.content,
      memoryType: "fact",
      content: args.content,
      summary: args.content,
      tags: args.tags,
    },
    meta: {
      createdAt: args.createdAt,
      updatedAt: args.updatedAt,
      importance: args.importance,
      status: args.status,
      pinned: args.pinned,
      archived: args.archived,
      sourceRefs: [{ type: "memory-item", id: args.id }],
    },
  };
}

export function buildCognitiveMemoryFixtureNodes(): CodexForgeBrainNode[] {
  return [
    memoryNode({
      id: "memory:duplicate-a",
      content: "Runtime diagnostics should stay local first in src/lib/codexforge/brain/runtime.",
      createdAt: FIXTURE_NOW - ONE_DAY * 3,
      updatedAt: FIXTURE_NOW - ONE_DAY,
      importance: "high",
      status: "active",
      tags: ["runtime", "diagnostics"],
    }),
    memoryNode({
      id: "memory:duplicate-b",
      content: "runtime diagnostics should stay local-first in src/lib/codexforge/brain/runtime",
      createdAt: FIXTURE_NOW - ONE_DAY * 2,
      updatedAt: FIXTURE_NOW - ONE_DAY / 2,
      importance: "high",
      status: "active",
      tags: ["runtime", "diagnostics"],
    }),
    memoryNode({
      id: "memory:contradiction-allowed",
      content: "Direct graph mutation from UI is allowed.",
      createdAt: FIXTURE_NOW - ONE_DAY * 2,
      updatedAt: FIXTURE_NOW - ONE_DAY,
      importance: "medium",
      status: "active",
      tags: ["graph", "ui"],
    }),
    memoryNode({
      id: "memory:contradiction-blocked",
      content: "Direct graph mutation from UI is blocked.",
      createdAt: FIXTURE_NOW - ONE_DAY * 2,
      updatedAt: FIXTURE_NOW - ONE_DAY,
      importance: "critical",
      status: "blocked",
      tags: ["graph", "ui"],
    }),
    memoryNode({
      id: "memory:pinned-critical",
      content: "Pinned critical memory: append typed runtime events before graph reduction.",
      createdAt: FIXTURE_NOW - ONE_DAY * 5,
      updatedAt: FIXTURE_NOW - ONE_DAY,
      importance: "critical",
      status: "active",
      pinned: true,
      tags: ["runtime", "events"],
    }),
    memoryNode({
      id: "memory:stale-archived",
      content: "Stale archived memory from an old checkpoint should rank lower.",
      createdAt: FIXTURE_NOW - ONE_DAY * 180,
      updatedAt: FIXTURE_NOW - ONE_DAY * 150,
      importance: "low",
      status: "archived",
      archived: true,
      tags: ["stale", "archive"],
    }),
    memoryNode({
      id: "memory:concept-signal-a",
      content: "Local-first cognitive memory supports deterministic scoring.",
      createdAt: FIXTURE_NOW - ONE_DAY * 4,
      updatedAt: FIXTURE_NOW - ONE_DAY * 2,
      importance: "high",
      status: "active",
      tags: ["cognitive-memory", "local-first"],
    }),
    memoryNode({
      id: "memory:concept-signal-b",
      content: "Cognitive memory should provide local-first context signals.",
      createdAt: FIXTURE_NOW - ONE_DAY * 4,
      updatedAt: FIXTURE_NOW - ONE_DAY * 2,
      importance: "high",
      status: "active",
      tags: ["cognitive-memory", "context"],
    }),
  ];
}

export function buildCognitiveMemoryFixtureEvents(): CodexForgeBrainRuntimeEvent[] {
  return [
    {
      id: "event:fixture:memory-promoted-a",
      type: "memory.promoted",
      ts: FIXTURE_NOW - ONE_DAY * 2,
      actor: "runtime",
      payload: {
        memoryId: "fixture-memory-a",
        content: "Local-first cognitive memory supports deterministic scoring.",
        memoryType: "fact",
        importance: "high",
        sourceNodeIds: ["memory:concept-signal-a"],
      },
    },
    {
      id: "event:fixture:memory-promoted-b",
      type: "memory.promoted",
      ts: FIXTURE_NOW - ONE_DAY,
      actor: "runtime",
      payload: {
        memoryId: "fixture-memory-b",
        content: "Cognitive memory provides local-first context signals.",
        memoryType: "fact",
        importance: "high",
        pinned: true,
        sourceNodeIds: ["memory:concept-signal-b"],
      },
    },
    {
      id: "event:fixture:task-created",
      type: "task.created",
      ts: FIXTURE_NOW - ONE_DAY,
      actor: "user",
      payload: {
        taskId: "fixture-task-cognitive-memory",
        goal: "Build cognitive memory foundations with deterministic local-first context signals.",
        domain: "automation",
        tags: ["cognitive-memory", "local-first", "context"],
      },
    },
  ];
}
