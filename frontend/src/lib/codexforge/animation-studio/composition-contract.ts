import type { Asset, AssetRef, ShotManifest, StudioId } from "./domain";
import { cloneStudioJson, validateAssetRef } from "./validation";
import { assertStudioId } from "./workspace";

/** Editorial instructions are separate from generation, asset approval, and original bytes. */
export const STUDIO_EDITORIAL_SCHEMA_VERSION = 1 as const;
export const STUDIO_COMPOSITION_LIMITS = Object.freeze({
  takes: 128, compositions: 32, layersPerComposition: 32, nestingDepth: 8,
  durationUs: 3_600_000_000, dimension: 16_384, name: 160, reviewNote: 2_000,
});
export type TakeId = `take_${string}`;
export type CompositionId = `composition_${string}`;
export type LayerId = `layer_${string}`;
export const STUDIO_TEXT_FONT_REFS = ["ARIAL_REGULAR"] as const;
export type StudioTextFontRef = typeof STUDIO_TEXT_FONT_REFS[number];
export interface StudioTextProperties {
  text: string;
  fontRef: StudioTextFontRef;
  fontSizePx: number;
  color: `#${string}`;
}
export interface StudioAudioPropertiesV1 {
  gainDb: number;
  fadeInUs: number;
  fadeOutUs: number;
  muted: boolean;
}
export interface EditorialInstructionProvenance { kind: "EDITORIAL_INSTRUCTION"; providerRequests: 0 }
export interface EditorialTake {
  schemaVersion: 1; takeId: TakeId; projectId: StudioId<"project">; shotId: StudioId<"shot">;
  source: AssetRef; name: string; createdAt: string;
  /** ACCEPTED is editorial review only, never asset/QC/rights approval or execution consent. */
  review: { state: "UNREVIEWED" | "ACCEPTED" | "REJECTED"; note: string; reviewedAt: string | null };
}
export interface LayerTransform {
  x: number; y: number; scaleX: number; scaleY: number; rotationDeg: number; anchorX: number; anchorY: number;
}
/** Reserved typed design, NOT accepted persisted v1 instructions. No expressions or arbitrary paths. */
export const STUDIO_ANIMATABLE_PROPERTIES = [
  "transform.x", "transform.y", "transform.scaleX", "transform.scaleY", "transform.rotationDeg",
  "transform.anchorX", "transform.anchorY", "opacity",
] as const;
export type StudioAnimatableProperty = typeof STUDIO_ANIMATABLE_PROPERTIES[number];
export interface FutureScalarKeyframeTrack {
  property: StudioAnimatableProperty;
  keys: { timeUs: number; value: number; interpolation: "HOLD" | "LINEAR" | "BEZIER"; easing: null | { x1: number; y1: number; x2: number; y2: number } }[];
}
export type AssetLayerSource = { kind: "ASSET"; asset: AssetRef; takeId: TakeId | null };
export type CompositionLayerSource = { kind: "COMPOSITION"; compositionId: CompositionId };
export type TextLayerSource = { kind: "TEXT" };
export type LayerSource = AssetLayerSource | CompositionLayerSource | TextLayerSource;
interface StudioLayerBase {
  schemaVersion: 1; layerId: LayerId; compositionId: CompositionId; name: string;
  enabled: boolean; locked: boolean; solo: boolean;
  /** Integer microseconds; [startUs, startUs + durationUs) in the parent composition. */
  startUs: number; durationUs: number; sourceOffsetUs: number;
  /** Non-unit/reverse playback needs an explicit future renderer contract. */
  playbackRate: 1; reverse: false; transform: LayerTransform; opacity: number; keyframes: [];
  createdAt: string; updatedAt: string; version: number; approvalState: "DRAFT";
  provenance: EditorialInstructionProvenance;
}
export type StudioLayer = StudioLayerBase & (
  | { type: "VIDEO" | "IMAGE"; source: AssetLayerSource }
  | { type: "NESTED_COMPOSITION"; source: CompositionLayerSource }
  | { type: "TEXT"; source: TextLayerSource; text: StudioTextProperties }
  | { type: "AUDIO"; source: AssetLayerSource; audio: StudioAudioPropertiesV1 }
);
export interface ShotComposition {
  schemaVersion: 1; compositionId: CompositionId; projectId: StudioId<"project">;
  kind: "SHOT" | "PRECOMP"; shotId: StudioId<"shot"> | null; name: string;
  durationUs: number; width: number; height: number;
  /** Canonical painter order: first = bottom, last = top. No competing z-index. */
  layers: StudioLayer[]; revision: number; approvalState: "DRAFT";
  provenance: EditorialInstructionProvenance;
}
export interface EditorialContent {
  schemaVersion: 1; projectId: StudioId<"project">; takes: EditorialTake[];
  selectedTakes: { shotId: StudioId<"shot">; takeId: TakeId }[];
  compositions: ShotComposition[];
}
export interface EditorialContext { projectId: StudioId<"project">; shots: readonly ShotManifest[]; assets: readonly Asset[] }

export class CompositionValidationError extends Error {
  constructor(readonly code: string, message: string) { super(message); this.name = "CompositionValidationError"; }
}
const reject = (message: string): never => { throw new CompositionValidationError("INVALID_COMPOSITION", message); };
function exact(value: unknown, fields: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) return reject("Expected an ordinary editorial object.");
  const result = value as Record<string, unknown>;
  if (Object.keys(result).sort().join(",") !== fields.split(",").sort().join(",")) return reject("Unsupported or missing editorial fields.");
  return result;
}
function bounded(value: unknown, min: number, max: number, integer = false): number {
  if (typeof value !== "number" || !Number.isFinite(value) || Object.is(value, -0) || value < min || value > max || (integer && !Number.isSafeInteger(value))) return reject("Editorial numeric value is outside its supported range.");
  return value;
}
function label(value: unknown, max: number, blank = false): string {
  if (typeof value !== "string" || value.length > max || (!blank && !value.trim()) || /[\u0000-\u001f\u007f]/u.test(value)) return reject("Editorial text is invalid or too long.");
  return value;
}
function timestamp(value: unknown): string {
  if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) return reject("Editorial timestamps must be exact UTC timestamps.");
  return value;
}
function identity<K extends "project" | "shot">(value: unknown, kind: K): StudioId<K> {
  try { assertStudioId(value, kind); } catch { return reject(`Invalid editorial ${kind} binding.`); }
  return value as StudioId<K>;
}
function editorialId<K extends "take" | "composition" | "layer">(value: unknown, kind: K): `${K}_${string}` {
  if (typeof value !== "string" || value.length > 128 || !new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`, "u").test(value)) return reject(`Invalid ${kind} identity.`);
  return value as `${K}_${string}`;
}
function list(value: unknown, max: number): unknown[] { if (!Array.isArray(value) || value.length > max) return reject("Editorial collection exceeds its bound."); return value; }
function bool(value: unknown): boolean { if (typeof value !== "boolean") return reject("Editorial flag must be boolean."); return value; }
function provenance(value: unknown): EditorialInstructionProvenance {
  const v = exact(value, "kind,providerRequests");
  if (v.kind !== "EDITORIAL_INSTRUCTION" || v.providerRequests !== 0) return reject("Editorial edits cannot claim provider execution.");
  return { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 };
}
function schema(value: unknown): 1 { if (value !== 1) return reject("Unsupported editorial schema version."); return 1; }
function draft(value: unknown): "DRAFT" { if (value !== "DRAFT") return reject("Editorial editing does not grant approval."); return "DRAFT"; }
function take(value: unknown): EditorialTake {
  const v = exact(value, "schemaVersion,takeId,projectId,shotId,source,name,createdAt,review"), r = exact(v.review, "state,note,reviewedAt");
  if (r.state !== "UNREVIEWED" && r.state !== "ACCEPTED" && r.state !== "REJECTED") return reject("Unsupported editorial review state.");
  const createdAt = timestamp(v.createdAt), note = label(r.note, STUDIO_COMPOSITION_LIMITS.reviewNote, true), reviewedAt = r.reviewedAt === null ? null : timestamp(r.reviewedAt);
  if (r.state === "UNREVIEWED" ? reviewedAt !== null || note !== "" : reviewedAt === null || reviewedAt < createdAt || !note.trim()) return reject("Editorial review requires a dated, explicit human note.");
  return { schemaVersion: schema(v.schemaVersion), takeId: editorialId(v.takeId, "take"), projectId: identity(v.projectId, "project"), shotId: identity(v.shotId, "shot"), source: validateAssetRef(v.source), name: label(v.name, STUDIO_COMPOSITION_LIMITS.name), createdAt, review: { state: r.state, note, reviewedAt } };
}
function transform(value: unknown): LayerTransform {
  const t = exact(value, "x,y,scaleX,scaleY,rotationDeg,anchorX,anchorY");
  return { x: bounded(t.x, -16_384, 16_384), y: bounded(t.y, -16_384, 16_384), scaleX: bounded(t.scaleX, 0.01, 100), scaleY: bounded(t.scaleY, 0.01, 100), rotationDeg: bounded(t.rotationDeg, -3_600, 3_600), anchorX: bounded(t.anchorX, 0, 1), anchorY: bounded(t.anchorY, 0, 1) };
}
function transformIsDefault(value: LayerTransform): boolean {
  const expected = defaultLayerTransform();
  return (Object.keys(expected) as (keyof LayerTransform)[]).every(key => value[key] === expected[key]);
}
function textProperties(value: unknown): StudioTextProperties {
  const text = exact(value, "text,fontRef,fontSizePx,color");
  if (!STUDIO_TEXT_FONT_REFS.includes(text.fontRef as StudioTextFontRef)) return reject("Text layers must use a supported local font reference.");
  if (typeof text.color !== "string" || !/^#[0-9A-F]{6}$/u.test(text.color)) return reject("Text colour must be canonical uppercase #RRGGBB.");
  return {
    text: label(text.text, 256),
    fontRef: text.fontRef as StudioTextFontRef,
    fontSizePx: bounded(text.fontSizePx, 8, 256, true),
    color: text.color as `#${string}`,
  };
}
function audioProperties(value: unknown, durationUs: number): StudioAudioPropertiesV1 {
  const audio = exact(value, "gainDb,fadeInUs,fadeOutUs,muted");
  const fadeInUs = bounded(audio.fadeInUs, 0, durationUs, true), fadeOutUs = bounded(audio.fadeOutUs, 0, durationUs, true);
  return { gainDb: bounded(audio.gainDb, -60, 12), fadeInUs, fadeOutUs, muted: bool(audio.muted) };
}
function layer(value: unknown): StudioLayer {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) return reject("Expected an ordinary editorial layer.");
  const candidate = value as Record<string, unknown>;
  const common = "schemaVersion,layerId,compositionId,name,type,source,enabled,locked,solo,startUs,durationUs,sourceOffsetUs,playbackRate,reverse,transform,opacity,keyframes,createdAt,updatedAt,version,approvalState,provenance";
  const v = exact(value, common + (candidate.type === "TEXT" ? ",text" : candidate.type === "AUDIO" ? ",audio" : ""));
  if (v.type !== "VIDEO" && v.type !== "IMAGE" && v.type !== "NESTED_COMPOSITION" && v.type !== "TEXT" && v.type !== "AUDIO") return reject("This layer type is not supported by editorial schema v1.");
  const s = exact(v.source, v.type === "NESTED_COMPOSITION" ? "kind,compositionId" : v.type === "TEXT" ? "kind" : "kind,asset,takeId");
  let source: LayerSource;
  if (v.type === "NESTED_COMPOSITION") {
    if (s.kind !== "COMPOSITION") return reject("Nested layer source must reference a composition.");
    source = { kind: "COMPOSITION", compositionId: editorialId(s.compositionId, "composition") };
  } else if (v.type === "TEXT") {
    if (s.kind !== "TEXT") return reject("Text layer source must use the canonical text discriminator.");
    source = { kind: "TEXT" };
  } else {
    if (s.kind !== "ASSET") return reject("Video, image and audio layers must reference immutable assets.");
    source = { kind: "ASSET", asset: validateAssetRef(s.asset), takeId: s.takeId === null ? null : editorialId(s.takeId, "take") };
  }
  if (v.playbackRate !== 1 || v.reverse !== false || list(v.keyframes, 0).length !== 0) return reject("Speed changes, reversal and keyframes are not implemented in schema v1.");
  const createdAt = timestamp(v.createdAt), updatedAt = timestamp(v.updatedAt);
  if (updatedAt < createdAt) return reject("Layer modification cannot predate creation.");
  const sourceOffsetUs = bounded(v.sourceOffsetUs, 0, STUDIO_COMPOSITION_LIMITS.durationUs, true), durationUs = bounded(v.durationUs, 1, STUDIO_COMPOSITION_LIMITS.durationUs, true);
  if ((v.type === "IMAGE" || v.type === "TEXT") && sourceOffsetUs !== 0) return reject("Still-image and text layers have no source-time offset.");
  if (sourceOffsetUs + durationUs > STUDIO_COMPOSITION_LIMITS.durationUs) return reject("Layer source interval exceeds the supported one-hour range.");
  const base = { schemaVersion: schema(v.schemaVersion), layerId: editorialId(v.layerId, "layer"), compositionId: editorialId(v.compositionId, "composition"), name: label(v.name, STUDIO_COMPOSITION_LIMITS.name), enabled: bool(v.enabled), locked: bool(v.locked), solo: bool(v.solo), startUs: bounded(v.startUs, 0, STUDIO_COMPOSITION_LIMITS.durationUs, true), durationUs, sourceOffsetUs, playbackRate: 1 as const, reverse: false as const, transform: transform(v.transform), opacity: bounded(v.opacity, 0, 1), keyframes: [] as [], createdAt, updatedAt, version: bounded(v.version, 1, Number.MAX_SAFE_INTEGER, true), approvalState: draft(v.approvalState), provenance: provenance(v.provenance) };
  if (v.type === "TEXT") return { ...base, type: "TEXT", source: source as TextLayerSource, text: textProperties(v.text) };
  if (v.type === "AUDIO") {
    if ((source as AssetLayerSource).takeId !== null || base.opacity !== 1 || !transformIsDefault(base.transform)) return reject("Audio layers use no take, visual opacity or transform.");
    return { ...base, type: "AUDIO", source: source as AssetLayerSource, audio: audioProperties(v.audio, durationUs) };
  }
  if (v.type === "NESTED_COMPOSITION") return { ...base, type: "NESTED_COMPOSITION", source: source as CompositionLayerSource };
  return { ...base, type: v.type, source: source as AssetLayerSource };
}
function composition(value: unknown): ShotComposition {
  const v = exact(value, "schemaVersion,compositionId,projectId,kind,shotId,name,durationUs,width,height,layers,revision,approvalState,provenance");
  if (v.kind !== "SHOT" && v.kind !== "PRECOMP") return reject("Shot compositions and precomps are distinct from the future sequence timeline.");
  if (v.kind === "PRECOMP" ? v.shotId !== null : v.shotId === null) return reject("Only shot compositions bind a shot identity.");
  const result: ShotComposition = { schemaVersion: schema(v.schemaVersion), compositionId: editorialId(v.compositionId, "composition"), projectId: identity(v.projectId, "project"), kind: v.kind, shotId: v.shotId === null ? null : identity(v.shotId, "shot"), name: label(v.name, STUDIO_COMPOSITION_LIMITS.name), durationUs: bounded(v.durationUs, 1, STUDIO_COMPOSITION_LIMITS.durationUs, true), width: bounded(v.width, 1, STUDIO_COMPOSITION_LIMITS.dimension, true), height: bounded(v.height, 1, STUDIO_COMPOSITION_LIMITS.dimension, true), layers: list(v.layers, STUDIO_COMPOSITION_LIMITS.layersPerComposition).map(layer), revision: bounded(v.revision, 1, Number.MAX_SAFE_INTEGER, true), approvalState: draft(v.approvalState), provenance: provenance(v.provenance) };
  const ids = new Set<string>();
  for (const l of result.layers) {
    if (ids.has(l.layerId) || l.compositionId !== result.compositionId || l.startUs + l.durationUs > result.durationUs) return reject("Layer identity, parent or timing does not match its composition.");
    ids.add(l.layerId);
  }
  return result;
}
export const validateEditorialTake = (value: unknown): EditorialTake => take(cloneStudioJson(value));
export const validateCompositionLayer = (value: unknown): StudioLayer => layer(cloneStudioJson(value));
export const validateShotComposition = (value: unknown): ShotComposition => composition(cloneStudioJson(value));
export function defaultLayerTransform(): LayerTransform { return { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0, anchorX: 0.5, anchorY: 0.5 }; }
export function makeEmptyEditorial(projectId: StudioId<"project">): EditorialContent { return { schemaVersion: 1, projectId: identity(projectId, "project"), takes: [], selectedTakes: [], compositions: [] }; }

/** Context is a previously validated canonical snapshot. Never pass client-supplied context.
 * Validate references against immutable source records, never client-supplied filesystem paths. */
export function validateEditorialContent(value: unknown, context: EditorialContext): EditorialContent {
  const v = exact(cloneStudioJson(value), "schemaVersion,projectId,takes,selectedTakes,compositions");
  const result: EditorialContent = {
    schemaVersion: schema(v.schemaVersion), projectId: identity(v.projectId, "project"),
    takes: list(v.takes, STUDIO_COMPOSITION_LIMITS.takes).map(take),
    selectedTakes: list(v.selectedTakes, STUDIO_COMPOSITION_LIMITS.compositions).map(item => { const s = exact(item, "shotId,takeId"); return { shotId: identity(s.shotId, "shot"), takeId: editorialId(s.takeId, "take") }; }),
    compositions: list(v.compositions, STUDIO_COMPOSITION_LIMITS.compositions).map(composition),
  };
  if (result.projectId !== context.projectId) return reject("Editorial project binding differs.");
  const shots = new Map(context.shots.filter(s => s.projectId === context.projectId).map(s => [s.shotId, s]));
  const assetKey = (a: AssetRef) => `${a.assetId}:${a.version}`;
  const assets = new Map(context.assets.filter(a => a.projectId === context.projectId).map(a => [assetKey(a), a]));
  const resolveAsset = (ref: AssetRef): Asset => { const asset = assets.get(assetKey(ref)); if (!asset || (asset.assetType !== "VIDEO" && asset.assetType !== "IMAGE" && asset.assetType !== "AUDIO")) return reject("Editorial source is missing or has an unsupported media type."); return asset; };
  const takes = new Map<TakeId, EditorialTake>();
  for (const t of result.takes) {
    if (takes.has(t.takeId) || t.projectId !== result.projectId || !shots.has(t.shotId)) return reject("Take identity, project or shot binding differs.");
    const source = resolveAsset(t.source); if (source.assetType === "AUDIO") return reject("Editorial takes must reference visual media."); takes.set(t.takeId, t);
  }
  const selectedShots = new Set<string>();
  for (const selected of result.selectedTakes) {
    const t = takes.get(selected.takeId);
    if (!t || t.shotId !== selected.shotId || selectedShots.has(selected.shotId)) return reject("A shot has one optional editorial preference, referencing its own retained take.");
    selectedShots.add(selected.shotId);
  }
  const compositions = new Map<CompositionId, ShotComposition>(), composedShots = new Set<string>(), layerIds = new Set<string>();
  for (const c of result.compositions) {
    if (compositions.has(c.compositionId) || c.projectId !== result.projectId || (c.shotId !== null && (!shots.has(c.shotId) || composedShots.has(c.shotId)))) return reject("Composition identity, project or canonical shot binding differs.");
    compositions.set(c.compositionId, c); if (c.shotId !== null) composedShots.add(c.shotId);
    for (const l of c.layers) { if (layerIds.has(l.layerId)) return reject("Layer identities are unique across the editorial project."); layerIds.add(l.layerId); }
  }
  for (const c of result.compositions) for (const l of c.layers) {
    if (l.source.kind === "ASSET") {
      const asset = resolveAsset(l.source.asset);
      if (asset.assetType !== l.type) return reject("Layer type differs from its immutable source asset.");
      if (l.source.takeId !== null) {
        const t = takes.get(l.source.takeId);
        if (!t || assetKey(t.source) !== assetKey(l.source.asset) || (c.shotId !== null && t.shotId !== c.shotId)) return reject("Layer take differs from its source asset or shot.");
      }
    } else if (l.source.kind === "COMPOSITION") {
      const nested = compositions.get(l.source.compositionId);
      if (!nested || nested.kind !== "PRECOMP" || l.sourceOffsetUs + l.durationUs > nested.durationUs) return reject("Nested composition is missing, is not a precomp, or is shorter than its used interval.");
    } else if (l.type !== "TEXT") {
      return reject("Only text layers may use the canonical text source.");
    }
  }
  // Memoized longest-path depth validates a shared DAG in O(compositions + layers),
  // rather than expanding every path through repeatedly referenced precompositions.
  const visiting = new Set<CompositionId>(), depths = new Map<CompositionId, number>();
  const visit = (id: CompositionId): number => {
    const known = depths.get(id); if (known !== undefined) return known;
    if (visiting.has(id)) return reject("Composition nesting is circular.");
    visiting.add(id); let depth = 1;
    for (const l of compositions.get(id)!.layers) if (l.source.kind === "COMPOSITION") depth = Math.max(depth, 1 + visit(l.source.compositionId));
    if (depth > STUDIO_COMPOSITION_LIMITS.nestingDepth) return reject("Composition nesting exceeds eight levels.");
    visiting.delete(id); depths.set(id, depth); return depth;
  };
  for (const id of compositions.keys()) visit(id);
  return result;
}

/** No source decoding or rendering occurs here; this is the v1 deterministic visibility contract. */
export function activeCompositionLayers(composition: ShotComposition, timeUs: number): StudioLayer[] {
  bounded(timeUs, 0, composition.durationUs, true);
  const solo = composition.layers.some(l => l.enabled && l.solo);
  return composition.layers.filter(l => l.enabled && (!solo || l.solo) && timeUs >= l.startUs && timeUs < l.startUs + l.durationUs);
}
