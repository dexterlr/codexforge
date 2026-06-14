import type {
  UnifiedEvidencePolicyFinalReview,
  UnifiedEvidencePolicyFinalReviewBoundary,
  UnifiedEvidencePolicyFinalReviewModel,
} from "./unified-evidence-policy-final-review-types";
import { buildUnifiedEvidencePolicyFinalReviewStableKey } from "./unified-evidence-policy-final-review-types";

export const UNIFIED_EVIDENCE_POLICY_FINAL_REVIEW_LANGUAGE = [
  "Unified evidence policy final review",
  "Unified evidence policy final review does not apply evidence policy",
  "Evidence policy changes require explicit operator approval",
  "Private evidence remains redacted",
  "Evidence groups",
  "Citation source checklist",
] as const;

export function buildUnifiedEvidencePolicyFinalReview(
  input: Omit<UnifiedEvidencePolicyFinalReview, "id"> & { idHint: string }
): UnifiedEvidencePolicyFinalReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedEvidencePolicyFinalReviewStableKey("unified-evidence-policy-final-review", idHint, input.status),
    ...review,
  };
}

export function buildUnifiedEvidencePolicyFinalReviews(): UnifiedEvidencePolicyFinalReview[] {
  return [
    buildUnifiedEvidencePolicyFinalReview({
      idHint: "capture-redaction-retention",
      status: "blocked",
      unifiedEvidencePolicyIdentity:
        "Unified evidence policy identity: unified-evidence-policy-final-review-capture-redaction-retention.",
      evidenceGroups: [
        "Evidence groups: provider response evidence, local model output evidence, connector source evidence, automation audit evidence, operator notes, validation evidence, result review evidence, and recovery evidence.",
      ],
      captureChecklist: [
        "Capture checklist: capture intent, scope, source, redaction status, retention class, operator review state, and approval reference before any separate approved use.",
      ],
      citationSourceChecklist: [
        "Citation source checklist: every external or connector-derived claim needs source context, review status, and no hidden connector fetch from this page.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: private evidence remains redacted until an explicit operator-approved review accepts the specific evidence item.",
      ],
      retentionChecklist: [
        "Retention checklist: retention class, expiry review, output storage decision, and deletion handoff stay review-only and are not applied here.",
      ],
      deniedEvidenceShortcuts: [
        "Denied evidence shortcuts: ingest evidence, store outputs, fetch connector data, call providers, send prompts, bypass redaction, auto-cite private data, persist retention policy, or promote memory.",
      ],
      unresolvedEvidenceBlockers: [
        "Unresolved evidence blockers: missing source, missing redaction, unclear retention, private connector data, unsafe output reuse, and unreviewed automation evidence.",
      ],
      resultPolicyRoute:
        "Result policy route: /unified-result-policy-final-review reviews result acceptance without ingesting results.",
      recoveryPolicyRoute:
        "Recovery policy route: /unified-recovery-policy-final-review reviews recovery policy without triggering recovery.",
      nextRecommendedAction:
        "Next recommended action: keep evidence policy blocked until citation, redaction, and retention rules are reviewed outside this page.",
      advancedEvidencePolicyDetails:
        "Advanced evidence policy details: unified evidence policy final review is review-only. Unified evidence policy final review does not apply evidence policy, evidence policy changes require explicit operator approval, and private evidence remains redacted. It does not ingest evidence, store outputs, call providers, call local models, call connectors, fetch connector data, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildUnifiedEvidencePolicyFinalReviewBoundary(): UnifiedEvidencePolicyFinalReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    unifiedEvidencePolicyFinalReviewDoesNotApplyEvidencePolicy: true,
    evidencePolicyChangesRequireExplicitOperatorApproval: true,
    privateEvidenceRemainsRedacted: true,
    evidencePolicyMutationAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    outputStorageAllowed: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeUnifiedEvidencePolicyFinalReview(
  model: Pick<UnifiedEvidencePolicyFinalReviewModel, "reviews">
): string {
  return `Unified evidence policy final review summarizes ${model.reviews.length} evidence policy posture without applying evidence policy. Evidence policy changes require explicit operator approval, and private evidence remains redacted.`;
}

export function buildUnifiedEvidencePolicyFinalReviewModel(): UnifiedEvidencePolicyFinalReviewModel {
  const reviews = buildUnifiedEvidencePolicyFinalReviews();
  const model: UnifiedEvidencePolicyFinalReviewModel = {
    title: "Unified evidence policy final review",
    summary: "",
    reviews,
    boundary: buildUnifiedEvidencePolicyFinalReviewBoundary(),
    evidenceLanguage: [...UNIFIED_EVIDENCE_POLICY_FINAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified evidence policy final review",
      "Unified evidence policy identity",
      "Evidence groups",
      "Capture checklist",
      "Citation source checklist",
      "Redaction/privacy checklist",
      "Retention checklist",
      "Denied evidence shortcuts",
      "Unresolved evidence blockers",
      "Result policy route",
      "Recovery policy route",
      "Next recommended action",
      "Unified evidence policy final review does not apply evidence policy",
      "Evidence policy changes require explicit operator approval",
      "Private evidence remains redacted",
      "advanced evidence policy details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedEvidencePolicyFinalReview(model) };
}
