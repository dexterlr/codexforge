import type {
  EvidenceCitationModel,
  EvidenceGroundedChatPrompt,
  EvidenceGroundingContext,
  EvidenceTrustPolicy,
} from "./evidence-grounded-chat-types";

export function buildEvidencePromptPrefix(args: {
  context: EvidenceGroundingContext;
  citations: EvidenceCitationModel;
  policy: EvidenceTrustPolicy;
}): string {
  const evidenceLines = args.context.blocks.flatMap((block, index) => [
    `Evidence ${index + 1}: ${block.evidenceTitle}`,
    `Snippet: ${block.evidenceSnippet}`,
    `Sources: ${block.sourceRefs.length > 0 ? block.sourceRefs.join(", ") : "local evidence only"}`,
    `Confidence: ${(block.confidence * 100).toFixed(0)}% / Trust: ${block.trustLevel}`,
    block.warnings.length > 0 ? `Warnings: ${block.warnings.join("; ")}` : "Warnings: none",
  ]);
  const citationLines = args.citations.citations.map((citation) => `Citation: ${citation.displayText}`);

  return [
    "Evidence-Grounded Chat Context",
    "Use this as context, not proof.",
    "Verify current files before proposing edits.",
    "Do not write files without Safe Patch Preview.",
    "Preserve latest-message authority.",
    "Selected evidence only. No hidden context injection.",
    "",
    evidenceLines.length > 0 ? evidenceLines.join("\n") : "No selected evidence is ready for injection.",
    citationLines.length > 0 ? citationLines.join("\n") : "No local citations available.",
    args.policy.weakItemIds.length > 0 ? `Weak evidence: ${args.policy.weakItemIds.join(", ")}` : "Weak evidence: none",
    args.policy.staleItemIds.length > 0 ? `Stale evidence: ${args.policy.staleItemIds.join(", ")}` : "Stale evidence: none",
  ].join("\n");
}

export function buildEvidenceGroundedChatPrompt(args: {
  context: EvidenceGroundingContext;
  citations: EvidenceCitationModel;
  policy: EvidenceTrustPolicy;
}): EvidenceGroundedChatPrompt {
  const prefix = buildEvidencePromptPrefix(args);
  const warnings = [
    ...args.context.blocks.flatMap((block) => block.warnings),
    ...args.policy.rules.filter((rule) => rule.state !== "allow").map((rule) => rule.detail),
  ];

  return {
    id: "evidence-grounded-chat-prompt",
    prefix,
    selectedEvidenceIds: args.context.blocks.map((block) => block.evidenceId),
    citationIds: args.citations.citations.map((citation) => citation.citationId),
    warnings,
    summary: summarizeEvidenceGroundedChatPrompt({ id: "evidence-grounded-chat-prompt", prefix, selectedEvidenceIds: args.context.blocks.map((block) => block.evidenceId), citationIds: args.citations.citations.map((citation) => citation.citationId), warnings, summary: [] }),
  };
}

export function summarizeEvidenceGroundedChatPrompt(prompt: EvidenceGroundedChatPrompt): string[] {
  return [
    `${prompt.selectedEvidenceIds.length} selected evidence id(s) included in visible prompt prefix.`,
    `${prompt.citationIds.length} local citation id(s) included.`,
    "Prompt says use context, not proof; verify current files; do not write files without Safe Patch Preview.",
    "Prompt preserves latest-message authority.",
  ];
}
