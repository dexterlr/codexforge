"use client";

import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildJarvisUnifiedProductIaRouteModel,
  buildJarvisUnifiedProductIaSurfaceModel,
  type JarvisUnifiedProductIaRouteSlug,
} from "../jarvis-unified-product-ia-model";
import {
  JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID,
  JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER,
  getJarvisUnifiedProductSurface,
  type JarvisUnifiedProductPrimaryNavigationHref,
  type JarvisUnifiedProductPrimarySurfaceId,
} from "../jarvis-unified-product-ia-content";
import type { JarvisUnifiedProductWorkspaceRecord } from "../jarvis-unified-product-ia-workspaces";
import { JarvisApprovalReadinessSummary } from "./JarvisApprovalReadinessSummary";
import { JarvisBlockedActionSummary } from "./JarvisBlockedActionSummary";
import { JarvisDeveloperDiagnosticsDock } from "./JarvisDeveloperDiagnosticsDock";
import { JarvisNextActionRail } from "./JarvisNextActionRail";
import { JarvisProductHero } from "./JarvisProductHero";
import { JarvisVideoBackendTrialRunnerContractPanel } from "../../jarvis-video-backend-trial-runner-contract-map/components";
import { JarvisVideoControlledExecutionTrialPanel } from "../../jarvis-video-controlled-execution-trial-map/components";
import { JarvisVideoTrialResultReviewRecoveryPanel } from "../../jarvis-video-trial-result-review-recovery-map/components";
import { JarvisWorkspaceGrid } from "./JarvisWorkspaceGrid";
import { JarvisWorkspacePlaceholder } from "./JarvisWorkspacePlaceholder";
import styles from "./JarvisUnifiedProductShell.module.css";

type JarvisUnifiedProductShellProps =
  | {
      surfaceId: JarvisUnifiedProductPrimarySurfaceId;
      routeSlug?: never;
    }
  | {
      routeSlug: JarvisUnifiedProductIaRouteSlug;
      surfaceId?: never;
    };

export function JarvisUnifiedProductPageClientShell(
  props: JarvisUnifiedProductShellProps
) {
  const context = resolveJarvisUnifiedProductContext(props);

  return (
    <CodexForgeAppShell
      activePath={context.activePath}
      workspaceLabel={context.surface.label}
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisUnifiedProductPanel {...props} />
    </CodexForgeAppShell>
  );
}

export function JarvisUnifiedProductPhasePanel({
  routeSlug,
}: {
  routeSlug: JarvisUnifiedProductIaRouteSlug;
}) {
  return <JarvisUnifiedProductPanel routeSlug={routeSlug} />;
}

export function JarvisUnifiedProductPanel(
  props: JarvisUnifiedProductShellProps
) {
  const context = resolveJarvisUnifiedProductContext(props);
  const workspace =
    context.surface.id !== "home" &&
    context.surface.id !== "codexforge-cockpit" &&
    context.surface.id !== "jarvis"
      ? context.workspaces.find(
          (candidate) => candidate.routeHref === context.surface.routeHref
        ) ?? context.workspaces[0]
      : null;

  return (
    <section
      className={styles.shell}
      data-codexforge-jarvis-unified-product-ia={context.batchMarkers.join(" | ")}
      data-codexforge-jarvis-unified-product-ia-focus={context.focus}
    >
      <JarvisProductHero
        eyebrow={context.surface.eyebrow}
        badge={context.surface.badge}
        title={context.route ? context.route.title : context.surface.title}
        summary={context.route ? context.route.summary : context.surface.summary}
        phaseLabel={context.route ? context.route.phase : "Jarvis unified product IA"}
        isPhaseRoute={Boolean(context.route)}
        metrics={context.surface.heroMetrics}
        navigationCards={context.primaryNavigationCards}
      />

      {context.surface.sectionOrder.includes("current-focus") ? (
        <section className={styles.panel} aria-label="Current focus">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Current focus</p>
              <h2 className={styles.panelTitle}>Platform focus stays product-first</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              normal user path is primary
            </span>
          </div>
          <p className={styles.panelBody}>{context.surface.currentFocus}</p>
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("capability-grid") ? (
        <section className={styles.panel} aria-label="Capability grid">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Capability grid</p>
              <h2 className={styles.panelTitle}>What Jarvis can review now</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Jarvis command center order upgraded
            </span>
          </div>
          <div className={styles.capabilityGrid}>
            {JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID.map((capability) => (
              <Link
                key={capability.id}
                className={styles.capabilityCard}
                href={capability.routeHref}
              >
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Capability</p>
                    <h3 className={styles.placeholderTitle}>{capability.label}</h3>
                  </div>
                  <span
                    className={`${styles.panelBadge} ${
                      capability.tone === "ready"
                        ? styles.metricStateReady
                        : capability.tone === "approval-required"
                          ? styles.metricStateApproval
                          : capability.tone === "secondary"
                            ? styles.metricStateSecondary
                            : styles.metricStateBlocked
                    }`}
                  >
                    {capability.tone === "ready"
                      ? "Ready"
                      : capability.tone === "approval-required"
                        ? "Approval required"
                        : capability.tone === "secondary"
                          ? "Secondary"
                          : "Blocked"}
                  </span>
                </div>
                <p className={styles.placeholderSummary}>{capability.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("workspace-grid") ? (
        <section className={styles.panel} aria-label="Workspace grid">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Workspace grid</p>
              <h2 className={styles.panelTitle}>Specialist workspaces in product order</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              placeholders are intentional
            </span>
          </div>
          <JarvisWorkspaceGrid
            workspaces={context.workspaces}
            activeWorkspaceId={workspace?.id}
          />
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("workspace-shell") && workspace ? (
        <section className={styles.panel} aria-label={workspace.label}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Workspace shell</p>
              <h2 className={styles.panelTitle}>{workspace.label}</h2>
            </div>
            <span
              className={`${styles.panelBadge} ${
                workspace.status === "ready"
                  ? styles.metricStateReady
                  : workspace.status === "approval-required"
                    ? styles.metricStateApproval
                    : workspace.status === "secondary"
                      ? styles.metricStateSecondary
                      : styles.metricStateBlocked
              }`}
            >
              {workspace.executionPosture}
            </span>
          </div>
          <JarvisWorkspacePlaceholder workspace={workspace} />
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("workspace-shell") &&
      workspace?.id === "jarvis-video" ? (
        <JarvisVideoControlledExecutionTrialPanel
          workspaceId="jarvis-video"
          embedded
        />
      ) : null}

      {context.surface.sectionOrder.includes("workspace-shell") &&
      workspace?.id === "jarvis-video" ? (
        <JarvisVideoBackendTrialRunnerContractPanel
          workspaceId="jarvis-video"
          embedded
        />
      ) : null}

      {context.surface.sectionOrder.includes("workspace-shell") &&
      workspace?.id === "jarvis-video" ? (
        <JarvisVideoTrialResultReviewRecoveryPanel
          workspaceId="jarvis-video"
          embedded
        />
      ) : null}

      {context.surface.sectionOrder.includes("next-actions") ? (
        <section className={styles.panel} aria-label="Next action rail">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Next action rail</p>
              <h2 className={styles.panelTitle}>Clear next actions</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              clear next-action rail
            </span>
          </div>
          <JarvisNextActionRail actions={context.nextActionRail} />
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("approval-readiness") ? (
        <section className={styles.panel} aria-label="Approval and readiness">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Approval and readiness</p>
              <h2 className={styles.panelTitle}>What needs approval and what backend is required next</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
              approval-required
            </span>
          </div>
          <JarvisApprovalReadinessSummary
            approvalSummary={context.approvalSummary}
            readinessSummary={context.readinessSummary}
          />
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("blocked-actions") ? (
        <section className={styles.panel} aria-label="Blocked actions">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Blocked actions</p>
              <h2 className={styles.panelTitle}>What is blocked right now</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              no direct frontend execution
            </span>
          </div>
          <JarvisBlockedActionSummary
            blockedActions={context.blockedActionSummaries}
          />
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("audit-preview") ? (
        <section className={styles.panel} aria-label="Audit preview">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Audit preview</p>
              <h2 className={styles.panelTitle}>Audit and result review remain visible</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              audit workspace placeholder only
            </span>
          </div>
          <div className={styles.timelineGrid}>
            {context.workspaces
              .filter(
                (candidate) =>
                  candidate.id === "jarvis-audit" || candidate.id === "jarvis-video"
              )
              .map((candidate) => (
                <article key={candidate.id} className={styles.timelineCard}>
                  <p className={styles.panelEyebrow}>{candidate.label}</p>
                  <h3 className={styles.railTitle}>{candidate.emphasisLabel}</h3>
                  <p className={styles.railBody}>{candidate.backendRequirementSummary}</p>
                </article>
              ))}
          </div>
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("safety") ? (
        <section className={styles.panel} aria-label="Safety posture">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Safety posture</p>
              <h2 className={styles.panelTitle}>Compact safety state</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              no browser storage for secrets
            </span>
          </div>
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <p className={styles.panelEyebrow}>Kill switch</p>
              <h3 className={styles.placeholderTitle}>
                {context.safetyPosture.killSwitchState}
              </h3>
              <p className={styles.placeholderSummary}>
                {context.safetyPosture.permissionMode}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <p className={styles.panelEyebrow}>Credential boundary</p>
              <h3 className={styles.placeholderTitle}>
                {context.safetyPosture.credentialBoundary}
              </h3>
              <p className={styles.placeholderSummary}>
                {context.safetyPosture.storageBoundary}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <p className={styles.panelEyebrow}>Execution state</p>
              <h3 className={styles.placeholderTitle}>
                {context.safetyPosture.blockedExecutionState}
              </h3>
              <p className={styles.placeholderSummary}>
                {context.safetyPosture.riskState}
              </p>
            </article>
          </div>
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("diagnostics") ? (
        <JarvisDeveloperDiagnosticsDock
          groups={context.developerDiagnosticGroups}
        />
      ) : null}
    </section>
  );
}

function resolveJarvisUnifiedProductContext(
  props: JarvisUnifiedProductShellProps
) {
  if (props.routeSlug !== undefined) {
    const model = buildJarvisUnifiedProductIaRouteModel(props.routeSlug);
    const surface = getJarvisUnifiedProductSurface(model.surface.id);

    return {
      ...model,
      surface,
      activePath: surface.routeHref,
      focus: model.route?.focus ?? surface.badge,
      primaryNavigationCards: buildPrimaryNavigationCards(surface.id),
    } as const;
  }

  const model = buildJarvisUnifiedProductIaSurfaceModel(props.surfaceId);

  return {
    ...model,
    activePath: model.surface.routeHref,
    focus: model.surface.badge,
    primaryNavigationCards: buildPrimaryNavigationCards(model.surface.id),
  } as const;
}

function buildPrimaryNavigationCards(
  activeSurfaceId: JarvisUnifiedProductPrimarySurfaceId
) {
  return JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER.slice(0, 10).map(
    (href) => {
      const surface = resolveSurfaceFromHref(href);

      return {
        href,
        label:
          surface.id === activeSurfaceId
            ? `${surface.label} / current`
            : surface.label,
        description: surface.currentFocus,
        badge: surface.badge,
      };
    }
  );
}

function resolveSurfaceFromHref(href: JarvisUnifiedProductPrimaryNavigationHref) {
  switch (href) {
    case "/":
      return getJarvisUnifiedProductSurface("home");
    case "/codexforge-cockpit":
      return getJarvisUnifiedProductSurface("codexforge-cockpit");
    case "/jarvis":
      return getJarvisUnifiedProductSurface("jarvis");
    case "/jarvis-video":
      return getJarvisUnifiedProductSurface("jarvis-video");
    case "/jarvis-trading":
      return getJarvisUnifiedProductSurface("jarvis-trading");
    case "/jarvis-websites":
      return getJarvisUnifiedProductSurface("jarvis-websites");
    case "/jarvis-avatar":
      return getJarvisUnifiedProductSurface("jarvis-avatar");
    case "/jarvis-workflows":
      return getJarvisUnifiedProductSurface("jarvis-workflows");
    case "/jarvis-audit":
      return getJarvisUnifiedProductSurface("jarvis-audit");
    default:
      return getJarvisUnifiedProductSurface("jarvis-safety");
  }
}
