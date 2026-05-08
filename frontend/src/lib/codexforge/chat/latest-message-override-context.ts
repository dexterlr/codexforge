import type { CodexForgeChatContext } from "@/lib/codexforge/types";

/*
 * Latest-message override context helpers are shared by the route and the
 * deterministic latest-message response builder. Keep this module pure:
 * no request parsing, no response creation, no model/tool execution.
 */

export function buildRouteLatestMessageOverrideContext(
  context: CodexForgeChatContext
): CodexForgeChatContext {
  return {
    ...context,
    memory: [],
    graph: undefined,
    activePlan: {
      goal:
        "Fix CodexForge stale Active Task contamination. The latest message must override stale active task context for this request.",
      nextAction:
        "Patch request payload/context construction in useCodexForgeChat so stale active task, memory, graph, and broad repo grounding are bypassed request-scope only.",
      domain: "debug",
      status: "active",
      intent: "capability-plan",
      files: [
        "src/lib/codexforge/chat/use-codexforge-chat.ts",
        "src/app/api/codexforge/chat/route.ts",
        "src/lib/codexforge/types.ts",
      ],
      steps: [
        "Detect latest-message override intent before constructing the outbound chat request context.",
        "Suppress stale activeTask, activePlan carryover, memory carryover, graph context, and broad safe-tool grounding for this request only.",
        "Return the pinned grounded edit point instead of stale diff-preview or repo-tool output.",
      ],
      risks: [
        "Do not permanently delete active task or memory.",
        "Do not suppress useful context for normal follow-up messages.",
        "Do not select approveDiffs, engine.ts, ChatMessage, engine-grounded-render.ts, or diff-preview files for this request.",
      ],
      tags: [
        "debug",
        "codexforge-product",
        "active-task",
        "context-isolation",
        "latest-message-authority",
        "task-routing",
      ],
      notes: [
        "Grounded file: src/lib/codexforge/chat/use-codexforge-chat.ts",
        "Best edit point: send(...) request payload/context construction in useCodexForgeChat.",
        "Server route forced latest-message override context before graph, grounding, routing, and engine execution.",
      ],
    },
    execution: {
      ...context.execution,
      running: false,
      stepIndex: null,
      lastRunLabel: "",
      enginePhase: "idle",
      diffCount: 0,
      snapshotFileCount: 0,
    },
    latestMessageOverridesActiveTask: true,
    activeTaskSuppressedForRequest: true,
    activePlanGoalSource: "latest-user-message",
    preferredGroundingFile: "src/lib/codexforge/chat/use-codexforge-chat.ts",
    preferredGroundingFunction: "send",
    suppressBroadRepoSearch: true,
    suppressStaleGraphContext: true,
  } as CodexForgeChatContext;
}

export function getLatestMessageOverridePreferredPath(context: unknown): string | null {
  if (!context || typeof context !== "object") return null;

  const record = context as Record<string, unknown>;
  const preferred = record.preferredGroundingFile;

  return typeof preferred === "string" && preferred.trim().length > 0
    ? preferred.trim()
    : null;
}
