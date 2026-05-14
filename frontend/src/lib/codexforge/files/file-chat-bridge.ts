import type { CodexForgeFileBrainContext } from "./file-brain-context";
import type { CodexForgeFileReadinessBoard } from "./file-readiness";
import type { CodexForgeFileSafeNextAction } from "./file-safe-next-action";
import type { CodexForgeFileNode } from "./types";

export type CodexForgeFileChatBridgeInput = {
  file: CodexForgeFileNode;
  brainContext: CodexForgeFileBrainContext;
  readinessBoard: CodexForgeFileReadinessBoard;
  safeNextAction: CodexForgeFileSafeNextAction;
  suggestedSmokeTests?: string[];
};

function listLines(values: string[], fallback: string): string[] {
  if (values.length === 0) return [`- ${fallback}`];
  return values.map((value) => `- ${value}`);
}

function relatedMemoryLines(context: CodexForgeFileBrainContext): string[] {
  if (context.relatedNodes.length === 0) {
    return ["- No related Brain memory found by deterministic path, route, subsystem, concept, or smoke matching."];
  }

  return context.relatedNodes.slice(0, 6).map((item) => {
    const reasons = item.reasons.join(", ");
    return `- ${item.label} (${item.kind}, score ${item.score}, ${reasons}): ${item.summary}`;
  });
}

function readinessLines(board: CodexForgeFileReadinessBoard): string[] {
  return board.items.map((item) => `- ${item.label}: ${item.status} (${item.score}/100). ${item.summary}`);
}

export function buildFileBrainPromptContext(input: CodexForgeFileChatBridgeInput): string {
  const smokeTests =
    input.suggestedSmokeTests?.length
      ? input.suggestedSmokeTests
      : input.brainContext.relatedSmokeScripts;

  return [
    "Selected file",
    `- Path: ${input.file.path}`,
    `- Role: ${input.file.architectureRole}`,
    `- Owner area: ${input.file.ownerArea}`,
    `- Kind: ${input.file.kind}`,
    "",
    "Related Brain memories",
    ...relatedMemoryLines(input.brainContext),
    "",
    "Top concepts",
    ...listLines(input.brainContext.topConcepts, "No concepts inferred yet."),
    "",
    "Risks and readiness",
    ...listLines(input.brainContext.topRisks, "No elevated risks detected."),
    ...readinessLines(input.readinessBoard),
    "",
    "Suggested smoke tests",
    ...listLines(smokeTests, "Ask for the smallest targeted build or smoke validation plan."),
    "",
    "Safe next action",
    `- ${input.safeNextAction.label}: ${input.safeNextAction.detail}`,
  ].join("\n");
}

export function buildFileToChatPrompt(input: CodexForgeFileChatBridgeInput): string {
  return [
    "CodexForge File Brain Chat handoff",
    "",
    buildFileBrainPromptContext(input),
    "",
    "Instructions",
    "- Inspect the selected file and related context first.",
    "- Propose a short plan before editing.",
    "- Do not mutate files, apply patches, run commands, or change Brain memory without explicit operator approval.",
    "- Keep the workflow local-first, deterministic, and preview-only until approval is granted.",
  ].join("\n");
}

export function buildFileWorkspacePrompt(input: CodexForgeFileChatBridgeInput): string {
  return [
    "Use this selected file as workspace context.",
    "",
    buildFileBrainPromptContext(input),
    "",
    "Workspace request",
    "Inspect first, explain the likely impact, identify missing context, and recommend the safest next step. Do not mutate anything without approval.",
  ].join("\n");
}

export function summarizeFileChatBridge(input: CodexForgeFileChatBridgeInput): string {
  return `${input.file.path} prompt includes ${input.brainContext.relatedNodes.length} Brain memories, ${input.readinessBoard.items.length} readiness gates, and safe action: ${input.safeNextAction.label}.`;
}
