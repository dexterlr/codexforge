'use client';

import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import { JarvisUnifiedWorkspaceShellPanel } from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoTrialResultReviewRecoveryRouteModel,
  buildJarvisVideoTrialResultReviewRecoveryStableKey,
  buildJarvisVideoTrialResultReviewRecoveryWorkspaceModel,
  type JarvisVideoTrialResultReviewRecoveryId,
  type JarvisVideoTrialResultReviewRecoveryRouteSlug,
} from "../jarvis-video-trial-result-review-recovery-model";
import type {
  JarvisVideoTrialResultReviewRecoveryChecklistItem,
  JarvisVideoTrialResultReviewRecoveryDecisionRecord,
  JarvisVideoTrialResultReviewRecoveryReviewCard,
  JarvisVideoTrialResultReviewRecoveryReviewGroup,
} from "../jarvis-video-trial-result-review-recovery-gates";
import type {
  JarvisVideoTrialResultReviewRecoveryLinkRecord,
  JarvisVideoTrialResultReviewRecoveryMilestoneReference,
  JarvisVideoTrialResultReviewRecoveryReferenceRecord,
} from "../jarvis-video-trial-result-review-recovery-packet";

type JarvisVideoTrialResultReviewRecoveryPanelProps =
  | {
      workspaceId: JarvisVideoTrialResultReviewRecoveryId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoTrialResultReviewRecoveryRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoTrialResultReviewRecoveryPageClientShell(
  props: JarvisVideoTrialResultReviewRecoveryPanelProps
) {
  const context = resolveJarvisVideoTrialResultReviewRecoveryContext(props);

  return (
    <CodexForgeAppShell
      activePath={context.activePath}
      workspaceLabel={context.title}
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisVideoTrialResultReviewRecoveryPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoTrialResultReviewRecoveryPanel(
  props: JarvisVideoTrialResultReviewRecoveryPanelProps
) {
  const context = resolveJarvisVideoTrialResultReviewRecoveryContext(props);
  const {
    blockedPostures,
    disabledPromotionLane,
    displayMarkers,
    executionBlocks,
    milestoneReferences,
    nextAction,
    operatorChecklist,
    operatorReview,
    packetRecord,
    reviewCards,
    reviewLinks,
    sharedMarkers,
    sharedRecord,
    storageBoundaries,
    workspace,
  } = context;
  const statusCards = reviewCards.filter((card) => card.group === "Status");
  const reviewCardsGroup = reviewCards.filter((card) => card.group === "Review");
  const recoveryCards = reviewCards.filter(
    (card) => card.group === "Recovery"
  );
  const guardCards = reviewCards.filter((card) => card.group === "Guard");
  const linkCards = reviewCards.filter((card) => card.group === "Link");

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-trial-result-review-recovery={sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-video-trial-result-review-recovery-focus={
        context.focus
      }
    >
      {props.embedded ? (
        <section
          className={styles.glassPanel}
          aria-label="Trial result review and recovery"
        >
          <PanelHeading
            eyebrow="Trial Result Review and Recovery"
            title="The next result console is staged without enabling persistence or recovery execution"
            badge={sharedRecord.resultReviewStatus}
          />
          <p className={styles.bodyText}>
            Jarvis is the operating system / top-level control plane. This
            premium section keeps the visible /jarvis-video studio product-like
            while future backend-owned trial result review and recovery remain
            blocked. Result review is staged. Synthetic result only. Recovery
            remains backend-owned. No result persistence. No retry or fallback
            execution. Operator acceptance required.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Status"
              value={sharedRecord.resultReviewStatus}
              detail={sharedRecord.statusTimeline}
            />
            <MetricCard
              label="Envelope"
              value={sharedRecord.syntheticResultEnvelope}
              detail={sharedRecord.resultReceiptPlaceholder}
            />
            <MetricCard
              label="Recovery"
              value={sharedRecord.executionPosture}
              detail={sharedRecord.noPersistenceGuard}
            />
            <MetricCard
              label="Next action"
              value="4042-4073"
              detail={sharedRecord.nextLikelyBatch}
            />
          </div>
        </section>
      ) : (
        <header className={styles.heroPanel}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.eyebrowRow}>
              <span className={styles.phaseBadge}>
                {context.route
                  ? context.route.phase
                  : "First Jarvis-Controlled Video Trial Result Review and Recovery"}
              </span>
              <span className={styles.safeBadge}>
                Jarvis-controlled video trial result review and recovery only
              </span>
              <span className={styles.blockedBadge}>execution blocked</span>
            </div>
            <h1 className={styles.heroTitle}>{context.title}</h1>
            <p className={styles.heroLead}>
              Jarvis is the operating system / top-level control plane. This
              batch adds a polished trial result review and recovery surface
              under the visible /jarvis-video studio so operators can review
              result review status, synthetic result envelope, result receipt
              placeholder, safety and privacy and redaction review, approval and
              audit join, observability trace, quality checklist, failure
              taxonomy, recovery plan, retry and fallback review, timeout and
              cost and rate recovery, rollback review, artifact handoff review,
              export publish blocker, operator acceptance checklist, disabled
              promotion lane, status timeline, backend runner link, controlled
              trial link, product IA link, no persistence guard, no execution
              guard, and next action without enabling result persistence or
              recovery execution. Result review is staged. Synthetic result
              only. Recovery remains backend-owned. No result persistence. No
              retry or fallback execution. Operator acceptance required.{" "}
              {workspace.workspaceSummary} {workspace.parentControlPlaneSummary}
              {context.route ? " Current phase focus: " + context.focus + "." : ""}
            </p>
            <div className={styles.heroMetricGrid}>
              <MetricCard
                label="Status"
                value={sharedRecord.resultReviewStatus}
                detail={sharedRecord.statusTimeline}
              />
              <MetricCard
                label="Envelope"
                value={sharedRecord.syntheticResultEnvelope}
                detail={sharedRecord.resultReceiptPlaceholder}
              />
              <MetricCard
                label="Boundary"
                value={sharedRecord.noPersistenceGuard}
                detail={sharedRecord.noExecutionGuard}
              />
              <MetricCard
                label="Next likely batch"
                value="4042-4073"
                detail={sharedRecord.nextLikelyBatch}
              />
            </div>
          </div>
          <div
            className={styles.missionPreview}
            aria-label="Jarvis video trial result review preview"
          >
            <p className={styles.missionLabel}>
              4010-4041 - First Jarvis-Controlled Video Trial Result Review and
              Recovery
            </p>
            <p className={styles.missionDetail}>
              Result review is staged. Synthetic result only. Recovery remains
              backend-owned. No result persistence. No retry or fallback
              execution. Next likely batch: 4042-4073 - Jarvis Video Studio
              Release Candidate.
            </p>
          </div>
        </header>
      )}

      <section
        className={styles.markerBand}
        aria-label="Jarvis video trial result review and recovery markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoTrialResultReviewRecoveryStableKey([
              "display-marker",
              String(index),
              marker,
            ])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      {!props.embedded ? (
        <section
          className={styles.glassPanel}
          aria-label="Jarvis video workspace shell"
        >
          <PanelHeading
            eyebrow="Jarvis workspace"
            title="The primary /jarvis-video workspace stays premium and review-only"
            badge="/jarvis-video trial result review remains review-only"
          />
          <p className={styles.bodyText}>
            This staged result console rides inside the God-tier video studio
            shell so the visible product path stays strong while persistence and
            execution remain blocked behind backend-owned review only.
          </p>
          <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
        </section>
      ) : null}

      <section className={styles.glassPanel} aria-label="Staged result console">
        <PanelHeading
          eyebrow="Staged result console"
          title="Status, envelope, receipt, timeline, and guards stay visible in one premium review lane"
          badge={sharedRecord.resultReviewStatus}
        />
        <div className={styles.diagnosticGrid}>
          {statusCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          {guardCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.syntheticResultEnvelope} />
          <ReferenceCard reference={packetRecord.resultReceiptPlaceholder} />
          <ReferenceCard reference={packetRecord.statusTimeline} />
          <ReferenceCard reference={packetRecord.noPersistenceGuard} />
          <ReferenceCard reference={packetRecord.noExecutionGuard} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Review gates">
        <PanelHeading
          eyebrow="Review gates"
          title="Safety, privacy, redaction, approval, audit, observability, quality, and failure review stay compact"
          badge={sharedRecord.operatorAcceptanceChecklist}
        />
        <div className={styles.diagnosticGrid}>
          {reviewCardsGroup.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.safetyReview} />
          <ReferenceCard reference={packetRecord.privacyReview} />
          <ReferenceCard reference={packetRecord.redactionReview} />
          <ReferenceCard reference={packetRecord.approvalJoin} />
          <ReferenceCard reference={packetRecord.auditJoin} />
          <ReferenceCard reference={packetRecord.observabilityTrace} />
          <ReferenceCard reference={packetRecord.qualityChecklist} />
          <ReferenceCard reference={packetRecord.failureTaxonomy} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Recovery posture">
        <PanelHeading
          eyebrow="Recovery posture"
          title="Plan, retry, fallback, timeout, cost, rate, rollback, artifact handoff, and export publish blocking stay backend-owned"
          badge={sharedRecord.executionPosture}
        />
        <div className={styles.diagnosticGrid}>
          {recoveryCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.recoveryPlan} />
          <ReferenceCard reference={packetRecord.retryReview} />
          <ReferenceCard reference={packetRecord.fallbackReview} />
          <ReferenceCard reference={packetRecord.timeoutRecovery} />
          <ReferenceCard reference={packetRecord.costRecovery} />
          <ReferenceCard reference={packetRecord.rateRecovery} />
          <ReferenceCard reference={packetRecord.rollbackReview} />
          <ReferenceCard reference={packetRecord.artifactHandoffReview} />
          <ReferenceCard reference={packetRecord.exportPublishBlocker} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Operator acceptance checklist">
        <PanelHeading
          eyebrow="Operator acceptance checklist"
          title="The staged console stays ready for review without pretending persistence, recovery, export, or publish exist"
          badge={sharedRecord.operatorReviewPosture}
        />
        <div className={styles.diagnosticGrid}>
          {operatorChecklist.map((item) => (
            <ChecklistCard key={item.id} item={item} />
          ))}
          <ReferenceCard reference={packetRecord.operatorAcceptanceChecklist} />
          <ReferenceCard reference={packetRecord.disabledPromotionLane} />
          {linkCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <DecisionCard decision={disabledPromotionLane} />
          <DecisionCard decision={operatorReview} />
          <DecisionCard decision={nextAction} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Workspace links">
        <PanelHeading
          eyebrow="Workspace links"
          title="The staged result console stays anchored to the backend runner, controlled trial, product shell, audit, and safety surfaces"
          badge="review-only links"
        />
        <div className={styles.diagnosticGrid}>
          {reviewLinks.map((card, index) => (
            <ReviewLinkCard
              key={buildJarvisVideoTrialResultReviewRecoveryStableKey([
                "review-link",
                String(index),
                card.label,
              ])}
              card={card}
            />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Milestone references">
        <PanelHeading
          eyebrow="Milestone references"
          title="Earlier backend-owned and Jarvis-owned video milestones stay linked as inert review markers"
          badge="reference only"
        />
        <div className={styles.diagnosticGrid}>
          {milestoneReferences.map((reference, index) => (
            <MilestoneReferenceCard
              key={buildJarvisVideoTrialResultReviewRecoveryStableKey([
                "milestone",
                String(index),
                reference.phaseRange,
              ])}
              reference={reference}
            />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Execution block posture">
        <PanelHeading
          eyebrow="Execution block posture"
          title="Provider, network, queue, worker, runtime, persistence, storage, and trading execution remain blocked"
          badge="blocked posture"
        />
        <div className={styles.diagnosticGrid}>
          {blockedPostures.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoTrialResultReviewRecoveryStableKey([
                "blocked-posture",
                String(index),
                marker,
              ])}
              label="Blocked posture"
              value={marker}
              detail="trial result review recovery only"
            />
          ))}
          {executionBlocks.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoTrialResultReviewRecoveryStableKey([
                "execution-block",
                String(index),
                marker,
              ])}
              label="Execution block"
              value={marker}
              detail="recovery remains backend-owned"
            />
          ))}
          {storageBoundaries.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoTrialResultReviewRecoveryStableKey([
                "storage-boundary",
                String(index),
                marker,
              ])}
              label="Storage boundary"
              value={marker}
              detail="frontend secret and persistence boundary remains hard"
            />
          ))}
        </div>
      </section>
    </section>
  );
}

function resolveJarvisVideoTrialResultReviewRecoveryContext(
  props: JarvisVideoTrialResultReviewRecoveryPanelProps
) {
  if (props.routeSlug !== undefined) {
    const model = buildJarvisVideoTrialResultReviewRecoveryRouteModel(
      props.routeSlug
    );

    return {
      ...model,
      activePath: model.route.href,
      title: model.route.title,
      focus: model.route.focus,
    } as const;
  }

  const model = buildJarvisVideoTrialResultReviewRecoveryWorkspaceModel(
    props.workspaceId
  );

  return {
    ...model,
    activePath: model.workspace.routeHref,
    title: "Jarvis Video Trial Result Review and Recovery",
    focus: model.sharedRecord.resultReviewStatus,
    route: null,
  } as const;
}

function reviewCardGroupLabel(
  group: JarvisVideoTrialResultReviewRecoveryReviewGroup
) {
  switch (group) {
    case "Status":
      return "Status review";
    case "Review":
      return "Review gate";
    case "Recovery":
      return "Recovery posture";
    case "Guard":
      return "Guard posture";
    case "Link":
      return "Link review";
  }
}

function ReviewLinkCard({
  card,
}: {
  card: JarvisVideoTrialResultReviewRecoveryLinkRecord;
}) {
  return (
    <Link className={styles.diagnosticLink} href={card.href}>
      <span>{card.posture}</span>
      <strong>{card.label}</strong>
      <small>{card.marker}</small>
      <small>{card.detail}</small>
    </Link>
  );
}

function MilestoneReferenceCard({
  reference,
}: {
  reference: JarvisVideoTrialResultReviewRecoveryMilestoneReference;
}) {
  return (
    <Link className={styles.diagnosticLink} href={reference.href}>
      <span>{reference.phaseRange}</span>
      <strong>{reference.title}</strong>
      <small>{reference.marker}</small>
      <small>{reference.summary}</small>
    </Link>
  );
}

function ReviewMetricCard({
  card,
}: {
  card: JarvisVideoTrialResultReviewRecoveryReviewCard;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{card.label}</span>
      <strong className={styles.metricValue}>{card.posture}</strong>
      <span className={styles.metricDetail}>{reviewCardGroupLabel(card.group)}</span>
      <span className={styles.metricDetail}>{card.marker}</span>
      <span className={styles.metricDetail}>{card.detail}</span>
    </article>
  );
}

function ChecklistCard({
  item,
}: {
  item: JarvisVideoTrialResultReviewRecoveryChecklistItem;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{item.label}</span>
      <strong className={styles.metricValue}>{item.status}</strong>
      <span className={styles.metricDetail}>{item.marker}</span>
      <span className={styles.metricDetail}>{item.detail}</span>
    </article>
  );
}

function ReferenceCard({
  reference,
}: {
  reference: JarvisVideoTrialResultReviewRecoveryReferenceRecord;
}) {
  return (
    <Link className={styles.diagnosticLink} href={reference.href}>
      <span>{reference.posture}</span>
      <strong>{reference.label}</strong>
      <small>{reference.marker}</small>
      <small>{reference.detail}</small>
    </Link>
  );
}

function DecisionCard({
  decision,
}: {
  decision: JarvisVideoTrialResultReviewRecoveryDecisionRecord;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{decision.label}</span>
      <strong className={styles.metricValue}>{decision.posture}</strong>
      <span className={styles.metricDetail}>{decision.marker}</span>
      <span className={styles.metricDetail}>{decision.detail}</span>
    </article>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricDetail}>{detail}</span>
    </article>
  );
}

function PanelHeading({
  eyebrow,
  title,
  badge,
}: {
  eyebrow: string;
  title: string;
  badge: string;
}) {
  return (
    <div className={styles.panelHeader}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <span className={styles.contractChip}>{badge}</span>
    </div>
  );
}

export default JarvisVideoTrialResultReviewRecoveryPanel;
