"use client";

import Link from "next/link";
import type { Route } from "next";
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
import type { JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-gated-provider-execution-trial-runtime-preview";
import type { JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-gated-provider-execution-trial-preparation-preview";
import type { JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-backend-runner-foundation-dry-run-admission-preview";
import type { JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-result-capture-audit-envelope-approval-join-preview";
import type { JarvisVideoServerOnlyRunnerSyntheticDryRunPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-server-only-runner-synthetic-dry-run-preview";
import { JarvisVideoStudioReleaseCandidatePanel } from "../../jarvis-video-studio-release-candidate-map/components";
import { JarvisVideoTrialResultReviewRecoveryPanel } from "../../jarvis-video-trial-result-review-recovery-map/components";
import { JarvisWorkspaceGrid } from "./JarvisWorkspaceGrid";
import { JarvisWorkspacePlaceholder } from "./JarvisWorkspacePlaceholder";
import styles from "./JarvisUnifiedProductShell.module.css";

type HomeOperatorCard = Readonly<{
  title: string;
  href: Route;
  summary: string;
  badge: string;
}>;

type HomeOperatorSummaryCard = Readonly<{
  title: string;
  summary: string;
}>;

const HOME_OPERATOR_SECONDARY_CARDS = [
  {
    title: "Jarvis Command Center",
    href: "/jarvis",
    summary:
      "Open the control plane for workspace launchers, approvals, audit preview, and safety state.",
    badge: "/jarvis",
  },
  {
    title: "Website Builder",
    href: "/jarvis-websites",
    summary:
      "Review website briefs, structure, and publish gates without preview, export, or deploy execution.",
    badge: "/jarvis-websites",
  },
  {
    title: "Avatar Studio",
    href: "/jarvis-avatar",
    summary:
      "Review persona, consent, voice, and likeness boundaries while preview and generation remain locked.",
    badge: "/jarvis-avatar",
  },
  {
    title: "Workflows",
    href: "/jarvis-workflows",
    summary:
      "Review triggers, permissions, dry-run planning, approval, and audit while dispatch stays blocked.",
    badge: "/jarvis-workflows",
  },
] as const satisfies readonly HomeOperatorCard[];

const HOME_OPERATOR_AVAILABLE_ACTIONS = [
  {
    title: "Prepare a video brief",
    summary:
      "Use Video Studio to stage prompt, settings, safety notes, and the future approval packet without any backend execution.",
  },
  {
    title: "Review specialist surfaces",
    summary:
      "Open Jarvis, websites, avatars, and workflows as product surfaces instead of checkpoint walls.",
  },
  {
    title: "Keep handoff controlled",
    summary:
      "Review approval state, locked execution boundaries, and operator posture before any backend-only batch advances.",
  },
] as const satisfies readonly HomeOperatorSummaryCard[];

const HOME_OPERATOR_LOCKED_ACTIONS = [
  {
    title: "Generation and provider execution",
    summary:
      "Video generation, provider SDK calls, and direct frontend execution remain locked across the product shell.",
  },
  {
    title: "Backend dry runs and approvals",
    summary:
      "Backend runner handoff, audit capture, credential isolation, and approval joins remain future backend-only work.",
  },
  {
    title: "Persistence and browser storage",
    summary:
      "No localStorage, sessionStorage, IndexedDB, cookies, result persistence, or audit persistence are enabled from the cockpit.",
  },
] as const satisfies readonly HomeOperatorSummaryCard[];

type JarvisUnifiedProductShellProps =
  | {
      surfaceId: JarvisUnifiedProductPrimarySurfaceId;
      routeSlug?: never;
      jarvisVideoFirstGatedProviderTrialRuntimePreview?: JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview;
      jarvisVideoFirstGatedProviderTrialPreparationPreview?: JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview;
      jarvisVideoResultCaptureAuditApprovalJoinPreview?: JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview;
      jarvisVideoBackendDryRunAdmissionPreview?: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview;
      jarvisVideoServerOnlySyntheticDryRunPreview?: JarvisVideoServerOnlyRunnerSyntheticDryRunPreview;
    }
  | {
      routeSlug: JarvisUnifiedProductIaRouteSlug;
      surfaceId?: never;
      jarvisVideoFirstGatedProviderTrialRuntimePreview?: JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview;
      jarvisVideoFirstGatedProviderTrialPreparationPreview?: JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview;
      jarvisVideoResultCaptureAuditApprovalJoinPreview?: JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview;
      jarvisVideoBackendDryRunAdmissionPreview?: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview;
      jarvisVideoServerOnlySyntheticDryRunPreview?: JarvisVideoServerOnlyRunnerSyntheticDryRunPreview;
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
  const workspaceCount = context.workspaces.filter(
    (candidate) => candidate.id !== "developer-diagnostics"
  ).length;
  const isPrimaryJarvisVideoStudioSurface =
    context.surface.id === "jarvis-video" && !context.route;
  const isPrimaryHomeSurface = context.surface.id === "home" && !context.route;
  const workspace =
    context.surface.id !== "home" &&
    context.surface.id !== "codexforge-cockpit" &&
    context.surface.id !== "jarvis"
      ? context.workspaces.find(
          (candidate) => candidate.routeHref === context.surface.routeHref
        ) ?? context.workspaces[0]
      : null;

  if (isPrimaryJarvisVideoStudioSurface) {
    return (
      <section
        className={styles.shell}
        data-codexforge-jarvis-unified-product-ia={context.batchMarkers.join(" | ")}
        data-codexforge-jarvis-unified-product-ia-focus={context.focus}
      >
        <JarvisVideoStudioReleaseCandidatePanel
          workspaceId="jarvis-video"
          firstGatedProviderTrialRuntimePreview={
            props.jarvisVideoFirstGatedProviderTrialRuntimePreview
          }
          firstGatedProviderTrialPreparationPreview={
            props.jarvisVideoFirstGatedProviderTrialPreparationPreview
          }
          resultCaptureAuditApprovalJoinPreview={
            props.jarvisVideoResultCaptureAuditApprovalJoinPreview
          }
          backendDryRunAdmissionPreview={
            props.jarvisVideoBackendDryRunAdmissionPreview
          }
          serverOnlySyntheticDryRunPreview={
            props.jarvisVideoServerOnlySyntheticDryRunPreview
          }
        />
      </section>
    );
  }

  if (isPrimaryHomeSurface) {
    return (
      <section
        className={styles.shell}
        data-codexforge-jarvis-unified-product-ia={context.batchMarkers.join(" | ")}
        data-codexforge-jarvis-unified-product-ia-focus={context.focus}
      >
        <section className={styles.homeHero} aria-label="CodexForge Operator Cockpit">
          <div className={styles.homeHeroLayout}>
            <div className={styles.homeHeroCopy}>
              <span className={styles.eyebrowChip}>Controlled workspace</span>
              <h1 className={styles.homeHeroTitle}>CodexForge Operator Cockpit</h1>
              <p className={styles.homeHeroSummary}>
                Build, review, and safely hand off AI workflows from one
                controlled workspace.
              </p>
            </div>
            <Link className={styles.homePrimaryCta} href="/jarvis-video">
              <span className={`${styles.navBadge} ${styles.metricStateApproval}`}>
                Primary action
              </span>
              <strong className={styles.homePrimaryCtaTitle}>
                Open Jarvis Video Studio -&gt; /jarvis-video
              </strong>
              <span className={styles.homePrimaryCtaBody}>
                Open the product console for video briefs, locked controls,
                approval packet preparation, and future backend handoff review.
              </span>
            </Link>
          </div>

          <div className={styles.homeSecondaryGrid}>
            {HOME_OPERATOR_SECONDARY_CARDS.map((card) => (
              <Link key={card.href} className={styles.homeSecondaryCard} href={card.href}>
                <span className={styles.navBadge}>{card.badge}</span>
                <strong className={styles.homeSecondaryTitle}>{card.title}</strong>
                <span className={styles.homeSecondaryBody}>{card.summary}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.panel} aria-label="What can I do now?">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Operator actions</p>
              <h2 className={styles.panelTitle}>What can I do now?</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Review-first
            </span>
          </div>
          <div className={styles.homeSummaryGrid}>
            {HOME_OPERATOR_AVAILABLE_ACTIONS.map((card) => (
              <article key={card.title} className={styles.summaryCard}>
                <p className={styles.panelEyebrow}>Available now</p>
                <h3 className={styles.placeholderTitle}>{card.title}</h3>
                <p className={styles.placeholderSummary}>{card.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.panel} aria-label="What is still locked?">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Locked boundaries</p>
              <h2 className={styles.panelTitle}>What is still locked?</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              Execution blocked
            </span>
          </div>
          <div className={styles.homeSummaryGrid}>
            {HOME_OPERATOR_LOCKED_ACTIONS.map((card) => (
              <article key={card.title} className={styles.blockedCard}>
                <p className={styles.panelEyebrow}>Still locked</p>
                <h3 className={styles.blockedTitle}>{card.title}</h3>
                <p className={styles.blockedSummary}>{card.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <JarvisDeveloperDiagnosticsDock
          groups={context.developerDiagnosticGroups}
        />
      </section>
    );
  }

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
        phaseLabel={context.route ? context.route.phase : "CodexForge"}
        isPhaseRoute={Boolean(context.route)}
        metrics={context.surface.heroMetrics}
        navigationCards={context.primaryNavigationCards}
      />

      {context.surface.sectionOrder.includes("current-focus") ? (
        <section className={styles.panel} aria-label="Current focus">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>
                {context.surface.id === "codexforge-cockpit"
                  ? "Current mission"
                  : "Current focus"}
              </p>
              <h2 className={styles.panelTitle}>
                {context.surface.id === "codexforge-cockpit"
                  ? "Jarvis Video Studio Release Candidate"
                  : "Platform focus stays product-first"}
              </h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              {context.surface.id === "codexforge-cockpit"
                ? "Mission control"
                : "Normal user path first"}
            </span>
          </div>
          <p className={styles.panelBody}>{context.surface.currentFocus}</p>
        </section>
      ) : null}

      {context.surface.sectionOrder.includes("capability-grid") ? (
        <section className={styles.panel} aria-label="Capability grid">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Capabilities</p>
              <h2 className={styles.panelTitle}>What Jarvis can review now</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Capability launcher
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
              <p className={styles.panelEyebrow}>Workspace launcher</p>
              <h2 className={styles.panelTitle}>Open the right workspace</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              {`${workspaceCount} workspaces`}
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
              <p className={styles.panelEyebrow}>Workspace overview</p>
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
        <section className={styles.panel} aria-label="Primary action">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Primary action</p>
              <h2 className={styles.panelTitle}>What to do next</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Start here
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
              <h2 className={styles.panelTitle}>Approval state and backend handoff</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
              Approval required
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
              <h2 className={styles.panelTitle}>What stays blocked right now</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              Execution blocked
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
              <h2 className={styles.panelTitle}>Audit and result review stay visible</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Review surface
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
              <h2 className={styles.panelTitle}>Safety state at a glance</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              Locked boundaries
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
          surface.label,
        description: surface.currentFocus,
        badge: surface.id === activeSurfaceId ? "Current" : surface.badge,
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
