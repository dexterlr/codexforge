'use client';

import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisVideoBackendTrialRunnerContractPanel } from "../../jarvis-video-backend-trial-runner-contract-map/components";
import { JarvisVideoControlledExecutionTrialPanel } from "../../jarvis-video-controlled-execution-trial-map/components";
import { JarvisVideoTrialResultReviewRecoveryPanel } from "../../jarvis-video-trial-result-review-recovery-map/components";
import {
  buildJarvisVideoStudioReleaseCandidateRouteModel,
  buildJarvisVideoStudioReleaseCandidateStableKey,
  buildJarvisVideoStudioReleaseCandidateWorkspaceModel,
  type JarvisVideoStudioReleaseCandidateId,
  type JarvisVideoStudioReleaseCandidateRouteSlug,
  type JarvisVideoStudioReleaseCandidateSharedRecord,
} from "../jarvis-video-studio-release-candidate-model";
import styles from "./JarvisVideoStudioReleaseCandidatePanel.module.css";

type JarvisVideoStudioReleaseCandidatePanelProps =
  | {
      workspaceId: JarvisVideoStudioReleaseCandidateId;
      routeSlug?: never;
    }
  | {
      routeSlug: JarvisVideoStudioReleaseCandidateRouteSlug;
      workspaceId?: never;
    };

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
          <h1 className={styles.heroTitle}>{record.heroState.title}</h1>
          <p className={styles.heroSummary}>
            {record.heroState.summary} {record.heroState.detail}{" "}
            {context.route ? `Diagnostic focus: ${context.route.focus}.` : ""}
          </p>
          <p className={styles.heroDetail}>
            Review the mission brief, approval packet, backend readiness, and
            result recovery plan without enabling generation, uploads,
            persistence, or execution.
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
            <h2 className={styles.heroAsideTitle}>Continue Video Studio</h2>
            <p className={styles.heroDetail}>
              Review the mission brief, studio timeline, approval packet,
              backend readiness, and result recovery plan.
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
                  Approval, backend readiness, and safety gates remain visible.
                </span>
              </article>
              <article className={styles.metricCard}>
                <p className={styles.metricLabel}>Handoff</p>
                <span className={styles.metricValue}>Backend only</span>
                <span className={styles.metricDetail}>
                  Runner planning and result review stay review-only from here.
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
          "Generation locked",
          record.executionPosture,
          record.operatorReviewPosture,
          "No provider call from frontend",
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

      <section className={styles.panel} aria-label="Release summary">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>{record.releaseSummary.title}</p>
            <h2 className={styles.panelTitle}>Jarvis Video Studio reads like one product now</h2>
          </div>
          <span className={styles.statBadge}>Premium video studio release candidate</span>
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
