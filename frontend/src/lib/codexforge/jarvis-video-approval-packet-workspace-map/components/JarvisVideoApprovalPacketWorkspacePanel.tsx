'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  JarvisUnifiedWorkspaceShellPanel,
} from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoApprovalPacketWorkspaceRouteModel,
  buildJarvisVideoApprovalPacketWorkspaceStableKey,
  buildJarvisVideoApprovalPacketWorkspaceWorkspaceModel,
  type JarvisVideoApprovalPacketWorkspaceId,
  type JarvisVideoApprovalPacketWorkspaceRouteSlug,
} from "../jarvis-video-approval-packet-workspace-model";
import type {
  JarvisVideoApprovalPacketWorkspaceReviewCard,
  JarvisVideoApprovalPacketWorkspaceReviewGroup,
} from "../jarvis-video-approval-packet-workspace-packet";

type JarvisVideoApprovalPacketWorkspacePanelProps =
  | {
      workspaceId: JarvisVideoApprovalPacketWorkspaceId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoApprovalPacketWorkspaceRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoApprovalPacketWorkspacePageClientShell(
  props: JarvisVideoApprovalPacketWorkspacePanelProps
) {
  const context = resolveJarvisVideoApprovalPacketWorkspaceContext(props);

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
      <JarvisVideoApprovalPacketWorkspacePanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoApprovalPacketWorkspacePanel(
  props: JarvisVideoApprovalPacketWorkspacePanelProps
) {
  const context = resolveJarvisVideoApprovalPacketWorkspaceContext(props);
  const {
    displayMarkers,
    executionBlocks,
    milestoneReferences,
    relatedRoutes,
    reviewCards,
    routes,
    sharedMarkers,
    sharedRecord,
    storageBoundaries,
    workspace,
  } = context;
  const executionGuardrails = [...executionBlocks, ...storageBoundaries];
  const routeMetadata = context.route
    ? [...context.route.markerPhrases]
    : [
        workspace.routeHref,
        sharedRecord.capabilityId,
        sharedRecord.selectedAdapterCandidate,
        sharedRecord.approvalPacketId,
        sharedRecord.dryRunReferenceLabel,
        sharedRecord.executionPosture,
      ];
  const integrationCards = reviewCards.filter(
    (card) => card.group === "Integration"
  );
  const milestoneCards = reviewCards.filter(
    (card) => card.group === "Milestones"
  );
  const approvalCards = reviewCards.filter((card) => card.group === "Approval");
  const envelopeCards = reviewCards.filter((card) => card.group === "Envelopes");
  const guardCards = reviewCards.filter((card) => card.group === "Guards");
  const outputCards = reviewCards.filter((card) => card.group === "Outputs");
  const operationCards = reviewCards.filter(
    (card) => card.group === "Operations"
  );

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-approval-packet-workspace={sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-video-approval-packet-focus={context.focus}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {context.route
                ? context.route.phase
                : "First Jarvis-Controlled Video Approval Packet Workspace"}
            </span>
            <span className={styles.safeBadge}>
              Jarvis-controlled video approval packet workspace only
            </span>
            <span className={styles.blockedBadge}>execution blocked</span>
          </div>
          <h1 className={styles.heroTitle}>{context.title}</h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. This
            batch connects the Jarvis-controlled dry-run workspace to a
            review-only approval packet workspace that shows the goal,
            capability, adapter candidate, dry-run reference, approval packet
            id, permission decision, approval decision, human approval gate,
            backend-only route, provider/credential/token references, redacted
            prompt preview, request/response/error envelopes, guard snapshot,
            cost/rate/timeout/duration/resolution/size guards, privacy/safety
            guards, result placeholder, artifact handoff placeholder,
            audit/result/status preview, kill switch, lock manager,
            idempotency, replay block, blocked action summary, and operator
            review posture before any future backend-owned video execution can
            occur. {workspace.workspaceSummary} {workspace.parentControlPlaneSummary}
            {context.route ? " Current phase focus: " + context.focus + "." : ""}
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Capability"
              value={sharedRecord.capabilityId}
              detail="video capability approval review only"
            />
            <MetricCard
              label="Dry run"
              value={sharedRecord.dryRunReferenceLabel}
              detail={sharedRecord.dryRunReferencePosture}
            />
            <MetricCard
              label="Packet"
              value={sharedRecord.approvalPacketId}
              detail={sharedRecord.approvalPacketReferencePosture}
            />
            <MetricCard
              label="Decision"
              value={sharedRecord.approvalDecision}
              detail={sharedRecord.humanApprovalGate}
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis video approval packet workspace preview"
        >
          <p className={styles.missionLabel}>
            3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace
          </p>
          <p className={styles.missionDetail}>
            Video approval packet workspace completion does not enable
            provider/render/export/publish/workers/trading/automation. Next
            likely batch: 3850-3881 - First Jarvis-Controlled Video Backend
            Execution Readiness.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis video approval packet workspace markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoApprovalPacketWorkspaceStableKey([
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
          title="The primary /jarvis-video workspace stays on the unified Jarvis shell"
          badge="/jarvis-video approval packet workspace remains review-only"
        />
        <p className={styles.bodyText}>
          This approval packet workspace keeps the unified Jarvis shell posture
          while layering dry-run prerequisites, approval packet posture,
          blocked actions, audit previews, and result placeholders over the
          video specialist surface.
        </p>
        <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet integration links"
      >
        <PanelHeading
          eyebrow="Integration links"
          title="The approval packet workspace stays connected to Jarvis control layers"
          badge="review-only links"
        />
        <div className={styles.diagnosticGrid}>
          {integrationCards.map((card) => (
            <ReviewLinkCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet milestone references"
      >
        <PanelHeading
          eyebrow="Milestone references"
          title="Backend-owned and Jarvis-owned video milestones remain inert review evidence"
          badge="reference only"
        />
        <p className={styles.bodyText}>
          These references remain static evidence only. This batch does not
          import, execute, or recreate those systems as providers, adapters,
          services, API routes, or runtime deploy paths.
        </p>
        <div className={styles.diagnosticGrid}>
          {milestoneCards.map((card) => (
            <ReviewLinkCard key={card.id} card={card} />
          ))}
        </div>
        <div className={styles.contractGrid}>
          {milestoneReferences.map((reference) => (
            <span
              key={buildJarvisVideoApprovalPacketWorkspaceStableKey([
                "milestone",
                reference.phaseRange,
              ])}
              className={styles.contractChip}
            >
              {reference.phaseRange} - {reference.title}
            </span>
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet review"
      >
        <PanelHeading
          eyebrow="Approval packet review"
          title="Goal, capability, adapter, dry-run, approval id, permission, approval, and human gate stay review-only"
          badge={context.focus}
        />
        <div className={styles.diagnosticGrid}>
          {approvalCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet posture review"
      >
        <PanelHeading
          eyebrow="Packet posture"
          title="Backend-only route, references, redaction, envelopes, and guard snapshot remain review-only"
          badge="Approval packet posture"
        />
        <div className={styles.diagnosticGrid}>
          {envelopeCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet guards"
      >
        <PanelHeading
          eyebrow="Guards"
          title="Cost, rate, timeout, duration, resolution, size, privacy, and safety posture stay static"
          badge="Guard review"
        />
        <div className={styles.diagnosticGrid}>
          {guardCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet previews"
      >
        <PanelHeading
          eyebrow="Previews"
          title="Result, artifact, audit, ledger, and status surfaces remain placeholders only"
          badge="Preview only"
        />
        <div className={styles.diagnosticGrid}>
          {outputCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis video approval packet safeguards"
      >
        <PanelHeading
          eyebrow="Safeguards"
          title="Kill switch, lock manager, idempotency, replay block, blocked action summary, and operator review remain required"
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
        aria-label="Jarvis video approval packet execution guardrails"
      >
        <PanelHeading
          eyebrow="Execution guardrails"
          title="No provider, render, export, publish, worker, tool, or runtime execution is enabled"
          badge="No execution"
        />
        <div className={styles.contractGrid}>
          {executionGuardrails.map((item, index) => (
            <span
              key={buildJarvisVideoApprovalPacketWorkspaceStableKey([
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
        aria-label="Jarvis video approval packet metadata"
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
              key={buildJarvisVideoApprovalPacketWorkspaceStableKey([
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
        aria-label="Jarvis video approval packet phase diagnostics"
      >
        <PanelHeading
          eyebrow="Diagnostics"
          title="3818-3849 video approval packet workspace coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {relatedRoutes.map((route) => (
            <a
              key={buildJarvisVideoApprovalPacketWorkspaceStableKey([
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
                  key={buildJarvisVideoApprovalPacketWorkspaceStableKey([
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

function resolveJarvisVideoApprovalPacketWorkspaceContext(
  props: JarvisVideoApprovalPacketWorkspacePanelProps
) {
  if (props.workspaceId !== undefined) {
    const model = buildJarvisVideoApprovalPacketWorkspaceWorkspaceModel(
      props.workspaceId
    );

    return {
      activePath: model.workspace.routeHref,
      title: model.workspace.label,
      focus: "/jarvis-video approval packet workspace remains review-only",
      summary:
        model.workspace.workspaceSummary +
        " " +
        model.workspace.parentControlPlaneSummary,
      route: null,
      ...model,
    };
  }

  const model = buildJarvisVideoApprovalPacketWorkspaceRouteModel(
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
  group: JarvisVideoApprovalPacketWorkspaceReviewGroup
) {
  switch (group) {
    case "Integration":
      return "Integration review";
    case "Milestones":
      return "Milestone reference";
    case "Approval":
      return "Approval review";
    case "Envelopes":
      return "Packet posture";
    case "Guards":
      return "Guard review";
    case "Outputs":
      return "Preview review";
    case "Operations":
      return "Operations review";
  }
}

function ReviewLinkCard({
  card,
}: {
  card: JarvisVideoApprovalPacketWorkspaceReviewCard;
}) {
  return (
    <a className={styles.diagnosticLink} href={card.href ?? "/jarvis-video"}>
      <span>{reviewCardGroupLabel(card.group)}</span>
      <strong>{card.label}</strong>
      <small>{card.marker}</small>
    </a>
  );
}

function ReviewMetricCard({
  card,
}: {
  card: JarvisVideoApprovalPacketWorkspaceReviewCard;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{card.label}</span>
      <strong className={styles.metricValue}>{card.posture}</strong>
      <span className={styles.metricDetail}>{card.marker}</span>
      <span className={styles.metricDetail}>{card.detail}</span>
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

export default JarvisVideoApprovalPacketWorkspacePanel;
