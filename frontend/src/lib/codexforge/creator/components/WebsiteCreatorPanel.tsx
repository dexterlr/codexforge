"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  actOnCreatorProject,
  buildCreatorClientIdempotencyKey,
  createCreatorProject,
  fetchCreatorProject,
} from "../creator-api-client";
import {
  CREATOR_FILE_POLICY,
  CREATOR_MAX_DESCRIPTION_LENGTH,
  CREATOR_MAX_PROJECT_TITLE_LENGTH,
  CREATOR_MODEL_ENVELOPE,
} from "../creator-policy";
import type {
  CreatorAuditEvent,
  CreatorMutationKind,
  CreatorProjectState,
  CreatorProjectStatus,
} from "../creator-types";
import styles from "./WebsiteCreatorPanel.module.css";

const JOURNEY_STAGES = [
  ["Describe", ["draft"]],
  ["Review plan", ["awaiting_generation_approval"]],
  ["Approval", ["approved", "awaiting_repair_approval", "repair_approved"]],
  ["Generate", ["generating", "repairing"]],
  ["Validate", ["validating"]],
  ["Ready", ["ready"]],
  ["Preview", ["preview_available"]],
  ["Repair", ["repair_requested", "rejected_output"]],
  ["Export", ["exported"]],
  ["Stopped", ["failed", "canceled"]],
] as const;

const STATUS_LABELS: Readonly<Record<CreatorProjectStatus, string>> = {
  draft: "Draft",
  awaiting_generation_approval: "Awaiting generation approval",
  approved: "Approved; awaiting explicit execution",
  generating: "Generating",
  validating: "Validating",
  rejected_output: "Output rejected",
  ready: "Ready",
  preview_available: "Preview available",
  repair_requested: "Repair requested",
  awaiting_repair_approval: "Awaiting repair approval",
  repair_approved: "Repair approved; awaiting explicit execution",
  repairing: "Repairing",
  failed: "Failed",
  canceled: "Canceled",
  exported: "Exported",
};

const REVIEW_PLAN_EXPLANATION_ID = "codexforge-creator-review-plan-explanation";
const PREVIEW_SUPPRESSION_STORAGE_PREFIX = "codexforge.creator.preview-suppressed.v1";
const PENDING_CREATE_STORAGE_KEY = "codexforge.creator.pending-create.v1";

type PendingCreate = Readonly<{
  idempotencyKey: string;
  projectTitle: string;
  description: string;
}>;

function readPendingCreate(): PendingCreate | null {
  try {
    const source = window.sessionStorage.getItem(PENDING_CREATE_STORAGE_KEY);
    if (!source || source.length > 2_400) return null;
    const value = JSON.parse(source) as Partial<PendingCreate>;
    if (
      typeof value.idempotencyKey !== "string" ||
      !/^[A-Za-z0-9._:-]{16,160}$/.test(value.idempotencyKey) ||
      typeof value.projectTitle !== "string" ||
      value.projectTitle.length < 1 ||
      value.projectTitle.length > CREATOR_MAX_PROJECT_TITLE_LENGTH ||
      typeof value.description !== "string" ||
      value.description.length < 1 ||
      value.description.length > CREATOR_MAX_DESCRIPTION_LENGTH
    ) {
      return null;
    }
    return {
      idempotencyKey: value.idempotencyKey,
      projectTitle: value.projectTitle,
      description: value.description,
    };
  } catch {
    return null;
  }
}

function storePendingCreate(value: PendingCreate): void {
  try {
    window.sessionStorage.setItem(PENDING_CREATE_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // The current mount still retains the exact idempotency key in memory.
  }
}

function clearPendingCreate(): void {
  try {
    window.sessionStorage.removeItem(PENDING_CREATE_STORAGE_KEY);
  } catch {
    // A storage-denied browser has no persisted pending-create record to clear.
  }
}

const RECOVERABLE_INTENT_EVENT_TYPES = new Set([
  "approval.requested",
  "execution.requested",
  "repair.requested",
  "cancellation.requested",
]);

function isAuditIntentCompleted(
  project: CreatorProjectState,
  event: CreatorAuditEvent
): boolean {
  return event.idempotencyKeyHash !== null && event.mutationDigest !== null &&
    project.idempotencyRecords.some(
      (record) =>
        record.idempotencyKeyHash === event.idempotencyKeyHash &&
        record.mutationDigest === event.mutationDigest
    );
}

function findPendingAuditEvent(
  project: CreatorProjectState,
  eventTypes: ReadonlySet<string>,
  isApplicable: (event: CreatorAuditEvent) => boolean = () => true
): CreatorAuditEvent | null {
  return [...project.auditEvents]
    .reverse()
    .find(
      (event) =>
        eventTypes.has(event.eventType) &&
        isApplicable(event) &&
        !isAuditIntentCompleted(project, event)
    ) ?? null;
}

function isOriginalIntentApplicable(
  project: CreatorProjectState,
  event: CreatorAuditEvent
): boolean {
  if (event.eventType === "approval.requested") {
    return ["awaiting_generation_approval", "awaiting_repair_approval"].includes(project.status);
  }
  if (event.eventType === "execution.requested") {
    return ["generating", "repairing", "validating"].includes(project.status);
  }
  if (event.eventType === "repair.requested") return project.status === "repair_requested";
  if (event.eventType === "cancellation.requested") {
    return [
      "draft",
      "awaiting_generation_approval",
      "approved",
      "repair_requested",
      "awaiting_repair_approval",
      "repair_approved",
    ].includes(project.status);
  }
  return false;
}

function previewSuppressionStorageKey(projectId: string, previewId: string): string {
  return `${PREVIEW_SUPPRESSION_STORAGE_PREFIX}:${projectId}:${previewId}`;
}

function hasStoredPreviewSuppression(projectId: string, previewId: string): boolean {
  try {
    return window.sessionStorage.getItem(previewSuppressionStorageKey(projectId, previewId)) === "true";
  } catch {
    return false;
  }
}

function storePreviewSuppression(projectId: string, previewId: string): void {
  try {
    window.sessionStorage.setItem(previewSuppressionStorageKey(projectId, previewId), "true");
  } catch {
    // In-memory suppression still removes the active iframe for this page.
  }
}

function clearStoredPreviewSuppression(projectId: string, previewId: string): void {
  try {
    window.sessionStorage.removeItem(previewSuppressionStorageKey(projectId, previewId));
  } catch {
    // A storage-denied browser has no persisted marker to clear.
  }
}

function statusReason(project: CreatorProjectState | null, expected: CreatorProjectStatus): string {
  if (!project) return "Create and review a bounded plan first.";
  if (project.status === expected) return "Available for the exact current revision.";
  return `Unavailable while the project is ${STATUS_LABELS[project.status].toLowerCase()}.`;
}

function buildFileUrl(
  projectId: string,
  revision: number,
  filePath: string
): string {
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `/api/codexforge/creator/projects/${projectId}/export/${revision}/files/${encodedPath}`;
}

export function WebsiteCreatorPanel() {
  const titleId = useId();
  const descriptionId = useId();
  const titleDisabledReasonId = useId();
  const descriptionDisabledReasonId = useId();
  const newRequestReasonId = useId();
  const recoveryReasonId = useId();
  const approvalReasonId = useId();
  const executionReasonId = useId();
  const repairReasonId = useId();
  const repairApprovalReasonId = useId();
  const repairExecutionReasonId = useId();
  const previewStartReasonId = useId();
  const previewStopReasonId = useId();
  const exportReasonId = useId();
  const cancelReasonId = useId();
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState<CreatorProjectState | null>(null);
  const latestProjectRef = useRef<CreatorProjectState | null>(null);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [suppressedPreviewId, setSuppressedPreviewId] = useState<string | null>(null);
  const createKey = useRef<string | null>(null);
  const actionKeys = useRef(new Map<string, string>());
  if (
    project !== null &&
    (latestProjectRef.current === null ||
      latestProjectRef.current.identity.projectId !== project.identity.projectId ||
      project.stateRevision >= latestProjectRef.current.stateRevision)
  ) {
    latestProjectRef.current = project;
  }
  const reviewPlanExplanation = busy
    ? "An exact creator operation is currently in progress."
    : project
      ? "An exact creation plan already exists for this project. Continue with its approval and execution controls below."
      : "Submitting prepares the exact bounded plan; it does not approve or execute generation.";
  const titleDisabledReason = busy
    ? "The project title is unavailable while the current creator operation finishes."
    : project
      ? "The project title is locked because an exact plan already exists for this project."
      : "The project title remains editable until the exact plan is prepared.";
  const descriptionDisabledReason = busy
    ? "The project description is unavailable while the current creator operation finishes."
    : project
      ? "The project description is locked because an exact plan already exists for this project."
      : "The project description remains editable until the exact plan is prepared.";
  const newRequestReason = busy
    ? "A new creator request is unavailable while the current creator operation finishes."
    : "Starts a new blank request without deleting the completed project or its audit trail.";

  function adoptProjectSnapshot(
    candidate: CreatorProjectState,
    expectedProjectId: string
  ): boolean {
    if (candidate.identity.projectId !== expectedProjectId) return false;
    const latest = latestProjectRef.current;
    if (
      latest !== null &&
      latest.identity.projectId === candidate.identity.projectId &&
      candidate.stateRevision < latest.stateRevision
    ) {
      return false;
    }
    latestProjectRef.current = candidate;
    setProject(candidate);
    return true;
  }

  useEffect(() => {
    const projectId = new URL(window.location.href).searchParams.get("project");
    if (!projectId) {
      const pendingCreate = readPendingCreate();
      if (pendingCreate) {
        createKey.current = pendingCreate.idempotencyKey;
        setProjectTitle(pendingCreate.projectTitle);
        setDescription(pendingCreate.description);
        setError(
          "An interrupted plan request was restored. Review it and submit again to reconcile the same project identity."
        );
      }
      return;
    }
    if (!/^[a-f0-9]{24}$/.test(projectId)) return;
    let active = true;
    setBusy(true);
    setBusyLabel("Loading the exact creator project");
    fetchCreatorProject(projectId)
      .then((next) => {
        if (!active) return;
        if (next.preview.previewId) {
          if (
            next.preview.status === "active" &&
            hasStoredPreviewSuppression(next.identity.projectId, next.preview.previewId)
          ) {
            setSuppressedPreviewId(next.preview.previewId);
          } else {
            if (next.preview.status !== "active") {
              clearStoredPreviewSuppression(next.identity.projectId, next.preview.previewId);
            }
            setSuppressedPreviewId(null);
          }
        } else {
          setSuppressedPreviewId(null);
        }
        adoptProjectSnapshot(next, projectId);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Unable to load the creator project.");
      })
      .finally(() => {
        if (active) {
          setBusy(false);
          setBusyLabel("");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const currentStatus = project?.status ?? "draft";
  const currentArtifactRevision = project?.materializations.at(-1)?.artifactRevision ?? null;
  const previewUrl = useMemo(() => {
    if (
      !project ||
      project.preview.status !== "active" ||
      !project.preview.previewId ||
      !project.preview.artifactRevision ||
      project.preview.previewId === suppressedPreviewId
    ) {
      return null;
    }
    return `/api/codexforge/creator/preview/${project.identity.projectId}/${project.preview.previewId}/${project.preview.artifactRevision}/index.html`;
  }, [project, suppressedPreviewId]);
  const previewLocallySuppressed = Boolean(
    project?.preview.status === "active" &&
    project.preview.previewId &&
    project.preview.previewId === suppressedPreviewId
  );

  function updateProjectTitle(value: string) {
    createKey.current = null;
    clearPendingCreate();
    setProjectTitle(value);
  }

  function updateDescription(value: string) {
    createKey.current = null;
    clearPendingCreate();
    setDescription(value);
  }

  async function submitDescription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setBusyLabel("Preparing the exact plan and approval boundary");
    setError(null);
    try {
      createKey.current ??= buildCreatorClientIdempotencyKey();
      storePendingCreate({
        idempotencyKey: createKey.current,
        projectTitle,
        description,
      });
      const result = await createCreatorProject(
        {
          creatorKind: "website-browser-app",
          projectTitle,
          description,
        },
        createKey.current
      );
      adoptProjectSnapshot(result.project, result.project.identity.projectId);
      clearPendingCreate();
      const url = new URL(window.location.href);
      url.searchParams.set("project", result.project.identity.projectId);
      window.history.replaceState(null, "", url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to prepare the creator plan.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  }

  async function performAction(
    action: CreatorMutationKind,
    label: string,
    expectedRevision = project?.stateRevision ?? 0
  ) {
    if (!project || busy) return;
    if (
      (action === "stop-preview" || action === "cancel") &&
      project.preview.status === "active" &&
      project.preview.previewId
    ) {
      setSuppressedPreviewId(project.preview.previewId);
      storePreviewSuppression(project.identity.projectId, project.preview.previewId);
    }
    setBusy(true);
    setBusyLabel(label);
    setError(null);
    const keyLabel = `${action}:${expectedRevision}`;
    const key = action === "recover"
      ? `creator-ui-recover:${project.identity.projectId}:${expectedRevision}`
      : actionKeys.current.get(keyLabel) ?? buildCreatorClientIdempotencyKey();
    actionKeys.current.set(keyLabel, key);
    try {
      const result = await actOnCreatorProject(
        project.identity.projectId,
        action,
        expectedRevision,
        key
      );
      const accepted = adoptProjectSnapshot(result.project, project.identity.projectId);
      if (!accepted) return;
      if (
        action === "start-preview" ||
        result.project.preview.status !== "active" ||
        result.project.preview.previewId !== project.preview.previewId
      ) {
        if (project.preview.previewId) {
          clearStoredPreviewSuppression(project.identity.projectId, project.preview.previewId);
        }
        if (result.project.preview.previewId) {
          clearStoredPreviewSuppression(
            result.project.identity.projectId,
            result.project.preview.previewId
          );
        }
        setSuppressedPreviewId(null);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Creator action failed safely.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  }

  function resetWorkspace() {
    if (project) {
      for (const previewId of new Set([project.preview.previewId, suppressedPreviewId])) {
        if (previewId) clearStoredPreviewSuppression(project.identity.projectId, previewId);
      }
    }
    setProject(null);
    latestProjectRef.current = null;
    setProjectTitle("");
    setDescription("");
    setError(null);
    setSuppressedPreviewId(null);
    createKey.current = null;
    clearPendingCreate();
    actionKeys.current.clear();
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(null, "", url);
  }

  const baseCanCancel =
    project !== null &&
    !["generating", "repairing", "validating", "exported", "canceled"].includes(project.status);
  const canRecoverExport =
    project?.status === "failed" &&
    project.materializations.length > 0 &&
    project.exportManifest !== null;
  const latestPurpose = project?.runBindings.at(-1)?.purpose ?? null;
  const pendingRecoveryIntent = project
    ? findPendingAuditEvent(project, new Set(["recovery.requested"]))
    : null;
  const pendingOriginalIntent = project
    ? findPendingAuditEvent(
        project,
        RECOVERABLE_INTENT_EVENT_TYPES,
        (event) => isOriginalIntentApplicable(project, event)
      )
    : null;
  const recoveryOriginalIntent = project && pendingRecoveryIntent
    ? [...project.auditEvents.slice(
        0,
        project.auditEvents.findIndex(
          (event) => event.eventId === pendingRecoveryIntent.eventId
        )
      )]
        .reverse()
        .find(
          (event) =>
            RECOVERABLE_INTENT_EVENT_TYPES.has(event.eventType) &&
            event.sourceRunId === pendingRecoveryIntent.sourceRunId
        ) ?? null
    : pendingOriginalIntent;
  const recoveryExpectedRevision = pendingRecoveryIntent
    ? pendingRecoveryIntent.stateRevision - 1
    : project?.stateRevision ?? 0;
  const recoveryAction: Readonly<{ action: CreatorMutationKind; label: string }> | null =
    recoveryOriginalIntent?.eventType === "execution.requested"
      ? {
          action: "recover",
          label:
            latestPurpose === "repair"
              ? "Resume recorded repair result handling"
              : "Resume recorded generation result handling",
        }
      : recoveryOriginalIntent?.eventType === "approval.requested"
        ? { action: "recover", label: "Resume recorded manual approval" }
        : recoveryOriginalIntent?.eventType === "repair.requested"
          ? { action: "recover", label: "Resume binding the requested repair run" }
          : recoveryOriginalIntent?.eventType === "cancellation.requested"
            ? { action: "recover", label: "Resume recorded cancellation" }
            : null;
  const recoveryOwnsOrdinaryActions = recoveryAction !== null;
  const cancellationMaySupersedeRecovery =
    pendingRecoveryIntent === null &&
    (recoveryOriginalIntent?.eventType === "approval.requested" ||
      recoveryOriginalIntent?.eventType === "repair.requested");
  const canCancel =
    baseCanCancel &&
    (!recoveryOwnsOrdinaryActions || cancellationMaySupersedeRecovery);
  const recoveryOwnershipReason = recoveryAction
    ? `This action is unavailable while the explicit recovery action "${recoveryAction.label}" owns the persisted creator lifecycle.`
    : null;
  const ordinaryActionReason = (
    expectedStatus: CreatorProjectStatus,
    busyReason = "Another exact action is in progress."
  ) => busy
    ? busyReason
    : recoveryOwnershipReason ?? statusReason(project, expectedStatus);
  const recoveryReason = busy
    ? "This recovery action is unavailable while the current creator operation finishes."
    : "This recovery action resumes the exact persisted intent; it cannot create an additional provider attempt.";
  const repairReason = busy
    ? "The repair request is unavailable while the current creator operation finishes."
    : recoveryOwnershipReason
      ? recoveryOwnershipReason
      : !project
        ? "Create and execute a bounded creator project before requesting a repair."
        : project.repair
          ? "The single repair attempt has already been used; another repair cannot be requested in v0."
          : project.status !== "rejected_output" && project.status !== "ready"
            ? `Repair is unavailable while the project is ${STATUS_LABELS[project.status].toLowerCase()}.`
            : !project.validation?.issues.length
              ? "Repair requires at least one validation finding and never runs automatically."
              : "Available for the exact current proposal and validation issue digest.";
  const cancelReason = busy
    ? "Cancellation is unavailable while the current creator operation finishes."
    : !project
      ? "Create and review a creator project before cancellation is available."
      : recoveryOwnsOrdinaryActions && !cancellationMaySupersedeRecovery
        ? recoveryOwnershipReason ?? "Complete the exact persisted recovery before requesting cancellation."
        : canCancel
          ? cancellationMaySupersedeRecovery
            ? "Cancellation may supersede this interrupted pre-execution intent without claiming provider termination."
            : "Cancellation is available without claiming provider termination."
          : project.status === "canceled"
            ? "This creator project is already canceled."
            : project.status === "exported"
              ? "This creator project is already exported; start a new creator request to continue."
              : project.status === "validating"
                ? "Cancellation is unavailable while validation or publication recovery is in progress."
                : "Cancellation is unavailable while generation or repair result handling is in progress; this control cannot promise provider request termination.";

  return (
    <div className={styles.workspace} data-codexforge-creator-surface="website-browser-app-v0">
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Jarvis creator · local static output</p>
          <h1>Static Website/Browser App v0</h1>
          <p className={styles.heroSummary}>
            Describe one small static site or browser app, review the exact bounded plan,
            then approve and execute one local generation attempt when you choose.
          </p>
        </div>
        <div className={styles.heroActions}>
          <Link className={styles.secondaryLink} href="/jarvis">
            Back to Jarvis
          </Link>
          {project && ["canceled", "exported"].includes(project.status) ? (
            <div>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={resetWorkspace}
                aria-describedby={busy ? newRequestReasonId : undefined}
                disabled={busy}
              >
                New creator request
              </button>
              <p id={newRequestReasonId} className={styles.actionReason}>{newRequestReason}</p>
            </div>
          ) : null}
        </div>
      </header>

      <section className={styles.boundaryCard} aria-labelledby="creator-boundary-title">
        <div>
          <p className={styles.eyebrow}>Exact execution envelope</p>
          <h2 id="creator-boundary-title">Local, bounded, and manually gated</h2>
        </div>
        <dl className={styles.factGrid}>
          <div><dt>Model</dt><dd>{CREATOR_MODEL_ENVELOPE.modelKey}</dd></div>
          <div><dt>Data boundary</dt><dd>Local machine</dd></div>
          <div><dt>Output limit</dt><dd>4096 tokens</dd></div>
          <div><dt>Fallback / retry</dt><dd>Disabled / disabled</dd></div>
          <div><dt>Files</dt><dd>1–{CREATOR_FILE_POLICY.maximumFileCount}</dd></div>
          <div><dt>Bundle bytes</dt><dd>{CREATOR_FILE_POLICY.maximumAggregateBytes.toLocaleString()}</dd></div>
          <div><dt>Each file</dt><dd>{CREATOR_FILE_POLICY.maximumIndividualFileBytes.toLocaleString()} bytes</dd></div>
          <div><dt>Entrypoint</dt><dd>index.html</dd></div>
        </dl>
        <div className={styles.capabilityGrid}>
          <div>
            <h3>It can build</h3>
            <p>Bounded static HTML, CSS, client-side JavaScript, JSON, safe SVG, Markdown, and text.</p>
          </div>
          <div>
            <h3>It cannot build</h3>
            <p>Backends, databases, deployment, package-installed frameworks, native apps, games, or video.</p>
          </div>
        </div>
      </section>

      <nav className={styles.stageNav} aria-label="Creator lifecycle stages">
        <ol>
          {JOURNEY_STAGES.map(([label, states], index) => {
            const active = (states as readonly string[]).includes(currentStatus);
            return (
              <li key={label} data-active={active ? "true" : "false"}>
                <span aria-hidden="true">{index + 1}</span>
                <strong>{label}</strong>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className={styles.statusBar} role="status" aria-live="polite" aria-atomic="true">
        <strong>{busy ? busyLabel : project ? STATUS_LABELS[project.status] : "Describe a project"}</strong>
        <span>
          {project
            ? `Project ${project.identity.projectId} · state revision ${project.stateRevision} · artifact revision ${currentArtifactRevision ?? "none"}`
            : "No files, approval, execution, preview, or export exist yet."}
        </span>
      </div>
      {error ? <p className={styles.errorNotice} role="alert">{error}</p> : null}
      {recoveryAction ? (
        <section className={styles.recoveryBar} aria-label="Interrupted creator recovery">
          <div>
            <strong>Recovery available</strong>
            <p>The persisted intent and exact run identity will be reconciled only after this explicit action.</p>
            <p id={recoveryReasonId} className={styles.actionReason}>{recoveryReason}</p>
          </div>
          <button
            className={styles.primaryButton}
            type="button"
            aria-describedby={busy ? recoveryReasonId : undefined}
            disabled={busy}
            onClick={() => performAction(
              recoveryAction.action,
              recoveryAction.label,
              recoveryExpectedRevision
            )}
          >{recoveryAction.label}</button>
        </section>
      ) : null}

      <section className={styles.section} aria-labelledby="describe-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Describe</p><h2 id="describe-title">Plain-language request</h2></div>
          <span className={styles.statePill}>{project ? "Recorded" : "Required"}</span>
        </div>
        <form className={styles.form} onSubmit={submitDescription}>
          <label htmlFor={titleId}>Project title</label>
          <input
            id={titleId}
            value={project?.identity.projectTitle ?? projectTitle}
            onChange={(event) => updateProjectTitle(event.target.value)}
            maxLength={80}
            aria-describedby={busy || Boolean(project) ? titleDisabledReasonId : undefined}
            disabled={busy || Boolean(project)}
            required
          />
          <p id={titleDisabledReasonId} className={styles.actionReason}>{titleDisabledReason}</p>
          <label htmlFor={descriptionId}>What should the static site or browser app do?</label>
          <textarea
            id={descriptionId}
            value={project?.request.description ?? description}
            onChange={(event) => updateDescription(event.target.value)}
            maxLength={2000}
            rows={6}
            aria-describedby={busy || Boolean(project) ? descriptionDisabledReasonId : undefined}
            disabled={busy || Boolean(project)}
            required
          />
          <p id={descriptionDisabledReasonId} className={styles.actionReason}>{descriptionDisabledReason}</p>
          <p className={styles.fieldHint}>Do not include credentials, secrets, environment values, deployment instructions, or backend requirements.</p>
          <button
            className={styles.primaryButton}
            type="submit"
            aria-describedby={busy || Boolean(project) ? REVIEW_PLAN_EXPLANATION_ID : undefined}
            disabled={busy || Boolean(project)}
          >
            Review exact creation plan
          </button>
          <p id={REVIEW_PLAN_EXPLANATION_ID} className={styles.actionReason}>{reviewPlanExplanation}</p>
        </form>
      </section>

      <section className={styles.section} aria-labelledby="plan-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Review plan</p><h2 id="plan-title">Exact bounded creation plan</h2></div>
          <span className={styles.statePill}>{project?.plan ? "Prepared" : "Unavailable"}</span>
        </div>
        {project?.plan ? (
          <>
            <dl className={styles.detailList}>
              <div><dt>Plan digest</dt><dd>{project.plan.planDigest}</dd></div>
              <div><dt>Contract</dt><dd>{project.plan.contractVersion}</dd></div>
              <div><dt>Destination</dt><dd>{project.plan.destinationBoundary}</dd></div>
              <div><dt>Path limit</dt><dd>{project.plan.filePolicy.maximumRelativePathLength} ASCII characters, {project.plan.filePolicy.maximumDirectoryDepth} directories</dd></div>
              <div><dt>Allowed types</dt><dd>.html, .css, .js, .json, .svg, .md, .txt</dd></div>
            </dl>
            <ol className={styles.planSteps}>{project.plan.orderedSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </>
        ) : (
          <p className={styles.emptyState}>Submit a description to prepare a server-owned plan. No provider run exists yet.</p>
        )}
      </section>

      <section className={styles.section} aria-labelledby="approval-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Approval and execution</p><h2 id="approval-title">Two separate manual actions</h2></div>
          <span className={styles.statePill}>{project?.approvalPacket?.status ?? "Unavailable"}</span>
        </div>
        {project?.approvalPacket ? (
          <dl className={styles.detailList}>
            <div><dt>Purpose</dt><dd>{project.approvalPacket.purpose}</dd></div>
            <div><dt>Source run</dt><dd>{project.approvalPacket.privateAlphaRunId}</dd></div>
            <div><dt>Approval scope</dt><dd>{project.approvalPacket.approvalScopeHash}</dd></div>
            <div><dt>Target artifact revision</dt><dd>{project.approvalPacket.targetArtifactRevision}</dd></div>
            <div><dt>Approved destination</dt><dd>{project.approvalPacket.destinationBoundary}</dd></div>
            <div><dt>Provider / model</dt><dd>ollama-local · gpt-oss:20b</dd></div>
          </dl>
        ) : <p className={styles.emptyState}>Approval is unavailable until the exact plan and local run are bound.</p>}
        <div className={styles.actionGrid}>
          <div>
            <button
              className={styles.primaryButton}
              type="button"
              disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "awaiting_generation_approval"}
              aria-describedby={approvalReasonId}
              onClick={() => performAction("approve-generation", "Recording the exact manual generation approval")}
            >Approve exact generation</button>
            <p id={approvalReasonId} className={styles.actionReason}>{ordinaryActionReason("awaiting_generation_approval")}</p>
          </div>
          <div>
            <button
              className={styles.primaryButton}
              type="button"
              disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "approved"}
              aria-describedby={executionReasonId}
              onClick={() => performAction("execute-generation", "Generating and validating one exact local attempt")}
            >Execute once</button>
            <p id={executionReasonId} className={styles.actionReason}>{ordinaryActionReason("approved", "The one explicit action is still in progress.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="validation-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Validation and files</p><h2 id="validation-title">Ten deterministic gates</h2></div>
          <span className={styles.statePill}>{project?.validation ? (project.validation.valid ? "Passed" : "Blocked") : "Unavailable"}</span>
        </div>
        <p className={styles.policyCopy}>Schema → limits → paths → content safety → entrypoint → local references → HTML structure → accessibility → preview readiness → manifest and hashes.</p>
        {project?.validation ? (
          <>
            <dl className={styles.detailList}>
              <div><dt>Issue digest</dt><dd>{project.validation.issueDigest}</dd></div>
              <div><dt>Bundle digest</dt><dd>{project.validation.bundleDigest ?? "No valid bundle digest"}</dd></div>
              <div><dt>Stages completed</dt><dd>{project.validation.stagesCompleted.join(", ")}</dd></div>
            </dl>
            {project.validation.issues.length ? (
              <ul className={styles.issueList}>{project.validation.issues.map((issue, index) => (
                <li key={`${issue.code}-${issue.filePath ?? "bundle"}-${index}`}>
                  <strong>{issue.code}</strong><span>{issue.severity} · {issue.filePath ?? "bundle"}</span><p>{issue.message}</p><p>Repair context: {issue.suggestedRepairContext}</p>
                </li>
              ))}</ul>
            ) : <p className={styles.successNotice}>No blocking issues or warnings were reported.</p>}
          </>
        ) : <p className={styles.emptyState}>Files and validation findings are unavailable until explicit execution returns output.</p>}

        {project?.artifactProposal ? (
          <div className={styles.fileList} aria-label="Generated file inventory">
            {project.artifactProposal.files.map((file) => (
              <details key={file.path}>
                <summary><strong>{file.path}</strong><span>{file.mediaType} · {new TextEncoder().encode(file.content).length.toLocaleString()} bytes</span></summary>
                <pre tabIndex={0}>{file.content}</pre>
              </details>
            ))}
          </div>
        ) : <p className={styles.emptyState}>No generated file proposal is available to inspect.</p>}
      </section>

      <section className={styles.section} aria-labelledby="preview-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Preview</p><h2 id="preview-title">Loopback-only sandbox</h2></div>
          <span className={styles.statePill}>{project?.preview.status ?? "Unavailable"}</span>
        </div>
        <p className={styles.policyCopy}>Generated code runs only in an iframe sandbox with <code>allow-scripts</code>. Same-origin access, forms, popups, downloads, top navigation, objects, frames, storage, and network connections remain blocked.</p>
        <div className={styles.actionGrid}>
          <div>
            <button className={styles.primaryButton} type="button" disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "ready"} aria-describedby={previewStartReasonId} onClick={() => performAction("start-preview", "Starting the exact sandbox preview")}>Start preview</button>
            <p id={previewStartReasonId} className={styles.actionReason}>{ordinaryActionReason("ready")}</p>
          </div>
          <div>
            <button className={styles.secondaryButton} type="button" disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "preview_available"} aria-describedby={previewStopReasonId} onClick={() => performAction("stop-preview", "Stopping the sandbox preview")}>Stop preview</button>
            <p id={previewStopReasonId} className={styles.actionReason}>{ordinaryActionReason("preview_available")}</p>
          </div>
        </div>
        {previewUrl ? (
          <div className={styles.previewFrameShell}>
            <iframe title={`Sandbox preview of ${project?.identity.projectTitle ?? "generated static project"}`} src={previewUrl} sandbox="allow-scripts" referrerPolicy="no-referrer" />
          </div>
        ) : previewLocallySuppressed ? (
          <p className={styles.emptyState}>This preview was hidden locally when stop or cancel was requested. It remains hidden across page reloads in this tab until the server confirms that it stopped or a new preview is explicitly started.</p>
        ) : <p className={styles.emptyState}>Preview is unavailable until validation passes, a revision is materialized, and you explicitly start it.</p>}
      </section>

      <section className={styles.section} aria-labelledby="repair-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>One repair maximum</p><h2 id="repair-title">Separate repair approval and execution</h2></div>
          <span className={styles.statePill}>{project?.repair ? "Attempt 1 used" : "Not requested"}</span>
        </div>
        <div className={styles.actionGridThree}>
          <div><button className={styles.primaryButton} type="button" disabled={busy || recoveryOwnsOrdinaryActions || (project?.status !== "rejected_output" && project?.status !== "ready") || Boolean(project?.repair) || !project?.validation?.issues.length} aria-describedby={repairReasonId} onClick={() => performAction("request-repair", "Binding the one permitted repair run")}>Request one repair</button></div>
          <div><button className={styles.primaryButton} type="button" disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "awaiting_repair_approval"} aria-describedby={repairApprovalReasonId} onClick={() => performAction("approve-repair", "Recording the separate repair approval")}>Approve repair</button><p id={repairApprovalReasonId} className={styles.actionReason}>{ordinaryActionReason("awaiting_repair_approval")}</p></div>
          <div><button className={styles.primaryButton} type="button" disabled={busy || recoveryOwnsOrdinaryActions || project?.status !== "repair_approved"} aria-describedby={repairExecutionReasonId} onClick={() => performAction("execute-repair", "Executing and validating the one repair attempt")}>Execute repair once</button><p id={repairExecutionReasonId} className={styles.actionReason}>{ordinaryActionReason("repair_approved")}</p></div>
        </div>
        <p id={repairReasonId} className={styles.actionReason}>{repairReason}</p>
      </section>

      <section className={styles.section} aria-labelledby="export-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Export</p><h2 id="export-title">Manifest and individual static files</h2></div>
          <span className={styles.statePill}>{project?.exportManifest ? "Manifest prepared" : "Unavailable"}</span>
        </div>
        <button className={styles.primaryButton} type="button" disabled={busy || recoveryOwnsOrdinaryActions || (project?.status !== "ready" && !canRecoverExport)} aria-describedby={exportReasonId} onClick={() => performAction("export", "Verifying the deterministic export manifest and every file hash")}>{canRecoverExport ? "Export preserved valid revision" : "Make export available"}</button>
        <p id={exportReasonId} className={styles.actionReason}>{busy ? "Another exact action is in progress." : recoveryOwnershipReason ?? (canRecoverExport ? "A prior validated revision was preserved and can be recovered as an export." : statusReason(project, "ready"))}</p>
        {project?.status === "exported" && project.exportManifest ? (
          <div className={styles.exportPanel}>
            <dl className={styles.detailList}>
              <div><dt>Manifest digest</dt><dd>{project.exportManifest.manifestDigest}</dd></div>
              <div><dt>Aggregate digest</dt><dd>{project.exportManifest.aggregateDigest}</dd></div>
              <div><dt>Aggregate bytes</dt><dd>{project.exportManifest.aggregateBytes.toLocaleString()}</dd></div>
              <div><dt>Source run</dt><dd>{project.exportManifest.sourceRunId}</dd></div>
            </dl>
            <div className={styles.downloadLinks}>
              <a href={`/api/codexforge/creator/projects/${project.identity.projectId}/export/${project.exportManifest.artifactRevision}/manifest`}>Download manifest JSON</a>
              {project.exportManifest.files.map((file) => <a key={file.path} href={buildFileUrl(project.identity.projectId, project.exportManifest!.artifactRevision, file.path)}>Download {file.path}</a>)}
            </div>
            <p className={styles.fieldHint}>ZIP packaging and deployment are not provided in v0.</p>
          </div>
        ) : <p className={styles.emptyState}>Export links remain unavailable until a ready manifest is explicitly verified.</p>}
      </section>

      <section className={styles.section} aria-labelledby="audit-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Audit</p><h2 id="audit-title">Complete bounded creator trail</h2></div>
          <Link className={styles.secondaryLink} href={project ? `/jarvis-audit?creatorProject=${project.identity.projectId}` : "/jarvis-audit"}>Open Jarvis audit</Link>
        </div>
        {project?.auditEvents.length ? (
          <ol className={styles.auditList}>{project.auditEvents.map((event) => (
            <li key={event.eventId}><div><strong>{event.eventType}</strong><span>state r{event.stateRevision} · {event.occurredAt}</span></div><p>{event.summary}</p><p>Event {event.eventId} · source run {event.sourceRunId ?? "none"} · artifact revision {event.artifactRevision ?? "none"}</p></li>
          ))}</ol>
        ) : <p className={styles.emptyState}>No creator audit events exist before a request is submitted.</p>}
        <div className={styles.footerActions}>
          <button className={styles.dangerButton} type="button" disabled={busy || !canCancel} aria-describedby={cancelReasonId} onClick={() => performAction("cancel", "Canceling creator work without claiming provider termination")}>Cancel creator</button>
          <p id={cancelReasonId}>{cancelReason}</p>
        </div>
      </section>
    </div>
  );
}
