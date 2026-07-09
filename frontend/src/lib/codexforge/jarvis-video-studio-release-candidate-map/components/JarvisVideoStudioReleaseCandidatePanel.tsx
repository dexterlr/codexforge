'use client';

import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisVideoBackendTrialRunnerContractPanel } from "../../jarvis-video-backend-trial-runner-contract-map/components";
import { JarvisVideoControlledExecutionTrialPanel } from "../../jarvis-video-controlled-execution-trial-map/components";
import { JarvisVideoTrialResultReviewRecoveryPanel } from "../../jarvis-video-trial-result-review-recovery-map/components";
import type { JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview } from "../jarvis-video-backend-runner-foundation-dry-run-admission-preview";
import type { JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview } from "../jarvis-video-result-capture-audit-envelope-approval-join-preview";
import type { JarvisVideoServerOnlyRunnerSyntheticDryRunPreview } from "../jarvis-video-server-only-runner-synthetic-dry-run-preview";
import { buildJarvisVideoBackendRunnerContractHardeningStableKey } from "../jarvis-video-backend-runner-contract-hardening";
import {
  buildJarvisVideoStudioReleaseCandidateRouteModel,
  buildJarvisVideoStudioReleaseCandidateStableKey,
  buildJarvisVideoStudioReleaseCandidateWorkspaceModel,
  type JarvisVideoStudioReleaseCandidateId,
  type JarvisVideoStudioReleaseCandidateRouteSlug,
  type JarvisVideoStudioReleaseCandidateSharedRecord,
} from "../jarvis-video-studio-release-candidate-model";
import styles from "./JarvisVideoStudioReleaseCandidatePanel.module.css";

type JarvisVideoStudioReleaseCandidatePanelDataProps = Readonly<{
  resultCaptureAuditApprovalJoinPreview?: JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview;
  backendDryRunAdmissionPreview?: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview;
  serverOnlySyntheticDryRunPreview?: JarvisVideoServerOnlyRunnerSyntheticDryRunPreview;
}>;

type JarvisVideoStudioReleaseCandidatePanelProps =
  JarvisVideoStudioReleaseCandidatePanelDataProps &
    (
      | {
          workspaceId: JarvisVideoStudioReleaseCandidateId;
          routeSlug?: never;
        }
      | {
          routeSlug: JarvisVideoStudioReleaseCandidateRouteSlug;
          workspaceId?: never;
        }
    );

const JARVIS_VIDEO_BRIEF_FIELDS = [
  {
    label: "Style / look",
    placeholder: "Cinematic, documentary, animated, editorial, or product-forward direction",
  },
  {
    label: "Duration",
    placeholder: "30 seconds, 60 seconds, or another target runtime",
  },
  {
    label: "Aspect ratio",
    placeholder: "16:9, 9:16, 1:1, or another delivery frame",
  },
  {
    label: "Audio / voice notes",
    placeholder: "Voiceover tone, narration intent, music posture, and caption notes",
  },
  {
    label: "Asset notes",
    placeholder: "Reference footage, B-roll, stills, logos, or supporting materials",
  },
  {
    label: "Safety notes",
    placeholder: "Policy, consent, rights, privacy, brand, and review constraints",
  },
] as const;

const JARVIS_VIDEO_OUTPUT_PREVIEW_STATUS = [
  "Status: Waiting for backend runner",
  "Result: No video generated yet",
  "Provider: Not called",
  "Artifact: None",
  "Audit: Not persisted",
  "Approval: Required before backend handoff",
] as const;

const JARVIS_VIDEO_SAFE_HANDOFF_FLOW = [
  "Write video brief",
  "Review settings and safety notes",
  "Prepare approval packet",
  "Backend runner required",
  "Provider execution locked",
  "Output appears here after future backend result capture",
] as const;

export function JarvisVideoStudioReleaseCandidatePageClientShell(
  props: JarvisVideoStudioReleaseCandidatePanelProps
) {
  const context = resolveJarvisVideoStudioReleaseCandidateContext(props);
  const workspaceLabel = context.route ? context.route.title : "Jarvis Video Studio";

  return (
    <CodexForgeAppShell
      activePath={context.activePath}
      workspaceLabel={workspaceLabel}
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisVideoStudioReleaseCandidatePanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoStudioReleaseCandidatePanel(
  props: JarvisVideoStudioReleaseCandidatePanelProps
) {
  const context = resolveJarvisVideoStudioReleaseCandidateContext(props);
  const record = context.sharedRecord;

  return (
    <section
      className={styles.routeShell}
      data-codexforge-jarvis-video-studio-release-candidate={context.markerPhrases.join(
        " | "
      )}
      data-codexforge-jarvis-video-studio-release-candidate-focus={context.focus}
    >
      {!context.route ? (
        <>
          <section className={styles.controlConsole} aria-label="Video generation control">
            <div className={styles.consoleHeader}>
              <div className={styles.consoleCopy}>
                <span className={styles.consoleKicker}>Video Studio console</span>
                <h1 className={styles.consoleTitle}>Video generation control</h1>
                <p className={styles.consoleSummary}>
                  Put your video brief here. Jarvis will use this surface to
                  prepare the approval packet and, in a future backend-only batch,
                  hand the request to the backend runner. Generation is locked
                  until backend execution, audit capture, credential isolation,
                  and operator approval are implemented.
                </p>
                <p className={styles.consoleUrl}>Video Studio URL: /jarvis-video</p>
              </div>
            </div>

            <div className={styles.consoleColumns}>
              <section className={styles.consoleColumn} aria-label="Video brief">
                <div className={styles.consoleColumnHeader}>
                  <p className={styles.panelEyebrow}>Input workspace</p>
                  <h2 className={styles.consoleColumnTitle}>Video brief</h2>
                </div>
                <div className={styles.fieldStack}>
                  <label className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Prompt / concept</span>
                    <textarea
                      className={styles.promptField}
                      rows={9}
                      placeholder="Describe the concept, audience, shots, pacing, mood, and approval context for the future backend runner."
                    />
                  </label>
                  {JARVIS_VIDEO_BRIEF_FIELDS.map((field) => (
                    <label key={field.label} className={styles.fieldGroup}>
                      <span className={styles.fieldLabel}>{field.label}</span>
                      <input
                        className={styles.inputField}
                        type="text"
                        placeholder={field.placeholder}
                      />
                    </label>
                  ))}
                </div>
              </section>

              <section className={styles.consoleColumn} aria-label="Output preview">
                <div className={styles.consoleColumnHeader}>
                  <p className={styles.panelEyebrow}>Result surface</p>
                  <h2 className={styles.consoleColumnTitle}>Output preview</h2>
                </div>
                <div className={styles.previewFrame}>
                  <div className={styles.previewFrameInner}>
                    <span className={styles.previewFrameLabel}>
                      Preview will appear here after future backend result capture.
                    </span>
                  </div>
                </div>
                <div className={styles.previewStatusGrid}>
                  {JARVIS_VIDEO_OUTPUT_PREVIEW_STATUS.map((item) => (
                    <div key={item} className={styles.previewStatusRow}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className={styles.lockedActionGrid}>
                  {[
                    "Generate video - locked",
                    "Run backend dry-run - locked",
                    "Approve backend handoff - locked",
                  ].map((label) => (
                    <button
                      key={label}
                      type="button"
                      className={styles.lockedButton}
                      disabled
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <section className={styles.safeFlowCard} aria-label="Safe handoff flow">
              <div className={styles.consoleColumnHeader}>
                <p className={styles.panelEyebrow}>Operator sequence</p>
                <h2 className={styles.consoleColumnTitle}>Safe handoff flow</h2>
              </div>
              <ol className={styles.safeFlowList}>
                {JARVIS_VIDEO_SAFE_HANDOFF_FLOW.map((step) => (
                  <li key={step} className={styles.safeFlowItem}>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </section>

          {props.resultCaptureAuditApprovalJoinPreview ? (
            <section className={styles.panel} aria-label="Result capture and audit join">
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Server-only envelope layer</p>
                  <h2 className={styles.panelTitle}>
                    {props.resultCaptureAuditApprovalJoinPreview.title}
                  </h2>
                </div>
                <span className={styles.statBadge}>
                  {props.resultCaptureAuditApprovalJoinPreview.statusBadge}
                </span>
              </div>
              <p className={styles.panelBody}>
                {props.resultCaptureAuditApprovalJoinPreview.summary}
              </p>
              <div className={styles.statusStrip}>
                {props.resultCaptureAuditApprovalJoinPreview.highlights.map((item) => (
                  <span key={item} className={styles.statusPill}>
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.summaryGrid}>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Defined envelopes</p>
                  <h3 className={styles.summaryTitle}>
                    Server-only capture, audit, and join
                  </h3>
                  <p className={styles.summaryText}>
                    {
                      props.resultCaptureAuditApprovalJoinPreview
                        .resultCaptureEnvelopeSummary
                    }
                  </p>
                  <ul className={styles.summaryList}>
                    {[
                      props.resultCaptureAuditApprovalJoinPreview
                        .auditEnvelopeSummary,
                      props.resultCaptureAuditApprovalJoinPreview
                        .approvalJoinSummary,
                    ].map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Still locked</p>
                  <h3 className={styles.summaryTitle}>
                    Review-only posture remains intact
                  </h3>
                  <p className={styles.summaryText}>
                    Provider execution stays locked, queue/worker/job dispatch
                    stay disabled, and persistence is still intentionally
                    absent.
                  </p>
                  <ul className={styles.summaryList}>
                    {[
                      ...props.resultCaptureAuditApprovalJoinPreview.captureBlockers.slice(
                        0,
                        2
                      ),
                      ...props.resultCaptureAuditApprovalJoinPreview.auditBlockers.slice(
                        0,
                        1
                      ),
                      ...props.resultCaptureAuditApprovalJoinPreview.approvalJoinBlockers.slice(
                        0,
                        1
                      ),
                    ].map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Next batch gate</p>
                  <h3 className={styles.summaryTitle}>
                    Phase{" "}
                    {
                      props.resultCaptureAuditApprovalJoinPreview.checkpoint
                        .highestDetectedPhase
                    }
                  </h3>
                  <p className={styles.summaryText}>
                    Latest completed batch:{" "}
                    {
                      props.resultCaptureAuditApprovalJoinPreview.checkpoint
                        .latestCompletedBatch
                    }
                  </p>
                  <ul className={styles.summaryList}>
                    {[
                      `Previous completed batch: ${props.resultCaptureAuditApprovalJoinPreview.checkpoint.previousCompletedBatch}`,
                      `Next likely batch: ${props.resultCaptureAuditApprovalJoinPreview.checkpoint.nextLikelyBatch.replace(
                        /^next likely batch:\s*/i,
                        ""
                      )}`,
                      `Review-only evidence inputs: ${props.resultCaptureAuditApprovalJoinPreview.evidenceInputCount}`,
                      ...props.resultCaptureAuditApprovalJoinPreview.nextGatedProviderTrialPreparationChecklist.slice(
                        0,
                        2
                      ),
                    ].map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          ) : null}

          {props.serverOnlySyntheticDryRunPreview ? (
            <section className={styles.panel} aria-label="Server-only synthetic dry run">
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Server-only runner preview</p>
                  <h2 className={styles.panelTitle}>
                    {props.serverOnlySyntheticDryRunPreview.title}
                  </h2>
                </div>
                <span className={styles.statBadge}>
                  {props.serverOnlySyntheticDryRunPreview.statusBadge}
                </span>
              </div>
              <p className={styles.panelBody}>
                {props.serverOnlySyntheticDryRunPreview.summary}
              </p>
              <div className={styles.statusStrip}>
                {props.serverOnlySyntheticDryRunPreview.highlights.map((item) => (
                  <span key={item} className={styles.statusPill}>
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.summaryGrid}>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Static preview envelope</p>
                  <h3 className={styles.summaryTitle}>
                    {props.serverOnlySyntheticDryRunPreview.resultId}
                  </h3>
                  <p className={styles.summaryText}>
                    {props.serverOnlySyntheticDryRunPreview.blockedExecutionSummary}
                  </p>
                  <ul className={styles.summaryList}>
                    {[
                      `Request id: ${props.serverOnlySyntheticDryRunPreview.requestId}`,
                      `Disabled surfaces: ${props.serverOnlySyntheticDryRunPreview.disabledSurfaceCount}`,
                      ...props.serverOnlySyntheticDryRunPreview.nextCaptureRequirements.slice(
                        0,
                        3
                      ),
                    ].map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Checkpoint state</p>
                  <h3 className={styles.summaryTitle}>
                    Phase{" "}
                    {
                      props.serverOnlySyntheticDryRunPreview.checkpoint
                        .highestDetectedPhase
                    }
                  </h3>
                  <p className={styles.summaryText}>
                    Latest completed batch:{" "}
                    {
                      props.serverOnlySyntheticDryRunPreview.checkpoint
                        .latestCompletedBatch
                    }
                  </p>
                  <ul className={styles.summaryList}>
                    {[
                      `Previous completed batch: ${props.serverOnlySyntheticDryRunPreview.checkpoint.previousCompletedBatch}`,
                      `Next likely batch: ${props.serverOnlySyntheticDryRunPreview.checkpoint.nextLikelyBatch.replace(
                        /^next likely batch:\s*/i,
                        ""
                      )}`,
                      `${props.serverOnlySyntheticDryRunPreview.evidenceInputCount} review-only evidence inputs remain inert`,
                    ].map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          ) : null}

          {props.backendDryRunAdmissionPreview ? (
            <section className={styles.panel} aria-label="Backend dry-run admission">
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Backend-only admission</p>
                  <h2 className={styles.panelTitle}>
                    {props.backendDryRunAdmissionPreview.title}
                  </h2>
                </div>
                <span className={styles.statBadge}>
                  {props.backendDryRunAdmissionPreview.statusBadge}
                </span>
              </div>
              <p className={styles.panelBody}>
                {props.backendDryRunAdmissionPreview.summary}
              </p>
              <div className={styles.statusStrip}>
                {props.backendDryRunAdmissionPreview.highlights.map((item) => (
                  <span key={item} className={styles.statusPill}>
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.summaryGrid}>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Current admission decision</p>
                  <h3 className={styles.summaryTitle}>
                    {props.backendDryRunAdmissionPreview.decision.label}
                  </h3>
                  <p className={styles.summaryText}>
                    {props.backendDryRunAdmissionPreview.decision.summary}
                  </p>
                  <ul className={styles.summaryList}>
                    {(props.backendDryRunAdmissionPreview.decision.blockers.length > 0
                      ? props.backendDryRunAdmissionPreview.decision.blockers
                      : [
                          "Synthetic dry-run review can be prepared without live execution.",
                        ]).map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className={styles.summaryCard}>
                  <p className={styles.summaryEyebrow}>Checkpoint state</p>
                  <h3 className={styles.summaryTitle}>
                    Phase {props.backendDryRunAdmissionPreview.checkpoint.highestDetectedPhase}
                  </h3>
                  <p className={styles.summaryText}>
                    {props.backendDryRunAdmissionPreview.completenessLabel}.{" "}
                    {props.backendDryRunAdmissionPreview.requiredGateCount} static
                    gates are tracked and{" "}
                    {props.backendDryRunAdmissionPreview.blockerCount} blockers remain.
                  </p>
                  <ul className={styles.summaryList}>
                    {[
                      `Latest completed batch: ${props.backendDryRunAdmissionPreview.checkpoint.latestCompletedBatch}`,
                      `Previous completed batch: ${props.backendDryRunAdmissionPreview.checkpoint.previousCompletedBatch}`,
                      `Next likely batch: ${props.backendDryRunAdmissionPreview.checkpoint.nextLikelyBatch.replace(
                        /^next likely batch:\s*/i,
                        ""
                      )}`,
                    ].map((item) => (
                      <li key={item} className={styles.summaryItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          ) : null}

          <section className={styles.panel} aria-label="Backend runner contract">
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelEyebrow}>
                  {record.backendRunnerContractHardening.overview.eyebrow}
                </p>
                <h2 className={styles.panelTitle}>
                  {record.backendRunnerContractHardening.overview.title}
                </h2>
              </div>
              <span className={styles.statBadge}>Backend-only runner required</span>
            </div>
            <p className={styles.panelBody}>
              {record.backendRunnerContractHardening.overview.summary}{" "}
              {record.backendRunnerContractHardening.overview.detail}
            </p>
            <div className={styles.statusStrip}>
              {record.backendRunnerContractHardening.overview.productStatus.map(
                (item) => (
                  <span key={item} className={styles.statusPill}>
                    {item}
                  </span>
                )
              )}
            </div>
            <div className={styles.metricGrid}>
              {record.backendRunnerContractHardening.metrics.map((metric) => (
                <article
                  key={buildJarvisVideoBackendRunnerContractHardeningStableKey([
                    "metric",
                    metric.label,
                  ])}
                  className={styles.metricCard}
                >
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <span className={styles.metricValue}>{metric.value}</span>
                  <span className={styles.metricDetail}>{metric.detail}</span>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.chipRow}>
            <span className={styles.chip}>
              {context.route ? "Developer diagnostic" : "Video Studio"}
            </span>
            <span className={styles.chipReady}>
              {record.heroState.stageLabel}
            </span>
            <span className={styles.chipApproval}>
              {record.operatorReviewPosture}
            </span>
            <span className={styles.chipBlocked}>Generation locked</span>
          </div>
          <h2 className={styles.heroTitle}>{record.heroState.title}</h2>
          <p className={styles.heroSummary}>
            {record.heroState.summary} {record.heroState.detail}{" "}
            {context.route ? `Diagnostic focus: ${context.route.focus}.` : ""}
          </p>
          <p className={styles.heroDetail}>
            Review the hardened backend runner contract, mission brief,
            approval packet, backend readiness, result capture and audit join
            layer, and result recovery path without enabling generation,
            uploads, persistence, or execution.
          </p>
          <div className={styles.metricGrid}>
            {record.heroState.metrics.map((metric) => (
              <article
                key={buildJarvisVideoStudioReleaseCandidateStableKey([
                  "hero-metric",
                  metric.label,
                ])}
                className={styles.metricCard}
              >
                <p className={styles.metricLabel}>{metric.label}</p>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricDetail}>{metric.detail}</span>
              </article>
            ))}
          </div>
        </div>
        <aside className={styles.heroAside}>
          <article className={styles.card}>
            <p className={styles.panelEyebrow}>Primary action</p>
            <h2 className={styles.heroAsideTitle}>Harden backend runner contract</h2>
            <p className={styles.heroDetail}>
              Review the server-only path, approval gates, credential
              isolation, and the next result capture, audit envelope, and
              approval join requirements.
            </p>
            <div className={styles.statGrid}>
              <article className={styles.metricCard}>
                <p className={styles.metricLabel}>Mission brief</p>
                <span className={styles.metricValue}>Operator review first</span>
                <span className={styles.metricDetail}>
                  Audience, objective, and handoff posture stay visible.
                </span>
              </article>
              <article className={styles.metricCard}>
                <p className={styles.metricLabel}>Readiness</p>
                <span className={styles.metricValue}>
                  {record.readinessScore.value} / 100
                </span>
                <span className={styles.metricDetail}>
                  Approval, contract hardening, and safety gates remain visible.
                </span>
              </article>
              <article className={styles.metricCard}>
                <p className={styles.metricLabel}>Handoff</p>
                <span className={styles.metricValue}>Trial preparation next</span>
                <span className={styles.metricDetail}>
                  Server-only capture, audit, and approval join stay
                  review-only before the first gated provider trial
                  preparation batch.
                </span>
              </article>
            </div>
          </article>
          <article className={styles.card}>
            <p className={styles.panelEyebrow}>Operator posture</p>
            <h2 className={styles.heroAsideTitle}>
              Approval required before backend handoff
            </h2>
            <p className={styles.heroDetail}>
              Disabled by default, kill-switch protected, backend-only, and
              blocked from direct frontend execution.
            </p>
          </article>
        </aside>
      </header>

      <section className={styles.statusStrip} aria-label="Studio safety and approval state">
        {[
          "Runner contract is being hardened",
          record.executionPosture,
          record.operatorReviewPosture,
          "Credential isolation required",
          "Provider execution remains locked",
          "Queue/worker/job remain disabled",
        ].map((item) => (
          <span key={item} className={styles.statusPill}>
            {item}
          </span>
        ))}
      </section>

      <section className={styles.panel} aria-label="Mission and readiness">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Mission and readiness</p>
            <h2 className={styles.panelTitle}>Mission brief, readiness score, and next step</h2>
          </div>
          <span className={styles.statBadge}>{record.readinessPosture}</span>
        </div>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <p className={styles.summaryEyebrow}>{record.missionBrief.title}</p>
            <h3 className={styles.summaryTitle}>{record.missionBrief.audience}</h3>
            <p className={styles.summaryText}>{record.missionBrief.objective}</p>
            <p className={styles.summaryText}>{record.missionBrief.operatorPosture}</p>
          </article>
          <article className={styles.summaryCard}>
            <p className={styles.summaryEyebrow}>{record.readinessScore.label}</p>
            <h3 className={styles.summaryTitle}>
              {record.readinessScore.value} / 100
            </h3>
            <div className={styles.progressBar} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${record.readinessScore.value}%` }}
              />
            </div>
            <p className={styles.summaryText}>{record.readinessScore.summary}</p>
            <ul className={styles.checkList}>
              {record.readinessScore.detail.map((item) => (
                <li
                  key={buildJarvisVideoStudioReleaseCandidateStableKey([
                    "readiness-detail",
                    item,
                  ])}
                  className={styles.checkItem}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.summaryCard}>
            <p className={styles.summaryEyebrow}>{record.nextActionCard.title}</p>
            <h3 className={styles.summaryTitle}>{record.nextActionCard.posture}</h3>
            <p className={styles.summaryText}>{record.nextActionCard.summary}</p>
            <Link className={styles.linkCard} href={record.nextActionCard.routeHref}>
              <span className={styles.linkLabel}>Secondary notes</span>
              <span className={styles.linkTitle}>Open developer handoff notes</span>
              <span className={styles.linkSummary}>Detailed operator traceability and wiring notes.</span>
            </Link>
          </article>
        </div>
      </section>

      <section className={styles.panel} aria-label="Video production timeline">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Workflow first</p>
            <h2 className={styles.panelTitle}>Video production timeline</h2>
          </div>
          <span className={styles.statBadge}>Plan, review, approve, then hand off to backend</span>
        </div>
        <div className={styles.milestoneGrid}>
          {record.productionTimeline.map((step) => (
            <Link
              key={step.id}
              href={step.routeHref}
              className={styles.milestoneCard}
            >
              <p className={styles.phaseEyebrow}>{step.phase}</p>
              <h3 className={styles.phaseTitle}>{step.title}</h3>
              <p className={styles.phaseSummary}>{step.summary}</p>
              <span className={styles.metricDetail}>{step.posture}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Prerequisite lanes">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Creative inputs</p>
            <h2 className={styles.panelTitle}>Planning, assets, approval, and dry run</h2>
          </div>
          <span className={styles.statBadge}>Review-only workflow</span>
        </div>
        <div className={styles.laneGrid}>
          {[
            record.scriptStoryboardLane,
            record.assetAudioCaptionLane,
            record.approvalPacketLane,
            record.dryRunLane,
          ].map((lane) => (
            <LaneCard key={lane.id} lane={lane} />
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Execution rails">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend handoff</p>
            <h2 className={styles.panelTitle}>Execution readiness stays visible without execution</h2>
          </div>
          <span className={styles.statBadge}>Backend-only execution required</span>
        </div>
        <div className={styles.laneGrid}>
          {[
            record.backendReadinessLane,
            record.controlledTrialLane,
            record.backendRunnerLane,
            record.resultReviewLane,
          ].map((lane) => (
            <LaneCard key={lane.id} lane={lane} />
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Safety and audit rails">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Safety, audit, and navigation</p>
            <h2 className={styles.panelTitle}>Keep the main route clear and the safety state compact</h2>
          </div>
          <span className={styles.statBadge}>No provider call from frontend</span>
        </div>
        <div className={styles.railColumns}>
          <RailCard rail={record.safetyRail} />
          <RailCard rail={record.auditRail} />
          <article className={styles.railCard}>
            <p className={styles.railKicker}>
              {record.workspaceNavigationCard.title}
            </p>
            <h3 className={styles.railTitle}>Stay on the normal product path</h3>
            <p className={styles.railBody}>{record.workspaceNavigationCard.summary}</p>
            <div className={styles.linkGrid}>
              {record.workspaceNavigationCard.links.map((link) => (
                <Link key={link.label} href={link.href} className={styles.linkCard}>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkSummary}>{link.summary}</span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.panel} aria-label="Blocked action command deck">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Blocked actions</p>
            <h2 className={styles.panelTitle}>What stays locked from the studio</h2>
          </div>
          <span className={styles.statBadge}>Kill switch engaged</span>
        </div>
        <div className={styles.guardGrid}>
          {record.blockedActionDeck.map((card) => (
            <article key={card.id} className={styles.commandCard}>
              <p className={styles.panelEyebrow}>{card.guard}</p>
              <h3 className={styles.commandTitle}>{card.title}</h3>
              <p className={styles.commandText}>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Backend runner contract hardening">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Current backend-only contract batch</p>
            <h2 className={styles.panelTitle}>
              Typed contract surfaces, execution guards, and dry-run admission criteria
            </h2>
          </div>
          <span className={styles.statBadge}>Contract hardening only</span>
        </div>
        <p className={styles.panelBody}>
          The hardened runner contract keeps every backend surface static and typed:
          envelopes, approval joins, credential references, queue and worker
          boundaries, idempotency, kill switch posture, trace joins, and dry-run
          admission criteria all remain inert.
        </p>
        <div className={styles.summaryGrid}>
          <ReadinessListCard
            eyebrow="Foundation contracts"
            title="Runner envelopes and backend-only references"
            summary="Input, output, error, approval, prompt, settings, safety, credential, adapter, queue, worker, and job markers remain typed review-only contract surfaces."
            items={record.backendRunnerContractHardening.foundationRecords.map(
              (item) => item.title
            )}
          />
          <ReadinessListCard
            eyebrow="Execution guards"
            title="Admission locks and denial-by-default posture"
            summary="Idempotency, single-call lock, replay block, kill switch, timeout, cost, egress, safety, and redaction remain explicit typed guards."
            items={record.backendRunnerContractHardening.executionGuardRecords.map(
              (item) => item.title
            )}
          />
          <ReadinessListCard
            eyebrow="Handoff and trace"
            title="Result, audit, artifact, retry, rollback, and trace remain inert"
            summary="No persistence, no render/export/download, no retry or fallback execution, and no live logging implementation are introduced by this batch."
            items={record.backendRunnerContractHardening.handoffRecords.map(
              (item) => item.title
            )}
          />
          <ReadinessListCard
            eyebrow="Next batch gate"
            title="Backend runner foundation dry-run admission only"
            summary="The next backend-only batch must still stay dry-run-only, backend-only, operator-approved, credential-isolated, and execution-locked by default."
            items={record.backendRunnerContractHardening.acceptanceChecklist}
          />
        </div>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Evidence inputs</p>
            <h3 className={styles.panelTitle}>
              Review-only milestones that inform the hardened contract
            </h3>
          </div>
          <span className={styles.statBadge}>
            {record.backendRunnerContractHardening.evidenceSources.length} inert inputs
          </span>
        </div>
        <div className={styles.milestoneGrid}>
          {record.backendRunnerContractHardening.evidenceSources.map((source) => (
            <Link
              key={buildJarvisVideoBackendRunnerContractHardeningStableKey([
                source.phaseRange,
                source.label,
              ])}
              href={source.href}
              className={styles.milestoneCard}
            >
              <p className={styles.phaseEyebrow}>{source.phaseRange}</p>
              <h3 className={styles.phaseTitle}>{source.label}</h3>
              <p className={styles.phaseSummary}>{source.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Backend implementation readiness">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>
              {record.backendImplementationReadinessOverview.eyebrow}
            </p>
            <h2 className={styles.panelTitle}>
              {record.backendImplementationReadinessOverview.title}
            </h2>
          </div>
          <span className={styles.statBadge}>Operator approval required</span>
        </div>
        <p className={styles.panelBody}>
          {record.backendImplementationReadinessOverview.summary}{" "}
          {record.backendImplementationReadinessOverview.detail}
        </p>
        <div className={styles.statusStrip}>
          {[
            "Review backend readiness",
            "Confirm server-only boundary",
            "Prepare runner contract",
            "Operator approval required",
          ].map((item) => (
            <span key={item} className={styles.statusPill}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.summaryGrid}>
          <ReadinessListCard
            eyebrow="Ready to design next"
            title="Prepare the backend-only contract path"
            summary="These contracts can be designed next without enabling live generation, provider execution, queue dispatch, worker dispatch, job execution, or persistence."
            items={record.backendImplementationReadinessOverview.readyNext}
          />
          <ReadinessListCard
            eyebrow="Still blocked"
            title="Keep generation locked"
            summary="Provider calls, queue and worker dispatch, job execution, and persistence remain disabled while the studio stays product-first and review-only."
            items={record.backendImplementationReadinessOverview.stillBlocked}
          />
          <ReadinessListCard
            eyebrow="Next backend-only contract step"
            title="Prepare runner contract hardening"
            summary="The next backend-only contract step should harden runner admission, approval joins, and server-held credential boundaries while execution stays disabled by default."
            items={record.backendImplementationReadinessOverview.nextContractStep}
          />
        </div>
        <div className={styles.summaryGrid}>
          {record.backendImplementationReadinessWorkflow.map((plan) => (
            <ImplementationPlanCard
              key={plan.id}
              plan={plan}
              variant="summary"
            />
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend readiness safety and approval state"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Safety and approval state</p>
            <h2 className={styles.panelTitle}>
              Why backend-only implementation is required before any runner
              exists
            </h2>
          </div>
          <span className={styles.statBadge}>Credential isolation required</span>
        </div>
        <p className={styles.panelBody}>
          Credential isolation is required, operator approval is required, and
          queue, worker, job, provider, render, export, publish, upload,
          download, retry, fallback, and persistence execution remain disabled.
        </p>
        <div className={styles.railColumns}>
          {record.backendImplementationReadinessSafety.map((plan) => (
            <ImplementationPlanCard key={plan.id} plan={plan} variant="rail" />
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend readiness evidence and contract inputs"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Evidence and contract inputs</p>
            <h2 className={styles.panelTitle}>
              Review-only evidence stays linked while result and audit
              contracts remain inert
            </h2>
          </div>
          <span className={styles.statBadge}>
            Result and audit persistence remain unimplemented
          </span>
        </div>
        <div className={styles.summaryGrid}>
          {record.backendImplementationReadinessEvidence.map((plan) => (
            <ImplementationPlanCard
              key={plan.id}
              plan={plan}
              variant="summary"
            />
          ))}
          <article className={styles.summaryCard}>
            <p className={styles.summaryEyebrow}>Checkpoint state</p>
            <h3 className={styles.summaryTitle}>
              Phase {record.backendImplementationReadinessCheckpoint.highestDetectedPhase}
            </h3>
            <p className={styles.summaryText}>
              Latest completed batch:{" "}
              {record.backendImplementationReadinessCheckpoint.latestCompletedBatch}
            </p>
            <ul className={styles.summaryList}>
              {[
                `Previous completed batch: ${record.backendImplementationReadinessCheckpoint.previousCompletedBatch}`,
                `Next likely batch: ${record.backendImplementationReadinessCheckpoint.nextLikelyBatch.replace(
                  /^next likely batch:\s*/i,
                  ""
                )}`,
                "Backend implementation readiness only; no provider execution, queue dispatch, worker dispatch, job execution, or persistence.",
              ].map((item) => (
                <li key={item} className={styles.summaryItem}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <article className={styles.summaryCard}>
          <p className={styles.summaryEyebrow}>Review-only evidence inputs</p>
          <h3 className={styles.summaryTitle}>
            Prior backend and studio checkpoints remain inert
          </h3>
          <p className={styles.summaryText}>
            These records are review-only evidence inputs. They do not execute
            providers, queues, workers, jobs, persistence, uploads, downloads,
            render, export, or publish flows.
          </p>
          <div className={styles.linkGrid}>
            {record.backendImplementationReadinessEvidenceSources.map((source) => (
              <Link
                key={buildJarvisVideoStudioReleaseCandidateStableKey([
                  source.phaseRange,
                  source.label,
                ])}
                href={source.href}
                className={styles.linkCard}
              >
                <span className={styles.linkLabel}>{source.phaseRange}</span>
                <span className={styles.linkTitle}>{source.label}</span>
                <span className={styles.linkSummary}>{source.summary}</span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend execution implementation plan"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>
              {record.implementationPlanOverview.eyebrow}
            </p>
            <h2 className={styles.panelTitle}>
              {record.implementationPlanOverview.title}
            </h2>
          </div>
          <span className={styles.statBadge}>Generation locked</span>
        </div>
        <p className={styles.panelBody}>
          {record.implementationPlanOverview.summary}{" "}
          {record.implementationPlanOverview.detail}
        </p>
        <div className={styles.statusStrip}>
          {record.implementationPlanOverview.status.map((item) => (
            <span key={item} className={styles.statusPill}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.summaryGrid}>
          {record.implementationPlanWorkflow.map((plan) => (
            <ImplementationPlanCard
              key={plan.id}
              plan={plan}
              variant="summary"
            />
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Implementation safety and approval state"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Safety and approval state</p>
            <h2 className={styles.panelTitle}>
              Backend-owned execution requires explicit approval gates
            </h2>
          </div>
          <span className={styles.statBadge}>Operator approval required</span>
        </div>
        <p className={styles.panelBody}>
          Review how the first backend-only implementation must stay disabled by
          default, kill-switch protected, credential-isolated, and blocked from
          frontend provider calls.
        </p>
        <div className={styles.railColumns}>
          {record.implementationPlanSafety.map((plan) => (
            <ImplementationPlanCard key={plan.id} plan={plan} variant="rail" />
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Implementation evidence and acceptance"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Evidence and acceptance</p>
            <h2 className={styles.panelTitle}>
              Review-only evidence stays linked while future acceptance stays
              explicit
            </h2>
          </div>
          <span className={styles.statBadge}>
            No queue, worker, provider, or persistence exists yet
          </span>
        </div>
        <div className={styles.summaryGrid}>
          {record.implementationPlanEvidence.map((plan) => (
            <ImplementationPlanCard
              key={plan.id}
              plan={plan}
              variant="summary"
            />
          ))}
          <article className={styles.summaryCard}>
            <p className={styles.summaryEyebrow}>Checkpoint state</p>
            <h3 className={styles.summaryTitle}>
              Phase {record.implementationPlanCheckpoint.highestDetectedPhase}
            </h3>
            <p className={styles.summaryText}>
              Latest completed batch:{" "}
              {record.implementationPlanCheckpoint.latestCompletedBatch}
            </p>
            <ul className={styles.summaryList}>
              {[
                `Previous completed batch: ${record.implementationPlanCheckpoint.previousCompletedBatch}`,
                `Next likely batch: ${record.implementationPlanCheckpoint.nextLikelyBatch.replace(
                  /^next likely batch:\s*/i,
                  ""
                )}`,
                "Backend implementation follow-up should stay focused, server-only, and non-live.",
              ].map((item) => (
                <li
                  key={item}
                  className={styles.summaryItem}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <article className={styles.summaryCard}>
          <p className={styles.summaryEyebrow}>Review-only evidence inputs</p>
          <h3 className={styles.summaryTitle}>
            Prior staged evidence remains linked without execution
          </h3>
          <p className={styles.summaryText}>
            These inputs stay inert and review-only. They do not run providers,
            queues, workers, persistence, uploads, downloads, render, export,
            or publish flows.
          </p>
          <div className={styles.linkGrid}>
            {record.implementationPlanEvidenceSources.map((source) => (
              <Link
                key={buildJarvisVideoStudioReleaseCandidateStableKey([
                  source.phaseRange,
                  source.label,
                ])}
                href={source.href}
                className={styles.linkCard}
              >
                <span className={styles.linkLabel}>{source.phaseRange}</span>
                <span className={styles.linkTitle}>{source.label}</span>
                <span className={styles.linkSummary}>{source.summary}</span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.panel} aria-label="Release summary">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>{record.releaseSummary.title}</p>
            <h2 className={styles.panelTitle}>
              Jarvis Video Studio stays product-first while backend hardening
              lands
            </h2>
          </div>
          <span className={styles.statBadge}>Contract hardening only</span>
        </div>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <p className={styles.summaryText}>{record.releaseSummary.summary}</p>
            <ul className={styles.summaryList}>
              {record.releaseSummary.highlights.map((highlight) => (
                <li
                  key={buildJarvisVideoStudioReleaseCandidateStableKey([
                    "release-highlight",
                    highlight,
                  ])}
                  className={styles.summaryItem}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.summaryCard}>
            <p className={styles.panelEyebrow}>Primary links</p>
            <div className={styles.linkGrid}>
              {[record.productIaLink, record.jarvisHomeLink, record.cockpitLink].map(
                (link) => (
                  <Link key={link.label} href={link.href} className={styles.linkCard}>
                    <span className={styles.linkLabel}>{link.label}</span>
                    <span className={styles.linkSummary}>{link.summary}</span>
                  </Link>
                )
              )}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.panel} aria-label="Developer diagnostics">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>
              {record.developerDiagnosticsGrouping.title}
            </p>
            <h2 className={styles.panelTitle}>Milestone traceability and embedded prior panels</h2>
          </div>
          <span className={styles.statBadge}>Developer diagnostics are secondary</span>
        </div>
        <p className={styles.panelBody}>
          {record.developerDiagnosticsGrouping.summary}
        </p>
        <div className={styles.linkGrid}>
          {record.developerDiagnosticsGrouping.links.map((link) => (
            <Link key={link.label} href={link.href} className={styles.linkCard}>
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkSummary}>{link.summary}</span>
            </Link>
          ))}
        </div>
        <div className={styles.milestoneGrid}>
          {record.milestoneReferences.map((reference) => (
            <Link
              key={buildJarvisVideoStudioReleaseCandidateStableKey([
                reference.phaseRange,
                reference.label,
              ])}
              href={reference.href}
              className={styles.milestoneCard}
            >
              <p className={styles.phaseEyebrow}>{reference.phaseRange}</p>
              <h3 className={styles.phaseTitle}>{reference.label}</h3>
              <p className={styles.phaseSummary}>{reference.summary}</p>
            </Link>
          ))}
        </div>
        <div className={styles.detailsBlock}>
          <details className={styles.details}>
            <summary className={styles.detailsSummary}>
              Controlled trial rail detail
            </summary>
            <div className={styles.detailsContent}>
              <JarvisVideoControlledExecutionTrialPanel
                workspaceId="jarvis-video"
                embedded
              />
            </div>
          </details>
          <details className={styles.details}>
            <summary className={styles.detailsSummary}>
              Backend runner rail detail
            </summary>
            <div className={styles.detailsContent}>
              <JarvisVideoBackendTrialRunnerContractPanel
                workspaceId="jarvis-video"
                embedded
              />
            </div>
          </details>
          <details className={styles.details}>
            <summary className={styles.detailsSummary}>
              Result review recovery rail detail
            </summary>
            <div className={styles.detailsContent}>
              <JarvisVideoTrialResultReviewRecoveryPanel
                workspaceId="jarvis-video"
                embedded
              />
            </div>
          </details>
        </div>
      </section>
    </section>
  );
}

function resolveJarvisVideoStudioReleaseCandidateContext(
  props: JarvisVideoStudioReleaseCandidatePanelProps
) {
  if (props.routeSlug !== undefined) {
    return buildJarvisVideoStudioReleaseCandidateRouteModel(props.routeSlug);
  }

  return buildJarvisVideoStudioReleaseCandidateWorkspaceModel(props.workspaceId);
}

function LaneCard({
  lane,
}: {
  lane: JarvisVideoStudioReleaseCandidateSharedRecord["scriptStoryboardLane"];
}) {
  return (
    <Link href={lane.routeHref} className={styles.laneCard}>
      <p className={styles.laneKicker}>{lane.title}</p>
      <h3 className={styles.laneTitle}>{lane.posture}</h3>
      <p className={styles.panelBody}>{lane.summary}</p>
      <p className={styles.laneDetail}>{lane.detail}</p>
    </Link>
  );
}

function RailCard({
  rail,
}: {
  rail: JarvisVideoStudioReleaseCandidateSharedRecord["safetyRail"];
}) {
  return (
    <article className={styles.railCard}>
      <p className={styles.railKicker}>{rail.title}</p>
      <h3 className={styles.railTitle}>{rail.posture}</h3>
      <p className={styles.railBody}>{rail.summary}</p>
      <ul className={styles.railList}>
        {rail.items.map((item) => (
          <li
            key={buildJarvisVideoStudioReleaseCandidateStableKey([
              rail.title,
              item,
            ])}
            className={styles.railItem}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ReadinessListCard({
  eyebrow,
  title,
  summary,
  items,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  items: readonly string[];
}) {
  return (
    <article className={styles.summaryCard}>
      <p className={styles.summaryEyebrow}>{eyebrow}</p>
      <h3 className={styles.summaryTitle}>{title}</h3>
      <p className={styles.summaryText}>{summary}</p>
      <ul className={styles.summaryList}>
        {items.map((item) => (
          <li
            key={buildJarvisVideoStudioReleaseCandidateStableKey([
              eyebrow,
              item,
            ])}
            className={styles.summaryItem}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ImplementationPlanCard({
  plan,
  variant,
}: {
  plan:
    | JarvisVideoStudioReleaseCandidateSharedRecord["backendImplementationReadinessWorkflow"][number]
    | JarvisVideoStudioReleaseCandidateSharedRecord["implementationPlanWorkflow"][number];
  variant: "summary" | "rail";
}) {
  if (variant === "rail") {
    return (
      <article className={styles.railCard}>
        <p className={styles.railKicker}>{plan.title}</p>
        <h3 className={styles.railTitle}>{plan.posture}</h3>
        <p className={styles.railBody}>{plan.summary}</p>
        <ul className={styles.railList}>
          {plan.items.map((item) => (
            <li
              key={buildJarvisVideoStudioReleaseCandidateStableKey([
                plan.id,
                item,
              ])}
              className={styles.railItem}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className={styles.summaryCard}>
      <p className={styles.summaryEyebrow}>{plan.title}</p>
      <h3 className={styles.summaryTitle}>{plan.posture}</h3>
      <p className={styles.summaryText}>{plan.summary}</p>
      <ul className={styles.summaryList}>
        {plan.items.map((item) => (
          <li
            key={buildJarvisVideoStudioReleaseCandidateStableKey([
              plan.id,
              item,
            ])}
            className={styles.summaryItem}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
