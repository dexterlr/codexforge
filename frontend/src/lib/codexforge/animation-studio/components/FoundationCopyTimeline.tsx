"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { trimLayerV2Time, type CompositionV2, type LayerTrimEdge, type LayerV2 } from "../editorial-v2-contract";
import {
  editorialAddTime,
  editorialCompareTime,
  editorialScaleTime,
  makeEditorialRational,
  validateEditorialRational,
  type EditorialRational,
} from "../editorial-time";
import { exactTimeLabel, timelineFrameDisplacement, timelineMoveProposal, timelinePercent, timelineTrimProposal } from "../editorial-v2-viewer";
import styles from "./CompositionPanel.module.css";

export type TimelineAuthority = { headDigest: string; revision: number; compositionRevision: number };
export type TimelineTrimDraft = { edge: LayerTrimEdge; trimPoint: EditorialRational };
type Props = {
  composition: CompositionV2;
  headDigest: string;
  workingCopyRevision: number;
  selectedLayerId: string;
  selectionDisabled: boolean;
  dragDisabled: boolean;
  timelineFrameRate: EditorialRational | null;
  moveDraftStart: EditorialRational | null;
  trimDraft: TimelineTrimDraft | null;
  playhead: EditorialRational;
  onPlayheadChange: (time: EditorialRational) => void;
  onSelectLayer: (id: string) => void;
  onProposeMove: (layerId: string, start: EditorialRational, authority: TimelineAuthority) => void;
  onProposeTrim: (layerId: string, edge: LayerTrimEdge, trimPoint: EditorialRational, authority: TimelineAuthority) => void;
  onOpenTrimControls: (layerId: string, edge: LayerTrimEdge) => void;
  onGestureActiveChange: (active: boolean) => void;
  onUsePlayheadForSplit: (time: EditorialRational) => void;
};

type GestureBase = {
  pointerId: number;
  layerId: string;
  startClientX: number;
  scrollLeft: number;
  viewportWidth: number;
  zoom: number;
  pixelsPerSecond: number;
  frameRate: EditorialRational;
  authority: TimelineAuthority;
  target: HTMLElement;
};
type MoveGesture = GestureBase & { kind: "MOVE"; originalStart: EditorialRational; layer: Pick<LayerV2, "start" | "duration"> };
type TrimGesture = GestureBase & { kind: "TRIM"; edge: LayerTrimEdge; originalEdge: EditorialRational; layer: Pick<LayerV2, "type" | "start" | "duration" | "sourceOffset"> };
type Gesture = MoveGesture | TrimGesture;
type TrimTiming = Pick<LayerV2, "start" | "duration" | "sourceOffset">;
type MoveGhost = { kind: "MOVE"; layerId: string; frames: number; start: EditorialRational | null };
type TrimGhost = { kind: "TRIM"; layerId: string; edge: LayerTrimEdge; frames: number; trimPoint: EditorialRational | null; timing: TrimTiming | null };
type Ghost = MoveGhost | TrimGhost;
type Tick = { key: string; left: number; label: string };

const MAX_TIMELINE_WIDTH = 32_768;
const ZOOM_STEPS = [1, 2, 4, 8, 16] as const;
const TICK_STEPS = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600] as const;

function seconds(value: EditorialRational): number { return value.numerator / value.denominator; }
function tickLabel(value: number, step: number): string { return `${step < 1 ? value.toFixed(step === 0.1 ? 1 : 2).replace(/\.0+$/u, "").replace(/(\.\d*?)0+$/u, "$1") : Math.round(value)} s`; }
function displayMoveStart(value: EditorialRational | null, layer: Pick<LayerV2, "duration">, compositionDuration: EditorialRational): EditorialRational | null {
  if (!value) return null;
  try { const start = validateEditorialRational(value); return editorialCompareTime(editorialAddTime(start, layer.duration), compositionDuration) <= 0 ? start : null; }
  catch { return null; }
}
function displayTrimTiming(value: TimelineTrimDraft | null, layer: Pick<LayerV2, "type" | "start" | "duration" | "sourceOffset">): TrimTiming | null {
  if (!value) return null;
  try { return trimLayerV2Time(layer, value.edge, value.trimPoint); }
  catch { return null; }
}
function trimDragUnavailability(layer: LayerV2, frameRate: EditorialRational | null, interactionLocked: boolean, barPixels: number): string | null {
  if (layer.locked) return "This saved layer is locked; visual trimming cannot modify or unlock it.";
  if (layer.type !== "VIDEO" || layer.source.kind !== "ASSET") return "Visual trim handles are available only for a direct-asset video layer.";
  if (layer.playbackRate !== 1 || layer.reverse || layer.keyframes.length !== 0) return "Visual trim handles are unavailable for retimed, reversed or animated layers; use the exact numeric trim controls where supported.";
  if (!frameRate) return "No unambiguous supported saved integer frame rate is available; use the exact numeric trim controls.";
  if (interactionLocked) return "Finish, save or discard the current edit or request before starting another timeline gesture.";
  if (!Number.isFinite(barPixels) || barPixels < 48) return "This saved bar is too short at the current zoom for reliable handle dragging; zoom in or use the exact numeric trim controls.";
  return null;
}
function sourceLabel(layer: LayerV2): string {
  if (layer.source.kind === "ASSET") return `${layer.source.asset.assetId}@${layer.source.asset.version}`;
  if (layer.source.kind === "COMPOSITION") return layer.source.compositionId;
  return "Editable text";
}

/** Display-only and bounded: at most 24 ticks are created for the visible window. */
export function visibleTimelineTicks(duration: EditorialRational, contentWidth: number, scrollLeft: number, viewportWidth: number): Tick[] {
  const total = seconds(validateEditorialRational(duration));
  if (!Number.isFinite(contentWidth) || !Number.isFinite(scrollLeft) || !Number.isFinite(viewportWidth) || contentWidth <= 0 || viewportWidth <= 0 || total <= 0) return [];
  const visibleStart = Math.max(0, Math.min(total, scrollLeft / contentWidth * total));
  const visibleEnd = Math.max(visibleStart, Math.min(total, (scrollLeft + viewportWidth) / contentWidth * total));
  const target = Math.max(0.1, (visibleEnd - visibleStart) / 8);
  const step = TICK_STEPS.find(candidate => candidate >= target) ?? TICK_STEPS[TICK_STEPS.length - 1];
  const first = Math.max(0, Math.floor(visibleStart / step) * step);
  const result: Tick[] = [];
  for (let value = first, count = 0; value <= visibleEnd + step * 0.000001 && count < 24; value += step, count++) {
    const stable = Number(value.toFixed(6));
    result.push({ key: `${step}:${stable}`, left: stable / total * 100, label: tickLabel(stable, step) });
  }
  return result;
}

function safeId(value: string): string { return value.replace(/[^a-z0-9_-]/giu, "-"); }

export function FoundationCopyTimeline(props: Props) {
  const { composition, headDigest, workingCopyRevision, selectedLayerId, selectionDisabled, dragDisabled, timelineFrameRate, moveDraftStart, trimDraft, playhead, onPlayheadChange, onSelectLayer, onProposeMove, onProposeTrim, onOpenTrimControls, onGestureActiveChange, onUsePlayheadForSplit } = props;
  const scroller = useRef<HTMLDivElement | null>(null), canvas = useRef<HTMLDivElement | null>(null), gesture = useRef<Gesture | null>(null);
  const suppressHandleClick = useRef<{ layerId: string; edge: LayerTrimEdge } | null>(null);
  const [zoom, setZoom] = useState<number>(1), [scrollLeft, setScrollLeft] = useState(0), [viewportWidth, setViewportWidth] = useState(720);
  const [ghost, setGhost] = useState<Ghost | null>(null), [status, setStatus] = useState(""), [playheadParts, setPlayheadParts] = useState({ numerator: String(playhead.numerator), denominator: String(playhead.denominator) });
  const layers = [...composition.layers].reverse(), durationSeconds = seconds(composition.duration);
  const contentWidth = Math.min(MAX_TIMELINE_WIDTH, Math.max(1, viewportWidth) * zoom), pixelsPerSecond = contentWidth / durationSeconds;
  const ticks = visibleTimelineTicks(composition.duration, contentWidth, scrollLeft, viewportWidth);
  const helpId = `visual-timeline-help-${safeId(composition.compositionId)}`, statusId = `visual-timeline-status-${safeId(composition.compositionId)}`;

  function release(target: HTMLElement, pointerId: number) {
    try { if (target.hasPointerCapture?.(pointerId)) target.releasePointerCapture(pointerId); } catch { /* Capture may already be gone. */ }
  }
  function finishGesture(message: string, keepGhost = false) {
    const current = gesture.current;
    if (!current) return;
    gesture.current = null;
    if (!keepGhost) setGhost(null);
    onGestureActiveChange(false);
    release(current.target, current.pointerId);
    setStatus(message);
  }
  function cancelGesture(message: string) { finishGesture(message, false); }

  useEffect(() => {
    const resize = () => {
      const width = Math.max(1, Math.floor(scroller.current?.clientWidth ?? 720));
      if (gesture.current && width !== gesture.current.viewportWidth) cancelGesture(`${gesture.current.kind === "TRIM" ? "Trim" : "Move"} gesture cancelled because the timeline viewport changed. No draft was created.`);
      setViewportWidth(width);
    };
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape" && gesture.current) { event.preventDefault(); cancelGesture(`${gesture.current.kind === "TRIM" ? "Trim" : "Move"} gesture cancelled with Escape. No draft was created.`); } };
    resize(); window.addEventListener("resize", resize); window.addEventListener("keydown", keydown);
    // Panel changes can resize the time viewport without a window resize.
    // Its actual width remains view state; a live gesture keeps its original scale.
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    if (scroller.current) observer?.observe(scroller.current);
    return () => { observer?.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("keydown", keydown); if (gesture.current) { const current = gesture.current; gesture.current = null; onGestureActiveChange(false); release(current.target, current.pointerId); } };
    // These callbacks are stable owners in the loaded-view lifetime; changing them must not resume a gesture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { setPlayheadParts({ numerator: String(playhead.numerator), denominator: String(playhead.denominator) }); }, [playhead.denominator, playhead.numerator]);
  useEffect(() => {
    const current = gesture.current;
    if (current && (current.layerId !== selectedLayerId || current.authority.headDigest !== headDigest || current.authority.revision !== workingCopyRevision || current.authority.compositionRevision !== composition.revision)) {
      cancelGesture(`${current.kind === "TRIM" ? "Trim" : "Move"} gesture cancelled because the selected layer or loaded saved authority changed. No draft was created.`);
    }
    // Cancellation must observe the loaded authority, but callback identity changes do not resume a gesture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composition.revision, headDigest, selectedLayerId, workingCopyRevision]);

  function updatePlayhead(next: EditorialRational) { onPlayheadChange(next); setPlayheadParts({ numerator: String(next.numerator), denominator: String(next.denominator) }); }
  function setExactPlayhead() {
    try {
      if (!/^(?:0|[1-9]\d*)$/u.test(playheadParts.numerator) || !/^[1-9]\d*$/u.test(playheadParts.denominator)) throw Error();
      const next = validateEditorialRational({ numerator: Number(playheadParts.numerator), denominator: Number(playheadParts.denominator) });
      if (editorialCompareTime(next, composition.duration) > 0) throw Error();
      updatePlayhead(next); setStatus(`Exact playhead set to ${exactTimeLabel(next)}. Saved instructions are unchanged.`);
    } catch { setStatus("Enter a reduced nonnegative exact playhead fraction within the composition. Saved instructions are unchanged."); }
  }
  function rulerClick(event: ReactPointerEvent<HTMLDivElement>) {
    if (gesture.current || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect(), width = Math.max(1, Math.round(rect.width));
    const pixel = Math.max(0, Math.min(width, Math.round(event.clientX - rect.left)));
    try {
      const next = pixel === width ? composition.duration : editorialScaleTime(composition.duration, makeEditorialRational(pixel, width));
      updatePlayhead(next); setStatus(`Playhead moved to ${exactTimeLabel(next)}. Saved instructions are unchanged.`);
    } catch { setStatus("The ruler position could not be represented exactly. Saved instructions are unchanged."); }
  }
  function beginMove(event: ReactPointerEvent<HTMLButtonElement>, layer: LayerV2) {
    if (event.button !== 0 || event.isPrimary === false || gesture.current) return;
    if (selectionDisabled || dragDisabled || layer.locked || !timelineFrameRate) {
      setStatus(layer.locked ? "This saved layer is locked; it cannot be dragged." : !timelineFrameRate ? "Drag-to-move is unavailable because this composition has no unambiguous supported saved frame rate. Use the exact numeric move controls." : "Finish, save or discard the current operation before starting another move gesture.");
      return;
    }
    event.preventDefault(); onSelectLayer(layer.layerId);
    const target = event.currentTarget;
    try { target.setPointerCapture(event.pointerId); } catch { setStatus("Pointer capture was unavailable. No move gesture started."); return; }
    const rate = validateEditorialRational(timelineFrameRate);
    gesture.current = { kind: "MOVE", pointerId: event.pointerId, layerId: layer.layerId, originalStart: layer.start, layer: { start: layer.start, duration: layer.duration }, startClientX: event.clientX, scrollLeft, viewportWidth, zoom, pixelsPerSecond, frameRate: rate, authority: { headDigest, revision: workingCopyRevision, compositionRevision: composition.revision }, target };
    setGhost({ kind: "MOVE", layerId: layer.layerId, frames: 0, start: layer.start }); onGestureActiveChange(true);
    setStatus(`Move gesture started for ${layer.name}, ID ${layer.layerId}, from exact start ${exactTimeLabel(layer.start)}. Release to create a local draft; nothing is saved during dragging.`);
  }
  function moveProposal(event: ReactPointerEvent<HTMLButtonElement>): { current: MoveGesture; frames: number; start: EditorialRational | null } | null {
    const current = gesture.current;
    if (!current || current.kind !== "MOVE" || current.pointerId !== event.pointerId) return null;
    if (current.scrollLeft !== scrollLeft || current.viewportWidth !== viewportWidth || current.zoom !== zoom || current.pixelsPerSecond !== pixelsPerSecond) {
      cancelGesture("Move gesture cancelled because zoom, scroll or viewport scale changed. No draft was created."); return null;
    }
    try {
      const frames = timelineFrameDisplacement(event.clientX - current.startClientX, current.pixelsPerSecond, current.frameRate);
      const start = timelineMoveProposal(current.layer, frames, current.frameRate, composition.duration);
      return { current, frames, start };
    } catch { return { current, frames: 0, start: null }; }
  }
  function movingMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const next = moveProposal(event); if (!next) return; event.preventDefault();
    setGhost({ kind: "MOVE", layerId: next.current.layerId, frames: next.frames, start: next.start });
    setStatus(next.start ? `Local ghost: ${next.frames >= 0 ? "+" : ""}${next.frames} frame${Math.abs(next.frames) === 1 ? "" : "s"}; proposed exact start ${exactTimeLabel(next.start)}. Not saved.` : `Rejected ghost at ${next.frames >= 0 ? "+" : ""}${next.frames} frames: the exact moved interval would leave the composition. Nothing was clamped or saved.`);
  }
  function endMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const next = moveProposal(event); if (!next) return; event.preventDefault();
    gesture.current = null; onGestureActiveChange(false); release(next.current.target, next.current.pointerId);
    if (next.frames === 0) { setGhost(null); setStatus(`Zero-frame gesture ended at the original exact start ${exactTimeLabel(next.current.originalStart)}. No draft was created.`); return; }
    if (!next.start) { setGhost(null); setStatus("The exact moved interval is outside the composition. The gesture was rejected without clamping, a draft or a save."); return; }
    setGhost({ kind: "MOVE", layerId: next.current.layerId, frames: next.frames, start: next.start });
    onProposeMove(next.current.layerId, next.start, next.current.authority);
    setStatus(`Local move draft created at exact start ${exactTimeLabel(next.start)}. Review the original and proposed timing, then choose Save move or Discard. No request was sent by the gesture.`);
  }
  function beginTrim(event: ReactPointerEvent<HTMLButtonElement>, layer: LayerV2, edge: LayerTrimEdge, barPixels: number) {
    event.stopPropagation();
    if (event.button !== 0 || event.isPrimary === false || gesture.current) return;
    const reason = trimDragUnavailability(layer, timelineFrameRate, selectionDisabled || dragDisabled, barPixels);
    if (reason) { setStatus(`${edge} inward-trim drag is unavailable for ${layer.name}, ID ${layer.layerId}. ${reason} Activate the handle without dragging to reach the exact numeric trim controls.`); return; }
    if (layer.layerId !== selectedLayerId || !timelineFrameRate) { setStatus("Select this saved layer by stable ID before starting a trim gesture. No draft was created."); return; }
    const target = event.currentTarget;
    try { target.setPointerCapture(event.pointerId); } catch { setStatus("Pointer capture was unavailable. No trim gesture started."); return; }
    event.preventDefault();
    const rate = validateEditorialRational(timelineFrameRate), originalEdge = edge === "IN" ? layer.start : editorialAddTime(layer.start, layer.duration);
    gesture.current = { kind: "TRIM", edge, originalEdge, pointerId: event.pointerId, layerId: layer.layerId, layer: { type: layer.type, start: layer.start, duration: layer.duration, sourceOffset: layer.sourceOffset }, startClientX: event.clientX, scrollLeft, viewportWidth, zoom, pixelsPerSecond, frameRate: rate, authority: { headDigest, revision: workingCopyRevision, compositionRevision: composition.revision }, target };
    setGhost(null); onGestureActiveChange(true);
    setStatus(`${edge} inward-trim gesture started for ${layer.name}, ID ${layer.layerId}, from original composition edge ${exactTimeLabel(originalEdge)}. Release creates only a local draft; nothing is saved during dragging.`);
  }
  function trimProposalFor(event: ReactPointerEvent<HTMLButtonElement>): { current: TrimGesture; frames: number; trimPoint: EditorialRational | null; timing: TrimTiming | null } | null {
    const current = gesture.current;
    if (!current || current.kind !== "TRIM" || current.pointerId !== event.pointerId) return null;
    if (current.layerId !== selectedLayerId || current.authority.headDigest !== headDigest || current.authority.revision !== workingCopyRevision || current.authority.compositionRevision !== composition.revision) {
      cancelGesture("Trim gesture cancelled because the selected layer or loaded saved authority changed. No draft was created."); return null;
    }
    if (current.scrollLeft !== scrollLeft || current.viewportWidth !== viewportWidth || current.zoom !== zoom || current.pixelsPerSecond !== pixelsPerSecond) {
      cancelGesture("Trim gesture cancelled because zoom, scroll or viewport scale changed. No draft was created."); return null;
    }
    try {
      const frames = timelineFrameDisplacement(event.clientX - current.startClientX, current.pixelsPerSecond, current.frameRate);
      if (frames === 0) return { current, frames, trimPoint: null, timing: null };
      const trimPoint = timelineTrimProposal(current.layer, current.edge, frames, current.frameRate);
      if (!trimPoint) return { current, frames, trimPoint: null, timing: null };
      const timing = trimLayerV2Time(current.layer, current.edge, trimPoint);
      return { current, frames, trimPoint, timing };
    } catch { return { current, frames: 0, trimPoint: null, timing: null }; }
  }
  function movingTrim(event: ReactPointerEvent<HTMLButtonElement>) {
    event.stopPropagation(); const next = trimProposalFor(event); if (!next) return; event.preventDefault();
    if (next.frames === 0) { setGhost(null); setStatus(`${next.current.edge} trim remains at its original exact edge ${exactTimeLabel(next.current.originalEdge)}. Release is a no-op and creates no draft.`); return; }
    setGhost({ kind: "TRIM", layerId: next.current.layerId, edge: next.current.edge, frames: next.frames, trimPoint: next.trimPoint, timing: next.timing });
    setStatus(next.trimPoint && next.timing
      ? `Local ${next.current.edge} trim ghost: ${next.frames >= 0 ? "+" : ""}${next.frames} frame${Math.abs(next.frames) === 1 ? "" : "s"}; composition cut ${exactTimeLabel(next.trimPoint)}; proposed start ${exactTimeLabel(next.timing.start)}, end ${exactTimeLabel(editorialAddTime(next.timing.start, next.timing.duration))}, duration ${exactTimeLabel(next.timing.duration)}, source offset ${exactTimeLabel(next.timing.sourceOffset)}. Not saved.`
      : `Rejected ${next.current.edge} trim ghost at ${next.frames >= 0 ? "+" : ""}${next.frames} frames: the gesture is outward, crossing or zero-length. Nothing was clamped or saved.`);
  }
  function endTrim(event: ReactPointerEvent<HTMLButtonElement>) {
    event.stopPropagation(); const next = trimProposalFor(event); if (!next) return; event.preventDefault();
    gesture.current = null; onGestureActiveChange(false); release(next.current.target, next.current.pointerId);
    if (next.frames === 0) {
      setGhost(null); suppressHandleClick.current = { layerId: next.current.layerId, edge: next.current.edge };
      onOpenTrimControls(next.current.layerId, next.current.edge);
      setStatus(`Zero-frame ${next.current.edge} trim ended at the original exact edge ${exactTimeLabel(next.current.originalEdge)}. No draft was created; the exact numeric trim controls were requested instead.`);
      return;
    }
    suppressHandleClick.current = { layerId: next.current.layerId, edge: next.current.edge };
    if (!next.trimPoint || !next.timing) { setGhost(null); setStatus(`The ${next.current.edge} trim was outward, crossing or zero-length. It was rejected without clamping, a draft or a save.`); return; }
    setGhost({ kind: "TRIM", layerId: next.current.layerId, edge: next.current.edge, frames: next.frames, trimPoint: next.trimPoint, timing: next.timing });
    onProposeTrim(next.current.layerId, next.current.edge, next.trimPoint, next.current.authority);
    setStatus(`Local ${next.current.edge} trim draft created at exact composition cut ${exactTimeLabel(next.trimPoint)}. Review the original and proposed timing, then save or discard explicitly. No request was sent by the gesture.`);
  }
  function openTrimControls(event: ReactMouseEvent<HTMLButtonElement>, layer: LayerV2, edge: LayerTrimEdge) {
    event.stopPropagation();
    const suppressed = suppressHandleClick.current;
    if (suppressed?.layerId === layer.layerId && suppressed.edge === edge) { suppressHandleClick.current = null; event.preventDefault(); return; }
    onOpenTrimControls(layer.layerId, edge);
    setStatus(`${edge} exact inward-trim controls requested for ${layer.name}, ID ${layer.layerId}. Activating a handle without dragging does not create a draft or save.`);
  }
  function lost(event: ReactPointerEvent<HTMLButtonElement>) { if (gesture.current?.pointerId === event.pointerId) cancelGesture(`Pointer capture was lost. The ${gesture.current.kind === "TRIM" ? "trim" : "move"} gesture was cancelled and no draft was created.`); }
  function cancelled(event: ReactPointerEvent<HTMLButtonElement>) { if (gesture.current?.pointerId === event.pointerId) cancelGesture(`Pointer interaction was cancelled. No ${gesture.current.kind === "TRIM" ? "trim" : "move"} draft was created.`); }
  function changeZoom(next: number) {
    if (gesture.current) { cancelGesture(`${gesture.current.kind === "TRIM" ? "Trim" : "Move"} gesture cancelled because zoom changed. No draft was created.`); return; }
    if (!ZOOM_STEPS.includes(next as (typeof ZOOM_STEPS)[number])) return;
    setZoom(next); if (next === 1 && scroller.current) scroller.current.scrollLeft = 0; setScrollLeft(next === 1 ? 0 : scroller.current?.scrollLeft ?? 0);
    setStatus(next === 1 ? "Timeline fitted to the composition. Saved instructions and history are unchanged." : `Timeline zoom set to ${next}×. Saved instructions and history are unchanged.`);
  }

  const playheadLeft = `${timelinePercent(playhead, composition.duration)}%`;
  return <section className={styles.visualTimeline} aria-label="Layer timeline" aria-describedby={`${helpId} ${statusId}`}>
    <div data-timeline-toolbar className={styles.timelineToolbar}>
      <h4>Layer timeline</h4>
      <div className={styles.actions} aria-label="Timeline zoom">
        <button type="button" disabled={zoom === ZOOM_STEPS[0] || !!gesture.current} onClick={() => changeZoom(ZOOM_STEPS[Math.max(0, ZOOM_STEPS.indexOf(zoom as (typeof ZOOM_STEPS)[number]) - 1)])}>Zoom out</button>
        <button type="button" disabled={zoom === ZOOM_STEPS[ZOOM_STEPS.length - 1] || !!gesture.current} onClick={() => changeZoom(ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, ZOOM_STEPS.indexOf(zoom as (typeof ZOOM_STEPS)[number]) + 1)])}>Zoom in</button>
        <button type="button" disabled={zoom === 1 || !!gesture.current} onClick={() => changeZoom(1)}>Fit composition</button><span>{zoom}×</span>
      </div>
      <details><summary>Playhead {exactTimeLabel(playhead)} · exact controls</summary><div className={styles.playheadControls} aria-label="Exact composition playhead">
        <span>Playhead {exactTimeLabel(playhead)}</span>
        <label>Numerator<input aria-label="Playhead numerator" type="text" inputMode="numeric" maxLength={16} value={playheadParts.numerator} onChange={event => setPlayheadParts(parts => ({ ...parts, numerator: event.target.value }))} /></label>
        <label>Denominator<input aria-label="Playhead denominator" type="text" inputMode="numeric" maxLength={16} value={playheadParts.denominator} onChange={event => setPlayheadParts(parts => ({ ...parts, denominator: event.target.value }))} /></label>
        <button type="button" onClick={setExactPlayhead}>Set playhead</button>
        <button type="button" disabled={!selectedLayerId || dragDisabled} onClick={() => onUsePlayheadForSplit(playhead)}>Use playhead for split input</button>
      </div></details>
      <details><summary>Timeline interaction help</summary>
        <p className={styles.muted}>{timelineFrameRate ? `Drag grid ${timelineFrameRate.denominator === 1 ? timelineFrameRate.numerator : `${timelineFrameRate.numerator}/${timelineFrameRate.denominator}`} fps` : "Exact numeric movement and trimming only"}</p>
        <p id={helpId} className={styles.muted}>Saved visual, text and audio bars use canonical layer order and exact intervals. Select by stable ID. Drag a bar body to propose a move. On a selected supported video, drag IN right or OUT left to propose an inward trim in composition coordinates. Release creates a recoverable local draft, never a save. Activate a handle without dragging to reach the exact numeric trim controls. Split input remains available only for a supported direct-asset video. Zoom, scroll and playhead are view state.</p>
      </details>
      <details><summary>Jump to a boundary</summary>
        <div className={styles.actions}><button type="button" onClick={() => updatePlayhead(makeEditorialRational(0, 1))}>Go to composition start</button><button type="button" onClick={() => updatePlayhead(composition.duration)}>Go to composition end</button>{selectedLayerId && (() => { const selected = composition.layers.find(layer => layer.layerId === selectedLayerId); return selected ? <><button type="button" onClick={() => updatePlayhead(selected.start)}>Go to selected layer start</button><button type="button" onClick={() => updatePlayhead(editorialAddTime(selected.start, selected.duration))}>Go to selected layer end</button></> : null; })()}</div>
      </details>
    </div>
    <div data-timeline-tracks>
    <div data-timeline-ruler-strip className={styles.timelineMatrix}>
      <div data-timeline-ruler-label className={styles.timelineCorner}>Top first</div>
      <div data-timeline-ruler-window>
        <div className={styles.timelineRuler} style={{ width: `${contentWidth}px`, transform: `translateX(${-scrollLeft}px)` }} aria-label={`Composition time ruler, exact duration ${exactTimeLabel(composition.duration)}`} onPointerDown={rulerClick}>{ticks.map(tick => <span key={tick.key} className={styles.timelineTick} style={{ left: `${tick.left}%` }}><span>{tick.label}</span></span>)}<span className={styles.playhead} style={{ left: playheadLeft }} aria-hidden="true" /></div>
      </div>
    </div>
    <div data-timeline-scroll>
    <div className={styles.timelineMatrix}>
      <div className={styles.timelineLabels} aria-label="Canonical layer labels">{layers.map(layer => <div data-timeline-row={layer.layerId} data-timeline-row-kind="label" className={styles.timelineLabel} key={layer.layerId} data-selected={selectedLayerId === layer.layerId || undefined}>
        <button type="button" aria-pressed={selectedLayerId === layer.layerId} disabled={selectionDisabled} onClick={() => onSelectLayer(layer.layerId)}><strong>{layer.name}</strong><span className={styles.srOnly}>{layer.layerId}</span></button>
        <span>{layer.type} · {sourceLabel(layer)}</span>
      </div>)}</div>
      <div ref={scroller} className={styles.timelineScroller} role="region" aria-label="Horizontally scrollable composition time" tabIndex={0} onScroll={event => { const next = event.currentTarget.scrollLeft; if (gesture.current && next !== gesture.current.scrollLeft) cancelGesture(`${gesture.current.kind === "TRIM" ? "Trim" : "Move"} gesture cancelled because the timeline scrolled. No draft was created.`); setScrollLeft(next); }}>
        <div ref={canvas} className={styles.timelineCanvas} style={{ width: `${contentWidth}px` }}>
          {layers.map(layer => {
            const selected = selectedLayerId === layer.layerId;
            const moveGhost = ghost?.kind === "MOVE" && ghost.layerId === layer.layerId ? ghost : null;
            const trimGhost = ghost?.kind === "TRIM" && ghost.layerId === layer.layerId ? ghost : null;
            const retainedTrim = selected ? displayTrimTiming(trimDraft, layer) : null;
            const draftMove = selected && !trimDraft ? displayMoveStart(moveDraftStart, layer, composition.duration) : null;
            const transientMove = moveGhost ? displayMoveStart(moveGhost.start, layer, composition.duration) : null;
            const moveStart = transientMove ?? draftMove;
            const proposalTiming = trimGhost?.timing ?? retainedTrim ?? (moveStart ? { start: moveStart, duration: layer.duration, sourceOffset: layer.sourceOffset } : null);
            const barStartPercent = timelinePercent(layer.start, composition.duration), barDurationPercent = timelinePercent(layer.duration, composition.duration);
            const barStyle: CSSProperties = { left: `${barStartPercent}%`, width: `${barDurationPercent}%` };
            const ghostStyle: CSSProperties | undefined = proposalTiming ? { left: `${timelinePercent(proposalTiming.start, composition.duration)}%`, width: `${timelinePercent(proposalTiming.duration, composition.duration)}%` } : undefined;
            const rejectedGhost = (moveGhost && moveGhost.start === null) || (trimGhost && trimGhost.frames !== 0 && (!trimGhost.trimPoint || !trimGhost.timing));
            const layerReasonId = `timeline-layer-reason-${safeId(layer.layerId)}`;
            const barPixels = seconds(layer.duration) * pixelsPerSecond;
            const showTrimHandles = selected && layer.type === "VIDEO" && layer.source.kind === "ASSET";
            const trimReason = showTrimHandles ? trimDragUnavailability(layer, timelineFrameRate, selectionDisabled || dragDisabled, barPixels) : null;
            const shortBarFallback = showTrimHandles && (!Number.isFinite(barPixels) || barPixels < 48);
            // A sub-frame-width saved bar cannot contain usable edge targets. Keep
            // the fallback pair inside this layer's own lane and near its midpoint;
            // it opens exact numeric controls but remains ineligible for dragging.
            const trimOverlayStyle: CSSProperties = shortBarFallback
              ? { left: `clamp(0px, calc(${barStartPercent + barDurationPercent / 2}% - 24px), calc(100% - 48px))`, width: "48px" }
              : barStyle;
            return <div data-timeline-row={layer.layerId} data-timeline-row-kind="lane" className={styles.timelineLane} key={layer.layerId} data-selected={selected || undefined}>
              <span className={styles.playhead} style={{ left: playheadLeft }} aria-hidden="true" />
              <button type="button" className={styles.timelineBar} style={barStyle} data-selected={selected || undefined} aria-pressed={selected} aria-describedby={`${helpId} ${layerReasonId}`} aria-label={`${layer.name}, ID ${layer.layerId}; saved exact start ${exactTimeLabel(layer.start)}, end ${exactTimeLabel(editorialAddTime(layer.start, layer.duration))}, duration ${exactTimeLabel(layer.duration)}. ${layer.locked ? "Locked; drag unavailable." : "Drag the bar body horizontally to propose an exact move."}`} onClick={() => { if (!gesture.current && !selectionDisabled) onSelectLayer(layer.layerId); }} onPointerDown={event => beginMove(event, layer)} onPointerMove={movingMove} onPointerUp={endMove} onPointerCancel={cancelled} onLostPointerCapture={lost}><span>{layer.name}</span></button>
              {rejectedGhost && <span data-timeline-ghost className={`${styles.timelineGhost} ${styles.timelineRejected}`} style={barStyle} aria-hidden="true" />}
              {proposalTiming && ghostStyle && <span data-timeline-ghost className={styles.timelineGhost} style={ghostStyle} aria-hidden="true" />}
              {showTrimHandles && <span data-timeline-trim-overlay className={`${styles.timelineTrimOverlay} ${shortBarFallback ? styles.timelineTrimShort : ""}`} style={trimOverlayStyle} data-short-bar-fallback={shortBarFallback ? "true" : undefined} aria-hidden="false">
                {(["IN", "OUT"] as const).map(edge => {
                  const reasonId = `timeline-trim-${edge.toLowerCase()}-reason-${safeId(layer.layerId)}`;
                  const savedEdge = edge === "IN" ? layer.start : editorialAddTime(layer.start, layer.duration);
                  return <span key={edge}>
                    <button type="button" className={`${styles.timelineTrimHandle} ${edge === "IN" ? styles.timelineTrimIn : styles.timelineTrimOut}`} data-layer-id={layer.layerId} data-timeline-edge={edge} data-drag-disabled={trimReason ? "true" : undefined} data-short-bar-fallback={shortBarFallback ? "true" : undefined} aria-describedby={`${helpId} ${reasonId}`} aria-label={`${layer.name}, ID ${layer.layerId}; ${edge} inward trim handle at saved exact composition edge ${exactTimeLabel(savedEdge)}. ${trimReason ? "Visual dragging is unavailable; activate this control" : `${edge === "IN" ? "Drag right" : "Drag left"} to shorten this layer, or activate without dragging`} to focus the exact numeric trim controls.`} title={`${edge} inward trim — ${layer.layerId}`} onClick={event => openTrimControls(event, layer, edge)} onPointerDown={event => beginTrim(event, layer, edge, barPixels)} onPointerMove={movingTrim} onPointerUp={endTrim} onPointerCancel={cancelled} onLostPointerCapture={lost}>{edge}</button>
                    <span id={reasonId} className={styles.srOnly}>{trimReason ?? `${edge === "IN" ? "Drag right from the original saved start" : "Drag left from the original saved end"} on the supported exact frame grid. Pointer release creates only a local ${edge} trim draft; explicit Save is separate.`} Timing is expressed in composition coordinates. Activate without dragging to use the existing exact numeric trim inputs.</span>
                  </span>;
                })}
              </span>}
              <span id={layerReasonId} className={styles.srOnly}>{layer.locked ? "This saved layer is locked." : dragDisabled ? "Another edit or operation must be resolved first." : timelineFrameRate ? "Pointer release creates a local move draft; Save move is separate." : "No unambiguous supported saved frame rate is available, so use exact numeric movement."}</span>
            </div>;
          })}
        </div>
      </div>
    </div>
    </div>
    </div>
    <p id={statusId} role="status" aria-live="polite" className={styles.timelineStatus}>{status || `${layers.length} saved layer${layers.length === 1 ? "" : "s"}; ${ticks.length} bounded visible ruler ticks. No media was loaded by this timeline.`}</p>
  </section>;
}
