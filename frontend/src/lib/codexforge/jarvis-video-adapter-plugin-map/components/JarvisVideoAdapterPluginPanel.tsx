'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  JarvisUnifiedWorkspaceShellPanel,
} from "../../jarvis-unified-workspace-shells-map/components";
import {
  buildJarvisVideoAdapterPluginRouteModel,
  buildJarvisVideoAdapterPluginStableKey,
  buildJarvisVideoAdapterPluginWorkspaceModel,
  type JarvisVideoAdapterPluginRouteSlug,
  type JarvisVideoAdapterPluginWorkspaceId,
} from "../jarvis-video-adapter-plugin-model";
import type {
  JarvisVideoAdapterPluginReviewCard,
  JarvisVideoAdapterPluginReviewGroup,
} from "../jarvis-video-adapter-plugin-readiness";

type JarvisVideoAdapterPluginPanelProps =
  | {
      workspaceId: JarvisVideoAdapterPluginWorkspaceId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisVideoAdapterPluginRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisVideoAdapterPluginPageClientShell(
  props: JarvisVideoAdapterPluginPanelProps
) {
  const context = resolveJarvisVideoAdapterPluginContext(props);

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
      <JarvisVideoAdapterPluginPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisVideoAdapterPluginPanel(
  props: JarvisVideoAdapterPluginPanelProps
) {
  const context = resolveJarvisVideoAdapterPluginContext(props);
  const {
    displayMarkers,
    executionBlocks,
    storageBoundaries,
    milestoneReferences,
    relatedRoutes,
    reviewCards,
    routes,
    sharedMarkers,
    sharedRecords,
    systemLinks,
    workspace,
  } = context;
  const executionGuardrails = [...executionBlocks, ...storageBoundaries];
  const routeMetadata = context.route
    ? [...context.route.markerPhrases]
    : [
        workspace.routeHref,
        systemLinks.capabilityRegistrationLink.marker,
        systemLinks.workspaceLink.marker,
        systemLinks.sharedBackendAdapterContractLink.marker,
        systemLinks.permissionPolicyLink.marker,
        systemLinks.taskPlannerRouteLink.marker,
        systemLinks.auditStatusLink.marker,
      ];
  const integrationCards = reviewCards.filter((card) => card.group === "Integration");
  const milestoneCards = reviewCards.filter((card) => card.group === "Milestones");
  const reviewSurfaceCards = reviewCards.filter((card) => card.group === "Reviews");
  const guardrailCards = reviewCards.filter((card) => card.group === "Guardrails");

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-video-adapter-plugin={sharedMarkers.join(" | ")}
      data-codexforge-jarvis-video-adapter-plugin-focus={context.focus}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {context.route
                ? context.route.phase
                : "First Jarvis-Controlled Video Adapter Plug-in"}
            </span>
            <span className={styles.safeBadge}>
              Jarvis-controlled video adapter plug-in only
            </span>
            <span className={styles.blockedBadge}>execution blocked</span>
          </div>
          <h1 className={styles.heroTitle}>{context.title}</h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. This
            batch makes video the first specialist adapter plug-in connected to
            Jarvis while keeping the workspace, contract, permission, planner,
            audit, dry-run, approval, and readiness references review-only,
            approval-gated, backend-only, and execution-blocked.{" "}
            {workspace.workspaceSummary} {workspace.parentControlPlaneSummary}
            {context.route ? " Current phase focus: " + context.focus + "." : ""}
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Capability"
              value={sharedRecords.capabilityId}
              detail={systemLinks.capabilityRegistrationLink.marker}
            />
            <MetricCard
              label="Approval"
              value={sharedRecords.permissionPosture}
              detail="dry-run required before execution"
            />
            <MetricCard
              label="Planner"
              value="video route candidate"
              detail={sharedRecords.plannedRouteTarget}
            />
            <MetricCard
              label="Adapter"
              value={sharedRecords.adapterStatus}
              detail={sharedRecords.executionPosture}
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis video adapter plug-in preview"
        >
          <p className={styles.missionLabel}>
            3754-3785 - First Jarvis-Controlled Video Adapter Plug-in
          </p>
          <p className={styles.missionDetail}>
            Video adapter plugin completion does not enable
            provider/render/export/publish/workers/trading/automation. Next
            likely batch: 3786-3817 - First Jarvis-Controlled Video Dry Run
            Workspace.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis video adapter plug-in markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisVideoAdapterPluginStableKey([
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
          title="Video workspace plugs into Jarvis control plane"
          badge="/jarvis-video workspace remains review-only"
        />
        <p className={styles.bodyText}>
          The primary /jarvis-video workspace stays on the unified Jarvis shell
          while adding static adapter posture, dry-run posture, approval
          posture, blocked action posture, and result placeholder posture.
        </p>
        <JarvisUnifiedWorkspaceShellPanel workspaceId="jarvis-video" embedded />
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video adapter integration links">
        <PanelHeading
          eyebrow="Integration links"
          title="Video plugs into the shared Jarvis control layers"
          badge="review-only links"
        />
        <div className={styles.diagnosticGrid}>
          {integrationCards.map((card) => (
            <ReviewLinkCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video milestone references">
        <PanelHeading
          eyebrow="Milestone references"
          title="Backend-owned video readiness stays linked as inert review evidence"
          badge="reference only"
        />
        <p className={styles.bodyText}>
          The four backend-owned video milestones are visible here strictly as
          static references. This batch does not import, execute, or recreate
          those systems as live adapters.
        </p>
        <div className={styles.diagnosticGrid}>
          {milestoneCards.map((card) => (
            <ReviewLinkCard key={card.id} card={card} />
          ))}
        </div>
        <div className={styles.contractGrid}>
          {milestoneReferences.map((reference) => (
            <span
              key={buildJarvisVideoAdapterPluginStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis video adapter review surfaces">
        <PanelHeading
          eyebrow="Review surfaces"
          title="Envelope, redaction, guard, cost, sizing, and safety posture stay static"
          badge={context.focus}
        />
        <div className={styles.diagnosticGrid}>
          {reviewSurfaceCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video adapter guardrails">
        <PanelHeading
          eyebrow="Guardrails"
          title="Result placeholders and execution safeguards remain shared and enforced"
          badge="Hard blocked"
        />
        <div className={styles.diagnosticGrid}>
          {guardrailCards.map((card) => (
            <ReviewMetricCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis video execution guardrails">
        <PanelHeading
          eyebrow="Execution guardrails"
          title="No live provider, render, export, publish, worker, or runtime execution is enabled"
          badge="No execution"
        />
        <div className={styles.contractGrid}>
          {executionGuardrails.map((item, index) => (
            <span
              key={buildJarvisVideoAdapterPluginStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis video adapter metadata">
        <PanelHeading
          eyebrow="Technical metadata"
          title={context.route ? context.route.title : workspace.label}
          badge={context.route ? context.route.phase : "Primary workspace route"}
        />
        <p className={styles.bodyText}>{context.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisVideoAdapterPluginStableKey([
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

      <section className={styles.diagnosticPanel} aria-label="Jarvis video adapter phase diagnostics">
        <PanelHeading
          eyebrow="Diagnostics"
          title="3754-3785 video adapter plug-in coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {relatedRoutes.map((route) => (
            <a
              key={buildJarvisVideoAdapterPluginStableKey([
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
                  key={buildJarvisVideoAdapterPluginStableKey([
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

function resolveJarvisVideoAdapterPluginContext(
  props: JarvisVideoAdapterPluginPanelProps
) {
  if (props.workspaceId !== undefined) {
    const model = buildJarvisVideoAdapterPluginWorkspaceModel(props.workspaceId);

    return {
      activePath: model.workspace.routeHref,
      title: model.workspace.label,
      focus: "/jarvis-video workspace remains review-only",
      summary:
        model.workspace.workspaceSummary +
        " " +
        model.workspace.parentControlPlaneSummary,
      route: null,
      ...model,
    };
  }

  const model = buildJarvisVideoAdapterPluginRouteModel(props.routeSlug);

  return {
    activePath: model.route.href,
    title: model.route.title,
    focus: model.route.focus,
    summary: model.route.summary,
    ...model,
  };
}

function reviewCardGroupLabel(group: JarvisVideoAdapterPluginReviewGroup) {
  switch (group) {
    case "Integration":
      return "Integration review";
    case "Milestones":
      return "Milestone reference";
    case "Reviews":
      return "Policy review";
    case "Guardrails":
      return "Guardrail review";
  }
}

function ReviewLinkCard({ card }: { card: JarvisVideoAdapterPluginReviewCard }) {
  return (
    <a className={styles.diagnosticLink} href={card.href ?? "/jarvis-video"}>
      <span>{reviewCardGroupLabel(card.group)}</span>
      <strong>{card.label}</strong>
      <small>{card.marker}</small>
    </a>
  );
}

function ReviewMetricCard({ card }: { card: JarvisVideoAdapterPluginReviewCard }) {
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

export default JarvisVideoAdapterPluginPanel;
