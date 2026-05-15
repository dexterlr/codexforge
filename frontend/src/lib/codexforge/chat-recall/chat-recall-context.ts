import type {
  ChatRecallContext,
  ChatRecallContextBlock,
  ChatRecallResultInput,
  ChatRecallSelection,
  ChatRecallSelectionItem,
} from "./chat-recall-types";
import { buildChatRecallStableKey } from "./chat-recall-selection";

const VERIFY_INSTRUCTION =
  "Verify against current files when editing; current file content overrides recalled memory.";

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function findResult(
  resultById: Map<string, ChatRecallResultInput>,
  item: ChatRecallSelectionItem
): ChatRecallResultInput | null {
  return resultById.get(item.recallResultId) ?? null;
}

export function buildChatRecallContextBlock(args: {
  item: ChatRecallSelectionItem;
  result?: ChatRecallResultInput | null;
}): ChatRecallContextBlock {
  const result = args.result ?? null;

  return {
    id: buildChatRecallStableKey("chat-recall-context-block", [
      args.item.recallResultId,
      args.item.nodeId,
    ]),
    recallResultId: args.item.recallResultId,
    nodeId: args.item.nodeId,
    memoryTitle: args.item.title,
    snippet: args.item.snippet,
    sourceRefs: args.item.sourceRefs,
    score: args.item.score,
    confidence: args.item.injectionReadiness === "weak" ? "weak" : "strong",
    reasons: args.item.reasons,
    relatedFiles: uniqueSorted(result?.relatedContext.files.map((file) => file.path) ?? []),
    relatedArtifacts: uniqueSorted(
      result?.relatedContext.artifacts.map((artifact) => artifact.artifactId) ?? []
    ),
    relatedRuns: uniqueSorted(result?.relatedContext.runs.map((run) => run.runId) ?? []),
    staleWarning: args.item.staleWarning,
    instruction: VERIFY_INSTRUCTION,
  };
}

export function buildChatRecallContext(args: {
  selection: ChatRecallSelection;
  results?: ChatRecallResultInput[];
}): ChatRecallContext {
  const resultById = new Map((args.results ?? []).map((result) => [result.id, result]));
  const blocks = args.selection.selectedItems
    .filter((item) => item.injectionReadiness !== "blocked")
    .map((item) =>
      buildChatRecallContextBlock({
        item,
        result: findResult(resultById, item),
      })
    );

  return {
    id: "chat-recall-context",
    blocks,
    visibleContextRequired: true,
    summary: summarizeChatRecallContext(blocks),
  };
}

export function summarizeChatRecallContext(
  contextOrBlocks: ChatRecallContext | ChatRecallContextBlock[]
): string[] {
  const blocks = Array.isArray(contextOrBlocks) ? contextOrBlocks : contextOrBlocks.blocks;

  if (blocks.length === 0) {
    return [
      "No selected recall context blocks are ready.",
      "Visible context cards are required before chat recall context can be used.",
    ];
  }

  return [
    `${blocks.length} selected recall context block(s) prepared.`,
    "Visible context cards disclose every memory used in the chat prompt.",
    VERIFY_INSTRUCTION,
  ];
}
