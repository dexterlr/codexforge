import {
  CREATOR_AUDIT_EVENT_TYPES,
  CREATOR_CONTRACT_VERSION,
  CREATOR_FAILURE_CODES,
  CREATOR_MANIFEST_VERSION,
  CREATOR_PROJECT_STATES,
  CREATOR_RESPONSE_CONTRACT_VERSIONS,
  CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS,
  CREATOR_TOPOLOGY_CANONICALIZER_VERSION,
  CREATOR_TOPOLOGY_REPAIR_OPERATIONS,
  type CreatorCreateProjectInput,
  type CreatorCreateProjectResult,
  type CreatorMutationKind,
  type CreatorProjectActionInput,
  type CreatorProjectActionResult,
  type CreatorProjectState,
  type CreatorProjectSummary,
  type CreatorTopologyRepairEligibility,
} from "./creator-types";

const CREATOR_API_BASE = "/api/codexforge/creator";
const HEX_24 = /^[a-f0-9]{24}$/;
const HEX_32 = /^[a-f0-9]{32}$/;
const HEX_64 = /^[a-f0-9]{64}$/;
const SAFE_ERROR_CODE = /^[a-z][a-z0-9_]{0,79}$/;
const UNSAFE_VISIBLE_CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${label} was malformed.`);
  }
  return value as Record<string, unknown>;
}

function assertExactKeys(
  value: Record<string, unknown>,
  keys: readonly string[],
  label: string
): void {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (
    actual.length !== expected.length ||
    actual.some((key, index) => key !== expected[index])
  ) {
    throw new Error(`${label} was malformed.`);
  }
}

function assertString(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string") throw new Error(`${label} was malformed.`);
}

function assertPositiveInteger(
  value: unknown,
  label: string
): asserts value is number {
  if (!Number.isSafeInteger(value) || Number(value) < 1) {
    throw new Error(`${label} was malformed.`);
  }
}

function assertNullableString(
  value: unknown,
  label: string
): asserts value is string | null {
  if (value !== null && typeof value !== "string") {
    throw new Error(`${label} was malformed.`);
  }
}

function assertHex(value: unknown, pattern: RegExp, label: string): void {
  if (typeof value !== "string" || !pattern.test(value)) {
    throw new Error(`${label} was malformed.`);
  }
}

function assertStringArray(value: unknown, label: string): asserts value is string[] {
  if (!Array.isArray(value) || !value.every((entry) => typeof entry === "string")) {
    throw new Error(`${label} was malformed.`);
  }
}

function assertResponseContractVersion(value: unknown, label: string): void {
  if (!CREATOR_RESPONSE_CONTRACT_VERSIONS.includes(value as never)) {
    throw new Error(`${label} was malformed.`);
  }
}

function assertDocumentTopology(value: unknown, label: string): void {
  const topology = asRecord(value, label);
  assertExactKeys(topology, [
    "canonicalizerVersion", "sourceResponseContractVersion",
    "responseContractVersion", "orderedOperations", "inputDigest",
    "inputHtmlSha256", "outputHtmlSha256", "outputBundleDigest",
    "transformationDigest",
  ], label);
  if (
    topology.canonicalizerVersion !== CREATOR_TOPOLOGY_CANONICALIZER_VERSION ||
    topology.sourceResponseContractVersion !== "server-owned-page-v1" ||
    topology.responseContractVersion !== "server-owned-page-v1" ||
    !Array.isArray(topology.orderedOperations) ||
    topology.orderedOperations.length !==
      CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS.length ||
    topology.orderedOperations.some(
      (operation, index) =>
        operation !== CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS[index]
    ) ||
    topology.inputHtmlSha256 !== null
  ) {
    throw new Error(`${label} was malformed.`);
  }
  for (const digest of [
    topology.inputDigest,
    topology.outputHtmlSha256,
    topology.outputBundleDigest,
    topology.transformationDigest,
  ]) {
    assertHex(digest, HEX_64, label);
  }
}

function assertModelEnvelope(value: unknown): void {
  const model = asRecord(value, "Creator model envelope");
  assertExactKeys(model, [
    "providerKey",
    "providerLabel",
    "providerLocality",
    "modelKey",
    "runtimeModel",
    "dataBoundary",
    "maximumOutputTokens",
    "fallback",
    "retry",
    "substitution",
    "paidExecution",
    "estimatedProviderTokenChargeUsd",
    "localResourceCost",
  ], "Creator model envelope");
  if (
    model.providerKey !== "ollama-local" ||
    model.providerLabel !== "Local Ollama" ||
    model.providerLocality !== "local-machine" ||
    model.modelKey !== "ollama-local::gpt-oss:20b" ||
    model.runtimeModel !== "gpt-oss:20b" ||
    model.dataBoundary !== "local-machine" ||
    model.maximumOutputTokens !== 4096 ||
    model.fallback !== "disabled" ||
    model.retry !== "disabled" ||
    model.substitution !== "disabled" ||
    model.paidExecution !== "disabled" ||
    model.estimatedProviderTokenChargeUsd !== 0 ||
    model.localResourceCost !== "unmetered"
  ) {
    throw new Error("Creator model envelope was malformed.");
  }
}

function assertIdentity(value: unknown): void {
  const identity = asRecord(value, "Creator identity");
  assertExactKeys(identity, [
    "projectId",
    "projectSlug",
    "projectTitle",
    "creatorKind",
  ], "Creator identity");
  assertHex(identity.projectId, HEX_24, "Creator identity");
  assertString(identity.projectSlug, "Creator identity");
  assertString(identity.projectTitle, "Creator identity");
  if (identity.creatorKind !== "website-browser-app") {
    throw new Error("Creator identity was malformed.");
  }
}

function assertMaterializedFiles(value: unknown, label: string): void {
  if (!Array.isArray(value)) throw new Error(`${label} was malformed.`);
  for (const item of value) {
    const file = asRecord(item, label);
    assertExactKeys(file, ["path", "mediaType", "byteLength", "sha256"], label);
    assertString(file.path, label);
    assertString(file.mediaType, label);
    if (!Number.isSafeInteger(file.byteLength) || Number(file.byteLength) < 0) {
      throw new Error(`${label} was malformed.`);
    }
    assertHex(file.sha256, HEX_64, label);
  }
}

function assertProjectShape(value: unknown): asserts value is CreatorProjectState {
  const project = asRecord(value, "Creator project");
  assertExactKeys(project, [
    "recordVersion",
    "stateRevision",
    "status",
    "createdAt",
    "updatedAt",
    "identity",
    "request",
    "initialProviderResponseContractVersion",
    "plan",
    "approvalPacket",
    "runBindings",
    "artifactProposal",
    "artifactProposalBinding",
    "validation",
    "materializations",
    "preview",
    "repair",
    "revisionRequests",
    "topologyRepair",
    "exportManifest",
    "failureCode",
    "failureMessage",
    "auditEvents",
    "idempotencyRecords",
  ], "Creator project");
  if (project.recordVersion !== 1) throw new Error("Creator project was malformed.");
  assertPositiveInteger(project.stateRevision, "Creator project");
  if (!CREATOR_PROJECT_STATES.includes(project.status as never)) {
    throw new Error("Creator project was malformed.");
  }
  assertString(project.createdAt, "Creator project");
  assertString(project.updatedAt, "Creator project");
  assertIdentity(project.identity);

  const request = asRecord(project.request, "Creator request");
  assertExactKeys(request, [
    "requestId",
    "creatorKind",
    "projectTitle",
    "description",
    "requestDigest",
    "createdAt",
  ], "Creator request");
  assertHex(request.requestId, HEX_24, "Creator request");
  if (request.creatorKind !== "website-browser-app") throw new Error("Creator request was malformed.");
  assertString(request.projectTitle, "Creator request");
  assertString(request.description, "Creator request");
  assertHex(request.requestDigest, HEX_64, "Creator request");
  assertString(request.createdAt, "Creator request");
  assertResponseContractVersion(
    project.initialProviderResponseContractVersion,
    "Creator project"
  );

  if (project.plan !== null) {
    const plan = asRecord(project.plan, "Creator plan");
    assertExactKeys(plan, [
      "planId", "planVersion", "project", "requestDigest", "contractVersion",
      "entrypoint", "destinationBoundary", "modelEnvelope", "filePolicy",
      "orderedSteps", "capabilityStatement", "limitationStatement", "preparedAt",
      "planDigest",
    ], "Creator plan");
    assertHex(plan.planId, HEX_24, "Creator plan");
    if (plan.planVersion !== 1 || plan.contractVersion !== CREATOR_CONTRACT_VERSION || plan.entrypoint !== "index.html") {
      throw new Error("Creator plan was malformed.");
    }
    assertIdentity(plan.project);
    assertHex(plan.requestDigest, HEX_64, "Creator plan");
    assertString(plan.destinationBoundary, "Creator plan");
    assertModelEnvelope(plan.modelEnvelope);
    const filePolicy = asRecord(plan.filePolicy, "Creator file policy");
    assertExactKeys(filePolicy, [
      "maximumFileCount", "maximumIndividualFileBytes", "maximumAggregateBytes",
      "maximumRelativePathLength", "maximumPathSegmentLength",
      "maximumDirectoryDepth", "allowedSegmentPattern", "entrypoint",
      "allowedMediaTypes", "duplicatePolicy",
    ], "Creator file policy");
    for (const field of [
      "maximumFileCount", "maximumIndividualFileBytes", "maximumAggregateBytes",
      "maximumRelativePathLength", "maximumPathSegmentLength",
      "maximumDirectoryDepth",
    ] as const) {
      assertPositiveInteger(filePolicy[field], "Creator file policy");
    }
    assertString(filePolicy.allowedSegmentPattern, "Creator file policy");
    if (
      filePolicy.entrypoint !== "index.html" ||
      filePolicy.duplicatePolicy !==
        "reject-normalized-and-case-insensitive-collisions"
    ) {
      throw new Error("Creator file policy was malformed.");
    }
    const allowedMediaTypes = asRecord(
      filePolicy.allowedMediaTypes,
      "Creator file policy"
    );
    assertExactKeys(
      allowedMediaTypes,
      [".html", ".css", ".js", ".json", ".svg", ".md", ".txt"],
      "Creator file policy"
    );
    if (
      allowedMediaTypes[".html"] !== "text/html" ||
      allowedMediaTypes[".css"] !== "text/css" ||
      allowedMediaTypes[".js"] !== "text/javascript" ||
      allowedMediaTypes[".json"] !== "application/json" ||
      allowedMediaTypes[".svg"] !== "image/svg+xml" ||
      allowedMediaTypes[".md"] !== "text/markdown" ||
      allowedMediaTypes[".txt"] !== "text/plain"
    ) {
      throw new Error("Creator file policy was malformed.");
    }
    assertStringArray(plan.orderedSteps, "Creator plan");
    assertString(plan.capabilityStatement, "Creator plan");
    assertString(plan.limitationStatement, "Creator plan");
    assertString(plan.preparedAt, "Creator plan");
    assertHex(plan.planDigest, HEX_64, "Creator plan");
  }

  if (project.approvalPacket !== null) {
    const packet = asRecord(project.approvalPacket, "Creator approval packet");
    assertExactKeys(packet, [
      "purpose", "privateAlphaRunId", "privateAlphaRunRevision", "approvalScopeHash",
      "planDigest", "sourceArtifactRevision", "targetArtifactRevision",
      "destinationBoundary", "status", "modelEnvelope", "preparedAt", "approvedAt",
    ], "Creator approval packet");
    if (!["generation", "repair", "revision"].includes(String(packet.purpose)) ||
        !["awaiting", "approved", "canceled"].includes(String(packet.status))) {
      throw new Error("Creator approval packet was malformed.");
    }
    assertString(packet.privateAlphaRunId, "Creator approval packet");
    assertPositiveInteger(packet.privateAlphaRunRevision, "Creator approval packet");
    assertHex(packet.approvalScopeHash, HEX_64, "Creator approval packet");
    assertHex(packet.planDigest, HEX_64, "Creator approval packet");
    if (packet.sourceArtifactRevision !== null) assertPositiveInteger(packet.sourceArtifactRevision, "Creator approval packet");
    assertPositiveInteger(packet.targetArtifactRevision, "Creator approval packet");
    assertString(packet.destinationBoundary, "Creator approval packet");
    assertModelEnvelope(packet.modelEnvelope);
    assertString(packet.preparedAt, "Creator approval packet");
    assertNullableString(packet.approvedAt, "Creator approval packet");
  }

  if (!Array.isArray(project.runBindings)) throw new Error("Creator run bindings were malformed.");
  for (const item of project.runBindings) {
    const binding = asRecord(item, "Creator run binding");
    assertExactKeys(binding, [
      "purpose", "operationSlot", "sourceRunId", "ownershipBindingId",
      "sourceRunRevision", "approvalScopeHash", "providerKey", "modelKey",
      "runtimeModel", "dataBoundary", "maximumOutputTokens",
      "responseContractVersion", "documentTopology",
      "requestEnvelopeDigest", "sourceArtifactRevision", "boundAt",
      "approvalRecordedAt", "executionRequestedAt", "executionIdempotencyKeyHash",
      "outputReceivedAt", "executionAttempted",
    ], "Creator run binding");
    if (!["generation", "repair", "revision"].includes(String(binding.purpose)) ||
        !["generation-initial", "repair-1", "revision-1", "revision-2"].includes(String(binding.operationSlot)) ||
        binding.providerKey !== "ollama-local" ||
        binding.modelKey !== "ollama-local::gpt-oss:20b" ||
        binding.runtimeModel !== "gpt-oss:20b" ||
        binding.dataBoundary !== "local-machine" ||
        binding.maximumOutputTokens !== 4096 ||
        typeof binding.executionAttempted !== "boolean") {
      throw new Error("Creator run binding was malformed.");
    }
    assertString(binding.sourceRunId, "Creator run binding");
    assertHex(binding.ownershipBindingId, HEX_32, "Creator run binding");
    assertPositiveInteger(binding.sourceRunRevision, "Creator run binding");
    assertHex(binding.approvalScopeHash, HEX_64, "Creator run binding");
    assertHex(binding.requestEnvelopeDigest, HEX_64, "Creator run binding");
    assertResponseContractVersion(
      binding.responseContractVersion,
      "Creator run binding"
    );
    if (binding.documentTopology !== null) {
      assertDocumentTopology(
        binding.documentTopology,
        "Creator run document topology"
      );
    }
    if (binding.sourceArtifactRevision !== null) assertPositiveInteger(binding.sourceArtifactRevision, "Creator run binding");
    assertString(binding.boundAt, "Creator run binding");
    assertNullableString(binding.approvalRecordedAt, "Creator run binding");
    assertNullableString(binding.executionRequestedAt, "Creator run binding");
    if (binding.executionIdempotencyKeyHash !== null) assertHex(binding.executionIdempotencyKeyHash, HEX_64, "Creator run binding");
    assertNullableString(binding.outputReceivedAt, "Creator run binding");
  }

  if (project.artifactProposal !== null) {
    const proposal = asRecord(project.artifactProposal, "Creator artifact proposal");
    const proposalKeys = Object.prototype.hasOwnProperty.call(proposal, "explanation")
      ? ["contractVersion", "projectTitle", "creatorKind", "entrypoint", "files", "explanation"]
      : ["contractVersion", "projectTitle", "creatorKind", "entrypoint", "files"];
    assertExactKeys(proposal, proposalKeys, "Creator artifact proposal");
    if (proposal.contractVersion !== CREATOR_CONTRACT_VERSION || proposal.creatorKind !== "website-browser-app" || proposal.entrypoint !== "index.html" || !Array.isArray(proposal.files)) {
      throw new Error("Creator artifact proposal was malformed.");
    }
    assertString(proposal.projectTitle, "Creator artifact proposal");
    if (proposal.explanation !== undefined) assertString(proposal.explanation, "Creator artifact proposal");
    for (const item of proposal.files) {
      const file = asRecord(item, "Creator artifact file");
      assertExactKeys(file, ["path", "mediaType", "content"], "Creator artifact file");
      assertString(file.path, "Creator artifact file");
      assertString(file.mediaType, "Creator artifact file");
      assertString(file.content, "Creator artifact file");
    }
  }
  if (project.artifactProposalBinding !== null) {
    const binding = asRecord(project.artifactProposalBinding, "Creator proposal binding");
    assertExactKeys(binding, ["purpose", "sourceRunId"], "Creator proposal binding");
    if (!["generation", "repair", "revision"].includes(String(binding.purpose))) throw new Error("Creator proposal binding was malformed.");
    assertString(binding.sourceRunId, "Creator proposal binding");
  }

  if (project.validation !== null) {
    const validation = asRecord(project.validation, "Creator validation");
    assertExactKeys(validation, [
      "validationVersion", "valid", "completedAt", "stagesCompleted", "issues",
      "issueDigest", "bundleDigest", "manifestDigest",
    ], "Creator validation");
    if (validation.validationVersion !== 1 || typeof validation.valid !== "boolean" || !Array.isArray(validation.stagesCompleted) || !validation.stagesCompleted.every(Number.isSafeInteger) || !Array.isArray(validation.issues)) {
      throw new Error("Creator validation was malformed.");
    }
    assertString(validation.completedAt, "Creator validation");
    assertHex(validation.issueDigest, HEX_64, "Creator validation");
    if (validation.bundleDigest !== null) assertHex(validation.bundleDigest, HEX_64, "Creator validation");
    if (validation.manifestDigest !== null) assertHex(validation.manifestDigest, HEX_64, "Creator validation");
    for (const item of validation.issues) {
      const issue = asRecord(item, "Creator validation issue");
      assertExactKeys(issue, ["code", "stage", "severity", "filePath", "message", "suggestedRepairContext", "blocksMaterialization"], "Creator validation issue");
      assertString(issue.code, "Creator validation issue");
      assertPositiveInteger(issue.stage, "Creator validation issue");
      if (!["error", "warning"].includes(String(issue.severity)) || typeof issue.blocksMaterialization !== "boolean") throw new Error("Creator validation issue was malformed.");
      assertNullableString(issue.filePath, "Creator validation issue");
      assertString(issue.message, "Creator validation issue");
      assertString(issue.suggestedRepairContext, "Creator validation issue");
    }
  }

  if (!Array.isArray(project.materializations)) throw new Error("Creator materializations were malformed.");
  for (const item of project.materializations) {
    const materialization = asRecord(item, "Creator materialization");
    assertExactKeys(
      materialization,
      [
        "artifactRevision", "destinationLabel", "entrypoint", "files",
        "aggregateBytes", "aggregateDigest", "validationDigest",
        ...(Object.prototype.hasOwnProperty.call(materialization, "topologyRepairDigest")
          ? ["topologyRepairDigest"]
          : []),
        ...(Object.prototype.hasOwnProperty.call(materialization, "topologyTransformationDigest")
          ? ["topologyTransformationDigest"]
          : []),
        "materializedAt",
      ],
      "Creator materialization"
    );
    assertPositiveInteger(materialization.artifactRevision, "Creator materialization");
    assertString(materialization.destinationLabel, "Creator materialization");
    if (materialization.entrypoint !== "index.html" || !Number.isSafeInteger(materialization.aggregateBytes)) throw new Error("Creator materialization was malformed.");
    assertMaterializedFiles(materialization.files, "Creator materialized files");
    assertHex(materialization.aggregateDigest, HEX_64, "Creator materialization");
    assertHex(materialization.validationDigest, HEX_64, "Creator materialization");
    if (materialization.topologyRepairDigest !== undefined) {
      assertHex(materialization.topologyRepairDigest, HEX_64, "Creator materialization");
    }
    if (materialization.topologyTransformationDigest !== undefined) {
      assertHex(
        materialization.topologyTransformationDigest,
        HEX_64,
        "Creator materialization"
      );
    }
    assertString(materialization.materializedAt, "Creator materialization");
  }

  const preview = asRecord(project.preview, "Creator preview");
  assertExactKeys(preview, ["status", "previewId", "artifactRevision", "startedAt", "stoppedAt"], "Creator preview");
  if (!["inactive", "active", "stopped"].includes(String(preview.status))) throw new Error("Creator preview was malformed.");
  if (preview.previewId !== null) assertHex(preview.previewId, HEX_32, "Creator preview");
  if (preview.artifactRevision !== null) assertPositiveInteger(preview.artifactRevision, "Creator preview");
  assertNullableString(preview.startedAt, "Creator preview");
  assertNullableString(preview.stoppedAt, "Creator preview");

  if (project.repair !== null) {
    const repair = asRecord(project.repair, "Creator repair");
    assertExactKeys(repair, [
      "instructionVersion", "responseContractVersion", "attempt", "requestedAt", "sourceArtifactRevision",
      "targetArtifactRevision", "sourceManifestDigest", "sourceAggregateDigest",
      "sourceValidationDigest", "sourceSnapshotDigest", "sourceSnapshotBytes",
      "linkedRevisionRequestId", "validationIssueDigest", "issueCodes",
      "repairContextDigest",
    ], "Creator repair");
    if (repair.instructionVersion !== "legacy-v1" && repair.instructionVersion !== "source-snapshot-v2") throw new Error("Creator repair was malformed.");
    assertResponseContractVersion(repair.responseContractVersion, "Creator repair");
    if (repair.attempt !== 1) throw new Error("Creator repair was malformed.");
    assertString(repair.requestedAt, "Creator repair");
    if (repair.sourceArtifactRevision !== null) assertPositiveInteger(repair.sourceArtifactRevision, "Creator repair");
    assertPositiveInteger(repair.targetArtifactRevision, "Creator repair");
    if (repair.sourceManifestDigest !== null) assertHex(repair.sourceManifestDigest, HEX_64, "Creator repair");
    if (repair.sourceAggregateDigest !== null) assertHex(repair.sourceAggregateDigest, HEX_64, "Creator repair");
    if (repair.sourceValidationDigest !== null) assertHex(repair.sourceValidationDigest, HEX_64, "Creator repair");
    if (repair.sourceSnapshotDigest !== null) assertHex(repair.sourceSnapshotDigest, HEX_64, "Creator repair");
    if (
      repair.sourceSnapshotBytes !== null &&
      (typeof repair.sourceSnapshotBytes !== "number" ||
        !Number.isSafeInteger(repair.sourceSnapshotBytes) ||
        repair.sourceSnapshotBytes < 1)
    ) throw new Error("Creator repair was malformed.");
    if (repair.linkedRevisionRequestId !== null) assertHex(repair.linkedRevisionRequestId, HEX_24, "Creator repair");
    assertHex(repair.validationIssueDigest, HEX_64, "Creator repair");
    assertStringArray(repair.issueCodes, "Creator repair");
    assertHex(repair.repairContextDigest, HEX_64, "Creator repair");
  }

  if (!Array.isArray(project.revisionRequests)) throw new Error("Creator revision requests were malformed.");
  for (const item of project.revisionRequests) {
    const revision = asRecord(item, "Creator revision request");
    assertExactKeys(revision, [
      "instructionVersion", "responseContractVersion", "requestId", "revisionNumber", "sourceArtifactRevision", "targetArtifactRevision",
      "sourceManifestDigest", "sourceAggregateDigest", "sourceValidationDigest",
      "sourceSnapshotDigest", "sourceSnapshotBytes", "instructionDigest",
      "revisionBrief", "revisionBriefDigest", "destinationBoundary", "planDigest",
      "requestedAt", "planApprovedAt", "runBoundAt", "generationApprovedAt",
      "executionRequestedAt", "rejectedAt", "completionPurpose",
      "completionSourceRunId", "completedAt",
    ], "Creator revision request");
    if (revision.instructionVersion !== "source-snapshot-v1") throw new Error("Creator revision request was malformed.");
    assertResponseContractVersion(
      revision.responseContractVersion,
      "Creator revision request"
    );
    assertHex(revision.requestId, HEX_24, "Creator revision request");
    if (revision.revisionNumber !== 1 && revision.revisionNumber !== 2) throw new Error("Creator revision request was malformed.");
    assertPositiveInteger(revision.sourceArtifactRevision, "Creator revision request");
    assertPositiveInteger(revision.targetArtifactRevision, "Creator revision request");
    assertHex(revision.sourceManifestDigest, HEX_64, "Creator revision request");
    assertHex(revision.sourceAggregateDigest, HEX_64, "Creator revision request");
    assertHex(revision.sourceValidationDigest, HEX_64, "Creator revision request");
    assertHex(revision.sourceSnapshotDigest, HEX_64, "Creator revision request");
    if (
      typeof revision.sourceSnapshotBytes !== "number" ||
      !Number.isSafeInteger(revision.sourceSnapshotBytes) ||
      revision.sourceSnapshotBytes < 1
    ) throw new Error("Creator revision request was malformed.");
    assertHex(revision.instructionDigest, HEX_64, "Creator revision request");
    assertString(revision.revisionBrief, "Creator revision request");
    assertHex(revision.revisionBriefDigest, HEX_64, "Creator revision request");
    assertString(revision.destinationBoundary, "Creator revision request");
    assertHex(revision.planDigest, HEX_64, "Creator revision request");
    assertString(revision.requestedAt, "Creator revision request");
    assertNullableString(revision.planApprovedAt, "Creator revision request");
    assertNullableString(revision.runBoundAt, "Creator revision request");
    assertNullableString(revision.generationApprovedAt, "Creator revision request");
    assertNullableString(revision.executionRequestedAt, "Creator revision request");
    assertNullableString(revision.rejectedAt, "Creator revision request");
    if (
      revision.completionPurpose !== null &&
      revision.completionPurpose !== "revision" &&
      revision.completionPurpose !== "repair"
    ) throw new Error("Creator revision request was malformed.");
    if (revision.completionSourceRunId !== null) {
      assertHex(revision.completionSourceRunId, HEX_24, "Creator revision request");
    }
    assertNullableString(revision.completedAt, "Creator revision request");
    if (
      (revision.completedAt === null) !== (revision.completionPurpose === null) ||
      (revision.completedAt === null) !== (revision.completionSourceRunId === null) ||
      (revision.completionPurpose === "revision" && revision.rejectedAt !== null) ||
      (revision.completionPurpose === "repair" && revision.rejectedAt === null)
    ) throw new Error("Creator revision request was malformed.");
  }

  if (project.topologyRepair !== null) {
    const topology = asRecord(project.topologyRepair, "Creator topology repair");
    assertExactKeys(topology, [
      "status", "sourceStateRevision", "sourceRunId", "sourceRunRevision",
      "sourceOutputSha256", "sourceValidationIssueDigest", "providerRequests",
      "repairKind", "originalValidationState", "automaticRepair",
      "operatorAuthorized", "sourceResponseContractVersion",
      "responseContractVersion", "canonicalizerVersion", "orderedOperations",
      "inputHtmlSha256", "outputHtmlSha256", "inputBundleDigest",
      "outputBundleDigest", "validationDigest", "transformationDigest",
      "targetArtifactRevision", "requestedAt", "constructedAt", "completedAt",
    ], "Creator topology repair");
    if (
      !["pending", "completed"].includes(String(topology.status)) ||
      topology.providerRequests !== 0 ||
      topology.repairKind !== "server-owned-document-topology" ||
      topology.originalValidationState !== "rejected_output" ||
      topology.automaticRepair !== false ||
      topology.operatorAuthorized !== true ||
      topology.sourceResponseContractVersion !== "legacy-bundle-v1" ||
      topology.responseContractVersion !== "server-owned-page-v1" ||
      topology.canonicalizerVersion !== CREATOR_TOPOLOGY_CANONICALIZER_VERSION ||
      !Array.isArray(topology.orderedOperations) ||
      topology.orderedOperations.length !== CREATOR_TOPOLOGY_REPAIR_OPERATIONS.length ||
      topology.orderedOperations.some(
        (operation, index) =>
          operation !== CREATOR_TOPOLOGY_REPAIR_OPERATIONS[index]
      ) ||
      (topology.status === "pending") !== (topology.completedAt === null)
    ) {
      throw new Error("Creator topology repair was malformed.");
    }
    assertPositiveInteger(topology.sourceStateRevision, "Creator topology repair");
    assertHex(topology.sourceRunId, HEX_24, "Creator topology repair");
    assertPositiveInteger(topology.sourceRunRevision, "Creator topology repair");
    for (const digest of [
      topology.sourceOutputSha256,
      topology.sourceValidationIssueDigest,
      topology.inputHtmlSha256,
      topology.outputHtmlSha256,
      topology.inputBundleDigest,
      topology.outputBundleDigest,
      topology.validationDigest,
      topology.transformationDigest,
    ]) {
      assertHex(digest, HEX_64, "Creator topology repair");
    }
    assertPositiveInteger(topology.targetArtifactRevision, "Creator topology repair");
    assertString(topology.requestedAt, "Creator topology repair");
    assertString(topology.constructedAt, "Creator topology repair");
    assertNullableString(topology.completedAt, "Creator topology repair");
  }

  if (project.exportManifest !== null) {
    const manifest = asRecord(project.exportManifest, "Creator export manifest");
    assertExactKeys(manifest, [
      "manifestVersion", "creatorProjectId", "projectTitle", "creatorKind",
      "artifactRevision", "entrypoint", "files", "aggregateBytes", "aggregateDigest",
      "validationDigest",
      ...(Object.prototype.hasOwnProperty.call(manifest, "topologyRepairDigest") ? ["topologyRepairDigest"] : []),
      ...(Object.prototype.hasOwnProperty.call(manifest, "topologyTransformationDigest") ? ["topologyTransformationDigest"] : []),
      "sourceRequestDigest", "sourceRunId", "providerKey",
      "modelKey", "runtimeModel", "dataBoundary", "createdAt", "auditReferenceIds",
      "manifestDigest",
    ], "Creator export manifest");
    if (manifest.manifestVersion !== CREATOR_MANIFEST_VERSION || manifest.creatorKind !== "website-browser-app" || manifest.entrypoint !== "index.html" || manifest.providerKey !== "ollama-local" || manifest.modelKey !== "ollama-local::gpt-oss:20b" || manifest.runtimeModel !== "gpt-oss:20b" || manifest.dataBoundary !== "local-machine" || !Number.isSafeInteger(manifest.aggregateBytes)) {
      throw new Error("Creator export manifest was malformed.");
    }
    assertHex(manifest.creatorProjectId, HEX_24, "Creator export manifest");
    assertString(manifest.projectTitle, "Creator export manifest");
    assertPositiveInteger(manifest.artifactRevision, "Creator export manifest");
    assertMaterializedFiles(manifest.files, "Creator export manifest");
    assertHex(manifest.aggregateDigest, HEX_64, "Creator export manifest");
    assertHex(manifest.validationDigest, HEX_64, "Creator export manifest");
    if (manifest.topologyRepairDigest !== undefined) {
      assertHex(manifest.topologyRepairDigest, HEX_64, "Creator export manifest");
    }
    if (manifest.topologyTransformationDigest !== undefined) {
      assertHex(
        manifest.topologyTransformationDigest,
        HEX_64,
        "Creator export manifest"
      );
    }
    assertHex(manifest.sourceRequestDigest, HEX_64, "Creator export manifest");
    assertString(manifest.sourceRunId, "Creator export manifest");
    assertString(manifest.createdAt, "Creator export manifest");
    assertStringArray(manifest.auditReferenceIds, "Creator export manifest");
    assertHex(manifest.manifestDigest, HEX_64, "Creator export manifest");
  }

  if (project.failureCode !== null && !CREATOR_FAILURE_CODES.includes(project.failureCode as never)) throw new Error("Creator failure evidence was malformed.");
  assertNullableString(project.failureMessage, "Creator failure evidence");
  if (!Array.isArray(project.auditEvents)) throw new Error("Creator audit events were malformed.");
  for (const item of project.auditEvents) {
    const event = asRecord(item, "Creator audit event");
    assertExactKeys(event, ["eventId", "eventType", "occurredAt", "actor", "previousState", "resultingState", "stateRevision", "sourceRunId", "artifactRevision", "idempotencyKeyHash", "mutationDigest", "summary"], "Creator audit event");
    assertHex(event.eventId, HEX_24, "Creator audit event");
    if (!CREATOR_AUDIT_EVENT_TYPES.includes(event.eventType as never) || !["local-operator", "system"].includes(String(event.actor)) || (event.previousState !== null && !CREATOR_PROJECT_STATES.includes(event.previousState as never)) || !CREATOR_PROJECT_STATES.includes(event.resultingState as never)) throw new Error("Creator audit event was malformed.");
    assertString(event.occurredAt, "Creator audit event");
    assertPositiveInteger(event.stateRevision, "Creator audit event");
    assertNullableString(event.sourceRunId, "Creator audit event");
    if (event.artifactRevision !== null) assertPositiveInteger(event.artifactRevision, "Creator audit event");
    if (event.idempotencyKeyHash !== null) assertHex(event.idempotencyKeyHash, HEX_64, "Creator audit event");
    if (event.mutationDigest !== null) assertHex(event.mutationDigest, HEX_64, "Creator audit event");
    assertString(event.summary, "Creator audit event");
  }
  if (!Array.isArray(project.idempotencyRecords)) throw new Error("Creator idempotency records were malformed.");
  for (const item of project.idempotencyRecords) {
    const record = asRecord(item, "Creator idempotency record");
    assertExactKeys(record, ["idempotencyKeyHash", "mutationKind", "mutationDigest", "resultingStateRevision", "recordedAt"], "Creator idempotency record");
    assertHex(record.idempotencyKeyHash, HEX_64, "Creator idempotency record");
    assertString(record.mutationKind, "Creator idempotency record");
    assertHex(record.mutationDigest, HEX_64, "Creator idempotency record");
    assertPositiveInteger(record.resultingStateRevision, "Creator idempotency record");
    assertString(record.recordedAt, "Creator idempotency record");
  }
}

function readProject(payload: unknown): CreatorProjectState {
  const record = asRecord(payload, "Creator response");
  assertExactKeys(record, ["ok", "project"], "Creator response");
  if (record.ok !== true) throw new Error("Creator response was malformed.");
  assertProjectShape(record.project);
  return record.project;
}

function readSummary(value: unknown): CreatorProjectSummary {
  const summary = asRecord(value, "Creator project summary");
  assertExactKeys(summary, [
    "projectId", "projectTitle", "creatorKind", "status", "stateRevision",
    "latestArtifactRevision", "latestManifestDigest", "latestAggregateDigest",
    "latestValidationDigest", "sourceRunBindingsDigest", "sourceRunBindingCount",
    "explicitRevisionCount", "createdAt", "updatedAt",
  ], "Creator project summary");
  assertHex(summary.projectId, HEX_24, "Creator project summary");
  assertString(summary.projectTitle, "Creator project summary");
  if (summary.creatorKind !== "website-browser-app" || !CREATOR_PROJECT_STATES.includes(summary.status as never)) throw new Error("Creator project summary was malformed.");
  assertPositiveInteger(summary.stateRevision, "Creator project summary");
  if (summary.latestArtifactRevision !== null) assertPositiveInteger(summary.latestArtifactRevision, "Creator project summary");
  for (const digest of [summary.latestManifestDigest, summary.latestAggregateDigest, summary.latestValidationDigest]) {
    if (digest !== null) assertHex(digest, HEX_64, "Creator project summary");
  }
  assertHex(summary.sourceRunBindingsDigest, HEX_64, "Creator project summary");
  if (
    !Number.isSafeInteger(summary.sourceRunBindingCount) ||
    Number(summary.sourceRunBindingCount) < 0 ||
    Number(summary.sourceRunBindingCount) > 4
  ) {
    throw new Error("Creator project summary was malformed.");
  }
  if (
    !Number.isSafeInteger(summary.explicitRevisionCount) ||
    Number(summary.explicitRevisionCount) < 0 ||
    Number(summary.explicitRevisionCount) > 2
  ) {
    throw new Error("Creator project summary was malformed.");
  }
  assertString(summary.createdAt, "Creator project summary");
  assertString(summary.updatedAt, "Creator project summary");
  return summary as CreatorProjectSummary;
}

export function buildCreatorClientIdempotencyKey(): string {
  const id = globalThis.crypto?.randomUUID?.();
  if (!id) throw new Error("Browser random UUID support is required.");
  return `creator-ui-${id}`;
}

function assertProjectId(projectId: string): string {
  if (!HEX_24.test(projectId)) throw new Error("Creator project ID is invalid.");
  return projectId;
}

async function readPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") throw new Error("Creator response was not JSON.");
  const source = await response.text();
  if (!source.trim()) throw new Error("Creator response was empty.");
  try {
    return JSON.parse(source) as unknown;
  } catch {
    throw new Error("Creator response JSON was malformed.");
  }
}

async function requestCreator<T>(
  target: string,
  init: RequestInit,
  expectedStatuses: readonly number[],
  read: (payload: unknown) => T
): Promise<T> {
  if (!target.startsWith(CREATOR_API_BASE) || target.includes("\\") || /(^|\/)\.\.(?:\/|$)/.test(target)) {
    throw new Error("Creator API target is not allowlisted.");
  }
  const response = await fetch(target, {
    ...init,
    cache: "no-store",
    credentials: "same-origin",
    redirect: "error",
  });
  if (response.redirected) {
    throw new Error("Creator API redirects are forbidden.");
  }
  const payload = await readPayload(response);
  if (!response.ok) {
    const record = asRecord(payload, "Creator error response");
    assertExactKeys(record, ["ok", "error"], "Creator error response");
    const error = asRecord(record.error, "Creator error response");
    assertExactKeys(error, ["code", "message"], "Creator error response");
    if (
      record.ok !== false ||
      typeof error.code !== "string" ||
      !SAFE_ERROR_CODE.test(error.code) ||
      error.code.length > 80 ||
      typeof error.message !== "string" ||
      error.message.length < 1 ||
      error.message.length > 240 ||
      UNSAFE_VISIBLE_CONTROL.test(error.message) ||
      error.message.trim() !== error.message ||
      ![400, 403, 404, 409, 413, 415, 422, 500, 503, 504].includes(
        response.status
      )
    ) {
      throw new Error("Creator error response was malformed.");
    }
    throw new Error(error.message);
  }
  if (!expectedStatuses.includes(response.status)) {
    throw new Error(`Creator response used unexpected status ${response.status}.`);
  }
  return read(payload);
}

export function createCreatorProject(
  input: CreatorCreateProjectInput,
  idempotencyKey = buildCreatorClientIdempotencyKey()
): Promise<CreatorCreateProjectResult> {
  return requestCreator(
    `${CREATOR_API_BASE}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(input),
    },
    [200, 201],
    (payload) => {
      const record = asRecord(payload, "Creator response");
      assertExactKeys(record, ["ok", "created", "project"], "Creator response");
      if (record.ok !== true || typeof record.created !== "boolean") throw new Error("Creator response was malformed.");
      assertProjectShape(record.project);
      return { created: record.created, project: record.project };
    }
  );
}

export function fetchCreatorProject(projectId: string): Promise<CreatorProjectState> {
  return requestCreator(
    `${CREATOR_API_BASE}/projects/${assertProjectId(projectId)}`,
    {},
    [200],
    readProject
  );
}

export function fetchCreatorTopologyRepairEligibility(
  projectId: string
): Promise<CreatorTopologyRepairEligibility> {
  return requestCreator(
    `${CREATOR_API_BASE}/projects/${assertProjectId(projectId)}/topology-repair`,
    {},
    [200],
    (payload) => {
      const record = asRecord(payload, "Creator topology eligibility response");
      assertExactKeys(
        record,
        ["ok", "eligibility"],
        "Creator topology eligibility response"
      );
      if (record.ok !== true) {
        throw new Error("Creator topology eligibility response was malformed.");
      }
      const eligibility = asRecord(
        record.eligibility,
        "Creator topology eligibility"
      );
      if (eligibility.eligible === false) {
        assertExactKeys(
          eligibility,
          ["eligible"],
          "Creator topology eligibility"
        );
        return { eligible: false };
      }
      assertExactKeys(eligibility, [
        "eligible", "sourceRevision", "sourceRunId", "sourceOutputSha256",
        "sourceValidationIssueDigest", "providerRequests", "repairKind",
        "originalValidationState", "automaticRepair", "operatorAuthorized",
      ], "Creator topology eligibility");
      if (
        eligibility.eligible !== true ||
        eligibility.providerRequests !== 0 ||
        eligibility.repairKind !== "server-owned-document-topology" ||
        eligibility.originalValidationState !== "rejected_output" ||
        eligibility.automaticRepair !== false ||
        eligibility.operatorAuthorized !== true
      ) {
        throw new Error("Creator topology eligibility was malformed.");
      }
      assertPositiveInteger(
        eligibility.sourceRevision,
        "Creator topology eligibility"
      );
      assertHex(eligibility.sourceRunId, HEX_24, "Creator topology eligibility");
      assertHex(
        eligibility.sourceOutputSha256,
        HEX_64,
        "Creator topology eligibility"
      );
      assertHex(
        eligibility.sourceValidationIssueDigest,
        HEX_64,
        "Creator topology eligibility"
      );
      return eligibility as CreatorTopologyRepairEligibility;
    }
  );
}

export function listCreatorProjectSummaries(
  limit = 256
): Promise<readonly CreatorProjectSummary[]> {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 256) {
    throw new Error("Creator project summary limit is invalid.");
  }
  return requestCreator(
    `${CREATOR_API_BASE}/projects?view=summaries&limit=${limit}`,
    {},
    [200],
    (payload) => {
      const record = asRecord(payload, "Creator summary response");
      assertExactKeys(record, ["ok", "projects"], "Creator summary response");
      if (record.ok !== true || !Array.isArray(record.projects)) {
        throw new Error("Creator summary response was malformed.");
      }
      return record.projects.map(readSummary);
    }
  );
}

export function actOnCreatorProject(
  projectId: string,
  action: CreatorProjectActionInput,
  idempotencyKey?: string
): Promise<CreatorProjectActionResult>;
export function actOnCreatorProject(
  projectId: string,
  action: CreatorMutationKind,
  expectedRevision: number,
  idempotencyKey?: string
): Promise<CreatorProjectActionResult>;
export function actOnCreatorProject(
  projectId: string,
  actionOrBody: CreatorMutationKind | CreatorProjectActionInput,
  revisionOrKey?: number | string,
  legacyKey?: string
): Promise<CreatorProjectActionResult> {
  const action: CreatorProjectActionInput =
    typeof actionOrBody === "string"
      ? actionOrBody === "request-revision" ||
        actionOrBody === "repair-document-topology"
        ? (() => {
            throw new Error(
              `${actionOrBody} requires the structured creator action body.`
            );
          })()
        : {
            action: actionOrBody,
            expectedRevision: Number(revisionOrKey),
          }
      : actionOrBody;
  const idempotencyKey =
    typeof actionOrBody === "string"
      ? legacyKey ?? buildCreatorClientIdempotencyKey()
      : typeof revisionOrKey === "string"
        ? revisionOrKey
        : buildCreatorClientIdempotencyKey();
  if (!Number.isSafeInteger(action.expectedRevision) || action.expectedRevision < 1) {
    throw new Error("Creator expected revision is invalid.");
  }
  return requestCreator(
    `${CREATOR_API_BASE}/projects/${assertProjectId(projectId)}/actions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
        "If-Match": `"${action.expectedRevision}"`,
      },
      body: JSON.stringify(action),
    },
    [200],
    (payload) => {
      const record = asRecord(payload, "Creator response");
      assertExactKeys(record, ["ok", "replayed", "project"], "Creator response");
      if (record.ok !== true || typeof record.replayed !== "boolean") throw new Error("Creator response was malformed.");
      assertProjectShape(record.project);
      return { replayed: record.replayed, project: record.project };
    }
  );
}
