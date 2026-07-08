'use client';

import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  JarvisUnifiedWorkspaceShellPanel,
} from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoBackendTrialRunnerContractRouteModel,
  buildJarvisVideoBackendTrialRunnerContractStableKey,
  buildJarvisVideoBackendTrialRunnerContractWorkspaceModel,
  type JarvisVideoBackendTrialRunnerContractId,
  type JarvisVideoBackendTrialRunnerContractRouteSlug,
} from "../jarvis-video-backend-trial-runner-contract-model";
import type {
  JarvisVideoBackendTrialRunnerContractChecklistItem,
  JarvisVideoBackendTrialRunnerContractDecisionRecord,
  JarvisVideoBackendTrialRunnerContractReviewCard,
  JarvisVideoBackendTrialRunnerContractReviewGroup,
} from "../jarvis-video-backend-trial-runner-contract-gates";
import type {
  JarvisVideoBackendTrialRunnerContractLinkRecord,
  JarvisVideoBackendTrialRunnerContractMilestoneReference,
  JarvisVideoBackendTrialRunnerContractReferenceRecord,
} from "../jarvis-video-backend-trial-runner-contract-packet";

type JarvisVideoBackendTrialRunnerContractPanelProps =
  | {
      workspaceId: JarvisVideoBackendTrialRunnerContractId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoBackendTrialRunnerContractRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoBackendTrialRunnerContractPageClientShell(
  props: JarvisVideoBackendTrialRunnerContractPanelProps
) {
  const context = resolveJarvisVideoBackendTrialRunnerContractContext(props);

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
      <JarvisVideoBackendTrialRunnerContractPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoBackendTrialRunnerContractPanel(
  props: JarvisVideoBackendTrialRunnerContractPanelProps
) {
  const context = resolveJarvisVideoBackendTrialRunnerContractContext(props);
  const {
    blockedPostures,
    disabledRunnerLane,
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
  const draftCards = reviewCards.filter((card) => card.group === "Draft");
  const envelopeCards = reviewCards.filter((card) => card.group === "Envelope");
  const controlCards = reviewCards.filter((card) => card.group === "Control");
  const guardCards = reviewCards.filter((card) => card.group === "Guard");
  const recoveryCards = reviewCards.filter((card) => card.group === "Recovery");

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-backend-trial-runner-contract={sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-video-backend-trial-runner-contract-focus={
        context.focus
      }
    >
      {props.embedded ? (
        <section
          className={styles.glassPanel}
          aria-label="Backend trial runner contract"
        >
          <PanelHeading
            eyebrow="Backend Trial Runner Contract"
            title="The next backend-owned runner packet is drafted without enabling execution"
            badge={sharedRecord.runnerContractStatus}
          />
          <p className={styles.bodyText}>
            Jarvis is the operating system / top-level control plane. This
            premium section keeps the visible /jarvis-video studio product-like
            while the future backend-owned runner remains blocked. Backend-owned
            runner required. Execution lane locked. No frontend execution. No
            provider call from frontend. Operator approval required.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Contract"
              value={sharedRecord.runnerContractStatus}
              detail={sharedRecord.readinessPosture}
            />
            <MetricCard
              label="Owner"
              value={sharedRecord.backendOwnerRequirement}
              detail={sharedRecord.operatorApprovalRequirement}
            />
            <MetricCard
              label="Lane"
              value={sharedRecord.executionPosture}
              detail={disabledRunnerLane.posture}
            />
            <MetricCard
              label="Next action"
              value="4010-4041"
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
                  : "First Jarvis-Controlled Video Backend Trial Runner Contract"}
              </span>
              <span className={styles.safeBadge}>
                Jarvis-controlled video backend trial runner contract only
              </span>
              <span className={styles.blockedBadge}>execution blocked</span>
            </div>
            <h1 className={styles.heroTitle}>{context.title}</h1>
            <p className={styles.heroLead}>
              Jarvis is the operating system / top-level control plane. This
              batch adds the backend-owned trial runner contract surface under
              the visible /jarvis-video studio so operators can review runner
              interface, input and output and error envelopes, job lease, queue
              admission, worker isolation, provider adapter handoff, approval
              and audit join, credential and token boundary, network egress,
              timeout and retry and fallback policy, cost and rate and duration
              and resolution and size guard posture, privacy and safety gates,
              kill switch and lock and idempotency and replay block, result
              capture, artifact handoff, recovery, disabled runner lane, and
              next action without enabling runner creation or execution. Runner
              contract drafted. Backend-owned runner required. Execution lane
              locked. No frontend execution. No provider call from frontend.
              Operator approval required. {workspace.workspaceSummary}{" "}
              {workspace.parentControlPlaneSummary}
              {context.route ? " Current phase focus: " + context.focus + "." : ""}
            </p>
            <div className={styles.heroMetricGrid}>
              <MetricCard
                label="Status"
                value={sharedRecord.runnerContractStatus}
                detail={sharedRecord.executionPosture}
              />
              <MetricCard
                label="Owner"
                value={sharedRecord.backendOwnerRequirement}
                detail={sharedRecord.operatorApprovalRequirement}
              />
              <MetricCard
                label="Boundary"
                value={sharedRecord.frontendExecutionBoundary}
                detail={sharedRecord.providerCallBoundary}
              />
              <MetricCard
                label="Next likely batch"
                value="4010-4041"
                detail={sharedRecord.nextLikelyBatch}
              />
            </div>
          </div>
          <div
            className={styles.missionPreview}
            aria-label="Jarvis video backend trial runner contract preview"
          >
            <p className={styles.missionLabel}>
              3978-4009 - First Jarvis-Controlled Video Backend Trial Runner
              Contract
            </p>
            <p className={styles.missionDetail}>
              Runner contract drafted. Backend-owned runner required. Execution
              lane locked. No frontend execution. No provider call from
              frontend. Next likely batch: 4010-4041 - First Jarvis-Controlled
              Video Trial Result Review and Recovery.
            </p>
          </div>
        </header>
      )}

      <section
        className={styles.markerBand}
        aria-label="Jarvis video backend trial runner contract markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoBackendTrialRunnerContractStableKey([
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
            badge="/jarvis-video backend trial runner remains review-only"
          />
          <p className={styles.bodyText}>
            This runner contract panel rides inside the God-tier video studio
            shell so the visible product path stays strong while execution
            remains blocked behind backend-owned contract review only.
          </p>
          <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
        </section>
      ) : null}

      <section className={styles.glassPanel} aria-label="Runner contract draft">
        <PanelHeading
          eyebrow="Runner contract draft"
          title="Status, ownership, and linkage stay visible in one premium review lane"
          badge={sharedRecord.runnerContractStatus}
        />
        <div className={styles.diagnosticGrid}>
          {draftCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.controlledTrialLink} />
          <ReferenceCard reference={packetRecord.productIaLink} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Runner envelopes">
        <PanelHeading
          eyebrow="Runner envelopes"
          title="Interface, input, output, and error packets stay typed and review-only"
          badge={sharedRecord.runnerInterface}
        />
        <div className={styles.diagnosticGrid}>
          {envelopeCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.runnerInterface} />
          <ReferenceCard reference={packetRecord.runnerInputEnvelope} />
          <ReferenceCard reference={packetRecord.runnerOutputEnvelope} />
          <ReferenceCard reference={packetRecord.runnerErrorEnvelope} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Backend handoff contract">
        <PanelHeading
          eyebrow="Backend handoff contract"
          title="Lease, queue, worker, adapter, approval, audit, credential, token, and network posture stay backend-owned"
          badge={sharedRecord.backendOwnerRequirement}
        />
        <div className={styles.diagnosticGrid}>
          {controlCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.jobLeaseContract} />
          <ReferenceCard reference={packetRecord.queueAdmissionContract} />
          <ReferenceCard reference={packetRecord.workerIsolationContract} />
          <ReferenceCard reference={packetRecord.providerAdapterHandoff} />
          <ReferenceCard reference={packetRecord.approvalJoin} />
          <ReferenceCard reference={packetRecord.auditJoin} />
          <ReferenceCard reference={packetRecord.credentialReferenceBoundary} />
          <ReferenceCard reference={packetRecord.tokenRedactionBoundary} />
          <ReferenceCard reference={packetRecord.networkEgressPolicy} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Runner guard posture">
        <PanelHeading
          eyebrow="Runner guard posture"
          title="Policy, budget, privacy, safety, and replay posture stay visible without runtime execution"
          badge={sharedRecord.executionPosture}
        />
        <div className={styles.diagnosticGrid}>
          {guardCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.timeoutPolicy} />
          <ReferenceCard reference={packetRecord.retryPolicy} />
          <ReferenceCard reference={packetRecord.fallbackPolicy} />
          <ReferenceCard reference={packetRecord.costGuard} />
          <ReferenceCard reference={packetRecord.rateGuard} />
          <ReferenceCard reference={packetRecord.durationGuard} />
          <ReferenceCard reference={packetRecord.resolutionGuard} />
          <ReferenceCard reference={packetRecord.sizeGuard} />
          <ReferenceCard reference={packetRecord.privacyGate} />
          <ReferenceCard reference={packetRecord.safetyGate} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Result and recovery contract">
        <PanelHeading
          eyebrow="Result and recovery contract"
          title="Result, artifact, recovery, disabled lane, operator review, and next action stay explicit"
          badge={nextAction.posture}
        />
        <div className={styles.diagnosticGrid}>
          {recoveryCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          <ReferenceCard reference={packetRecord.resultCaptureContract} />
          <ReferenceCard reference={packetRecord.artifactHandoffContract} />
          <ReferenceCard reference={packetRecord.recoveryContract} />
          <DecisionCard decision={disabledRunnerLane} />
          <DecisionCard decision={operatorReview} />
          <DecisionCard decision={nextAction} />
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Operator review checklist">
        <PanelHeading
          eyebrow="Operator review checklist"
          title="The draft stays ready for review without pretending a backend runner exists"
          badge={sharedRecord.operatorReviewPosture}
        />
        <div className={styles.diagnosticGrid}>
          {operatorChecklist.map((item) => (
            <ChecklistCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Workspace links">
        <PanelHeading
          eyebrow="Workspace links"
          title="The runner contract stays anchored to the controlled trial, product shell, audit, and safety surfaces"
          badge="review-only links"
        />
        <div className={styles.diagnosticGrid}>
          {reviewLinks.map((card, index) => (
            <ReviewLinkCard
              key={buildJarvisVideoBackendTrialRunnerContractStableKey([
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
              key={buildJarvisVideoBackendTrialRunnerContractStableKey([
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
          title="Provider, network, queue, worker, runtime, storage, and trading execution remain blocked"
          badge="blocked posture"
        />
        <div className={styles.diagnosticGrid}>
          {blockedPostures.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoBackendTrialRunnerContractStableKey([
                "blocked-posture",
                String(index),
                marker,
              ])}
              label="Blocked posture"
              value={marker}
              detail="backend trial runner contract only"
            />
          ))}
          {executionBlocks.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoBackendTrialRunnerContractStableKey([
                "execution-block",
                String(index),
                marker,
              ])}
              label="Execution block"
              value={marker}
              detail="backend-owned runner required"
            />
          ))}
          {storageBoundaries.map((marker, index) => (
            <MetricCard
              key={buildJarvisVideoBackendTrialRunnerContractStableKey([
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

function resolveJarvisVideoBackendTrialRunnerContractContext(
  props: JarvisVideoBackendTrialRunnerContractPanelProps
) {
  if (props.routeSlug !== undefined) {
    const model = buildJarvisVideoBackendTrialRunnerContractRouteModel(
      props.routeSlug
    );

    return {
      ...model,
      activePath: model.route.href,
      title: model.route.title,
      focus: model.route.focus,
    } as const;
  }

  const model = buildJarvisVideoBackendTrialRunnerContractWorkspaceModel(
    props.workspaceId
  );

  return {
    ...model,
    activePath: model.workspace.routeHref,
    title: "Jarvis Video Backend Trial Runner Contract",
    focus: model.sharedRecord.runnerContractStatus,
    route: null,
  } as const;
}

function reviewCardGroupLabel(
  group: JarvisVideoBackendTrialRunnerContractReviewGroup
) {
  switch (group) {
    case "Draft":
      return "Draft review";
    case "Envelope":
      return "Envelope review";
    case "Control":
      return "Control review";
    case "Guard":
      return "Guard review";
    case "Recovery":
      return "Recovery review";
  }
}

function ReviewLinkCard({
  card,
}: {
  card: JarvisVideoBackendTrialRunnerContractLinkRecord;
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
  reference: JarvisVideoBackendTrialRunnerContractMilestoneReference;
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
  card: JarvisVideoBackendTrialRunnerContractReviewCard;
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
  item: JarvisVideoBackendTrialRunnerContractChecklistItem;
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
  reference: JarvisVideoBackendTrialRunnerContractReferenceRecord;
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
  decision: JarvisVideoBackendTrialRunnerContractDecisionRecord;
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

export default JarvisVideoBackendTrialRunnerContractPanel;
