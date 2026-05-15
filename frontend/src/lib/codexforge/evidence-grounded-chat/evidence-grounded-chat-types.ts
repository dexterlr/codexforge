import type {
  EvidenceMemoryCandidate,
  EvidenceMemoryImportance,
  NormalizedEvidenceItem,
} from "@/lib/codexforge/evidence-memory";

export type EvidenceChatTrustLevel =
  | "reviewed"
  | "strong"
  | "medium"
  | "weak"
  | "stale"
  | "contradictory"
  | "blocked";

export type EvidenceChatReadiness = "ready" | "weak" | "stale" | "blocked";

export type EvidenceChatSourceType =
  | "read-only-evidence"
  | "memory-candidate"
  | "chat-recall"
  | "file"
  | "tool"
  | "derived";

export type EvidenceChatWarning = {
  id: string;
  label: string;
  kind: "weak" | "stale" | "contradictory" | "blocked" | "safety";
};

export type EvidenceChatSelectionInput = {
  evidence?: readonly Partial<NormalizedEvidenceItem>[];
  candidates?: readonly Partial<EvidenceMemoryCandidate>[];
  selectedEvidenceIds?: readonly string[];
  selectedMemoryCandidateIds?: readonly string[];
  defaultSelected?: boolean;
};

export type EvidenceChatSelectionItem = {
  id: string;
  evidenceId: string;
  memoryCandidateId: string | null;
  title: string;
  snippet: string;
  sourceTool: string;
  sourceFilePath: string | null;
  sourceLine: number | null;
  sourceMatch: string | null;
  confidence: number;
  importance: EvidenceMemoryImportance;
  trustLevel: EvidenceChatTrustLevel;
  staleWarning: EvidenceChatWarning | null;
  weakWarning: EvidenceChatWarning | null;
  contradictoryWarning: EvidenceChatWarning | null;
  warnings: EvidenceChatWarning[];
  selected: boolean;
  injectionReadiness: EvidenceChatReadiness;
};

export type EvidenceChatSelection = {
  id: "evidence-chat-selection";
  items: EvidenceChatSelectionItem[];
  selectedItems: EvidenceChatSelectionItem[];
  summary: string[];
};

export type EvidenceGroundingBlock = {
  id: string;
  evidenceId: string;
  evidenceTitle: string;
  evidenceSnippet: string;
  sourceRefs: string[];
  filePaths: string[];
  matchedLines: string[];
  confidence: number;
  trustLevel: EvidenceChatTrustLevel;
  warnings: string[];
  relatedMemoryIds: string[];
  instructionVerifyCurrentFiles: "Verify current files before edits.";
  instructionContextNotAuthority: "Evidence is context, not authority.";
};

export type EvidenceGroundingContext = {
  id: "evidence-grounding-context";
  blocks: EvidenceGroundingBlock[];
  visibleContextRequired: true;
  summary: string[];
};

export type EvidenceCitation = {
  id: string;
  citationId: string;
  sourceLabel: string;
  sourceType: EvidenceChatSourceType;
  filePath: string | null;
  line: number | null;
  match: string | null;
  evidenceId: string;
  confidence: number;
  warning: string | null;
  displayText: string;
};

export type EvidenceCitationModel = {
  id: "evidence-citation-model";
  citations: EvidenceCitation[];
  summary: string[];
};

export type EvidenceTrustPolicyRule = {
  id: string;
  label: string;
  state: "allow" | "warn" | "block";
  detail: string;
};

export type EvidenceTrustPolicy = {
  id: "evidence-trust-policy";
  selectedEvidenceOnly: true;
  lowConfidenceMarkedWeak: true;
  staleEvidenceMarkedStale: true;
  contradictoryEvidenceWarns: true;
  currentFilesPreferredForEdits: true;
  evidenceIsContextNotProof: true;
  hiddenContextInjectionAllowed: false;
  memoryPromotionFromChatAllowed: false;
  graphMutationFromChatAllowed: false;
  fileMutationWithoutSafePatchPreviewAllowed: false;
  allowedItemIds: string[];
  blockedItemIds: string[];
  weakItemIds: string[];
  staleItemIds: string[];
  rules: EvidenceTrustPolicyRule[];
  summary: string[];
};

export type EvidenceGroundedChatPrompt = {
  id: "evidence-grounded-chat-prompt";
  prefix: string;
  selectedEvidenceIds: string[];
  citationIds: string[];
  warnings: string[];
  summary: string[];
};

export type EvidenceGroundedReplySection = {
  title:
    | "Evidence used"
    | "Confidence and caveats"
    | "Files to verify"
    | "Safe next step"
    | "No mutation boundary";
  items: string[];
};

export type EvidenceGroundedReplySections = {
  id: "evidence-grounded-reply-sections";
  sections: EvidenceGroundedReplySection[];
  summary: string[];
};

export type EvidenceGroundingSummary = {
  id: "evidence-grounding-summary";
  selectedCount: number;
  citationCount: number;
  weakCount: number;
  staleCount: number;
  promptReady: boolean;
  summary: string[];
};

export function buildEvidenceGroundedChatStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function clampEvidenceChatScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(1, Math.max(0, numeric));
}

export function uniqueEvidenceChatStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}
