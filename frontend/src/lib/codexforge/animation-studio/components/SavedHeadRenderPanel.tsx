"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CompositionPanel.module.css";

const ENDPOINT = "/api/codexforge/animation-studio/editorial-v2/render";
const OUTPUT_ENDPOINT = "/api/codexforge/animation-studio/editorial-v2/render/output";
const PRESET_ID = "TRAILER_720P25_H264_AAC_V1" as const;
const HEADERS = { "X-CodexForge-Animation-Studio": "local-operator-v1" };
const HASH = /^[a-f0-9]{64}$/u;
const SAFE_ID = /^[a-z0-9][a-z0-9_-]{0,128}$/u;
const MAX_REQUEST = 32_768, MAX_RESPONSE = 524_288, POLL_MS = 1_500;
const automaticPollLimit = (frames: number) => Math.ceil(Math.min(45 * 60_000, Math.max(10 * 60_000, (frames / 25) * 6_000 + 5 * 60_000)) / POLL_MS);

type SavedHead = { headDigest: string; workingCopyRevision: number; compositionRevision: number };
type Rational = { numerator: number; denominator: number };
type ReadinessBlocker = { code: string; layerId: string | null; property: string | null; message: string };
type AudioMixValidation = { format: "studio-audio-unclamped-pcm-check-v1"; frames: number; bytes: number; channels: 2; sampleRate: 48000; peakAbsolute: number; rms: number; nonzeroSamples: number };
type RenderOutput = { assetId: string; version: number; jobId: string; headDigest: string; contentHash: string; byteLength: number; createdAt: string; video: { codec: "h264"; width: 1280; height: 720; frameRate: "25/1"; decodedFrames: number }; audio: { codec: "aac"; sampleRate: 48000; channels: 2 }; audioMixValidation?: AudioMixValidation; playbackUrl: string; downloadUrl: string };
type RenderState = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED" | "INTERRUPTED";
type RenderJob = {
  jobId: string; state: RenderState; specDigest: string; sourceHeadDigest: string; sourceRevision: number; compositionRevision: number; targetVersion: number;
  progress: { phase: string; completed: number; total: number; percent: number }; createdAt: string; startedAt: string | null; finishedAt: string | null;
  error: { code: string; message: string } | null; output: RenderOutput | null;
};
type RenderResult = {
  projectId: string; compositionId: string; current: { headDigest: string; revision: number; compositionRevision: number };
  preset: { presetId: typeof PRESET_ID; width: 1280; height: 720; frameRate: { numerator: 25; denominator: 1 }; duration: Rational | null; expectedFrames: number | null; videoCodec: "libx264"; audioCodec: "aac"; sampleRate: 48000; expectedAudioSamples: number | null; channels: 2; qualifiedDurationRange: { minimum: Rational; maximum: Rational } };
  readiness: { state: "READY" | "BLOCKED"; blockers: ReadinessBlocker[]; timing: { duration: Rational | null; frameRate: { numerator: 25; denominator: 1 }; expectedFrames: number | null; sampleRate: 48000; expectedAudioSamples: number | null; qualifiedMinimumDuration: Rational; qualifiedMaximumDuration: Rational } }; ledgerRevision: number; jobs: RenderJob[]; outputs: RenderOutput[]; providerRequests: 0; generationRequests: 0;
};
type StartBody = { operation: "START_RENDER"; projectId: string; compositionId: string; expectedHeadDigest: string; expectedRevision: number; expectedCompositionRevision: number; presetId: typeof PRESET_ID; requestedAt: string };
type CancelBody = { operation: "CANCEL_RENDER"; projectId: string; compositionId: string; jobId: string; expectedLedgerRevision: number; requestedAt: string };
type Pending = { projectId: string; key: string; body: string };
type Props = {
  projectId: string; compositionId: string; savedHead: SavedHead | null; startBlocked: boolean; startBlockedReason: string; onBlockingRecoveryChange: (blocked: boolean) => void;
  reviewActive?: boolean;
  onActivityChange?: (active: boolean) => void;
  hasUnsavedDraft?: boolean;
  onReviewRequested?: () => void;
  renderLayout?: (surfaces: { exportControls: ReactNode; outputReview: ReactNode; feedback: ReactNode }) => ReactNode;
};

const pendingKey = (projectId: string) => `codexforge.studio.render.pending.v1.${projectId}`;
function exact(value: unknown, keys: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== keys.split(",").sort().join()) throw Error("The local render service returned an unsupported shape.");
}
function integer(value: unknown, min = 0): asserts value is number { if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < min) throw Error("The local render service returned an invalid whole number."); }
function safeId(value: unknown): asserts value is string { if (typeof value !== "string" || !SAFE_ID.test(value)) throw Error("The local render service returned an invalid identity."); }
function digest(value: unknown): asserts value is string { if (typeof value !== "string" || !HASH.test(value)) throw Error("The local render service returned an invalid digest."); }
function timestamp(value: unknown): asserts value is string { if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) throw Error("The local render service returned an invalid timestamp."); }
function optionalTimestamp(value: unknown): asserts value is string | null { if (value !== null) timestamp(value); }
function boundedCopy(value: unknown, label: string, max: number): asserts value is string { if (typeof value !== "string" || !value.trim() || value.length > max || /[\u0000-\u001f\u007f]/u.test(value)) throw Error(`The local render service returned invalid ${label}.`); }
function rational(value: unknown, allowNull = false): Rational | null {
  if (value === null && allowNull) return null;
  exact(value, "numerator,denominator"); integer(value.numerator); integer(value.denominator, 1);
  if (value.denominator === 0 || value.numerator !== 0 && greatestCommonDivisor(value.numerator, value.denominator) !== 1) throw Error("The local render service returned a noncanonical exact time.");
  return value as unknown as Rational;
}
function greatestCommonDivisor(left: number, right: number): number { let a = left, b = right; while (b) { const next = a % b; a = b; b = next; } return a; }
function localOutputUrl(value: unknown, projectId: string, output: Pick<RenderOutput, "assetId" | "version" | "contentHash">, disposition: "inline" | "attachment") {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.length > 2048) throw Error("A render output URL is not same-origin.");
  const url = new URL(value, "http://codexforge.invalid");
  if (url.origin !== "http://codexforge.invalid" || url.pathname !== OUTPUT_ENDPOINT || url.hash || [...url.searchParams.keys()].sort().join() !== "assetId,contentHash,disposition,projectId,version") throw Error("A render output URL is not on the fixed local route.");
  const expected = { projectId, assetId: output.assetId, version: String(output.version), contentHash: output.contentHash, disposition };
  for (const [key, copy] of Object.entries(expected)) if (url.searchParams.getAll(key).length !== 1 || url.searchParams.get(key) !== copy) throw Error("A render output URL does not match its immutable output identity.");
}
function parseOutput(value: unknown, projectId: string): RenderOutput {
  const hasMixValidation = !!value && typeof value === "object" && Object.hasOwn(value, "audioMixValidation");
  exact(value, "assetId,version,jobId,headDigest,contentHash,byteLength,createdAt,video,audio,playbackUrl,downloadUrl" + (hasMixValidation ? ",audioMixValidation" : ""));
  safeId(value.assetId); integer(value.version, 1); safeId(value.jobId); digest(value.headDigest); digest(value.contentHash); integer(value.byteLength, 1); timestamp(value.createdAt);
  exact(value.video, "codec,width,height,frameRate,decodedFrames"); integer(value.video.decodedFrames, 1);
  if (value.video.codec !== "h264" || value.video.width !== 1280 || value.video.height !== 720 || value.video.frameRate !== "25/1") throw Error("A completed output does not match its immutable video contract.");
  exact(value.audio, "codec,sampleRate,channels"); if (value.audio.codec !== "aac" || value.audio.sampleRate !== 48_000 || value.audio.channels !== 2) throw Error("A completed output does not match its immutable audio contract.");
  if (hasMixValidation) {
    const mix = value.audioMixValidation; exact(mix, "format,frames,bytes,channels,sampleRate,peakAbsolute,rms,nonzeroSamples"); integer(mix.frames, 1); integer(mix.bytes, 1); integer(mix.nonzeroSamples);
    if (mix.format !== "studio-audio-unclamped-pcm-check-v1" || mix.channels !== 2 || mix.sampleRate !== 48_000 || mix.frames !== value.video.decodedFrames * 1920 || mix.frames > 14_400_000 || mix.bytes !== mix.frames * 8 || mix.nonzeroSamples > mix.frames * 2 || typeof mix.peakAbsolute !== "number" || !Number.isFinite(mix.peakAbsolute) || mix.peakAbsolute < 0 || mix.peakAbsolute > 1 || typeof mix.rms !== "number" || !Number.isFinite(mix.rms) || mix.rms < 0 || mix.rms > mix.peakAbsolute) throw Error("The completed output has an invalid unclamped audio check.");
  }
  const identity = { assetId: value.assetId, version: value.version, contentHash: value.contentHash };
  localOutputUrl(value.playbackUrl, projectId, identity, "inline"); localOutputUrl(value.downloadUrl, projectId, identity, "attachment");
  return value as unknown as RenderOutput;
}
function parseJob(value: unknown, projectId: string): RenderJob {
  exact(value, "jobId,state,specDigest,sourceHeadDigest,sourceRevision,compositionRevision,targetVersion,progress,createdAt,startedAt,finishedAt,error,output");
  safeId(value.jobId); if (!["QUEUED", "RUNNING", "COMPLETED", "FAILED", "CANCELLED", "INTERRUPTED"].includes(String(value.state))) throw Error("The local render service returned an unknown job state.");
  digest(value.specDigest); digest(value.sourceHeadDigest); integer(value.sourceRevision, 1); integer(value.compositionRevision, 1); integer(value.targetVersion, 1); timestamp(value.createdAt); optionalTimestamp(value.startedAt); optionalTimestamp(value.finishedAt);
  exact(value.progress, "phase,completed,total,percent"); boundedCopy(value.progress.phase, "job phase", 128); integer(value.progress.completed); integer(value.progress.total); if (value.progress.completed > value.progress.total || typeof value.progress.percent !== "number" || !Number.isFinite(value.progress.percent) || value.progress.percent < 0 || value.progress.percent > 100) throw Error("The local render service returned invalid progress.");
  if (value.error !== null) { exact(value.error, "code,message"); boundedCopy(value.error.code, "job error code", 128); boundedCopy(value.error.message, "job error message", 1000); }
  const output = value.output === null ? null : parseOutput(value.output, projectId);
  if (output && (output.jobId !== value.jobId || output.version !== value.targetVersion || output.headDigest !== value.sourceHeadDigest)) throw Error("A render job output does not match its saved input.");
  if ((value.state === "QUEUED" && (value.startedAt !== null || value.finishedAt !== null || value.error !== null || output !== null)) || (value.state === "RUNNING" && (value.startedAt === null || value.finishedAt !== null || value.error !== null || output !== null)) || (value.state === "COMPLETED" && (value.startedAt === null || value.finishedAt === null || value.error !== null || output === null)) || (["FAILED", "CANCELLED", "INTERRUPTED"].includes(String(value.state)) && value.finishedAt === null) || (["FAILED", "INTERRUPTED"].includes(String(value.state)) && (value.error === null || output !== null)) || (value.state === "CANCELLED" && output !== null)) throw Error("A render job state is internally inconsistent.");
  return { ...(value as unknown as RenderJob), output };
}
function parseResult(value: unknown, projectId: string, compositionId: string): RenderResult {
  exact(value, "projectId,compositionId,current,preset,readiness,ledgerRevision,jobs,outputs,providerRequests,generationRequests");
  if (value.projectId !== projectId || value.compositionId !== compositionId || value.providerRequests !== 0 || value.generationRequests !== 0) throw Error("The local-only render boundary could not be verified.");
  exact(value.current, "headDigest,revision,compositionRevision"); digest(value.current.headDigest); integer(value.current.revision, 1); integer(value.current.compositionRevision, 1);
  exact(value.preset, "presetId,width,height,frameRate,duration,expectedFrames,videoCodec,audioCodec,sampleRate,expectedAudioSamples,channels,qualifiedDurationRange"); exact(value.preset.frameRate, "numerator,denominator");
  const presetDuration = rational(value.preset.duration, true); if (value.preset.expectedFrames !== null) integer(value.preset.expectedFrames, 1); if (value.preset.expectedAudioSamples !== null) integer(value.preset.expectedAudioSamples, 1);
  exact(value.preset.qualifiedDurationRange, "minimum,maximum"); const policyMinimum = rational(value.preset.qualifiedDurationRange.minimum), policyMaximum = rational(value.preset.qualifiedDurationRange.maximum);
  if (value.preset.presetId !== PRESET_ID || value.preset.width !== 1280 || value.preset.height !== 720 || value.preset.frameRate.numerator !== 25 || value.preset.frameRate.denominator !== 1 || value.preset.videoCodec !== "libx264" || value.preset.audioCodec !== "aac" || value.preset.sampleRate !== 48_000 || value.preset.channels !== 2 || policyMinimum?.numerator !== 1 || policyMinimum.denominator !== 25 || policyMaximum?.numerator !== 300 || policyMaximum.denominator !== 1) throw Error("The render preset does not match the qualified duration-aware local export contract.");
  exact(value.readiness, "state,blockers,timing"); if (value.readiness.state !== "READY" && value.readiness.state !== "BLOCKED") throw Error("The render readiness state is invalid.");
  exact(value.readiness.timing, "duration,frameRate,expectedFrames,sampleRate,expectedAudioSamples,qualifiedMinimumDuration,qualifiedMaximumDuration"); exact(value.readiness.timing.frameRate, "numerator,denominator");
  const timingDuration = rational(value.readiness.timing.duration, true), timingMinimum = rational(value.readiness.timing.qualifiedMinimumDuration), timingMaximum = rational(value.readiness.timing.qualifiedMaximumDuration);
  if (value.readiness.timing.expectedFrames !== null) integer(value.readiness.timing.expectedFrames, 1); if (value.readiness.timing.expectedAudioSamples !== null) integer(value.readiness.timing.expectedAudioSamples, 1);
  if (value.readiness.timing.frameRate.numerator !== 25 || value.readiness.timing.frameRate.denominator !== 1 || value.readiness.timing.sampleRate !== 48_000 || timingMinimum?.numerator !== 1 || timingMinimum.denominator !== 25 || timingMaximum?.numerator !== 300 || timingMaximum.denominator !== 1 || JSON.stringify(timingDuration) !== JSON.stringify(presetDuration) || value.readiness.timing.expectedFrames !== value.preset.expectedFrames || value.readiness.timing.expectedAudioSamples !== value.preset.expectedAudioSamples) throw Error("The render timing report does not match the saved-head preset view.");
  if (!Array.isArray(value.readiness.blockers) || value.readiness.blockers.length > 128 || (value.readiness.state === "READY") !== (value.readiness.blockers.length === 0)) throw Error("The render readiness report is inconsistent.");
  const blockers = value.readiness.blockers.map(blocker => { exact(blocker, "code,layerId,property,message"); boundedCopy(blocker.code, "readiness code", 128); if (blocker.layerId !== null) safeId(blocker.layerId); if (blocker.property !== null) boundedCopy(blocker.property, "readiness property", 128); boundedCopy(blocker.message, "readiness explanation", 1000); return blocker as unknown as ReadinessBlocker; });
  integer(value.ledgerRevision); if (!Array.isArray(value.jobs) || value.jobs.length > 128 || !Array.isArray(value.outputs) || value.outputs.length > 128) throw Error("The render history exceeds its bounded size.");
  const jobs = value.jobs.map(job => parseJob(job, projectId)), outputs = value.outputs.map(output => parseOutput(output, projectId));
  if (jobs.filter(job => job.state === "QUEUED" || job.state === "RUNNING").length > 1) throw Error("The render history contains competing active jobs.");
  const jobIds = new Set<string>(), outputIds = new Set<string>(); for (const job of jobs) { if (jobIds.has(job.jobId)) throw Error("The render history contains a duplicate job."); jobIds.add(job.jobId); }
  for (const output of outputs) { const key = `${output.assetId}:${output.version}`; if (outputIds.has(key) || !jobs.some(job => job.jobId === output.jobId && job.output?.contentHash === output.contentHash)) throw Error("The output history is not bound to a completed job."); outputIds.add(key); }
  return { ...(value as unknown as RenderResult), current: value.current as RenderResult["current"], preset: value.preset as RenderResult["preset"], readiness: { state: value.readiness.state, blockers, timing: value.readiness.timing as RenderResult["readiness"]["timing"] }, jobs, outputs };
}
async function payload(response: Response): Promise<unknown> {
  const reader = response.body?.getReader(); if (!reader) throw Error("The local render response body is missing."); const chunks: Uint8Array[] = []; let length = 0;
  try { for (;;) { const part = await reader.read(); if (part.done) break; length += part.value.byteLength; if (length > MAX_RESPONSE || chunks.length >= 4096) { await reader.cancel(); throw Error("The local render response exceeds its bounded size."); } chunks.push(part.value); } } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; } return JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
}
const failureMessages: Record<string, string> = {
  render_invalid_request: "The render request was rejected as invalid.", render_revision_conflict: "The loaded saved head is no longer current. Reload the working-copy composition before starting another export.", render_not_ready: "This saved head is not render-ready. Review the readiness blockers below.", render_busy: "A render is already queued or running for this saved project.", render_job_not_cancelable: "This render job has already reached a state that cannot be cancelled.", renderer_disabled: "The local renderer is disabled. No provider or generation request was made.", render_storage_unavailable: "Local render storage is unavailable or failed integrity checks.",
};
const definitiveRejectionStatuses: Record<string, number> = { render_invalid_request: 400, render_revision_conflict: 409, render_not_ready: 422, render_busy: 409, render_job_not_cancelable: 409, renderer_disabled: 503 };
class RenderResponseError extends Error {
  constructor(message: string, readonly definitivelyRejected: boolean) { super(message); this.name = "RenderResponseError"; }
}
async function responseResult(response: Response, projectId: string, compositionId: string): Promise<RenderResult> {
  const value = await payload(response);
  if (!response.ok) {
    try {
      exact(value, "ok,error"); if (value.ok !== false) throw Error("The local render failure was not confirmed."); exact(value.error, "code,message"); boundedCopy(value.error.code, "render error code", 128); boundedCopy(value.error.message, "render error message", 1000);
      const code = value.error.code, definitivelyRejected = definitiveRejectionStatuses[code] === response.status;
      throw new RenderResponseError(failureMessages[code] ?? "The local render request was rejected.", definitivelyRejected);
    } catch (cause) { if (cause instanceof RenderResponseError) throw cause; throw new RenderResponseError("The local render request was not confirmed.", false); }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("The local render response is invalid.");
  const keys = Object.keys(value).sort().join(); if (!["ok,result", "ok,replayed,result", "ok,result,scheduled", "ok,replayed,result,scheduled"].includes(keys)) throw Error("The local render response envelope is unsupported.");
  const envelope = value as Record<string, unknown>; if (envelope.ok !== true || (Object.hasOwn(envelope, "replayed") && typeof envelope.replayed !== "boolean") || (Object.hasOwn(envelope, "scheduled") && typeof envelope.scheduled !== "boolean")) throw Error("The local render response was not confirmed."); return parseResult(envelope.result, projectId, compositionId);
}
function requestBody(value: unknown, projectId: string): StartBody | CancelBody {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("The retained render request is invalid."); const body = value as Record<string, unknown>;
  if (body.operation === "START_RENDER") { exact(body, "operation,projectId,compositionId,expectedHeadDigest,expectedRevision,expectedCompositionRevision,presetId,requestedAt"); safeId(body.compositionId); digest(body.expectedHeadDigest); integer(body.expectedRevision, 1); integer(body.expectedCompositionRevision, 1); if (body.presetId !== PRESET_ID) throw Error("The retained render preset is unsupported."); }
  else if (body.operation === "CANCEL_RENDER") { exact(body, "operation,projectId,compositionId,jobId,expectedLedgerRevision,requestedAt"); safeId(body.compositionId); safeId(body.jobId); integer(body.expectedLedgerRevision); }
  else throw Error("The retained render operation is unsupported.");
  if (body.projectId !== projectId) throw Error("The retained render request belongs to another project."); timestamp(body.requestedAt); return body as unknown as StartBody | CancelBody;
}
function parsePending(raw: string, projectId: string): Pending {
  if (new TextEncoder().encode(raw).length > MAX_REQUEST * 2) throw Error("The retained render request is too large."); const value = JSON.parse(raw); exact(value, "projectId,key,body");
  if (value.projectId !== projectId || typeof value.key !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(value.key) || typeof value.body !== "string" || new TextEncoder().encode(value.body).length > MAX_REQUEST) throw Error("The retained render request is invalid."); const body = requestBody(JSON.parse(value.body), projectId); if (JSON.stringify(body) !== value.body) throw Error("The retained render request bytes are noncanonical."); return value as unknown as Pending;
}
function storePending(projectId: string, pending: Pending) { const raw = JSON.stringify(pending); sessionStorage.setItem(pendingKey(projectId), raw); if (sessionStorage.getItem(pendingKey(projectId)) !== raw) throw Error("Browser storage did not retain the exact render request."); }
function clearPending(projectId: string) { sessionStorage.removeItem(pendingKey(projectId)); if (sessionStorage.getItem(pendingKey(projectId)) !== null) throw Error("Browser storage did not clear the acknowledged render request."); }
function canonicalOutputUrl(projectId: string, output: RenderOutput, disposition: "inline" | "attachment") { return `${OUTPUT_ENDPOINT}?${new URLSearchParams({ projectId, assetId: output.assetId, version: String(output.version), contentHash: output.contentHash, disposition })}`; }
const exactDuration = (value: Rational | null) => value ? `${value.numerator} / ${value.denominator} seconds` : "invalid exact duration";
const outputDuration = (frames: number) => frames % 25 === 0 ? `${frames / 25} seconds` : `${frames} / 25 seconds (${(frames / 25).toFixed(2)} s)`;

export function SavedHeadRenderPanel({ projectId, compositionId, savedHead, startBlocked, startBlockedReason, onBlockingRecoveryChange, onActivityChange, reviewActive = true, hasUnsavedDraft = false, onReviewRequested, renderLayout }: Props) {
  const [status, setStatus] = useState<RenderResult | null>(null), [pending, setPending] = useState<Pending | null>(null), [ready, setReady] = useState(false);
  const [working, setWorking] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState(""), [recoveryIssue, setRecoveryIssue] = useState(""), [openOutput, setOpenOutput] = useState("");
  const mounted = useRef(false), active = useRef<AbortController | null>(null), pendingRef = useRef<Pending | null>(null), pollCount = useRef(0);
  const outputVideo = useRef<HTMLVideoElement | null>(null);
  const outputScopeMatches = status?.projectId === projectId && status.compositionId === compositionId;
  const selectedOutput = outputScopeMatches ? status.outputs.find(output => `${output.assetId}:${output.version}` === openOutput) ?? null : null;
  const selectedOutputIdentity = selectedOutput ? `${projectId}:${selectedOutput.assetId}:${selectedOutput.version}:${selectedOutput.contentHash}` : "";
  const selectedOutputUrl = selectedOutput ? canonicalOutputUrl(projectId, selectedOutput, "inline") : "";
  useEffect(() => {
    const element = outputVideo.current; if (!element || !reviewActive || !selectedOutputUrl) return;
    // StrictMode can replay setup on the same element after cleanup released it.
    if (element.getAttribute("src") !== selectedOutputUrl) { element.setAttribute("src", selectedOutputUrl); element.load(); }
    return () => { element.pause(); element.removeAttribute("src"); element.load(); };
  }, [reviewActive, selectedOutputIdentity, selectedOutputUrl]);
  const savedHeadDigest = savedHead?.headDigest ?? "", savedWorkingCopyRevision = savedHead?.workingCopyRevision ?? 0, savedCompositionRevision = savedHead?.compositionRevision ?? 0;
  const refresh = useCallback(async (automatic = false) => {
    if (!compositionId || !savedHeadDigest || !savedWorkingCopyRevision || !savedCompositionRevision || active.current) return; const controller = new AbortController(); active.current = controller; setWorking(true); if (!automatic) { setError(""); setNotice(""); pollCount.current = 0; } const timer = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const query = new URLSearchParams({ projectId, compositionId, headDigest: savedHeadDigest }); const response = await fetch(`${ENDPOINT}?${query}`, { credentials: "same-origin", cache: "no-store", redirect: "error", headers: HEADERS, signal: controller.signal }); const next = await responseResult(response, projectId, compositionId);
      if (next.current.headDigest !== savedHeadDigest || next.current.revision !== savedWorkingCopyRevision || next.current.compositionRevision !== savedCompositionRevision) throw Error("The render status does not describe the loaded saved head. Reload the composition before exporting.");
      if (!mounted.current || controller.signal.aborted || active.current !== controller) return; setStatus(next); setError(""); if (!automatic) setNotice("Saved-head render readiness and job ownership refreshed. A stale recorded process may be reconciled to Interrupted; no render request was started or retried.");
    } catch (cause) { if (mounted.current && active.current === controller) { setError(controller.signal.aborted ? "Stopped waiting for render status. No render was started, cancelled or retried." : cause instanceof Error ? cause.message : "Render status is unavailable."); if (automatic) pollCount.current = automaticPollLimit(7_500); } }
    finally { window.clearTimeout(timer); if (active.current === controller) { active.current = null; if (mounted.current) setWorking(false); } }
  }, [compositionId, projectId, savedCompositionRevision, savedHeadDigest, savedWorkingCopyRevision]);
  useEffect(() => {
    mounted.current = true; pendingRef.current = null; setPending(null); setRecoveryIssue(""); setReady(false);
    const timer = window.setTimeout(() => { try { const raw = sessionStorage.getItem(pendingKey(projectId)); if (raw) { const retained = parsePending(raw, projectId); pendingRef.current = retained; setPending(retained); } setReady(true); } catch { setRecoveryIssue("Saved render recovery data could not be read safely. Nothing was submitted automatically. Keep this tab and resolve browser session storage."); setReady(true); } }, 0);
    return () => { mounted.current = false; window.clearTimeout(timer); active.current?.abort(); active.current = null; };
  }, [projectId]);
  useEffect(() => { if (!ready || !compositionId || !savedHeadDigest) return; setOpenOutput(""); pollCount.current = 0; void refresh(); }, [compositionId, ready, refresh, savedCompositionRevision, savedHeadDigest, savedWorkingCopyRevision]);
  useEffect(() => { onBlockingRecoveryChange(!!pending || !!recoveryIssue); }, [pending, recoveryIssue, onBlockingRecoveryChange]);
  const activeJob = status?.jobs.find(job => job.state === "QUEUED" || job.state === "RUNNING") ?? null;
  const nativeStatusUnresolved = !!savedHead && (!status || !!error);
  useEffect(() => { onActivityChange?.(!ready || working || !!pending || !!recoveryIssue || !!activeJob || nativeStatusUnresolved); return () => onActivityChange?.(false); }, [ready, working, pending, recoveryIssue, activeJob, nativeStatusUnresolved, onActivityChange]);
  const automaticLimit = activeJob ? automaticPollLimit(activeJob.progress.total || status?.preset.expectedFrames || 750) : 0;
  useEffect(() => { if (!activeJob || !savedHead || pending || recoveryIssue || working || active.current || pollCount.current >= automaticLimit) return; const timer = window.setTimeout(() => { pollCount.current += 1; void refresh(true); }, POLL_MS); return () => window.clearTimeout(timer); }, [activeJob, automaticLimit, pending, recoveryIssue, refresh, savedHead, status, working]);
  useEffect(() => { if (!activeJob || pollCount.current < automaticLimit) return; setNotice("Automatic render checks reached their duration-aware bounded limit. The job was not cancelled; use Refresh render status when you are ready."); }, [activeJob, automaticLimit, status]);
  async function send(operation: Pending) {
    if (!ready || active.current || recoveryIssue || pendingRef.current && pendingRef.current !== operation) return;
    try { parsePending(JSON.stringify(operation), projectId); pendingRef.current = operation; setPending(operation); storePending(projectId, operation); onBlockingRecoveryChange(true); } catch { setRecoveryIssue("Browser storage could not retain the exact render request. Nothing was sent. Keep this tab open and resolve storage before continuing."); return; }
    const controller = new AbortController(); active.current = controller; setWorking(true); setError(""); const timer = window.setTimeout(() => controller.abort(), 20_000); let refreshAfterRejection = false;
    try {
      const body = requestBody(JSON.parse(operation.body), projectId); const response = await fetch(ENDPOINT, { method: "POST", credentials: "same-origin", cache: "no-store", redirect: "error", headers: { ...HEADERS, "Content-Type": "application/json", "Idempotency-Key": operation.key }, body: operation.body, signal: controller.signal }); const next = await responseResult(response, projectId, body.compositionId);
      if (body.operation === "START_RENDER" && !next.jobs.some(job => job.sourceHeadDigest === body.expectedHeadDigest && job.sourceRevision === body.expectedRevision && job.compositionRevision === body.expectedCompositionRevision)) throw Error("The render receipt does not identify the exact saved head that was requested.");
      if (body.operation === "CANCEL_RENDER" && !next.jobs.some(job => job.jobId === body.jobId && job.state === "CANCELLED")) throw Error("The cancel receipt does not confirm that exact render job as cancelled.");
      if (!mounted.current || controller.signal.aborted || active.current !== controller) return; clearPending(projectId); pendingRef.current = null; setPending(null); onBlockingRecoveryChange(false); setStatus(next); pollCount.current = 0; setNotice(body.operation === "START_RENDER" ? "The duration-aware local MP4 export was accepted for this exact saved head. Automatic status checks are bounded and never resubmit it." : "The exact queued or running render was confirmed cancelled. Existing completed outputs are unchanged.");
    } catch (cause) {
      if (mounted.current && active.current === controller) {
        if (!controller.signal.aborted && cause instanceof RenderResponseError && cause.definitivelyRejected) {
          try {
            clearPending(projectId); pendingRef.current = null; setPending(null); onBlockingRecoveryChange(false); setStatus(null); setError(""); setNotice(`${cause.message} The server returned a definitive non-retryable response. The exact request cannot be safely retried, so its recovery record was retired. Refreshing exact render status to reconcile its outcome before another explicit request.`); refreshAfterRejection = true;
          } catch { setRecoveryIssue("The server rejected the stale exact render request, but browser storage could not safely retire its recovery record. Keep this tab open and resolve storage before continuing."); }
        } else setError(`${controller.signal.aborted ? "Stopped waiting for the render receipt. The server operation may still finish; its outcome is unknown." : cause instanceof Error ? cause.message : "The render request outcome is unknown."} Retry only the retained exact request; do not create a replacement request.`);
      }
    }
    finally { window.clearTimeout(timer); if (active.current === controller) { active.current = null; if (mounted.current) { setWorking(false); if (refreshAfterRejection) window.setTimeout(() => void refresh(true), 0); } } }
  }
  function start() {
    if (!ready || startBlocked || !savedHead || !status || status.readiness.state !== "READY" || activeJob || pendingRef.current || recoveryIssue || working || status.current.headDigest !== savedHead.headDigest || status.current.revision !== savedHead.workingCopyRevision || status.current.compositionRevision !== savedHead.compositionRevision) return;
    const body: StartBody = { operation: "START_RENDER", projectId, compositionId, expectedHeadDigest: savedHead.headDigest, expectedRevision: savedHead.workingCopyRevision, expectedCompositionRevision: savedHead.compositionRevision, presetId: PRESET_ID, requestedAt: new Date().toISOString() }; const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) { setError("The render request exceeds its bounded size. Nothing was sent."); return; } void send({ projectId, key: crypto.randomUUID(), body: encoded });
  }
  function cancel(job: RenderJob) { if (!status || !["QUEUED", "RUNNING"].includes(job.state) || pendingRef.current || recoveryIssue || working) return; const body: CancelBody = { operation: "CANCEL_RENDER", projectId, compositionId: status.compositionId, jobId: job.jobId, expectedLedgerRevision: status.ledgerRevision, requestedAt: new Date().toISOString() }; void send({ projectId, key: crypto.randomUUID(), body: JSON.stringify(body) }); }
  const statusMatchesHead = !!status && !!savedHead && status.current.headDigest === savedHead.headDigest && status.current.revision === savedHead.workingCopyRevision && status.current.compositionRevision === savedHead.compositionRevision;
  const startReason = startBlocked ? startBlockedReason : !ready ? "Wait for saved render recovery checks to finish." : recoveryIssue ? "Resolve unsafe render recovery data before starting a render." : pending ? "Resolve the retained exact render request before starting another render." : !compositionId || !savedHead ? "Load one saved working-copy composition before preparing an export." : working ? "Finish or stop the current render check before starting an export." : !status ? "Refresh render status before starting an export." : !statusMatchesHead ? "Refresh status for the currently loaded saved head before starting an export." : activeJob ? `Job ${activeJob.jobId} is already ${activeJob.state.toLowerCase()}.` : status.readiness.state === "BLOCKED" ? "Resolve every saved-head readiness blocker before starting an export." : "Starts one local export from the exact saved head shown here. It never sends a provider or generation request.";
  const startDisabled = startBlocked || !ready || !!recoveryIssue || !!pending || !compositionId || !savedHead || working || !statusMatchesHead || !!activeJob || status?.readiness.state !== "READY";
  const startHelpId = `saved-head-render-start-help-${projectId}`, refreshHelpId = `saved-head-render-refresh-help-${projectId}`, cancelHelpId = `saved-head-render-cancel-help-${projectId}`;
  const completedOutputs = status && <section className={styles.browser} aria-label="Completed local render outputs"><div className={styles.heading}><h5>Completed outputs</h5><span>{status.outputs.length} version{status.outputs.length === 1 ? "" : "s"}</span></div>{status.outputs.length === 0 ? <p className={styles.muted}>No completed MP4 exists yet. An output appears only after a local job is confirmed completed.</p> : <div className={styles.renderJobs}>{status.outputs.map(output => { const outputKey = `${output.assetId}:${output.version}`, isOpen = reviewActive && openOutput === outputKey; return <article className={styles.renderCard} key={outputKey}><div className={styles.heading}><strong>MP4 output v{output.version}</strong><span>{output.byteLength.toLocaleString()} bytes</span></div><span>{output.video.decodedFrames.toLocaleString()} decoded frames · {outputDuration(output.video.decodedFrames)} · {output.video.width} × {output.video.height} · 25 fps</span><span>AAC · {output.audio.sampleRate.toLocaleString()} Hz · stereo</span><span>{savedHead && output.headDigest === savedHead.headDigest ? "Matches the loaded saved head" : "Different from the loaded saved head"}</span><details><summary>Output technical details</summary><span className={styles.hash}>Source head: {output.headDigest}</span><span className={styles.hash}>Content hash: {output.contentHash}</span><span>Created {output.createdAt}</span>{output.audioMixValidation && <p>Unclamped audio check: {output.audioMixValidation.frames.toLocaleString()} stereo sample frames · sample peak {output.audioMixValidation.peakAbsolute.toFixed(6)} (full scale 1). Objective sample check only; no true-peak or subjective listening approval.</p>}</details><div className={styles.actions}><button type="button" aria-pressed={isOpen} disabled={!outputScopeMatches} onClick={() => { if (isOpen) setOpenOutput(""); else { setOpenOutput(outputKey); onReviewRequested?.(); } }}>{isOpen ? `Close output v${output.version}` : `Open output v${output.version}`}</button><a className={styles.downloadAction} href={canonicalOutputUrl(status.projectId, output, "attachment")} download={`codexforge-trailer-v${output.version}.mp4`}>Download output v{output.version}</a></div></article>; })}</div>}</section>;
  const routineStatus = notice.startsWith("Saved-head render readiness and job ownership refreshed.");
  const feedback = (notice && !routineStatus) || error || recoveryIssue || !ready || pending || nativeStatusUnresolved ? <section key="render-feedback" className={styles.viewerSection} aria-label="Local export status and recovery">
    {notice && !routineStatus && <p role="status" className={styles.muted}>{notice}</p>}{error && <p role="alert" className={styles.error}>{error}</p>}{recoveryIssue && <p role="alert" className={styles.error}>{recoveryIssue}</p>}
    {!ready && <p role="status">Checking exact render recovery data…</p>}
    {nativeStatusUnresolved && <p role="status" className={styles.warning}>Native Blender actions remain disabled while export job status is unresolved. Open Export / outputs and choose Refresh render status. This checks ownership without starting or retrying a render.</p>}
    {pending && <div className={styles.warning} aria-label="Unresolved exact render request"><strong>Exact render request retained</strong><p>Its outcome is not assumed and it was not retried automatically. Refreshing status never resubmits it; a stale recorded process may only be reconciled to Interrupted.</p><button type="button" disabled={working || !!recoveryIssue} onClick={() => void send(pending)}>Retry exact render request</button></div>}
  </section> : null;
  const exportControls = <section key="export-controls" className={styles.renderPanel} aria-label="Saved-head local export" aria-busy={working}>
    <div className={styles.heading}><h4>Saved-head local export</h4><span className={styles.badge}>Duration-aware preset · local only</span></div>
    <p className={styles.muted}>Render one immutable saved working-copy head to a versioned MP4. This does not invoke a provider, run generation, approve an asset, replace source media, or publish anywhere.</p>
    {!renderLayout && feedback}
    <div className={styles.actions}><button type="button" aria-describedby={refreshHelpId} disabled={!ready || !compositionId || !savedHead || working || !!recoveryIssue} onClick={() => void refresh()}>Refresh render status</button>{working && <button type="button" onClick={() => { active.current?.abort(); setNotice("Stopped waiting in this browser. This does not cancel a render. Any exact request already sent remains retained until its receipt is confirmed."); }}>Stop waiting</button>}<button type="button" aria-describedby={startHelpId} disabled={startDisabled} onClick={start}>Render saved head to MP4</button></div>
    <p id={refreshHelpId} className={styles.muted}>{!compositionId || !savedHead ? "Load a saved working-copy composition to inspect readiness, jobs and outputs." : "Checks local readiness and reconciles stored job ownership for this exact saved head. It may mark a stale recorded process Interrupted, but never starts or retries a render."}</p><p id={startHelpId} className={styles.muted}>{startReason}</p>
    {completedOutputs}
    <details><summary>Preset and saved-head details</summary>
    {routineStatus && <p role="status" className={styles.muted}>{notice}</p>}
    <dl className={styles.presetGrid}><div><dt>Preset</dt><dd>{PRESET_ID}</dd></div><div><dt>Picture</dt><dd>1280 × 720 · 25 fps{status ? ` · ${exactDuration(status.preset.duration)}` : ""}</dd></div><div><dt>Qualified duration</dt><dd>positive 25 fps grid · through 300 / 1 seconds</dd></div><div><dt>Expected video</dt><dd>{status?.preset.expectedFrames === null || status?.preset.expectedFrames === undefined ? "Blocked until exact timing is valid" : `${status.preset.expectedFrames.toLocaleString()} frames`}</dd></div><div><dt>Expected audio</dt><dd>{status?.preset.expectedAudioSamples === null || status?.preset.expectedAudioSamples === undefined ? "Blocked until exact timing is valid" : `${status.preset.expectedAudioSamples.toLocaleString()} samples at 48 kHz`}</dd></div><div><dt>Codecs</dt><dd>H.264 (libx264) · AAC</dd></div><div><dt>Audio</dt><dd>48 kHz · stereo</dd></div><div><dt>Execution boundary</dt><dd>Local renderer · 0 provider requests · 0 generation requests</dd></div>{savedHead && <><div><dt>Saved head</dt><dd className={styles.hash}>{savedHead.headDigest}</dd></div><div><dt>Revisions</dt><dd>working copy {savedHead.workingCopyRevision} · composition {savedHead.compositionRevision}</dd></div></>}</dl>
    </details>
    {status && <>
      <section className={status.readiness.state === "READY" ? styles.browser : styles.warning} aria-label="Saved-head render readiness"><div className={styles.heading}><h5>Readiness: {status.readiness.state === "READY" ? "Ready" : "Blocked"}</h5><span>{status.readiness.blockers.length} blocker{status.readiness.blockers.length === 1 ? "" : "s"}</span></div>{status.readiness.state === "READY" ? <p>The exact saved head passed the duration-aware preset’s deterministic preflight for {status.preset.expectedFrames?.toLocaleString()} frames.</p> : <ul className={styles.takeList}>{status.readiness.blockers.map((blocker, index) => <li key={`${blocker.code}:${blocker.layerId ?? "composition"}:${blocker.property ?? "general"}:${index}`}><strong>{blocker.code}</strong><span>{blocker.message}</span>{blocker.layerId && <span>Layer: {blocker.layerId}</span>}{blocker.property && <span>Property: {blocker.property}</span>}</li>)}</ul>}</section>
      <section className={styles.browser} aria-label="Local render jobs"><div className={styles.heading}><h5>Render jobs</h5><span>ledger revision {status.ledgerRevision}</span></div>{status.jobs.length === 0 ? <p className={styles.muted}>No render job has been recorded for this project.</p> : <div className={styles.renderJobs}>{status.jobs.map(job => <article className={styles.renderCard} key={job.jobId}><div className={styles.heading}><strong>{job.state}</strong><span>output v{job.targetVersion}</span></div><details><summary>Job identity and source</summary><span className={styles.hash}>{job.jobId}</span><span className={styles.hash}>Source head: {job.sourceHeadDigest}</span><span>Source revision {job.sourceRevision} · composition {job.compositionRevision}</span><span>Created {job.createdAt}</span></details><p>{job.progress.phase} · {job.progress.completed.toLocaleString()} / {job.progress.total.toLocaleString()} frames · {job.progress.percent}%</p><progress aria-label={`${job.jobId} render progress`} max={job.progress.total || undefined} value={job.progress.total ? job.progress.completed : undefined}>{job.progress.percent}%</progress>{job.error && <p className={styles.error}><strong>{job.error.code}</strong><br />{job.error.message}</p>}{(job.state === "QUEUED" || job.state === "RUNNING") && <><button type="button" aria-describedby={cancelHelpId} disabled={working || !!pending || !!recoveryIssue} onClick={() => cancel(job)}>Cancel this render</button><span id={cancelHelpId} className={styles.muted}>{pending ? "Resolve the retained exact request before cancelling." : working ? "Finish or stop the current render check before cancelling." : "Cancels only this queued or running local job; completed outputs remain immutable."}</span></>}</article>)}</div>}</section>
    </>}
  </section>;
  const outputReview = <section key="output-review" className={styles.viewerSection} aria-label="Completed output viewer">
    <div className={styles.heading}><h4>{selectedOutput ? `Completed MP4 output v${selectedOutput.version}` : "Completed output review"}</h4></div>
    {selectedOutput ? <>
      <p className={styles.muted}>Saved head {selectedOutput.headDigest.slice(0, 12)}… · {savedHead && selectedOutput.headDigest === savedHead.headDigest ? "Matches the loaded saved head." : "Different from the loaded saved head; this is a historical render, not the current composition."}</p>
      {hasUnsavedDraft && <p className={styles.warning}>Unsaved changes are not included in this completed output.</p>}
      <details><summary>Selected output identity</summary><p className={styles.hash}>Source head: {selectedOutput.headDigest}</p><p className={styles.hash}>Content hash: {selectedOutput.contentHash}</p></details>
      {reviewActive ? <video key={selectedOutputIdentity} ref={outputVideo} className={styles.outputVideo} src={selectedOutputUrl} controls playsInline preload="metadata" aria-label={`Playable completed MP4 output version ${selectedOutput.version}`} /> : <p className={styles.muted}>Completed-output media is closed while another viewer mode is selected.</p>}
    </> : <p className={styles.muted}>Choose Open output on a completed version. This never starts a render or loads working-copy media.</p>}
  </section>;
  return renderLayout ? renderLayout({ exportControls, outputReview, feedback }) : <>{exportControls}{outputReview}</>;
}
