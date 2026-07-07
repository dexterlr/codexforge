'use client';

import Link from "next/link";
import type { Route } from "next";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import { JarvisUnifiedWorkspaceShellPanel } from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoControlledExecutionTrialRouteModel,
  buildJarvisVideoControlledExecutionTrialStableKey,
  buildJarvisVideoControlledExecutionTrialWorkspaceModel,
  type JarvisVideoControlledExecutionTrialId,
  type JarvisVideoControlledExecutionTrialRouteSlug,
} from "../jarvis-video-controlled-execution-trial-model";
import type {
  JarvisVideoControlledExecutionTrialChecklistItem,
  JarvisVideoControlledExecutionTrialDecisionRecord,
  JarvisVideoControlledExecutionTrialMissingPrerequisite,
  JarvisVideoControlledExecutionTrialReviewCard,
  JarvisVideoControlledExecutionTrialReviewGroup,
} from "../jarvis-video-controlled-execution-trial-gates";
import type {
  JarvisVideoControlledExecutionTrialLinkRecord,
  JarvisVideoControlledExecutionTrialMilestoneReference,
  JarvisVideoControlledExecutionTrialReferenceRecord,
} from "../jarvis-video-controlled-execution-trial-packet";

type JarvisVideoControlledExecutionTrialPanelProps =
  | {
      workspaceId: JarvisVideoControlledExecutionTrialId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoControlledExecutionTrialRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoControlledExecutionTrialPageClientShell(
  props: JarvisVideoControlledExecutionTrialPanelProps
) {
  const context = resolveJarvisVideoControlledExecutionTrialContext(props);

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
      <JarvisVideoControlledExecutionTrialPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoControlledExecutionTrialPanel(
  props: JarvisVideoControlledExecutionTrialPanelProps
) {
  const context = resolveJarvisVideoControlledExecutionTrialContext(props);
  const {
    backendPrerequisites,
    blockedActionSummary,
    blockedPostures,
    disabledLaunchLane,
    displayMarkers,
    executionBlocks,
    guardMatrix,
    milestoneReferences,
    operatorReview,
    packetRecord,
    preflightChecklist,
    readinessCards,
    reviewLinks,
    sharedMarkers,
    sharedRecord,
    storageBoundaries,
    workspace,
  } = context;
  const guardCards = guardMatrix.filter((card) => card.group === "Guards");
  const operationCards = guardMatrix.filter((card) => card.group === "Operations");

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-controlled-execution-trial={sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-video-controlled-execution-trial-focus={
        context.focus
      }
    >
      {props.embedded ? (
        <section
          className={styles.glassPanel}
          aria-label="Controlled trial console"
        >
          <PanelHeading
            eyebrow="Controlled Trial Console"
            title="A premium review-only console keeps the first trial visible and locked"
            badge={sharedRecord.controlledTrialConsoleStatus}
          />
          <p className={styles.bodyText}>
            Jarvis is the operating system / top-level control plane. This
            controlled trial console keeps the visible /jarvis-video studio
            premium while backend-owned execution remains blocked. Backend-owned
            execution required. Operator approval required. No provider call
            from frontend. No real video generation yet.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Readiness"
              value={sharedRecord.trialReadinessState}
              detail={sharedRecord.backendOwnershipPosture}
            />
            <MetricCard
              label="Launch lane"
              value={disabledLaunchLane.posture}
              detail={disabledLaunchLane.detail}
            />
            <MetricCard
              label="Decision"
              value={sharedRecord.finalExecutionTrialDecisionState}
              detail={operatorReview.posture}
            />
            <MetricCard
              label="Next likely batch"
              value="3978-4009"
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
                  : "First Jarvis-Controlled Video Controlled Execution Trial"}
              </span>
              <span className={styles.safeBadge}>
                Jarvis-controlled video controlled execution trial only
              </span>
              <span className={styles.blockedBadge}>execution blocked</span>
            </div>
            <h1 className={styles.heroTitle}>{context.title}</h1>
            <p className={styles.heroLead}>
              Jarvis is the operating system / top-level control plane. This
              batch adds a premium controlled trial console under the visible
              /jarvis-video studio experience so operators can review trial
              readiness state, approved dry-run reference, approval packet
              reference, adapter reference, backend readiness reference,
              operator preflight checklist, provider reference, credential and
              token boundaries, request and response and error envelope posture,
              prompt redaction, cost and rate and timeout, duration and
              resolution and size, privacy and safety gates, audit and
              observability, result placeholder, artifact handoff placeholder,
              kill switch, lock, idempotency, replay block, disabled launch
              lane, blocked action summary, and final decision state without
              enabling execution. Controlled trial is locked. Backend-owned
              execution required. Operator approval required. No provider call
              from frontend. No real video generation yet.{" "}
              {workspace.workspaceSummary} {workspace.parentControlPlaneSummary}
              {context.route ? " Current phase focus: " + context.focus + "." : ""}
            </p>
            <div className={styles.heroMetricGrid}>
              <MetricCard
                label="Console"
                value={sharedRecord.controlledTrialConsoleStatus}
                detail={sharedRecord.trialReadinessState}
              />
              <MetricCard
                label="References"
                value={sharedRecord.backendReadinessReference}
                detail={sharedRecord.approvedApprovalPacketReference}
              />
              <MetricCard
                label="Approval"
                value={sharedRecord.operatorReviewPosture}
                detail={sharedRecord.operatorPreflightChecklistPosture}
              />
              <MetricCard
                label="Execution"
                value={sharedRecord.finalExecutionTrialDecisionState}
                detail={sharedRecord.backendOwnershipPosture}
              />
            </div>
          </div>
          <div
            className={styles.missionPreview}
            aria-label="Jarvis video controlled execution trial preview"
          >
            <p className={styles.missionLabel}>
              3946-3977 - First Jarvis-Controlled Video Controlled Execution
              Trial
            </p>
            <p className={styles.missionDetail}>
              Controlled trial is locked. No provider call from frontend. No
              real video generation yet. Next likely batch: 3978-4009 - First
              Jarvis-Controlled Video Backend Trial Runner Contract.
            </p>
          </div>
        </header>
      )}

      <section
        className={styles.markerBand}
        aria-label="Jarvis video controlled execution trial markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoControlledExecutionTrialStableKey([
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
            badge="/jarvis-video controlled trial remains review-only"
          />
          <p className={styles.bodyText}>
            This controlled trial panel rides inside the God-tier video studio
            shell so the visible product path stays strong while backend-owned
            execution remains blocked behind review-only evidence.
          </p>
          <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
        </section>
      ) : null}

      <section
        className={styles.glassPanel}
        aria-label="Trial readiness status"
      >
        <PanelHeading
          eyebrow="Trial readiness status"
          title="Readiness, references, and final decision state stay visible in one lane"
          badge={sharedRecord.trialReadinessState}
        />
        <p className={styles.bodyText}>
          The controlled trial console stays review-only and disabled because a
          dedicated backend-owned Jarvis video trial runner does not exist in
          this repo yet.
        </p>
        <div className={styles.diagnosticGrid}>
          {readinessCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Approved references"
      >
        <PanelHeading
          eyebrow="Approved references"
          title="Dry run, approval packet, adapter, and backend readiness remain linked as inert evidence"
          badge={sharedRecord.backendReadinessReference}
        />
        <div className={styles.diagnosticGrid}>
          <ReferenceCard reference={packetRecord.approvedDryRunReference} />
          <ReferenceCard
            reference={packetRecord.approvedApprovalPacketReference}
          />
          <ReferenceCard reference={packetRecord.approvedVideoAdapterReference} />
          <ReferenceCard reference={packetRecord.backendReadinessReference} />
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Operator preflight checklist"
      >
        <PanelHeading
          eyebrow="Operator preflight"
          title="The operator checklist stays visible before any future backend-owned run"
          badge={sharedRecord.operatorPreflightChecklistPosture}
        />
        <div className={styles.diagnosticGrid}>
          {preflightChecklist.map((item) => (
            <ChecklistCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Review links"
      >
        <PanelHeading
          eyebrow="Review links"
          title="The controlled trial console stays anchored to the premium Jarvis product surfaces"
          badge={sharedRecord.backendOwnershipPosture}
        />
        <div className={styles.diagnosticGrid}>
          {reviewLinks.map((card, index) => (
            <ReviewLinkCard
              key={buildJarvisVideoControlledExecutionTrialStableKey([
                "review-link",
                String(index),
                card.label,
              ])}
              card={card}
            />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Guard matrix">
        <PanelHeading
          eyebrow="Guard matrix"
          title="Provider, envelope, redaction, budget, safety, and operations posture remain review-only"
          badge="guard matrix"
        />
        <div className={styles.diagnosticGrid}>
          {guardCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          {operationCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Audit and result preview">
        <PanelHeading
          eyebrow="Audit and result preview"
          title="Audit, status, result, and artifact posture stay visible without pretending a run exists"
          badge={packetRecord.auditStatusPreview.posture}
        />
        <div className={styles.diagnosticGrid}>
          <ReferenceCard reference={packetRecord.auditStatusPreview} />
          <ReferenceCard reference={packetRecord.resultPlaceholder} />
          <ReferenceCard reference={packetRecord.artifactHandoffPlaceholder} />
          <DecisionCard decision={operatorReview} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Disabled launch lane">
        <PanelHeading
          eyebrow="Disabled launch lane"
          title="Launch remains blocked until the missing backend-owned runner contract exists"
          badge={disabledLaunchLane.posture}
        />
        <div className={styles.diagnosticGrid}>
          <DecisionCard decision={disabledLaunchLane} />
          <DecisionCard decision={blockedActionSummary} />
          <DecisionCard
            decision={{
              label: "Execution posture",
              posture: sharedRecord.finalExecutionTrialDecisionState,
              marker: packetRecord.finalExecutionTrialDecisionState,
              detail:
                "The frontend can prepare and review a trial packet only. It must never execute the trial.",
            }}
          />
        </div>
        <div className={styles.diagnosticGrid}>
          {backendPrerequisites.map((item) => (
            <MissingPrerequisiteCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Milestone references">
        <PanelHeading
          eyebrow="Milestone references"
          title="Earlier video and Jarvis milestones stay linked as inert readiness markers"
          badge="review-only references"
        />
        <div className={styles.diagnosticGrid}>
          {milestoneReferences.map((reference, index) => (
            <MilestoneReferenceCard
              key={buildJarvisVideoControlledExecutionTrialStableKey([
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
          title="Frontend execution, provider execution, trading, storage, and runtime paths remain blocked"
          badge="blocked posture"
        />
        <div className={styles.diagnosticGrid}>
          {blockedPostures.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoControlledExecutionTrialStableKey([
                "blocked-posture",
                String(index),
                marker,
              ])}
              label="Blocked posture"
              value={marker}
              detail="controlled trial remains review-only"
            />
          ))}
          {executionBlocks.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoControlledExecutionTrialStableKey([
                "execution-block",
                String(index),
                marker,
              ])}
              label="Execution block"
              value={marker}
              detail="backend-owned execution required"
            />
          ))}
          {storageBoundaries.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoControlledExecutionTrialStableKey([
                "storage-boundary",
                String(index),
                marker,
              ])}
              label="Storage boundary"
              value={marker}
              detail="frontend secret boundary remains hard"
            />
          ))}
        </div>
      </section>
    </section>
  );
}

function resolveJarvisVideoControlledExecutionTrialContext(
  props: JarvisVideoControlledExecutionTrialPanelProps
) {
  if (props.routeSlug !== undefined) {
    const model = buildJarvisVideoControlledExecutionTrialRouteModel(
      props.routeSlug
    );

    return {
      ...model,
      activePath: model.route.href,
      title: model.route.title,
      focus: model.route.focus,
    } as const;
  }

  const model = buildJarvisVideoControlledExecutionTrialWorkspaceModel(
    props.workspaceId
  );

  return {
    ...model,
    activePath: model.workspace.routeHref,
    title: "Jarvis Video Controlled Execution Trial Console",
    focus: model.sharedRecord.trialReadinessState,
    route: null,
  } as const;
}

function reviewCardGroupLabel(
  group: JarvisVideoControlledExecutionTrialReviewGroup
) {
  switch (group) {
    case "Console":
      return "Console review";
    case "References":
      return "Reference review";
    case "Guards":
      return "Guard review";
    case "Operations":
      return "Operations review";
  }
}

function ReviewLinkCard({
  card,
}: {
  card: JarvisVideoControlledExecutionTrialLinkRecord;
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
  reference: JarvisVideoControlledExecutionTrialMilestoneReference;
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
  card: JarvisVideoControlledExecutionTrialReviewCard;
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
  item: JarvisVideoControlledExecutionTrialChecklistItem;
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
  reference: JarvisVideoControlledExecutionTrialReferenceRecord;
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

function MissingPrerequisiteCard({
  item,
}: {
  item: JarvisVideoControlledExecutionTrialMissingPrerequisite;
}) {
  return (
    <Link className={styles.diagnosticLink} href={item.href}>
      <span>Backend prerequisite still missing</span>
      <strong>{item.label}</strong>
      <small>{item.summary}</small>
    </Link>
  );
}

function DecisionCard({
  decision,
}: {
  decision: JarvisVideoControlledExecutionTrialDecisionRecord;
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

export default JarvisVideoControlledExecutionTrialPanel;
