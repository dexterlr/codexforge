import "server-only";
import { randomBytes } from "node:crypto";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { hashJarvisChatCanonicalJson as digest, hashJarvisChatSha256 as sha, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { JsonObject, ProductionEvent, StudioId } from "./domain";
import type { StudioResult, StudioSnapshot } from "./store.server";
import { blenderFail } from "./blender-source-contract";
import { resolveStudioPath } from "./workspace";

export type BlenderJournalRecords = Map<string, Buffer>;
const LIMIT = 1_048_576;
const FORMAT = "studio-blender-event-reference-v1";
const RESULT = "studio-blender-result-reference-v1";
const recordPath = (projectId: StudioId<"project">, hash: string) => [...resolveStudioPath(projectId, "blender").split("/"), "records", hash + ".json"];
export const blenderArchivePath = (projectId: StudioId<"project">, hash: string) => [...resolveStudioPath(projectId, "blender").split("/"), "record-archives", hash + ".json"];
const object = (value: unknown): JsonObject | null => value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : null;
const same = (a: unknown, b: unknown) => canonical(a) === canonical(b);
const hash = (value: unknown): value is string => typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);

/** Full immutable event bodies retain exact old receipt payloads and original audit hashes. */
export function compactBlenderEvent(event: ProductionEvent): { event: ProductionEvent; record: Buffer } {
  const { eventHash, ...body } = event;
  if (event.details.blenderOperation !== true || !object(event.details.request) || typeof object(event.details.request)!.type !== "string" || object(event.details.journal) || digest(body) !== eventHash) return blenderFail("BLENDER_JOURNAL_INVALID");
  const result = object(event.details.result);
  if (!result || !["APPLIED", "BLOCKED"].includes(String(result.status)) || typeof result.code !== "string" || result.revision !== event.sequence) return blenderFail("BLENDER_JOURNAL_INVALID");
  const value = object(result.value), job = object(value?.job) ?? (typeof value?.jobId === "string" ? value : null), checkpoint = object(job?.checkpoint), execution = object(checkpoint?.blenderExecution) ?? object(checkpoint?.blenderEdit), spec = object(execution?.spec) ?? object(execution?.proposal);
  const compactResult: StudioResult = {
    status: result.status as StudioResult["status"], code: result.code, revision: event.sequence,
    value: { format: RESULT, eventHash, subjectId: event.subjectId, source: spec?.source ?? null, specDigest: execution?.specDigest ?? execution?.proposalDigest ?? null, phase: execution?.phase ?? null, outputs: job?.outputs ?? [] },
  };
  const record = Buffer.from(canonical(body));
  if (record.length > LIMIT) return blenderFail("BLENDER_JOURNAL_CAPACITY");
  return { record, event: { ...event, details: { blenderOperation: true, request: { type: object(event.details.request)!.type }, result: compactResult as unknown as JsonObject, journal: { format: FORMAT, sha256: eventHash, byteLength: record.length } } } };
}

function originalEvent(root: CreatorNativeRoot, projectId: StudioId<"project">, eventHash: string, pending?: BlenderJournalRecords): ProductionEvent {
  if (!hash(eventHash)) return blenderFail("BLENDER_JOURNAL_INVALID");
  const bytes = pending?.get(eventHash) ?? root.readFile(recordPath(projectId, eventHash), LIMIT);
  let body: Omit<ProductionEvent, "eventHash">;
  try { body = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as typeof body; }
  catch { return blenderFail("BLENDER_JOURNAL_INVALID"); }
  if (sha(bytes) !== eventHash || canonical(body) !== bytes.toString("utf8") || body.projectId !== projectId || Object.hasOwn(body, "eventHash") || object(body.details)?.blenderOperation !== true || object(object(body.details)?.journal)) return blenderFail("BLENDER_JOURNAL_INVALID");
  return { ...body, eventHash };
}

export function resolveBlenderJournalEvent(root: CreatorNativeRoot, projectId: StudioId<"project">, event: ProductionEvent, pending?: BlenderJournalRecords): ProductionEvent {
  if (!object(event.details.journal)) return event;
  const original = originalEvent(root, projectId, event.eventHash, pending), compact = compactBlenderEvent(original);
  if (!same(compact.event, event)) return blenderFail("BLENDER_JOURNAL_INVALID");
  return original;
}

export function resolveBlenderJournalResult(root: CreatorNativeRoot, projectId: StudioId<"project">, result: StudioResult, pending?: BlenderJournalRecords): StudioResult {
  const value = object(result.value);
  if (value?.format !== RESULT) return result;
  if (!hash(value.eventHash)) return blenderFail("BLENDER_JOURNAL_INVALID");
  const event = originalEvent(root, projectId, value.eventHash, pending), compact = compactBlenderEvent(event);
  if (!same(compact.event.details.result, result)) return blenderFail("BLENDER_JOURNAL_INVALID");
  return event.details.result as unknown as StudioResult;
}

export function writeBlenderJournalRecords(root: CreatorNativeRoot, projectId: StudioId<"project">, records: BlenderJournalRecords): void {
  for (const [hash, bytes] of records) {
    if (sha(bytes) !== hash || bytes.length > LIMIT) return blenderFail("BLENDER_JOURNAL_INVALID");
    const destination = recordPath(projectId, hash);
    try { root.writeAtomicExclusive(destination, `blender-record-${randomBytes(12).toString("hex")}.tmp`, bytes); }
    catch (error) { if ((error as { code?: string }).code !== "already_exists" || !root.readFile(destination, LIMIT).equals(bytes)) throw error; }
  }
}

/** Used only to compare old editorial anchors with the lossless compact representation. */
export function blenderHistoryForComparison(root: CreatorNativeRoot, snapshot: StudioSnapshot) {
  return { events: snapshot.events.map(event => resolveBlenderJournalEvent(root, snapshot.project.projectId, event)), receipts: snapshot.receipts.map(receipt => ({ ...receipt, result: resolveBlenderJournalResult(root, snapshot.project.projectId, receipt.result) })) };
}
