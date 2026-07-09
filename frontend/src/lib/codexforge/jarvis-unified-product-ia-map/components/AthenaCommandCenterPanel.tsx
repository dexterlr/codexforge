"use client";

import Link from "next/link";
import styles from "./JarvisUnifiedProductShell.module.css";
import {
  buildAthenaApprovalRequirementsSummary,
  buildAthenaAuditRequirementsSummary,
  buildAthenaBlockedActionSummary,
  buildAthenaRoutePreview,
  buildStableAthenaPluginKey,
  type AthenaCommandCenterModel,
  type AthenaCommandIntentState,
  type AthenaExecutionPosture,
  type AthenaLauncherStatus,
} from "../athena-control-plane-model";

type AthenaCommandCenterPanelProps = Readonly<{
  commandCenter: AthenaCommandCenterModel;
}>;

export function AthenaCommandCenterPanel({
  commandCenter,
}: AthenaCommandCenterPanelProps) {
  return (
    <>
      <section className={styles.athenaConsole} aria-label="Athena Command Center">
        <div className={styles.athenaConsoleHeader}>
          <div className={styles.athenaConsoleCopy}>
            <div className={styles.heroEyebrowRow}>
              <span className={styles.eyebrowChip}>
                {commandCenter.identity.name}
              </span>
              <span className={styles.safeChip}>
                {commandCenter.identity.title}
              </span>
              <span className={styles.blockedChip}>Local only</span>
            </div>
            <h2 className={styles.homePrimaryCtaTitle}>
              {commandCenter.identity.title}
            </h2>
            <p className={styles.homeHeroSummary}>
              {commandCenter.identity.operatorPromise}
            </p>
            <p className={styles.athenaConsoleBody}>
              {commandCenter.identity.mission}
            </p>
          </div>
          <div className={styles.summaryCard}>
            <p className={styles.panelEyebrow}>Execution posture</p>
            <h3 className={styles.placeholderTitle}>
              {commandCenter.identity.posture}
            </h3>
            <p className={styles.placeholderSummary}>
              {commandCenter.chat.executionPosture}
            </p>
            <p className={styles.railFooter}>
              {`Phase ${commandCenter.highestDetectedPhase} | ${commandCenter.latestCompletedBatch}`}
            </p>
          </div>
        </div>

        <label className={styles.athenaInputLabel} htmlFor="athena-operator-input">
          {commandCenter.chat.label}
        </label>
        <textarea
          id="athena-operator-input"
          className={styles.athenaTextarea}
          rows={5}
          placeholder={commandCenter.chat.placeholder}
        />
        <p className={styles.athenaInputMeta}>{commandCenter.chat.helperText}</p>

        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Suggested commands</p>
            <h3 className={styles.panelTitle}>
              Athena keeps chat inert and routing local
            </h3>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
            No prompt sending
          </span>
        </div>
        <div className={styles.athenaPromptGrid}>
          {commandCenter.suggestedPrompts.map((prompt) => (
            <article key={prompt.id} className={styles.railCard}>
              <p className={styles.panelEyebrow}>Suggested operator command</p>
              <h3 className={styles.railTitle}>{prompt.label}</h3>
              <p className={styles.railBody}>{prompt.summary}</p>
              <span className={styles.railFooter}>{prompt.routeHint}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Athena plugin registry preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Athena plugin registry preview</p>
            <h2 className={styles.panelTitle}>Athena plugin registry</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Approval-gated
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena knows the specialist workspaces. Each plugin has a route,
          posture, approval state, and audit requirement. Execution remains
          approval-gated. Backend-only execution required. No plugin execution
          from chat yet.
        </p>
        <div className={styles.workspaceGrid}>
          {commandCenter.pluginRegistryPreview.map((plugin) => (
            <Link
              key={buildStableAthenaPluginKey(plugin.pluginId)}
              className={styles.workspaceCard}
              href={plugin.routeHref}
            >
              <div className={styles.workspaceHeader}>
                <div>
                  <h3 className={styles.workspaceTitle}>{plugin.label}</h3>
                </div>
                <span
                  className={`${styles.metricState} ${resolveToneClass(plugin.status)}`}
                >
                  {formatToneLabel(plugin.status)}
                </span>
              </div>
              <p className={styles.workspaceDescription}>{plugin.description}</p>
              <p className={styles.railBody}>{plugin.currentCapability}</p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{plugin.routeHref}</span>
                <span className={styles.metaPill}>{plugin.executionPosture}</span>
                <span className={styles.metaPill}>{plugin.approvalPosture}</span>
                <span className={styles.metaPill}>{plugin.auditPosture}</span>
                <span className={styles.metaPill}>
                  {formatDefaultStateLabel(plugin.defaultState)}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {plugin.safetyGates.map((gate) => (
                  <span key={gate} className={styles.blockedPill}>
                    {gate}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {plugin.sampleCommands.map((command) => (
                  <span key={command} className={styles.metaPill}>
                    {command}
                  </span>
                ))}
              </div>
              <span className={styles.railFooter}>{plugin.nextAction}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Command router preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only routing</p>
            <h2 className={styles.panelTitle}>Command router preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Executes nothing
          </span>
        </div>
        <p className={styles.panelBody}>
          Sample user command. Matched plugin. Route Athena would open. Required
          approvals. Required audit and safety gates. Current execution posture.
          Blocked or default state.
        </p>
        <div className={styles.summaryGrid}>
          {commandCenter.commandIntents.map((command) => {
            const routePreview = buildAthenaRoutePreview(command);

            return (
              <article key={routePreview.commandKey} className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Sample user command</p>
                    <h3 className={styles.placeholderTitle}>
                      {routePreview.userFacingPhrase}
                    </h3>
                  </div>
                  <span
                    className={`${styles.panelBadge} ${resolveDefaultStateClass(
                      routePreview.defaultState
                    )}`}
                  >
                    {formatDefaultStateLabel(routePreview.defaultState)}
                  </span>
                </div>
                <p className={styles.placeholderSummary}>
                  {routePreview.routerExplanation}
                </p>
                <div className={styles.workspaceMeta}>
                  <span className={styles.metaPill}>
                    {`Matched plugin: ${routePreview.matchedPluginLabel}`}
                  </span>
                  <Link className={styles.metaPill} href={routePreview.routeTarget}>
                    {`Route: ${routePreview.routeTarget}`}
                  </Link>
                  <span className={styles.metaPill}>
                    {`Execution: ${formatExecutionPosture(
                      routePreview.executionPosture
                    )}`}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {`Required approvals: ${buildAthenaApprovalRequirementsSummary(
                    command
                  )}`}
                </p>
                <p className={styles.railBody}>
                  {`Required audit and safety gates: ${buildAthenaAuditRequirementsSummary(
                    command
                  )} | ${command.requiredSafetyGates.join(" | ")}`}
                </p>
                <p className={styles.railBody}>
                  {buildAthenaBlockedActionSummary(command)}
                </p>
                <div className={styles.workspaceMeta}>
                  {routePreview.previewedHandoffSteps.map((step) => (
                    <span key={step} className={styles.blockedPill}>
                      {step}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.panel} aria-label="Athena safety posture">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Safety posture</p>
            <h2 className={styles.panelTitle}>
              What Athena can do and what remains locked
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Approval-gated
          </span>
        </div>
        <div className={styles.summaryGrid}>
          {commandCenter.safetyGates.map((gate) => (
            <article key={gate.id} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Safety gate</p>
                  <h3 className={styles.placeholderTitle}>{gate.label}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${resolveToneClass(gate.tone)}`}
                >
                  {formatToneLabel(gate.tone)}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{gate.summary}</p>
            </article>
          ))}
        </div>
        <div className={styles.blockedGrid}>
          {commandCenter.blockedActions.map((blocked) => (
            <article key={blocked.id} className={styles.blockedCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Blocked by default</p>
                  <h3 className={styles.blockedTitle}>{blocked.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  Blocked
                </span>
              </div>
              <p className={styles.blockedSummary}>{blocked.summary}</p>
              <div className={styles.workspaceMeta}>
                {blocked.items.map((item) => (
                  <span key={item} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Athena handoff flow">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Handoff flow</p>
            <h2 className={styles.panelTitle}>How Athena stays safe</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Backend-only handoff
          </span>
        </div>
        <div className={styles.flowList}>
          {commandCenter.handoffFlow.map((step, index) => (
            <article key={step.id} className={styles.flowCard}>
              <span className={styles.flowIndex}>{`Step ${index + 1}`}</span>
              <strong className={styles.flowLabel}>{step.label}</strong>
              <p className={styles.placeholderSummary}>{step.summary}</p>
            </article>
          ))}
        </div>
        <div className={styles.summaryGrid}>
          {commandCenter.auditReadiness.map((record) => (
            <article key={record.id} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Audit and readiness</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${resolveToneClass(record.tone)}`}
                >
                  {formatToneLabel(record.tone)}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{record.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Athena capability map">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Capability map</p>
            <h2 className={styles.panelTitle}>
              What Athena can do now and what comes next
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
            Foundation expanded
          </span>
        </div>
        <div className={styles.athenaSectionGrid}>
          <section className={styles.summaryCard}>
            <p className={styles.panelEyebrow}>Current capabilities</p>
            <div className={styles.nextActionList}>
              {commandCenter.currentCapabilities.map((capability) => (
                <article key={capability.id} className={styles.railCard}>
                  <h3 className={styles.railTitle}>{capability.label}</h3>
                  <p className={styles.railBody}>{capability.summary}</p>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.summaryCard}>
            <p className={styles.panelEyebrow}>Future capabilities</p>
            <div className={styles.nextActionList}>
              {commandCenter.futureCapabilities.map((capability) => (
                <article key={capability.id} className={styles.railCard}>
                  <h3 className={styles.railTitle}>{capability.label}</h3>
                  <p className={styles.railBody}>{capability.summary}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

function resolveToneClass(tone: AthenaLauncherStatus): string {
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

function resolveDefaultStateClass(state: AthenaCommandIntentState): string {
  switch (state) {
    case "review-only":
      return styles.metricStateReady;
    case "approval-gated":
      return styles.metricStateApproval;
    case "secondary-diagnostics":
      return styles.metricStateSecondary;
    default:
      return styles.metricStateBlocked;
  }
}

function formatToneLabel(tone: AthenaLauncherStatus): string {
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

function formatExecutionPosture(posture: AthenaExecutionPosture): string {
  switch (posture) {
    case "review-only":
      return "Review-only";
    case "backend-only-required":
      return "Backend-only required";
    default:
      return "Preview-only";
  }
}

function formatDefaultStateLabel(state: AthenaCommandIntentState): string {
  switch (state) {
    case "review-only":
      return "Review-only";
    case "approval-gated":
      return "Approval-gated";
    case "secondary-diagnostics":
      return "Secondary diagnostics";
    default:
      return "Blocked by default";
  }
}
