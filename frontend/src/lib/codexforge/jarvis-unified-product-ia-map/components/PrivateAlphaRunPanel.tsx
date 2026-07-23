"use client";

import { useEffect, useState } from "react";
import type {
  PrivateAlphaCapability,
  PrivateAlphaRunRecord,
  PrivateAlphaRunSummary,
  PrivateAlphaStatus,
} from "@/lib/codexforge/private-alpha";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
  PRIVATE_ALPHA_PRODUCTION_MODEL,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
  PRIVATE_ALPHA_SECRET_GUIDANCE,
} from "@/lib/codexforge/private-alpha";
import {
  approvePrivateAlphaRun,
  cancelPrivateAlphaRun,
  createPrivateAlphaRun,
  executePrivateAlphaRun,
  fetchPrivateAlphaRun,
  fetchPrivateAlphaStatus,
  listPrivateAlphaRuns,
} from "@/lib/codexforge/private-alpha/private-alpha-api-client";
import styles from "./JarvisUnifiedProductShell.module.css";

type PrivateAlphaLoadState = "loading" | "ready" | "error";

function resolveStateClass(state: string): string {
  switch (state) {
    case "approved":
    case "awaiting_approval":
      return styles.metricStateApproval;
    case "succeeded":
      return styles.metricStateReady;
    case "failed":
    case "blocked":
    case "canceled":
      return styles.metricStateBlocked;
    default:
      return styles.metricStateSecondary;
  }
}

function formatKillSwitchSources(status: PrivateAlphaStatus | null): string {
  if (!status || status.killSwitchSources.length === 0) {
    return "No kill-switch source engaged.";
  }

  return `Engaged via ${status.killSwitchSources.join(" + ")}.`;
}

function isLocalExecutableRun(run: PrivateAlphaRunRecord | null): boolean {
  if (!run) {
    return false;
  }

  return (
    run.request.providerPreference === PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID &&
    run.request.modelPreferenceLabel === PRIVATE_ALPHA_PRODUCTION_MODEL &&
    run.request.executionMode === PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE
  );
}

function formatNanosecondDuration(durationNanoseconds: number | null): string | null {
  if (durationNanoseconds === null) {
    return null;
  }

  if (durationNanoseconds >= 1_000_000_000) {
    return `${(durationNanoseconds / 1_000_000_000).toFixed(2)}s`;
  }

  if (durationNanoseconds >= 1_000_000) {
    return `${(durationNanoseconds / 1_000_000).toFixed(0)}ms`;
  }

  return `${durationNanoseconds}ns`;
}

function buildExecutionOutcomeMessage(run: PrivateAlphaRunRecord): string {
  switch (run.state) {
    case "succeeded":
      return "Local Ollama execution finished and output was persisted locally.";
    case "failed":
      return "Local Ollama execution finished with a persisted failure record.";
    case "blocked":
      return "A persisted blocked execution record is now loaded.";
    default:
      return "Private-alpha run state refreshed.";
  }
}

export function PrivateAlphaRunPanel() {
  const [status, setStatus] = useState<PrivateAlphaStatus | null>(null);
  const [runs, setRuns] = useState<readonly PrivateAlphaRunSummary[]>([]);
  const [currentRun, setCurrentRun] = useState<PrivateAlphaRunRecord | null>(null);
  const [loadState, setLoadState] = useState<PrivateAlphaLoadState>("loading");
  const [requestText, setRequestText] = useState("");
  const [capability, setCapability] = useState<PrivateAlphaCapability>("text");
  const [maximumOutputTokens, setMaximumOutputTokens] = useState("512");
  const [approvalAcknowledged, setApprovalAcknowledged] = useState(false);
  const [executionAcknowledged, setExecutionAcknowledged] = useState(false);
  const [cancellationReason, setCancellationReason] = useState(
    "Operator canceled this private-alpha run before execution."
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionInFlight, setActionInFlight] = useState<string | null>(null);

  async function refreshPanel(preferredRunId?: string): Promise<void> {
    setLoadState("loading");
    setErrorMessage(null);

    try {
      const [nextStatus, nextRuns] = await Promise.all([
        fetchPrivateAlphaStatus(),
        listPrivateAlphaRuns(),
      ]);
      const nextRunId =
        preferredRunId ?? currentRun?.runId ?? nextRuns[0]?.runId ?? null;

      let nextRun: PrivateAlphaRunRecord | null = null;
      if (nextRunId) {
        nextRun = await fetchPrivateAlphaRun(nextRunId);
      }

      setStatus(nextStatus);
      setRuns(nextRuns);
      setCurrentRun(nextRun);
      setLoadState("ready");
    } catch (error) {
      setLoadState("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to load private-alpha local execution status."
      );
    }
  }

  useEffect(() => {
    void refreshPanel();
  }, []);

  useEffect(() => {
    setApprovalAcknowledged(false);
    setExecutionAcknowledged(false);
  }, [currentRun?.runId]);

  async function handleCreateRun(): Promise<void> {
    setActionInFlight("create");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await createPrivateAlphaRun({
        requestText,
        capability,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: Number(maximumOutputTokens),
      });
      await refreshPanel(result.run.runId);
      setSuccessMessage(
        result.created
          ? "Approval request persisted locally."
          : "Existing private-alpha run returned from idempotency protection."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to create the private-alpha run."
      );
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleApprove(): Promise<void> {
    if (!currentRun) {
      return;
    }

    setActionInFlight("approve");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await approvePrivateAlphaRun(currentRun.runId, {
        approvalScopeHash: currentRun.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: currentRun.revision,
      });

      await refreshPanel(currentRun.runId);
      setSuccessMessage("Manual approval recorded locally.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to record manual approval."
      );
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleExecute(): Promise<void> {
    if (!currentRun) {
      return;
    }

    setActionInFlight("execute");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const nextRun = await executePrivateAlphaRun(currentRun.runId, {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: currentRun.approvalScopeHash,
        expectedRevision: currentRun.revision,
      });

      await refreshPanel(nextRun.runId);
      setSuccessMessage(buildExecutionOutcomeMessage(nextRun));
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Unable to execute the private-alpha run.";

      try {
        await refreshPanel(currentRun.runId);
      } catch {
        setLoadState("error");
      }

      setErrorMessage(message);
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleCancel(): Promise<void> {
    if (!currentRun) {
      return;
    }

    setActionInFlight("cancel");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await cancelPrivateAlphaRun(currentRun.runId, {
        expectedRevision: currentRun.revision,
        reason: cancellationReason,
      });

      await refreshPanel(currentRun.runId);
      setSuccessMessage("Run canceled locally.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to cancel the private-alpha run."
      );
    } finally {
      setActionInFlight(null);
    }
  }

  const currentExecution = currentRun?.execution ?? null;
  const localExecutableRun = isLocalExecutableRun(currentRun);
  const canApprove = currentRun?.state === "awaiting_approval";
  const canCancel =
    currentRun?.state === "awaiting_approval" || currentRun?.state === "approved";
  const canExecute =
    currentRun?.state === "approved" &&
    localExecutableRun &&
    executionAcknowledged &&
    status?.executionAllowed === true &&
    actionInFlight === null;

  const executionDuration = formatNanosecondDuration(
    currentExecution?.totalDurationNanoseconds ?? null
  );

  return (
    <section className={styles.panel} aria-label="Private alpha local execution">
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>Private Alpha</p>
          <h2 className={styles.panelTitle}>Manual-approved local execution</h2>
        </div>
        <span
          className={`${styles.panelBadge} ${
            status?.executionAllowed ? styles.metricStateReady : styles.metricStateBlocked
          }`}
        >
          {status?.executionAllowed ? "Execution allowed" : "Execution blocked"}
        </span>
      </div>

      <p className={styles.panelBody}>
        Local provider: Ollama. Model: {PRIVATE_ALPHA_PRODUCTION_MODEL}. The
        approved prompt is sent only to local Ollama. No cloud provider is
        contacted.
      </p>

      <div className={styles.workspaceMeta}>
        <span className={styles.metaPill}>{PRIVATE_ALPHA_SECRET_GUIDANCE}</span>
        <span className={styles.metaPill}>One execution attempt per run</span>
        <span className={styles.metaPill}>Kill switch blocks execution</span>
        <span className={styles.metaPill}>Output is persisted locally</span>
        <span className={styles.metaPill}>
          {`Local persistence: ${status?.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL}`}
        </span>
      </div>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Provider</p>
          <h3 className={styles.placeholderTitle}>{PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL}</h3>
          <p className={styles.placeholderSummary}>Local provider: Ollama</p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Model</p>
          <h3 className={styles.placeholderTitle}>{PRIVATE_ALPHA_PRODUCTION_MODEL}</h3>
          <p className={styles.placeholderSummary}>Fixed production model</p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Provider availability</p>
          <h3 className={styles.placeholderTitle}>
            {status?.providerAvailable ? "available" : "unavailable"}
          </h3>
          <p className={styles.placeholderSummary}>
            Browser never calls port 11434 directly.
          </p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Model availability</p>
          <h3 className={styles.placeholderTitle}>
            {status?.modelAvailable ? "installed" : "missing"}
          </h3>
          <p className={styles.placeholderSummary}>
            Required model: {PRIVATE_ALPHA_PRODUCTION_MODEL}
          </p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Kill switch</p>
          <h3 className={styles.placeholderTitle}>
            {status?.killSwitchEngaged ? "engaged" : "disengaged"}
          </h3>
          <p className={styles.placeholderSummary}>{formatKillSwitchSources(status)}</p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Current run state</p>
          <h3 className={styles.placeholderTitle}>
            {currentRun?.state ?? "no persisted run selected"}
          </h3>
          <p className={styles.placeholderSummary}>
            {currentRun
              ? `revision ${currentRun.revision}`
              : "Create a run to persist an approval scope."}
          </p>
        </article>
      </div>

      {loadState === "loading" ? (
        <div className={styles.privateAlphaNotice}>
          Loading private-alpha local execution status...
        </div>
      ) : null}

      {errorMessage ? (
        <div className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeError}`}>
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div
          className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeSuccess}`}
        >
          {successMessage}
        </div>
      ) : null}

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Create run</p>
              <h3 className={styles.placeholderTitle}>Persist an approval request</h3>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
              local only
            </span>
          </div>

          <div className={styles.privateAlphaForm}>
            <label className={styles.privateAlphaField}>
              <span className={styles.athenaInputLabel}>Request</span>
              <textarea
                className={styles.privateAlphaTextarea}
                value={requestText}
                onChange={(event) => setRequestText(event.target.value)}
                rows={7}
                placeholder="Describe the text or code task for manual-approved local execution."
              />
            </label>

            <div className={styles.privateAlphaFieldGrid}>
              <label className={styles.privateAlphaField}>
                <span className={styles.athenaInputLabel}>Capability</span>
                <select
                  className={styles.privateAlphaSelect}
                  value={capability}
                  onChange={(event) =>
                    setCapability(event.target.value === "code" ? "code" : "text")
                  }
                >
                  <option value="text">Text</option>
                  <option value="code">Code</option>
                </select>
              </label>

              <label className={styles.privateAlphaField}>
                <span className={styles.athenaInputLabel}>Model</span>
                <input
                  className={styles.privateAlphaInput}
                  type="text"
                  value={PRIVATE_ALPHA_PRODUCTION_MODEL}
                  readOnly
                />
              </label>

              <label className={styles.privateAlphaField}>
                <span className={styles.athenaInputLabel}>Maximum output tokens</span>
                <input
                  className={styles.privateAlphaInput}
                  type="number"
                  min={1}
                  max={4096}
                  value={maximumOutputTokens}
                  onChange={(event) => setMaximumOutputTokens(event.target.value)}
                />
              </label>
            </div>

            <div className={styles.privateAlphaButtonRow}>
              <button
                className={styles.privateAlphaButton}
                type="button"
                onClick={() => void handleCreateRun()}
                disabled={actionInFlight !== null}
              >
                {actionInFlight === "create"
                  ? "Persisting approval request..."
                  : "Create approval request"}
              </button>
              <button
                className={styles.privateAlphaButtonSecondary}
                type="button"
                onClick={() => void refreshPanel(currentRun?.runId)}
                disabled={actionInFlight !== null}
              >
                Refresh local state
              </button>
            </div>
          </div>
        </article>

        <article className={styles.summaryCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Approval and execution</p>
              <h3 className={styles.placeholderTitle}>Exact scope, separate actions</h3>
            </div>
            <span
              className={`${styles.panelBadge} ${
                currentRun ? resolveStateClass(currentRun.state) : styles.metricStateSecondary
              }`}
            >
              {currentRun?.state ?? "empty"}
            </span>
          </div>

          {currentRun ? (
            <div className={styles.privateAlphaStack}>
              <p className={styles.placeholderSummary}>
                {currentRun.request.redactedPreview}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{`runId: ${currentRun.runId}`}</span>
                <span className={styles.metaPill}>
                  {`capability: ${currentRun.approvalScope.capability}`}
                </span>
                <span className={styles.metaPill}>
                  {`provider: ${currentRun.approvalScope.providerPreference}`}
                </span>
                <span className={styles.metaPill}>
                  {`model: ${currentRun.approvalScope.modelPreferenceLabel ?? "none"}`}
                </span>
                <span className={styles.metaPill}>
                  {`max tokens: ${currentRun.approvalScope.maximumOutputTokens}`}
                </span>
                <span className={styles.metaPill}>
                  {currentRun.approvalScope.executionMode}
                </span>
              </div>
              <div className={styles.privateAlphaCodeBlock}>
                {`approvalScopeHash: ${currentRun.approvalScopeHash}\nnormalizedRequestHash: ${currentRun.approvalScope.normalizedRequestHash}`}
              </div>

              <label className={styles.privateAlphaToggle}>
                <input
                  type="checkbox"
                  checked={approvalAcknowledged}
                  onChange={(event) => setApprovalAcknowledged(event.target.checked)}
                  disabled={!canApprove || actionInFlight !== null}
                />
                <span className={styles.placeholderSummary}>
                  Manual approval records this exact local Ollama execution scope.
                  Execution still requires a separate explicit operator action.
                </span>
              </label>

              <label className={styles.privateAlphaToggle}>
                <input
                  type="checkbox"
                  checked={executionAcknowledged}
                  onChange={(event) => setExecutionAcknowledged(event.target.checked)}
                  disabled={
                    currentRun.state !== "approved" ||
                    actionInFlight !== null ||
                    !localExecutableRun
                  }
                />
                <span className={styles.placeholderSummary}>
                  I acknowledge that the approved prompt is sent only to local
                  Ollama, no cloud provider is contacted, and this run allows
                  one execution attempt.
                </span>
              </label>

              {!localExecutableRun ? (
                <div className={styles.privateAlphaNotice}>
                  Legacy Slice A runs remain readable but cannot execute.
                </div>
              ) : null}

              <label className={styles.privateAlphaField}>
                <span className={styles.athenaInputLabel}>Cancellation reason</span>
                <input
                  className={styles.privateAlphaInput}
                  type="text"
                  value={cancellationReason}
                  onChange={(event) => setCancellationReason(event.target.value)}
                  placeholder="Why should this run be canceled?"
                />
              </label>

              <div className={styles.privateAlphaButtonRow}>
                <button
                  className={styles.privateAlphaButton}
                  type="button"
                  onClick={() => void handleApprove()}
                  disabled={!canApprove || actionInFlight !== null || !approvalAcknowledged}
                >
                  {actionInFlight === "approve"
                    ? "Recording manual approval..."
                    : "Record manual approval"}
                </button>
                <button
                  className={styles.privateAlphaButton}
                  type="button"
                  onClick={() => void handleExecute()}
                  disabled={!canExecute}
                >
                  {actionInFlight === "execute"
                    ? "Executing once on local Ollama..."
                    : "Execute once on local Ollama"}
                </button>
                <button
                  className={styles.privateAlphaButtonDanger}
                  type="button"
                  onClick={() => void handleCancel()}
                  disabled={!canCancel || actionInFlight !== null}
                >
                  {actionInFlight === "cancel" ? "Canceling run..." : "Cancel run"}
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.placeholderSummary}>
              No persisted run is selected yet. Create an approval request or
              load one from the recent-run list.
            </p>
          )}
        </article>
      </div>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Execution record</p>
              <h3 className={styles.placeholderTitle}>Persisted output and safe failure details</h3>
            </div>
            <span
              className={`${styles.panelBadge} ${
                currentExecution
                  ? resolveStateClass(currentExecution.status)
                  : styles.metricStateSecondary
              }`}
            >
              {currentExecution?.status ?? "no execution"}
            </span>
          </div>

          {currentRun ? (
            <div className={styles.privateAlphaStack}>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`provider: ${PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL}`}
                </span>
                <span className={styles.metaPill}>
                  {`model: ${PRIVATE_ALPHA_PRODUCTION_MODEL}`}
                </span>
                {currentExecution?.promptEvalCount !== null &&
                currentExecution?.promptEvalCount !== undefined ? (
                  <span className={styles.metaPill}>
                    {`prompt tokens: ${currentExecution.promptEvalCount}`}
                  </span>
                ) : null}
                {currentExecution?.evalCount !== null &&
                currentExecution?.evalCount !== undefined ? (
                  <span className={styles.metaPill}>
                    {`output tokens: ${currentExecution.evalCount}`}
                  </span>
                ) : null}
                {executionDuration ? (
                  <span className={styles.metaPill}>{`duration: ${executionDuration}`}</span>
                ) : null}
              </div>

              {currentRun.state === "executing" ? (
                <p className={styles.placeholderSummary}>
                  Execution was persisted as running before the local provider call.
                </p>
              ) : null}

              {currentRun.state === "succeeded" &&
              currentExecution &&
              currentExecution.outputText !== null ? (
                <div className={styles.privateAlphaCodeBlock}>
                  {currentExecution.outputText}
                </div>
              ) : null}

              {(currentRun.state === "failed" || currentRun.state === "blocked") &&
              currentExecution?.safeErrorMessage ? (
                <div className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeError}`}>
                  {currentExecution.safeErrorMessage}
                </div>
              ) : null}

              {currentExecution?.outputSha256 ? (
                <div className={styles.privateAlphaCodeBlock}>
                  {`outputSha256: ${currentExecution.outputSha256}`}
                </div>
              ) : null}
            </div>
          ) : (
            <p className={styles.placeholderSummary}>
              Select a persisted run to inspect execution output, metrics, or safe failure details.
            </p>
          )}
        </article>

        <article className={styles.summaryCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Recent persisted runs</p>
              <h3 className={styles.placeholderTitle}>Newest-first summary list</h3>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
              bounded
            </span>
          </div>

          {runs.length > 0 ? (
            <div className={styles.privateAlphaRunList}>
              {runs.map((run) => (
                <button
                  key={run.runId}
                  className={styles.privateAlphaListButton}
                  type="button"
                  onClick={() => void refreshPanel(run.runId)}
                  disabled={actionInFlight !== null}
                >
                  <div className={styles.placeholderHeader}>
                    <div>
                      <p className={styles.panelEyebrow}>{run.capability}</p>
                      <h4 className={styles.placeholderTitle}>{run.runId}</h4>
                    </div>
                    <span
                      className={`${styles.panelBadge} ${resolveStateClass(run.state)}`}
                    >
                      {run.state}
                    </span>
                  </div>
                  <p className={styles.placeholderSummary}>{run.redactedPreview}</p>
                  <p className={styles.railFooter}>
                    {`revision ${run.revision} | ${run.createdAt}`}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.placeholderSummary}>
              No persisted private-alpha runs yet.
            </p>
          )}
        </article>
      </div>

      <article className={styles.summaryCard}>
        <div className={styles.placeholderHeader}>
          <div>
            <p className={styles.panelEyebrow}>Persisted audit timeline</p>
            <h3 className={styles.placeholderTitle}>Append-only local audit events</h3>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
            real timestamps
          </span>
        </div>

        {currentRun ? (
          <div className={styles.privateAlphaTimeline}>
            {currentRun.auditEvents.map((event) => (
              <article key={event.eventId} className={styles.railCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>{event.eventType}</p>
                    <h4 className={styles.railTitle}>{event.summary}</h4>
                  </div>
                  <span
                    className={`${styles.panelBadge} ${resolveStateClass(
                      event.resultingState
                    )}`}
                  >
                    {event.resultingState}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {`actor ${event.actor} | revision ${event.revision}`}
                </p>
                <p className={styles.railFooter}>
                  {`${event.occurredAt} | ${event.previousState ?? "none"} -> ${event.resultingState}`}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.placeholderSummary}>
            The audit timeline appears once a persisted run is selected.
          </p>
        )}
      </article>
    </section>
  );
}
