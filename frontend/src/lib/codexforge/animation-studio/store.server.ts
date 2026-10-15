import "server-only";
import { randomBytes } from "node:crypto";
import { realpathSync } from "node:fs";
import { CODEXFORGE_PROJECT_ROOT } from "@/lib/codexforge/server-safe-paths";
import { openCreatorNativeRoot, type CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { hashJarvisChatCanonicalJson as digest, hashJarvisChatSha256 as sha, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { Approval, Asset, AssetRef, Character, CostPolicy, CostRecord, Environment, ExternalExecutionPolicy, Job, JsonObject, JsonValue, Model, ProductionEvent, ProductionEventType, Prompt, QCResult, Rig, Sequence, ShotManifest, StudioId, StudioProject } from "./domain";
import { PROJECT_DIRECTORIES, assertStudioId, resolveAssetPath, resolveStudioPath } from "./workspace";
import { sampleSequence, sampleShot } from "./sample";
import { DEFAULT_EXTERNAL_EXECUTION_POLICY, REQUIRED_JOB_GATES, evaluateApprovalGates, evaluateCostPolicy, evaluateExternalExecution, routeShot } from "./policies";
import type { CapabilityObservation } from "./domain";
import { cloneStudioJson, STUDIO_VALIDATION_LIMITS, validateApproval, validateAssetManifest, validateCharacter, validateCostRecord, validateEnvironment, validateJob, validateModel, validateProductionEvent, validatePrompt, validateQCResult, validateRig, validateSequence, validateShotManifest, validateStudioProject } from "./validation";
import { estimateMoney, intentAssert, intentTime, isManagedProviderJob, providerAuthorizationScope, providerCheckpoint, readProviderIntent, type HiggsfieldIntent, type PrepareProviderJobInput } from "./higgsfield-intent";
import { buildHiggsfieldRequest, validateHiggsfieldRequest, validateHiggsfieldStatus, type HiggsfieldStatus } from "./higgsfield-contract.server";
import { ESTIMATE_ENDPOINT, LIVE_ESTIMATE_AUTHORIZATION_TTL_MS, liveEstimateAuthorization, type LiveEstimateAuthorization, estimateAuthorizationScope, estimateCheckpoint, estimateOperationDigest, isEstimateJob, readEstimateIntent, type EstimateIntent, type EstimateOutcome } from "./higgsfield-estimate-intent";
import { assertFootageCollection, FootageValidationError, footageImportMediaType, inspectStudioMp4, isLocalFootageAsset, isQualifiedLocalMediaAsset, localFootageByteLength, localFootageStorageBinding, localMediaTechnicalMetadata, STUDIO_FOOTAGE_ADAPTER, STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES, STUDIO_FOOTAGE_PROJECT_MAX_BYTES, STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS, STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, validateFootageImport } from "./footage-contract";
import { createStudioFootageLibrary, StudioFootageLibraryError, type StudioFootageLibrary, type StudioFootagePublicationFence } from "./footage-library.server";
import { openStudioFootageSource, STUDIO_FOOTAGE_CHUNK_BYTES, writeStudioFootageSource } from "./footage-storage.server";
import type { StagedStudioMediaImport } from "./footage-import.server";
import { readStudioEditorial, saveStudioEditorial } from "./editorial-store.server";
import { EditorialV2StoreError, migrateStudioEditorialV2, inspectStudioEditorialV2WorkingCopy, readStudioEditorialV2Composition, editStudioEditorialV2Layer, editStudioEditorialV2CompositionDuration, navigateStudioEditorialV2History, auditStudioEditorialV2History, admitStudioEditorialV2DerivedTake } from "./editorial-v2-store.server";
import { readStudioRenderConfiguration } from "./editorial-v2-render-config.server";
import { buildStudioEditorialRenderSpec, STUDIO_RENDER_PRESET_ID, type StudioRenderSource, type StudioRenderSourceDescriptor } from "./editorial-v2-render-contract";
import { createStudioRenderJob, inspectStudioRenderLedger, studioEditorialV2HeadPath } from "./editorial-v2-render-ledger.server";
import { cancelStudioRenderExecution, executeStudioRenderJob, reconcileStudioRenderLedger } from "./editorial-v2-render-executor.server";
import { openStudioRenderOutput } from "./editorial-v2-render-output-storage.server";
import type { StudioRenderCancelRequest, StudioRenderRepositoryInspection, StudioRenderStartRequest } from "./editorial-v2-render-http.server";
import { readCachedStudioRenderSourceDescriptor } from "./editorial-v2-render-source-cache.server";
import { assertStudioCompatibilityImportAllowed, readStudioCompatibilityBinding } from "./readonly-compatibility-binding.server";
import { BLENDER_SOURCE_ADAPTER, BLENDER_RENDER_ADAPTER, blenderCheckpoint, blenderFail, isBlenderJob, isBlenderSourceAsset, validateBlenderSourceDescriptor, validateBlenderRenderSettings, validateBlenderProgress, type BlenderSourceDescriptor, type BlenderRenderSettings, type BlenderExecution, type BlenderProgress } from "./blender-source-contract";
import { readBlenderJob, validateBlenderSourceAsset } from "./blender-source-identity.server";
import { retainBlenderEditorialBaseline } from "./blender-source-store.server";
import { blenderEditCheckpoint, isBlenderEditJob, validateBlenderEditProposal, validateBlenderMaterialVerification, type BlenderEditExecution, type BlenderEditProposal, type BlenderMaterialVerification } from "./blender-edit-contract";
import { readBlenderEditJob } from "./blender-edit-identity.server";
import { blenderArchivePath, compactBlenderEvent, resolveBlenderJournalEvent, resolveBlenderJournalResult, writeBlenderJournalRecords, type BlenderJournalRecords } from "./blender-record-journal.server";

export type Definition = Character | Environment | Rig | Prompt | Model;
export interface StudioSnapshot {
  schemaVersion: 1; project: StudioProject; sequences: Sequence[]; shots: ShotManifest[]; assets: Asset[]; definitions: Definition[];
  jobs: Job[]; approvals: Approval[]; qcResults: QCResult[]; costs: CostRecord[]; events: ProductionEvent[];
  receipts: { keyHash: string; requestDigest: string; result: StudioResult }[]; recordDigest: string;
  blenderHistoryArchive?: { format: "studio-blender-history-archive-v1"; sha256: string; byteLength: number; originalRecordDigest: string; originalRevision: number; jobId: StudioId<"job">; at: string };
}
export interface BlenderRecoveryAuthorization { projectId: StudioId<"project">; jobId: StudioId<"job">; expectedSnapshotSha256: string }
export interface StudioResult { status: "APPLIED" | "BLOCKED"; code: string; revision: number; value: JsonValue }
export interface StudioMediaAvailability extends AssetRef { status: "ONLINE" | "OFFLINE"; reason: "VERIFIED_BYTES" | "VERIFIED_INDEX" | "UNAVAILABLE_OR_INTEGRITY_FAILED" }
export interface StudioAssetReader {
  readonly byteLength: number;
  readonly contentHash: string;
  read(offset: number, length: number): Buffer;
  close(): void;
}
export class StudioStoreError extends Error { constructor(readonly code: string, message: string) { super(message); this.name = "StudioStoreError"; } }
const MAX_RECORD_BYTES = 1_048_576;
/** Validator units are UTF-16 code units, including keys; serialized UTF-8 bytes are separate. */
export function measureStudioRecordCapacity(value: unknown) {
  let nodes = 0, textCharacters = 0, depth = 0;
  const visit = (item: unknown, level: number): void => {
    nodes++; depth = Math.max(depth, level);
    if (typeof item === "string") textCharacters += item.length;
    else if (Array.isArray(item)) item.forEach(child => visit(child, level + 1));
    else if (item && typeof item === "object") for (const [key, child] of Object.entries(item)) { textCharacters += key.length; visit(child, level + 1); }
  };
  visit(value, 0);
  return { textCharacters, bytes: Buffer.byteLength(canonical(value)), nodes, depth, limits: { ...STUDIO_VALIDATION_LIMITS, maxBytes: MAX_RECORD_BYTES } };
}
const fail = (code: string, message: string): never => { throw new StudioStoreError(code, message); };
const copy = <T>(value: T): T => JSON.parse(canonical(value)) as T;
const json = (value: unknown): JsonValue => cloneStudioJson(value);
const jsonObject = (value: unknown): JsonObject => { const item = json(value); if (!item || Array.isArray(item) || typeof item !== "object") return fail("INVALID_RECORD", "Expected JSON object."); return item; };
function checkTime(value: string): void { if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) fail("INVALID_TIME", "Expected exact UTC millisecond timestamp."); }
function checkKey(key: string): void { if (!/^[a-zA-Z0-9_-]{8,128}$/u.test(key)) fail("INVALID_KEY", "Idempotency key must be 8–128 safe characters."); }
function withoutDigest(record: StudioSnapshot): Omit<StudioSnapshot, "recordDigest"> { const { recordDigest: omitted, ...value } = record; void omitted; return value; }
function assetKey(ref: AssetRef): string { return `${ref.assetId}@${ref.version}`; }
function localMediaIdentity(value: { projectId: StudioId<"project">; shotId: StudioId<"shot">; mediaType: "VIDEO" | "AUDIO"; originalName: string; sourceLabel: string }): string {
  return digest({ format: "studio-local-media-logical-identity-v1", projectId: value.projectId, shotId: value.shotId, mediaType: value.mediaType,
    originalName: value.originalName.normalize("NFC").toLowerCase(), sourceLabel: value.sourceLabel.normalize("NFC").toLowerCase() });
}
function snapshotApprovalScope(state: StudioSnapshot): string { return digest({ projectId: state.project.projectId, projectMetadata: { title: state.project.title, description: state.project.description, currency: state.project.currency }, sequences: state.sequences, shots: state.shots, assets: state.assets, definitions: state.definitions }); }
const PROVIDER_CLAIM_PATH = ["studio", "higgsfield-single-test-claim.json"];
const ESTIMATE_CLAIM_PATH = ["studio", "higgsfield-estimate-single-test-claim.json"];
export interface ProviderSubmissionAcquisition { acquired: boolean; token: string | null; job: Job; reason: string }
/** Bounded container inspection only. A second QC record explicitly requires decoding/human review. */
function assertMockMp4Structure(bytes: Buffer, contentType: string): void {
  intentAssert(contentType === "video/mp4" && bytes.length >= 32 && bytes.length <= MAX_RECORD_BYTES, "Nonempty bounded MP4 bytes required.");
  type Box = { type: string; start: number; end: number };
  let count = 0;
  const boxes = (start: number, end: number): Box[] => {
    const values: Box[] = [];
    while (start < end) {
      intentAssert(end - start >= 8 && ++count <= 512, "Malformed or excessive MP4 boxes.");
      const size = bytes.readUInt32BE(start), type = bytes.toString("ascii", start + 4, start + 8);
      intentAssert(size >= 8 && start + size <= end && /^[a-z0-9 ]{4}$/iu.test(type), "Invalid MP4 box boundary.");
      values.push({ type, start: start + 8, end: start + size }); start += size;
    }
    intentAssert(start === end, "Trailing MP4 bytes."); return values;
  };
  const one = (values: Box[], type: string): Box => { const matches = values.filter(box => box.type === type); intentAssert(matches.length === 1, `Exactly one ${type} box required.`); return matches[0]; };
  const root = boxes(0, bytes.length), ftyp = one(root, "ftyp"), moov = one(root, "moov"), mdat = one(root, "mdat");
  intentAssert(ftyp.end - ftyp.start >= 8 && ["isom", "iso2", "mp41", "mp42", "avc1"].includes(bytes.toString("ascii", ftyp.start, ftyp.start + 4)) && mdat.end > mdat.start, "Unsupported MP4 brand or empty media data.");
  const movie = boxes(moov.start, moov.end), mvhd = one(movie, "mvhd"), trak = one(movie, "trak");
  intentAssert(mvhd.end - mvhd.start >= 100 && bytes[mvhd.start] === 0 && bytes.readUInt32BE(mvhd.start + 12) > 0 && bytes.readUInt32BE(mvhd.start + 16) > 0, "Missing movie timing metadata.");
  const track = boxes(trak.start, trak.end), tkhd = one(track, "tkhd"), mdia = one(track, "mdia");
  intentAssert(tkhd.end - tkhd.start >= 84 && bytes[tkhd.start] === 0 && bytes.readUInt32BE(tkhd.start + 76) > 0 && bytes.readUInt32BE(tkhd.start + 80) > 0, "Missing video dimensions.");
  const media = boxes(mdia.start, mdia.end), mdhd = one(media, "mdhd"), hdlr = one(media, "hdlr"), minf = one(media, "minf");
  intentAssert(mdhd.end - mdhd.start >= 24 && bytes[mdhd.start] === 0 && bytes.readUInt32BE(mdhd.start + 12) > 0 && bytes.readUInt32BE(mdhd.start + 16) > 0 && hdlr.end - hdlr.start >= 24 && bytes.toString("ascii", hdlr.start + 8, hdlr.start + 12) === "vide", "Missing timed video track.");
  const stbl = one(boxes(minf.start, minf.end), "stbl"), stsd = one(boxes(stbl.start, stbl.end), "stsd");
  intentAssert(stsd.end - stsd.start >= 8 && bytes.readUInt32BE(stsd.start) === 0 && bytes.readUInt32BE(stsd.start + 4) === 1, "One supported video sample description required.");
  const avc1 = one(boxes(stsd.start + 8, stsd.end), "avc1");
  intentAssert(avc1.end - avc1.start >= 78 && bytes.readUInt16BE(avc1.start + 24) > 0 && bytes.readUInt16BE(avc1.start + 26) > 0, "Missing bounded AVC sample dimensions.");
}
function hasAssets(state: StudioSnapshot, refs: AssetRef[]): void { for (const ref of refs) if (!state.assets.some(asset => assetKey(asset) === assetKey(ref))) fail("MISSING_ASSET", "Asset reference is not registered in this project."); }
function validateDefinition(value: unknown): Definition {
  const item = jsonObject(value);
  if ("characterId" in item) return validateCharacter(item);
  if ("environmentId" in item) return validateEnvironment(item);
  if ("rigId" in item) return validateRig(item);
  if ("promptId" in item) return validatePrompt(item);
  return validateModel(item);
}
function definitionId(value: Definition): StudioId { for (const field of ["characterId", "environmentId", "rigId", "promptId", "modelId"] as const) if (field in value) return (value as unknown as Record<string, StudioId>)[field]; return fail("INVALID_DEFINITION", "Definition identity missing."); }
function definitionReferences(state: StudioSnapshot, value: Definition): void {
  if ("identityAssets" in value) { hasAssets(state, value.identityAssets); if (value.rigId && !state.definitions.some(item => "rigId" in item && item.rigId === value.rigId)) fail("MISSING_RIG", "Character rig is not registered."); }
  if ("assets" in value) hasAssets(state, value.assets);
  if ("references" in value) hasAssets(state, value.references);
}

/** Size/depth before the existing duplicate-key parser prevents recursive parser exhaustion. */
export function parseStudioJson(text: string): unknown {
  if (Buffer.byteLength(text, "utf8") > MAX_RECORD_BYTES || text.charCodeAt(0) === 0xfeff) return fail("INVALID_JSON", "JSON exceeds the byte limit or begins with a BOM.");
  let depth = 0, quoted = false, escaped = false;
  for (const char of text) {
    if (quoted) { if (escaped) escaped = false; else if (char === "\\") escaped = true; else if (char === '"') quoted = false; }
    else if (char === '"') quoted = true;
    else if (char === "{" || char === "[") { if (++depth > 32) return fail("INVALID_JSON", "JSON nesting exceeds 32."); }
    else if (char === "}" || char === "]") depth--;
  }
  assertCreatorJsonHasUniqueObjectKeys(text);
  return JSON.parse(text) as unknown;
}
export function parseShotManifestJson(text: string): ShotManifest { return validateShotManifest(parseStudioJson(text)); }
export function parseAssetManifestJson(text: string): Asset { const asset = validateAssetManifest(parseStudioJson(text)); if (isBlenderSourceAsset(asset)) validateBlenderSourceAsset(asset); return asset; }

function validateSnapshot(input: unknown, root?: CreatorNativeRoot, pending?: BlenderJournalRecords): StudioSnapshot {
  const object = jsonObject(input);
  const keys = ["schemaVersion", "project", "sequences", "shots", "assets", "definitions", "jobs", "approvals", "qcResults", "costs", "events", "receipts", "recordDigest", ...(Object.hasOwn(object, "blenderHistoryArchive") ? ["blenderHistoryArchive"] : [])].sort();
  if (Object.keys(object).sort().join() !== keys.join() || object.schemaVersion !== 1) return fail("CORRUPT_STORE", "Invalid project aggregate shape/version.");
  for (const field of keys.filter(key => !["schemaVersion", "project", "recordDigest", "blenderHistoryArchive"].includes(key))) if (!Array.isArray(object[field]) || (object[field] as JsonValue[]).length > 1000) fail("CORRUPT_STORE", "Project collection is invalid or exceeds 1,000 entries.");
  const state = object as unknown as StudioSnapshot;
  if (state.recordDigest !== digest(withoutDigest(state))) return fail("CORRUPT_STORE", "Project record digest mismatch.");
  validateStudioProject(state.project);
  state.sequences.forEach(validateSequence); state.shots.forEach(validateShotManifest); state.assets.forEach(validateAssetManifest); state.definitions.forEach(validateDefinition);
  assertFootageCollection(state.assets);
  state.assets.filter(isBlenderSourceAsset).forEach(validateBlenderSourceAsset);
  state.jobs.forEach(validateJob); state.approvals.forEach(validateApproval); state.qcResults.forEach(validateQCResult); state.costs.forEach(validateCostRecord);
  state.jobs.filter(isBlenderJob).forEach(job => {
    const execution = readBlenderJob(job), source = state.assets.find(asset => assetKey(asset) === assetKey(execution.spec.source));
    if (!source || !isBlenderSourceAsset(source) || source.contentHash !== execution.spec.descriptorHash) fail("CORRUPT_STORE", "Native Blender job source binding differs.");
    if (job.state === "SUCCEEDED" && (job.outputs.length !== 1 || !state.assets.some(asset => assetKey(asset) === assetKey(job.outputs[0]) && asset.provenance.jobId === job.jobId && asset.provenance.adapterMetadata?.adapterId === BLENDER_RENDER_ADAPTER && asset.provenance.adapterMetadata.settings.specDigest === execution.specDigest))) fail("CORRUPT_STORE", "Native Blender output binding differs.");
  });
  state.jobs.filter(isBlenderEditJob).forEach(job => {
    const execution = readBlenderEditJob(job), source = state.assets.find(asset => assetKey(asset) === assetKey(execution.proposal.source));
    if (!source || !isBlenderSourceAsset(source) || source.contentHash !== execution.proposal.descriptorHash) fail("CORRUPT_STORE", "Native edit source binding differs.");
    if (execution.phase === "COMPLETED" && !state.assets.some(asset => execution.source && assetKey(asset) === assetKey(execution.source) && isBlenderSourceAsset(asset) && asset.lineage.length === 1 && assetKey(asset.lineage[0]) === assetKey(execution.proposal.source))) fail("CORRUPT_STORE", "Native edit version binding differs.");
  });
  const ids = new Set<string>();
  for (const entry of [...state.sequences, ...state.shots, ...state.assets, ...state.jobs, ...state.approvals, ...state.qcResults, ...state.costs]) {
    if (entry.projectId !== state.project.projectId) fail("CORRUPT_STORE", "Cross-project persisted reference.");
    const id = "assetId" in entry ? assetKey(entry) : "costId" in entry ? entry.costId : "qcId" in entry ? entry.qcId : "approvalId" in entry ? entry.approvalId : "jobId" in entry ? entry.jobId : "shotId" in entry ? entry.shotId : entry.sequenceId;
    if (typeof id !== "string" || ids.has(id)) fail("CORRUPT_STORE", "Duplicate persisted identity."); ids.add(id);
  }
  const definitionIds = new Set<string>();
  state.definitions.forEach(item => { const id = definitionId(item); if (definitionIds.has(id) || ("projectId" in item && item.projectId !== state.project.projectId)) fail("CORRUPT_STORE", "Invalid definition identity/project binding."); definitionIds.add(id); definitionReferences(state, item); });
  state.shots.forEach(shot => {
    if (shot.costEstimate.currency !== state.project.currency || shot.actualCost.currency !== state.project.currency) fail("CORRUPT_STORE", "Shot currency differs from its project.");
    if (!state.sequences.some(sequence => sequence.sequenceId === shot.sequenceId && sequence.shotIds.includes(shot.shotId))) fail("CORRUPT_STORE", "Shot/sequence binding missing.");
    hasAssets(state, [...shot.props, ...shot.audio, ...shot.sourceReferences, ...shot.inputAssets, ...shot.outputAssets, ...(shot.selectedVersion ? [shot.selectedVersion] : [])]);
    if ([...shot.characters, ...(shot.environment ? [shot.environment] : [])].some(id => !definitionIds.has(id))) fail("CORRUPT_STORE", "Shot definition binding missing.");
    if (shot.dependencies.some(id => !state.shots.some(item => item.shotId === id))) fail("CORRUPT_STORE", "Shot dependency missing.");
  });
  state.sequences.forEach(sequence => { if (sequence.shotIds.some(id => !state.shots.some(shot => shot.shotId === id && shot.sequenceId === sequence.sequenceId))) fail("CORRUPT_STORE", "Sequence/shot binding missing."); });
  state.assets.forEach(asset => { hasAssets(state, [...asset.lineage, ...asset.dependencies, ...asset.provenance.parentAssets, ...asset.provenance.referenceAssets]); if (asset.lineage.some(ref => ref.assetId === asset.assetId && ref.version >= asset.version)) fail("CORRUPT_STORE", "Asset lineage is not ancestral."); });
  state.jobs.forEach(job => { hasAssets(state, [...job.inputs, ...job.outputs]); if (job.costEstimate.currency !== state.project.currency || job.actualCost.currency !== state.project.currency || (job.shotId && !state.shots.some(shot => shot.shotId === job.shotId)) || job.dependencies.some(id => !state.jobs.some(item => item.jobId === id))) fail("CORRUPT_STORE", "Job currency/reference binding mismatch."); });
  state.jobs.filter(isManagedProviderJob).forEach(job => {
    const intent = readProviderIntent(job), shot = state.shots.find(item => item.shotId === job.shotId);
    intentAssert(shot, "Persisted provider shot is missing.");
    if (!shot || shot.sequenceId !== intent.request.sequenceId || shot.revision < intent.request.shotRevision || !state.definitions.some(item => "promptId" in item && item.promptId === intent.promptId && item.text === intent.request.input.prompt) || !state.definitions.some(item => "modelId" in item && item.modelId === intent.modelId && item.name === intent.request.model)) fail("CORRUPT_STORE", "Provider request definitions/shot differ.");
    for (const reference of intent.references) if (!state.assets.some(asset => assetKey(asset) === assetKey(reference) && asset.contentHash === reference.contentHash)) fail("CORRUPT_STORE", "Provider reference hash differs.");
    if (intent.generation) {
      if ((shot.revision === intent.request.shotRevision && !shot.generationAttempts.includes(intent.generation.generationId)) || digest(intent.generation.adapterMetadata) !== digest(job.adapterMetadata)) fail("CORRUPT_STORE", "Canonical generation/shot/provider binding differs.");
      for (const output of intent.generation.outputs) {
        const asset = state.assets.find(item => assetKey(item) === assetKey(output));
        if (!asset || asset.provenance.jobId !== job.jobId || asset.provenance.promptId !== intent.promptId || digest(asset.provenance.adapterMetadata) !== digest(job.adapterMetadata) || (shot.revision === intent.request.shotRevision && !shot.outputAssets.some(item => assetKey(item) === assetKey(output))) || !state.qcResults.some(qc => assetKey(qc.subject) === assetKey(output) && (shot.revision > intent.request.shotRevision || shot.qcResults.includes(qc.qcId)) && qc.rule === "MOCK_MP4_STRUCTURE_V1" && qc.result === "PASS")) fail("CORRUPT_STORE", "Canonical output/provenance/QC binding differs.");
      }
    }
  });
  state.jobs.filter(isEstimateJob).forEach(job => {
    const intent = readEstimateIntent(job), shot = state.shots.find(item => item.shotId === job.shotId);
    if (!shot || shot.sequenceId !== intent.request.sequenceId || shot.revision < intent.request.shotRevision || state.project.revision <= intent.preparedProjectRevision || !state.sequences.some(sequence => sequence.sequenceId === intent.request.sequenceId && sequence.shotIds.includes(shot.shotId)) || state.costs.some(cost => cost.jobId === job.jobId)) fail("CORRUPT_STORE", "Estimate identity/revision/spend binding differs.");
  });
  state.costs.forEach(cost => { if (cost.amount.currency !== state.project.currency || !state.jobs.some(job => job.jobId === cost.jobId && job.shotId === cost.shotId)) fail("CORRUPT_STORE", "Cost/job binding mismatch."); });
  state.qcResults.forEach(qc => hasAssets(state, [qc.subject]));
  let previous: string | null = null;
  state.events.forEach((event, index) => { validateProductionEvent(event); const original = root ? resolveBlenderJournalEvent(root, state.project.projectId, event, pending) : event; validateProductionEvent(original); const { eventHash, ...body } = original; if (event.projectId !== state.project.projectId || event.sequence !== index + 1 || event.previousHash !== previous || eventHash !== digest(body)) fail("CORRUPT_STORE", "Audit chain mismatch."); previous = eventHash; });
  if (state.events.length !== state.project.revision || state.receipts.length !== state.project.revision) fail("CORRUPT_STORE", "Revision, audit and idempotency counts disagree.");
  const receiptKeys = new Set<string>();
  state.receipts.forEach(receipt => {
    if (!receipt || Object.keys(receipt).sort().join() !== "keyHash,requestDigest,result" || !/^[a-f0-9]{64}$/u.test(receipt.keyHash) || !/^[a-f0-9]{64}$/u.test(receipt.requestDigest) || receiptKeys.has(receipt.keyHash) || !["APPLIED", "BLOCKED"].includes(receipt.result.status) || !Number.isSafeInteger(receipt.result.revision) || receipt.result.revision < 1 || receipt.result.revision > state.project.revision) fail("CORRUPT_STORE", "Invalid idempotency evidence.");
    if (root) {
      const resolved = resolveBlenderJournalResult(root, state.project.projectId, receipt.result, pending);
      if (resolved !== receipt.result) {
        const event = state.events[receipt.result.revision - 1], original = resolveBlenderJournalEvent(root, state.project.projectId, event, pending);
        if (canonical(event.details.result) !== canonical(receipt.result) || original.eventId !== `event_${digest({ projectId: state.project.projectId, keyHash: receipt.keyHash }).slice(0, 24)}` || receipt.requestDigest !== digest({ request: original.details.request, actor: original.actor, now: original.timestamp })) return fail("BLENDER_JOURNAL_INVALID", "Compact receipt does not bind its original request and audit event.");
      }
    }
    receiptKeys.add(receipt.keyHash);
  });
  if (state.blenderHistoryArchive) {
    const archive = state.blenderHistoryArchive;
    if (!root || Object.keys(archive).sort().join() !== "at,byteLength,format,jobId,originalRecordDigest,originalRevision,sha256" || archive.format !== "studio-blender-history-archive-v1" || !/^[a-f0-9]{64}$/u.test(archive.sha256) || !/^[a-f0-9]{64}$/u.test(archive.originalRecordDigest) || !Number.isSafeInteger(archive.originalRevision) || archive.originalRevision < 1 || archive.originalRevision > state.project.revision || !Number.isSafeInteger(archive.byteLength) || archive.byteLength < 1 || archive.byteLength > MAX_RECORD_BYTES) return fail("BLENDER_ARCHIVE_INVALID", "Native history archive binding is invalid.");
    checkTime(archive.at); assertStudioId(archive.jobId, "job");
    const bytes = pending?.get(archive.sha256) ?? root.readFile(blenderArchivePath(state.project.projectId, archive.sha256), MAX_RECORD_BYTES);
    if (bytes.length !== archive.byteLength || sha(bytes) !== archive.sha256) return fail("BLENDER_ARCHIVE_INVALID", "Native history archive bytes differ.");
    const decoded = parseStudioJson(bytes.toString("utf8"));
    if (!decoded || typeof decoded !== "object" || Array.isArray(decoded) || Object.hasOwn(decoded, "blenderHistoryArchive")) return fail("BLENDER_ARCHIVE_INVALID", "Nested or repeated archive transitions are not supported.");
    const original = validateSnapshot(decoded, root);
    if (original.blenderHistoryArchive || original.project.projectId !== state.project.projectId || original.project.revision !== archive.originalRevision || original.recordDigest !== archive.originalRecordDigest || canonical(original) !== bytes.toString("utf8") || !original.jobs.some(job => job.jobId === archive.jobId && isBlenderJob(job) && job.state === "RUNNING" && job.attempt === 1 && job.outputs.length === 0)) return fail("BLENDER_ARCHIVE_INVALID", "Native history archive lineage differs.");
    for (let index = 0; index < original.events.length; index++) if (canonical(resolveBlenderJournalEvent(root, state.project.projectId, state.events[index], pending)) !== canonical(resolveBlenderJournalEvent(root, state.project.projectId, original.events[index]))) return fail("BLENDER_ARCHIVE_INVALID", "Original audit history was changed.");
    for (let index = 0; index < original.receipts.length; index++) if (canonical({ ...state.receipts[index], result: resolveBlenderJournalResult(root, state.project.projectId, state.receipts[index].result, pending) }) !== canonical({ ...original.receipts[index], result: resolveBlenderJournalResult(root, state.project.projectId, original.receipts[index].result) })) return fail("BLENDER_ARCHIVE_INVALID", "Original idempotency evidence was changed.");
  }
  return state;
}

/** Explicit opt-in workspace; neither constructor nor import selects existing production data. */
export function openStudioRepository(options: ({ workspace: "development" } | { workspace: "test"; namespace: string }) & { mediaStorage?: "workspace" | "d-drive"; blenderRecovery?: BlenderRecoveryAuthorization }): StudioRepository {
  if (options.mediaStorage !== undefined && options.mediaStorage !== "workspace" && options.mediaStorage !== "d-drive") return fail("INVALID_MEDIA_STORAGE", "Select an explicit supported server media destination.");
  const mediaStorage = options.mediaStorage ?? "workspace";
  if (options.blenderRecovery && (options.workspace !== "test" || mediaStorage !== "workspace")) return fail("BLENDER_RECOVERY_NOT_AUTHORIZED", "Record recovery is limited to the explicitly bound isolated workspace.");
  let segments: string[];
  if (options.workspace === "development") segments = [".codexforge", "studio-development"];
  else if (options.workspace === "test" && /^[a-z0-9][a-z0-9-]{7,63}$/u.test(options.namespace)) segments = [".codexforge", "studio-tests", options.namespace];
  else return fail("INVALID_WORKSPACE", "Select an explicit development workspace or unique test namespace.");
  const compatibility = readStudioCompatibilityBinding(options.workspace === "development" ? { workspace: "development" } : { workspace: "test", namespace: options.namespace });
  const root = openCreatorNativeRoot(segments, "persistent");
  try {
    return new StudioRepository(
      root,
      createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: options.workspace === "development" ? { workspace: "development" } : { workspace: "test", namespace: options.namespace }, importDestination: mediaStorage }),
      digest({ format: "studio-render-repository-root-v2", projectRoot: realpathSync.native(CODEXFORGE_PROJECT_ROOT).replaceAll("\\", "/"), rootSegments: segments, mediaStorage, compatibilityBindingDigest: compatibility?.digest ?? null }),
      options.blenderRecovery ?? null,
    );
  } catch (error) { try { root.close(); } catch { /* Preserve the original construction failure. */ } throw error; }
}
type Change = { type: ProductionEventType; subjectId: StudioId; code: string; blocked?: boolean; value?: JsonValue; details?: JsonObject; beforePublish?: () => void | StudioFootagePublicationFence | null };

function appendOutcome(state: StudioSnapshot, keyHash: string, requestDigest: string, request: JsonObject, actor: string, now: string, outcome: Change, records: BlenderJournalRecords): StudioResult {
  const result: StudioResult = { status: outcome.blocked ? "BLOCKED" : "APPLIED", code: outcome.code, revision: state.project.revision, value: outcome.value ?? null };
  const body = { schemaVersion: 1 as const, eventId: `event_${digest({ projectId: state.project.projectId, keyHash }).slice(0, 24)}` as StudioId<"event">, projectId: state.project.projectId, sequence: state.project.revision, type: outcome.type, timestamp: now, actor, subjectId: outcome.subjectId, details: { request, result: json(result), ...(outcome.details ?? {}) }, previousHash: state.events.at(-1)?.eventHash ?? null };
  const event = { ...body, eventHash: digest(body) };
  if (outcome.details?.blenderOperation === true) {
    const compact = compactBlenderEvent(event); records.set(event.eventHash, compact.record);
    state.events.push(compact.event); state.receipts.push({ keyHash, requestDigest, result: compact.event.details.result as unknown as StudioResult });
  } else { state.events.push(event); state.receipts.push({ keyHash, requestDigest, result }); }
  return result;
}

/** Shared by actual publication and the pre-execution terminal-capacity proof. */
function blenderSuccess(state: StudioSnapshot, job: Job, execution: BlenderExecution, staged: Pick<StagedStudioMediaImport, "byteLength" | "contentHash" | "technical">, now: string) {
  const projectId = state.project.projectId, jobId = job.jobId, spec = execution.spec, frames = spec.settings.frameEnd - spec.settings.frameStart + 1;
  const ref: AssetRef = { assetId: `asset_blender_output_${digest({ projectId, jobId }).slice(0, 24)}`, version: 1 };
  if (state.assets.some(asset => asset.assetId === ref.assetId) || job.outputs.length) return blenderFail("BLENDER_OUTPUT_EXISTS");
  const metadata = { adapterId: BLENDER_RENDER_ADAPTER, provider: null, model: null, providerJobId: null, externalGenerationId: null, settings: { sourceLabel: "Local Blender preview", originalName: `${jobId}.mp4`, byteLength: staged.byteLength, contentType: "video/mp4", storage: "studio-footage-chunks-v1", acquisition: "SERVER_GENERATED_LOCAL_BLENDER_RENDER", technical: json(staged.technical), specDigest: execution.specDigest, descriptorHash: spec.descriptorHash, blendSha256: spec.blendSha256, dependenciesDigest: spec.dependenciesDigest, shotId: spec.shotId } };
  const asset = validateAssetManifest({ schemaVersion: 1, ...ref, projectId, sourcePath: resolveAssetPath(projectId, ref, "VIDEO", staged.contentHash), contentHash: staged.contentHash, assetType: "VIDEO", approvalState: "DRAFT", dependencies: [spec.source], rights: { status: "UNKNOWN", license: null, evidence: "Derived from the operator-designated native source. Creative and rights review remain required." }, createdAt: now, supersededBy: null, lineage: [], provenance: { adapterMetadata: metadata, promptId: null, negativePrompt: null, referenceAssets: [spec.source], timestamp: now, cost: { currency: state.project.currency, minorUnits: 0 }, contentHash: staged.contentHash, parentAssets: [spec.source], jobId, approvalState: "DRAFT", rejectionReason: null } });
  assertFootageCollection([...state.assets, asset]); state.assets.push(asset);
  state.qcResults.push(validateQCResult({ schemaVersion: 1, qcId: `qc_blender_${digest({ projectId, jobId }).slice(0, 24)}`, projectId, subject: ref, rule: "BLENDER_DERIVED_VIDEO_TECHNICAL_ADMISSION", result: "REVIEW", details: "Pinned local Blender render and qualified video admission. Creative, playback and rights approval remain separate. No Take was selected or replaced.", createdAt: now }));
  execution.phase = "COMPLETED"; execution.progress = { ...execution.progress!, phase: "PUBLISHING", completedFrames: frames, totalFrames: frames };
  job.state = "SUCCEEDED"; job.finishedAt = now; job.outputs = [ref]; job.adapterMetadata = metadata; job.checkpoint = blenderCheckpoint(execution); job.dispatch!.state = "COMPLETED";
  return { asset, ref };
}

export class StudioRepository {
  private readonly footage: StudioFootageLibrary;
  constructor(private readonly root: CreatorNativeRoot, footage?: StudioFootageLibrary, private readonly renderCacheScopeDigest: string | null = null, private readonly blenderRecovery: BlenderRecoveryAuthorization | null = null) {
    this.footage = footage ?? createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: { workspace: "development" }, importDestination: "workspace" });
  }
  close(): void {
    let failure: unknown, failed = false;
    try { this.footage.close(); } catch (error) { failure = error; failed = true; }
    try { this.root.close(); } catch (error) { if (!failed) { failure = error; failed = true; } }
    if (failed) throw failure;
  }
  private assertNewProjectCapacity(): void {
    let names: string[];
    try { names = this.root.listDirectory(["studio", "projects"]); }
    catch (error) { if ((error as { code?: string }).code === "not_found") return; throw error; }
    // The local operator invokes these synchronous commands in one server process.
    // Existing-project replay is handled first; no directory or record is created at capacity.
    if (names.length >= 100) fail("PROJECT_LIMIT", "This local studio workspace already contains its maximum of 100 projects.");
  }
  /** Validate actual supported terminal shapes, not an arbitrary text-limit increase.
   * Every aggregate mutation preserves this reservation while a render is active.
   * No reservation promises success in the presence of a later disk/I/O failure. */
  private assertBlenderTerminalCapacity(input: StudioSnapshot, existingRecords: BlenderJournalRecords): void {
    const pendingJobs = input.jobs.filter(job => isBlenderJob(job) && (job.state === "RUNNING" || (job.state === "QUEUED" && readBlenderJob(job).preparedRevision === input.project.revision)));
    if (!pendingJobs.length) return;
    // Dedicated preparation admits at most one active native operation. An old
    // corrupt/multi-active state is not given a misleading serialization promise.
    if (pendingJobs.length !== 1) return fail("BLENDER_RECORD_CAPACITY", "Only one pending native execution can reserve terminal capacity.");
    const target = pendingJobs[0], state = copy(input), job = state.jobs.find(item => item.jobId === target.jobId)!, execution = readBlenderJob(job), records = new Map(existingRecords);
    // A permitted lone surrogate takes six canonical JSON bytes per UTF-16
    // unit. It dominates ASCII escaping and UTF-8 multibyte text as well.
    const now = "9999-12-31T23:59:59.999Z", actor = "\ud800".repeat(160), token = "f".repeat(48);
    const append = (candidate: StudioSnapshot, changes: Change, request: JsonObject, retained: BlenderJournalRecords): void => {
      candidate.project.revision++;
      const keyHash = sha(`native_capacity_${candidate.project.revision}_${changes.code}`);
      appendOutcome(candidate, keyHash, digest({ request, actor, now }), request, actor, now, changes, retained);
      candidate.recordDigest = digest(withoutDigest(candidate));
    };
    const check = (candidate: StudioSnapshot, retained: BlenderJournalRecords): void => {
      candidate.recordDigest = digest(withoutDigest(candidate)); validateSnapshot(candidate, this.root, retained);
      if (Buffer.byteLength(canonical(candidate)) > MAX_RECORD_BYTES) fail("BLENDER_RECORD_CAPACITY", "Supported terminal outcome exceeds the atomic byte bound.");
    };
    try {
      if (job.state === "QUEUED") {
        job.state = "RUNNING"; job.attempt = 1; job.startedAt = now; job.dispatch = { token, state: "INTENT_RECORDED", recordedAt: now }; execution.phase = "RUNNING";
        execution.progress = { phase: "STARTING", completedFrames: 0, totalFrames: execution.spec.settings.frameEnd - execution.spec.settings.frameStart + 1, process: null }; job.checkpoint = blenderCheckpoint(execution);
        append(state, { type: "JOB_STARTED", subjectId: job.jobId, code: "BLENDER_EXPLICIT_PREVIEW_START", value: json(job), details: { blenderOperation: true, explicitPreviewApproval: true, creativeApprovalGranted: false } }, { type: "ACQUIRE_BLENDER_RENDER", jobId: job.jobId, expectedSpecDigest: execution.specDigest }, records);
      }
      const total = execution.spec.settings.frameEnd - execution.spec.settings.frameStart + 1;
      execution.progress = { phase: "PUBLISHING", completedFrames: total, totalFrames: total, process: { pid: 2_147_483_647, identity: "\ud800".repeat(256), executableSha256: execution.spec.settings.ffprobe.sha256, startedAt: now } };
      execution.latestProgress = { at: now, keyHash: "f".repeat(64), requestDigest: "f".repeat(64), diagnosticRef: job.jobId }; job.checkpoint = blenderCheckpoint(execution); check(state, records);
      for (const phase of ["FAILED", "CANCELLED", "INTERRUPTED", "COMPLETED"] as const) {
        const candidate = copy(state), retained = new Map(records), terminal = candidate.jobs.find(item => item.jobId === job.jobId)!, final = readBlenderJob(terminal);
        if (phase === "COMPLETED") {
          const divisor = total % 25 === 0 ? 25 : total % 5 === 0 ? 5 : 1;
          const technical: StagedStudioMediaImport["technical"] = { schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width: 1280, height: 720, frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration: { numerator: total / divisor, denominator: 25 / divisor }, sourceUnits: total, sourceUnit: "FRAME", timeBase: { numerator: 999_999_999, denominator: 1_000_000_000 }, colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest: "f".repeat(64) };
          const staged = { byteLength: STUDIO_FOOTAGE_MAX_BYTES, contentHash: "f".repeat(64), technical }, published = blenderSuccess(candidate, terminal, final, staged, now);
          append(candidate, { type: "JOB_COMPLETED", subjectId: job.jobId, code: "BLENDER_VIDEO_PUBLISHED", value: json({ job: terminal, asset: published.ref }), details: { blenderOperation: true, acquisition: "SERVER_GENERATED_LOCAL_BLENDER_RENDER", takeSelected: false } }, { type: "PUBLISH_BLENDER_RENDER", jobId: job.jobId, token: terminal.dispatch!.token, byteLength: staged.byteLength, contentHash: staged.contentHash, technical: json(technical) }, retained);
        } else {
          const code = "X".repeat(96); final.phase = phase; terminal.checkpoint = blenderCheckpoint(final); terminal.state = phase === "CANCELLED" ? "CANCELLED" : "FAILED"; terminal.finishedAt = now; terminal.error = { code, message: phase === "INTERRUPTED" ? "The owned local render was interrupted. No automatic restart or publication occurred." : "The local render ended without a validated published output.", retryable: false }; terminal.dispatch!.state = "ACKNOWLEDGED";
          append(candidate, { type: phase === "CANCELLED" ? "JOB_CANCELLED" : "JOB_FAILED", subjectId: job.jobId, code, value: json(terminal), details: { blenderOperation: true } }, { type: "TERMINATE_BLENDER_RENDER", jobId: job.jobId, token: terminal.dispatch!.token, phase, code }, retained);
        }
        check(candidate, retained);
      }
    } catch (error) {
      const issue = error as { code?: string; issues?: { code?: string }[] };
      return fail("BLENDER_RECORD_CAPACITY", `Native execution was not admitted: its running/progress/terminal reservation failed (${issue.issues?.[0]?.code ?? issue.code ?? "VALIDATION"}). No limit was increased.`);
    }
  }
  listProjects(): StudioProject[] {
    let names: string[];
    try { names = this.root.listDirectory(["studio", "projects"]); }
    catch (error) { if ((error as { code?: string }).code === "not_found") return []; throw error; }
    if (names.length > 100) return fail("PROJECT_LIST_LIMIT", "This local operator supports at most 100 projects.");
    return names.sort().map(name => this.load(name as StudioId<"project">).project);
  }
  /** Metadata-only catalogue for the editor. It does not grant media/QC/execution authority. */
  listProjectsForReview(): StudioProject[] {
    let names: string[];
    try { names = this.root.listDirectory(["studio", "projects"]); }
    catch (error) { if ((error as { code?: string }).code === "not_found") return []; throw error; }
    if (names.length > 100) return fail("PROJECT_LIST_LIMIT", "This local operator supports at most 100 projects.");
    return names.sort().map(name => this.readSnapshot(name as StudioId<"project">).project);
  }
  private path(projectId: StudioId<"project">): string[] { return resolveStudioPath(projectId, "manifests", "project.json").split("/"); }
  private readBytes(projectId: StudioId<"project">): Buffer | null { try { return this.root.readFile(this.path(projectId), MAX_RECORD_BYTES); } catch (error) { if ((error as { code?: string }).code === "not_found") return null; throw error; } }
  private readSnapshot(projectId: StudioId<"project">): StudioSnapshot {
    const bytes = this.readBytes(projectId); if (!bytes) return fail("NOT_FOUND", "Studio project does not exist.");
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes), state = validateSnapshot(parseStudioJson(text), this.root);
    if (state.project.projectId !== projectId || canonical(state) !== text) fail("CORRUPT_STORE", "Project file binding or canonical encoding mismatch.");
    for (const asset of state.assets) if (asset.sourcePath !== resolveAssetPath(projectId, asset, asset.assetType, asset.contentHash)) fail("CORRUPT_ASSET", "Immutable asset path failed verification.");
    return state;
  }
  private assetContent(asset: Asset): Buffer {
    const bytes = isLocalFootageAsset(asset) ? this.footage.read(asset.sourcePath, asset.contentHash, localFootageByteLength(asset), localFootageStorageBinding(asset)) : this.root.readFile(asset.sourcePath.split("/"), MAX_RECORD_BYTES);
    if (sha(bytes) !== asset.contentHash) fail("CORRUPT_ASSET", "Immutable asset bytes failed verification.");
    return bytes;
  }
  private openAssetReader(asset: Asset): StudioAssetReader {
    if (isLocalFootageAsset(asset)) return this.footage.open(asset.sourcePath, asset.contentHash, localFootageByteLength(asset), localFootageStorageBinding(asset));
    const bytes = this.root.readFile(asset.sourcePath.split("/"), MAX_RECORD_BYTES);
    if (bytes.length < 1 || sha(bytes) !== asset.contentHash) fail("CORRUPT_ASSET", "Immutable asset bytes failed verification.");
    return this.memoryAssetReader(bytes, asset.contentHash);
  }
  private memoryAssetReader(bytes: Buffer, contentHash: string): StudioAssetReader {
    let closed = false;
    return Object.freeze({
      byteLength: bytes.length,
      contentHash,
      read(offset: number, length: number): Buffer {
        if (closed || !Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(length) || length < 0 || length > 524_288 || offset > bytes.length || length > bytes.length - offset) fail("CORRUPT_ASSET", "Immutable asset range is invalid.");
        return bytes.subarray(offset, offset + length);
      },
      close(): void { closed = true; },
    });
  }
  private verifyAsset(asset: Asset): void {
    if (!isLocalFootageAsset(asset) || localFootageByteLength(asset) <= STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) { this.assetContent(asset); return; }
    const reader = this.footage.open(asset.sourcePath, asset.contentHash, localFootageByteLength(asset), localFootageStorageBinding(asset));
    try { reader.verify(); } finally { reader.close(); }
  }
  /** Execution/mutation paths retain strict complete-media validation. */
  load(projectId: StudioId<"project">): StudioSnapshot {
    const state = this.readSnapshot(projectId); for (const asset of state.assets) this.verifyAsset(asset); return copy(state);
  }
  /** Import response metadata after chunk publication. The publication path
   * already verifies the staged hash incrementally; do not reassemble every
   * bounded media object into JS merely to return the updated manifest. */
  loadManifest(projectId: StudioId<"project">): StudioSnapshot { return copy(this.readSnapshot(projectId)); }
  /** Resolve one exact immutable audit payload without inflating the aggregate. */
  readCanonicalEvent(projectId: StudioId<"project">, eventId: StudioId<"event">): ProductionEvent {
    const state = this.readSnapshot(projectId), event = state.events.find(item => item.eventId === eventId);
    if (!event) return fail("EVENT_NOT_FOUND", "The requested canonical audit event is unavailable.");
    return copy(resolveBlenderJournalEvent(this.root, projectId, event));
  }
  /** Explicit isolated recovery only. No job authority, state, attempt or history event is reset. */
  compactBlenderHistoryForRecovery(projectId: StudioId<"project">, jobId: StudioId<"job">, expectedSnapshotSha256: string, requestedAt: string): StudioResult {
    checkTime(requestedAt); assertStudioId(projectId, "project"); assertStudioId(jobId, "job");
    if (!this.blenderRecovery || this.blenderRecovery.projectId !== projectId || this.blenderRecovery.jobId !== jobId || this.blenderRecovery.expectedSnapshotSha256 !== expectedSnapshotSha256 || !/^[a-f0-9]{64}$/u.test(expectedSnapshotSha256)) return fail("BLENDER_RECOVERY_NOT_AUTHORIZED", "This exact isolated project, job and original record are not authorized for a lossless history transition.");
    const expected = this.readBytes(projectId), state = this.readSnapshot(projectId);
    const result = (): StudioResult => ({ status: "APPLIED", code: "BLENDER_HISTORY_COMPACTED", revision: state.blenderHistoryArchive!.originalRevision, value: { archiveSha256: expectedSnapshotSha256, originalRevision: state.blenderHistoryArchive!.originalRevision } });
    if (state.blenderHistoryArchive) {
      if (state.blenderHistoryArchive.sha256 !== expectedSnapshotSha256 || state.blenderHistoryArchive.jobId !== jobId) return fail("BLENDER_RECOVERY_BINDING", "A different history transition is already retained.");
      return result();
    }
    if (!expected || sha(expected) !== expectedSnapshotSha256) return fail("BLENDER_RECOVERY_BINDING", "The record differs from the explicitly authorized original bytes.");
    const job = state.jobs.find(item => item.jobId === jobId);
    if (!job || !isBlenderJob(job) || job.state !== "RUNNING" || job.attempt !== 1 || job.outputs.length || readBlenderJob(job).phase !== "RUNNING" || Date.parse(requestedAt) < Date.parse(state.events.at(-1)!.timestamp)) return fail("BLENDER_RECOVERY_BINDING", "Only the preserved consumed, unsuccessful native render can use this transition.");
    retainBlenderEditorialBaseline(this.root, state);
    const records: BlenderJournalRecords = new Map();
    for (let index = 0; index < state.events.length; index++) {
      const event = state.events[index];
      if (event.details.blenderOperation !== true || event.details.journal !== undefined) continue;
      const receipt = state.receipts.find(item => item.result.revision === event.sequence);
      if (!receipt || canonical(receipt.result) !== canonical(event.details.result)) return fail("BLENDER_RECOVERY_BINDING", "Original event and receipt differ.");
      const compact = compactBlenderEvent(event); records.set(event.eventHash, compact.record); state.events[index] = compact.event; receipt.result = compact.event.details.result as unknown as StudioResult;
    }
    state.blenderHistoryArchive = { format: "studio-blender-history-archive-v1", sha256: expectedSnapshotSha256, byteLength: expected.length, originalRecordDigest: state.recordDigest, originalRevision: state.project.revision, jobId, at: requestedAt };
    state.recordDigest = digest(withoutDigest(state));
    const pending = new Map(records); pending.set(expectedSnapshotSha256, expected);
    validateSnapshot(state, this.root, pending); this.assertBlenderTerminalCapacity(state, pending);
    if (Buffer.byteLength(canonical(state)) > MAX_RECORD_BYTES) return fail("BLENDER_RECORD_CAPACITY", "The compact record cannot retain its supported terminal outcomes.");
    const destination = blenderArchivePath(projectId, expectedSnapshotSha256);
    try { this.root.writeAtomicExclusive(destination, `blender-archive-${randomBytes(12).toString("hex")}.tmp`, expected, this.path(projectId), expected); }
    catch (error) { if ((error as { code?: string }).code !== "already_exists" || !this.root.readFile(destination, MAX_RECORD_BYTES).equals(expected)) throw error; }
    this.publish(state, expected, null, PROVIDER_CLAIM_PATH, undefined, records);
    return result();
  }
  /** Offline review preserves validated instructions, but never labels unavailable bytes as verified. */
  reviewSnapshot(projectId: StudioId<"project">): { snapshot: StudioSnapshot; mediaAvailability: StudioMediaAvailability[] } {
    const snapshot = this.readSnapshot(projectId);
    const mediaAvailability = snapshot.assets.map((asset): StudioMediaAvailability => {
      try {
        if (isLocalFootageAsset(asset) && localFootageByteLength(asset) > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) {
          const reader = this.openAssetReader(asset); reader.close();
          return { assetId: asset.assetId, version: asset.version, status: "ONLINE", reason: "VERIFIED_INDEX" };
        }
        this.assetContent(asset); return { assetId: asset.assetId, version: asset.version, status: "ONLINE", reason: "VERIFIED_BYTES" };
      }
      catch { return { assetId: asset.assetId, version: asset.version, status: "OFFLINE", reason: "UNAVAILABLE_OR_INTEGRITY_FAILED" }; }
    });
    return { snapshot: copy(snapshot), mediaAvailability };
  }
  reviewEditorial(projectId: StudioId<"project">) {
    const review = this.reviewSnapshot(projectId), editorial = readStudioEditorial(this.root, review.snapshot);
    if (!this.readBytes(projectId)?.equals(Buffer.from(canonical(review.snapshot), "utf8"))) fail("REVISION_CONFLICT", "Project changed while reading editorial state.");
    return { ...review, editorial };
  }
  saveEditorial(input: unknown, key: string, actor: string) {
    const clean = jsonObject(input), projectId = clean.projectId as StudioId<"project">;
    const snapshot = this.readSnapshot(projectId);
    saveStudioEditorial(this.root, snapshot, clean, key, actor);
    return this.reviewEditorial(projectId);
  }
  /** Explicit development foundation API. The existing v1 UI never invokes a
   * migration automatically; v2 copies do not become provider/execution authority. */
  migrateEditorialV2(input: unknown, key: string, actor: string) {
    const value = jsonObject(input), snapshot = this.readSnapshot(value.projectId as StudioId<"project">);
    return migrateStudioEditorialV2(this.root, snapshot, value, key, actor);
  }
  inspectEditorialV2WorkingCopy(projectId: StudioId<"project">) {
    return inspectStudioEditorialV2WorkingCopy(this.root, this.readSnapshot(projectId));
  }
  reviewEditorialV2Composition(projectId: StudioId<"project">, compositionId: string) {
    return readStudioEditorialV2Composition(this.root, this.readSnapshot(projectId), compositionId);
  }
  editEditorialV2Layer(input: unknown, key: string, actor: string) {
    const value = jsonObject(input), snapshot = this.readSnapshot(value.projectId as StudioId<"project">);
    return editStudioEditorialV2Layer(this.root, snapshot, value, key, actor);
  }
  admitEditorialV2DerivedTake(input: unknown, key: string, actor: string) {
    const value = jsonObject(input), snapshot = this.readSnapshot(value.projectId as StudioId<"project">);
    return admitStudioEditorialV2DerivedTake(this.root, snapshot, value, key, actor);
  }
  editEditorialV2CompositionDuration(input: unknown, key: string, actor: string) {
    const value = jsonObject(input), snapshot = this.readSnapshot(value.projectId as StudioId<"project">);
    return editStudioEditorialV2CompositionDuration(this.root, snapshot, value, key, actor);
  }
  navigateEditorialV2History(input: unknown, key: string, actor: string) {
    const value = jsonObject(input), snapshot = this.readSnapshot(value.projectId as StudioId<"project">);
    return navigateStudioEditorialV2History(this.root, snapshot, value, key, actor);
  }
  auditEditorialV2History(projectId: StudioId<"project">, limit: number) {
    return auditStudioEditorialV2History(this.root, this.readSnapshot(projectId), limit);
  }
  private renderSourceDescriptor(snapshot: StudioSnapshot, ref: AssetRef): StudioRenderSourceDescriptor | null {
    const asset = snapshot.assets.find(item => item.assetId === ref.assetId && item.version === ref.version);
    if (!asset || (asset.assetType !== "VIDEO" && asset.assetType !== "AUDIO")) return null;
    if (isQualifiedLocalMediaAsset(asset)) {
      const technical = localMediaTechnicalMetadata(asset);
      return { asset, byteLength: technical.byteLength, contentType: technical.contentType };
    }
    if (this.renderCacheScopeDigest) {
      return readCachedStudioRenderSourceDescriptor({
        repositoryRootIdentityDigest: this.renderCacheScopeDigest,
        snapshotRecordDigest: snapshot.recordDigest,
        storageBindingDigest: digest({ sourcePath: asset.sourcePath, localFootageBinding: isLocalFootageAsset(asset) ? localFootageStorageBinding(asset) : null }),
        asset,
        readExactBytes: () => this.assetContent(asset),
      });
    }
    const bytes = this.assetContent(asset);
    if (bytes.length < 12 || bytes.length > 16 * 1024 * 1024) return null;
    const contentType = asset.assetType === "VIDEO"
      ? (bytes.toString("ascii", 4, 8) === "ftyp" ? "video/mp4" : null)
      : (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WAVE" ? "audio/wav" : null);
    return contentType ? { asset, byteLength: bytes.length, contentType } : null;
  }
  private renderInspection(projectId: StudioId<"project">, compositionId: string, expectedHeadDigest: string | null, reconcile: boolean): StudioRenderRepositoryInspection {
    try { assertStudioId(projectId, "project"); }
    catch { throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Use an exact saved project identity."); }
    if (!/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(compositionId) || (expectedHeadDigest !== null && !/^[a-f0-9]{64}$/u.test(expectedHeadDigest))) throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Use an exact saved composition and head identity.");
    const snapshot = this.readSnapshot(projectId), selected = readStudioEditorialV2Composition(this.root, snapshot, compositionId);
    if (expectedHeadDigest !== null && selected.headDigest !== expectedHeadDigest) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The selected working copy changed.");
    const configuration = readStudioRenderConfiguration();
    const planned = buildStudioEditorialRenderSpec({
      projectId,
      editorialHeadDigest: selected.headDigest,
      editorialRevision: selected.revision,
      composition: selected.composition,
      configuration,
      resolveSource: ref => this.renderSourceDescriptor(snapshot, ref),
    });
    const ledger = reconcile
      ? reconcileStudioRenderLedger({ root: this.root, projectId, requestedAt: new Date().toISOString() }).ledger
      : inspectStudioRenderLedger(this.root, projectId);
    const after = readStudioEditorialV2Composition(this.root, snapshot, compositionId);
    if (after.headDigest !== selected.headDigest || after.revision !== selected.revision || after.composition.revision !== selected.composition.revision) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The selected working copy changed while inspecting render state.");
    return { projectId, compositionId, headDigest: selected.headDigest, revision: selected.revision, compositionRevision: selected.composition.revision, readiness: planned.readiness, ledger };
  }
  inspectEditorialV2Render(projectId: StudioId<"project">, compositionId: string, expectedHeadDigest: string): StudioRenderRepositoryInspection {
    return this.renderInspection(projectId, compositionId, expectedHeadDigest, true);
  }
  startEditorialV2Render(input: StudioRenderStartRequest, key: string, actor: string): { inspection: StudioRenderRepositoryInspection; jobId: StudioId<"job">; replayed: boolean } {
    if (input.operation !== "START_RENDER" || input.presetId !== STUDIO_RENDER_PRESET_ID || Object.keys(input).sort().join() !== "compositionId,expectedCompositionRevision,expectedHeadDigest,expectedRevision,operation,presetId,projectId,requestedAt") throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Use the fixed saved-head render request.");
    const snapshot = this.readSnapshot(input.projectId), selected = readStudioEditorialV2Composition(this.root, snapshot, input.compositionId);
    if (selected.headDigest !== input.expectedHeadDigest || selected.revision !== input.expectedRevision || selected.composition.revision !== input.expectedCompositionRevision) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The exact saved head changed before render start.");
    const headBytes = this.root.readFile(studioEditorialV2HeadPath(input.projectId), MAX_RECORD_BYTES);
    if (sha(headBytes) !== selected.headDigest) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The exact saved head bytes changed before render start.");
    const configuration = readStudioRenderConfiguration(), planned = buildStudioEditorialRenderSpec({
      projectId: input.projectId,
      editorialHeadDigest: selected.headDigest,
      editorialRevision: selected.revision,
      composition: selected.composition,
      configuration,
      resolveSource: ref => this.renderSourceDescriptor(snapshot, ref),
    });
    if (planned.readiness.state !== "READY" || !planned.spec || !planned.specDigest) throw new StudioStoreError("RENDER_NOT_READY", "The selected saved composition is outside the fixed first-render subset.");
    const created = createStudioRenderJob(this.root, { spec: planned.spec, specDigest: planned.specDigest, editorialHeadBytes: headBytes, request: input, key, actor, requestedAt: input.requestedAt });
    const after = readStudioEditorialV2Composition(this.root, snapshot, input.compositionId);
    if (after.headDigest !== selected.headDigest || after.revision !== selected.revision || after.composition.revision !== selected.composition.revision) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The exact saved head changed while recording the render job.");
    return {
      inspection: { projectId: input.projectId, compositionId: input.compositionId, headDigest: selected.headDigest, revision: selected.revision, compositionRevision: selected.composition.revision, readiness: planned.readiness, ledger: created.ledger },
      jobId: created.job.jobId,
      replayed: created.replayed,
    };
  }
  async cancelEditorialV2Render(input: StudioRenderCancelRequest, key: string, actor: string): Promise<{ inspection: StudioRenderRepositoryInspection; replayed: boolean }> {
    if (input.operation !== "CANCEL_RENDER" || Object.keys(input).sort().join() !== "compositionId,expectedLedgerRevision,jobId,operation,projectId,requestedAt") throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Use the exact saved render cancellation request.");
    const before = inspectStudioRenderLedger(this.root, input.projectId), job = before?.jobs.find(item => item.jobId === input.jobId);
    if (!job || job.compositionId !== input.compositionId) throw new StudioStoreError("RENDER_INVALID", "The render job does not belong to the selected composition.");
    const cancelled = await cancelStudioRenderExecution({ root: this.root, projectId: input.projectId, jobId: input.jobId, expectedLedgerRevision: input.expectedLedgerRevision, requestedAt: input.requestedAt, request: input, key, actor });
    const inspection = this.renderInspection(input.projectId, input.compositionId, null, false);
    return { inspection: { ...inspection, ledger: cancelled.ledger }, replayed: cancelled.replayed };
  }
  async executeEditorialV2Render(projectId: StudioId<"project">, jobId: StudioId<"job">): Promise<void> {
    const snapshot = this.readSnapshot(projectId), configuration = readStudioRenderConfiguration();
    await executeStudioRenderJob({
      root: this.root,
      projectId,
      jobId,
      configuration,
      streamSourceBytes: (source: StudioRenderSource, accept: (chunk: Buffer) => void) => {
        const asset = snapshot.assets.find(item => item.assetId === source.assetId && item.version === source.version);
        if (!asset || asset.projectId !== projectId || asset.assetType !== source.assetType || asset.contentHash !== source.contentHash || digest(asset) !== source.assetManifestDigest) throw new StudioStoreError("RENDER_INVALID", "The immutable render source manifest changed.");
        const reader = this.openAssetReader(asset);
        try {
          if (reader.byteLength !== source.byteLength || reader.contentHash !== source.contentHash) throw new StudioStoreError("RENDER_INVALID", "The immutable render source identity changed.");
          for (let offset = 0; offset < reader.byteLength; offset += 524_288) accept(reader.read(offset, Math.min(524_288, reader.byteLength - offset)));
        } finally { reader.close(); }
      },
    });
  }
  openEditorialV2RenderOutput(input: { projectId: StudioId<"project">; assetId: StudioId<"asset">; version: number; contentHash: string }) {
    try { assertStudioId(input.projectId, "project"); assertStudioId(input.assetId, "asset"); }
    catch { throw new StudioStoreError("RENDER_INVALID", "Use an exact render output identity."); }
    if (!Number.isSafeInteger(input.version) || input.version < 1 || !/^[a-f0-9]{64}$/u.test(input.contentHash)) throw new StudioStoreError("RENDER_INVALID", "Use an exact render output identity.");
    const ledger = inspectStudioRenderLedger(this.root, input.projectId), output = ledger?.outputs.find(item => item.assetId === input.assetId && item.version === input.version && item.contentHash === input.contentHash);
    if (!output) throw new StudioStoreError("RENDER_NOT_FOUND", "The immutable render output was not found.");
    return { output, reader: openStudioRenderOutput(this.root, input.projectId, output) };
  }
  /** Open one direct immutable source of the exact selected working-copy head.
   * Large local video remains behind the bounded media reader; native range
   * requests never reconstruct the complete source in JS memory. */
  openEditorialV2Media(projectId: StudioId<"project">, compositionId: string, expectedHeadDigest: string, assetId: StudioId<"asset">, version: number) {
    try { assertStudioId(projectId, "project"); assertStudioId(assetId, "asset"); }
    catch { throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Use exact saved media identities."); }
    if (typeof compositionId !== "string" || compositionId.length > 128 || !/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(compositionId) || typeof expectedHeadDigest !== "string" || !/^[a-f0-9]{64}$/u.test(expectedHeadDigest) || !Number.isSafeInteger(version) || version < 1) throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Use an exact selected working-copy head and media version.");
    const snapshot = this.readSnapshot(projectId), selected = readStudioEditorialV2Composition(this.root, snapshot, compositionId);
    if (selected.headDigest !== expectedHeadDigest) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The selected working copy changed.");
    if (selected.composition.layers.some(layer => layer.source.kind === "COMPOSITION")) return fail("UNSUPPORTED_EDITORIAL_MEDIA", "Nested composition previews are not supported.");
    if (!selected.media.some(ref => ref.assetId === assetId && ref.version === version)) throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", "Media must belong directly to the selected composition.");
    const asset = snapshot.assets.find(item => item.assetId === assetId && item.version === version);
    if (!asset || !["VIDEO", "IMAGE"].includes(asset.assetType)) return fail("UNSUPPORTED_EDITORIAL_MEDIA", "This asset is not supported preview media.");
    const after = readStudioEditorialV2Composition(this.root, snapshot, compositionId);
    if (after.headDigest !== expectedHeadDigest) throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The selected working copy changed while reading media.");
    const legacyBytes = asset.assetType === "VIDEO" && isLocalFootageAsset(asset) && !isQualifiedLocalMediaAsset(asset) ? this.assetContent(asset) : null;
    const reader = legacyBytes ? this.memoryAssetReader(legacyBytes, asset.contentHash) : this.openAssetReader(asset);
    try {
      const header = reader.read(0, Math.min(12, reader.byteLength));
      const contentType = this.editorialMediaType(asset, header);
      return { reader, contentType, projectId, compositionId, headDigest: expectedHeadDigest, assetId, version, contentHash: asset.contentHash };
    } catch (error) { reader.close(); throw error; }
  }
  /** Compatibility seam for bounded tests and legacy callers only. */
  readEditorialV2Media(projectId: StudioId<"project">, compositionId: string, expectedHeadDigest: string, assetId: StudioId<"asset">, version: number) {
    const media = this.openEditorialV2Media(projectId, compositionId, expectedHeadDigest, assetId, version);
    try {
      if (media.reader.byteLength > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) return fail("UNSUPPORTED_EDITORIAL_MEDIA", "Complete-byte preview is limited to legacy-sized media; use the ranged endpoint.");
      const bytes = Buffer.allocUnsafe(media.reader.byteLength);
      for (let offset = 0; offset < bytes.length; offset += 524_288) {
        const part = media.reader.read(offset, Math.min(524_288, bytes.length - offset)); part.copy(bytes, offset);
      }
      if (sha(bytes) !== media.contentHash) return fail("CORRUPT_ASSET", "Immutable asset bytes failed verification.");
      const { reader: omitted, ...identity } = media; void omitted;
      return { ...identity, bytes };
    } finally { media.reader.close(); }
  }
  readEditorialMedia(projectId: StudioId<"project">, assetId: StudioId<"asset">, version: number): { bytes: Buffer; contentType: string } {
    if (!Number.isSafeInteger(version) || version < 1) return fail("INVALID_ASSET", "Use an exact saved media version.");
    const asset = this.readSnapshot(projectId).assets.find(item => item.assetId === assetId && item.version === version);
    if (!asset || !["VIDEO", "IMAGE"].includes(asset.assetType)) return fail("NOT_FOUND", "Supported editorial media was not found.");
    const bytes = this.assetContent(asset);
    return { bytes, contentType: this.editorialMediaType(asset, bytes) };
  }
  private editorialMediaType(asset: Asset, bytes: Buffer): "video/mp4" | "image/png" | "image/jpeg" {
    if (asset.assetType === "VIDEO" && isQualifiedLocalMediaAsset(asset)) {
      const technical = localMediaTechnicalMetadata(asset);
      if (technical.mediaType !== "VIDEO") return fail("UNSUPPORTED_EDITORIAL_MEDIA", "The qualified media type differs from its video asset.");
      return "video/mp4";
    }
    if (asset.assetType === "VIDEO" && isLocalFootageAsset(asset)) { inspectStudioMp4(bytes); return "video/mp4"; }
    if (asset.assetType === "IMAGE" && bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "image/png";
    if (asset.assetType === "IMAGE" && bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
    return fail("UNSUPPORTED_EDITORIAL_MEDIA", "Only locally imported MP4 and registered PNG/JPEG previews are supported. Media decoding is not certified.");
  }
  private publish(state: StudioSnapshot, expected: Buffer | null, fence: Buffer | null = null, fencePath: string[] = PROVIDER_CLAIM_PATH, beforePublish?: Change["beforePublish"], records: BlenderJournalRecords = new Map()): void {
    state.recordDigest = digest(withoutDigest(state));
    try { validateSnapshot(state, this.root, records); }
    catch (error) {
      const code = (error as { issues?: { code?: string }[] }).issues?.[0]?.code;
      if (code && ["TEXT_LIMIT", "NODE_LIMIT", "DEPTH_LIMIT", "ARRAY_LIMIT", "OBJECT_LIMIT", "STRING_LIMIT"].includes(code) && state.jobs.some(job => isBlenderJob(job) && ["RUNNING", "QUEUED"].includes(job.state))) return fail("BLENDER_RECORD_CAPACITY", `The proposed mutation cannot preserve native terminal capacity (${code}).`);
      throw error;
    }
    const bytes = Buffer.from(canonical(state), "utf8"); if (bytes.length > MAX_RECORD_BYTES) fail("PROJECT_FULL", "Project exceeds the 1 MiB atomic aggregate bound.");
    this.assertBlenderTerminalCapacity(state, records);
    // All prospective manifest, audit, receipt and capacity validation precedes media publication.
    // A subsequent CAS/I/O failure can still leave immutable orphans for exact replay.
    writeBlenderJournalRecords(this.root, state.project.projectId, records);
    const mediaFence = beforePublish?.();
    if (mediaFence) {
      // Local import has no provider claim. Never silently replace an existing authority fence.
      if (fence) fail("PUBLICATION_FENCE_CONFLICT", "An import cannot replace another publication boundary.");
      fence = mediaFence.expected; fencePath = [...mediaFence.path];
    }
    const target = this.path(state.project.projectId), temp = `studio-${randomBytes(12).toString("hex")}.tmp`;
    try {
      if (expected === null) this.root.writeAtomicExclusive(target, temp, bytes, fence ? fencePath : null, fence);
      else this.root.writeAtomicReplace(target, temp, bytes, expected, fence ? fencePath : null, fence);
    } catch (error) {
      // Cross-volume publication failure may follow durable media writes. Preserve the exact retry.
      if (mediaFence) throw new StudioFootageLibraryError("FOOTAGE_LIBRARY_UNAVAILABLE");
      throw error;
    }
  }
  private apply(projectId: StudioId<"project">, key: string, request: JsonObject, actor: string, now: string, change: (state: StudioSnapshot) => Change, fence: Buffer | null = null, fencePath: string[] = PROVIDER_CLAIM_PATH, verifyExistingMedia = true): StudioResult {
    checkKey(key); checkTime(now); if (!actor.trim() || actor.length > 160) fail("INVALID_ACTOR", "An explicit bounded actor is required.");
    const expected = this.readBytes(projectId); const state = verifyExistingMedia ? this.load(projectId) : copy(this.readSnapshot(projectId)); const keyHash = sha(key), requestDigest = digest({ request, actor, now });
    const replay = state.receipts.find(receipt => receipt.keyHash === keyHash);
    if (replay) { if (replay.requestDigest !== requestDigest) return fail("IDEMPOTENCY_CONFLICT", "Same key has different exact inputs."); return copy(resolveBlenderJournalResult(this.root, projectId, replay.result)); }
    if (Date.parse(now) < Date.parse(state.events.at(-1)!.timestamp)) fail("STALE_TIME", "Mutation timestamp precedes project history.");
    const outcome = change(state); state.project.revision++;
    return this.finish(state, expected, keyHash, requestDigest, request, actor, now, outcome, fence, fencePath);
  }
  private finish(state: StudioSnapshot, expected: Buffer | null, keyHash: string, requestDigest: string, request: JsonObject, actor: string, now: string, outcome: Change, fence: Buffer | null = null, fencePath: string[] = PROVIDER_CLAIM_PATH): StudioResult {
    const records: BlenderJournalRecords = new Map(), result = appendOutcome(state, keyHash, requestDigest, request, actor, now, outcome, records);
    this.publish(state, expected, fence, fencePath, outcome.beforePublish, records); return copy(result);
  }
  createProject(input: StudioProject, key: string, actor: string): StudioResult {
    const project = validateStudioProject(input); checkKey(key); checkTime(project.createdAt); if (project.revision !== 1 || !actor.trim() || actor.length > 160) return fail("INVALID_PROJECT", "New project starts at revision 1 with an explicit actor.");
    const request = jsonObject({ type: "CREATE_PROJECT", project }), keyHash = sha(key), requestDigest = digest({ request, actor, now: project.createdAt });
    if (this.readBytes(project.projectId)) { const current = this.load(project.projectId); const receipt = current.receipts.find(item => item.keyHash === keyHash); if (receipt?.requestDigest === requestDigest) return copy(receipt.result); return fail("PROJECT_EXISTS", "Project ID already exists with different inputs."); }
    this.assertNewProjectCapacity();
    for (const area of PROJECT_DIRECTORIES) this.root.ensureDirectory(resolveStudioPath(project.projectId, area).split("/"));
    const state: StudioSnapshot = { schemaVersion: 1, project, sequences: [], shots: [], assets: [], definitions: [], jobs: [], approvals: [], qcResults: [], costs: [], events: [], receipts: [], recordDigest: "" };
    return this.finish(state, null, keyHash, requestDigest, request, actor, project.createdAt, { type: "PROJECT_CREATED", subjectId: project.projectId, code: "PROJECT_CREATED" });
  }
  /** One atomic aggregate publication: never expose a half-created sample project. */
  createDraftProject(input: StudioProject, key: string, actor: string, timeline?: Readonly<{ duration: number; fps: 25; width: 1280; height: 720; emptyOperatorTimeline: true }>): StudioResult {
    const project = validateStudioProject(input); checkKey(key); checkTime(project.createdAt);
    if (project.revision !== 1 || !actor.trim() || actor.length > 160) return fail("INVALID_PROJECT", "A new draft requires revision 1 and an explicit actor.");
    if (timeline && (!Number.isSafeInteger(timeline.duration) || timeline.duration < 45 || timeline.duration > 60 || timeline.fps !== 25 || timeline.width !== 1280 || timeline.height !== 720 || timeline.emptyOperatorTimeline !== true)) return fail("INVALID_PROJECT", "The operator timeline must use the supported 45–60 second 720p25 contract.");
    const suffix = sha(project.projectId).slice(0, 24);
    const shotId: StudioId<"shot"> = `shot_${suffix}`;
    const sequence = validateSequence({ ...sampleSequence, projectId: project.projectId, sequenceId: `sequence_${suffix}`, shotIds: [shotId] });
    const shot = validateShotManifest({
      ...sampleShot,
      projectId: project.projectId,
      sequenceId: sequence.sequenceId,
      shotId,
      ...(timeline ? {
        description: "Empty operator-created trailer timeline. Import local media and place it through explicit editorial actions.",
        storyPurpose: "Assemble the local trailer without generated or pre-seeded media.",
        action: "No media is placed yet.",
        duration: timeline.duration,
        fps: timeline.fps,
        resolution: { width: timeline.width, height: timeline.height },
        camera: { framing: "Operator-defined in the saved composition", movement: "Operator-defined in the saved composition", lensMm: null },
        lighting: "Inherited only from explicitly imported source footage.",
        identityStrictness: "FLEXIBLE",
        continuityRequirements: [],
        generationMethod: "LIVE_ACTION",
        preferredEngine: null,
        fallbackEngine: null,
        notes: ["Empty 1280×720, 25 fps operator timeline. No media, title, soundtrack or provider output was pre-seeded."],
      } : {}),
      costEstimate: { currency: project.currency, minorUnits: 0 },
      actualCost: { currency: project.currency, minorUnits: 0 },
    });
    const request = jsonObject({ type: "CREATE_DRAFT_PROJECT", project, sequence, shot });
    const keyHash = sha(key), requestDigest = digest({ request, actor, now: project.createdAt });
    if (this.readBytes(project.projectId)) {
      const receipt = this.load(project.projectId).receipts.find(item => item.keyHash === keyHash);
      if (receipt?.requestDigest === requestDigest) return copy(receipt.result);
      return fail("PROJECT_EXISTS", "Project ID already exists with different inputs.");
    }
    this.assertNewProjectCapacity();
    for (const area of PROJECT_DIRECTORIES) this.root.ensureDirectory(resolveStudioPath(project.projectId, area).split("/"));
    const state: StudioSnapshot = { schemaVersion: 1, project, sequences: [sequence], shots: [shot], assets: [], definitions: [], jobs: [], approvals: [], qcResults: [], costs: [], events: [], receipts: [], recordDigest: "" };
    return this.finish(state, null, keyHash, requestDigest, request, actor, project.createdAt, { type: "PROJECT_CREATED", subjectId: project.projectId, code: "DRAFT_PROJECT_CREATED" });
  }
  reviseProject(projectId: StudioId<"project">, expectedRevision: number, title: string, description: string, key: string, actor: string, now: string): StudioResult {
    return this.apply(projectId, key, jsonObject({ type: "REVISE_PROJECT", expectedRevision, title, description }), actor, now, state => {
      if (!Number.isSafeInteger(expectedRevision) || expectedRevision !== state.project.revision) return fail("REVISION_CONFLICT", "Project changed. Reload the saved version before applying your edits.");
      const previous = copy(state.project);
      state.project = validateStudioProject({ ...state.project, title, description });
      return { type: "PROJECT_REVISED", subjectId: projectId, code: "PROJECT_REVISED", details: { previousProject: json(previous) } };
    });
  }
  reviseShot(projectId: StudioId<"project">, shotId: StudioId<"shot">, expectedRevision: number, changes: Pick<ShotManifest, "description" | "storyPurpose" | "action" | "duration" | "notes">, key: string, actor: string, now: string): StudioResult {
    const clean = jsonObject(changes);
    if (Object.keys(clean).sort().join() !== "action,description,duration,notes,storyPurpose") return fail("INVALID_SHOT_EDIT", "Only the five explicit planning fields can be edited here.");
    return this.apply(projectId, key, jsonObject({ type: "REVISE_SHOT", shotId, expectedRevision, changes: clean }), actor, now, state => {
      const index = state.shots.findIndex(item => item.shotId === shotId);
      if (index < 0) return fail("MISSING_SHOT", "Shot is not registered.");
      const previous = state.shots[index];
      if (!Number.isSafeInteger(expectedRevision) || expectedRevision !== previous.revision) return fail("REVISION_CONFLICT", "Shot changed. Your unsaved edits have not overwritten the saved version.");
      if (state.jobs.some(job => job.shotId === shotId && ["RUNNING", "WAITING_EXTERNAL"].includes(job.state))) return fail("ACTIVE_SHOT_JOB", "Finish or reconcile the active shot job before creating a new planning revision.");
      const next = validateShotManifest({ ...previous, ...clean, revision: previous.revision + 1, status: "DRAFT", approvalState: "DRAFT", outputAssets: [], generationAttempts: [], selectedVersion: null, qcResults: [] });
      state.shots[index] = next;
      return { type: "SHOT_REVISED", subjectId: shotId, code: "SHOT_REVISED", value: json(next), details: { previousShot: json(previous), approvalReset: true } };
    });
  }
  saveSequence(input: Sequence, key: string, actor: string, now: string): StudioResult {
    const sequence = validateSequence(input); return this.apply(sequence.projectId, key, jsonObject({ type: "SAVE_SEQUENCE", sequence }), actor, now, state => { if (state.sequences.some(item => item.sequenceId === sequence.sequenceId) || sequence.shotIds.length) return fail("INVALID_SEQUENCE", "New sequence must be unique and initially empty."); state.sequences.push(sequence); return { type: "SEQUENCE_CREATED", subjectId: sequence.sequenceId, code: "SEQUENCE_CREATED" }; });
  }
  registerDefinition(projectId: StudioId<"project">, input: Definition, key: string, actor: string, now: string): StudioResult {
    const definition = validateDefinition(input), id = definitionId(definition); return this.apply(projectId, key, jsonObject({ type: "REGISTER_DEFINITION", definition }), actor, now, state => { if (("projectId" in definition && definition.projectId !== projectId) || state.definitions.some(item => definitionId(item) === id)) return fail("DEFINITION_CONFLICT", "Definition is cross-project or already registered."); definitionReferences(state, definition); state.definitions.push(definition); return { type: "DEFINITION_REGISTERED", subjectId: id, code: "DEFINITION_REGISTERED" }; });
  }
  saveShot(input: ShotManifest, key: string, actor: string, now: string): StudioResult {
    const shot = validateShotManifest(input); return this.apply(shot.projectId, key, jsonObject({ type: "SAVE_SHOT", shot }), actor, now, state => {
      const sequence = state.sequences.find(item => item.sequenceId === shot.sequenceId); if (!sequence) return fail("MISSING_SEQUENCE", "Shot sequence must exist.");
      if (shot.costEstimate.currency !== state.project.currency || shot.actualCost.currency !== state.project.currency) return fail("CURRENCY_MISMATCH", "Shot currency must match the project.");
      const existing = state.shots.find(item => item.shotId === shot.shotId); if (existing || shot.revision !== 1) return fail("SHOT_EXISTS", "Phase 0 registers immutable shot revisions; editing requires a later revision command.");
      hasAssets(state, [...shot.props, ...shot.audio, ...shot.sourceReferences, ...shot.inputAssets, ...shot.outputAssets, ...(shot.selectedVersion ? [shot.selectedVersion] : [])]);
      for (const id of [...shot.characters, ...(shot.environment ? [shot.environment] : [])]) if (!state.definitions.some(item => definitionId(item) === id)) fail("MISSING_DEFINITION", "Shot identity/environment definition missing.");
      for (const id of shot.dependencies) if (!state.shots.some(item => item.shotId === id)) fail("MISSING_DEPENDENCY", "Shot dependencies must already exist; forward cycles are disallowed.");
      state.shots.push(shot); sequence.shotIds.push(shot.shotId); return { type: "SHOT_CREATED", subjectId: shot.shotId, code: "SHOT_CREATED" };
    });
  }
  registerAsset(input: Asset, bytes: Uint8Array, key: string, actor: string, now: string): StudioResult {
    if ([BLENDER_SOURCE_ADAPTER, BLENDER_RENDER_ADAPTER].includes(input.provenance?.adapterMetadata?.adapterId ?? "")) return fail("MANAGED_BLENDER_ONLY", "Native descriptors and derived media require their dedicated publication boundaries.");
    if (isLocalFootageAsset(validateAssetManifest(input))) return fail("MANAGED_FOOTAGE_ONLY", "Local footage must use the bounded import command.");
    const asset = validateAssetManifest(input); const data = Buffer.from(bytes); if (data.length < 1 || data.length > MAX_RECORD_BYTES || sha(data) !== asset.contentHash || asset.sourcePath !== resolveAssetPath(asset.projectId, asset, asset.assetType, asset.contentHash)) return fail("INVALID_ASSET_CONTENT", "Asset hash/path/bytes do not match the canonical immutable version.");
    return this.apply(asset.projectId, key, jsonObject({ type: "REGISTER_ASSET", asset }), actor, now, state => {
      const versions = state.assets.filter(item => item.assetId === asset.assetId).sort((a, b) => a.version - b.version); const prior = versions.at(-1);
      if (asset.version !== (prior?.version ?? 0) + 1 || (prior ? !asset.lineage.some(ref => assetKey(ref) === assetKey(prior)) : asset.lineage.length !== 0) || asset.supersededBy !== null) return fail("ASSET_VERSION_CONFLICT", "New asset version must extend the latest immutable version; no replacement is allowed.");
      hasAssets(state, [...asset.lineage, ...asset.dependencies, ...asset.provenance.parentAssets, ...asset.provenance.referenceAssets]);
      if (asset.provenance.cost.currency !== state.project.currency || (asset.provenance.jobId && !state.jobs.some(job => job.jobId === asset.provenance.jobId)) || (asset.provenance.promptId && !state.definitions.some(item => "promptId" in item && item.promptId === asset.provenance.promptId))) return fail("PROVENANCE_BINDING", "Asset provenance currency, job or prompt is not bound to this project.");
      try { this.root.writeAtomicExclusive(asset.sourcePath.split("/"), `studio-${randomBytes(12).toString("hex")}.tmp`, data); } catch (error) { if ((error as { code?: string }).code !== "already_exists" || !this.root.readFile(asset.sourcePath.split("/"), MAX_RECORD_BYTES).equals(data)) throw error; }
      state.assets.push(asset); return { type: prior ? "ASSET_VERSION_CREATED" : "ASSET_REGISTERED", subjectId: asset.assetId, code: "ASSET_REGISTERED", value: json(asset) };
    });
  }
  /** User-selected bytes only: no provider request, arbitrary source path or generation authority. */
  importFootage(input: unknown, bytes: Uint8Array, key: string, actor: string): StudioResult {
    assertStudioCompatibilityImportAllowed();
    const clean = validateFootageImport(jsonObject(input)); inspectStudioMp4(bytes);
    const data = Buffer.from(bytes), contentHash = sha(data);
    return this.apply(clean.projectId, key, jsonObject({ type: "IMPORT_LOCAL_FOOTAGE", input: clean, byteLength: data.length, contentHash }), actor, clean.requestedAt, state => {
      if (state.project.revision !== clean.expectedProjectRevision) return fail("REVISION_CONFLICT", "Reload the saved project before importing footage.");
      const index = state.shots.findIndex(shot => shot.shotId === clean.shotId);
      if (index < 0) return fail("MISSING_SHOT", "The selected shot does not exist.");
      const previousShot = copy(state.shots[index]);
      if (previousShot.revision !== clean.expectedShotRevision) return fail("REVISION_CONFLICT", "The selected shot changed before import.");
      if (state.jobs.some(job => job.shotId === clean.shotId && ["RUNNING", "WAITING_EXTERNAL"].includes(job.state))) return fail("ACTIVE_SHOT_JOB", "Finish or reconcile the active shot job before attaching footage.");
      const assetId: StudioId<"asset"> = `asset_${digest({ projectId: clean.projectId, shotId: clean.shotId, kind: "local-footage" }).slice(0, 24)}`;
      const prior = state.assets.filter(asset => asset.assetId === assetId).sort((a, b) => a.version - b.version).at(-1);
      if (prior && !isLocalFootageAsset(prior)) return fail("ASSET_VERSION_CONFLICT", "The reserved footage identity conflicts with another asset.");
      const ref: AssetRef = { assetId, version: (prior?.version ?? 0) + 1 };
      const lineage = prior ? [{ assetId: prior.assetId, version: prior.version }] : [];
      // Receipt replay has already returned. Destination selection is pure; provisioning is deferred.
      const storageBinding = this.footage.destination();
      const asset = validateAssetManifest({
        schemaVersion: 1, ...ref, projectId: clean.projectId, sourcePath: resolveAssetPath(clean.projectId, ref, "VIDEO", contentHash),
        contentHash, assetType: "VIDEO", approvalState: "DRAFT", dependencies: [], rights: clean.rights,
        createdAt: clean.requestedAt, supersededBy: null, lineage,
        provenance: {
          adapterMetadata: { adapterId: STUDIO_FOOTAGE_ADAPTER, provider: null, model: null, providerJobId: null, externalGenerationId: null,
            settings: { sourceLabel: clean.sourceLabel, originalName: clean.originalName, byteLength: data.length, contentType: "video/mp4", storage: "studio-footage-chunks-v1", originalAcquisitionCost: "UNKNOWN", costBasis: "LOCAL_IMPORT_NO_PROVIDER_REQUEST", ...(storageBinding ?? {}) } },
          promptId: null, negativePrompt: null, referenceAssets: [], timestamp: clean.requestedAt,
          cost: { currency: state.project.currency, minorUnits: 0 }, contentHash, parentAssets: lineage, jobId: null, approvalState: "DRAFT", rejectionReason: null,
        },
      });
      assertFootageCollection([...state.assets, asset]);
      const qc = validateQCResult({
        schemaVersion: 1, qcId: `qc_${digest({ assetId, version: ref.version, kind: "local-footage-review" }).slice(0, 24)}`,
        projectId: clean.projectId, subject: ref, rule: "LOCAL_FOOTAGE_DECODE_AND_HUMAN_REVIEW", result: "REVIEW",
        details: "Original imported bytes and top-level MP4 framing only. Codec decoding, duration/fps, audio, playback, rights clearance and visual quality are not verified. Human review required.", createdAt: clean.requestedAt,
      });
      const nextShot = validateShotManifest({ ...previousShot, revision: previousShot.revision + 1,
        inputAssets: [...previousShot.inputAssets.filter(item => item.assetId !== assetId), ref],
        status: "DRAFT", approvalState: "DRAFT", outputAssets: [], generationAttempts: [], selectedVersion: null, qcResults: [qc.qcId] });
      // Immutable media index is published last; aggregate CAS remains authoritative.
      // Interrupted or conflicting publication may leave safe unreferenced parts; never delete them.
      state.assets.push(asset); state.qcResults.push(qc); state.shots[index] = nextShot;
      return { type: prior ? "ASSET_VERSION_CREATED" : "ASSET_REGISTERED", subjectId: assetId, code: "LOCAL_FOOTAGE_IMPORTED_REVIEW_REQUIRED",
        beforePublish: () => this.footage.write(asset.sourcePath, data, storageBinding),
        value: json({ asset: ref, shotId: clean.shotId, shotRevision: nextShot.revision }),
        details: { previousShot: json(previousShot), qc: json(qc), generationCreated: false, providerRequests: 0, originalAcquisitionCost: "UNKNOWN", approvalReset: true, ...(storageBinding ? { mediaLibrary: json(storageBinding) } : {}) } };
    });
  }
  /** Qualified ordinary-file import. The HTTP boundary streams bytes into a
   * server-owned staging file; this transaction publishes immutable chunks
   * from that bounded source without materializing the complete file in JS. */
  importFootageFile(input: unknown, staged: StagedStudioMediaImport, key: string, actor: string): StudioResult {
    assertStudioCompatibilityImportAllowed();
    const clean = validateFootageImport(jsonObject(input)), mediaType = footageImportMediaType(clean);
    const expectedContentType = mediaType === "VIDEO" ? "video/mp4" : "audio/wav";
    if (!staged || staged.mediaType !== mediaType || staged.contentType !== expectedContentType || staged.technical?.mediaType !== mediaType ||
        staged.technical?.contentType !== expectedContentType || !Number.isSafeInteger(staged.byteLength) || staged.byteLength < 1 || staged.byteLength > STUDIO_FOOTAGE_MAX_BYTES ||
        typeof staged.contentHash !== "string" || !/^[a-f0-9]{64}$/u.test(staged.contentHash) || typeof staged.read !== "function" || typeof staged.close !== "function") {
      return fail("INVALID_FOOTAGE", "Qualified staged media differs from the exact import request.");
    }
    const technical = jsonObject(staged.technical), contentHash = staged.contentHash, byteLength = staged.byteLength;
    const request = jsonObject({ type: "IMPORT_QUALIFIED_LOCAL_MEDIA", input: clean, byteLength, contentHash, technical });
    return this.apply(clean.projectId, key, request, actor, clean.requestedAt, state => {
      if (state.project.revision !== clean.expectedProjectRevision) return fail("REVISION_CONFLICT", "Reload the saved project before importing media.");
      const index = state.shots.findIndex(shot => shot.shotId === clean.shotId);
      if (index < 0) return fail("MISSING_SHOT", "The selected shot does not exist.");
      const previousShot = copy(state.shots[index]);
      if (previousShot.revision !== clean.expectedShotRevision) return fail("REVISION_CONFLICT", "The selected shot changed before import.");
      if (state.jobs.some(job => job.shotId === clean.shotId && ["RUNNING", "WAITING_EXTERNAL"].includes(job.state))) return fail("ACTIVE_SHOT_JOB", "Finish or reconcile the active shot job before attaching media.");

      const stagedMetadata = { assetType: mediaType, byteLength, contentHash, ...staged.technical };
      const sameContent = state.assets.filter(asset => isQualifiedLocalMediaAsset(asset) && asset.assetType === mediaType && asset.contentHash === contentHash);
      const reusable = sameContent.find(asset => {
        if (!isQualifiedLocalMediaAsset(asset) || asset.assetType !== mediaType || asset.contentHash !== contentHash) return false;
        const settings = asset.provenance.adapterMetadata!.settings;
        try { return digest(localMediaTechnicalMetadata(asset)) === digest(stagedMetadata) && settings.originalName === clean.originalName && settings.sourceLabel === clean.sourceLabel && digest(asset.rights) === digest(clean.rights); }
        catch { return false; }
      });
      if (!reusable && sameContent.length > 0) return fail("IMPORT_METADATA_CONFLICT", "These exact immutable bytes are already registered with different source or rights metadata. Reuse the recorded source declaration instead of duplicating it.");
      let asset: Asset, prior: Asset | undefined, ref: AssetRef;
      if (reusable) {
        asset = reusable; ref = { assetId: asset.assetId, version: asset.version };
      } else {
        const identity = localMediaIdentity({ projectId: clean.projectId, shotId: clean.shotId, mediaType, originalName: clean.originalName, sourceLabel: clean.sourceLabel });
        const assetId: StudioId<"asset"> = `asset_${identity.slice(0, 24)}`;
        prior = state.assets.filter(candidate => candidate.assetId === assetId).sort((a, b) => a.version - b.version).at(-1);
        if (prior && (!isLocalFootageAsset(prior) || prior.assetType !== mediaType)) return fail("ASSET_VERSION_CONFLICT", "The reserved local-media identity conflicts with another asset.");
        ref = { assetId, version: (prior?.version ?? 0) + 1 };
        const lineage = prior ? [{ assetId: prior.assetId, version: prior.version }] : [];
        const storageBinding = this.footage.destination();
        asset = validateAssetManifest({
          schemaVersion: 1, ...ref, projectId: clean.projectId, sourcePath: resolveAssetPath(clean.projectId, ref, mediaType, contentHash),
          contentHash, assetType: mediaType, approvalState: "DRAFT", dependencies: [], rights: clean.rights,
          createdAt: clean.requestedAt, supersededBy: null, lineage,
          provenance: {
            adapterMetadata: { adapterId: STUDIO_FOOTAGE_ADAPTER, provider: null, model: null, providerJobId: null, externalGenerationId: null,
              settings: { sourceLabel: clean.sourceLabel, originalName: clean.originalName, byteLength, contentType: expectedContentType, storage: "studio-footage-chunks-v1", originalAcquisitionCost: "UNKNOWN", costBasis: "LOCAL_IMPORT_NO_PROVIDER_REQUEST", technical, ...(storageBinding ?? {}) } },
            promptId: null, negativePrompt: null, referenceAssets: [], timestamp: clean.requestedAt,
            cost: { currency: state.project.currency, minorUnits: 0 }, contentHash, parentAssets: lineage, jobId: null, approvalState: "DRAFT", rejectionReason: null,
          },
        });
        assertFootageCollection([...state.assets, asset]);
        const qc = validateQCResult({
          schemaVersion: 1, qcId: `qc_${digest({ assetId, version: ref.version, kind: "qualified-local-media-review" }).slice(0, 24)}`,
          projectId: clean.projectId, subject: ref, rule: "LOCAL_MEDIA_TECHNICAL_ADMISSION_AND_HUMAN_REVIEW", result: "REVIEW",
          details: mediaType === "VIDEO"
            ? "Exact configured FFprobe admission verified the supported MP4/H.264/yuv420p/25 fps CFR/SDR source and immutable bytes. Human creative, playback and rights review remain required."
            : "Exact configured FFprobe admission verified the supported WAV/PCM s16le/48 kHz mono-or-stereo source and immutable bytes. Human listening, mix and rights review remain required.",
          createdAt: clean.requestedAt,
        });
        state.assets.push(asset); state.qcResults.push(qc);
        const nextShot = validateShotManifest({ ...previousShot, revision: previousShot.revision + 1,
          ...(mediaType === "VIDEO"
            ? { inputAssets: [...previousShot.inputAssets.filter(item => item.assetId !== assetId), ref] }
            : { audio: [...previousShot.audio.filter(item => item.assetId !== assetId), ref] }),
          status: "DRAFT", approvalState: "DRAFT", outputAssets: [], generationAttempts: [], selectedVersion: null,
          qcResults: [...previousShot.qcResults, qc.qcId],
        });
        state.shots[index] = nextShot;
        return {
          type: prior ? "ASSET_VERSION_CREATED" : "ASSET_REGISTERED", subjectId: assetId, code: "LOCAL_MEDIA_IMPORTED_REVIEW_REQUIRED",
          beforePublish: () => this.footage.write(asset.sourcePath, staged, storageBinding),
          value: json({ asset: ref, shotId: clean.shotId, shotRevision: nextShot.revision, mediaType, reused: false }),
          details: { previousShot: json(previousShot), qc: json(qc), technicalAdmission: true, generationCreated: false, providerRequests: 0, originalAcquisitionCost: "UNKNOWN", approvalReset: true, binaryPublished: true, ...(storageBinding ? { mediaLibrary: json(storageBinding) } : {}) },
        };
      }

      // A separately keyed repeat of exact immutable bytes reuses the saved
      // Asset and chunks. It may attach an existing source to this shot, but
      // never creates another version merely because a layer/Take will use it.
      const current = mediaType === "VIDEO" ? previousShot.inputAssets : previousShot.audio;
      const alreadyAttached = current.some(item => assetKey(item) === assetKey(ref));
      if (!alreadyAttached) {
        const nextShot = validateShotManifest({ ...previousShot, revision: previousShot.revision + 1,
          ...(mediaType === "VIDEO" ? { inputAssets: [...previousShot.inputAssets.filter(item => item.assetId !== ref.assetId), ref] } : { audio: [...previousShot.audio.filter(item => item.assetId !== ref.assetId), ref] }),
          status: "DRAFT", approvalState: "DRAFT", outputAssets: [], generationAttempts: [], selectedVersion: null,
        });
        state.shots[index] = nextShot;
      }
      const savedShot = state.shots[index];
      return { type: "ASSET_REGISTERED", subjectId: ref.assetId, code: "LOCAL_MEDIA_REUSED",
        value: json({ asset: ref, shotId: clean.shotId, shotRevision: savedShot.revision, mediaType, reused: true }),
        details: { previousShot: json(previousShot), technicalAdmission: true, generationCreated: false, providerRequests: 0, originalAcquisitionCost: "UNKNOWN", approvalReset: !alreadyAttached, binaryPublished: false } };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  /** Conservative pre-transfer reservation check. The final aggregate CAS and
   * assertFootageCollection remain authoritative after the canonical hash and
   * exact metadata are known. One active upload is therefore counted as one new
   * version here; exact completed replays bypass session creation. */
  assertFootageImportCapacity(input: unknown, expectedBytes: number): void {
    assertStudioCompatibilityImportAllowed();
    const clean = validateFootageImport(jsonObject(input));
    if (!Number.isSafeInteger(expectedBytes) || expectedBytes < 1 || expectedBytes > STUDIO_FOOTAGE_MAX_BYTES) throw new FootageValidationError("INVALID_FOOTAGE", "The declared source length is outside the configured import ceiling.");
    const state = this.readSnapshot(clean.projectId);
    if (state.project.revision !== clean.expectedProjectRevision) fail("REVISION_CONFLICT", "Reload the saved project before reserving import capacity.");
    const shot = state.shots.find(item => item.shotId === clean.shotId);
    if (!shot || shot.revision !== clean.expectedShotRevision) fail("REVISION_CONFLICT", "Reload the saved shot before reserving import capacity.");
    if (state.jobs.some(job => job.shotId === clean.shotId && ["RUNNING", "WAITING_EXTERNAL"].includes(job.state))) fail("ACTIVE_SHOT_JOB", "Finish or reconcile the active shot job before reserving import capacity.");
    const imported = state.assets.filter(isLocalFootageAsset), logicalBytes = imported.reduce((sum, asset) => sum + localFootageByteLength(asset), 0);
    if (imported.length + 1 > STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS || logicalBytes + expectedBytes > STUDIO_FOOTAGE_PROJECT_MAX_BYTES) {
      throw new FootageValidationError("FOOTAGE_PROJECT_LIMIT", "This import would exceed the configured logical source-media quota.");
    }
  }
  openFootage(projectId: StudioId<"project">, assetId: StudioId<"asset">, version: number) {
    try { assertStudioId(projectId, "project"); assertStudioId(assetId, "asset"); }
    catch { return fail("INVALID_ASSET", "Use exact saved project and asset identities."); }
    if (!Number.isSafeInteger(version) || version < 1) return fail("INVALID_ASSET", "Use an exact saved asset version.");
    const asset = this.readSnapshot(projectId).assets.find(item => item.assetId === assetId && item.version === version);
    if (!asset || !isLocalFootageAsset(asset)) return fail("NOT_FOUND", "Imported local media was not found in this project.");
    if (isQualifiedLocalMediaAsset(asset)) {
      const technical = localMediaTechnicalMetadata(asset), reader = this.openAssetReader(asset);
      return { reader, contentType: technical.contentType, filename: technical.mediaType === "VIDEO" ? "imported-footage.mp4" : "imported-audio.wav", projectId, assetId, version, contentHash: asset.contentHash };
    }
    const bytes = this.assetContent(asset);
    let contentType: "video/mp4" | "audio/wav", filename: string;
    if (bytes.length >= 12 && bytes.toString("ascii", 4, 8) === "ftyp") { inspectStudioMp4(bytes); contentType = "video/mp4"; filename = "imported-footage.mp4"; }
    else if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WAVE") { contentType = "audio/wav"; filename = "imported-audio.wav"; }
    else return fail("CORRUPT_ASSET", "Stored local media no longer has its expected MP4 or WAV framing.");
    return { reader: this.memoryAssetReader(bytes, asset.contentHash), contentType, filename, projectId, assetId, version, contentHash: asset.contentHash };
  }
  readFootage(projectId: StudioId<"project">, assetId: StudioId<"asset">, version: number): Buffer {
    if (!Number.isSafeInteger(version) || version < 1) return fail("INVALID_ASSET", "Use an exact saved asset version.");
    const asset = this.readSnapshot(projectId).assets.find(item => item.assetId === assetId && item.version === version);
    if (!asset || !isLocalFootageAsset(asset)) return fail("NOT_FOUND", "Imported local media was not found in this project.");
    return this.assetContent(asset);
  }
  approvalScope(projectId: StudioId<"project">): string { return snapshotApprovalScope(this.load(projectId)); }
  recordApproval(input: Approval, key: string): StudioResult {
    const approval = validateApproval(input), now = approval.decidedAt ?? approval.createdAt;
    return this.apply(approval.projectId, key, jsonObject({ type: "APPROVAL", approval }), approval.actor, now, state => {
      if (state.approvals.some(item => item.approvalId === approval.approvalId)) return fail("APPROVAL_EXISTS", "Approval decisions are append-only.");
      if (approval.subjectHash !== this.approvalScope(approval.projectId)) return fail("STALE_APPROVAL", "Approval must bind the current project manifests/assets.");
      const index = Number(approval.gate.slice(-2)) - 1;
      if (approval.state === "APPROVED" && index > 0) { const priorGate = `GATE_${String(index).padStart(2, "0")}` as Approval["gate"]; const decision = evaluateApprovalGates(approval.projectId, [priorGate], approval.subjectHash, state.approvals); if (decision.status !== "ALLOWED") return { type: "JOB_BLOCKED", subjectId: approval.approvalId, blocked: true, code: "UPSTREAM_APPROVAL_REQUIRED", value: json(decision) }; }
      state.approvals.push(approval); return { type: approval.state === "APPROVED" ? "APPROVAL_GRANTED" : approval.state === "REJECTED" ? "APPROVAL_REJECTED" : "APPROVAL_REQUESTED", subjectId: approval.approvalId, code: "APPROVAL_RECORDED" };
    });
  }
  recordRoute(projectId: StudioId<"project">, shotId: StudioId<"shot">, observations: CapabilityObservation[], key: string, actor: string, now: string): StudioResult {
    const clean = json(observations) as unknown as CapabilityObservation[]; return this.apply(projectId, key, jsonObject({ type: "ROUTE", shotId, observations: clean }), actor, now, state => { const shot = state.shots.find(item => item.shotId === shotId); if (!shot) return fail("MISSING_SHOT", "Shot is not registered."); const route = routeShot(shot, clean, now); return { type: "ROUTE_SELECTED", subjectId: shotId, code: route.status, blocked: route.status === "BLOCKED", value: json(route) }; });
  }
  recordQC(input: QCResult, key: string, actor: string): StudioResult { const qc = validateQCResult(input); return this.apply(qc.projectId, key, jsonObject({ type: "QC", qc }), actor, qc.createdAt, state => { hasAssets(state, [qc.subject]); if (state.qcResults.some(item => item.qcId === qc.qcId)) return fail("QC_EXISTS", "QC evidence is immutable."); state.qcResults.push(qc); return { type: "QC_RECORDED", subjectId: qc.qcId, code: "QC_RECORDED" }; }); }
  /** MOCK-only intent preparation. An unknown estimate never becomes a zero-cost job. */
  prepareProviderJob(input: PrepareProviderJobInput, key: string, actor: string, now: string): StudioResult {
    const clean = jsonObject(input) as unknown as PrepareProviderJobInput;
    intentAssert(Object.keys(clean).sort().join() === "costPolicy,estimate,executionMode,maxCostUsd,modelId,promptId,references,request", "Preparation fields differ.");
    const request = validateHiggsfieldRequest(clean.request);
    return this.apply(request.projectId, key, jsonObject({ type: "PREPARE_MOCK_PROVIDER", input: clean }), actor, now, state => {
      intentAssert(clean.executionMode === "MOCK" && state.project.currency === "USD", "Only an explicit USD mock operation is supported.");
      const shot = state.shots.find(item => item.shotId === request.shotId);
      intentAssert(shot && shot.sequenceId === request.sequenceId && shot.revision === request.shotRevision, "Current shot revision required.");
      intentAssert(digest(buildHiggsfieldRequest(shot, clean.references)) === digest(request), "Exact provider payload must be built from the canonical shot.");
      const jobId: StudioId<"job"> = `job_${sha(`${request.projectId}:${key}`).slice(0, 24)}`;
      intentAssert(!state.jobs.some(job => job.jobId === jobId), "Job already exists.");
      const intent: HiggsfieldIntent = { schemaVersion: 1, kind: "HIGGSFIELD_SINGLE_TEST", executionMode: "MOCK", jobId, request, promptId: clean.promptId, modelId: clean.modelId, references: clean.references, estimate: clean.estimate, estimateId: `estimate_${digest({ executionMode: "MOCK", estimate: clean.estimate }).slice(0, 24)}`, maxCostUsd: clean.maxCostUsd, costPolicy: clean.costPolicy, scopeHash: snapshotApprovalScope(state), createdAt: now, updatedAt: now, phase: "PREPARED", approval: null, authorization: null, submissionToken: null, submissionStartedAt: null, providerStatus: null, observedRequestId: null, failure: null, generation: null, actualCostState: "MOCK_NO_SPEND" };
      const job: Job = { schemaVersion: 1, jobId, type: "GENERATION", projectId: request.projectId, shotId: request.shotId, dependencies: [], state: "QUEUED", attempt: 0, maxAttempts: 1, createdAt: now, startedAt: null, finishedAt: null, adapterMetadata: null, inputs: clean.references.map(({ assetId, version }) => ({ assetId, version })), outputs: [], error: null, checkpoint: providerCheckpoint(intent), costEstimate: estimateMoney(clean.estimate.usd), actualCost: { currency: "USD", minorUnits: 0 }, externalActions: ["EXTERNAL_GENERATION", "PAID_GENERATION"], requiredGates: ["GATE_03"], approvalSubjectHash: intent.scopeHash, dispatch: null };
      validateJob(job); readProviderIntent(job); this.assertProviderBudget(state, job, intent);
      state.jobs.push(job); return { type: "JOB_CREATED", subjectId: jobId, code: "MOCK_PROVIDER_JOB_PREPARED", value: json(job) };
    });
  }
  private providerJob(state: StudioSnapshot, jobId: StudioId<"job">): { job: Job; intent: HiggsfieldIntent } {
    const job = state.jobs.find(item => item.jobId === jobId); if (!job || !isManagedProviderJob(job)) return fail("MISSING_PROVIDER_JOB", "A canonical managed provider job is required.");
    return { job, intent: readProviderIntent(job) };
  }
  private assertProviderCurrent(state: StudioSnapshot, job: Job, intent: HiggsfieldIntent, now: string): void {
    intentTime(now);
    intentAssert(intent.scopeHash === snapshotApprovalScope(state) && state.shots.some(shot => shot.shotId === job.shotId && shot.revision === intent.request.shotRevision), "Approval/request scope became stale.");
    intentAssert(now < intent.estimate.expiresAt && now >= intent.estimate.estimatedAt, "Estimate expired or from the future.");
    this.assertProviderBudget(state, job, intent);
  }
  private assertProviderBudget(state: StudioSnapshot, job: Job, intent: HiggsfieldIntent): void {
    const charged = state.jobs.filter(item => item.type !== "ESTIMATE" && item.jobId !== job.jobId && (item.attempt > 0 || item.dispatch));
    const amount = (items: Job[]) => ({ currency: "USD", minorUnits: items.reduce((sum, item) => sum + Math.max(item.costEstimate.minorUnits, item.actualCost.minorUnits), 0) });
    const decision = evaluateCostPolicy(intent.costPolicy, { shotSpent: amount(charged.filter(item => item.shotId === job.shotId)), projectSpent: amount(charged), estimate: job.costEstimate, attempts: state.jobs.filter(item => item.type !== "ESTIMATE" && item.jobId !== job.jobId && item.shotId === job.shotId).reduce((sum, item) => sum + item.attempt, 0) });
    intentAssert(decision.status === "ALLOWED", "Cost or attempt policy blocks this exact operation.");
  }
  approveProviderJob(projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: string): StudioResult {
    return this.apply(projectId, key, jsonObject({ type: "APPROVE_MOCK_PROVIDER", jobId }), actor, now, state => {
      const { job, intent } = this.providerJob(state, jobId); this.assertProviderCurrent(state, job, intent, now);
      intentAssert(intent.phase === "PREPARED", "A scoped approval can be granted once, before authorization.");
      const scope = providerAuthorizationScope(intent);
      intent.phase = "APPROVED"; intent.approval = { approvalId: `approval_${digest({ scope, actor, now }).slice(0, 24)}`, subjectHash: scope, actor, approvedAt: now }; intent.updatedAt = now; job.checkpoint = providerCheckpoint(intent);
      return { type: "APPROVAL_GRANTED", subjectId: jobId, code: "MOCK_SCOPED_APPROVAL_RECORDED_NO_DISPATCH", value: json(job) };
    });
  }
  authorizeProviderJob(projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: string): StudioResult {
    return this.apply(projectId, key, jsonObject({ type: "AUTHORIZE_MOCK_PROVIDER", jobId }), actor, now, state => {
      const { job, intent } = this.providerJob(state, jobId); this.assertProviderCurrent(state, job, intent, now);
      intentAssert(intent.phase === "APPROVED", "Exact scoped approval is required before single-use authorization.");
      intentAssert(evaluateApprovalGates(projectId, REQUIRED_JOB_GATES.GENERATION, intent.scopeHash, state.approvals).status === "ALLOWED", "Existing production approval gates remain required.");
      const scope = providerAuthorizationScope(intent);
      intent.phase = "AUTHORIZED"; intent.authorization = { authorizationId: `authorization_${digest({ scope, actor, now }).slice(0, 24)}`, approvalId: intent.approval!.approvalId, subjectHash: scope, actor, authorizedAt: now, consumedAt: null }; intent.updatedAt = now; job.checkpoint = providerCheckpoint(intent);
      return { type: "JOB_CHECKPOINTED", subjectId: jobId, code: "MOCK_SINGLE_USE_AUTHORIZATION_NO_DISPATCH", value: json(job) };
    });
  }
  /** A successful receipt replay is NOT transport authority. Only this fresh exclusive claim returns acquired:true. */
  acquireProviderSubmission(projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: string): ProviderSubmissionAcquisition {
    checkKey(key); checkTime(now); intentAssert(actor.trim().length > 0 && actor.length <= 160, "Explicit actor required.");
    const state = this.load(projectId), { job, intent } = this.providerJob(state, jobId);
    if (intent.phase !== "AUTHORIZED" || job.dispatch || job.attempt !== 0 || state.receipts.some(receipt => receipt.keyHash === sha(key))) return { acquired: false, token: null, job, reason: "ATTEMPT_CONSUMED_OR_NOT_AUTHORIZED" };
    this.assertProviderCurrent(state, job, intent, now);
    intentAssert(evaluateApprovalGates(projectId, REQUIRED_JOB_GATES.GENERATION, intent.scopeHash, state.approvals).status === "ALLOWED", "Production approval is required.");
    const token = randomBytes(32).toString("hex");
    const claim = Buffer.from(canonical({ schemaVersion: 1, executionMode: "MOCK", projectId, jobId, requestDigest: intent.request.requestDigest, authorizationScope: providerAuthorizationScope(intent), token, claimedAt: now }), "utf8");
    try { this.root.writeAtomicExclusive(PROVIDER_CLAIM_PATH, `claim-${randomBytes(12).toString("hex")}.tmp`, claim); }
    catch (error) { if ((error as { code?: string }).code === "already_exists") return { acquired: false, token: null, job: this.load(projectId).jobs.find(item => item.jobId === jobId)!, reason: "WORKSPACE_SINGLE_TEST_CLAIM_EXISTS_RECONCILE" }; throw error; }
    // A crash/CAS loss after claim publication deliberately leaves a durable block.
    // This one-test checkpoint never reclaims by timeout, PID, success or process restart.
    let newlyConsumed = false;
    const result = this.apply(projectId, key, jsonObject({ type: "ACQUIRE_MOCK_PROVIDER", jobId, token, claimHash: sha(claim) }), actor, now, current => {
      const candidate = this.providerJob(current, jobId); this.assertProviderCurrent(current, candidate.job, candidate.intent, now);
      intentAssert(candidate.intent.phase === "AUTHORIZED" && candidate.intent.authorization?.consumedAt === null && candidate.job.attempt === 0 && !candidate.job.dispatch, "Submission already consumed.");
      intentAssert(evaluateApprovalGates(projectId, REQUIRED_JOB_GATES.GENERATION, candidate.intent.scopeHash, current.approvals).status === "ALLOWED", "Production approval is required.");
      candidate.intent.phase = "SUBMISSION_STARTED"; candidate.intent.submissionToken = token; candidate.intent.submissionStartedAt = now; candidate.intent.authorization.consumedAt = now; candidate.intent.updatedAt = now;
      candidate.job.checkpoint = providerCheckpoint(candidate.intent); candidate.job.state = "RUNNING"; candidate.job.attempt = 1; candidate.job.startedAt = now; candidate.job.dispatch = { token, state: "INTENT_RECORDED", recordedAt: now };
      current.costs.push({ schemaVersion: 1, costId: `cost_${sha(key).slice(0, 24)}`, projectId, shotId: candidate.job.shotId, jobId, kind: "RESERVED", amount: candidate.job.costEstimate, createdAt: now });
      newlyConsumed = true;
      return { type: "JOB_STARTED", subjectId: jobId, code: "MOCK_SUBMISSION_STARTED_BEFORE_POST", value: json(candidate.job) };
    }, claim);
    intentAssert(newlyConsumed && result.status === "APPLIED", "Replayed receipt cannot authorize dispatch.");
    return { acquired: true, token, job: result.value as unknown as Job, reason: "FRESH_MOCK_AUTHORITY_ONLY" };
  }
  private providerOutcome(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, request: JsonObject, key: string, actor: string, now: string, update: (state: StudioSnapshot, job: Job, intent: HiggsfieldIntent) => Change): StudioResult {
    return this.apply(projectId, key, request, actor, now, state => {
      const { job, intent } = this.providerJob(state, jobId);
      intentAssert(token === intent.submissionToken && job.dispatch?.token === token && job.attempt === 1, "Outcome is not bound to the consumed intent.");
      intentAssert(!["INGESTED", "FAILED", "NSFW", "CANCELED"].includes(intent.phase), "Terminal provider outcomes are immutable.");
      const result = update(state, job, intent); intent.updatedAt = now; job.checkpoint = providerCheckpoint(intent); result.value = json(job); return result;
    });
  }
  recordProviderAcceptance(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, status: HiggsfieldStatus, key: string, actor: string, now: string): StudioResult {
    const clean = validateHiggsfieldStatus(status);
    return this.providerOutcome(projectId, jobId, token, jsonObject({ type: "MOCK_PROVIDER_ACCEPTANCE", jobId, token, status: clean }), key, actor, now, (_state, job, intent) => {
      intentAssert(["SUBMISSION_STARTED", "SUBMISSION_STATE_UNKNOWN"].includes(intent.phase) && !intent.providerStatus, "Acceptance already recorded.");
      this.applyProviderStatus(job, intent, clean, now); return { type: "JOB_CHECKPOINTED", subjectId: jobId, code: "MOCK_PROVIDER_IDENTITY_DURABLY_RECORDED" };
    });
  }
  recordProviderUnknown(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, key: string, actor: string, now: string, observedRequestId: string | null = null): StudioResult {
    intentAssert(observedRequestId === null || (typeof observedRequestId === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(observedRequestId)), "Only a safely validated provider UUID may be retained from a malformed response.");
    return this.providerOutcome(projectId, jobId, token, jsonObject({ type: "MOCK_PROVIDER_AMBIGUOUS_POST", jobId, token, observedRequestId }), key, actor, now, (_state, job, intent) => {
      intentAssert(intent.phase === "SUBMISSION_STARTED", "Only an unacknowledged POST can become submission-unknown.");
      intent.phase = "SUBMISSION_STATE_UNKNOWN"; intent.observedRequestId = observedRequestId; intent.failure = { code: "SUBMISSION_STATE_UNKNOWN", message: "The provider may have accepted the request. Attempt consumed; reconciliation required. Never resend this POST.", at: now }; job.error = { code: intent.failure.code, message: intent.failure.message, retryable: false };
      return { type: "JOB_CHECKPOINTED", subjectId: jobId, code: "SUBMISSION_STATE_UNKNOWN" };
    });
  }
  recordProviderFailure(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, code: "EXPLICIT_SUBMISSION_REJECTED", key: string, actor: string, now: string): StudioResult {
    intentAssert(code === "EXPLICIT_SUBMISSION_REJECTED", "Transport errors must be recorded as unknown, not a safe retry.");
    return this.providerOutcome(projectId, jobId, token, jsonObject({ type: "MOCK_PROVIDER_EXPLICIT_REJECTION", jobId, token, code }), key, actor, now, (_state, job, intent) => {
      intentAssert(intent.phase === "SUBMISSION_STARTED", "Explicit rejection must precede provider acceptance.");
      intent.phase = "FAILED"; intent.failure = { code, message: "Mock provider explicitly rejected the one submission. No retry is authorized.", at: now }; job.state = "FAILED"; job.finishedAt = now; job.error = { code, message: intent.failure.message, retryable: false }; job.dispatch!.state = "COMPLETED";
      return { type: "JOB_FAILED", subjectId: jobId, code };
    });
  }
  private applyProviderStatus(job: Job, intent: HiggsfieldIntent, status: HiggsfieldStatus, now: string): void {
    intentAssert(intent.observedRequestId === null || intent.observedRequestId === status.requestId, "Acceptance differs from the safely observed provider identity.");
    if (intent.providerStatus) {
      intentAssert(status.requestId === intent.providerStatus.requestId, "Provider identity changed.");
      intentAssert(!(intent.providerStatus.status === "in_progress" && status.status === "queued") && intent.providerStatus.status !== "completed", "Provider lifecycle regressed.");
      for (const field of ["statusUrl", "cancelUrl"] as const) if (intent.providerStatus[field]) intentAssert(status[field] === intent.providerStatus[field], "Provider lifecycle URL changed.");
    }
    intent.providerStatus = status; intent.observedRequestId = status.requestId; intent.failure = null; job.error = null;
    job.adapterMetadata = { adapterId: "higgsfield-official-rest-mock-v1", provider: "HIGGSFIELD", model: intent.request.model, providerJobId: status.requestId, externalGenerationId: status.requestId, settings: { executionMode: "MOCK", requestDigest: intent.request.requestDigest, correlationId: status.correlationId, temporaryVideoUrl: status.videoUrl, actualCostState: "MOCK_NO_SPEND" } };
    job.dispatch!.state = "ACKNOWLEDGED"; job.state = "WAITING_EXTERNAL";
    intent.phase = status.status === "completed" ? "COMPLETED" : status.status === "failed" ? "FAILED" : status.status === "nsfw" ? "NSFW" : status.status === "canceled" ? "CANCELED" : "ACCEPTED";
    if (["FAILED", "NSFW", "CANCELED"].includes(intent.phase)) {
      job.state = intent.phase === "CANCELED" ? "CANCELLED" : "FAILED"; job.finishedAt = now; job.dispatch!.state = "COMPLETED";
      if (job.state === "FAILED") { intent.failure = { code: status.errorCode ?? intent.phase, message: "Mock provider returned an explicit terminal failure; no retry is authorized.", at: now }; job.error = { code: intent.failure.code, message: intent.failure.message, retryable: false }; }
    }
  }
  recordProviderStatus(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, status: HiggsfieldStatus, key: string, actor: string, now: string): StudioResult {
    const clean = validateHiggsfieldStatus(status);
    return this.providerOutcome(projectId, jobId, token, jsonObject({ type: "MOCK_PROVIDER_STATUS", jobId, token, status: clean }), key, actor, now, (_state, job, intent) => {
      intentAssert(intent.phase === "ACCEPTED", "Only a known nonterminal provider request can be polled."); this.applyProviderStatus(job, intent, clean, now);
      return { type: job.state === "FAILED" ? "JOB_FAILED" : job.state === "CANCELLED" ? "JOB_CANCELLED" : "JOB_CHECKPOINTED", subjectId: jobId, code: `MOCK_PROVIDER_${clean.status.toUpperCase()}` };
    });
  }
  recordProviderCancel(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, status: HiggsfieldStatus, key: string, actor: string, now: string): StudioResult {
    const clean = validateHiggsfieldStatus(status);
    return this.providerOutcome(projectId, jobId, token, jsonObject({ type: "MOCK_PROVIDER_CANCEL", jobId, token, status: clean }), key, actor, now, (_state, job, intent) => {
      intentAssert(intent.phase === "ACCEPTED" && intent.providerStatus?.status === "queued" && intent.providerStatus.cancelUrl && clean.status === "canceled", "Only a provider-confirmed queued cancellation is supported."); this.applyProviderStatus(job, intent, clean, now);
      return { type: "JOB_CANCELLED", subjectId: jobId, code: "MOCK_PROVIDER_CANCELLATION_CONFIRMED" };
    });
  }
  ingestProviderOutput(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, input: { bytes: Uint8Array; contentType: string; temporaryUrl: string }, key: string, actor: string, now: string): StudioResult {
    const data = Buffer.from(input.bytes); assertMockMp4Structure(data, input.contentType);
    const contentHash = sha(data);
    return this.providerOutcome(projectId, jobId, token, jsonObject({ type: "INGEST_MOCK_PROVIDER_OUTPUT", jobId, token, contentType: input.contentType, contentHash, size: data.length, temporaryUrl: input.temporaryUrl }), key, actor, now, (state, job, intent) => {
      intentAssert(intent.phase === "COMPLETED" && intent.providerStatus?.videoUrl === input.temporaryUrl && job.adapterMetadata, "Ingestion requires the exact completed provider output URL.");
      const assetId: StudioId<"asset"> = `asset_${sha(`${jobId}:${contentHash}`).slice(0, 24)}`, ref: AssetRef = { assetId, version: 1 };
      intentAssert(!state.assets.some(asset => asset.assetId === assetId), "Immutable output already exists.");
      const asset = validateAssetManifest({ schemaVersion: 1, ...ref, projectId, sourcePath: resolveAssetPath(projectId, ref, "VIDEO", contentHash), contentHash, assetType: "VIDEO", approvalState: "DRAFT", provenance: { adapterMetadata: job.adapterMetadata, promptId: intent.promptId, negativePrompt: null, referenceAssets: job.inputs, timestamp: now, cost: { currency: "USD", minorUnits: 0 }, contentHash, parentAssets: job.inputs, jobId, approvalState: "DRAFT", rejectionReason: null }, dependencies: job.inputs, rights: { status: "UNKNOWN", license: null, evidence: null }, createdAt: now, supersededBy: null, lineage: [] });
      try { this.root.writeAtomicExclusive(asset.sourcePath.split("/"), `output-${randomBytes(12).toString("hex")}.tmp`, data); }
      catch (error) { if ((error as { code?: string }).code !== "already_exists" || !this.root.readFile(asset.sourcePath.split("/"), MAX_RECORD_BYTES).equals(data)) throw error; }
      state.assets.push(asset);
      const shot = state.shots.find(item => item.shotId === job.shotId)!;
      const qc: QCResult = { schemaVersion: 1, qcId: `qc_${sha(`${jobId}:structure`).slice(0, 24)}`, projectId, subject: ref, rule: "MOCK_MP4_STRUCTURE_V1", result: "PASS", details: "Synthetic mock only: bounded ISO-BMFF framing, MP4 brand, video track metadata and nonempty media data validated. No decoding, playback or visual-quality claim.", createdAt: now };
      const review: QCResult = { ...qc, qcId: `qc_${sha(`${jobId}:decode-review`).slice(0, 24)}`, rule: "DECODE_AND_HUMAN_QUALITY", result: "REVIEW", details: "Not decoded or visually accepted. This synthetic structural test output must not be presented as a usable generated video." };
      state.qcResults.push(validateQCResult(qc), validateQCResult(review)); shot.qcResults.push(qc.qcId, review.qcId); shot.outputAssets.push(ref);
      job.outputs = [ref]; job.state = "SUCCEEDED"; job.finishedAt = now; job.dispatch!.state = "COMPLETED";
      intent.generation = { schemaVersion: 1, generationId: `generation_${sha(jobId).slice(0, 24)}`, shotId: intent.request.shotId, jobId, promptId: intent.promptId, modelId: intent.modelId, outputs: [ref], adapterMetadata: job.adapterMetadata };
      shot.generationAttempts.push(intent.generation.generationId); intent.phase = "INGESTED";
      return { type: "JOB_COMPLETED", subjectId: jobId, code: "MOCK_OUTPUT_CANONICALLY_INGESTED_TECHNICAL_QC_ONLY", details: { asset: json(asset), generation: json(intent.generation), qc: json([qc, review]), actualSpendRecorded: false } };
    });
  }
  /** Prepare the shared provider-ready snapshot. No transport, credentials, generation job or approval is created. */
  prepareEstimateIntent(projectId: StudioId<"project">, shotId: StudioId<"shot">, expectedProjectRevision: number, expectedShotRevision: number, key: string, actor: string, now: string, executionMode: EstimateIntent["executionMode"] = "MOCK"): StudioResult {
    intentAssert(["MOCK", "LIVE_ESTIMATE"].includes(executionMode), "Invalid estimate provenance.");
    return this.apply(projectId, key, jsonObject({ type: "PREPARE_ESTIMATE", shotId, expectedProjectRevision, expectedShotRevision, executionMode }), actor, now, state => {
      const shot = state.shots.find(item => item.shotId === shotId);
      if (!shot) return fail("MISSING_SHOT", "Estimate shot is missing.");
      if (state.project.revision !== expectedProjectRevision || shot.revision !== expectedShotRevision) return fail("STALE_REVISION", "Refresh the exact project and shot before preparing an estimate.");
      intentAssert(state.project.currency === "USD", "Estimate quote currency requires a USD synthetic project.");
      const request = buildHiggsfieldRequest(shot), route = routeShot(shot, [], now, { purpose: "ESTIMATE", provider: request.provider, model: request.model });
      if (route.status !== "PLANNING_ELIGIBLE" || route.selectedEngines.join() !== "HIGGSFIELD") return fail("ESTIMATE_ROUTE_BLOCKED", "Canonical routing does not permit this documented estimate.");
      // One canonical estimate intent per shot in this one-test phase. New keys cannot reset its attempt.
      if (state.jobs.some(job => isEstimateJob(job) && job.shotId === shotId)) return fail("ESTIMATE_INTENT_EXISTS", "The saved estimate intent must be inspected; it cannot be replaced or reset.");
      const jobId: StudioId<"job"> = `job_${digest({ operation: "ESTIMATE", projectId, shotId }).slice(0, 24)}`, scopeHash = snapshotApprovalScope(state);
      const intent: EstimateIntent = { schemaVersion: 1, operation: "ESTIMATE", executionMode, estimateIntentId: jobId, request, endpoint: ESTIMATE_ENDPOINT, operationDigest: estimateOperationDigest(request), scopeHash, preparedProjectRevision: state.project.revision, attempt: 0, maxAttempts: 1, phase: "PREPARED", createdAt: now, startedAt: null, completedAt: null, authorization: null, correlationId: null, result: null, failure: null };
      const job: Job = { schemaVersion: 1, jobId, type: "ESTIMATE", projectId, shotId, dependencies: [], state: "QUEUED", attempt: 0, maxAttempts: 1, createdAt: now, startedAt: null, finishedAt: null, adapterMetadata: null, inputs: [], outputs: [], error: null, checkpoint: estimateCheckpoint(intent), costEstimate: { currency: "USD", minorUnits: 0 }, actualCost: { currency: "USD", minorUnits: 0 }, externalActions: [], requiredGates: [], approvalSubjectHash: scopeHash, dispatch: null };
      validateJob(job); readEstimateIntent(job); state.jobs.push(job);
      return { type: "JOB_CREATED", subjectId: jobId, code: `${executionMode}_ESTIMATE_PREPARED_NO_EXECUTION`, value: json(job) };
    });
  }
  private estimateJob(state: StudioSnapshot, jobId: StudioId<"job">): { job: Job; intent: EstimateIntent } {
    const job = state.jobs.find(item => item.jobId === jobId);
    if (!job || !isEstimateJob(job)) return fail("MISSING_ESTIMATE_INTENT", "A saved estimate-only intent is required.");
    return { job, intent: readEstimateIntent(job) };
  }
  private assertEstimateCurrent(state: StudioSnapshot, job: Job, intent: EstimateIntent, now: string): void {
    checkTime(now);
    const shot = state.shots.find(item => item.shotId === job.shotId), sequence = state.sequences.find(item => item.sequenceId === intent.request.sequenceId);
    if (!shot || !sequence || sequence.projectId !== state.project.projectId || !sequence.shotIds.includes(shot.shotId) || shot.revision !== intent.request.shotRevision || intent.scopeHash !== snapshotApprovalScope(state)) return fail("STALE_ESTIMATE", "The prepared project, sequence or shot changed. Re-estimate requires a fresh authorized phase.");
    let current;
    try { current = buildHiggsfieldRequest(shot); } catch { return fail("STALE_ESTIMATE", "The current shot no longer matches the prepared provider contract."); }
    if (digest(current) !== digest(intent.request) || estimateOperationDigest(current) !== intent.operationDigest) return fail("STALE_ESTIMATE", "The exact prepared estimate request changed.");
    const route = routeShot(shot, [], now, { purpose: "ESTIMATE", provider: current.provider, model: current.model });
    if (route.status !== "PLANNING_ELIGIBLE" || route.selectedEngines.join() !== "HIGGSFIELD") return fail("ESTIMATE_ROUTE_BLOCKED", "Estimate routing is no longer eligible.");
    if (intent.executionMode === "LIVE_ESTIMATE" && intent.authorization) {
      const age = Date.parse(now) - Date.parse(intent.authorization.authorizedAt);
      if (age < 0 || age > LIVE_ESTIMATE_AUTHORIZATION_TTL_MS) return fail("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "Estimate authority expired or is not yet valid.");
    }
  }
  authorizeEstimateIntent(projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: string, exactLiveAuthority?: LiveEstimateAuthorization): StudioResult {
    return this.apply(projectId, key, jsonObject({ type: "AUTHORIZE_ESTIMATE_ONLY", jobId, exactLiveAuthority: exactLiveAuthority ?? null }), actor, now, state => {
      const { job, intent } = this.estimateJob(state, jobId); this.assertEstimateCurrent(state, job, intent, now);
      if (intent.executionMode === "LIVE_ESTIMATE" ? !exactLiveAuthority || digest(exactLiveAuthority) !== digest(liveEstimateAuthorization(intent)) : exactLiveAuthority !== undefined) return fail("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "Exact server-side estimate authority required.");
      if (intent.phase !== "PREPARED" || job.attempt !== 0) return fail("ESTIMATE_NOT_AVAILABLE", "Estimate authority is single use and cannot be replaced.");
      intent.authorization = { operation: "ESTIMATE", executionMode: intent.executionMode, scopeHash: estimateAuthorizationScope(intent), actor, authorizedAt: now, consumedAt: null }; intent.phase = "READY"; job.checkpoint = estimateCheckpoint(intent);
      return { type: "JOB_CHECKPOINTED", subjectId: jobId, code: `${intent.executionMode}_ESTIMATE_ONLY_READY`, value: json(job) };
    });
  }
  /** Native exclusive claim and fenced aggregate CAS, not a UI flag/process mutex. Claims are never reclaimed. */
  acquireEstimateExecution(projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: string, executionMode: EstimateIntent["executionMode"] = "MOCK"): ProviderSubmissionAcquisition {
    checkKey(key); checkTime(now); intentAssert(typeof actor === "string" && actor.trim().length > 0 && actor.length <= 160, "Explicit estimate actor required.");
    const state = this.load(projectId), { job, intent } = this.estimateJob(state, jobId);
    if (intent.executionMode !== executionMode) return fail("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "Estimate execution provenance differs.");
    if (intent.phase !== "READY" || job.attempt !== 0 || job.dispatch || state.receipts.some(receipt => receipt.keyHash === sha(key))) return { acquired: false, token: null, job, reason: "ESTIMATE_ATTEMPT_CONSUMED_OR_NOT_READY" };
    this.assertEstimateCurrent(state, job, intent, now);
    const token = randomBytes(32).toString("hex"), claim = Buffer.from(canonical({ schemaVersion: 1, operation: "ESTIMATE", executionMode, projectId, jobId, operationDigest: intent.operationDigest, scopeHash: estimateAuthorizationScope(intent), token, claimedAt: now }), "utf8");
    try { this.root.writeAtomicExclusive(ESTIMATE_CLAIM_PATH, `estimate-claim-${randomBytes(12).toString("hex")}.tmp`, claim); }
    catch (error) { if ((error as { code?: string }).code === "already_exists") return { acquired: false, token: null, job: this.load(projectId).jobs.find(item => item.jobId === jobId)!, reason: "ESTIMATE_CLAIM_CONSUMED_RECONCILIATION_REQUIRED" }; throw error; }
    let fresh = false;
    const result = this.apply(projectId, key, jsonObject({ type: "ACQUIRE_ESTIMATE", executionMode, jobId, token, claimHash: sha(claim) }), actor, now, current => {
      const candidate = this.estimateJob(current, jobId); this.assertEstimateCurrent(current, candidate.job, candidate.intent, now);
      if (candidate.intent.phase !== "READY" || candidate.job.attempt !== 0 || candidate.job.dispatch || candidate.intent.authorization?.consumedAt !== null) return fail("ESTIMATE_ATTEMPT_CONSUMED", "Estimate attempt was already consumed.");
      candidate.intent.phase = "EXECUTION_STARTED"; candidate.intent.attempt = 1; candidate.intent.startedAt = now; candidate.intent.authorization.consumedAt = now;
      candidate.job.state = "RUNNING"; candidate.job.attempt = 1; candidate.job.startedAt = now; candidate.job.dispatch = { token, state: "INTENT_RECORDED", recordedAt: now }; candidate.job.checkpoint = estimateCheckpoint(candidate.intent); fresh = true;
      return { type: "JOB_STARTED", subjectId: jobId, code: `${executionMode}_ESTIMATE_STARTED_BEFORE_TRANSPORT`, value: json(candidate.job) };
    }, claim, ESTIMATE_CLAIM_PATH);
    intentAssert(fresh && result.status === "APPLIED", "Replayed receipts never confer estimate execution.");
    return { acquired: true, token, job: result.value as unknown as Job, reason: `FRESH_${executionMode}_ESTIMATE_ONLY_AUTHORITY` };
  }
  /** Recheck immediately before dispatch; a persisted token alone cannot be replayed. */
  assertAcquiredEstimateCurrent(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, now: string): void {
    const state = this.load(projectId), { job, intent } = this.estimateJob(state, jobId);
    if (intent.executionMode !== "LIVE_ESTIMATE" || intent.phase !== "EXECUTION_STARTED" || job.attempt !== 1 || job.dispatch?.token !== token || intent.authorization?.consumedAt !== intent.startedAt) return fail("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "Acquired estimate authority required.");
    this.assertEstimateCurrent(state, job, intent, now);
  }
  recordEstimateOutcome(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, outcome: EstimateOutcome, key: string, actor: string, now: string): StudioResult {
    const clean = jsonObject(outcome) as unknown as EstimateOutcome;
    if (Object.keys(clean).sort().join() !== "correlationId,failure,phase,result") return fail("INVALID_ESTIMATE_OUTCOME", "Only normalized estimate outcome fields are accepted.");
    return this.apply(projectId, key, jsonObject({ type: "RECORD_ESTIMATE_OUTCOME", jobId, outcome: clean }), actor, now, state => {
      const { job, intent } = this.estimateJob(state, jobId);
      if (intent.phase !== "EXECUTION_STARTED" || job.attempt !== 1 || job.dispatch?.token !== token || !/^[a-f0-9]{64}$/u.test(token)) return fail("ESTIMATE_OUTCOME_BINDING", "Estimate outcome requires its consumed single-use authority; terminal outcomes are immutable.");
      if (!["SUCCEEDED", "FAILED", "RESULT_UNKNOWN"].includes(clean.phase)) return fail("INVALID_ESTIMATE_OUTCOME", "Estimate outcome must be terminal.");
      intent.phase = clean.phase; intent.completedAt = now; intent.result = clean.result; intent.failure = clean.failure; intent.correlationId = clean.correlationId;
      job.finishedAt = now; job.state = clean.phase === "SUCCEEDED" ? "SUCCEEDED" : "FAILED"; job.dispatch.state = "COMPLETED"; job.error = clean.failure ? { code: clean.failure.code, message: clean.failure.code, retryable: false } : null; job.checkpoint = estimateCheckpoint(intent);
      validateJob(job); readEstimateIntent(job);
      return { type: clean.phase === "SUCCEEDED" ? "JOB_COMPLETED" : "JOB_FAILED", subjectId: jobId, code: `${intent.executionMode}_${clean.phase === "SUCCEEDED" ? "ESTIMATE_SUCCEEDED" : clean.failure!.code}`, value: json(job) };
    });
  }
  readBlenderSource(projectId: StudioId<"project">, ref: AssetRef): BlenderSourceDescriptor {
    const asset = this.readSnapshot(projectId).assets.find(item => assetKey(item) === assetKey(ref));
    if (!asset || !isBlenderSourceAsset(asset)) return blenderFail("BLENDER_SOURCE_NOT_FOUND");
    return validateBlenderSourceDescriptor(parseStudioJson(this.assetContent(asset).toString("utf8")));
  }
  registerBlenderSource(input: { projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; requestedAt: string; descriptor: BlenderSourceDescriptor }, key: string, actor: string): StudioResult {
    assertStudioCompatibilityImportAllowed(); const descriptor = validateBlenderSourceDescriptor(input.descriptor), bytes = Buffer.from(canonical(descriptor)), contentHash = sha(bytes);
    if (descriptor.format !== "studio-blender-source-v1") return blenderFail("BLENDER_MANAGED_REVISION_ONLY");
    return this.apply(input.projectId, key, jsonObject({ type: "REGISTER_BLENDER_SOURCE", input: { ...input, descriptor } }), actor, input.requestedAt, state => {
      if (state.project.revision !== input.expectedProjectRevision || !state.shots.some(shot => shot.shotId === input.shotId)) return blenderFail("BLENDER_CONFLICT");
      retainBlenderEditorialBaseline(this.root, state);
      const assetId = `asset_blender_${digest({ projectId: input.projectId, shotId: input.shotId, catalogueId: descriptor.catalogueId }).slice(0, 24)}` as StudioId<"asset">;
      const prior = state.assets.filter(asset => asset.assetId === assetId).at(-1);
      if (prior?.contentHash === contentHash) return { type: "ASSET_REGISTERED", subjectId: assetId, code: "BLENDER_SOURCE_REUSED", value: json({ source: { assetId, version: prior.version }, descriptorHash: contentHash }), details: { blenderOperation: true } };
      const ref = { assetId, version: (prior?.version ?? 0) + 1 }, lineage = prior ? [{ assetId, version: prior.version }] : [];
      const asset = validateAssetManifest({ schemaVersion: 1, ...ref, projectId: input.projectId, sourcePath: resolveAssetPath(input.projectId, ref, "DOCUMENT", contentHash), contentHash, assetType: "DOCUMENT", approvalState: "DRAFT", dependencies: [], rights: { status: "UNKNOWN", license: null, evidence: "Operator-designated local native source. No ownership or commercial clearance inferred." }, createdAt: input.requestedAt, supersededBy: null, lineage,
        provenance: { adapterMetadata: { adapterId: BLENDER_SOURCE_ADAPTER, provider: null, model: null, providerJobId: null, externalGenerationId: null, settings: { format: descriptor.format, catalogueId: descriptor.catalogueId, shotId: input.shotId, descriptorHash: contentHash, blendSha256: descriptor.source.sha256, dependenciesDigest: digest(descriptor.dependencies) } }, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: input.requestedAt, cost: { currency: state.project.currency, minorUnits: 0 }, contentHash, parentAssets: lineage, jobId: null, approvalState: "DRAFT", rejectionReason: null } });
      state.assets.push(asset);
      return { type: prior ? "ASSET_VERSION_CREATED" : "ASSET_REGISTERED", subjectId: assetId, code: "BLENDER_SOURCE_REGISTERED", value: json({ source: ref, descriptorHash: contentHash }), details: { blenderOperation: true }, beforePublish: () => {
        try { this.root.writeAtomicExclusive(asset.sourcePath.split("/"), `blender-source-${randomBytes(12).toString("hex")}.tmp`, bytes); }
        catch (error) { if ((error as { code?: string }).code !== "already_exists" || !this.root.readFile(asset.sourcePath.split("/"), MAX_RECORD_BYTES).equals(bytes)) throw error; }
      } };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  readBlenderNativeVersion(projectId: StudioId<"project">, ref: AssetRef): Buffer {
    const descriptor = this.readBlenderSource(projectId, ref), revision = descriptor.revision;
    if (descriptor.format !== "studio-blender-source-revision-v1" || !revision || revision.nativeStorage.indexPath !== `${resolveStudioPath(projectId, "blender")}/native-versions/${descriptor.source.sha256}.blend.json`) return blenderFail("BLENDER_NATIVE_PATH_INVALID");
    const job = this.readSnapshot(projectId).jobs.find(item => item.jobId === revision.jobId); if (!job || !isBlenderEditJob(job)) return blenderFail("BLENDER_EDIT_BINDING");
    const execution = readBlenderEditJob(job); if (execution.phase !== "COMPLETED" || !execution.source || assetKey(execution.source) !== assetKey(ref) || execution.proposalDigest !== revision.proposalDigest || digest(execution.verification) !== digest(revision.verification) || assetKey(execution.proposal.source) !== assetKey(revision.parent)) return blenderFail("BLENDER_EDIT_BINDING");
    const reader = openStudioFootageSource(this.root, revision.nativeStorage.indexPath, descriptor.source.sha256, descriptor.source.byteLength);
    try {
      const bytes = Buffer.allocUnsafe(descriptor.source.byteLength);
      for (let offset = 0; offset < bytes.length; offset += STUDIO_FOOTAGE_CHUNK_BYTES) {
        const part = reader.read(offset, Math.min(STUDIO_FOOTAGE_CHUNK_BYTES, bytes.length - offset)); part.copy(bytes, offset);
      }
      if (sha(bytes) !== descriptor.source.sha256) return blenderFail("BLENDER_NATIVE_CHANGED"); return bytes;
    } finally { reader.close(); }
  }
  prepareBlenderEdit(input: { projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; requestedAt: string; proposal: BlenderEditProposal }, key: string, actor: string): StudioResult {
    const proposal = validateBlenderEditProposal(input.proposal);
    return this.apply(input.projectId, key, jsonObject({ type: "PREPARE_BLENDER_EDIT", input: { ...input, proposal } }), actor, input.requestedAt, state => {
      if (state.project.revision !== input.expectedProjectRevision || proposal.projectId !== input.projectId || proposal.shotId !== input.shotId || !state.shots.some(shot => shot.shotId === input.shotId)) return blenderFail("BLENDER_EDIT_STALE");
      const source = state.assets.filter(asset => asset.assetId === proposal.source.assetId).at(-1), descriptor = this.readBlenderSource(input.projectId, proposal.source);
      if (!source || source.version !== proposal.source.version || source.contentHash !== proposal.descriptorHash || descriptor.source.sha256 !== proposal.blendSha256 || source.provenance.adapterMetadata?.settings.shotId !== input.shotId) return blenderFail("BLENDER_EDIT_STALE");
      if (state.jobs.filter(job => isBlenderJob(job) || isBlenderEditJob(job)).length >= 32 || state.jobs.some(job => (isBlenderJob(job) || isBlenderEditJob(job)) && job.state === "RUNNING")) return blenderFail("BLENDER_CAPACITY");
      retainBlenderEditorialBaseline(this.root, state);
      const execution: BlenderEditExecution = { format: "studio-blender-material-execution-v1", proposal, proposalDigest: digest(proposal), preparedRevision: state.project.revision + 1, phase: "PREPARED", process: null, verification: null, source: null };
      const job = validateJob({ schemaVersion: 1, jobId: `job_blender_edit_${digest({ projectId: input.projectId, key }).slice(0, 24)}`, type: "EDIT", projectId: input.projectId, shotId: input.shotId, dependencies: [], state: "QUEUED", attempt: 0, maxAttempts: 1, createdAt: input.requestedAt, startedAt: null, finishedAt: null, adapterMetadata: null, inputs: [proposal.source], outputs: [], error: null, checkpoint: blenderEditCheckpoint(execution), costEstimate: { currency: state.project.currency, minorUnits: 0 }, actualCost: { currency: state.project.currency, minorUnits: 0 }, externalActions: [], requiredGates: [], approvalSubjectHash: execution.proposalDigest, dispatch: null });
      if (state.jobs.some(item => item.jobId === job.jobId)) return blenderFail("BLENDER_CONFLICT"); readBlenderEditJob(job); state.jobs.push(job);
      return { type: "JOB_CREATED", subjectId: job.jobId, code: "BLENDER_EDIT_PREPARED", value: json(job), details: { blenderOperation: true, approvalGranted: false } };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  acquireBlenderEdit(projectId: StudioId<"project">, jobId: StudioId<"job">, proposalDigest: string, key: string, actor: string, at: string) {
    let acquired = false;
    const result = this.apply(projectId, key, jsonObject({ type: "ACQUIRE_BLENDER_EDIT", jobId, proposalDigest }), actor, at, state => {
      const job = state.jobs.find(item => item.jobId === jobId); if (!job || !isBlenderEditJob(job)) return blenderFail("BLENDER_EDIT_BINDING"); const execution = readBlenderEditJob(job);
      const latest = state.assets.filter(asset => asset.assetId === execution.proposal.source.assetId).at(-1);
      if (execution.proposalDigest !== proposalDigest || execution.phase !== "PREPARED" || job.dispatch || state.project.revision !== execution.preparedRevision || latest?.version !== execution.proposal.source.version) return blenderFail("BLENDER_EDIT_STALE");
      retainBlenderEditorialBaseline(this.root, state); const token = randomBytes(24).toString("hex"); job.state = "RUNNING"; job.attempt = 1; job.startedAt = at; job.dispatch = { token, state: "INTENT_RECORDED", recordedAt: at }; execution.phase = "RUNNING"; job.checkpoint = blenderEditCheckpoint(execution);
      const claimPath = [...resolveStudioPath(projectId, "blender").split("/"), jobId, "edit-claim.json"], claim = Buffer.from(canonical({ projectId, jobId, token, proposalDigest }));
      return { type: "JOB_STARTED", subjectId: jobId, code: "BLENDER_EDIT_EXPLICIT_APPROVAL", value: json(job), details: { blenderOperation: true, explicitEditApproval: true }, beforePublish: () => { this.root.writeAtomicExclusive(claimPath, `native-edit-${randomBytes(12).toString("hex")}.tmp`, claim); acquired = true; return { path: claimPath, expected: claim }; } };
    }, null, PROVIDER_CLAIM_PATH, false);
    const job = result.value as unknown as Job; return { acquired, token: acquired ? job.dispatch!.token : null, job };
  }
  private activeBlenderEdit(state: StudioSnapshot, jobId: StudioId<"job">, token: string) {
    const job = state.jobs.find(item => item.jobId === jobId); if (!job || !isBlenderEditJob(job)) return blenderFail("BLENDER_EDIT_BINDING"); const execution = readBlenderEditJob(job);
    if (job.state !== "RUNNING" || job.dispatch?.token !== token || !this.root.readFile([...resolveStudioPath(state.project.projectId, "blender").split("/"), jobId, "edit-claim.json"], 4096).equals(Buffer.from(canonical({ projectId: state.project.projectId, jobId, token, proposalDigest: execution.proposalDigest })))) return blenderFail("BLENDER_EDIT_NOT_ACTIVE"); return { job, execution };
  }
  checkpointBlenderEdit(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, process: NonNullable<BlenderEditExecution["process"]>, key: string, actor: string, at: string) {
    return this.apply(projectId, key, jsonObject({ type: "CHECKPOINT_BLENDER_EDIT", jobId, token, process }), actor, at, state => { const { job, execution } = this.activeBlenderEdit(state, jobId, token); retainBlenderEditorialBaseline(this.root, state); execution.process = process; job.checkpoint = blenderEditCheckpoint(execution); readBlenderEditJob(job); return { type: "JOB_CHECKPOINTED", subjectId: jobId, code: "BLENDER_EDIT_PROCESS_RECORDED", value: json(job), details: { blenderOperation: true } }; }, null, PROVIDER_CLAIM_PATH, false);
  }
  publishBlenderEdit(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, nativeBytes: Buffer, inspection: JsonObject, proof: BlenderMaterialVerification, key: string, actor: string, at: string): StudioResult {
    assertStudioCompatibilityImportAllowed();
    return this.apply(projectId, key, jsonObject({ type: "PUBLISH_BLENDER_EDIT", jobId, token, nativeHash: sha(nativeBytes), inspection, proof }), actor, at, state => {
      const { job, execution } = this.activeBlenderEdit(state, jobId, token), verification = validateBlenderMaterialVerification(proof, execution.proposal), parent = state.assets.find(asset => assetKey(asset) === assetKey(execution.proposal.source))!;
      if (!execution.process || nativeBytes.length !== verification.outputBytes || sha(nativeBytes) !== verification.outputSha256 || state.assets.filter(asset => asset.assetId === parent.assetId).at(-1)?.version !== parent.version) return blenderFail("BLENDER_EDIT_PUBLICATION_INVALID");
      const before = this.readBlenderSource(projectId, parent), ref = { assetId: parent.assetId, version: parent.version + 1 }, indexPath = `${resolveStudioPath(projectId, "blender")}/native-versions/${verification.outputSha256}.blend.json`;
      const descriptor = validateBlenderSourceDescriptor({ ...before, format: "studio-blender-source-revision-v1", source: { ...before.source, relativeName: `native-v${ref.version}.blend`, sha256: verification.outputSha256, byteLength: nativeBytes.length }, inspection, revision: { parent: execution.proposal.source, jobId, proposalDigest: execution.proposalDigest, originalSha256: before.revision?.originalSha256 ?? before.source.sha256, nativeStorage: { format: "studio-footage-chunks-v1", indexPath }, verification } });
      const bytes = Buffer.from(canonical(descriptor)), contentHash = sha(bytes), lineage = [execution.proposal.source];
      const asset = validateAssetManifest({ ...copy(parent), ...ref, sourcePath: resolveAssetPath(projectId, ref, "DOCUMENT", contentHash), contentHash, createdAt: at, lineage, provenance: { ...copy(parent.provenance), timestamp: at, contentHash, parentAssets: lineage, adapterMetadata: { ...copy(parent.provenance.adapterMetadata!), settings: { ...copy(parent.provenance.adapterMetadata!.settings), format: descriptor.format, descriptorHash: contentHash, blendSha256: descriptor.source.sha256 } } } });
      retainBlenderEditorialBaseline(this.root, state); state.assets.push(asset); execution.phase = "COMPLETED"; execution.verification = verification; execution.source = ref; job.outputs = [ref]; job.state = "SUCCEEDED"; job.finishedAt = at; job.dispatch!.state = "COMPLETED"; job.checkpoint = blenderEditCheckpoint(execution);
      return { type: "ASSET_VERSION_CREATED", subjectId: asset.assetId, code: "BLENDER_NATIVE_VERSION_PUBLISHED", value: json({ jobId, source: ref, verification }), details: { blenderOperation: true }, beforePublish: () => {
        writeStudioFootageSource(this.root, indexPath, { byteLength: nativeBytes.length, contentHash: verification.outputSha256, read: (offset, length) => nativeBytes.subarray(offset, offset + length) });
        try { this.root.writeAtomicExclusive(asset.sourcePath.split("/"), `native-publish-${randomBytes(12).toString("hex")}.tmp`, bytes); }
        catch (error) { if ((error as { code?: string }).code !== "already_exists" || !this.root.readFile(asset.sourcePath.split("/"), MAX_RECORD_BYTES).equals(bytes)) throw error; }
      } };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  terminateBlenderEdit(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, phase: "FAILED" | "INTERRUPTED", code: string, key: string, actor: string, at: string) {
    return this.apply(projectId, key, jsonObject({ type: "TERMINATE_BLENDER_EDIT", jobId, token, phase, code }), actor, at, state => { const { job, execution } = this.activeBlenderEdit(state, jobId, token); retainBlenderEditorialBaseline(this.root, state); execution.phase = phase; job.state = "FAILED"; job.finishedAt = at; job.dispatch!.state = "ACKNOWLEDGED"; job.error = { code, message: "Native edit ended without publishing a version. No automatic retry.", retryable: false }; job.checkpoint = blenderEditCheckpoint(execution); return { type: "JOB_FAILED", subjectId: jobId, code, value: json(job), details: { blenderOperation: true } }; }, null, PROVIDER_CLAIM_PATH, false);
  }
  prepareBlenderRender(input: { projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; requestedAt: string; source: AssetRef; settings: BlenderRenderSettings }, key: string, actor: string): StudioResult {
    const descriptor = this.readBlenderSource(input.projectId, input.source), settings = validateBlenderRenderSettings(input.settings, descriptor);
    return this.apply(input.projectId, key, jsonObject({ type: "PREPARE_BLENDER_RENDER", input: { ...input, settings } }), actor, input.requestedAt, state => {
      if (state.project.revision !== input.expectedProjectRevision || !state.shots.some(shot => shot.shotId === input.shotId)) return blenderFail("BLENDER_CONFLICT");
      if (state.jobs.filter(job => isBlenderJob(job) || isBlenderEditJob(job)).length >= 32 || state.jobs.some(job => (isBlenderJob(job) || isBlenderEditJob(job)) && job.state === "RUNNING")) return blenderFail("BLENDER_CAPACITY");
      const source = state.assets.find(asset => assetKey(asset) === assetKey(input.source));
      if (!source || !isBlenderSourceAsset(source) || source.provenance.adapterMetadata?.settings.shotId !== input.shotId || source.contentHash !== digest(descriptor)) return blenderFail("BLENDER_SOURCE_BINDING");
      const latest = state.assets.filter(asset => asset.assetId === source.assetId).at(-1); if (latest?.version !== source.version) return blenderFail("BLENDER_SOURCE_SUPERSEDED");
      retainBlenderEditorialBaseline(this.root, state);
      const spec = { format: "studio-blender-render-spec-v1" as const, projectId: input.projectId, shotId: input.shotId, source: input.source, descriptorHash: source.contentHash, blendSha256: descriptor.source.sha256, dependenciesDigest: digest(descriptor.dependencies), settings };
      const execution: BlenderExecution = { format: "studio-blender-execution-v1", spec, specDigest: digest(spec), preparedRevision: state.project.revision + 1, phase: "PREPARED", progress: null };
      const job = validateJob({ schemaVersion: 1, jobId: `job_blender_${digest({ projectId: input.projectId, key }).slice(0, 24)}`, type: "RENDER", projectId: input.projectId, shotId: input.shotId, dependencies: [], state: "QUEUED", attempt: 0, maxAttempts: 1, createdAt: input.requestedAt, startedAt: null, finishedAt: null, adapterMetadata: null, inputs: [input.source], outputs: [], error: null, checkpoint: blenderCheckpoint(execution), costEstimate: { currency: state.project.currency, minorUnits: 0 }, actualCost: { currency: state.project.currency, minorUnits: 0 }, externalActions: ["BLENDER_RENDER"], requiredGates: [], approvalSubjectHash: execution.specDigest, dispatch: null });
      if (state.jobs.some(item => item.jobId === job.jobId)) return blenderFail("BLENDER_CONFLICT");
      readBlenderJob(job); state.jobs.push(job);
      return { type: "JOB_CREATED", subjectId: job.jobId, code: "BLENDER_RENDER_PREPARED", value: json(job), details: { blenderOperation: true, approvalGranted: false } };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  acquireBlenderRender(projectId: StudioId<"project">, jobId: StudioId<"job">, expectedSpecDigest: string, key: string, actor: string, now: string): { acquired: boolean; token: string | null; job: Job } {
    // Authority belongs to this exact successful claim publication, never a
    // pre-read of QUEUED state: concurrent receipt replay must not launch twice.
    let acquired = false;
    const result = this.apply(projectId, key, jsonObject({ type: "ACQUIRE_BLENDER_RENDER", jobId, expectedSpecDigest }), actor, now, state => {
      const job = state.jobs.find(item => item.jobId === jobId); if (!job || !isBlenderJob(job)) return blenderFail("BLENDER_JOB_NOT_FOUND"); const execution = readBlenderJob(job);
      if (execution.specDigest !== expectedSpecDigest || execution.phase !== "PREPARED" || job.dispatch || state.project.revision !== execution.preparedRevision) return blenderFail("BLENDER_PREPARATION_STALE");
      retainBlenderEditorialBaseline(this.root, state);
      const token = randomBytes(24).toString("hex"); job.state = "RUNNING"; job.attempt = 1; job.startedAt = now; job.dispatch = { token, state: "INTENT_RECORDED", recordedAt: now };
      execution.phase = "RUNNING"; execution.progress = { phase: "STARTING", completedFrames: 0, totalFrames: execution.spec.settings.frameEnd - execution.spec.settings.frameStart + 1, process: null }; job.checkpoint = blenderCheckpoint(execution);
      const claimPath = [...resolveStudioPath(projectId, "blender").split("/"), jobId, "execution-claim.json"], claim = Buffer.from(canonical({ format: "studio-blender-execution-claim-v1", projectId, jobId, token, specDigest: execution.specDigest }));
      return { type: "JOB_STARTED", subjectId: jobId, code: "BLENDER_EXPLICIT_PREVIEW_START", value: json(job), details: { blenderOperation: true, explicitPreviewApproval: true, creativeApprovalGranted: false }, beforePublish: () => {
        try { this.root.writeAtomicExclusive(claimPath, `blender-claim-${randomBytes(12).toString("hex")}.tmp`, claim); }
        catch { return blenderFail("BLENDER_ATTEMPT_CONSUMED", "An execution claim already exists or could not be retained. No automatic resubmission is allowed."); }
        acquired = true;
        return { path: claimPath, expected: claim };
      } };
    }, null, PROVIDER_CLAIM_PATH, false);
    const job = result.value as unknown as Job; return { acquired, token: acquired ? job.dispatch!.token : null, job };
  }
  private activeBlenderJob(state: StudioSnapshot, jobId: StudioId<"job">, token: string): { job: Job; execution: BlenderExecution } {
    const job = state.jobs.find(item => item.jobId === jobId); if (!job || !isBlenderJob(job)) return blenderFail("BLENDER_JOB_NOT_FOUND"); const execution = readBlenderJob(job);
    if (job.state !== "RUNNING" || !job.dispatch || job.dispatch.token !== token) return blenderFail("BLENDER_JOB_NOT_ACTIVE");
    const claimPath = [...resolveStudioPath(state.project.projectId, "blender").split("/"), jobId, "execution-claim.json"];
    const claim = { format: "studio-blender-execution-claim-v1", projectId: state.project.projectId, jobId, token, specDigest: execution.specDigest };
    if (!this.root.readFile(claimPath, 4096).equals(Buffer.from(canonical(claim)))) return blenderFail("BLENDER_PROCESS_BINDING");
    return { job, execution };
  }
  checkpointBlenderRender(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, input: BlenderProgress, key: string, actor: string, now: string): StudioResult {
    checkKey(key); checkTime(now); if (!actor.trim() || actor.length > 160) return fail("INVALID_ACTOR", "An explicit bounded actor is required.");
    const expected = this.readBytes(projectId), state = this.readSnapshot(projectId), { job, execution } = this.activeBlenderJob(state, jobId, token);
    const progress = validateBlenderProgress(input, execution.spec.settings.frameEnd - execution.spec.settings.frameStart + 1), request = jsonObject({ type: "CHECKPOINT_BLENDER_RENDER", jobId, token, progress }), keyHash = sha(key), requestDigest = digest({ request, actor, now });
    const result = (): StudioResult => ({ status: "APPLIED", code: "BLENDER_PROGRESS_RECORDED", revision: state.project.revision, value: json(job) });
    if (execution.latestProgress?.keyHash === keyHash) {
      if (execution.latestProgress.requestDigest !== requestDigest) return fail("IDEMPOTENCY_CONFLICT", "Same latest checkpoint key has different exact inputs.");
      return result();
    }
    if (Date.parse(now) < Date.parse(execution.latestProgress?.at ?? state.events.at(-1)!.timestamp)) return fail("STALE_TIME", "Progress timestamp precedes the saved latest checkpoint.");
    const phases = ["STARTING", "RENDERING", "ENCODING", "VALIDATING", "PUBLISHING"];
    if (progress.completedFrames < (execution.progress?.completedFrames ?? 0) || phases.indexOf(progress.phase) < phases.indexOf(execution.progress?.phase ?? "STARTING") || (execution.progress?.process && !progress.process)) return blenderFail("BLENDER_PROGRESS_REGRESSION");
    if (progress.process && (![execution.spec.settings.blender.sha256, execution.spec.settings.ffmpeg.sha256, execution.spec.settings.ffprobe.sha256].includes(progress.process.executableSha256) || Date.parse(progress.process.startedAt) < Date.parse(job.startedAt!) || Date.parse(progress.process.startedAt) > Date.parse(now) || (execution.progress?.process && Date.parse(progress.process.startedAt) < Date.parse(execution.progress.process.startedAt)))) return blenderFail("BLENDER_PROCESS_BINDING");
    if (canonical(progress) === canonical(execution.progress)) return result();
    if (progress.phase === "RENDERING" && execution.progress?.phase === "RENDERING" && canonical(progress.process) !== canonical(execution.progress.process)) return blenderFail("BLENDER_PROCESS_BINDING");
    retainBlenderEditorialBaseline(this.root, state);
    execution.progress = progress; execution.latestProgress = { at: now, keyHash, requestDigest, diagnosticRef: jobId }; job.checkpoint = blenderCheckpoint(execution);
    const claimPath = [...resolveStudioPath(projectId, "blender").split("/"), jobId, "execution-claim.json"], claim = Buffer.from(canonical({ format: "studio-blender-execution-claim-v1", projectId, jobId, token, specDigest: execution.specDigest }));
    // Progress is a bounded latest value, not a new editorial/audit revision.
    // The aggregate and authority claim are both checked by the native CAS.
    this.publish(state, expected, claim, claimPath);
    return result();
  }
  publishBlenderRenderOutput(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, staged: StagedStudioMediaImport, key: string, actor: string, now: string): StudioResult {
    assertStudioCompatibilityImportAllowed();
    if (staged.mediaType !== "VIDEO" || staged.contentType !== "video/mp4" || typeof staged.read !== "function" || typeof staged.close !== "function" || staged.byteLength < 1 || staged.byteLength > STUDIO_FOOTAGE_MAX_BYTES || !/^[a-f0-9]{64}$/u.test(staged.contentHash)) return blenderFail("BLENDER_OUTPUT_INVALID");
    return this.apply(projectId, key, jsonObject({ type: "PUBLISH_BLENDER_RENDER", jobId, token, byteLength: staged.byteLength, contentHash: staged.contentHash, technical: staged.technical }), actor, now, state => {
      const { job, execution } = this.activeBlenderJob(state, jobId, token), spec = execution.spec, frames = spec.settings.frameEnd - spec.settings.frameStart + 1;
      if (staged.technical.mediaType !== "VIDEO" || staged.technical.width !== 1280 || staged.technical.height !== 720 || staged.technical.sourceUnits !== frames || !execution.progress?.process || execution.progress.completedFrames !== frames || !["VALIDATING", "PUBLISHING"].includes(execution.progress.phase)) return blenderFail("BLENDER_OUTPUT_BINDING");
      retainBlenderEditorialBaseline(this.root, state);
      const { asset, ref } = blenderSuccess(state, job, execution, staged, now);
      return { type: "JOB_COMPLETED", subjectId: jobId, code: "BLENDER_VIDEO_PUBLISHED", value: json({ job, asset: ref }), details: { blenderOperation: true, acquisition: "SERVER_GENERATED_LOCAL_BLENDER_RENDER", takeSelected: false }, beforePublish: () => this.footage.write(asset.sourcePath, staged, null) };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  terminateBlenderRender(projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, phase: "FAILED" | "CANCELLED" | "INTERRUPTED", code: string, key: string, actor: string, now: string): StudioResult {
    if (!["FAILED", "CANCELLED", "INTERRUPTED"].includes(phase) || !/^[A-Z][A-Z0-9_]{0,95}$/u.test(code)) return blenderFail();
    return this.apply(projectId, key, jsonObject({ type: "TERMINATE_BLENDER_RENDER", jobId, token, phase, code }), actor, now, state => {
      const { job, execution } = this.activeBlenderJob(state, jobId, token); retainBlenderEditorialBaseline(this.root, state);
      execution.phase = phase; job.checkpoint = blenderCheckpoint(execution); job.state = phase === "CANCELLED" ? "CANCELLED" : "FAILED"; job.finishedAt = now; job.error = { code, message: phase === "INTERRUPTED" ? "The owned local render was interrupted. No automatic restart or publication occurred." : "The local render ended without a validated published output.", retryable: false }; job.dispatch!.state = "ACKNOWLEDGED";
      return { type: phase === "CANCELLED" ? "JOB_CANCELLED" : "JOB_FAILED", subjectId: jobId, code, value: json(job), details: { blenderOperation: true } };
    }, null, PROVIDER_CLAIM_PATH, false);
  }
  createJob(input: Job, key: string, actor: string): StudioResult {
    if (isBlenderJob(input) || isBlenderEditJob(input)) return fail("MANAGED_BLENDER_ONLY", "Native jobs require their dedicated preparation boundary.");
    if (isEstimateJob(input)) return fail("MANAGED_ESTIMATE_ONLY", "Estimate intents require their dedicated preparation boundary.");
    if (Object.prototype.hasOwnProperty.call(input.checkpoint ?? {}, "providerExecution")) return fail("MANAGED_PROVIDER_ONLY", "Provider intents require the dedicated preparation boundary.");
    const job = validateJob(input); return this.apply(job.projectId, key, jsonObject({ type: "CREATE_JOB", job }), actor, job.createdAt, state => {
      if (job.state !== "QUEUED" || job.attempt !== 0 || job.dispatch || job.startedAt || job.finishedAt || job.adapterMetadata || job.outputs.length || job.actualCost.minorUnits !== 0 || job.costEstimate.currency !== state.project.currency || job.actualCost.currency !== state.project.currency || state.jobs.some(item => item.jobId === job.jobId)) return fail("INVALID_NEW_JOB", "New job must be an unexecuted unique queued request with the project's currency.");
      if (job.shotId && !state.shots.some(item => item.shotId === job.shotId)) return fail("MISSING_SHOT", "Job shot missing.");
      hasAssets(state, job.inputs); for (const id of job.dependencies) if (!state.jobs.some(item => item.jobId === id)) fail("MISSING_DEPENDENCY", "Job dependencies must exist; forward cycles disallowed.");
      if (job.approvalSubjectHash !== this.approvalScope(job.projectId)) return fail("STALE_JOB_SCOPE", "Job scope must bind current manifests/assets.");
      state.jobs.push(job); return { type: "JOB_CREATED", subjectId: job.jobId, code: "JOB_CREATED" };
    });
  }
  startJob(projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: string, costPolicy: CostPolicy, policy: ExternalExecutionPolicy = DEFAULT_EXTERNAL_EXECUTION_POLICY): StudioResult {
    const cleanCost = json(costPolicy) as unknown as CostPolicy, cleanPolicy = json(policy) as unknown as ExternalExecutionPolicy;
    return this.apply(projectId, key, jsonObject({ type: "START_JOB", jobId, costPolicy: cleanCost, policy: cleanPolicy }), actor, now, state => {
      const job = state.jobs.find(item => item.jobId === jobId); if (!job) return fail("MISSING_JOB", "Job not registered.");
      if (isBlenderJob(job) || isBlenderEditJob(job)) return fail("MANAGED_BLENDER_ONLY", "Native start requires exact single-use authority.");
      if (isEstimateJob(job)) return fail("MANAGED_ESTIMATE_ONLY", "Estimate-only authority cannot enter generic generation dispatch.");
      if (isManagedProviderJob(job)) return fail("MANAGED_PROVIDER_ONLY", "Provider intents require scoped single-use acquisition.");
      const blocked = (code: string, reasons: JsonValue = null): Change => ({ type: "JOB_BLOCKED", subjectId: jobId, code, blocked: true, value: reasons });
      if (!["QUEUED", "WAITING_APPROVAL"].includes(job.state) || job.dispatch) return blocked("JOB_NOT_DISPATCHABLE");
      if (job.attempt >= job.maxAttempts) return blocked("MAX_ATTEMPTS");
      if (job.type !== "QC" && job.type !== "GENERATION" && job.externalActions.length === 0) return blocked("EXECUTION_EFFECT_CLASSIFICATION_REQUIRED");
      if (job.dependencies.some(id => state.jobs.find(item => item.jobId === id)?.state !== "SUCCEEDED")) return blocked("DEPENDENCY_NOT_SUCCEEDED");
      if (job.approvalSubjectHash !== this.approvalScope(projectId)) return blocked("STALE_JOB_SCOPE");
      const mandatoryActions = [...job.externalActions]; if (job.type === "GENERATION" && !mandatoryActions.includes("EXTERNAL_GENERATION")) mandatoryActions.push("EXTERNAL_GENERATION"); if (job.costEstimate.minorUnits > 0 && !mandatoryActions.includes("PAID_GENERATION")) mandatoryActions.push("PAID_GENERATION");
      const external = evaluateExternalExecution(cleanPolicy, mandatoryActions); if (external.status !== "ALLOWED") return blocked("EXTERNAL_EXECUTION_DISABLED", json(external));
      const approval = evaluateApprovalGates(projectId, [...new Set([...job.requiredGates, ...REQUIRED_JOB_GATES[job.type]])], job.approvalSubjectHash, state.approvals);
      if (approval.status !== "ALLOWED") { job.state = "WAITING_APPROVAL"; return blocked("APPROVAL_REQUIRED", json(approval)); }
      const charged = state.jobs.filter(item => item.type !== "ESTIMATE" && item.jobId !== jobId && (item.attempt > 0 || item.dispatch));
      const amount = (items: Job[]) => ({ currency: state.project.currency, minorUnits: items.reduce((sum, item) => sum + Math.max(item.costEstimate.minorUnits, item.actualCost.minorUnits), 0) });
      const cost = evaluateCostPolicy(cleanCost, { shotSpent: amount(charged.filter(item => item.shotId === job.shotId)), projectSpent: amount(charged), estimate: job.costEstimate, attempts: state.jobs.filter(item => item.type !== "ESTIMATE" && item.shotId === job.shotId).reduce((sum, item) => sum + item.attempt, 0) });
      if (cost.status !== "ALLOWED") return blocked(cost.status === "BLOCKED" ? "COST_BLOCKED" : "COST_APPROVAL_REQUIRED", json(cost));
      job.state = "RUNNING"; job.attempt++; job.startedAt = now; job.error = null;
      if (mandatoryActions.length) job.dispatch = { token: sha(`${projectId}:${jobId}:${job.attempt}:${key}`), state: "INTENT_RECORDED", recordedAt: now };
      state.costs.push({ schemaVersion: 1, costId: `cost_${sha(key).slice(0, 24)}`, projectId, shotId: job.shotId, jobId, kind: "RESERVED", amount: copy(job.costEstimate), createdAt: now });
      return { type: "JOB_STARTED", subjectId: jobId, code: job.dispatch ? "EXTERNAL_INTENT_RECORDED_NO_ADAPTER_CALLED" : "LOCAL_JOB_STARTED", value: json(job) };
    });
  }
  checkpointJob(projectId: StudioId<"project">, jobId: StudioId<"job">, checkpoint: JsonObject, key: string, actor: string, now: string): StudioResult {
    if (Object.hasOwn(checkpoint, "blenderExecution") || Object.hasOwn(checkpoint, "blenderEdit") || this.readSnapshot(projectId).jobs.some(job => job.jobId === jobId && (isBlenderJob(job) || isBlenderEditJob(job)))) return fail("MANAGED_BLENDER_ONLY", "Native checkpoints require their dedicated binding boundary.");
    const clean = jsonObject(checkpoint); return this.apply(projectId, key, jsonObject({ type: "CHECKPOINT", jobId, checkpoint: clean }), actor, now, state => { const job = state.jobs.find(item => item.jobId === jobId); if (!job || !["RUNNING", "WAITING_EXTERNAL"].includes(job.state)) return fail("INVALID_JOB_STATE", "Only active jobs accept checkpoints."); if (isEstimateJob(job) || Object.prototype.hasOwnProperty.call(clean, "estimateExecution")) return fail("MANAGED_ESTIMATE_ONLY", "Estimate checkpoints cannot be replaced by generic commands."); if (isManagedProviderJob(job) || Object.prototype.hasOwnProperty.call(clean, "providerExecution")) return fail("MANAGED_PROVIDER_ONLY", "Managed intent checkpoints cannot be replaced by generic commands."); job.checkpoint = clean; return { type: "JOB_CHECKPOINTED", subjectId: jobId, code: "CHECKPOINT_SAVED" }; });
  }
  recoveryPlan(projectId: StudioId<"project">, jobId: StudioId<"job">): { action: "NONE" | "RECONCILE_EXTERNAL" | "RESUME_LOCAL_CHECKPOINT" | "AWAIT_EXPLICIT_START"; job: Job } {
    const job = this.load(projectId).jobs.find(item => item.jobId === jobId); if (!job) return fail("MISSING_JOB", "Job not found.");
    if (isEstimateJob(job)) {
      const intent = readEstimateIntent(job);
      if (["SUCCEEDED", "FAILED"].includes(intent.phase)) return { action: "NONE", job };
      if (job.dispatch) return { action: "RECONCILE_EXTERNAL", job };
      try {
        // Any surviving one-test claim blocks replay, even if a crash preceded aggregate publication.
        // No timer, process identity, refresh, or restart can turn this back into an unused attempt.
        this.root.readFile(ESTIMATE_CLAIM_PATH, MAX_RECORD_BYTES);
        return { action: "RECONCILE_EXTERNAL", job };
      } catch (error) { if ((error as { code?: string }).code !== "not_found") throw error; }
      return { action: "AWAIT_EXPLICIT_START", job };
    }
    if (isManagedProviderJob(job) && !job.dispatch) {
      try {
        // A claim may survive a crash before the project CAS. Never present that gap as retryable.
        const raw = this.root.readFile(PROVIDER_CLAIM_PATH, MAX_RECORD_BYTES), claim = jsonObject(parseStudioJson(new TextDecoder("utf-8", { fatal: true }).decode(raw)));
        if (claim.projectId === projectId && claim.jobId === jobId) return { action: "RECONCILE_EXTERNAL", job };
      } catch (error) { if ((error as { code?: string }).code !== "not_found") throw error; }
    }
    return { action: ["SUCCEEDED", "CANCELLED"].includes(job.state) ? "NONE" : job.dispatch ? "RECONCILE_EXTERNAL" : job.state === "RUNNING" ? "RESUME_LOCAL_CHECKPOINT" : "AWAIT_EXPLICIT_START", job };
  }
  finishJob(projectId: StudioId<"project">, jobId: StudioId<"job">, input: { state: "SUCCEEDED" | "FAILED" | "CANCELLED" | "WAITING_EXTERNAL"; outputs: AssetRef[]; error: Job["error"]; actualCost: Job["actualCost"]; adapterMetadata: Job["adapterMetadata"]; dispatchToken: string | null }, key: string, actor: string, now: string): StudioResult {
    if (this.readSnapshot(projectId).jobs.some(job => job.jobId === jobId && (isBlenderJob(job) || isBlenderEditJob(job)))) return fail("MANAGED_BLENDER_ONLY", "Native outcomes require their dedicated publication boundary.");
    const clean = jsonObject(input) as unknown as typeof input;
    return this.apply(projectId, key, jsonObject({ type: "FINISH_JOB", jobId, input: clean }), actor, now, state => {
      const job = state.jobs.find(item => item.jobId === jobId); if (!job || ["SUCCEEDED", "FAILED", "CANCELLED"].includes(job.state)) return fail("JOB_TERMINAL", "Terminal jobs cannot be overwritten or repeated.");
      if (isEstimateJob(job)) return fail("MANAGED_ESTIMATE_ONLY", "Estimate outcomes require their dedicated binding boundary.");
      if (isManagedProviderJob(job)) return fail("MANAGED_PROVIDER_ONLY", "Managed intent outcomes require their dedicated binding boundary.");
      if (!["SUCCEEDED", "FAILED", "CANCELLED", "WAITING_EXTERNAL"].includes(clean.state) || (clean.state !== "CANCELLED" && !["RUNNING", "WAITING_EXTERNAL"].includes(job.state))) return fail("INVALID_TRANSITION", "Job transition is not allowed.");
      if (job.dispatch ? clean.dispatchToken !== job.dispatch.token : clean.dispatchToken !== null || clean.adapterMetadata !== null) return fail("DISPATCH_BINDING", "External result is not bound to the persisted intent.");
      if (clean.state === "WAITING_EXTERNAL" && (!job.dispatch || !clean.adapterMetadata?.providerJobId)) return fail("EXTERNAL_BINDING", "Waiting external requires a bound provider job identity.");
      if (!clean.actualCost || clean.actualCost.currency !== job.actualCost.currency || !Number.isSafeInteger(clean.actualCost.minorUnits) || clean.actualCost.minorUnits < job.actualCost.minorUnits) return fail("COST_REGRESSION", "Reported cumulative cost cannot decrease or change currency.");
      if (job.attempt === 0 && (clean.actualCost.minorUnits !== 0 || clean.outputs.length !== 0)) return fail("UNSTARTED_JOB_RESULT", "Unstarted jobs cannot report spending or produced output.");
      hasAssets(state, clean.outputs); job.state = clean.state; job.outputs = clean.outputs; job.error = clean.error; job.actualCost = clean.actualCost; job.adapterMetadata = clean.adapterMetadata;
      job.finishedAt = clean.state === "WAITING_EXTERNAL" ? null : now;
      if (job.dispatch) job.dispatch.state = clean.state === "SUCCEEDED" ? "COMPLETED" : "ACKNOWLEDGED";
      validateJob(job); if (job.actualCost.currency !== state.project.currency) fail("CURRENCY_MISMATCH", "Job cost currency differs from project.");
      state.costs.push({ schemaVersion: 1, costId: `cost_${sha(key).slice(0, 24)}`, projectId, shotId: job.shotId, jobId, kind: "ACTUAL", amount: job.actualCost, createdAt: now });
      return { type: clean.state === "SUCCEEDED" ? "JOB_COMPLETED" : clean.state === "FAILED" ? "JOB_FAILED" : clean.state === "CANCELLED" ? "JOB_CANCELLED" : "JOB_CHECKPOINTED", subjectId: jobId, code: clean.state, value: json(job) };
    });
  }
}
