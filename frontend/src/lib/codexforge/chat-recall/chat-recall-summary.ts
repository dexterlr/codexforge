import type {
  ChatRecallGroundingPolicy,
  ChatRecallSelection,
  ChatRecallSummary,
} from "./chat-recall-types";

export function buildChatRecallSummary(args: {
  selection: ChatRecallSelection;
  policy: ChatRecallGroundingPolicy;
}): ChatRecallSummary {
  const weakCount = args.policy.weakItemIds.length;
  const staleCount = args.policy.staleItemIds.length;

  return {
    id: "chat-recall-summary",
    selectedCount: args.selection.selectedItems.length,
    weakCount,
    staleCount,
    promptReady: args.policy.allowContext,
    summary: [
      `${args.selection.selectedItems.length} selected visible recall card(s).`,
      `${weakCount} weak and ${staleCount} stale memory warning(s).`,
      args.policy.allowContext
        ? "Chat recall context is ready for explicit copy or prompt injection."
        : "Chat recall context is waiting for visible selected cards.",
    ],
  };
}
