"use client";

import { useEffect, useId, useState } from "react";
import type {
  PrivateAlphaCapability,
  PrivateAlphaRunRecord,
  PrivateAlphaRunSummary,
  PrivateAlphaStatus,
} from "@/lib/codexforge/private-alpha";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_MAX_OUTPUT_TOKENS,
  PRIVATE_ALPHA_MIN_OUTPUT_TOKENS,
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
type PrivateAlphaPanelView = "current-run" | "recent-runs" | "audit";
type PrivateAlphaProgressStepState =
  | "pending"
  | "current"
  | "complete"
  | "success"
  | "failure"
  | "blocked";
type PrivateAlphaProgressTone = "secondary" | "blocked";

type PrivateAlphaProgressStep = Readonly<{
  id: "created" | "approved" | "executing" | "result";
  label: "Created" | "Approved" | "Executing" | "Result";
  state: PrivateAlphaProgressStepState;
}>;

type PrivateAlphaProgressSnapshot = Readonly<{
  steps: readonly PrivateAlphaProgressStep[];
  terminalLabel: string | null;
  terminalTone: PrivateAlphaProgressTone | null;
}>;

type PrivateAlphaTabRecord = Readonly<{
  id: PrivateAlphaPanelView;
  label: string;
}>;

const PRIVATE_ALPHA_PANEL_TABS = [
  { id: "current-run", label: "Current run" },
  { id: "recent-runs", label: "Recent runs" },
  { id: "audit", label: "Audit" },
] as const satisfies readonly PrivateAlphaTabRecord[];

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

function resolveProgressStateClass(state: PrivateAlphaProgressStepState): string {
  switch (state) {
    case "current":
      return styles.metricStateApproval;
    case "complete":
    case "success":
      return styles.metricStateReady;
    case "failure":
    case "blocked":
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

  if (durationNanoseconds >= 60_000_000_000) {
    const totalSeconds = Math.round(durationNanoseconds / 1_000_000_000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  }

  if (durationNanoseconds >= 1_000_000_000) {
    return `${(durationNanoseconds / 1_000_000_000).toFixed(2)}s`;
  }

  if (durationNanoseconds >= 1_000_000) {
    return `${(durationNanoseconds / 1_000_000).toFixed(0)}ms`;
  }

  return `${durationNanoseconds}ns`;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  if (Number.isNaN(date.valueOf())) {
    return timestamp;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
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

function buildProgressSnapshot(
  run: PrivateAlphaRunRecord | null
): PrivateAlphaProgressSnapshot {
  let createdState: PrivateAlphaProgressStepState = "pending";
  let approvedState: PrivateAlphaProgressStepState = "pending";
  let executingState: PrivateAlphaProgressStepState = "pending";
  let resultState: PrivateAlphaProgressStepState = "pending";
  let terminalLabel: string | null = null;
  let terminalTone: PrivateAlphaProgressTone | null = null;

  if (run) {
    switch (run.state) {
      case "awaiting_approval":
        createdState = "current";
        break;
      case "approved":
        createdState = "complete";
        approvedState = "complete";
        break;
      case "executing":
        createdState = "complete";
        approvedState = "complete";
        executingState = "current";
        break;
      case "succeeded":
        createdState = "complete";
        approvedState = "complete";
        executingState = "complete";
        resultState = "success";
        terminalLabel = "Succeeded";
        terminalTone = "secondary";
        break;
      case "failed":
        createdState = "complete";
        approvedState = "complete";
        executingState = "complete";
        resultState = "failure";
        terminalLabel = "Failed";
        terminalTone = "blocked";
        break;
      case "blocked":
        createdState = "complete";
        approvedState = "complete";
        executingState = "complete";
        resultState = "blocked";
        terminalLabel = "Blocked";
        terminalTone = "blocked";
        break;
      case "canceled":
        createdState = "complete";
        approvedState = run.approval ? "complete" : "pending";
        terminalLabel = "Canceled";
        terminalTone = "blocked";
        break;
      default:
        break;
    }
  }

  return {
    steps: [
      { id: "created", label: "Created", state: createdState },
      { id: "approved", label: "Approved", state: approvedState },
      { id: "executing", label: "Executing", state: executingState },
      { id: "result", label: "Result", state: resultState },
    ],
    terminalLabel,
    terminalTone,
  };
}

function buildCurrentRunStateMessage(
  run: PrivateAlphaRunRecord | null,
  localExecutableRun: boolean
): string {
  if (!run) {
    return "No persisted run is selected yet. Create an approval request to begin the workflow.";
  }

  if (!localExecutableRun) {
    return "Legacy Slice A runs remain readable but cannot execute.";
  }

  switch (run.state) {
    case "awaiting_approval":
      return "The request is persisted and ready for manual approval.";
    case "approved":
      return "Manual approval is recorded. Execution still requires an explicit local action.";
    case "executing":
      return "Execution is in progress and the latest persisted state is loaded.";
    case "succeeded":
      return "Execution completed and the result is available below.";
    case "failed":
      return "Execution failed and a safe persisted error record is available below.";
    case "blocked":
      return "Execution was blocked and the safe blocked record is available below.";
    case "canceled":
      return "This run was canceled before execution.";
    default:
      return "The latest private-alpha state is loaded.";
  }
}

function buildNextActionSummary(
  run: PrivateAlphaRunRecord | null,
  status: PrivateAlphaStatus | null,
  localExecutableRun: boolean
): string {
  if (!run) {
    return "Create an approval request to persist the task and open the manual review path.";
  }

  switch (run.state) {
    case "awaiting_approval":
      return "Record manual approval when the request and scope are correct.";
    case "approved":
      if (!localExecutableRun) {
        return "This persisted run is readable, but only production local-Ollama runs can execute.";
      }

      if (status?.executionAllowed === false) {
        return "Execution is still blocked until local availability and kill-switch checks allow it.";
      }

      return "Acknowledge the local execution scope, then execute once on local Ollama.";
    case "executing":
      return "Execution is in progress. Refresh local state to load the terminal result.";
    case "succeeded":
      return "Review the persisted result, metrics, and audit trail.";
    case "failed":
      return "Review the safe failure details and audit trail before creating another run.";
    case "blocked":
      return "Review the blocked status and safe message before creating another run.";
    case "canceled":
      return "This run is closed. Create a new approval request for another task.";
    default:
      return "Create an approval request to begin the workflow.";
  }
}

function buildCurrentRunResultSummary(run: PrivateAlphaRunRecord | null): string {
  if (!run) {
    return "No persisted result is loaded yet.";
  }

  if (run.state === "succeeded") {
    const outputText = run.execution?.outputText ?? null;

    if (outputText !== null && outputText.trim().length > 0) {
      return "Response text is available above in the result panel.";
    }

    return "The model completed successfully, but no visible response text was returned.";
  }

  if ((run.state === "failed" || run.state === "blocked") && run.execution?.safeErrorMessage) {
    return run.execution.safeErrorMessage;
  }

  if (run.state === "canceled") {
    return "The run was canceled before execution.";
  }

  if (run.state === "executing") {
    return "Execution is still in progress.";
  }

  return "A terminal result will appear here after execution completes.";
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
  const [activeView, setActiveView] = useState<PrivateAlphaPanelView>("current-run");
  const [showCancellationForm, setShowCancellationForm] = useState(false);

  const requestFieldId = useId();
  const capabilityFieldId = useId();
  const maximumOutputTokensFieldId = useId();
  const cancellationReasonFieldId = useId();
  const tabBaseId = useId();

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
    setShowCancellationForm(false);
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
      setActiveView("current-run");
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
      setActiveView("current-run");
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
      setActiveView("current-run");
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
      setActiveView("current-run");
      setSuccessMessage("Run canceled locally.");
      setShowCancellationForm(false);
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
  const progress = buildProgressSnapshot(currentRun);
  const executionDuration = formatNanosecondDuration(
    currentExecution?.totalDurationNanoseconds ?? null
  );
  const currentOutputText = currentExecution?.outputText ?? null;
  const recentRuns = runs.slice(0, 10);
  const currentRunMessage = buildCurrentRunStateMessage(currentRun, localExecutableRun);
  const nextActionSummary = buildNextActionSummary(
    currentRun,
    status,
    localExecutableRun
  );
  const currentRunResultSummary = buildCurrentRunResultSummary(currentRun);
  const selectedTab = PRIVATE_ALPHA_PANEL_TABS.find((tab) => tab.id === activeView);

  return (
    <section
      className={`${styles.panel} ${styles.privateAlphaPanel}`}
      aria-label="Private alpha local execution"
      data-codexforge-private-alpha-layout="focused"
    >
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>Private Alpha</p>
          <h2 className={styles.panelTitle}>Manual-approved local execution</h2>
        </div>
        <span
          className={`${styles.panelBadge} ${
            status === null
              ? styles.metricStateSecondary
              : status.executionAllowed
                ? styles.metricStateReady
                : styles.metricStateBlocked
          }`}
        >
          {status === null
            ? "Checking local state"
            : status.executionAllowed
              ? "Execution allowed"
              : "Execution blocked"}
        </span>
      </div>

      <p className={styles.panelBody}>
        Persist a request, record manual approval, execute once on local Ollama,
        and review the persisted result and audit trail. No cloud provider is
        contacted.
      </p>

      <div className={styles.privateAlphaStatusStrip}>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Provider</span>
          <span className={styles.privateAlphaStatusValue}>
            {PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Model</span>
          <span className={styles.privateAlphaStatusValue}>
            {PRIVATE_ALPHA_PRODUCTION_MODEL}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Provider status</span>
          <span className={styles.privateAlphaStatusValue}>
            {status === null
              ? "Checking"
              : status.providerAvailable
                ? "Available"
                : "Unavailable"}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Model status</span>
          <span className={styles.privateAlphaStatusValue}>
            {status === null
              ? "Checking"
              : status.modelAvailable
                ? "Installed"
                : "Missing"}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Kill switch</span>
          <span className={styles.privateAlphaStatusValue}>
            {status === null
              ? "Checking"
              : status.killSwitchEngaged
                ? "Engaged"
                : "Disengaged"}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Execution</span>
          <span className={styles.privateAlphaStatusValue}>
            {status === null
              ? "Checking"
              : status.executionAllowed
                ? "Allowed"
                : "Blocked"}
          </span>
        </div>
      </div>

      <p className={styles.privateAlphaSupportText}>
        {PRIVATE_ALPHA_SECRET_GUIDANCE} One execution attempt per run. Output is
        persisted locally at{" "}
        {status?.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL}.{" "}
        {formatKillSwitchSources(status)}
      </p>

      {loadState === "loading" ? (
        <div className={styles.privateAlphaNotice} aria-live="polite" role="status">
          Loading private-alpha local execution status...
        </div>
      ) : null}

      {errorMessage ? (
        <div
          className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeError}`}
          aria-live="assertive"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div
          className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeSuccess}`}
          aria-live="polite"
          role="status"
        >
          {successMessage}
        </div>
      ) : null}

      <div className={styles.privateAlphaWorkspace}>
        <div className={styles.privateAlphaMainColumn}>
          <section
            className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
            data-codexforge-private-alpha-composer="true"
          >
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Request</p>
                <h3 className={styles.privateAlphaSectionTitle}>
                  Persist an approval request
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                local only
              </span>
            </div>

            <p className={styles.privateAlphaSectionBody}>
              Use one real request textarea to define the task, then persist the
              exact approval scope for manual review.
            </p>

            <div className={styles.privateAlphaForm}>
              <label className={styles.privateAlphaField} htmlFor={requestFieldId}>
                <span className={styles.athenaInputLabel}>Request</span>
                <textarea
                  id={requestFieldId}
                  className={styles.privateAlphaTextarea}
                  value={requestText}
                  onChange={(event) => setRequestText(event.target.value)}
                  rows={7}
                  placeholder="Describe the text or code task for manual-approved local execution."
                />
              </label>

              <div className={styles.privateAlphaFieldRow}>
                <label className={styles.privateAlphaField} htmlFor={capabilityFieldId}>
                  <span className={styles.athenaInputLabel}>Capability</span>
                  <select
                    id={capabilityFieldId}
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

                <div className={styles.privateAlphaField}>
                  <span className={styles.athenaInputLabel}>Model</span>
                  <div className={styles.privateAlphaFixedModel}>
                    <span className={styles.metaPill}>Fixed model</span>
                    <strong>{PRIVATE_ALPHA_PRODUCTION_MODEL}</strong>
                  </div>
                </div>
              </div>

              <details className={styles.privateAlphaDetailsBlock}>
                <summary className={styles.privateAlphaDetailsSummary}>
                  Advanced settings
                </summary>
                <div className={styles.privateAlphaDetailsBody}>
                  <label
                    className={styles.privateAlphaField}
                    htmlFor={maximumOutputTokensFieldId}
                  >
                    <span className={styles.athenaInputLabel}>Maximum output tokens</span>
                    <input
                      id={maximumOutputTokensFieldId}
                      className={styles.privateAlphaInput}
                      type="number"
                      min={PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}
                      max={PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}
                      value={maximumOutputTokens}
                      onChange={(event) => setMaximumOutputTokens(event.target.value)}
                    />
                  </label>
                  <p className={styles.privateAlphaSecondaryText}>
                    Valid range {PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}-
                    {PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}. Current default is 512.
                  </p>
                </div>
              </details>

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
          </section>

          <section
            className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
            data-codexforge-private-alpha-result="true"
          >
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Result</p>
                <h3 className={styles.privateAlphaSectionTitle}>
                  Persisted output and safe result details
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${
                  currentRun ? resolveStateClass(currentRun.state) : styles.metricStateSecondary
                }`}
              >
                {currentRun?.state ?? "No run selected"}
              </span>
            </div>

            {!currentRun ? (
              <p className={styles.privateAlphaSectionBody}>
                Select or create a run to review the latest persisted result.
              </p>
            ) : null}

            {currentRun ? (
              <div className={styles.privateAlphaStack}>
                {currentExecution?.promptEvalCount !== null &&
                currentExecution?.promptEvalCount !== undefined ? (
                  <div className={styles.privateAlphaResultMeta}>
                    <span className={styles.metaPill}>
                      {`Prompt tokens ${currentExecution.promptEvalCount}`}
                    </span>
                    {currentExecution.evalCount !== null &&
                    currentExecution.evalCount !== undefined ? (
                      <span className={styles.metaPill}>
                        {`Output tokens ${currentExecution.evalCount}`}
                      </span>
                    ) : null}
                    {executionDuration ? (
                      <span className={styles.metaPill}>{`Duration ${executionDuration}`}</span>
                    ) : null}
                  </div>
                ) : currentExecution?.evalCount !== null &&
                  currentExecution?.evalCount !== undefined ? (
                  <div className={styles.privateAlphaResultMeta}>
                    <span className={styles.metaPill}>
                      {`Output tokens ${currentExecution.evalCount}`}
                    </span>
                    {executionDuration ? (
                      <span className={styles.metaPill}>{`Duration ${executionDuration}`}</span>
                    ) : null}
                  </div>
                ) : executionDuration ? (
                  <div className={styles.privateAlphaResultMeta}>
                    <span className={styles.metaPill}>{`Duration ${executionDuration}`}</span>
                  </div>
                ) : null}

                {currentRun.state === "executing" ? (
                  <div className={styles.privateAlphaNotice}>
                    Execution was persisted as running before the local provider call.
                  </div>
                ) : null}

                {currentRun.state === "succeeded" &&
                currentOutputText !== null &&
                currentOutputText.trim().length > 0 ? (
                  <div className={styles.privateAlphaResultPanel}>{currentOutputText}</div>
                ) : null}

                {currentRun.state === "succeeded" &&
                currentOutputText !== null &&
                currentOutputText.trim().length === 0 ? (
                  <div
                    className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeWarning}`}
                  >
                    The model completed but returned no visible response text.
                  </div>
                ) : null}

                {(currentRun.state === "failed" || currentRun.state === "blocked") &&
                currentExecution?.safeErrorMessage ? (
                  <div
                    className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeError}`}
                  >
                    {currentExecution.safeErrorMessage}
                  </div>
                ) : null}

                {(currentRun.state === "failed" || currentRun.state === "blocked") &&
                currentExecution?.errorCode ? (
                  <p className={styles.privateAlphaSecondaryText}>
                    {`Error code: ${currentExecution.errorCode}`}
                  </p>
                ) : null}

                {currentRun.state === "canceled" && currentRun.cancellation ? (
                  <div className={styles.privateAlphaNotice}>
                    {`Canceled: ${currentRun.cancellation.reason}`}
                  </div>
                ) : null}

                {currentRun.state === "awaiting_approval" || currentRun.state === "approved" ? (
                  <p className={styles.privateAlphaSectionBody}>
                    Result content will appear here after explicit local execution.
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>

        <div className={styles.privateAlphaSideColumn}>
          <section className={`${styles.summaryCard} ${styles.privateAlphaSection}`}>
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Current run</p>
                <h3 className={styles.privateAlphaSectionTitle}>
                  Persisted workflow state
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${
                  currentRun ? resolveStateClass(currentRun.state) : styles.metricStateSecondary
                }`}
              >
                {currentRun?.state ?? "No run selected"}
              </span>
            </div>

            <p className={styles.privateAlphaSectionBody}>{currentRunMessage}</p>

            {currentRun ? (
              <div className={styles.privateAlphaStack}>
                <p className={styles.privateAlphaPreview}>
                  {currentRun.request.redactedPreview}
                </p>
                <div className={styles.workspaceMeta}>
                  <span className={styles.metaPill}>
                    {`Capability ${currentRun.request.capability}`}
                  </span>
                  <span className={styles.metaPill}>
                    {`Revision ${currentRun.revision}`}
                  </span>
                  <span className={styles.metaPill}>
                    {`Updated ${formatTimestamp(currentRun.updatedAt)}`}
                  </span>
                </div>
                {!localExecutableRun ? (
                  <div className={styles.privateAlphaNotice}>
                    Legacy Slice A runs remain readable but cannot execute.
                  </div>
                ) : null}
              </div>
            ) : null}

            <div
              className={styles.privateAlphaProgressBlock}
              data-codexforge-private-alpha-progress="true"
            >
              <div className={styles.privateAlphaProgressList}>
                {progress.steps.map((step) => (
                  <div key={step.id} className={styles.privateAlphaProgressItem}>
                    <span className={styles.privateAlphaStatusLabel}>{step.label}</span>
                    <span
                      className={`${styles.panelBadge} ${resolveProgressStateClass(
                        step.state
                      )}`}
                    >
                      {step.state === "complete"
                        ? "Complete"
                        : step.state === "current"
                          ? "Current"
                          : step.state === "success"
                            ? "Success"
                            : step.state === "failure"
                              ? "Failed"
                              : step.state === "blocked"
                                ? "Blocked"
                                : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
              {progress.terminalLabel && progress.terminalTone ? (
                <span
                  className={`${styles.panelBadge} ${
                    progress.terminalTone === "blocked"
                      ? styles.metricStateBlocked
                      : styles.metricStateSecondary
                  }`}
                >
                  {progress.terminalLabel}
                </span>
              ) : null}
            </div>
          </section>

          <section
            className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
            data-codexforge-private-alpha-next-action="true"
          >
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next required action</p>
                <h3 className={styles.privateAlphaSectionTitle}>One valid operator step</h3>
              </div>
            </div>

            {!currentRun ? (
              <p className={styles.privateAlphaSectionBody}>
                Create an approval request to persist the task and start the
                workflow.
              </p>
            ) : null}

            {currentRun ? (
              <div className={styles.privateAlphaStack}>
                <p className={styles.privateAlphaSectionBody}>{nextActionSummary}</p>

                {currentRun.state === "awaiting_approval" ? (
                  <div className={styles.privateAlphaStack}>
                    <label className={styles.privateAlphaToggle}>
                      <input
                        type="checkbox"
                        checked={approvalAcknowledged}
                        onChange={(event) =>
                          setApprovalAcknowledged(event.target.checked)
                        }
                        disabled={!canApprove || actionInFlight !== null}
                      />
                      <span className={styles.placeholderSummary}>
                        Manual approval records this exact local execution scope.
                        Execution still requires a separate explicit action.
                      </span>
                    </label>
                    <div className={styles.privateAlphaButtonRow}>
                      <button
                        className={styles.privateAlphaButton}
                        type="button"
                        onClick={() => void handleApprove()}
                        disabled={
                          !canApprove || actionInFlight !== null || !approvalAcknowledged
                        }
                      >
                        {actionInFlight === "approve"
                          ? "Recording manual approval..."
                          : "Record manual approval"}
                      </button>
                      {!showCancellationForm ? (
                        <button
                          className={styles.privateAlphaButtonDanger}
                          type="button"
                          onClick={() => setShowCancellationForm(true)}
                          disabled={!canCancel || actionInFlight !== null}
                        >
                          Cancel run
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {currentRun.state === "approved" ? (
                  <div className={styles.privateAlphaStack}>
                    <label className={styles.privateAlphaToggle}>
                      <input
                        type="checkbox"
                        checked={executionAcknowledged}
                        onChange={(event) =>
                          setExecutionAcknowledged(event.target.checked)
                        }
                        disabled={
                          currentRun.state !== "approved" ||
                          actionInFlight !== null ||
                          !localExecutableRun
                        }
                      />
                      <span className={styles.placeholderSummary}>
                        I acknowledge that the approved prompt is sent only to
                        local Ollama, no cloud provider is contacted, and this
                        run allows one execution attempt.
                      </span>
                    </label>
                    <div className={styles.privateAlphaButtonRow}>
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
                      {!showCancellationForm ? (
                        <button
                          className={styles.privateAlphaButtonDanger}
                          type="button"
                          onClick={() => setShowCancellationForm(true)}
                          disabled={!canCancel || actionInFlight !== null}
                        >
                          Cancel run
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {currentRun.state === "executing" ? (
                  <div className={styles.privateAlphaStack}>
                    <div className={styles.privateAlphaNotice}>
                      Execution is in progress. Refresh local state to load the
                      terminal result.
                    </div>
                    <div className={styles.privateAlphaButtonRow}>
                      <button
                        className={styles.privateAlphaButtonSecondary}
                        type="button"
                        onClick={() => void refreshPanel(currentRun.runId)}
                        disabled={actionInFlight !== null}
                      >
                        Refresh local state
                      </button>
                    </div>
                  </div>
                ) : null}

                {(currentRun.state === "succeeded" ||
                  currentRun.state === "failed" ||
                  currentRun.state === "blocked" ||
                  currentRun.state === "canceled") ? (
                  <div className={styles.privateAlphaNotice}>
                    {currentRun.state === "succeeded"
                      ? "Execution completed successfully."
                      : currentRun.state === "failed"
                        ? "Execution finished with a safe persisted failure record."
                        : currentRun.state === "blocked"
                          ? "Execution remained blocked and a safe status was persisted."
                          : "This run is closed after cancellation."}
                  </div>
                ) : null}

                {showCancellationForm && canCancel ? (
                  <div className={styles.privateAlphaCancelBlock}>
                    <label
                      className={styles.privateAlphaField}
                      htmlFor={cancellationReasonFieldId}
                    >
                      <span className={styles.athenaInputLabel}>Cancellation reason</span>
                      <input
                        id={cancellationReasonFieldId}
                        className={styles.privateAlphaInput}
                        type="text"
                        value={cancellationReason}
                        onChange={(event) => setCancellationReason(event.target.value)}
                        placeholder="Why should this run be canceled?"
                      />
                    </label>
                    <div className={styles.privateAlphaButtonRow}>
                      <button
                        className={styles.privateAlphaButtonDanger}
                        type="button"
                        onClick={() => void handleCancel()}
                        disabled={!canCancel || actionInFlight !== null}
                      >
                        {actionInFlight === "cancel"
                          ? "Canceling run..."
                          : "Confirm cancellation"}
                      </button>
                      <button
                        className={styles.privateAlphaButtonSecondary}
                        type="button"
                        onClick={() => setShowCancellationForm(false)}
                        disabled={actionInFlight !== null}
                      >
                        Keep run
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>
      </div>

      <section
        className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
        data-codexforge-private-alpha-view-switcher="true"
      >
        <div className={styles.privateAlphaSectionHeader}>
          <div>
            <p className={styles.panelEyebrow}>Run views</p>
            <h3 className={styles.privateAlphaSectionTitle}>
              Current run, recent runs, and audit
            </h3>
          </div>
        </div>

        <div
          className={styles.privateAlphaTabList}
          role="tablist"
          aria-label="Private alpha run views"
        >
          {PRIVATE_ALPHA_PANEL_TABS.map((tab) => {
            const tabId = `${tabBaseId}-${tab.id}-tab`;
            const panelId = `${tabBaseId}-${tab.id}-panel`;
            const isSelected = activeView === tab.id;

            return (
              <button
                key={tab.id}
                id={tabId}
                className={styles.privateAlphaTab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveView(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${tabBaseId}-${activeView}-panel`}
          className={styles.privateAlphaTabPanel}
          role="tabpanel"
          aria-labelledby={`${tabBaseId}-${activeView}-tab`}
        >
          {selectedTab?.id === "current-run" ? (
            currentRun ? (
              <div className={styles.privateAlphaStack}>
                <div className={styles.privateAlphaCurrentRunCard}>
                  <p className={styles.privateAlphaPreview}>
                    {currentRun.request.redactedPreview}
                  </p>
                  <div className={styles.workspaceMeta}>
                    <span className={styles.metaPill}>{`Run ${currentRun.runId}`}</span>
                    <span className={styles.metaPill}>
                      {`State ${currentRun.state}`}
                    </span>
                    <span className={styles.metaPill}>
                      {`Created ${formatTimestamp(currentRun.createdAt)}`}
                    </span>
                  </div>
                </div>
                <div className={styles.privateAlphaMiniBlock}>
                  <p className={styles.panelEyebrow}>Progress</p>
                  <div className={styles.privateAlphaProgressList}>
                    {progress.steps.map((step) => (
                      <div key={`${step.id}-summary`} className={styles.privateAlphaProgressItem}>
                        <span className={styles.privateAlphaStatusLabel}>{step.label}</span>
                        <span
                          className={`${styles.panelBadge} ${resolveProgressStateClass(
                            step.state
                          )}`}
                        >
                          {step.state === "complete"
                            ? "Complete"
                            : step.state === "current"
                              ? "Current"
                              : step.state === "success"
                                ? "Success"
                                : step.state === "failure"
                                  ? "Failed"
                                  : step.state === "blocked"
                                    ? "Blocked"
                                    : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.privateAlphaMiniBlock}>
                  <p className={styles.panelEyebrow}>Next action</p>
                  <p className={styles.privateAlphaSectionBody}>{nextActionSummary}</p>
                </div>
                <div className={styles.privateAlphaMiniBlock}>
                  <p className={styles.panelEyebrow}>Result</p>
                  <p className={styles.privateAlphaSectionBody}>
                    {currentRunResultSummary}
                  </p>
                </div>
              </div>
            ) : (
              <p className={styles.privateAlphaSectionBody}>
                No persisted run is selected yet.
              </p>
            )
          ) : null}

          {selectedTab?.id === "recent-runs" ? (
            recentRuns.length > 0 ? (
              <div className={styles.privateAlphaRecentRuns}>
                {recentRuns.map((run) => {
                  const isSelected = currentRun?.runId === run.runId;

                  return (
                    <button
                      key={run.runId}
                      className={`${styles.privateAlphaRunRow} ${
                        isSelected ? styles.privateAlphaRunRowSelected : ""
                      }`}
                      type="button"
                      onClick={() => void refreshPanel(run.runId)}
                      disabled={actionInFlight !== null}
                      aria-pressed={isSelected}
                    >
                      <div className={styles.privateAlphaRunRowHeader}>
                        <div>
                          <p className={styles.panelEyebrow}>{run.capability}</p>
                          <p className={styles.privateAlphaRunRowTitle}>{run.runId}</p>
                        </div>
                        <span
                          className={`${styles.panelBadge} ${resolveStateClass(run.state)}`}
                        >
                          {run.state}
                        </span>
                      </div>
                      <p className={styles.privateAlphaRunRowPreview}>
                        {run.redactedPreview}
                      </p>
                      <p className={styles.privateAlphaRunRowMeta}>
                        {`Revision ${run.revision} | ${formatTimestamp(run.updatedAt)}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className={styles.privateAlphaSectionBody}>
                No persisted private-alpha runs yet.
              </p>
            )
          ) : null}

          {selectedTab?.id === "audit" ? (
            currentRun ? (
              <div className={styles.privateAlphaAuditList}>
                {[...currentRun.auditEvents]
                  .sort(
                    (left, right) =>
                      left.occurredAt.localeCompare(right.occurredAt) ||
                      left.revision - right.revision
                  )
                  .map((event) => (
                    <article key={event.eventId} className={styles.privateAlphaAuditItem}>
                      <div className={styles.privateAlphaRunRowHeader}>
                        <div>
                          <p className={styles.panelEyebrow}>{event.eventType}</p>
                          <p className={styles.privateAlphaRunRowTitle}>{event.summary}</p>
                        </div>
                        <span
                          className={`${styles.panelBadge} ${resolveStateClass(
                            event.resultingState
                          )}`}
                        >
                          {event.resultingState}
                        </span>
                      </div>
                      <p className={styles.privateAlphaRunRowMeta}>
                        {`${event.previousState ?? "none"} -> ${event.resultingState} | ${formatTimestamp(
                          event.occurredAt
                        )}`}
                      </p>
                      <p className={styles.privateAlphaSecondaryText}>
                        {`Actor ${event.actor} | Revision ${event.revision}`}
                      </p>
                    </article>
                  ))}
              </div>
            ) : (
              <p className={styles.privateAlphaSectionBody}>
                Select a run to inspect the persisted audit timeline.
              </p>
            )
          ) : null}
        </div>
      </section>

      {currentRun ? (
        <details
          className={styles.privateAlphaTechnicalDetails}
          data-codexforge-private-alpha-technical-details="true"
        >
          <summary className={styles.privateAlphaDetailsSummary}>
            Technical details
          </summary>
          <div className={styles.privateAlphaDetailsBody}>
            <div className={styles.privateAlphaTechnicalGrid}>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>runId</p>
                <p className={styles.privateAlphaTechnicalValue}>{currentRun.runId}</p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>revision</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {String(currentRun.revision)}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>provider id</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.providerPreference}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>model id</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.modelPreferenceLabel ?? "none"}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>capability</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.capability}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>execution mode</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.executionMode}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>approvalScopeHash</p>
                <p className={styles.privateAlphaHashValue}>
                  {currentRun.approvalScopeHash}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>normalizedRequestHash</p>
                <p className={styles.privateAlphaHashValue}>
                  {currentRun.approvalScope.normalizedRequestHash}
                </p>
              </div>
              {currentExecution?.executionId ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>execution id</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.executionId}
                  </p>
                </div>
              ) : null}
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>idempotency key hash</p>
                <p className={styles.privateAlphaHashValue}>
                  {currentExecution?.idempotencyKeyHash ?? currentRun.idempotencyKeyHash}
                </p>
              </div>
              {currentExecution?.outputSha256 ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>outputSha256</p>
                  <p className={styles.privateAlphaHashValue}>
                    {currentExecution.outputSha256}
                  </p>
                </div>
              ) : null}
              {currentExecution?.doneReason ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>done reason</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.doneReason}
                  </p>
                </div>
              ) : null}
              {currentExecution?.totalDurationNanoseconds !== null &&
              currentExecution?.totalDurationNanoseconds !== undefined ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    totalDurationNanoseconds
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {String(currentExecution.totalDurationNanoseconds)}
                  </p>
                </div>
              ) : null}
              {currentExecution?.loadDurationNanoseconds !== null &&
              currentExecution?.loadDurationNanoseconds !== undefined ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    loadDurationNanoseconds
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {String(currentExecution.loadDurationNanoseconds)}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </details>
      ) : null}
    </section>
  );
}
