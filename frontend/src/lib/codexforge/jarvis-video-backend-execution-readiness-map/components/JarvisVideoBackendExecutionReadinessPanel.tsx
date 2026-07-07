'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  JarvisUnifiedWorkspaceShellPanel,
} from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoBackendExecutionReadinessRouteModel,
  buildJarvisVideoBackendExecutionReadinessStableKey,
  buildJarvisVideoBackendExecutionReadinessWorkspaceModel,
  type JarvisVideoBackendExecutionReadinessId,
  type JarvisVideoBackendExecutionReadinessRouteSlug,
} from "../jarvis-video-backend-execution-readiness-model";
import type {
  JarvisVideoBackendExecutionReadinessChecklistItem,
  JarvisVideoBackendExecutionReadinessReviewCard,
  JarvisVideoBackendExecutionReadinessReviewGroup,
} from "../jarvis-video-backend-execution-readiness-gates";
import type {
  JarvisVideoBackendExecutionReadinessDashboardCard,
  JarvisVideoBackendExecutionReadinessLinkRecord,
  JarvisVideoBackendExecutionReadinessMilestoneReference,
} from "../jarvis-video-backend-execution-readiness-dashboard";

type JarvisVideoBackendExecutionReadinessPanelProps =
  | {
      workspaceId: JarvisVideoBackendExecutionReadinessId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoBackendExecutionReadinessRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoBackendExecutionReadinessPageClientShell(
  props: JarvisVideoBackendExecutionReadinessPanelProps
) {
  const context = resolveJarvisVideoBackendExecutionReadinessContext(props);

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
      <JarvisVideoBackendExecutionReadinessPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoBackendExecutionReadinessPanel(
  props: JarvisVideoBackendExecutionReadinessPanelProps
) {
  const context = resolveJarvisVideoBackendExecutionReadinessContext(props);
  const {
    blockedPostures,
    dashboardCards,
    dashboardStatus,
    displayMarkers,
    executionBlocks,
    milestoneReferences,
    preflightChecklist,
    relatedRoutes,
    reviewCards,
    routes,
    sharedMarkers,
    sharedRecord,
    storageBoundaries,
    systemLinks,
    workspace,
  } = context;
  const systemLinkCards = Object.values(systemLinks);
  const executionGuardrails = [
    ...blockedPostures,
    ...executionBlocks,
    ...storageBoundaries,
  ];
  const routeMetadata = context.route
    ? [...context.route.markerPhrases]
    : [
        workspace.routeHref,
        sharedRecord.capabilityId,
        sharedRecord.adapterId,
        sharedRecord.backendExecutionReadinessDashboardStatus,
        sharedRecord.executionPosture,
        sharedRecord.nextLikelyBatch,
      ];
  const boundaryCards = reviewCards.filter((card) => card.group === "Boundary");
  const referenceCards = reviewCards.filter(
    (card) => card.group === "References"
  );
  const envelopeCards = reviewCards.filter(
    (card) => card.group === "Envelopes"
  );
  const guardCards = reviewCards.filter((card) => card.group === "Guards");
  const operationCards = reviewCards.filter(
    (card) => card.group === "Operations"
  );

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-backend-execution-readiness={sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-video-backend-execution-readiness-focus={
        context.focus
      }
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {context.route
                ? context.route.phase
                : "First Jarvis-Controlled Video Backend Execution Readiness"}
            </span>
            <span className={styles.safeBadge}>
              Jarvis-controlled video backend execution readiness only
            </span>
            <span className={styles.blockedBadge}>execution blocked</span>
          </div>
          <h1 className={styles.heroTitle}>{context.title}</h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. This
            batch adds a premium backend execution readiness layer under the
            visible /jarvis-video studio experience so operators can review the
            backend-only contract, server runtime boundary, approved dry-run
            reference, approved approval packet reference, approved video
            adapter reference, provider runtime readiness, credential
            references, token redaction, request/response/error envelopes,
            prompt redaction, cost/rate/timeout/duration/resolution/size guard
            posture, privacy/safety gates, audit persistence, observability
            trace, result capture, artifact handoff, render/export/publish
            block, worker dispatch block, network egress block, kill switch,
            single-call lock, idempotency, replay block, and operator
            preflight checklist without enabling backend execution.{" "}
            {workspace.workspaceSummary} {workspace.parentControlPlaneSummary}
            {context.route ? " Current phase focus: " + context.focus + "." : ""}
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Dashboard"
              value={dashboardStatus.status}
              detail={dashboardStatus.reviewedTracks}
            />
            <MetricCard
              label="Contract"
              value={sharedRecord.backendOnlyContractReadiness}
              detail={sharedRecord.serverRuntimeBoundaryReadiness}
            />
            <MetricCard
              label="Approvals"
              value={sharedRecord.approvedApprovalPacketReferencePosture}
              detail={sharedRecord.operatorPreflightChecklistPosture}
            />
            <MetricCard
              label="Execution"
              value={sharedRecord.executionPosture}
              detail={sharedRecord.killSwitchPosture}
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis video backend execution readiness preview"
        >
          <p className={styles.missionLabel}>
            3882-3913 - First Jarvis-Controlled Video Backend Execution
            Readiness
          </p>
          <p className={styles.missionDetail}>
            Backend execution readiness completion does not enable
            provider/render/export/publish/workers/trading/automation. Next
            likely batch: 3914-3945 - First Jarvis-Controlled Video Controlled
            Execution Trial.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis video backend execution readiness markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoBackendExecutionReadinessStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis video workspace shell">
        <PanelHeading
          eyebrow="Jarvis workspace"
          title="The primary /jarvis-video workspace stays premium and review-only"
          badge="/jarvis-video backend execution readiness remains review-only"
        />
        <p className={styles.bodyText}>
          This readiness panel rides inside the upgraded video studio shell so
          the visible product experience stays clean while backend execution
          remains blocked behind review-only evidence.
        </p>
        <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness dashboard"
      >
        <PanelHeading
          eyebrow="Readiness dashboard"
          title="A premium review layer tracks prerequisites without enabling execution"
          badge="backend execution readiness dashboard only"
        />
        <p className={styles.bodyText}>{dashboardStatus.summary}</p>
        <div className={styles.diagnosticGrid}>
          {dashboardCards.map((card) => (
            <DashboardCardDisplay key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness links"
      >
        <PanelHeading
          eyebrow="Workspace links"
          title="The readiness panel stays anchored to Jarvis product surfaces"
          badge="review-only links"
        />
        <div className={styles.diagnosticGrid}>
          {systemLinkCards.map((card, index) => (
            <ReviewLinkCard
              key={buildJarvisVideoBackendExecutionReadinessStableKey([
                "system-link",
                String(index),
                card.label,
              ])}
              card={card}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness milestones"
      >
        <PanelHeading
          eyebrow="Milestone references"
          title="Backend-owned and Jarvis-owned video milestones remain inert review evidence"
          badge="reference only"
        />
        <p className={styles.bodyText}>
          These references remain static linkage only. This batch does not
          create live provider functions, services, API routes, worker paths,
          render paths, export paths, or publish paths.
        </p>
        <div className={styles.diagnosticGrid}>
          {milestoneReferences.map((reference) => (
            <MilestoneReferenceCard
              key={buildJarvisVideoBackendExecutionReadinessStableKey([
                "milestone-reference",
                reference.phaseRange,
              ])}
              reference={reference}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness boundaries"
      >
        <PanelHeading
          eyebrow="Boundaries"
          title="Contract, runtime, and prerequisite references stay explicit"
          badge={context.focus}
        />
        <div className={styles.diagnosticGrid}>
          {boundaryCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
          {referenceCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness envelopes"
      >
        <PanelHeading
          eyebrow="Envelope and redaction posture"
          title="Credentials, tokens, envelopes, and prompt posture remain review-only"
          badge="No secrets in frontend"
        />
        <div className={styles.diagnosticGrid}>
          {envelopeCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness guards"
      >
        <PanelHeading
          eyebrow="Guard posture"
          title="Guard rails stay mapped without creating execution"
          badge="Review only"
        />
        <div className={styles.diagnosticGrid}>
          {guardCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness controls"
      >
        <PanelHeading
          eyebrow="Control gates"
          title="Audit, observability, result capture, blocks, and locks remain required"
          badge="Hard blocked"
        />
        <div className={styles.diagnosticGrid}>
          {operationCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness checklist"
      >
        <PanelHeading
          eyebrow="Operator preflight"
          title="Readiness stops at a preflight checklist, not execution"
          badge="operator preflight checklist required"
        />
        <div className={styles.diagnosticGrid}>
          {preflightChecklist.map((item) => (
            <ChecklistCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness guardrails"
      >
        <PanelHeading
          eyebrow="Execution guardrails"
          title="No provider, network, render, export, publish, worker, tool, or storage execution is enabled"
          badge="No execution"
        />
        <div className={styles.contractGrid}>
          {executionGuardrails.map((item, index) => (
            <span
              key={buildJarvisVideoBackendExecutionReadinessStableKey([
                "guardrail",
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video backend execution readiness metadata"
      >
        <PanelHeading
          eyebrow="Technical metadata"
          title={context.route ? context.route.title : workspace.label}
          badge={context.route ? context.route.phase : "Primary workspace route"}
        />
        <p className={styles.bodyText}>{context.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisVideoBackendExecutionReadinessStableKey([
                "route-metadata",
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section
        className={styles.diagnosticPanel}
        aria-label="Jarvis video backend execution readiness phase diagnostics"
      >
        <PanelHeading
          eyebrow="Diagnostics"
          title="3882-3913 backend execution readiness coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {relatedRoutes.map((route) => (
            <a
              key={buildJarvisVideoBackendExecutionReadinessStableKey([
                "related-route",
                route.slug,
              ])}
              className={styles.diagnosticLink}
              href={route.href}
            >
              <span>{route.phase}</span>
              <strong>{route.title}</strong>
            </a>
          ))}
          {relatedRoutes.length === 0
            ? routes.map((route) => (
                <a
                  key={buildJarvisVideoBackendExecutionReadinessStableKey([
                    "route",
                    route.slug,
                  ])}
                  className={styles.diagnosticLink}
                  href={route.href}
                >
                  <span>{route.phase}</span>
                  <strong>{route.title}</strong>
                </a>
              ))
            : null}
        </div>
      </section>
    </section>
  );
}

function resolveJarvisVideoBackendExecutionReadinessContext(
  props: JarvisVideoBackendExecutionReadinessPanelProps
) {
  if (props.workspaceId !== undefined) {
    const model = buildJarvisVideoBackendExecutionReadinessWorkspaceModel(
      props.workspaceId
    );

    return {
      activePath: model.workspace.routeHref,
      title: model.workspace.label,
      focus: "/jarvis-video backend execution readiness remains review-only",
      summary:
        model.workspace.workspaceSummary +
        " " +
        model.workspace.parentControlPlaneSummary,
      route: null,
      ...model,
    };
  }

  const model = buildJarvisVideoBackendExecutionReadinessRouteModel(
    props.routeSlug
  );

  return {
    activePath: model.route.href,
    title: model.route.title,
    focus: model.route.focus,
    summary: model.route.summary,
    ...model,
  };
}

function reviewCardGroupLabel(
  group: JarvisVideoBackendExecutionReadinessReviewGroup
) {
  switch (group) {
    case "Boundary":
      return "Boundary review";
    case "References":
      return "Reference review";
    case "Envelopes":
      return "Envelope review";
    case "Guards":
      return "Guard review";
    case "Operations":
      return "Operations review";
  }
}

function ReviewLinkCard({
  card,
}: {
  card: JarvisVideoBackendExecutionReadinessLinkRecord;
}) {
  return (
    <a className={styles.diagnosticLink} href={card.href}>
      <span>{card.posture}</span>
      <strong>{card.label}</strong>
      <small>{card.marker}</small>
    </a>
  );
}

function MilestoneReferenceCard({
  reference,
}: {
  reference: JarvisVideoBackendExecutionReadinessMilestoneReference;
}) {
  return (
    <a className={styles.diagnosticLink} href={reference.href}>
      <span>{reference.phaseRange}</span>
      <strong>{reference.title}</strong>
      <small>{reference.marker}</small>
    </a>
  );
}

function ReviewMetricCard({
  card,
}: {
  card: JarvisVideoBackendExecutionReadinessReviewCard;
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

function DashboardCardDisplay({
  card,
}: {
  card: JarvisVideoBackendExecutionReadinessDashboardCard;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{card.label}</span>
      <strong className={styles.metricValue}>{card.value}</strong>
      <span className={styles.metricDetail}>{card.marker}</span>
      <span className={styles.metricDetail}>{card.detail}</span>
    </article>
  );
}

function ChecklistCard({
  item,
}: {
  item: JarvisVideoBackendExecutionReadinessChecklistItem;
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

export default JarvisVideoBackendExecutionReadinessPanel;
