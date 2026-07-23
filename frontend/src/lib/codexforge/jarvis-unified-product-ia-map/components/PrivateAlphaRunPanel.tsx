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
  PRIVATE_ALPHA_SECRET_GUIDANCE,
} from "@/lib/codexforge/private-alpha";
import {
  approvePrivateAlphaRun,
  cancelPrivateAlphaRun,
  createPrivateAlphaRun,
  fetchPrivateAlphaRun,
  fetchPrivateAlphaStatus,
  listPrivateAlphaRuns,
} from "@/lib/codexforge/private-alpha/private-alpha-api-client";
import styles from "./JarvisUnifiedProductShell.module.css";

type PrivateAlphaLoadState = "loading" | "ready" | "error";

function resolveStateClass(state: string): string {
  switch (state) {
    case "approved":
      return styles.metricStateReady;
    case "awaiting_approval":
      return styles.metricStateApproval;
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

export function PrivateAlphaRunPanel() {
  const [status, setStatus] = useState<PrivateAlphaStatus | null>(null);
  const [runs, setRuns] = useState<readonly PrivateAlphaRunSummary[]>([]);
  const [currentRun, setCurrentRun] = useState<PrivateAlphaRunRecord | null>(null);
  const [loadState, setLoadState] = useState<PrivateAlphaLoadState>("loading");
  const [requestText, setRequestText] = useState("");
  const [capability, setCapability] = useState<PrivateAlphaCapability>("text");
  const [modelPreferenceLabel, setModelPreferenceLabel] = useState("");
  const [maximumOutputTokens, setMaximumOutputTokens] = useState("512");
  const [approvalAcknowledged, setApprovalAcknowledged] = useState(false);
  const [cancellationReason, setCancellationReason] = useState(
    "Operator canceled this private-alpha run."
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
          : "Unable to load private-alpha status."
      );
    }
  }

  useEffect(() => {
    void refreshPanel();
  }, []);

  useEffect(() => {
    setApprovalAcknowledged(false);
  }, [currentRun?.runId]);

  async function handleCreateRun(): Promise<void> {
    setActionInFlight("create");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await createPrivateAlphaRun({
        requestText,
        capability,
        modelPreferenceLabel: modelPreferenceLabel.trim() || null,
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

  const canApprove = currentRun?.state === "awaiting_approval";
  const canCancel =
    currentRun?.state === "awaiting_approval" || currentRun?.state === "approved";

  return (
    <section className={styles.panel} aria-label="Private alpha run foundation">
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>Private Alpha</p>
          <h2 className={styles.panelTitle}>Persisted run and manual approval</h2>
        </div>
        <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
          Provider execution remains locked
        </span>
      </div>

      <p className={styles.panelBody}>
        Approval records this exact scope locally. No provider call is made in
        this slice. No prompt is transmitted externally.
      </p>

      <div className={styles.workspaceMeta}>
        <span className={styles.metaPill}>{PRIVATE_ALPHA_SECRET_GUIDANCE}</span>
        <span className={styles.metaPill}>
          {`Local persistence: ${status?.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL}`}
        </span>
        <span className={styles.metaPill}>Next slice: one server-only provider call</span>
      </div>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Provider execution</p>
          <h3 className={styles.placeholderTitle}>
            {status?.providerExecution ?? "unavailable"}
          </h3>
          <p className={styles.placeholderSummary}>
            {status?.executionAllowed === false
              ? "executionAllowed false"
              : "Execution state unavailable."}
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
              : "Create a run to persist local approval scope."}
          </p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Recent runs</p>
          <h3 className={styles.placeholderTitle}>{runs.length}</h3>
          <p className={styles.placeholderSummary}>
            Newest-first persisted local summaries.
          </p>
        </article>
      </div>

      {loadState === "loading" ? (
        <div className={styles.privateAlphaNotice}>
          Loading private-alpha foundation status...
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
              <p className={styles.panelEyebrow}>Create approval request</p>
              <h3 className={styles.placeholderTitle}>Persist a private-alpha run</h3>
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
                placeholder="Describe the text or code task for local private-alpha review."
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
                <span className={styles.athenaInputLabel}>Model preference label</span>
                <input
                  className={styles.privateAlphaInput}
                  type="text"
                  value={modelPreferenceLabel}
                  onChange={(event) => setModelPreferenceLabel(event.target.value)}
                  placeholder="Optional label"
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
              <p className={styles.panelEyebrow}>Approval scope</p>
              <h3 className={styles.placeholderTitle}>Exact scope and local approval</h3>
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
                  {currentRun.approvalScope.retentionMode}
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
                  I acknowledge this exact scope and understand provider
                  execution remains unavailable until the provider execution slice.
                </span>
              </label>
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
      </div>
    </section>
  );
}
