import type {
  ChatRecallContext,
  ChatRecallGroundingPolicy,
  ChatRecallSelection,
} from "./chat-recall-types";

const POLICY_RULES = [
  "Only selected recall items are injected.",
  "Low-score recall must be marked weak.",
  "Stale memory must be marked stale.",
  "File edits must prefer current file content over recalled memory.",
  "Chat must show visible context cards.",
  "No graph mutation from chat recall.",
  "No memory promotion from chat recall.",
];

export function isChatRecallContextAllowed(args: {
  selection: ChatRecallSelection;
  context: ChatRecallContext;
}): boolean {
  if (args.context.blocks.length === 0) return false;
  if (!args.context.visibleContextRequired) return false;

  const selectedIds = new Set(args.selection.selectedItems.map((item) => item.recallResultId));

  return args.context.blocks.every((block) => selectedIds.has(block.recallResultId));
}

export function buildChatRecallGroundingPolicy(args: {
  selection: ChatRecallSelection;
  context: ChatRecallContext;
}): ChatRecallGroundingPolicy {
  const weakItemIds = args.selection.selectedItems
    .filter((item) => item.injectionReadiness === "weak")
    .map((item) => item.id);
  const staleItemIds = args.selection.selectedItems
    .filter((item) => item.injectionReadiness === "stale")
    .map((item) => item.id);
  const blockedItemIds = args.selection.selectedItems
    .filter((item) => item.injectionReadiness === "blocked")
    .map((item) => item.id);
  const allowContext =
    blockedItemIds.length === 0 &&
    isChatRecallContextAllowed({
      selection: args.selection,
      context: args.context,
    });

  return {
    id: "chat-recall-grounding-policy",
    allowContext,
    rules: POLICY_RULES,
    weakItemIds,
    staleItemIds,
    blockedItemIds,
    summary: summarizeChatRecallGroundingPolicy({
      allowContext,
      rules: POLICY_RULES,
      weakItemIds,
      staleItemIds,
      blockedItemIds,
    }),
  };
}

export function summarizeChatRecallGroundingPolicy(
  policy: Pick<
    ChatRecallGroundingPolicy,
    "allowContext" | "rules" | "weakItemIds" | "staleItemIds" | "blockedItemIds"
  >
): string[] {
  return [
    policy.allowContext
      ? "Selected visible recall context is allowed for prompt handoff."
      : "Recall context is not allowed until selected visible cards are ready.",
    `${policy.weakItemIds.length} weak selected item(s), ${policy.staleItemIds.length} stale selected item(s), ${policy.blockedItemIds.length} blocked selected item(s).`,
    "Policy only allows selected recall items and forbids hidden context injection.",
  ];
}
