import "server-only";

import { Buffer } from "node:buffer";
import {
  buildCreatorValidationDigest,
  validateCreatorProviderOutput,
} from "./creator-validation.server";
import {
  hashCreatorCanonicalJson,
  hashCreatorSha256,
  serializeCreatorCanonicalJson,
} from "./creator-crypto";
import { validateCreatorArtifactPaths } from "./creator-path-policy";
import { assertCreatorJsonHasUniqueObjectKeys } from "./creator-contract.server";
import { CREATOR_FILE_POLICY, CREATOR_MAX_VALIDATION_ISSUES } from "./creator-policy";
import {
  CreatorFilesystemError,
  type CreatorTreePublicationEntry,
} from "./creator-filesystem.server";
import type { CreatorPersistence } from "./creator-persistence.server";
import {
  CREATOR_MANIFEST_VERSION,
  type CreatorArtifactBundle,
  type CreatorExportManifest,
  type CreatorGenerationRunBinding,
  type CreatorMaterializationResult,
  type CreatorMaterializedFile,
  type CreatorValidationResult,
} from "./creator-types";

export class CreatorMaterializationError extends Error {
  constructor(
    readonly code:
      | "materialization_blocked"
      | "materialization_failed"
      | "export_digest_mismatch"
      | "not_found",
    message: string
  ) {
    super(message);
    this.name = "CreatorMaterializationError";
  }
}

function revisionName(revision: number): string {
  if (!Number.isSafeInteger(revision) || revision < 1 || revision > 999_999) {
    throw new CreatorMaterializationError("materialization_blocked", "Artifact revision is invalid.");
  }
  return String(revision).padStart(6, "0");
}

function artifactPathSegments(pathValue: string): readonly string[] {
  const segments = pathValue.split("/");
  if (segments.some((segment) => !segment)) {
    throw new CreatorMaterializationError("materialization_blocked", "Artifact path is invalid.");
  }
  return segments;
}

function encodeCanonical(value: unknown): Buffer {
  return Buffer.from(`${serializeCreatorCanonicalJson(value)}\n`, "utf8");
}

function manifestWithoutDigest(
  manifest: CreatorExportManifest
): Omit<CreatorExportManifest, "manifestDigest"> {
  const { manifestDigest: _manifestDigest, ...base } = manifest;
  return base;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, expectedKeys: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function isHex(value: unknown, length: number): value is string {
  return typeof value === "string" && new RegExp(`^[a-f0-9]{${length}}$`).test(value);
}

function isIsoTimestamp(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString() === value
  );
}

function isStrictCreatorMaterialization(
  value: unknown,
  projectId: string,
  artifactRevision: number
): value is CreatorMaterializationResult {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "artifactRevision", "destinationLabel", "entrypoint", "files", "aggregateBytes",
      "aggregateDigest", "validationDigest", "materializedAt",
    ]) ||
    value.artifactRevision !== artifactRevision ||
    value.destinationLabel !== `.codexforge/creator/projects/${projectId}/revisions/${revisionName(artifactRevision)}/files` ||
    value.entrypoint !== "index.html" ||
    !Array.isArray(value.files) ||
    value.files.length < 1 ||
    value.files.length > CREATOR_FILE_POLICY.maximumFileCount ||
    !Number.isSafeInteger(value.aggregateBytes) ||
    Number(value.aggregateBytes) < 1 ||
    Number(value.aggregateBytes) > CREATOR_FILE_POLICY.maximumAggregateBytes ||
    !isHex(value.aggregateDigest, 64) ||
    !isHex(value.validationDigest, 64) ||
    !isIsoTimestamp(value.materializedAt)
  ) {
    return false;
  }
  for (const file of value.files) {
    if (
      !isRecord(file) ||
      !hasExactKeys(file, ["path", "mediaType", "byteLength", "sha256"]) ||
      typeof file.path !== "string" ||
      file.path.length < 1 ||
      file.path.length > CREATOR_FILE_POLICY.maximumRelativePathLength ||
      typeof file.mediaType !== "string" ||
      file.mediaType.length < 1 ||
      file.mediaType.length > 64 ||
      !Number.isSafeInteger(file.byteLength) ||
      Number(file.byteLength) < 0 ||
      Number(file.byteLength) > CREATOR_FILE_POLICY.maximumIndividualFileBytes ||
      !isHex(file.sha256, 64)
    ) {
      return false;
    }
  }
  const files = value.files as unknown as readonly CreatorMaterializedFile[];
  const pathValidation = validateCreatorArtifactPaths(
    files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      content: "",
    }))
  );
  return pathValidation.issues.length === 0 &&
    files.reduce((sum, file) => sum + file.byteLength, 0) === value.aggregateBytes &&
    hashCreatorCanonicalJson(files) === value.aggregateDigest;
}

function isStrictCreatorExportManifest(value: unknown): value is CreatorExportManifest {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "manifestVersion", "creatorProjectId", "projectTitle", "creatorKind", "artifactRevision",
      "entrypoint", "files", "aggregateBytes", "aggregateDigest", "validationDigest",
      "sourceRequestDigest", "sourceRunId", "providerKey", "modelKey", "runtimeModel",
      "dataBoundary", "createdAt", "auditReferenceIds", "manifestDigest",
    ]) ||
    value.manifestVersion !== CREATOR_MANIFEST_VERSION ||
    !isHex(value.creatorProjectId, 24) ||
    typeof value.projectTitle !== "string" ||
    value.projectTitle.length < 1 ||
    value.projectTitle.length > 80 ||
    value.creatorKind !== "website-browser-app" ||
    !Number.isSafeInteger(value.artifactRevision) ||
    Number(value.artifactRevision) < 1 ||
    Number(value.artifactRevision) > 999_999 ||
    value.entrypoint !== "index.html" ||
    !Array.isArray(value.files) ||
    value.files.length < 1 ||
    value.files.length > CREATOR_FILE_POLICY.maximumFileCount ||
    typeof value.aggregateBytes !== "number" ||
    !Number.isSafeInteger(value.aggregateBytes) ||
    value.aggregateBytes < 1 ||
    value.aggregateBytes > CREATOR_FILE_POLICY.maximumAggregateBytes ||
    !isHex(value.aggregateDigest, 64) ||
    !isHex(value.validationDigest, 64) ||
    !isHex(value.sourceRequestDigest, 64) ||
    typeof value.sourceRunId !== "string" ||
    value.sourceRunId.length < 1 ||
    value.sourceRunId.length > 128 ||
    value.providerKey !== "ollama-local" ||
    value.modelKey !== "ollama-local::gpt-oss:20b" ||
    value.runtimeModel !== "gpt-oss:20b" ||
    value.dataBoundary !== "local-machine" ||
    !isIsoTimestamp(value.createdAt) ||
    !Array.isArray(value.auditReferenceIds) ||
    value.auditReferenceIds.length > 128 ||
    !value.auditReferenceIds.every((eventId) => isHex(eventId, 24)) ||
    new Set(value.auditReferenceIds).size !== value.auditReferenceIds.length ||
    !isHex(value.manifestDigest, 64)
  ) {
    return false;
  }
  for (const file of value.files) {
    if (
      !isRecord(file) ||
      !hasExactKeys(file, ["path", "mediaType", "byteLength", "sha256"]) ||
      typeof file.path !== "string" ||
      file.path.length < 1 ||
      file.path.length > CREATOR_FILE_POLICY.maximumRelativePathLength ||
      typeof file.mediaType !== "string" ||
      file.mediaType.length < 1 ||
      file.mediaType.length > 64 ||
      typeof file.byteLength !== "number" ||
      !Number.isSafeInteger(file.byteLength) ||
      file.byteLength < 0 ||
      file.byteLength > CREATOR_FILE_POLICY.maximumIndividualFileBytes ||
      !isHex(file.sha256, 64)
    ) {
      return false;
    }
  }
  const files = value.files as readonly CreatorMaterializedFile[];
  const pathValidation = validateCreatorArtifactPaths(
    files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      content: "",
    }))
  );
  const aggregateBytes = files.reduce((sum, file) => sum + file.byteLength, 0);
  const aggregateDigest = hashCreatorCanonicalJson(
    files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      byteLength: file.byteLength,
      sha256: file.sha256,
    }))
  );
  return pathValidation.issues.length === 0 &&
    aggregateBytes === value.aggregateBytes &&
    aggregateDigest === value.aggregateDigest;
}

function isStrictCreatorValidationResult(value: unknown): value is CreatorValidationResult {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "validationVersion", "valid", "completedAt", "stagesCompleted", "issues",
      "issueDigest", "bundleDigest", "manifestDigest",
    ]) ||
    value.validationVersion !== 1 ||
    typeof value.valid !== "boolean" ||
    !isIsoTimestamp(value.completedAt) ||
    !Array.isArray(value.stagesCompleted) ||
    value.stagesCompleted.length < 1 ||
    value.stagesCompleted.length > 10 ||
    !value.stagesCompleted.every(
      (stage, index, stages) =>
        Number.isSafeInteger(stage) &&
        Number(stage) >= 1 &&
        Number(stage) <= 10 &&
        (index === 0 || Number(stage) > Number(stages[index - 1]))
    ) ||
    !Array.isArray(value.issues) ||
    value.issues.length > CREATOR_MAX_VALIDATION_ISSUES ||
    !isHex(value.issueDigest, 64) ||
    (value.bundleDigest !== null && !isHex(value.bundleDigest, 64)) ||
    (value.manifestDigest !== null && !isHex(value.manifestDigest, 64))
  ) {
    return false;
  }
  for (const issue of value.issues) {
    if (
      !isRecord(issue) ||
      !hasExactKeys(issue, [
        "code", "stage", "severity", "filePath", "message",
        "suggestedRepairContext", "blocksMaterialization",
      ]) ||
      typeof issue.code !== "string" ||
      issue.code.length < 1 ||
      issue.code.length > 80 ||
      !Number.isSafeInteger(issue.stage) ||
      Number(issue.stage) < 1 ||
      Number(issue.stage) > 10 ||
      !["error", "warning"].includes(String(issue.severity)) ||
      (issue.filePath !== null &&
        (typeof issue.filePath !== "string" ||
          issue.filePath.length < 1 ||
          issue.filePath.length > CREATOR_FILE_POLICY.maximumRelativePathLength)) ||
      typeof issue.message !== "string" ||
      issue.message.length < 1 ||
      issue.message.length > 512 ||
      typeof issue.suggestedRepairContext !== "string" ||
      issue.suggestedRepairContext.length < 1 ||
      issue.suggestedRepairContext.length > 512 ||
      typeof issue.blocksMaterialization !== "boolean" ||
      (issue.severity === "error") !== issue.blocksMaterialization
    ) {
      return false;
    }
  }
  const issues = value.issues as CreatorValidationResult["issues"];
  return (
    hashCreatorCanonicalJson(issues) === value.issueDigest &&
    value.valid === !issues.some(
      (issue) => issue.severity === "error" && issue.blocksMaterialization
    )
  );
}

export function verifyCreatorExportManifestDigest(manifest: CreatorExportManifest): boolean {
  return isStrictCreatorExportManifest(manifest) &&
    hashCreatorCanonicalJson(manifestWithoutDigest(manifest)) === manifest.manifestDigest;
}

export type CreatorMaterializationPublication = Readonly<{
  materialization: CreatorMaterializationResult;
  manifest: CreatorExportManifest;
}>;

async function assertExactCreatorRevisionInventory(input: {
  persistence: CreatorPersistence;
  projectId: string;
  artifactRevision: number;
  files: readonly CreatorMaterializedFile[];
}): Promise<void> {
  const revisionRoot = [
    "projects",
    input.projectId,
    "revisions",
    revisionName(input.artifactRevision),
  ] as const;
  const expectedFilesDirectories = new Map<string, Set<string>>([["", new Set()]]);
  for (const file of input.files) {
    const segments = artifactPathSegments(file.path);
    let parentKey = "";
    for (let index = 0; index < segments.length; index += 1) {
      expectedFilesDirectories.get(parentKey)!.add(segments[index]);
      if (index < segments.length - 1) {
        parentKey = parentKey ? `${parentKey}/${segments[index]}` : segments[index];
        if (!expectedFilesDirectories.has(parentKey)) {
          expectedFilesDirectories.set(parentKey, new Set());
        }
      }
    }
  }
  const assertDirectory = async (
    segments: readonly string[],
    expectedEntries: readonly string[]
  ): Promise<void> => {
    const actualEntries = await input.persistence.filesystem.listDirectory(segments);
    const expected = [...expectedEntries].sort();
    if (
      actualEntries.length !== expected.length ||
      actualEntries.some((entry, index) => entry !== expected[index])
    ) {
      throw new CreatorMaterializationError(
        "export_digest_mismatch",
        "Creator revision contains an unexpected or missing filesystem entry."
      );
    }
  };
  try {
    await assertDirectory(
      revisionRoot,
      ["files", "manifest.json", "revision.json", "validation.json"]
    );
    for (const [relativeDirectory, expectedEntries] of expectedFilesDirectories) {
      await assertDirectory(
        [
          ...revisionRoot,
          "files",
          ...(relativeDirectory ? relativeDirectory.split("/") : []),
        ],
        [...expectedEntries]
      );
    }
  } catch (error) {
    if (error instanceof CreatorMaterializationError) throw error;
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator revision filesystem inventory could not be verified exactly."
    );
  }
}

export async function materializeCreatorArtifact(input: {
  persistence: CreatorPersistence;
  projectId: string;
  projectTitle: string;
  sourceRequestDigest: string;
  artifactRevision: number;
  bundle: CreatorArtifactBundle;
  validation: CreatorValidationResult;
  runBinding: CreatorGenerationRunBinding;
  auditReferenceIds: readonly string[];
  materializedAt: string;
}): Promise<CreatorMaterializationPublication> {
  const deterministicRevalidation = validateCreatorProviderOutput({
    rawOutput: serializeCreatorCanonicalJson(input.bundle),
    expectedProjectTitle: input.projectTitle,
    completedAt: input.validation.completedAt,
  });
  if (
    !input.validation.valid ||
    !deterministicRevalidation.bundle ||
    !deterministicRevalidation.validation.valid ||
    hashCreatorCanonicalJson(deterministicRevalidation.bundle) !==
      hashCreatorCanonicalJson(input.bundle) ||
    hashCreatorCanonicalJson(deterministicRevalidation.validation) !==
      hashCreatorCanonicalJson(input.validation) ||
    input.validation.bundleDigest !== hashCreatorCanonicalJson({
      contractVersion: input.bundle.contractVersion,
      projectTitle: input.bundle.projectTitle,
      creatorKind: input.bundle.creatorKind,
      entrypoint: input.bundle.entrypoint,
      files: input.bundle.files,
      explanation: input.bundle.explanation ?? null,
    })
  ) {
    throw new CreatorMaterializationError(
      "materialization_blocked",
      "Artifact materialization requires an exact successful validation binding."
    );
  }
  const validatedArtifacts = input.bundle.files.map((file) => {
    const bytes = Buffer.from(file.content, "utf8");
    return {
      bytes,
      inventory: {
        path: file.path,
        mediaType: file.mediaType,
        byteLength: bytes.length,
        sha256: hashCreatorSha256(bytes),
      },
    };
  });
  const validationInventory = validatedArtifacts.map((artifact) => artifact.inventory);
  const aggregateValidationBytes = validationInventory.reduce(
    (sum, file) => sum + file.byteLength,
    0
  );
  if (
    validationInventory.length < 1 ||
    validationInventory.length > CREATOR_FILE_POLICY.maximumFileCount ||
    validationInventory.some(
      (file) => file.byteLength > CREATOR_FILE_POLICY.maximumIndividualFileBytes
    ) ||
    aggregateValidationBytes > CREATOR_FILE_POLICY.maximumAggregateBytes ||
    input.validation.manifestDigest !==
      hashCreatorCanonicalJson({
        entrypoint: input.bundle.entrypoint,
        files: validationInventory,
      })
  ) {
    throw new CreatorMaterializationError(
      "materialization_blocked",
      "Artifact limits or manifest hashes no longer match the validated bundle."
    );
  }
  if (
    input.runBinding.providerKey !== "ollama-local" ||
    input.runBinding.modelKey !== "ollama-local::gpt-oss:20b" ||
    input.runBinding.runtimeModel !== "gpt-oss:20b" ||
    input.runBinding.dataBoundary !== "local-machine" ||
    input.runBinding.maximumOutputTokens !== 4096
  ) {
    throw new CreatorMaterializationError(
      "materialization_blocked",
      "Artifact source run does not match the exact creator model envelope."
    );
  }
  const paths = validateCreatorArtifactPaths(input.bundle.files);
  if (paths.issues.length > 0 || paths.validPaths.length !== input.bundle.files.length) {
    throw new CreatorMaterializationError(
      "materialization_blocked",
      "Artifact paths failed materialization-time revalidation."
    );
  }

  const revision = revisionName(input.artifactRevision);
  const finalRoot = ["projects", input.projectId, "revisions", revision] as const;
  const materializedFiles: CreatorMaterializedFile[] = validationInventory.map((file) => ({
    path: file.path,
    mediaType: file.mediaType,
    byteLength: file.byteLength,
    sha256: file.sha256,
  }));
  const aggregateBytes = materializedFiles.reduce((sum, file) => sum + file.byteLength, 0);
  const aggregateDigest = hashCreatorCanonicalJson(
    materializedFiles.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      byteLength: file.byteLength,
      sha256: file.sha256,
    }))
  );
  const validationDigest = buildCreatorValidationDigest(input.validation);
  const materialization: CreatorMaterializationResult = {
    artifactRevision: input.artifactRevision,
    destinationLabel: `.codexforge/creator/projects/${input.projectId}/revisions/${revision}/files`,
    entrypoint: "index.html",
    files: materializedFiles,
    aggregateBytes,
    aggregateDigest,
    validationDigest,
    materializedAt: input.materializedAt,
  };
  const manifestBase: Omit<CreatorExportManifest, "manifestDigest"> = {
    manifestVersion: CREATOR_MANIFEST_VERSION,
    creatorProjectId: input.projectId,
    projectTitle: input.projectTitle,
    creatorKind: "website-browser-app",
    artifactRevision: input.artifactRevision,
    entrypoint: "index.html",
    files: materializedFiles,
    aggregateBytes,
    aggregateDigest,
    validationDigest,
    sourceRequestDigest: input.sourceRequestDigest,
    sourceRunId: input.runBinding.sourceRunId,
    providerKey: "ollama-local",
    modelKey: "ollama-local::gpt-oss:20b",
    runtimeModel: "gpt-oss:20b",
    dataBoundary: "local-machine",
    createdAt: input.materializedAt,
    auditReferenceIds: [...input.auditReferenceIds],
  };
  const manifest: CreatorExportManifest = {
    ...manifestBase,
    manifestDigest: hashCreatorCanonicalJson(manifestBase),
  };
  if (
    !isStrictCreatorMaterialization(materialization, input.projectId, input.artifactRevision) ||
    !isStrictCreatorValidationResult(input.validation) ||
    !verifyCreatorExportManifestDigest(manifest)
  ) {
    throw new CreatorMaterializationError(
      "materialization_blocked",
      "Creator revision metadata failed exact in-memory verification before publication."
    );
  }

  const manifestBytes = encodeCanonical(manifest);
  const validationBytes = encodeCanonical(input.validation);
  const materializationBytes = encodeCanonical(materialization);
  for (const metadata of [manifestBytes, validationBytes, materializationBytes]) {
    assertCreatorJsonHasUniqueObjectKeys(metadata.toString("utf8"));
  }
  const orderedEntries: readonly CreatorTreePublicationEntry[] = [
    ...validatedArtifacts.map(
      (artifact): CreatorTreePublicationEntry => [
        ["files", ...artifactPathSegments(artifact.inventory.path)],
        artifact.bytes,
      ]
    ),
    [["manifest.json"], manifestBytes],
    [["validation.json"], validationBytes],
    [["revision.json"], materializationBytes],
  ];
  const intendedPublication: CreatorMaterializationPublication = { materialization, manifest };
  const readExactPublication = async (): Promise<CreatorMaterializationPublication> => {
    const published = await readCreatorMaterializationPublication({
      persistence: input.persistence,
      projectId: input.projectId,
      artifactRevision: input.artifactRevision,
    });
    if (
      hashCreatorCanonicalJson(published.materialization) !==
        hashCreatorCanonicalJson(intendedPublication.materialization) ||
      hashCreatorCanonicalJson(published.manifest) !==
        hashCreatorCanonicalJson(intendedPublication.manifest)
    ) {
      throw new CreatorMaterializationError(
        "export_digest_mismatch",
        "Published creator revision differs from the exact attempted publication."
      );
    }
    return published;
  };

  try {
    await input.persistence.filesystem.publishTreeExclusive(finalRoot, orderedEntries);
  } catch {
    // A native commit may succeed before its response is observed. Exact readback below is authoritative.
  }
  try {
    return await readExactPublication();
  } catch {
    throw new CreatorMaterializationError(
      "materialization_failed",
      "Creator revision publication failed without changing prior revisions."
    );
  }
}

export async function readCreatorExportManifest(input: {
  persistence: CreatorPersistence;
  projectId: string;
  artifactRevision: number;
}): Promise<CreatorExportManifest> {
  const revision = revisionName(input.artifactRevision);
  let source: Buffer;
  try {
    source = await input.persistence.filesystem.readBuffer([
      "projects",
      input.projectId,
      "revisions",
      revision,
      "manifest.json",
    ]);
  } catch (error) {
    if (error instanceof CreatorFilesystemError && error.code === "not_found") {
      throw new CreatorMaterializationError("not_found", "Creator export manifest was not found.");
    }
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator export manifest could not be read from its exact immutable location."
    );
  }
  let parsed: unknown;
  try {
    const serialized = source.toString("utf8");
    assertCreatorJsonHasUniqueObjectKeys(serialized);
    parsed = JSON.parse(serialized) as unknown;
  } catch {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator export manifest JSON is malformed."
    );
  }
  if (!isStrictCreatorExportManifest(parsed)) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator export manifest failed strict schema validation."
    );
  }
  const manifest = parsed;
  if (
    manifest.creatorProjectId !== input.projectId ||
    manifest.artifactRevision !== input.artifactRevision ||
    !verifyCreatorExportManifestDigest(manifest) ||
    !source.equals(encodeCanonical(manifest))
  ) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator export manifest failed exact digest validation."
    );
  }
  return manifest;
}

export async function readCreatorRevisionFile(input: {
  persistence: CreatorPersistence;
  projectId: string;
  artifactRevision: number;
  filePath: string;
  expectedManifestDigest?: string;
}): Promise<Readonly<{ bytes: Buffer; mediaType: string; sha256: string }>> {
  const manifest = await readCreatorExportManifest(input);
  if (
    input.expectedManifestDigest !== undefined &&
    manifest.manifestDigest !== input.expectedManifestDigest
  ) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator artifact manifest no longer matches immutable project state."
    );
  }
  const inventoryEntry = manifest.files.find((file) => file.path === input.filePath);
  if (!inventoryEntry) {
    throw new CreatorMaterializationError("not_found", "Creator artifact file was not found in the immutable inventory.");
  }
  const revision = revisionName(input.artifactRevision);
  const bytes = await input.persistence.filesystem.readBuffer([
    "projects",
    input.projectId,
    "revisions",
    revision,
    "files",
    ...artifactPathSegments(input.filePath),
  ]);
  const sha256 = hashCreatorSha256(bytes);
  if (bytes.length !== inventoryEntry.byteLength || sha256 !== inventoryEntry.sha256) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator artifact file failed immutable byte and hash verification."
    );
  }
  return { bytes, mediaType: inventoryEntry.mediaType, sha256 };
}

export async function readCreatorMaterializationPublication(input: {
  persistence: CreatorPersistence;
  projectId: string;
  artifactRevision: number;
}): Promise<CreatorMaterializationPublication> {
  const revision = revisionName(input.artifactRevision);
  const manifest = await readCreatorExportManifest(input);
  await assertExactCreatorRevisionInventory({
    ...input,
    files: manifest.files,
  });
  let materializationValue: unknown;
  let validation: CreatorValidationResult;
  let materializationSource: Buffer;
  let validationSource: Buffer;
  try {
    materializationSource = await input.persistence.filesystem.readBuffer([
      "projects",
      input.projectId,
      "revisions",
      revision,
      "revision.json",
    ]);
    validationSource = await input.persistence.filesystem.readBuffer([
      "projects",
      input.projectId,
      "revisions",
      revision,
      "validation.json",
    ]);
    const materializationText = materializationSource.toString("utf8");
    const validationText = validationSource.toString("utf8");
    assertCreatorJsonHasUniqueObjectKeys(materializationText);
    assertCreatorJsonHasUniqueObjectKeys(validationText);
    materializationValue = JSON.parse(materializationText) as CreatorMaterializationResult;
    validation = JSON.parse(validationText) as CreatorValidationResult;
  } catch {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator revision metadata could not be verified."
    );
  }
  if (
    !isStrictCreatorMaterialization(
      materializationValue,
      input.projectId,
      input.artifactRevision
    ) ||
    !isStrictCreatorValidationResult(validation) ||
    !materializationSource.equals(encodeCanonical(materializationValue)) ||
    !validationSource.equals(encodeCanonical(validation))
  ) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator materialization metadata failed strict schema validation."
    );
  }
  const materialization = materializationValue;
  const filesDigest = hashCreatorCanonicalJson(
    manifest.files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      byteLength: file.byteLength,
      sha256: file.sha256,
    }))
  );
  if (
    materialization.artifactRevision !== input.artifactRevision ||
    materialization.entrypoint !== manifest.entrypoint ||
    materialization.aggregateBytes !== manifest.aggregateBytes ||
    materialization.aggregateDigest !== manifest.aggregateDigest ||
    materialization.validationDigest !== manifest.validationDigest ||
    materialization.materializedAt !== manifest.createdAt ||
    hashCreatorCanonicalJson(materialization.files) !==
      hashCreatorCanonicalJson(manifest.files) ||
    filesDigest !== manifest.aggregateDigest ||
    validation.valid !== true ||
    validation.manifestDigest !== hashCreatorCanonicalJson({
      entrypoint: manifest.entrypoint,
      files: manifest.files,
    }) ||
    buildCreatorValidationDigest(validation) !== manifest.validationDigest
  ) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator revision metadata no longer matches its deterministic manifest."
    );
  }
  let aggregateBytes = 0;
  for (const file of manifest.files) {
    const verified = await readCreatorRevisionFile({
      ...input,
      filePath: file.path,
    });
    aggregateBytes += verified.bytes.length;
  }
  if (aggregateBytes !== manifest.aggregateBytes) {
    throw new CreatorMaterializationError(
      "export_digest_mismatch",
      "Creator export aggregate byte length no longer matches its manifest."
    );
  }
  return { materialization, manifest };
}

export function buildCreatorResponseContentType(mediaType: string): string {
  return `${mediaType}; charset=utf-8`;
}
