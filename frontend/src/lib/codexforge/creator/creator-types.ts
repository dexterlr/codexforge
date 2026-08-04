export const CREATOR_RECORD_VERSION = 1 as const;
export const CREATOR_CONTRACT_VERSION = "codexforge.creator.bundle.v1" as const;
export const CREATOR_MANIFEST_VERSION = "codexforge.creator.export.v1" as const;

export const CREATOR_KINDS = ["website-browser-app"] as const;
export type CreatorKind = (typeof CREATOR_KINDS)[number];

export const CREATOR_PROJECT_STATES = [
  "draft",
  "awaiting_generation_approval",
  "approved",
  "generating",
  "validating",
  "rejected_output",
  "ready",
  "preview_available",
  "repair_requested",
  "awaiting_repair_approval",
  "repair_approved",
  "repairing",
  "failed",
  "canceled",
  "exported",
] as const;
export type CreatorProjectStatus = (typeof CREATOR_PROJECT_STATES)[number];

export const CREATOR_FAILURE_CODES = [
  "invalid_request",
  "invalid_transition",
  "revision_conflict",
  "idempotency_conflict",
  "mutation_busy",
  "audit_capacity_reached",
  "project_capacity_reached",
  "run_binding_failed",
  "approval_failed",
  "cancellation_failed",
  "execution_blocked",
  "execution_failed",
  "provider_binding_mismatch",
  "output_contract_invalid",
  "output_validation_failed",
  "materialization_blocked",
  "materialization_failed",
  "preview_blocked",
  "preview_not_active",
  "repair_unavailable",
  "repair_limit_reached",
  "export_unavailable",
  "export_digest_mismatch",
  "unsafe_creator_root",
  "unsafe_artifact_path",
  "record_corrupt",
  "not_found",
  "content_type_required",
  "origin_forbidden",
  "body_too_large",
  "kill_switch_blocked",
  "internal_failure",
] as const;
export type CreatorFailureCode = (typeof CREATOR_FAILURE_CODES)[number];

export const CREATOR_AUDIT_EVENT_TYPES = [
  "request.created",
  "plan.prepared",
  "run.bound",
  "approval.requested",
  "approval.recorded",
  "cancellation.requested",
  "recovery.requested",
  "recovery.completed",
  "execution.requested",
  "output.received",
  "output.rejected",
  "validation.completed",
  "revision.materialized",
  "preview.started",
  "preview.stopped",
  "repair.requested",
  "repair.run_bound",
  "repair.result_accepted",
  "repair.result_rejected",
  "export.manifest_created",
  "export.requested",
  "creator.canceled",
  "failure.recorded",
] as const;
export type CreatorAuditEventType =
  (typeof CREATOR_AUDIT_EVENT_TYPES)[number];

export type CreatorActor = "local-operator" | "system";
export type CreatorRunPurpose = "generation" | "repair";
export type CreatorApprovalStatus = "awaiting" | "approved" | "canceled";

export type CreatorRequest = Readonly<{
  requestId: string;
  creatorKind: CreatorKind;
  projectTitle: string;
  description: string;
  requestDigest: string;
  createdAt: string;
}>;

export type CreatorProjectIdentity = Readonly<{
  projectId: string;
  projectSlug: string;
  projectTitle: string;
  creatorKind: CreatorKind;
}>;

export type CreatorFilePolicy = Readonly<{
  maximumFileCount: number;
  maximumIndividualFileBytes: number;
  maximumAggregateBytes: number;
  maximumRelativePathLength: number;
  maximumPathSegmentLength: number;
  maximumDirectoryDepth: number;
  allowedSegmentPattern: string;
  entrypoint: "index.html";
  allowedMediaTypes: Readonly<Record<string, string>>;
  duplicatePolicy: "reject-normalized-and-case-insensitive-collisions";
}>;

export type CreatorModelEnvelope = Readonly<{
  providerKey: "ollama-local";
  modelKey: "ollama-local::gpt-oss:20b";
  runtimeModel: "gpt-oss:20b";
  dataBoundary: "local-machine";
  maximumOutputTokens: 4096;
  fallback: "disabled";
  retry: "disabled";
  substitution: "disabled";
  paidExecution: "disabled";
}>;

export type CreatorCreationPlan = Readonly<{
  planId: string;
  planVersion: 1;
  project: CreatorProjectIdentity;
  requestDigest: string;
  contractVersion: typeof CREATOR_CONTRACT_VERSION;
  entrypoint: "index.html";
  destinationBoundary: string;
  modelEnvelope: CreatorModelEnvelope;
  filePolicy: CreatorFilePolicy;
  orderedSteps: readonly string[];
  capabilityStatement: string;
  limitationStatement: string;
  preparedAt: string;
  planDigest: string;
}>;

export type CreatorApprovalPacket = Readonly<{
  purpose: CreatorRunPurpose;
  privateAlphaRunId: string;
  privateAlphaRunRevision: number;
  approvalScopeHash: string;
  planDigest: string;
  sourceArtifactRevision: number | null;
  targetArtifactRevision: number;
  destinationBoundary: string;
  status: CreatorApprovalStatus;
  modelEnvelope: CreatorModelEnvelope;
  preparedAt: string;
  approvedAt: string | null;
}>;

export type CreatorGenerationRunBinding = Readonly<{
  purpose: CreatorRunPurpose;
  sourceRunId: string;
  ownershipBindingId: string;
  sourceRunRevision: number;
  approvalScopeHash: string;
  providerKey: "ollama-local";
  modelKey: "ollama-local::gpt-oss:20b";
  runtimeModel: "gpt-oss:20b";
  dataBoundary: "local-machine";
  maximumOutputTokens: 4096;
  requestEnvelopeDigest: string;
  sourceArtifactRevision: number | null;
  boundAt: string;
  approvalRecordedAt: string | null;
  executionRequestedAt: string | null;
  executionIdempotencyKeyHash: string | null;
  outputReceivedAt: string | null;
  executionAttempted: boolean;
}>;

export type CreatorArtifactFile = Readonly<{
  path: string;
  mediaType: string;
  content: string;
}>;

export type CreatorArtifactBundle = Readonly<{
  contractVersion: typeof CREATOR_CONTRACT_VERSION;
  projectTitle: string;
  creatorKind: CreatorKind;
  entrypoint: "index.html";
  files: readonly CreatorArtifactFile[];
  explanation?: string;
}>;

export type CreatorArtifactProposalBinding = Readonly<{
  purpose: CreatorRunPurpose;
  sourceRunId: string;
}>;

export const CREATOR_VALIDATION_SEVERITIES = ["error", "warning"] as const;
export type CreatorValidationSeverity =
  (typeof CREATOR_VALIDATION_SEVERITIES)[number];

export type CreatorValidationIssue = Readonly<{
  code: string;
  stage: number;
  severity: CreatorValidationSeverity;
  filePath: string | null;
  message: string;
  suggestedRepairContext: string;
  blocksMaterialization: boolean;
}>;

export type CreatorValidationResult = Readonly<{
  validationVersion: 1;
  valid: boolean;
  completedAt: string;
  stagesCompleted: readonly number[];
  issues: readonly CreatorValidationIssue[];
  issueDigest: string;
  bundleDigest: string | null;
  manifestDigest: string | null;
}>;

export type CreatorMaterializedFile = Readonly<{
  path: string;
  mediaType: string;
  byteLength: number;
  sha256: string;
}>;

export type CreatorMaterializationResult = Readonly<{
  artifactRevision: number;
  destinationLabel: string;
  entrypoint: "index.html";
  files: readonly CreatorMaterializedFile[];
  aggregateBytes: number;
  aggregateDigest: string;
  validationDigest: string;
  materializedAt: string;
}>;

export type CreatorPreviewState = Readonly<{
  status: "inactive" | "active" | "stopped";
  previewId: string | null;
  artifactRevision: number | null;
  startedAt: string | null;
  stoppedAt: string | null;
}>;

export type CreatorRepairRequest = Readonly<{
  attempt: 1;
  requestedAt: string;
  sourceArtifactRevision: number | null;
  validationIssueDigest: string;
  issueCodes: readonly string[];
  repairContextDigest: string;
}>;

export type CreatorExportManifest = Readonly<{
  manifestVersion: typeof CREATOR_MANIFEST_VERSION;
  creatorProjectId: string;
  projectTitle: string;
  creatorKind: CreatorKind;
  artifactRevision: number;
  entrypoint: "index.html";
  files: readonly CreatorMaterializedFile[];
  aggregateBytes: number;
  aggregateDigest: string;
  validationDigest: string;
  sourceRequestDigest: string;
  sourceRunId: string;
  providerKey: "ollama-local";
  modelKey: "ollama-local::gpt-oss:20b";
  runtimeModel: "gpt-oss:20b";
  dataBoundary: "local-machine";
  createdAt: string;
  auditReferenceIds: readonly string[];
  manifestDigest: string;
}>;

export type CreatorAuditEvent = Readonly<{
  eventId: string;
  eventType: CreatorAuditEventType;
  occurredAt: string;
  actor: CreatorActor;
  previousState: CreatorProjectStatus | null;
  resultingState: CreatorProjectStatus;
  stateRevision: number;
  sourceRunId: string | null;
  artifactRevision: number | null;
  idempotencyKeyHash: string | null;
  mutationDigest: string | null;
  summary: string;
}>;

export type CreatorIdempotencyRecord = Readonly<{
  idempotencyKeyHash: string;
  mutationKind: string;
  mutationDigest: string;
  resultingStateRevision: number;
  recordedAt: string;
}>;

export type CreatorProjectState = Readonly<{
  recordVersion: typeof CREATOR_RECORD_VERSION;
  stateRevision: number;
  status: CreatorProjectStatus;
  createdAt: string;
  updatedAt: string;
  identity: CreatorProjectIdentity;
  request: CreatorRequest;
  plan: CreatorCreationPlan | null;
  approvalPacket: CreatorApprovalPacket | null;
  runBindings: readonly CreatorGenerationRunBinding[];
  artifactProposal: CreatorArtifactBundle | null;
  artifactProposalBinding: CreatorArtifactProposalBinding | null;
  validation: CreatorValidationResult | null;
  materializations: readonly CreatorMaterializationResult[];
  preview: CreatorPreviewState;
  repair: CreatorRepairRequest | null;
  exportManifest: CreatorExportManifest | null;
  failureCode: CreatorFailureCode | null;
  failureMessage: string | null;
  auditEvents: readonly CreatorAuditEvent[];
  idempotencyRecords: readonly CreatorIdempotencyRecord[];
}>;

export type CreatorCreateProjectInput = Readonly<{
  creatorKind: CreatorKind;
  projectTitle: string;
  description: string;
}>;

export const CREATOR_MUTATION_KINDS = [
  "approve-generation",
  "execute-generation",
  "cancel",
  "request-repair",
  "approve-repair",
  "execute-repair",
  "recover",
  "start-preview",
  "stop-preview",
  "export",
] as const;
export type CreatorMutationKind = (typeof CREATOR_MUTATION_KINDS)[number];

export type CreatorProjectActionInput = Readonly<{
  action: CreatorMutationKind;
  expectedRevision: number;
}>;

export type CreatorCreateProjectResult = Readonly<{
  created: boolean;
  project: CreatorProjectState;
}>;

export type CreatorProjectActionResult = Readonly<{
  replayed: boolean;
  project: CreatorProjectState;
}>;
