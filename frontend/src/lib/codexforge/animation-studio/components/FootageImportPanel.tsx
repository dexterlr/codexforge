"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Asset } from "../domain";
import { STUDIO_FOOTAGE_D_STORAGE, isQualifiedLocalMediaAsset, localMediaTechnicalMetadata, validateLocalFootageAsset } from "../footage-contract";
import type { LocalMediaTechnicalMetadata } from "../footage-contract";
import type { StudioSnapshot } from "../store.server";
import styles from "./FootageImportPanel.module.css";

const ENDPOINT = "/api/codexforge/animation-studio/footage";
const UPLOAD_ENDPOINT = `${ENDPOINT}/upload`;
const MARKER = { "X-CodexForge-Animation-Studio": "local-operator-v1" };
const RIGHTS = ["UNKNOWN", "OWNED", "LICENSED", "PUBLIC_DOMAIN", "RESTRICTED"] as const;
const MAX_SOURCE_BYTES = 2 * 1024 * 1024 * 1024;
const MAX_PROJECT_LOGICAL_BYTES = 16 * 1024 * 1024 * 1024;
const MAX_HTTP_CHUNK_BYTES = 8 * 1024 * 1024;
const UPLOAD_STATES = ["UPLOADING", "VERIFYING", "PROBING", "PUBLISHING", "COMPLETE", "INTERRUPTED", "CANCELLED", "FAILED"] as const;
const PROGRESS_STEPS = ["Uploading", "Verifying", "Probing", "Publishing", "Complete"] as const;
type MediaType = "VIDEO" | "AUDIO";
type UploadState = typeof UPLOAD_STATES[number];
type UploadPhase = "IDLE" | "UPLOADING" | "FINALIZING" | "COMPLETE" | "INTERRUPTED";
type SavedUpload = { sessionId: string; projectId: string; fileName: string; fileSize: number; idempotencyKey: string | null };
type UploadStatus = SavedUpload & { status: UploadState; expectedBytes: number; receivedBytes: number; acknowledgedChunks: number; chunkBytes: number; maximumSourceBytes: number; canFinalize: boolean };
type Props = {
  snapshot: StudioSnapshot;
  disabled?: boolean;
  /** View-only suspension; upload/session requests and selected input stay intact. */
  active?: boolean;
  onImported: (snapshot: StudioSnapshot) => void;
  /** Also holds the parent edit lock while the outcome of an import is unresolved. */
  onBusyChange?: (busy: boolean) => void;
};

function responseSnapshot(payload: unknown, projectId: string): StudioSnapshot {
  const body = payload as { snapshot?: StudioSnapshot; result?: { snapshot?: StudioSnapshot } } | null;
  const value = body?.snapshot ?? body?.result?.snapshot;
  if (!value || value.schemaVersion !== 1 || value.project?.projectId !== projectId || !Number.isInteger(value.project.revision)
    || ![value.shots, value.assets, value.approvals, value.events, value.qcResults].every(Array.isArray)) {
    throw new Error("The local service returned an incomplete project. No import result has been assumed.");
  }
  return value;
}

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function resultObject(payload: unknown): Record<string, unknown> | null {
  const outer = object(payload), result = object(outer?.result);
  return result ?? outer;
}
function safeSessionId(value: unknown): value is string { return typeof value === "string" && /^upload_[a-f0-9]{48}$/u.test(value); }
function safeIdempotencyKey(value: unknown): value is string { return typeof value === "string" && /^[A-Za-z0-9_-]{8,128}$/u.test(value); }
function parseUploadStatus(payload: unknown, expected?: Partial<SavedUpload>): UploadStatus {
  const value = resultObject(payload);
  if (!value || !safeSessionId(value.sessionId) || !UPLOAD_STATES.includes(value.status as UploadState)
    || !Number.isSafeInteger(value.expectedBytes) || Number(value.expectedBytes) < 1 || Number(value.expectedBytes) > MAX_SOURCE_BYTES
    || !Number.isSafeInteger(value.receivedBytes) || Number(value.receivedBytes) < 0 || Number(value.receivedBytes) > Number(value.expectedBytes)
    || !Number.isSafeInteger(value.acknowledgedChunks) || Number(value.acknowledgedChunks) < 0
    || value.chunkBytes !== MAX_HTTP_CHUNK_BYTES || value.maximumSourceBytes !== MAX_SOURCE_BYTES || typeof value.canFinalize !== "boolean") {
    throw new Error("The local service returned an invalid bounded-upload status.");
  }
  const projectId = typeof value.projectId === "string" ? value.projectId : expected?.projectId;
  const fileName = typeof value.originalName === "string" ? value.originalName : expected?.fileName;
  const fileSize = Number(value.expectedBytes);
  if (!projectId || !fileName || typeof fileSize !== "number" || !Number.isSafeInteger(fileSize) || fileSize !== Number(value.expectedBytes)
    || (expected?.sessionId !== undefined && value.sessionId !== expected.sessionId) || (expected?.projectId !== undefined && projectId !== expected.projectId)
    || (expected?.fileName !== undefined && fileName !== expected.fileName) || (expected?.fileSize !== undefined && fileSize !== expected.fileSize)) {
    throw new Error("The local service returned upload state for a different source or project.");
  }
  const idempotencyKey = expected?.idempotencyKey ?? null;
  if (idempotencyKey !== null && !safeIdempotencyKey(idempotencyKey)) throw new Error("The local upload recovery key is invalid.");
  return { sessionId: value.sessionId, projectId, fileName, fileSize, idempotencyKey, status: value.status as UploadState,
    expectedBytes: Number(value.expectedBytes), receivedBytes: Number(value.receivedBytes), acknowledgedChunks: Number(value.acknowledgedChunks),
    chunkBytes: Number(value.chunkBytes), maximumSourceBytes: Number(value.maximumSourceBytes), canFinalize: value.canFinalize };
}
async function responsePayload(response: Response): Promise<unknown> {
  let payload: unknown = null;
  try { payload = await response.json(); } catch { /* handled below */ }
  const body = object(payload), error = object(body?.error);
  if (!response.ok || body?.ok === false) {
    const message = typeof error?.message === "string" && error.message.length <= 500 && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(error.message)
      ? error.message
      : response.status === 413 ? "The selected file exceeds the configured 2 GiB source limit."
        : response.status === 415 ? "The selected file did not pass the supported MP4 or WAV admission checks."
          : response.status === 507 ? "The local media library does not have enough reserved space for this import."
            : response.status === 409 ? "The saved upload or project changed. Check its saved status before starting again."
              : "The local upload service did not confirm this operation.";
    throw new Error(message);
  }
  return payload;
}
function storageKey(projectId: string): string { return `codexforge.studio.footage-upload.v1.${projectId}`; }
function validateSavedUpload(value: unknown, projectId: string): SavedUpload {
  const record = object(value);
  const keys = record ? Object.keys(record).sort().join() : "", legacy = keys === "fileName,fileSize,projectId,sessionId", current = keys === "fileName,fileSize,idempotencyKey,projectId,sessionId";
  if (!record || !legacy && !current || !safeSessionId(record.sessionId) || current && !safeIdempotencyKey(record.idempotencyKey)
    || record.projectId !== projectId || typeof record.fileName !== "string" || !record.fileName || record.fileName.length > 160
    || /[\\/:\u0000-\u001f\u007f]/u.test(record.fileName) || typeof record.fileSize !== "number" || !Number.isSafeInteger(record.fileSize) || record.fileSize < 1 || record.fileSize > MAX_SOURCE_BYTES) {
    throw new Error("Saved upload recovery data is invalid.");
  }
  return { sessionId: record.sessionId, projectId, fileName: record.fileName, fileSize: record.fileSize, idempotencyKey: current ? record.idempotencyKey as string : null };
}
function saveUpload(value: SavedUpload): void {
  const encoded = JSON.stringify(value);
  window.sessionStorage.setItem(storageKey(value.projectId), encoded);
  if (window.sessionStorage.getItem(storageKey(value.projectId)) !== encoded) throw new Error("The browser did not retain the bounded upload recovery record.");
}
function forgetUpload(projectId: string): void { window.sessionStorage.removeItem(storageKey(projectId)); }
function byteLabel(bytes: number): string {
  const unit = bytes >= 1024 * 1024 * 1024 ? `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GiB` : `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
  return `${bytes.toLocaleString("en-US")} bytes (${unit})`;
}
function sourceText(asset: Asset, field: string, fallback: string): string {
  const value = asset.provenance.adapterMetadata?.settings[field];
  return typeof value === "string" && value ? value : fallback;
}
function storageLabel(asset: Asset): string {
  const settings = asset.provenance.adapterMetadata?.settings;
  if (!settings || (settings.storageLocation === undefined && settings.libraryId === undefined)) return "Project workspace (original storage)";
  return settings.storageLocation === STUDIO_FOOTAGE_D_STORAGE && typeof settings.libraryId === "string" && /^[a-f0-9]{64}$/u.test(settings.libraryId) ? "D: media library" : "Storage binding unavailable";
}
function technicalLabel(asset: Asset): string {
  if (!isQualifiedLocalMediaAsset(asset)) return "Legacy import · technical qualification not recorded";
  let technical: LocalMediaTechnicalMetadata;
  try { technical = localMediaTechnicalMetadata(asset); } catch { return "Local media record could not be verified · reload before use"; }
  const seconds = technical.duration.numerator / technical.duration.denominator;
  if (technical.mediaType === "VIDEO") return `${technical.width} × ${technical.height} · H.264/yuv420p · 25 fps CFR · SDR BT.709 · ${seconds.toFixed(3)} s`;
  return `PCM 16-bit · 48 kHz · ${technical.channels === 1 ? "mono" : "stereo"} · ${seconds.toFixed(3)} s`;
}
function admissionLabel(asset: Asset): string {
  try { validateLocalFootageAsset(asset); return isQualifiedLocalMediaAsset(asset) ? "Technical admission passed · Human review needed" : "Technical qualification not recorded · Human review needed"; }
  catch { return "Local media record could not be verified · Reload required"; }
}
function provenanceLabel(asset: Asset): string {
  try { validateLocalFootageAsset(asset); return "Original acquisition cost: unknown. This local import records no provider request."; }
  catch { return "Local provenance could not be verified. Reload before relying on this record."; }
}

export function FootageImportPanel({ snapshot, disabled = false, active: workspaceActive = true, onImported, onBusyChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLabel, setSourceLabel] = useState("");
  const [rightsStatus, setRightsStatus] = useState<Asset["rights"]["status"]>("UNKNOWN");
  const [license, setLicense] = useState("");
  const [evidence, setEvidence] = useState("");
  const [session, setSession] = useState<SavedUpload | null>(null);
  const [phase, setPhase] = useState<UploadPhase>("IDLE");
  const [progress, setProgress] = useState({ acknowledgedBytes: 0, expectedBytes: 0 });
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState<{ url: string; label: string; mediaType: MediaType } | null>(null);
  const [previewBusy, setPreviewBusy] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [invalidRecovery, setInvalidRecovery] = useState(false);
  const [recoveryCanFinalize, setRecoveryCanFinalize] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const previewMedia = useRef<HTMLMediaElement | null>(null);
  const attachPreviewMedia = useCallback((element: HTMLMediaElement | null) => {
    const previous = previewMedia.current;
    if (previous && previous !== element) { previous.pause(); previous.removeAttribute("src"); previous.load(); }
    previewMedia.current = element;
    // Restore only this explicit selection if React reattaches the same ref.
    if (element && preview && element.getAttribute("src") !== preview.url) element.setAttribute("src", preview.url);
  }, [preview]);
  const active = useRef<AbortController | null>(null), management = useRef<AbortController | null>(null), previewRequest = useRef<AbortController | null>(null);
  const currentSession = useRef<SavedUpload | null>(null), cancelling = useRef(false), mounted = useRef(true);
  const errorFocus = useRef<HTMLParagraphElement>(null), completionFocus = useRef<HTMLParagraphElement>(null);
  const shot = snapshot.shots[0];
  const imports = snapshot.assets.filter(asset => asset.provenance.adapterMetadata?.adapterId === "studio-local-footage-v1"
    && (asset.assetType === "VIDEO" ? shot?.inputAssets.some(ref => ref.assetId === asset.assetId && ref.version === asset.version)
      : asset.assetType === "AUDIO" && shot?.audio.some(ref => ref.assetId === asset.assetId && ref.version === asset.version)));
  const formLocked = disabled || working || session !== null || invalidRecovery || !shot;
  const limitsId = "footage-import-limits", selectedId = "footage-selected-file", progressId = "footage-upload-progress-description", recoveryId = "footage-upload-recovery-description";

  useEffect(() => {
    mounted.current = true;
    let saved: SavedUpload | null = null;
    try {
      const raw = window.sessionStorage.getItem(storageKey(snapshot.project.projectId));
      if (raw) saved = validateSavedUpload(JSON.parse(raw) as unknown, snapshot.project.projectId);
    } catch { setInvalidRecovery(true); setError("Upload recovery data could not be read safely. No upload was started. Discard the invalid local recovery record before importing."); onBusyChange?.(true); }
    if (saved) {
      currentSession.current = saved; setSession(saved); setPhase("INTERRUPTED"); setProgress({ acknowledgedBytes: 0, expectedBytes: saved.fileSize }); onBusyChange?.(true);
      void recoverStatus(saved);
    }
    return () => { mounted.current = false; active.current?.abort(); management.current?.abort(); previewRequest.current?.abort(); };
    // This component is keyed by project; recovery must run once for that exact project.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot.project.projectId]);
  useEffect(() => {
    if (workspaceActive) return;
    const controller = previewRequest.current; previewRequest.current = null; controller?.abort();
    setPreview(null); setPreviewBusy(false);
    // Do not clear errors, file/rights fields, upload state or recovery authority.
  }, [workspaceActive]);
  useEffect(() => { if (error) window.setTimeout(() => errorFocus.current?.focus(), 0); }, [error]);
  useEffect(() => { if (phase === "COMPLETE") window.setTimeout(() => completionFocus.current?.focus(), 0); }, [phase]);

  async function recoverStatus(saved: SavedUpload) {
    if (management.current) return;
    const controller = new AbortController(); management.current = controller; setWorking(true); setError(""); setNotice("Checking the saved upload session. No upload will resume automatically.");
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(`${UPLOAD_ENDPOINT}?${new URLSearchParams({ sessionId: saved.sessionId })}`, { cache: "no-store", credentials: "same-origin", redirect: "error", headers: MARKER, signal: controller.signal });
      if (response.status === 404) {
        forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setPhase("IDLE"); setProgress({ acknowledgedBytes: 0, expectedBytes: 0 });
        setNotice("The earlier incomplete upload no longer exists. Select the source file again to start a new import."); onBusyChange?.(false); return;
      }
      const payload = await responsePayload(response), status = parseUploadStatus(payload, saved);
      if (!mounted.current || controller.signal.aborted) return;
      setProgress({ acknowledgedBytes: status.receivedBytes, expectedBytes: status.expectedBytes });
      setRecoveryCanFinalize(false);
      if (status.status === "COMPLETE") {
        let next: StudioSnapshot;
        try { next = responseSnapshot(payload, saved.projectId); }
        catch {
          const projectResponse = await fetch(`/api/codexforge/animation-studio?projectId=${encodeURIComponent(saved.projectId)}`, { cache: "no-store", credentials: "same-origin", redirect: "error", headers: MARKER, signal: controller.signal });
          next = responseSnapshot(await responsePayload(projectResponse), saved.projectId);
        }
        onImported(next); forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setPhase("COMPLETE"); setNotice("The completed import was recovered from saved local state. No upload or publication was repeated."); onBusyChange?.(false);
      } else if (status.status === "CANCELLED") {
        forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setPhase("IDLE"); setNotice("The earlier upload is closed. Select a file to start a new bounded import."); onBusyChange?.(false);
      } else if (status.status === "FAILED") {
        forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setPhase("IDLE"); setError("The earlier upload failed before publication. No Asset or Take was created; select the source again to start from byte zero."); onBusyChange?.(false);
      } else if (status.status === "INTERRUPTED" && status.canFinalize && status.receivedBytes === status.expectedBytes && safeIdempotencyKey(saved.idempotencyKey)) {
        setPhase("INTERRUPTED"); setRecoveryCanFinalize(true); setError("");
        setNotice("All source bytes are durably acknowledged. Choose Finish validation and publication to continue without retransmitting the source.");
      } else if (status.status === "INTERRUPTED" && status.canFinalize && status.receivedBytes === status.expectedBytes) {
        setPhase("INTERRUPTED"); setError("All source bytes are retained, but this upload was created by an earlier interface that did not retain its finalization key. Cancel it explicitly, then reselect the source and restart; no Asset or Take has been assumed.");
      } else {
        setPhase("INTERRUPTED"); setError(`The saved upload is incomplete. The server safely acknowledged ${byteLabel(status.receivedBytes)}. This browser cannot resume the file after reload; cancel and restart explicitly.`);
      }
    } catch (cause) {
      if (mounted.current) { setPhase("INTERRUPTED"); setError(controller.signal.aborted ? "Checking the saved upload was stopped. It remains unresolved; no retry or finalization occurred." : cause instanceof Error ? cause.message : "The saved upload state could not be confirmed."); }
    } finally { window.clearTimeout(timeout); if (management.current === controller) management.current = null; if (mounted.current) setWorking(false); }
  }

  async function finalizeSavedUpload() {
    const saved = currentSession.current;
    if (!saved || management.current || !recoveryCanFinalize || !safeIdempotencyKey(saved.idempotencyKey)) return;
    const controller = new AbortController(); management.current = controller; setWorking(true); setPhase("FINALIZING"); setRecoveryCanFinalize(false); setError("");
    setNotice("Finishing canonical verification, probe and publication from the already acknowledged source bytes. No source is being retransmitted.");
    try {
      const response = await fetch(`${UPLOAD_ENDPOINT}?${new URLSearchParams({ sessionId: saved.sessionId })}`, { method: "PATCH", cache: "no-store", credentials: "same-origin", redirect: "error", headers: { ...MARKER, "Idempotency-Key": saved.idempotencyKey }, signal: controller.signal });
      const payload = await responsePayload(response), completed = parseUploadStatus(payload, saved);
      if (completed.status !== "COMPLETE" || completed.receivedBytes !== saved.fileSize) throw new Error("The local service did not confirm completed verification and publication.");
      const next = responseSnapshot(payload, saved.projectId);
      if (!mounted.current || controller.signal.aborted) return;
      onImported(next); forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setFile(null); setPhase("COMPLETE"); setProgress({ acknowledgedBytes: completed.receivedBytes, expectedBytes: completed.expectedBytes });
      setNotice("Import complete after explicit recovery finalization. No source bytes were retransmitted and no duplicate Asset or Take was created."); onBusyChange?.(false);
    } catch (cause) {
      if (mounted.current) { setPhase("INTERRUPTED"); setError(controller.signal.aborted ? "Finalization stopped before its result was confirmed. Check the saved upload status before retrying." : cause instanceof Error ? cause.message : "The saved upload finalization outcome could not be confirmed."); }
    } finally { if (management.current === controller) management.current = null; if (mounted.current) setWorking(false); }
  }

  async function cancelAndRestart() {
    const saved = currentSession.current;
    if (!saved || management.current) return;
    cancelling.current = true; active.current?.abort();
    const controller = new AbortController(); management.current = controller; setWorking(true); setError(""); setNotice("Cancelling only this incomplete upload…");
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(`${UPLOAD_ENDPOINT}?${new URLSearchParams({ sessionId: saved.sessionId })}`, { method: "DELETE", cache: "no-store", credentials: "same-origin", redirect: "error", headers: MARKER, signal: controller.signal });
      if (!response.ok && response.status !== 404) await responsePayload(response);
      if (!mounted.current || controller.signal.aborted) return;
      forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setFile(null); setPhase("IDLE"); setProgress({ acknowledgedBytes: 0, expectedBytes: 0 });
      if (fileInput.current) fileInput.current.value = "";
      setNotice("The incomplete upload was cancelled. No Asset or Take was published. Choose the source again to restart from byte zero."); onBusyChange?.(false);
      window.setTimeout(() => fileInput.current?.focus(), 0);
    } catch (cause) {
      if (mounted.current) { setPhase("INTERRUPTED"); setError(controller.signal.aborted ? "Cancellation could not be confirmed before timeout. The saved upload remains unresolved." : cause instanceof Error ? cause.message : "The incomplete upload could not be cancelled safely."); }
    } finally {
      window.clearTimeout(timeout); cancelling.current = false; if (management.current === controller) management.current = null; active.current = null; if (mounted.current) setWorking(false);
    }
  }

  function discardInvalidRecovery() {
    forgetUpload(snapshot.project.projectId); setInvalidRecovery(false); setRecoveryCanFinalize(false); setError("");
    setNotice("The invalid local recovery record was discarded. No server upload or project media was changed."); onBusyChange?.(false);
    window.setTimeout(() => fileInput.current?.focus(), 0);
  }

  async function upload(selected: File, metadata: string, mediaType: MediaType) {
    if (active.current || management.current || currentSession.current) return;
    const controller = new AbortController(); active.current = controller; setWorking(true); setPhase("UPLOADING"); setRecoveryCanFinalize(false); setProgress({ acknowledgedBytes: 0, expectedBytes: selected.size }); setError(""); setNotice(""); onBusyChange?.(true);
    try {
      const idempotencyKey = crypto.randomUUID(), createResponse = await fetch(UPLOAD_ENDPOINT, {
        method: "POST", cache: "no-store", credentials: "same-origin", redirect: "error", signal: controller.signal,
        headers: { ...MARKER, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey }, body: JSON.stringify({ metadata, expectedBytes: selected.size }),
      });
      const created = parseUploadStatus(await responsePayload(createResponse), { projectId: snapshot.project.projectId, fileName: selected.name, fileSize: selected.size, idempotencyKey });
      if (created.receivedBytes !== 0 || created.acknowledgedChunks !== 0 || created.status !== "UPLOADING") throw new Error("The local service did not create an empty upload bound to the selected source.");
      const saved: SavedUpload = { sessionId: created.sessionId, projectId: snapshot.project.projectId, fileName: selected.name, fileSize: selected.size, idempotencyKey };
      currentSession.current = saved; setSession(saved); saveUpload(saved);
      let offset = 0, acknowledgedChunks = 0;
      while (offset < selected.size) {
        if (controller.signal.aborted) throw new Error("Upload stopped.");
        const end = Math.min(selected.size, offset + created.chunkBytes), query = new URLSearchParams({ sessionId: saved.sessionId, offset: String(offset) });
        const response = await fetch(`${UPLOAD_ENDPOINT}?${query}`, { method: "PUT", cache: "no-store", credentials: "same-origin", redirect: "error", signal: controller.signal,
          headers: { ...MARKER, "Content-Type": "application/octet-stream" }, body: selected.slice(offset, end) });
        const status = parseUploadStatus(await responsePayload(response), saved);
        if (status.chunkBytes !== created.chunkBytes || status.receivedBytes !== end || status.acknowledgedChunks !== acknowledgedChunks + 1 || status.status !== "UPLOADING") throw new Error("The local service did not acknowledge the exact selected upload chunk.");
        offset = status.receivedBytes; acknowledgedChunks = status.acknowledgedChunks; if (mounted.current) setProgress({ acknowledgedBytes: offset, expectedBytes: selected.size });
      }
      if (!mounted.current || controller.signal.aborted) return;
      setPhase("FINALIZING"); setNotice("All source bytes are safely acknowledged. Verifying, probing and publishing now; completion has not been assumed.");
      const finalizeResponse = await fetch(`${UPLOAD_ENDPOINT}?${new URLSearchParams({ sessionId: saved.sessionId })}`, { method: "PATCH", cache: "no-store", credentials: "same-origin", redirect: "error", signal: controller.signal, headers: { ...MARKER, "Idempotency-Key": idempotencyKey } });
      const finalizePayload = await responsePayload(finalizeResponse), completed = parseUploadStatus(finalizePayload, saved);
      if (completed.status !== "COMPLETE" || completed.receivedBytes !== selected.size) throw new Error("The local service did not confirm completed verification and publication.");
      const next = responseSnapshot(finalizePayload, saved.projectId);
      if (!mounted.current || controller.signal.aborted) return;
      onImported(next); forgetUpload(saved.projectId); currentSession.current = null; setSession(null); setFile(null); setPhase("COMPLETE"); if (fileInput.current) fileInput.current.value = "";
      setNotice(`${mediaType === "VIDEO" ? "Video" : "Audio"} import complete after canonical verification, probe and publication. Human review is still needed. No generation, approval or QC pass was granted.`); onBusyChange?.(false);
    } catch (cause) {
      if (!mounted.current || cancelling.current || controller.signal.aborted) return;
      const saved = currentSession.current;
      if (saved) {
        setPhase("INTERRUPTED"); setError(controller.signal.aborted ? "Upload stopped before completion. Safely acknowledged bytes remain an incomplete server session; cancel and restart explicitly. No Asset or Take has been assumed."
          : `${cause instanceof Error ? cause.message : "The upload outcome is unresolved."} The incomplete session is retained for an explicit status check or cancel-and-restart; no automatic retry occurs.`); onBusyChange?.(true);
      } else { setPhase("IDLE"); setError(controller.signal.aborted ? "Upload preparation was stopped before a recoverable session was confirmed. Reload saved state before starting again." : cause instanceof Error ? cause.message : "The upload session could not be created."); onBusyChange?.(false); }
    } finally { if (active.current === controller) active.current = null; if (mounted.current && !cancelling.current) setWorking(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (formLocked || !file || !shot) return; setError(""); setNotice("");
    const video = /\.mp4$/i.test(file.name) && (file.type === "" || file.type === "video/mp4");
    const audio = /\.wav$/i.test(file.name) && (file.type === "" || ["audio/wav", "audio/x-wav", "audio/wave", "audio/vnd.wave"].includes(file.type));
    if (!video && !audio) { setError("Choose a supported MP4 video or WAV soundtrack. Other formats are not admitted by this bounded importer."); return; }
    const mediaType: MediaType = video ? "VIDEO" : "AUDIO";
    if (file.size < 1 || file.size > MAX_SOURCE_BYTES) { setError("Choose a non-empty MP4 or WAV no larger than 2 GiB."); return; }
    if (file.name.length > 160) { setError("The filename is too long. Rename the local file to 160 characters or fewer before selecting it."); return; }
    if (!sourceLabel.trim()) { setError("Add a source label describing where this footage came from."); return; }
    if (rightsStatus === "LICENSED" && (!license.trim() || !evidence.trim())) { setError("Licensed footage needs both a license description and supporting evidence."); return; }
    try {
      const metadata = encodeURIComponent(JSON.stringify({ projectId: snapshot.project.projectId, shotId: shot.shotId, expectedProjectRevision: snapshot.project.revision, expectedShotRevision: shot.revision,
        requestedAt: new Date().toISOString(), originalName: file.name, sourceLabel: sourceLabel.trim(), mediaType, rights: { status: rightsStatus, license: license.trim() || null, evidence: evidence.trim() || null } }));
      if (metadata.length > 8 * 1024) { setError("The source and rights notes are too large for this bounded import. Shorten them and try again."); return; }
      void upload(file, metadata, mediaType);
    } catch { setError("This browser could not prepare the bounded upload. Nothing was submitted."); }
  }

  async function showPreview(asset: Asset) {
    if (!workspaceActive) return;
    previewRequest.current?.abort(); setPreview(null); setPreviewError(""); setPreviewBusy(true);
    const controller = new AbortController(); previewRequest.current = controller; const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const query = new URLSearchParams({ projectId: snapshot.project.projectId, assetId: asset.assetId, version: String(asset.version) }), url = `${ENDPOINT}?${query}`;
      const response = await fetch(url, { cache: "no-store", credentials: "same-origin", redirect: "error", headers: { ...MARKER, Range: "bytes=0-11" }, signal: controller.signal });
      const contentType = response.headers.get("Content-Type")?.split(";")[0].trim(), range = response.headers.get("Content-Range"), length = response.headers.get("Content-Length");
      if (response.status !== 206 || response.redirected || !["video/mp4", "audio/wav"].includes(contentType ?? "") || length !== "12" || !/^bytes 0-11\/[1-9]\d*$/u.test(range ?? "")) {
        await response.body?.cancel().catch(() => undefined); throw new Error("The selected local-media preview did not provide the required bounded range response.");
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      const video = contentType === "video/mp4" && bytes.length === 12 && String.fromCharCode(...bytes.subarray(4, 8)) === "ftyp";
      const audio = contentType === "audio/wav" && bytes.length === 12 && String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" && String.fromCharCode(...bytes.subarray(8, 12)) === "WAVE";
      if (!video && !audio) throw new Error("The selected local-media preview header no longer matches its admitted format.");
      if (controller.signal.aborted || !mounted.current || previewRequest.current !== controller) return;
      setPreview({ url, label: sourceText(asset, "originalName", "Imported media"), mediaType: audio ? "AUDIO" : "VIDEO" });
    } catch (cause) { if (mounted.current && previewRequest.current === controller) setPreviewError(controller.signal.aborted ? "Preview loading was stopped or timed out." : cause instanceof Error ? cause.message : "The preview could not be loaded."); }
    finally { window.clearTimeout(timeout); if (previewRequest.current === controller) { previewRequest.current = null; if (mounted.current) setPreviewBusy(false); } }
  }

  const activeStep = phase === "UPLOADING" ? 0 : phase === "FINALIZING" ? 1 : phase === "COMPLETE" ? 4 : -1;
  const statusLabel = phase === "UPLOADING" ? "Uploading" : phase === "FINALIZING" ? "Verifying, probing and publishing" : phase === "COMPLETE" ? "Complete" : phase === "INTERRUPTED" ? "Upload interrupted" : "";
  return <section className={styles.panel} aria-labelledby="footage-heading">
    <div><p className={styles.eyebrow}>Bring your own media · Local import</p><h2 id="footage-heading">Import local media</h2></div>
    <p>Attach a compatible video clip or independent soundtrack to the saved shot. No provider is contacted and no model, acquisition cost or generation history is assumed.</p>
    <p className={styles.muted}>The local server selects storage for new imports. Each immutable source records its library identity; existing media is not moved or rewritten.</p>
    <p className={styles.muted} id={limitsId}>MP4 video or WAV audio · up to 2 GiB ({MAX_SOURCE_BYTES.toLocaleString("en-US")} bytes) per source · up to 16 GiB ({MAX_PROJECT_LOGICAL_BYTES.toLocaleString("en-US")} bytes) of logical imported source media per project. Layers and Takes that reuse one Asset do not count as another import.</p>
    {!shot && <p>No saved shot is available to receive media.</p>}
    {disabled && !session && <p className={styles.warning}>Save or resolve your existing workspace edits and requests before importing.</p>}
    <form className={styles.form} onSubmit={submit}>
      <label htmlFor="footage-file">MP4 video or WAV soundtrack</label>
      <input ref={fileInput} id="footage-file" type="file" accept="video/mp4,audio/wav,.mp4,.wav" required disabled={formLocked} aria-describedby={`${limitsId}${file ? ` ${selectedId}` : ""}`} onChange={event => { setFile(event.target.files?.[0] ?? null); setError(""); setNotice(""); setPhase("IDLE"); }} />
      {file && <p className={styles.selectedFile} id={selectedId}><strong>{file.name}</strong> · {byteLabel(file.size)}</p>}
      <label htmlFor="footage-source">Source label</label><input id="footage-source" required maxLength={256} disabled={formLocked} value={sourceLabel} onChange={event => setSourceLabel(event.target.value)} placeholder="For example: my camera, or an exported clip" />
      <label htmlFor="footage-rights">Declared rights</label><select id="footage-rights" value={rightsStatus} disabled={formLocked} onChange={event => setRightsStatus(event.target.value as Asset["rights"]["status"])}>{RIGHTS.map(status => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select>
      <label htmlFor="footage-license">License or ownership notes{rightsStatus === "LICENSED" ? " (required)" : " (optional)"}</label><textarea id="footage-license" rows={2} maxLength={1024} required={rightsStatus === "LICENSED"} disabled={formLocked} value={license} onChange={event => setLicense(event.target.value)} />
      <label htmlFor="footage-evidence">Rights evidence{rightsStatus === "LICENSED" ? " (required)" : " (optional)"}</label><textarea id="footage-evidence" rows={2} maxLength={1024} required={rightsStatus === "LICENSED"} disabled={formLocked} value={evidence} onChange={event => setEvidence(event.target.value)} />
      <p className={styles.muted}>Record a non-secret reference or description. These fields do not fetch links or verify ownership.</p><button type="submit" disabled={formLocked || !file || !sourceLabel.trim()}>Validate and import local media</button>
    </form>
    {phase !== "IDLE" && <section className={phase === "INTERRUPTED" ? styles.warning : styles.progressPanel} aria-labelledby="footage-progress-heading">
      <h3 id="footage-progress-heading" tabIndex={-1}>{statusLabel}</h3>
      <ol className={styles.steps} aria-label="Import lifecycle">{PROGRESS_STEPS.map((step, index) => {
        const state = phase === "COMPLETE" || index < activeStep ? "complete" : phase === "FINALIZING" && index >= 1 && index <= 3 ? "active" : index === activeStep ? "active" : "pending";
        return <li key={step} data-state={state} aria-current={index === activeStep ? "step" : undefined}>{step}</li>;
      })}</ol>
      {progress.expectedBytes > 0 && <div className={styles.progress} id={progressId}><progress max={progress.expectedBytes} value={progress.acknowledgedBytes} aria-label="Safely acknowledged upload bytes" /><span>{byteLabel(progress.acknowledgedBytes)} safely acknowledged of {byteLabel(progress.expectedBytes)}</span></div>}
      {phase === "FINALIZING" && <p className={styles.muted}>Upload bytes reaching 100% is not completion. The Asset becomes available only after canonical verification, technical probe and immutable publication all succeed.</p>}
      {working && session && phase === "UPLOADING" && <div className={styles.actions}><button type="button" aria-describedby={progressId} onClick={() => void cancelAndRestart()}>Cancel upload</button></div>}
    </section>}
    <div role="status" aria-live="polite">{working ? statusLabel || "Checking saved upload state" : notice}</div>
    {error && <p ref={errorFocus} tabIndex={-1} className={styles.error} role="alert">{error}</p>}
    {invalidRecovery && <div className={styles.actions}><button type="button" onClick={discardInvalidRecovery}>Discard invalid local recovery record</button></div>}
    {phase === "COMPLETE" && <p ref={completionFocus} tabIndex={-1} className={styles.success}>Import complete. The newly published source is listed below.</p>}
    {session && !working && phase === "INTERRUPTED" && <section className={styles.warning} aria-label="Interrupted footage upload" aria-describedby={recoveryId}><strong>{recoveryCanFinalize ? "Upload bytes ready for final validation" : "Incomplete upload retained safely"}</strong><p id={recoveryId}>{session.fileName} · {byteLabel(session.fileSize)}. {recoveryCanFinalize ? "All source bytes are durably acknowledged; explicit finalization can continue without selecting or retransmitting the file. No completion is assumed yet." : "The browser does not retain filesystem access after reload, so this slice does not silently resume. No Asset, Take or completion is assumed."}</p><div className={styles.actions}>{recoveryCanFinalize && <button type="button" aria-describedby={recoveryId} onClick={() => void finalizeSavedUpload()}>Finish validation and publication</button>}<button type="button" aria-describedby={recoveryId} onClick={() => void recoverStatus(session)}>Check saved upload status</button><button type="button" aria-describedby={recoveryId} onClick={() => void cancelAndRestart()}>Cancel incomplete upload and start over</button></div></section>}
    <div className={styles.clips}><h3>Imported media for this shot</h3>{imports.length === 0 ? <p className={styles.muted}>No locally imported video or audio is attached to this shot yet.</p> : <ul className={styles.list}>{imports.map(asset => <li key={`${asset.assetId}@${asset.version}`}><strong>{sourceText(asset, "originalName", "Imported media")} · {asset.assetType === "AUDIO" ? "Soundtrack" : "Video"} · version {asset.version}</strong><p>Source: {sourceText(asset, "sourceLabel", "Not recorded")}</p><p>Storage: {storageLabel(asset)}</p><p>{technicalLabel(asset)}</p><p className={styles.muted}>Rights: {asset.rights.status.replaceAll("_", " ")} · Approval: {asset.approvalState} · {admissionLabel(asset)}</p><details><summary>Recorded provenance and rights</summary><p>License: {asset.rights.license ?? "Not recorded"}</p><p>Evidence: {asset.rights.evidence ?? "Not recorded"}</p><p>{provenanceLabel(asset)}</p></details><button type="button" disabled={working || previewBusy} onClick={() => void showPreview(asset)}>Preview {sourceText(asset, "originalName", "media")}</button></li>)}</ul>}</div>
    {previewBusy && <p role="status">Checking the selected local preview with a bounded range request… <button type="button" onClick={() => previewRequest.current?.abort()}>Stop preview loading</button></p>}
    {previewError && <p className={styles.error} role="alert">{previewError}</p>}
    {workspaceActive && preview && <div className={styles.preview}><h3>{preview.label}</h3>{preview.mediaType === "VIDEO" ? <video ref={attachPreviewMedia} controls preload="metadata" src={preview.url} aria-label={`Local video preview: ${preview.label}`} onError={() => setPreviewError("This browser could not decode the admitted video. No creative or playback approval has been assumed.")} /> : <audio ref={attachPreviewMedia} controls preload="metadata" src={preview.url} aria-label={`Local audio preview: ${preview.label}`} onError={() => setPreviewError("This browser could not decode the admitted soundtrack. No listening or mix approval has been assumed.")} />}<p className={styles.muted}>Playback reads bounded same-origin ranges from the immutable local source. It does not mark QC, listening, mix or rights review as passed.</p><button type="button" onClick={() => { setPreview(null); setPreviewError(""); }}>Close preview</button></div>}
  </section>;
}
