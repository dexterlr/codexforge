"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { validateCompositionV2, type CompositionV2, type LayerTrimEdge, type LayerV2 } from "../editorial-v2-contract";
import { makeEditorialRational, type EditorialRational } from "../editorial-time";
import { activeV2Layers, exactTimeLabel, readV2PreviewRangeProbe, readV2PreviewResponse, v2PreviewCandidates, v2SourceTime, V2_PREVIEW_TOTAL_BYTES } from "../editorial-v2-viewer";
import { FoundationCopyTimeline, type TimelineAuthority, type TimelineTrimDraft } from "./FoundationCopyTimeline";
import styles from "./CompositionPanel.module.css";

type Props = {
  projectId: string;
  composition: CompositionV2;
  headDigest: string;
  workingCopyRevision: number;
  selectedLayerId: string;
  selectionDisabled: boolean;
  previewDisabled: boolean;
  dragDisabled: boolean;
  timelineFrameRate: EditorialRational | null;
  moveDraftStart: EditorialRational | null;
  trimDraft: TimelineTrimDraft | null;
  onSelectLayer: (id: string) => void;
  onProposeMove: (layerId: string, start: EditorialRational, authority: TimelineAuthority) => void;
  onProposeTrim: (layerId: string, edge: LayerTrimEdge, trimPoint: EditorialRational, authority: TimelineAuthority) => void;
  onOpenTrimControls: (layerId: string, edge: LayerTrimEdge) => void;
  onGestureActiveChange: (active: boolean) => void;
  onUsePlayheadForSplit: (time: EditorialRational) => void;
  mediaActive?: boolean;
  renderLayout?: (surfaces: { workingPreview: ReactNode; timeline: ReactNode }) => ReactNode;
};
type Source = { url: string; mime: string };
type TextLayer = LayerV2 & { type: "TEXT"; text: { text: string; fontRef: "ARIAL_REGULAR"; fontSizePx: number; color: string } };
const key = (asset: { assetId: string; version: number }) => `${asset.assetId}@${asset.version}`;
const ENDPOINT = "/api/codexforge/animation-studio/editorial-v2/media";
const isTextLayer = (layer: LayerV2): layer is TextLayer => (layer as LayerV2 & { type: string }).type === "TEXT";

function StillFrame({ source, time, label }: { source: Source; time: EditorialRational; label: string }) {
  const video = useRef<HTMLVideoElement>(null), [status, setStatus] = useState(source.mime === "video/mp4" ? "Loading browser frame…" : "");
  // HTMLMediaElement takes floating-point seconds. This adapter never alters exact editorial time.
  const seconds = time.numerator / time.denominator;
  useEffect(() => {
    const element = video.current; if (!element) return;
    // React may replay effect setup after cleanup without recreating this element.
    // Restore only this already verified, explicitly loaded source; never autoplay.
    if (element.getAttribute("src") !== source.url) { element.setAttribute("src", source.url); element.load(); }
    const seek = () => {
      element.pause(); element.muted = true;
      if (element.readyState < 1) return;
      if (!Number.isFinite(element.duration) || seconds >= element.duration) { setStatus("The requested source time is outside this clip."); return; }
      setStatus("Seeking browser frame…");
      try { element.currentTime = seconds; ready(); } catch { setStatus("This browser could not seek the clip."); }
    };
    const ready = () => { if (!element.seeking && element.readyState >= 2 && Math.abs(element.currentTime - seconds) < 0.05) setStatus(""); };
    element.addEventListener("loadedmetadata", seek); element.addEventListener("loadeddata", ready); element.addEventListener("seeked", ready); seek();
    return () => { element.pause(); element.removeEventListener("loadedmetadata", seek); element.removeEventListener("loadeddata", ready); element.removeEventListener("seeked", ready); element.removeAttribute("src"); element.load(); };
  }, [seconds, source.url]);
  return <>{source.mime === "video/mp4" ? <video ref={video} src={source.url} muted playsInline preload="metadata" aria-label={label} className={styles.media} onError={() => setStatus("Browser video decoding failed.")} /> : <img src={source.url} alt={label} className={styles.media} onError={() => setStatus("Browser image decoding failed.")} />}{status && <div className={styles.placeholder}>{label}<br />{status}</div>}</>; // eslint-disable-line @next/next/no-img-element
}

function TextFrame({ layer, width, height }: { layer: TextLayer; width: number; height: number }) {
  const anchor = layer.transform.anchorX <= 0.25 ? "start" : layer.transform.anchorX >= 0.75 ? "end" : "middle";
  const x = width / 2 + layer.transform.x, y = height / 2 + layer.transform.y;
  return <svg className={styles.textPreview} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${layer.name}: ${layer.text.text}`} preserveAspectRatio="xMidYMid meet">
    <g transform={`translate(${x} ${y}) rotate(${layer.transform.rotationDeg}) scale(${layer.transform.scaleX} ${layer.transform.scaleY})`}>
      <text x="0" y="0" textAnchor={anchor} dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize={layer.text.fontSizePx} fill={layer.text.color}>{layer.text.text}</text>
    </g>
  </svg>;
}

/** Only saved authority changes remount the controller; panels and drafts are not history. */
export function FoundationCopyViewer(props: Props) {
  let composition: CompositionV2;
  try { composition = validateCompositionV2(props.composition); if (composition.projectId !== props.projectId || !/^[a-f0-9]{64}$/u.test(props.headDigest)) throw Error(); }
  catch { return <p role="alert" className={styles.error}>The selected composition cannot be displayed safely.</p>; }
  return <SavedViewer key={`${props.projectId}:${props.headDigest}:${composition.compositionId}:${composition.revision}`} {...props} composition={composition} />;
}

function SavedViewer({ projectId, composition, headDigest, workingCopyRevision, selectedLayerId, selectionDisabled, previewDisabled, dragDisabled, timelineFrameRate, moveDraftStart, trimDraft, onSelectLayer, onProposeMove, onProposeTrim, onOpenTrimControls, onGestureActiveChange, onUsePlayheadForSplit, mediaActive = true, renderLayout }: Props) {
  const [time, setTime] = useState(() => makeEditorialRational(0, 1)), [sources, setSources] = useState<Record<string, Source>>({});
  const [failed, setFailed] = useState<Record<string, boolean>>({}), [open, setOpen] = useState(false), [busy, setBusy] = useState(false), [notice, setNotice] = useState("");
  const active = useRef<AbortController | null>(null), urls = useRef(new Map<string, string>()), mounted = useRef(false);
  const nested = composition.layers.some(layer => layer.source.kind === "COMPOSITION");
  useEffect(() => { mounted.current = true; const owned = urls.current; return () => { mounted.current = false; active.current?.abort(); active.current = null; for (const url of owned.values()) URL.revokeObjectURL(url); owned.clear(); }; }, []);
  useEffect(() => {
    if (mediaActive && !previewDisabled) return;
    active.current?.abort(); active.current = null;
    for (const url of urls.current.values()) URL.revokeObjectURL(url); urls.current.clear();
    setSources({}); setOpen(false); setBusy(false);
    // Retain any visible failure/notice; changing the viewer mode must not hide it.
    // The exact playhead and sole mounted timeline are independent of media lifetime.
  }, [mediaActive, previewDisabled]);
  function close() {
    active.current?.abort(); active.current = null;
    for (const url of urls.current.values()) URL.revokeObjectURL(url); urls.current.clear();
    setSources({}); setFailed({}); setOpen(false); setBusy(false); setNotice("Preview closed. Saved instructions and source media are unchanged.");
  }
  async function load() {
    if (active.current || nested || previewDisabled || !mediaActive) return;
    close(); const controller = new AbortController(); active.current = controller; setBusy(true); setOpen(true); setNotice("Loading explicitly selected, source-bound media…");
    const timer = window.setTimeout(() => controller.abort(), 30_000), collected: Record<string, Source> = {}, failures: Record<string, boolean> = {}; let total = 0;
    try {
      for (const candidate of v2PreviewCandidates(composition, headDigest)) {
        if (controller.signal.aborted) throw Error("Stopped.");
        if (total >= V2_PREVIEW_TOTAL_BYTES) { failures[key(candidate)] = true; continue; }
        try {
          const query = new URLSearchParams({ projectId, compositionId: composition.compositionId, headDigest, assetId: candidate.assetId, version: String(candidate.version) });
          const url = `${ENDPOINT}?${query}`;
          const response = await fetch(url, { cache: "no-store", credentials: "same-origin", redirect: "error", headers: { "X-CodexForge-Animation-Studio": "local-operator-v1", ...(candidate.type === "VIDEO" ? { Range: "bytes=0-11" } : {}) }, signal: controller.signal });
          if (candidate.type === "VIDEO") {
            const source = await readV2PreviewRangeProbe(response, candidate, controller.signal);
            if (controller.signal.aborted || !mounted.current || active.current !== controller) return;
            collected[key(candidate)] = { url, mime: source.mime };
          } else {
            const source = await readV2PreviewResponse(response, candidate, V2_PREVIEW_TOTAL_BYTES - total, controller.signal);
            if (controller.signal.aborted || !mounted.current || active.current !== controller) return;
            total += source.bytes; const blobUrl = URL.createObjectURL(source.blob); urls.current.set(key(candidate), blobUrl); collected[key(candidate)] = { url: blobUrl, mime: source.mime };
          }
        } catch { if (controller.signal.aborted) throw Error("Stopped."); failures[key(candidate)] = true; }
      }
      if (mounted.current && active.current === controller) { setSources(collected); setFailed(failures); setNotice(Object.keys(failures).length ? "Some source bindings, bytes or supported formats could not be verified. Their layers remain placeholders; nothing was retried automatically." : "Bounded local preview loaded. Video bytes stream on demand; saved instructions only, with no autoplay or generation."); }
    } catch { if (mounted.current && active.current === controller) { setSources(collected); setFailed(failures); setNotice("Preview loading stopped or timed out. Use Load working-copy preview for an explicit retry."); } }
    finally { window.clearTimeout(timer); if (active.current === controller) { active.current = null; if (mounted.current) setBusy(false); } }
  }
  const activeLayers = activeV2Layers(composition, time), visualLayers = activeLayers.filter(layer => (layer as LayerV2 & { type: string }).type !== "AUDIO");
  const workingPreview = <section key="working-preview" className={styles.viewerSection} aria-label="Saved working-copy viewer">
    <div data-preview-toolbar className={styles.heading}><h4>Saved preview</h4>
    <div className={styles.actions}><button type="button" disabled={busy || nested || previewDisabled || !mediaActive} onClick={() => void load()}>Load working-copy preview</button>{busy && <button type="button" onClick={() => active.current?.abort()}>Stop preview loading</button>}{open && <button type="button" onClick={close}>Close working-copy preview</button>}</div>
    </div>
    {previewDisabled && <p className={styles.warning}>Preview is closed while an edit, request or source check is unresolved. Save and reload the composition to preview changed instructions.</p>}
    <div data-preview-stage>
    <div data-preview-picture className={styles.viewer} style={{ aspectRatio: `${composition.width}/${composition.height}`, "--preview-ratio": composition.width / composition.height } as CSSProperties}>
      {nested ? <div className={styles.placeholder}>Nested compositions are preserved but not loaded. The entire media preview is blocked.</div> : !mediaActive ? <div className={styles.placeholder}>Working-copy media is closed while another viewer mode is selected.</div> : previewDisabled || !open ? <div className={styles.placeholder}>Load the working-copy preview explicitly to fetch bounded local source media.</div> : visualLayers.length === 0 ? <div className={styles.placeholder}>{activeLayers.length ? "Audio is active at this exact time; this browser preview remains silent." : "No enabled layer is active at this exact time."}</div> : visualLayers.map(layer => {
        if (isTextLayer(layer)) return <div className={styles.visualLayer} style={{ opacity: layer.opacity }} key={layer.layerId} data-layer-id={layer.layerId}><TextFrame layer={layer} width={composition.width} height={composition.height} /></div>;
        if (layer.source.kind !== "ASSET") return null;
        const source = sources[key(layer.source.asset)], transform: CSSProperties = { opacity: layer.opacity, transformOrigin: `${layer.transform.anchorX * 100}% ${layer.transform.anchorY * 100}%`, transform: `translate(${layer.transform.x / composition.width * 100}%, ${layer.transform.y / composition.height * 100}%) rotate(${layer.transform.rotationDeg}deg) scale(${layer.transform.scaleX}, ${layer.transform.scaleY})` };
        // Still images need no source clock. A valid exact interval can have an
        // unrepresentable intermediate video offset at another layer's boundary.
        // Fail only that browser adapter, never round time or crash the timeline.
        let sourceTime = makeEditorialRational(0, 1), timeUnavailable = false;
        if (source?.mime === "video/mp4") { try { sourceTime = v2SourceTime(layer, time); } catch { timeUnavailable = true; } }
        return <div className={styles.visualLayer} style={transform} key={layer.layerId} data-layer-id={layer.layerId}>{timeUnavailable ? <div className={styles.placeholder}>{layer.name}<br />Exact source time cannot be represented for this browser preview. Saved timing is unchanged.</div> : source ? <StillFrame key={`${source.url}:${exactTimeLabel(time)}`} source={source} time={sourceTime} label={layer.name} /> : <div className={`${styles.placeholder} ${styles.unavailableLayer}`}>{layer.name}<br />{failed[key(layer.source.asset)] ? "Source unavailable or verification failed" : "Source not loaded"}</div>}</div>;
      })}
    </div>
    </div>
    {notice && !notice.startsWith("Bounded local preview loaded.") && <p role="status" className={styles.muted}>{notice}</p>}
    <details data-preview-details><summary>Saved only · silent approximate preview · limits and source details</summary>
      {notice.startsWith("Bounded local preview loaded.") && <p role="status" className={styles.muted}>{notice}</p>}
      <p className={styles.muted}>{composition.width} × {composition.height} · exact duration {exactTimeLabel(composition.duration)}</p>
      <p className={styles.muted}>Saved only · silent approximate seeking and title layout, not frame-accurate playback or rendered output.</p>
      <p className={styles.muted}>The media preview renders saved instructions only; a local timeline move or inward-trim proposal may appear below but is never previewed or saved implicitly. Layer order remains read-only, and selection uses the existing inspector.</p>
      <p className={styles.muted}>Audio layers remain visible on the timeline but are reviewed through a completed export, not live synchronized playback. Large videos use bounded same-origin range reads instead of a whole-file browser Blob; small still images remain capped by the 64 MiB preview budget.</p>
    </details>
  </section>;
  const timeline = <FoundationCopyTimeline key="working-timeline" composition={composition} headDigest={headDigest} workingCopyRevision={workingCopyRevision} selectedLayerId={selectedLayerId} selectionDisabled={selectionDisabled} dragDisabled={dragDisabled} timelineFrameRate={timelineFrameRate} moveDraftStart={moveDraftStart} trimDraft={trimDraft} playhead={time} onPlayheadChange={setTime} onSelectLayer={onSelectLayer} onProposeMove={onProposeMove} onProposeTrim={onProposeTrim} onOpenTrimControls={onOpenTrimControls} onGestureActiveChange={onGestureActiveChange} onUsePlayheadForSplit={onUsePlayheadForSplit} />;
  return renderLayout ? renderLayout({ workingPreview, timeline }) : <section className={styles.viewerSection} aria-label="Saved working-copy viewer and timeline">{workingPreview}{timeline}</section>;
}
