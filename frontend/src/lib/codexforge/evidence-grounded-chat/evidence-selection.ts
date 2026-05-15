import {
  buildEvidenceGroundedChatStableKey,
  clampEvidenceChatScore,
  uniqueEvidenceChatStrings,
  type EvidenceChatSelection,
  type EvidenceChatSelectionInput,
  type EvidenceChatSelectionItem,
  type EvidenceChatTrustLevel,
  type EvidenceChatWarning,
} from "./evidence-grounded-chat-types";

function warning(id: string, label: string, kind: EvidenceChatWarning["kind"]): EvidenceChatWarning {
  return { id, label, kind };
}

function getTrustLevel(args: {
  confidence: number;
  warnings: readonly string[];
  selected: boolean;
}): EvidenceChatTrustLevel {
  const text = args.warnings.join(" ").toLowerCase();
  if (!args.selected) return "blocked";
  if (text.includes("contradict")) return "contradictory";
  if (text.includes("stale")) return "stale";
  if (args.confidence < 0.5) return "weak";
  if (args.confidence >= 0.8) return "strong";
  return "reviewed";
}

function hasSelectedId(ids: readonly string[] | undefined, id: string): boolean {
  return (ids ?? []).map((value) => value.trim()).includes(id);
}

export function buildEvidenceChatSelectionItem(args: {
  evidenceId: string;
  memoryCandidateId?: string | null;
  title: string;
  snippet: string;
  sourceTool?: string | null;
  sourceFilePath?: string | null;
  sourceLine?: number | null;
  sourceMatch?: string | null;
  confidence?: number | null;
  importance?: EvidenceChatSelectionItem["importance"];
  rawWarnings?: readonly string[];
  selected?: boolean;
}): EvidenceChatSelectionItem {
  const evidenceId = args.evidenceId.trim() || "evidence";
  const memoryCandidateId = args.memoryCandidateId?.trim() || null;
  const confidence = clampEvidenceChatScore(args.confidence ?? 0);
  const rawWarnings = uniqueEvidenceChatStrings([...(args.rawWarnings ?? [])]);
  const selected = args.selected === true;
  const trustLevel = getTrustLevel({ confidence, warnings: rawWarnings, selected });
  const staleWarning = rawWarnings.some((item) => item.toLowerCase().includes("stale"))
    ? warning(buildEvidenceGroundedChatStableKey(evidenceId, "stale"), "Stale evidence must be marked stale.", "stale")
    : null;
  const weakWarning =
    confidence < 0.5
      ? warning(buildEvidenceGroundedChatStableKey(evidenceId, "weak"), "Low confidence must be marked weak.", "weak")
      : null;
  const contradictoryWarning = rawWarnings.some((item) => item.toLowerCase().includes("contradict"))
    ? warning(buildEvidenceGroundedChatStableKey(evidenceId, "contradictory"), "Contradictory evidence must warn.", "contradictory")
    : null;
  const warnings = [
    staleWarning,
    weakWarning,
    contradictoryWarning,
    ...rawWarnings.map((item) =>
      warning(buildEvidenceGroundedChatStableKey(evidenceId, item), item, "safety")
    ),
  ].filter((item): item is EvidenceChatWarning => item !== null);

  return {
    id: buildEvidenceGroundedChatStableKey("evidence-chat-selection-item", evidenceId, memoryCandidateId),
    evidenceId,
    memoryCandidateId,
    title: args.title.trim() || evidenceId,
    snippet: args.snippet.trim() || "No evidence snippet available.",
    sourceTool: args.sourceTool?.trim() || "read-only-evidence",
    sourceFilePath: args.sourceFilePath?.trim() || null,
    sourceLine: typeof args.sourceLine === "number" && Number.isFinite(args.sourceLine) ? args.sourceLine : null,
    sourceMatch: args.sourceMatch?.trim() || null,
    confidence,
    importance: args.importance ?? "low",
    trustLevel,
    staleWarning,
    weakWarning,
    contradictoryWarning,
    warnings,
    selected,
    injectionReadiness: !selected ? "blocked" : staleWarning ? "stale" : weakWarning ? "weak" : "ready",
  };
}

export function buildEvidenceChatSelection(input: EvidenceChatSelectionInput = {}): EvidenceChatSelection {
  const items: EvidenceChatSelectionItem[] = [];

  for (const item of input.evidence ?? []) {
    const evidenceId = item.id?.trim() || buildEvidenceGroundedChatStableKey("evidence", item.label, item.filePath);
    const selected =
      input.defaultSelected === true || hasSelectedId(input.selectedEvidenceIds, evidenceId);
    items.push(
      buildEvidenceChatSelectionItem({
        evidenceId,
        title: item.label ?? evidenceId,
        snippet: item.snippet ?? item.value ?? "",
        sourceTool: item.toolName,
        sourceFilePath: item.filePath,
        sourceLine: item.lineNumber,
        sourceMatch: item.type === "match" ? item.value : null,
        confidence: item.confidence,
        importance: item.confidence && item.confidence >= 0.85 ? "high" : "medium",
        rawWarnings: item.warnings,
        selected,
      })
    );
  }

  for (const candidate of input.candidates ?? []) {
    const memoryCandidateId = candidate.id?.trim() || buildEvidenceGroundedChatStableKey("memory-candidate", candidate.title);
    const evidenceId = candidate.sourceEvidenceIds?.[0] ?? memoryCandidateId;
    const selected =
      input.defaultSelected === true ||
      hasSelectedId(input.selectedMemoryCandidateIds, memoryCandidateId) ||
      hasSelectedId(input.selectedEvidenceIds, evidenceId);
    items.push(
      buildEvidenceChatSelectionItem({
        evidenceId,
        memoryCandidateId,
        title: candidate.title ?? memoryCandidateId,
        snippet: candidate.content ?? candidate.summary?.[0] ?? "",
        sourceTool: "memory-candidate",
        sourceFilePath: candidate.relatedFilePaths?.[0] ?? null,
        sourceLine: null,
        sourceMatch: null,
        confidence: candidate.confidence,
        importance: candidate.importance,
        rawWarnings: candidate.warnings,
        selected,
      })
    );
  }

  const deduped = Array.from(new Map(items.map((item) => [item.id, item])).values()).sort((left, right) => {
    if (Number(right.selected) !== Number(left.selected)) return Number(right.selected) - Number(left.selected);
    if (right.confidence !== left.confidence) return right.confidence - left.confidence;
    return left.id.localeCompare(right.id);
  });
  const selectedItems = deduped.filter((item) => item.selected);

  return {
    id: "evidence-chat-selection",
    items: deduped,
    selectedItems,
    summary: summarizeEvidenceChatSelection({ id: "evidence-chat-selection", items: deduped, selectedItems, summary: [] }),
  };
}

export function summarizeEvidenceChatSelection(selection: EvidenceChatSelection): string[] {
  const weak = selection.items.filter((item) => item.weakWarning).length;
  const stale = selection.items.filter((item) => item.staleWarning).length;
  return [
    `${selection.selectedItems.length} selected evidence item(s) can be used for visible chat grounding.`,
    "Only selected evidence can be injected; no hidden injection is allowed.",
    `${weak} weak evidence item(s) and ${stale} stale evidence item(s) are marked before prompt use.`,
    "Selection ordering is deterministic by selected state, confidence, then stable id.",
  ];
}
