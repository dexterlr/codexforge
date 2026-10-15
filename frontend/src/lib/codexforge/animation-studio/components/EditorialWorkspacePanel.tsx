"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CompositionPanel } from "./CompositionPanel";
import { FoundationCopyPanel } from "./FoundationCopyPanel";
import styles from "./CompositionPanel.module.css";

type Props = { projectId: string; projectName?: string; disabled: boolean; workspaceActive?: boolean; onReturnToProject?: () => void; onBusyChange?: (busy: boolean) => void };
type Session = { projectId: string; mode: "original" | "copy"; compositionId: string };
const modeKey = (id: string) => `codexforge.studio.editorial.mode.v2.${id}`;
function savedMode(value: string, projectId: string): Session {
  if (new TextEncoder().encode(value).length > 2048) throw Error("Saved editor mode is too large.");
  const parsed = JSON.parse(value) as Session;
  if (!parsed || Object.keys(parsed).sort().join() !== "compositionId,mode,projectId" || parsed.projectId !== projectId || !["original", "copy"].includes(parsed.mode) || typeof parsed.compositionId !== "string" || (parsed.compositionId !== "" && !/^composition_[a-z0-9_-]{1,128}$/u.test(parsed.compositionId))) throw Error("Saved editor mode is invalid.");
  return parsed;
}
function persist(value: Session) {
  const encoded = JSON.stringify(value); sessionStorage.setItem(modeKey(value.projectId), encoded);
  if (sessionStorage.getItem(modeKey(value.projectId)) !== encoded) throw Error("Browser session storage did not retain the selected editor mode.");
}

/** The mode gate owns the parent lock. Child cleanup can never unlock copy mode. */
export function EditorialWorkspacePanel({ projectId, projectName, disabled, workspaceActive = true, onReturnToProject, onBusyChange }: Props) {
  const [session, setSession] = useState<Session | null>(null), [error, setError] = useState("");
  const [originalBusy, setOriginalBusy] = useState(true), [originalReady, setOriginalReady] = useState(false), [copyBusy, setCopyBusy] = useState(true);
  const mode = useRef<Session["mode"] | null>(null), originalBusyRef = useRef(true), originalReadyRef = useRef(false), copyBusyRef = useRef(true);
  const reportOriginal = useCallback((busy: boolean) => {
    originalBusyRef.current = busy; setOriginalBusy(busy);
    onBusyChange?.(mode.current !== "original" || busy || !originalReadyRef.current);
  }, [onBusyChange]);
  const reportReady = useCallback((ready: boolean) => { originalReadyRef.current = ready; setOriginalReady(ready); onBusyChange?.(mode.current !== "original" || originalBusyRef.current || !ready); }, [onBusyChange]);
  const reportCopy = useCallback((busy: boolean) => { copyBusyRef.current = busy; setCopyBusy(busy); onBusyChange?.(true); }, [onBusyChange]);
  useEffect(() => {
    onBusyChange?.(true);
    const timer = window.setTimeout(() => {
      try {
        const raw = sessionStorage.getItem(modeKey(projectId));
        let next: Session = raw ? savedMode(raw, projectId) : { projectId, mode: "original", compositionId: "" };
        // An unresolved copy request/draft must never reopen the original editor after refresh.
        if (sessionStorage.getItem(`codexforge.studio.editorial.pending.v2.${projectId}`) || sessionStorage.getItem(`codexforge.studio.editorial.draft.v2.${projectId}`) || sessionStorage.getItem(`codexforge.studio.editorial.duration-draft.v1.${projectId}`) || sessionStorage.getItem(`codexforge.studio.render.pending.v1.${projectId}`)) {
          if (next.mode !== "copy") { next = { ...next, mode: "copy" }; persist(next); }
        }
        mode.current = next.mode; setSession(next);
      } catch { setError("Editor recovery data could not be read safely. No editor has been opened. Keep this tab and resolve browser session storage before continuing."); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [projectId, onBusyChange]);
  useEffect(() => { onBusyChange?.(!session || session.mode === "copy" || originalBusy || !originalReady || !!error); }, [session, originalBusy, originalReady, error, onBusyChange]);
  function enter() {
    if (!session || disabled || originalBusyRef.current || !originalReadyRef.current || error) return;
    try {
      if (sessionStorage.getItem(`codexforge.studio.editorial.pending.v1.${projectId}`)) throw Error("Resolve the original editor's pending save before changing modes.");
      const next: Session = { ...session, mode: "copy" }; persist(next);
      mode.current = "copy"; copyBusyRef.current = true; setCopyBusy(true); onBusyChange?.(true); setSession(next);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The editor mode could not be retained."); onBusyChange?.(true); }
  }
  function leave() {
    if (!session || disabled || copyBusyRef.current || error) return;
    try {
      if (sessionStorage.getItem(`codexforge.studio.editorial.pending.v2.${projectId}`) || sessionStorage.getItem(`codexforge.studio.editorial.draft.v2.${projectId}`) || sessionStorage.getItem(`codexforge.studio.editorial.duration-draft.v1.${projectId}`) || sessionStorage.getItem(`codexforge.studio.render.pending.v1.${projectId}`)) throw Error("Resolve the copy's pending editorial or render request, or its local edits, before leaving.");
      const next: Session = { ...session, mode: "original" }; persist(next);
      originalBusyRef.current = true; originalReadyRef.current = false; setOriginalBusy(true); setOriginalReady(false); mode.current = "original"; onBusyChange?.(true); setSession(next);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The editor mode could not be retained."); }
  }
  const chooseComposition = useCallback((compositionId: string) => {
    if (!session || session.mode !== "copy") throw Error("The working-copy mode is not initialized.");
    if (compositionId !== "" && !/^composition_[a-z0-9_-]{1,128}$/u.test(compositionId)) throw Error("The composition selection is invalid.");
    const next = { ...session, compositionId }; persist(next); setSession(next);
  }, [session]);
  if (!session) return <section className={styles.panel} aria-label="Editor mode recovery"><p role={error ? "alert" : "status"}>{error || "Checking saved editor mode before opening a workspace…"}</p></section>;
  return <div className={styles.viewerSection}>
    {session.mode === "original" ? <section className={styles.panel} aria-label="Editorial workspace mode">
      <div className={styles.heading}><h3>Original layered editor</h3><span className={styles.badge}>Local editing · generation locked</span></div>
      <p className={styles.muted}>Use a source-bound working copy for the exact layer timeline, persistent Undo/Redo and local export. This keeps the original instructions separate.</p>
      <div className={styles.actions}><button type="button" disabled={disabled || originalBusy || !originalReady || !!error} onClick={enter}>Use source-bound working copy</button>{onReturnToProject && <button type="button" onClick={onReturnToProject}>Return to project</button>}</div>
    </section> : <details aria-label="Working-copy boundary"><summary>Working-copy boundary and original editor</summary>
      <p className={styles.muted}>The working copy is a separate instruction branch, not an independent backup. Editing the original project or original layered instructions elsewhere makes it unavailable. There is no automatic copy-back, rebase or mode change. Provider generation remains disabled.</p>
      <div className={styles.actions}><button type="button" disabled={disabled || copyBusy || !!error} onClick={leave}>Return to original editor</button></div>
      {(copyBusy || disabled) && <p className={styles.muted}>Resolve unsaved edits, pending requests and recovery state before changing editor modes. Return to project only changes the visible workspace and preserves them.</p>}
    </details>}
    {error && <p role="alert" className={styles.error}>{error}</p>}
    {session.mode === "original" ? <CompositionPanel projectId={projectId} workspaceActive={workspaceActive} disabled={disabled || !!error} onBusyChange={reportOriginal} onReadyChange={reportReady} /> : <FoundationCopyPanel projectId={projectId} projectName={projectName} workspaceActive={workspaceActive} onReturnToProject={onReturnToProject} disabled={disabled || !!error} compositionId={session.compositionId} onCompositionChange={chooseComposition} onBusyChange={reportCopy} />}
  </div>;
}
