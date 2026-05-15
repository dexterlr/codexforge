import type {
  EvidenceCitationModel,
  EvidenceGroundingContext,
  EvidenceGroundingSummary,
  EvidenceTrustPolicy,
} from "./evidence-grounded-chat-types";

export function buildEvidenceGroundingSummary(args: {
  context: EvidenceGroundingContext;
  citations: EvidenceCitationModel;
  policy: EvidenceTrustPolicy;
}): EvidenceGroundingSummary {
  const summary = {
    id: "evidence-grounding-summary" as const,
    selectedCount: args.context.blocks.length,
    citationCount: args.citations.citations.length,
    weakCount: args.policy.weakItemIds.length,
    staleCount: args.policy.staleItemIds.length,
    promptReady: args.context.blocks.length > 0 && args.policy.allowedItemIds.length > 0,
    summary: [] as string[],
  };

  return {
    ...summary,
    summary: [
      `${summary.selectedCount} selected evidence block(s) visible in chat grounding.`,
      `${summary.citationCount} local citation(s), ${summary.weakCount} weak warning(s), ${summary.staleCount} stale warning(s).`,
      summary.promptReady ? "Prompt prefix is ready for copy/use." : "Prompt prefix is safety-only until evidence is selected.",
    ],
  };
}
