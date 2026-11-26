import "server-only";

import { hashCreatorCanonicalJson, hashCreatorSha256 } from "@/lib/codexforge/creator/creator-crypto";
import { CREATOR_MAX_EXPLICIT_REVISIONS } from "@/lib/codexforge/creator/creator-policy";
import {
  CreatorServiceError,
  type CreatorService,
} from "@/lib/codexforge/creator/creator-service.server";
import type {
  CreatorAuditEvent,
  CreatorIdempotencyRecord,
  CreatorProjectState,
} from "@/lib/codexforge/creator/creator-types";
import { hashJarvisChatSha256 } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { JarvisChatService } from "@/lib/codexforge/jarvis-chat/jarvis-chat-service.server";
import type { JarvisChatConversation } from "@/lib/codexforge/jarvis-chat/jarvis-chat-types";
import { JarvisChatPolicyError } from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";
import {
  buildJarvisCreatorHandoffCreatorKey,
  buildJarvisCreatorHandoffId,
  buildJarvisCreatorHandoffMutationDigest,
  buildJarvisCreatorHandoffSemanticDigest,
  hashJarvisCreatorHandoffCanonicalJson,
  hashJarvisCreatorHandoffExternalKey,
} from "./jarvis-creator-handoff-crypto";
import {
  sealJarvisCreatorHandoffRecord,
  type JarvisCreatorHandoffPersistence,
} from "./jarvis-creator-handoff-persistence.server";
import {
  JarvisCreatorHandoffError,
  handoffMutationBody,
  jarvisCreatorHandoffSemanticMaterial,
  validateJarvisCreatorHandoffConversationId,
  validateJarvisCreatorHandoffId,
  validateJarvisCreatorHandoffIdempotencyKey,
  validateJarvisCreatorHandoffInput,
  validateJarvisCreatorHandoffRecoveryAction,
} from "./jarvis-creator-handoff-policy";
import type {
  JarvisCreatorHandoffFailedRecord,
  JarvisCreatorHandoffPrepareInput,
  JarvisCreatorHandoffPrepareResult,
  JarvisCreatorHandoffPreparedRecord,
  JarvisCreatorHandoffPreparingRecord,
  JarvisCreatorHandoffProjectProjection,
  JarvisCreatorHandoffRecord,
  JarvisCreatorHandoffResumeReview,
  JarvisCreatorHandoffSummary,
} from "./jarvis-creator-handoff-types";

type ServiceOptions = Readonly<{
  chat: JarvisChatService;
  creator: CreatorService;
  persistence: JarvisCreatorHandoffPersistence;
  now?: () => string;
}>;

export type JarvisCreatorHandoffService = Readonly<{
  prepare: (
    conversationId: unknown,
    body: unknown,
    idempotencyKey: unknown
  ) => Promise<JarvisCreatorHandoffPrepareResult>;
  getSummary: (
    conversationId: unknown,
    handoffId: unknown
  ) => Promise<JarvisCreatorHandoffSummary>;
  review: (
    conversationId: unknown,
    handoffId: unknown,
    body: unknown
  ) => Promise<JarvisCreatorHandoffResumeReview>;
  resume: (
    conversationId: unknown,
    handoffId: unknown,
    body: unknown,
    idempotencyKey: unknown
  ) => Promise<JarvisCreatorHandoffPrepareResult>;
  listConversation: (
    conversationId: string,
    limit?: number
  ) => ReturnType<JarvisCreatorHandoffPersistence["listConversation"]>;
}>;

function safeNow(now: () => string, ...floors: readonly string[]): string {
  const candidate = now();
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(candidate) ||
    Number.isNaN(Date.parse(candidate))
  ) {
    throw new JarvisCreatorHandoffError(
      503,
      "handoff_time_invalid",
      "Creator handoff clock evidence is invalid."
    );
  }
  return floors.reduce((latest, floor) => floor > latest ? floor : latest, candidate);
}

function findExactUserMessage(
  conversation: JarvisChatConversation,
  input: JarvisCreatorHandoffPrepareInput,
  revisionBoundary: "exact" | "at-least" = "exact"
) {
  if (
    (revisionBoundary === "exact" &&
      conversation.revision !== input.expectedConversationRevision) ||
    (revisionBoundary === "at-least" &&
      conversation.revision < input.expectedConversationRevision)
  ) {
    throw new JarvisCreatorHandoffError(
      409,
      "revision_conflict",
      "The source conversation changed before creator handoff preparation."
    );
  }
  const turn = conversation.turns.find((candidate) => candidate.turnId === input.sourceTurnId);
  if (
    !turn ||
    turn.userMessage.messageId !== input.sourceMessageId ||
    turn.userMessage.textDigest !== input.sourceMessageDigest ||
    turn.userMessage.role !== "user" ||
    hashJarvisChatSha256(turn.userMessage.text) !== turn.userMessage.textDigest
  ) {
    throw new JarvisCreatorHandoffError(
      409,
      "source_conflict",
      "The exact selected user message is unavailable or changed."
    );
  }
  return turn.userMessage;
}

function projectStateDigest(project: CreatorProjectState): string {
  return hashCreatorCanonicalJson(project);
}

function latestMaterialization(project: CreatorProjectState, revision: number) {
  return project.materializations.find((item) => item.artifactRevision === revision) ?? null;
}

function matchesExactRevisionSource(
  project: CreatorProjectState,
  input: Extract<JarvisCreatorHandoffPrepareInput, { operation: "revise" }>
): boolean {
  const materialization = latestMaterialization(project, input.sourceArtifactRevision);
  return (
    project.identity.projectId === input.sourceProjectId &&
    project.identity.projectTitle === input.projectTitle &&
    project.identity.creatorKind === input.creatorKind &&
    project.status === input.sourceProjectStatus &&
    project.stateRevision === input.sourceProjectStateRevision &&
    !!materialization &&
    project.validation?.valid === true &&
    !!project.exportManifest &&
    project.exportManifest.artifactRevision === input.sourceArtifactRevision &&
    project.exportManifest.manifestDigest === input.sourceManifestDigest &&
    project.exportManifest.aggregateDigest === input.sourceAggregateDigest &&
    project.exportManifest.validationDigest === input.sourceValidationDigest &&
    materialization.aggregateDigest === input.sourceAggregateDigest &&
    materialization.validationDigest === input.sourceValidationDigest &&
    hashCreatorCanonicalJson(project.runBindings) === input.sourceRunBindingsDigest &&
    project.runBindings.length === input.sourceRunBindingCount &&
    project.revisionRequests.length === input.sourceExplicitRevisionCount &&
    project.revisionRequests.length < CREATOR_MAX_EXPLICIT_REVISIONS
  );
}

function isExactPartialCreate(
  project: CreatorProjectState,
  input: Extract<JarvisCreatorHandoffPrepareInput, { operation: "create" }>,
  creatorKey: string,
  preparing: JarvisCreatorHandoffPreparingRecord
): boolean {
  const requestDigest = hashCreatorCanonicalJson({
    creatorKind: input.creatorKind,
    projectTitle: input.projectTitle,
    description: input.description,
  });
  const event = project.auditEvents[0] ?? null;
  return (
    project.identity.projectId === preparing.projectId &&
    project.identity.projectTitle === input.projectTitle &&
    project.identity.creatorKind === input.creatorKind &&
    project.status === "draft" && project.stateRevision === 1 &&
    project.request.creatorKind === input.creatorKind &&
    project.request.projectTitle === input.projectTitle &&
    project.request.description === input.description &&
    project.request.requestDigest === requestDigest &&
    project.plan === null && project.approvalPacket === null &&
    project.runBindings.length === 0 && project.revisionRequests.length === 0 &&
    project.idempotencyRecords.length === 0 && project.auditEvents.length === 1 &&
    event?.eventType === "request.created" && event.stateRevision === 1 &&
    event.idempotencyKeyHash === hashCreatorSha256(creatorKey) &&
    event.mutationDigest === requestDigest
  );
}

const DEFINITIVE_CREATOR_REJECTION_CODES = new Set([
  "audit_capacity_reached",
  "idempotency_conflict",
  "invalid_request",
  "invalid_transition",
  "materialization_blocked",
  "not_found",
  "project_capacity_reached",
  "repair_limit_reached",
]);

function definitiveFailure(error: unknown): Readonly<{
  status: number;
  code: string;
  message: string;
}> | null {
  if (error instanceof JarvisCreatorHandoffError && error.status >= 400 && error.status < 500) {
    return error;
  }
  if (
    error instanceof CreatorServiceError &&
    error.status >= 400 && error.status < 500 &&
    DEFINITIVE_CREATOR_REJECTION_CODES.has(error.code)
  ) {
    return error;
  }
  return null;
}

function creatorMutationProof(
  input: JarvisCreatorHandoffPrepareInput,
  project: CreatorProjectState,
  creatorKey: string,
  preparing: JarvisCreatorHandoffPreparingRecord
): Readonly<{
  mutationKind: "prepare-plan" | "request-revision";
  mutationDigest: string;
  auditBindingDigest: string;
  idempotencyBindingDigest: string;
}> {
  const keyHash = hashCreatorSha256(creatorKey);
  const mutationKind = input.operation === "create" ? "prepare-plan" : "request-revision";
  const mutationDigest = input.operation === "create"
    ? hashCreatorCanonicalJson({
        creatorKind: input.creatorKind,
        projectTitle: input.projectTitle,
        description: input.description,
      })
    : hashCreatorCanonicalJson({
        projectId: input.sourceProjectId,
        action: "request-revision",
        expectedRevision: preparing.revisionTarget?.sourceProjectStateRevision,
        sourceArtifactRevision: input.sourceArtifactRevision,
        revisionBrief: input.description,
      });
  const auditBindings = project.auditEvents.filter(
    (event) =>
      event.idempotencyKeyHash === keyHash && event.mutationDigest === mutationDigest
  );
  const idempotencyBindings = project.idempotencyRecords.filter(
    (record) =>
      record.idempotencyKeyHash === keyHash &&
      record.mutationKind === mutationKind &&
      record.mutationDigest === mutationDigest
  );
  const expectedAuditTypes = input.operation === "create"
    ? ["request.created", "plan.prepared"]
    : ["revision.requested"];
  if (
    auditBindings.length !== expectedAuditTypes.length ||
    auditBindings.some((event, index) => event.eventType !== expectedAuditTypes[index]) ||
    idempotencyBindings.length !== 1 ||
    idempotencyBindings[0]?.resultingStateRevision !== project.stateRevision ||
    auditBindings.at(-1)?.stateRevision !== project.stateRevision
  ) {
    throw new JarvisCreatorHandoffError(
      503,
      "creator_result_invalid",
      "Creator plan result lacks the exact request, audit, and idempotency binding."
    );
  }
  return {
    mutationKind,
    mutationDigest,
    auditBindingDigest: hashCreatorCanonicalJson(auditBindings as readonly CreatorAuditEvent[]),
    idempotencyBindingDigest: hashCreatorCanonicalJson(
      idempotencyBindings as readonly CreatorIdempotencyRecord[]
    ),
  };
}

function buildProjection(
  input: JarvisCreatorHandoffPrepareInput,
  project: CreatorProjectState,
  creatorKey: string,
  preparing: JarvisCreatorHandoffPreparingRecord
): JarvisCreatorHandoffProjectProjection {
  if (
    (project.status !== "awaiting_plan_approval" &&
      project.status !== "awaiting_revision_plan_approval") ||
    !project.plan
  ) {
    throw new JarvisCreatorHandoffError(
      503,
      "creator_result_invalid",
      "Creator did not return the exact plan-only result."
    );
  }
  const revision = project.revisionRequests.at(-1) ?? null;
  const proof = creatorMutationProof(input, project, creatorKey, preparing);
  return {
    projectId: project.identity.projectId,
    projectTitle: project.identity.projectTitle,
    creatorKind: project.identity.creatorKind,
    status: project.status,
    stateRevision: project.stateRevision,
    requestDigest: project.request.requestDigest,
    planDigest: revision?.planDigest ?? project.plan.planDigest,
    runBindingCount: project.runBindings.length,
    creatorMutationKind: proof.mutationKind,
    creatorMutationDigest: proof.mutationDigest,
    creatorAuditBindingDigest: proof.auditBindingDigest,
    creatorIdempotencyBindingDigest: proof.idempotencyBindingDigest,
    sourceArtifactRevision: revision?.sourceArtifactRevision ?? null,
    revisionNumber: revision?.revisionNumber ?? null,
    revisionBriefDigest: revision?.revisionBriefDigest ?? null,
  };
}

function assertPreparedProject(
  input: JarvisCreatorHandoffPrepareInput,
  project: CreatorProjectState,
  creatorKey: string,
  preparing: JarvisCreatorHandoffPreparingRecord
): JarvisCreatorHandoffProjectProjection {
  const projection = buildProjection(input, project, creatorKey, preparing);
  const expectedRequestDigest = hashCreatorCanonicalJson({
    creatorKind: input.creatorKind,
    projectTitle: input.projectTitle,
    description: input.description,
  });
  if (
    project.identity.projectId !== preparing.projectId ||
    project.identity.projectTitle !== input.projectTitle ||
    project.identity.creatorKind !== input.creatorKind ||
    (input.operation === "create" && (
      projection.status !== "awaiting_plan_approval" ||
      projection.requestDigest !== expectedRequestDigest ||
      project.request.projectTitle !== input.projectTitle ||
      project.request.description !== input.description ||
      projection.runBindingCount !== 0 || projection.sourceArtifactRevision !== null ||
      projection.revisionNumber !== null || projection.revisionBriefDigest !== null
    )) ||
    (input.operation === "revise" && (
      projection.status !== "awaiting_revision_plan_approval" ||
      projection.projectId !== input.sourceProjectId ||
      projection.sourceArtifactRevision !== input.sourceArtifactRevision ||
      projection.runBindingCount !== preparing.revisionTarget?.sourceRunBindingCount ||
      hashCreatorCanonicalJson(project.runBindings) !== preparing.revisionTarget?.sourceRunBindingsDigest ||
      projection.stateRevision !== (preparing.revisionTarget?.sourceProjectStateRevision ?? 0) + 1 ||
      projection.revisionNumber === null || projection.revisionBriefDigest !== hashCreatorSha256(input.description) ||
      project.revisionRequests.at(-1)?.sourceManifestDigest !== preparing.revisionTarget?.sourceManifestDigest ||
      project.revisionRequests.at(-1)?.sourceAggregateDigest !== preparing.revisionTarget?.sourceAggregateDigest ||
      project.revisionRequests.at(-1)?.sourceValidationDigest !== preparing.revisionTarget?.sourceValidationDigest
    ))
  ) {
    throw new JarvisCreatorHandoffError(
      503,
      "creator_result_invalid",
      "Creator plan outcome does not match the exact handoff operation."
    );
  }
  return projection;
}

function projectionFromRecord(
  record: JarvisCreatorHandoffPreparedRecord
): JarvisCreatorHandoffProjectProjection {
  return {
    projectId: record.projectId,
    projectTitle: record.reviewedRequest.projectTitle,
    creatorKind: record.reviewedRequest.creatorKind,
    status: record.resultingProjectStatus,
    stateRevision: record.resultingProjectStateRevision,
    requestDigest: record.resultingCreatorRequestDigest,
    planDigest: record.resultingCreatorPlanDigest,
    runBindingCount: record.resultingCreatorRunBindingCount,
    creatorMutationKind: record.resultingCreatorMutationKind,
    creatorMutationDigest: record.resultingCreatorMutationDigest,
    creatorAuditBindingDigest: record.resultingCreatorAuditBindingDigest,
    creatorIdempotencyBindingDigest: record.resultingCreatorIdempotencyBindingDigest,
    sourceArtifactRevision: record.revisionTarget?.sourceArtifactRevision ?? null,
    revisionNumber: record.resultingRevisionNumber,
    revisionBriefDigest: record.resultingRevisionBriefDigest,
  };
}

function inputFromRecord(
  record: JarvisCreatorHandoffRecord
): JarvisCreatorHandoffPrepareInput {
  const common = {
    conversationId: record.source.conversationId,
    expectedConversationRevision: record.source.conversationRevision,
    sourceTurnId: record.source.turnId,
    sourceMessageId: record.source.messageId,
    sourceMessageDigest: record.source.messageDigest,
    creatorKind: record.reviewedRequest.creatorKind,
    projectTitle: record.reviewedRequest.projectTitle,
    description: record.reviewedRequest.description,
    acknowledgement: true as const,
  };
  if (record.operation === "create") return { ...common, operation: "create" };
  const target = record.revisionTarget;
  if (!target) {
    throw new JarvisCreatorHandoffError(503, "handoff_corrupt", "Revision recovery target is missing.");
  }
  return {
    ...common,
    operation: "revise",
    sourceProjectId: target.projectId,
    sourceProjectStatus: target.sourceProjectStatus,
    sourceProjectStateRevision: target.sourceProjectStateRevision,
    sourceArtifactRevision: target.sourceArtifactRevision,
    sourceManifestDigest: target.sourceManifestDigest,
    sourceAggregateDigest: target.sourceAggregateDigest,
    sourceValidationDigest: target.sourceValidationDigest,
    sourceRunBindingsDigest: target.sourceRunBindingsDigest,
    sourceRunBindingCount: target.sourceRunBindingCount,
    sourceExplicitRevisionCount: target.sourceExplicitRevisionCount,
  };
}

function throwFailed(record: JarvisCreatorHandoffFailedRecord): never {
  throw new JarvisCreatorHandoffError(
    record.failureStatus,
    record.failureCode,
    record.failureMessage
  );
}

export function createJarvisCreatorHandoffService(
  options: ServiceOptions
): JarvisCreatorHandoffService {
  const persistence = options.persistence;
  const now = options.now ?? (() => new Date().toISOString());

  function identity(input: JarvisCreatorHandoffPrepareInput, externalKey: string) {
    const idempotencyKeyHash = hashJarvisCreatorHandoffExternalKey(externalKey);
    const semanticDigest = buildJarvisCreatorHandoffSemanticDigest(
      jarvisCreatorHandoffSemanticMaterial(input)
    );
    const mutationDigest = buildJarvisCreatorHandoffMutationDigest({
      conversationId: input.conversationId,
      body: handoffMutationBody(input),
      idempotencyKeyHash,
    });
    const handoffId = buildJarvisCreatorHandoffId(semanticDigest);
    const creatorKey = buildJarvisCreatorHandoffCreatorKey(semanticDigest);
    return {
      idempotencyKeyHash,
      semanticDigest,
      mutationDigest,
      handoffId,
      creatorKey,
      creatorIdempotencyKeyHash: hashCreatorSha256(creatorKey),
    };
  }

  async function invokeCreator(
    input: JarvisCreatorHandoffPrepareInput,
    creatorKey: string,
    preparing: JarvisCreatorHandoffPreparingRecord
  ): Promise<CreatorProjectState> {
    if (input.operation === "create") {
      return (await options.creator.prepareProjectPlan(
        {
          creatorKind: input.creatorKind,
          projectTitle: input.projectTitle,
          description: input.description,
        },
        creatorKey
      )).project;
    }
    return (await options.creator.actOnProject(
      input.sourceProjectId,
      {
        action: "request-revision",
        expectedRevision: preparing.revisionTarget?.sourceProjectStateRevision,
        sourceArtifactRevision: input.sourceArtifactRevision,
        revisionBrief: input.description,
      },
      creatorKey
    )).project;
  }

  async function assertPersistedSourceAvailable(
    input: JarvisCreatorHandoffPrepareInput,
    preparing: JarvisCreatorHandoffPreparingRecord
  ): Promise<void> {
    let conversation: JarvisChatConversation;
    try {
      conversation = await options.chat.getConversation(input.conversationId);
    } catch (error) {
      if (
        error instanceof JarvisChatPolicyError &&
        error.status === 404 &&
        error.code === "conversation_not_found"
      ) {
        throw new JarvisCreatorHandoffError(
          409,
          "source_conflict",
          "The exact selected Jarvis message was deleted before Creator project mutation."
        );
      }
      throw new JarvisCreatorHandoffError(
        503,
        "source_verification_unavailable",
        "The exact selected Jarvis message could not be verified before Creator project mutation."
      );
    }
    findExactUserMessage(conversation, input, "at-least");
    if (
      conversation.revision === preparing.source.conversationRevision &&
      conversation.recordDigest !== preparing.source.conversationRecordDigest
    ) {
      throw new JarvisCreatorHandoffError(
        409,
        "source_conflict",
        "The exact selected Jarvis conversation evidence changed before Creator project mutation."
      );
    }
  }

  async function reconcileOrAuthorizeCreator(
    input: JarvisCreatorHandoffPrepareInput,
    creatorKey: string,
    preparing: JarvisCreatorHandoffPreparingRecord
  ): Promise<CreatorProjectState | null> {
    let current: CreatorProjectState | null;
    try {
      current = await options.creator.getProject(preparing.projectId);
    } catch (error) {
      if (error instanceof CreatorServiceError && error.status === 404) {
        current = null;
      } else {
        throw new JarvisCreatorHandoffError(
          503,
          "creator_result_ambiguous",
          "Creator state could not be inspected before exact handoff reconciliation."
        );
      }
    }
    if (current) {
      try {
        assertPreparedProject(input, current, creatorKey, preparing);
        return current;
      } catch (error) {
        if (!(error instanceof JarvisCreatorHandoffError) || error.code !== "creator_result_invalid") {
          throw error;
        }
      }
      const keyHash = hashCreatorSha256(creatorKey);
      const mutationKind = input.operation === "create" ? "prepare-plan" : "request-revision";
      const mutationDigest = input.operation === "create"
        ? hashCreatorCanonicalJson({
            creatorKind: input.creatorKind,
            projectTitle: input.projectTitle,
            description: input.description,
          })
        : hashCreatorCanonicalJson({
            projectId: input.sourceProjectId,
            action: "request-revision",
            expectedRevision: preparing.revisionTarget?.sourceProjectStateRevision,
            sourceArtifactRevision: input.sourceArtifactRevision,
            revisionBrief: input.description,
          });
      const historicalBindings = current.idempotencyRecords.filter(
        (record) =>
          record.idempotencyKeyHash === keyHash &&
          record.mutationKind === mutationKind &&
          record.mutationDigest === mutationDigest
      );
      if (historicalBindings.length === 1) {
        let historical: CreatorProjectState;
        try {
          historical = await options.creator.getProjectRevision(
            current.identity.projectId,
            historicalBindings[0]!.resultingStateRevision
          );
        } catch {
          throw new JarvisCreatorHandoffError(
            503,
            "creator_result_ambiguous",
            "Creator plan history could not be inspected for exact handoff reconciliation."
          );
        }
        assertPreparedProject(input, historical, creatorKey, preparing);
        return historical;
      }
    }
    if (input.operation === "create") {
      if (current) {
        if (isExactPartialCreate(current, input, creatorKey, preparing)) return null;
        throw new JarvisCreatorHandoffError(
          503,
          "creator_result_ambiguous",
          "Creator project state no longer matches the exact recoverable create intent."
        );
      }
      await assertPersistedSourceAvailable(input, preparing);
      return null;
    }
    if (!current) {
      throw new JarvisCreatorHandoffError(
        409,
        "revision_source_conflict",
        "The exact Creator revision source was deleted before revision-plan mutation."
      );
    }
    if (!matchesExactRevisionSource(current, input)) {
      throw new JarvisCreatorHandoffError(
        409,
        "revision_source_conflict",
        "The exact Creator revision source changed before revision-plan mutation."
      );
    }
    await assertPersistedSourceAvailable(input, preparing);
    return null;
  }

  async function finalizePreparingUnderFence(
    input: JarvisCreatorHandoffPrepareInput,
    creatorKey: string,
    initial: JarvisCreatorHandoffPreparingRecord,
    replayedBeforeCreator: boolean
  ): Promise<JarvisCreatorHandoffPrepareResult> {
    let project: CreatorProjectState;
    try {
      project = await reconcileOrAuthorizeCreator(input, creatorKey, initial) ??
        await invokeCreator(input, creatorKey, initial);
    } catch (error) {
      const definitive = definitiveFailure(error);
      if (definitive) {
        const safeFailureCode = /^[a-z][a-z0-9_]{0,63}$/u.test(definitive.code)
          ? definitive.code
          : "creator_request_rejected";
        const normalizedFailure = definitive.message
          .replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, " ")
          .trim()
          .slice(0, 240);
        const finishedAt = safeNow(now, initial.updatedAt);
        const { recordDigest: _initialDigest, ...initialBody } = initial;
        const failed = sealJarvisCreatorHandoffRecord({
          ...initialBody,
          stateRevision: 2,
          status: "failed",
          failureStatus: definitive.status,
          failureCode: safeFailureCode,
          failureMessage: normalizedFailure || "Creator rejected the exact plan-only request before mutation.",
          updatedAt: finishedAt,
          previousRecordDigest: initial.recordDigest,
        }) as JarvisCreatorHandoffFailedRecord;
        const terminal = await persistence.writeFinal(initial, failed);
        if (terminal.record.status === "prepared") {
          return {
            replayed: true,
            handoff: terminal.record,
            project: projectionFromRecord(terminal.record),
          };
        }
        throwFailed(terminal.record);
      }
      throw new JarvisCreatorHandoffError(
        503,
        "creator_result_ambiguous",
        "Creator plan preparation could not be confirmed. Review and explicitly resume this exact handoff to reconcile it safely."
      );
    }
    const projection = assertPreparedProject(input, project, creatorKey, initial);
    const finishedAt = safeNow(now, initial.updatedAt, project.updatedAt);
    const { recordDigest: _initialDigest, ...initialBody } = initial;
    const prepared = sealJarvisCreatorHandoffRecord({
      ...initialBody,
      stateRevision: 2,
      status: "prepared",
      resultingProjectStatus: projection.status,
      resultingProjectStateRevision: projection.stateRevision,
      resultingCreatorRequestDigest: projection.requestDigest,
      resultingCreatorPlanDigest: projection.planDigest,
      resultingCreatorStateDigest: projectStateDigest(project),
      resultingCreatorRunBindingCount: projection.runBindingCount,
      resultingCreatorMutationKind: projection.creatorMutationKind,
      resultingCreatorMutationDigest: projection.creatorMutationDigest,
      resultingCreatorAuditBindingDigest: projection.creatorAuditBindingDigest,
      resultingCreatorIdempotencyBindingDigest: projection.creatorIdempotencyBindingDigest,
      resultingRevisionNumber: projection.revisionNumber,
      resultingRevisionBriefDigest: projection.revisionBriefDigest,
      failureStatus: null,
      failureCode: null,
      failureMessage: null,
      updatedAt: finishedAt,
      previousRecordDigest: initial.recordDigest,
    }) as JarvisCreatorHandoffPreparedRecord;
    const terminal = await persistence.writeFinal(initial, prepared);
    if (terminal.record.status === "failed") throwFailed(terminal.record);
    return {
      replayed: replayedBeforeCreator || !terminal.created,
      handoff: terminal.record,
      project: projectionFromRecord(terminal.record),
    };
  }

  async function finalizePreparing(
    input: JarvisCreatorHandoffPrepareInput,
    creatorKey: string,
    initial: JarvisCreatorHandoffPreparingRecord,
    replayedBeforeCreator: boolean
  ): Promise<JarvisCreatorHandoffPrepareResult> {
    return persistence.withFinalizationLock(initial.handoffId, async () => {
      const authoritative = await persistence.readHandoff(initial.handoffId);
      if (!authoritative) {
        throw new JarvisCreatorHandoffError(
          503,
          "handoff_corrupt",
          "Creator handoff finalization evidence disappeared."
        );
      }
      if (authoritative.status === "prepared") {
        return {
          replayed: true,
          handoff: authoritative,
          project: projectionFromRecord(authoritative),
        };
      }
      if (authoritative.status === "failed") throwFailed(authoritative);
      if (authoritative.recordDigest !== initial.recordDigest) {
        throw new JarvisCreatorHandoffError(
          503,
          "handoff_corrupt",
          "Creator handoff initial evidence changed before finalization."
        );
      }
      return finalizePreparingUnderFence(
        input,
        creatorKey,
        authoritative,
        replayedBeforeCreator
      );
    });
  }

  async function claimAndContinue(
    input: JarvisCreatorHandoffPrepareInput,
    externalKey: string,
    existing: JarvisCreatorHandoffPreparingRecord | JarvisCreatorHandoffPreparedRecord | JarvisCreatorHandoffFailedRecord,
    replayedBeforeCreator: boolean
  ): Promise<JarvisCreatorHandoffPrepareResult> {
    const derived = identity(input, externalKey);
    if (
      existing.handoffId !== derived.handoffId ||
      existing.semanticDigest !== derived.semanticDigest ||
      existing.source.conversationRevision !== input.expectedConversationRevision
    ) {
      throw new JarvisCreatorHandoffError(
        409,
        "handoff_conflict",
        "Creator handoff identity belongs to different evidence."
      );
    }
    const claimed = await persistence.claimIdempotency({
      idempotencyKeyHash: derived.idempotencyKeyHash,
      mutationDigest: derived.mutationDigest,
      semanticDigest: derived.semanticDigest,
      handoffId: derived.handoffId,
      initialRecordDigest: existing.status === "preparing" ? existing.recordDigest : existing.previousRecordDigest,
      createdAt: existing.createdAt,
    });
    const current = claimed.record;
    if (current.status === "prepared") {
      return { replayed: true, handoff: current, project: projectionFromRecord(current) };
    }
    if (current.status === "failed") throwFailed(current);
    return finalizePreparing(
      input,
      derived.creatorKey,
      current,
      replayedBeforeCreator || !claimed.created
    );
  }

  async function prepareValidated(
    input: JarvisCreatorHandoffPrepareInput,
    externalKey: string
  ): Promise<JarvisCreatorHandoffPrepareResult> {
    const derived = identity(input, externalKey);
    const keyed = await persistence.readByIdempotencyKeyHash(derived.idempotencyKeyHash);
    if (keyed && (
      keyed.claim.mutationDigest !== derived.mutationDigest ||
      keyed.claim.semanticDigest !== derived.semanticDigest ||
      keyed.claim.handoffId !== derived.handoffId
    )) {
      throw new JarvisCreatorHandoffError(
        409,
        "idempotency_conflict",
        "Idempotency-Key belongs to a different Jarvis creator handoff."
      );
    }
    const existing = keyed?.record ?? await persistence.readHandoff(derived.handoffId);
    if (existing) {
      return claimAndContinue(input, externalKey, existing, keyed !== null);
    }

    const claimedAt = safeNow(now);
    const conversation = await options.chat.getConversation(input.conversationId);
    const sourceMessage = findExactUserMessage(conversation, input);
    let revisionTarget = null;
    let expectedProjectId = hashCreatorSha256(`creator-project:${derived.creatorKey}`).slice(0, 24);
    if (input.operation === "revise") {
      const sourceProject = await options.creator.getProject(input.sourceProjectId);
      if (!matchesExactRevisionSource(sourceProject, input)) {
        throw new JarvisCreatorHandoffError(
          409,
          "revision_source_conflict",
          "The exact titled, validated creator revision changed before handoff preparation."
        );
      }
      expectedProjectId = sourceProject.identity.projectId;
      revisionTarget = {
        projectId: input.sourceProjectId,
        sourceProjectStatus: input.sourceProjectStatus,
        sourceProjectStateRevision: input.sourceProjectStateRevision,
        sourceArtifactRevision: input.sourceArtifactRevision,
        sourceManifestDigest: input.sourceManifestDigest,
        sourceAggregateDigest: input.sourceAggregateDigest,
        sourceValidationDigest: input.sourceValidationDigest,
        sourceRunBindingsDigest: input.sourceRunBindingsDigest,
        sourceRunBindingCount: input.sourceRunBindingCount,
        sourceExplicitRevisionCount: input.sourceExplicitRevisionCount,
      };
    }
    const handoffRequestDigest = hashJarvisCreatorHandoffCanonicalJson({
      creatorKind: input.creatorKind,
      projectTitle: input.projectTitle,
      description: input.description,
    });
    const preparing = sealJarvisCreatorHandoffRecord({
      recordVersion: 1,
      protocolVersion: "codexforge.jarvis-creator-handoff.v1",
      stateRevision: 1,
      handoffId: derived.handoffId,
      operation: input.operation,
      status: "preparing",
      source: {
        conversationId: input.conversationId,
        conversationRevision: conversation.revision,
        conversationRecordDigest: conversation.recordDigest,
        turnId: input.sourceTurnId,
        messageId: input.sourceMessageId,
        messageDigest: input.sourceMessageDigest,
      },
      reviewedRequest: {
        creatorKind: input.creatorKind,
        projectTitle: input.projectTitle,
        description: input.description,
        sourceTextEdited: input.description !== sourceMessage.text,
        handoffRequestDigest,
      },
      revisionTarget,
      acknowledgement: true,
      idempotencyKeyHash: derived.idempotencyKeyHash,
      mutationDigest: derived.mutationDigest,
      semanticDigest: derived.semanticDigest,
      creatorIdempotencyKeyHash: derived.creatorIdempotencyKeyHash,
      projectId: expectedProjectId,
      resultingProjectStatus: null,
      resultingProjectStateRevision: null,
      resultingCreatorRequestDigest: null,
      resultingCreatorPlanDigest: null,
      resultingCreatorStateDigest: null,
      resultingCreatorRunBindingCount: null,
      resultingCreatorMutationKind: null,
      resultingCreatorMutationDigest: null,
      resultingCreatorAuditBindingDigest: null,
      resultingCreatorIdempotencyBindingDigest: null,
      resultingRevisionNumber: null,
      resultingRevisionBriefDigest: null,
      failureStatus: null,
      failureCode: null,
      failureMessage: null,
      createdAt: claimedAt,
      updatedAt: claimedAt,
      previousRecordDigest: null,
    }) as JarvisCreatorHandoffPreparingRecord;
    const admitted = await persistence.admitInitial(preparing, {
      idempotencyKeyHash: derived.idempotencyKeyHash,
      mutationDigest: derived.mutationDigest,
      semanticDigest: derived.semanticDigest,
      handoffId: derived.handoffId,
    });
    return finalizePreparing(
      input,
      derived.creatorKey,
      admitted.record,
      !admitted.created || !admitted.claimCreated
    );
  }

  return {
    async prepare(conversationId, body, idempotencyKey) {
      const input = validateJarvisCreatorHandoffInput(conversationId, body);
      const externalKey = validateJarvisCreatorHandoffIdempotencyKey(idempotencyKey);
      return prepareValidated(input, externalKey);
    },
    getSummary(conversationId, handoffId) {
      return persistence.getSummary(
        validateJarvisCreatorHandoffConversationId(conversationId),
        validateJarvisCreatorHandoffId(handoffId)
      );
    },
    async review(conversationId, handoffId, body) {
      const exactConversationId = validateJarvisCreatorHandoffConversationId(conversationId);
      const exactHandoffId = validateJarvisCreatorHandoffId(handoffId);
      const action = validateJarvisCreatorHandoffRecoveryAction(body);
      if (action.action !== "review") {
        throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff review action is required.");
      }
      const record = await persistence.readHandoff(exactHandoffId);
      if (!record || record.source.conversationId !== exactConversationId) {
        throw new JarvisCreatorHandoffError(404, "handoff_not_found", "Creator handoff was not found.");
      }
      if (record.recordDigest !== action.expectedHandoffRecordDigest) {
        throw new JarvisCreatorHandoffError(409, "handoff_revision_conflict", "Creator handoff changed before exact review.");
      }
      return {
        handoffId: record.handoffId,
        operation: record.operation,
        status: record.status,
        recordDigest: record.recordDigest,
        projectId: record.projectId,
        reviewedRequest: record.reviewedRequest,
        revisionTarget: record.revisionTarget
          ? {
              projectId: record.revisionTarget.projectId,
              sourceArtifactRevision: record.revisionTarget.sourceArtifactRevision,
            }
          : null,
        resumable: record.status === "preparing",
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      };
    },
    async resume(conversationId, handoffId, body, idempotencyKey) {
      const exactConversationId = validateJarvisCreatorHandoffConversationId(conversationId);
      const exactHandoffId = validateJarvisCreatorHandoffId(handoffId);
      const action = validateJarvisCreatorHandoffRecoveryAction(body);
      if (action.action !== "resume") {
        throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff resume action is required.");
      }
      const externalKey = validateJarvisCreatorHandoffIdempotencyKey(idempotencyKey);
      const record = await persistence.readHandoff(exactHandoffId);
      if (!record || record.source.conversationId !== exactConversationId) {
        throw new JarvisCreatorHandoffError(404, "handoff_not_found", "Creator handoff was not found.");
      }
      if (
        record.recordDigest !== action.expectedHandoffRecordDigest ||
        record.reviewedRequest.handoffRequestDigest !== action.reviewedRequestDigest
      ) {
        throw new JarvisCreatorHandoffError(
          409,
          "handoff_revision_conflict",
          "Creator handoff or reviewed request changed before explicit resume."
        );
      }
      if (record.status === "failed") throwFailed(record);
      if (record.status === "prepared") {
        const input = record.operation === "create"
          ? ({
              conversationId: record.source.conversationId,
              expectedConversationRevision: record.source.conversationRevision,
              sourceTurnId: record.source.turnId,
              sourceMessageId: record.source.messageId,
              sourceMessageDigest: record.source.messageDigest,
              creatorKind: record.reviewedRequest.creatorKind,
              projectTitle: record.reviewedRequest.projectTitle,
              description: record.reviewedRequest.description,
              acknowledgement: true,
              operation: "create",
            } as const)
          : inputFromRecord(record);
        return claimAndContinue(input, externalKey, record, true);
      }
      return claimAndContinue(inputFromRecord(record), externalKey, record, true);
    },
    listConversation: (conversationId, limit) => persistence.listConversation(conversationId, limit),
  };
}
