import type {
  CreatorKind,
  CreatorProjectStatus,
} from "@/lib/codexforge/creator/creator-types";

export const JARVIS_CREATOR_HANDOFF_RECORD_VERSION = 1 as const;
export const JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION =
  "codexforge.jarvis-creator-handoff.v1" as const;
export const JARVIS_CREATOR_HANDOFF_OPERATIONS = ["create", "revise"] as const;
export const JARVIS_CREATOR_HANDOFF_STATES = [
  "preparing",
  "prepared",
  "failed",
] as const;
export const JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT =
  "reveal-exact-reviewed-request" as const;
export const JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT =
  "resume-exact-reviewed-request" as const;

export type JarvisCreatorHandoffOperation =
  (typeof JARVIS_CREATOR_HANDOFF_OPERATIONS)[number];
export type JarvisCreatorHandoffState =
  (typeof JARVIS_CREATOR_HANDOFF_STATES)[number];

export type JarvisCreatorHandoffSource = Readonly<{
  conversationId: string;
  conversationRevision: number;
  conversationRecordDigest: string;
  turnId: string;
  messageId: string;
  messageDigest: string;
}>;

export type JarvisCreatorHandoffReviewedRequest = Readonly<{
  creatorKind: Extract<CreatorKind, "website-browser-app">;
  projectTitle: string;
  description: string;
  sourceTextEdited: boolean;
  handoffRequestDigest: string;
}>;

export type JarvisCreatorHandoffRevisionTarget = Readonly<{
  projectId: string;
  sourceProjectStatus: "ready";
  sourceProjectStateRevision: number;
  sourceArtifactRevision: number;
  sourceManifestDigest: string;
  sourceAggregateDigest: string;
  sourceValidationDigest: string;
  sourceRunBindingsDigest: string;
  sourceRunBindingCount: number;
  sourceExplicitRevisionCount: number;
}>;

type JarvisCreatorHandoffRecordBase = Readonly<{
  recordVersion: typeof JARVIS_CREATOR_HANDOFF_RECORD_VERSION;
  protocolVersion: typeof JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION;
  handoffId: string;
  operation: JarvisCreatorHandoffOperation;
  source: JarvisCreatorHandoffSource;
  reviewedRequest: JarvisCreatorHandoffReviewedRequest;
  revisionTarget: JarvisCreatorHandoffRevisionTarget | null;
  acknowledgement: true;
  idempotencyKeyHash: string;
  mutationDigest: string;
  semanticDigest: string;
  creatorIdempotencyKeyHash: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  recordDigest: string;
}>;

type JarvisCreatorHandoffEmptyResult = Readonly<{
  resultingProjectStatus: null;
  resultingProjectStateRevision: null;
  resultingCreatorRequestDigest: null;
  resultingCreatorPlanDigest: null;
  resultingCreatorStateDigest: null;
  resultingCreatorRunBindingCount: null;
  resultingCreatorMutationKind: null;
  resultingCreatorMutationDigest: null;
  resultingCreatorAuditBindingDigest: null;
  resultingCreatorIdempotencyBindingDigest: null;
  resultingRevisionNumber: null;
  resultingRevisionBriefDigest: null;
}>;

export type JarvisCreatorHandoffPreparingRecord =
  JarvisCreatorHandoffRecordBase &
  JarvisCreatorHandoffEmptyResult &
  Readonly<{
    stateRevision: 1;
    status: "preparing";
    failureStatus: null;
    failureCode: null;
    failureMessage: null;
    previousRecordDigest: null;
  }>;

export type JarvisCreatorHandoffPreparedRecord =
  JarvisCreatorHandoffRecordBase &
  Readonly<{
    stateRevision: 2;
    status: "prepared";
    resultingProjectStatus: Extract<
      CreatorProjectStatus,
      "awaiting_plan_approval" | "awaiting_revision_plan_approval"
    >;
    resultingProjectStateRevision: number;
    resultingCreatorRequestDigest: string;
    resultingCreatorPlanDigest: string;
    resultingCreatorStateDigest: string;
    resultingCreatorRunBindingCount: number;
    resultingCreatorMutationKind: "prepare-plan" | "request-revision";
    resultingCreatorMutationDigest: string;
    resultingCreatorAuditBindingDigest: string;
    resultingCreatorIdempotencyBindingDigest: string;
    resultingRevisionNumber: number | null;
    resultingRevisionBriefDigest: string | null;
    failureStatus: null;
    failureCode: null;
    failureMessage: null;
    previousRecordDigest: string;
  }>;

export type JarvisCreatorHandoffFailedRecord =
  JarvisCreatorHandoffRecordBase &
  JarvisCreatorHandoffEmptyResult &
  Readonly<{
    stateRevision: 2;
    status: "failed";
    failureStatus: number;
    failureCode: string;
    failureMessage: string;
    previousRecordDigest: string;
  }>;

export type JarvisCreatorHandoffTerminalRecord =
  | JarvisCreatorHandoffPreparedRecord
  | JarvisCreatorHandoffFailedRecord;

export type JarvisCreatorHandoffRecord =
  | JarvisCreatorHandoffPreparingRecord
  | JarvisCreatorHandoffTerminalRecord;

export type JarvisCreatorHandoffProjectProjection = Readonly<{
  projectId: string;
  projectTitle: string;
  creatorKind: Extract<CreatorKind, "website-browser-app">;
  status: Extract<
    CreatorProjectStatus,
    "awaiting_plan_approval" | "awaiting_revision_plan_approval"
  >;
  stateRevision: number;
  requestDigest: string;
  planDigest: string;
  runBindingCount: number;
  creatorMutationKind: "prepare-plan" | "request-revision";
  creatorMutationDigest: string;
  creatorAuditBindingDigest: string;
  creatorIdempotencyBindingDigest: string;
  sourceArtifactRevision: number | null;
  revisionNumber: number | null;
  revisionBriefDigest: string | null;
}>;

export type JarvisCreatorHandoffSummary = Readonly<{
  handoffId: string;
  operation: JarvisCreatorHandoffOperation;
  status: JarvisCreatorHandoffState;
  conversationId: string;
  conversationRevision: number;
  sourceTurnId: string;
  sourceMessageId: string;
  sourceMessageDigest: string;
  projectId: string;
  projectTitle: string;
  handoffRequestDigest: string;
  revisionTarget: JarvisCreatorHandoffRevisionTarget | null;
  resultingProjectStatus: JarvisCreatorHandoffPreparedRecord["resultingProjectStatus"] | null;
  resultingProjectStateRevision: number | null;
  resultingCreatorRequestDigest: string | null;
  resultingCreatorPlanDigest: string | null;
  resultingCreatorStateDigest: string | null;
  resultingCreatorRunBindingCount: number | null;
  resultingCreatorMutationKind: JarvisCreatorHandoffPreparedRecord["resultingCreatorMutationKind"] | null;
  resultingCreatorMutationDigest: string | null;
  resultingCreatorAuditBindingDigest: string | null;
  resultingCreatorIdempotencyBindingDigest: string | null;
  resultingRevisionNumber: number | null;
  resultingRevisionBriefDigest: string | null;
  failureStatus: number | null;
  failureCode: string | null;
  failureMessage: string | null;
  idempotencyKeyHash: string;
  semanticDigest: string;
  recordDigest: string;
  createdAt: string;
  updatedAt: string;
}>;

type JarvisCreatorHandoffCommonInput = Readonly<{
  conversationId: string;
  expectedConversationRevision: number;
  sourceTurnId: string;
  sourceMessageId: string;
  sourceMessageDigest: string;
  creatorKind: "website-browser-app";
  projectTitle: string;
  description: string;
  acknowledgement: true;
}>;

export type JarvisCreatorHandoffCreateInput =
  JarvisCreatorHandoffCommonInput & Readonly<{ operation: "create" }>;

export type JarvisCreatorHandoffRevisionInput =
  JarvisCreatorHandoffCommonInput &
  Readonly<{
    operation: "revise";
    sourceProjectId: string;
    sourceProjectStatus: "ready";
    sourceProjectStateRevision: number;
    sourceArtifactRevision: number;
    sourceManifestDigest: string;
    sourceAggregateDigest: string;
    sourceValidationDigest: string;
    sourceRunBindingsDigest: string;
    sourceRunBindingCount: number;
    sourceExplicitRevisionCount: number;
  }>;

export type JarvisCreatorHandoffPrepareInput =
  | JarvisCreatorHandoffCreateInput
  | JarvisCreatorHandoffRevisionInput;

export type JarvisCreatorHandoffMutationBody =
  | Omit<JarvisCreatorHandoffCreateInput, "conversationId">
  | Omit<JarvisCreatorHandoffRevisionInput, "conversationId">;

export type JarvisCreatorHandoffPrepareResult = Readonly<{
  replayed: boolean;
  handoff: JarvisCreatorHandoffPreparedRecord;
  project: JarvisCreatorHandoffProjectProjection;
}>;

export type JarvisCreatorHandoffResumeReview = Readonly<{
  handoffId: string;
  operation: JarvisCreatorHandoffOperation;
  status: JarvisCreatorHandoffState;
  recordDigest: string;
  projectId: string;
  reviewedRequest: JarvisCreatorHandoffReviewedRequest;
  revisionTarget: Readonly<{
    projectId: string;
    sourceArtifactRevision: number;
  }> | null;
  resumable: boolean;
  createdAt: string;
  updatedAt: string;
}>;

export type JarvisCreatorHandoffReviewAction = Readonly<{
  action: "review";
  expectedHandoffRecordDigest: string;
  acknowledgement: typeof JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT;
}>;

export type JarvisCreatorHandoffResumeAction = Readonly<{
  action: "resume";
  expectedHandoffRecordDigest: string;
  reviewedRequestDigest: string;
  acknowledgement: typeof JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT;
}>;

export type JarvisCreatorHandoffRecoveryAction =
  | JarvisCreatorHandoffReviewAction
  | JarvisCreatorHandoffResumeAction;
