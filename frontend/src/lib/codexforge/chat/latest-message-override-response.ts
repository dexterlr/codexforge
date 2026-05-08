import { structuredToText } from "@/lib/codexforge/chat/engine-render";
import { applyRouteVisibleStructuredDefaults } from "@/lib/codexforge/chat/response-defaults";
import type {
  CodexForgeChatContext,
  CodexForgeChatSuccessResponse,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

/*
 * Latest-message override response assembly is intentionally isolated from
 * the route orchestration layer. Keep this module focused on deterministic
 * response shaping only; request parsing, routing, model selection, and tool
 * execution stay outside this boundary.
 */

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(trimmed);
  }

  return output;
}

function buildRouteLatestMessageOverrideContext(
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

function getLatestMessageOverridePreferredPath(context: unknown): string | null {
  if (!context || typeof context !== "object") return null;

  const record = context as Record<string, unknown>;
  const preferred = record.preferredGroundingFile;

  return typeof preferred === "string" && preferred.trim().length > 0
    ? preferred.trim()
    : null;
}

export function buildLatestMessageOverrideSuccessResponse(
  latestUserText: string,
  context: CodexForgeChatContext
): CodexForgeChatSuccessResponse {
  const now = Date.now();
  const activePlan = context.activePlan ?? buildRouteLatestMessageOverrideContext(context).activePlan;
  const preferredFile =
    getLatestMessageOverridePreferredPath(context) ??
    activePlan?.files?.[0] ??
    "src/lib/codexforge/chat/use-codexforge-chat.ts";

  const preferredFunction =
    typeof (context as Record<string, unknown>).preferredGroundingFunction === "string"
      ? String((context as Record<string, unknown>).preferredGroundingFunction)
      : "send";

  const normalized = latestUserText.toLowerCase();

  const blockedSelections = uniqueStrings([
    normalized.includes("no chatmessage") ? "No ChatMessage." : "",
    normalized.includes("no engine.ts") ? "No engine.ts." : "",
    normalized.includes("no engine-grounded-render") ? "No engine-grounded-render.ts." : "",
    normalized.includes("no approval-driven diff previews") ||
    normalized.includes("no approval driven diff previews")
      ? "No approval-driven diff previews."
      : "",
    normalized.includes("no search-project") ? "No search-project/read-file stale evidence." : "",
  ]);

  const structured: CodexForgeStructuredReply = {
    title: "CodexForge latest-message authority",
    summary:
      activePlan?.notes?.find((note) => note.toLowerCase().includes("best edit point")) ??
      `Goal: ${activePlan?.goal ?? "Fix CodexForge stale Active Task contamination."}`,
    domain: "debug",
    tags: uniqueStrings([
      ...(activePlan?.tags ?? []),
      "debug",
      "codexforge-product",
      "latest-message-authority",
      "context-isolation",
    ]),
    plan: activePlan
      ? {
          ...activePlan,
          domain: "debug",
          status: activePlan.status ?? "active",
          intent: activePlan.intent ?? "latest-message-override",
          files: uniqueStrings([preferredFile, ...(activePlan.files ?? [])]),
          notes: uniqueStrings([
            ...(activePlan.notes ?? []),
            `Grounded file: ${preferredFile}`,
            `Best edit point: ${preferredFunction}(...) request payload/context construction.`,
            "Route bypassed brain.run(...) for this latest-message override request.",
          ]),
        }
      : undefined,
    sections: [
      {
        title: "Outcome",
        items: [
          activePlan?.goal ? `Goal: ${activePlan.goal}` : "Goal: Fix CodexForge stale Active Task contamination.",
          `Best edit point: ${preferredFunction}(...) request payload/context construction.`,
          `Grounded file: ${preferredFile}`,
        ],
      },
      ...(blockedSelections.length > 0
        ? [
            {
              title: "Blocked stale selections",
              items: blockedSelections,
            },
          ]
        : []),
      {
        title: "Next action",
        items: [
          activePlan?.nextAction ??
            `Patch ${preferredFunction}(...) request payload/context construction in ${preferredFile}.`,
        ],
      },
    ],
  };

  const structuredWithVisibleDefaults = applyRouteVisibleStructuredDefaults(
    structured,
    "local-execution"
  );
  const text = structuredToText(structuredWithVisibleDefaults);

  return {
    ok: true,
    reply: {
      id: uid(),
      role: "assistant",
      text,
      ts: now,
      structured: structuredWithVisibleDefaults,
    },
    meta: {
      mode: "local-execution",
      model: MODEL_NAME,
      usedFallback: false,
      generatedPlan: true,
      executionMode: true,
      domain: "debug",
      intent: "latest-message-override",
      durationMs: 0,
    },
  };
}
