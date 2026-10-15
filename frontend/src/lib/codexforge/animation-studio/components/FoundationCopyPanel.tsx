"use client";
import { BlenderSourcePanel } from "./BlenderSourcePanel";

import { useCallback, useEffect, useRef, useState } from "react";
import { setAudioLayerV2Timing, splitLayerV2Time, trimLayerV2Time, validateCompositionV2 } from "../editorial-v2-contract";
import type { CompositionV2, LayerTrimEdge, LayerV2 } from "../editorial-v2-contract";
import { STUDIO_COMPOSITION_LIMITS, validateEditorialTake } from "../composition-contract";
import { editorialAddTime, editorialCompareTime, validateEditorialRational, type EditorialRational } from "../editorial-time";
import { FoundationCopyViewer } from "./FoundationCopyViewer";
import { SavedHeadRenderPanel } from "./SavedHeadRenderPanel";
import styles from "./CompositionPanel.module.css";
import workspaceStyles from "./EditingWorkspace.module.css";

const ENDPOINT = "/api/codexforge/animation-studio/editorial-v2";
const HEADERS = { "X-CodexForge-Animation-Studio": "local-operator-v1" };
const MAX_REQUEST = 32_768, MAX_RESPONSE = 1_048_576;
const HASH = /^[a-f0-9]{64}$/u;
const failureMessages: Record<string, string> = {
  invalid_editorial_v2_request: "The working-copy request was rejected. Check the edit values and saved layer state; its exact recovery request remains retained.",
  editorial_v2_revision_conflict: "The saved working-copy revision or exact request differs. Inspect source status before continuing; no draft has been rebased and the exact request remains retained.",
  editorial_v2_storage_unavailable: "The working copy is unavailable: its original may have changed, or storage could not pass integrity checks. Preserve the exact request; no new copy or automatic rebase is allowed.",
  editorial_v2_body_timeout: "The local service stopped waiting for the request body. Its outcome is not assumed; preserve the exact request for explicit retry.",
  editorial_v2_request_interrupted: "Reading the request was interrupted. Preserve the exact request; it has not been retried automatically.",
  editorial_v2_body_too_large: "The working-copy request exceeds the local 32 KiB limit. Its exact recovery data remains retained.",
  editorial_v2_content_type_required: "The local service rejected the request format. Its exact recovery data remains retained.",
  unsupported_editorial_v2_split: "This saved layer cannot be split exactly. Use a direct-asset video layer with forward unit-rate playback and no keyframes. The exact request remains retained.",
  editorial_v2_history_boundary: "No supported Undo or Redo action is available at the current saved history boundary. Reload the composition before continuing; the exact request remains retained.",
  editorial_v2_source_coverage: "The saved source offset plus duration is not covered by the qualified source. No layer was inserted or replaced; timing has not been altered and the exact request remains retained.",
  editorial_v2_composition_coverage: "The exact layer start plus duration exceeds the saved composition. Shorten or move the layer, or explicitly extend the composition first; nothing was inserted and the exact request remains retained.",
  studio_disabled: "The local Studio is disabled. Retained working-copy requests and drafts have not been cleared.",
};
const transformFields = ["x", "y", "scaleX", "scaleY", "rotationDeg", "anchorX", "anchorY"] as const;
const labels = { x: "Horizontal position", y: "Vertical position", scaleX: "Horizontal scale", scaleY: "Vertical scale", rotationDeg: "Rotation (degrees)", anchorX: "Horizontal anchor", anchorY: "Vertical anchor" };
type Transform = CompositionV2["layers"][number]["transform"];
type TimeText = { numerator: string; denominator: string };
type TextSettings = { text: string; fontRef: "ARIAL_REGULAR"; fontSizePx: number; color: string };
type AudioSettings = { gainDb: number; fadeIn: EditorialRational; fadeOut: EditorialRational; muted: boolean };
type TextValues = { text: string; fontRef: string; fontSizePx: string; color: string };
type AudioValues = { gainDb: string; fadeIn: TimeText; fadeOut: TimeText; muted: boolean };
type Values = { opacity: string; enabled: boolean; transform: Record<keyof Transform, string>; text?: TextValues; audio?: AudioValues; name?: string; audioTiming?: { start: TimeText; duration: TimeText; sourceOffset: TimeText }; timelineStart?: TimeText; timelineTrim?: { edge: LayerTrimEdge; trimPoint: TimeText }; timelineSplit?: { splitPoint: TimeText } };
type Summary = { revision: number; headDigest: string; at: string; integrityScope: string; generationAllowed: false; providerRequests: 0 };
type CatalogueLibrary = "PROJECT_LOCAL_C" | "CONFIGURED_D" | "PROJECT_ASSET_REGISTRY";
type TakeCatalogueItem = { takeId: string; shotId: string; name: string; sourceLabel: string; mediaType: "VIDEO" | "IMAGE"; library: CatalogueLibrary; duration: EditorialRational | null; eligibility: "READY" | "SOURCE_DURATION_UNAVAILABLE"; reason: string | null };
type AudioCatalogueItem = { assetId: string; version: number; sourceLabel: string; library: Exclude<CatalogueLibrary, "PROJECT_ASSET_REGISTRY">; duration: EditorialRational };
type Source = { projectId: string; projectRevision: number; legacyRevision: number; legacyPersisted: boolean; compositions: { compositionId: string; name: string; kind: "SHOT" | "PRECOMP" }[]; takeCatalogue: TakeCatalogueItem[]; audioCatalogue: AudioCatalogueItem[]; workingCopy: { state: "NOT_CREATED" | "READY" | "UNAVAILABLE"; revision: number | null; headDigest: string | null }; providerRequests: 0; generationAllowed: false };
type HistoryOperation = "INSERT_TAKE_LAYER" | "INSERT_TEXT_LAYER" | "INSERT_AUDIO_LAYER" | "REPLACE_LAYER_TAKE" | "SET_LAYER_PROPERTIES" | "SET_AUDIO_LAYER_TIMING" | "MOVE_LAYER_TIME" | "TRIM_LAYER_TIME" | "SPLIT_LAYER_TIME" | "SET_COMPOSITION_DURATION";
type HistoryCommand = "UNDO_EDITORIAL_EDIT" | "REDO_EDITORIAL_EDIT";
type HistoryAction = { available: boolean; command: HistoryCommand; label: string; description: string; targetOperation: HistoryOperation | null; compositionId: string | null; compositionRevision: number | null };
type History = { state: "LEGACY_BOUNDARY" | "ACTIVE"; undo: HistoryAction; redo: HistoryAction };
type View = Summary & { composition: CompositionV2; takes: ReturnType<typeof validateEditorialTake>[]; media: { assetId: string; version: number; status: "UNCHECKED" }[]; nestedCompositionResolution: "NOT_LOADED"; history: History; timelineFrameRate: EditorialRational | null };
type Pending = { projectId: string; key: string; body: string };
type Draft = { projectId: string; compositionId: string; layerId: string; view: View; values: Values };
type DurationDraft = { projectId: string; compositionId: string; view: View; duration: TimeText };
type Props = { workspaceActive?: boolean; projectName?: string; onReturnToProject?: () => void; projectId: string; disabled: boolean; compositionId: string; onCompositionChange: (id: string) => void; onBusyChange: (busy: boolean) => void };
type TimelineAuthority = { headDigest: string; revision: number; compositionRevision: number };
type TextLayer = LayerV2 & { type: "TEXT"; text: TextSettings };
type AudioLayer = LayerV2 & { type: "AUDIO"; audio: AudioSettings };
type InsertKind = "TAKE" | "TEXT" | "AUDIO";
type InsertValues = {
  kind: InsertKind; takeId: string; audioKey: string; start: TimeText; duration: TimeText; sourceOffset: TimeText;
  title: { text: string; fontSizePx: string; color: string; x: string; y: string };
  audio: AudioValues;
};
const pendingKey = (id: string) => `codexforge.studio.editorial.pending.v2.${id}`;
const draftKey = (id: string) => `codexforge.studio.editorial.draft.v2.${id}`;
const durationDraftKey = (id: string) => `codexforge.studio.editorial.duration-draft.v1.${id}`;
const isTextLayer = (layer: LayerV2): layer is TextLayer => (layer as LayerV2 & { type: string }).type === "TEXT";
const isAudioLayer = (layer: LayerV2): layer is AudioLayer => (layer as LayerV2 & { type: string }).type === "AUDIO";
const timeText = (value: EditorialRational): TimeText => ({ numerator: String(value.numerator), denominator: String(value.denominator) });
const newInsertValues = (duration: EditorialRational = { numerator: 1, denominator: 1 }): InsertValues => ({
  kind: "TAKE", takeId: "", audioKey: "", start: { numerator: "0", denominator: "1" }, duration: timeText(duration), sourceOffset: { numerator: "0", denominator: "1" },
  title: { text: "Title", fontSizePx: "64", color: "#FFFFFF", x: "0", y: "0" },
  audio: { gainDb: "0", fadeIn: { numerator: "0", denominator: "1" }, fadeOut: { numerator: "0", denominator: "1" }, muted: false },
});
function exact(value: unknown, keys: string): asserts value is Record<string, unknown> { if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== keys.split(",").sort().join()) throw Error("The local service or saved recovery data has an unsupported shape."); }
function integer(value: unknown, min = 1): asserts value is number { if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < min) throw Error("A saved revision is invalid."); }
function id(value: unknown, kind: string): asserts value is string { if (typeof value !== "string" || !new RegExp(`^${kind}_[a-z0-9_-]{1,128}$`, "u").test(value)) throw Error("A saved identity is invalid."); }
function timestamp(value: unknown): asserts value is string { if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) throw Error("A saved timestamp is invalid."); }
function boundary(value: Record<string, unknown>) { if (value.providerRequests !== 0 || value.generationAllowed !== false) throw Error("The generation-locked response boundary could not be verified."); }
function summary(value: unknown, scope: string): Summary {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("The save result is incomplete.");
  const v = value as Record<string, unknown>; integer(v.revision); timestamp(v.at); boundary(v);
  if (typeof v.headDigest !== "string" || !HASH.test(v.headDigest) || v.integrityScope !== scope) throw Error("The saved working-copy identity could not be verified.");
  return v as unknown as Summary;
}
function sourceResult(value: unknown, projectId: string): Source {
  exact(value, "projectId,projectRevision,legacyRevision,legacyPersisted,compositions,takeCatalogue,audioCatalogue,workingCopy,providerRequests,generationAllowed"); boundary(value);
  if (value.projectId !== projectId || typeof value.legacyPersisted !== "boolean") throw Error("The source project does not match."); integer(value.projectRevision); integer(value.legacyRevision, 0);
  if (value.legacyPersisted !== (value.legacyRevision > 0) || !Array.isArray(value.compositions) || value.compositions.length > 128 || !Array.isArray(value.takeCatalogue) || value.takeCatalogue.length > 128 || !Array.isArray(value.audioCatalogue) || value.audioCatalogue.length > 8) throw Error("The original saved state is incomplete.");
  const seen = new Set<string>(); for (const c of value.compositions) { exact(c, "compositionId,name,kind"); id(c.compositionId, "composition"); if (seen.has(c.compositionId) || typeof c.name !== "string" || c.name.length > 160 || !["SHOT", "PRECOMP"].includes(String(c.kind))) throw Error("The source composition catalogue is invalid."); seen.add(c.compositionId); }
  const takeIds = new Set<string>();
  for (const item of value.takeCatalogue) {
    exact(item, "takeId,shotId,name,sourceLabel,mediaType,library,duration,eligibility,reason"); id(item.takeId, "take"); id(item.shotId, "shot");
    if (takeIds.has(item.takeId) || typeof item.name !== "string" || !item.name.trim() || item.name.length > 160 || typeof item.sourceLabel !== "string" || !item.sourceLabel.trim() || item.sourceLabel.length > 256 || /[\u0000-\u001f\u007f]/u.test(item.name + item.sourceLabel) || !["VIDEO", "IMAGE"].includes(String(item.mediaType)) || !["PROJECT_LOCAL_C", "CONFIGURED_D", "PROJECT_ASSET_REGISTRY"].includes(String(item.library)) || !["READY", "SOURCE_DURATION_UNAVAILABLE"].includes(String(item.eligibility))) throw Error("The saved Take catalogue is invalid.");
    takeIds.add(item.takeId);
    const duration = item.duration === null ? null : validateEditorialRational(item.duration); if (duration?.numerator === 0) throw Error("A Take source duration is invalid.");
    if (item.eligibility === "READY" ? item.reason !== null || (item.mediaType === "VIDEO" && duration === null) : duration !== null || typeof item.reason !== "string" || !item.reason.trim() || item.reason.length > 500 || /[\u0000-\u001f\u007f]/u.test(item.reason)) throw Error("The saved Take eligibility is invalid.");
  }
  const audioIds = new Set<string>();
  for (const item of value.audioCatalogue) {
    exact(item, "assetId,version,sourceLabel,library,duration"); id(item.assetId, "asset"); integer(item.version);
    const key = `${item.assetId}:${item.version}`, duration = validateEditorialRational(item.duration);
    if (audioIds.has(key) || duration.numerator === 0 || typeof item.sourceLabel !== "string" || !item.sourceLabel.trim() || item.sourceLabel.length > 256 || /[\u0000-\u001f\u007f]/u.test(item.sourceLabel) || !["PROJECT_LOCAL_C", "CONFIGURED_D"].includes(String(item.library))) throw Error("The soundtrack catalogue is invalid."); audioIds.add(key);
  }
  const w = value.workingCopy; exact(w, "state,revision,headDigest");
  if (!["NOT_CREATED", "READY", "UNAVAILABLE"].includes(String(w.state))) throw Error("The working-copy state is invalid.");
  if (w.state === "READY") { integer(w.revision); if (typeof w.headDigest !== "string" || !HASH.test(w.headDigest)) throw Error("The working-copy head is invalid."); }
  else if (w.revision !== null || w.headDigest !== null) throw Error("Unavailable state must not claim a saved head.");
  return value as unknown as Source;
}
function historyAction(value: unknown, command: HistoryCommand): HistoryAction {
  exact(value, "available,command,label,description,targetOperation,compositionId,compositionRevision");
  if (typeof value.available !== "boolean" || value.command !== command) throw Error("The saved history action is invalid.");
  for (const field of ["label", "description"] as const) { const copy = value[field]; if (typeof copy !== "string" || !copy.trim() || copy.length > (field === "label" ? 160 : 1000) || /[\u0000-\u001f\u007f]/u.test(copy)) throw Error("The saved history action copy is invalid."); }
  if (value.available) {
    if (!["INSERT_TAKE_LAYER", "INSERT_TEXT_LAYER", "INSERT_AUDIO_LAYER", "REPLACE_LAYER_TAKE", "SET_LAYER_PROPERTIES", "SET_AUDIO_LAYER_TIMING", "MOVE_LAYER_TIME", "TRIM_LAYER_TIME", "SPLIT_LAYER_TIME", "SET_COMPOSITION_DURATION"].includes(String(value.targetOperation))) throw Error("The saved history target is unsupported.");
    id(value.compositionId, "composition"); integer(value.compositionRevision);
  } else if (value.targetOperation !== null || value.compositionId !== null || value.compositionRevision !== null) throw Error("An unavailable history action cannot claim a target.");
  return value as unknown as HistoryAction;
}
function historyResult(value: unknown): History {
  exact(value, "state,undo,redo");
  if (value.state !== "LEGACY_BOUNDARY" && value.state !== "ACTIVE") throw Error("The saved history state is invalid.");
  return { state: value.state, undo: historyAction(value.undo, "UNDO_EDITORIAL_EDIT"), redo: historyAction(value.redo, "REDO_EDITORIAL_EDIT") };
}
function viewResult(value: unknown, projectId: string, compositionId: string, allowLegacyDraft = false): View {
  const normalized = allowLegacyDraft && value && typeof value === "object" && !Array.isArray(value) && !Object.hasOwn(value, "timelineFrameRate")
    ? { ...(value as Record<string, unknown>), timelineFrameRate: null }
    : value;
  exact(normalized, "revision,headDigest,at,integrityScope,generationAllowed,providerRequests,composition,takes,media,nestedCompositionResolution,history,timelineFrameRate");
  const s = summary(normalized, "SELECTED_COMPOSITION_DIRECT_REFERENCES_AND_ACTIVE_HISTORY"), composition = validateCompositionV2(normalized.composition);
  if (composition.projectId !== projectId || composition.compositionId !== compositionId || normalized.nestedCompositionResolution !== "NOT_LOADED" || !Array.isArray(normalized.takes) || !Array.isArray(normalized.media) || normalized.takes.length > 512 || normalized.media.length > 512) throw Error("The selected composition result does not match.");
  let timelineFrameRate: EditorialRational | null = null;
  if (normalized.timelineFrameRate !== null) {
    timelineFrameRate = validateEditorialRational(normalized.timelineFrameRate);
    if (timelineFrameRate.denominator !== 1 || ![24, 25, 30, 50, 60].includes(timelineFrameRate.numerator)) throw Error("The selected composition frame rate is unsupported.");
  }
  const takes = normalized.takes.map(validateEditorialTake), takeIds = new Set<string>(), mediaIds = new Set<string>();
  for (const take of takes) { if (take.projectId !== projectId || takeIds.has(take.takeId)) throw Error("A Take is incorrectly bound."); takeIds.add(take.takeId); }
  for (const media of normalized.media) { exact(media, "assetId,version,status"); id(media.assetId, "asset"); integer(media.version); if (media.status !== "UNCHECKED" || mediaIds.has(`${media.assetId}:${media.version}`)) throw Error("Media was incorrectly described as verified."); mediaIds.add(`${media.assetId}:${media.version}`); }
  const expectedMedia = new Set<string>(), expectedTakes = new Set<string>();
  for (const layer of composition.layers) if (layer.source.kind === "ASSET") {
    const ref = layer.source.asset; expectedMedia.add(`${ref.assetId}:${ref.version}`);
    if (layer.source.takeId) { const takeId = layer.source.takeId; expectedTakes.add(takeId); const take = takes.find(t => t.takeId === takeId); if (!take || take.source.assetId !== ref.assetId || take.source.version !== ref.version || (composition.shotId !== null && take.shotId !== composition.shotId)) throw Error("A layer's immutable Take does not match."); }
  }
  if (expectedMedia.size !== mediaIds.size || [...expectedMedia].some(key => !mediaIds.has(key)) || expectedTakes.size !== takeIds.size || [...expectedTakes].some(key => !takeIds.has(key))) throw Error("The selected reference set is incomplete.");
  return { ...s, composition, takes, media: normalized.media as View["media"], nestedCompositionResolution: "NOT_LOADED", history: historyResult(normalized.history), timelineFrameRate };
}
function finite(value: unknown, min: number, max: number): asserts value is number { if (typeof value !== "number" || !Number.isFinite(value) || Object.is(value, -0) || value < min || value > max) throw Error("A property is outside its supported range."); }
function changes(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("Layer changes are invalid.");
  const fields = Object.keys(value);
  if (!fields.length || fields.some(field => !["name", "opacity", "enabled", "transform", "text", "audio"].includes(field))) throw Error("Layer changes are unsupported.");
  if (Object.hasOwn(value, "text") && Object.hasOwn(value, "audio")) throw Error("One property request cannot mix text and audio settings.");
  exact(value, fields.join(","));
  if (Object.hasOwn(value, "name") && (typeof value.name !== "string" || !value.name.trim() || value.name.length > STUDIO_COMPOSITION_LIMITS.name || /[\u0000-\u001f\u007f]/u.test(value.name))) throw Error("Use a readable occurrence name of at most 160 characters.");
  if (Object.hasOwn(value, "opacity")) finite(value.opacity, 0, 1);
  if (Object.hasOwn(value, "enabled") && typeof value.enabled !== "boolean") throw Error("Enabled must be a boolean.");
  if (Object.hasOwn(value, "transform")) {
    exact(value.transform, transformFields.join(",")); const t = value.transform;
    for (const field of transformFields) { const range = field.startsWith("scale") ? [0.01, 100] : field.startsWith("anchor") ? [0, 1] : field === "rotationDeg" ? [-3600, 3600] : [-16384, 16384]; finite(t[field], range[0], range[1]); }
  }
  if (Object.hasOwn(value, "text")) {
    exact(value.text, "text,fontRef,fontSizePx,color");
    if (typeof value.text.text !== "string" || !value.text.text.trim() || value.text.text.length > 256 || /[\u0000-\u001f\u007f]/u.test(value.text.text) || value.text.fontRef !== "ARIAL_REGULAR" || typeof value.text.fontSizePx !== "number" || !Number.isSafeInteger(value.text.fontSizePx) || value.text.fontSizePx < 8 || value.text.fontSizePx > 256 || typeof value.text.color !== "string" || !/^#[0-9A-F]{6}$/u.test(value.text.color)) throw Error("Text properties are outside their supported bounds.");
  }
  if (Object.hasOwn(value, "audio")) {
    exact(value.audio, "gainDb,fadeIn,fadeOut,muted"); finite(value.audio.gainDb, -60, 12);
    if (typeof value.audio.muted !== "boolean") throw Error("Audio mute must be a boolean.");
    validateEditorialRational(value.audio.fadeIn); validateEditorialRational(value.audio.fadeOut);
  }
}
function requestBody(value: unknown, projectId: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("Recovery request is invalid."); const v = value as Record<string, unknown>;
  if (v.operation === "COPY_V1_TO_V2") { exact(v, "operation,projectId,expectedProjectRevision,expectedEditorialRevision,requestedAt"); integer(v.expectedProjectRevision); integer(v.expectedEditorialRevision); }
  else if (v.operation === "INSERT_TAKE_LAYER") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,takeId,start,duration,sourceOffset"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.takeId, "take"); validateEditorialRational(v.start); if (validateEditorialRational(v.duration).numerator === 0) throw Error("Insertion duration must be positive."); validateEditorialRational(v.sourceOffset); }
  else if (v.operation === "INSERT_TEXT_LAYER") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,start,duration,text,transform"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); validateEditorialRational(v.start); if (validateEditorialRational(v.duration).numerator === 0) throw Error("Insertion duration must be positive."); changes({ opacity: 1, enabled: true, transform: v.transform, text: v.text }); }
  else if (v.operation === "INSERT_AUDIO_LAYER") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,assetId,version,start,duration,sourceOffset,audio"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.assetId, "asset"); integer(v.version); validateEditorialRational(v.start); if (validateEditorialRational(v.duration).numerator === 0) throw Error("Insertion duration must be positive."); validateEditorialRational(v.sourceOffset); changes({ opacity: 1, enabled: true, transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0, anchorX: 0.5, anchorY: 0.5 }, audio: v.audio }); }
  else if (v.operation === "SET_LAYER_PROPERTIES") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,changes"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.layerId, "layer"); changes(v.changes); }
  else if (v.operation === "REPLACE_LAYER_TAKE") { exact(v, "operation,projectId,expectedRevision,expectedHeadDigest,expectedCompositionRevision,compositionId,layerId,requestedAt,takeId"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); if (typeof v.expectedHeadDigest !== "string" || !HASH.test(v.expectedHeadDigest)) throw Error("Replacement head is invalid."); id(v.compositionId, "composition"); id(v.layerId, "layer"); id(v.takeId, "take"); }
  else if (v.operation === "MOVE_LAYER_TIME") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,start"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.layerId, "layer"); validateEditorialRational(v.start); }
  else if (v.operation === "SET_AUDIO_LAYER_TIMING") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,start,duration,sourceOffset"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.layerId, "layer"); validateEditorialRational(v.start); if (!validateEditorialRational(v.duration).numerator) throw Error("Audio duration must be positive."); validateEditorialRational(v.sourceOffset); }
  else if (v.operation === "TRIM_LAYER_TIME") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,edge,trimPoint"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.layerId, "layer"); if (v.edge !== "IN" && v.edge !== "OUT") throw Error("Recovery trim edge is invalid."); validateEditorialRational(v.trimPoint); }
  else if (v.operation === "SPLIT_LAYER_TIME") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,splitPoint"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); id(v.layerId, "layer"); validateEditorialRational(v.splitPoint); }
  else if (v.operation === "SET_COMPOSITION_DURATION") { exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,duration"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); id(v.compositionId, "composition"); validateEditorialRational(v.duration); }
  else if (v.operation === "UNDO_EDITORIAL_EDIT" || v.operation === "REDO_EDITORIAL_EDIT") { exact(v, "operation,projectId,expectedRevision,expectedHeadDigest,expectedCompositionRevision,compositionId,requestedAt"); integer(v.expectedRevision); integer(v.expectedCompositionRevision); if (typeof v.expectedHeadDigest !== "string" || !HASH.test(v.expectedHeadDigest)) throw Error("Recovery history head is invalid."); id(v.compositionId, "composition"); }
  else throw Error("This recovery operation is unsupported.");
  if (v.projectId !== projectId) throw Error("Recovery belongs to another project."); timestamp(v.requestedAt); return v;
}
function parsePending(raw: string, projectId: string): Pending {
  if (new TextEncoder().encode(raw).length > MAX_REQUEST * 2) throw Error("Recovery request is too large."); const p = JSON.parse(raw); exact(p, "projectId,key,body");
  if (p.projectId !== projectId || typeof p.key !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(p.key) || typeof p.body !== "string" || new TextEncoder().encode(p.body).length > MAX_REQUEST) throw Error("Recovery request is invalid.");
  const body = requestBody(JSON.parse(p.body), projectId); if (JSON.stringify(body) !== p.body) throw Error("Recovery request bytes are noncanonical."); return p as Pending;
}
function layerValues(layer: CompositionV2["layers"][number]): Values {
  const common: Values = { opacity: String(layer.opacity), enabled: layer.enabled, transform: Object.fromEntries(transformFields.map(field => [field, String(layer.transform[field])])) as Values["transform"] };
  if (isTextLayer(layer)) common.text = { text: layer.text.text, fontRef: layer.text.fontRef, fontSizePx: String(layer.text.fontSizePx), color: layer.text.color };
  if (isAudioLayer(layer)) { common.name = layer.name; common.audio = { gainDb: String(layer.audio.gainDb), fadeIn: { numerator: String(layer.audio.fadeIn.numerator), denominator: String(layer.audio.fadeIn.denominator) }, fadeOut: { numerator: String(layer.audio.fadeOut.numerator), denominator: String(layer.audio.fadeOut.denominator) }, muted: layer.audio.muted }; }
  return common;
}
function splitUnavailability(layer: LayerV2, layerCount: number): string | null {
  if (layer.locked) return "This saved layer is locked. Exact split cannot modify or unlock it.";
  if (layer.type !== "VIDEO" || layer.source.kind !== "ASSET") return "Exact split is currently available only for a direct-asset video layer. Still images and nested compositions remain unchanged.";
  if (layer.playbackRate !== 1 || layer.reverse || layer.keyframes.length !== 0) return "Exact split is unavailable for retimed, reversed or animated layers because those timing relationships cannot yet be preserved safely.";
  if (layerCount >= STUDIO_COMPOSITION_LIMITS.layersPerComposition) return `Exact split would exceed the ${STUDIO_COMPOSITION_LIMITS.layersPerComposition}-layer composition limit, so no split can be saved.`;
  return null;
}
function parseValues(value: unknown, layer: CompositionV2["layers"][number], layerCount: number): Values {
  const moving = !!value && typeof value === "object" && Object.hasOwn(value, "timelineStart");
  const trimming = !!value && typeof value === "object" && Object.hasOwn(value, "timelineTrim");
  const splitting = !!value && typeof value === "object" && Object.hasOwn(value, "timelineSplit");
  const audioTiming = !!value && typeof value === "object" && Object.hasOwn(value, "audioTiming");
  const named = !!value && typeof value === "object" && Object.hasOwn(value, "name");
  if ([moving, trimming, splitting, audioTiming].filter(Boolean).length > 1) throw Error("A local draft cannot mix timing operations.");
  const typeField = isTextLayer(layer) ? ",text" : isAudioLayer(layer) ? ",audio" : "";
  exact(value, `opacity,enabled,transform${typeField}${named ? ",name" : ""}${moving ? ",timelineStart" : trimming ? ",timelineTrim" : splitting ? ",timelineSplit" : audioTiming ? ",audioTiming" : ""}`); exact(value.transform, transformFields.join(","));
  if (named && (!isAudioLayer(layer) || typeof value.name !== "string" || value.name.length > STUDIO_COMPOSITION_LIMITS.name)) throw Error("Local occurrence name is invalid.");
  if (typeof value.opacity !== "string" || value.opacity.length > 80 || typeof value.enabled !== "boolean" || transformFields.some(field => typeof (value.transform as Record<string, unknown>)[field] !== "string" || String((value.transform as Record<string, unknown>)[field]).length > 80)) throw Error("Local property draft is invalid.");
  if (isTextLayer(layer)) {
    exact(value.text, "text,fontRef,fontSizePx,color");
    if (typeof value.text.text !== "string" || value.text.text.length > 256 || typeof value.text.fontRef !== "string" || value.text.fontRef.length > 64 || typeof value.text.fontSizePx !== "string" || value.text.fontSizePx.length > 80 || typeof value.text.color !== "string" || value.text.color.length > 32) throw Error("Local text draft is invalid.");
  }
  if (isAudioLayer(layer)) {
    exact(value.audio, "gainDb,fadeIn,fadeOut,muted");
    if (typeof value.audio.gainDb !== "string" || value.audio.gainDb.length > 80 || typeof value.audio.muted !== "boolean") throw Error("Local audio draft is invalid.");
    for (const fade of [value.audio.fadeIn, value.audio.fadeOut]) { exact(fade, "numerator,denominator"); if (Object.values(fade).some(part => typeof part !== "string" || part.length > 16)) throw Error("Local audio fade draft is invalid."); }
  }
  if (moving) {
    exact(value.timelineStart, "numerator,denominator");
    if (Object.values(value.timelineStart).some(part => typeof part !== "string" || part.length > 16)) throw Error("Local timing draft is invalid.");
  }
  if (trimming) {
    exact(value.timelineTrim, "edge,trimPoint");
    if (value.timelineTrim.edge !== "IN" && value.timelineTrim.edge !== "OUT") throw Error("Local trim edge is invalid.");
    exact(value.timelineTrim.trimPoint, "numerator,denominator");
    if (Object.values(value.timelineTrim.trimPoint).some(part => typeof part !== "string" || part.length > 16)) throw Error("Local trim draft is invalid.");
  }
  if (splitting) {
    if (splitUnavailability(layer, layerCount)) throw Error("This layer cannot safely restore an exact split draft.");
    exact(value.timelineSplit, "splitPoint"); exact(value.timelineSplit.splitPoint, "numerator,denominator");
    if (Object.values(value.timelineSplit.splitPoint).some(part => typeof part !== "string" || part.length > 16)) throw Error("Local split draft is invalid.");
  }
  if (audioTiming) {
    if (!isAudioLayer(layer)) throw Error("Exact audio timing belongs only to an AUDIO occurrence.");
    exact(value.audioTiming, "start,duration,sourceOffset");
    for (const field of ["start", "duration", "sourceOffset"]) { exact(value.audioTiming[field], "numerator,denominator"); if (Object.values(value.audioTiming[field]).some(part => typeof part !== "string" || part.length > 16)) throw Error("Local exact audio timing is invalid."); }
  }
  if (moving || trimming || splitting || audioTiming) {
    const original = layerValues(layer);
    if ((named && value.name !== original.name) || value.opacity !== original.opacity || value.enabled !== original.enabled || transformFields.some(field => (value.transform as Record<string, unknown>)[field] !== original.transform[field]) || JSON.stringify(value.text ?? null) !== JSON.stringify(original.text ?? null) || JSON.stringify(value.audio ?? null) !== JSON.stringify(original.audio ?? null)) throw Error("A timing draft cannot also change properties.");
  }
  return value as unknown as Values;
}
function valueKind(value: Values | null | undefined): "PROPERTIES" | "MOVE" | "TRIM" | "SPLIT" | "AUDIO_TIMING" { return value?.timelineStart ? "MOVE" : value?.timelineTrim ? "TRIM" : value?.timelineSplit ? "SPLIT" : value?.audioTiming ? "AUDIO_TIMING" : "PROPERTIES"; }
function parseExactTime(parts: TimeText, subject: string) {
  if (![parts.numerator, parts.denominator].every(part => /^(?:0|[1-9]\d*)$/u.test(part))) throw Error(`Enter whole nonnegative integers for the exact ${subject}. Blank values are not zero.`);
  try { return validateEditorialRational({ numerator: Number(parts.numerator), denominator: Number(parts.denominator) }); }
  catch { throw Error("Use a reduced fraction with safe whole numbers and a positive denominator, for example 1 / 3. Zero is 0 / 1."); }
}
const exactTime = (value: { numerator: number; denominator: number }) => `${value.numerator} / ${value.denominator} seconds`;
const libraryLabel = (value: CatalogueLibrary) => value === "PROJECT_LOCAL_C" ? "project-local C: media library" : value === "CONFIGURED_D" ? "configured D: media library" : "project asset registry";
function parseNumber(text: string, subject: string, minimum: number, maximum: number): number {
  if (!/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/u.test(text)) throw Error(`Enter a complete finite number for ${subject}. Blank values are not zero.`);
  const value = Number(text); if (!Number.isFinite(value) || Object.is(value, -0) || value < minimum || value > maximum) throw Error(`${subject} must be between ${minimum} and ${maximum}.`); return value;
}
function parsedChanges(value: Values, layer: LayerV2) {
  const number = (text: string) => { if (!/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/u.test(text)) throw Error("Enter a complete finite number for each property. Blank values are not zero."); return Number(text); };
  const t = value.transform, transform: Transform = { x: number(t.x), y: number(t.y), scaleX: number(t.scaleX), scaleY: number(t.scaleY), rotationDeg: number(t.rotationDeg), anchorX: number(t.anchorX), anchorY: number(t.anchorY) };
  const result: { name?: string; opacity?: number; enabled: boolean; transform?: Transform; text?: TextSettings; audio?: AudioSettings } = isAudioLayer(layer) ? { name: value.name ?? layer.name, enabled: value.enabled } : { opacity: number(value.opacity), enabled: value.enabled, transform };
  if (isTextLayer(layer)) {
    if (!value.text || !/^(?:0|[1-9]\d*)$/u.test(value.text.fontSizePx)) throw Error("Enter a whole-number text size between 8 and 256 pixels.");
    result.text = { text: value.text.text, fontRef: value.text.fontRef as "ARIAL_REGULAR", fontSizePx: Number(value.text.fontSizePx), color: value.text.color };
  }
  if (isAudioLayer(layer)) {
    if (!value.audio) throw Error("The audio property draft is incomplete.");
    const fadeIn = parseExactTime(value.audio.fadeIn, "fade-in duration"), fadeOut = parseExactTime(value.audio.fadeOut, "fade-out duration");
    if (editorialCompareTime(fadeIn, layer.duration) > 0 || editorialCompareTime(fadeOut, layer.duration) > 0) throw Error("Each audio fade duration must fit inside the saved audio layer duration.");
    result.audio = { gainDb: number(value.audio.gainDb), fadeIn, fadeOut, muted: value.audio.muted };
  }
  changes(result); return result;
}
function store(key: string, value: unknown) { const raw = JSON.stringify(value); if (new TextEncoder().encode(raw).length > MAX_RESPONSE) throw Error("Local recovery data exceeds its safe bound."); sessionStorage.setItem(key, raw); if (sessionStorage.getItem(key) !== raw) throw Error("Browser storage did not retain recovery data."); }
function remove(key: string) { sessionStorage.removeItem(key); if (sessionStorage.getItem(key) !== null) throw Error("Browser storage did not clear acknowledged recovery data."); }
async function responseResult(response: Response): Promise<unknown> {
  const reader = response.body?.getReader(); if (!reader) throw Error("The local response body is missing.");
  const chunks: Uint8Array[] = []; let length = 0;
  try {
    for (;;) {
      const part = await reader.read(); if (part.done) break; length += part.value.byteLength;
      if (length > MAX_RESPONSE || chunks.length >= 4096) { await reader.cancel(); throw Error("The local response exceeds its bounded size."); }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const payload = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
  if (!response.ok || payload?.ok !== true) throw Error((typeof payload?.error?.code === "string" && Object.hasOwn(failureMessages, payload.error.code) ? failureMessages[payload.error.code] : null) ?? "The working-copy request could not be confirmed. Its exact recovery request, if any, remains retained.");
  exact(payload, "ok,result,generation,providerRequests"); if (payload.generation !== "LOCKED" || payload.providerRequests !== 0) throw Error("The local response did not preserve the generation lock."); return payload.result;
}

function replacementUnavailability(layer: LayerV2 | undefined, take: TakeCatalogueItem | null): string | null {
  if (!layer) return "Select one saved video layer before choosing a replacement Take.";
  if (layer.locked) return "This saved layer is locked and cannot be replaced.";
  if (layer.type !== "VIDEO" || layer.source.kind !== "ASSET" || layer.playbackRate !== 1 || layer.reverse || layer.keyframes.length !== 0) return "Replacement supports direct-asset video layers with forward unit-rate playback and no keyframes only.";
  if (!take) return "Choose a saved video Take from this shot. Choosing it does not change the timeline.";
  if (take.mediaType !== "VIDEO" || take.eligibility !== "READY" || !take.duration) return take.reason ?? "The replacement needs a qualified video source duration.";
  if (layer.source.takeId === take.takeId) return "This layer already uses the selected Take.";
  if (editorialCompareTime(editorialAddTime(layer.sourceOffset, layer.duration), take.duration) > 0) return "This Take is too short for the saved source offset plus duration. Replacement is rejected; no trimming, stretching, looping or timing changes occur.";
  return null;
}

export function FoundationCopyPanel({ projectId, disabled, compositionId, onCompositionChange, onBusyChange, workspaceActive = true, projectName, onReturnToProject }: Props) {
  const [viewerMode, setViewerMode] = useState<"working" | "output">("working");
  const [sidePanel, setSidePanel] = useState<"inspector" | "export">("inspector");
  const [catalogueOpen, setCatalogueOpen] = useState(false), [precisionOpen, setPrecisionOpen] = useState(false);
  const [source, setSource] = useState<Source | null>(null), [view, setView] = useState<View | null>(null), [layerId, setLayerId] = useState("");
  const [values, setValues] = useState<Values | null>(null), [dirty, setDirty] = useState(false), [working, setWorking] = useState(false), [ready, setReady] = useState(false);
  const [durationValues, setDurationValues] = useState<TimeText | null>(null), [durationDirty, setDurationDirty] = useState(false);
  const [pending, setPending] = useState<Pending | null>(null), [recoveryIssue, setRecoveryIssue] = useState(""), [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState(""), [notice, setNotice] = useState(""), [consent, setConsent] = useState(false), [gestureActive, setGestureActive] = useState(false);
  const [renderRecoveryBlocked, setRenderRecoveryBlocked] = useState(false);
  const [nativeBusy, setNativeBusy] = useState(false);
  const [renderActivity, setRenderActivity] = useState(false);
  const [trimPreferredEdge, setTrimPreferredEdge] = useState<LayerTrimEdge>("IN");
  const [insertValues, setInsertValues] = useState<InsertValues>(() => newInsertValues());
  const [replacementChoice, setReplacementChoice] = useState<{ layerId: string; headDigest: string; takeId: string } | null>(null);
  const mounted = useRef(false), active = useRef<AbortController | null>(null), pendingRef = useRef<Pending | null>(null), draftRef = useRef<Draft | null>(null), dirtyRef = useRef(false), durationDraftRef = useRef<DurationDraft | null>(null), durationDirtyRef = useRef(false);
  const loadButton = useRef<HTMLButtonElement | null>(null), sourceSummary = useRef<HTMLElement | null>(null), trimPointInput = useRef<HTMLInputElement | null>(null), focusLoadAfterCommit = useRef(false), focusTrimAfterProposal = useRef(false);
  const unsaved = dirty || durationDirty;
  const busy = !ready || working || unsaved || pending !== null || !!recoveryIssue || gestureActive || renderRecoveryBlocked || nativeBusy;
  const refresh = useCallback(async () => {
    if (active.current) return; const controller = new AbortController(); active.current = controller; setWorking(true); setError(""); const timer = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(`${ENDPOINT}?${new URLSearchParams({ projectId })}`, { credentials: "same-origin", cache: "no-store", headers: HEADERS, signal: controller.signal });
      const next = sourceResult(await responseResult(response), projectId); if (!mounted.current || controller.signal.aborted) return;
      setSource(next); setUnavailable(next.workingCopy.state === "UNAVAILABLE");
      if (next.workingCopy.state === "UNAVAILABLE") setError("This source-bound copy is unavailable or its original has changed. No automatic migration or rebase is allowed. Retained edits and requests have not been cleared.");
      else if ((draftRef.current && next.workingCopy.headDigest !== draftRef.current.view.headDigest) || (durationDraftRef.current && next.workingCopy.headDigest !== durationDraftRef.current.view.headDigest)) { setUnavailable(true); setError("The saved working copy changed while local edits were retained. Those edits have not been rebased. Discard only the local draft explicitly before loading newer instructions."); }
      else setNotice("Source status checked. No working copy was created, no media was fetched, and no save was retried.");
    } catch (cause) { if (mounted.current) { setUnavailable(true); setError(controller.signal.aborted ? "Stopped waiting for source status. The working copy is read-only until status can be checked; retained requests and drafts are unchanged." : cause instanceof Error ? cause.message : "Source status is unavailable."); } }
    finally { window.clearTimeout(timer); if (active.current === controller) { active.current = null; if (mounted.current) setWorking(false); } }
  }, [projectId]);
  useEffect(() => {
    mounted.current = true;
    const timer = window.setTimeout(() => {
      try {
        const rawPending = sessionStorage.getItem(pendingKey(projectId)); if (rawPending) { const p = parsePending(rawPending, projectId); pendingRef.current = p; setPending(p); }
        const rawDraft = sessionStorage.getItem(draftKey(projectId)), rawDurationDraft = sessionStorage.getItem(durationDraftKey(projectId));
        if (rawDraft && rawDurationDraft) throw Error("Only one local editorial draft can be active at a time.");
        if (rawDraft) {
          if (new TextEncoder().encode(rawDraft).length > MAX_RESPONSE) throw Error("Local draft is too large."); const d = JSON.parse(rawDraft); exact(d, "projectId,compositionId,layerId,view,values");
          if (d.projectId !== projectId || d.compositionId !== compositionId) throw Error("Local draft does not match the retained composition selection."); id(d.layerId, "layer");
          const saved = viewResult(d.view, projectId, compositionId, true), layer = saved.composition.layers.find(item => item.layerId === d.layerId); if (!layer || layer.locked) throw Error("Local draft layer is missing or locked.");
          const restored: Draft = { projectId, compositionId, layerId: d.layerId, view: saved, values: parseValues(d.values, layer, saved.composition.layers.length) }; draftRef.current = restored; dirtyRef.current = true; setDirty(true); setView(saved); setLayerId(restored.layerId); setValues(restored.values); setTrimPreferredEdge(restored.values.timelineTrim?.edge ?? "IN");
        }
        if (rawDurationDraft) {
          if (new TextEncoder().encode(rawDurationDraft).length > MAX_RESPONSE) throw Error("Local duration draft is too large."); const d = JSON.parse(rawDurationDraft); exact(d, "projectId,compositionId,view,duration");
          if (d.projectId !== projectId || d.compositionId !== compositionId) throw Error("Local duration draft does not match the retained composition selection."); exact(d.duration, "numerator,denominator");
          if (Object.values(d.duration).some(part => typeof part !== "string" || part.length > 16)) throw Error("Local duration draft is invalid.");
          const saved = viewResult(d.view, projectId, compositionId, true), restored: DurationDraft = { projectId, compositionId, view: saved, duration: d.duration as TimeText };
          durationDraftRef.current = restored; durationDirtyRef.current = true; setDurationDirty(true); setDurationValues(restored.duration); setView(saved);
        }
        setReady(true); void refresh();
      } catch { setRecoveryIssue("Saved working-copy recovery data could not be read safely. Nothing has been submitted automatically. Keep this tab and resolve browser storage; do not delete unresolved recovery data."); setReady(true); }
    }, 0);
    return () => { mounted.current = false; window.clearTimeout(timer); active.current?.abort(); active.current = null; };
    // Composition selection is immutable during initialization; later selection changes must not rehydrate or reset a draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, refresh]);
  useEffect(() => { onBusyChange(busy); }, [busy, onBusyChange]);
  useEffect(() => { if (!unsaved && !pending && !recoveryIssue && !renderRecoveryBlocked) return; const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [unsaved, pending, recoveryIssue, renderRecoveryBlocked]);
  const locked = disabled || !ready || working || pending !== null || !!recoveryIssue || unavailable || renderRecoveryBlocked;
  const controlsLocked = locked || gestureActive || nativeBusy;
  useEffect(() => {
    if (!focusLoadAfterCommit.current || locked || view || !compositionId || source?.workingCopy.state !== "READY" || !loadButton.current) return;
    // History navigation removes the focused Undo/Redo button. Defer the handoff
    // until after the browser has completed that removal and its native fallback,
    // otherwise focus can still settle on the document body on a fast response.
    const timer = window.setTimeout(() => {
      const target = loadButton.current;
      if (!focusLoadAfterCommit.current || !target || target.disabled) return;
      focusLoadAfterCommit.current = false;
      target.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [compositionId, locked, source?.workingCopy.state, view]);
  const selectedLayer = view?.composition.layers.find(layer => layer.layerId === layerId);
  const selectedTextLayer = selectedLayer && isTextLayer(selectedLayer) ? selectedLayer : null;
  const selectedAudioLayer = selectedLayer && isAudioLayer(selectedLayer) ? selectedLayer : null;
  const compatibleTakes = source?.takeCatalogue.filter(item => view?.composition.shotId !== null && item.shotId === view?.composition.shotId) ?? [];
  const selectedTake = compatibleTakes.find(item => item.takeId === insertValues.takeId) ?? null;
  const replacementTake = replacementChoice && replacementChoice.layerId === layerId && replacementChoice.headDigest === view?.headDigest ? compatibleTakes.find(item => item.takeId === replacementChoice.takeId) ?? null : null;
  const replacementReason = unsaved ? "Save or discard the unsaved edit before replacing a Take." : renderActivity ? "Wait for the export activity to finish before replacing a Take." : controlsLocked ? "Resolve the active operation, gesture or retained request before replacing a Take." : replacementUnavailability(selectedLayer, replacementTake);
  const selectedAudio = source?.audioCatalogue.find(item => `${item.assetId}:${item.version}` === insertValues.audioKey) ?? null;
  const moving = values?.timelineStart !== undefined;
  const trimming = values?.timelineTrim !== undefined, splitting = values?.timelineSplit !== undefined, audioTiming = values?.audioTiming !== undefined, timing = moving || trimming || splitting || audioTiming;
  const savedAudioLayers = view?.composition.layers.filter(isAudioLayer) ?? [];
  const hasSavedSolo = view?.composition.layers.some(layer => layer.enabled && layer.solo) ?? false;
  const selectedEnd = selectedLayer ? editorialAddTime(selectedLayer.start, selectedLayer.duration) : null;
  let moveDraftStart: EditorialRational | null = null, moveDraftEnd: EditorialRational | null = null;
  if (moving && values?.timelineStart && selectedLayer && view) {
    try {
      const candidate = parseExactTime(values.timelineStart, "start time");
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(layer => layer.layerId === selectedLayer.layerId ? { ...layer, start: candidate } : layer) });
      moveDraftEnd = editorialAddTime(candidate, selectedLayer.duration); moveDraftStart = candidate;
    } catch { /* Invalid or incomplete numeric drafts remain recoverable without becoming a visual proposal. */ }
  }
  const trimEdge: LayerTrimEdge = values?.timelineTrim?.edge ?? trimPreferredEdge;
  const trimDefault = selectedLayer && selectedEnd ? trimEdge === "IN" ? selectedLayer.start : selectedEnd : null;
  let trimDraftTiming: { edge: LayerTrimEdge; trimPoint: EditorialRational; start: EditorialRational; duration: EditorialRational; sourceOffset: EditorialRational; end: EditorialRational } | null = null;
  if (trimming && selectedLayer && values?.timelineTrim && view) {
    try {
      const trimPoint = parseExactTime(values.timelineTrim.trimPoint, "trim point"), trimmed = trimLayerV2Time(selectedLayer, values.timelineTrim.edge, trimPoint);
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(layer => layer.layerId === selectedLayer.layerId ? { ...layer, ...trimmed } : layer) });
      trimDraftTiming = { edge: values.timelineTrim.edge, trimPoint, ...trimmed, end: editorialAddTime(trimmed.start, trimmed.duration) };
    } catch { /* Invalid or incomplete exact fields remain recoverable without becoming a visual proposal. */ }
  }
  const splitUnavailable = selectedLayer && view ? splitUnavailability(selectedLayer, view.composition.layers.length) : null;
  let splitProposal: ReturnType<typeof splitLayerV2Time> | null = null;
  if (splitting && selectedLayer && values?.timelineSplit) {
    try { splitProposal = splitLayerV2Time(selectedLayer, parseExactTime(values.timelineSplit.splitPoint, "split composition time")); } catch { /* Keep incomplete exact input as a recoverable draft without inventing a proposal. */ }
  }
  const propertyHelpId = `working-copy-property-help-${projectId}`;
  const moveHelpId = `working-copy-move-help-${projectId}`;
  const trimHelpId = `working-copy-trim-help-${projectId}`;
  const splitHelpId = `working-copy-split-help-${projectId}`;
  const durationHelpId = `working-copy-duration-help-${projectId}`;
  const insertHelpId = `working-copy-insert-help-${projectId}`;
  const replacementHelpId = `working-copy-replacement-help-${projectId}`;
  const audioTimingHelpId = `working-copy-audio-timing-help-${projectId}`;
  const undoHelpId = `working-copy-undo-help-${projectId}`;
  const redoHelpId = `working-copy-redo-help-${projectId}`;
  const renderStartBlockReason = unsaved ? "Save or discard the current local edit before preparing an export. Unsaved values never enter a render."
    : nativeBusy ? "Resolve the active native Blender preview or retained native request before preparing an export."
    : pending ? "Resolve the retained editorial request before preparing an export."
      : gestureActive ? "Finish or cancel the active timeline gesture before preparing an export."
        : working ? "Finish or stop the current source check before preparing an export."
          : recoveryIssue || unavailable ? "Resolve the unavailable or unsafe working-copy recovery state before preparing an export."
            : disabled ? "Resolve the other workspace edit or request before preparing an export."
              : !ready ? "Wait for working-copy recovery checks to finish before preparing an export."
                : "";
  useEffect(() => {
    if (!focusTrimAfterProposal.current || !trimming || !trimPointInput.current) return;
    const timer = window.setTimeout(() => {
      if (!focusTrimAfterProposal.current || !trimPointInput.current || trimPointInput.current.disabled) return;
      focusTrimAfterProposal.current = false;
      trimPointInput.current.focus();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [layerId, trimming]);
  function choose(id: string) { if (controlsLocked || unsaved) return; try { if (id !== "" && !source?.compositions.some(c => c.compositionId === id)) throw Error("Unknown composition selection."); onCompositionChange(id); setView(null); setValues(null); setDurationValues(null); setLayerId(""); setTrimPreferredEdge("IN"); setInsertValues(newInsertValues()); setError(""); } catch { setRecoveryIssue("Composition selection could not be retained. No edit or save has been submitted."); } }
  async function loadComposition() {
    if (controlsLocked || dirtyRef.current || durationDirtyRef.current || !compositionId || source?.workingCopy.state !== "READY" || active.current) return;
    const controller = new AbortController(); active.current = controller; setWorking(true); setError(""); const timer = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(`${ENDPOINT}?${new URLSearchParams({ projectId, compositionId })}`, { credentials: "same-origin", cache: "no-store", headers: HEADERS, signal: controller.signal }); const next = viewResult(await responseResult(response), projectId, compositionId);
      if (!mounted.current || controller.signal.aborted) return;
      // The first successful load closes Source status; keep keyboard focus on
      // its visible summary instead of leaving it inside the closed disclosure.
      if (!view) sourceSummary.current?.focus({ preventScroll: true });
      setGestureActive(false); setView(next); setLayerId(""); setValues(null); setDurationValues({ numerator: String(next.composition.duration.numerator), denominator: String(next.composition.duration.denominator) }); setTrimPreferredEdge("IN"); setInsertValues(newInsertValues(next.composition.duration)); setNotice("Only the selected composition and its direct references were loaded. Media remains unchecked; nested compositions were not loaded.");
    } catch (cause) { if (mounted.current) { setUnavailable(true); setError(controller.signal.aborted ? "Stopped waiting for the selected composition. No instructions were replaced and no save was retried." : cause instanceof Error ? cause.message : "Selected composition is unavailable."); } }
    finally { window.clearTimeout(timer); if (active.current === controller) { active.current = null; if (mounted.current) setWorking(false); } }
  }
  function chooseLayer(id: string) { if (controlsLocked || unsaved || !view) return; const layer = view.composition.layers.find(item => item.layerId === id); setCatalogueOpen(false); setSidePanel("inspector"); setLayerId(id); setReplacementChoice(null); setValues(layer ? layerValues(layer) : null); setTrimPreferredEdge("IN"); }
  function retainDraft(layer: LayerV2, next: Values): boolean {
    if (locked || durationDirtyRef.current || !view || layer.locked || !view.composition.layers.some(candidate => candidate.layerId === layer.layerId)) return false;
    try { parseValues(next, layer, view.composition.layers.length); } catch { setError("Save or discard the current edit before switching between timing and properties, or choose a supported layer."); return false; }
    if (dirtyRef.current && valueKind(draftRef.current?.values) !== valueKind(next)) { setError("Save or discard the current edit before switching between properties, moving, trimming and splitting."); return false; }
    const d: Draft = { projectId, compositionId: view.composition.compositionId, layerId: layer.layerId, view, values: next };
    draftRef.current = d; dirtyRef.current = true; setLayerId(layer.layerId); setValues(next); setDirty(true); onBusyChange(true); setError(""); setNotice("Local edit draft retained. Save explicitly to publish this one composition.");
    try { store(draftKey(projectId), d); return true; } catch { setRecoveryIssue("Browser storage could not retain the local draft. No save was sent. Keep this tab open and resolve storage before continuing."); return false; }
  }
  function change(next: Values) {
    if (controlsLocked || !selectedLayer) return;
    retainDraft(selectedLayer, next);
  }
  function changeDuration(next: TimeText) {
    if (controlsLocked || dirtyRef.current || !view || Object.values(next).some(part => typeof part !== "string" || part.length > 16)) return;
    const draft: DurationDraft = { projectId, compositionId: view.composition.compositionId, view, duration: next };
    durationDraftRef.current = draft; durationDirtyRef.current = true; setDurationValues(next); setDurationDirty(true); onBusyChange(true); setError(""); setNotice("Local composition-duration draft retained. Save explicitly to publish it; the saved duration remains the render authority.");
    try { store(durationDraftKey(projectId), draft); } catch { setRecoveryIssue("Browser storage could not retain the local duration draft. No save was sent. Keep this tab open and resolve storage before continuing."); }
  }
  function reportGestureActive(activeGesture: boolean) {
    if (activeGesture && (locked || dirtyRef.current || durationDirtyRef.current || pendingRef.current !== null || !view)) return;
    setGestureActive(activeGesture);
    if (activeGesture) { setError(""); onBusyChange(true); }
  }
  function proposeMove(proposedLayerId: string, proposedStart: EditorialRational, authority: TimelineAuthority) {
    setGestureActive(false);
    if (locked || dirtyRef.current || durationDirtyRef.current || pendingRef.current || !view) return;
    try {
      if (authority.headDigest !== view.headDigest || authority.revision !== view.revision || authority.compositionRevision !== view.composition.revision) throw Error("The loaded working-copy head changed during the gesture. Reload the composition before moving a layer.");
      const layer = view.composition.layers.find(candidate => candidate.layerId === proposedLayerId);
      if (!layer || layer.locked) throw Error("Select an unlocked saved layer before proposing a timeline move.");
      const start = validateEditorialRational(proposedStart);
      if (start.numerator === layer.start.numerator && start.denominator === layer.start.denominator) { setNotice("The gesture ended at the saved exact start, so no move draft was created."); return; }
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(candidate => candidate.layerId === layer.layerId ? { ...candidate, start } : candidate) });
      const retained = retainDraft(layer, { ...layerValues(layer), timelineStart: { numerator: String(start.numerator), denominator: String(start.denominator) } });
      if (retained) { setCatalogueOpen(false); setSidePanel("inspector"); setPrecisionOpen(true); setNotice("Exact timeline move proposed and retained locally. Review the saved and proposed timing, then choose Save move or Discard local edits."); }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The timeline move proposal is invalid; no draft or request was created."); }
  }
  function proposeTrim(proposedLayerId: string, edge: LayerTrimEdge, proposedTrimPoint: EditorialRational, authority: TimelineAuthority) {
    setGestureActive(false);
    if (locked || dirtyRef.current || durationDirtyRef.current || pendingRef.current || !view) return;
    try {
      if (authority.headDigest !== view.headDigest || authority.revision !== view.revision || authority.compositionRevision !== view.composition.revision) throw Error("The loaded working-copy head changed during the trim gesture. Reload the composition before trimming a layer.");
      if (edge !== "IN" && edge !== "OUT") throw Error("The timeline trim edge is invalid.");
      const layer = view.composition.layers.find(candidate => candidate.layerId === proposedLayerId);
      if (!layer || layer.locked) throw Error("Select an unlocked saved layer before proposing a timeline trim.");
      if (layer.type !== "VIDEO" || layer.source.kind !== "ASSET" || layer.playbackRate !== 1 || layer.reverse || layer.keyframes.length !== 0) throw Error("Visual trim handles support only a direct-asset, forward unit-rate video layer with no keyframes. Use the existing exact numeric trim controls for other supported saved layers.");
      const trimPoint = validateEditorialRational(proposedTrimPoint), trimmed = trimLayerV2Time(layer, edge, trimPoint);
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(candidate => candidate.layerId === layer.layerId ? { ...candidate, ...trimmed } : candidate) });
      const retained = retainDraft(layer, { ...layerValues(layer), timelineTrim: { edge, trimPoint: { numerator: String(trimPoint.numerator), denominator: String(trimPoint.denominator) } } });
      if (retained) {
        setCatalogueOpen(false); setSidePanel("inspector"); setPrecisionOpen(true); focusTrimAfterProposal.current = true;
        setTrimPreferredEdge(edge);
        setNotice(`Exact timeline ${edge === "IN" ? "In" : "Out"} trim proposed and retained locally. Review the saved and proposed timing, then save or discard explicitly.`);
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The timeline trim proposal is invalid; no draft or request was created."); }
  }
  function openTrimControls(proposedLayerId: string, edge: LayerTrimEdge) {
    // A zero-frame pointer-up reports the gesture inactive and requests these controls
    // in one React event. Use durable locks here so the prior render's transient
    // gestureActive value cannot swallow that focus handoff.
    if (locked || dirtyRef.current || durationDirtyRef.current || pendingRef.current || !view || (edge !== "IN" && edge !== "OUT")) return;
    const layer = view.composition.layers.find(candidate => candidate.layerId === proposedLayerId);
    if (!layer || layer.layerId !== layerId || layer.locked) return;
    setCatalogueOpen(false); setSidePanel("inspector"); setPrecisionOpen(true); setTrimPreferredEdge(edge);
    setNotice(`${edge === "IN" ? "In" : "Out"} trim selected. Enter an exact composition-time point; no draft or request was created by opening the controls.`);
    window.setTimeout(() => trimPointInput.current?.focus(), 0);
  }
  function usePlayheadForSplit(time: EditorialRational) {
    if (controlsLocked || dirtyRef.current || durationDirtyRef.current || pendingRef.current || !view || !selectedLayer) return;
    try {
      if (splitUnavailability(selectedLayer, view.composition.layers.length)) throw Error("The selected layer does not support an exact split.");
      const splitPoint = validateEditorialRational(time); splitLayerV2Time(selectedLayer, splitPoint);
      const retained = retainDraft(selectedLayer, { ...layerValues(selectedLayer), timelineSplit: { splitPoint: { numerator: String(splitPoint.numerator), denominator: String(splitPoint.denominator) } } });
      if (retained) { setCatalogueOpen(false); setSidePanel("inspector"); setPrecisionOpen(true); }
      if (retained) setNotice("The exact playhead time was copied into a local split draft. Review it, then save or discard explicitly.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The playhead is not a valid split point; no draft or request was created."); }
  }
  async function send(p: Pending) {
    if (disabled || gestureActive || active.current || recoveryIssue) return;
    // The exact request is durable before transport, including explicit retries.
    pendingRef.current = p; setPending(p); onBusyChange(true);
    try { store(pendingKey(projectId), p); } catch { setRecoveryIssue("Browser storage could not retain the exact request. Nothing was sent. The request remains in this tab for recovery."); return; }
    const controller = new AbortController(); active.current = controller; setWorking(true); setError(""); const timer = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(ENDPOINT, { method: "POST", credentials: "same-origin", cache: "no-store", headers: { ...HEADERS, "Content-Type": "application/json", "Idempotency-Key": p.key }, body: p.body, signal: controller.signal }); const result = await responseResult(response);
      exact(result, "revision,headDigest,at,integrityScope,generationAllowed,providerRequests"); const saved = summary(result, "HEAD_AND_CURRENT_COMMIT"), body = requestBody(JSON.parse(p.body), projectId);
      if (saved.revision < (body.operation === "COPY_V1_TO_V2" ? 1 : Number(body.expectedRevision) + 1) || saved.at < String(body.requestedAt)) throw Error("The returned revision does not confirm this request.");
      if (!mounted.current || controller.signal.aborted) return;
      // Acknowledgement is accepted only after validating the response. Failed local cleanup
      // keeps the original request retained, so a later retry is still receipt-bound.
      remove(draftKey(projectId)); remove(durationDraftKey(projectId)); remove(pendingKey(projectId));
      focusLoadAfterCommit.current = body.operation !== "COPY_V1_TO_V2";
      pendingRef.current = null; draftRef.current = null; dirtyRef.current = false; durationDraftRef.current = null; durationDirtyRef.current = false; setGestureActive(false); setPending(null); setDirty(false); setDurationDirty(false); setValues(null); setDurationValues(null); setLayerId(""); setView(null); setInsertValues(newInsertValues()); setUnavailable(false); setConsent(false);
      setSource(previous => previous ? { ...previous, workingCopy: { state: "READY", revision: saved.revision, headDigest: saved.headDigest } } : previous);
      setNotice(`Working-copy revision ${saved.revision} confirmed. Original instructions and media are unchanged. Load a composition explicitly to continue.`);
    } catch (cause) { if (mounted.current) setError(`${controller.signal.aborted ? "Stopped waiting for the save. The server operation may still finish; its outcome is unknown." : cause instanceof Error ? cause.message : "The save outcome is unknown."} The exact request remains retained. Retry only with the recovery button; do not create a new request.`); }
    finally { window.clearTimeout(timer); if (active.current === controller) { active.current = null; if (mounted.current) setWorking(false); } }
  }
  function createCopy() {
    if (controlsLocked || unsaved || !consent || !source?.legacyPersisted || source.workingCopy.state !== "NOT_CREATED") return;
    const body = { operation: "COPY_V1_TO_V2", projectId, expectedProjectRevision: source.projectRevision, expectedEditorialRevision: source.legacyRevision, requestedAt: new Date().toISOString() };
    void send({ projectId, key: crypto.randomUUID(), body: JSON.stringify(body) });
  }
  function chooseInsertTake(takeId: string) {
    if (controlsLocked || unsaved || !view) return;
    const item = compatibleTakes.find(candidate => candidate.takeId === takeId) ?? null;
    const duration = item?.duration && editorialCompareTime(item.duration, view.composition.duration) < 0 ? item.duration : view.composition.duration;
    setInsertValues(current => ({ ...current, takeId, duration: timeText(duration), sourceOffset: { numerator: "0", denominator: "1" } }));
  }
  function chooseInsertAudio(audioKey: string) {
    if (controlsLocked || unsaved || !view) return;
    const item = source?.audioCatalogue.find(candidate => `${candidate.assetId}:${candidate.version}` === audioKey) ?? null;
    const duration = item && editorialCompareTime(item.duration, view.composition.duration) < 0 ? item.duration : view.composition.duration;
    setInsertValues(current => ({ ...current, audioKey, duration: timeText(duration), sourceOffset: { numerator: "0", denominator: "1" } }));
  }
  function insertLayer() {
    if (controlsLocked || unsaved || !view || pendingRef.current) return;
    try {
      const start = parseExactTime(insertValues.start, "layer start"), duration = parseExactTime(insertValues.duration, "layer duration");
      if (duration.numerator === 0) throw Error("Enter a positive exact layer duration.");
      if (editorialCompareTime(editorialAddTime(start, duration), view.composition.duration) > 0) throw Error("The exact layer start plus duration exceeds the saved composition. Shorten or move the layer, or explicitly extend the composition first.");
      const common = { projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, requestedAt: new Date().toISOString(), start, duration };
      let body: Record<string, unknown>;
      if (insertValues.kind === "TAKE") {
        if (!selectedTake || selectedTake.shotId !== view.composition.shotId) throw Error("Choose a saved visual Take for this shot composition.");
        if (selectedTake.eligibility !== "READY") throw Error(selectedTake.reason ?? "This saved Take cannot be inserted with exact source coverage.");
        const sourceOffset = parseExactTime(insertValues.sourceOffset, "source offset");
        if (selectedTake.mediaType === "IMAGE" && sourceOffset.numerator !== 0) throw Error("Still-image Takes use a zero source offset.");
        if (selectedTake.duration && editorialCompareTime(editorialAddTime(sourceOffset, duration), selectedTake.duration) > 0) throw Error("The exact source offset plus duration exceeds this qualified imported video. Shorten the layer or choose an earlier source offset.");
        body = { operation: "INSERT_TAKE_LAYER", ...common, takeId: selectedTake.takeId, sourceOffset };
      } else if (insertValues.kind === "TEXT") {
        const fontSizePx = parseNumber(insertValues.title.fontSizePx, "title size", 8, 256);
        if (!Number.isSafeInteger(fontSizePx) || !insertValues.title.text.trim() || insertValues.title.text.length > 256 || /[\u0000-\u001f\u007f]/u.test(insertValues.title.text) || !/^#[0-9A-F]{6}$/u.test(insertValues.title.color)) throw Error("Enter nonblank single-line title text, a whole-number size from 8 to 256, and an uppercase #RRGGBB colour.");
        const text: TextSettings = { text: insertValues.title.text, fontRef: "ARIAL_REGULAR", fontSizePx, color: insertValues.title.color };
        const transform: Transform = { x: parseNumber(insertValues.title.x, "title horizontal position", -16384, 16384), y: parseNumber(insertValues.title.y, "title vertical position", -16384, 16384), scaleX: 1, scaleY: 1, rotationDeg: 0, anchorX: 0.5, anchorY: 0.5 };
        changes({ opacity: 1, enabled: true, transform, text });
        body = { operation: "INSERT_TEXT_LAYER", ...common, text, transform };
      } else {
        if (!selectedAudio) throw Error("Choose a qualified imported WAV soundtrack.");
        const sourceOffset = parseExactTime(insertValues.sourceOffset, "source offset"), fadeIn = parseExactTime(insertValues.audio.fadeIn, "fade-in duration"), fadeOut = parseExactTime(insertValues.audio.fadeOut, "fade-out duration");
        if (editorialCompareTime(editorialAddTime(sourceOffset, duration), selectedAudio.duration) > 0) throw Error("The exact source offset plus duration exceeds this qualified imported soundtrack. Shorten the layer or choose an earlier source offset.");
        if (editorialCompareTime(fadeIn, duration) > 0 || editorialCompareTime(fadeOut, duration) > 0) throw Error("Each soundtrack fade must fit inside the new layer duration.");
        const audio: AudioSettings = { gainDb: parseNumber(insertValues.audio.gainDb, "soundtrack gain", -60, 12), fadeIn, fadeOut, muted: insertValues.audio.muted };
        changes({ opacity: 1, enabled: true, transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0, anchorX: 0.5, anchorY: 0.5 }, audio });
        body = { operation: "INSERT_AUDIO_LAYER", ...common, assetId: selectedAudio.assetId, version: selectedAudio.version, sourceOffset, audio };
      }
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This insertion request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The new layer instructions are invalid; nothing was inserted."); }
  }
  function replaceSelectedTake() {
    if (controlsLocked || unsaved || renderActivity || active.current || pendingRef.current || !view || !selectedLayer) return;
    try {
      const reason = replacementUnavailability(selectedLayer, replacementTake);
      if (reason || !replacementTake) throw Error(reason ?? "Choose a compatible saved Take.");
      const body = { operation: "REPLACE_LAYER_TAKE", projectId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, layerId: selectedLayer.layerId, takeId: replacementTake.takeId, requestedAt: new Date().toISOString() };
      requestBody(body, projectId);
      void send({ projectId, key: crypto.randomUUID(), body: JSON.stringify(body) });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The selected Take cannot replace this layer; nothing was changed."); }
  }
  function saveProperties() {
    if (controlsLocked || !dirty || !view || !selectedLayer || selectedLayer.locked || !values || timing) return;
    try {
      const edits = parsedChanges(values, selectedLayer); validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(layer => layer.layerId === layerId ? { ...layer, ...edits } : layer) });
      const body = { operation: "SET_LAYER_PROPERTIES", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, layerId, requestedAt: new Date().toISOString(), changes: edits }; requestBody(body, projectId);
      const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This property request exceeds its safe bound."); void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The properties are invalid; no save was sent."); }
  }
  function saveAudioTiming() {
    if (controlsLocked || !dirty || !view || !selectedAudioLayer || selectedAudioLayer.locked || !values?.audioTiming || pendingRef.current) return;
    try {
      parseValues(values, selectedAudioLayer, view.composition.layers.length);
      const next = setAudioLayerV2Timing(selectedAudioLayer, { start: parseExactTime(values.audioTiming.start, "audio start"), duration: parseExactTime(values.audioTiming.duration, "audio duration"), sourceOffset: parseExactTime(values.audioTiming.sourceOffset, "audio source offset") });
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(layer => layer.layerId === layerId ? { ...layer, ...next } : layer) });
      const ref = selectedAudioLayer.source.kind === "ASSET" ? selectedAudioLayer.source.asset : null;
      const admitted = source?.audioCatalogue.find(item => item.assetId === ref?.assetId && item.version === ref?.version);
      if (admitted && editorialCompareTime(editorialAddTime(next.sourceOffset, next.duration), admitted.duration) > 0) throw Error("The proposed source interval exceeds the imported audio. Shorten the occurrence or use an earlier source offset.");
      const body = { operation: "SET_AUDIO_LAYER_TIMING", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, layerId, requestedAt: new Date().toISOString(), ...next };
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This audio timing request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The audio timing is invalid; no save was sent."); }
  }
  function moveLayer() {
    if (controlsLocked || !dirty || !view || !selectedLayer || selectedLayer.locked || !values?.timelineStart || pendingRef.current) return;
    try {
      parseValues(values, selectedLayer, view.composition.layers.length);
      const parts = values.timelineStart;
      if (![parts.numerator, parts.denominator].every(part => /^(?:0|[1-9]\d*)$/u.test(part))) throw Error("Enter whole nonnegative integers for the exact start time. Blank values are not zero.");
      let start;
      try { start = validateEditorialRational({ numerator: Number(parts.numerator), denominator: Number(parts.denominator) }); }
      catch { throw Error("Use a reduced fraction with safe whole numbers and a positive denominator, for example 1 / 3. Zero is 0 / 1."); }
      if (start.numerator === selectedLayer.start.numerator && start.denominator === selectedLayer.start.denominator) throw Error("Choose a different start time before moving this layer.");
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(layer => layer.layerId === layerId ? { ...layer, start } : layer) });
      const body = { operation: "MOVE_LAYER_TIME", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, layerId, requestedAt: new Date().toISOString(), start };
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This timing request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The start time is invalid; no move was sent."); }
  }
  function trimLayer() {
    if (controlsLocked || !dirty || !view || !selectedLayer || selectedLayer.locked || !values?.timelineTrim || pendingRef.current) return;
    try {
      parseValues(values, selectedLayer, view.composition.layers.length);
      const { edge, trimPoint: parts } = values.timelineTrim;
      if (![parts.numerator, parts.denominator].every(part => /^(?:0|[1-9]\d*)$/u.test(part))) throw Error("Enter whole nonnegative integers for the exact trim point. Blank values are not zero.");
      let trimPoint;
      try { trimPoint = validateEditorialRational({ numerator: Number(parts.numerator), denominator: Number(parts.denominator) }); }
      catch { throw Error("Use a reduced fraction with safe whole numbers and a positive denominator, for example 1 / 3. Zero is 0 / 1."); }
      let trimmed;
      try { trimmed = trimLayerV2Time(selectedLayer, edge, trimPoint); }
      catch { throw Error("Choose an exact trim point strictly inside the saved layer interval. Trimming only shortens one edge; it cannot extend or move the whole layer."); }
      validateCompositionV2({ ...view.composition, layers: view.composition.layers.map(layer => layer.layerId === layerId ? { ...layer, ...trimmed } : layer) });
      const body = { operation: "TRIM_LAYER_TIME", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, layerId, requestedAt: new Date().toISOString(), edge, trimPoint };
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This trim request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The trim point is invalid; no trim was sent."); }
  }
  function splitLayer() {
    if (controlsLocked || !dirty || !view || !selectedLayer || selectedLayer.locked || !values?.timelineSplit || pendingRef.current || splitUnavailable) return;
    try {
      parseValues(values, selectedLayer, view.composition.layers.length);
      const splitPoint = parseExactTime(values.timelineSplit.splitPoint, "split composition time");
      splitLayerV2Time(selectedLayer, splitPoint);
      const body = { operation: "SPLIT_LAYER_TIME", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, layerId, requestedAt: new Date().toISOString(), splitPoint };
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This split request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The split composition time is invalid; no split was sent."); }
  }
  function saveDuration() {
    if (controlsLocked || !durationDirty || dirtyRef.current || !view || !durationValues || pendingRef.current) return;
    try {
      const duration = parseExactTime(durationValues, "composition duration");
      if (duration.numerator === view.composition.duration.numerator && duration.denominator === view.composition.duration.denominator) throw Error("Choose a different exact composition duration before saving.");
      for (const layer of view.composition.layers.filter(candidate => candidate.enabled)) if (editorialCompareTime(editorialAddTime(layer.start, layer.duration), duration) > 0) throw Error(`The enabled layer ${layer.name} ends after the proposed duration. Shortening never clips, retimes, moves or deletes layers.`);
      validateCompositionV2({ ...view.composition, duration });
      const body = { operation: "SET_COMPOSITION_DURATION", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: view.composition.compositionId, requestedAt: new Date().toISOString(), duration };
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This duration request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The composition duration is invalid; no save was sent."); }
  }
  function navigateHistory(action: HistoryAction) {
    if (controlsLocked || unsaved || !view || !action.available || action.compositionId === null || action.compositionRevision === null || pendingRef.current) return;
    try {
      const body = { operation: action.command, projectId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, compositionId: action.compositionId, expectedCompositionRevision: action.compositionRevision, requestedAt: new Date().toISOString() };
      requestBody(body, projectId); const encoded = JSON.stringify(body); if (new TextEncoder().encode(encoded).length > MAX_REQUEST) throw Error("This history request exceeds its safe bound.");
      void send({ projectId, key: crypto.randomUUID(), body: encoded });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The history action is invalid; no request was sent."); }
  }
  function discardDraft() {
    if (disabled || working || gestureActive || pending || recoveryIssue || renderRecoveryBlocked || !unsaved) return;
    try { remove(draftKey(projectId)); remove(durationDraftKey(projectId)); focusLoadAfterCommit.current = true; draftRef.current = null; dirtyRef.current = false; durationDraftRef.current = null; durationDirtyRef.current = false; setGestureActive(false); setDirty(false); setDurationDirty(false); setView(null); setValues(null); setDurationValues(null); setLayerId(""); setUnavailable(source?.workingCopy.state === "UNAVAILABLE"); setError(""); setNotice("Only the unsaved local draft was discarded. No saved instructions were changed."); }
    catch { setRecoveryIssue("Local draft recovery data could not be cleared safely. It remains protected."); }
  }
  const shownDuration = durationValues ?? (view ? { numerator: String(view.composition.duration.numerator), denominator: String(view.composition.duration.denominator) } : null);
  let durationPreview = "Enter a positive reduced fraction. The saved value remains authoritative until Save duration succeeds.";
  if (shownDuration) {
    try {
      const candidate = parseExactTime(shownDuration, "composition duration"), frameNumerator = candidate.numerator * 25;
      const frames = Number.isSafeInteger(frameNumerator) && frameNumerator % candidate.denominator === 0 ? frameNumerator / candidate.denominator : null;
      const withinPolicy = editorialCompareTime(candidate, { numerator: 300, denominator: 1 }) <= 0;
      durationPreview = frames === null ? `${exactTime(candidate)} is representable, but it is not aligned to the 25 fps export grid.` : withinPolicy ? `${exactTime(candidate)} produces exactly ${frames.toLocaleString()} video frames at 25 fps.` : `${exactTime(candidate)} is representable, but exceeds the qualified five-minute export policy.`;
    } catch { /* Incomplete exact fields remain recoverable and are never rendered. */ }
  }
  return <section className={`${styles.panel} ${workspaceStyles.editor}`} aria-label="Source-bound working-copy inspector">
    <header className={workspaceStyles.toolbar}>
      <div className={workspaceStyles.identity}><h3>{projectName ?? "Local project"}{view ? ` / ${view.composition.name}` : ""}</h3><span role="status">{unsaved ? "Unsaved draft · saved preview closed" : pending ? "Request retained · resolve before editing" : view ? `Saved · revision ${view.composition.revision}` : "Choose and load a saved composition"}</span></div>
      <div className={styles.actions}>
        {onReturnToProject && <button type="button" onClick={onReturnToProject}>Return to project</button>}
        <button type="button" aria-pressed={catalogueOpen} aria-controls="studio-media-catalogue" onClick={() => setCatalogueOpen(value => !value)}>Media</button>
        <button type="button" aria-pressed={sidePanel === "inspector" && !catalogueOpen} aria-controls="studio-layer-inspector" onClick={() => { setCatalogueOpen(false); setSidePanel("inspector"); }}>Inspector</button>
        <button type="button" aria-pressed={sidePanel === "export" && !catalogueOpen} onClick={() => { setCatalogueOpen(false); setSidePanel("export"); }}>Export / outputs</button>
      </div>
      {view && <div className={workspaceStyles.saveBar}>      <div className={styles.actions} aria-label="Working-copy edit history">
        <button type="button" aria-label={view.history.undo.label} aria-describedby={undoHelpId} disabled={controlsLocked || unsaved || !view.history.undo.available} onClick={() => navigateHistory(view.history.undo)}>Undo</button>
        <button type="button" aria-label={view.history.redo.label} aria-describedby={redoHelpId} disabled={controlsLocked || unsaved || !view.history.redo.available} onClick={() => navigateHistory(view.history.redo)}>Redo</button>
      </div>
      <div className={styles.actions}><button type="button" aria-label="Save working-copy properties" disabled={controlsLocked || durationDirty || !dirty || !selectedLayer || selectedLayer.locked || timing} onClick={saveProperties}>Save</button><button type="button" aria-label="Discard local edits" disabled={disabled || working || gestureActive || !unsaved || pending !== null || !!recoveryIssue || renderRecoveryBlocked} onClick={discardDraft}>Discard</button></div>
</div>}
    </header>
    <div className={workspaceStyles.feedback}>    {notice && !notice.startsWith("Only the selected composition and its direct references were loaded.") && <p role="status" className={styles.muted}>{notice}</p>}{error && <p role="alert" className={styles.error}>{error}</p>}{recoveryIssue && <p role="alert" className={styles.error}>{recoveryIssue}</p>}
    {!ready && <p role="status">Checking working-copy recovery data…</p>}
    {pending && <div className={styles.warning} aria-label="Unresolved working-copy request"><strong>Exact request retained</strong><p>Its outcome is not yet safely resolved. Refreshing status never retries it, and switching modes is blocked.</p><button type="button" disabled={disabled || working || gestureActive || !!recoveryIssue} onClick={() => void send(pending)}>Retry exact working-copy request</button></div>}
    {source?.workingCopy.state === "NOT_CREATED" && <div className={styles.warning}>
      <p>{source.legacyPersisted ? "Create a separate copy of the currently saved layered instructions. Originals stay active and unchanged." : "Save the original layered workspace first. Unsaved original instructions cannot be copied."}</p>
      <label className={styles.check}><input type="checkbox" checked={consent} disabled={controlsLocked || unsaved || !source.legacyPersisted} onChange={event => setConsent(event.target.checked)} />I understand this copy becomes unavailable if the original changes.</label>
      <button type="button" disabled={controlsLocked || unsaved || !consent || !source.legacyPersisted} onClick={createCopy}>Create working copy</button>
    </div>}
</div>
    <div className={workspaceStyles.selectionBar}>
      <details open={!view || undefined}><summary ref={sourceSummary}>Source status</summary>
      {source && <div className={styles.actions}><label className={styles.field}>Working-copy composition<select aria-label="Working-copy composition" value={compositionId} disabled={controlsLocked || unsaved || source.workingCopy.state !== "READY"} onChange={event => choose(event.target.value)}><option value="">Choose a saved composition</option>{source.compositions.map(c => <option key={c.compositionId} value={c.compositionId}>{c.name} ({c.kind === "PRECOMP" ? "precomposition" : "shot"})</option>)}</select></label><button ref={loadButton} type="button" disabled={controlsLocked || unsaved || !compositionId || source.workingCopy.state !== "READY"} onClick={() => void loadComposition()}>Load selected composition</button></div>}
      {notice.startsWith("Only the selected composition and its direct references were loaded.") && <p role="status" className={styles.muted}>{notice}</p>}
      <div className={styles.actions}><button type="button" disabled={disabled || !ready || working || gestureActive || !!recoveryIssue} onClick={() => void refresh()}>Refresh source status</button>{working && <button type="button" onClick={() => { active.current?.abort(); setNotice("Stopped waiting, not the server operation. Any sent request remains retained for explicit recovery."); }}>Stop waiting</button>}</div>
    {source && <p className={styles.muted}>Original project revision {source.projectRevision}; layered revision {source.legacyRevision}. Working copy: {source.workingCopy.state === "NOT_CREATED" ? "not created" : source.workingCopy.state === "READY" ? `saved revision ${source.workingCopy.revision}` : "unavailable — read-only recovery"}.</p>}
</details>
      <details className={workspaceStyles.technical}><summary>History and capability details</summary>{view && <>
      <p id={undoHelpId} className={styles.muted}>{view.history.undo.description}{pending ? " Resolve the retained exact request before using history navigation." : unsaved ? " Save or discard the current unsaved edit before using history navigation." : gestureActive ? " Finish or cancel the active timeline gesture before using history navigation." : working ? " Finish or stop the current source check before using history navigation." : unavailable || recoveryIssue ? " Resolve the unavailable or unsafe recovery state before using history navigation." : disabled ? " History navigation is unavailable while the editor is disabled." : ""}</p>
      <p id={redoHelpId} className={styles.muted}>{view.history.redo.description}{pending ? " Resolve the retained exact request before using history navigation." : unsaved ? " Save or discard the current unsaved edit before using history navigation." : gestureActive ? " Finish or cancel the active timeline gesture before using history navigation." : working ? " Finish or stop the current source check before using history navigation." : unavailable || recoveryIssue ? " Resolve the unavailable or unsafe recovery state before using history navigation." : disabled ? " History navigation is unavailable while the editor is disabled." : ""}</p>
      </>}<p className={styles.muted}>Inspect saved layers, insert one saved visual Take, editable title or qualified imported soundtrack, explicitly load local preview, edit the exact composition duration or supported visual, title and audio properties, move an unlocked layer’s exact start time, trim one edge inward, or split one supported video at an exact composition time. Insertions append one layer and join persistent Undo/Redo without changing source media or alternative Takes. Duration changes add only an empty tail when extending and never clip, stretch, retime, move or delete layers when shortening. The saved head remains authoritative until an explicit Save succeeds. A separate saved-head export panel can render the qualified duration-aware local MP4 preset only after readiness passes; asset approval, provider execution and generation remain locked.</p></details>
    <div className={workspaceStyles.modeBar} aria-label="Viewer mode">
      <button type="button" aria-pressed={viewerMode === "working"} onClick={() => setViewerMode("working")}>Working preview</button>
      <button type="button" aria-pressed={viewerMode === "output"} onClick={() => { setCatalogueOpen(false); setViewerMode("output"); setSidePanel("export"); }}>Rendered output</button>
      <span>{viewerMode === "working" ? "Saved-only · approximate · no synchronized audio" : "Immutable completed output · no automatic render or autoplay"}</span>
    </div>
    </div>
    <div className={workspaceStyles.grid} data-catalogue-open={catalogueOpen}>
      <aside id="studio-media-catalogue" className={workspaceStyles.catalogue} hidden={!catalogueOpen} aria-label="Media and Take catalogue">
        <h4>Media & Takes</h4><p className={styles.muted}>Saved sources. Adding a layer is an explicit edit; selecting a panel is not.</p>
        {view?.composition.shotId && <details><summary>Native Blender source → local preview → Take</summary><BlenderSourcePanel projectId={projectId} shotId={view.composition.shotId} compositionId={view.composition.compositionId} revision={view.revision} headDigest={view.headDigest} disabled={locked || gestureActive || unsaved || renderActivity} onBusyChange={setNativeBusy} onTakeUsed={() => { setView(null); setNotice("Native render admitted as an alternative Take. Reload this composition, then use Add a layer to place it with Undo/Redo."); void refresh(); }} /></details>}
        <ul className={styles.takeList}>{source?.takeCatalogue.map(item => <li key={item.takeId}><strong>{item.name}</strong><span>{item.sourceLabel}</span><span>{item.eligibility === "READY" ? "Ready" : item.reason ?? "Unavailable"} · {libraryLabel(item.library)}</span><details><summary>Source details</summary><span className={styles.hash}>{item.takeId}</span><span>{item.duration ? exactTime(item.duration) : "No timed source"}</span></details></li>)}{source?.audioCatalogue.map(item => <li key={`${item.assetId}:${item.version}`}><strong>{item.sourceLabel}</strong><span>Qualified WAV · {libraryLabel(item.library)}</span><details><summary>Source details</summary><span className={styles.hash}>{item.assetId} v{item.version}</span><span>{exactTime(item.duration)}</span></details></li>)}</ul>
        {view && <><details><summary>Add a layer</summary>      <fieldset disabled={controlsLocked || unsaved} className={styles.fields} aria-describedby={insertHelpId}>
        <legend>Add one layer from saved sources</legend>
        <p id={insertHelpId}>Insertion appends one layer only and is a persistent Undo/Redo edit. Exact start plus duration must fit the saved composition. Timed sources also require source offset plus duration to fit their qualified imported duration. Insertion never extends or trims the composition, replaces a preferred Take, changes another layer, deletes media, or grants approval.{view.composition.layers.length >= STUDIO_COMPOSITION_LIMITS.layersPerComposition ? ` This composition already has the ${STUDIO_COMPOSITION_LIMITS.layersPerComposition}-layer limit.` : ""}</p>
        <label className={styles.field}>New layer type<select aria-label="New layer type" aria-describedby={insertHelpId} value={insertValues.kind} onChange={event => setInsertValues(current => ({ ...current, kind: event.target.value as InsertKind, duration: timeText(view.composition.duration), sourceOffset: { numerator: "0", denominator: "1" } }))}><option value="TAKE">Saved visual Take</option><option value="TEXT">Editable title</option><option value="AUDIO">Imported WAV soundtrack</option></select></label>
        {insertValues.kind === "TAKE" && <>
          <label className={styles.field}>Saved visual Take<select aria-label="Saved visual Take" aria-describedby={insertHelpId} value={insertValues.takeId} onChange={event => chooseInsertTake(event.target.value)}><option value="">Choose a Take for this shot</option>{compatibleTakes.map(item => <option key={item.takeId} value={item.takeId} disabled={item.eligibility !== "READY"}>{item.name} — {item.sourceLabel} — {item.duration ? exactTime(item.duration) : item.mediaType === "IMAGE" ? "still image" : "exact duration unavailable"} — {libraryLabel(item.library)}{item.eligibility !== "READY" ? " (unavailable)" : ""}</option>)}</select></label>
          {compatibleTakes.length === 0 && <p className={styles.warning}>No saved visual Take belongs to this shot. A completed native Blender preview can be explicitly admitted here with Use as Take. Ordinary imported media still follows the original layered workspace workflow.</p>}
          {selectedTake?.reason && <p className={styles.warning}>{selectedTake.reason}</p>}
          {selectedTake && !selectedTake.reason && <p className={styles.muted}>Selected {selectedTake.mediaType === "VIDEO" ? `qualified source duration ${exactTime(selectedTake.duration!)}` : "still image"}; storage: {libraryLabel(selectedTake.library)}. The immutable Asset version and Take binding are resolved by the local service.</p>}
        </>}
        {insertValues.kind === "AUDIO" && <>
          <label className={styles.field}>Imported WAV soundtrack<select aria-label="Imported WAV soundtrack" aria-describedby={insertHelpId} value={insertValues.audioKey} onChange={event => chooseInsertAudio(event.target.value)}><option value="">Choose a qualified soundtrack</option>{source?.audioCatalogue.map(item => <option key={`${item.assetId}:${item.version}`} value={`${item.assetId}:${item.version}`}>{item.sourceLabel} — {exactTime(item.duration)} — {libraryLabel(item.library)}</option>)}</select></label>
          {!source?.audioCatalogue.length && <p className={styles.warning}>No qualified imported WAV soundtrack is available. Import an admitted WAV through the project’s media importer, then refresh source status.</p>}
          {selectedAudio && <p className={styles.muted}>Qualified source duration {exactTime(selectedAudio.duration)}; storage: {libraryLabel(selectedAudio.library)}. The immutable Asset version is resolved by the local service.</p>}
        </>}
        {(["numerator", "denominator"] as const).map(part => <label key={`insert-start-${part}`} className={styles.field}>Layer start {part}<input aria-label={`New layer start ${part}`} aria-describedby={insertHelpId} type="text" inputMode="numeric" maxLength={16} value={insertValues.start[part]} onChange={event => setInsertValues(current => ({ ...current, start: { ...current.start, [part]: event.target.value } }))} /></label>)}
        {(["numerator", "denominator"] as const).map(part => <label key={`insert-duration-${part}`} className={styles.field}>Layer duration {part}<input aria-label={`New layer duration ${part}`} aria-describedby={insertHelpId} type="text" inputMode="numeric" maxLength={16} value={insertValues.duration[part]} onChange={event => setInsertValues(current => ({ ...current, duration: { ...current.duration, [part]: event.target.value } }))} /></label>)}
        {insertValues.kind !== "TEXT" && (["numerator", "denominator"] as const).map(part => <label key={`insert-offset-${part}`} className={styles.field}>Source offset {part}<input aria-label={`New layer source offset ${part}`} aria-describedby={insertHelpId} type="text" inputMode="numeric" maxLength={16} value={insertValues.sourceOffset[part]} onChange={event => setInsertValues(current => ({ ...current, sourceOffset: { ...current.sourceOffset, [part]: event.target.value } }))} /></label>)}
        {insertValues.kind === "TEXT" && <>
          <label className={styles.field}>Title text<input aria-label="New title text" aria-describedby={insertHelpId} type="text" maxLength={256} value={insertValues.title.text} onChange={event => setInsertValues(current => ({ ...current, title: { ...current.title, text: event.target.value } }))} /></label>
          <label className={styles.field}>Title font<select aria-label="New title font" aria-describedby={insertHelpId} value="ARIAL_REGULAR" onChange={() => undefined}><option value="ARIAL_REGULAR">Arial Regular (bundled)</option></select></label>
          <label className={styles.field}>Title size (8–256 px)<input aria-label="New title size in pixels" aria-describedby={insertHelpId} type="text" inputMode="numeric" maxLength={3} value={insertValues.title.fontSizePx} onChange={event => setInsertValues(current => ({ ...current, title: { ...current.title, fontSizePx: event.target.value } }))} /></label>
          <label className={styles.field}>Title colour (#RRGGBB)<input aria-label="New title colour" aria-describedby={insertHelpId} type="text" maxLength={7} value={insertValues.title.color} onChange={event => setInsertValues(current => ({ ...current, title: { ...current.title, color: event.target.value } }))} /></label>
          <label className={styles.field}>Title horizontal position<input aria-label="New title horizontal position" aria-describedby={insertHelpId} type="text" inputMode="decimal" maxLength={80} value={insertValues.title.x} onChange={event => setInsertValues(current => ({ ...current, title: { ...current.title, x: event.target.value } }))} /></label>
          <label className={styles.field}>Title vertical position<input aria-label="New title vertical position" aria-describedby={insertHelpId} type="text" inputMode="decimal" maxLength={80} value={insertValues.title.y} onChange={event => setInsertValues(current => ({ ...current, title: { ...current.title, y: event.target.value } }))} /></label>
        </>}
        {insertValues.kind === "AUDIO" && <>
          <label className={styles.check}><input aria-label="Mute new soundtrack" aria-describedby={insertHelpId} type="checkbox" checked={insertValues.audio.muted} onChange={event => setInsertValues(current => ({ ...current, audio: { ...current.audio, muted: event.target.checked } }))} />Mute new soundtrack</label>
          <label className={styles.field}>Soundtrack gain (−60 to 12 dB)<input aria-label="New soundtrack gain in decibels" aria-describedby={insertHelpId} type="text" inputMode="decimal" maxLength={80} value={insertValues.audio.gainDb} onChange={event => setInsertValues(current => ({ ...current, audio: { ...current.audio, gainDb: event.target.value } }))} /></label>
          {(["fadeIn", "fadeOut"] as const).flatMap(fade => (["numerator", "denominator"] as const).map(part => <label key={`${fade}-${part}`} className={styles.field}>{fade === "fadeIn" ? "Fade in" : "Fade out"} {part}<input aria-label={`New soundtrack ${fade === "fadeIn" ? "fade in" : "fade out"} ${part}`} aria-describedby={insertHelpId} type="text" inputMode="numeric" maxLength={16} value={insertValues.audio[fade][part]} onChange={event => setInsertValues(current => ({ ...current, audio: { ...current.audio, [fade]: { ...current.audio[fade], [part]: event.target.value } } }))} /></label>))}
        </>}
        <button type="button" aria-describedby={insertHelpId} disabled={controlsLocked || unsaved || view.composition.layers.length >= STUDIO_COMPOSITION_LIMITS.layersPerComposition || (insertValues.kind === "TAKE" && (!selectedTake || selectedTake.eligibility !== "READY")) || (insertValues.kind === "AUDIO" && !selectedAudio)} onClick={insertLayer}>{insertValues.kind === "TAKE" ? "Insert saved Take as layer" : insertValues.kind === "TEXT" ? "Create title layer" : "Attach soundtrack layer"}</button>
      </fieldset>
</details><details><summary>Composition and audio details</summary>      <section className={styles.layers} aria-label="Saved composition duration"><strong>Saved composition duration</strong><p>{exactTime(view.composition.duration)}. This exact saved value, not a browser draft, controls render readiness and immutable render specifications.</p></section>
      <section className={styles.layers} aria-label="Saved audio export participation"><strong>Saved audio occurrences</strong><p>The initial export policy supports up to four saved AUDIO occurrences, including muted/disabled occurrences; this is a renderer limit, not a permanent composition limit. Music, voiceover and SFX are editable occurrence names. Saved levels are summed without automatic normalization, ducking or limiting. Review the completed rendered output for the combined audiovisual result; the interactive preview does not provide synchronized multitrack playback.</p>{savedAudioLayers.length ? <ul className={styles.takeList}>{savedAudioLayers.map(layer => <li key={layer.layerId}><strong>{layer.name}</strong> · {layer.layerId} · {layer.source.kind === "ASSET" ? `${layer.source.asset.assetId} v${layer.source.asset.version}` : "Unavailable source"} · {layer.enabled && (!hasSavedSolo || layer.solo) ? layer.audio.muted ? "Muted — contributes silence" : `Participates at ${layer.audio.gainDb} dB` : "Excluded by saved enabled/solo state"} · start {exactTime(layer.start)} · duration {exactTime(layer.duration)} · source offset {exactTime(layer.sourceOffset)} · fade in {exactTime(layer.audio.fadeIn)} · fade out {exactTime(layer.audio.fadeOut)}</li>)}</ul> : <p>No saved AUDIO occurrences. Export has a silent audio track.</p>}</section>
      {shownDuration && <fieldset disabled={controlsLocked || dirty} className={styles.fields} aria-describedby={durationHelpId}><legend>Composition duration</legend>
        <p id={durationHelpId}>Use a positive reduced fraction of seconds. Qualified export is available only when the saved duration aligns exactly to 25 fps and is at most 300 seconds. Longer or non-grid compositions remain representable but are explicitly blocked from this renderer. Shortening past any layer interval is rejected; nothing is clipped or retimed.</p>
        <label className={styles.field}>Duration numerator<input aria-label="Composition duration numerator" aria-describedby={durationHelpId} type="text" inputMode="numeric" maxLength={16} value={shownDuration.numerator} onChange={event => changeDuration({ ...shownDuration, numerator: event.target.value })} /></label>
        <label className={styles.field}>Duration denominator<input aria-label="Composition duration denominator" aria-describedby={durationHelpId} type="text" inputMode="numeric" maxLength={16} value={shownDuration.denominator} onChange={event => changeDuration({ ...shownDuration, denominator: event.target.value })} /></label>
        <p role={durationDirty ? "status" : undefined} className={durationDirty ? styles.warning : styles.muted}>{durationPreview}{durationDirty ? " This value is not saved and cannot be rendered." : ""}</p>
        <button type="button" aria-describedby={durationHelpId} disabled={controlsLocked || dirty || !durationDirty} onClick={saveDuration}>Save duration</button>
      </fieldset>}
</details></>}
      </aside>
      {view ? <FoundationCopyViewer key={`${projectId}:${view.composition.compositionId}:${view.headDigest}`} projectId={projectId} composition={view.composition} headDigest={view.headDigest} workingCopyRevision={view.revision} timelineFrameRate={view.timelineFrameRate} moveDraftStart={moveDraftStart} trimDraft={trimDraftTiming ? { edge: trimDraftTiming.edge, trimPoint: trimDraftTiming.trimPoint } : null} selectedLayerId={layerId} selectionDisabled={controlsLocked || unsaved} previewDisabled={locked || unsaved} dragDisabled={controlsLocked || unsaved} mediaActive={workspaceActive && viewerMode === "working"} onSelectLayer={chooseLayer} onProposeMove={proposeMove} onProposeTrim={proposeTrim} onOpenTrimControls={openTrimControls} onGestureActiveChange={reportGestureActive} onUsePlayheadForSplit={usePlayheadForSplit} renderLayout={({ workingPreview, timeline }) => <>
        <section className={workspaceStyles.centre} aria-label="Working-copy preview" hidden={viewerMode !== "working"}>{workingPreview}</section>
        <section className={workspaceStyles.timeline} aria-label="Editing timeline">{timeline}</section>
      </>} /> : <section className={workspaceStyles.centre} hidden={viewerMode !== "working"}><p>Load the selected saved composition to view its layers and timeline. No preview media loads automatically.</p></section>}
      <aside id="studio-layer-inspector" className={workspaceStyles.layerInspector} aria-label="Selected layer inspector" hidden={sidePanel !== "inspector"}>
        <h4>Inspector</h4>
        {view ? <>      {gestureActive && <p role="status" className={styles.warning}>Timeline gesture in progress. Release to create a local proposal, or cancel it; conflicting controls are temporarily unavailable.</p>}
      {unsaved && <p className={styles.warning}>Saved timing remains authoritative. The preview is closed while the unsaved proposal is retained; save and reload the composition to preview changed instructions.</p>}
      <label className={styles.field}>Working-copy layer<select aria-label="Working-copy layer" value={layerId} disabled={controlsLocked || unsaved} onChange={event => chooseLayer(event.target.value)}><option value="">Choose a layer</option>{view.composition.layers.map(layer => <option key={layer.layerId} value={layer.layerId}>{layer.name} · {layer.type} — [{exactTime(layer.start)}, {exactTime(editorialAddTime(layer.start, layer.duration))}){layer.locked ? " (locked)" : ""}</option>)}</select></label>
      {selectedLayer?.locked && <p className={styles.warning}>This saved layer is locked. This mode cannot unlock or modify it.</p>}
      <details><summary>Saved timing and source identity</summary>
      {selectedLayer && selectedEnd && <section className={styles.layers} aria-label="Selected layer exact timing"><strong>{selectedLayer.name} · {selectedLayer.layerId}</strong><p>Saved: start {exactTime(selectedLayer.start)} · end {exactTime(selectedEnd)} · duration {exactTime(selectedLayer.duration)} · source offset {exactTime(selectedLayer.sourceOffset)}.</p>{moving && (moveDraftStart && moveDraftEnd ? <p role="status"><strong>Proposed move — not saved:</strong> start {exactTime(moveDraftStart)} · end {exactTime(moveDraftEnd)} · duration {exactTime(selectedLayer.duration)} · source offset {exactTime(selectedLayer.sourceOffset)}.</p> : <p role="status">The retained move input is incomplete, noncanonical, or outside the composition, so it is rejected as a visual proposal and cannot be saved until corrected.</p>)}{trimming && (trimDraftTiming ? <p role="status"><strong>Proposed {trimDraftTiming.edge === "IN" ? "In" : "Out"} trim — not saved:</strong> cut {exactTime(trimDraftTiming.trimPoint)} · start {exactTime(trimDraftTiming.start)} · end {exactTime(trimDraftTiming.end)} · duration {exactTime(trimDraftTiming.duration)} · source offset {exactTime(trimDraftTiming.sourceOffset)}.</p> : <p role="status">The retained trim input is incomplete, noncanonical, or not strictly inside the saved interval, so it is rejected as a visual proposal and cannot be saved until corrected.</p>)}</section>}
      </details>
      {selectedLayer && <details><summary>Replace selected video Take</summary>
        <fieldset disabled={controlsLocked || unsaved || renderActivity} className={styles.fields} aria-describedby={replacementHelpId}>
          <legend>Replace one selected layer</legend>
          <p id={replacementHelpId}>{replacementReason ?? "Ready for explicit replacement. Only this layer’s source/Take relationship changes. Its start, duration, source offset, ordering and visual properties stay unchanged. Undo and Redo preserve both Takes and their media."}</p>
          <p>Selected layer: {selectedLayer.name} · {selectedLayer.layerId}</p>
          {selectedLayer.source.kind === "ASSET" && <p className={styles.hash}>Current: {selectedLayer.source.takeId ?? "Direct Asset (no Take)"} · {selectedLayer.source.asset.assetId} v{selectedLayer.source.asset.version}</p>}
          <label className={styles.field}>Replacement video Take<select aria-label="Replacement video Take" aria-describedby={replacementHelpId} value={replacementTake?.takeId ?? ""} disabled={selectedLayer.locked || selectedLayer.type !== "VIDEO"} onChange={event => { if (!controlsLocked && !unsaved && !renderActivity && view) setReplacementChoice({ layerId: selectedLayer.layerId, headDigest: view.headDigest, takeId: event.target.value }); }}><option value="">Choose a Take for this selected layer</option>{compatibleTakes.filter(item => item.mediaType === "VIDEO").map(item => <option key={item.takeId} value={item.takeId} disabled={item.eligibility !== "READY"}>{item.name} — {item.duration ? exactTime(item.duration) : "duration unavailable"}</option>)}</select></label>
          {replacementTake && <p className={styles.hash}>Proposed Take: {replacementTake.takeId}. Source version and provenance remain immutable; selection alone is not an edit.</p>}
          <button type="button" aria-describedby={replacementHelpId} disabled={!!replacementReason} onClick={replaceSelectedTake}>Replace selected layer with Take</button>
        </fieldset>
      </details>}
      {values && selectedLayer && <fieldset disabled={controlsLocked || durationDirty || selectedLayer.locked || timing} className={styles.fields} aria-describedby={propertyHelpId}><legend>{selectedAudioLayer ? "Audio" : selectedTextLayer ? "Text" : "Video / visual"} properties</legend>
        <details className={workspaceStyles.fullRow}><summary>Property help and limits</summary><p id={propertyHelpId}>These controls publish only to the selected saved layer. A move, trim or split draft disables them; save or discard that timing edit before changing properties.{selectedTextLayer ? " Title text is single-line, uses the bundled Arial Regular font, and accepts an uppercase 6-digit hexadecimal colour." : selectedAudioLayer ? " Each exact fade is independent and must fit within the saved audio layer duration." : ""}</p></details>
        <label className={styles.check}><input aria-label="Enabled" type="checkbox" checked={values.enabled} onChange={event => change({ ...values, enabled: event.target.checked })} />Enabled</label>
        {!selectedAudioLayer && <label className={styles.field}>Opacity (0–1)<input aria-label="Opacity" aria-describedby={propertyHelpId} type="text" inputMode="decimal" maxLength={80} value={values.opacity} onChange={event => change({ ...values, opacity: event.target.value })} /></label>}
        {selectedTextLayer && values.text && <>
          <label className={styles.field}>Title text<input aria-label="Title text" aria-describedby={propertyHelpId} type="text" maxLength={256} value={values.text.text} onChange={event => change({ ...values, text: { ...values.text!, text: event.target.value } })} /></label>
          <label className={styles.field}>Title font<select aria-label="Title font" aria-describedby={propertyHelpId} value={values.text.fontRef} onChange={event => change({ ...values, text: { ...values.text!, fontRef: event.target.value } })}><option value="ARIAL_REGULAR">Arial Regular (bundled)</option></select></label>
          <label className={styles.field}>Title size (8–256 px)<input aria-label="Title size in pixels" aria-describedby={propertyHelpId} type="text" inputMode="numeric" maxLength={3} value={values.text.fontSizePx} onChange={event => change({ ...values, text: { ...values.text!, fontSizePx: event.target.value } })} /></label>
          <label className={styles.field}>Title colour (#RRGGBB)<input aria-label="Title colour" aria-describedby={propertyHelpId} type="text" inputMode="text" maxLength={7} value={values.text.color} onChange={event => change({ ...values, text: { ...values.text!, color: event.target.value } })} /></label>
        </>}
        {selectedAudioLayer && values.audio && <>
          <label className={styles.field}>Audio occurrence name<input aria-label="Audio occurrence name" aria-describedby={propertyHelpId} type="text" maxLength={STUDIO_COMPOSITION_LIMITS.name} value={values.name ?? selectedAudioLayer.name} onChange={event => change({ ...values, name: event.target.value })} /></label>
          <label className={styles.check}><input aria-label="Mute audio layer" aria-describedby={propertyHelpId} type="checkbox" checked={values.audio.muted} onChange={event => change({ ...values, audio: { ...values.audio!, muted: event.target.checked } })} />Mute audio layer</label>
          <label className={styles.field}>Gain (−60 to 12 dB)<input aria-label="Audio gain in decibels" aria-describedby={propertyHelpId} type="text" inputMode="decimal" maxLength={80} value={values.audio.gainDb} onChange={event => change({ ...values, audio: { ...values.audio!, gainDb: event.target.value } })} /></label>
          <label className={styles.field}>Fade in numerator<input aria-label="Fade in numerator" aria-describedby={propertyHelpId} type="text" inputMode="numeric" maxLength={16} value={values.audio.fadeIn.numerator} onChange={event => change({ ...values, audio: { ...values.audio!, fadeIn: { ...values.audio!.fadeIn, numerator: event.target.value } } })} /></label>
          <label className={styles.field}>Fade in denominator<input aria-label="Fade in denominator" aria-describedby={propertyHelpId} type="text" inputMode="numeric" maxLength={16} value={values.audio.fadeIn.denominator} onChange={event => change({ ...values, audio: { ...values.audio!, fadeIn: { ...values.audio!.fadeIn, denominator: event.target.value } } })} /></label>
          <label className={styles.field}>Fade out numerator<input aria-label="Fade out numerator" aria-describedby={propertyHelpId} type="text" inputMode="numeric" maxLength={16} value={values.audio.fadeOut.numerator} onChange={event => change({ ...values, audio: { ...values.audio!, fadeOut: { ...values.audio!.fadeOut, numerator: event.target.value } } })} /></label>
          <label className={styles.field}>Fade out denominator<input aria-label="Fade out denominator" aria-describedby={propertyHelpId} type="text" inputMode="numeric" maxLength={16} value={values.audio.fadeOut.denominator} onChange={event => change({ ...values, audio: { ...values.audio!, fadeOut: { ...values.audio!.fadeOut, denominator: event.target.value } } })} /></label>
        </>}
        {!selectedAudioLayer && <details className={workspaceStyles.fullRow}><summary>Transform precision</summary><div className={styles.fields}>
        {!selectedAudioLayer && transformFields.map(field => <label key={field} className={styles.field}>{labels[field]}<input aria-label={labels[field]} aria-describedby={propertyHelpId} type="text" inputMode="decimal" maxLength={80} value={values.transform[field]} onChange={event => change({ ...values, transform: { ...values.transform, [field]: event.target.value } })} /></label>)}
        </div></details>}
      </fieldset>}

          {!selectedLayer && <p>Select a layer in the timeline to edit its existing properties.</p>}
          {selectedLayer && <details open={precisionOpen} onToggle={event => setPrecisionOpen(event.currentTarget.open)}><summary>Exact timing · move, trim and split</summary>      {values && selectedAudioLayer && <fieldset disabled={controlsLocked || durationDirty || selectedAudioLayer.locked || (dirty && !audioTiming)} className={styles.fields} aria-describedby={audioTimingHelpId}><legend>Exact audio timing</legend>
        <p id={audioTimingHelpId}>Edit this occurrence’s start, duration and source offset together as reduced fractions of seconds, aligned exactly to 48,000 samples per second. Duration must be positive; both composition and source intervals must fit. Saved fades must fit the new duration. This changes no other occurrence, source media, level, mute setting or composition duration. Save or discard other edits first.</p>
        {(["start", "duration", "sourceOffset"] as const).flatMap(field => (["numerator", "denominator"] as const).map(part => <label key={`${field}-${part}`} className={styles.field}>Audio {field === "sourceOffset" ? "source offset" : field} {part}<input aria-label={`Audio ${field === "sourceOffset" ? "source offset" : field} ${part}`} aria-describedby={audioTimingHelpId} type="text" inputMode="numeric" maxLength={16} value={values.audioTiming?.[field][part] ?? String(selectedAudioLayer[field][part])} onChange={event => { const next = values.audioTiming ?? { start: timeText(selectedAudioLayer.start), duration: timeText(selectedAudioLayer.duration), sourceOffset: timeText(selectedAudioLayer.sourceOffset) }; change({ ...values, audioTiming: { ...next, [field]: { ...next[field], [part]: event.target.value } } }); }} /></label>))}
        {audioTiming && <p role="status">Exact audio timing draft — not saved. Saved audio export participation above is unchanged until Save succeeds and the composition is reloaded.</p>}
        <button type="button" aria-describedby={audioTimingHelpId} disabled={controlsLocked || !dirty || !audioTiming || selectedAudioLayer.locked} onClick={saveAudioTiming}>Save exact audio timing</button>
      </fieldset>}
      {values && selectedLayer && <fieldset disabled={controlsLocked || durationDirty || selectedLayer.locked || (dirty && !moving)} className={styles.fields} aria-describedby={moveHelpId}><legend>Move layer in time</legend>
        <p id={moveHelpId}>Start time in seconds as an exact reduced fraction. Duration, source offset and source media stay unchanged. Save or discard property, trim or split edits before moving.</p>
        {(["numerator", "denominator"] as const).map(part => <label key={part} className={styles.field}>Start time {part}<input aria-label={`Start time ${part}`} aria-describedby={moveHelpId} type="text" inputMode="numeric" maxLength={16} value={values.timelineStart?.[part] ?? String(selectedLayer.start[part])} onChange={event => change({ ...values, timelineStart: { numerator: String(selectedLayer.start.numerator), denominator: String(selectedLayer.start.denominator), ...values.timelineStart, [part]: event.target.value } })} /></label>)}
        <button type="button" aria-describedby={moveHelpId} disabled={controlsLocked || !dirty || !moving || selectedLayer.locked} onClick={moveLayer}>Save move</button>
      </fieldset>}
      {values && selectedLayer && trimDefault && <fieldset disabled={controlsLocked || durationDirty || selectedLayer.locked || (dirty && !trimming)} className={styles.fields} aria-describedby={trimHelpId}><legend>Trim layer in time</legend>
        <p id={trimHelpId}>Choose one exact composition-time point strictly inside the saved layer interval. In moves the start later and shortens the layer; Out moves the end earlier. A timed source advances only for an In trim. Source identity, original media, the other edge and other layers stay unchanged. Selected eligible video layers also expose inward-only timeline handles; activating a handle opens these exact inputs, while dragging and releasing creates only a local draft. Extension and ripple are unavailable.{dirty && !trimming ? " Save or discard the active property, move or split edit before trimming." : ""}</p>
        <label className={styles.field}>Trim edge<select aria-label="Trim edge" aria-describedby={trimHelpId} value={trimEdge} onChange={event => { const edge = event.target.value as LayerTrimEdge, fallback = edge === "IN" ? selectedLayer.start : selectedEnd!; setTrimPreferredEdge(edge); change({ ...values, timelineTrim: { edge, trimPoint: values.timelineTrim?.trimPoint ?? { numerator: String(fallback.numerator), denominator: String(fallback.denominator) } } }); }}><option value="IN">In — move start later</option><option value="OUT">Out — move end earlier</option></select></label>
        {(["numerator", "denominator"] as const).map(part => <label key={part} className={styles.field}>Trim point {part}<input ref={part === "numerator" ? trimPointInput : undefined} aria-label={`Trim point ${part}`} aria-describedby={trimHelpId} type="text" inputMode="numeric" maxLength={16} value={values.timelineTrim?.trimPoint[part] ?? String(trimDefault[part])} onChange={event => change({ ...values, timelineTrim: { edge: trimEdge, trimPoint: { numerator: String(trimDefault.numerator), denominator: String(trimDefault.denominator), ...values.timelineTrim?.trimPoint, [part]: event.target.value } } })} /></label>)}
        <button type="button" aria-describedby={trimHelpId} disabled={controlsLocked || !dirty || !trimming || selectedLayer.locked} onClick={trimLayer}>Trim layer to exact point</button>
      </fieldset>}
      {values && selectedLayer && <fieldset disabled={controlsLocked || durationDirty || !!splitUnavailable || (dirty && !splitting)} className={styles.fields} aria-describedby={splitHelpId}><legend>Split layer at composition time</legend>
        <p id={splitHelpId}>{splitUnavailable ?? "Enter one exact composition time strictly inside this saved video layer. The server derives adjacent left and right half-open intervals, source offsets and the new right-segment identity. Original media, immutable source version, Take, other layers and composition duration stay unchanged."}{dirty && !splitting ? " Save or discard the active property, move or trim edit before splitting." : ""}</p>
        {(["numerator", "denominator"] as const).map(part => <label key={part} className={styles.field}>Split composition time {part}<input aria-label={`Split composition time ${part}`} aria-describedby={splitHelpId} type="text" inputMode="numeric" maxLength={16} value={values.timelineSplit?.splitPoint[part] ?? ""} onChange={event => change({ ...values, timelineSplit: { splitPoint: { numerator: values.timelineSplit?.splitPoint.numerator ?? "", denominator: values.timelineSplit?.splitPoint.denominator ?? "", [part]: event.target.value } } })} /></label>)}
        {splitting && (splitProposal ? <div className={styles.warning} role="status" aria-label="Proposed exact split not saved"><strong>Proposed exact split — not saved</strong><p>Left: start {exactTime(splitProposal.left.start)}; duration {exactTime(splitProposal.left.duration)}; source offset {exactTime(splitProposal.left.sourceOffset)}.</p><p>Right: start {exactTime(splitProposal.right.start)}; duration {exactTime(splitProposal.right.duration)}; source offset {exactTime(splitProposal.right.sourceOffset)}.</p></div> : <p className={styles.muted}>No split proposal is available until both exact fraction fields identify a point strictly inside the saved interval.</p>)}
        <button type="button" aria-describedby={splitHelpId} disabled={controlsLocked || !dirty || !splitting || !!splitUnavailable || !splitProposal || selectedLayer.locked} onClick={splitLayer}>Save exact layer split</button>
      </fieldset>}
</details>}
        </> : <p>Load a composition, then select a layer.</p>}
      </aside>
      <SavedHeadRenderPanel projectId={projectId} compositionId={compositionId} savedHead={view ? { headDigest: view.headDigest, workingCopyRevision: view.revision, compositionRevision: view.composition.revision } : null} startBlocked={!!renderStartBlockReason} startBlockedReason={renderStartBlockReason} onBlockingRecoveryChange={setRenderRecoveryBlocked} onActivityChange={setRenderActivity} reviewActive={workspaceActive && viewerMode === "output"} hasUnsavedDraft={unsaved} onReviewRequested={() => setViewerMode("output")} renderLayout={({ exportControls, outputReview, feedback }) => <>
        {feedback && <div className={workspaceStyles.renderFeedback}>{feedback}</div>}
        <aside className={workspaceStyles.exportPanel} aria-label="Export and completed outputs" hidden={sidePanel !== "export"}>{exportControls}</aside>
        <section className={workspaceStyles.centre} aria-label="Completed rendered output" hidden={viewerMode !== "output"}>{outputReview}</section>
      </>} />
    </div>
  </section>;
}
