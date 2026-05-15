import type { ChatRecallSafetyBoundary } from "./chat-recall-types";

const SAFETY_RULES = [
  "Recalled memory may be stale.",
  "Verify current files before editing.",
  "Memory is context, not authority.",
  "No file mutation without safe preview.",
  "No hidden context injection.",
  "No Brain graph mutation from chat UI.",
  "No memory promotion from chat UI.",
];

export function buildChatRecallSafetyBoundary(): ChatRecallSafetyBoundary {
  return {
    id: "chat-recall-safety-boundary",
    rules: SAFETY_RULES,
    summary: summarizeChatRecallSafetyBoundary(SAFETY_RULES),
  };
}

export function summarizeChatRecallSafetyBoundary(
  boundaryOrRules: ChatRecallSafetyBoundary | string[]
): string[] {
  const rules = Array.isArray(boundaryOrRules)
    ? boundaryOrRules
    : boundaryOrRules.rules;

  return [
    `${rules.length} chat recall safety rules are visible.`,
    "Recalled memory may be stale; verify current files before editing.",
    "No hidden context injection and no file mutation without safe preview.",
  ];
}
