import "server-only";
import { randomBytes } from "node:crypto";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { hashJarvisChatCanonicalJson as digest, hashJarvisChatSha256 as sha, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { cloneStudioJson } from "./validation";
import { assertStudioId, resolveStudioPath } from "./workspace";
import type { StudioSnapshot } from "./store.server";
import type { Asset, StudioId } from "./domain";
import { readStudioEditorial } from "./editorial-store.server";
import { CompositionValidationError, STUDIO_COMPOSITION_LIMITS, defaultLayerTransform, validateEditorialTake, type StudioTextProperties } from "./composition-contract";
import { migrateCompositionV1ToV2, setAudioLayerV2Timing, splitLayerV2Time, trimLayerV2Time, validateCompositionV2, type CompositionV2, type LayerTrimEdge, type StudioAudioPropertiesV2 } from "./editorial-v2-contract";
import { editorialV2Index, type EditorialIndexIO } from "./editorial-v2-index.server";
import { editorialAddTime, editorialCompareTime, validateEditorialRational } from "./editorial-time";
import { timelineFrameRateFromSavedFps } from "./editorial-v2-viewer";
import { isLocalFootageAsset, isQualifiedLocalMediaAsset, localFootageStorageBinding, localMediaTechnicalMetadata, validateLocalFootageAsset } from "./footage-contract";
import { isBlenderDerivedMediaAsset } from "./footage-contract";
import { assertBlenderOnlySnapshotExtension } from "./blender-source-store.server";
import { readBlenderJob } from "./blender-source-identity.server";

const LIMIT = 1_048_576, HEAD_LIMIT = 4096, PLAN_LIMIT = 4096, HASH = /^[a-f0-9]{64}$/u;
const REVERSIBLE_OPERATIONS = ["INSERT_TAKE_LAYER", "INSERT_TEXT_LAYER", "INSERT_AUDIO_LAYER", "REPLACE_LAYER_TAKE", "SET_LAYER_PROPERTIES", "SET_AUDIO_LAYER_TIMING", "MOVE_LAYER_TIME", "TRIM_LAYER_TIME", "SPLIT_LAYER_TIME", "SET_COMPOSITION_DURATION"] as const;
export type EditorialV2ReversibleOperation = typeof REVERSIBLE_OPERATIONS[number];
type HistoryCommand = "UNDO_EDITORIAL_EDIT" | "REDO_EDITORIAL_EDIT";
type Anchor = { format: "studio-editorial-legacy-anchor-v2"; projectRecordDigest: string; legacyHeadHash: string; legacyRevision: number; legacyContentDigest: string };
interface HistoryCursor { format: "studio-editorial-history-cursor-v1"; boundary: "COPY_BOUNDARY" | "LEGACY_BOUNDARY"; undoTip: string | null; redoRoot: string | null }
interface HeadV2 { format: "studio-editorial-head-v2"; projectId: StudioId<"project">; revision: number; at: string; anchor: Anchor; entityRoot: string | null; receiptRoot: string; journalTip: string }
interface HeadV3 { format: "studio-editorial-head-v3"; projectId: StudioId<"project">; revision: number; at: string; anchor: Anchor; entityRoot: string | null; receiptRoot: string; journalTip: string; history: HistoryCursor }
type Head = HeadV2 | HeadV3;
interface Journal { format: "studio-editorial-journal-v2" | "studio-editorial-journal-v3" | "studio-editorial-journal-v4"; projectId: StudioId<"project">; revision: number; at: string; actor: string; keyHash: string; requestDigest: string; anchorDigest: string; previousHeadHash: string | null; beforeEntityRoot: string | null; afterEntityRoot: string | null; beforeReceiptRoot: string | null; operation: "COPY_V1_TO_V2" | "ADMIT_DERIVED_TAKE" | EditorialV2ReversibleOperation | HistoryCommand; change: { key: string; beforeHash: string | null; afterHash: string } | null; historyTargetHash: string | null; providerRequests: 0; generationAllowed: false }
interface RedoNode { format: "studio-editorial-redo-node-v1"; projectId: StudioId<"project">; editHash: string; next: string | null }
interface Entity { format: "studio-editorial-entity-v2"; projectId: StudioId<"project">; kind: "composition" | "take" | "selection"; entityId: string; value: unknown }
export interface EditorialV2Migration { operation: "COPY_V1_TO_V2"; projectId: StudioId<"project">; expectedProjectRevision: number; expectedEditorialRevision: number; requestedAt: string }
export interface EditorialV2LayerEdit { operation: "SET_LAYER_PROPERTIES"; projectId: StudioId<"project">; expectedRevision: number; expectedCompositionRevision: number; compositionId: string; layerId: string; requestedAt: string; changes: { name?: string; opacity?: number; enabled?: boolean; transform?: CompositionV2["layers"][number]["transform"]; text?: StudioTextProperties; audio?: StudioAudioPropertiesV2 } }
export interface EditorialV2AudioTimingEdit extends Omit<EditorialV2LayerEdit, "operation" | "changes"> { operation: "SET_AUDIO_LAYER_TIMING"; start: CompositionV2["duration"]; duration: CompositionV2["duration"]; sourceOffset: CompositionV2["duration"] }
export interface EditorialV2LayerMove extends Omit<EditorialV2LayerEdit, "operation" | "changes"> { operation: "MOVE_LAYER_TIME"; start: CompositionV2["layers"][number]["start"] }
export interface EditorialV2LayerTrim extends Omit<EditorialV2LayerEdit, "operation" | "changes"> { operation: "TRIM_LAYER_TIME"; edge: LayerTrimEdge; trimPoint: CompositionV2["layers"][number]["start"] }
export interface EditorialV2LayerSplit extends Omit<EditorialV2LayerEdit, "operation" | "changes"> { operation: "SPLIT_LAYER_TIME"; splitPoint: CompositionV2["layers"][number]["start"] }
export interface EditorialV2LayerTakeReplacement extends Omit<EditorialV2LayerEdit, "operation" | "changes"> { operation: "REPLACE_LAYER_TAKE"; expectedHeadDigest: string; takeId: string }
export interface EditorialV2CompositionDurationEdit extends Omit<EditorialV2LayerEdit, "operation" | "layerId" | "changes"> { operation: "SET_COMPOSITION_DURATION"; duration: CompositionV2["duration"] }
interface EditorialV2LayerInsertBase extends Omit<EditorialV2LayerEdit, "operation" | "layerId" | "changes"> { start: CompositionV2["layers"][number]["start"]; duration: CompositionV2["layers"][number]["duration"] }
export interface EditorialV2TakeLayerInsert extends EditorialV2LayerInsertBase { operation: "INSERT_TAKE_LAYER"; takeId: string; sourceOffset: CompositionV2["layers"][number]["sourceOffset"] }
export interface EditorialV2TextLayerInsert extends EditorialV2LayerInsertBase { operation: "INSERT_TEXT_LAYER"; text: StudioTextProperties; transform: CompositionV2["layers"][number]["transform"] }
export interface EditorialV2AudioLayerInsert extends EditorialV2LayerInsertBase { operation: "INSERT_AUDIO_LAYER"; assetId: StudioId<"asset">; version: number; sourceOffset: CompositionV2["layers"][number]["sourceOffset"]; audio: StudioAudioPropertiesV2 }
export interface EditorialV2HistoryNavigation { operation: HistoryCommand; projectId: StudioId<"project">; expectedRevision: number; expectedHeadDigest: string; compositionId: string; expectedCompositionRevision: number; requestedAt: string }
export interface EditorialV2DerivedTakeAdmission { operation: "ADMIT_DERIVED_TAKE"; projectId: StudioId<"project">; expectedRevision: number; expectedHeadDigest: string; compositionId: string; assetId: StudioId<"asset">; version: number; requestedAt: string }
export class EditorialV2StoreError extends Error {
  constructor(readonly code: "EDITORIAL_V2_INVALID" | "EDITORIAL_V2_CONFLICT" | "EDITORIAL_V2_UNSUPPORTED" | "EDITORIAL_V2_UNAVAILABLE" | "EDITORIAL_V2_HISTORY_BOUNDARY" | "EDITORIAL_V2_DURATION_CONFLICT" | "EDITORIAL_V2_SOURCE_COVERAGE" | "EDITORIAL_V2_COMPOSITION_COVERAGE", message: string) { super(message); this.name = "EditorialV2StoreError"; }
}
function invalid(message = "Invalid partitioned editorial request."): never { throw new EditorialV2StoreError("EDITORIAL_V2_INVALID", message); }
function unsupportedSplit(): never { throw new EditorialV2StoreError("EDITORIAL_V2_UNSUPPORTED", "This saved layer cannot be split exactly without changing unsupported layer semantics."); }
function unavailable(): never { throw new EditorialV2StoreError("EDITORIAL_V2_UNAVAILABLE", "Partitioned editorial storage or its legacy anchor is unavailable. Preserve the exact request; no automatic migration, rebase or retry is allowed."); }
function conflict(): never { throw new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "The exact request or saved revision differs. Reload before a new edit."); }
function historyBoundary(): never { throw new EditorialV2StoreError("EDITORIAL_V2_HISTORY_BOUNDARY", "The requested history direction is at its supported boundary. Reload canonical history before continuing."); }
function durationConflict(): never { throw new EditorialV2StoreError("EDITORIAL_V2_DURATION_CONFLICT", "The saved duration cannot end before an enabled layer. No layer or source was changed."); }
function sourceCoverage(): never { throw new EditorialV2StoreError("EDITORIAL_V2_SOURCE_COVERAGE", "The exact source offset and duration must fit the qualified imported source. No layer or source was changed."); }
function compositionCoverage(): never { throw new EditorialV2StoreError("EDITORIAL_V2_COMPOSITION_COVERAGE", "The exact layer start and duration must fit the saved composition. No layer or source was changed."); }
function exact(value: unknown, keys: string): asserts value is Record<string, unknown> { if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== keys.split(",").sort().join()) invalid(); }
function integer(value: unknown, minimum = 1): asserts value is number { if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < minimum) invalid(); }
function time(value: unknown): asserts value is string { if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) invalid(); }
function hash(value: unknown): asserts value is string { if (typeof value !== "string" || !HASH.test(value)) invalid(); }
function nullableHash(value: unknown): asserts value is string | null { if (value !== null) hash(value); }
function encode(value: unknown): Buffer { const text = canonical(cloneStudioJson(value)); const bytes = Buffer.from(text, "utf8"); if (bytes.length > LIMIT) invalid("Partition exceeds the unchanged 1 MiB record bound."); return bytes; }
function decode(bytes: Buffer): unknown { const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes); assertCreatorJsonHasUniqueObjectKeys(text); const value = cloneStudioJson(JSON.parse(text)); if (canonical(value) !== text) unavailable(); return value; }
function prefix(projectId: StudioId<"project">): string[] { assertStudioId(projectId, "project"); return [...resolveStudioPath(projectId, "manifests").split("/"), "editorial-v2"]; }
function headPath(projectId: StudioId<"project">) { return [...prefix(projectId), "head.json"]; }
function legacyPath(projectId: StudioId<"project">) { return resolveStudioPath(projectId, "manifests", "editorial-head.json").split("/"); }
function objectPath(projectId: StudioId<"project">, objectHash: string, journal = false) { hash(objectHash); return [...prefix(projectId), journal ? "commits" : "objects", objectHash + ".json"]; }
function rootBytes(root: CreatorNativeRoot, segments: string[], maximum = LIMIT): Buffer { try { return root.readFile(segments, maximum); } catch { return unavailable(); } }
function checkAnchor(root: CreatorNativeRoot, snapshot: StudioSnapshot, anchor: Anchor): void {
  exact(anchor, "format,projectRecordDigest,legacyHeadHash,legacyRevision,legacyContentDigest");
  if (anchor.format !== "studio-editorial-legacy-anchor-v2") unavailable();
  hash(anchor.projectRecordDigest); hash(anchor.legacyHeadHash); hash(anchor.legacyContentDigest); integer(anchor.legacyRevision);
  const projectPath = resolveStudioPath(snapshot.project.projectId, "manifests", "project.json").split("/");
  if (!rootBytes(root, projectPath).equals(encode(snapshot)) || sha(rootBytes(root, legacyPath(snapshot.project.projectId), HEAD_LIMIT)) !== anchor.legacyHeadHash) unavailable();
  try { assertBlenderOnlySnapshotExtension(root, snapshot, anchor.projectRecordDigest); } catch { return unavailable(); }
}
function parseHistoryCursor(value: unknown): HistoryCursor {
  exact(value, "format,boundary,undoTip,redoRoot");
  if (value.format !== "studio-editorial-history-cursor-v1" || !["COPY_BOUNDARY", "LEGACY_BOUNDARY"].includes(String(value.boundary))) unavailable();
  nullableHash(value.undoTip); nullableHash(value.redoRoot);
  return value as unknown as HistoryCursor;
}
function historyOf(head: Head): HistoryCursor {
  return head.format === "studio-editorial-head-v3" ? head.history : { format: "studio-editorial-history-cursor-v1", boundary: "LEGACY_BOUNDARY", undoTip: null, redoRoot: null };
}
function parseHead(value: unknown, projectId: StudioId<"project">): Head {
  if (!value || typeof value !== "object" || Array.isArray(value)) unavailable();
  const format = (value as Record<string, unknown>).format;
  exact(value, format === "studio-editorial-head-v3" ? "format,projectId,revision,at,anchor,entityRoot,receiptRoot,journalTip,history" : "format,projectId,revision,at,anchor,entityRoot,receiptRoot,journalTip");
  if (!(["studio-editorial-head-v2", "studio-editorial-head-v3"] as unknown[]).includes(value.format) || value.projectId !== projectId) unavailable();
  integer(value.revision); time(value.at); nullableHash(value.entityRoot); hash(value.receiptRoot); hash(value.journalTip);
  if (value.format === "studio-editorial-head-v3") parseHistoryCursor(value.history);
  return value as unknown as Head;
}
function access(root: CreatorNativeRoot, projectId: StudioId<"project">) {
  const planned = new Map<string, Buffer>();
  const io: EditorialIndexIO = {
    read(objectHash) { hash(objectHash); const bytes = planned.get(objectHash) ?? rootBytes(root, objectPath(projectId, objectHash)); if (sha(bytes) !== objectHash) unavailable(); return decode(bytes); },
    stage(value) { const bytes = encode(value), objectHash = sha(bytes); if (!planned.has(objectHash) && planned.size >= PLAN_LIMIT) invalid("This bounded transaction has too many changed index/object pages."); planned.set(objectHash, bytes); return objectHash; },
  };
  return { io, planned, entities: editorialV2Index(io, { projectId, namespace: "entities" }), receipts: editorialV2Index(io, { projectId, namespace: "receipts" }) };
}
function journal(root: CreatorNativeRoot, projectId: StudioId<"project">, journalHash: string): Journal {
  const bytes = rootBytes(root, objectPath(projectId, journalHash, true)); if (sha(bytes) !== journalHash) unavailable();
  const decoded = decode(bytes); if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) unavailable();
  const format = (decoded as Record<string, unknown>).format;
  exact(decoded, format === "studio-editorial-journal-v3" || format === "studio-editorial-journal-v4" ? "format,projectId,revision,at,actor,keyHash,requestDigest,anchorDigest,previousHeadHash,beforeEntityRoot,afterEntityRoot,beforeReceiptRoot,operation,change,historyTargetHash,providerRequests,generationAllowed" : "format,projectId,revision,at,actor,keyHash,requestDigest,anchorDigest,previousHeadHash,beforeEntityRoot,afterEntityRoot,beforeReceiptRoot,operation,change,providerRequests,generationAllowed");
  const value = decoded as Record<string, unknown>;
  if (!(["studio-editorial-journal-v2", "studio-editorial-journal-v3", "studio-editorial-journal-v4"] as unknown[]).includes(value.format) || value.projectId !== projectId || value.providerRequests !== 0 || value.generationAllowed !== false || !["COPY_V1_TO_V2", "ADMIT_DERIVED_TAKE", ...REVERSIBLE_OPERATIONS, "UNDO_EDITORIAL_EDIT", "REDO_EDITORIAL_EDIT"].includes(String(value.operation) as never)) unavailable();
  integer(value.revision); time(value.at); hash(value.keyHash); hash(value.requestDigest); hash(value.anchorDigest); nullableHash(value.previousHeadHash); nullableHash(value.beforeEntityRoot); nullableHash(value.afterEntityRoot); nullableHash(value.beforeReceiptRoot);
  if (typeof value.actor !== "string" || !value.actor.trim() || value.actor.length > 160 || /[\u0000-\u001f\u007f]/u.test(value.actor)) unavailable();
  if (value.operation === "COPY_V1_TO_V2") { if (value.format !== "studio-editorial-journal-v2" || value.revision !== 1 || value.change !== null || value.previousHeadHash !== null || value.beforeEntityRoot !== null || value.beforeReceiptRoot !== null) unavailable(); }
  else {
    exact(value.change, "key,beforeHash,afterHash");
    if (value.operation === "ADMIT_DERIVED_TAKE") { if (typeof value.change.key !== "string" || !/^take:take_blender_[a-f0-9]{24}$/u.test(value.change.key) || value.change.beforeHash !== null) unavailable(); }
    else { if (typeof value.change.key !== "string" || !value.change.key.startsWith("composition:")) unavailable(); hash(value.change.beforeHash); }
    hash(value.change.afterHash); if (value.previousHeadHash === null || value.revision === 1) unavailable();
  }
  const navigation = value.operation === "UNDO_EDITORIAL_EDIT" || value.operation === "REDO_EDITORIAL_EDIT";
  if (navigation) { if (value.format !== "studio-editorial-journal-v3" && value.format !== "studio-editorial-journal-v4") unavailable(); hash(value.historyTargetHash); }
  else if (value.format !== "studio-editorial-journal-v2") unavailable();
  return { ...value, historyTargetHash: navigation ? value.historyTargetHash : null } as unknown as Journal;
}
function redoNode(a: ReturnType<typeof access>, projectId: StudioId<"project">, nodeHash: string): RedoNode {
  const value = a.io.read(nodeHash); exact(value, "format,projectId,editHash,next");
  if (value.format !== "studio-editorial-redo-node-v1" || value.projectId !== projectId) unavailable();
  hash(value.editHash); nullableHash(value.next);
  return value as unknown as RedoNode;
}
function reversibleJournal(root: CreatorNativeRoot, projectId: StudioId<"project">, editHash: string): Journal & { operation: EditorialV2ReversibleOperation; change: { key: string; beforeHash: string; afterHash: string }; previousHeadHash: string } {
  const value = journal(root, projectId, editHash);
  if (!REVERSIBLE_OPERATIONS.includes(value.operation as EditorialV2ReversibleOperation) || value.change === null || value.change.beforeHash === null || value.previousHeadHash === null || value.historyTargetHash !== null) unavailable();
  return value as Journal & { operation: EditorialV2ReversibleOperation; change: { key: string; beforeHash: string; afterHash: string }; previousHeadHash: string };
}
function sameCompositionContent(left: CompositionV2, right: CompositionV2): boolean {
  const { revision: _leftRevision, ...leftContent } = left, { revision: _rightRevision, ...rightContent } = right;
  void _leftRevision; void _rightRevision;
  return canonical(leftContent) === canonical(rightContent);
}
function validateMonotonicNavigationChange(a: ReturnType<typeof access>, projectId: StudioId<"project">, change: NonNullable<Journal["change"]>, target: ReturnType<typeof reversibleJournal>, undoing: boolean): void {
  if (change.beforeHash === null) unavailable();
  const compositionId = change.key.slice("composition:".length);
  const before = validateCompositionV2(entityAtHash(a, projectId, "composition", compositionId, change.beforeHash).value);
  const after = validateCompositionV2(entityAtHash(a, projectId, "composition", compositionId, change.afterHash).value);
  const expectedBeforeHash = undoing ? target.change.afterHash : target.change.beforeHash;
  const expectedAfterHash = undoing ? target.change.beforeHash : target.change.afterHash;
  const expectedBefore = validateCompositionV2(entityAtHash(a, projectId, "composition", compositionId, expectedBeforeHash).value);
  const expectedAfter = validateCompositionV2(entityAtHash(a, projectId, "composition", compositionId, expectedAfterHash).value);
  if ([before, after, expectedBefore, expectedAfter].some(value => value.projectId !== projectId || value.compositionId !== compositionId)) unavailable();
  if (!sameCompositionContent(before, expectedBefore) || !sameCompositionContent(after, expectedAfter) || !Number.isSafeInteger(before.revision + 1) || after.revision !== before.revision + 1) unavailable();
}
function validateHeadCommit(root: CreatorNativeRoot, snapshot: StudioSnapshot, head: Head): Journal {
  const a = access(root, head.projectId), j = journal(root, head.projectId, head.journalTip);
  if (j.revision !== head.revision || j.at !== head.at || j.anchorDigest !== digest(head.anchor) || j.afterEntityRoot !== head.entityRoot || a.receipts.get(head.receiptRoot, j.keyHash) !== head.journalTip) unavailable();
  let previous: Head | null = null;
  if (j.previousHeadHash !== null) {
    previous = parseHead(a.io.read(j.previousHeadHash), head.projectId);
    if (previous.revision + 1 !== head.revision || previous.at > head.at || canonical(previous.anchor) !== canonical(head.anchor) || previous.entityRoot !== j.beforeEntityRoot || previous.receiptRoot !== j.beforeReceiptRoot) unavailable();
  }
  if (a.receipts.set(j.beforeReceiptRoot, j.keyHash, head.journalTip) !== head.receiptRoot) unavailable();
  if (j.change) {
    if (a.entities.get(j.beforeEntityRoot, j.change.key) !== j.change.beforeHash || a.entities.get(head.entityRoot, j.change.key) !== j.change.afterHash || a.entities.set(j.beforeEntityRoot, j.change.key, j.change.afterHash) !== head.entityRoot) unavailable();
  }
  if (head.format === "studio-editorial-head-v2") {
    if (j.format !== "studio-editorial-journal-v2" || j.historyTargetHash !== null) unavailable();
  } else if (j.operation === "COPY_V1_TO_V2") {
    if (previous !== null || head.history.boundary !== "COPY_BOUNDARY" || head.history.undoTip !== null || head.history.redoRoot !== null) unavailable();
  } else {
    if (previous === null) unavailable();
    const before = historyOf(previous);
    if (head.history.boundary !== before.boundary) unavailable();
    if (REVERSIBLE_OPERATIONS.includes(j.operation as EditorialV2ReversibleOperation)) {
      if (j.historyTargetHash !== null || head.history.undoTip !== head.journalTip || head.history.redoRoot !== null) unavailable();
    } else if (j.operation === "ADMIT_DERIVED_TAKE") {
      if (!j.change || j.change.beforeHash !== null || canonical(head.history) !== canonical(before)) unavailable();
      const take = validateEditorialTake(entityAtHash(a, head.projectId, "take", j.change.key.slice(5), j.change.afterHash).value);
      const asset = snapshot.assets.find(item => item.assetId === take.source.assetId && item.version === take.source.version);
      if (!asset || take.takeId !== derivedTakeId(asset) || take.projectId !== head.projectId || take.shotId !== derivedAssetShot(snapshot, asset) || take.createdAt !== j.at || take.review.state !== "UNREVIEWED") unavailable();
    } else if (j.operation === "UNDO_EDITORIAL_EDIT") {
      if (j.historyTargetHash === null || before.undoTip !== j.historyTargetHash || head.history.redoRoot === null || j.change === null) unavailable();
      const target = reversibleJournal(root, head.projectId, j.historyTargetHash), parent = parseHead(a.io.read(target.previousHeadHash), head.projectId), node = redoNode(a, head.projectId, head.history.redoRoot);
      if (head.history.undoTip !== historyOf(parent).undoTip || node.editHash !== j.historyTargetHash || node.next !== before.redoRoot || j.change.key !== target.change.key) unavailable();
      if (j.format === "studio-editorial-journal-v3") {
        if (j.change.beforeHash !== target.change.afterHash || j.change.afterHash !== target.change.beforeHash) unavailable();
      } else if (j.format === "studio-editorial-journal-v4") validateMonotonicNavigationChange(a, head.projectId, j.change, target, true);
      else unavailable();
    } else if (j.operation === "REDO_EDITORIAL_EDIT") {
      if (j.historyTargetHash === null || before.redoRoot === null || j.change === null) unavailable();
      const node = redoNode(a, head.projectId, before.redoRoot), target = reversibleJournal(root, head.projectId, j.historyTargetHash), parent = parseHead(a.io.read(target.previousHeadHash), head.projectId);
      if (node.editHash !== j.historyTargetHash || historyOf(parent).undoTip !== before.undoTip || head.history.undoTip !== j.historyTargetHash || head.history.redoRoot !== node.next || j.change.key !== target.change.key) unavailable();
      if (j.format === "studio-editorial-journal-v3") {
        if (j.change.beforeHash !== target.change.beforeHash || j.change.afterHash !== target.change.afterHash) unavailable();
      } else if (j.format === "studio-editorial-journal-v4") validateMonotonicNavigationChange(a, head.projectId, j.change, target, false);
      else unavailable();
    } else unavailable();
  }
  checkAnchor(root, snapshot, head.anchor);
  return j;
}
function readHead(root: CreatorNativeRoot, snapshot: StudioSnapshot): { head: Head; bytes: Buffer } {
  try {
    const bytes = rootBytes(root, headPath(snapshot.project.projectId), HEAD_LIMIT), head = parseHead(decode(bytes), snapshot.project.projectId);
    checkAnchor(root, snapshot, head.anchor); validateHeadCommit(root, snapshot, head);
    return { head, bytes };
  } catch { return unavailable(); }
}
function checkStable(root: CreatorNativeRoot, snapshot: StudioSnapshot, saved: { head: Head; bytes: Buffer }): void {
  checkAnchor(root, snapshot, saved.head.anchor);
  if (!rootBytes(root, headPath(saved.head.projectId), HEAD_LIMIT).equals(saved.bytes)) conflict();
}
function request(input: unknown, key: string, actor: string): { value: Record<string, unknown>; keyHash: string; requestDigest: string } {
  const value = cloneStudioJson(input); if (!value || typeof value !== "object" || Array.isArray(value) || encode(value).length > 32768 || typeof key !== "string" || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key) || typeof actor !== "string" || !actor.trim() || actor.length > 160 || /[\u0000-\u001f\u007f]/u.test(actor)) invalid();
  time(value.requestedAt); assertStudioId(value.projectId, "project"); return { value, keyHash: sha(key), requestDigest: digest({ format: "studio-editorial-request-v2", input: value, actor }) };
}
function entityAtHash(a: ReturnType<typeof access>, projectId: StudioId<"project">, kind: Entity["kind"], id: string, objectHash: string): { value: unknown; hash: string } {
  const raw = a.io.read(objectHash); exact(raw, "format,projectId,kind,entityId,value");
  if (raw.format !== "studio-editorial-entity-v2" || raw.projectId !== projectId || raw.kind !== kind || raw.entityId !== id) unavailable();
  return { value: raw.value, hash: objectHash };
}
function entity(a: ReturnType<typeof access>, head: Head, kind: Entity["kind"], id: string): { value: unknown; hash: string } {
  const objectHash = a.entities.get(head.entityRoot, kind + ":" + id); if (objectHash === null) invalid("The requested saved editorial entity does not exist.");
  return entityAtHash(a, head.projectId, kind, id, objectHash);
}
type HistoryAction = {
  available: boolean; command: HistoryCommand; label: string; description: string; targetOperation: EditorialV2ReversibleOperation | null; compositionId: string | null; compositionRevision: number | null;
};
function operationLabel(operation: EditorialV2ReversibleOperation): string {
  if (operation === "REPLACE_LAYER_TAKE") return "Take replacement";
  if (operation === "INSERT_TAKE_LAYER") return "video layer insertion";
  if (operation === "INSERT_TEXT_LAYER") return "title insertion";
  if (operation === "INSERT_AUDIO_LAYER") return "soundtrack insertion";
  if (operation === "SET_AUDIO_LAYER_TIMING") return "audio timing change";
  return operation === "SET_LAYER_PROPERTIES" ? "property change" : operation === "MOVE_LAYER_TIME" ? "move" : operation === "TRIM_LAYER_TIME" ? "trim" : operation === "SPLIT_LAYER_TIME" ? "split" : "duration change";
}
function unavailableAction(command: HistoryCommand, description: string): HistoryAction {
  return { available: false, command, label: command === "UNDO_EDITORIAL_EDIT" ? "Undo" : "Redo", description, targetOperation: null, compositionId: null, compositionRevision: null };
}
function availableAction(root: CreatorNativeRoot, a: ReturnType<typeof access>, head: Head, command: HistoryCommand, editHash: string): HistoryAction {
  const target = reversibleJournal(root, head.projectId, editHash), compositionId = target.change.key.slice("composition:".length), expectedHash = command === "UNDO_EDITORIAL_EDIT" ? target.change.afterHash : target.change.beforeHash;
  const currentHash = a.entities.get(head.entityRoot, target.change.key); if (currentHash === null) unavailable();
  const composition = validateCompositionV2(entityAtHash(a, head.projectId, "composition", compositionId, currentHash).value);
  const expected = validateCompositionV2(entityAtHash(a, head.projectId, "composition", compositionId, expectedHash).value);
  if (composition.compositionId !== compositionId || composition.projectId !== head.projectId || expected.compositionId !== compositionId || expected.projectId !== head.projectId || !sameCompositionContent(composition, expected)) unavailable();
  const action = command === "UNDO_EDITORIAL_EDIT" ? "Undo" : "Redo", noun = operationLabel(target.operation);
  return {
    available: true, command, label: `${action} ${noun}`,
    description: `${action} ${noun} in ${compositionId} by restoring the exact saved composition content with a new monotonic working-copy revision.`,
    targetOperation: target.operation, compositionId, compositionRevision: composition.revision,
  };
}
function historyControls(root: CreatorNativeRoot, a: ReturnType<typeof access>, head: Head) {
  const legacyDescription = "This working copy is at its persistent-history boundary. Older edits predate trustworthy operator history and cannot be reconstructed.";
  if (head.format === "studio-editorial-head-v2") {
    return { state: "LEGACY_BOUNDARY" as const, undo: unavailableAction("UNDO_EDITORIAL_EDIT", legacyDescription), redo: unavailableAction("REDO_EDITORIAL_EDIT", legacyDescription) };
  }
  const atLegacyFloor = head.history.boundary === "LEGACY_BOUNDARY" && head.history.undoTip === null;
  const undo = head.history.undoTip === null
    ? unavailableAction("UNDO_EDITORIAL_EDIT", atLegacyFloor ? legacyDescription : "You are at the beginning of the supported persistent editor history.")
    : availableAction(root, a, head, "UNDO_EDITORIAL_EDIT", head.history.undoTip);
  const redo = head.history.redoRoot === null
    ? unavailableAction("REDO_EDITORIAL_EDIT", "You are at the end of the active persistent editor history.")
    : availableAction(root, a, head, "REDO_EDITORIAL_EDIT", redoNode(a, head.projectId, head.history.redoRoot).editHash);
  return { state: atLegacyFloor ? "LEGACY_BOUNDARY" as const : "ACTIVE" as const, undo, redo };
}
function summary(saved: { head: Head; bytes: Buffer }) { return { revision: saved.head.revision, headDigest: sha(saved.bytes), at: saved.head.at, integrityScope: "HEAD_AND_CURRENT_COMMIT" as const, generationAllowed: false as const, providerRequests: 0 as const }; }
function replay(root: CreatorNativeRoot, snapshot: StudioSnapshot, saved: { head: Head; bytes: Buffer }, keyHash: string, requestDigest: string): boolean {
  const receipt = access(root, saved.head.projectId).receipts.get(saved.head.receiptRoot, keyHash); if (receipt === null) return false;
  const committed = journal(root, saved.head.projectId, receipt);
  if (committed.keyHash !== keyHash || committed.requestDigest !== requestDigest) conflict();
  if (committed.revision > saved.head.revision || committed.anchorDigest !== digest(saved.head.anchor)) unavailable();
  checkStable(root, snapshot, saved); return true;
}
interface PublicationBody {
  revision: number; at: string; actor: string; keyHash: string; requestDigest: string; previousHeadHash: string | null; beforeEntityRoot: string | null; beforeReceiptRoot: string | null;
  operation: "COPY_V1_TO_V2" | "ADMIT_DERIVED_TAKE" | EditorialV2ReversibleOperation | HistoryCommand; change: Journal["change"]; historyTargetHash?: string;
}
type PublicationHistory = "COPY" | "EDIT" | HistoryCursor;
function publish(root: CreatorNativeRoot, snapshot: StudioSnapshot, a: ReturnType<typeof access>, previous: { head: Head; bytes: Buffer } | null, anchor: Anchor, body: PublicationBody, entityRoot: string | null, history: PublicationHistory) {
  integer(body.revision); time(body.at);
  const projectId = snapshot.project.projectId, navigation = body.operation === "UNDO_EDITORIAL_EDIT" || body.operation === "REDO_EDITORIAL_EDIT";
  if (navigation !== (body.historyTargetHash !== undefined) || (navigation && history === "EDIT") || (navigation && history === "COPY")) invalid();
  const common = { projectId, revision: body.revision, at: body.at, actor: body.actor, keyHash: body.keyHash, requestDigest: body.requestDigest, anchorDigest: digest(anchor), previousHeadHash: body.previousHeadHash, beforeEntityRoot: body.beforeEntityRoot, afterEntityRoot: entityRoot, beforeReceiptRoot: body.beforeReceiptRoot, operation: body.operation, change: body.change, providerRequests: 0 as const, generationAllowed: false as const };
  const persistedJournal = navigation ? { format: "studio-editorial-journal-v4", ...common, historyTargetHash: body.historyTargetHash } : { format: "studio-editorial-journal-v2", ...common };
  const journalBytes = encode(persistedJournal), journalHash = sha(journalBytes), receiptRoot = a.receipts.set(body.beforeReceiptRoot, body.keyHash, journalHash);
  const cursor: HistoryCursor = history === "COPY"
    ? { format: "studio-editorial-history-cursor-v1", boundary: "COPY_BOUNDARY", undoTip: null, redoRoot: null }
    : history === "EDIT"
      ? { ...historyOf(previous!.head), undoTip: journalHash, redoRoot: null }
      : history;
  const head: HeadV3 = { format: "studio-editorial-head-v3", projectId, revision: body.revision, at: body.at, anchor, entityRoot, receiptRoot, journalTip: journalHash, history: cursor }, bytes = encode(head);
  if (bytes.length > HEAD_LIMIT) invalid();
  const fencePath = resolveStudioPath(projectId, "manifests", "project.json").split("/"), fence = encode(snapshot);
  checkAnchor(root, snapshot, anchor);
  if (previous) checkStable(root, snapshot, previous);
  else {
    // Missing head is not a fresh store when later/competing history exists.
    // Exact deterministic first-copy retry may reuse only its sole original commit.
    try { const names = root.listDirectory([...prefix(projectId), "commits"]); if (names.length !== 1 || names[0] !== journalHash + ".json" || !rootBytes(root, objectPath(projectId, journalHash, true)).equals(journalBytes)) unavailable(); }
    catch (error) {
      if ((error as { code?: string }).code !== "not_found") throw error;
      // Existing objects without their head/commit evidence are ambiguous loss,
      // never proof of a fresh store. Normal first-copy intent is written first.
      try { root.stat(prefix(projectId)); return unavailable(); }
      catch (presenceError) { if ((presenceError as { code?: string }).code !== "not_found") throw presenceError; }
    }
  }
  try {
    const exclusive = (segments: string[], data: Buffer) => {
      try { root.writeAtomicExclusive(segments, "editorial-v2-" + randomBytes(12).toString("hex") + ".tmp", data, fencePath, fence); }
      catch (error) { if ((error as { code?: string }).code !== "already_exists" || !rootBytes(root, segments).equals(data)) throw error; }
    };
    // An immutable journal alone is only an uncommitted intent. Recording it
    // before object writes lets exact first-copy recovery distinguish its own
    // interrupted preparation from missing/deleted historical commit evidence.
    exclusive(objectPath(projectId, journalHash, true), journalBytes);
    for (const [objectHash, data] of a.planned) exclusive(objectPath(projectId, objectHash), data);
    // One native external fence exists: project authority. Legacy is also checked
    // before and after, but concurrent v1 edits can leave a retained stale v2 branch.
    checkAnchor(root, snapshot, anchor);
    if (previous) root.writeAtomicReplace(headPath(projectId), "editorial-v2-" + randomBytes(12).toString("hex") + ".tmp", bytes, previous.bytes, fencePath, fence);
    else root.writeAtomicExclusive(headPath(projectId), "editorial-v2-" + randomBytes(12).toString("hex") + ".tmp", bytes, fencePath, fence);
    checkAnchor(root, snapshot, anchor);
    const saved = { head, bytes }; checkStable(root, snapshot, saved); validateHeadCommit(root, snapshot, head); return summary(saved);
  } catch { return unavailable(); }
}
/** Explicit copy only. Existing v1 records, active UI, assets and media never change. */
export function migrateStudioEditorialV2(root: CreatorNativeRoot, snapshot: StudioSnapshot, input: unknown, key: string, actor: string) {
  const r = request(input, key, actor), v = r.value;
  exact(v, "operation,projectId,expectedProjectRevision,expectedEditorialRevision,requestedAt");
  if (v.operation !== "COPY_V1_TO_V2" || v.projectId !== snapshot.project.projectId) invalid(); integer(v.expectedProjectRevision); integer(v.expectedEditorialRevision);
  let existing = false; try { existing = root.stat(headPath(snapshot.project.projectId)) === "file"; } catch (error) { if ((error as { code?: string }).code !== "not_found") unavailable(); }
  if (existing) { const saved = readHead(root, snapshot); if (replay(root, snapshot, saved, r.keyHash, r.requestDigest)) return summary(saved); return conflict(); }
  const legacyBytes = rootBytes(root, legacyPath(snapshot.project.projectId), HEAD_LIMIT), legacy = readStudioEditorial(root, snapshot);
  if (!legacy.persisted || legacy.revision !== v.expectedEditorialRevision || snapshot.project.revision !== v.expectedProjectRevision) conflict();
  if (!rootBytes(root, legacyPath(snapshot.project.projectId), HEAD_LIMIT).equals(legacyBytes)) unavailable();
  const anchor: Anchor = { format: "studio-editorial-legacy-anchor-v2", projectRecordDigest: snapshot.recordDigest, legacyHeadHash: sha(legacyBytes), legacyRevision: legacy.revision, legacyContentDigest: digest(legacy.content) };
  // readStudioEditorial above has fully validated this exact anchored v1 record,
  // including its cumulative history. Preference-only saves also advance its tip.
  const legacyPointer = decode(legacyBytes) as { recordDigest: string };
  hash(legacyPointer.recordDigest);
  const legacyRecord = decode(rootBytes(root, [...resolveStudioPath(snapshot.project.projectId, "manifests").split("/"), "editorial", legacyPointer.recordDigest + ".json"]));
  exact(legacyRecord, "format,projectId,revision,content,events,receipts,previousRecordDigest,recordDigest");
  const { recordDigest, ...legacyBody } = legacyRecord;
  // This is a second read: bind it independently to the exact record that the
  // legacy reader validated, rather than trusting the unchanged head alone.
  if (recordDigest !== legacyPointer.recordDigest || digest(legacyBody) !== legacyPointer.recordDigest || !Array.isArray(legacyRecord.events) || legacyRecord.events.length === 0) unavailable();
  const latestAt = legacyRecord.events.at(-1)?.at; time(latestAt);
  if (String(v.requestedAt) < latestAt) invalid("Migration cannot predate its source.");
  const a = access(root, snapshot.project.projectId); let entityRoot: string | null = null;
  const add = (kind: Entity["kind"], entityId: string, value: unknown) => { const objectHash = a.io.stage({ format: "studio-editorial-entity-v2", projectId: snapshot.project.projectId, kind, entityId, value } satisfies Entity); entityRoot = a.entities.set(entityRoot, kind + ":" + entityId, objectHash); };
  for (const take of legacy.content.takes) add("take", take.takeId, take);
  for (const selected of legacy.content.selectedTakes) add("selection", selected.shotId, selected);
  for (const composition of legacy.content.compositions) add("composition", composition.compositionId, migrateCompositionV1ToV2(composition));
  return publish(root, snapshot, a, null, anchor, { revision: 1, at: String(v.requestedAt), actor, keyHash: r.keyHash, requestDigest: r.requestDigest, previousHeadHash: null, beforeEntityRoot: null, beforeReceiptRoot: null, operation: "COPY_V1_TO_V2", change: null }, entityRoot, "COPY");
}
type CatalogueLibrary = "PROJECT_LOCAL_C" | "CONFIGURED_D" | "PROJECT_ASSET_REGISTRY";
function derivedTakeId(asset: Asset): string { return "take_blender_" + digest({ projectId: asset.projectId, assetId: asset.assetId, version: asset.version }).slice(0, 24); }
function derivedAssetShot(snapshot: StudioSnapshot, asset: Asset): StudioId<"shot"> {
  if (!isBlenderDerivedMediaAsset(asset) || asset.projectId !== snapshot.project.projectId) unavailable();
  validateLocalFootageAsset(asset);
  const job = snapshot.jobs.find(candidate => candidate.jobId === asset.provenance.jobId);
  if (!job || job.state !== "SUCCEEDED" || job.shotId === null || job.outputs.length !== 1 || job.outputs[0].assetId !== asset.assetId || job.outputs[0].version !== asset.version) unavailable();
  const execution = readBlenderJob(job), settings = asset.provenance.adapterMetadata!.settings;
  if (execution.phase !== "COMPLETED" || execution.specDigest !== settings.specDigest || execution.spec.shotId !== settings.shotId || execution.spec.descriptorHash !== settings.descriptorHash || execution.spec.blendSha256 !== settings.blendSha256 || execution.spec.dependenciesDigest !== settings.dependenciesDigest || canonical(execution.spec.source) !== canonical(asset.provenance.parentAssets[0])) unavailable();
  return job.shotId;
}
/** Explicit catalogue admission only. This never changes shot selection, places
 * a layer, modifies a composition, or discards its active Undo/Redo branch. */
export function admitStudioEditorialV2DerivedTake(root: CreatorNativeRoot, snapshot: StudioSnapshot, input: unknown, key: string, actor: string) {
  const r = request(input, key, actor), v = r.value;
  exact(v, "operation,projectId,expectedRevision,expectedHeadDigest,compositionId,assetId,version,requestedAt");
  if (v.operation !== "ADMIT_DERIVED_TAKE" || v.projectId !== snapshot.project.projectId || typeof v.compositionId !== "string") invalid();
  integer(v.expectedRevision); hash(v.expectedHeadDigest); integer(v.version); assertStudioId(v.assetId, "asset");
  const asset = snapshot.assets.find(item => item.assetId === v.assetId && item.version === v.version);
  if (!asset) invalid("Choose an existing completed Blender-derived source.");
  const shotId = derivedAssetShot(snapshot, asset), takeId = derivedTakeId(asset), saved = readHead(root, snapshot);
  if (replay(root, snapshot, saved, r.keyHash, r.requestDigest)) return { ...summary(saved), takeId };
  if (saved.head.revision !== v.expectedRevision || sha(saved.bytes) !== v.expectedHeadDigest) conflict();
  if (String(v.requestedAt) < saved.head.at) invalid("Admission cannot predate saved history.");
  const a = access(root, saved.head.projectId), composition = validateCompositionV2(entity(a, saved.head, "composition", v.compositionId).value);
  if (composition.projectId !== saved.head.projectId || composition.shotId !== shotId) invalid("The source must belong to this saved shot composition.");
  const entityKey = "take:" + takeId, existing = a.entities.get(saved.head.entityRoot, entityKey);
  if (existing !== null) {
    const take = validateEditorialTake(entityAtHash(a, saved.head.projectId, "take", takeId, existing).value);
    if (take.projectId !== saved.head.projectId || take.shotId !== shotId || canonical(take.source) !== canonical({ assetId: asset.assetId, version: asset.version })) unavailable();
    checkStable(root, snapshot, saved); return { ...summary(saved), takeId };
  }
  const take = validateEditorialTake({ schemaVersion: 1, takeId, projectId: saved.head.projectId, shotId, source: { assetId: asset.assetId, version: asset.version }, name: asset.provenance.adapterMetadata!.settings.sourceLabel, createdAt: v.requestedAt, review: { state: "UNREVIEWED", note: "", reviewedAt: null } });
  const afterHash = a.io.stage({ format: "studio-editorial-entity-v2", projectId: saved.head.projectId, kind: "take", entityId: takeId, value: take } satisfies Entity);
  const entityRoot = a.entities.set(saved.head.entityRoot, entityKey, afterHash), previousHeadHash = a.io.stage(saved.head);
  return { ...publish(root, snapshot, a, saved, saved.head.anchor, {
    revision: saved.head.revision + 1, at: String(v.requestedAt), actor, keyHash: r.keyHash, requestDigest: r.requestDigest, previousHeadHash,
    beforeEntityRoot: saved.head.entityRoot, beforeReceiptRoot: saved.head.receiptRoot, operation: "ADMIT_DERIVED_TAKE", change: { key: entityKey, beforeHash: null, afterHash },
  }, entityRoot, historyOf(saved.head)), takeId };
}
function localMediaCatalogue(asset: Asset): { sourceLabel: string; library: CatalogueLibrary; duration: CompositionV2["duration"] | null } {
  validateLocalFootageAsset(asset);
  const settings = asset.provenance.adapterMetadata!.settings;
  const sourceLabel = settings.sourceLabel;
  if (typeof sourceLabel !== "string" || !sourceLabel.trim() || sourceLabel.length > 256 || /[\u0000-\u001f\u007f]/u.test(sourceLabel)) unavailable();
  const technical = isQualifiedLocalMediaAsset(asset) ? localMediaTechnicalMetadata(asset) : null;
  return { sourceLabel, library: localFootageStorageBinding(asset) ? "CONFIGURED_D" : "PROJECT_LOCAL_C", duration: technical?.duration ?? null };
}
/** Read-only entry catalogue. This bounded initial inspection verifies the v1
 * source, not media. Absence is an observation, never an instruction to migrate. */
export function inspectStudioEditorialV2WorkingCopy(root: CreatorNativeRoot, snapshot: StudioSnapshot) {
  const projectId = snapshot.project.projectId;
  const legacyHead = (): Buffer | null => {
    try { return root.readFile(legacyPath(projectId), HEAD_LIMIT); }
    catch (error) { if ((error as { code?: string }).code === "not_found") return null; return unavailable(); }
  };
  const before = legacyHead(), original = readStudioEditorial(root, snapshot);
  let current: { head: Head; bytes: Buffer } | null = null;
  let workingCopy: { state: "NOT_CREATED" | "READY" | "UNAVAILABLE"; revision: number | null; headDigest: string | null } = { state: "UNAVAILABLE", revision: null, headDigest: null };
  try {
    root.stat(prefix(projectId));
    const saved = readHead(root, snapshot); checkStable(root, snapshot, saved);
    current = saved;
    workingCopy = { state: "READY", revision: saved.head.revision, headDigest: sha(saved.bytes) };
  } catch (error) {
    // Only absent top-level v2 storage can be described as not created. Missing
    // heads, lost commit evidence, corrupt paths and stale anchors stay blocked.
    if ((error as { code?: string }).code === "not_found") workingCopy = { state: "NOT_CREATED", revision: null, headDigest: null };
  }
  const after = legacyHead();
  if (!rootBytes(root, resolveStudioPath(projectId, "manifests", "project.json").split("/")).equals(encode(snapshot)) || (before === null ? after !== null : after === null || !before.equals(after))) unavailable();
  const takes = [...original.content.takes];
  if (current) {
    const a = access(root, projectId);
    for (const asset of snapshot.assets.filter(isBlenderDerivedMediaAsset)) {
      const takeId = derivedTakeId(asset), objectHash = a.entities.get(current.head.entityRoot, "take:" + takeId);
      if (objectHash === null) continue;
      const take = validateEditorialTake(entityAtHash(a, projectId, "take", takeId, objectHash).value);
      if (take.takeId !== takeId || take.projectId !== projectId || take.shotId !== derivedAssetShot(snapshot, asset) || canonical(take.source) !== canonical({ assetId: asset.assetId, version: asset.version }) || takes.some(item => item.takeId === takeId)) unavailable();
      takes.push(take);
    }
    checkStable(root, snapshot, current);
  }
  const takeCatalogue = takes.map(take => {
    const asset = snapshot.assets.find(candidate => candidate.assetId === take.source.assetId && candidate.version === take.source.version);
    if (!asset || asset.projectId !== projectId || (asset.assetType !== "VIDEO" && asset.assetType !== "IMAGE")) unavailable();
    if (asset.assetType === "IMAGE") return { takeId: take.takeId, shotId: take.shotId, name: take.name, sourceLabel: take.name, mediaType: "IMAGE" as const, library: "PROJECT_ASSET_REGISTRY" as const, duration: null, eligibility: "READY" as const, reason: null };
    if (!isLocalFootageAsset(asset)) return { takeId: take.takeId, shotId: take.shotId, name: take.name, sourceLabel: take.name, mediaType: "VIDEO" as const, library: "PROJECT_ASSET_REGISTRY" as const, duration: null, eligibility: "SOURCE_DURATION_UNAVAILABLE" as const, reason: "This video Take has no qualified local source-duration record, so exact insertion is unavailable." };
    const media = localMediaCatalogue(asset);
    return { takeId: take.takeId, shotId: take.shotId, name: take.name, sourceLabel: media.sourceLabel, mediaType: "VIDEO" as const, library: media.library, duration: media.duration, eligibility: media.duration ? "READY" as const : "SOURCE_DURATION_UNAVAILABLE" as const, reason: media.duration ? null : "This legacy imported MP4 predates exact source-duration qualification, so exact insertion is unavailable." };
  });
  const audioCatalogue = snapshot.assets.filter(asset => asset.projectId === projectId && asset.assetType === "AUDIO" && isLocalFootageAsset(asset)).map(asset => {
    const media = localMediaCatalogue(asset);
    if (!media.duration) unavailable();
    return { assetId: asset.assetId, version: asset.version, sourceLabel: media.sourceLabel, library: media.library, duration: media.duration };
  });
  return {
    projectId, projectRevision: snapshot.project.revision, legacyRevision: original.revision, legacyPersisted: original.persisted,
    compositions: original.content.compositions.map(c => ({ compositionId: c.compositionId, name: c.name, kind: c.kind })),
    takeCatalogue, audioCatalogue, workingCopy, providerRequests: 0 as const, generationAllowed: false as const,
  };
}
/** Lazy entity read: no unrelated compositions, old history or media bytes are read. */
export function readStudioEditorialV2Composition(root: CreatorNativeRoot, snapshot: StudioSnapshot, compositionId: string) {
  const saved = readHead(root, snapshot), a = access(root, saved.head.projectId), c = validateCompositionV2(entity(a, saved.head, "composition", compositionId).value);
  const shot = c.shotId === null ? null : snapshot.shots.find(candidate => candidate.shotId === c.shotId) ?? null;
  if (c.compositionId !== compositionId || c.projectId !== saved.head.projectId || (c.shotId !== null && shot === null)) unavailable();
  const refs = new Map<string, { assetId: string; version: number; status: "UNCHECKED" }>(), takes = new Map<string, ReturnType<typeof validateEditorialTake>>();
  for (const layer of c.layers) if (layer.source.kind === "ASSET") {
    const ref = layer.source.asset, asset = snapshot.assets.find(x => x.assetId === ref.assetId && x.version === ref.version);
    if (!asset || asset.assetType !== layer.type) unavailable();
    refs.set(ref.assetId + ":" + ref.version, { ...ref, status: "UNCHECKED" });
    if (layer.source.takeId) { const t = validateEditorialTake(entity(a, saved.head, "take", layer.source.takeId).value); if (t.takeId !== layer.source.takeId || t.projectId !== c.projectId || canonical(t.source) !== canonical(ref) || (c.shotId !== null && t.shotId !== c.shotId)) unavailable(); takes.set(t.takeId, t); }
  }
  const history = historyControls(root, a, saved.head);
  checkStable(root, snapshot, saved);
  return { ...summary(saved), integrityScope: "SELECTED_COMPOSITION_DIRECT_REFERENCES_AND_ACTIVE_HISTORY" as const, nestedCompositionResolution: "NOT_LOADED" as const, timelineFrameRate: shot === null ? null : timelineFrameRateFromSavedFps(shot.fps), composition: c, takes: [...takes.values()], media: [...refs.values()], history };
}
function insertionTime(value: unknown, subject: string, positive = false): CompositionV2["duration"] {
  try {
    const result = validateEditorialRational(value);
    if (positive && result.numerator === 0) invalid(`Use a positive canonical exact ${subject}.`);
    return result;
  } catch (error) {
    if (error instanceof EditorialV2StoreError) throw error;
    return invalid(`Use a canonical nonnegative exact ${subject}.`);
  }
}
function qualifiedSourceDuration(asset: Asset, expected: "VIDEO" | "AUDIO"): CompositionV2["duration"] {
  if (asset.assetType !== expected || !isQualifiedLocalMediaAsset(asset)) return sourceCoverage();
  try {
    const metadata = localMediaTechnicalMetadata(asset);
    if (metadata.assetType !== expected) return sourceCoverage();
    return validateEditorialRational(metadata.duration);
  } catch { return sourceCoverage(); }
}
function insertStudioEditorialV2Layer(root: CreatorNativeRoot, snapshot: StudioSnapshot, r: ReturnType<typeof request>, v: Record<string, unknown>, actor: string) {
  const takeInsertion = v.operation === "INSERT_TAKE_LAYER", textInsertion = v.operation === "INSERT_TEXT_LAYER", audioInsertion = v.operation === "INSERT_AUDIO_LAYER";
  exact(v, takeInsertion
    ? "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,takeId,start,duration,sourceOffset"
    : textInsertion
      ? "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,start,duration,text,transform"
      : "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,assetId,version,start,duration,sourceOffset,audio");
  if ((!takeInsertion && !textInsertion && !audioInsertion) || v.projectId !== snapshot.project.projectId || typeof v.compositionId !== "string" || !/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(v.compositionId)) invalid();
  integer(v.expectedRevision); integer(v.expectedCompositionRevision);
  const start = insertionTime(v.start, "layer start"), duration = insertionTime(v.duration, "layer duration", true);
  const sourceOffset = textInsertion ? { numerator: 0, denominator: 1 } as const : insertionTime(v.sourceOffset, "source offset");
  if (takeInsertion && (typeof v.takeId !== "string" || !/^take_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(v.takeId))) invalid();
  if (audioInsertion) { try { assertStudioId(v.assetId, "asset"); } catch { return invalid(); } integer(v.version); }
  const saved = readHead(root, snapshot); if (replay(root, snapshot, saved, r.keyHash, r.requestDigest)) return summary(saved);
  const selected = readStudioEditorialV2Composition(root, snapshot, v.compositionId), c = selected.composition;
  if (saved.head.revision !== v.expectedRevision || selected.headDigest !== sha(saved.bytes) || c.revision !== v.expectedCompositionRevision) conflict();
  if (String(v.requestedAt) < saved.head.at) invalid("Layer insertion cannot predate saved history.");
  if (c.layers.length >= STUDIO_COMPOSITION_LIMITS.layersPerComposition) invalid("The saved composition already has the maximum supported layer count.");
  try { if (editorialCompareTime(editorialAddTime(start, duration), c.duration) > 0) return compositionCoverage(); }
  catch (error) { if (error instanceof EditorialV2StoreError) throw error; return compositionCoverage(); }
  const a = access(root, saved.head.projectId), at = String(v.requestedAt), layerId = ("layer_insert_" + r.requestDigest) as CompositionV2["layers"][number]["layerId"];
  if (c.layers.some(layer => layer.layerId === layerId)) invalid("The server-derived layer identity is unavailable.");
  const common = {
    schemaVersion: 2 as const, layerId, compositionId: c.compositionId, enabled: true, locked: false, solo: false,
    start, duration, sourceOffset, playbackRate: 1 as const, reverse: false as const, opacity: 1, keyframes: [] as [],
    createdAt: at, updatedAt: at, version: 1, approvalState: "DRAFT" as const,
    provenance: { kind: "EDITORIAL_INSTRUCTION" as const, providerRequests: 0 as const },
  };
  let layer: CompositionV2["layers"][number];
  if (takeInsertion) {
    const take = validateEditorialTake(entity(a, saved.head, "take", String(v.takeId)).value);
    if (take.takeId !== v.takeId || take.projectId !== c.projectId || c.shotId === null || take.shotId !== c.shotId) invalid("Choose a saved Take that belongs to this shot composition.");
    const asset = snapshot.assets.find(candidate => candidate.assetId === take.source.assetId && candidate.version === take.source.version);
    if (!asset || asset.projectId !== c.projectId || (asset.assetType !== "VIDEO" && asset.assetType !== "IMAGE")) invalid("The selected Take no longer resolves to a supported immutable visual asset.");
    if (asset.assetType === "VIDEO") {
      const sourceDuration = qualifiedSourceDuration(asset, "VIDEO");
      try { if (editorialCompareTime(editorialAddTime(sourceOffset, duration), sourceDuration) > 0) return sourceCoverage(); }
      catch (error) { if (error instanceof EditorialV2StoreError) throw error; return sourceCoverage(); }
    } else if (sourceOffset.numerator !== 0) sourceCoverage();
    layer = { ...common, name: take.name, type: asset.assetType, source: { kind: "ASSET", asset: take.source, takeId: take.takeId }, transform: defaultLayerTransform() } as CompositionV2["layers"][number];
  } else if (audioInsertion) {
    const asset = snapshot.assets.find(candidate => candidate.assetId === v.assetId && candidate.version === v.version);
    if (!asset || asset.projectId !== c.projectId || asset.assetType !== "AUDIO") invalid("Choose a qualified imported soundtrack from this project.");
    const sourceDuration = qualifiedSourceDuration(asset, "AUDIO");
    try { if (editorialCompareTime(editorialAddTime(sourceOffset, duration), sourceDuration) > 0) return sourceCoverage(); }
    catch (error) { if (error instanceof EditorialV2StoreError) throw error; return sourceCoverage(); }
    layer = { ...common, name: "Soundtrack", type: "AUDIO", source: { kind: "ASSET", asset: { assetId: asset.assetId, version: asset.version }, takeId: null }, transform: defaultLayerTransform(), audio: v.audio as StudioAudioPropertiesV2 } as CompositionV2["layers"][number];
  } else {
    layer = { ...common, name: "Title", type: "TEXT", source: { kind: "TEXT" }, transform: v.transform as CompositionV2["layers"][number]["transform"], text: v.text as StudioTextProperties } as CompositionV2["layers"][number];
  }
  let next: CompositionV2;
  try { next = validateCompositionV2({ ...c, revision: c.revision + 1, layers: [...c.layers, layer] }); }
  catch { return invalid("The exact layer instructions do not fit the supported saved composition contract."); }
  const entityKey = "composition:" + c.compositionId, before = entity(a, saved.head, "composition", c.compositionId);
  const afterHash = a.io.stage({ format: "studio-editorial-entity-v2", projectId: saved.head.projectId, kind: "composition", entityId: c.compositionId, value: next } satisfies Entity);
  const entityRoot = a.entities.set(saved.head.entityRoot, entityKey, afterHash), previousHeadHash = a.io.stage(saved.head);
  return publish(root, snapshot, a, saved, saved.head.anchor, {
    revision: saved.head.revision + 1, at, actor, keyHash: r.keyHash, requestDigest: r.requestDigest, previousHeadHash,
    beforeEntityRoot: saved.head.entityRoot, beforeReceiptRoot: saved.head.receiptRoot, operation: v.operation as EditorialV2ReversibleOperation, change: { key: entityKey, beforeHash: before.hash, afterHash },
  }, entityRoot, "EDIT");
}
export function editStudioEditorialV2Layer(root: CreatorNativeRoot, snapshot: StudioSnapshot, input: unknown, key: string, actor: string) {
  const r = request(input, key, actor), v = r.value;
  if (v.operation === "INSERT_TAKE_LAYER" || v.operation === "INSERT_TEXT_LAYER" || v.operation === "INSERT_AUDIO_LAYER") return insertStudioEditorialV2Layer(root, snapshot, r, v, actor);
  const moving = v.operation === "MOVE_LAYER_TIME", trimming = v.operation === "TRIM_LAYER_TIME", splitting = v.operation === "SPLIT_LAYER_TIME", audioTiming = v.operation === "SET_AUDIO_LAYER_TIMING", replacing = v.operation === "REPLACE_LAYER_TAKE";
  exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt," + (moving ? "start" : trimming ? "edge,trimPoint" : splitting ? "splitPoint" : audioTiming ? "start,duration,sourceOffset" : replacing ? "expectedHeadDigest,takeId" : "changes"));
  if ((!moving && !trimming && !splitting && !audioTiming && !replacing && v.operation !== "SET_LAYER_PROPERTIES") || v.projectId !== snapshot.project.projectId || typeof v.compositionId !== "string" || typeof v.layerId !== "string") invalid();
  integer(v.expectedRevision); integer(v.expectedCompositionRevision);
  let movedStart: EditorialV2LayerMove["start"] | undefined;
  let trimEdge: LayerTrimEdge | undefined, trimPoint: EditorialV2LayerTrim["trimPoint"] | undefined;
  let splitPoint: EditorialV2LayerSplit["splitPoint"] | undefined;
  if (moving) { try { movedStart = validateEditorialRational(v.start); } catch { return invalid("Use a canonical nonnegative exact timeline start."); } }
  else if (trimming) {
    if (v.edge !== "IN" && v.edge !== "OUT") invalid("Use a supported exact trim edge.");
    trimEdge = v.edge;
    try { trimPoint = validateEditorialRational(v.trimPoint); } catch { return invalid("Use a canonical nonnegative exact trim point."); }
  }
  else if (splitting) { try { splitPoint = validateEditorialRational(v.splitPoint); } catch { return invalid("Use a canonical nonnegative exact split point."); } }
  else if (audioTiming) { insertionTime(v.start, "audio start"); insertionTime(v.duration, "audio duration", true); insertionTime(v.sourceOffset, "audio source offset"); }
  else if (replacing) { hash(v.expectedHeadDigest); if (typeof v.takeId !== "string" || !/^take_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(v.takeId)) invalid(); }
  else if (!v.changes || typeof v.changes !== "object" || Array.isArray(v.changes) || Object.keys(v.changes).length === 0 || Object.keys(v.changes).some(k => !["name", "opacity", "enabled", "transform", "text", "audio"].includes(k))) invalid();
  const saved = readHead(root, snapshot); if (replay(root, snapshot, saved, r.keyHash, r.requestDigest)) return summary(saved);
  const selected = readStudioEditorialV2Composition(root, snapshot, v.compositionId), c = selected.composition;
  if (saved.head.revision !== v.expectedRevision || selected.headDigest !== sha(saved.bytes) || c.revision !== v.expectedCompositionRevision) conflict();
  if (replacing && selected.headDigest !== v.expectedHeadDigest) conflict();
  if (String(v.requestedAt) < saved.head.at) invalid("Modification cannot predate saved history.");
  const layer = c.layers.find(l => l.layerId === v.layerId); if (!layer || layer.locked) invalid("Select an unlocked saved layer. Unlocking requires a separate supported operation.");
  if (replacing) {
    // Resolve only a saved immutable Take. The client cannot submit a replacement
    // Asset, timing, layer snapshot, or visual properties through this operation.
    if (layer.type !== "VIDEO" || layer.source.kind !== "ASSET" || layer.playbackRate !== 1 || layer.reverse || layer.keyframes.length !== 0 || c.shotId === null) invalid("Take replacement requires an unlocked direct-asset video layer with forward unit-rate playback and no keyframes.");
    const a = access(root, saved.head.projectId), take = validateEditorialTake(entity(a, saved.head, "take", String(v.takeId)).value);
    if (take.takeId !== v.takeId || take.projectId !== c.projectId || take.shotId !== c.shotId) invalid("Choose a saved video Take belonging to this shot composition.");
    const asset = snapshot.assets.find(candidate => candidate.assetId === take.source.assetId && candidate.version === take.source.version);
    if (!asset || asset.projectId !== c.projectId || asset.assetType !== "VIDEO") invalid("The replacement Take must resolve to a video Asset in this project.");
    const sourceDuration = qualifiedSourceDuration(asset, "VIDEO");
    if (editorialCompareTime(editorialAddTime(layer.sourceOffset, layer.duration), sourceDuration) > 0) sourceCoverage();
    const nextSource = { kind: "ASSET" as const, asset: { ...take.source }, takeId: take.takeId };
    if (canonical(layer.source) === canonical(nextSource)) invalid("This layer already uses the selected Take.");
    layer.source = nextSource;
  } else if (audioTiming) {
    let nextTiming: ReturnType<typeof setAudioLayerV2Timing>;
    try { nextTiming = setAudioLayerV2Timing(layer, { start: v.start as CompositionV2["duration"], duration: v.duration as CompositionV2["duration"], sourceOffset: v.sourceOffset as CompositionV2["duration"] }); }
    catch { return invalid("Use exact sample-aligned AUDIO timing with every saved fade inside the proposed duration."); }
    if (layer.source.kind !== "ASSET") invalid();
    const source = layer.source;
    const sourceAsset = snapshot.assets.find(candidate => candidate.assetId === source.asset.assetId && candidate.version === source.asset.version);
    if (!sourceAsset || sourceAsset.projectId !== c.projectId || sourceAsset.assetType !== "AUDIO") return sourceCoverage();
    if (editorialCompareTime(editorialAddTime(nextTiming.sourceOffset, nextTiming.duration), qualifiedSourceDuration(sourceAsset, "AUDIO")) > 0) return sourceCoverage();
    if (editorialCompareTime(editorialAddTime(nextTiming.start, nextTiming.duration), c.duration) > 0) return compositionCoverage();
    if (canonical(nextTiming) === canonical({ start: layer.start, duration: layer.duration, sourceOffset: layer.sourceOffset })) invalid("The audio occurrence already has these exact timing instructions.");
    Object.assign(layer, nextTiming);
  } else if (movedStart) {
    if (canonical(layer.start) === canonical(movedStart)) invalid("The layer already has this exact timeline start.");
    layer.start = movedStart;
  } else if (trimEdge && trimPoint) {
    try { Object.assign(layer, trimLayerV2Time(layer, trimEdge, trimPoint)); }
    catch { return invalid("The exact trim point must be strictly inside the saved layer interval."); }
  } else if (splitPoint) {
    if (c.layers.length >= STUDIO_COMPOSITION_LIMITS.layersPerComposition) invalid("The saved composition already has the maximum supported layer count.");
    let timing: ReturnType<typeof splitLayerV2Time>;
    try { timing = splitLayerV2Time(layer, splitPoint); }
    catch (error) {
      if (error instanceof CompositionValidationError && error.code === "UNSUPPORTED_LAYER_SPLIT") return unsupportedSplit();
      return invalid("The exact split point must be strictly inside the saved layer interval.");
    }
    const index = c.layers.findIndex(candidate => candidate.layerId === layer.layerId);
    const rightLayerId = ("layer_split_" + r.requestDigest) as CompositionV2["layers"][number]["layerId"];
    if (index < 0 || c.layers.some(candidate => candidate.layerId === rightLayerId)) invalid("The server-derived right-segment identity is unavailable.");
    const at = String(v.requestedAt);
    const left: CompositionV2["layers"][number] = { ...layer, ...timing.left, updatedAt: at, version: layer.version + 1 };
    const right: CompositionV2["layers"][number] = { ...layer, ...timing.right, layerId: rightLayerId, createdAt: at, updatedAt: at, version: 1 };
    c.layers.splice(index, 1, left, right);
  } else {
    const changes = v.changes as EditorialV2LayerEdit["changes"];
    if (changes.name !== undefined && (typeof changes.name !== "string" || !changes.name.trim() || changes.name.length > STUDIO_COMPOSITION_LIMITS.name || /[\u0000-\u001f\u007f]/u.test(changes.name))) invalid("Use a readable layer name of at most 160 characters.");
    if ((changes.text !== undefined && layer.type !== "TEXT") || (changes.audio !== undefined && layer.type !== "AUDIO")) invalid("Type-specific properties must match the selected saved layer.");
    if (layer.type === "AUDIO" && (changes.opacity !== undefined || changes.transform !== undefined)) invalid("Audio layers do not accept visual opacity or transform changes.");
    Object.assign(layer, changes);
  }
  if (!splitting) { layer.version++; layer.updatedAt = String(v.requestedAt); }
  c.revision++;
  let next: CompositionV2;
  // The saved composition was validated before modification. Exact timing edits
  // change only their authorized canonical fields; interval/representability
  // errors reject the request rather than round, rebase or publish a partial edit.
  try { next = validateCompositionV2(c); } catch (error) { if (moving) return invalid("The exact moved interval must fit the saved composition."); if (trimming) return invalid("The exact trimmed interval must remain valid in the saved composition."); if (splitting) return invalid("The exact split segments must remain valid in the saved composition."); throw error; }
  const a = access(root, saved.head.projectId), entityKey = "composition:" + c.compositionId, before = entity(a, saved.head, "composition", c.compositionId);
  const afterHash = a.io.stage({ format: "studio-editorial-entity-v2", projectId: saved.head.projectId, kind: "composition", entityId: c.compositionId, value: next } satisfies Entity);
  const entityRoot = a.entities.set(saved.head.entityRoot, entityKey, afterHash), previousHeadHash = a.io.stage(saved.head);
  return publish(root, snapshot, a, saved, saved.head.anchor, { revision: saved.head.revision + 1, at: String(v.requestedAt), actor, keyHash: r.keyHash, requestDigest: r.requestDigest, previousHeadHash, beforeEntityRoot: saved.head.entityRoot, beforeReceiptRoot: saved.head.receiptRoot, operation: moving ? "MOVE_LAYER_TIME" : trimming ? "TRIM_LAYER_TIME" : splitting ? "SPLIT_LAYER_TIME" : audioTiming ? "SET_AUDIO_LAYER_TIMING" : replacing ? "REPLACE_LAYER_TAKE" : "SET_LAYER_PROPERTIES", change: { key: entityKey, beforeHash: before.hash, afterHash } }, entityRoot, "EDIT");
}
/** Change only the canonical saved duration. Extending creates an empty tail;
 * shortening never trims, moves, retimes, disables or otherwise mutates layers. */
export function editStudioEditorialV2CompositionDuration(root: CreatorNativeRoot, snapshot: StudioSnapshot, input: unknown, key: string, actor: string) {
  const r = request(input, key, actor), v = r.value;
  exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,duration");
  if (v.operation !== "SET_COMPOSITION_DURATION" || v.projectId !== snapshot.project.projectId || typeof v.compositionId !== "string") invalid();
  integer(v.expectedRevision); integer(v.expectedCompositionRevision);
  let duration: EditorialV2CompositionDurationEdit["duration"];
  try { duration = validateEditorialRational(v.duration); }
  catch { return invalid("Use a canonical positive exact composition duration."); }
  if (duration.numerator === 0) invalid("Use a canonical positive exact composition duration.");
  const saved = readHead(root, snapshot); if (replay(root, snapshot, saved, r.keyHash, r.requestDigest)) return summary(saved);
  const selected = readStudioEditorialV2Composition(root, snapshot, v.compositionId), c = selected.composition;
  if (saved.head.revision !== v.expectedRevision || selected.headDigest !== sha(saved.bytes) || c.revision !== v.expectedCompositionRevision) conflict();
  if (String(v.requestedAt) < saved.head.at) invalid("Modification cannot predate saved history.");
  const comparison = editorialCompareTime(duration, c.duration);
  if (comparison === 0) invalid("The composition already has this exact saved duration.");
  if (comparison < 0 && c.layers.some(layer => layer.enabled && editorialCompareTime(editorialAddTime(layer.start, layer.duration), duration) > 0)) durationConflict();
  const previousLayers = canonical(c.layers);
  let next: CompositionV2;
  try { next = validateCompositionV2({ ...c, duration, revision: c.revision + 1 }); }
  catch { return invalid("The requested duration must contain every saved layer interval and remain within the composition schema."); }
  if (canonical(next.layers) !== previousLayers) unavailable();
  const a = access(root, saved.head.projectId), entityKey = "composition:" + c.compositionId, before = entity(a, saved.head, "composition", c.compositionId);
  const afterHash = a.io.stage({ format: "studio-editorial-entity-v2", projectId: saved.head.projectId, kind: "composition", entityId: c.compositionId, value: next } satisfies Entity);
  const entityRoot = a.entities.set(saved.head.entityRoot, entityKey, afterHash), previousHeadHash = a.io.stage(saved.head);
  return publish(root, snapshot, a, saved, saved.head.anchor, {
    revision: saved.head.revision + 1, at: String(v.requestedAt), actor, keyHash: r.keyHash, requestDigest: r.requestDigest, previousHeadHash,
    beforeEntityRoot: saved.head.entityRoot, beforeReceiptRoot: saved.head.receiptRoot, operation: "SET_COMPOSITION_DURATION", change: { key: entityKey, beforeHash: before.hash, afterHash },
  }, entityRoot, "EDIT");
}
/** Undo/redo derives its exact immutable target from the persisted cursor. The
 * client supplies only current-state bindings; it cannot submit a snapshot. */
export function navigateStudioEditorialV2History(root: CreatorNativeRoot, snapshot: StudioSnapshot, input: unknown, key: string, actor: string) {
  const r = request(input, key, actor), v = r.value;
  exact(v, "operation,projectId,expectedRevision,expectedHeadDigest,compositionId,expectedCompositionRevision,requestedAt");
  if ((v.operation !== "UNDO_EDITORIAL_EDIT" && v.operation !== "REDO_EDITORIAL_EDIT") || v.projectId !== snapshot.project.projectId || typeof v.compositionId !== "string") invalid();
  integer(v.expectedRevision); integer(v.expectedCompositionRevision); hash(v.expectedHeadDigest);
  const saved = readHead(root, snapshot); if (replay(root, snapshot, saved, r.keyHash, r.requestDigest)) return summary(saved);
  if (saved.head.revision !== v.expectedRevision || sha(saved.bytes) !== v.expectedHeadDigest) conflict();
  if (String(v.requestedAt) < saved.head.at) invalid("History navigation cannot predate saved history.");
  if (saved.head.format !== "studio-editorial-head-v3") historyBoundary();
  const a = access(root, saved.head.projectId), beforeCursor = saved.head.history, undoing = v.operation === "UNDO_EDITORIAL_EDIT";
  let targetHash: string, target: ReturnType<typeof reversibleJournal>, nextCursor: HistoryCursor;
  if (undoing) {
    if (beforeCursor.undoTip === null) historyBoundary();
    targetHash = beforeCursor.undoTip; target = reversibleJournal(root, saved.head.projectId, targetHash);
    const parent = parseHead(a.io.read(target.previousHeadHash), saved.head.projectId);
    const redoRoot = a.io.stage({ format: "studio-editorial-redo-node-v1", projectId: saved.head.projectId, editHash: targetHash, next: beforeCursor.redoRoot } satisfies RedoNode);
    nextCursor = { ...beforeCursor, undoTip: historyOf(parent).undoTip, redoRoot };
  } else {
    if (beforeCursor.redoRoot === null) historyBoundary();
    const node = redoNode(a, saved.head.projectId, beforeCursor.redoRoot); targetHash = node.editHash; target = reversibleJournal(root, saved.head.projectId, targetHash);
    const parent = parseHead(a.io.read(target.previousHeadHash), saved.head.projectId);
    if (historyOf(parent).undoTip !== beforeCursor.undoTip) unavailable();
    nextCursor = { ...beforeCursor, undoTip: targetHash, redoRoot: node.next };
  }
  const compositionId = target.change.key.slice("composition:".length), expectedCurrentHash = undoing ? target.change.afterHash : target.change.beforeHash, restoredHash = undoing ? target.change.beforeHash : target.change.afterHash;
  const currentHash = a.entities.get(saved.head.entityRoot, target.change.key);
  if (compositionId !== v.compositionId || currentHash === null) conflict();
  const current = validateCompositionV2(entityAtHash(a, saved.head.projectId, "composition", compositionId, currentHash).value);
  const expectedCurrent = validateCompositionV2(entityAtHash(a, saved.head.projectId, "composition", compositionId, expectedCurrentHash).value);
  const restored = validateCompositionV2(entityAtHash(a, saved.head.projectId, "composition", compositionId, restoredHash).value);
  if (current.projectId !== saved.head.projectId || expectedCurrent.projectId !== saved.head.projectId || restored.projectId !== saved.head.projectId || current.compositionId !== compositionId || expectedCurrent.compositionId !== compositionId || restored.compositionId !== compositionId) unavailable();
  if (!sameCompositionContent(current, expectedCurrent)) conflict();
  if (current.revision !== v.expectedCompositionRevision) conflict();
  if (!Number.isSafeInteger(current.revision + 1)) unavailable();
  const next = validateCompositionV2({ ...restored, revision: current.revision + 1 });
  const nextHash = a.io.stage({ format: "studio-editorial-entity-v2", projectId: saved.head.projectId, kind: "composition", entityId: compositionId, value: next } satisfies Entity);
  const entityRoot = a.entities.set(saved.head.entityRoot, target.change.key, nextHash), previousHeadHash = a.io.stage(saved.head);
  return publish(root, snapshot, a, saved, saved.head.anchor, {
    revision: saved.head.revision + 1, at: String(v.requestedAt), actor, keyHash: r.keyHash, requestDigest: r.requestDigest, previousHeadHash,
    beforeEntityRoot: saved.head.entityRoot, beforeReceiptRoot: saved.head.receiptRoot, operation: v.operation, historyTargetHash: targetHash,
    change: { key: target.change.key, beforeHash: currentHash, afterHash: nextHash },
  }, entityRoot, nextCursor);
}
/** Explicit bounded history verification. Normal reads do not claim a full audit.
 * Cursor is a content hash, checked against the caller's fixed current-head digest.
 * To avoid accepting unrelated cursors this first API only audits from the current head;
 * a remaining cursor is reported for a future authorized continuation protocol. */
export function auditStudioEditorialV2History(root: CreatorNativeRoot, snapshot: StudioSnapshot, limit: number) {
  integer(limit); if (limit > 64) invalid("Audit at most 64 commits per explicit request.");
  const saved = readHead(root, snapshot), a = access(root, saved.head.projectId); let cursor: Head | null = saved.head, remainingHeadHash: string | null = null, checked = 0;
  while (cursor && checked < limit) {
    const j = validateHeadCommit(root, snapshot, cursor); checked++; remainingHeadHash = j.previousHeadHash;
    cursor = remainingHeadHash === null ? null : parseHead(a.io.read(remainingHeadHash), saved.head.projectId);
  }
  checkStable(root, snapshot, saved);
  return { ...summary(saved), checkedCommits: checked, complete: remainingHeadHash === null, remainingHeadHash, scope: "COMMIT_INDEX_TRANSITIONS_NOT_ALL_ENTITY_BYTES" as const };
}
