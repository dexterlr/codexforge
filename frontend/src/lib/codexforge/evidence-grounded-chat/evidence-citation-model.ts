import {
  buildEvidenceGroundedChatStableKey,
  type EvidenceCitation,
  type EvidenceCitationModel,
  type EvidenceChatSelectionItem,
  type EvidenceGroundingContext,
} from "./evidence-grounded-chat-types";

export function buildEvidenceCitation(item: EvidenceChatSelectionItem, index = 0): EvidenceCitation {
  const citationId = buildEvidenceGroundedChatStableKey("local-citation", index + 1, item.evidenceId);
  const sourceLabel = item.sourceFilePath ?? item.sourceTool;
  const lineText = item.sourceLine !== null ? `:${item.sourceLine}` : "";
  const warning = item.staleWarning?.label ?? item.weakWarning?.label ?? item.contradictoryWarning?.label ?? null;

  return {
    id: citationId,
    citationId,
    sourceLabel,
    sourceType: item.memoryCandidateId ? "memory-candidate" : item.sourceFilePath ? "file" : "read-only-evidence",
    filePath: item.sourceFilePath,
    line: item.sourceLine,
    match: item.sourceMatch,
    evidenceId: item.evidenceId,
    confidence: item.confidence,
    warning,
    displayText: `${sourceLabel}${lineText} -> evidence ${item.evidenceId}`,
  };
}

export function buildEvidenceCitationModel(args: {
  selectedItems?: readonly EvidenceChatSelectionItem[];
  context?: EvidenceGroundingContext;
}): EvidenceCitationModel {
  const selectedItems = args.selectedItems ?? [];
  const citations =
    selectedItems.length > 0
      ? selectedItems.map(buildEvidenceCitation)
      : (args.context?.blocks ?? []).map((block, index) => ({
          id: buildEvidenceGroundedChatStableKey("local-citation", index + 1, block.evidenceId),
          citationId: buildEvidenceGroundedChatStableKey("local-citation", index + 1, block.evidenceId),
          sourceLabel: block.sourceRefs[0] ?? block.evidenceTitle,
          sourceType: "derived" as const,
          filePath: block.filePaths[0] ?? null,
          line: Number(block.matchedLines.find((line) => /^\d+$/.test(line)) ?? NaN) || null,
          match: block.matchedLines.find((line) => !/^\d+$/.test(line)) ?? null,
          evidenceId: block.evidenceId,
          confidence: block.confidence,
          warning: block.warnings[0] ?? null,
          displayText: `${block.sourceRefs[0] ?? block.evidenceTitle} -> evidence ${block.evidenceId}`,
        }));

  return {
    id: "evidence-citation-model",
    citations,
    summary: summarizeEvidenceCitations({ id: "evidence-citation-model", citations, summary: [] }),
  };
}

export function summarizeEvidenceCitations(model: EvidenceCitationModel): string[] {
  return [
    `${model.citations.length} local evidence citation(s) prepared.`,
    "Citation model includes file/path/line/match/evidence id when available.",
    "No external citation system is used.",
  ];
}
