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
import {
  buildBlockedProviderSelectionSummary,
  buildModelRoutingChainSummary,
  buildProviderSelectionSummary,
  groupRoutingPreviewsByCapabilityFamily,
  groupRoutingPreviewsByWorkspaceTarget,
  listAthenaModelRoutingPreviews,
  listModelRoutingChainPreviews,
  listProviderSelectionBlockerMatrix,
  listProviderSelectionRationales,
} from "@/lib/codexforge/athena-model-routing-provider-selection-preview";
import {
  buildApprovalPacketSummary,
  buildNextManualGatedRunAdmissionChecklist,
  buildRunIntentBlockerSummary,
  buildRunIntentSummary,
  groupApprovalPacketsByCapabilityFamily,
  groupApprovalPacketsByWorkspaceTarget,
  listApprovalExpiryRevocationPreviews,
  listApprovalGateChecklistRecords,
  listModelProviderApprovalPackets,
  listModelProviderRunIntentPreviews,
  listRunIntentBlockerMatrix,
} from "@/lib/codexforge/model-provider-approval-packet-run-intent-preview";
import {
  buildAdmissionBlockerSummary,
  buildAdmissionGateSummary,
  buildManualRunAdmissionSummary,
  buildNextRunAdmissionReviewAndRecoveryChecklist,
  groupManualRunAdmissionPreviewsByCapabilityFamily,
  groupManualRunAdmissionPreviewsByWorkspaceTarget,
  listAdmissionGateEvaluationRecords,
  listManualAdmissionAuditPreviews,
  listManualGatedModelProviderRunAdmissionPreviews,
  listManualRunAdmissionBlockerMatrix,
  listRunAdmissionDenialRecoveryPreviews,
  listRunAdmissionTicketPreviews,
  uniqueManualRunAdmissionDisplayStrings,
} from "@/lib/codexforge/manual-gated-model-provider-run-admission-preview";
import {
  buildAdapterReadinessSummary,
  buildBlockedModelExecutionSummary,
  groupAdapterContractsByCapabilityFamily,
  groupAdapterContractsByWorkspaceTarget,
  listModelAdapterErrorEnvelopePreviews,
  listModelAdapterRequestEnvelopePreviews,
  listModelAdapterResponseEnvelopePreviews,
  listServerOnlyAdapterGateChecklist,
  listServerOnlyModelAdapterContracts,
} from "@/lib/codexforge/server-only-model-adapter-contracts";
import {
  buildBlockedDryRunExecutionSummary,
  buildDryRunReadinessSummary,
  getManualGatedModelAdapterDryRunHarness,
  groupDryRunScenariosByWorkspaceTarget,
  listDryRunDenialFailurePreviews,
  listDryRunFixtureResultPreviews,
  listDryRunRequestPacketPreviews,
  listManualDryRunGateChecklist,
  listManualGatedModelAdapterDryRunScenarios,
} from "@/lib/codexforge/manual-gated-model-adapter-dry-run-harness";
import {
  buildDryRunAcceptanceSummary,
  buildDryRunRecoverySummary,
  buildDryRunResultReviewSummary,
  groupResultReviewsByCapabilityFamily,
  groupResultReviewsByWorkspaceTarget,
  listDryRunAcceptanceMatrixRecords,
  listDryRunQualityReviews,
  listDryRunRecoveryPlanPreviews,
  listDryRunSafetyRedactionReviews,
  listModelAdapterDryRunResultReviews,
} from "@/lib/codexforge/model-adapter-dry-run-result-review-recovery";
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

function buildScopedItemKey(
  scope: string,
  category: string,
  index: number,
  value: string
): string {
  return `${scope}-${category}-${index}-${value}`;
}

function uniqueStrings<T extends string>(values: readonly T[]): readonly T[] {
  return Array.from(new Set(values));
}

function uniqueRecordsById<T extends Readonly<{ id: string }>>(
  records: readonly T[]
): readonly T[] {
  const uniqueRecords = new Map<string, T>();

  for (const record of records) {
    if (!uniqueRecords.has(record.id)) {
      uniqueRecords.set(record.id, record);
    }
  }

  return Array.from(uniqueRecords.values());
}

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
  const adapterContracts = listServerOnlyModelAdapterContracts();
  const adapterRequestEnvelopePreviews = listModelAdapterRequestEnvelopePreviews();
  const adapterResponseEnvelopePreviews =
    listModelAdapterResponseEnvelopePreviews();
  const adapterErrorEnvelopePreviews = listModelAdapterErrorEnvelopePreviews();
  const serverOnlyAdapterGateChecklist = listServerOnlyAdapterGateChecklist();
  const adapterReadinessSummary = buildAdapterReadinessSummary();
  const blockedModelExecutionSummary = buildBlockedModelExecutionSummary();
  const adapterContractsByCapabilityFamily =
    groupAdapterContractsByCapabilityFamily();
  const adapterContractsByWorkspaceTarget =
    groupAdapterContractsByWorkspaceTarget();
  const representativeAdapterRequestEnvelope =
    adapterRequestEnvelopePreviews[0] ?? null;
  const representativeAdapterResponseEnvelope =
    adapterResponseEnvelopePreviews[0] ?? null;
  const representativeAdapterErrorEnvelope =
    adapterErrorEnvelopePreviews[0] ?? null;
  const dryRunHarness = getManualGatedModelAdapterDryRunHarness();
  const dryRunReadinessSummary = buildDryRunReadinessSummary();
  const blockedDryRunExecutionSummary = buildBlockedDryRunExecutionSummary();
  const dryRunScenarios = listManualGatedModelAdapterDryRunScenarios();
  const dryRunScenarioWorkspaceGroups = groupDryRunScenariosByWorkspaceTarget();
  const dryRunRequestPacketPreviews = listDryRunRequestPacketPreviews();
  const dryRunFixtureResultPreviews = listDryRunFixtureResultPreviews();
  const dryRunDenialFailurePreviews = listDryRunDenialFailurePreviews();
  const manualDryRunGateChecklist = listManualDryRunGateChecklist();
  const resultReviewSummary = buildDryRunResultReviewSummary();
  const recoverySummary = buildDryRunRecoverySummary();
  const acceptanceSummary = buildDryRunAcceptanceSummary();
  const resultReviews = listModelAdapterDryRunResultReviews();
  const qualityReviews = listDryRunQualityReviews();
  const safetyReviews = listDryRunSafetyRedactionReviews();
  const recoveryPlanPreviews = listDryRunRecoveryPlanPreviews();
  const acceptanceMatrixRecords = listDryRunAcceptanceMatrixRecords();
  const resultReviewCapabilityGroups = groupResultReviewsByCapabilityFamily();
  const resultReviewWorkspaceGroups = groupResultReviewsByWorkspaceTarget();
  const representativeDryRunRequestPacket = dryRunRequestPacketPreviews[0] ?? null;
  const representativeDryRunFixtureResult =
    dryRunFixtureResultPreviews[0] ?? null;
  const representativeDryRunDenialFailure =
    dryRunDenialFailurePreviews[0] ?? null;
  const representativeResultReview = resultReviews[0] ?? null;
  const representativeQualityReview = qualityReviews[0] ?? null;
  const representativeSafetyReview = safetyReviews[0] ?? null;
  const representativeRecoveryPlan = recoveryPlanPreviews[0] ?? null;
  const representativeAcceptanceMatrix = acceptanceMatrixRecords[0] ?? null;
  const routingPreviews = listAthenaModelRoutingPreviews();
  const routingPreviewCapabilityGroups = groupRoutingPreviewsByCapabilityFamily();
  const routingPreviewWorkspaceGroups = groupRoutingPreviewsByWorkspaceTarget();
  const providerSelectionSummary = buildProviderSelectionSummary();
  const providerSelectionRationales = listProviderSelectionRationales();
  const modelRoutingChains = listModelRoutingChainPreviews();
  const modelRoutingChainSummary = buildModelRoutingChainSummary();
  const providerSelectionBlockers = listProviderSelectionBlockerMatrix();
  const providerSelectionBlockersForDisplay = providerSelectionBlockers.map(
    (blocker) => ({
      ...blocker,
      affectedCapabilityFamilies: uniqueRecordsById(
        blocker.affectedCapabilityFamilies
      ),
      affectedWorkspaceTargets: uniqueStrings(blocker.affectedWorkspaceTargets),
    })
  );
  const blockedProviderSelectionSummary = buildBlockedProviderSelectionSummary();
  const approvalPackets = listModelProviderApprovalPackets();
  const runIntentPreviews = listModelProviderRunIntentPreviews();
  const approvalGateChecklistRecords = listApprovalGateChecklistRecords();
  const runIntentBlockerMatrix = listRunIntentBlockerMatrix();
  const runIntentBlockersForDisplay = runIntentBlockerMatrix.map((blocker) => ({
    ...blocker,
    affectedCapabilityFamilies: uniqueRecordsById(
      blocker.affectedCapabilityFamilies
    ),
    affectedWorkspaceTargets: uniqueStrings(blocker.affectedWorkspaceTargets),
  }));
  const approvalExpiryRevocationPreviews =
    listApprovalExpiryRevocationPreviews();
  const approvalPacketSummary = buildApprovalPacketSummary();
  const runIntentSummary = buildRunIntentSummary();
  const runIntentBlockerSummary = buildRunIntentBlockerSummary();
  const approvalPacketsByCapabilityFamily =
    groupApprovalPacketsByCapabilityFamily();
  const approvalPacketsByWorkspaceTarget =
    groupApprovalPacketsByWorkspaceTarget();
  const nextManualGatedRunAdmissionChecklist =
    buildNextManualGatedRunAdmissionChecklist();
  const representativeApprovalPacket = approvalPackets[0] ?? null;
  const representativeRunIntent = runIntentPreviews[0] ?? null;
  const representativeApprovalExpiryRevocation =
    approvalExpiryRevocationPreviews[0] ?? null;
  const manualRunAdmissionPreviews =
    listManualGatedModelProviderRunAdmissionPreviews();
  const admissionGateEvaluations = listAdmissionGateEvaluationRecords();
  const admissionTicketPreviews = listRunAdmissionTicketPreviews();
  const admissionDenialRecoveryPreviews =
    listRunAdmissionDenialRecoveryPreviews();
  const manualRunAdmissionBlockerMatrix =
    listManualRunAdmissionBlockerMatrix();
  const manualRunAdmissionBlockersForDisplay =
    manualRunAdmissionBlockerMatrix.map((blocker) => ({
      ...blocker,
      affectedCapabilityFamilies: uniqueRecordsById(
        blocker.affectedCapabilityFamilies
      ),
      affectedWorkspaceTargets: uniqueManualRunAdmissionDisplayStrings(
        blocker.affectedWorkspaceTargets
      ),
    }));
  const manualAdmissionAuditPreviews = listManualAdmissionAuditPreviews();
  const manualRunAdmissionSummary = buildManualRunAdmissionSummary();
  const admissionGateSummary = buildAdmissionGateSummary();
  const admissionBlockerSummary = buildAdmissionBlockerSummary();
  const nextRunAdmissionReviewRecoveryChecklist =
    buildNextRunAdmissionReviewAndRecoveryChecklist();
  const manualRunAdmissionCapabilityGroups =
    groupManualRunAdmissionPreviewsByCapabilityFamily();
  const manualRunAdmissionWorkspaceGroups =
    groupManualRunAdmissionPreviewsByWorkspaceTarget();
  const representativeManualRunAdmission = manualRunAdmissionPreviews[0] ?? null;
  const representativeAdmissionGateEvaluation =
    admissionGateEvaluations[0] ?? null;
  const representativeAdmissionTicket = admissionTicketPreviews[0] ?? null;
  const representativeAdmissionDenialRecovery =
    admissionDenialRecoveryPreviews[0] ?? null;
  const representativeManualAdmissionAuditPreview =
    manualAdmissionAuditPreviews[0] ?? null;
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
              {productUx.heroCopy.postureChips.map((item, index) => (
                <span
                  key={buildScopedItemKey("hero-posture", "chip", index, item)}
                  className={styles.blockedPill}
                >
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
                <p className={styles.panelEyebrow}>Next routing preview</p>
                <h3 className={styles.placeholderTitle}>
                  {commandCenter.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Routing preview next
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
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
              {providerReadinessSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
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
              {blockedProviderExecutionSummary.blockedLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Previous dry-run checkpoint</p>
                <h3 className={styles.placeholderTitle}>
                  {dryRunReadinessSummary.latestCompletedBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {`Phase ${dryRunReadinessSummary.highestDetectedPhase}`}
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
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
                {slot.capabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(slot.key, "capability", index, family)}
                    className={styles.metaPill}
                  >
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
              ].map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
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
                  What manual gated run admission preview requires
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
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
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

      <section
        className={styles.panel}
        aria-label="Server-only model adapter contracts"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Model Gateway contract layer</p>
            <h2 className={styles.panelTitle}>
              Server-only model adapter contracts
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          model adapters must run server-only. frontend provider calls are
          blocked. no model calls yet. no prompt sending. no provider SDKs
          imported. opaque credential references only. operator approval
          required. kill switch required. audit required. manual gated dry-run
          harness is now available as fixture-only preview. dry-run result
          review and recovery comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Contract posture</p>
                <h3 className={styles.placeholderTitle}>
                  model adapters must run server-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Blocked by default
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {blockedModelExecutionSummary.summary}
            </p>
            <div className={styles.workspaceMeta}>
              {blockedModelExecutionSummary.blockedLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Contract coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Typed capability families stay inert
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`${adapterReadinessSummary.contractCount} contracts`}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {`${adapterContractsByCapabilityFamily.length} capability families | ${adapterContractsByWorkspaceTarget.length} workspace targets | ${adapterReadinessSummary.requestEnvelopeCount} request envelope previews`}
            </p>
            <div className={styles.workspaceMeta}>
              {adapterContractsByCapabilityFamily.map((group) => (
                <span key={group.capabilityFamilyId} className={styles.metaPill}>
                  {`${group.capabilityFamilyLabel}: ${group.contractCount}`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Current checkpoint</p>
                <h3 className={styles.placeholderTitle}>
                  {adapterReadinessSummary.latestCompletedBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {`Phase ${adapterReadinessSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${adapterReadinessSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${commandCenter.nextLikelyBatch}`}
            </p>
            <div className={styles.workspaceMeta}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {adapterContracts.map((contract) => (
            <article key={contract.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Capability family</p>
                  <h3 className={styles.placeholderTitle}>{contract.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {contract.contractMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{contract.summary}</p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{contract.contractVersion}</span>
                <span className={styles.metaPill}>{contract.source}</span>
                <span className={styles.metaPill}>
                  {`Provider slot: ${contract.targetProviderSlotId}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`Workspace targets: ${contract.workspaceTargets.join(" | ")}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  contract.adapterPosture,
                  contract.frontendPosture,
                  contract.sdkPosture,
                  contract.credentialPosture,
                  contract.operatorApprovalRequired,
                  contract.killSwitchRequired,
                  contract.auditRequired,
                ].map((item, index) => (
                  <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>
                {contract.nextDryRunHarnessRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Adapter envelope preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only envelopes</p>
            <h2 className={styles.panelTitle}>Adapter envelope preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Blocked by default
          </span>
        </div>
        <p className={styles.panelBody}>
          request envelope preview. response envelope preview. error envelope
          preview. prompt payload is redacted placeholder only. provider
          response is not received. result is placeholder only.
          audit/approval/result persistence not implemented. execution is
          blocked by default.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Envelope posture</p>
                <h3 className={styles.placeholderTitle}>
                  adapter envelopes are preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`${adapterReadinessSummary.requestEnvelopeCount}/${adapterReadinessSummary.responseEnvelopeCount}/${adapterReadinessSummary.errorEnvelopeCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {adapterReadinessSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeAdapterRequestEnvelope ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>request envelope preview</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdapterRequestEnvelope.capabilityLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdapterRequestEnvelope.promptTransmissionState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`request envelope version: ${representativeAdapterRequestEnvelope.requestEnvelopeVersion}`}
              </p>
              <p className={styles.railBody}>
                {`workspace target: ${representativeAdapterRequestEnvelope.workspaceTarget}`}
              </p>
              <p className={styles.railBody}>
                {`operator objective: ${representativeAdapterRequestEnvelope.operatorObjective}`}
              </p>
              <p className={styles.railBody}>
                {`prompt payload posture: ${representativeAdapterRequestEnvelope.promptPayloadPosture}`}
              </p>
              <p className={styles.railBody}>
                {`credential reference posture: ${representativeAdapterRequestEnvelope.credentialReferencePosture}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAdapterRequestEnvelope.noExecutionStatement}
              </p>
            </article>
          ) : null}
          {representativeAdapterResponseEnvelope ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>response envelope preview</p>
                  <h3 className={styles.placeholderTitle}>
                    result is placeholder only
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdapterResponseEnvelope.providerResponseState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`response envelope version: ${representativeAdapterResponseEnvelope.responseEnvelopeVersion}`}
              </p>
              <p className={styles.railBody}>
                {`request envelope reference: ${representativeAdapterResponseEnvelope.requestEnvelopeReference}`}
              </p>
              <p className={styles.railBody}>
                {`token/cost accounting state: ${representativeAdapterResponseEnvelope.tokenCostAccountingState}`}
              </p>
              <p className={styles.railBody}>
                {`audit join state: ${representativeAdapterResponseEnvelope.auditJoinState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAdapterResponseEnvelope.noResultStatement}
              </p>
            </article>
          ) : null}
          {representativeAdapterErrorEnvelope ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>error envelope preview</p>
                  <h3 className={styles.placeholderTitle}>
                    provider error state is not received
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdapterErrorEnvelope.retryFallbackPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {`error envelope version: ${representativeAdapterErrorEnvelope.errorEnvelopeVersion}`}
              </p>
              <p className={styles.railBody}>
                {`timeout/cancel posture: ${representativeAdapterErrorEnvelope.timeoutCancelPosture}`}
              </p>
              <p className={styles.railBody}>
                {`recovery posture: ${representativeAdapterErrorEnvelope.recoveryPosture}`}
              </p>
              <div className={styles.workspaceMeta}>
                {representativeAdapterErrorEnvelope.localValidationErrorExamples.map(
                  (item, index) => (
                    <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                      {item}
                    </span>
                  )
                )}
              </div>
              <p className={styles.railFooter}>
                {
                  representativeAdapterErrorEnvelope.noProviderErrorReceivedStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.panel} aria-label="Server-only adapter gates">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Release gate posture</p>
            <h2 className={styles.panelTitle}>Server-only adapter gates</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Required
          </span>
        </div>
        <p className={styles.panelBody}>
          server-only boundary. no frontend provider call. no provider SDK
          import in frontend. no prompt sending from frontend. opaque
          credential reference. no plaintext secrets. no env var reads from
          frontend. operator approval. kill switch. audit. privacy/redaction.
          cost/rate/timeout. idempotency/replay block. result capture. manual
          review. no persistence until future backend batch.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocked model execution</p>
                <h3 className={styles.placeholderTitle}>
                  frontend provider calls are blocked
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                No execution
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {blockedModelExecutionSummary.summary}
            </p>
            <div className={styles.workspaceMeta}>
              {blockedModelExecutionSummary.blockedLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next routing preview</p>
                <h3 className={styles.placeholderTitle}>
                  Manual gated model provider run admission preview comes next
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {serverOnlyAdapterGateChecklist.map((gate) => (
            <article key={gate.id} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Required gate</p>
                  <h3 className={styles.placeholderTitle}>{gate.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  Required
                </span>
              </div>
              <p className={styles.placeholderSummary}>{gate.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Manual gated model adapter dry-run harness"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Fixture-only harness</p>
            <h2 className={styles.panelTitle}>
              Manual gated model adapter dry-run harness
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Fixture-only
          </span>
        </div>
        <p className={styles.panelBody}>
          dry-run harness is fixture-only. manual operator approval is required.
          manual confirmation is required. kill switch required. audit required.
          server-only adapter contract required. No model calls yet. No prompt
          sending. No provider SDKs imported. provider execution is blocked.
          Model adapter dry-run result review is now available. Athena model
          routing and provider selection preview comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Harness posture</p>
                <h3 className={styles.placeholderTitle}>
                  {dryRunHarness.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {`Phase ${dryRunHarness.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {`Source: ${dryRunHarness.source}. Harness mode: ${dryRunHarness.harnessMode}. Fixture mode: ${dryRunHarness.fixtureMode}.`}
            </p>
            <div className={styles.workspaceMeta}>
              {[
                "dry-run harness is fixture-only",
                dryRunHarness.manualOperatorApprovalRequired,
                dryRunHarness.manualConfirmationRequired,
                dryRunHarness.killSwitchRequired,
                dryRunHarness.auditRequired,
                "server-only adapter contract required",
              ].map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocked execution posture</p>
                <h3 className={styles.placeholderTitle}>
                  provider execution is blocked
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                No execution
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {blockedDryRunExecutionSummary.summary}
            </p>
            <div className={styles.workspaceMeta}>
              {blockedDryRunExecutionSummary.blockedLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>What comes next</p>
                <h3 className={styles.placeholderTitle}>
                  {commandCenter.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Routing preview next
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.panel} aria-label="Dry-run scenario preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Blocked scenario catalog</p>
            <h2 className={styles.panelTitle}>Dry-run scenario preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Blocked by default
          </span>
        </div>
        <p className={styles.panelBody}>
          text planning. code assistance. image storyboard. video prompt
          planning. audio narration. transcription/caption. embeddings/search.
          safety/moderation. local/private inference. each scenario is blocked
          by default. each scenario uses fixture-only packets.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Scenario readiness</p>
                <h3 className={styles.placeholderTitle}>
                  {`${dryRunReadinessSummary.scenarioCount} dry-run scenarios`}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Fixture-only
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {`${dryRunReadinessSummary.requestPacketCount} request packets | ${dryRunReadinessSummary.fixtureResultCount} fixture results | ${dryRunReadinessSummary.denialFailureCount} denial/failure previews`}
            </p>
            <div className={styles.workspaceMeta}>
              {dryRunReadinessSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeDryRunRequestPacket ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Fixture packet posture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeDryRunRequestPacket.operatorObjective}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunRequestPacket.fixtureInputState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`prompt payload posture: ${representativeDryRunRequestPacket.promptPayloadPosture}`}
              </p>
              <p className={styles.railBody}>
                {`prompt transmission state: ${representativeDryRunRequestPacket.promptTransmissionState}`}
              </p>
              <p className={styles.railBody}>
                {`approval reference posture: ${representativeDryRunRequestPacket.approvalReferencePosture}`}
              </p>
              <p className={styles.railBody}>
                {`audit reference posture: ${representativeDryRunRequestPacket.auditReferencePosture}`}
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Which workspace each scenario serves
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Product-first
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {dryRunScenarioWorkspaceGroups.map((group) => (
                <span key={group.workspaceTarget} className={styles.metaPill}>
                  {`${group.workspaceTarget}: ${group.scenarioCount}`}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {dryRunScenarios.map((scenario) => (
            <article key={scenario.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Static scenario</p>
                  <h3 className={styles.placeholderTitle}>{scenario.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {scenario.defaultState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{scenario.summary}</p>
              <p className={styles.railBody}>
                {`Workspace target: ${scenario.workspaceTarget}`}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {scenario.capabilityFamilyLabel}
                </span>
                <span className={styles.metaPill}>
                  {scenario.fixturePacketPosture}
                </span>
                <span className={styles.metaPill}>
                  {`Provider slot: ${scenario.providerSlotId}`}
                </span>
              </div>
              <p className={styles.railFooter}>{scenario.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Fixture result preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Static placeholder outputs</p>
            <h2 className={styles.panelTitle}>Fixture result preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Static preview only
          </span>
        </div>
        <p className={styles.panelBody}>
          static fixture result only. provider response is not received. model
          output is not generated. audit/approval/result persistence not
          implemented. denial/failure preview remains static. recovery is future
          manual review only.
        </p>
        <div className={styles.summaryGrid}>
          {representativeDryRunFixtureResult ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Fixture result posture</p>
                  <h3 className={styles.placeholderTitle}>
                    static fixture result only
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunFixtureResult.fixtureResultState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`provider response state: ${representativeDryRunFixtureResult.providerResponseState}`}
              </p>
              <p className={styles.railBody}>
                {`model output state: ${representativeDryRunFixtureResult.modelOutputState}`}
              </p>
              <p className={styles.railBody}>
                {`token/cost accounting state: ${representativeDryRunFixtureResult.tokenCostAccountingState}`}
              </p>
              <p className={styles.railBody}>
                {`audit join state: ${representativeDryRunFixtureResult.auditJoinState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeDryRunFixtureResult.noLiveResultStatement}
              </p>
            </article>
          ) : null}
          {representativeDryRunDenialFailure ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Denial/failure preview</p>
                  <h3 className={styles.placeholderTitle}>
                    recovery is future manual review only
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunDenialFailure.retryFallbackPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeDryRunDenialFailure.killSwitchBlockedExample}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunDenialFailure.missingApprovalExample}
              </p>
              <p className={styles.railBody}>
                {
                  representativeDryRunDenialFailure
                    .missingOpaqueCredentialReferenceExample
                }
              </p>
              <div className={styles.workspaceMeta}>
                {representativeDryRunDenialFailure.localValidationErrorExamples.map(
                  (item, index) => (
                    <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Preview-only joins</p>
                <h3 className={styles.placeholderTitle}>
                  audit/approval/result persistence not implemented
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Not persisted
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {[
                "provider response is not received",
                "model output is not generated",
                "audit/approval/result persistence not implemented",
                "denial/failure preview",
                "recovery is future manual review only",
              ].map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.panel} aria-label="Manual dry-run gates">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Manual approval and audit gates</p>
            <h2 className={styles.panelTitle}>Manual dry-run gates</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Required
          </span>
        </div>
        <p className={styles.panelBody}>
          Required gate checklist for operator approval, manual confirmation,
          kill switch, audit preview, server-only boundary, fixture-only
          packets, and blocked execution posture.
        </p>
        <div className={styles.summaryGrid}>
          {manualDryRunGateChecklist.map((gate) => (
            <article key={gate.id} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Required gate</p>
                  <h3 className={styles.placeholderTitle}>{gate.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  Required
                </span>
              </div>
              <p className={styles.placeholderSummary}>{gate.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Model adapter dry-run result review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Fixture-only review layer</p>
            <h2 className={styles.panelTitle}>
              Model adapter dry-run result review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Fixture-only
          </span>
        </div>
        <p className={styles.panelBody}>
          dry-run result review is fixture-only. provider response is not
          received. model output is not generated. static fixture result only.
          manual operator review required. audit required. result persistence
          not implemented. No model calls yet. No prompt sending. provider
          execution is blocked.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Current review checkpoint</p>
                <h3 className={styles.placeholderTitle}>
                  {resultReviewSummary.latestCompletedBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {`Phase ${resultReviewSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {`Result reviews: ${resultReviewSummary.resultReviewCount}. Quality reviews: ${resultReviewSummary.qualityReviewCount}. Safety reviews: ${resultReviewSummary.safetyReviewCount}.`}
            </p>
            <div className={styles.workspaceMeta}>
              {resultReviewSummary.summaryLines.slice(0, 8).map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeResultReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative review</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultReview.capabilityFamilyLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultReview.reviewMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeResultReview.noLiveResultReviewStatement}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeResultReview.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {representativeResultReview.manualOperatorReviewRequired}
                </span>
                <span className={styles.metaPill}>
                  {representativeResultReview.operatorApprovalRequired}
                </span>
                <span className={styles.metaPill}>
                  {representativeResultReview.auditRequired}
                </span>
              </div>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Capability families and workspace targets stay grouped
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Typed only
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultReviewCapabilityGroups.map((group) => (
                <span key={group.capabilityFamilyLabel} className={styles.blockedPill}>
                  {`${group.capabilityFamilyLabel}: ${group.reviewCount}`}
                </span>
              ))}
            </div>
            <div className={styles.workspaceMeta}>
              {resultReviewWorkspaceGroups.map((group) => (
                <span key={group.workspaceTarget} className={styles.metaPill}>
                  {`${group.workspaceTarget}: ${group.reviewCount}`}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Dry-run quality and safety review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Static review evidence</p>
            <h2 className={styles.panelTitle}>
              Dry-run quality and safety review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
            Static preview only
          </span>
        </div>
        <p className={styles.panelBody}>
          quality review is static preview only. safety review is static preview
          only. redaction review is static preview only. prompt leakage check.
          credential leakage check. token leakage check. unsafe output check.
          operator review required.
        </p>
        <div className={styles.summaryGrid}>
          {representativeQualityReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Quality posture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeQualityReview.capabilityFamilyLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  {representativeQualityReview.qualityState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeQualityReview.noLiveQualityResultStatement}
              </p>
              <div className={styles.workspaceMeta}>
                {representativeQualityReview.acceptanceCriteria.map((item, index) => (
                  <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
          {representativeSafetyReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Safety posture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSafetyReview.capabilityFamilyLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  {representativeSafetyReview.safetyReviewState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeSafetyReview.noLiveSafetyResultStatement}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  "prompt leakage check",
                  "credential leakage check",
                  "token leakage check",
                  "unsafe output check",
                  representativeSafetyReview.requiredOperatorReview,
                ].map((item, index) => (
                  <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.panel} aria-label="Dry-run recovery plan">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Manual recovery only</p>
            <h2 className={styles.panelTitle}>Dry-run recovery plan</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            No retry / fallback
          </span>
        </div>
        <p className={styles.panelBody}>
          retry disabled. fallback disabled. recovery is manual review only.
          missing approval recovery. kill switch blocked recovery. missing
          opaque credential recovery. provider not called recovery. result not
          generated recovery. next safe batch recommendation.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Recovery posture</p>
                <h3 className={styles.placeholderTitle}>
                  {recoverySummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {recoverySummary.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {recoverySummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeRecoveryPlan ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative recovery</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeRecoveryPlan.capabilityFamilyLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  {representativeRecoveryPlan.recoveryPosture}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeRecoveryPlan.noRetryNoFallbackNoExecutionStatement}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  representativeRecoveryPlan.missingApprovalRecovery,
                  representativeRecoveryPlan.killSwitchBlockedRecovery,
                  representativeRecoveryPlan.missingOpaqueCredentialRecovery,
                ].map((item, index) => (
                  <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.panel} aria-label="Dry-run acceptance matrix">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Blocked / fixture-only criteria</p>
            <h2 className={styles.panelTitle}>Dry-run acceptance matrix</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Pending manual review
          </span>
        </div>
        <p className={styles.panelBody}>
          acceptance, blocker, safety, privacy, cost/rate, audit, approval,
          server-only, and credential isolation criteria stay visible together
          while the current state remains blocked / fixture-only.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Acceptance posture</p>
                <h3 className={styles.placeholderTitle}>
                  {acceptanceSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`Records: ${acceptanceSummary.acceptanceMatrixCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {acceptanceSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeAcceptanceMatrix ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative matrix</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAcceptanceMatrix.capabilityFamilyLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  {representativeAcceptanceMatrix.operatorDecisionState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {[
                  "acceptance criteria",
                  "blocker criteria",
                  "safety criteria",
                  "privacy criteria",
                  "cost/rate criteria",
                  "audit criteria",
                  "approval criteria",
                  "server-only criteria",
                  "credential isolation criteria",
                ].map((item, index) => (
                  <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>
                {representativeAcceptanceMatrix.nextAction}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.panel} aria-label="Athena model routing preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Athena / Jarvis Model Gateway</p>
            <h2 className={styles.panelTitle}>Athena model routing preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview model capability routing. routing is preview-only.
          provider selection is static preview only. No model calls yet. No
          prompt sending. No provider SDKs imported. provider execution is
          blocked. server-only adapters required. dry-run result review
          required. approval packet and run intent preview comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Routing posture</p>
                <h3 className={styles.placeholderTitle}>
                  {providerSelectionSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`Phase ${providerSelectionSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              Source: Athena / Jarvis Model Gateway. routing preview version:
              athena-model-routing-preview-v1.
            </p>
            <div className={styles.workspaceMeta}>
              {providerSelectionSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>
                {`Routing previews: ${providerSelectionSummary.routingPreviewCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Capability groups: ${routingPreviewCapabilityGroups.length}`}
              </span>
              <span className={styles.metaPill}>
                {`Workspace targets: ${routingPreviewWorkspaceGroups.length}`}
              </span>
            </div>
          </article>
          {routingPreviews.map((preview) => (
            <article key={preview.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>{preview.operatorGoalLabel}</p>
                  <h3 className={styles.placeholderTitle}>
                    {preview.operatorRequestPhrase}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {preview.currentState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {preview.normalizedObjective}
              </p>
              <div className={styles.workspaceMeta}>
                {preview.selectedCapabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(
                      preview.key,
                      "capability",
                      index,
                      family.id
                    )}
                    className={styles.metaPill}
                  >
                    {family.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {preview.candidateProviderSlots.map((slot, index) => (
                  <span
                    key={buildScopedItemKey(
                      preview.key,
                      "provider-slot",
                      index,
                      slot.id
                    )}
                    className={styles.blockedPill}
                  >
                    {slot.label}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{preview.blockedDefaultReason}</p>
              <p className={styles.railFooter}>{preview.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Provider selection rationale">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Static provider decision records</p>
            <h2 className={styles.panelTitle}>Provider selection rationale</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Not connected
          </span>
        </div>
        <p className={styles.panelBody}>
          operator request. normalized objective. selected capability families.
          candidate provider slots. preferred provider slot label. backup
          provider slot label. local/private alternative. selection rationale.
          blocked selection reason. next safe action.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Rationale posture</p>
                <h3 className={styles.placeholderTitle}>
                  {providerSelectionSummary.latestCompletedBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`Rationales: ${providerSelectionSummary.rationaleCount}`}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              Preferred slot labels stay static preview only. No live provider is
              selected. current state: preview-only / not connected.
            </p>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>
                preferred provider slot label
              </span>
              <span className={styles.metaPill}>backup provider slot label</span>
              <span className={styles.metaPill}>local/private alternative</span>
            </div>
          </article>
          {providerSelectionRationales.map((rationale) => (
            <article key={rationale.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Operator request</p>
                  <h3 className={styles.placeholderTitle}>
                    {rationale.operatorRequestPhrase}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {rationale.currentState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {rationale.normalizedObjective}
              </p>
              <div className={styles.workspaceMeta}>
                {rationale.selectedCapabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(
                      rationale.key,
                      "capability",
                      index,
                      family.id
                    )}
                    className={styles.metaPill}
                  >
                    {family.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {rationale.candidateProviderSlots.map((slot, index) => (
                  <span
                    key={buildScopedItemKey(
                      rationale.key,
                      "provider-slot",
                      index,
                      slot.id
                    )}
                    className={styles.blockedPill}
                  >
                    {slot.label}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>
                {`preferred provider slot label: ${rationale.preferredProviderSlotLabel}`}
              </p>
              <p className={styles.railBody}>
                {`backup provider slot label: ${rationale.backupProviderSlotLabel}`}
              </p>
              <p className={styles.railBody}>
                {`local/private alternative: ${rationale.localPrivateAlternativeLabel}`}
              </p>
              <p className={styles.railBody}>{rationale.selectionRationale}</p>
              <p className={styles.railBody}>{rationale.blockedSelectionReason}</p>
              <p className={styles.railFooter}>{rationale.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Model routing chain preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Multi-step static routing</p>
            <h2 className={styles.panelTitle}>Model routing chain preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Blocked/default
          </span>
        </div>
        <p className={styles.panelBody}>
          product video routing chain. website build routing chain. avatar
          presenter routing chain. audit review routing chain. local/private
          routing chain. every step is blocked/default. every step requires
          server-only adapters, approval, audit, and dry-run review.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Chain posture</p>
                <h3 className={styles.placeholderTitle}>
                  {modelRoutingChainSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`Chains: ${modelRoutingChainSummary.chainCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {modelRoutingChainSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Step count: ${modelRoutingChainSummary.stepCount}`}
            </p>
          </article>
          {modelRoutingChains.map((chain) => (
            <article key={chain.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Routing chain</p>
                  <h3 className={styles.placeholderTitle}>{chain.chainLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {chain.workspaceTarget}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {chain.blockedDefaultReason}
              </p>
              <div className={styles.workspaceMeta}>
                {chain.orderedCapabilitySteps.map((step, index) => (
                  <span
                    key={buildScopedItemKey(
                      chain.key,
                      "step-label",
                      index,
                      step.id
                    )}
                    className={styles.metaPill}
                  >
                    {step.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {chain.orderedCapabilitySteps.map((step, index) => (
                  <span
                    key={buildScopedItemKey(
                      chain.key,
                      "step-requirement",
                      index,
                      step.id
                    )}
                    className={styles.blockedPill}
                  >
                    {`${step.label}: ${step.serverOnlyAdapterRequirement}, ${step.approvalRequirement}, ${step.auditRequirement}, ${step.dryRunReviewRequirement}`}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>{chain.noExecutionStatement}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Provider selection blockers">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Blocked selection matrix</p>
            <h2 className={styles.panelTitle}>Provider selection blockers</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Recovery required
          </span>
        </div>
        <p className={styles.panelBody}>
          blocker matrix entries and recovery actions stay compact, visible, and
          preview-only while provider execution is blocked by default.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocker posture</p>
                <h3 className={styles.placeholderTitle}>
                  {blockedProviderSelectionSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Blockers: ${blockedProviderSelectionSummary.blockerCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {blockedProviderSelectionSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Critical: ${blockedProviderSelectionSummary.criticalBlockerCount} | High: ${blockedProviderSelectionSummary.highBlockerCount}`}
            </p>
          </article>
          {providerSelectionBlockersForDisplay.map((blocker) => (
            <article key={blocker.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Blocker</p>
                  <h3 className={styles.placeholderTitle}>{blocker.blockerId}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {blocker.severity}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {blocker.operatorFacingExplanation}
              </p>
              <div className={styles.workspaceMeta}>
                {blocker.affectedCapabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(
                      blocker.key,
                      "capability",
                      index,
                      family.id
                    )}
                    className={styles.metaPill}
                  >
                    {family.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {blocker.affectedWorkspaceTargets.map((target, index) => (
                  <span
                    key={buildScopedItemKey(
                      blocker.key,
                      "workspace",
                      index,
                      target
                    )}
                    className={styles.blockedPill}
                  >
                    {target}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{blocker.requiredRecoveryAction}</p>
              <p className={styles.railFooter}>{blocker.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Model provider approval packet"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Athena routing follow-up</p>
            <h2 className={styles.panelTitle}>Model provider approval packet</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can draft model provider approval packets. approval packet is
          preview-only. operator review only. prompt payload is redacted
          placeholder only. No prompt sending. No model calls yet. No provider
          SDKs imported. provider execution is blocked. opaque credential
          references only. approval expiry and revocation are preview-only.
          manual gated run admission preview comes next.
        </p>
        {/* Historical smoke marker preserved for prior batch coverage:
            model provider approval packet and run intent preview comes next. */}
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Approval packet posture</p>
                <h3 className={styles.placeholderTitle}>
                  {approvalPacketSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {`Packets: ${approvalPacketSummary.approvalPacketCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {approvalPacketSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Run intents: ${approvalPacketSummary.runIntentCount} | Checklists: ${approvalPacketSummary.gateChecklistCount} | Blockers: ${approvalPacketSummary.blockerCount}`}
            </p>
          </article>
          {representativeApprovalPacket ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative packet</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeApprovalPacket.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeApprovalPacket.approvalPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeApprovalPacket.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected provider slot label: ${representativeApprovalPacket.selectedProviderSlotLabel}`}
                </span>
                <span className={styles.metaPill}>
                  {`backup provider slot label: ${representativeApprovalPacket.backupProviderSlotLabel}`}
                </span>
                <span className={styles.metaPill}>
                  {`local/private alternative: ${representativeApprovalPacket.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`approval scope summary: ${representativeApprovalPacket.approvalScopeSummary}`}
              </p>
              <p className={styles.railBody}>
                {`approved action summary: ${representativeApprovalPacket.approvedActionSummary}`}
              </p>
              <p className={styles.railBody}>
                {`disallowed action summary: ${representativeApprovalPacket.disallowedActionSummary}`}
              </p>
              <p className={styles.railFooter}>
                {representativeApprovalPacket.noExecutionStatement}
              </p>
            </article>
          ) : null}
          {representativeApprovalExpiryRevocation ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Approval lifecycle</p>
                  <h3 className={styles.placeholderTitle}>
                    approval expiry and revocation are preview-only
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  Preview-only
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`expiry posture: ${representativeApprovalExpiryRevocation.expiryPosture}`}
                </span>
                <span className={styles.metaPill}>
                  {`revocation posture: ${representativeApprovalExpiryRevocation.revocationPosture}`}
                </span>
                <span className={styles.metaPill}>
                  {`replay prevention posture: ${representativeApprovalExpiryRevocation.replayPreventionPosture}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`operator re-approval requirement: ${representativeApprovalExpiryRevocation.operatorReApprovalRequirement}`}
              </p>
              <p className={styles.railBody}>
                {`stale approval reason examples: ${representativeApprovalExpiryRevocation.staleApprovalReasonExamples.join(" | ")}`}
              </p>
              <p className={styles.railFooter}>
                {representativeApprovalExpiryRevocation.explicitNoApprovedRunStatement}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by capability family</p>
                <h3 className={styles.placeholderTitle}>
                  Approval packets stay capability-aware
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {approvalPacketsByCapabilityFamily.map((group) => (
                <span
                  key={group.capabilityFamilyId}
                  className={styles.metaPill}
                >{`${group.capabilityFamilyLabel}: ${group.approvalPacketCount}`}</span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by workspace target</p>
                <h3 className={styles.placeholderTitle}>
                  Approval packets stay workspace-specific
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {approvalPacketsByWorkspaceTarget.map((group) => (
                <span
                  key={group.workspaceTarget}
                  className={styles.metaPill}
                >{`${group.workspaceTarget}: ${group.approvalPacketCount}`}</span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>What comes next</p>
                <h3 className={styles.placeholderTitle}>
                  {approvalPacketSummary.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Next likely batch
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {approvalPackets.map((packet) => (
            <article key={packet.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Approval packet example</p>
                  <h3 className={styles.placeholderTitle}>{packet.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  {packet.packetMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {packet.operatorRequestPhrase}
              </p>
              <div className={styles.workspaceMeta}>
                {packet.selectedCapabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(
                      packet.key,
                      "capability",
                      index,
                      family.id
                    )}
                    className={styles.metaPill}
                  >
                    {family.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.blockedPill}>
                  {`selected provider slot label: ${packet.selectedProviderSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`backup provider slot label: ${packet.backupProviderSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`local/private alternative: ${packet.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`prompt payload posture: ${packet.promptPayloadPosture}`}
              </p>
              <p className={styles.railBody}>
                {`prompt transmission state: ${packet.promptTransmissionState}`}
              </p>
              <p className={styles.railBody}>
                {`credential reference posture: ${packet.credentialReferencePosture}`}
              </p>
              <p className={styles.railFooter}>
                {packet.nextManualGatedRunAdmissionRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Run intent preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Inert envelope only</p>
            <h2 className={styles.panelTitle}>Run intent preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Not admitted
          </span>
        </div>
        <p className={styles.panelBody}>
          run intent is preview-only. run admission state: not admitted.
          selected capability family, provider slot label, backup provider slot
          label, and local/private alternative stay visible without sending any
          prompt. idempotency key posture, replay block posture, single-run
          lock posture, manual confirmation state, blocked/default reason, and
          explicit no-execution statement all stay operator-visible.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Run intent posture</p>
                <h3 className={styles.placeholderTitle}>
                  {runIntentSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Run intents: ${runIntentSummary.runIntentCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {runIntentSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Workspace targets: ${runIntentSummary.uniqueWorkspaceTargetCount} | Capability families: ${runIntentSummary.uniqueCapabilityFamilyCount}`}
            </p>
          </article>
          {representativeRunIntent ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative run intent</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeRunIntent.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeRunIntent.runAdmissionState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`selected capability family: ${representativeRunIntent.capabilityFamily.label}`}
                </span>
                <span className={styles.metaPill}>
                  {`provider slot label: ${representativeRunIntent.providerSlotLabel}`}
                </span>
                <span className={styles.metaPill}>
                  {`backup provider slot label: ${representativeRunIntent.backupProviderSlotLabel}`}
                </span>
                <span className={styles.metaPill}>
                  {`local/private alternative: ${representativeRunIntent.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`idempotency key posture: ${representativeRunIntent.idempotencyKeyPosture}`}
              </p>
              <p className={styles.railBody}>
                {`replay block posture: ${representativeRunIntent.replayBlockPosture}`}
              </p>
              <p className={styles.railBody}>
                {`single-run lock posture: ${representativeRunIntent.singleRunLockPosture}`}
              </p>
              <p className={styles.railBody}>
                {`manual confirmation state: ${representativeRunIntent.manualConfirmationState}`}
              </p>
              <p className={styles.railBody}>
                {`blocked/default reason: ${representativeRunIntent.blockedDefaultReason}`}
              </p>
              <p className={styles.railFooter}>
                {`explicit no-execution statement: ${representativeRunIntent.explicitNoExecutionStatement}`}
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Run admission follow-up</p>
                <h3 className={styles.placeholderTitle}>
                  {runIntentSummary.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Next likely batch
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {runIntentPreviews.map((runIntent) => (
            <article key={runIntent.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Run intent example</p>
                  <h3 className={styles.placeholderTitle}>{runIntent.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {runIntent.runMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {runIntent.operatorRequestPhrase}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${runIntent.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${runIntent.capabilityFamily.label}`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.blockedPill}>
                  {`provider slot label: ${runIntent.providerSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`backup provider slot label: ${runIntent.backupProviderSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`local/private alternative: ${runIntent.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`prompt payload posture: ${runIntent.promptPayloadPosture}`}
              </p>
              <p className={styles.railBody}>
                {`prompt transmission state: ${runIntent.promptTransmissionState}`}
              </p>
              <p className={styles.railBody}>
                {`approval reference posture: ${runIntent.approvalReferencePosture}`}
              </p>
              <p className={styles.railBody}>
                {`audit reference posture: ${runIntent.auditReferencePosture}`}
              </p>
              <p className={styles.railFooter}>
                {runIntent.explicitNoExecutionStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Approval gate checklist">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Approval-required controls</p>
            <h2 className={styles.panelTitle}>Approval gate checklist</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
            Required review
          </span>
        </div>
        <p className={styles.panelBody}>
          approval gates are preview-only. operator approval, manual
          confirmation, approval scope, approval expiry, approval revocation,
          kill switch, audit, server-only boundary, no frontend provider call,
          no provider SDK import in frontend, no prompt sending, opaque
          credential reference, no plaintext secrets, privacy/redaction,
          cost/rate/timeout, idempotency/replay block, single-run lock,
          dry-run result review, acceptance matrix review, manual recovery
          state, and no persistence until future backend batch remain visible.
        </p>
        <div className={styles.summaryGrid}>
          {approvalGateChecklistRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Checklist item</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  {record.requirementState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{record.summary}</p>
              <p className={styles.railFooter}>{record.nextOperatorAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Run intent blockers">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact blocker matrix</p>
            <h2 className={styles.panelTitle}>Run intent blockers</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Recovery required
          </span>
        </div>
        <p className={styles.panelBody}>
          run intent blockers are preview-only. blocker matrix entries stay
          compact, provider execution is blocked by default, and each blocker
          keeps a required recovery action plus the next safe action visible.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocker posture</p>
                <h3 className={styles.placeholderTitle}>
                  {runIntentBlockerSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Blockers: ${runIntentBlockerSummary.blockerCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {runIntentBlockerSummary.summaryLines.map((item, index) => (
                <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.metaPill}>
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Critical: ${runIntentBlockerSummary.criticalBlockerCount} | High: ${runIntentBlockerSummary.highBlockerCount} | Medium: ${runIntentBlockerSummary.mediumBlockerCount}`}
            </p>
          </article>
          {runIntentBlockersForDisplay.map((blocker) => (
            <article key={blocker.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Blocker</p>
                  <h3 className={styles.placeholderTitle}>{blocker.blockerId}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {blocker.severity}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {blocker.operatorFacingExplanation}
              </p>
              <div className={styles.workspaceMeta}>
                {blocker.affectedCapabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(
                      blocker.key,
                      "capability",
                      index,
                      family.id
                    )}
                    className={styles.metaPill}
                  >
                    {family.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {blocker.affectedWorkspaceTargets.map((target, index) => (
                  <span
                    key={buildScopedItemKey(
                      blocker.key,
                      "workspace",
                      index,
                      target
                    )}
                    className={styles.blockedPill}
                  >
                    {target}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{blocker.requiredRecoveryAction}</p>
              <p className={styles.railFooter}>{blocker.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Manual gated model provider run admission preview"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Athena run admission layer</p>
            <h2 className={styles.panelTitle}>
              Manual gated model provider run admission preview
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Not admitted
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview manual model provider run admission. run admission
          is preview-only. run admission state: not admitted. admission
          decision is held. admission token is not issued. admission lease is
          not created. No prompt sending. No model calls yet. No provider SDKs
          imported. provider execution is blocked. queue dispatch is blocked.
          worker dispatch is blocked. job execution is blocked. manual approval
          required. manual confirmation required. kill switch required. audit
          required. run admission review and recovery preview comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Run admission posture</p>
                <h3 className={styles.placeholderTitle}>
                  {manualRunAdmissionSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Admissions: ${manualRunAdmissionSummary.admissionPreviewCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {manualRunAdmissionSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "manual-run-admission-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.metaPill}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Gate evaluations: ${manualRunAdmissionSummary.gateEvaluationCount} | Tickets: ${manualRunAdmissionSummary.ticketPreviewCount} | Recoveries: ${manualRunAdmissionSummary.denialRecoveryCount} | Audits: ${manualRunAdmissionSummary.auditPreviewCount}`}
            </p>
          </article>
          {representativeManualRunAdmission ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative admission</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeManualRunAdmission.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeManualRunAdmission.runAdmissionState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeManualRunAdmission.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${representativeManualRunAdmission.selectedCapabilityFamily.label}`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.blockedPill}>
                  {`provider slot label: ${representativeManualRunAdmission.providerSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`backup provider slot label: ${representativeManualRunAdmission.backupProviderSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`local/private alternative: ${representativeManualRunAdmission.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`admission decision state: ${representativeManualRunAdmission.admissionDecisionState}`}
              </p>
              <p className={styles.railBody}>
                {`admission token state: ${representativeManualRunAdmission.admissionTokenState}`}
              </p>
              <p className={styles.railBody}>
                {`admission lease state: ${representativeManualRunAdmission.admissionLeaseState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeManualRunAdmission.nextRunAdmissionReviewRecoveryRequirement}
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>What comes next</p>
                <h3 className={styles.placeholderTitle}>
                  {manualRunAdmissionSummary.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Next likely batch
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextRunAdmissionReviewRecoveryChecklist.map((item, index) => (
                <article
                  key={buildScopedItemKey(
                    "manual-run-admission-checklist",
                    "item",
                    index,
                    item
                  )}
                  className={styles.railCard}
                >
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by capability family</p>
                <h3 className={styles.placeholderTitle}>
                  Run admission stays capability-aware
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {manualRunAdmissionCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "manual-run-admission-capability-group",
                    "group",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.metaPill}
                >{`${group.capabilityFamilyLabel}: ${group.admissionPreviewCount}`}</span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by workspace target</p>
                <h3 className={styles.placeholderTitle}>
                  Run admission stays workspace-specific
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {manualRunAdmissionWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "manual-run-admission-workspace-group",
                    "group",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.metaPill}
                >{`${group.workspaceTarget}: ${group.admissionPreviewCount}`}</span>
              ))}
            </div>
          </article>
          {representativeManualAdmissionAuditPreview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Admission audit posture</p>
                  <h3 className={styles.placeholderTitle}>preview-only audit</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  {representativeManualAdmissionAuditPreview.auditPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeManualAdmissionAuditPreview.gateEvidenceSummary}
              </p>
              <p className={styles.railBody}>
                {representativeManualAdmissionAuditPreview.blockedActionSummary}
              </p>
              <p className={styles.railFooter}>
                {representativeManualAdmissionAuditPreview.nextReviewRecoveryRequirement}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {manualRunAdmissionPreviews.map((preview) => (
            <article key={preview.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Admission preview</p>
                  <h3 className={styles.placeholderTitle}>{preview.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {preview.admissionMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {preview.operatorRequestPhrase}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${preview.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${preview.selectedCapabilityFamily.label}`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.blockedPill}>
                  {`provider slot label: ${preview.providerSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`backup provider slot label: ${preview.backupProviderSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`local/private alternative: ${preview.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`run admission state: ${preview.runAdmissionState}`}
              </p>
              <p className={styles.railBody}>
                {`admission token state: ${preview.admissionTokenState}`}
              </p>
              <p className={styles.railBody}>
                {`admission lease state: ${preview.admissionLeaseState}`}
              </p>
              <p className={styles.railFooter}>
                {preview.nextRunAdmissionReviewRecoveryRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Run admission gate evaluation">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Held gate review</p>
            <h2 className={styles.panelTitle}>Run admission gate evaluation</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Held / not admitted
          </span>
        </div>
        <p className={styles.panelBody}>
          operator approval gate. manual confirmation gate. kill switch gate.
          audit gate. server-only adapter gate. opaque credential gate. prompt
          payload review gate. privacy/redaction gate. cost/rate/timeout gate.
          idempotency/replay gate. single-run lock gate. dry-run result review
          gate. acceptance matrix gate. approval expiry gate. approval
          revocation gate. overall gate decision: held / not admitted.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate posture</p>
                <h3 className={styles.placeholderTitle}>
                  {admissionGateSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Gate evaluations: ${admissionGateSummary.gateEvaluationCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {admissionGateSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "admission-gate-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.metaPill}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Held decisions: ${admissionGateSummary.heldDecisionCount}`}
            </p>
          </article>
          {representativeAdmissionGateEvaluation ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative held gates</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionGateEvaluation.admissionPreviewId}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdmissionGateEvaluation.overallGateDecision}
                </span>
              </div>
              <p className={styles.railBody}>
                {`operator approval gate: ${representativeAdmissionGateEvaluation.operatorApprovalGateState}`}
              </p>
              <p className={styles.railBody}>
                {`manual confirmation gate: ${representativeAdmissionGateEvaluation.manualConfirmationGateState}`}
              </p>
              <p className={styles.railBody}>
                {`kill switch gate: ${representativeAdmissionGateEvaluation.killSwitchGateState}`}
              </p>
              <p className={styles.railBody}>
                {`audit gate: ${representativeAdmissionGateEvaluation.auditGateState}`}
              </p>
              <p className={styles.railBody}>
                {`server-only adapter gate: ${representativeAdmissionGateEvaluation.serverOnlyAdapterGateState}`}
              </p>
              <p className={styles.railBody}>
                {`opaque credential gate: ${representativeAdmissionGateEvaluation.opaqueCredentialGateState}`}
              </p>
              <p className={styles.railBody}>
                {`prompt payload review gate: ${representativeAdmissionGateEvaluation.promptPayloadReviewGateState}`}
              </p>
              <p className={styles.railBody}>
                {`privacy/redaction gate: ${representativeAdmissionGateEvaluation.privacyRedactionGateState}`}
              </p>
              <p className={styles.railBody}>
                {`cost/rate/timeout gate: ${representativeAdmissionGateEvaluation.costRateTimeoutGateState}`}
              </p>
              <p className={styles.railBody}>
                {`idempotency/replay gate: ${representativeAdmissionGateEvaluation.idempotencyReplayGateState}`}
              </p>
              <p className={styles.railBody}>
                {`single-run lock gate: ${representativeAdmissionGateEvaluation.singleRunLockGateState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run result review gate: ${representativeAdmissionGateEvaluation.dryRunResultReviewGateState}`}
              </p>
              <p className={styles.railBody}>
                {`acceptance matrix gate: ${representativeAdmissionGateEvaluation.acceptanceMatrixGateState}`}
              </p>
              <p className={styles.railBody}>
                {`approval expiry gate: ${representativeAdmissionGateEvaluation.approvalExpiryGateState}`}
              </p>
              <p className={styles.railBody}>
                {`approval revocation gate: ${representativeAdmissionGateEvaluation.approvalRevocationGateState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAdmissionGateEvaluation.explicitNoAdmissionStatement}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {admissionGateEvaluations.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate evaluation</p>
                  <h3 className={styles.placeholderTitle}>{record.admissionPreviewId}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.overallGateDecision}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{record.blockedDefaultReason}</p>
              <p className={styles.railFooter}>
                {record.explicitNoAdmissionStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Admission ticket preview">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only ticket posture</p>
            <h2 className={styles.panelTitle}>Admission ticket preview</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Not issued
          </span>
        </div>
        <p className={styles.panelBody}>
          ticket state: not issued. admission token state: not issued.
          admission lease state: not created. deterministic preview idempotency
          key only. replay block posture. single-run lock posture.
          queue dispatch state: not dispatched. worker dispatch state: not
          dispatched. job execution state: not executed. explicit
          no-ticket-no-execution statement.
        </p>
        <div className={styles.summaryGrid}>
          {representativeAdmissionTicket ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative ticket</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionTicket.admissionPreviewId}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdmissionTicket.ticketState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`admission token state: ${representativeAdmissionTicket.admissionTokenState}`}
              </p>
              <p className={styles.railBody}>
                {`admission lease state: ${representativeAdmissionTicket.admissionLeaseState}`}
              </p>
              <p className={styles.railBody}>
                {`idempotency key posture: ${representativeAdmissionTicket.idempotencyKeyPosture}`}
              </p>
              <p className={styles.railBody}>
                {`replay block posture: ${representativeAdmissionTicket.replayBlockPosture}`}
              </p>
              <p className={styles.railBody}>
                {`single-run lock posture: ${representativeAdmissionTicket.singleRunLockPosture}`}
              </p>
              <p className={styles.railBody}>
                {`queue dispatch state: ${representativeAdmissionTicket.queueDispatchState}`}
              </p>
              <p className={styles.railBody}>
                {`worker dispatch state: ${representativeAdmissionTicket.workerDispatchState}`}
              </p>
              <p className={styles.railBody}>
                {`job execution state: ${representativeAdmissionTicket.jobExecutionState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAdmissionTicket.explicitNoTicketNoExecutionStatement}
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Ticket posture</p>
                <h3 className={styles.placeholderTitle}>preview-only tickets</h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Tickets: ${admissionTicketPreviews.length}`}
              </span>
            </div>
            <p className={styles.railBody}>
              ticket state: not issued. admission token state: not issued.
            </p>
            <p className={styles.railBody}>
              admission lease state: not created. queue dispatch state: not
              dispatched.
            </p>
            <p className={styles.railBody}>
              worker dispatch state: not dispatched. job execution state: not
              executed.
            </p>
            <p className={styles.railFooter}>
              No ticket issued. No queue dispatch. No worker dispatch. No job
              execution.
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {admissionTicketPreviews.map((ticket) => (
            <article key={ticket.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Ticket preview</p>
                  <h3 className={styles.placeholderTitle}>{ticket.admissionPreviewId}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {ticket.ticketMode}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{ticket.blockedDefaultReason}</p>
              <p className={styles.railBody}>
                {`ticket state: ${ticket.ticketState}`}
              </p>
              <p className={styles.railBody}>
                {`admission token state: ${ticket.admissionTokenState}`}
              </p>
              <p className={styles.railBody}>
                {`admission lease state: ${ticket.admissionLeaseState}`}
              </p>
              <p className={styles.railBody}>
                {`queue dispatch state: ${ticket.queueDispatchState}`}
              </p>
              <p className={styles.railBody}>
                {`worker dispatch state: ${ticket.workerDispatchState}`}
              </p>
              <p className={styles.railFooter}>
                {`job execution state: ${ticket.jobExecutionState}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Admission blockers and recovery">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Manual recovery posture</p>
            <h2 className={styles.panelTitle}>Admission blockers and recovery</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Manual review only
          </span>
        </div>
        <p className={styles.panelBody}>
          retry disabled. fallback disabled. recovery is manual review only. no
          provider execution. no queue dispatch. no worker dispatch. no job
          execution. no persistence.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Blocker posture</p>
                <h3 className={styles.placeholderTitle}>
                  {admissionBlockerSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Blockers: ${admissionBlockerSummary.blockerCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {admissionBlockerSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "manual-run-admission-blocker-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.metaPill}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className={styles.railFooter}>
              {`Critical: ${admissionBlockerSummary.criticalBlockerCount} | High: ${admissionBlockerSummary.highBlockerCount} | Medium: ${admissionBlockerSummary.mediumBlockerCount}`}
            </p>
          </article>
          {representativeAdmissionDenialRecovery ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative recovery</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionDenialRecovery.admissionPreviewId}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdmissionDenialRecovery.recoveryPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeAdmissionDenialRecovery.missingManualApprovalRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeAdmissionDenialRecovery.missingManualConfirmationRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeAdmissionDenialRecovery.killSwitchActiveRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeAdmissionDenialRecovery.acceptanceMatrixUnresolvedRecovery}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAdmissionDenialRecovery
                    .explicitNoRetryNoFallbackNoExecutionStatement
                }
              </p>
            </article>
          ) : null}
          {representativeManualAdmissionAuditPreview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Audit preview</p>
                  <h3 className={styles.placeholderTitle}>not persisted</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  {representativeManualAdmissionAuditPreview.auditPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeManualAdmissionAuditPreview.gateEvidenceSummary}
              </p>
              <p className={styles.railBody}>
                {representativeManualAdmissionAuditPreview.blockedActionSummary}
              </p>
              <p className={styles.railFooter}>
                {representativeManualAdmissionAuditPreview.noPersistenceStatement}
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next safe checklist</p>
                <h3 className={styles.placeholderTitle}>
                  {manualRunAdmissionSummary.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Next likely batch
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextRunAdmissionReviewRecoveryChecklist.map((item, index) => (
                <article
                  key={buildScopedItemKey(
                    "manual-run-admission-recovery-checklist",
                    "item",
                    index,
                    item
                  )}
                  className={styles.railCard}
                >
                  <p className={styles.railBody}>{item}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {manualRunAdmissionBlockersForDisplay.map((blocker) => (
            <article key={blocker.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Admission blocker</p>
                  <h3 className={styles.placeholderTitle}>{blocker.blockerId}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {blocker.severity}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {blocker.operatorFacingExplanation}
              </p>
              <div className={styles.workspaceMeta}>
                {blocker.affectedCapabilityFamilies.map((family, index) => (
                  <span
                    key={buildScopedItemKey(
                      blocker.key,
                      "capability",
                      index,
                      family.id
                    )}
                    className={styles.metaPill}
                  >
                    {family.label}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {blocker.affectedWorkspaceTargets.map((target, index) => (
                  <span
                    key={buildScopedItemKey(
                      blocker.key,
                      "workspace",
                      index,
                      target
                    )}
                    className={styles.blockedPill}
                  >
                    {target}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{blocker.requiredRecoveryAction}</p>
              <p className={styles.railFooter}>{blocker.nextSafeAction}</p>
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
                {plugin.safetyGates.map((gate, index) => (
                  <span
                    key={buildScopedItemKey(
                      plugin.pluginId,
                      "safety-gate",
                      index,
                      gate
                    )}
                    className={styles.blockedPill}
                  >
                    {gate}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {plugin.sampleCommands.map((command, index) => (
                  <span
                    key={buildScopedItemKey(
                      plugin.pluginId,
                      "sample-command",
                      index,
                      command
                    )}
                    className={styles.metaPill}
                  >
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
                  {routePreview.previewedHandoffSteps.map((step, index) => (
                    <span
                      key={buildScopedItemKey(
                        routePreview.commandKey,
                        "handoff-step",
                        index,
                        step
                      )}
                      className={styles.blockedPill}
                    >
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
                  (requirement, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeBridge.bridgeKey,
                        "bridge-requirement",
                        index,
                        requirement
                      )}
                      className={styles.metaPill}
                    >
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
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeBridge.bridgeKey,
                        "timeline-memory",
                        index,
                        item
                      )}
                      className={styles.blockedPill}
                    >
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
                {representativeTimeline.nextProductPolishChecklist.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeTimeline.timelineKey,
                        "product-polish",
                        index,
                        item
                      )}
                      className={styles.blockedPill}
                    >
                      {item}
                    </span>
                  )
                )}
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
                {timeline.eventList.map((event, index) => (
                  <span
                    key={buildScopedItemKey(
                      timeline.timelineKey,
                      "event",
                      index,
                      event.milestoneId
                    )}
                    className={styles.blockedPill}
                  >
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
                ].map((item, index) => (
                  <span key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.blockedPill}>
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
                {blocked.items.map((item, index) => (
                  <span
                    key={buildScopedItemKey(blocked.id, "item", index, item)}
                    className={styles.blockedPill}
                  >
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
                  Next manual gated run admission checklist
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextManualGatedRunAdmissionChecklist.map((item, index) => (
                <article key={buildScopedItemKey("athena-panel", "item", index, item)} className={styles.railCard}>
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
