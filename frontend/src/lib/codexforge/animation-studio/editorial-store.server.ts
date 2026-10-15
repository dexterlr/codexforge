import "server-only";
import { randomBytes } from "node:crypto";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { hashJarvisChatCanonicalJson as digest, hashJarvisChatSha256 as sha, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { StudioSnapshot } from "./store.server";
import type { StudioId } from "./domain";
import { cloneStudioJson } from "./validation";
import { resolveStudioPath } from "./workspace";
import { makeEmptyEditorial, validateEditorialContent, type EditorialContent } from "./composition-contract";

const LIMIT = 1_048_576, HISTORY_LIMIT = 256;
const HASH = /^[a-f0-9]{64}$/u;
type Event = { revision: number; at: string; actor: string; keyHash: string; requestDigest: string; projectRecordDigest: string; contentDigest: string; previousHash: string | null; eventHash: string; providerRequests: 0; generationAllowed: false; normalization: "SERVER_OWNED_VERSIONS_AND_TIMESTAMPS" };
type Receipt = { keyHash: string; requestDigest: string; revision: number };
interface RecordState { format: "studio-editorial-record-v1"; projectId: StudioId<"project">; revision: number; content: EditorialContent; events: Event[]; receipts: Receipt[]; previousRecordDigest: string | null; recordDigest: string }
export interface EditorialView { revision: number; persisted: boolean; content: EditorialContent }
export interface EditorialSaveInput { projectId: StudioId<"project">; expectedRevision: number; expectedProjectRevision: number; requestedAt: string; content: EditorialContent }
export class EditorialStoreError extends Error {
  constructor(readonly code: "EDITORIAL_CONFLICT" | "EDITORIAL_INVALID" | "EDITORIAL_UNAVAILABLE", message: string) { super(message); this.name = "EditorialStoreError"; }
}
const invalid = (message = "The editorial request is invalid."): never => { throw new EditorialStoreError("EDITORIAL_INVALID", message); };
const unavailable = (): never => { throw new EditorialStoreError("EDITORIAL_UNAVAILABLE", "Editorial storage is unavailable or failed integrity checks. Keep the exact request for explicit recovery."); };
const conflict = (): never => { throw new EditorialStoreError("EDITORIAL_CONFLICT", "Saved editorial or project state changed. Reload before making a new edit."); };
function exact(value: unknown, keys: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== keys.split(",").sort().join()) invalid();
}
function time(value: unknown): asserts value is string { if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) invalid(); }
function parse(bytes: Buffer): unknown {
  const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
  assertCreatorJsonHasUniqueObjectKeys(text); const value = cloneStudioJson(JSON.parse(text));
  if (canonical(value) !== text) unavailable(); return value;
}
function without<T extends object>(value: T, ...keys: string[]): object { return Object.fromEntries(Object.entries(value).filter(([key]) => !keys.includes(key))); }
function context(snapshot: StudioSnapshot) { return { projectId: snapshot.project.projectId, shots: snapshot.shots, assets: snapshot.assets }; }
function headPath(projectId: StudioId<"project">): string[] { return resolveStudioPath(projectId, "manifests", "editorial-head.json").split("/"); }
function recordPath(projectId: StudioId<"project">, recordDigest: string): string[] { if (!HASH.test(recordDigest)) return unavailable(); return [...resolveStudioPath(projectId, "manifests").split("/"), "editorial", `${recordDigest}.json`]; }
function initial(snapshot: StudioSnapshot): EditorialContent {
  const value = makeEmptyEditorial(snapshot.project.projectId);
  value.compositions = snapshot.shots.map(shot => ({ schemaVersion: 1, compositionId: `composition_${digest({ shotId: shot.shotId }).slice(0, 24)}`, projectId: snapshot.project.projectId, kind: "SHOT", shotId: shot.shotId, name: "Shot composition", durationUs: Math.round(shot.duration * 1_000_000), width: 1280, height: 720, layers: [], revision: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } }));
  return validateEditorialContent(value, context(snapshot));
}
type ReadState = { head: Buffer | null; record: RecordState | null; firstRecord: { digest: string; bytes: Buffer } | null };
function missingHead(root: CreatorNativeRoot, snapshot: StudioSnapshot, recoverFirst: boolean): ReadState {
  const directory = [...resolveStudioPath(snapshot.project.projectId, "manifests").split("/"), "editorial"];
  let names: string[];
  try { names = root.listDirectory(directory); }
  catch (error) { if ((error as { code?: string }).code === "not_found") return { head: null, record: null, firstRecord: null }; return unavailable(); }
  // Existing evidence (even an empty directory) is not proof of a never-saved workspace.
  // Reads fail closed. Only an explicit exact original first-save request can repair one record.
  if (!recoverFirst || names.length !== 1 || !/^[a-f0-9]{64}\.json$/u.test(names[0])) return unavailable();
  try {
    const recordDigest = names[0].slice(0, -5), bytes = root.readFile([...directory, names[0]], LIMIT), raw = parse(bytes);
    exact(raw, "format,projectId,revision,content,events,receipts,previousRecordDigest,recordDigest");
    if (raw.format !== "studio-editorial-record-v1" || raw.projectId !== snapshot.project.projectId || raw.revision !== 1 || raw.previousRecordDigest !== null || raw.recordDigest !== recordDigest || digest(without(raw, "recordDigest")) !== recordDigest) return unavailable();
    // The entire bounded canonical record is compared with the freshly validated original
    // request below, including events, receipt, actor, project fence, timestamps and content.
    return { head: null, record: null, firstRecord: { digest: recordDigest, bytes } };
  } catch { return unavailable(); }
}
function read(root: CreatorNativeRoot, snapshot: StudioSnapshot, recoverFirst = false): ReadState {
  let head: Buffer;
  try { head = root.readFile(headPath(snapshot.project.projectId), 4096); }
  catch (error) { if ((error as { code?: string }).code === "not_found") return missingHead(root, snapshot, recoverFirst); return unavailable(); }
  try {
    const pointer = parse(head); exact(pointer, "format,projectId,revision,recordDigest");
    if (pointer.format !== "studio-editorial-head-v1" || pointer.projectId !== snapshot.project.projectId || typeof pointer.recordDigest !== "string" || !HASH.test(pointer.recordDigest)) unavailable();
    const raw = parse(root.readFile(recordPath(snapshot.project.projectId, pointer.recordDigest as string), LIMIT));
    exact(raw, "format,projectId,revision,content,events,receipts,previousRecordDigest,recordDigest");
    const record = raw as unknown as RecordState;
    if (record.format !== "studio-editorial-record-v1" || record.projectId !== snapshot.project.projectId || record.revision !== pointer.revision || !Number.isSafeInteger(record.revision) || record.revision < 1 || record.revision > HISTORY_LIMIT || record.recordDigest !== pointer.recordDigest || digest(without(record, "recordDigest")) !== record.recordDigest) unavailable();
    record.content = validateEditorialContent(record.content, context(snapshot));
    if (!Array.isArray(record.events) || !Array.isArray(record.receipts) || record.events.length !== record.revision || record.receipts.length !== record.revision) unavailable();
    let previous: string | null = null; const keys = new Set<string>();
    for (let i = 0; i < record.events.length; i++) {
      const event = record.events[i], receipt = record.receipts[i];
      exact(event, "revision,at,actor,keyHash,requestDigest,projectRecordDigest,contentDigest,previousHash,eventHash,providerRequests,generationAllowed,normalization");
      exact(receipt, "keyHash,requestDigest,revision"); time(event.at);
      if (event.revision !== i + 1 || event.previousHash !== previous || typeof event.actor !== "string" || !event.actor.trim() || event.actor.length > 160 || event.providerRequests !== 0 || event.generationAllowed !== false || event.normalization !== "SERVER_OWNED_VERSIONS_AND_TIMESTAMPS" || ![event.keyHash, event.requestDigest, event.projectRecordDigest, event.contentDigest, event.eventHash].every(value => typeof value === "string" && HASH.test(value)) || digest(without(event, "eventHash")) !== event.eventHash || keys.has(event.keyHash) || receipt.keyHash !== event.keyHash || receipt.requestDigest !== event.requestDigest || receipt.revision !== event.revision || (i > 0 && event.at < record.events[i - 1].at)) unavailable();
      previous = event.eventHash; keys.add(event.keyHash);
    }
    if (record.events.at(-1)!.contentDigest !== digest(record.content) || (record.revision === 1 ? record.previousRecordDigest !== null : typeof record.previousRecordDigest !== "string" || !HASH.test(record.previousRecordDigest))) unavailable();
    // Iterative, history-bounded verification includes retained instruction versions, not merely their existence.
    let expectedPrevious = record.previousRecordDigest;
    for (let revision = record.revision - 1; revision >= 1; revision--) {
      if (expectedPrevious === null) unavailable();
      const priorValue = parse(root.readFile(recordPath(record.projectId, expectedPrevious!), LIMIT));
      exact(priorValue, "format,projectId,revision,content,events,receipts,previousRecordDigest,recordDigest");
      const prior = priorValue as unknown as RecordState;
      if (prior.format !== record.format || prior.projectId !== record.projectId || prior.revision !== revision || prior.recordDigest !== expectedPrevious || digest(without(prior, "recordDigest")) !== expectedPrevious || canonical(prior.events) !== canonical(record.events.slice(0, revision)) || canonical(prior.receipts) !== canonical(record.receipts.slice(0, revision)) || digest(validateEditorialContent(prior.content, context(snapshot))) !== prior.events.at(-1)!.contentDigest) unavailable();
      if (revision === 1 ? prior.previousRecordDigest !== null : typeof prior.previousRecordDigest !== "string" || !HASH.test(prior.previousRecordDigest)) unavailable();
      expectedPrevious = prior.previousRecordDigest;
    }
    return { head, record, firstRecord: null };
  } catch { return unavailable(); }
}
export function readStudioEditorial(root: CreatorNativeRoot, snapshot: StudioSnapshot): EditorialView {
  const { record } = read(root, snapshot);
  return { revision: record?.revision ?? 0, persisted: record !== null, content: record?.content ?? initial(snapshot) };
}
function normalize(next: EditorialContent, previous: EditorialContent, now: string): EditorialContent {
  for (const old of previous.takes) if (!next.takes.some(take => take.takeId === old.takeId)) invalid("Existing Takes must be retained; selection is only a preference.");
  for (const take of next.takes) {
    const old = previous.takes.find(item => item.takeId === take.takeId);
    if (old && (canonical(old.source) !== canonical(take.source) || old.shotId !== take.shotId || old.projectId !== take.projectId)) invalid("A Take cannot replace its immutable source identity.");
    take.createdAt = old?.createdAt ?? now;
    if (take.review.state === "UNREVIEWED") take.review = { state: "UNREVIEWED", note: "", reviewedAt: null };
    else take.review.reviewedAt = old && canonical(without(take.review, "reviewedAt")) === canonical(without(old.review, "reviewedAt")) ? old.review.reviewedAt : now;
  }
  const oldLayers = new Map(previous.compositions.flatMap(c => c.layers).map(layer => [layer.layerId, layer]));
  for (const old of previous.compositions) if (!next.compositions.some(c => c.compositionId === old.compositionId)) invalid("Existing compositions must be retained.");
  for (const c of next.compositions) {
    const old = previous.compositions.find(item => item.compositionId === c.compositionId);
    if (old && (old.shotId !== c.shotId || old.kind !== c.kind)) invalid("Composition ownership is immutable.");
    for (const l of c.layers) {
      const prior = oldLayers.get(l.layerId);
      if (prior && prior.compositionId !== l.compositionId) invalid("Moving a layer between compositions requires a future explicit operation.");
      const changed = !prior || canonical(without(l, "version", "createdAt", "updatedAt")) !== canonical(without(prior, "version", "createdAt", "updatedAt"));
      if (prior?.locked && (canonical(without(l, "locked", "version", "createdAt", "updatedAt")) !== canonical(without(prior, "locked", "version", "createdAt", "updatedAt")) || old!.layers.findIndex(item => item.layerId === l.layerId) !== c.layers.indexOf(l))) invalid("Unlock a layer in a separate save before editing or reordering it.");
      l.version = prior ? prior.version + (changed ? 1 : 0) : 1; l.createdAt = prior?.createdAt ?? now; l.updatedAt = changed ? now : prior!.updatedAt;
    }
    if (old?.layers.some(l => l.locked && !c.layers.some(item => item.layerId === l.layerId))) invalid("Locked layers cannot be removed.");
    c.revision = old ? old.revision + (canonical(without(c, "revision")) === canonical(without(old, "revision")) ? 0 : 1) : 1;
  }
  return next;
}
export function saveStudioEditorial(root: CreatorNativeRoot, snapshot: StudioSnapshot, input: unknown, key: string, actor: string): EditorialView {
  const value = cloneStudioJson(input); exact(value, "projectId,expectedRevision,expectedProjectRevision,requestedAt,content"); time(value.requestedAt);
  if (value.projectId !== snapshot.project.projectId || !Number.isSafeInteger(value.expectedRevision) || Number(value.expectedRevision) < 0 || !Number.isSafeInteger(value.expectedProjectRevision) || Number(value.expectedProjectRevision) < 1 || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key) || !actor.trim() || actor.length > 160) invalid();
  const clean = validateEditorialContent(value.content, context(snapshot)), { head, record, firstRecord } = read(root, snapshot, true), keyHash = sha(key), requestDigest = digest({ input: value, actor });
  const receipt = record?.receipts.find(item => item.keyHash === keyHash);
  if (receipt) { if (receipt.requestDigest !== requestDigest) return conflict(); return { revision: record!.revision, persisted: true, content: record!.content }; }
  if (firstRecord && (value.expectedRevision !== 0 || value.expectedProjectRevision !== snapshot.project.revision)) return unavailable();
  if (value.expectedRevision !== (record?.revision ?? 0) || value.expectedProjectRevision !== snapshot.project.revision) return conflict();
  if ((record?.revision ?? 0) >= HISTORY_LIMIT) invalid("This bounded editorial history is full; no history is discarded automatically.");
  if (value.requestedAt < (record?.events.at(-1)?.at ?? snapshot.project.createdAt)) invalid("Editorial modification cannot predate saved history.");
  const content = validateEditorialContent(normalize(clean, record?.content ?? initial(snapshot), value.requestedAt), context(snapshot)), revision = (record?.revision ?? 0) + 1;
  const body = { revision, at: value.requestedAt, actor, keyHash, requestDigest, projectRecordDigest: snapshot.recordDigest, contentDigest: digest(content), previousHash: record?.events.at(-1)?.eventHash ?? null, providerRequests: 0 as const, generationAllowed: false as const, normalization: "SERVER_OWNED_VERSIONS_AND_TIMESTAMPS" as const };
  const result: RecordState = { format: "studio-editorial-record-v1", projectId: snapshot.project.projectId, revision, content, events: [...record?.events ?? [], { ...body, eventHash: digest(body) }], receipts: [...record?.receipts ?? [], { keyHash, requestDigest, revision }], previousRecordDigest: record?.recordDigest ?? null, recordDigest: "" };
  result.recordDigest = digest(without(result, "recordDigest"));
  const bytes = Buffer.from(canonical(result), "utf8"); if (bytes.length > LIMIT) invalid("Editorial history exceeds the 1 MiB atomic record bound.");
  try { parse(bytes); } catch { invalid("Editorial history exceeds the existing bounded JSON representation."); }
  if (firstRecord && (firstRecord.digest !== result.recordDigest || !firstRecord.bytes.equals(bytes))) return unavailable();
  const versionPath = recordPath(result.projectId, result.recordDigest), pointer = Buffer.from(canonical({ format: "studio-editorial-head-v1", projectId: result.projectId, revision, recordDigest: result.recordDigest }), "utf8");
  const projectPath = resolveStudioPath(result.projectId, "manifests", "project.json").split("/"), projectBytes = Buffer.from(canonical(snapshot), "utf8");
  try {
    // Instructions are immutable records; no media is copied or rewritten. Failed CAS leaves retained evidence.
    if (!firstRecord) {
      try { root.writeAtomicExclusive(versionPath, `editorial-${randomBytes(12).toString("hex")}.tmp`, bytes, projectPath, projectBytes); }
      catch (error) { if ((error as { code?: string }).code !== "already_exists" || !root.readFile(versionPath, LIMIT).equals(bytes)) throw error; }
    } else if (!root.readFile(versionPath, LIMIT).equals(bytes)) return unavailable();
    if (head === null) root.writeAtomicExclusive(headPath(result.projectId), `editorial-${randomBytes(12).toString("hex")}.tmp`, pointer, projectPath, projectBytes);
    else root.writeAtomicReplace(headPath(result.projectId), `editorial-${randomBytes(12).toString("hex")}.tmp`, pointer, head, projectPath, projectBytes);
  } catch { return unavailable(); }
  return { revision, persisted: true, content };
}
