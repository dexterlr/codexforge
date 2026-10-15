"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Asset, AssetRef } from "../domain";
import type { StudioMediaAvailability, StudioSnapshot } from "../store.server";
import { activeCompositionLayers, defaultLayerTransform, STUDIO_COMPOSITION_LIMITS, validateEditorialContent } from "../composition-contract";
import type { EditorialContent, EditorialTake, ShotComposition, StudioLayer } from "../composition-contract";
import { isQualifiedLocalMediaAsset } from "../footage-contract";
import styles from "./CompositionPanel.module.css";

const ENDPOINT = "/api/codexforge/animation-studio/editorial";
const FOOTAGE_ENDPOINT = "/api/codexforge/animation-studio/footage";
const HEADERS = { "X-CodexForge-Animation-Studio": "local-operator-v1" };
const MAX_REQUEST = 32_768, MAX_MEDIA = 16 * 1024 * 1024, MAX_PREVIEW = 64 * 1024 * 1024;
type Result = { snapshot: StudioSnapshot; mediaAvailability: StudioMediaAvailability[]; editorial: { revision: number; content: EditorialContent } };
type Pending = { projectId: string; key: string; body: string };
type PreviewSource = { url: string; mime: string };
type Props = { projectId: string; disabled: boolean; workspaceActive?: boolean; onBusyChange?: (busy: boolean) => void; onReadyChange?: (ready: boolean) => void };
const sourceKey = (asset: AssetRef) => `${asset.assetId}@${asset.version}`;
const storageKey = (projectId: string) => `codexforge.studio.editorial.pending.v1.${projectId}`;
const copy = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const sourceName = (asset: Asset) => {
  const value = asset.provenance.adapterMetadata?.settings.originalName;
  return typeof value === "string" ? value : `${asset.assetType.toLowerCase()} ${asset.assetId}`;
};
function responseResult(payload: unknown, projectId: string): Result {
  const result = (payload as { result?: Result } | null)?.result;
  if (!result || result.snapshot?.project?.projectId !== projectId || !Number.isSafeInteger(result.snapshot.project.revision) || !Array.isArray(result.snapshot.assets) || !Array.isArray(result.snapshot.shots) || !Array.isArray(result.mediaAvailability) || !Number.isSafeInteger(result.editorial?.revision) || result.editorial.revision < 0) throw Error("The local service returned an incomplete editorial result. No save has been assumed.");
  const snapshot = result.snapshot;
  const content = validateEditorialContent(result.editorial.content, { projectId: snapshot.project.projectId, shots: snapshot.shots, assets: snapshot.assets });
  const seen = new Set<string>();
  for (const item of result.mediaAvailability) {
    const key = sourceKey(item);
    if (seen.has(key) || !snapshot.assets.some(asset => sourceKey(asset) === key) || (item.status !== "ONLINE" && item.status !== "OFFLINE") || (item.status === "ONLINE" ? !["VERIFIED_BYTES", "VERIFIED_INDEX"].includes(item.reason) : item.reason !== "UNAVAILABLE_OR_INTEGRITY_FAILED")) throw Error("Media availability could not be verified.");
    seen.add(key);
  }
  if (seen.size !== snapshot.assets.length) throw Error("Media availability is incomplete.");
  return { ...result, editorial: { revision: result.editorial.revision, content } };
}
function parsePending(value: string, projectId: string): Pending {
  if (new TextEncoder().encode(value).length > 2 * MAX_REQUEST) throw Error("Saved recovery data is too large.");
  const pending = JSON.parse(value) as Pending;
  if (!pending || Object.keys(pending).sort().join() !== "body,key,projectId" || pending.projectId !== projectId || typeof pending.key !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(pending.key) || typeof pending.body !== "string" || new TextEncoder().encode(pending.body).length > MAX_REQUEST) throw Error("Saved recovery data is invalid.");
  const body = JSON.parse(pending.body);
  if (!body || Object.keys(body).sort().join() !== "content,expectedProjectRevision,expectedRevision,projectId,requestedAt" || body.projectId !== projectId || !Number.isSafeInteger(body.expectedRevision) || body.expectedRevision < 0 || !Number.isSafeInteger(body.expectedProjectRevision) || body.expectedProjectRevision < 1 || typeof body.requestedAt !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(body.requestedAt)) throw Error("Saved recovery request is incomplete.");
  return pending;
}
function FrameVideo({ url, seconds, label }: { url: string; seconds: number; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("Loading browser frame…");
  useEffect(() => {
    const element = video.current;
    if (element && element.getAttribute("src") !== url) element.setAttribute("src", url);
    return () => { if (element) { element.pause(); element.removeAttribute("src"); element.load(); } };
  }, [url]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const seek = () => {
      element.pause(); element.muted = true;
      if (element.readyState < 1) return;
      if (!Number.isFinite(element.duration) || seconds >= element.duration) { setStatus("Source time is outside this clip."); return; }
      setStatus("Seeking browser frame…");
      try { element.currentTime = seconds; if (!element.seeking && element.readyState >= 2) setStatus(""); }
      catch { setStatus("This browser could not seek the clip."); }
    };
    const ready = () => { if (Math.abs(element.currentTime - seconds) < 0.05 && element.readyState >= 2) setStatus(""); };
    const failed = () => setStatus("This browser could not decode the clip.");
    element.addEventListener("loadedmetadata", seek); element.addEventListener("loadeddata", ready); element.addEventListener("seeked", ready); element.addEventListener("error", failed);
    seek();
    return () => { element.pause(); element.removeEventListener("loadedmetadata", seek); element.removeEventListener("loadeddata", ready); element.removeEventListener("seeked", ready); element.removeEventListener("error", failed); };
  }, [url, seconds]);
  return <><video ref={video} src={url} muted playsInline preload="metadata" aria-label={label} className={styles.media} />{status && <div className={styles.placeholder}>{label}<br />{status}</div>}</>;
}
function FrameImage({ url, label, onError }: { url: string; label: string; onError: () => void }) {
  // Only bounded, hash-verified local blobs enter here; an image optimizer must not refetch them.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={styles.media} src={url} alt={label} onError={onError} />;
}

export function CompositionPanel({ projectId, disabled, workspaceActive = true, onBusyChange, onReadyChange }: Props) {
  const [result, setResult] = useState<Result | null>(null);
  const [draft, setDraft] = useState<EditorialContent | null>(null);
  const [dirty, setDirty] = useState(false), [working, setWorking] = useState(false);
  const [pending, setPending] = useState<Pending | null>(null), [recoveryIssue, setRecoveryIssue] = useState("");
  const [error, setError] = useState(""), [notice, setNotice] = useState("");
  const [compositionId, setCompositionId] = useState(""), [layerId, setLayerId] = useState("");
  const [timeUs, setTimeUs] = useState(0), [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [sources, setSources] = useState<Record<string, PreviewSource>>({}), [previewOpen, setPreviewOpen] = useState(false), [previewBusy, setPreviewBusy] = useState(false);
  const [previewError, setPreviewError] = useState(""), [failedSources, setFailedSources] = useState<Record<string, boolean>>({});
  const active = useRef<AbortController | null>(null), mediaRequest = useRef<AbortController | null>(null);
  const mounted = useRef(false), dirtyRef = useRef(false), pendingRef = useRef<Pending | null>(null);
  const urls = useRef(new Map<string, string>());
  const suspendPreview = useCallback(() => {
    mediaRequest.current?.abort(); mediaRequest.current = null;
    for (const url of urls.current.values()) URL.revokeObjectURL(url);
    urls.current.clear(); setSources({}); setPreviewOpen(false); setPreviewBusy(false);
  }, []);
  const closePreview = useCallback(() => { suspendPreview(); setPreviewError(""); setFailedSources({}); }, [suspendPreview]);
  useEffect(() => { if (!workspaceActive) suspendPreview(); }, [workspaceActive, suspendPreview]);
  const load = useCallback(async (replaceDraft = false) => {
    if (active.current) return;
    const controller = new AbortController(); active.current = controller; setWorking(true); setError("");
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(`${ENDPOINT}?${new URLSearchParams({ projectId })}`, { cache: "no-store", credentials: "same-origin", headers: HEADERS, signal: controller.signal });
      const payload = await response.json();
      if (!response.ok || payload?.ok !== true) throw Error(payload?.error?.message ?? "The saved layered workspace could not be loaded.");
      const next = responseResult(payload, projectId);
      if (!mounted.current || controller.signal.aborted || active.current !== controller) return;
      closePreview();
      const retained = pendingRef.current;
      if (retained) {
        const body = JSON.parse(retained.body);
        const content = validateEditorialContent(body.content, { projectId: next.snapshot.project.projectId, shots: next.snapshot.shots, assets: next.snapshot.assets });
        setDraft(content); dirtyRef.current = true; setDirty(true);
        setResult({ ...next, editorial: { revision: body.expectedRevision, content } });
        setNotice("Saved metadata and media availability refreshed. The exact unresolved save is still retained; retry it explicitly to recover its outcome.");
      } else if (!dirtyRef.current || replaceDraft) {
        setResult(next); setDraft(copy(next.editorial.content)); dirtyRef.current = false; setDirty(false);
        setNotice(next.editorial.revision === 0 ? "Initial layered workspace loaded but not yet saved. Save the initial layered workspace before creating a working copy. No media preview was fetched." : "Saved layered workspace and source availability loaded. No media preview was fetched.");
      } else {
        setResult(previous => previous ? { ...previous, snapshot: next.snapshot, mediaAvailability: next.mediaAvailability } : next);
        setNotice("Source availability refreshed. Your local edits and their original editorial revision were preserved.");
      }
      setCompositionId(previous => next.editorial.content.compositions.some(item => item.compositionId === previous) ? previous : next.editorial.content.compositions[0]?.compositionId ?? "");
    } catch (cause) {
      if (mounted.current && active.current === controller) setError(controller.signal.aborted ? "Stopped waiting for metadata. Your edits and unresolved save were preserved." : cause instanceof Error ? cause.message : "The layered workspace could not be loaded.");
    } finally { window.clearTimeout(timeout); if (active.current === controller) { active.current = null; if (mounted.current) setWorking(false); } }
  }, [projectId, closePreview]);
  useEffect(() => {
    mounted.current = true;
    const ownedUrls = urls.current;
    const startup = window.setTimeout(() => {
      setResult(null); setDraft(null); setDirty(false); dirtyRef.current = false; pendingRef.current = null; setPending(null); setRecoveryIssue(""); setCompositionId(""); setLayerId(""); setTimeUs(0); setReviewNotes({});
      try {
        const value = sessionStorage.getItem(storageKey(projectId));
        if (value) { const operation = parsePending(value, projectId); pendingRef.current = operation; setPending(operation); }
      } catch { setRecoveryIssue("Session recovery data could not be read safely. Nothing has been submitted; keep this tab open and resolve browser storage before editing."); }
      void load();
    }, 0);
    return () => { mounted.current = false; window.clearTimeout(startup); active.current?.abort(); active.current = null; mediaRequest.current?.abort(); mediaRequest.current = null; for (const url of ownedUrls.values()) URL.revokeObjectURL(url); ownedUrls.clear(); };
  }, [projectId, load]);
  // A fast initial save can batch pending/working back to their original values.
  // Its confirmed revision must still release the immediate parent busy notice.
  useEffect(() => { onBusyChange?.(dirty || pending !== null || working || recoveryIssue !== ""); }, [dirty, pending, working, recoveryIssue, onBusyChange, result?.editorial.revision]);
  useEffect(() => { onReadyChange?.(result !== null && !working && recoveryIssue === ""); }, [result, working, recoveryIssue, onReadyChange]);
  useEffect(() => () => onReadyChange?.(false), [onReadyChange]);
  useEffect(() => () => onBusyChange?.(false), [onBusyChange]);
  useEffect(() => {
    if (!dirty && !pending) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, pending]);

  const composition = draft?.compositions.find(item => item.compositionId === compositionId) ?? null;
  const selectedLayer = composition?.layers.find(item => item.layerId === layerId) ?? null;
  const savedComposition = result?.editorial.content.compositions.find(item => item.compositionId === compositionId);
  const protectedLayer = (layer: StudioLayer) => layer.locked || savedComposition?.layers.some(saved => saved.layerId === layer.layerId && saved.locked) === true;
  const selectedProtected = selectedLayer ? protectedLayer(selectedLayer) : false;
  const selectedIndex = composition && selectedLayer ? composition.layers.indexOf(selectedLayer) : -1;
  const canMove = (direction: -1 | 1) => !!composition && !!selectedLayer && !selectedProtected && selectedIndex + direction >= 0 && selectedIndex + direction < composition.layers.length && !protectedLayer(composition.layers[selectedIndex + direction]);
  const locked = disabled || working || pending !== null || !!recoveryIssue;
  const assets = result?.snapshot.assets.filter(asset => asset.assetType === "VIDEO" || asset.assetType === "IMAGE") ?? [];
  const takes = draft?.takes.filter(take => take.shotId === composition?.shotId) ?? [];
  const online = (asset: AssetRef) => result?.mediaAvailability.some(item => sourceKey(item) === sourceKey(asset) && item.status === "ONLINE") ?? false;
  const nested = composition?.layers.some(layer => layer.type === "NESTED_COMPOSITION") ?? false;
  let previewValidationError = "";
  try { if (draft && result) validateEditorialContent(draft, { projectId: result.snapshot.project.projectId, shots: result.snapshot.shots, assets: result.snapshot.assets }); }
  catch { previewValidationError = "Preview stopped while layer properties are outside their supported bounds. Correct the values before continuing."; }
  // Revision zero is a validated, unpersisted default. Saving it is an explicit
  // initialization, even without edits; subsequent clean saves remain no-ops.
  const canSaveInitial = !!result && !!draft && result.editorial.revision === 0 && !previewValidationError;
  let activeLayers: StudioLayer[] = [];
  try { if (composition) activeLayers = activeCompositionLayers(composition, Math.min(timeUs, composition.durationUs)); } catch { /* An unfinished numeric edit cannot become an implicit preview. */ }
  function change(next: EditorialContent) {
    if (locked) return;
    setDraft(next); dirtyRef.current = true; setDirty(true); setError(""); setNotice("Local editorial edits — save to retain them. Original media is unchanged."); onBusyChange?.(true);
  }
  function changeComposition(update: (value: ShotComposition) => ShotComposition) {
    if (!draft || !composition) return;
    change({ ...draft, compositions: draft.compositions.map(item => item.compositionId === composition.compositionId ? update(item) : item) });
  }
  function changeLayer(update: (value: StudioLayer) => StudioLayer, allowUnlock = false) {
    if (!selectedLayer || (selectedProtected && !allowUnlock)) return;
    changeComposition(item => ({ ...item, layers: item.layers.map(layer => layer.layerId === selectedLayer.layerId ? update(layer) : layer) }));
  }
  function addTake(asset: Asset) {
    if (!draft || !composition?.shotId || takes.some(take => sourceKey(take.source) === sourceKey(asset)) || draft.takes.length >= STUDIO_COMPOSITION_LIMITS.takes) return;
    const take: EditorialTake = { schemaVersion: 1, takeId: `take_${crypto.randomUUID().replaceAll("-", "")}`, projectId: draft.projectId, shotId: composition.shotId, source: { assetId: asset.assetId, version: asset.version }, name: sourceName(asset).slice(0, 160), createdAt: new Date().toISOString(), review: { state: "UNREVIEWED", note: "", reviewedAt: null } };
    change({ ...draft, takes: [...draft.takes, take] });
  }
  function insertTake(take: EditorialTake) {
    if (!composition || composition.layers.length >= STUDIO_COMPOSITION_LIMITS.layersPerComposition || !online(take.source)) return;
    const asset = assets.find(item => sourceKey(item) === sourceKey(take.source)); if (!asset || (asset.assetType !== "VIDEO" && asset.assetType !== "IMAGE")) return;
    const now = new Date().toISOString();
    const layer: StudioLayer = { schemaVersion: 1, layerId: `layer_${crypto.randomUUID().replaceAll("-", "")}`, compositionId: composition.compositionId, name: take.name, type: asset.assetType, source: { kind: "ASSET", asset: { ...take.source }, takeId: take.takeId }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: composition.durationUs, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: now, updatedAt: now, version: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } };
    changeComposition(item => ({ ...item, layers: [...item.layers, layer] })); setLayerId(layer.layerId);
  }
  function reviewTake(take: EditorialTake, state: "ACCEPTED" | "REJECTED") {
    if (!draft) return; const note = reviewNotes[take.takeId]?.trim();
    if (!note) { setError("Write a brief human review note before accepting or rejecting this take editorially."); return; }
    change({ ...draft, takes: draft.takes.map(item => item.takeId === take.takeId ? { ...item, review: { state, note, reviewedAt: new Date().toISOString() } } : item) });
  }
  function moveLayer(direction: -1 | 1) {
    if (!composition || !selectedLayer || !canMove(direction)) return;
    const index = composition.layers.indexOf(selectedLayer), destination = index + direction;
    if (destination < 0 || destination >= composition.layers.length) return;
    const layers = [...composition.layers]; [layers[index], layers[destination]] = [layers[destination], layers[index]];
    changeComposition(item => ({ ...item, layers }));
  }
  async function send(operation: Pending) {
    if (active.current) return;
    try {
      parsePending(JSON.stringify(operation), projectId);
      // An interrupted first publication can make GET unavailable. Only the already-retained exact
      // request may be retried without that read; the server still validates every canonical binding.
      if (result) validateEditorialContent(JSON.parse(operation.body).content, { projectId: result.snapshot.project.projectId, shots: result.snapshot.shots, assets: result.snapshot.assets });
      const serialized = JSON.stringify(operation); sessionStorage.setItem(storageKey(projectId), serialized);
      if (sessionStorage.getItem(storageKey(projectId)) !== serialized) throw Error("Session recovery storage did not retain the exact save.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Exact recovery storage is unavailable. Nothing was submitted."); return; }
    const controller = new AbortController(); active.current = controller; pendingRef.current = operation; setPending(operation); setWorking(true); setError(""); onBusyChange?.(true);
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(ENDPOINT, { method: "POST", cache: "no-store", credentials: "same-origin", signal: controller.signal, headers: { ...HEADERS, "Content-Type": "application/json", "Idempotency-Key": operation.key }, body: operation.body });
      const payload = await response.json();
      if (controller.signal.aborted) throw Error("The save wait was stopped.");
      if (!response.ok || payload?.ok !== true) {
        const definitive = payload?.ok === false && ((response.status === 400 && ["invalid_editorial_request", "invalid_composition"].includes(payload.error?.code)) || (response.status === 409 && payload.error?.code === "editorial_revision_conflict"));
        const draftRetained = result !== null && draft !== null;
        if (definitive && draftRetained) { sessionStorage.removeItem(storageKey(projectId)); pendingRef.current = null; setPending(null); }
        throw Error(`${payload?.error?.message ?? "The save did not return a confirmed result."}${definitive ? draftRetained ? " Your local edits remain available for correction." : " The server rejected this save. Its exact recovery data is still retained because metadata could not be loaded; refresh saved metadata before correcting it." : " The exact request remains unresolved."}`);
      }
      const next = responseResult(payload, projectId);
      if (!mounted.current || active.current !== controller) return;
      sessionStorage.removeItem(storageKey(projectId)); pendingRef.current = null; setPending(null); setResult(next); setDraft(copy(next.editorial.content)); dirtyRef.current = false; setDirty(false);
      setNotice("Layered instructions saved. All takes and original media remain independent; no QC pass, asset approval or generation was granted.");
    } catch (cause) {
      if (mounted.current && active.current === controller) setError(controller.signal.aborted ? "Stopped waiting. The save may already have committed; cancellation does not undo it. The same body and retry key are retained for an explicit exact retry." : cause instanceof Error ? cause.message : "Save outcome unknown. The exact request is retained.");
    } finally { window.clearTimeout(timeout); if (active.current === controller) { active.current = null; if (mounted.current) setWorking(false); } }
  }
  function save() {
    if (locked || (!dirty && !canSaveInitial) || !draft || !result) return;
    try {
      const content = validateEditorialContent(draft, { projectId: result.snapshot.project.projectId, shots: result.snapshot.shots, assets: result.snapshot.assets });
      const body = JSON.stringify({ projectId, expectedRevision: result.editorial.revision, expectedProjectRevision: result.snapshot.project.revision, requestedAt: new Date().toISOString(), content });
      if (new TextEncoder().encode(body).length > MAX_REQUEST) throw Error("These instructions exceed the 32 KiB save limit. Reduce the new layers or review text before saving.");
      void send({ projectId, key: crypto.randomUUID(), body });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The layered instructions are not valid."); }
  }
  async function loadPreview() {
    if (!workspaceActive || !composition || !draft || !result || nested || previewBusy) return;
    try { validateEditorialContent(draft, { projectId: result.snapshot.project.projectId, shots: result.snapshot.shots, assets: result.snapshot.assets }); }
    catch { setPreviewError("Correct the invalid layer properties before loading a preview."); return; }
    closePreview(); const controller = new AbortController(); mediaRequest.current = controller; setPreviewBusy(true); setPreviewOpen(true);
    const timeout = window.setTimeout(() => controller.abort(), 30_000); let total = 0;
    const collected: Record<string, PreviewSource> = {}, failures: Record<string, boolean> = {};
    const candidates = new Map<string, Asset>();
    for (const layer of composition.layers) if (layer.enabled && layer.source.kind === "ASSET") { const ref = layer.source.asset, asset = assets.find(item => sourceKey(item) === sourceKey(ref)); if (asset && online(asset)) candidates.set(sourceKey(asset), asset); }
    try {
      for (const [key, asset] of candidates) {
        try {
          const query = new URLSearchParams({ projectId, assetId: asset.assetId, version: String(asset.version) });
          const directVideoUrl = `${FOOTAGE_ENDPOINT}?${query}`;
          const response = await fetch(asset.assetType === "VIDEO" ? directVideoUrl : `${ENDPOINT}/media?${query}`, { cache: "no-store", credentials: "same-origin", headers: { ...HEADERS, ...(asset.assetType === "VIDEO" ? { Range: "bytes=0-11" } : {}) }, signal: controller.signal });
          const mime = response.headers.get("Content-Type")?.split(";")[0].trim();
          if (asset.assetType === "VIDEO") {
            const range = /^bytes 0-11\/([1-9]\d*)$/u.exec(response.headers.get("Content-Range") ?? ""), hash = response.headers.get("X-CodexForge-Content-SHA256");
            if (response.status !== 206 || mime !== "video/mp4" || response.headers.get("Content-Length") !== "12" || !range || !Number.isSafeInteger(Number(range[1])) || hash !== asset.contentHash) { await response.body?.cancel(); throw Error("Source is unavailable or has an unsupported ranged preview binding."); }
            const header = new Uint8Array(await response.arrayBuffer());
            if (header.length !== 12 || String.fromCharCode(...header.subarray(4, 8)) !== "ftyp") throw Error("Source did not retain its admitted MP4 framing.");
            if (controller.signal.aborted || !mounted.current || mediaRequest.current !== controller) return;
            collected[key] = { url: directVideoUrl, mime }; continue;
          }
          if (!response.ok || !mime || !(mime === "image/png" || mime === "image/jpeg") || !response.body || Number(response.headers.get("Content-Length")) > MAX_MEDIA) { await response.body?.cancel(); throw Error("Source is unavailable or has an unsupported preview type."); }
          const reader = response.body.getReader(), chunks: Uint8Array<ArrayBuffer>[] = []; let bytes = 0;
          try { while (true) { const next = await reader.read(); if (next.done) break; bytes += next.value.byteLength; if (bytes > MAX_MEDIA || total + bytes > MAX_PREVIEW) { await reader.cancel(); throw Error("The bounded preview memory limit was reached."); } chunks.push(new Uint8Array(next.value)); } } finally { reader.releaseLock(); }
          if (bytes < 1) throw Error("Empty media cannot be previewed.");
          const blob = new Blob(chunks, { type: mime });
          const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-256", await blob.arrayBuffer()))].map(value => value.toString(16).padStart(2, "0")).join("");
          if (hash !== asset.contentHash) throw Error("The preview differs from its immutable source hash.");
          if (controller.signal.aborted || !mounted.current || mediaRequest.current !== controller) return;
          total += bytes; const url = URL.createObjectURL(blob); urls.current.set(key, url); collected[key] = { url, mime };
        } catch { if (controller.signal.aborted) throw Error("Preview loading stopped."); failures[key] = true; }
      }
      if (mounted.current && mediaRequest.current === controller) { setSources(collected); setFailedSources(failures); if (Object.keys(failures).length) setPreviewError("Some sources could not be loaded or verified. Their layers remain placeholders; available sources are still shown. Refresh availability to recheck storage."); }
    } catch { if (mounted.current && mediaRequest.current === controller) { setSources(collected); setFailedSources(failures); setPreviewError("Preview loading stopped or timed out. Loaded sources remain available; use Load preview for an explicit retry."); } }
    finally { window.clearTimeout(timeout); if (mediaRequest.current === controller) { mediaRequest.current = null; if (mounted.current) setPreviewBusy(false); } }
  }
  const numberField = (label: string, value: number, changeValue: (value: number) => void, min: number, max: number, step = 1, inactive = false) => <label className={styles.field}>{label}<input type="number" aria-label={label} value={value} min={min} max={max} step={step} disabled={locked || selectedProtected || inactive} onChange={event => { if (event.target.value !== "" && Number.isFinite(event.target.valueAsNumber)) changeValue(event.target.valueAsNumber === 0 ? 0 : event.target.valueAsNumber); }} /></label>;

  return <section className={styles.panel} aria-labelledby="composition-heading">
    <header className={styles.heading}><div><p className={styles.eyebrow}>Non-destructive layered workspace</p><h2 id="composition-heading">Composition & takes</h2></div><span className={styles.badge}>Generation stays locked</span></header>
    <p className={styles.muted}>Build a shot from independent source layers. A preferred take is only a preference. This first interface saves timing, transforms and layer order; it is not a full timeline editor or final renderer.</p>
    <div className={styles.actions}><button type="button" disabled={working} onClick={() => void load()}>Refresh sources / reconnect</button><button type="button" disabled={locked || (!dirty && !canSaveInitial)} onClick={save}>{canSaveInitial && !dirty ? "Save initial layered workspace" : "Save layered edits"}</button>{dirty && !pending && <button type="button" disabled={working || disabled} onClick={() => void load(true)}>Discard local edits and reload</button>}{working && <button type="button" onClick={() => active.current?.abort()}>Stop waiting</button>}</div>
    <p role="status" aria-live="polite">{working ? "Working with the local editorial workspace…" : notice}</p>
    {recoveryIssue && <p className={styles.error} role="alert">{recoveryIssue}</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {disabled && !pending && <p className={styles.warning}>Resolve other workspace edits or requests before changing this composition.</p>}
    {pending && <div className={styles.warning}><strong>Exact save retained — no automatic retry</strong><p>The same bounded request and retry key are retained in this tab’s session recovery storage, including after a reload. Stopping the wait does not undo a possible save. If metadata is unavailable, an explicit exact retry still goes through full server validation; no new edit is substituted.</p><code>{pending.key}</code><div className={styles.actions}><button type="button" disabled={working || !!recoveryIssue} onClick={() => void send(pending)}>Retry exact layered save</button><button type="button" disabled={working} onClick={() => void load()}>Refresh saved metadata</button></div></div>}
    {draft && result && <>
      <label className={styles.field}>Shot composition<select aria-label="Shot composition" value={compositionId} disabled={working} onChange={event => { setCompositionId(event.target.value); setLayerId(""); setTimeUs(0); closePreview(); }}>{draft.compositions.map(item => <option key={item.compositionId} value={item.compositionId}>{item.name} · {item.kind === "SHOT" ? "Shot" : "Precomposition"}</option>)}</select></label>
      {!composition ? <p>No shot composition exists yet. Save a shot, then refresh this workspace.</p> : <>
        <section className={styles.viewerSection} aria-label="Layered frame viewer"><div className={styles.heading}><h3>Viewer</h3><span className={styles.muted}>{composition.width} × {composition.height} · {(composition.durationUs / 1_000_000).toFixed(3)} s</span></div>
          <div className={styles.viewer} style={{ aspectRatio: `${composition.width}/${composition.height}` }}>
            {nested ? <div className={styles.placeholder}>Nested composition instructions are preserved.<br />This first viewer cannot render nested layers, so the entire preview is stopped.</div> : previewValidationError ? <div className={styles.placeholder}>{previewValidationError}</div> : !workspaceActive || !previewOpen ? <div className={styles.placeholder}>Load preview explicitly to fetch local video/image sources.<br />No autoplay. No source footage is rewritten.</div> : activeLayers.map(layer => {
              if (layer.source.kind !== "ASSET") return null;
              const key = sourceKey(layer.source.asset), source = sources[key], available = online(layer.source.asset);
              const transform: CSSProperties = { opacity: layer.opacity, transformOrigin: `${layer.transform.anchorX * 100}% ${layer.transform.anchorY * 100}%`, transform: `translate(${layer.transform.x / composition.width * 100}%, ${layer.transform.y / composition.height * 100}%) rotate(${layer.transform.rotationDeg}deg) scale(${layer.transform.scaleX}, ${layer.transform.scaleY})` };
              return <div key={layer.layerId} className={styles.visualLayer} style={transform} data-layer-id={layer.layerId}>{!available || !source ? <div className={`${styles.placeholder} ${styles.unavailableLayer}`}>{layer.name}<br />{!available ? "Offline — source unavailable or integrity check failed" : failedSources[key] ? "Preview unavailable / unsupported" : "Source not loaded — load preview to include it"}</div> : source.mime === "video/mp4" ? <FrameVideo url={source.url} seconds={(timeUs - layer.startUs + layer.sourceOffsetUs) / 1_000_000} label={layer.name} /> : <FrameImage url={source.url} label={layer.name} onError={() => setFailedSources(previous => ({ ...previous, [key]: true }))} />}{source && source.mime !== "video/mp4" && failedSources[key] && <div className={styles.placeholder}>{layer.name}<br />Browser image decoding failed.</div>}</div>;
            })}
          </div>
          <label className={styles.field}>Scrub composition time · {(timeUs / 1_000_000).toFixed(3)} s<input aria-label="Scrub composition time" type="range" min={0} max={Math.max(0, composition.durationUs - 1)} step={1000} value={Math.min(timeUs, Math.max(0, composition.durationUs - 1))} onChange={event => setTimeUs(Number(event.target.value))} /></label>
          <div className={styles.actions}><button type="button" disabled={!workspaceActive || previewBusy || nested || working} onClick={() => void loadPreview()}>Load preview</button>{previewBusy && <button type="button" onClick={() => mediaRequest.current?.abort()}>Stop preview loading</button>}{previewOpen && <button type="button" onClick={closePreview}>Close preview</button>}</div>
          <p className={styles.muted}>Silent browser-seek preview; timing is approximate, not frame-accurate playback or rendered output. Large videos stream through bounded same-origin range reads; small still images remain within the 64 MiB browser-memory budget.</p>{previewError && <p className={styles.warning} role="alert">{previewError}</p>}
        </section>
        <div className={styles.workspace}>
          <section className={styles.layers} aria-label="Layer stack"><div className={styles.heading}><h3>Layers</h3><span className={styles.muted}>Top first</span></div>
            {composition.layers.length === 0 ? <p className={styles.muted}>Add an asset as a take, then insert it as a layer.</p> : <ol className={styles.layerList}>{[...composition.layers].reverse().map(layer => <li key={layer.layerId}><button type="button" aria-pressed={layer.layerId === layerId} className={styles.layerButton} onClick={() => setLayerId(layer.layerId)}><strong>{layer.name}</strong><span>{layer.type.replaceAll("_", " ")} · {layer.enabled ? "Enabled" : "Disabled"}{layer.locked ? " · Locked" : ""}{layer.solo ? " · Solo" : ""}</span><span>{layer.source.kind === "ASSET" ? online(layer.source.asset) ? "Source online" : "Source OFFLINE" : "Nested preview unsupported"}</span></button><div className={styles.timeTrack} aria-label={`${layer.name}: start ${layer.startUs} microseconds, duration ${layer.durationUs} microseconds`}><span style={{ left: `${Math.max(0, Math.min(100, layer.startUs / composition.durationUs * 100))}%`, width: `${Math.max(0, Math.min(100, layer.durationUs / composition.durationUs * 100))}%` }} /></div></li>)}</ol>}
            <div className={styles.actions}><button type="button" disabled={locked || !canMove(1)} onClick={() => moveLayer(1)}>Move layer up</button><button type="button" disabled={locked || !canMove(-1)} onClick={() => moveLayer(-1)}>Move layer down</button></div>
          </section>
          <section className={styles.inspector} aria-label="Layer properties"><h3>Layer properties</h3>{!selectedLayer ? <p className={styles.muted}>Choose a layer to adjust its instructions.</p> : <>
            <label className={styles.check}><input type="checkbox" checked={selectedLayer.locked} disabled={locked} onChange={event => changeLayer(layer => ({ ...layer, locked: event.target.checked }), true)} />Lock this layer</label>
            {!selectedLayer.locked && selectedProtected && <p className={styles.warning}>Save this layer’s unlock before changing its properties or order. The saved lock remains authoritative until that save succeeds.</p>}
            <label className={styles.field}>Layer name<input aria-label="Layer name" maxLength={160} value={selectedLayer.name} disabled={locked || selectedProtected} onChange={event => changeLayer(layer => ({ ...layer, name: event.target.value }))} /></label>
            <div className={styles.actions}><label className={styles.check}><input type="checkbox" checked={selectedLayer.enabled} disabled={locked || selectedProtected} onChange={event => changeLayer(layer => ({ ...layer, enabled: event.target.checked }))} />Enabled</label><label className={styles.check}><input type="checkbox" checked={selectedLayer.solo} disabled={locked || selectedProtected} onChange={event => changeLayer(layer => ({ ...layer, solo: event.target.checked }))} />Solo</label></div>
            <div className={styles.fields}>{numberField("Start (microseconds)", selectedLayer.startUs, value => changeLayer(layer => ({ ...layer, startUs: value })), 0, composition.durationUs)}{numberField("Duration (microseconds)", selectedLayer.durationUs, value => changeLayer(layer => ({ ...layer, durationUs: value })), 1, composition.durationUs)}{numberField("Source offset (microseconds)", selectedLayer.sourceOffsetUs, value => changeLayer(layer => ({ ...layer, sourceOffsetUs: value })), 0, STUDIO_COMPOSITION_LIMITS.durationUs, 1, selectedLayer.type === "IMAGE")}{numberField("Opacity (0–1)", selectedLayer.opacity, value => changeLayer(layer => ({ ...layer, opacity: value })), 0, 1, 0.05)}</div>
            <h4>Transform</h4><div className={styles.fields}>{([['x', 'Position X', -16384, 16384, 1], ['y', 'Position Y', -16384, 16384, 1], ['scaleX', 'Scale X', 0.01, 100, 0.05], ['scaleY', 'Scale Y', 0.01, 100, 0.05], ['rotationDeg', 'Rotation (degrees)', -3600, 3600, 1], ['anchorX', 'Anchor X (0–1)', 0, 1, 0.05], ['anchorY', 'Anchor Y (0–1)', 0, 1, 0.05]] as const).map(([field, label, min, max, step]) => <div key={field}>{numberField(label, selectedLayer.transform[field], value => changeLayer(layer => ({ ...layer, transform: { ...layer.transform, [field]: value } })), min, max, step)}</div>)}</div>
            <p className={styles.muted}>Position uses composition pixels; default source fitting preserves aspect ratio inside the canvas. Time uses whole microseconds (1,000,000 = 1 second). Source offset does not trim or rewrite the file.</p>
          </>}</section>
        </div>
        <section className={styles.browser} aria-label="Asset and take browser"><h3>Assets → independent takes → layers</h3><p className={styles.muted}>Every retained source version is available here, regardless of provider. Review is editorial only — it does not approve rights, assets or QC.</p>
          {!composition.shotId ? <p>Take creation belongs to a shot composition. Existing precomposition instructions remain available in the layer inspector.</p> : <>
            <div className={styles.assetGrid}>{assets.map(asset => { const added = takes.some(take => sourceKey(take.source) === sourceKey(asset)); return <article className={styles.assetCard} key={sourceKey(asset)}><strong>{sourceName(asset)}</strong><span>Version {asset.version} · {asset.assetType} · {online(asset) ? "Online" : "OFFLINE"}</span><span className={styles.muted}>Rights: {asset.rights.status} · Asset approval: {asset.approvalState}</span><button type="button" disabled={locked || added || !online(asset) || draft.takes.length >= STUDIO_COMPOSITION_LIMITS.takes} onClick={() => addTake(asset)}>{added ? "Take retained for this shot" : "Add asset as take"}</button></article>; })}</div>
            {assets.length === 0 && <p>No video or image asset is registered yet. Import footage above, then refresh sources.</p>}
            <ul className={styles.takeList}>{takes.map(take => { const preferred = draft.selectedTakes.some(item => item.shotId === take.shotId && item.takeId === take.takeId); const sourceAsset = assets.find(asset => sourceKey(asset) === sourceKey(take.source)); const exactWorkingCopyInsertion = !!sourceAsset && sourceAsset.assetType === "VIDEO" && isQualifiedLocalMediaAsset(sourceAsset); return <li key={take.takeId}><div className={styles.heading}><strong>{take.name} · version {take.source.version}</strong>{preferred && <span className={styles.badge}>Preferred source</span>}</div><p>{online(take.source) ? "Source online" : "Source OFFLINE — retained, never replaced"} · Editorial review: {take.review.state}</p>{exactWorkingCopyInsertion && <p className={styles.muted}>This qualified video is retained as a Take here. Insert it from the source-bound working copy so exact source coverage, Undo and Redo are enforced.</p>}<div className={styles.actions}><button type="button" disabled={locked || exactWorkingCopyInsertion || !online(take.source) || composition.layers.length >= STUDIO_COMPOSITION_LIMITS.layersPerComposition} onClick={() => insertTake(take)}>{exactWorkingCopyInsertion ? "Insert from working copy" : "Insert take as new layer"}</button><button type="button" disabled={locked || preferred} onClick={() => change({ ...draft, selectedTakes: [...draft.selectedTakes.filter(item => item.shotId !== take.shotId), { shotId: take.shotId, takeId: take.takeId }] })}>Prefer this take</button></div><label className={styles.field}>Human review note for {take.name}<input maxLength={STUDIO_COMPOSITION_LIMITS.reviewNote} disabled={locked} value={reviewNotes[take.takeId] ?? ""} onChange={event => setReviewNotes(previous => ({ ...previous, [take.takeId]: event.target.value }))} placeholder="What did you observe? This is not a QC or rights approval." /></label><div className={styles.actions}><button type="button" disabled={locked || !reviewNotes[take.takeId]?.trim()} onClick={() => reviewTake(take, "ACCEPTED")}>Accept editorially</button><button type="button" disabled={locked || !reviewNotes[take.takeId]?.trim()} onClick={() => reviewTake(take, "REJECTED")}>Reject editorially</button></div>{take.review.note && <p className={styles.muted}>Recorded review: {take.review.note}</p>}</li>; })}</ul>
          </>}
        </section>
      </>}
    </>}
  </section>;
}
