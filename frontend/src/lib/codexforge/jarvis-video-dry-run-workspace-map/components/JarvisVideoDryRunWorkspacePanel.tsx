'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  JarvisUnifiedWorkspaceShellPanel,
} from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoDryRunWorkspaceRouteModel,
  buildJarvisVideoDryRunWorkspaceStableKey,
  buildJarvisVideoDryRunWorkspaceWorkspaceModel,
  type JarvisVideoDryRunWorkspaceId,
  type JarvisVideoDryRunWorkspaceRouteSlug,
} from "../jarvis-video-dry-run-workspace-model";
import type {
  JarvisVideoDryRunWorkspaceReviewCard,
  JarvisVideoDryRunWorkspaceReviewGroup,
} from "../jarvis-video-dry-run-workspace-request";

type JarvisVideoDryRunWorkspacePanelProps =
  | {
      workspaceId: JarvisVideoDryRunWorkspaceId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoDryRunWorkspaceRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoDryRunWorkspacePageClientShell(
  props: JarvisVideoDryRunWorkspacePanelProps
) {
  const context = resolveJarvisVideoDryRunWorkspaceContext(props);

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
      <JarvisVideoDryRunWorkspacePanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoDryRunWorkspacePanel(
  props: JarvisVideoDryRunWorkspacePanelProps
) {
  const context = resolveJarvisVideoDryRunWorkspaceContext(props);
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
        sharedRecord.backendOnlyAdapterRoute,
        sharedRecord.executionPosture,
      ];
  const integrationCards = reviewCards.filter((card) => card.group === "Integration");
  const milestoneCards = reviewCards.filter((card) => card.group === "Milestones");
  const requestCards = reviewCards.filter((card) => card.group === "Request");
  const guardCards = reviewCards.filter((card) => card.group === "Guards");
  const outputCards = reviewCards.filter((card) => card.group === "Outputs");
  const operationCards = reviewCards.filter((card) => card.group === "Operations");

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-dry-run-workspace={sharedMarkers.join(" | ")}
      data-codexforge-jarvis-video-dry-run-focus={context.focus}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {context.route
                ? context.route.phase
                : "First Jarvis-Controlled Video Dry Run Workspace"}
            </span>
            <span className={styles.safeBadge}>
              Jarvis-controlled video dry-run workspace only
            </span>
            <span className={styles.blockedBadge}>execution blocked</span>
          </div>
          <h1 className={styles.heroTitle}>{context.title}</h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. This
            batch shows how Jarvis would prepare a video generation request
            before real execution while keeping the workspace, adapter route,
            permission decision, approval requirement, dry-run request
            envelope, provider/credential/token references, guards,
            placeholders, previews, kill switch, lock manager, idempotency,
            replay block, and operator review posture review-only, backend-only,
            and execution-blocked. {workspace.workspaceSummary}{" "}
            {workspace.parentControlPlaneSummary}
            {context.route ? " Current phase focus: " + context.focus + "." : ""}
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Capability"
              value={sharedRecord.capabilityId}
              detail="video capability selection review only"
            />
            <MetricCard
              label="Adapter"
              value={sharedRecord.selectedAdapterCandidate}
              detail={sharedRecord.backendOnlyAdapterRoute}
            />
            <MetricCard
              label="Permission"
              value={sharedRecord.permissionDecision}
              detail={sharedRecord.approvalRequirement}
            />
            <MetricCard
              label="Dry run"
              value={sharedRecord.dryRunStatus}
              detail={sharedRecord.dryRunRequirement}
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis video dry-run workspace preview"
        >
          <p className={styles.missionLabel}>
            3786-3817 - First Jarvis-Controlled Video Dry Run Workspace
          </p>
          <p className={styles.missionDetail}>
            Video dry-run workspace completion does not enable
            provider/render/export/publish/workers/trading/automation. Next
            likely batch: 3818-3849 - First Jarvis-Controlled Video Approval
            Packet Workspace.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis video dry-run workspace markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoDryRunWorkspaceStableKey([
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
          badge="/jarvis-video dry-run workspace remains review-only"
        />
        <p className={styles.bodyText}>
          This dry-run workspace keeps the unified Jarvis shell posture while
          layering review-only request preparation, approval posture, blocked
          actions, audit previews, and result placeholders over the video
          specialist surface.
        </p>
        <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run integration links">
        <PanelHeading
          eyebrow="Integration links"
          title="The dry-run workspace stays connected to Jarvis control layers"
          badge="review-only links"
        />
        <div className={styles.diagnosticGrid}>
          {integrationCards.map((card) => (
            <ReviewLinkCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run milestone references">
        <PanelHeading
          eyebrow="Milestone references"
          title="Backend-owned video milestones and the adapter plug-in remain inert review evidence"
          badge="reference only"
        />
        <p className={styles.bodyText}>
          These references remain static evidence only. This batch does not
          import, execute, or recreate those systems as providers, adapters,
          services, or runtime deploy paths.
        </p>
        <div className={styles.diagnosticGrid}>
          {milestoneCards.map((card) => (
            <ReviewLinkCard key={card.id} card={card} />
          ))}
        </div>
        <div className={styles.contractGrid}>
          {milestoneReferences.map((reference) => (
            <span
              key={buildJarvisVideoDryRunWorkspaceStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run request review">
        <PanelHeading
          eyebrow="Dry-run request"
          title="User goal, request envelope, redaction, and reference posture stay review-only"
          badge={context.focus}
        />
        <div className={styles.diagnosticGrid}>
          {requestCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run guards">
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

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run previews">
        <PanelHeading
          eyebrow="Previews"
          title="Result, artifact, audit, status, and memory surfaces remain placeholders only"
          badge="Preview only"
        />
        <div className={styles.diagnosticGrid}>
          {outputCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run safeguards">
        <PanelHeading
          eyebrow="Safeguards"
          title="Kill switch, lock manager, idempotency, replay block, and operator review remain required"
          badge="Hard blocked"
        />
        <div className={styles.diagnosticGrid}>
          {operationCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run execution guardrails">
        <PanelHeading
          eyebrow="Execution guardrails"
          title="No provider, render, export, publish, worker, tool, or runtime execution is enabled"
          badge="No execution"
        />
        <div className={styles.contractGrid}>
          {executionGuardrails.map((item, index) => (
            <span
              key={buildJarvisVideoDryRunWorkspaceStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis video dry-run metadata">
        <PanelHeading
          eyebrow="Technical metadata"
          title={context.route ? context.route.title : workspace.label}
          badge={context.route ? context.route.phase : "Primary workspace route"}
        />
        <p className={styles.bodyText}>{context.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisVideoDryRunWorkspaceStableKey([
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

      <section className={styles.diagnosticPanel} aria-label="Jarvis video dry-run phase diagnostics">
        <PanelHeading
          eyebrow="Diagnostics"
          title="3786-3817 video dry-run workspace coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {relatedRoutes.map((route) => (
            <a
              key={buildJarvisVideoDryRunWorkspaceStableKey([
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
                  key={buildJarvisVideoDryRunWorkspaceStableKey([
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

function resolveJarvisVideoDryRunWorkspaceContext(
  props: JarvisVideoDryRunWorkspacePanelProps
) {
  if (props.workspaceId !== undefined) {
    const model = buildJarvisVideoDryRunWorkspaceWorkspaceModel(props.workspaceId);

    return {
      activePath: model.workspace.routeHref,
      title: model.workspace.label,
      focus: "/jarvis-video dry-run workspace remains review-only",
      summary:
        model.workspace.workspaceSummary +
        " " +
        model.workspace.parentControlPlaneSummary,
      route: null,
      ...model,
    };
  }

  const model = buildJarvisVideoDryRunWorkspaceRouteModel(props.routeSlug);

  return {
    activePath: model.route.href,
    title: model.route.title,
    focus: model.route.focus,
    summary: model.route.summary,
    ...model,
  };
}

function reviewCardGroupLabel(group: JarvisVideoDryRunWorkspaceReviewGroup) {
  switch (group) {
    case "Integration":
      return "Integration review";
    case "Milestones":
      return "Milestone reference";
    case "Request":
      return "Request review";
    case "Guards":
      return "Guard review";
    case "Outputs":
      return "Preview review";
    case "Operations":
      return "Operations review";
  }
}

function ReviewLinkCard({ card }: { card: JarvisVideoDryRunWorkspaceReviewCard }) {
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
  card: JarvisVideoDryRunWorkspaceReviewCard;
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

export default JarvisVideoDryRunWorkspacePanel;
