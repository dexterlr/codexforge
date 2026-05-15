import {
  type EvidenceChatSelection,
  type EvidenceChatSelectionItem,
  type EvidenceTrustPolicy,
  type EvidenceTrustPolicyRule,
} from "./evidence-grounded-chat-types";

export function isEvidenceAllowedForChatGrounding(item: EvidenceChatSelectionItem): boolean {
  return item.selected && item.injectionReadiness !== "blocked";
}

function rule(
  id: string,
  label: string,
  state: EvidenceTrustPolicyRule["state"],
  detail: string
): EvidenceTrustPolicyRule {
  return { id, label, state, detail };
}

export function buildEvidenceTrustPolicy(selection: EvidenceChatSelection): EvidenceTrustPolicy {
  const allowedItemIds = selection.items.filter(isEvidenceAllowedForChatGrounding).map((item) => item.id);
  const blockedItemIds = selection.items.filter((item) => !isEvidenceAllowedForChatGrounding(item)).map((item) => item.id);
  const weakItemIds = selection.items.filter((item) => item.weakWarning).map((item) => item.id);
  const staleItemIds = selection.items.filter((item) => item.staleWarning).map((item) => item.id);
  const contradictoryItemIds = selection.items.filter((item) => item.contradictoryWarning).map((item) => item.id);
  const rules = [
    rule("selected-evidence-only", "selected evidence only", "block", "Unselected evidence is blocked from chat grounding."),
    rule("weak-evidence-warning", "low confidence must be marked weak", weakItemIds.length > 0 ? "warn" : "allow", "Low confidence evidence remains visible with a weak warning."),
    rule("stale-evidence-warning", "stale evidence must be marked stale", staleItemIds.length > 0 ? "warn" : "allow", "Stale evidence remains visible with a stale warning."),
    rule("contradictory-evidence-warning", "contradictory evidence must warn", contradictoryItemIds.length > 0 ? "warn" : "allow", "Contradictory evidence cannot be treated as proof."),
    rule("current-files-preferred", "file edits must prefer current file content", "warn", "Verify current files before edits and before citing recalled memory as implementation truth."),
    rule("no-hidden-context", "no hidden context injection", "block", "Grounding context must be visible and reviewable before use."),
    rule("no-chat-mutation", "no memory promotion or graph mutation from chat", "block", "Chat grounding does not promote memory, merge graph events, or mutate files."),
  ];

  return {
    id: "evidence-trust-policy",
    selectedEvidenceOnly: true,
    lowConfidenceMarkedWeak: true,
    staleEvidenceMarkedStale: true,
    contradictoryEvidenceWarns: true,
    currentFilesPreferredForEdits: true,
    evidenceIsContextNotProof: true,
    hiddenContextInjectionAllowed: false,
    memoryPromotionFromChatAllowed: false,
    graphMutationFromChatAllowed: false,
    fileMutationWithoutSafePatchPreviewAllowed: false,
    allowedItemIds,
    blockedItemIds,
    weakItemIds,
    staleItemIds,
    rules,
    summary: [],
  };
}

export function summarizeEvidenceTrustPolicy(policy: EvidenceTrustPolicy): string[] {
  return [
    `${policy.allowedItemIds.length} evidence item(s) allowed for visible chat grounding.`,
    `${policy.blockedItemIds.length} evidence item(s) blocked because selected evidence only is enforced.`,
    "Evidence is context, not proof; no hidden context injection is allowed.",
    "No memory promotion, graph mutation, or file mutation without Safe Patch Preview is allowed from chat.",
  ];
}
