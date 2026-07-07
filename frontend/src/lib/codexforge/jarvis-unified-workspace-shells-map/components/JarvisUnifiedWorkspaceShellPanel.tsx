'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  buildJarvisUnifiedWorkspaceShellRouteModel,
  buildJarvisUnifiedWorkspaceShellStableKey,
  buildJarvisUnifiedWorkspaceShellWorkspaceModel,
  type JarvisUnifiedWorkspaceShellRouteSlug,
} from "../jarvis-unified-workspace-shells-model";
import type {
  JarvisUnifiedWorkspaceShellPanelDefinition,
} from "../jarvis-unified-workspace-shells-panels";
import type {
  JarvisUnifiedWorkspaceShellWorkspaceId,
  JarvisUnifiedWorkspaceShellWorkspaceRecord,
} from "../jarvis-unified-workspace-shells-workspaces";

type JarvisUnifiedWorkspaceShellPanelProps =
  | {
      workspaceId: JarvisUnifiedWorkspaceShellWorkspaceId;
      routeSlug?: never;
      embedded?: boolean;
    }
  | {
      routeSlug: JarvisUnifiedWorkspaceShellRouteSlug;
      workspaceId?: never;
      embedded?: boolean;
    };

export function JarvisUnifiedWorkspaceShellPageClientShell(
  props: JarvisUnifiedWorkspaceShellPanelProps
) {
  const context = resolveJarvisUnifiedWorkspaceShellContext(props);

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
      <JarvisUnifiedWorkspaceShellPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisUnifiedWorkspaceShellPanel(
  props: JarvisUnifiedWorkspaceShellPanelProps
) {
  const context = resolveJarvisUnifiedWorkspaceShellContext(props);
  const {
    displayMarkers,
    executionBlocks,
    storageBoundaries,
    panelDefinitions,
    relatedRoutes,
    routes,
    workspaces,
    workspace,
  } = context;
  const executionGuardrails = [...executionBlocks, ...storageBoundaries];
  const routeMetadata = context.route
    ? [...context.route.markerPhrases]
    : [workspace.routeHref, ...workspace.safetyNotes];
  const panelCards = panelDefinitions.filter(
    (panel) => panel.id !== "capability-grid"
  );

  return (
    <section
      className={props.embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-unified-workspace-shells={context.sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-unified-workspace-shells-focus={context.focus}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {context.route ? context.route.phase : "Jarvis Unified Workspace Shells"}
            </span>
            <span className={styles.safeBadge}>Jarvis unified workspace shells only</span>
            <span className={styles.blockedBadge}>disabled by default</span>
          </div>
          <h1 className={styles.heroTitle}>{context.title}</h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. This
            batch keeps one Jarvis command center, one shared workspace shell
            model, and one Jarvis brain with specialist workspaces while
            clearly showing that specialist pages are apps/workspaces inside
            Jarvis. {workspace.workspaceSummary} {workspace.parentControlPlaneSummary}
            {context.route ? " Current phase focus: " + context.focus + "." : ""}
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value={workspace.id === "jarvis-trading" ? "Paper review" : "Review only"}
              detail={workspace.executionPosture}
            />
            <MetricCard
              label="Domain"
              value={workspace.featureDomain}
              detail={workspace.shortLabel}
            />
            <MetricCard
              label="Risk"
              value={workspace.riskTier}
              detail="shared risk tier panel only"
            />
            <MetricCard
              label="Approval"
              value={workspace.approvalPosture}
              detail={workspace.operatorReviewPosture}
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis unified workspace shells preview"
        >
          <p className={styles.missionLabel}>
            3722-3753 - Jarvis Unified Workspace Shells
          </p>
          <p className={styles.missionDetail}>
            Jarvis unified workspace shells completion does not enable
            provider/render/export/publish/workers/trading/automation. Next
            likely batch: 3754-3785 - First Jarvis-Controlled Video Adapter
            Plug-in.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis unified workspace shell markers"
      >
        {displayMarkers.map((marker, index) => (
          <span
            key={buildJarvisUnifiedWorkspaceShellStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis specialist navigation">
        <PanelHeading
          eyebrow="Specialist navigation"
          title="One Jarvis brain with specialist workspaces"
          badge="specialist navigation review only"
        />
        <p className={styles.bodyText}>
          Jarvis command center owns the shared review posture while specialist
          pages stay flat, review-only workspace shells with no direct
          frontend execution.
        </p>
        <div className={styles.diagnosticGrid}>
          {workspaces.map((candidate) => (
            <a
              key={buildJarvisUnifiedWorkspaceShellStableKey([
                "workspace-link",
                candidate.id,
              ])}
              className={styles.diagnosticLink}
              href={candidate.routeHref}
            >
              <span>
                {candidate.id === workspace.id ? "Current workspace" : "Jarvis workspace"}
              </span>
              <strong>{candidate.label}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis capability grid">
        <PanelHeading
          eyebrow="Capability grid"
          title="Shared capability grid only"
          badge={context.focus === "shared capability grid only" ? "Phase focus" : "Shared"}
        />
        <p className={styles.bodyText}>
          Shared capability/status/risk/approval/audit/result/kill-switch
          panels remain consistent across all workspaces while each specialist
          page keeps only review posture and shell structure.
        </p>
        <div className={styles.blockedDeckGrid}>
          {workspace.primaryCapabilityIds.map((capabilityId, index) => (
            <button
              key={buildJarvisUnifiedWorkspaceShellStableKey([
                "capability",
                workspace.id,
                String(index),
                capabilityId,
              ])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{capabilityId}</strong>
              <span>{workspace.label}</span>
              <small>shared capability grid only</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis shared review panels">
        <PanelHeading
          eyebrow="Shared panels"
          title="Shared review panels stay consistent across every Jarvis workspace shell"
          badge={context.focus}
        />
        <div className={styles.diagnosticGrid}>
          {panelCards.map((panel) => (
            <PanelCard
              key={buildJarvisUnifiedWorkspaceShellStableKey([
                "panel-card",
                workspace.id,
                panel.id,
              ])}
              panel={panel}
              workspace={workspace}
              focused={context.focus === panel.marker}
            />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis execution guardrails">
        <PanelHeading
          eyebrow="Execution guardrails"
          title="Every live action remains blocked from the frontend shell foundation"
          badge="Hard blocked"
        />
        <div className={styles.contractGrid}>
          {executionGuardrails.map((item, index) => (
            <span
              key={buildJarvisUnifiedWorkspaceShellStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis workspace safety notes">
        <PanelHeading
          eyebrow="Workspace notes"
          title={workspace.label}
          badge={workspace.routeHref}
        />
        <div className={styles.contractGrid}>
          {workspace.safetyNotes.map((item, index) => (
            <span
              key={buildJarvisUnifiedWorkspaceShellStableKey([
                "workspace-note",
                workspace.id,
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Trading stays paper-review only and no real-money trading. Render and
          publish stay blocked. Website, avatar, chatbot, workflow, audit, and
          safety pages remain review-only specialist shells inside Jarvis.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis route metadata">
        <PanelHeading
          eyebrow="Technical metadata"
          title={context.route ? context.route.title : workspace.label}
          badge={context.route ? context.route.phase : "Primary workspace route"}
        />
        <p className={styles.bodyText}>{context.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisUnifiedWorkspaceShellStableKey([
                "route-metadata",
                workspace.id,
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

      <section className={styles.diagnosticPanel} aria-label="Jarvis unified workspace shell diagnostics">
        <PanelHeading
          eyebrow="Diagnostics"
          title="3722-3753 Jarvis unified workspace shell coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {relatedRoutes.map((route) => (
            <a
              key={buildJarvisUnifiedWorkspaceShellStableKey([
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
                  key={buildJarvisUnifiedWorkspaceShellStableKey([
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

function resolveJarvisUnifiedWorkspaceShellContext(
  props: JarvisUnifiedWorkspaceShellPanelProps
) {
  if (props.workspaceId !== undefined) {
    const model = buildJarvisUnifiedWorkspaceShellWorkspaceModel(props.workspaceId);

    return {
      activePath: model.workspace.routeHref,
      title: model.workspace.label,
      focus: model.workspace.safetyNotes[0] ?? "Jarvis unified workspace shells only",
      summary:
        model.workspace.workspaceSummary +
        " " +
        model.workspace.parentControlPlaneSummary,
      route: null,
      ...model,
    };
  }

  const model = buildJarvisUnifiedWorkspaceShellRouteModel(props.routeSlug);

  return {
    activePath: model.route.href,
    title: model.route.title,
    focus: model.route.focus,
    summary: model.route.summary,
    ...model,
  };
}

function resolvePanelValue(
  workspace: JarvisUnifiedWorkspaceShellWorkspaceRecord,
  panel: JarvisUnifiedWorkspaceShellPanelDefinition
) {
  switch (panel.id) {
    case "status-overview":
      return workspace.statusPosture;
    case "capability-grid":
      return workspace.primaryCapabilityIds.join(", ");
    case "planner":
      return workspace.plannerPosture;
    case "permission":
      return workspace.permissionPosture;
    case "approval":
      return workspace.approvalPosture;
    case "audit":
      return workspace.auditPosture;
    case "result-ledger":
      return workspace.resultLedgerPosture;
    case "memory-boundary":
      return workspace.memoryBoundaryPosture;
    case "kill-switch":
      return workspace.killSwitchPosture;
    case "blocked-action":
      return workspace.blockedActionPosture;
    case "dry-run":
      return workspace.dryRunPosture;
    case "adapter-status":
      return workspace.adapterStatusPosture;
    case "risk-tier":
      return workspace.riskTier;
    case "specialist-navigation":
      return "Review only";
    case "operator-review":
      return workspace.operatorReviewPosture;
    case "no-execution-guard":
      return "Execution blocked";
    case "regression-coverage":
      return "Review only";
    case "readiness":
      return "disabled by default";
    case "completion":
      return workspace.executionPosture;
    default:
      return workspace.executionPosture;
  }
}

function PanelCard({
  panel,
  workspace,
  focused,
}: {
  panel: JarvisUnifiedWorkspaceShellPanelDefinition;
  workspace: JarvisUnifiedWorkspaceShellWorkspaceRecord;
  focused: boolean;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{panel.label}</span>
      <strong className={styles.metricValue}>{resolvePanelValue(workspace, panel)}</strong>
      <span className={styles.metricDetail}>{panel.marker}</span>
      <span className={styles.metricDetail}>
        {focused ? "Current phase focus" : panel.badge}
      </span>
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
