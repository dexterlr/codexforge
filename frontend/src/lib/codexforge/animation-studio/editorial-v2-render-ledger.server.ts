import "server-only";

import { randomBytes } from "node:crypto";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { hashJarvisChatCanonicalJson as digest, hashJarvisChatSha256 as sha, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { StudioId } from "./domain";
import { assertStudioId, resolveStudioPath } from "./workspace";
import { hasStudioAudioMix, STUDIO_RENDER_EXPORT_POLICY, STUDIO_RENDER_LIMITS, studioEditorialRenderSpecTiming, type StudioEditorialRenderSpec, type StudioRenderJob, type StudioRenderOutputRef, type StudioRenderProcessIdentity, type StudioRenderProgress } from "./editorial-v2-render-contract";
import { validateStudioAudioPcmReport } from "./editorial-v2-audio-mix";

const MAX_LEDGER_BYTES = 1_048_576, MAX_SPEC_BYTES = 1_048_576, HASH = /^[a-f0-9]{64}$/u;
const TERMINAL = new Set(["COMPLETED", "FAILED", "CANCELLED", "INTERRUPTED"]);
interface RenderReceipt { keyHash: string; requestDigest: string; jobId: StudioId<"job"> }
export interface StudioRenderLedger {
  format: "studio-editorial-render-ledger-v1"; projectId: StudioId<"project">; revision: number; updatedAt: string;
  jobs: StudioRenderJob[]; outputs: StudioRenderOutputRef[]; receipts: RenderReceipt[]; recordDigest: string;
}
export class StudioRenderLedgerError extends Error {
  constructor(readonly code: "RENDER_INVALID" | "RENDER_CONFLICT" | "RENDER_NOT_FOUND" | "RENDER_NOT_CANCELABLE" | "RENDER_STORAGE_UNAVAILABLE" | "RENDER_CAPACITY") {
    super(code); this.name = "StudioRenderLedgerError";
  }
}
const fail = (code: StudioRenderLedgerError["code"]): never => { throw new StudioRenderLedgerError(code); };
const time = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
const encode = (value: unknown, maximum: number) => { const bytes = Buffer.from(canonical(value), "utf8"); if (bytes.length < 1 || bytes.length > maximum) return fail("RENDER_CAPACITY"); return bytes; };
function decode(bytes: Buffer): unknown {
  try { const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes); assertCreatorJsonHasUniqueObjectKeys(text); const value = JSON.parse(text); if (canonical(value) !== text) return fail("RENDER_STORAGE_UNAVAILABLE"); return value; }
  catch (error) { if (error instanceof StudioRenderLedgerError) throw error; return fail("RENDER_STORAGE_UNAVAILABLE"); }
}
function prefix(projectId: StudioId<"project">): string[] { assertStudioId(projectId, "project"); return [...resolveStudioPath(projectId, "manifests").split("/"), "editorial-v2-render"]; }
export const studioRenderLedgerPath = (projectId: StudioId<"project">) => [...prefix(projectId), "head.json"];
export const studioEditorialV2HeadPath = (projectId: StudioId<"project">) => [...resolveStudioPath(projectId, "manifests").split("/"), "editorial-v2", "head.json"];
const specPath = (projectId: StudioId<"project">, specDigest: string) => { if (!HASH.test(specDigest)) return fail("RENDER_INVALID"); return [...prefix(projectId), "specs", specDigest + ".json"]; };
function withoutDigest(value: StudioRenderLedger): Omit<StudioRenderLedger, "recordDigest"> { const { recordDigest: omitted, ...body } = value; void omitted; return body; }
function validateJob(value: StudioRenderJob, projectId: StudioId<"project">): void {
  if (!value || value.format !== "studio-editorial-render-job-v1" || value.projectId !== projectId || !/^job_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(value.jobId) || !/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(value.compositionId) || !HASH.test(value.specDigest) || !HASH.test(value.sourceHeadDigest) || !Number.isSafeInteger(value.sourceRevision) || value.sourceRevision < 1 || !Number.isSafeInteger(value.compositionRevision) || value.compositionRevision < 1 || !/^asset_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(value.targetAssetId) || !Number.isSafeInteger(value.targetVersion) || value.targetVersion < 1 || !["QUEUED", "RUNNING", "COMPLETED", "FAILED", "CANCELLED", "INTERRUPTED"].includes(value.state) || !time(value.createdAt) || (value.startedAt !== null && !time(value.startedAt)) || (value.finishedAt !== null && !time(value.finishedAt))) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (!value.progress || !["QUEUED", "MATERIALIZING", "PROBING_INPUTS", "RENDERING", "VALIDATING", "PUBLISHING", "DONE"].includes(value.progress.phase) || !Number.isSafeInteger(value.progress.completed) || !Number.isSafeInteger(value.progress.total) || value.progress.completed < 0 || value.progress.total < 1 || value.progress.total > STUDIO_RENDER_EXPORT_POLICY.maximumFrames || value.progress.completed > value.progress.total || !Number.isInteger(value.progress.percent) || value.progress.percent < 0 || value.progress.percent > 100) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (value.process && (!Number.isSafeInteger(value.process.processId) || value.process.processId < 1 || typeof value.process.identity !== "string" || !value.process.identity.trim() || value.process.identity.length > 1024 || !time(value.process.recordedAt))) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (value.state === "QUEUED" && (value.startedAt !== null || value.finishedAt !== null || value.process !== null || value.output !== null || value.error !== null)) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (value.state === "RUNNING" && (value.startedAt === null || value.finishedAt !== null || value.process === null || value.output !== null || value.error !== null)) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (value.state === "COMPLETED" && (value.startedAt === null || value.finishedAt === null || value.output === null || value.error !== null || value.progress.phase !== "DONE" || value.progress.percent !== 100)) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (["FAILED", "INTERRUPTED"].includes(value.state) && (value.finishedAt === null || value.output !== null || value.error === null)) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (value.state === "CANCELLED" && (value.finishedAt === null || value.output !== null)) return fail("RENDER_STORAGE_UNAVAILABLE");
}
function validateOutput(value: StudioRenderOutputRef, projectId: StudioId<"project">): void {
  const fields = "assetId,audio,byteLength,contentHash,createdAt,headDigest,jobId,probeDigest,storageManifestDigest,version,video" + (value && Object.hasOwn(value, "audioMixValidation") ? ",audioMixValidation" : "");
  if (!value || Object.keys(value).sort().join() !== fields.split(",").sort().join() || !/^asset_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(value.assetId) || !/^job_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(value.jobId) || !Number.isSafeInteger(value.version) || value.version < 1 || !HASH.test(value.headDigest) || !HASH.test(value.contentHash) || !HASH.test(value.storageManifestDigest) || !HASH.test(value.probeDigest) || !Number.isSafeInteger(value.byteLength) || value.byteLength < 1 || value.byteLength > STUDIO_RENDER_LIMITS.outputBytes || !time(value.createdAt)) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (!value.video || Object.keys(value.video).sort().join() !== "codec,decodedFrames,frameRate,height,width".split(",").sort().join() || value.video.codec !== "h264" || value.video.width !== 1280 || value.video.height !== 720 || value.video.frameRate !== "25/1" || !Number.isSafeInteger(value.video.decodedFrames) || value.video.decodedFrames < 1 || value.video.decodedFrames > STUDIO_RENDER_EXPORT_POLICY.maximumFrames) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (!value.audio || Object.keys(value.audio).sort().join() !== "channels,codec,sampleRate".split(",").sort().join() || value.audio.codec !== "aac" || value.audio.sampleRate !== 48_000 || value.audio.channels !== 2) return fail("RENDER_STORAGE_UNAVAILABLE");
  if (Object.hasOwn(value, "audioMixValidation")) { try { validateStudioAudioPcmReport(value.audioMixValidation!, value.video.decodedFrames * 1_920); } catch { return fail("RENDER_STORAGE_UNAVAILABLE"); } }
  void projectId;
}
function validateLedger(value: unknown, projectId: StudioId<"project">): StudioRenderLedger {
  if (!value || typeof value !== "object" || Array.isArray(value)) return fail("RENDER_STORAGE_UNAVAILABLE");
  const ledger = value as StudioRenderLedger;
  if (Object.keys(ledger).sort().join() !== "format,jobs,outputs,projectId,receipts,recordDigest,revision,updatedAt".split(",").sort().join() || ledger.format !== "studio-editorial-render-ledger-v1" || ledger.projectId !== projectId || !Number.isSafeInteger(ledger.revision) || ledger.revision < 1 || !time(ledger.updatedAt) || !Array.isArray(ledger.jobs) || !Array.isArray(ledger.outputs) || !Array.isArray(ledger.receipts) || ledger.jobs.length > STUDIO_RENDER_LIMITS.jobs || ledger.outputs.length > STUDIO_RENDER_LIMITS.outputs || ledger.receipts.length > STUDIO_RENDER_LIMITS.receipts || !HASH.test(ledger.recordDigest) || digest(withoutDigest(ledger)) !== ledger.recordDigest) return fail("RENDER_STORAGE_UNAVAILABLE");
  const jobs = new Set<string>(), outputs = new Set<string>(), receipts = new Set<string>();
  for (const job of ledger.jobs) { validateJob(job, projectId); if (jobs.has(job.jobId)) return fail("RENDER_STORAGE_UNAVAILABLE"); jobs.add(job.jobId); }
  for (const output of ledger.outputs) {
    validateOutput(output, projectId);
    const outputKey = `${output.assetId}@${output.version}`;
    const owningJob = ledger.jobs.find(job => job.jobId === output.jobId);
    if (outputs.has(outputKey) || !jobs.has(output.jobId) || !owningJob?.output || digest(owningJob.output) !== digest(output) || output.headDigest !== owningJob.sourceHeadDigest || output.video.decodedFrames !== owningJob.progress.total) return fail("RENDER_STORAGE_UNAVAILABLE");
    outputs.add(outputKey);
  }
  for (const receipt of ledger.receipts) { if (!receipt || !HASH.test(receipt.keyHash) || !HASH.test(receipt.requestDigest) || !jobs.has(receipt.jobId) || receipts.has(receipt.keyHash)) return fail("RENDER_STORAGE_UNAVAILABLE"); receipts.add(receipt.keyHash); }
  return ledger;
}
function readOptional(root: CreatorNativeRoot, projectId: StudioId<"project">): { ledger: StudioRenderLedger | null; bytes: Buffer | null } {
  try { const bytes = root.readFile(studioRenderLedgerPath(projectId), MAX_LEDGER_BYTES); return { ledger: validateLedger(decode(bytes), projectId), bytes }; }
  catch (error) { if ((error as { code?: unknown })?.code === "not_found") return { ledger: null, bytes: null }; if (error instanceof StudioRenderLedgerError) throw error; return fail("RENDER_STORAGE_UNAVAILABLE"); }
}
function serializeLedger(body: Omit<StudioRenderLedger, "recordDigest">): { ledger: StudioRenderLedger; bytes: Buffer } {
  const ledger = { ...body, recordDigest: digest(body) } as StudioRenderLedger; validateLedger(ledger, ledger.projectId); return { ledger, bytes: encode(ledger, MAX_LEDGER_BYTES) };
}
function publishLedger(root: CreatorNativeRoot, saved: { bytes: Buffer | null }, next: { ledger: StudioRenderLedger; bytes: Buffer }, fence?: { path: readonly string[]; bytes: Buffer }): void {
  try {
    const temporary = `studio-render-${randomBytes(12).toString("hex")}.tmp`;
    if (saved.bytes === null) root.writeAtomicExclusive(studioRenderLedgerPath(next.ledger.projectId), temporary, next.bytes, fence?.path ?? null, fence?.bytes ?? null);
    else root.writeAtomicReplace(studioRenderLedgerPath(next.ledger.projectId), temporary, next.bytes, saved.bytes, fence?.path ?? null, fence?.bytes ?? null);
  } catch (error) { if ((error as { code?: unknown })?.code === "compare_mismatch" || (error as { code?: unknown })?.code === "already_exists") return fail("RENDER_CONFLICT"); return fail("RENDER_STORAGE_UNAVAILABLE"); }
  try { if (!root.readFile(studioRenderLedgerPath(next.ledger.projectId), MAX_LEDGER_BYTES).equals(next.bytes)) return fail("RENDER_STORAGE_UNAVAILABLE"); } catch { return fail("RENDER_STORAGE_UNAVAILABLE"); }
}
function mutate(root: CreatorNativeRoot, projectId: StudioId<"project">, at: string, update: (ledger: StudioRenderLedger) => void): StudioRenderLedger {
  if (!time(at)) return fail("RENDER_INVALID"); const saved = readOptional(root, projectId); if (!saved.ledger || !saved.bytes) return fail("RENDER_NOT_FOUND");
  const draft = structuredClone(saved.ledger); update(draft); const { recordDigest: omitted, ...body } = draft; void omitted;
  const next = serializeLedger({ ...body, revision: saved.ledger.revision + 1, updatedAt: at }); publishLedger(root, saved, next); return next.ledger;
}
function mutateExpected(root: CreatorNativeRoot, projectId: StudioId<"project">, expectedRevision: number, at: string, update: (ledger: StudioRenderLedger) => void): StudioRenderLedger {
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1 || !time(at)) return fail("RENDER_INVALID");
  const saved = readOptional(root, projectId); if (!saved.ledger || !saved.bytes) return fail("RENDER_NOT_FOUND");
  if (saved.ledger.revision !== expectedRevision) return fail("RENDER_CONFLICT");
  const draft = structuredClone(saved.ledger); update(draft); const { recordDigest: omitted, ...body } = draft; void omitted;
  const next = serializeLedger({ ...body, revision: expectedRevision + 1, updatedAt: at }); publishLedger(root, saved, next); return next.ledger;
}

export function inspectStudioRenderLedger(root: CreatorNativeRoot, projectId: StudioId<"project">): StudioRenderLedger | null { return structuredClone(readOptional(root, projectId).ledger); }
export function readStudioRenderSpec(root: CreatorNativeRoot, projectId: StudioId<"project">, specDigest: string): StudioEditorialRenderSpec {
  try { const bytes = root.readFile(specPath(projectId, specDigest), MAX_SPEC_BYTES); if (sha(bytes) !== specDigest) return fail("RENDER_STORAGE_UNAVAILABLE"); const value = decode(bytes) as StudioEditorialRenderSpec; if (!value || !["studio-editorial-render-spec-v1", "studio-editorial-render-spec-v2", "studio-editorial-render-spec-v3", "studio-editorial-render-spec-v4"].includes(value.format) || value.projectId !== projectId || digest(value) !== specDigest) return fail("RENDER_STORAGE_UNAVAILABLE"); studioEditorialRenderSpecTiming(value); return structuredClone(value); }
  catch (error) { if (error instanceof StudioRenderLedgerError) throw error; return fail("RENDER_STORAGE_UNAVAILABLE"); }
}

export function createStudioRenderJob(root: CreatorNativeRoot, input: { spec: StudioEditorialRenderSpec; specDigest: string; editorialHeadBytes: Buffer; request: object; key: string; actor: string; requestedAt: string }): { ledger: StudioRenderLedger; job: StudioRenderJob; replayed: boolean } {
  const { spec } = input; let expectedFrames: number;
  try { expectedFrames = studioEditorialRenderSpecTiming(spec).expectedFrames; } catch { return fail("RENDER_INVALID"); }
  if (!HASH.test(input.specDigest) || digest(spec) !== input.specDigest || !Buffer.isBuffer(input.editorialHeadBytes) || sha(input.editorialHeadBytes) !== spec.editorialHeadDigest || !/^[a-zA-Z0-9_-]{8,128}$/u.test(input.key) || !input.actor.trim() || input.actor.length > 160 || !time(input.requestedAt)) return fail("RENDER_INVALID");
  const requestDigest = digest({ format: "studio-editorial-render-request-v1", request: input.request, actor: input.actor }), keyHash = sha(input.key), saved = readOptional(root, spec.projectId);
  if (saved.ledger) {
    const receipt = saved.ledger.receipts.find(item => item.keyHash === keyHash);
    if (receipt) { if (receipt.requestDigest !== requestDigest) return fail("RENDER_CONFLICT"); const job = saved.ledger.jobs.find(item => item.jobId === receipt.jobId); if (!job) return fail("RENDER_STORAGE_UNAVAILABLE"); return { ledger: structuredClone(saved.ledger), job: structuredClone(job), replayed: true }; }
    if (saved.ledger.jobs.length >= STUDIO_RENDER_LIMITS.jobs || saved.ledger.receipts.length >= STUDIO_RENDER_LIMITS.receipts || saved.ledger.outputs.length >= STUDIO_RENDER_LIMITS.outputs) return fail("RENDER_CAPACITY");
    if (saved.ledger.jobs.some(job => !TERMINAL.has(job.state))) return fail("RENDER_CONFLICT");
  }
  const targetAssetId = `asset_render_${digest({ projectId: spec.projectId, compositionId: spec.compositionId, presetId: spec.preset.presetId }).slice(0, 24)}` as StudioId<"asset">;
  const targetVersion = Math.max(0, ...(saved.ledger?.outputs ?? []).filter(output => output.assetId === targetAssetId).map(output => output.version)) + 1;
  const jobId = `job_${digest({ keyHash, requestDigest }).slice(0, 24)}` as StudioId<"job">;
  const job: StudioRenderJob = { format: "studio-editorial-render-job-v1", jobId, projectId: spec.projectId, compositionId: spec.compositionId, state: "QUEUED", specDigest: input.specDigest, sourceHeadDigest: spec.editorialHeadDigest, sourceRevision: spec.editorialRevision, compositionRevision: spec.compositionRevision, targetAssetId, targetVersion, progress: { phase: "QUEUED", completed: 0, total: expectedFrames, percent: 0 }, createdAt: input.requestedAt, startedAt: null, finishedAt: null, process: null, error: null, output: null };
  const prior = saved.ledger, body: Omit<StudioRenderLedger, "recordDigest"> = { format: "studio-editorial-render-ledger-v1", projectId: spec.projectId, revision: (prior?.revision ?? 0) + 1, updatedAt: input.requestedAt, jobs: [...(prior?.jobs ?? []), job], outputs: [...(prior?.outputs ?? [])], receipts: [...(prior?.receipts ?? []), { keyHash, requestDigest, jobId }] };
  const next = serializeLedger(body), specBytes = encode(spec, MAX_SPEC_BYTES);
  try { root.ensureDirectory(prefix(spec.projectId)); root.ensureDirectory([...prefix(spec.projectId), "specs"]); }
  catch { return fail("RENDER_STORAGE_UNAVAILABLE"); }
  try { root.writeAtomicExclusive(specPath(spec.projectId, input.specDigest), `studio-render-spec-${randomBytes(12).toString("hex")}.tmp`, specBytes, studioEditorialV2HeadPath(spec.projectId), input.editorialHeadBytes); }
  catch (error) { if ((error as { code?: unknown })?.code !== "already_exists") return fail((error as { code?: unknown })?.code === "compare_mismatch" ? "RENDER_CONFLICT" : "RENDER_STORAGE_UNAVAILABLE"); try { if (!root.readFile(specPath(spec.projectId, input.specDigest), MAX_SPEC_BYTES).equals(specBytes)) return fail("RENDER_STORAGE_UNAVAILABLE"); } catch { return fail("RENDER_STORAGE_UNAVAILABLE"); } }
  publishLedger(root, saved, next, { path: studioEditorialV2HeadPath(spec.projectId), bytes: input.editorialHeadBytes });
  return { ledger: structuredClone(next.ledger), job: structuredClone(job), replayed: false };
}

export function startStudioRenderJob(root: CreatorNativeRoot, projectId: StudioId<"project">, jobId: StudioId<"job">, process: StudioRenderProcessIdentity, at: string): StudioRenderLedger {
  return mutate(root, projectId, at, ledger => { const job = ledger.jobs.find(item => item.jobId === jobId); if (!job || job.state !== "QUEUED") return fail("RENDER_CONFLICT"); job.state = "RUNNING"; job.startedAt = at; job.process = process; job.progress = { phase: "MATERIALIZING", completed: 0, total: job.progress.total, percent: 0 }; });
}
export function updateStudioRenderProcess(root: CreatorNativeRoot, projectId: StudioId<"project">, jobId: StudioId<"job">, process: StudioRenderProcessIdentity, phase: Exclude<StudioRenderProgress["phase"], "QUEUED" | "DONE">, at: string): StudioRenderLedger {
  return mutate(root, projectId, at, ledger => {
    const job = ledger.jobs.find(item => item.jobId === jobId);
    if (!job || job.state !== "RUNNING" || !process || !Number.isSafeInteger(process.processId) || process.processId < 1 || typeof process.identity !== "string" || !process.identity.trim() || process.identity.length > 1024 || !time(process.recordedAt) || !["MATERIALIZING", "PROBING_INPUTS", "RENDERING", "VALIDATING", "PUBLISHING"].includes(phase)) return fail("RENDER_CONFLICT");
    job.process = structuredClone(process); job.progress = { ...job.progress, phase };
  });
}
export function progressStudioRenderJob(root: CreatorNativeRoot, projectId: StudioId<"project">, jobId: StudioId<"job">, progress: StudioRenderProgress, at: string): StudioRenderLedger {
  return mutate(root, projectId, at, ledger => { const job = ledger.jobs.find(item => item.jobId === jobId); if (!job || job.state !== "RUNNING" || !Number.isSafeInteger(progress.completed) || progress.completed < job.progress.completed || progress.completed >= job.progress.total || progress.total !== job.progress.total || !Number.isInteger(progress.percent) || progress.percent < job.progress.percent || progress.percent > 99 || !["MATERIALIZING", "PROBING_INPUTS", "RENDERING", "VALIDATING", "PUBLISHING"].includes(progress.phase)) return fail("RENDER_CONFLICT"); job.progress = structuredClone(progress); });
}
export function completeStudioRenderJob(root: CreatorNativeRoot, projectId: StudioId<"project">, jobId: StudioId<"job">, output: StudioRenderOutputRef, at: string): StudioRenderLedger {
  validateOutput(output, projectId);
  const selected = inspectStudioRenderLedger(root, projectId)?.jobs.find(item => item.jobId === jobId);
  if (!selected || (hasStudioAudioMix(readStudioRenderSpec(root, projectId, selected.specDigest)) && !output.audioMixValidation)) return fail("RENDER_CONFLICT");
  return mutate(root, projectId, at, ledger => { const job = ledger.jobs.find(item => item.jobId === jobId); if (!job || job.state !== "RUNNING" || output.jobId !== jobId || output.assetId !== job.targetAssetId || output.version !== job.targetVersion || output.headDigest !== job.sourceHeadDigest || output.video.decodedFrames !== job.progress.total || ledger.outputs.some(item => item.assetId === output.assetId && item.version === output.version)) return fail("RENDER_CONFLICT"); job.state = "COMPLETED"; job.finishedAt = at; job.output = structuredClone(output); job.progress = { phase: "DONE", completed: job.progress.total, total: job.progress.total, percent: 100 }; ledger.outputs.push(structuredClone(output)); });
}
export function terminateStudioRenderJob(root: CreatorNativeRoot, projectId: StudioId<"project">, jobId: StudioId<"job">, state: "FAILED" | "CANCELLED" | "INTERRUPTED", at: string, error: { code: string; message: string } | null): StudioRenderLedger {
  return mutate(root, projectId, at, ledger => { const job = ledger.jobs.find(item => item.jobId === jobId); if (!job || TERMINAL.has(job.state) || (state !== "CANCELLED" && (!error || !error.code || !error.message)) || (error && (error.code.length > 120 || error.message.length > 2_000))) return fail(state === "CANCELLED" ? "RENDER_NOT_CANCELABLE" : "RENDER_CONFLICT"); job.state = state; job.finishedAt = at; job.error = error ? { ...error } : null; job.output = null; });
}
export function cancelStudioRenderJob(root: CreatorNativeRoot, input: { projectId: StudioId<"project">; jobId: StudioId<"job">; expectedLedgerRevision: number; request: object; key: string; actor: string; at: string }): { ledger: StudioRenderLedger; replayed: boolean } {
  if (!/^[a-zA-Z0-9_-]{8,128}$/u.test(input.key) || !input.actor.trim() || input.actor.length > 160) return fail("RENDER_INVALID");
  const requestDigest = digest({ format: "studio-editorial-render-request-v1", request: input.request, actor: input.actor }), keyHash = sha(input.key), saved = readOptional(root, input.projectId);
  if (!saved.ledger) return fail("RENDER_NOT_FOUND");
  const receipt = saved.ledger.receipts.find(item => item.keyHash === keyHash);
  if (receipt) {
    if (receipt.requestDigest !== requestDigest || receipt.jobId !== input.jobId) return fail("RENDER_CONFLICT");
    return { ledger: structuredClone(saved.ledger), replayed: true };
  }
  if (saved.ledger.receipts.length >= STUDIO_RENDER_LIMITS.receipts) return fail("RENDER_CAPACITY");
  const ledger = mutateExpected(root, input.projectId, input.expectedLedgerRevision, input.at, value => {
    const job = value.jobs.find(item => item.jobId === input.jobId);
    if (!job || TERMINAL.has(job.state)) return fail("RENDER_NOT_CANCELABLE");
    job.state = "CANCELLED"; job.finishedAt = input.at; job.error = null; job.output = null;
    value.receipts.push({ keyHash, requestDigest, jobId: input.jobId });
  });
  return { ledger, replayed: false };
}
