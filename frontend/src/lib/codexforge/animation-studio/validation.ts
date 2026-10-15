import {
  APPROVAL_GATES, ASSET_TYPES, ENGINE_IDS, EVENT_TYPES, JOB_STATES, PRODUCTION_METHODS,
} from "./domain";
import { resolveAssetPath } from "./workspace";
import { isLocalFootageAsset, validateLocalFootageAsset } from "./footage-contract";
import { BLENDER_SOURCE_ADAPTER, validateBlenderSourceAssetShape } from "./blender-source-contract";
import type {
  AdapterMetadata, AdapterRequest, AdapterResult, Approval, Asset, AssetRef, CapabilityObservation,
  Character, ContentHash, CostPolicy, CostRecord, Decision, EngineId, EntityKind, Environment,
  ExternalExecutionPolicy, Generation, Job, JsonObject, JsonValue, Model, Money, ProductionEvent,
  Prompt, Provenance, QCResult, Render, Rig, RoutingResult, Sequence, ShotManifest, StudioId,
  StudioProject, Timestamp,
} from "./domain";

/** Limits apply to the entire input, including provider settings and event details. */
export const STUDIO_VALIDATION_LIMITS = Object.freeze({
  maxDepth: 12, maxNodes: 20_000, maxArrayLength: 2_048, maxObjectKeys: 128,
  maxStringLength: 16_384, maxTotalStringLength: 262_144,
});

export interface StudioValidationIssue { readonly path: string; readonly code: string; readonly message: string }

/** Validation is deliberately fail-fast; the first issue always identifies its input path. */
export class StudioValidationError extends Error {
  readonly issues: readonly StudioValidationIssue[];
  constructor(issues: readonly StudioValidationIssue[]) {
    super(issues.map((issue) => `${issue.path}: ${issue.message}`).join("; "));
    this.name = "StudioValidationError";
    this.issues = Object.freeze(issues.map((issue) => Object.freeze({ ...issue })));
  }
}

function fail(path: string, code: string, message: string): never {
  throw new StudioValidationError([{ path, code, message }]);
}

const childPath = (path: string, key: string): string => `${path}[${JSON.stringify(key)}]`;
const forbiddenKeys = new Set(["__proto__", "prototype", "constructor"]);

/** Inspect descriptors, never input getters; accept only ordinary JSON-shaped objects/arrays. */
function snapshot(input: unknown): JsonValue {
  const ancestors = new WeakSet<object>();
  let nodes = 0;
  let textLength = 0;
  const text = (value: string, path: string) => {
    if (value.length > STUDIO_VALIDATION_LIMITS.maxStringLength) fail(path, "STRING_LIMIT", "String exceeds 16,384 characters");
    textLength += value.length;
    if (textLength > STUDIO_VALIDATION_LIMITS.maxTotalStringLength) fail(path, "TEXT_LIMIT", "Input exceeds 262,144 text characters");
    if (value.includes("\u0000")) fail(path, "INVALID_TEXT", "NUL characters are not allowed");
    return value;
  };
  const visit = (value: unknown, path: string, depth: number): JsonValue => {
    if (++nodes > STUDIO_VALIDATION_LIMITS.maxNodes) fail(path, "NODE_LIMIT", "Input exceeds 20,000 values");
    if (depth > STUDIO_VALIDATION_LIMITS.maxDepth) fail(path, "DEPTH_LIMIT", "Input nesting exceeds 12 levels");
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "string") return text(value, path);
    if (typeof value === "number") {
      if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER) fail(path, "INVALID_NUMBER", "Expected a finite number within the safe numeric range");
      return value;
    }
    if (typeof value !== "object") fail(path, "NOT_JSON", "Expected a JSON value (no undefined, functions, symbols or bigint)");
    if (ancestors.has(value)) fail(path, "CYCLE", "Circular references are not allowed");
    const isArray = Array.isArray(value);
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== (isArray ? Array.prototype : Object.prototype)) fail(path, "UNSAFE_PROTOTYPE", "Only ordinary objects and arrays are allowed");
    ancestors.add(value);
    try {
      if (isArray) {
        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
        const length: unknown = lengthDescriptor?.value;
        if (typeof length !== "number" || !Number.isSafeInteger(length) || length < 0 || length > STUDIO_VALIDATION_LIMITS.maxArrayLength) fail(path, "ARRAY_LIMIT", "Array exceeds 2,048 entries");
        if (Reflect.ownKeys(value).length !== length + 1) fail(path, "UNSAFE_ARRAY", "Arrays must be dense and cannot have extra properties");
        const result: JsonValue[] = [];
        for (let index = 0; index < length; index++) {
          const itemPath = `${path}[${index}]`;
          const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
          if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) fail(itemPath, "UNSAFE_PROPERTY", "Array entries must be enumerable data properties");
          result.push(visit(descriptor.value, itemPath, depth + 1));
        }
        return result;
      }
      const keys = Reflect.ownKeys(value);
      if (keys.length > STUDIO_VALIDATION_LIMITS.maxObjectKeys) fail(path, "OBJECT_LIMIT", "Object exceeds 128 keys");
      const result: JsonObject = {};
      for (const key of keys) {
        if (typeof key !== "string") fail(path, "UNSAFE_KEY", "Symbol keys are not allowed");
        if (key.length > STUDIO_VALIDATION_LIMITS.maxStringLength) fail(path, "STRING_LIMIT", "Object key exceeds 16,384 characters");
        const itemPath = childPath(path, key);
        text(key, itemPath);
        if (forbiddenKeys.has(key)) fail(itemPath, "UNSAFE_KEY", "Prototype-related keys are not allowed");
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) fail(itemPath, "UNSAFE_PROPERTY", "Expected an enumerable data property, not an accessor");
        result[key] = visit(descriptor.value, itemPath, depth + 1);
      }
      return result;
    } finally {
      ancestors.delete(value);
    }
  };
  try {
    return visit(input, "$", 0);
  } catch (error) {
    if (error instanceof StudioValidationError) throw error;
    return fail("$", "UNSAFE_VALUE", "Input could not be safely inspected");
  }
}

type Parser<T> = (value: unknown, path: string) => T;
type Shape<T> = { [K in keyof T]-?: Parser<T[K]> };

function object<T extends object>(shape: Shape<T>): Parser<T> {
  return (value, path) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail(path, "EXPECTED_OBJECT", "Expected an object");
    const record = value as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      if (!Object.hasOwn(shape, key)) fail(childPath(path, key), "UNKNOWN_KEY", "Unknown field");
    }
    const result = {} as T;
    for (const key of Object.keys(shape) as (keyof T & string)[]) {
      if (!Object.hasOwn(record, key)) fail(childPath(path, key), "REQUIRED", "Required field is missing");
      result[key] = shape[key](record[key], childPath(path, key));
    }
    return result;
  };
}

function string(max = 16_384, nonempty = false): Parser<string> {
  return (value, path) => {
    if (typeof value !== "string") fail(path, "EXPECTED_STRING", "Expected a string");
    if (value.length > max || (nonempty && !value.trim())) fail(path, "INVALID_STRING", `Expected ${nonempty ? "nonblank " : ""}text of at most ${max} characters`);
    return value;
  };
}

function number(min: number, max: number, integer = false): Parser<number> {
  return (value, path) => {
    if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isSafeInteger(value))) fail(path, "NUMBER_RANGE", `Expected ${integer ? "an integer" : "a finite number"} from ${min} to ${max}`);
    return value;
  };
}

function enumeration<const T extends readonly string[]>(choices: T): Parser<T[number]> {
  return (value, path) => {
    if (typeof value !== "string" || !choices.includes(value)) fail(path, "INVALID_ENUM", `Expected one of: ${choices.join(", ")}`);
    return value;
  };
}

function nullable<T>(parse: Parser<T>): Parser<T | null> {
  return (value, path) => value === null ? null : parse(value, path);
}

function array<T>(parse: Parser<T>, key?: (item: T) => string, max = 2_048): Parser<T[]> {
  return (value, path) => {
    if (!Array.isArray(value)) fail(path, "EXPECTED_ARRAY", "Expected an array");
    if (value.length > max) fail(path, "ARRAY_LIMIT", `Expected at most ${max} entries`);
    const seen = new Set<string>();
    return value.map((entry, index) => {
      const itemPath = `${path}[${index}]`;
      const item = parse(entry, itemPath);
      if (key) {
        const identity = key(item);
        if (seen.has(identity)) fail(itemPath, "DUPLICATE", "Duplicate entry");
        seen.add(identity);
      }
      return item;
    });
  };
}

function checked<T>(parse: Parser<T>, check: (value: T, path: string) => void): Parser<T> {
  return (input, path) => {
    const value = parse(input, path);
    check(value, path);
    return value;
  };
}

const bool: Parser<boolean> = (value, path) => typeof value === "boolean" ? value : fail(path, "EXPECTED_BOOLEAN", "Expected a boolean");
const version: Parser<1> = (value, path) => value === 1 ? 1 : fail(path, "SCHEMA_VERSION", "Only schema version 1 is supported");
const positiveInteger = number(1, Number.MAX_SAFE_INTEGER, true);
const currency: Parser<string> = (value, path) => typeof value === "string" && /^[A-Z]{3}$/.test(value) ? value : fail(path, "INVALID_CURRENCY", "Expected a three-letter uppercase currency code");
const hash: Parser<ContentHash> = (value, path) => typeof value === "string" && /^[0-9a-f]{64}$/.test(value) ? value : fail(path, "INVALID_HASH", "Expected a lowercase 64-character SHA-256 hash");
const timestamp: Parser<Timestamp> = (value, path) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) fail(path, "INVALID_TIMESTAMP", "Expected a full ISO UTC timestamp ending in Z");
  const time = Date.parse(value);
  const normalized = value.includes(".") ? value : value.replace("Z", ".000Z");
  if (!Number.isFinite(time) || new Date(time).toISOString() !== normalized) fail(path, "INVALID_TIMESTAMP", "Timestamp is not a real UTC date and time");
  return value;
};

const entityKinds: readonly EntityKind[] = ["project", "sequence", "shot", "asset", "character", "environment", "rig", "generation", "render", "qc", "approval", "prompt", "model", "cost", "job", "event"];
function id<K extends EntityKind>(kind: K): Parser<StudioId<K>> {
  return (value, path) => typeof value === "string" && value.length <= 128 && new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`).test(value)
    ? value as StudioId<K> : fail(path, "INVALID_ID", `Expected ${kind}_ followed by lowercase ASCII letters, digits and single underscores (at most 128 characters)`);
}
const anyId: Parser<StudioId> = (value, path) => {
  if (typeof value !== "string") return fail(path, "INVALID_ID", "Expected a stable entity ID");
  const kind = value.split("_", 1)[0] as EntityKind;
  if (!entityKinds.includes(kind)) return fail(path, "INVALID_ID", "Unknown entity ID prefix");
  return id(kind)(value, path);
};
const textList = array(string(4_096, true), (value) => value);
const ids = <K extends EntityKind>(kind: K) => array(id(kind), (value) => value);
const methods = array(enumeration(PRODUCTION_METHODS), (value) => value);
const engines = array(enumeration(ENGINE_IDS), (value) => value);
const gates = array(enumeration(APPROVAL_GATES), (value) => value);
const approvalState = enumeration(["DRAFT", "PENDING", "APPROVED", "REJECTED"]);
const jsonObject: Parser<JsonObject> = (value, path) => value !== null && typeof value === "object" && !Array.isArray(value)
  ? value as JsonObject : fail(path, "EXPECTED_OBJECT", "Expected a JSON object");
const money = object<Money>({ currency, minorUnits: number(0, Number.MAX_SAFE_INTEGER, true) });
const assetRef = object<AssetRef>({ assetId: id("asset"), version: positiveInteger });
const refKey = (value: AssetRef) => `${value.assetId}@${value.version}`;
const refs = array(assetRef, refKey);
const metadata = object<AdapterMetadata>({
  adapterId: string(128, true), provider: nullable(string(256, true)), model: nullable(string(256, true)),
  providerJobId: nullable(string(512, true)), externalGenerationId: nullable(string(512, true)), settings: jsonObject,
});

const provenance = checked(object<Provenance>({
  adapterMetadata: nullable(metadata), promptId: nullable(id("prompt")), negativePrompt: nullable(string()),
  referenceAssets: refs, timestamp, cost: money, contentHash: hash, parentAssets: refs,
  jobId: nullable(id("job")), approvalState, rejectionReason: nullable(string(4_096, true)),
}), (value, path) => {
  if ((value.approvalState === "REJECTED") !== (value.rejectionReason !== null)) fail(childPath(path, "rejectionReason"), "REJECTION_REASON", "A rejection reason is required exactly when the asset is rejected");
});

const project = object<StudioProject>({
  schemaVersion: version, projectId: id("project"), revision: positiveInteger, title: string(256, true),
  description: string(), createdAt: timestamp, currency,
});
const sequence = object<Sequence>({
  schemaVersion: version, sequenceId: id("sequence"), projectId: id("project"), title: string(256, true), shotIds: ids("shot"),
});
const shot = checked(object<ShotManifest>({
  schemaVersion: version, shotId: id("shot"), sequenceId: id("sequence"), projectId: id("project"), revision: positiveInteger,
  description: string(16_384, true), storyPurpose: string(4_096, true), duration: number(0.001, 3_600), fps: number(1, 240),
  resolution: object({ width: number(1, 16_384, true), height: number(1, 16_384, true) }),
  aspectRatio: object({ width: number(1, 16_384, true), height: number(1, 16_384, true) }),
  characters: ids("character"), environment: nullable(id("environment")), props: refs,
  camera: object({ framing: string(256, true), movement: string(1_024, true), lensMm: nullable(number(1, 2_000)) }),
  lighting: string(4_096, true), action: string(16_384, true),
  dialogue: array(object({ speaker: nullable(id("character")), text: string(4_096, true), startSeconds: number(0, 3_600), endSeconds: number(0, 3_600) }),
    (value) => JSON.stringify(value), 512),
  audio: refs, identityStrictness: enumeration(["FLEXIBLE", "CONSISTENT", "EXACT"]), continuityRequirements: textList,
  generationMethod: enumeration(PRODUCTION_METHODS), preferredEngine: nullable(enumeration(ENGINE_IDS)), fallbackEngine: nullable(enumeration(ENGINE_IDS)),
  sourceReferences: refs, inputAssets: refs, outputAssets: refs, dependencies: ids("shot"),
  status: enumeration(["DRAFT", "READY", "IN_PROGRESS", "BLOCKED", "COMPLETE"]), approvalState,
  costEstimate: money, actualCost: money, generationAttempts: ids("generation"), selectedVersion: nullable(assetRef), qcResults: ids("qc"), notes: textList,
}), (value, path) => {
  if (value.duration * value.fps < 1) fail(childPath(path, "duration"), "FRAME_DURATION", "Shot must last at least one frame at its fps");
  if (value.resolution.width * value.aspectRatio.height !== value.resolution.height * value.aspectRatio.width) fail(childPath(path, "aspectRatio"), "ASPECT_RATIO", "Aspect ratio must match the resolution");
  if (value.dependencies.includes(value.shotId)) fail(childPath(path, "dependencies"), "SELF_DEPENDENCY", "A shot cannot depend on itself");
  if (value.preferredEngine !== null && value.preferredEngine === value.fallbackEngine) fail(childPath(path, "fallbackEngine"), "DUPLICATE_ENGINE", "Fallback engine must differ from the preferred engine");
  if (value.costEstimate.currency !== value.actualCost.currency) fail(childPath(path, "actualCost"), "CURRENCY_MISMATCH", "Estimated and actual costs must use the same currency");
  value.dialogue.forEach((line, index) => {
    const linePath = `${childPath(path, "dialogue")}[${index}]`;
    if (line.startSeconds >= line.endSeconds || line.endSeconds > value.duration) fail(linePath, "DIALOGUE_TIME", "Dialogue must have positive duration and fit within the shot");
    if (line.speaker !== null && !value.characters.includes(line.speaker)) fail(childPath(linePath, "speaker"), "UNKNOWN_SPEAKER", "Dialogue speaker must be in the shot's character list");
  });
  const selectedVersion = value.selectedVersion;
  if (selectedVersion !== null && !value.outputAssets.some((ref) => refKey(ref) === refKey(selectedVersion))) fail(childPath(path, "selectedVersion"), "MISSING_SELECTED_OUTPUT", "Selected version must appear in outputAssets");
});

const asset = checked(object<Asset>({
  schemaVersion: version, assetId: id("asset"), projectId: id("project"), version: positiveInteger,
  sourcePath: string(2_048, true), contentHash: hash, assetType: enumeration(ASSET_TYPES), approvalState,
  provenance, dependencies: refs,
  rights: object({ status: enumeration(["UNKNOWN", "OWNED", "LICENSED", "PUBLIC_DOMAIN", "RESTRICTED"]), license: nullable(string(4_096, true)), evidence: nullable(string(4_096, true)) }),
  createdAt: timestamp, supersededBy: nullable(assetRef), lineage: refs,
}), (value, path) => {
  const provenancePath = childPath(path, "provenance");
  if (value.sourcePath !== resolveAssetPath(value.projectId, value, value.assetType, value.contentHash)) fail(childPath(path, "sourcePath"), "ASSET_PATH", "Asset path must bind its canonical project, ID, version and content hash");
  if (value.approvalState === "APPROVED" && !["OWNED", "LICENSED", "PUBLIC_DOMAIN"].includes(value.rights.status)) fail(childPath(path, "rights"), "RIGHTS_APPROVAL", "Approved assets require cleared ownership or licensing");
  if (value.rights.status === "LICENSED" && (!value.rights.license || !value.rights.evidence)) fail(childPath(path, "rights"), "LICENSE_EVIDENCE", "Licensed assets require license and evidence records");
  if (value.provenance.adapterMetadata?.adapterId === BLENDER_SOURCE_ADAPTER) {
    try { validateBlenderSourceAssetShape(value); } catch { fail(provenancePath, "BLENDER_SOURCE_PROVENANCE", "Native source descriptors require their exact document shape and no generation claim"); }
  } else if (isLocalFootageAsset(value)) {
    try { validateLocalFootageAsset(value); } catch { fail(provenancePath, "LOCAL_IMPORT_PROVENANCE", "Local footage must have exact import provenance without generation claims"); }
  } else if (value.provenance.adapterMetadata !== null && (!value.provenance.jobId || !value.provenance.promptId)) fail(provenancePath, "GENERATION_PROVENANCE", "Generated assets require a job and prompt reference");
  if (value.contentHash !== value.provenance.contentHash) fail(childPath(provenancePath, "contentHash"), "PROVENANCE_MISMATCH", "Provenance hash must match asset contentHash");
  if (value.approvalState !== value.provenance.approvalState) fail(childPath(provenancePath, "approvalState"), "PROVENANCE_MISMATCH", "Provenance approval state must match the asset");
  if (value.createdAt !== value.provenance.timestamp) fail(childPath(provenancePath, "timestamp"), "PROVENANCE_MISMATCH", "Provenance timestamp must match createdAt");
  const referenceGroups: [string, AssetRef[]][] = [
    [childPath(path, "dependencies"), value.dependencies], [childPath(path, "lineage"), value.lineage],
    [childPath(provenancePath, "parentAssets"), value.provenance.parentAssets], [childPath(provenancePath, "referenceAssets"), value.provenance.referenceAssets],
  ];
  for (const [fieldPath, references] of referenceGroups) {
    if (references.some((ref) => ref.assetId === value.assetId && ref.version >= value.version)) fail(fieldPath, "SELF_DEPENDENCY", "An asset may only reference its own earlier versions as inputs or lineage");
  }
  if (value.supersededBy !== null && (value.supersededBy.assetId !== value.assetId || value.supersededBy.version <= value.version)) fail(childPath(path, "supersededBy"), "INVALID_SUCCESSOR", "Successor must be a later version of the same asset");
});

const character = object<Character>({ schemaVersion: version, characterId: id("character"), projectId: id("project"), name: string(256, true), identityAssets: refs, rigId: nullable(id("rig")) });
const environment = object<Environment>({ schemaVersion: version, environmentId: id("environment"), projectId: id("project"), name: string(256, true), assets: refs });
const rig = object<Rig>({ schemaVersion: version, rigId: id("rig"), projectId: id("project"), assets: refs, compatibleMethods: methods });
const generation = object<Generation>({ schemaVersion: version, generationId: id("generation"), shotId: id("shot"), jobId: id("job"), promptId: id("prompt"), modelId: id("model"), outputs: refs, adapterMetadata: nullable(metadata) });
const render = object<Render>({ schemaVersion: version, renderId: id("render"), shotId: id("shot"), jobId: id("job"), inputs: refs, outputs: refs, settings: jsonObject, adapterMetadata: nullable(metadata) });
const qc = object<QCResult>({ schemaVersion: version, qcId: id("qc"), projectId: id("project"), subject: assetRef, rule: string(256, true), result: enumeration(["PASS", "FAIL", "REVIEW"]), details: string(), createdAt: timestamp });
const approval = checked(object<Approval>({
  schemaVersion: version, approvalId: id("approval"), projectId: id("project"), gate: enumeration(APPROVAL_GATES), subjectHash: hash,
  state: enumeration(["PENDING", "APPROVED", "REJECTED"]), actor: string(256, true), reason: string(4_096), createdAt: timestamp, decidedAt: nullable(timestamp),
}), (value, path) => {
  if ((value.state === "PENDING") !== (value.decidedAt === null)) fail(childPath(path, "decidedAt"), "APPROVAL_TIME", "Pending approvals have no decision time; decided approvals require one");
  if (value.decidedAt !== null && Date.parse(value.decidedAt) < Date.parse(value.createdAt)) fail(childPath(path, "decidedAt"), "TIME_ORDER", "Decision cannot precede the request");
  if (value.state === "REJECTED" && !value.reason.trim()) fail(childPath(path, "reason"), "REJECTION_REASON", "Rejected approvals require a reason");
});
const prompt = object<Prompt>({ schemaVersion: version, promptId: id("prompt"), version: positiveInteger, text: string(16_384, true), negativePrompt: nullable(string()), references: refs });
const model = object<Model>({ schemaVersion: version, modelId: id("model"), name: string(256, true), methods, adapterMetadata: nullable(metadata) });
const costRecord = object<CostRecord>({ schemaVersion: version, costId: id("cost"), projectId: id("project"), shotId: nullable(id("shot")), jobId: id("job"), kind: enumeration(["RESERVED", "ACTUAL", "RELEASED"]), amount: money, createdAt: timestamp });
const externalActions = array(enumeration(["EXTERNAL_GENERATION", "PAID_GENERATION", "ADOBE_AUTOMATION", "BLENDER_RENDER"]), (value) => value);
const job = checked(object<Job>({
  schemaVersion: version, jobId: id("job"), type: enumeration(["ESTIMATE", "GENERATION", "ANIMATION", "RENDER", "COMPOSITE", "EDIT", "AUDIO", "DELIVERY", "QC"]),
  projectId: id("project"), shotId: nullable(id("shot")), dependencies: ids("job"), state: enumeration(JOB_STATES), attempt: number(0, 100, true), maxAttempts: number(1, 100, true),
  createdAt: timestamp, startedAt: nullable(timestamp), finishedAt: nullable(timestamp), adapterMetadata: nullable(metadata), inputs: refs, outputs: refs,
  error: nullable(object({ code: string(128, true), message: string(4_096, true), retryable: bool })), checkpoint: jsonObject,
  costEstimate: money, actualCost: money, externalActions, requiredGates: gates, approvalSubjectHash: hash,
  dispatch: nullable(object({ token: string(256, true), state: enumeration(["INTENT_RECORDED", "ACKNOWLEDGED", "COMPLETED"]), recordedAt: timestamp })),
}), (value, path) => {
  if (value.dependencies.includes(value.jobId)) fail(childPath(path, "dependencies"), "SELF_DEPENDENCY", "A job cannot depend on itself");
  if (value.attempt > value.maxAttempts) fail(childPath(path, "attempt"), "ATTEMPT_LIMIT", "Attempt exceeds maxAttempts");
  if (["QUEUED", "WAITING_APPROVAL"].includes(value.state) && (value.attempt !== 0 || value.startedAt !== null || value.dispatch !== null)) fail(path, "JOB_NOT_STARTED", "Queued and approval-waiting jobs must have zero attempts, no start time and no dispatch; Phase 0 does not retry jobs");
  const terminal = ["SUCCEEDED", "FAILED", "CANCELLED"].includes(value.state);
  if (terminal !== (value.finishedAt !== null)) fail(childPath(path, "finishedAt"), "JOB_TIME", "Exactly terminal jobs must have a finishedAt timestamp");
  if (["RUNNING", "WAITING_EXTERNAL", "SUCCEEDED", "FAILED"].includes(value.state) && (value.startedAt === null || value.attempt < 1)) fail(childPath(path, "startedAt"), "JOB_START", "Started job states require startedAt and at least one attempt");
  if ((value.startedAt === null) !== (value.attempt === 0)) fail(childPath(path, "attempt"), "JOB_ATTEMPT", "An attempt count is required exactly when the job has started");
  if (value.startedAt !== null && Date.parse(value.startedAt) < Date.parse(value.createdAt)) fail(childPath(path, "startedAt"), "TIME_ORDER", "Start cannot precede creation");
  if (value.finishedAt !== null && Date.parse(value.finishedAt) < Date.parse(value.startedAt ?? value.createdAt)) fail(childPath(path, "finishedAt"), "TIME_ORDER", "Finish cannot precede creation or start");
  if (value.state === "FAILED" && value.error === null) fail(childPath(path, "error"), "MISSING_FAILURE", "Failed jobs require error details");
  if (value.state === "SUCCEEDED" && value.error !== null) fail(childPath(path, "error"), "SUCCESS_ERROR", "Succeeded jobs cannot retain an error");
  if (value.costEstimate.currency !== value.actualCost.currency) fail(childPath(path, "actualCost"), "CURRENCY_MISMATCH", "Estimated and actual costs must use the same currency");
  if (value.dispatch !== null) {
    const dispatchPath = childPath(path, "dispatch");
    if (value.startedAt === null || value.attempt === 0) fail(dispatchPath, "DISPATCH_START", "A dispatch requires a started attempt");
    if (Date.parse(value.dispatch.recordedAt) < Date.parse(value.startedAt)) fail(childPath(dispatchPath, "recordedAt"), "TIME_ORDER", "Dispatch cannot precede start");
    if (value.finishedAt !== null && Date.parse(value.dispatch.recordedAt) > Date.parse(value.finishedAt)) fail(childPath(dispatchPath, "recordedAt"), "TIME_ORDER", "Dispatch cannot follow finish");
    if (value.dispatch.state === "COMPLETED" && !terminal) fail(dispatchPath, "DISPATCH_STATE", "Completed dispatches require a terminal job state");
    if (value.state === "SUCCEEDED" && value.dispatch.state !== "COMPLETED") fail(dispatchPath, "DISPATCH_STATE", "Succeeded jobs must complete any recorded dispatch");
  }
});
const event = checked(object<ProductionEvent>({
  schemaVersion: version, eventId: id("event"), projectId: id("project"), sequence: positiveInteger, type: enumeration(EVENT_TYPES),
  timestamp, actor: string(256, true), subjectId: anyId, details: jsonObject, previousHash: nullable(hash), eventHash: hash,
}), (value, path) => {
  if ((value.sequence === 1) !== (value.previousHash === null)) fail(childPath(path, "previousHash"), "EVENT_CHAIN", "Only the first event must have no previous hash");
});
const executionPolicy = object<ExternalExecutionPolicy>({ externalGenerationEnabled: bool, paidGenerationEnabled: bool, adobeAutomationEnabled: bool, blenderRenderEnabled: bool });
const costPolicy = checked(object<CostPolicy>({ MAX_SHOT_GENERATION_COST: money, MAX_PROJECT_GENERATION_COST: money, MAX_ATTEMPTS_PER_SHOT: number(1, 100, true) }), (value, path) => {
  if (value.MAX_SHOT_GENERATION_COST.currency !== value.MAX_PROJECT_GENERATION_COST.currency) fail(path, "CURRENCY_MISMATCH", "Shot and project cost limits must use the same currency");
  if (value.MAX_SHOT_GENERATION_COST.minorUnits > value.MAX_PROJECT_GENERATION_COST.minorUnits) fail(path, "COST_LIMIT", "Shot limit cannot exceed project limit");
});
const decision = object<Decision>({ status: enumeration(["ALLOWED", "REQUIRES_APPROVAL", "BLOCKED"]), reasons: textList });
const capability = object<CapabilityObservation>({ engine: enumeration(ENGINE_IDS), availability: enumeration(["AVAILABLE", "UNAVAILABLE", "UNKNOWN"]), evidence: string(4_096, true), checkedAt: timestamp, methods });
const routing = checked(object<RoutingResult>({ selectedMethod: enumeration(PRODUCTION_METHODS), selectedEngines: engines, fallbacks: engines, reasoningCodes: textList, requirements: textList, blockedCapabilities: engines, status: enumeration(["READY", "BLOCKED"]), priority: number(0, 1_000, true) }), (value, path) => {
  if (value.selectedEngines.some((engine: EngineId) => value.fallbacks.includes(engine) || value.blockedCapabilities.includes(engine))) fail(path, "ROUTING_CONFLICT", "Selected engines cannot also be fallback or blocked engines");
  if (value.status === "READY" && value.selectedEngines.length === 0) fail(path, "ROUTING_EMPTY", "Ready routes require a selected engine");
});
const adapterRequest = object<AdapterRequest>({ job, idempotencyToken: string(256, true), policy: executionPolicy });
const adapterResult = object<AdapterResult>({ status: enumeration(["WAITING_EXTERNAL", "SUCCEEDED", "FAILED", "BLOCKED"]), outputs: refs, adapterMetadata: nullable(metadata), reasons: textList });

const validate = <T>(parse: Parser<T>, value: unknown): T => parse(snapshot(value), "$");
export const validateShotManifest = (value: unknown): ShotManifest => validate(shot, value);
export const validateAssetManifest = (value: unknown): Asset => validate(asset, value);
export const validateStudioProject = (value: unknown): StudioProject => validate(project, value);
export const validateSequence = (value: unknown): Sequence => validate(sequence, value);
export const validateJob = (value: unknown): Job => validate(job, value);
export const validateApproval = (value: unknown): Approval => validate(approval, value);
export const validateQCResult = (value: unknown): QCResult => validate(qc, value);
export const validateProductionEvent = (value: unknown): ProductionEvent => validate(event, value);
export const validateCharacter = (value: unknown): Character => validate(character, value);
export const validateEnvironment = (value: unknown): Environment => validate(environment, value);
export const validateRig = (value: unknown): Rig => validate(rig, value);
export const validateGeneration = (value: unknown): Generation => validate(generation, value);
export const validateRender = (value: unknown): Render => validate(render, value);
export const validatePrompt = (value: unknown): Prompt => validate(prompt, value);
export const validateModel = (value: unknown): Model => validate(model, value);
export const validateCostRecord = (value: unknown): CostRecord => validate(costRecord, value);
export const validateProvenance = (value: unknown): Provenance => validate(provenance, value);
export const validateAssetRef = (value: unknown): AssetRef => validate(assetRef, value);
export const validateMoney = (value: unknown): Money => validate(money, value);
export const validateAdapterMetadata = (value: unknown): AdapterMetadata => validate(metadata, value);
export const validateExternalExecutionPolicy = (value: unknown): ExternalExecutionPolicy => validate(executionPolicy, value);
export const validateCostPolicy = (value: unknown): CostPolicy => validate(costPolicy, value);
export const validateDecision = (value: unknown): Decision => validate(decision, value);
export const validateCapabilityObservation = (value: unknown): CapabilityObservation => validate(capability, value);
export const validateRoutingResult = (value: unknown): RoutingResult => validate(routing, value);
export const validateAdapterRequest = (value: unknown): AdapterRequest => validate(adapterRequest, value);
export const validateAdapterResult = (value: unknown): AdapterResult => validate(adapterResult, value);
export const validateJsonObject = (value: unknown): JsonObject => validate(jsonObject, value);
export const cloneStudioJson = (value: unknown): JsonValue => snapshot(value);
