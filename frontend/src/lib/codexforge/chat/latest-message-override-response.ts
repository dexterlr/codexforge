import { structuredToText } from "@/lib/codexforge/chat/engine-render";
import { applyRouteVisibleStructuredDefaults } from "@/lib/codexforge/chat/response-defaults";
import { buildRouteLatestMessageOverrideContext, getLatestMessageOverridePreferredPath } from "@/lib/codexforge/chat/latest-message-override-context";
import type {
  CodexForgeChatContext,
  CodexForgeChatSuccessResponse,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

type LatestMessageOverrideResponseDeps = {
  makeId: () => string;
  modelName: string;
};

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

export function buildLatestMessageOverrideSuccessResponse(
  latestUserText: string,
  context: CodexForgeChatContext,
  deps: LatestMessageOverrideResponseDeps
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
      id: deps.makeId(),
      role: "assistant",
      text,
      ts: now,
      structured: structuredWithVisibleDefaults,
    },
    meta: {
      mode: "local-execution",
      model: deps.modelName,
      usedFallback: false,
      generatedPlan: true,
      executionMode: true,
      domain: "debug",
      intent: "latest-message-override",
      durationMs: 0,
    },
  };
}
