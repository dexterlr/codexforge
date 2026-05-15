import type {
  ChatRecallReadiness,
  ChatRecallResultInput,
  ChatRecallSelection,
  ChatRecallSelectionItem,
  ChatRecallStaleWarning,
} from "./chat-recall-types";

const WEAK_SCORE_THRESHOLD = 3;

export function buildChatRecallStableKey(
  prefix: string,
  parts: Array<string | number | null | undefined>
): string {
  return [prefix, ...parts.map((part) => String(part ?? "none"))]
    .join(":")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function dedupeStrings(values: string[]): string[] {
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

function buildStaleWarning(result: ChatRecallResultInput): ChatRecallStaleWarning {
  const reasons = dedupeStrings([
    ...result.reasons.filter((reason) => reason.toLowerCase().includes("stale")),
    ...result.reasons.filter((reason) => reason.toLowerCase().includes("archived")),
    ...result.reasons.filter((reason) => reason.toLowerCase().includes("outdated")),
  ]);
  const stale = reasons.length > 0;

  return {
    stale,
    label: stale
      ? "Recalled memory may be stale; verify current files before editing."
      : "No stale marker found; still verify current files before editing.",
    reasons,
  };
}

function resolveReadiness(
  result: ChatRecallResultInput,
  staleWarning: ChatRecallStaleWarning
): ChatRecallReadiness {
  if (!result.nodeId || !result.title.trim()) return "blocked";
  if (staleWarning.stale) return "stale";
  if (result.score < WEAK_SCORE_THRESHOLD) return "weak";
  return "ready";
}

export function buildChatRecallSelectionItem(args: {
  result: ChatRecallResultInput;
  selected?: boolean;
}): ChatRecallSelectionItem {
  const staleWarning = buildStaleWarning(args.result);

  return {
    id: buildChatRecallStableKey("chat-recall-item", [
      args.result.id,
      args.result.nodeId,
    ]),
    recallResultId: args.result.id,
    nodeId: args.result.nodeId,
    title: args.result.title,
    snippet: args.result.snippet,
    score: args.result.score,
    reasons: dedupeStrings(args.result.reasons),
    sourceRefs: args.result.sourceRefs,
    staleWarning,
    selected: args.selected === true,
    injectionReadiness: resolveReadiness(args.result, staleWarning),
  };
}

export function buildChatRecallSelection(args: {
  results: ChatRecallResultInput[];
  selectedResultIds?: string[];
}): ChatRecallSelection {
  const selectedIds = new Set(args.selectedResultIds ?? []);
  const items = [...args.results]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.title !== b.title) return a.title.localeCompare(b.title);
      return a.id.localeCompare(b.id);
    })
    .map((result) =>
      buildChatRecallSelectionItem({
        result,
        selected: selectedIds.has(result.id),
      })
    );
  const selectedItems = items.filter((item) => item.selected);

  return {
    id: "chat-recall-selection",
    items,
    selectedItems,
    summary: summarizeChatRecallSelection({ items, selectedItems }),
  };
}

export function summarizeChatRecallSelection(
  selection: Pick<ChatRecallSelection, "items" | "selectedItems">
): string[] {
  if (selection.items.length === 0) {
    return [
      "No recall items are available for chat context.",
      "No hidden context injection is allowed.",
    ];
  }

  return [
    `${selection.selectedItems.length} of ${selection.items.length} visible recall cards selected for chat context.`,
    "Only selected recall items are eligible for injection.",
    "Ordering is deterministic by score, title, and recall id.",
  ];
}
