import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews,
  listSyntheticEndToEndPacketAcceptancePostureRecords,
  listSyntheticEndToEndPacketReviewAuditSummaries,
} from "../min-synth-e2e-review";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalTextModelAdapterCommonRecordFields,
  type MinimalTextModelAdapterCurrentReadiness,
  type MinimalTextModelAdapterLocalPrivateAlternativeLabel,
  type MinimalTextModelAdapterMvpId,
  type MinimalTextModelAdapterMvpKey,
  type MinimalTextModelAdapterMvpRecord,
  type MinimalTextModelAdapterBackupProviderSlotLabel,
  type MinimalTextModelAdapterPreviewId,
  type MinimalTextModelAdapterProviderSlotLabel,
  type MinimalTextModelAdapterRoutingKey,
  type MinimalTextModelAdapterRoutingRecord,
  type MinimalTextModelAdapterWorkspaceTarget,
  type MinimalTextModelAdapterCapabilityFamilyId,
  type MinimalTextModelAdapterCapabilityFamilyLabel,
  type TextAdapterAdmissionCheckKey,
  type TextAdapterAdmissionCheckRecord,
  type TextAdapterApprovalPreviewKey,
  type TextAdapterApprovalPreviewRecord,
  type TextAdapterAuditPreviewKey,
  type TextAdapterAuditPreviewRecord,
  type TextAdapterBlockedLiveProviderSummaryKey,
  type TextAdapterBlockedLiveProviderSummaryRecord,
  type TextAdapterDeterministicFixtureResponseKey,
  type TextAdapterDeterministicFixtureResponseRecord,
  type TextAdapterDigest,
  type TextAdapterErrorEnvelopeKey,
  type TextAdapterErrorEnvelopeRecord,
  type TextAdapterErrorKey,
  type TextAdapterErrorRecord,
  type TextAdapterEvidencePreviewKey,
  type TextAdapterEvidencePreviewRecord,
  type TextAdapterEvidenceReference,
  type TextAdapterGateId,
  type TextAdapterGateRecord,
  type TextAdapterGateSummary,
  type TextAdapterInputKey,
  type TextAdapterInputRecord,
  type TextAdapterNormalizedRequestKey,
  type TextAdapterNormalizedRequestRecord,
  type TextAdapterReadinessMatrixId,
  type TextAdapterReadinessMatrixRecord,
  type TextAdapterReadinessSummary,
  type TextAdapterRedactedPromptEnvelopeKey,
  type TextAdapterRedactedPromptEnvelopeRecord,
  type TextAdapterRequestId,
  type TextAdapterRequestKey,
  type TextAdapterRequestRecord,
  type TextAdapterResponseEnvelopeKey,
  type TextAdapterResponseEnvelopeRecord,
  type TextAdapterResponseId,
  type TextAdapterResponseKey,
  type TextAdapterResponseRecord,
  type TextAdapterResultReference,
  type TextAdapterSafetyGateSummaryKey,
  type TextAdapterSafetyGateSummaryRecord,
  type TextAdapterSummary,
  type TextAdapterAuditReference,
  type TextAdapterApprovalReference,
} from "./min-text-adapter-types";

type TextAdapterSourceBundle = Readonly<{
  reviewRecord: ReturnType<
    typeof listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews
  >[number];
  acceptancePostureRecord: ReturnType<
    typeof listSyntheticEndToEndPacketAcceptancePostureRecords
  >[number];
  auditSummaryRecord: ReturnType<
    typeof listSyntheticEndToEndPacketReviewAuditSummaries
  >[number];
  manualApprovalDecisionReviewRecord: ReturnType<
    typeof listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews
  >[number];
  manualApprovalFixtureRecord: ReturnType<
    typeof listSyntheticMvpManualApprovalFixtures
  >[number];
}>;

type TextAdapterRoutingSeed = Readonly<{
  capabilityFamilyId: MinimalTextModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: MinimalTextModelAdapterCapabilityFamilyLabel;
  summary: string;
}>;

type TextAdapterGateSeed = Readonly<{
  gateId: TextAdapterGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}>;

type TextAdapterReadinessSeed = Readonly<{
  readinessId: TextAdapterReadinessMatrixId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}>;

const STATIC_FIXTURE_ID: MinimalTextModelAdapterMvpId =
  "conversational-planning-request";

const CURRENT_READINESS: MinimalTextModelAdapterCurrentReadiness =
  "minimal-text-adapter-mvp-only / backend-only / fixture-only / not provider-capable / not persistent";

const SELECTED_CAPABILITY_FAMILY_ID: MinimalTextModelAdapterCapabilityFamilyId =
  "planning-reasoning";
const SELECTED_CAPABILITY_FAMILY_LABEL: MinimalTextModelAdapterCapabilityFamilyLabel =
  "planning/reasoning";

const TEXT_ADAPTER_SUMMARY_LINES = [
  "backend-owned minimal manual-gated text model adapter MVP only",
  "minimal text model adapter MVP is backend-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
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
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  `current readiness is ${CURRENT_READINESS}`,
  "backend-owned minimal manual-gated text model adapter review and recovery preview available",
] as const;

const TEXT_ADAPTER_GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only adapter module boundary",
  "text adapter fixture mode",
  "synthetic end-to-end packet review dependency",
  "manual approval fixture",
  "manual confirmation fixture",
  "deterministic adapter id",
  "deterministic request id",
  "deterministic response id",
  "deterministic adapter digest",
  "redacted prompt envelope",
  "prompt not sent",
  "provider response not received",
  "model output not generated",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider SDK import",
  "no provider execution",
  "no model call",
  "no prompt sending",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database write",
  "no file write",
  "single-run lock preview",
  "idempotency/replay preview",
  "timeout/cancel preview",
  "privacy/redaction preview",
  "kill switch fixture",
] as const;

const TEXT_ADAPTER_READINESS_SUMMARY_LINES = [
  "server-only adapter helper state",
  "synthetic end-to-end packet review dependency",
  "text adapter input state",
  "adapter admission check state",
  "normalized request state",
  "redacted prompt envelope state",
  "deterministic fixture response state",
  "response envelope state",
  "error envelope state",
  "evidence packet state",
  "audit preview state",
  "approval preview state",
  "provider boundary state",
  "prompt boundary state",
  "model boundary state",
  "frontend request boundary state",
  "API route boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  `current readiness: ${CURRENT_READINESS}`,
  "next safe action",
] as const;

const NEXT_TEXT_ADAPTER_REVIEW_RECOVERY_CHECKLIST = [
  "Review the backend-owned minimal manual-gated text model adapter MVP output before adding any review and recovery layer.",
  "Keep the server-only text adapter helper backend-only, manual-gated, fixture-only, deterministic, and in-memory only.",
  "Do not add a frontend request, API route, prompt sending path, provider SDK import, provider execution path, model call, queue dispatch, worker dispatch, or job execution path.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, blocked approval token and lease issuance, and non-persistent result, audit, approval, and evidence references.",
  "text adapter review and recovery preview comes next",
] as const;

const BLOCKED_LIVE_PROVIDER_ACTIONS = [
  "real approval request",
  "real approval recording",
  "approval token issuance",
  "approval lease issuance",
  "prompt sending",
  "provider SDK import",
  "provider execution",
  "plugin execution",
  "model call",
  "frontend request creation",
  "API route creation",
  "result persistence",
  "audit persistence",
  "approval persistence",
  "database write",
  "file write",
  "queue dispatch",
  "worker dispatch",
  "job execution",
  "retry execution",
  "fallback execution",
] as const;

const ROUTING_SEEDS = [
  {
    capabilityFamilyId: "text-chat",
    capabilityFamilyLabel: "text/chat",
    summary:
      "Athena keeps a backend-owned text/chat routing record at the adapter boundary while provider execution stays disabled.",
  },
  {
    capabilityFamilyId: "planning-reasoning",
    capabilityFamilyLabel: "planning/reasoning",
    summary:
      "Athena keeps a backend-owned planning/reasoning routing record at the adapter boundary while provider execution stays disabled.",
  },
] as const satisfies readonly TextAdapterRoutingSeed[];

const GATE_SEEDS = [
  {
    gateId: "backend-only-boundary",
    label: "Backend-only boundary",
    owner: "backend boundary",
    requiredState: "backend-owned",
    currentState: "backend-owned",
    evidence: "backend-owned minimal manual-gated text model adapter MVP only",
    blockedLiveAction: "frontend-callable adapter execution",
  },
  {
    gateId: "server-only-adapter-module-boundary",
    label: "Server-only adapter module boundary",
    owner: "server boundary",
    requiredState: "server-only",
    currentState: "server-only",
    evidence: "server-only text adapter helper exists",
    blockedLiveAction: "client-side adapter import",
  },
  {
    gateId: "text-adapter-fixture-mode",
    label: "Text adapter fixture mode",
    owner: "adapter boundary",
    requiredState: "fixture-only",
    currentState: "fixture-only",
    evidence: "text adapter output is deterministic fixture output only",
    blockedLiveAction: "live text adapter execution",
  },
  {
    gateId: "synthetic-end-to-end-packet-review-dependency",
    label: "Synthetic end-to-end packet review dependency",
    owner: "review dependency",
    requiredState: "available",
    currentState: "available",
    evidence: "Backend-owned minimal synthetic end-to-end packet review",
    blockedLiveAction: "adapter admission without the synthetic review fixture",
  },
  {
    gateId: "manual-approval-fixture",
    label: "Manual approval fixture",
    owner: "approval boundary",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "approval fixture is preview-only",
    blockedLiveAction: "real approval request",
  },
  {
    gateId: "manual-confirmation-fixture",
    label: "Manual confirmation fixture",
    owner: "approval boundary",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "manual confirmation fixture is preview-only",
    blockedLiveAction: "real manual confirmation capture",
  },
  {
    gateId: "deterministic-adapter-id",
    label: "Deterministic adapter id",
    owner: "adapter identity",
    requiredState: "preview id only",
    currentState: "preview id only",
    evidence: "deterministic preview id only",
    blockedLiveAction: "runtime-generated adapter id",
  },
  {
    gateId: "deterministic-request-id",
    label: "Deterministic request id",
    owner: "request identity",
    requiredState: "preview id only",
    currentState: "preview id only",
    evidence: "deterministic preview id only",
    blockedLiveAction: "runtime-generated request id",
  },
  {
    gateId: "deterministic-response-id",
    label: "Deterministic response id",
    owner: "response identity",
    requiredState: "preview id only",
    currentState: "preview id only",
    evidence: "deterministic preview id only",
    blockedLiveAction: "runtime-generated response id",
  },
  {
    gateId: "deterministic-adapter-digest",
    label: "Deterministic adapter digest",
    owner: "adapter digest",
    requiredState: "preview digest only",
    currentState: "preview digest only",
    evidence: "deterministic preview digest only",
    blockedLiveAction: "runtime-generated digest",
  },
  {
    gateId: "redacted-prompt-envelope",
    label: "Redacted prompt envelope",
    owner: "prompt boundary",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "redacted prompt envelope is preview-only",
    blockedLiveAction: "live prompt payload",
  },
  {
    gateId: "prompt-not-sent",
    label: "Prompt not sent",
    owner: "prompt boundary",
    requiredState: "not sent",
    currentState: "not sent",
    evidence: "prompt transmission state is not sent",
    blockedLiveAction: "prompt transmission",
  },
  {
    gateId: "provider-response-not-received",
    label: "Provider response not received",
    owner: "provider boundary",
    requiredState: "not received",
    currentState: "not received",
    evidence: "provider response is not received",
    blockedLiveAction: "provider response ingestion",
  },
  {
    gateId: "model-output-not-generated",
    label: "Model output not generated",
    owner: "model boundary",
    requiredState: "not generated",
    currentState: "not generated",
    evidence: "model output is not generated",
    blockedLiveAction: "model output generation",
  },
  {
    gateId: "no-real-approval-recording",
    label: "No real approval recording",
    owner: "approval boundary",
    requiredState: "not recorded",
    currentState: "not recorded",
    evidence: "no real approval recording",
    blockedLiveAction: "approval recording",
  },
  {
    gateId: "no-approval-token-issuance",
    label: "No approval token issuance",
    owner: "approval boundary",
    requiredState: "not issued",
    currentState: "not issued",
    evidence: "approval token is not issued",
    blockedLiveAction: "approval token issuance",
  },
  {
    gateId: "no-approval-lease-issuance",
    label: "No approval lease issuance",
    owner: "approval boundary",
    requiredState: "not created",
    currentState: "not created",
    evidence: "approval lease is not created",
    blockedLiveAction: "approval lease issuance",
  },
  {
    gateId: "no-frontend-request",
    label: "No frontend request",
    owner: "frontend boundary",
    requiredState: "not created",
    currentState: "not created",
    evidence: "no frontend request is created",
    blockedLiveAction: "frontend request creation",
  },
  {
    gateId: "no-api-route",
    label: "No API route",
    owner: "route boundary",
    requiredState: "not created",
    currentState: "not created",
    evidence: "no API route is created",
    blockedLiveAction: "API route creation",
  },
  {
    gateId: "no-fetch-network",
    label: "No fetch/network",
    owner: "network boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "no frontend fetch/network call",
    blockedLiveAction: "fetch/network call",
  },
  {
    gateId: "no-provider-sdk-import",
    label: "No provider SDK import",
    owner: "provider boundary",
    requiredState: "not imported",
    currentState: "not imported",
    evidence: "no provider SDK imports",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "no-provider-execution",
    label: "No provider execution",
    owner: "provider boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "no provider execution",
    blockedLiveAction: "provider execution",
  },
  {
    gateId: "no-model-call",
    label: "No model call",
    owner: "model boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "no LLM/model calls",
    blockedLiveAction: "model call",
  },
  {
    gateId: "no-prompt-sending",
    label: "No prompt sending",
    owner: "prompt boundary",
    requiredState: "not sent",
    currentState: "not sent",
    evidence: "no prompt sending",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "no-queue-dispatch",
    label: "No queue dispatch",
    owner: "queue boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "no queue dispatch",
    blockedLiveAction: "queue dispatch",
  },
  {
    gateId: "no-worker-dispatch",
    label: "No worker dispatch",
    owner: "worker boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "no worker dispatch",
    blockedLiveAction: "worker dispatch",
  },
  {
    gateId: "no-job-execution",
    label: "No job execution",
    owner: "job boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "no job execution",
    blockedLiveAction: "job execution",
  },
  {
    gateId: "no-result-persistence",
    label: "No result persistence",
    owner: "persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "no result persistence",
    blockedLiveAction: "result persistence",
  },
  {
    gateId: "no-audit-persistence",
    label: "No audit persistence",
    owner: "persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "no audit persistence",
    blockedLiveAction: "audit persistence",
  },
  {
    gateId: "no-approval-persistence",
    label: "No approval persistence",
    owner: "persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "no approval persistence",
    blockedLiveAction: "approval persistence",
  },
  {
    gateId: "no-database-write",
    label: "No database write",
    owner: "database boundary",
    requiredState: "none",
    currentState: "none",
    evidence: "no database writes",
    blockedLiveAction: "database write",
  },
  {
    gateId: "no-file-write",
    label: "No file write",
    owner: "file boundary",
    requiredState: "none",
    currentState: "none",
    evidence: "no file writes",
    blockedLiveAction: "file write",
  },
  {
    gateId: "single-run-lock-preview",
    label: "Single-run lock preview",
    owner: "adapter readiness",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "single-run lock preview",
    blockedLiveAction: "concurrent live adapter execution",
  },
  {
    gateId: "idempotency-replay-preview",
    label: "Idempotency/replay preview",
    owner: "adapter readiness",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "idempotency/replay preview",
    blockedLiveAction: "live replay",
  },
  {
    gateId: "timeout-cancel-preview",
    label: "Timeout/cancel preview",
    owner: "adapter readiness",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "timeout/cancel preview",
    blockedLiveAction: "live timeout/cancel execution",
  },
  {
    gateId: "privacy-redaction-preview",
    label: "Privacy/redaction preview",
    owner: "privacy boundary",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "privacy/redaction preview",
    blockedLiveAction: "unredacted live prompt transport",
  },
  {
    gateId: "kill-switch-fixture",
    label: "Kill switch fixture",
    owner: "safety boundary",
    requiredState: "fixture-only",
    currentState: "fixture-only",
    evidence: "kill switch fixture",
    blockedLiveAction: "live adapter execution after safety block",
  },
] as const satisfies readonly TextAdapterGateSeed[];

const READINESS_SEEDS = [
  {
    readinessId: "server-only-adapter-helper-state",
    label: "Server-only adapter helper state",
    state: "ready / server-only / deterministic",
    evidence: "server-only text adapter helper exists",
    nextSafeAction:
      "Keep the helper backend-only, server-only, deterministic, and fixture-only.",
  },
  {
    readinessId: "synthetic-end-to-end-packet-review-dependency",
    label: "Synthetic end-to-end packet review dependency",
    state: "available / preview-only",
    evidence: "Backend-owned minimal synthetic end-to-end packet review",
    nextSafeAction:
      "Keep the adapter admission path tied to the synthetic end-to-end packet review fixture.",
  },
  {
    readinessId: "text-adapter-input-state",
    label: "Text adapter input state",
    state: "deterministic text adapter fixture input only",
    evidence: "Text adapter input",
    nextSafeAction:
      "Keep frontend request state not created and API route state not created.",
  },
  {
    readinessId: "adapter-admission-check-state",
    label: "Adapter admission check state",
    state: "accepted / fixture-only / provider-disabled",
    evidence: "Text adapter admission check",
    nextSafeAction:
      "Keep admission scoped to the static synthetic review fixture only.",
  },
  {
    readinessId: "normalized-request-state",
    label: "Normalized request state",
    state: "normalized text adapter fixture request only",
    evidence: "Text adapter normalized request",
    nextSafeAction:
      "Keep routing adapter-owned and provider-disabled.",
  },
  {
    readinessId: "redacted-prompt-envelope-state",
    label: "Redacted prompt envelope state",
    state: "redacted preview only",
    evidence: "Text adapter redacted prompt envelope",
    nextSafeAction:
      "Keep the prompt envelope redacted and unsent.",
  },
  {
    readinessId: "deterministic-fixture-response-state",
    label: "Deterministic fixture response state",
    state: "deterministic fixture response in memory only",
    evidence: "Text adapter deterministic fixture response",
    nextSafeAction:
      "Return deterministic in-memory fixture output only.",
  },
  {
    readinessId: "response-envelope-state",
    label: "Response envelope state",
    state: "fixture response envelope only",
    evidence: "Text adapter response envelope",
    nextSafeAction:
      "Keep request, response, and error references preview-only.",
  },
  {
    readinessId: "error-envelope-state",
    label: "Error envelope state",
    state: "preview-only error envelope",
    evidence: "Text adapter error envelope",
    nextSafeAction:
      "Keep error examples deterministic and preview-only.",
  },
  {
    readinessId: "evidence-packet-state",
    label: "Evidence packet state",
    state: "preview-only / not persisted",
    evidence: "Text adapter evidence preview",
    nextSafeAction:
      "Keep evidence references preview-only and non-persistent.",
  },
  {
    readinessId: "audit-preview-state",
    label: "Audit preview state",
    state: "preview-only / not persisted",
    evidence: "Text adapter audit preview",
    nextSafeAction:
      "Keep audit references preview-only and non-persistent.",
  },
  {
    readinessId: "approval-preview-state",
    label: "Approval preview state",
    state: "preview-only / not persisted",
    evidence: "Text adapter approval preview",
    nextSafeAction:
      "Keep approval references preview-only and non-persistent.",
  },
  {
    readinessId: "provider-boundary-state",
    label: "Provider boundary state",
    state: "blocked / not imported / not received",
    evidence: "no provider execution",
    nextSafeAction:
      "Keep provider SDK imports absent and provider execution blocked.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "Prompt boundary state",
    state: "blocked / not sent",
    evidence: "no prompt sending",
    nextSafeAction: "Keep prompt sending blocked.",
  },
  {
    readinessId: "model-boundary-state",
    label: "Model boundary state",
    state: "blocked / not generated",
    evidence: "no LLM/model calls",
    nextSafeAction: "Keep model output absent.",
  },
  {
    readinessId: "frontend-request-boundary-state",
    label: "Frontend request boundary state",
    state: "not created",
    evidence: "no frontend request is created",
    nextSafeAction:
      "Keep the helper backend-only and not frontend-callable.",
  },
  {
    readinessId: "api-route-boundary-state",
    label: "API route boundary state",
    state: "not created",
    evidence: "no API route is created",
    nextSafeAction:
      "Do not add a live API route for the text adapter in this batch.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "Queue boundary state",
    state: "blocked",
    evidence: "no queue dispatch",
    nextSafeAction: "Keep queue dispatch blocked.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "Worker boundary state",
    state: "blocked",
    evidence: "no worker dispatch",
    nextSafeAction: "Keep worker dispatch blocked.",
  },
  {
    readinessId: "job-boundary-state",
    label: "Job boundary state",
    state: "blocked",
    evidence: "no job execution",
    nextSafeAction: "Keep job execution blocked.",
  },
  {
    readinessId: "result-persistence-boundary-state",
    label: "Result persistence boundary state",
    state: "not implemented",
    evidence: "no result persistence",
    nextSafeAction: "Do not add result persistence in this batch.",
  },
  {
    readinessId: "audit-persistence-boundary-state",
    label: "Audit persistence boundary state",
    state: "not implemented",
    evidence: "no audit persistence",
    nextSafeAction: "Do not add audit persistence in this batch.",
  },
  {
    readinessId: "approval-persistence-boundary-state",
    label: "Approval persistence boundary state",
    state: "not implemented",
    evidence: "no approval persistence",
    nextSafeAction: "Do not add approval persistence in this batch.",
  },
  {
    readinessId: "database-boundary-state",
    label: "Database boundary state",
    state: "none / not implemented",
    evidence: "no database writes",
    nextSafeAction: "Do not add database writes in this batch.",
  },
  {
    readinessId: "file-boundary-state",
    label: "File boundary state",
    state: "none / not implemented",
    evidence: "no file writes",
    nextSafeAction: "Do not add file writes in this batch.",
  },
] as const satisfies readonly TextAdapterReadinessSeed[];

function cloneList<T>(records: readonly T[]): readonly T[] {
  return records.map((record) => record);
}

function findRequired<T>(
  records: readonly T[],
  predicate: (record: T) => boolean,
  label: string
): T {
  const record = records.find(predicate);

  if (!record) {
    throw new Error(`Missing ${label}.`);
  }

  return record;
}

export function buildStableMinimalTextModelAdapterMvpKey(
  id: MinimalTextModelAdapterMvpId
): MinimalTextModelAdapterMvpKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-mvp:${id}`;
}

export function buildStableMinimalTextModelAdapterRoutingKey(
  capabilityFamilyId: MinimalTextModelAdapterCapabilityFamilyId
): MinimalTextModelAdapterRoutingKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-routing:${capabilityFamilyId}`;
}

function buildTextAdapterPreviewId(
  id: MinimalTextModelAdapterMvpId
): MinimalTextModelAdapterPreviewId {
  return `text-model-adapter-preview:${id}`;
}

function buildTextAdapterRequestId(
  id: MinimalTextModelAdapterMvpId
): TextAdapterRequestId {
  return `text-model-adapter-request-preview:${id}`;
}

function buildTextAdapterResponseId(
  id: MinimalTextModelAdapterMvpId
): TextAdapterResponseId {
  return `text-model-adapter-response-preview:${id}`;
}

function buildTextAdapterDigest(
  id: MinimalTextModelAdapterMvpId
): TextAdapterDigest {
  return `text-model-adapter-digest-preview:${id}:fixture-only`;
}

function buildTextAdapterResultReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterResultReference {
  return `text-model-adapter-result-reference-preview:${id}`;
}

function buildTextAdapterAuditReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterAuditReference {
  return `text-model-adapter-audit-reference-preview:${id}`;
}

function buildTextAdapterApprovalReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterApprovalReference {
  return `text-model-adapter-approval-reference-preview:${id}`;
}

function buildTextAdapterEvidenceReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterEvidenceReference {
  return `text-model-adapter-evidence-reference-preview:${id}`;
}

function buildStableTextAdapterInputKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterInputKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-input:${id}`;
}

function buildStableTextAdapterAdmissionCheckKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterAdmissionCheckKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-admission-check:${id}`;
}

function buildStableTextAdapterNormalizedRequestKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterNormalizedRequestKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-normalized-request:${id}`;
}

function buildStableTextAdapterRedactedPromptEnvelopeKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterRedactedPromptEnvelopeKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope:${id}`;
}

function buildStableTextAdapterDeterministicFixtureResponseKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterDeterministicFixtureResponseKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response:${id}`;
}

function buildStableTextAdapterResponseEnvelopeKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterResponseEnvelopeKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-response-envelope:${id}`;
}

function buildStableTextAdapterErrorEnvelopeKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterErrorEnvelopeKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-error-envelope:${id}`;
}

function buildStableTextAdapterEvidencePreviewKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterEvidencePreviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-evidence-preview:${id}`;
}

function buildStableTextAdapterAuditPreviewKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterAuditPreviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-audit-preview:${id}`;
}

function buildStableTextAdapterApprovalPreviewKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterApprovalPreviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-approval-preview:${id}`;
}

function buildStableTextAdapterSafetyGateSummaryKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterSafetyGateSummaryKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary:${id}`;
}

function buildStableTextAdapterBlockedLiveProviderSummaryKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterBlockedLiveProviderSummaryKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-blocked-live-provider-summary:${id}`;
}

function buildStableTextAdapterRequestKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterRequestKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-request:${id}`;
}

function buildStableTextAdapterResponseKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterResponseKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-response:${id}`;
}

function buildStableTextAdapterErrorKey(
  id: MinimalTextModelAdapterMvpId
): TextAdapterErrorKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-error:${id}`;
}

function buildStableGateKey(
  gateId: TextAdapterGateId,
  stableId: MinimalTextModelAdapterMvpId
): `${TextAdapterGateId}:${MinimalTextModelAdapterMvpId}` {
  return `${gateId}:${stableId}`;
}

function buildStableReadinessKey(
  readinessId: TextAdapterReadinessMatrixId,
  stableId: MinimalTextModelAdapterMvpId
): `${TextAdapterReadinessMatrixId}:${MinimalTextModelAdapterMvpId}` {
  return `${readinessId}:${stableId}`;
}

const REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews();
const ACCEPTANCE_POSTURE_RECORDS =
  listSyntheticEndToEndPacketAcceptancePostureRecords();
const REVIEW_AUDIT_SUMMARY_RECORDS =
  listSyntheticEndToEndPacketReviewAuditSummaries();
const MANUAL_APPROVAL_DECISION_REVIEW_RECORDS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const MANUAL_APPROVAL_FIXTURE_RECORDS = listSyntheticMvpManualApprovalFixtures();

function buildSourceBundle(
  id: MinimalTextModelAdapterMvpId
): TextAdapterSourceBundle {
  return {
    reviewRecord: findRequired(
      REVIEW_RECORDS,
      (record) => record.id === id,
      `synthetic end-to-end packet review for ${id}`
    ),
    acceptancePostureRecord: findRequired(
      ACCEPTANCE_POSTURE_RECORDS,
      (record) => record.id === id,
      `synthetic end-to-end packet acceptance posture for ${id}`
    ),
    auditSummaryRecord: findRequired(
      REVIEW_AUDIT_SUMMARY_RECORDS,
      (record) => record.id === id,
      `synthetic end-to-end packet audit summary for ${id}`
    ),
    manualApprovalDecisionReviewRecord: findRequired(
      MANUAL_APPROVAL_DECISION_REVIEW_RECORDS,
      (record) => record.id === id,
      `manual approval decision review for ${id}`
    ),
    manualApprovalFixtureRecord: findRequired(
      MANUAL_APPROVAL_FIXTURE_RECORDS,
      (record) => record.executionMvpId === id,
      `manual approval fixture for ${id}`
    ),
  };
}

const STATIC_SOURCE = buildSourceBundle(STATIC_FIXTURE_ID);

function buildCommonRecordFields(
  capabilityFamily: MinimalTextModelAdapterCapabilityFamilyLabel
): MinimalTextModelAdapterCommonRecordFields {
  return {
    stableId: STATIC_SOURCE.reviewRecord.id as MinimalTextModelAdapterMvpId,
    capabilityFamily,
    workspaceTarget: STATIC_SOURCE.reviewRecord.workspaceTarget,
    providerSlotLabel:
      STATIC_SOURCE.reviewRecord.providerSlotLabel as MinimalTextModelAdapterProviderSlotLabel,
    backupProviderSlotLabel:
      STATIC_SOURCE.reviewRecord
        .backupProviderSlotLabel as MinimalTextModelAdapterBackupProviderSlotLabel,
    localPrivateAlternativeLabel:
      STATIC_SOURCE.reviewRecord
        .localPrivateAlternativeLabel as MinimalTextModelAdapterLocalPrivateAlternativeLabel,
    sourceSyntheticEndToEndPacketReviewReference: STATIC_SOURCE.reviewRecord.key,
    sourceSyntheticEndToEndPacketAcceptancePostureReference:
      STATIC_SOURCE.acceptancePostureRecord.key,
    sourceSyntheticEndToEndPacketAuditSummaryReference:
      STATIC_SOURCE.auditSummaryRecord.key,
    sourceManualApprovalDecisionReviewReference:
      STATIC_SOURCE.manualApprovalDecisionReviewRecord.key,
    sourceManualApprovalFixtureReference:
      STATIC_SOURCE.manualApprovalFixtureRecord.key,
    sourceManualConfirmationFixtureReference:
      STATIC_SOURCE.manualApprovalFixtureRecord.key,
    backendOwnedPosture: "backend-owned",
    serverOnlyPosture: "server-only",
    adapterBoundaryPosture: "adapter-boundary",
    manualGatedPosture: "manual-gated",
    fixtureOnlyPosture: "fixture-only",
    inMemoryOnlyPosture: "in-memory-only",
    noProviderExecution: "no provider execution",
    noModelCalls: "no model calls",
    noPromptSending: "no prompt sending",
    noFrontendRequest: "no frontend request",
    noApiRoute: "no API route",
    noQueueWorkerJobDispatch: "no queue/worker/job dispatch",
    noPersistence: "no persistence",
    noDatabaseWrites: "no database writes",
    noFileWrites: "no file writes",
    noResultPersistence: "no result persistence",
    noAuditPersistence: "no audit persistence",
    noApprovalPersistence: "no approval persistence",
    noApprovalRecording: "no approval recording",
    noApprovalTokenIssuance: "no approval token issuance",
    noApprovalLeaseIssuance: "no approval lease issuance",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

const ROUTING_RECORDS = ROUTING_SEEDS.map((seed) => ({
  stableId: seed.capabilityFamilyId,
  key: buildStableMinimalTextModelAdapterRoutingKey(seed.capabilityFamilyId),
  version: "backend-owned-minimal-manual-gated-text-model-adapter-routing-v1",
  capabilityFamilyId: seed.capabilityFamilyId,
  capabilityFamilyLabel: seed.capabilityFamilyLabel,
  workspaceTarget: STATIC_SOURCE.reviewRecord.workspaceTarget,
  providerSlotLabel:
    STATIC_SOURCE.reviewRecord.providerSlotLabel as MinimalTextModelAdapterProviderSlotLabel,
  backupProviderSlotLabel:
    STATIC_SOURCE.reviewRecord
      .backupProviderSlotLabel as MinimalTextModelAdapterBackupProviderSlotLabel,
  localPrivateAlternativeLabel:
    STATIC_SOURCE.reviewRecord
      .localPrivateAlternativeLabel as MinimalTextModelAdapterLocalPrivateAlternativeLabel,
  routingState: "adapter-owned / provider-disabled",
  providerExecutionState: "blocked",
  summary: seed.summary,
  nextReviewRecoveryRequirement:
    NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
})) satisfies readonly MinimalTextModelAdapterRoutingRecord[];

const MINIMAL_TEXT_MODEL_ADAPTER_MVP_RECORDS = [
  {
    key: buildStableMinimalTextModelAdapterMvpKey(STATIC_FIXTURE_ID),
    version: "backend-owned-minimal-manual-gated-text-model-adapter-mvp-v1",
    label: "Backend-owned minimal manual-gated text model adapter MVP",
    requestLabel: STATIC_SOURCE.reviewRecord.requestLabel,
    adapterState: "completed-text-adapter-fixture-only",
    textAdapterId: buildTextAdapterPreviewId(STATIC_FIXTURE_ID),
    requestId: buildTextAdapterRequestId(STATIC_FIXTURE_ID),
    responseId: buildTextAdapterResponseId(STATIC_FIXTURE_ID),
    adapterDigest: buildTextAdapterDigest(STATIC_FIXTURE_ID),
    normalizedOperatorIntent: "static fixture only",
    redactedPromptPreview: "static placeholder only",
    deterministicFixtureResponse: "static placeholder only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildTextAdapterResultReference(STATIC_FIXTURE_ID),
    auditReference: buildTextAdapterAuditReference(STATIC_FIXTURE_ID),
    approvalReference: buildTextAdapterApprovalReference(STATIC_FIXTURE_ID),
    evidencePacketReference: buildTextAdapterEvidenceReference(STATIC_FIXTURE_ID),
    timestampPosture: "static fixture label only / no real timestamp",
    currentReadiness: CURRENT_READINESS,
    routingRecordReferences: ROUTING_RECORDS.map((record) => record.key),
    safetyGateSummaryReference:
      buildStableTextAdapterSafetyGateSummaryKey(STATIC_FIXTURE_ID),
    blockedLiveProviderSummaryReference:
      buildStableTextAdapterBlockedLiveProviderSummaryKey(STATIC_FIXTURE_ID),
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly MinimalTextModelAdapterMvpRecord[];

const TEXT_ADAPTER_INPUT_RECORDS = [
  {
    key: buildStableTextAdapterInputKey(STATIC_FIXTURE_ID),
    version: "backend-owned-minimal-manual-gated-text-model-adapter-input-v1",
    inputState: "deterministic text adapter fixture input only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    operatorIntentSource: "synthetic end-to-end packet review fixture",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallStatement:
      "No frontend request. No API route. No provider call.",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterInputRecord[];

const TEXT_ADAPTER_ADMISSION_CHECK_RECORDS = [
  {
    key: buildStableTextAdapterAdmissionCheckKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-admission-check-v1",
    admissionState: "accepted / fixture-only / provider-disabled",
    acceptedFixtureId: STATIC_FIXTURE_ID,
    backendOnlyCheck: "passed",
    serverOnlyCheck: "passed",
    fixtureOnlyCheck: "passed",
    providerExecutionCheck: "blocked",
    persistenceCheck: "blocked",
    nextSafeAction:
      "Keep adapter admission pinned to the static synthetic end-to-end packet review fixture only.",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterAdmissionCheckRecord[];

const TEXT_ADAPTER_NORMALIZED_REQUEST_RECORDS = [
  {
    key: buildStableTextAdapterNormalizedRequestKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-normalized-request-v1",
    normalizedRequestState: "normalized text adapter fixture request only",
    textAdapterId: buildTextAdapterPreviewId(STATIC_FIXTURE_ID),
    normalizedOperatorIntent: "static fixture only",
    selectedRoutingFamilyId: SELECTED_CAPABILITY_FAMILY_ID,
    selectedRoutingFamilyLabel: SELECTED_CAPABILITY_FAMILY_LABEL,
    routingRecordReference:
      buildStableMinimalTextModelAdapterRoutingKey(
        SELECTED_CAPABILITY_FAMILY_ID
      ),
    promptPayloadPosture: "redacted placeholder only",
    persistenceTargetPosture: "none",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterNormalizedRequestRecord[];

const TEXT_ADAPTER_REDACTED_PROMPT_ENVELOPE_RECORDS = [
  {
    key: buildStableTextAdapterRedactedPromptEnvelopeKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-v1",
    promptEnvelopeState: "redacted preview only",
    normalizedRequestReference:
      buildStableTextAdapterNormalizedRequestKey(STATIC_FIXTURE_ID),
    redactedPromptPreview: "static placeholder only",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    privacyRedactionPosture: "preview-only",
    killSwitchState: "fixture-only",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterRedactedPromptEnvelopeRecord[];

const TEXT_ADAPTER_DETERMINISTIC_FIXTURE_RESPONSE_RECORDS = [
  {
    key: buildStableTextAdapterDeterministicFixtureResponseKey(
      STATIC_FIXTURE_ID
    ),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-v1",
    fixtureResponseState: "deterministic fixture response in memory only",
    responseId: buildTextAdapterResponseId(STATIC_FIXTURE_ID),
    deterministicFixtureResponse: "static placeholder only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildTextAdapterResultReference(STATIC_FIXTURE_ID),
    resultReferenceState: "preview-only / not persisted",
    explicitFixtureResponseOnlyNoProviderOutputNoPersistenceStatement:
      "Fixture response only. No provider output. No persistence.",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterDeterministicFixtureResponseRecord[];

const TEXT_ADAPTER_RESPONSE_ENVELOPE_RECORDS = [
  {
    key: buildStableTextAdapterResponseEnvelopeKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-response-envelope-v1",
    responseEnvelopeState: "fixture response envelope only",
    requestReference: buildStableTextAdapterRequestKey(STATIC_FIXTURE_ID),
    responseReference: buildStableTextAdapterResponseKey(STATIC_FIXTURE_ID),
    errorReference: buildStableTextAdapterErrorKey(STATIC_FIXTURE_ID),
    inputReference: buildStableTextAdapterInputKey(STATIC_FIXTURE_ID),
    admissionCheckReference:
      buildStableTextAdapterAdmissionCheckKey(STATIC_FIXTURE_ID),
    normalizedRequestReference:
      buildStableTextAdapterNormalizedRequestKey(STATIC_FIXTURE_ID),
    redactedPromptEnvelopeReference:
      buildStableTextAdapterRedactedPromptEnvelopeKey(STATIC_FIXTURE_ID),
    fixtureResponseReference:
      buildStableTextAdapterDeterministicFixtureResponseKey(STATIC_FIXTURE_ID),
    evidencePreviewReference:
      buildStableTextAdapterEvidencePreviewKey(STATIC_FIXTURE_ID),
    auditPreviewReference:
      buildStableTextAdapterAuditPreviewKey(STATIC_FIXTURE_ID),
    approvalPreviewReference:
      buildStableTextAdapterApprovalPreviewKey(STATIC_FIXTURE_ID),
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterResponseEnvelopeRecord[];

const TEXT_ADAPTER_ERROR_ENVELOPE_RECORDS = [
  {
    key: buildStableTextAdapterErrorEnvelopeKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-error-envelope-v1",
    errorEnvelopeState: "preview-only error envelope",
    requestReference: buildStableTextAdapterRequestKey(STATIC_FIXTURE_ID),
    responseReference: buildStableTextAdapterResponseKey(STATIC_FIXTURE_ID),
    errorReference: buildStableTextAdapterErrorKey(STATIC_FIXTURE_ID),
    representativeFailureExamples: [
      "synthetic-end-to-end-packet-review-dependency",
      "manual-approval-fixture",
      "redacted-prompt-envelope",
      "no-provider-sdk-import",
      "no-provider-execution",
      "no-model-call",
      "no-result-persistence",
    ],
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterErrorEnvelopeRecord[];

const TEXT_ADAPTER_EVIDENCE_PREVIEW_RECORDS = [
  {
    key: buildStableTextAdapterEvidencePreviewKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-evidence-preview-v1",
    evidenceReference: buildTextAdapterEvidenceReference(STATIC_FIXTURE_ID),
    evidencePreviewState: "preview-only / not persisted",
    evidenceSummaryLines: [
      "source synthetic end-to-end packet review reference is preview-only",
      "source synthetic end-to-end packet acceptance posture reference is preview-only",
      "source synthetic end-to-end packet audit summary reference is preview-only",
      "manual approval fixture reference is preview-only",
      "manual confirmation fixture reference is preview-only",
    ],
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterEvidencePreviewRecord[];

const TEXT_ADAPTER_AUDIT_PREVIEW_RECORDS = [
  {
    key: buildStableTextAdapterAuditPreviewKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-audit-preview-v1",
    auditReference: buildTextAdapterAuditReference(STATIC_FIXTURE_ID),
    auditPreviewState: "preview-only / not persisted",
    auditSummaryLines: [
      "audit preview is deterministic adapter metadata only",
      "no audit persistence",
      "source synthetic end-to-end packet audit summary stays preview-only",
    ],
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterAuditPreviewRecord[];

const TEXT_ADAPTER_APPROVAL_PREVIEW_RECORDS = [
  {
    key: buildStableTextAdapterApprovalPreviewKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-approval-preview-v1",
    approvalReference: buildTextAdapterApprovalReference(STATIC_FIXTURE_ID),
    approvalPreviewState: "preview-only / not persisted",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalSummaryLines: [
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "approval token is not issued",
      "approval lease is not created",
      "no approval persistence",
    ],
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterApprovalPreviewRecord[];

const TEXT_ADAPTER_SAFETY_GATE_SUMMARY_RECORDS = [
  {
    key: buildStableTextAdapterSafetyGateSummaryKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary-v1",
    serverOnlyHelperStatement: "server-only text adapter helper exists",
    deterministicFixtureStatement:
      "text adapter output is deterministic fixture output only",
    redactedPromptStatement: "redacted prompt envelope is preview-only",
    providerCapabilityStatement: "text adapter is not provider-capable yet",
    currentReadiness: CURRENT_READINESS,
    summaryLines: [
      "server-only text adapter helper exists",
      "text adapter output is deterministic fixture output only",
      "text adapter is not provider-capable yet",
      "no prompt sending",
      "no provider execution",
      "no result persistence",
    ],
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterSafetyGateSummaryRecord[];

const TEXT_ADAPTER_BLOCKED_LIVE_PROVIDER_SUMMARY_RECORDS = [
  {
    key: buildStableTextAdapterBlockedLiveProviderSummaryKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-blocked-live-provider-summary-v1",
    blockedLiveActions: BLOCKED_LIVE_PROVIDER_ACTIONS,
    providerExecutionState: "blocked",
    persistenceState: "not implemented",
    summaryLines: [
      "no provider execution",
      "no model calls",
      "no prompt sending",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
    ],
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterBlockedLiveProviderSummaryRecord[];

const TEXT_ADAPTER_REQUEST_RECORDS = [
  {
    key: buildStableTextAdapterRequestKey(STATIC_FIXTURE_ID),
    version: "backend-owned-minimal-manual-gated-text-model-adapter-request-v1",
    requestState: "deterministic text adapter fixture request only",
    textAdapterMvpId: STATIC_FIXTURE_ID,
    frontendRequestState: "not created",
    apiRouteState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallStatement:
      "No frontend request. No API route. No provider call.",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterRequestRecord[];

const TEXT_ADAPTER_RESPONSE_RECORDS = [
  {
    key: buildStableTextAdapterResponseKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-response-v1",
    responseState: "returned by server-only smoke/helper only",
    textAdapterMvpId: STATIC_FIXTURE_ID,
    adapterState: "completed-text-adapter-fixture-only",
    fixtureResponseState: "deterministic fixture response in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitFixtureResponseOnlyNoProviderOutputNoPersistenceStatement:
      "Fixture response only. No provider output. No persistence.",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterResponseRecord[];

const TEXT_ADAPTER_ERROR_RECORDS = [
  {
    key: buildStableTextAdapterErrorKey(STATIC_FIXTURE_ID),
    version: "backend-owned-minimal-manual-gated-text-model-adapter-error-v1",
    errorState: "deterministic preview only",
    textAdapterMvpId: STATIC_FIXTURE_ID,
    failedGateExamples: [
      "synthetic-end-to-end-packet-review-dependency",
      "manual-approval-fixture",
      "redacted-prompt-envelope",
      "no-provider-sdk-import",
      "no-provider-execution",
      "no-model-call",
      "no-result-persistence",
    ],
    missingSyntheticEndToEndPacketReviewExample:
      "Synthetic end-to-end packet review fixture is required.",
    missingManualApprovalFixtureExample:
      "Manual approval fixture is required.",
    promptTransmissionAttemptedExample:
      "Prompt transmission must remain blocked.",
    providerSdkImportAttemptedExample:
      "Provider SDK import must remain blocked.",
    providerCallAttemptedExample:
      "Provider execution must remain blocked.",
    modelCallAttemptedExample: "Model calls must remain blocked.",
    persistenceAttemptedExample:
      "Persistence target must remain absent.",
    databaseWriteAttemptedExample:
      "Database write target must remain absent.",
    fileWriteAttemptedExample: "File write target must remain absent.",
    queueWorkerJobAttemptedExample:
      "Queue, worker, and job dispatch must remain blocked.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
    ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
  },
] as const satisfies readonly TextAdapterErrorRecord[];

const TEXT_ADAPTER_GATE_RECORDS = GATE_SEEDS.map((gate) => ({
  id: gate.gateId,
  key: buildStableGateKey(gate.gateId, STATIC_FIXTURE_ID),
  version: "backend-owned-minimal-manual-gated-text-model-adapter-gate-v1",
  label: gate.label,
  owner: gate.owner,
  requiredState: gate.requiredState,
  currentState: gate.currentState,
  evidence: gate.evidence,
  blockedLiveAction: gate.blockedLiveAction,
  ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
})) satisfies readonly TextAdapterGateRecord[];

const TEXT_ADAPTER_READINESS_MATRIX_RECORDS = READINESS_SEEDS.map((seed) => ({
  id: seed.readinessId,
  key: buildStableReadinessKey(seed.readinessId, STATIC_FIXTURE_ID),
  version:
    "backend-owned-minimal-manual-gated-text-model-adapter-readiness-matrix-v1",
  label: seed.label,
  state: seed.state,
  evidence: seed.evidence,
  currentReadiness: CURRENT_READINESS,
  nextSafeAction: seed.nextSafeAction,
  ...buildCommonRecordFields(SELECTED_CAPABILITY_FAMILY_LABEL),
})) satisfies readonly TextAdapterReadinessMatrixRecord[];

export function listMinimalTextModelAdapterRoutingRecords():
  readonly MinimalTextModelAdapterRoutingRecord[] {
  return cloneList(ROUTING_RECORDS);
}

export function listMinimalManualGatedTextModelAdapterMvpRecords():
  readonly MinimalTextModelAdapterMvpRecord[] {
  return cloneList(MINIMAL_TEXT_MODEL_ADAPTER_MVP_RECORDS);
}

export function listTextAdapterInputs(): readonly TextAdapterInputRecord[] {
  return cloneList(TEXT_ADAPTER_INPUT_RECORDS);
}

export function listTextAdapterAdmissionChecks():
  readonly TextAdapterAdmissionCheckRecord[] {
  return cloneList(TEXT_ADAPTER_ADMISSION_CHECK_RECORDS);
}

export function listTextAdapterNormalizedRequests():
  readonly TextAdapterNormalizedRequestRecord[] {
  return cloneList(TEXT_ADAPTER_NORMALIZED_REQUEST_RECORDS);
}

export function listTextAdapterRedactedPromptEnvelopes():
  readonly TextAdapterRedactedPromptEnvelopeRecord[] {
  return cloneList(TEXT_ADAPTER_REDACTED_PROMPT_ENVELOPE_RECORDS);
}

export function listTextAdapterFixtureResponses():
  readonly TextAdapterDeterministicFixtureResponseRecord[] {
  return cloneList(TEXT_ADAPTER_DETERMINISTIC_FIXTURE_RESPONSE_RECORDS);
}

export function listTextAdapterResponseEnvelopes():
  readonly TextAdapterResponseEnvelopeRecord[] {
  return cloneList(TEXT_ADAPTER_RESPONSE_ENVELOPE_RECORDS);
}

export function listTextAdapterErrorEnvelopes():
  readonly TextAdapterErrorEnvelopeRecord[] {
  return cloneList(TEXT_ADAPTER_ERROR_ENVELOPE_RECORDS);
}

export function listTextAdapterEvidencePreviews():
  readonly TextAdapterEvidencePreviewRecord[] {
  return cloneList(TEXT_ADAPTER_EVIDENCE_PREVIEW_RECORDS);
}

export function listTextAdapterAuditPreviews():
  readonly TextAdapterAuditPreviewRecord[] {
  return cloneList(TEXT_ADAPTER_AUDIT_PREVIEW_RECORDS);
}

export function listTextAdapterApprovalPreviews():
  readonly TextAdapterApprovalPreviewRecord[] {
  return cloneList(TEXT_ADAPTER_APPROVAL_PREVIEW_RECORDS);
}

export function listTextAdapterSafetyGateSummaries():
  readonly TextAdapterSafetyGateSummaryRecord[] {
  return cloneList(TEXT_ADAPTER_SAFETY_GATE_SUMMARY_RECORDS);
}

export function listTextAdapterBlockedLiveProviderSummaries():
  readonly TextAdapterBlockedLiveProviderSummaryRecord[] {
  return cloneList(TEXT_ADAPTER_BLOCKED_LIVE_PROVIDER_SUMMARY_RECORDS);
}

export function listTextAdapterRequestRecords():
  readonly TextAdapterRequestRecord[] {
  return cloneList(TEXT_ADAPTER_REQUEST_RECORDS);
}

export function listTextAdapterResponseRecords():
  readonly TextAdapterResponseRecord[] {
  return cloneList(TEXT_ADAPTER_RESPONSE_RECORDS);
}

export function listTextAdapterErrorRecords():
  readonly TextAdapterErrorRecord[] {
  return cloneList(TEXT_ADAPTER_ERROR_RECORDS);
}

export function listTextAdapterGates(): readonly TextAdapterGateRecord[] {
  return cloneList(TEXT_ADAPTER_GATE_RECORDS);
}

export function listTextAdapterReadinessMatrixRecords():
  readonly TextAdapterReadinessMatrixRecord[] {
  return cloneList(TEXT_ADAPTER_READINESS_MATRIX_RECORDS);
}

export function buildTextAdapterSummary(): TextAdapterSummary {
  return {
    version: "backend-owned-minimal-manual-gated-text-model-adapter-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    adapterCount: MINIMAL_TEXT_MODEL_ADAPTER_MVP_RECORDS.length,
    routingCount: ROUTING_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(TEXT_ADAPTER_SUMMARY_LINES),
  };
}

export function buildTextAdapterGateSummary(): TextAdapterGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-gate-summary-v1",
    gateCount: TEXT_ADAPTER_GATE_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(TEXT_ADAPTER_GATE_SUMMARY_LINES),
  };
}

export function buildTextAdapterReadinessSummary():
  TextAdapterReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-readiness-summary-v1",
    readinessCount: TEXT_ADAPTER_READINESS_MATRIX_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(TEXT_ADAPTER_READINESS_SUMMARY_LINES),
  };
}

export function buildNextTextAdapterReviewRecoveryChecklist():
  readonly string[] {
  return cloneList(NEXT_TEXT_ADAPTER_REVIEW_RECOVERY_CHECKLIST);
}
