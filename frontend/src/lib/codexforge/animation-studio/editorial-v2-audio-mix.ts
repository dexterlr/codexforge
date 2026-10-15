import type { CompositionV2 } from "./editorial-v2-contract";
import type { StudioEditorialRenderSpecV3, StudioEditorialRenderSpecV4, StudioRenderSource } from "./editorial-v2-render-contract";
import { editorialTimeToFrames } from "./editorial-time";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";

/** Renderer qualification only; this is not a composition schema limit. */
export const STUDIO_AUDIO_MIX_MAX_OCCURRENCES = 4;
export const STUDIO_AUDIO_MIX_POLICY = Object.freeze({
  algorithm: "ORDERED_STEREO_SAMPLE_SUM_V1" as const,
  order: "COMPOSITION_LAYER_ORDER_V1" as const,
  sampleRate: 48_000 as const,
  channels: 2 as const,
  sampleFormat: "f32le" as const,
  conversion: "ARESAMPLE_48000_AFORMAT_FLTP_STEREO_V1" as const,
  fadeCurve: "LINEAR_LOCAL_SAMPLE_V1" as const,
  normalization: "NONE" as const,
  dropoutTransition: 0 as const,
  duration: "EXACT_COMPOSITION_SAMPLE_COUNT" as const,
  clipping: "REJECT_NONFINITE_OR_ABS_GREATER_THAN_ONE_V1" as const,
});
export interface StudioAudioMixOccurrence {
  layerId: string; name: string;
  source: Pick<StudioRenderSource, "assetId" | "version" | "contentHash" | "assetManifestDigest">;
  enabled: boolean; muted: boolean; selectedBySolo: boolean;
  startSample: number; durationSamples: number; sourceOffsetSamples: number;
  gainDb: number; fadeInSamples: number; fadeOutSamples: number;
  provenanceDigest: string;
}
export interface StudioAudioMixV1 { policy: typeof STUDIO_AUDIO_MIX_POLICY; occurrences: StudioAudioMixOccurrence[] }
export class StudioAudioMixError extends Error {
  constructor(readonly code: "AUDIO_MIX_CAPACITY" | "AUDIO_SAMPLE_ALIGNMENT_REQUIRED" | "AUDIO_MIX_INVALID" | "AUDIO_MIX_NONFINITE" | "AUDIO_MIX_CLIPPING", readonly layerId: string | null = null, readonly peakAbsolute: number | null = null) { super(code); this.name = "StudioAudioMixError"; }
}
const invalid = (): never => { throw new StudioAudioMixError("AUDIO_MIX_INVALID"); };
const sample = (value: unknown, layerId: string): number => {
  try { return editorialTimeToFrames(value, { numerator: 48_000, denominator: 1 }, "EXACT"); }
  catch { throw new StudioAudioMixError("AUDIO_SAMPLE_ALIGNMENT_REQUIRED", layerId); }
};
export function buildStudioAudioMix(composition: CompositionV2, sources: StudioRenderSource[]): StudioAudioMixV1 {
  const audio = composition.layers.filter(layer => layer.type === "AUDIO");
  if (audio.length > STUDIO_AUDIO_MIX_MAX_OCCURRENCES) throw new StudioAudioMixError("AUDIO_MIX_CAPACITY");
  const hasSolo = composition.layers.some(layer => layer.enabled && layer.solo), total = sample(composition.duration, composition.compositionId);
  const occurrences = audio.map(layer => {
    if (layer.type !== "AUDIO" || layer.source.kind !== "ASSET") return invalid();
    const ref = layer.source.asset;
    const source = sources.find(item => item.assetType === "AUDIO" && item.assetId === ref.assetId && item.version === ref.version);
    if (!source || !/^[a-f0-9]{64}$/u.test(source.contentHash) || !/^[a-f0-9]{64}$/u.test(source.assetManifestDigest)) return invalid();
    const startSample = sample(layer.start, layer.layerId), durationSamples = sample(layer.duration, layer.layerId), sourceOffsetSamples = sample(layer.sourceOffset, layer.layerId), fadeInSamples = sample(layer.audio.fadeIn, layer.layerId), fadeOutSamples = sample(layer.audio.fadeOut, layer.layerId);
    if (durationSamples < 1 || startSample + durationSamples > total || fadeInSamples > durationSamples || fadeOutSamples > durationSamples || !Number.isFinite(layer.audio.gainDb) || layer.audio.gainDb < -60 || layer.audio.gainDb > 12 || typeof layer.enabled !== "boolean" || typeof layer.audio.muted !== "boolean") return invalid();
    return { layerId: layer.layerId, name: layer.name, source: { assetId: source.assetId, version: source.version, contentHash: source.contentHash, assetManifestDigest: source.assetManifestDigest }, enabled: layer.enabled, muted: layer.audio.muted, selectedBySolo: !hasSolo || layer.solo, startSample, durationSamples, sourceOffsetSamples, gainDb: layer.audio.gainDb, fadeInSamples, fadeOutSamples, provenanceDigest: digest(layer.provenance) };
  });
  return { policy: { ...STUDIO_AUDIO_MIX_POLICY }, occurrences };
}
export function validateStudioAudioMix(spec: StudioEditorialRenderSpecV3 | StudioEditorialRenderSpecV4): void {
  if (digest(spec.audioMix) !== digest(buildStudioAudioMix(spec.composition, spec.sources))) invalid();
}
export const studioAudioOccurrenceParticipates = (item: StudioAudioMixOccurrence): boolean => item.enabled && item.selectedBySolo && !item.muted;

/** Pure production audio graph. Acceptance references must be calculated independently. */
export function buildStudioAudioMixGraph(mix: StudioAudioMixV1, expectedSamples: number, inputIndex: (item: StudioAudioMixOccurrence) => number): string {
  if (digest(mix.policy) !== digest(STUDIO_AUDIO_MIX_POLICY) || mix.occurrences.length > STUDIO_AUDIO_MIX_MAX_OCCURRENCES || !Number.isSafeInteger(expectedSamples) || expectedSamples < 1 || expectedSamples > 14_400_000) return invalid();
  const filters = [`anullsrc=r=48000:cl=stereo,aformat=sample_fmts=fltp:channel_layouts=stereo,atrim=end_sample=${expectedSamples},asetpts=PTS-STARTPTS[mixsilence]`], labels: string[] = [];
  for (const [ordinal, item] of mix.occurrences.entries()) {
    if (!studioAudioOccurrenceParticipates(item)) continue;
    const input = inputIndex(item); if (!Number.isSafeInteger(input) || input < 0) return invalid();
    const chain = [`[${input}:a:0]aresample=48000`, "aformat=sample_fmts=fltp:channel_layouts=stereo", `atrim=start_sample=${item.sourceOffsetSamples}:end_sample=${item.sourceOffsetSamples + item.durationSamples}`, "asetpts=PTS-STARTPTS", `volume='${item.gainDb}dB':precision=double`];
    if (item.fadeInSamples > 0) chain.push(`afade=t=in:ss=0:ns=${item.fadeInSamples}:curve=tri`);
    if (item.fadeOutSamples > 0) chain.push(`afade=t=out:ss=${item.durationSamples - item.fadeOutSamples}:ns=${item.fadeOutSamples}:curve=tri`);
    // Material silence, rather than only a timestamp shift, aligns each input to
    // the master clock. Fades above remain local to the trimmed source interval.
    chain.push(`adelay=delays=${item.startSample}S:all=1`, "aformat=sample_fmts=fltp:channel_layouts=stereo");
    const label = `mix${ordinal}`; filters.push(`${chain.join(",")}[${label}]`); labels.push(`[${label}]`);
  }
  filters.push(labels.length ? `[mixsilence]${labels.join("")}amix=inputs=${labels.length + 1}:duration=longest:dropout_transition=0:normalize=0,atrim=end_sample=${expectedSamples},asetpts=PTS-STARTPTS,aformat=sample_fmts=flt:channel_layouts=stereo[aout]` : "[mixsilence]aformat=sample_fmts=flt:channel_layouts=stereo[aout]");
  return filters.join(";\n");
}

export interface StudioAudioPcmReport { format: "studio-audio-unclamped-pcm-check-v1"; frames: number; bytes: number; channels: 2; sampleRate: 48_000; peakAbsolute: number; rms: number; nonzeroSamples: number }
export function validateStudioAudioPcmReport(value: StudioAudioPcmReport, expectedSamples: number): void {
  if (!value || Object.keys(value).sort().join() !== "format,frames,bytes,channels,sampleRate,peakAbsolute,rms,nonzeroSamples".split(",").sort().join() || value.format !== "studio-audio-unclamped-pcm-check-v1" || value.frames !== expectedSamples || value.bytes !== expectedSamples * 8 || value.channels !== 2 || value.sampleRate !== 48_000 || !Number.isFinite(value.peakAbsolute) || value.peakAbsolute < 0 || value.peakAbsolute > 1 || !Number.isFinite(value.rms) || value.rms < 0 || value.rms > value.peakAbsolute + Number.EPSILON || !Number.isSafeInteger(value.nonzeroSamples) || value.nonzeroSamples < 0 || value.nonzeroSamples > expectedSamples * 2) return invalid();
}
/** Streaming scanner; carries at most three bytes between chunks. No clipping or normalization. */
export function createStudioAudioPcmInspector(expectedFrames: number): { accept: (chunk: Uint8Array) => void; finish: () => StudioAudioPcmReport } {
  if (!Number.isSafeInteger(expectedFrames) || expectedFrames < 1 || expectedFrames > 14_400_000) return invalid();
  const maximumBytes = expectedFrames * 2 * 4;
  let bytes = 0, scalarSamples = 0, peakAbsolute = 0, sumSquares = 0, squareCompensation = 0, nonzeroSamples = 0, carry = new Uint8Array(0);
  return {
    accept(chunk) {
      if (!(chunk instanceof Uint8Array) || chunk.byteLength > 524_288 || bytes + chunk.byteLength > maximumBytes) return invalid();
      bytes += chunk.byteLength;
      const merged = new Uint8Array(carry.length + chunk.length); merged.set(carry); merged.set(chunk, carry.length);
      const aligned = merged.length - merged.length % 4, view = new DataView(merged.buffer, merged.byteOffset, aligned);
      for (let offset = 0; offset < aligned; offset += 4) {
        const value = view.getFloat32(offset, true);
        if (!Number.isFinite(value)) throw new StudioAudioMixError("AUDIO_MIX_NONFINITE");
        const absolute = Math.abs(value); peakAbsolute = Math.max(peakAbsolute, absolute);
        const compensatedSquare = value * value - squareCompensation, nextSquares = sumSquares + compensatedSquare;
        squareCompensation = (nextSquares - sumSquares) - compensatedSquare; sumSquares = nextSquares; scalarSamples++;
        if (value !== 0) nonzeroSamples++;
      }
      carry = merged.slice(aligned);
    },
    finish() {
      if (bytes !== maximumBytes || carry.length || scalarSamples !== expectedFrames * 2 || !Number.isFinite(sumSquares)) return invalid();
      if (peakAbsolute > 1) throw new StudioAudioMixError("AUDIO_MIX_CLIPPING", null, peakAbsolute);
      return { format: "studio-audio-unclamped-pcm-check-v1", frames: expectedFrames, bytes, channels: 2, sampleRate: 48_000, peakAbsolute, rms: Math.sqrt(sumSquares / scalarSamples), nonzeroSamples };
    },
  };
}
