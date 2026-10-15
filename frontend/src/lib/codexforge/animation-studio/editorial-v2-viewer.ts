import { validateCompositionV2, type CompositionV2, type LayerTrimEdge, type LayerV2 } from "./editorial-v2-contract";
import { editorialAddTime, editorialCompareTime, editorialFrameRate, editorialSubtractTime, editorialTimeFromFrames, validateEditorialRational, type EditorialRational } from "./editorial-time";

export const V2_PREVIEW_SOURCE_BYTES = 16 * 1024 * 1024;
export const V2_PREVIEW_TOTAL_BYTES = 64 * 1024 * 1024;
export type V2PreviewBinding = { projectId: string; compositionId: string; headDigest: string; assetId: string; version: number; type: "IMAGE" | "VIDEO" };
/** The saved shot model uses a general number. Only integer rates with an existing
 * exact canonical identity are unambiguous enough for frame-grid gestures. */
export function timelineFrameRateFromSavedFps(value: unknown): EditorialRational | null {
  switch (value) {
    case 24: return editorialFrameRate("24");
    case 25: return editorialFrameRate("25");
    case 30: return editorialFrameRate("30");
    case 50: return editorialFrameRate("50");
    case 60: return editorialFrameRate("60");
    default: return null;
  }
}
function positiveTimelineFrameRate(value: unknown): EditorialRational {
  const result = validateEditorialRational(value);
  if (result.numerator === 0) throw Error("Timeline frame rate must be positive.");
  return result;
}
/** Display pixels are deliberately approximate, but the result is one signed integer
 * frame displacement. Ties use the existing symmetric nearest-even policy. */
export function timelineFrameDisplacement(deltaPixels: number, pixelsPerSecond: number, frameRate: unknown): number {
  if (!Number.isFinite(deltaPixels) || !Number.isFinite(pixelsPerSecond) || !(pixelsPerSecond > 0)) throw Error("Timeline display scale must be finite and positive.");
  const rate = positiveTimelineFrameRate(frameRate);
  const magnitude = Math.abs(deltaPixels) / pixelsPerSecond * rate.numerator / rate.denominator;
  if (!Number.isFinite(magnitude)) throw Error("Timeline frame displacement exceeds the supported display range.");
  const floor = Math.floor(magnitude), remainder = magnitude - floor;
  const rounded = remainder < 0.5 ? floor : remainder > 0.5 ? floor + 1 : floor % 2 === 0 ? floor : floor + 1;
  if (!Number.isSafeInteger(rounded)) throw Error("Timeline frame displacement exceeds the safe integer range.");
  return rounded === 0 ? 0 : deltaPixels < 0 ? -rounded : rounded;
}
/** Add an exact whole-frame displacement to the original saved start. Existing
 * off-grid timing is never snapped. Invalid intervals reject instead of clamping. */
export function timelineMoveProposal(
  layer: Pick<LayerV2, "start" | "duration">,
  frameDisplacement: number,
  frameRate: unknown,
  compositionDuration: EditorialRational,
): EditorialRational | null {
  if (!Number.isSafeInteger(frameDisplacement)) throw Error("Timeline frame displacement must be a safe integer.");
  const start = validateEditorialRational(layer?.start), duration = validateEditorialRational(layer?.duration), limit = validateEditorialRational(compositionDuration), rate = positiveTimelineFrameRate(frameRate);
  if (duration.numerator === 0 || limit.numerator === 0) return null;
  const offset = editorialTimeFromFrames(Math.abs(frameDisplacement), rate);
  let proposed: EditorialRational;
  try {
    if (frameDisplacement < 0) {
      if (editorialCompareTime(offset, start) > 0) return null;
      proposed = editorialSubtractTime(start, offset);
    } else proposed = editorialAddTime(start, offset);
    return editorialCompareTime(editorialAddTime(proposed, duration), limit) <= 0 ? proposed : null;
  } catch { return null; }
}
/** Move one saved edge by an exact whole-frame displacement. The displacement is
 * always relative to that original, possibly off-grid edge. Only strict inward
 * cuts are returned; zero, outward and crossing gestures reject without clamping. */
export function timelineTrimProposal(
  layer: Pick<LayerV2, "start" | "duration">,
  edge: LayerTrimEdge,
  frameDisplacement: number,
  frameRate: unknown,
): EditorialRational | null {
  if (!Number.isSafeInteger(frameDisplacement)) throw Error("Timeline frame displacement must be a safe integer.");
  if (edge !== "IN" && edge !== "OUT") throw Error("Timeline trim edge is unsupported.");
  const start = validateEditorialRational(layer?.start), duration = validateEditorialRational(layer?.duration), rate = positiveTimelineFrameRate(frameRate);
  if (duration.numerator === 0 || frameDisplacement === 0 || (edge === "IN" ? frameDisplacement < 0 : frameDisplacement > 0)) return null;
  try {
    const end = editorialAddTime(start, duration), offset = editorialTimeFromFrames(Math.abs(frameDisplacement), rate);
    const proposed = edge === "IN" ? editorialAddTime(start, offset) : editorialSubtractTime(end, offset);
    return editorialCompareTime(proposed, start) > 0 && editorialCompareTime(proposed, end) < 0 ? proposed : null;
  } catch { return null; }
}
export function exactTimeLabel(value: EditorialRational): string {
  const t = validateEditorialRational(value);
  return `${t.denominator === 1 ? t.numerator : `${t.numerator}/${t.denominator}`} s`;
}
/** Floating point is used only to place a visual bar, never for editorial comparisons or persistence. */
export function timelinePercent(value: EditorialRational, duration: EditorialRational): number {
  const t = validateEditorialRational(value), d = validateEditorialRational(duration);
  if (d.numerator === 0 || editorialCompareTime(t, d) > 0) throw Error("Invalid timeline display interval.");
  return Math.max(0, Math.min(100, (t.numerator / t.denominator) / (d.numerator / d.denominator) * 100));
}
export function activeV2Layers(value: CompositionV2, time: EditorialRational): LayerV2[] {
  const c = validateCompositionV2(value), t = validateEditorialRational(time);
  if (editorialCompareTime(t, c.duration) > 0) throw Error("Time is outside the composition.");
  const solo = c.layers.some(layer => layer.enabled && layer.solo);
  return c.layers.filter(layer => layer.enabled && (!solo || layer.solo) && editorialCompareTime(t, layer.start) >= 0 && editorialCompareTime(t, editorialAddTime(layer.start, layer.duration)) < 0);
}
export function v2SourceTime(layer: LayerV2, time: EditorialRational): EditorialRational {
  if (editorialCompareTime(time, layer.start) < 0 || editorialCompareTime(time, editorialAddTime(layer.start, layer.duration)) >= 0) throw Error("Layer is inactive at this exact time.");
  return editorialAddTime(editorialSubtractTime(time, layer.start), layer.sourceOffset);
}
/** Bounded direct references only. A nested instruction blocks the whole first viewer. */
export function v2PreviewCandidates(value: CompositionV2, headDigest: string): V2PreviewBinding[] {
  const c = validateCompositionV2(value);
  if (!/^[a-f0-9]{64}$/u.test(headDigest)) throw Error("Invalid preview head binding.");
  if (c.layers.some(layer => layer.source.kind === "COMPOSITION")) throw Error("Nested composition preview is not supported.");
  const solo = c.layers.some(layer => layer.enabled && layer.solo), result = new Map<string, V2PreviewBinding>();
  for (const layer of c.layers) if (layer.enabled && (!solo || layer.solo) && layer.source.kind === "ASSET" && (layer.type === "IMAGE" || layer.type === "VIDEO")) {
    const asset = layer.source.asset, key = `${asset.assetId}@${asset.version}`, prior = result.get(key);
    if (prior && prior.type !== layer.type) throw Error("Conflicting source types.");
    result.set(key, { projectId: c.projectId, compositionId: c.compositionId, headDigest, ...asset, type: layer.type });
  }
  return [...result.values()];
}
/** Validates bytes against the exact server-owned selected-head/asset binding, before any blob URL exists. */
export async function readV2PreviewResponse(response: Response, expected: V2PreviewBinding, remainingBytes: number, signal: AbortSignal): Promise<{ blob: Blob; mime: string; bytes: number }> {
  const reject = async (): Promise<never> => { await response.body?.cancel().catch(() => undefined); throw Error("The selected source could not be safely verified."); };
  const mime = response.headers.get("Content-Type"), length = response.headers.get("Content-Length"), hash = response.headers.get("X-CodexForge-Content-SHA256");
  const headers: Record<string, string> = { "X-CodexForge-Project-Id": expected.projectId, "X-CodexForge-Composition-Id": expected.compositionId, "X-CodexForge-Editorial-Head": expected.headDigest, "X-CodexForge-Asset-Id": expected.assetId, "X-CodexForge-Asset-Version": String(expected.version) };
  if (!Number.isSafeInteger(remainingBytes) || remainingBytes < 1 || remainingBytes > V2_PREVIEW_TOTAL_BYTES || !response.ok || response.redirected || signal.aborted || !response.body || !length || !/^[1-9]\d*$/u.test(length) || !Number.isSafeInteger(Number(length)) || Number(length) > Math.min(V2_PREVIEW_SOURCE_BYTES, remainingBytes) || !hash || !/^[a-f0-9]{64}$/u.test(hash) || Object.entries(headers).some(([name, value]) => response.headers.get(name) !== value) || !(expected.type === "VIDEO" ? mime === "video/mp4" : mime === "image/png" || mime === "image/jpeg")) return reject();
  const reader = response.body.getReader(), chunks: Uint8Array<ArrayBuffer>[] = []; let bytes = 0;
  const abort = () => { void reader.cancel().catch(() => undefined); };
  signal.addEventListener("abort", abort, { once: true });
  try {
    if (signal.aborted) abort();
    for (;;) {
      const next = await reader.read();
      if (signal.aborted) throw Error("Preview loading stopped.");
      if (next.done) break;
      bytes += next.value.byteLength;
      if (bytes > Number(length) || bytes > V2_PREVIEW_SOURCE_BYTES || bytes > remainingBytes || chunks.length >= 4096) { await reader.cancel(); throw Error("The preview byte limit was reached."); }
      chunks.push(new Uint8Array(next.value));
    }
    if (bytes !== Number(length)) throw Error("Preview length does not match its binding.");
    const blob = new Blob(chunks, { type: mime! });
    const actual = [...new Uint8Array(await crypto.subtle.digest("SHA-256", await blob.arrayBuffer()))].map(n => n.toString(16).padStart(2, "0")).join("");
    if (signal.aborted || actual !== hash) throw Error("Preview hash or cancellation check failed.");
    return { blob, mime: mime!, bytes };
  } finally { signal.removeEventListener("abort", abort); reader.releaseLock(); }
}

/** Verifies the bounded first-byte response before a source-bound direct video
 * URL is given to HTMLMediaElement. Subsequent range requests are independently
 * checked by the server against the same saved-head binding and chunk index. */
export async function readV2PreviewRangeProbe(response: Response, expected: V2PreviewBinding, signal: AbortSignal): Promise<{ mime: "video/mp4"; bytes: number }> {
  const reject = async (): Promise<never> => { await response.body?.cancel().catch(() => undefined); throw Error("The selected source could not be safely verified for ranged preview."); };
  const hash = response.headers.get("X-CodexForge-Content-SHA256"), length = response.headers.get("Content-Length"), range = response.headers.get("Content-Range");
  const headers: Record<string, string> = { "X-CodexForge-Project-Id": expected.projectId, "X-CodexForge-Composition-Id": expected.compositionId, "X-CodexForge-Editorial-Head": expected.headDigest, "X-CodexForge-Asset-Id": expected.assetId, "X-CodexForge-Asset-Version": String(expected.version) };
  const match = /^bytes 0-11\/([1-9]\d*)$/u.exec(range ?? ""), total = match ? Number(match[1]) : 0;
  if (expected.type !== "VIDEO" || response.status !== 206 || response.redirected || signal.aborted || response.headers.get("Content-Type") !== "video/mp4" || length !== "12" || !Number.isSafeInteger(total) || total < 12 || !hash || !/^[a-f0-9]{64}$/u.test(hash) || Object.entries(headers).some(([name, value]) => response.headers.get(name) !== value)) return reject();
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (signal.aborted || bytes.length !== 12 || String.fromCharCode(...bytes.subarray(4, 8)) !== "ftyp") throw Error("The selected video did not retain its admitted MP4 framing.");
  return { mime: "video/mp4", bytes: total };
}
