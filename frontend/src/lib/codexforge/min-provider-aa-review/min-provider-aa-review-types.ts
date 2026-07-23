import type {
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  ProviderDryRunAdmissionReviewRecord,
} from "../min-provider-admit-review";
import type {
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpId,
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord,
  ProviderAdapterDryRunApprovalJoinOutputRecord,
  ProviderAdapterDryRunApprovalPreviewRecord,
  ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord,
  ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord,
  ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord,
  ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord,
  ProviderAdapterDryRunAuditApprovalJoinErrorRecord,
  ProviderAdapterDryRunAuditApprovalJoinGateRecord,
  ProviderAdapterDryRunAuditApprovalJoinGateSummary,
  ProviderAdapterDryRunAuditApprovalJoinInputRecord,
  ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord,
  ProviderAdapterDryRunAuditApprovalJoinReadinessSummary,
  ProviderAdapterDryRunAuditApprovalJoinRequestRecord,
  ProviderAdapterDryRunAuditApprovalJoinResponseRecord,
  ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord,
  ProviderAdapterDryRunAuditApprovalJoinSummary,
  ProviderAdapterDryRunAuditJoinOutputRecord,
  ProviderAdapterDryRunAuditPreviewRecord,
} from "../min-provider-audit-join/min-provider-audit-join-types";
import type {
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord,
  ProviderDryRunResultCaptureOutputReviewRecord,
} from "../min-provider-capture-review";
import type {
  ProviderSelectionCredentialReferenceReviewRecord,
} from "../min-provider-review";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE =
  6153;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH =
  "6154-6185 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run End-to-End Packet MVP";

export const MINIMAL_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES =
  [
    "Backend-owned minimal provider adapter dry-run audit and approval join review",
    "Provider adapter dry-run audit and approval join output review",
    "Provider adapter dry-run audit and approval join gate failure review",
    "Provider adapter dry-run audit and approval join recovery plan",
    "Provider adapter dry-run audit and approval join recovery readiness",
    "Provider adapter dry-run audit and approval join review audit summary",
    "Provider adapter dry-run audit and approval join acceptance posture",
  ] as const;

export type ProviderAdapterDryRunAuditApprovalJoinReviewSectionTitle =
  (typeof MINIMAL_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES)[number];

export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewId =
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpId;
export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-preview-v1";
export type ProviderAdapterDryRunAuditApprovalJoinOutputReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review-preview-v1";
export type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-failure-review-preview-v1";
export type ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-plan-preview-v1";
export type ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-readiness-checklist-v1";
export type ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-audit-summary-preview-v1";
export type ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-acceptance-posture-preview-v1";

export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewSource =
  "Athena / Jarvis Provider Adapter Control Plane";
export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewMode =
  "preview-only";
export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewPosture =
  "minimal provider adapter dry-run audit approval join review / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";
export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness =
  "minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";
export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewSeverity =
  "critical" | "high" | "medium";
export type MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryPosture =
  "manual review only";
export type MinimalProviderAdapterDryRunAuditApprovalJoinRetryPosture =
  "disabled";
export type MinimalProviderAdapterDryRunAuditApprovalJoinFallbackPosture =
  "disabled";
export type MinimalProviderAdapterDryRunAuditApprovalJoinAuditPosture =
  "preview-only";
export type MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceState =
  "not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only";
export type MinimalProviderAdapterDryRunAuditApprovalJoinReadinessReviewState =
  "reviewed" | "blocked" | "backend future required";
export type MinimalProviderAdapterDryRunAuditApprovalJoinReadinessOwner =
  "operator" | "backend future" | "safety review";
export type MinimalProviderAdapterDryRunAuditApprovalJoinPreviewOnlyStatement =
  "provider adapter dry-run audit and approval join review is preview-only";
export type MinimalProviderAdapterDryRunAuditApprovalJoinOutputReviewStatement =
  "Provider adapter dry-run audit approval join fixture only. No real output. No provider call. No persistence.";
export type MinimalProviderAdapterDryRunAuditApprovalJoinNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
export type MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceStatement =
  "Provider adapter dry-run audit approval join fixture accepted only. Live provider execution and persistence not accepted.";

export type MinimalProviderAdapterDryRunAuditApprovalJoinReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}`;
export type ProviderAdapterDryRunAuditApprovalJoinOutputReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}`;
export type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-failure-review:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}:${ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId}`;
export type ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-plan:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}`;
export type ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-readiness:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}:${ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistId}`;
export type ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-audit-summary:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}`;
export type ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-acceptance-posture:${MinimalProviderAdapterDryRunAuditApprovalJoinReviewId}`;

export type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId =
  ProviderAdapterDryRunAuditApprovalJoinGateRecord["id"];
export type ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistId =
  ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["id"];

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpSourceReference =
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinInputSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinInputRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord["key"];
export type ProviderAdapterDryRunAuditJoinOutputSourceReference =
  ProviderAdapterDryRunAuditJoinOutputRecord["key"];
export type ProviderAdapterDryRunApprovalJoinOutputSourceReference =
  ProviderAdapterDryRunApprovalJoinOutputRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinEnvelopeSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord["key"];
export type ProviderAdapterDryRunAuditPreviewSourceReference =
  ProviderAdapterDryRunAuditPreviewRecord["key"];
export type ProviderAdapterDryRunApprovalPreviewSourceReference =
  ProviderAdapterDryRunApprovalPreviewRecord["key"];
export type ProviderAdapterDryRunAuditApprovalEvidencePreviewSourceReference =
  ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummarySourceReference =
  ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummarySourceReference =
  ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinRequestSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinRequestRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinResponseSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinResponseRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinErrorSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinErrorRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinGateSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinGateRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinReadinessSourceReference =
  ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["key"];
export type ProviderAdapterDryRunAuditApprovalJoinAggregateSummarySourceReference =
  ProviderAdapterDryRunAuditApprovalJoinSummary["version"];
export type ProviderAdapterDryRunAuditApprovalJoinAggregateGateSummarySourceReference =
  ProviderAdapterDryRunAuditApprovalJoinGateSummary["version"];
export type ProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummarySourceReference =
  ProviderAdapterDryRunAuditApprovalJoinReadinessSummary["version"];
export type ProviderDryRunResultCaptureReviewSourceReference =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["key"];
export type ProviderDryRunResultCaptureOutputReviewSourceReference =
  ProviderDryRunResultCaptureOutputReviewRecord["key"];
export type ProviderSelectionCredentialReferenceReviewSourceReference =
  ProviderSelectionCredentialReferenceReviewRecord["key"];
export type ProviderDryRunAdmissionReviewSourceReference =
  ProviderDryRunAdmissionReviewRecord["key"];
export type ManualApprovalDecisionReviewSourceReference =
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
export type SyntheticManualApprovalFixtureSourceReference =
  SyntheticMvpManualApprovalFixtureRecord["key"];

export type ProviderAdapterDryRunAuditApprovalJoinDeterministicPreviewReferences =
  Readonly<{
    requestReference: ProviderAdapterDryRunAuditApprovalJoinRequestSourceReference;
    responseReference: ProviderAdapterDryRunAuditApprovalJoinResponseSourceReference;
    previewErrorReference: ProviderAdapterDryRunAuditApprovalJoinErrorSourceReference;
    resultReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["resultReference"];
    auditReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["auditReference"];
    approvalReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["approvalReference"];
    evidenceReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["evidenceReference"];
    gateReferences: readonly ProviderAdapterDryRunAuditApprovalJoinGateSourceReference[];
    readinessReferences:
      readonly ProviderAdapterDryRunAuditApprovalJoinReadinessSourceReference[];
  }>;

export type BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    stableReviewId: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: MinimalProviderAdapterDryRunAuditApprovalJoinReviewKey;
    stableReviewKey: MinimalProviderAdapterDryRunAuditApprovalJoinReviewKey;
    reviewVersion: MinimalProviderAdapterDryRunAuditApprovalJoinReviewVersion;
    source: MinimalProviderAdapterDryRunAuditApprovalJoinReviewSource;
    reviewMode: MinimalProviderAdapterDryRunAuditApprovalJoinReviewMode;
    reviewPosture: MinimalProviderAdapterDryRunAuditApprovalJoinReviewPosture;
    previewOnlyStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinPreviewOnlyStatement;
    label: string;
    reviewLabel: string;
    sourceJoinReviewLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["reviewLabel"];
    requestLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["requestLabel"];
    requestIdentityId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["requestIdentityId"];
    capabilityFamily:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["capabilityFamily"];
    workspaceTarget:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["workspaceTarget"];
    providerSlotLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["localPrivateAlternativeLabel"];
    opaqueCredentialReferenceLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["opaqueCredentialReferenceLabel"];
    severity: MinimalProviderAdapterDryRunAuditApprovalJoinReviewSeverity;
    currentReadiness:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness;
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinInputReference:
      ProviderAdapterDryRunAuditApprovalJoinInputSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinAdmissionCheckReference:
      ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckSourceReference;
    sourceProviderAdapterDryRunAuditJoinOutputReference:
      ProviderAdapterDryRunAuditJoinOutputSourceReference;
    sourceProviderAdapterDryRunApprovalJoinOutputReference:
      ProviderAdapterDryRunApprovalJoinOutputSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinEnvelopeReference:
      ProviderAdapterDryRunAuditApprovalJoinEnvelopeSourceReference;
    sourceProviderAdapterDryRunAuditPreviewReference:
      ProviderAdapterDryRunAuditPreviewSourceReference;
    sourceProviderAdapterDryRunApprovalPreviewReference:
      ProviderAdapterDryRunApprovalPreviewSourceReference;
    sourceProviderAdapterDryRunAuditApprovalEvidencePreviewReference:
      ProviderAdapterDryRunAuditApprovalEvidencePreviewSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinRequestReference:
      ProviderAdapterDryRunAuditApprovalJoinRequestSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinResponseReference:
      ProviderAdapterDryRunAuditApprovalJoinResponseSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinPreviewErrorReference:
      ProviderAdapterDryRunAuditApprovalJoinErrorSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinGateReferences:
      readonly ProviderAdapterDryRunAuditApprovalJoinGateSourceReference[];
    sourceProviderAdapterDryRunAuditApprovalJoinReadinessReferences:
      readonly ProviderAdapterDryRunAuditApprovalJoinReadinessSourceReference[];
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinAggregateSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateGateSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinAggregateGateSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummarySourceReference;
    sourceProviderDryRunResultCaptureReviewReference:
      ProviderDryRunResultCaptureReviewSourceReference;
    sourceProviderDryRunResultCaptureOutputReviewReference:
      ProviderDryRunResultCaptureOutputReviewSourceReference;
    sourceProviderSelectionCredentialReferenceReviewReference:
      ProviderSelectionCredentialReferenceReviewSourceReference;
    sourceProviderDryRunAdmissionReviewReference:
      ProviderDryRunAdmissionReviewSourceReference;
    sourceManualApprovalDecisionReviewReference:
      ManualApprovalDecisionReviewSourceReference;
    sourceManualApprovalFixtureReference:
      SyntheticManualApprovalFixtureSourceReference;
    sourceManualConfirmationFixtureReference:
      SyntheticManualApprovalFixtureSourceReference;
    auditJoinId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["auditJoinId"];
    approvalJoinId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["approvalJoinId"];
    joinDigest:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["joinDigest"];
    resultReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["resultReference"];
    auditReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["auditReference"];
    approvalReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["approvalReference"];
    evidenceReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["evidenceReference"];
    deterministicPreviewReferences:
      ProviderAdapterDryRunAuditApprovalJoinDeterministicPreviewReferences;
    reviewFindings: readonly string[];
    blockedLiveActions: readonly string[];
    safetyStatements: readonly string[];
    nextSafeAction: string;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinOutputReviewRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: ProviderAdapterDryRunAuditApprovalJoinOutputReviewKey;
    outputReviewVersion:
      ProviderAdapterDryRunAuditApprovalJoinOutputReviewVersion;
    providerAdapterDryRunAuditApprovalJoinReviewId:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpSourceReference;
    sourceProviderAdapterDryRunAuditJoinOutputReference:
      ProviderAdapterDryRunAuditJoinOutputSourceReference;
    sourceProviderAdapterDryRunApprovalJoinOutputReference:
      ProviderAdapterDryRunApprovalJoinOutputSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinEnvelopeReference:
      ProviderAdapterDryRunAuditApprovalJoinEnvelopeSourceReference;
    sourceProviderAdapterDryRunAuditPreviewReference:
      ProviderAdapterDryRunAuditPreviewSourceReference;
    sourceProviderAdapterDryRunApprovalPreviewReference:
      ProviderAdapterDryRunApprovalPreviewSourceReference;
    sourceProviderAdapterDryRunAuditApprovalEvidencePreviewReference:
      ProviderAdapterDryRunAuditApprovalEvidencePreviewSourceReference;
    joinState:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["joinState"];
    auditJoinState:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["auditJoinState"];
    approvalJoinState:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["approvalJoinState"];
    auditJoinId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["auditJoinId"];
    approvalJoinId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["approvalJoinId"];
    joinDigest:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["joinDigest"];
    resultReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["resultReference"];
    auditReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["auditReference"];
    approvalReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["approvalReference"];
    evidenceReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["evidenceReference"];
    credentialBoundary: readonly string[];
    providerBoundary: readonly string[];
    promptBoundary: readonly string[];
    approvalBoundary: readonly string[];
    persistenceBoundary: readonly string[];
    operatorFacingExplanation: string;
    remainingBlockers: readonly string[];
    nextSafeAction: string;
    explicitProviderAdapterDryRunAuditApprovalJoinFixtureOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinOutputReviewStatement;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey;
    gateFailureReviewVersion:
      ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewVersion;
    providerAdapterDryRunAuditApprovalJoinReviewId:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpSourceReference;
    sourceGateId: ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId;
    sourceGateKey: ProviderAdapterDryRunAuditApprovalJoinGateSourceReference;
    requiredState: ProviderAdapterDryRunAuditApprovalJoinGateRecord["requiredState"];
    currentState: ProviderAdapterDryRunAuditApprovalJoinGateRecord["currentState"];
    evidence: ProviderAdapterDryRunAuditApprovalJoinGateRecord["evidence"];
    blockedLiveAction:
      ProviderAdapterDryRunAuditApprovalJoinGateRecord["blockedLiveAction"];
    severity: MinimalProviderAdapterDryRunAuditApprovalJoinReviewSeverity;
    capabilityFamily:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["capabilityFamily"];
    workspaceTarget:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["workspaceTarget"];
    providerSlotLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["providerSlotLabel"];
    opaqueCredentialReferenceLabel:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord["opaqueCredentialReferenceLabel"];
    failureExplanation: string;
    manualRecoveryAction: string;
    retryState: MinimalProviderAdapterDryRunAuditApprovalJoinRetryPosture;
    fallbackState: MinimalProviderAdapterDryRunAuditApprovalJoinFallbackPosture;
    nextSafeAction: string;
    explicitNoLiveGatePassStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinNoLiveGatePassStatement;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviewRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey;
    recoveryPlanVersion:
      ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanVersion;
    providerAdapterDryRunAuditApprovalJoinReviewId:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    reviewedSourceReferences: readonly string[];
    blockedGateCount: number;
    blockedReadinessCount: number;
    recoveryPosture:
      MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryPosture;
    retryPosture: MinimalProviderAdapterDryRunAuditApprovalJoinRetryPosture;
    fallbackPosture:
      MinimalProviderAdapterDryRunAuditApprovalJoinFallbackPosture;
    requiredManualChecks: readonly string[];
    blockedAutomatedActions: readonly string[];
    nextSafeAction: string;
    explicitNoRetryNoFallbackNoProviderNoPromptNoSecretNoPersistenceStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryStatement;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey;
    checklistVersion:
      ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistVersion;
    providerAdapterDryRunAuditApprovalJoinReviewId:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    sourceReadinessId:
      ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistId;
    sourceReadinessKey:
      ProviderAdapterDryRunAuditApprovalJoinReadinessSourceReference;
    label: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["label"];
    currentSourceState:
      ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["state"];
    evidence:
      ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["evidence"];
    owner: MinimalProviderAdapterDryRunAuditApprovalJoinReadinessOwner;
    reviewState:
      MinimalProviderAdapterDryRunAuditApprovalJoinReadinessReviewState;
    manualAction: string;
    blockedAutomatedAction: string;
    currentReadiness:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness;
    nextSafeAction:
      ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["nextSafeAction"];
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey;
    auditSummaryVersion:
      ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryVersion;
    providerAdapterDryRunAuditApprovalJoinReviewId:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    auditPosture: MinimalProviderAdapterDryRunAuditApprovalJoinAuditPosture;
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinRequestReference:
      ProviderAdapterDryRunAuditApprovalJoinRequestSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinResponseReference:
      ProviderAdapterDryRunAuditApprovalJoinResponseSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinPreviewErrorReference:
      ProviderAdapterDryRunAuditApprovalJoinErrorSourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinAggregateSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateGateSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinAggregateGateSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummaryReference:
      ProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummarySourceReference;
    sourceProviderAdapterDryRunAuditApprovalJoinGateCount: number;
    sourceProviderAdapterDryRunAuditApprovalJoinReadinessCount: number;
    joinReferenceState: "preview-only / not persisted";
    captureReferenceState: "preview-only / not persisted";
    auditReferenceState: "preview-only / not persisted";
    approvalReferenceState: "preview-only / not persisted";
    evidenceReferenceState: "preview-only / not persisted";
    serverOnlyJoinHelperEvidenceSummary: string;
    deterministicJoinEvidenceSummary: string;
    failedGateSummary: string;
    recoverySummary: string;
    blockedActionSummary: string;
    noProviderOutputStatement: "No provider output.";
    noModelOutputStatement: "No model output.";
    noPromptSendingStatement: "No prompt sending.";
    noResultPersistenceStatement: "No result persistence.";
    noAuditPersistenceStatement: "No audit persistence.";
    noApprovalPersistenceStatement: "No approval persistence.";
    noDatabaseWriteStatement: "No database write.";
    noFileWriteStatement: "No file write.";
    nextProviderAdapterDryRunEndToEndPacketMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecord =
  Readonly<{
    id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    key: ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey;
    acceptancePostureVersion:
      ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureVersion;
    providerAdapterDryRunAuditApprovalJoinReviewId:
      MinimalProviderAdapterDryRunAuditApprovalJoinReviewId;
    acceptanceState:
      MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceState;
    fixtureOnlyAcceptanceSummary: string;
    backendOnlyAcceptanceSummary: string;
    serverOnlyAcceptanceSummary: string;
    inMemoryOnlyAcceptanceSummary: string;
    credentialReferenceBoundarySummary: string;
    providerExecutionBlockers: readonly string[];
    promptTransmissionBlockers: readonly string[];
    approvalBlockers: readonly string[];
    tokenLeaseBlockers: readonly string[];
    queueWorkerJobDispatchBlockers: readonly string[];
    retryFallbackBlockers: readonly string[];
    resultPersistenceBlockers: readonly string[];
    auditPersistenceBlockers: readonly string[];
    approvalPersistenceBlockers: readonly string[];
    databaseFileWriteBlockers: readonly string[];
    credentialReferenceBlockers: readonly string[];
    requiredEvidence: readonly string[];
    nextSafeAction: string;
    explicitProviderAdapterDryRunAuditApprovalJoinFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceStatement;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinReviewCapabilityFamilyGroup =
  Readonly<{
    capabilityFamily:
      BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord["capabilityFamily"];
    reviewCount: number;
    reviews:
      readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord[];
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinReviewWorkspaceGroup =
  Readonly<{
    workspaceTarget:
      BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord["workspaceTarget"];
    reviewCount: number;
    reviews:
      readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord[];
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinReviewProviderSlotGroup =
  Readonly<{
    providerSlotLabel:
      BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord["providerSlotLabel"];
    reviewCount: number;
    reviews:
      readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord[];
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinReviewCredentialReferenceGroup =
  Readonly<{
    credentialReferenceLabel:
      BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord["opaqueCredentialReferenceLabel"];
    reviewCount: number;
    reviews:
      readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord[];
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  providerSlotGroupCount: number;
  credentialReferenceGroupCount: number;
  currentReadiness:
    MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness;
  acceptanceState:
    MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceState;
  summaryLines: readonly string[];
}>;

export type ProviderAdapterDryRunAuditApprovalJoinOutputReviewSummary =
  Readonly<{
    currentBatch:
      typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
    nextLikelyBatch:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
    outputReviewCount: number;
    outputReviewStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinOutputReviewStatement;
    summaryLines: readonly string[];
    nextSafeAction: string;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinGateFailureSummary =
  Readonly<{
    currentBatch:
      typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
    nextLikelyBatch:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
    gateFailureCount: number;
    noLiveGatePassStatement:
      MinimalProviderAdapterDryRunAuditApprovalJoinNoLiveGatePassStatement;
    summaryLines: readonly string[];
    topFailedGateLabels: readonly string[];
    nextSafeAction: string;
  }>;

export type ProviderAdapterDryRunAuditApprovalJoinRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness:
    MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness;
  recoveryPosture:
    MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryPosture;
  retryPosture: MinimalProviderAdapterDryRunAuditApprovalJoinRetryPosture;
  fallbackPosture:
    MinimalProviderAdapterDryRunAuditApprovalJoinFallbackPosture;
  recoveryStatement:
    MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryStatement;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderAdapterDryRunEndToEndPacketMvpChecklist =
  readonly string[];
export type ProviderAdapterDryRunAuditApprovalJoinReviewDisplayStrings =
  readonly string[];
