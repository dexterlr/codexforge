"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell/components/CodexForgeAppShell";
import { APPROVAL_GATES, GATE_LABELS } from "@/lib/codexforge/animation-studio/domain";
import type { ExternalExecutionPolicy, RoutingResult, ShotManifest, StudioProject } from "@/lib/codexforge/animation-studio/domain";
import type { StudioSnapshot } from "@/lib/codexforge/animation-studio/store.server";
import { FootageImportPanel } from "@/lib/codexforge/animation-studio/components/FootageImportPanel";
import { EditorialWorkspacePanel } from "@/lib/codexforge/animation-studio/components/EditorialWorkspacePanel";
import styles from "./studio.module.css";

type DryRun = { shotId: string; shotRevision: number; projectRevision: number; route: RoutingResult; executionAllowed: false; capabilityObservations: []; providerRequests: 0; jobsCreated: 0 };
type Result = { projects: StudioProject[]; snapshot: StudioSnapshot | null; executionPolicy: ExternalExecutionPolicy; dryRun?: DryRun };
type ShotDraft = Pick<ShotManifest, "description" | "storyPurpose" | "action" | "duration" | "notes"> & { expectedRevision: number; shotId: string };
type ProjectDraft = { title: string; description: string; expectedRevision: number };
type Operation = { key: string; body: Record<string, unknown>; reset: "all" | "project" | "shot" | "none" };
const ENDPOINT = "/api/codexforge/animation-studio";
const PENDING_KEY = "codexforge.studio.pending.v1";
const SELECTED_KEY = "codexforge.studio.selected.v1";
const headers = { "X-CodexForge-Animation-Studio": "local-operator-v1" };
const projectDraft = (project: StudioProject): ProjectDraft => ({ title: project.title, description: project.description, expectedRevision: project.revision });
const shotDraft = (shot: ShotManifest): ShotDraft => ({ shotId: shot.shotId, expectedRevision: shot.revision, description: shot.description, storyPurpose: shot.storyPurpose, action: shot.action, duration: shot.duration, notes: [...shot.notes] });

export default function AnimationStudioPageClient() {
  const [result, setResult] = useState<Result | null>(null);
  const [project, setProject] = useState<ProjectDraft | null>(null);
  const [shot, setShot] = useState<ShotDraft | null>(null);
  const [projectDirty, setProjectDirty] = useState(false);
  const [shotDirty, setShotDirty] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDuration, setNewDuration] = useState(50);
  const [busy, setBusy] = useState(false);
  const [footageBusy, setFootageBusy] = useState(false);
  const [compositionBusy, setCompositionBusy] = useState(false);
  const [workspaceView, setWorkspaceView] = useState<"project" | "editing">("project");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState<Operation | null>(null);
  const [dryRun, setDryRun] = useState<DryRun | null>(null);
  const active = useRef<AbortController | null>(null);
  const inFlight = useRef(false);
  const footageActive = useRef(false);
  const compositionActive = useRef(false);
  const projectViewButton = useRef<HTMLButtonElement>(null);
  const dirty = projectDirty || shotDirty;
  const snapshot = result?.snapshot ?? null;
  const updateFootageBusy = useCallback((next: boolean) => { footageActive.current = next; setFootageBusy(next); }, []);
  const updateCompositionBusy = useCallback((next: boolean) => { compositionActive.current = next; setCompositionBusy(next); }, []);
  const returnToProject = useCallback(() => {
    setWorkspaceView("project");
    window.setTimeout(() => projectViewButton.current?.focus(), 0);
  }, []);

  const install = useCallback((next: Result, reset: Operation["reset"]) => {
    setResult(next);
    if (next.snapshot) {
      if (reset === "all" || reset === "project") { setProject(projectDraft(next.snapshot.project)); setProjectDirty(false); }
      else if (reset === "shot") {
        const savedProject = next.snapshot.project;
        setProject(previous => previous && previous.title === savedProject.title && previous.description === savedProject.description ? { ...previous, expectedRevision: savedProject.revision } : previous);
      }
      if (reset === "all" || reset === "shot") { setShot(next.snapshot.shots[0] ? shotDraft(next.snapshot.shots[0]) : null); setShotDirty(false); }
      try { localStorage.setItem(SELECTED_KEY, next.snapshot.project.projectId); } catch { /* Server data remains authoritative when browser storage is unavailable. */ }
    } else if (reset === "all") { setProject(null); setShot(null); setProjectDirty(false); setShotDirty(false); }
    if (reset !== "none") setDryRun(null);
    if (next.dryRun !== undefined) setDryRun(next.dryRun);
  }, []);

  const request = useCallback(async (projectId?: string, operation?: Operation, listOnly = false) => {
    if (inFlight.current || footageActive.current || compositionActive.current) return;
    inFlight.current = true;
    setBusy(true); setError(""); setNotice("");
    const controller = new AbortController(); active.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(`${ENDPOINT}${projectId ? `?projectId=${encodeURIComponent(projectId)}` : ""}`, {
        method: operation ? "POST" : "GET", cache: "no-store", credentials: "same-origin", signal: controller.signal,
        headers: operation ? { ...headers, "Content-Type": "application/json", "Idempotency-Key": operation.key } : headers,
        ...(operation ? { body: JSON.stringify(operation.body) } : {}),
      });
      const payload = await response.json();
      if (!payload || typeof payload.ok !== "boolean") throw new Error("The local service returned an unreadable response. No result has been assumed.");
      if (!response.ok || !payload.ok) {
        // A structured rejection is conclusive; an interrupted/invalid response retains the exact retry token.
        if (operation && payload.ok === false && payload.error?.code && response.status >= 400 && response.status < 500 && ![408, 429].includes(response.status)) { sessionStorage.removeItem(PENDING_KEY); setPending(null); }
        throw new Error(`${payload.error?.code ?? "REQUEST_FAILED"}: ${payload.error?.message ?? "The request was rejected."} Your unsaved edits are still here.`);
      }
      const next = payload.result as Result;
      if (!next || !Array.isArray(next.projects) || !next.executionPolicy || !("snapshot" in next)) throw new Error("The local service returned an incomplete result. No save has been assumed.");
      if (operation) { sessionStorage.removeItem(PENDING_KEY); setPending(null); }
      if (listOnly) setResult(previous => previous ? { ...previous, projects: next.projects, executionPolicy: next.executionPolicy } : next);
      else install(next, operation?.reset ?? "all");
      setNotice(operation ? operation.body.action === "dry-run" ? "Planning check complete. No generation or rendering was executed." : "Saved to this local development workspace." : listOnly ? "Project list refreshed. Your open edits were preserved." : "Loaded the saved local project.");
      if (operation?.body.action === "create") { setNewTitle(""); setNewDescription(""); setNewDuration(50); }
    } catch (cause) {
      setError(controller.signal.aborted ? operation ? "Stopped waiting for the save. It may already have reached the server. Retry the exact request below to recover safely; no automatic retry will occur." : "Loading was cancelled or took too long. Try again when the local service is ready." : cause instanceof Error ? cause.message : "The local request failed. Your edits have not been discarded.");
    } finally { window.clearTimeout(timeout); active.current = null; inFlight.current = false; setBusy(false); }
  }, [install]);

  useEffect(() => {
    // A deferred initial read survives React's development setup/cleanup replay without stranding an aborted request.
    const startup = window.setTimeout(() => {
    let selected: string | undefined;
    try {
      const raw = sessionStorage.getItem(PENDING_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Operation;
        if (typeof saved.key === "string" && saved.body && typeof saved.body === "object" && ["all", "project", "shot", "none"].includes(saved.reset)) {
          setPending(saved); selected = typeof saved.body.projectId === "string" ? saved.body.projectId : undefined;
        }
      }
      selected ??= localStorage.getItem(SELECTED_KEY) ?? undefined;
    } catch { /* A browser storage failure never creates a server project or runs a saved command. */ }
    void request(selected);
    }, 0);
    return () => { window.clearTimeout(startup); active.current?.abort(); };
  }, [request]);

  useEffect(() => {
    const prevent = (event: BeforeUnloadEvent) => { if (dirty || pending || footageBusy || compositionBusy || newTitle || newDescription) { event.preventDefault(); event.returnValue = ""; } };
    const navigate = (event: MouseEvent) => {
      if (!(dirty || pending || footageBusy || compositionBusy || newTitle || newDescription) || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (link && link.getAttribute("target") !== "_blank" && !window.confirm(footageBusy ? "Leave this workspace? The footage import may already have been saved. Leaving loses its in-memory file and exact retry request. Stay here to reload saved footage and recover safely." : "Leave this workspace? Unsaved edits will be lost. An unresolved request, if any, keeps its recovery token in this browser session.")) {
        event.preventDefault(); event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", prevent);
    document.addEventListener("click", navigate, true);
    return () => { window.removeEventListener("beforeunload", prevent); document.removeEventListener("click", navigate, true); };
  }, [dirty, pending, footageBusy, compositionBusy, newTitle, newDescription]);

  function submit(body: Record<string, unknown>, reset: Operation["reset"]) {
    if (pending || inFlight.current || footageActive.current || compositionActive.current) return;
    try {
      const operation: Operation = { key: crypto.randomUUID(), body: { ...body, requestedAt: new Date().toISOString() }, reset };
      sessionStorage.setItem(PENDING_KEY, JSON.stringify(operation));
      setPending(operation);
      void request(undefined, operation);
    } catch { setError("This browser could not retain a safe retry token. Nothing was submitted. Enable session storage and try again."); }
  }
  function openProject(projectId: string) {
    if (pending || busy || footageActive.current || compositionActive.current || (dirty && !window.confirm("Discard your unsaved project and shot edits and load the saved project?"))) return;
    void request(projectId);
  }
  const locked = busy || !!pending || footageBusy || compositionBusy;
  const editing = workspaceView === "editing" && snapshot !== null;

  return <div className={editing ? styles.editingShell : undefined}><CodexForgeAppShell activePath="/animation-studio" focusMode sidebarMode="full" showRightRail={false} showSafetyStrip={false} contentMaxWidth="full">
    <div className={`${styles.studio} ${editing ? styles.editingStudio : ""}`}>
      <header className={editing ? styles.editingHeader : styles.hero}><div><p className={styles.eyebrow}>{editing ? "Local editing workspace" : "Production OS · Local workspace"}</p><h1>Animation Studio</h1><p hidden={editing}>Shape the story. Edit saved compositions. Export the supported local trailer preset.</p></div>{!editing && <span className={styles.badge}>Local planning, footage &amp; export</span>}{snapshot && <nav className={styles.viewNavigation} aria-label="Studio workspace"><button ref={projectViewButton} type="button" aria-pressed={!editing} onClick={returnToProject}>Project &amp; imports</button><button type="button" aria-pressed={editing} disabled={footageBusy} aria-describedby={footageBusy ? "studio-import-navigation-lock" : undefined} onClick={() => setWorkspaceView("editing")}>Editing workspace</button></nav>}</header>
      {footageBusy && <p id="studio-import-navigation-lock" className={styles.warning}>Finish or resolve the retained import in Project &amp; imports before opening the editing workspace.</p>}
      <section hidden={editing} className={styles.boundary} aria-label="Execution boundary"><strong>Provider generation is not connected.</strong> Saved working-copy compositions can use the separately configured local renderer after readiness passes. In the editor’s Media panel, a configured native Blender source can prepare a short local preview, requiring separate explicit Start. No model, paid service or Adobe automation is enabled.</section>
      <div className={styles.status} aria-live="polite" role="status" hidden={editing && !busy && notice === "Loaded the saved local project."}>{busy ? "Working with the local workspace…" : notice}</div>
      {error && <div className={styles.error} role="alert">{error}</div>}
      {pending && <section className={styles.warning} aria-label="Unresolved local request"><strong>{busy ? "Exact request retained until confirmed" : "A request still needs confirmation"}</strong><p>The original request and retry token are retained in this browser session. Retrying asks the server for the same operation, not a new one.</p><code>{String(pending.body.action)} · {pending.key}</code><div className={styles.actions}><button disabled={busy} onClick={() => void request(undefined, pending)}>Retry exact request</button></div></section>}
      {busy && <button className={styles.secondary} onClick={() => active.current?.abort()}>Stop waiting</button>}
      <div className={editing ? styles.editingLayout : styles.layout}>
        <aside hidden={editing} className={styles.projects} aria-label="Local projects"><div className={styles.sectionHeading}><h2>Projects</h2><button className={styles.secondary} disabled={locked} onClick={() => void request(undefined, undefined, true)}>Refresh list</button></div><p className={styles.muted}>Projects saved in this configured local workspace.</p><ul className={styles.projectList}>{result?.projects.map(item => <li key={item.projectId}><button disabled={locked} aria-current={snapshot?.project.projectId === item.projectId ? "true" : undefined} onClick={() => openProject(item.projectId)}><strong>{item.title}</strong><span>Revision {item.revision}</span></button></li>)}</ul>{result?.projects.length === 0 && <p>No local projects yet.</p>}
          <form onSubmit={(event: FormEvent) => { event.preventDefault(); if (dirty && !window.confirm("Discard your unsaved edits and create a new local project?")) return; submit({ action: "create", projectId: `project_${crypto.randomUUID().replaceAll("-", "")}`, title: newTitle, description: newDescription, durationSeconds: newDuration }, "all"); }} className={styles.form}><h3>New empty project</h3><label htmlFor="new-title">Project name</label><input id="new-title" required maxLength={256} value={newTitle} onChange={event => setNewTitle(event.target.value)} disabled={locked} placeholder="A story worth making" /><label htmlFor="new-description">Brief</label><textarea id="new-description" maxLength={16384} value={newDescription} onChange={event => setNewDescription(event.target.value)} disabled={locked} rows={3} /><label htmlFor="new-duration">Timeline length (45–60 seconds)</label><input id="new-duration" type="number" min={45} max={60} step={1} required value={newDuration} onChange={event => setNewDuration(event.target.valueAsNumber)} disabled={locked} /><p className={styles.muted}>Creates an empty 1280×720, 25 fps local timeline. It contains no media, title, soundtrack, generated output or provider request.</p><button disabled={locked || !newTitle.trim() || !Number.isSafeInteger(newDuration) || newDuration < 45 || newDuration > 60}>Create empty local project</button></form>
        </aside>
        <div className={styles.workspace}>{snapshot && project ? <>
          <div hidden={editing} className={styles.setupPanels}>
          {compositionBusy && <p className={styles.boundary}>Project changes stay locked while the editor has a working copy, unsaved edits or an unresolved request. Open Editing workspace to resolve the existing state; switching views does not discard it.</p>}
          <section className={styles.card}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Project manifest · Revision {snapshot.project.revision}</p><h2>{snapshot.project.title}</h2></div><button className={styles.secondary} disabled={locked} onClick={() => openProject(snapshot.project.projectId)}>Reload saved</button></div><p className={styles.identifier}>{snapshot.project.projectId}</p><form className={styles.form} onSubmit={event => { event.preventDefault(); submit({ action: "revise-project", projectId: snapshot.project.projectId, ...project }, "project"); }}><label htmlFor="project-title">Project name</label><input id="project-title" required maxLength={256} disabled={locked} value={project.title} onChange={event => { setProject({ ...project, title: event.target.value }); setProjectDirty(true); }} /><label htmlFor="project-description">Brief</label><textarea id="project-description" rows={3} maxLength={16384} disabled={locked} value={project.description} onChange={event => { setProject({ ...project, description: event.target.value }); setProjectDirty(true); }} /><div className={styles.actions}><button disabled={locked || !projectDirty}>Save project</button><span className={styles.muted}>{projectDirty ? "Unsaved project edits" : "Project saved"}</span></div></form></section>
          {shot && <section className={styles.card}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Shot manifest · Revision {shot.expectedRevision}</p><h2>Shot workspace</h2></div><span className={styles.badge}>{snapshot.shots[0]?.generationMethod}</span></div><p className={styles.identifier}>{shot.shotId}</p><form className={styles.form} onSubmit={event => { event.preventDefault(); const { expectedRevision, shotId, ...changes } = shot; submit({ action: "revise-shot", projectId: snapshot.project.projectId, shotId, expectedRevision, changes: { ...changes, notes: changes.notes.filter(note => note.trim().length > 0) } }, "shot"); }}>
            {([ ["description", "What happens in this shot?"], ["storyPurpose", "Why does it matter to the story?"], ["action", "Action and movement"] ] as const).map(([field, label]) => <div className={styles.form} key={field}><label htmlFor={`shot-${field}`}>{label}</label><textarea id={`shot-${field}`} required rows={3} maxLength={field === "storyPurpose" ? 4096 : 16384} disabled={locked} value={shot[field]} onChange={event => { setShot({ ...shot, [field]: event.target.value }); setShotDirty(true); }} /></div>)}
            <label htmlFor="shot-duration">Duration in seconds</label><input id="shot-duration" className={styles.duration} type="number" min={0.001} max={3600} step="any" required disabled={locked} value={Number.isNaN(shot.duration) ? "" : shot.duration} onChange={event => { setShot({ ...shot, duration: event.target.valueAsNumber }); setShotDirty(true); }} /><label htmlFor="shot-notes">Production notes · one per line; blank lines are ignored</label><textarea id="shot-notes" rows={4} maxLength={16384} disabled={locked} value={shot.notes.join("\n")} onChange={event => { setShot({ ...shot, notes: event.target.value.split("\n") }); setShotDirty(true); }} /><div className={styles.actions}><button disabled={locked || !shotDirty || !Number.isFinite(shot.duration)}>Save shot</button><span className={styles.muted}>{shotDirty ? "Unsaved shot edits" : "Shot saved"}</span></div>
          </form></section>}
          <FootageImportPanel key={snapshot.project.projectId} snapshot={snapshot} active={!editing} disabled={busy || !!pending || compositionBusy || dirty || !!newTitle || !!newDescription} onBusyChange={updateFootageBusy} onImported={next => { if (!result) return; install({ ...result, snapshot: next, projects: result.projects.map(item => item.projectId === next.project.projectId ? next.project : item), dryRun: undefined }, "all"); }} />
          </div>
          <div hidden={!editing} className={styles.editorHost}>
            <EditorialWorkspacePanel key={`${snapshot.project.projectId}:${snapshot.project.revision}`} projectId={snapshot.project.projectId} projectName={snapshot.project.title} workspaceActive={editing} onReturnToProject={returnToProject} disabled={busy || !!pending || footageBusy || dirty || !!newTitle || !!newDescription} onBusyChange={updateCompositionBusy} />
          </div>
          <div hidden={editing} className={styles.setupPanels}>
          <section className={styles.card}><p className={styles.eyebrow}>Readiness, not execution</p><h2>Check the production plan</h2><p>Uses only the saved shot. No installed engine is assumed available, and a dry run grants no approval. Generation is not priced; no execution cost is incurred by this local check.</p><button disabled={locked || dirty || !shot} onClick={() => shot && submit({ action: "dry-run", projectId: snapshot.project.projectId, shotId: shot.shotId }, "none")}>Run planning check</button>{dirty && <p className={styles.muted}>Save your edits before checking this plan.</p>}{dryRun !== null && <div className={styles.dryRun}><h3>{dryRun.route.status === "BLOCKED" ? "Blocked: engine readiness is not verified" : "Plan reviewed — execution is still disabled"}</h3><p>Method: {dryRun.route.selectedMethod.replaceAll("_", " ")} · saved shot revision {dryRun.shotRevision}</p><p>No engine checks or provider calls were made. No jobs were created.</p>{dryRun.route.blockedCapabilities.length > 0 && <p>Missing capability evidence: {dryRun.route.blockedCapabilities.join(", ")}</p>}<details><summary>Exact planning result and source revisions</summary><pre>{JSON.stringify(dryRun, null, 2)}</pre></details></div>}<div className={styles.gates}>{APPROVAL_GATES.map(gate => { const matching = snapshot.approvals.filter(item => item.gate === gate); const approval = matching[matching.length - 1]; return <div key={gate}><span>{GATE_LABELS[gate].replaceAll("_", " ")}</span><strong>{approval?.state ?? "Not requested"}</strong></div>; })}</div><p className={styles.muted}>Recorded decisions shown for context; exact current-scope approval is checked separately by the server.</p></section>
          <section className={styles.card}><h2>Generation preparation</h2><p>Inspect this saved project’s shot routing, provider readiness and non-secret request plan. Live dispatch remains disabled.</p><a href={`/animation-studio/projects/${encodeURIComponent(snapshot.project.projectId)}/generate`}>Open Generate workspace</a><p className={styles.muted}>Only saved revisions are inspected. Save any edits before opening the workspace.</p></section>
          <section className={styles.card}><h2>Local audit trail</h2><ol className={styles.audit}>{snapshot.events.slice(-12).reverse().map(event => <li key={event.eventId}><strong>{event.type.replaceAll("_", " ")}</strong><time dateTime={event.timestamp}>{event.timestamp}</time><span>{event.actor} · event {event.sequence}</span></li>)}</ol><details><summary>Execution policy and record binding</summary><pre>{JSON.stringify({ executionPolicy: result?.executionPolicy, recordDigest: snapshot.recordDigest, projectRevision: snapshot.project.revision }, null, 2)}</pre></details></section>
          </div>
        </> : <section className={`${styles.card} ${styles.empty}`}><p className={styles.eyebrow}>From idea to a production plan</p><h2>Your next story starts here</h2><p>Create an empty 45–60-second project or reopen one from the list, then import compatible MP4 video and WAV audio through the ordinary local-media workflow.</p><p className={styles.muted}>Planning and qualified local-media import work without a generation provider. Technical admission does not replace human creative, rights, listening or mix review.</p></section>}</div>
      </div>
    </div>
  </CodexForgeAppShell></div>;
}
