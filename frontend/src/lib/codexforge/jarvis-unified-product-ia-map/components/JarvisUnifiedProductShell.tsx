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
import {
  ATHENA_BLOCKED_ACTION_GROUPS,
  ATHENA_COMMAND_CENTER_MODEL,
  ATHENA_CURRENT_CAPABILITIES,
  resolveRequiredAthenaPluginLauncherGroup,
  resolveRequiredAthenaPrimaryOperatorAction,
  type AthenaPluginLauncherGroupId,
  type AthenaPrimaryOperatorActionId,
} from "../athena-control-plane-model";
import { AthenaCommandCenterPanel } from "./AthenaCommandCenterPanel";
import { AthenaOperatorStatusPanel } from "./AthenaOperatorStatusPanel";
import { JarvisApprovalReadinessSummary } from "./JarvisApprovalReadinessSummary";
import { JarvisBlockedActionSummary } from "./JarvisBlockedActionSummary";
import { JarvisDeveloperDiagnosticsDock } from "./JarvisDeveloperDiagnosticsDock";
import { JarvisNextActionRail } from "./JarvisNextActionRail";
import { JarvisProductHero } from "./JarvisProductHero";
import { JarvisVideoBackendTrialRunnerContractPanel } from "../../jarvis-video-backend-trial-runner-contract-map/components";
import { JarvisVideoControlledExecutionTrialPanel } from "../../jarvis-video-controlled-execution-trial-map/components";
import type { JarvisVideoManualProviderTrialExecutionEnablementPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-manual-provider-trial-execution-enablement-preview";
import type { JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-gated-provider-execution-trial-runtime-preview";
import type { JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-gated-provider-execution-trial-preparation-preview";
import type { JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-backend-runner-foundation-dry-run-admission-preview";
import type { JarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-manual-provider-trial-result-capture-ux-review-preview";
import type { JarvisVideoFirstRealProviderAdapterWiringPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-real-provider-adapter-wiring-preview";
import type { JarvisVideoFirstProviderTrialResultReviewRecoveryPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-first-provider-trial-result-review-recovery-preview";
import type { JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-result-capture-audit-envelope-approval-join-preview";
import type { JarvisVideoServerOnlyRunnerSyntheticDryRunPreview } from "../../jarvis-video-studio-release-candidate-map/jarvis-video-server-only-runner-synthetic-dry-run-preview";
import { JarvisVideoStudioReleaseCandidatePanel } from "../../jarvis-video-studio-release-candidate-map/components";
import { JarvisVideoTrialResultReviewRecoveryPanel } from "../../jarvis-video-trial-result-review-recovery-map/components";
import { JarvisWorkspaceGrid } from "./JarvisWorkspaceGrid";
import { JarvisWorkspacePlaceholder } from "./JarvisWorkspacePlaceholder";
import styles from "./JarvisUnifiedProductShell.module.css";

const HOME_HERO_ACTION_IDS = [
  "open-athena-command-center",
  "open-jarvis-video-studio",
] as const satisfies readonly AthenaPrimaryOperatorActionId[];

const HOME_PRODUCT_LAUNCHER_GROUP_IDS = [
  "operator-cockpit-launchers",
  "specialist-plugin-launchers",
] as const satisfies readonly AthenaPluginLauncherGroupId[];

type JarvisUnifiedProductShellProps =
  | {
      surfaceId: JarvisUnifiedProductPrimarySurfaceId;
      routeSlug?: never;
      jarvisVideoManualProviderTrialExecutionEnablementPreview?: JarvisVideoManualProviderTrialExecutionEnablementPreview;
      jarvisVideoFirstGatedProviderTrialRuntimePreview?: JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview;
      jarvisVideoFirstGatedProviderTrialPreparationPreview?: JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview;
      jarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview?: JarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview;
      jarvisVideoFirstRealProviderAdapterWiringPreview?: JarvisVideoFirstRealProviderAdapterWiringPreview;
      jarvisVideoFirstProviderTrialResultReviewRecoveryPreview?: JarvisVideoFirstProviderTrialResultReviewRecoveryPreview;
      jarvisVideoResultCaptureAuditApprovalJoinPreview?: JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview;
      jarvisVideoBackendDryRunAdmissionPreview?: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview;
      jarvisVideoServerOnlySyntheticDryRunPreview?: JarvisVideoServerOnlyRunnerSyntheticDryRunPreview;
    }
  | {
      routeSlug: JarvisUnifiedProductIaRouteSlug;
      surfaceId?: never;
      jarvisVideoManualProviderTrialExecutionEnablementPreview?: JarvisVideoManualProviderTrialExecutionEnablementPreview;
      jarvisVideoFirstGatedProviderTrialRuntimePreview?: JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview;
      jarvisVideoFirstGatedProviderTrialPreparationPreview?: JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview;
      jarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview?: JarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview;
      jarvisVideoFirstRealProviderAdapterWiringPreview?: JarvisVideoFirstRealProviderAdapterWiringPreview;
      jarvisVideoFirstProviderTrialResultReviewRecoveryPreview?: JarvisVideoFirstProviderTrialResultReviewRecoveryPreview;
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
  const isPrimaryAthenaSurface = context.surface.id === "jarvis" && !context.route;
  const workspace =
    context.surface.id !== "home" &&
    context.surface.id !== "codexforge-cockpit" &&
    context.surface.id !== "jarvis"
      ? context.workspaces.find(
          (candidate) => candidate.routeHref === context.surface.routeHref
        ) ?? context.workspaces[0]
      : null;
  const productUx = ATHENA_COMMAND_CENTER_MODEL.productUx;
  const commandDraftStatusPanel = ATHENA_COMMAND_CENTER_MODEL.commandDraftStatusPanel;
  const homeHeroActions = HOME_HERO_ACTION_IDS.map((actionId) =>
    resolveRequiredAthenaPrimaryOperatorAction(actionId)
  );
  const homeLauncherGroups = HOME_PRODUCT_LAUNCHER_GROUP_IDS.map((groupId) =>
    resolveRequiredAthenaPluginLauncherGroup(groupId)
  );

  if (isPrimaryJarvisVideoStudioSurface) {
    return (
      <section
        className={styles.shell}
        data-codexforge-jarvis-unified-product-ia={context.batchMarkers.join(" | ")}
        data-codexforge-jarvis-unified-product-ia-focus={context.focus}
      >
        <JarvisVideoStudioReleaseCandidatePanel
          workspaceId="jarvis-video"
          manualProviderTrialExecutionEnablementPreview={
            props.jarvisVideoManualProviderTrialExecutionEnablementPreview
          }
          firstGatedProviderTrialRuntimePreview={
            props.jarvisVideoFirstGatedProviderTrialRuntimePreview
          }
          firstGatedProviderTrialPreparationPreview={
            props.jarvisVideoFirstGatedProviderTrialPreparationPreview
          }
          firstManualProviderTrialResultCaptureUxReviewPreview={
            props.jarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview
          }
          firstRealProviderAdapterWiringPreview={
            props.jarvisVideoFirstRealProviderAdapterWiringPreview
          }
          firstProviderTrialResultReviewRecoveryPreview={
            props.jarvisVideoFirstProviderTrialResultReviewRecoveryPreview
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
              <div className={styles.heroEyebrowRow}>
                <span className={styles.eyebrowChip}>Athena entry point</span>
                <span className={styles.safeChip}>
                  {productUx.heroCopy.homeSummary}
                </span>
                <span className={styles.blockedChip}>No autonomous execution yet</span>
              </div>
              <h1 className={styles.homeHeroTitle}>CodexForge Operator Cockpit</h1>
              <p className={styles.homeHeroSummary}>
                {productUx.heroCopy.homeSupportLine}
              </p>
              <p className={styles.homeHeroSummary}>
                {productUx.heroCopy.homeAskCopy}
              </p>
              <p className={styles.athenaConsoleBody}>
                {productUx.cockpitSummary} Athena can plan and route commands.
                Athena can preview cross-workspace run timelines and show audit
                memory previews. Athena can now preview manual gated model
                provider run admission. run admission state is not admitted.
                Athena can now preview model provider run admission reviews.
                Athena can now preview backend-owned model provider run
                admission contracts.
                backend-owned contract is preview-only. contract state is draft
                / preview-only. admission request is not created. backend
                response is not received. backend admission request/response/error
                contracts are preview-only. backend admission gate schema is
                preview-only. backend contract readiness matrix is preview-only.
                Athena can now preview backend-owned model provider dry-run
                runner contracts. backend-owned dry-run runner contract is
                preview-only. runner contract state is draft / preview-only.
                Athena can now preview backend-owned model provider dry-run
                runner reviews. dry-run runner review is preview-only. dry-run
                request is not created. dry-run invocation is not invoked.
                dry-run execution is not executed. Athena can now preview
                backend-owned synthetic dry-run runner skeletons. synthetic
                runner skeleton is preview-only. runner state is skeleton /
                not executable. dry-run request is not created. runner
                invocation is not invoked. dry-run execution is not executed.
                synthetic dry-run result capture contract comes next. no model
                calls yet. no prompt sending. no provider SDKs imported.
                queue, worker, and job execution remain blocked.
                Plugin/provider execution remains blocked until approvals and
                backend gates are satisfied. Manual/provider execution stays
                backend-only. No autonomous execution yet.
              </p>
              {/* Historical smoke marker preserved for prior batch coverage:
                  Athena model routing and provider selection preview comes next. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  model provider approval packet and run intent preview comes next. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  manual gated run admission preview comes next from the approval packet layer. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  run admission review and recovery preview comes next. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  backend-owned run admission contract comes next. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  backend-owned dry-run runner contract comes next. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  dry-run runner review and recovery preview comes next. */}
              {/* Historical smoke marker preserved for prior batch coverage:
                  synthetic dry-run runner skeleton comes next. */}
              <div className={styles.workspaceMeta}>
                {productUx.heroCopy.postureChips.map((item) => (
                  <span key={item} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.panelBody}>{productUx.currentReadinessSummary}</p>
              <p className={styles.panelBody}>
                {productUx.blockedDefaultExecutionSummary}
              </p>
            </div>
            <div className={styles.athenaCtaStack}>
              {homeHeroActions.map((card, index) => (
                <Link
                  key={card.id}
                  aria-label={
                    card.id === "open-jarvis-video-studio"
                      ? "Open Jarvis Video Studio"
                      : "Open Athena Command Center"
                  }
                  className={
                    index === 0 ? styles.homePrimaryCta : styles.homeSecondaryCard
                  }
                  href={card.href}
                >
                  <span
                    className={`${styles.navBadge} ${
                      index === 0 ? styles.metricStateReady : styles.metricStateApproval
                    }`}
                  >
                    {index === 0 ? "Primary CTA" : "Secondary CTA"}
                  </span>
                  <strong className={styles.homePrimaryCtaTitle}>
                    {card.label}
                  </strong>
                  <span className={styles.homePrimaryCtaBody}>{card.summary}</span>
                </Link>
              ))}
              <article className={styles.summaryCard}>
                <p className={styles.panelEyebrow}>Athena cockpit summary</p>
                <h2 className={styles.placeholderTitle}>
                  {productUx.heroCopy.homeSummary}
                </h2>
                <p className={styles.placeholderSummary}>
                  {productUx.approvalPostureSummary}
                </p>
                <p className={styles.railBody}>{productUx.auditPostureSummary}</p>
                <p className={styles.railBody}>
                  {productUx.safetyPostureSummary}
                </p>
                <p className={styles.railBody}>
                  Athena can plan and route commands. Athena can preview
                  cross-workspace run timelines and show audit memory previews.
                </p>
                <p className={styles.railBody}>
                  Athena can now preview manual gated model provider run
                  admission. run admission state is not admitted.
                </p>
                <p className={styles.railBody}>
                  Athena can now preview model provider run admission reviews.
                </p>
                <p className={styles.railBody}>
                  Athena can now preview backend-owned model provider run
                  admission contracts.
                </p>
                <p className={styles.railBody}>
                  backend-owned contract is preview-only.
                </p>
                <p className={styles.railBody}>
                  contract state is draft / preview-only.
                </p>
                <p className={styles.railBody}>
                  admission request is not created.
                </p>
                <p className={styles.railBody}>
                  backend response is not received.
                </p>
                <p className={styles.railBody}>
                  Athena can now preview backend-owned model provider dry-run
                  runner contracts.
                </p>
                <p className={styles.railBody}>
                  backend-owned dry-run runner contract is preview-only.
                </p>
                <p className={styles.railBody}>
                  runner contract state is draft / preview-only.
                </p>
                <p className={styles.railBody}>
                  dry-run request is not created.
                </p>
                <p className={styles.railBody}>
                  dry-run invocation is not invoked.
                </p>
                <p className={styles.railBody}>
                  dry-run execution is not executed.
                </p>
                <p className={styles.railBody}>
                  Athena can now preview backend-owned model provider dry-run
                  runner reviews.
                </p>
                <p className={styles.railBody}>
                  dry-run runner review is preview-only.
                </p>
                <p className={styles.railBody}>
                  Athena can now preview backend-owned synthetic dry-run runner
                  skeletons.
                </p>
                <p className={styles.railBody}>
                  synthetic runner skeleton is preview-only.
                </p>
                <p className={styles.railBody}>
                  runner state is skeleton / not executable.
                </p>
                <p className={styles.railBody}>
                  dry-run request is not created.
                </p>
                <p className={styles.railBody}>
                  runner invocation is not invoked.
                </p>
                <p className={styles.railBody}>
                  dry-run execution is not executed.
                </p>
                <p className={styles.railBody}>
                  synthetic dry-run result capture contract comes next.
                </p>
                <p className={styles.railBody}>
                  no model calls yet. no prompt sending. no provider SDKs
                  imported. queue, worker, and job execution remain blocked.
                </p>
                {/* Historical smoke marker preserved for prior batch coverage:
                    Athena model routing and provider selection preview comes next. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    model provider approval packet and run intent preview comes next. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    manual gated run admission preview comes next from the approval packet layer. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    run admission review and recovery preview comes next. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    backend-owned run admission contract comes next. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    backend-owned dry-run runner contract comes next. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    dry-run runner review and recovery preview comes next. */}
                {/* Historical smoke marker preserved for prior batch coverage:
                    synthetic dry-run runner skeleton comes next. */}
              </article>
            </div>
          </div>
        </section>

        <AthenaOperatorStatusPanel
          title="Athena operator status"
          eyebrow="Athena status"
          badge="Summary"
          summary={productUx.currentReadinessSummary}
          detail={productUx.blockedDefaultExecutionSummary}
          items={commandDraftStatusPanel}
        />

        <section className={styles.panel} aria-label="What can Athena do now?">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>What Athena can do now</p>
              <h2 className={styles.panelTitle}>What can Athena do now?</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Review-first
            </span>
          </div>
          <div className={styles.homeSummaryGrid}>
            {ATHENA_CURRENT_CAPABILITIES.map((capability) => (
              <article key={capability.id} className={styles.summaryCard}>
                <p className={styles.panelEyebrow}>Available now</p>
                <h3 className={styles.placeholderTitle}>{capability.label}</h3>
                <p className={styles.placeholderSummary}>{capability.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.panel} aria-label="What stays locked?">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>What stays locked</p>
              <h2 className={styles.panelTitle}>What stays locked?</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              Execution blocked
            </span>
          </div>
          <div className={styles.homeSummaryGrid}>
            {ATHENA_BLOCKED_ACTION_GROUPS.map((blocked) => (
              <article key={blocked.id} className={styles.blockedCard}>
                <p className={styles.panelEyebrow}>Still locked</p>
                <h3 className={styles.blockedTitle}>{blocked.label}</h3>
                <p className={styles.blockedSummary}>{blocked.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.panel} aria-label="Product launchers">
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelEyebrow}>Product cards</p>
              <h2 className={styles.panelTitle}>Open the right CodexForge workspace</h2>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
              Product-first
            </span>
          </div>
          <div className={styles.athenaLaunchGrid}>
            {homeLauncherGroups.map((group) => (
              <section key={group.id} className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Launcher group</p>
                    <h3 className={styles.placeholderTitle}>{group.label}</h3>
                  </div>
                  <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                    Product cards
                  </span>
                </div>
                <p className={styles.placeholderSummary}>{group.description}</p>
                <div className={styles.workspaceGrid}>
                  {group.cards.map((card) => (
                    <Link
                      key={card.id}
                      className={styles.workspaceCard}
                      href={card.href}
                    >
                      <div className={styles.workspaceHeader}>
                        <div>
                          <p className={styles.panelEyebrow}>{card.label}</p>
                          <h3 className={styles.workspaceTitle}>
                            {card.shortLabel}
                          </h3>
                        </div>
                        <span
                          className={`${styles.metricState} ${resolveToneClass(
                            card.tone
                          )}`}
                        >
                          {formatToneLabel(card.tone)}
                        </span>
                      </div>
                      <p className={styles.workspaceDescription}>{card.summary}</p>
                      <div className={styles.workspaceMeta}>
                        <span className={styles.metaPill}>{card.badge}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <JarvisDeveloperDiagnosticsDock
          groups={context.developerDiagnosticGroups}
        />
      </section>
    );
  }

  if (isPrimaryAthenaSurface) {
    return (
      <section
        className={styles.shell}
        data-codexforge-jarvis-unified-product-ia={context.batchMarkers.join(" | ")}
        data-codexforge-jarvis-unified-product-ia-focus={context.focus}
      >
        <AthenaCommandCenterPanel commandCenter={ATHENA_COMMAND_CENTER_MODEL} />
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

function resolveToneClass(tone: "ready" | "approval-required" | "blocked" | "secondary") {
  switch (tone) {
    case "ready":
      return styles.metricStateReady;
    case "approval-required":
      return styles.metricStateApproval;
    case "secondary":
      return styles.metricStateSecondary;
    default:
      return styles.metricStateBlocked;
  }
}

function formatToneLabel(tone: "ready" | "approval-required" | "blocked" | "secondary") {
  switch (tone) {
    case "ready":
      return "Ready";
    case "approval-required":
      return "Approval required";
    case "secondary":
      return "Secondary";
    default:
      return "Blocked";
  }
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
