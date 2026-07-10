"use client";

import Link from "next/link";
import {
  buildAthenaProviderSelectionPreviewFromExactStaticExamples,
  buildBlockedProviderExecutionSummary,
  buildCapabilityMatrixPreview,
  buildProviderReadinessSummary,
  groupCapabilitiesByWorkspaceTarget,
  groupProvidersByCapability,
  listModelProviderSlots,
} from "@/lib/codexforge/ai-provider-registry";
import styles from "./JarvisUnifiedProductShell.module.css";
import {
  buildAuditRequirementsSummary,
  buildAthenaApprovalRequirementsSummary,
  buildAthenaAuditRequirementsSummary,
  buildAthenaBlockedActionSummary,
  buildAthenaRoutePreview,
  buildBlockedStateSummary,
  buildBackendHandoffSummary,
  buildNextActionSummary,
  buildBlockedBridgeSummary,
  buildSafetyRequirementsSummary,
  buildStableAthenaPluginKey,
  groupTimelineItemsByBlockedState,
  groupTimelineItemsByPlugin,
  type AthenaCommandComposerDraftRecord,
  type AthenaCommandCenterModel,
  type AthenaConditionalRequirementState,
  type AthenaCommandIntentState,
  type AthenaExecutionPosture,
  type AthenaLauncherStatus,
  type AthenaPluginRegistryPreviewRecord,
  type AthenaPrimaryOperatorActionId,
  type AthenaProductUxActionRecord,
  listApprovalBridgeRequirements,
} from "../athena-control-plane-model";
import { AthenaOperatorStatusPanel } from "./AthenaOperatorStatusPanel";

type AthenaCommandCenterPanelProps = Readonly<{
  commandCenter: AthenaCommandCenterModel;
}>;

export function AthenaCommandCenterPanel({
  commandCenter,
}: AthenaCommandCenterPanelProps) {
  const productUx = commandCenter.productUx;
  const providerSlots = listModelProviderSlots();
  const providerReadinessSummary = buildProviderReadinessSummary();
  const blockedProviderExecutionSummary = buildBlockedProviderExecutionSummary();
  const capabilityMatrixPreview = buildCapabilityMatrixPreview();
  const providerSelectionPreview =
    buildAthenaProviderSelectionPreviewFromExactStaticExamples();
  const capabilityWorkspaceGroups = groupCapabilitiesByWorkspaceTarget();
  const providersByCapability = groupProvidersByCapability();
  const providersByCapabilityId = new Map(
    providersByCapability.map((group) => [
      group.capabilityId,
      group.providerSlots.map((slot) => slot.label),
    ])
  );
  const commandComposerDrafts = commandCenter.commandComposerDrafts;
  const approvalDraftPreviews = commandCenter.approvalDraftPreviews;
  const representativeBridge =
    commandCenter.approvalGatedToolBridgePreviews[0] ?? null;
  const timelineItems = commandCenter.crossWorkspaceRunTimeline;
  const representativeTimeline = timelineItems[0] ?? null;
  const timelineByPlugin = groupTimelineItemsByPlugin(timelineItems);
  const timelineByBlockedState = groupTimelineItemsByBlockedState(timelineItems);
  const auditMemoryEntries = commandCenter.auditMemoryPreview;
  const representativeAuditMemory = auditMemoryEntries[0] ?? null;
  const primaryActionIds = [
    "open-jarvis-video-studio",
    "review-blocked-actions",
    "check-provider-readiness",
    "open-audit-timeline",
  ] as const satisfies readonly AthenaPrimaryOperatorActionId[];
  const primaryActions = primaryActionIds.map((actionId) =>
    resolveRequiredProductAction(actionId, productUx.primaryOperatorActions)
  );

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
              <span className={styles.blockedChip}>
                {productUx.heroCopy.upperJarvisLayerLabel}
              </span>
            </div>
            <h2 className={styles.homePrimaryCtaTitle}>
              {commandCenter.identity.title}
            </h2>
            <p className={styles.athenaMissionLine}>
              {productUx.heroCopy.missionLine}
            </p>
            <p className={styles.homeHeroSummary}>
              {commandCenter.identity.operatorPromise}
            </p>
            <p className={styles.athenaConsoleBody}>
              {productUx.cockpitSummary}
            </p>
            <p className={styles.athenaConsoleBody}>
              {commandCenter.identity.mission}
            </p>
            <div className={styles.workspaceMeta}>
              {productUx.heroCopy.postureChips.map((item) => (
                <span key={item} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <p className={styles.panelEyebrow}>Current batch</p>
            <h3 className={styles.placeholderTitle}>
              {commandCenter.latestCompletedBatch}
            </h3>
            <p className={styles.placeholderSummary}>
              {productUx.currentReadinessSummary}
            </p>
            <p className={styles.railFooter}>
              {`Phase ${commandCenter.highestDetectedPhase} | ${commandCenter.previousCompletedBatch}`}
            </p>
            <p className={styles.railFooter}>
              {`${productUx.productUxVersion} | ${productUx.operatorHomeTakeoverVersion}`}
            </p>
          </div>
        </div>

        <p className={styles.athenaPromptLead}>
          {productUx.heroCopy.operatorInputLead}
        </p>
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

        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Immediate status</p>
            <h3 className={styles.panelTitle}>Athena status at first glance</h3>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Preview-only cockpit
          </span>
        </div>
        <div className={styles.summaryGrid}>
          {productUx.immediateStatusCards.map((card) => (
            <article key={card.id} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>{card.label}</p>
                  <h3 className={styles.statusValue}>{card.value}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${resolveToneClass(card.tone)}`}
                >
                  {formatToneLabel(card.tone)}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{card.summary}</p>
            </article>
          ))}
        </div>

        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Primary operator actions</p>
            <h3 className={styles.panelTitle}>Open the right lane next</h3>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
            Product-first
          </span>
        </div>
        <div className={styles.athenaActionGrid}>
          {primaryActions.map((action) => (
            <Link
              key={action.id}
              className={styles.athenaActionCard}
              href={action.href}
            >
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Primary action</p>
                  <h3 className={styles.athenaActionTitle}>{action.label}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${resolveToneClass(action.tone)}`}
                >
                  {action.badge}
                </span>
              </div>
              <p className={styles.athenaActionBody}>{action.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Conversational command composer"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only drafting</p>
            <h2 className={styles.panelTitle}>Conversational command composer</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can draft structured commands from natural requests. Composer is
          preview-only. Chat input remains inert/local only. No prompt sending.
          No model calls yet. No plugin execution from chat yet.
          Approval-gated handoffs only.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Composer posture</p>
                <h3 className={styles.placeholderTitle}>
                  Chat stays local and drafts stay blocked
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Executes nothing
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>Composer is preview-only</span>
              <span className={styles.metaPill}>
                Chat input remains inert/local only
              </span>
              <span className={styles.metaPill}>No prompt sending</span>
              <span className={styles.metaPill}>No model calls yet</span>
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next server-only work</p>
                <h3 className={styles.placeholderTitle}>
                  {commandCenter.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Adapter contracts next
              </span>
            </div>
            <div className={styles.nextActionList}>
              {commandCenter.nextServerOnlyAdapterChecklist.map((item) => (
                <article key={item} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {commandComposerDrafts.map((draft) => (
            <article key={draft.commandDraftKey} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Sample natural request</p>
                  <h3 className={styles.placeholderTitle}>
                    {draft.naturalLanguageRequestPhrase}
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateApproval}`}
                >
                  {draft.composerMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {`Structured command draft: ${draft.normalizedOperatorObjective}`}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{draft.commandDraftKey}</span>
                <span className={styles.metaPill}>
                  {`Intent: ${draft.matchedCommandIntentReference}`}
                </span>
                <span className={styles.metaPill}>
                  {`Plugin: ${resolvePluginLabel(
                    draft.matchedPluginReference,
                    commandCenter.pluginRegistryPreview
                  )}`}
                </span>
                <Link className={styles.metaPill} href={draft.targetRouteReference}>
                  {`Route: ${draft.targetRouteReference}`}
                </Link>
              </div>
              <p className={styles.railBody}>
                {`Suggested brief fields: ${draft.suggestedBriefFields.join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Missing information prompts: ${draft.missingInformationPrompts.join(
                  " | "
                )}`}
              </p>
              <p className={styles.railBody}>
                {`Required approvals: ${draft.requiredApprovals.join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Required safety gates: ${draft.requiredSafetyGates.join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Required audit gates: ${draft.requiredAuditGates.join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Backend-only handoff requirement: ${draft.backendOnlyHandoffRequirement}`}
              </p>
              <p className={styles.railBody}>
                {`Current blocked/default reason: ${draft.blockedDefaultReason}`}
              </p>
              <p className={styles.railBody}>
                {`Next operator action: ${draft.nextOperatorAction}`}
              </p>
              <p className={styles.railFooter}>
                {`Next system action: ${draft.nextSystemAction}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Approval draft preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only approvals</p>
            <h2 className={styles.panelTitle}>Approval draft preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            No execution
          </span>
        </div>
        <p className={styles.panelBody}>
          Sample natural request. Structured command draft. Target plugin.
          Target route. Missing information prompts. Approval requirements.
          Safety gates. Audit gates. Backend-only handoff requirement. Current
          blocked/default reason.
        </p>
        <div className={styles.summaryGrid}>
          {approvalDraftPreviews.map((approvalDraft) => {
            const sourceDraft = resolveRequiredCommandDraft(
              approvalDraft.sourceCommandDraftReference,
              commandComposerDrafts
            );

            return (
              <article
                key={approvalDraft.approvalDraftKey}
                className={styles.summaryCard}
              >
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Sample natural request</p>
                    <h3 className={styles.placeholderTitle}>
                      {sourceDraft.naturalLanguageRequestPhrase}
                    </h3>
                  </div>
                  <span
                    className={`${styles.panelBadge} ${styles.metricStateApproval}`}
                  >
                    {approvalDraft.approvalDraftMode}
                  </span>
                </div>
                <p className={styles.placeholderSummary}>
                  {`Structured command draft: ${sourceDraft.normalizedOperatorObjective}`}
                </p>
                <div className={styles.workspaceMeta}>
                  <span className={styles.metaPill}>
                    {approvalDraft.approvalDraftKey}
                  </span>
                  <span className={styles.metaPill}>
                    {`Target plugin: ${resolvePluginLabel(
                      approvalDraft.targetPluginReference,
                      commandCenter.pluginRegistryPreview
                    )}`}
                  </span>
                  <Link
                    className={styles.metaPill}
                    href={approvalDraft.targetRouteReference}
                  >
                    {`Target route: ${approvalDraft.targetRouteReference}`}
                  </Link>
                </div>
                <p className={styles.railBody}>
                  {`Missing information prompts: ${sourceDraft.missingInformationPrompts.join(
                    " | "
                  )}`}
                </p>
                <p className={styles.railBody}>
                  {`Approval requirements: ${sourceDraft.requiredApprovals.join(
                    " | "
                  )}`}
                </p>
                <p className={styles.railBody}>
                  {`Safety gates: ${sourceDraft.requiredSafetyGates.join(" | ")} | ${approvalDraft.safetyGateSummary}`}
                </p>
                <p className={styles.railBody}>
                  {`Audit gates: ${sourceDraft.requiredAuditGates.join(" | ")}`}
                </p>
                <p className={styles.railBody}>
                  {`Backend-only handoff requirement: ${sourceDraft.backendOnlyHandoffRequirement}`}
                </p>
                <p className={styles.railBody}>
                  {`Current blocked/default reason: ${approvalDraft.blockedDefaultReason}`}
                </p>
                <p className={styles.railBody}>
                  {`Approval packet title: ${approvalDraft.approvalPacketTitle}`}
                </p>
                <p className={styles.railBody}>
                  {`Artifact handoff posture: ${approvalDraft.artifactHandoffPosture}`}
                </p>
                <p className={styles.railBody}>
                  {`Persistence posture: ${approvalDraft.persistencePosture}`}
                </p>
                <div className={styles.workspaceMeta}>
                  <span className={styles.blockedPill}>
                    Operator approval required
                  </span>
                  <span className={styles.blockedPill}>Kill switch required</span>
                  <span className={styles.blockedPill}>Audit required</span>
                  <span className={styles.blockedPill}>
                    Backend-only handoff required
                  </span>
                  <span className={styles.blockedPill}>
                    {formatConditionalRequirementSummary(
                      "Credential isolation",
                      approvalDraft.credentialIsolationRequirement
                    )}
                  </span>
                  <span className={styles.blockedPill}>
                    {formatConditionalRequirementSummary(
                      "Cost acknowledgement",
                      approvalDraft.costAcknowledgementRequirement
                    )}
                  </span>
                  <span className={styles.blockedPill}>
                    Privacy/redaction required
                  </span>
                  <span className={styles.blockedPill}>Idempotency required</span>
                  <span className={styles.blockedPill}>Replay block required</span>
                  <span className={styles.blockedPill}>Timeout/cancel required</span>
                  <span className={styles.blockedPill}>Result capture required</span>
                </div>
                <p className={styles.railFooter}>
                  {approvalDraft.explicitNoExecutionStatement}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.panel} aria-label="AI model provider registry">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Model Gateway preview</p>
            <h2 className={styles.panelTitle}>AI model provider registry</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Registry-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can see model provider slots. Provider slots are registry-only.
          No model calls yet. No prompt sending. No provider SDKs imported.
          Server-only adapters required. Credential isolation required.
          Operator approval required. Kill switch required. Audit required.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Registry posture</p>
                <h3 className={styles.placeholderTitle}>
                  Provider slots are registry-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Not connected
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {`${providerReadinessSummary.providerSlotCount} provider slots | ${providerReadinessSummary.capabilityCount} capability families | ${providerReadinessSummary.workspaceTargetCount} workspace targets`}
            </p>
            <div className={styles.workspaceMeta}>
              {providerReadinessSummary.summaryLines.map((item) => (
                <span key={item} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocked posture</p>
                <h3 className={styles.placeholderTitle}>
                  No provider execution
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Blocked
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {blockedProviderExecutionSummary.summary}
            </p>
            <div className={styles.workspaceMeta}>
              {blockedProviderExecutionSummary.blockedLines.map((item) => (
                <span key={item} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next server-only work</p>
                <h3 className={styles.placeholderTitle}>
                  {commandCenter.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Contracts next
              </span>
            </div>
            <div className={styles.nextActionList}>
              {commandCenter.nextServerOnlyAdapterChecklist.slice(0, 6).map((item) => (
                <article key={item} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {providerSlots.map((slot) => (
            <article key={slot.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Provider slot</p>
                  <h3 className={styles.placeholderTitle}>{slot.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {slot.currentState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{slot.description}</p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{slot.providerStatus}</span>
                {slot.capabilityFamilies.map((family) => (
                  <span key={family} className={styles.metaPill}>
                    {family}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>
                {`Workspace targets: ${slot.workspaceTargets.join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Blocked by: ${slot.blockedBy.join(" | ")}`}
              </p>
              <p className={styles.railFooter}>
                {`Next adapter requirement: ${slot.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Capability matrix">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Capability families</p>
            <h2 className={styles.panelTitle}>Capability matrix</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Capability matrix shows text/chat, code, image, video, audio/voice,
          transcription, embeddings/search, safety/moderation, and local
          inference alongside planning / reasoning, image editing, audio
          generation, voice / narration, and metadata / summarization. Each
          capability is not connected yet. Each capability requires a
          server-only adapter before execution.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Matrix posture</p>
                <h3 className={styles.placeholderTitle}>
                  Capability matrix is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${capabilityMatrixPreview.blockedCapabilityCount}/${capabilityMatrixPreview.capabilityCount} blocked`}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {`${capabilityMatrixPreview.capabilityCount} capability rows stay blocked / registry-only across ${capabilityMatrixPreview.workspaceTargetCount} workspace targets.`}
            </p>
            <div className={styles.workspaceMeta}>
              <span className={styles.blockedPill}>No model calls yet</span>
              <span className={styles.blockedPill}>No prompt sending</span>
              <span className={styles.blockedPill}>Server-only adapters required</span>
              <span className={styles.blockedPill}>
                Credential isolation required
              </span>
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Which plugin/workspace each capability can serve
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Product-first
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {capabilityWorkspaceGroups.map((group) => (
                <span key={group.workspaceTarget} className={styles.metaPill}>
                  {`${group.workspaceTarget}: ${group.capabilityRows.length}`}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {capabilityMatrixPreview.matrixRows.map((row) => (
            <article key={row.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Capability row</p>
                  <h3 className={styles.placeholderTitle}>{row.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {row.currentState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{row.description}</p>
              <p className={styles.railBody}>
                {`Provider slots: ${(providersByCapabilityId.get(row.capabilityId) ?? []).join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Workspace targets: ${row.workspaceTargets.join(" | ")}`}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.blockedPill}>{row.approvalRequirement}</span>
                <span className={styles.blockedPill}>{row.safetyRequirement}</span>
                <span className={styles.blockedPill}>{row.auditRequirement}</span>
                <span className={styles.blockedPill}>
                  {row.credentialIsolationRequirement}
                </span>
                <span className={styles.blockedPill}>
                  {row.backendOnlyAdapterRequirement}
                </span>
                <span className={styles.blockedPill}>{row.executionPosture}</span>
              </div>
              <p className={styles.railFooter}>
                {`Next adapter requirement: ${row.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Provider selection preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Routing-readiness preview</p>
            <h2 className={styles.panelTitle}>Provider selection preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Blocked by default
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview blocked provider-family choices without sending
          prompts or calling providers. command planning -&gt;
          text/planning capability. product video -&gt; video capability.
          storyboard -&gt; image capability. narration -&gt; audio/voice
          capability. captions -&gt; transcription capability. private/local
          task -&gt; local inference capability.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Sample Athena choices</p>
                <h3 className={styles.placeholderTitle}>
                  Provider families stay blocked and registry-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                No execution
              </span>
            </div>
            <div className={styles.nextActionList}>
              {[
                "command planning -> text/planning capability",
                "product video -> video capability",
                "storyboard -> image capability",
                "narration -> audio/voice capability",
                "captions -> transcription capability",
                "private/local task -> local inference capability",
              ].map((item) => (
                <article key={item} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocked posture</p>
                <h3 className={styles.placeholderTitle}>
                  What server-only adapter work comes next
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {blockedProviderExecutionSummary.summary}
            </p>
            <div className={styles.workspaceMeta}>
              {commandCenter.nextServerOnlyAdapterChecklist.slice(0, 5).map((item) => (
                <span key={item} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {providerSelectionPreview.map((preview) => (
            <article key={preview.id} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Static example</p>
                  <h3 className={styles.placeholderTitle}>
                    {preview.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {preview.currentState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {`${preview.providerFamilyLabel} -> ${preview.capabilityLabel}`}
              </p>
              <p className={styles.railBody}>
                {`Workspace targets: ${preview.workspaceTargets.join(" | ")}`}
              </p>
              <p className={styles.railBody}>
                {`Blocked by: ${preview.blockedBy.join(" | ")}`}
              </p>
              <p className={styles.railFooter}>
                {`Next adapter requirement: ${preview.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <AthenaOperatorStatusPanel
        title="Athena operator status"
        eyebrow="Operator status"
        badge="Preview-only"
        summary={productUx.currentReadinessSummary}
        detail={productUx.blockedDefaultExecutionSummary}
        items={commandCenter.commandDraftStatusPanel}
        nextActions={productUx.nextOperatorActions}
      />

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

      <section className={styles.panel} aria-label="Approval-gated tool bridge">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Bridge foundation</p>
            <h2 className={styles.panelTitle}>Approval-gated tool bridge</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Blocked by default
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can prepare approval-gated handoff packets. Every plugin
          command remains blocked by default. Operator approval is required.
          Kill switch is required. Audit is required. Backend-only execution is
          required. No plugin execution from chat yet.
        </p>
        {representativeBridge ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative bridge</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBridge.userFacingPhrase}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  {representativeBridge.bridgeVersion}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Plugin: ${representativeBridge.matchedPluginLabel}`}
                </span>
                <span className={styles.metaPill}>
                  {`Route: ${representativeBridge.routeTargetReference}`}
                </span>
                <span className={styles.metaPill}>
                  {`Packet: ${representativeBridge.approvalPacketPreviewReference}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {buildBackendHandoffSummary(representativeBridge)}
              </p>
              <p className={styles.railBody}>
                {buildBlockedBridgeSummary(representativeBridge)}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Approval requirements</p>
                  <h3 className={styles.placeholderTitle}>Required control gates</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  Approval required
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {listApprovalBridgeRequirements(representativeBridge).map(
                  (requirement) => (
                    <span key={requirement} className={styles.metaPill}>
                      {requirement}
                    </span>
                  )
                )}
              </div>
            </article>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Safety and audit</p>
                  <h3 className={styles.placeholderTitle}>Locked backend handoff</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  Inert bridge
                </span>
              </div>
              <p className={styles.railBody}>
                {buildSafetyRequirementsSummary(representativeBridge)}
              </p>
              <p className={styles.railBody}>
                {buildAuditRequirementsSummary(representativeBridge)}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next memory lane</p>
                  <h3 className={styles.placeholderTitle}>
                    {commandCenter.nextLikelyBatch}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  Next likely batch
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {representativeBridge.nextTimelineAuditMemoryChecklist.map(
                  (item) => (
                    <span key={item} className={styles.blockedPill}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </article>
          </div>
        ) : null}
      </section>

      <section className={styles.panel} aria-label="Handoff packet preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only packet</p>
            <h2 className={styles.panelTitle}>Handoff packet preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Executes nothing
          </span>
        </div>
        <p className={styles.panelBody}>
          Sample command. Target plugin. Target route. Approval requirements.
          Safety gates. Audit gates. Backend handoff state. Current
          blocked/default reason.
        </p>
        <div className={styles.summaryGrid}>
          {commandCenter.handoffPacketPreviews.map((packet) => (
            <article key={packet.packetId} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Sample command</p>
                  <h3 className={styles.placeholderTitle}>
                    {packet.userFacingCommandPhrase}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {packet.source}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Target plugin: ${packet.targetPluginLabel}`}
                </span>
                <Link className={styles.metaPill} href={packet.targetRoute}>
                  {`Target route: ${packet.targetRoute}`}
                </Link>
              </div>
              <p className={styles.railBody}>
                {`Approval requirements: ${packet.approvalSummary}`}
              </p>
              <p className={styles.railBody}>
                {`Safety gates: ${packet.safetySummary}`}
              </p>
              <p className={styles.railBody}>
                {`Audit gates: ${packet.auditSummary}`}
              </p>
              <p className={styles.railBody}>
                {`Backend handoff state: ${packet.backendHandoffSummary}`}
              </p>
              <p className={styles.railBody}>
                {`Current blocked/default reason: ${packet.blockedDefaultReason}`}
              </p>
              <p className={styles.railBody}>
                {`Required operator action: ${packet.requiredOperatorAction}`}
              </p>
              <p className={styles.railFooter}>{packet.requiredNextSystemAction}</p>
              <p className={styles.railFooter}>{packet.noExecutionStatement}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Cross-workspace run timeline">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only run lane</p>
            <h2 className={styles.panelTitle}>Cross-workspace run timeline</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview routed work across specialist plugins. Every item is
          preview-only. No runs have executed from chat. Approval, kill switch,
          safety, and audit gates are visible. Backend-only handoff is required.
          Result capture is pending until approved backend execution exists.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Preview posture</p>
                <h3 className={styles.placeholderTitle}>
                  No runs have executed from chat
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Not executed
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              Every routed item remains preview-only, backend-only handoff
              remains required, and result capture stays pending until approved
              backend execution exists.
            </p>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>Every item is preview-only</span>
              <span className={styles.metaPill}>Backend-only handoff required</span>
              <span className={styles.metaPill}>Result capture pending</span>
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by plugin</p>
                <h3 className={styles.placeholderTitle}>
                  Routed work stays unified
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {timelineByPlugin.map((group) => (
                <span
                  key={group.pluginId}
                  className={styles.metaPill}
                >{`${group.pluginLabel}: ${group.itemCount}`}</span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by blocked state</p>
                <h3 className={styles.placeholderTitle}>
                  Blocked and review states stay explicit
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                Gate-aware
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {timelineByBlockedState.map((group) => (
                <span
                  key={group.blockedState}
                  className={styles.metaPill}
                >{`${group.blockedStateLabel}: ${group.itemCount}`}</span>
              ))}
            </div>
          </article>
          {representativeTimeline ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next product polish</p>
                  <h3 className={styles.placeholderTitle}>
                    {commandCenter.nextLikelyBatch}
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  Next likely batch
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {representativeTimeline.nextProductPolishChecklist.map((item) => (
                  <span key={item} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {timelineItems.map((timeline) => (
            <article key={timeline.timelineKey} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Previewed routed command</p>
                  <h3 className={styles.placeholderTitle}>
                    {timeline.userFacingCommandPhrase}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  Run status: not executed
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Plugin: ${timeline.matchedPluginLabel}`}
                </span>
                <Link className={styles.metaPill} href={timeline.targetRouteReference}>
                  {`Route: ${timeline.targetRouteReference}`}
                </Link>
                <span className={styles.metaPill}>{timeline.runId}</span>
              </div>
              <p className={styles.railBody}>
                {`Approval gate: ${timeline.approvalGateSnapshot.summary}`}
              </p>
              <p className={styles.railBody}>
                {`Safety and kill switch: ${timeline.safetyGateSnapshot.summary} | ${timeline.killSwitchSnapshot.summary}`}
              </p>
              <p className={styles.railBody}>
                {`Audit and backend handoff: ${timeline.auditGateSnapshot.summary} | ${timeline.backendOnlyHandoffSnapshot.summary}`}
              </p>
              <p className={styles.railBody}>
                {`Current blocked/default state: ${buildBlockedStateSummary(
                  timeline
                )}`}
              </p>
              <p className={styles.railBody}>
                {`Next action: ${buildNextActionSummary(timeline)}`}
              </p>
              <div className={styles.workspaceMeta}>
                {timeline.eventList.map((event) => (
                  <span key={event.milestoneId} className={styles.blockedPill}>
                    {event.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Audit memory preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Static preview only</p>
            <h2 className={styles.panelTitle}>Audit memory preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
            Static preview only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can show what would be remembered for audit. Audit memory is
          static preview only. No persistent memory. No browser storage. No
          database writes. Operator action required. Next handoff requirement
          stays visible.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Memory posture</p>
                <h3 className={styles.placeholderTitle}>
                  Audit memory is static preview only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                No persistence
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>No persistent memory</span>
              <span className={styles.metaPill}>No browser storage</span>
              <span className={styles.metaPill}>No database writes</span>
            </div>
          </article>
          {representativeAuditMemory ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative action</p>
                  <h3 className={styles.placeholderTitle}>
                    Operator action required
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateApproval}`}
                >
                  Review-first
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeAuditMemory.operatorActionRequired}
              </p>
              <p className={styles.railBody}>
                {`Next handoff requirement: ${representativeAuditMemory.nextHandoffRequirement}`}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {auditMemoryEntries.map((memory) => (
            <article key={memory.memoryKey} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Static audit memory record</p>
                  <h3 className={styles.placeholderTitle}>{memory.commandPhrase}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  {memory.memoryMode}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{`Plugin: ${memory.pluginLabel}`}</span>
                <span className={styles.metaPill}>{`Plugin id: ${memory.pluginId}`}</span>
                <Link className={styles.metaPill} href={memory.routeTarget}>
                  {`Route: ${memory.routeTarget}`}
                </Link>
              </div>
              <p className={styles.railBody}>
                {`Approval requirement: ${memory.approvalRequirement}`}
              </p>
              <p className={styles.railBody}>
                {`Safety requirement: ${memory.safetyRequirement}`}
              </p>
              <p className={styles.railBody}>
                {`Audit requirement: ${memory.auditRequirement}`}
              </p>
              <p className={styles.railBody}>
                {`Blocked/default state: ${memory.lastKnownStateLabel}`}
              </p>
              <p className={styles.railBody}>
                {`Result state: ${memory.resultState}`}
              </p>
              <p className={styles.railBody}>
                {`Operator action required: ${memory.operatorActionRequired}`}
              </p>
              <p className={styles.railFooter}>
                {`Next handoff requirement: ${memory.nextHandoffRequirement}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  memory.persistentMemory,
                  memory.browserStorage,
                  memory.localStorage,
                  memory.sessionStorage,
                  memory.indexedDb,
                  memory.cookies,
                  memory.databaseWrites,
                ].map((item) => (
                  <span key={item} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
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
          <section className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next likely batch</p>
                <h3 className={styles.placeholderTitle}>
                  Next server-only adapter checklist
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.nextActionList}>
              {productUx.nextServerOnlyAdapterChecklist.map((item) => (
                <article key={item} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

function resolveRequiredProductAction(
  actionId: AthenaPrimaryOperatorActionId,
  actions: readonly AthenaProductUxActionRecord[]
): AthenaProductUxActionRecord {
  const action = actions.find((candidate) => candidate.id === actionId);

  if (!action) {
    throw new Error(`Missing Athena product action: ${actionId}`);
  }

  return action;
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

function resolveRequiredCommandDraft(
  commandDraftKey: AthenaCommandComposerDraftRecord["commandDraftKey"],
  drafts: readonly AthenaCommandComposerDraftRecord[]
): AthenaCommandComposerDraftRecord {
  const draft = drafts.find((candidate) => candidate.commandDraftKey === commandDraftKey);

  if (!draft) {
    throw new Error(`Missing Athena command draft: ${commandDraftKey}`);
  }

  return draft;
}

function resolvePluginLabel(
  pluginId: AthenaPluginRegistryPreviewRecord["pluginId"],
  plugins: readonly AthenaPluginRegistryPreviewRecord[]
): string {
  const plugin = plugins.find((candidate) => candidate.pluginId === pluginId);

  if (!plugin) {
    return pluginId;
  }

  return plugin.label;
}

function formatConditionalRequirementSummary(
  label: string,
  state: AthenaConditionalRequirementState
): string {
  if (state === "required") {
    return `${label} required`;
  }

  return `${label} not applicable for this plugin`;
}
