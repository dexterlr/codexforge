import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingPreviewId,
} from "../athena-model-routing-provider-selection-preview";
import {
  buildStableApprovalExpiryRevocationKey,
  buildStableApprovalGateChecklistKey,
  buildStableRunIntentBlockerKey,
  listModelProviderApprovalPackets,
  listModelProviderRunIntentPreviews,
  type ModelProviderApprovalGateChecklistId,
  type ModelProviderApprovalPacketRecord,
  type ModelProviderRunIntentBlockerId,
  type ModelProviderRunIntentPreviewRecord,
} from "../model-provider-approval-packet-run-intent-preview";
import {
  MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
  MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_PHASE,
  NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  type ManualRunAdmissionAuditPreviewRecord,
  type ManualRunAdmissionAuditPreviewKey,
  type ManualRunAdmissionBlockerId,
  type ManualRunAdmissionBlockerKey,
  type ManualRunAdmissionBlockerRecord,
  type ManualRunAdmissionBlockerSeverity,
  type ManualRunAdmissionBlockerSummary,
  type ManualRunAdmissionCapabilityFamilyGroup,
  type ManualRunAdmissionDenialRecoveryKey,
  type ManualRunAdmissionDenialRecoveryPreviewRecord,
  type ManualRunAdmissionGateEvaluationKey,
  type ManualRunAdmissionGateEvaluationRecord,
  type ManualRunAdmissionGateSummary,
  type ManualRunAdmissionPreviewKey,
  type ManualRunAdmissionPreviewRecord,
  type ManualRunAdmissionSummary,
  type ManualRunAdmissionTicketPreviewKey,
  type ManualRunAdmissionTicketPreviewRecord,
  type ManualRunAdmissionWorkspaceGroup,
} from "./manual-gated-model-provider-run-admission-preview-types";

type ManualAdmissionPreviewSeed = Readonly<{
  approvalGateId: ModelProviderApprovalGateChecklistId;
  blockerId: ModelProviderRunIntentBlockerId;
  deniedReasonExamples: readonly string[];
}>;

type ManualAdmissionBlockerSeed = Readonly<{
  id: ManualRunAdmissionBlockerId;
  severity: ManualRunAdmissionBlockerSeverity;
  capabilityIds?: readonly AiModelProviderCapabilityId[];
  workspaceTargets?: readonly AiModelProviderWorkspaceTarget[];
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

const SUMMARY_LINES = [
  "manual gated model provider run admission preview only",
  "run admission is preview-only",
  "run admission state is not admitted",
  "admission decision is held",
  "admission token is not issued",
  "admission lease is not created",
  "admission ticket is preview-only",
  "gate evaluation is preview-only",
  "admission blockers are preview-only",
  "recovery is manual review only",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
  "no plugin execution",
  "no autonomous execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  "run admission review and recovery preview next",
] as const;

const BLOCKER_SUMMARY_LINES = [
  "admission blockers are preview-only",
  "retry disabled",
  "fallback disabled",
  "recovery is manual review only",
  "No provider execution",
  "No queue dispatch",
  "No worker dispatch",
  "No job execution",
  "No persistence",
] as const;

const APPROVAL_PACKETS = listModelProviderApprovalPackets();
const RUN_INTENT_PREVIEWS = listModelProviderRunIntentPreviews();
const APPROVAL_PACKETS_BY_ID = new Map(
  APPROVAL_PACKETS.map((packet) => [packet.id, packet] as const)
);
const RUN_INTENT_PREVIEWS_BY_ID = new Map(
  RUN_INTENT_PREVIEWS.map((runIntent) => [runIntent.id, runIntent] as const)
);

const PREVIEW_SEEDS = {
  "conversational-planning-request": {
    approvalGateId: "operator-approval",
    blockerId: "no-manual-approval",
    deniedReasonExamples: [
      "Manual approval has not been granted for the planning lane.",
      "Admission token issuance remains blocked by review-only posture.",
      "Server-only admission is required before any planning provider call exists.",
    ],
  },
  "code-assistance-request": {
    approvalGateId: "manual-confirmation",
    blockerId: "no-manual-confirmation",
    deniedReasonExamples: [
      "Manual confirmation is still missing for the code lane.",
      "Run admission remains held while the single-run lock is only a preview requirement.",
      "No backend-only admission path exists yet for code assistance.",
    ],
  },
  "website-copy-code-request": {
    approvalGateId: "server-only-boundary",
    blockerId: "no-server-only-adapter",
    deniedReasonExamples: [
      "Website copy/code work cannot cross the frontend boundary.",
      "Server-only adapter enforcement is still required before admission.",
      "Provider execution remains blocked by default for website build flows.",
    ],
  },
  "product-video-request": {
    approvalGateId: "kill-switch",
    blockerId: "provider-execution-blocked-by-default",
    deniedReasonExamples: [
      "Video provider execution remains blocked by default.",
      "The kill switch must stay engaged while video admission is preview-only.",
      "No queue, worker, or job dispatch may start a product video run.",
    ],
  },
  "storyboard-image-request": {
    approvalGateId: "privacy-redaction",
    blockerId: "prompt-payload-not-reviewed",
    deniedReasonExamples: [
      "Storyboard image prompt posture stays redacted placeholder only.",
      "Prompt payload review is incomplete for the image lane.",
      "Privacy and redaction checks remain unresolved for image admission.",
    ],
  },
  "audio-narration-request": {
    approvalGateId: "cost-rate-timeout",
    blockerId: "timeout-cancel-posture-missing",
    deniedReasonExamples: [
      "Timeout and cancel posture is still incomplete for narration.",
      "Cost acknowledgement remains required before any future narration admission.",
      "Audio provider execution stays blocked until backend-only guards exist.",
    ],
  },
  "transcription-caption-request": {
    approvalGateId: "cost-rate-timeout",
    blockerId: "rate-limit-posture-unknown",
    deniedReasonExamples: [
      "Rate limit posture is still unknown for transcription.",
      "Timeout and cancel review remains incomplete for captioning work.",
      "No admitted backend transcription ticket exists.",
    ],
  },
  "embeddings-search-request": {
    approvalGateId: "audit",
    blockerId: "audit-persistence-not-implemented",
    deniedReasonExamples: [
      "Audit persistence is not implemented for embeddings/search.",
      "Result capture and audit joins remain preview-only for retrieval work.",
      "Admission remains held while no persisted audit evidence exists.",
    ],
  },
  "safety-moderation-review-request": {
    approvalGateId: "approval-scope",
    blockerId: "approval-scope-unresolved",
    deniedReasonExamples: [
      "Approval scope remains unresolved for moderation review.",
      "Manual confirmation and audit requirements still hold the moderation lane.",
      "No moderation admission can issue a token while scope is still preview-only.",
    ],
  },
  "local-private-inference-request": {
    approvalGateId: "server-only-boundary",
    blockerId: "provider-execution-blocked-by-default",
    deniedReasonExamples: [
      "Local/private inference is still blocked by backend-only requirements.",
      "No local runtime admission may execute from the frontend.",
      "Provider execution remains blocked even for local/private alternatives.",
    ],
  },
  "audit-recovery-explanation-request": {
    approvalGateId: "acceptance-matrix-review",
    blockerId: "result-persistence-not-implemented",
    deniedReasonExamples: [
      "Acceptance matrix review remains unresolved for audit explanation.",
      "Result persistence is not implemented for audit/recovery follow-up.",
      "Admission remains held while explanation output stays preview-only.",
    ],
  },
} as const satisfies Record<string, ManualAdmissionPreviewSeed>;

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: AthenaModelRoutingCapabilityFamilyRecord
): AthenaModelRoutingCapabilityFamilyRecord {
  return { ...family };
}

function cloneCapabilityFamilies(
  families: readonly AthenaModelRoutingCapabilityFamilyRecord[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  return families.map((family) => cloneCapabilityFamily(family));
}

function clonePreview(
  preview: ManualRunAdmissionPreviewRecord
): ManualRunAdmissionPreviewRecord {
  return {
    ...preview,
    selectedCapabilityFamily: cloneCapabilityFamily(preview.selectedCapabilityFamily),
  };
}

function cloneGateEvaluation(
  record: ManualRunAdmissionGateEvaluationRecord
): ManualRunAdmissionGateEvaluationRecord {
  return { ...record };
}

function cloneTicketPreview(
  preview: ManualRunAdmissionTicketPreviewRecord
): ManualRunAdmissionTicketPreviewRecord {
  return { ...preview };
}

function cloneDenialRecovery(
  preview: ManualRunAdmissionDenialRecoveryPreviewRecord
): ManualRunAdmissionDenialRecoveryPreviewRecord {
  return {
    ...preview,
    deniedReasonExamples: cloneList(preview.deniedReasonExamples),
  };
}

function cloneBlocker(
  blocker: ManualRunAdmissionBlockerRecord
): ManualRunAdmissionBlockerRecord {
  return {
    ...blocker,
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      blocker.affectedCapabilityFamilies
    ),
    affectedWorkspaceTargets: cloneList(blocker.affectedWorkspaceTargets),
  };
}

function cloneAuditPreview(
  preview: ManualRunAdmissionAuditPreviewRecord
): ManualRunAdmissionAuditPreviewRecord {
  return { ...preview };
}

function requireApprovalPacket(
  id: AthenaModelRoutingPreviewId
): ModelProviderApprovalPacketRecord {
  const packet = APPROVAL_PACKETS_BY_ID.get(id);

  if (!packet) {
    throw new Error(`Missing approval packet for manual admission preview: ${id}`);
  }

  return packet;
}

function requireRunIntent(
  id: AthenaModelRoutingPreviewId
): ModelProviderRunIntentPreviewRecord {
  const runIntent = RUN_INTENT_PREVIEWS_BY_ID.get(id);

  if (!runIntent) {
    throw new Error(`Missing run intent for manual admission preview: ${id}`);
  }

  return runIntent;
}

function requireSeed(id: AthenaModelRoutingPreviewId): ManualAdmissionPreviewSeed {
  const seed = PREVIEW_SEEDS[id];

  if (!seed) {
    throw new Error(`Missing manual admission seed: ${id}`);
  }

  return seed;
}

export function uniqueManualRunAdmissionDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

function uniqueCapabilityFamilies(
  families: readonly AthenaModelRoutingCapabilityFamilyRecord[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  const uniqueFamilies = new Map<string, AthenaModelRoutingCapabilityFamilyRecord>();

  for (const family of families) {
    if (!uniqueFamilies.has(family.id)) {
      uniqueFamilies.set(family.id, cloneCapabilityFamily(family));
    }
  }

  return Array.from(uniqueFamilies.values());
}

function buildCapabilityFamilyPool(): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  return uniqueCapabilityFamilies(
    RUN_INTENT_PREVIEWS.map((preview) => preview.capabilityFamily)
  );
}

function buildWorkspaceTargetPool(): readonly AiModelProviderWorkspaceTarget[] {
  return uniqueManualRunAdmissionDisplayStrings(
    RUN_INTENT_PREVIEWS.map((preview) => preview.workspaceTarget)
  );
}

function selectCapabilityFamilies(
  capabilityIds?: readonly AiModelProviderCapabilityId[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  if (!capabilityIds || capabilityIds.length === 0) {
    return buildCapabilityFamilyPool();
  }

  const selectedFamilies = RUN_INTENT_PREVIEWS.filter((preview) =>
    capabilityIds.includes(preview.capabilityFamily.id)
  ).map((preview) => preview.capabilityFamily);

  return uniqueCapabilityFamilies(selectedFamilies);
}

function selectWorkspaceTargets(
  workspaceTargets?: readonly AiModelProviderWorkspaceTarget[]
): readonly AiModelProviderWorkspaceTarget[] {
  if (!workspaceTargets || workspaceTargets.length === 0) {
    return buildWorkspaceTargetPool();
  }

  return uniqueManualRunAdmissionDisplayStrings(workspaceTargets);
}

export function buildStableManualRunAdmissionPreviewKey(
  previewId: AthenaModelRoutingPreviewId
): ManualRunAdmissionPreviewKey {
  return `manual-run-admission-preview:${previewId}`;
}

export function buildStableAdmissionGateEvaluationKey(
  previewId: AthenaModelRoutingPreviewId
): ManualRunAdmissionGateEvaluationKey {
  return `manual-run-admission-gate-evaluation:${previewId}`;
}

export function buildStableAdmissionTicketPreviewKey(
  previewId: AthenaModelRoutingPreviewId
): ManualRunAdmissionTicketPreviewKey {
  return `manual-run-admission-ticket-preview:${previewId}`;
}

export function buildStableAdmissionDenialRecoveryKey(
  previewId: AthenaModelRoutingPreviewId
): ManualRunAdmissionDenialRecoveryKey {
  return `manual-run-admission-denial-recovery:${previewId}`;
}

export function buildStableManualRunAdmissionBlockerKey(
  blockerId: ManualRunAdmissionBlockerId
): ManualRunAdmissionBlockerKey {
  return `manual-run-admission-blocker:${blockerId}`;
}

export function buildStableAdmissionAuditPreviewKey(
  previewId: AthenaModelRoutingPreviewId
): ManualRunAdmissionAuditPreviewKey {
  return `manual-run-admission-audit-preview:${previewId}`;
}

function buildManualRunAdmissionPreview(
  packet: ModelProviderApprovalPacketRecord,
  runIntent: ModelProviderRunIntentPreviewRecord,
  seed: ManualAdmissionPreviewSeed
): ManualRunAdmissionPreviewRecord {
  return {
    id: runIntent.id,
    key: buildStableManualRunAdmissionPreviewKey(runIntent.id),
    admissionPreviewVersion: "manual-gated-model-provider-run-admission-preview-v1",
    previewOnlyStatement: "run admission is preview-only",
    source: "Athena / Jarvis Model Gateway",
    admissionMode: "manual gated preview-only",
    runAdmissionPosture: "not admitted",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    label: runIntent.label,
    operatorRequestPhrase: runIntent.operatorRequestPhrase,
    workspaceTarget: runIntent.workspaceTarget,
    sourceApprovalPacketReference: packet.key,
    sourceRunIntentReference: runIntent.key,
    sourceApprovalGateChecklistReference:
      buildStableApprovalGateChecklistKey(seed.approvalGateId),
    sourceRunIntentBlockerReference: buildStableRunIntentBlockerKey(seed.blockerId),
    sourceApprovalExpiryRevocationReference:
      buildStableApprovalExpiryRevocationKey(runIntent.id),
    selectedCapabilityFamily: cloneCapabilityFamily(runIntent.capabilityFamily),
    providerSlotLabel: runIntent.providerSlotLabel,
    backupProviderSlotLabel: runIntent.backupProviderSlotLabel,
    localPrivateAlternativeLabel: runIntent.localPrivateAlternativeLabel,
    runAdmissionState: "not admitted",
    admissionDecisionState: "preview-only / held",
    admissionTokenState: "not issued",
    admissionLeaseState: "not created",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
    manualApprovalRequired: "manual approval required",
    manualConfirmationRequired: "manual confirmation required",
    killSwitchRequired: "kill switch required",
    auditRequired: "audit required",
    privacyRedactionRequired: "privacy/redaction required",
    costAcknowledgementRequired: "cost acknowledgement required",
    rateLimitGuardRequired: "rate limit guard required",
    timeoutCancelGuardRequired: "timeout/cancel guard required",
    idempotencyRequired: "idempotency required",
    replayBlockRequired: "replay block required",
    singleRunLockRequired: "single-run lock required",
    dryRunResultReviewRequired: "dry-run result review required",
    acceptanceMatrixReviewRequired: "acceptance matrix review required",
    approvalExpiryReviewRequired: "approval expiry review required",
    approvalRevocationReviewRequired: "approval revocation review required",
    noRetryExecution: "no retry execution",
    noFallbackExecution: "no fallback execution",
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    nextRunAdmissionReviewRecoveryRequirement:
      "run admission review and recovery preview next",
  };
}

const MANUAL_RUN_ADMISSION_PREVIEWS = RUN_INTENT_PREVIEWS.map((runIntent) =>
  buildManualRunAdmissionPreview(
    requireApprovalPacket(runIntent.id),
    runIntent,
    requireSeed(runIntent.id)
  )
);

function buildAdmissionGateEvaluation(
  preview: ManualRunAdmissionPreviewRecord
): ManualRunAdmissionGateEvaluationRecord {
  return {
    id: preview.id,
    key: buildStableAdmissionGateEvaluationKey(preview.id),
    gateEvaluationVersion: "manual-run-admission-gate-evaluation-preview-v1",
    previewOnlyStatement: "gate evaluation is preview-only",
    admissionPreviewId: preview.id,
    sourceApprovalPacketReference: preview.sourceApprovalPacketReference,
    sourceRunIntentReference: preview.sourceRunIntentReference,
    operatorApprovalGateState: "manual approval required / not satisfied",
    manualConfirmationGateState:
      "manual confirmation required / not satisfied",
    killSwitchGateState: "kill switch required / engaged",
    auditGateState: "audit required / not persisted",
    serverOnlyAdapterGateState: "server-only required / frontend blocked",
    opaqueCredentialGateState:
      "opaque credential reference required / not bound",
    promptPayloadReviewGateState:
      "prompt payload review required / redacted placeholder only",
    privacyRedactionGateState: "privacy/redaction required / incomplete",
    costRateTimeoutGateState: "cost/rate/timeout review required / incomplete",
    idempotencyReplayGateState: "idempotency/replay required / preview-only",
    singleRunLockGateState: "single-run lock required / not created",
    dryRunResultReviewGateState: "dry-run result review required / pending",
    acceptanceMatrixGateState:
      "acceptance matrix review required / unresolved",
    approvalExpiryGateState: "approval expiry review required / not validated",
    approvalRevocationGateState:
      "approval revocation review required / not validated",
    persistenceGateState: "persistence not implemented / blocked",
    overallGateDecision: "held / not admitted",
    blockedDefaultReason:
      `${preview.label} remains held because manual approval, confirmation, server-only adapter review, and persistence follow-up are all still unresolved.`,
    explicitNoAdmissionStatement:
      "No admission is granted. Provider execution stays blocked.",
  };
}

const ADMISSION_GATE_EVALUATIONS = MANUAL_RUN_ADMISSION_PREVIEWS.map((preview) =>
  buildAdmissionGateEvaluation(preview)
);

function buildAdmissionTicketPreview(
  preview: ManualRunAdmissionPreviewRecord,
  runIntent: ModelProviderRunIntentPreviewRecord
): ManualRunAdmissionTicketPreviewRecord {
  return {
    id: preview.id,
    key: buildStableAdmissionTicketPreviewKey(preview.id),
    ticketPreviewVersion: "manual-run-admission-ticket-preview-v1",
    previewOnlyStatement: "admission ticket is preview-only",
    admissionPreviewId: preview.id,
    sourceRunIntentReference: runIntent.key,
    ticketState: "not issued",
    ticketMode: "preview-only",
    admissionTokenState: "not issued",
    admissionLeaseState: "not created",
    idempotencyKeyPosture: "deterministic preview key only",
    replayBlockPosture: "replay block required",
    singleRunLockPosture: "single-run lock required",
    timeoutCancelPosture: "timeout/cancel guard required",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    resultCaptureState: "not implemented",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    blockedDefaultReason:
      `${preview.label} cannot issue an admission ticket while the decision remains held and no backend lease exists.`,
    explicitNoTicketNoExecutionStatement:
      "No ticket issued. No queue dispatch. No worker dispatch. No job execution.",
  };
}

const ADMISSION_TICKET_PREVIEWS = MANUAL_RUN_ADMISSION_PREVIEWS.map((preview) =>
  buildAdmissionTicketPreview(preview, requireRunIntent(preview.id))
);

function buildAdmissionDenialRecoveryPreview(
  preview: ManualRunAdmissionPreviewRecord,
  seed: ManualAdmissionPreviewSeed
): ManualRunAdmissionDenialRecoveryPreviewRecord {
  return {
    id: preview.id,
    key: buildStableAdmissionDenialRecoveryKey(preview.id),
    denialRecoveryPreviewVersion:
      "manual-run-admission-denial-recovery-preview-v1",
    admissionPreviewId: preview.id,
    deniedReasonExamples: cloneList(seed.deniedReasonExamples),
    missingManualApprovalRecovery:
      `Manually approve the ${preview.label} scope before any future backend admission review can continue.`,
    missingManualConfirmationRecovery:
      `Collect explicit operator confirmation for ${preview.label} and keep the run held until confirmation is visible.`,
    killSwitchActiveRecovery:
      `Keep the kill switch engaged until ${preview.label} is manually reviewed and a backend-only recovery path exists.`,
    approvalExpiredRecovery:
      `Refresh the approval packet for ${preview.label}, then review expiry posture before any admission token could be considered.`,
    approvalRevokedRecovery:
      `Treat ${preview.label} as revoked until the operator re-approves scope and recovery posture manually.`,
    missingOpaqueCredentialRecovery:
      `Keep credential handling label-only and add an opaque reference before ${preview.label} moves into a future backend review.`,
    promptPayloadNotReviewedRecovery:
      `Review the redacted prompt placeholder for ${preview.label} without sending any prompt or exposing secret data.`,
    privacyRedactionIncompleteRecovery:
      `Complete privacy and redaction review for ${preview.label} before discussing any backend admission follow-up.`,
    costRateTimeoutIncompleteRecovery:
      `Resolve cost acknowledgement, rate limit guard, and timeout/cancel posture for ${preview.label} before any ticket review exists.`,
    dryRunReviewMissingRecovery:
      `Review the linked dry-run result record for ${preview.label} and keep execution blocked until that evidence is accepted.`,
    acceptanceMatrixUnresolvedRecovery:
      `Resolve acceptance criteria for ${preview.label} and keep the lane not admitted until the matrix is manually reviewed.`,
    auditPersistenceMissingRecovery:
      `Plan audit joins for ${preview.label} as future backend-only work and do not claim persistence exists today.`,
    resultPersistenceMissingRecovery:
      `Keep result capture and persistence future-only for ${preview.label}; no persisted output exists in this batch.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    operatorActionRequired:
      `Review the held admission, blocker references, and recovery gates for ${preview.label} without issuing any ticket or execution lease.`,
    nextSafeBatchRecommendation:
      NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    explicitNoRetryNoFallbackNoExecutionStatement:
      "No retry. No fallback. No execution. Manual review only.",
  };
}

const ADMISSION_DENIAL_RECOVERY_PREVIEWS = MANUAL_RUN_ADMISSION_PREVIEWS.map(
  (preview) => buildAdmissionDenialRecoveryPreview(preview, requireSeed(preview.id))
);

const BLOCKER_SEEDS = [
  {
    id: "admission-preview-only",
    severity: "medium",
    operatorFacingExplanation:
      "The admission layer is still a static preview and cannot move into a live admit state.",
    requiredRecoveryAction:
      "Keep the admission layer review-only and add the next recovery preview batch before discussing execution.",
    nextSafeAction:
      `Prepare ${NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH} without enabling tickets or dispatch.`,
  },
  {
    id: "run-intent-not-admitted",
    severity: "critical",
    operatorFacingExplanation:
      "Every source run intent still reports not admitted, so no ticket or lease can exist.",
    requiredRecoveryAction:
      "Review the held run intent posture and keep provider execution blocked until recovery preview evidence exists.",
    nextSafeAction:
      "Keep run admission state not admitted and continue manual review only.",
  },
  {
    id: "admission-token-not-issued",
    severity: "critical",
    operatorFacingExplanation:
      "No admission token is issued anywhere in the preview layer.",
    requiredRecoveryAction:
      "Preserve token issuance as future backend-only work and keep the frontend ticket state not issued.",
    nextSafeAction:
      "Review ticket posture without issuing or simulating a token.",
  },
  {
    id: "admission-lease-not-created",
    severity: "critical",
    operatorFacingExplanation:
      "No lease exists to reserve a single run or start a worker path.",
    requiredRecoveryAction:
      "Keep lease creation out of the frontend and treat single-run locking as a future backend concern.",
    nextSafeAction:
      "Leave admission lease state as not created.",
  },
  {
    id: "no-manual-approval",
    severity: "critical",
    operatorFacingExplanation:
      "Manual approval is still required before any future provider run admission could proceed.",
    requiredRecoveryAction:
      "Manually approve scope and keep the approval packet preview visible.",
    nextSafeAction:
      "Hold admission until manual approval is explicit.",
  },
  {
    id: "no-manual-confirmation",
    severity: "high",
    operatorFacingExplanation:
      "Manual confirmation remains unresolved, so the run stays held.",
    requiredRecoveryAction:
      "Collect operator confirmation in review-only form before any future backend path is considered.",
    nextSafeAction:
      "Keep confirmation state unsatisfied and do not admit the run.",
  },
  {
    id: "approval-expired",
    severity: "high",
    operatorFacingExplanation:
      "Approval expiry review is still required and no persisted approval window exists.",
    requiredRecoveryAction:
      "Review approval expiry posture manually and re-approve later in a backend-owned lane.",
    nextSafeAction:
      "Treat expiry as unresolved and keep admission held.",
  },
  {
    id: "approval-revoked",
    severity: "high",
    operatorFacingExplanation:
      "Approval revocation remains a preview-only state with no active run authorization.",
    requiredRecoveryAction:
      "Review revocation posture and require explicit operator re-approval before any future admission attempt.",
    nextSafeAction:
      "Keep the lane revoked or held, never admitted.",
  },
  {
    id: "kill-switch-active",
    severity: "critical",
    operatorFacingExplanation:
      "The kill switch stays active by default across all preview admissions.",
    requiredRecoveryAction:
      "Preserve the kill switch requirement and do not simulate execution while it remains engaged.",
    nextSafeAction:
      "Keep the kill switch engaged and continue manual review only.",
  },
  {
    id: "no-server-only-adapter",
    severity: "critical",
    operatorFacingExplanation:
      "A server-only adapter is required before any future admission path can exist.",
    requiredRecoveryAction:
      "Keep the frontend blocked and route all future execution design to server-only adapters.",
    nextSafeAction:
      "Review adapter contracts without adding frontend provider logic.",
  },
  {
    id: "missing-opaque-credential-reference",
    severity: "high",
    operatorFacingExplanation:
      "Credential posture must stay opaque-label-only and cannot be considered bound or usable yet.",
    requiredRecoveryAction:
      "Keep credentials as opaque references only and avoid exposing keys or environment variable names.",
    nextSafeAction:
      "Treat credential binding as future backend-only work.",
  },
  {
    id: "prompt-payload-not-reviewed",
    severity: "high",
    capabilityIds: ["image-generation", "video-generation", "voice-narration"],
    operatorFacingExplanation:
      "Prompt payload review remains incomplete and the payload stays a redacted placeholder only.",
    requiredRecoveryAction:
      "Manually review the redacted prompt posture without sending any prompt.",
    nextSafeAction:
      "Keep prompt transmission state not sent.",
  },
  {
    id: "privacy-redaction-incomplete",
    severity: "high",
    capabilityIds: ["image-generation", "video-generation", "transcription"],
    operatorFacingExplanation:
      "Privacy and redaction review is incomplete for sensitive prompt and content flows.",
    requiredRecoveryAction:
      "Finish privacy and redaction review before any admission recovery preview is considered complete.",
    nextSafeAction:
      "Keep the lane held and redacted placeholder only.",
  },
  {
    id: "cost-acknowledgement-missing",
    severity: "high",
    operatorFacingExplanation:
      "Cost acknowledgement remains required and unresolved across provider lanes.",
    requiredRecoveryAction:
      "Review cost posture manually and keep the admission decision held.",
    nextSafeAction:
      "Do not issue any ticket until cost posture is acknowledged.",
  },
  {
    id: "rate-limit-posture-unknown",
    severity: "high",
    capabilityIds: ["transcription", "embeddings-search", "safety-moderation"],
    operatorFacingExplanation:
      "Rate limit posture is unknown for the affected admission lanes.",
    requiredRecoveryAction:
      "Document rate-limit posture in a future recovery preview without implementing a live limiter.",
    nextSafeAction:
      "Leave the run held and undispatched.",
  },
  {
    id: "timeout-cancel-posture-missing",
    severity: "high",
    capabilityIds: ["voice-narration", "video-generation", "code-assistance"],
    operatorFacingExplanation:
      "Timeout and cancel posture is still incomplete and cannot guard a real run.",
    requiredRecoveryAction:
      "Keep timeout/cancel review visible and do not create a lease or job.",
    nextSafeAction:
      "Continue manual review only.",
  },
  {
    id: "dry-run-result-not-reviewed",
    severity: "high",
    operatorFacingExplanation:
      "Dry-run result review remains a required dependency before admission recovery could exist.",
    requiredRecoveryAction:
      "Review the linked dry-run result record for each lane and keep execution blocked.",
    nextSafeAction:
      "Use fixture-only review evidence and do not admit the run.",
  },
  {
    id: "acceptance-matrix-unresolved",
    severity: "high",
    operatorFacingExplanation:
      "Acceptance criteria remain unresolved, so no lane can advance beyond held status.",
    requiredRecoveryAction:
      "Review the acceptance matrix manually and keep the lane not admitted.",
    nextSafeAction:
      "Carry acceptance review into the next recovery preview batch.",
  },
  {
    id: "audit-persistence-not-implemented",
    severity: "medium",
    capabilityIds: ["embeddings-search", "metadata-summarization"],
    operatorFacingExplanation:
      "Audit persistence is not implemented, so admission evidence cannot be stored.",
    requiredRecoveryAction:
      "Treat audit joins as future backend-only work and keep the frontend audit preview static.",
    nextSafeAction:
      "Retain audit posture as preview-only and not persisted.",
  },
  {
    id: "result-persistence-not-implemented",
    severity: "medium",
    operatorFacingExplanation:
      "Result persistence is not implemented and no output can be stored or joined.",
    requiredRecoveryAction:
      "Keep result capture future-only and leave all results unpersisted.",
    nextSafeAction:
      "Do not claim any captured or stored model result exists.",
  },
  {
    id: "approval-persistence-not-implemented",
    severity: "medium",
    operatorFacingExplanation:
      "Approval persistence is not implemented, so approvals remain review-only references.",
    requiredRecoveryAction:
      "Keep approval references static and do not claim an active admission ledger exists.",
    nextSafeAction:
      "Continue using preview-only approval references.",
  },
  {
    id: "provider-sdk-unavailable-blocked-in-frontend",
    severity: "critical",
    operatorFacingExplanation:
      "Provider SDK imports remain blocked in the frontend by design.",
    requiredRecoveryAction:
      "Keep SDKs out of Athena and Jarvis frontend code and preserve the server-only boundary.",
    nextSafeAction:
      "Review provider lanes without importing or calling any SDK.",
  },
  {
    id: "provider-execution-blocked-by-default",
    severity: "critical",
    operatorFacingExplanation:
      "Provider execution stays blocked by default for every capability family in this batch.",
    requiredRecoveryAction:
      "Do not add provider execution, plugin execution, or autonomous execution paths.",
    nextSafeAction:
      "Leave provider execution blocked and manual review only.",
  },
  {
    id: "queue-dispatch-blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Queue dispatch is blocked and no run can be scheduled or enqueued.",
    requiredRecoveryAction:
      "Keep dispatch logic out of the frontend and leave queue state not dispatched.",
    nextSafeAction:
      "Review queue posture only as a static blocker.",
  },
  {
    id: "worker-dispatch-blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Worker dispatch is blocked and no worker may pick up a provider run.",
    requiredRecoveryAction:
      "Keep worker orchestration future-only and do not simulate worker handoff.",
    nextSafeAction:
      "Leave worker state not dispatched.",
  },
  {
    id: "job-execution-blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Job execution is blocked and no admitted job exists anywhere in the preview layer.",
    requiredRecoveryAction:
      "Do not create execution jobs, leases, or retries from the frontend.",
    nextSafeAction:
      "Leave job execution state not executed.",
  },
] as const satisfies readonly ManualAdmissionBlockerSeed[];

function buildManualRunAdmissionBlocker(
  seed: ManualAdmissionBlockerSeed
): ManualRunAdmissionBlockerRecord {
  return {
    blockerId: seed.id,
    key: buildStableManualRunAdmissionBlockerKey(seed.id),
    blockerMatrixVersion: "manual-run-admission-blocker-matrix-preview-v1",
    previewOnlyStatement: "admission blockers are preview-only",
    severity: seed.severity,
    affectedCapabilityFamilies: selectCapabilityFamilies(seed.capabilityIds),
    affectedWorkspaceTargets: selectWorkspaceTargets(seed.workspaceTargets),
    operatorFacingExplanation: seed.operatorFacingExplanation,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    nextSafeAction: seed.nextSafeAction,
  };
}

const MANUAL_RUN_ADMISSION_BLOCKERS = BLOCKER_SEEDS.map((seed) =>
  buildManualRunAdmissionBlocker(seed)
);

function buildManualAdmissionAuditPreview(
  preview: ManualRunAdmissionPreviewRecord
): ManualRunAdmissionAuditPreviewRecord {
  return {
    id: preview.id,
    key: buildStableAdmissionAuditPreviewKey(preview.id),
    auditPreviewVersion: "manual-run-admission-audit-preview-v1",
    admissionPreviewId: preview.id,
    auditPosture: "preview-only",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    resultReferenceState: "not persisted",
    operatorReviewRequired: "operator review required",
    gateEvidenceSummary:
      `Static evidence for ${preview.label} stays limited to the approval packet, run intent, held gate evaluation, blocker reference, and preview-only expiry/revocation posture.`,
    blockedActionSummary:
      `Blocked actions for ${preview.label} remain explicit: no admission, no prompt sending, no model calls, no provider execution, no queue dispatch, no worker dispatch, no job execution, and no persistence.`,
    noQueueDispatchStatement: "No queue dispatch",
    noWorkerDispatchStatement: "No worker dispatch",
    noJobExecutionStatement: "No job execution",
    noProviderExecutionStatement: "No provider execution",
    noPersistenceStatement: "No persistence",
    nextReviewRecoveryRequirement:
      "run admission review and recovery preview next",
  };
}

const MANUAL_ADMISSION_AUDIT_PREVIEWS = MANUAL_RUN_ADMISSION_PREVIEWS.map(
  (preview) => buildManualAdmissionAuditPreview(preview)
);

export function listManualGatedModelProviderRunAdmissionPreviews():
  readonly ManualRunAdmissionPreviewRecord[] {
  return MANUAL_RUN_ADMISSION_PREVIEWS.map((preview) => clonePreview(preview));
}

export function listAdmissionGateEvaluationRecords():
  readonly ManualRunAdmissionGateEvaluationRecord[] {
  return ADMISSION_GATE_EVALUATIONS.map((record) => cloneGateEvaluation(record));
}

export function listRunAdmissionTicketPreviews():
  readonly ManualRunAdmissionTicketPreviewRecord[] {
  return ADMISSION_TICKET_PREVIEWS.map((preview) => cloneTicketPreview(preview));
}

export function listRunAdmissionDenialRecoveryPreviews():
  readonly ManualRunAdmissionDenialRecoveryPreviewRecord[] {
  return ADMISSION_DENIAL_RECOVERY_PREVIEWS.map((preview) =>
    cloneDenialRecovery(preview)
  );
}

export function listManualRunAdmissionBlockerMatrix():
  readonly ManualRunAdmissionBlockerRecord[] {
  return MANUAL_RUN_ADMISSION_BLOCKERS.map((blocker) => cloneBlocker(blocker));
}

export function listManualAdmissionAuditPreviews():
  readonly ManualRunAdmissionAuditPreviewRecord[] {
  return MANUAL_ADMISSION_AUDIT_PREVIEWS.map((preview) =>
    cloneAuditPreview(preview)
  );
}

export function groupManualRunAdmissionPreviewsByCapabilityFamily():
  readonly ManualRunAdmissionCapabilityFamilyGroup[] {
  const groups = new Map<
    string,
    {
      capabilityFamilyId: AiModelProviderCapabilityId;
      capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
      admissionPreviews: ManualRunAdmissionPreviewRecord[];
    }
  >();

  for (const preview of MANUAL_RUN_ADMISSION_PREVIEWS) {
    const existingGroup = groups.get(preview.selectedCapabilityFamily.id);

    if (existingGroup) {
      existingGroup.admissionPreviews.push(clonePreview(preview));
      continue;
    }

    groups.set(preview.selectedCapabilityFamily.id, {
      capabilityFamilyId: preview.selectedCapabilityFamily.id,
      capabilityFamilyLabel: preview.selectedCapabilityFamily.label,
      admissionPreviews: [clonePreview(preview)],
    });
  }

  return Array.from(groups.values()).map((group) => ({
    capabilityFamilyId: group.capabilityFamilyId,
    capabilityFamilyLabel: group.capabilityFamilyLabel,
    admissionPreviewCount: group.admissionPreviews.length,
    admissionPreviews: group.admissionPreviews,
  }));
}

export function groupManualRunAdmissionPreviewsByWorkspaceTarget():
  readonly ManualRunAdmissionWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    ManualRunAdmissionPreviewRecord[]
  >();

  for (const preview of MANUAL_RUN_ADMISSION_PREVIEWS) {
    const currentGroup = groups.get(preview.workspaceTarget) ?? [];
    currentGroup.push(clonePreview(preview));
    groups.set(preview.workspaceTarget, currentGroup);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, admissionPreviews]) => ({
    workspaceTarget,
    admissionPreviewCount: admissionPreviews.length,
    admissionPreviews,
  }));
}

export function buildManualRunAdmissionSummary(): ManualRunAdmissionSummary {
  const capabilityGroups = groupManualRunAdmissionPreviewsByCapabilityFamily();
  const workspaceGroups = groupManualRunAdmissionPreviewsByWorkspaceTarget();

  return {
    currentBatch: MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    highestDetectedPhase: MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_PHASE,
    latestCompletedBatch:
      MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    previousCompletedBatch:
      "4842-4873 - Model Provider Approval Packet and Run Intent Preview",
    nextLikelyBatch:
      NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    admissionPreviewCount: MANUAL_RUN_ADMISSION_PREVIEWS.length,
    gateEvaluationCount: ADMISSION_GATE_EVALUATIONS.length,
    ticketPreviewCount: ADMISSION_TICKET_PREVIEWS.length,
    denialRecoveryCount: ADMISSION_DENIAL_RECOVERY_PREVIEWS.length,
    blockerCount: MANUAL_RUN_ADMISSION_BLOCKERS.length,
    auditPreviewCount: MANUAL_ADMISSION_AUDIT_PREVIEWS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildAdmissionGateSummary(): ManualRunAdmissionGateSummary {
  return {
    currentBatch: MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateEvaluationCount: ADMISSION_GATE_EVALUATIONS.length,
    heldDecisionCount: ADMISSION_GATE_EVALUATIONS.filter(
      (record) => record.overallGateDecision === "held / not admitted"
    ).length,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildAdmissionBlockerSummary():
  ManualRunAdmissionBlockerSummary {
  return {
    currentBatch: MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    blockerCount: MANUAL_RUN_ADMISSION_BLOCKERS.length,
    criticalBlockerCount: MANUAL_RUN_ADMISSION_BLOCKERS.filter(
      (blocker) => blocker.severity === "critical"
    ).length,
    highBlockerCount: MANUAL_RUN_ADMISSION_BLOCKERS.filter(
      (blocker) => blocker.severity === "high"
    ).length,
    mediumBlockerCount: MANUAL_RUN_ADMISSION_BLOCKERS.filter(
      (blocker) => blocker.severity === "medium"
    ).length,
    summaryLines: cloneList(BLOCKER_SUMMARY_LINES),
  };
}

export function buildNextRunAdmissionReviewAndRecoveryChecklist():
  readonly string[] {
  return [
    "Review every held admission preview and map its blocked/default reason into a manual recovery path.",
    "Preview denial and recovery posture without issuing tickets, leases, queue dispatches, worker dispatches, or jobs.",
    "Keep prompts unsent, model calls disabled, provider execution blocked, and persistence unimplemented until backend-only recovery flows exist.",
  ] as const;
}
