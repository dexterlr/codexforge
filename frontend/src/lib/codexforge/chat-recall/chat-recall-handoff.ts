import type {
  ChatRecallContext,
  ChatRecallGroundingPolicy,
  ChatRecallHandoff,
  ChatRecallSafetyBoundary,
} from "./chat-recall-types";

function formatSourceRefs(block: ChatRecallContext["blocks"][number]): string {
  if (block.sourceRefs.length === 0) return "Source refs: none";

  return `Source refs: ${block.sourceRefs
    .map((ref) => `${ref.type}:${ref.id}`)
    .join(", ")}`;
}

function formatBlock(block: ChatRecallContext["blocks"][number]): string {
  return [
    `- ${block.memoryTitle}`,
    `  Node: ${block.nodeId}`,
    `  Score: ${block.score} (${block.confidence})`,
    `  ${formatSourceRefs(block)}`,
    block.staleWarning.stale ? `  Stale warning: ${block.staleWarning.label}` : "",
    `  Snippet: ${block.snippet}`,
    block.relatedFiles.length > 0 ? `  Related files: ${block.relatedFiles.join(", ")}` : "",
    block.relatedArtifacts.length > 0
      ? `  Related artifacts: ${block.relatedArtifacts.join(", ")}`
      : "",
    block.relatedRuns.length > 0 ? `  Related runs: ${block.relatedRuns.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildChatRecallPromptPrefix(args: {
  context: ChatRecallContext;
  policy: ChatRecallGroundingPolicy;
  safety: ChatRecallSafetyBoundary;
}): string {
  return [
    "Selected Brain recall context for this chat:",
    "",
    "Use this as context, not as proof.",
    "Inspect current files before proposing edits.",
    "Do not write files without approval.",
    "Verify current files before editing.",
    "No hidden context injection; these visible context cards are the complete recall payload.",
    "",
    "Selected memories:",
    ...(args.context.blocks.length > 0
      ? args.context.blocks.map(formatBlock)
      : ["- No selected visible recall context."]),
    "",
    "Grounding policy:",
    ...args.policy.rules.map((rule) => `- ${rule}`),
    "",
    "Safety boundary:",
    ...args.safety.rules.map((rule) => `- ${rule}`),
  ].join("\n");
}

export function buildChatRecallHandoff(args: {
  context: ChatRecallContext;
  policy: ChatRecallGroundingPolicy;
  safety: ChatRecallSafetyBoundary;
}): ChatRecallHandoff {
  const handoff: ChatRecallHandoff = {
    id: "chat-recall-handoff",
    selectedItemIds: args.context.blocks.map((block) => block.recallResultId),
    promptPrefix: buildChatRecallPromptPrefix(args),
    summary: [],
  };

  return { ...handoff, summary: summarizeChatRecallHandoff(handoff) };
}

export function summarizeChatRecallHandoff(handoff: ChatRecallHandoff): string[] {
  return [
    `${handoff.selectedItemIds.length} selected memory block(s) included in the visible chat handoff.`,
    "Handoff says context not proof and says inspect current files before edits.",
    "No prompt is sent automatically.",
  ];
}
