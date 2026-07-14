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
  buildAdmissionRecoverySummary,
  buildAdmissionReviewSummary,
  buildBackendOwnedRunAdmissionContractChecklist,
  buildGateFailureSummary,
  groupAdmissionReviewsByCapabilityFamily,
  groupAdmissionReviewsByWorkspaceTarget,
  listAdmissionDecisionReviews,
  listAdmissionRecoveryPlanPreviews,
  listAdmissionRecoveryReadinessChecklistRecords,
  listAdmissionReviewAuditSummaries,
  listGateFailureReviewRecords,
  listModelProviderRunAdmissionReviews,
} from "@/lib/codexforge/model-provider-run-admission-review-recovery-preview";
import {
  buildBackendAdmissionContractSummary,
  buildBackendContractGateSummary,
  buildBackendContractReadinessSummary,
  groupBackendContractsByCapabilityFamily,
  groupBackendContractsByWorkspaceTarget,
  listBackendAdmissionErrorContracts,
  listBackendAdmissionRequestContracts,
  listBackendAdmissionResponseContracts,
  listBackendContractReadinessMatrixRecords,
  listBackendOwnedContractGateSchemaRecords,
  listBackendOwnedModelProviderRunAdmissionContracts,
} from "@/lib/codexforge/backend-owned-model-provider-run-admission-contract";
import {
  buildBackendDryRunRunnerContractSummary,
  buildBackendDryRunRunnerGateSummary,
  buildBackendDryRunRunnerReadinessSummary,
  groupBackendDryRunRunnerContractsByCapabilityFamily,
  groupBackendDryRunRunnerContractsByWorkspaceTarget,
  listBackendDryRunErrorContracts,
  listBackendDryRunRequestContracts,
  listBackendDryRunResponseContracts,
  listBackendDryRunRunnerGateSchemaRecords,
  listBackendDryRunRunnerHandoffPreviews,
  listBackendDryRunRunnerReadinessMatrixRecords,
  listBackendOwnedModelProviderDryRunRunnerContracts,
} from "@/lib/codexforge/backend-owned-model-provider-dry-run-runner-contract";
import {
  buildDryRunRunnerGateFailureSummary,
  buildDryRunRunnerRecoverySummary,
  buildDryRunRunnerReviewSummary,
  buildSyntheticDryRunRunnerSkeletonChecklist,
  groupDryRunRunnerReviewsByCapabilityFamily,
  groupDryRunRunnerReviewsByWorkspaceTarget,
  listBackendOwnedModelProviderDryRunRunnerReviews,
  listDryRunRunnerAcceptancePostureRecords,
  listDryRunRunnerDecisionReviewRecords,
  listDryRunRunnerGateFailureReviewRecords,
  listDryRunRunnerRecoveryPlanPreviews,
  listDryRunRunnerRecoveryReadinessChecklistRecords,
  listDryRunRunnerReviewAuditSummaries,
} from "@/lib/codexforge/backend-owned-model-provider-dry-run-runner-review-recovery-preview";
import {
  buildNextSyntheticDryRunResultCaptureContractChecklist,
  buildSyntheticRunnerGateSummary,
  buildSyntheticRunnerReadinessSummary,
  buildSyntheticRunnerSkeletonSummary,
  groupSyntheticRunnerSkeletonsByCapabilityFamily,
  groupSyntheticRunnerSkeletonsByWorkspaceTarget,
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons,
  listSyntheticDryRunErrorFixtures,
  listSyntheticDryRunInputFixtures,
  listSyntheticDryRunOutputFixtures,
  listSyntheticRunnerSkeletonGates,
  listSyntheticRunnerSkeletonHandoffPreviews,
  listSyntheticRunnerSkeletonReadinessMatrixRecords,
} from "@/lib/codexforge/backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
  buildNextResultCaptureReviewAndRecoveryChecklist,
  buildResultCaptureContractSummary,
  buildResultCaptureGateSummary,
  buildResultCaptureReadinessSummary,
  groupResultCaptureContractsByCapabilityFamily,
  groupResultCaptureContractsByWorkspaceTarget,
  listBackendOwnedSyntheticDryRunResultCaptureContracts,
  listResultCaptureAuditApprovalJoinPreviews,
  listResultCaptureErrorContracts,
  listResultCaptureGateRecords,
  listResultCaptureReadinessMatrixRecords,
  listResultCaptureRequestContracts,
  listResultCaptureResponseContracts,
  listSyntheticResultEnvelopeContracts,
} from "@/lib/codexforge/backend-owned-synthetic-dry-run-result-capture-contract";
import {
  buildAuditAndApprovalJoinContractChecklist,
  buildResultCaptureGateFailureSummary,
  buildResultCaptureRecoverySummary,
  buildResultCaptureReviewSummary,
  groupResultCaptureReviewsByCapabilityFamily,
  groupResultCaptureReviewsByWorkspaceTarget,
  listBackendOwnedSyntheticDryRunResultCaptureReviews,
  listResultCaptureAcceptancePostureRecords,
  listResultCaptureDecisionReviews,
  listResultCaptureGateFailureReviewRecords,
  listResultCaptureRecoveryPlanPreviews,
  listResultCaptureRecoveryReadinessChecklistRecords,
  listResultCaptureReviewAuditSummaries,
} from "@/lib/codexforge/backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import {
  buildAuditApprovalJoinContractSummary,
  buildAuditApprovalJoinGateSummary,
  buildAuditApprovalJoinReadinessSummary,
  buildNextAuditApprovalJoinReviewAndRecoveryChecklist,
  groupAuditApprovalJoinContractsByCapabilityFamily,
  groupAuditApprovalJoinContractsByWorkspaceTarget,
  listAuditApprovalEvidencePacketPreviews,
  listAuditApprovalJoinErrorContracts,
  listAuditApprovalJoinGateRecords,
  listAuditApprovalJoinReadinessMatrixRecords,
  listAuditApprovalJoinRequestContracts,
  listAuditApprovalJoinResponseContracts,
  listBackendOwnedSyntheticDryRunAuditApprovalJoinContracts,
  listResultAuditApprovalLinkContracts,
  listSyntheticApprovalJoinContracts,
  listSyntheticAuditJoinContracts,
} from "@/lib/codexforge/backend-owned-synthetic-dry-run-audit-approval-join-contract";
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

function uniqueRecordsByString<T>(
  records: readonly T[],
  resolveKey: (record: T) => string
): readonly T[] {
  const uniqueRecords = new Map<string, T>();

  for (const record of records) {
    const key = resolveKey(record);

    if (!uniqueRecords.has(key)) {
      uniqueRecords.set(key, record);
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
  const modelProviderRunAdmissionReviews =
    listModelProviderRunAdmissionReviews();
  const admissionDecisionReviews = listAdmissionDecisionReviews();
  const gateFailureReviewRecords = listGateFailureReviewRecords();
  const gateFailureReviewsForDisplay = uniqueRecordsByString(
    gateFailureReviewRecords,
    (record) => record.failedGateId
  );
  const admissionRecoveryPlanPreviews = listAdmissionRecoveryPlanPreviews();
  const admissionRecoveryReadinessChecklistRecords =
    listAdmissionRecoveryReadinessChecklistRecords();
  const admissionReviewAuditSummaries = listAdmissionReviewAuditSummaries();
  const admissionReviewSummary = buildAdmissionReviewSummary();
  const gateFailureSummary = buildGateFailureSummary();
  const admissionRecoverySummary = buildAdmissionRecoverySummary();
  const backendOwnedRunAdmissionContractChecklist =
    buildBackendOwnedRunAdmissionContractChecklist();
  const admissionReviewCapabilityGroups =
    groupAdmissionReviewsByCapabilityFamily();
  const admissionReviewWorkspaceGroups =
    groupAdmissionReviewsByWorkspaceTarget();
  const representativeAdmissionReview =
    modelProviderRunAdmissionReviews[0] ?? null;
  const representativeAdmissionDecisionReview =
    admissionDecisionReviews[0] ?? null;
  const representativeGateFailureReview = gateFailureReviewsForDisplay[0] ?? null;
  const representativeAdmissionRecoveryPlan =
    admissionRecoveryPlanPreviews[0] ?? null;
  const representativeAdmissionRecoveryAuditSummary =
    admissionReviewAuditSummaries[0] ?? null;
  const blockedAdmissionRecoveryReadinessChecklistRecords =
    admissionRecoveryReadinessChecklistRecords.filter(
      (record) => record.state === "blocked"
    );
  const backendAdmissionContracts =
    listBackendOwnedModelProviderRunAdmissionContracts();
  const backendAdmissionRequestContracts =
    listBackendAdmissionRequestContracts();
  const backendAdmissionResponseContracts =
    listBackendAdmissionResponseContracts();
  const backendAdmissionErrorContracts = listBackendAdmissionErrorContracts();
  const backendContractGateSchemaRecords =
    listBackendOwnedContractGateSchemaRecords();
  const backendContractReadinessMatrixRecords =
    listBackendContractReadinessMatrixRecords();
  const backendAdmissionContractSummary =
    buildBackendAdmissionContractSummary();
  const backendContractGateSummary = buildBackendContractGateSummary();
  const backendContractReadinessSummary =
    buildBackendContractReadinessSummary();
  const backendCapabilityGroups = groupBackendContractsByCapabilityFamily();
  const backendWorkspaceGroups = groupBackendContractsByWorkspaceTarget();
  const backendRequestContractsById = new Map(
    backendAdmissionRequestContracts.map((record) => [record.id, record] as const)
  );
  const backendResponseContractsById = new Map(
    backendAdmissionResponseContracts.map((record) => [record.id, record] as const)
  );
  const backendErrorContractsById = new Map(
    backendAdmissionErrorContracts.map((record) => [record.id, record] as const)
  );
  const backendAdmissionTripletRecords = backendAdmissionContracts.map(
    (contract) => ({
      contract,
      request: backendRequestContractsById.get(contract.id) ?? null,
      response: backendResponseContractsById.get(contract.id) ?? null,
      error: backendErrorContractsById.get(contract.id) ?? null,
    })
  );
  const representativeBackendAdmissionContract =
    backendAdmissionContracts[0] ?? null;
  const representativeBackendAdmissionTriplet =
    backendAdmissionTripletRecords[0] ?? null;
  const representativeBackendContractReadiness =
    backendContractReadinessMatrixRecords[0] ?? null;
  const backendContractGateOwnerGroups = [
    {
      owner: "backend-owned contract",
      label: "Backend-owned contract",
      records: backendContractGateSchemaRecords.filter(
        (record) => record.owner === "backend-owned contract"
      ),
    },
    {
      owner: "operator",
      label: "Operator",
      records: backendContractGateSchemaRecords.filter(
        (record) => record.owner === "operator"
      ),
    },
    {
      owner: "safety review",
      label: "Safety review",
      records: backendContractGateSchemaRecords.filter(
        (record) => record.owner === "safety review"
      ),
    },
  ] as const;
  const backendDryRunRunnerContracts =
    listBackendOwnedModelProviderDryRunRunnerContracts();
  const backendDryRunRequestContracts = listBackendDryRunRequestContracts();
  const backendDryRunResponseContracts = listBackendDryRunResponseContracts();
  const backendDryRunErrorContracts = listBackendDryRunErrorContracts();
  const backendDryRunRunnerGateSchemaRecords =
    listBackendDryRunRunnerGateSchemaRecords();
  const backendDryRunRunnerReadinessMatrixRecords =
    listBackendDryRunRunnerReadinessMatrixRecords();
  const backendDryRunRunnerHandoffPreviews =
    listBackendDryRunRunnerHandoffPreviews();
  const backendDryRunRunnerContractSummary =
    buildBackendDryRunRunnerContractSummary();
  const backendDryRunRunnerGateSummary =
    buildBackendDryRunRunnerGateSummary();
  const backendDryRunRunnerReadinessSummary =
    buildBackendDryRunRunnerReadinessSummary();
  const backendDryRunRunnerCapabilityGroups =
    groupBackendDryRunRunnerContractsByCapabilityFamily();
  const backendDryRunRunnerWorkspaceGroups =
    groupBackendDryRunRunnerContractsByWorkspaceTarget();
  const backendDryRunRequestContractsById = new Map(
    backendDryRunRequestContracts.map((record) => [record.id, record] as const)
  );
  const backendDryRunResponseContractsById = new Map(
    backendDryRunResponseContracts.map((record) => [record.id, record] as const)
  );
  const backendDryRunErrorContractsById = new Map(
    backendDryRunErrorContracts.map((record) => [record.id, record] as const)
  );
  const backendDryRunRunnerHandoffPreviewsById = new Map(
    backendDryRunRunnerHandoffPreviews.map((record) => [record.id, record] as const)
  );
  const backendDryRunRunnerTripletRecords = backendDryRunRunnerContracts.map(
    (contract) => ({
      contract,
      request: backendDryRunRequestContractsById.get(contract.id) ?? null,
      response: backendDryRunResponseContractsById.get(contract.id) ?? null,
      error: backendDryRunErrorContractsById.get(contract.id) ?? null,
      handoff: backendDryRunRunnerHandoffPreviewsById.get(contract.id) ?? null,
    })
  );
  const representativeBackendDryRunRunnerContract =
    backendDryRunRunnerContracts[0] ?? null;
  const representativeBackendDryRunRunnerTriplet =
    backendDryRunRunnerTripletRecords[0] ?? null;
  const representativeBackendDryRunRunnerReadiness =
    backendDryRunRunnerReadinessMatrixRecords[0] ?? null;
  const representativeBackendDryRunRunnerHandoff =
    backendDryRunRunnerHandoffPreviews[0] ?? null;
  const backendDryRunRunnerGateOwnerGroups = [
    {
      owner: "backend-owned runner contract",
      label: "Backend-owned runner contract",
      records: backendDryRunRunnerGateSchemaRecords.filter(
        (record) => record.owner === "backend-owned runner contract"
      ),
    },
    {
      owner: "operator",
      label: "Operator",
      records: backendDryRunRunnerGateSchemaRecords.filter(
        (record) => record.owner === "operator"
      ),
    },
    {
      owner: "safety review",
      label: "Safety review",
      records: backendDryRunRunnerGateSchemaRecords.filter(
        (record) => record.owner === "safety review"
      ),
    },
  ] as const;
  const backendOwnedDryRunRunnerReviews =
    listBackendOwnedModelProviderDryRunRunnerReviews();
  const dryRunRunnerDecisionReviewRecords =
    listDryRunRunnerDecisionReviewRecords();
  const dryRunRunnerGateFailureReviewRecords =
    listDryRunRunnerGateFailureReviewRecords();
  const dryRunRunnerGateFailureReviewsForDisplay = uniqueRecordsByString(
    dryRunRunnerGateFailureReviewRecords,
    (record) => record.failedGateId
  );
  const dryRunRunnerRecoveryPlanPreviews =
    listDryRunRunnerRecoveryPlanPreviews();
  const dryRunRunnerRecoveryReadinessChecklistRecords =
    listDryRunRunnerRecoveryReadinessChecklistRecords();
  const dryRunRunnerReviewAuditSummaries =
    listDryRunRunnerReviewAuditSummaries();
  const dryRunRunnerAcceptancePostureRecords =
    listDryRunRunnerAcceptancePostureRecords();
  const dryRunRunnerReviewSummary = buildDryRunRunnerReviewSummary();
  const dryRunRunnerGateFailureSummary = buildDryRunRunnerGateFailureSummary();
  const dryRunRunnerRecoverySummary = buildDryRunRunnerRecoverySummary();
  const syntheticDryRunRunnerSkeletonChecklist =
    buildSyntheticDryRunRunnerSkeletonChecklist();
  const dryRunRunnerReviewCapabilityGroups =
    groupDryRunRunnerReviewsByCapabilityFamily();
  const dryRunRunnerReviewWorkspaceGroups =
    groupDryRunRunnerReviewsByWorkspaceTarget();
  const representativeBackendOwnedDryRunRunnerReview =
    backendOwnedDryRunRunnerReviews[0] ?? null;
  const representativeDryRunRunnerDecisionReview =
    dryRunRunnerDecisionReviewRecords[0] ?? null;
  const representativeDryRunRunnerGateFailureReview =
    dryRunRunnerGateFailureReviewsForDisplay[0] ?? null;
  const representativeDryRunRunnerRecoveryPlan =
    dryRunRunnerRecoveryPlanPreviews[0] ?? null;
  const representativeDryRunRunnerReviewAuditSummary =
    dryRunRunnerReviewAuditSummaries[0] ?? null;
  const representativeDryRunRunnerAcceptancePosture =
    dryRunRunnerAcceptancePostureRecords[0] ?? null;
  const blockedDryRunRunnerRecoveryReadinessChecklistRecords =
    dryRunRunnerRecoveryReadinessChecklistRecords.filter(
      (record) => record.state === "blocked"
    );
  const syntheticRunnerSkeletons =
    listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons();
  const syntheticInputFixtures = listSyntheticDryRunInputFixtures();
  const syntheticOutputFixtures = listSyntheticDryRunOutputFixtures();
  const syntheticErrorFixtures = listSyntheticDryRunErrorFixtures();
  const syntheticRunnerGates = listSyntheticRunnerSkeletonGates();
  const syntheticRunnerReadinessMatrixRecords =
    listSyntheticRunnerSkeletonReadinessMatrixRecords();
  const syntheticRunnerHandoffPreviews =
    listSyntheticRunnerSkeletonHandoffPreviews();
  const syntheticRunnerSkeletonSummary = buildSyntheticRunnerSkeletonSummary();
  const syntheticRunnerGateSummary = buildSyntheticRunnerGateSummary();
  const syntheticRunnerReadinessSummary = buildSyntheticRunnerReadinessSummary();
  const nextSyntheticDryRunResultCaptureContractChecklist =
    buildNextSyntheticDryRunResultCaptureContractChecklist();
  const syntheticRunnerCapabilityGroups =
    groupSyntheticRunnerSkeletonsByCapabilityFamily();
  const syntheticRunnerWorkspaceGroups =
    groupSyntheticRunnerSkeletonsByWorkspaceTarget();
  const syntheticInputFixturesById = new Map(
    syntheticInputFixtures.map((record) => [record.id, record] as const)
  );
  const syntheticOutputFixturesById = new Map(
    syntheticOutputFixtures.map((record) => [record.id, record] as const)
  );
  const syntheticErrorFixturesById = new Map(
    syntheticErrorFixtures.map((record) => [record.id, record] as const)
  );
  const syntheticReadinessById = new Map(
    syntheticRunnerReadinessMatrixRecords.map((record) => [record.id, record] as const)
  );
  const syntheticHandoffsById = new Map(
    syntheticRunnerHandoffPreviews.map((record) => [record.id, record] as const)
  );
  const syntheticFixturePacketRecords = syntheticRunnerSkeletons.map((skeleton) => ({
    skeleton,
    input: syntheticInputFixturesById.get(skeleton.id) ?? null,
    output: syntheticOutputFixturesById.get(skeleton.id) ?? null,
    error: syntheticErrorFixturesById.get(skeleton.id) ?? null,
    readiness: syntheticReadinessById.get(skeleton.id) ?? null,
    handoff: syntheticHandoffsById.get(skeleton.id) ?? null,
  }));
  const representativeSyntheticRunnerSkeleton =
    syntheticRunnerSkeletons[0] ?? null;
  const representativeSyntheticInputFixture = syntheticInputFixtures[0] ?? null;
  const representativeSyntheticOutputFixture =
    syntheticOutputFixtures[0] ?? null;
  const representativeSyntheticErrorFixture = syntheticErrorFixtures[0] ?? null;
  const representativeSyntheticRunnerReadiness =
    syntheticRunnerReadinessMatrixRecords[0] ?? null;
  const representativeSyntheticRunnerHandoff =
    syntheticRunnerHandoffPreviews[0] ?? null;
  const resultCaptureContracts =
    listBackendOwnedSyntheticDryRunResultCaptureContracts();
  const syntheticResultEnvelopes = listSyntheticResultEnvelopeContracts();
  const resultCaptureRequestContracts = listResultCaptureRequestContracts();
  const resultCaptureResponseContracts = listResultCaptureResponseContracts();
  const resultCaptureErrorContracts = listResultCaptureErrorContracts();
  const resultCaptureGateRecords = listResultCaptureGateRecords();
  const resultCaptureReadinessMatrixRecords =
    listResultCaptureReadinessMatrixRecords();
  const resultCaptureAuditApprovalJoinPreviews =
    listResultCaptureAuditApprovalJoinPreviews();
  const resultCaptureContractSummary = buildResultCaptureContractSummary();
  const resultCaptureGateSummary = buildResultCaptureGateSummary();
  const resultCaptureReadinessSummary = buildResultCaptureReadinessSummary();
  const nextResultCaptureReviewAndRecoveryChecklist =
    buildNextResultCaptureReviewAndRecoveryChecklist();
  const resultCaptureCapabilityGroups =
    groupResultCaptureContractsByCapabilityFamily();
  const resultCaptureWorkspaceGroups =
    groupResultCaptureContractsByWorkspaceTarget();
  const syntheticResultEnvelopesById = new Map(
    syntheticResultEnvelopes.map((record) => [record.id, record] as const)
  );
  const resultCaptureRequestsById = new Map(
    resultCaptureRequestContracts.map((record) => [record.id, record] as const)
  );
  const resultCaptureResponsesById = new Map(
    resultCaptureResponseContracts.map((record) => [record.id, record] as const)
  );
  const resultCaptureErrorsById = new Map(
    resultCaptureErrorContracts.map((record) => [record.id, record] as const)
  );
  const resultCaptureReadinessById = new Map(
    resultCaptureReadinessMatrixRecords.map((record) => [record.id, record] as const)
  );
  const resultCaptureJoinPreviewsById = new Map(
    resultCaptureAuditApprovalJoinPreviews.map((record) => [record.id, record] as const)
  );
  const resultCapturePreviewRecords = resultCaptureContracts.map((contract) => ({
    contract,
    envelope: syntheticResultEnvelopesById.get(contract.id) ?? null,
    request: resultCaptureRequestsById.get(contract.id) ?? null,
    response: resultCaptureResponsesById.get(contract.id) ?? null,
    error: resultCaptureErrorsById.get(contract.id) ?? null,
    readiness: resultCaptureReadinessById.get(contract.id) ?? null,
    join: resultCaptureJoinPreviewsById.get(contract.id) ?? null,
  }));
  const representativeResultCaptureContract = resultCaptureContracts[0] ?? null;
  const representativeSyntheticResultEnvelope =
    syntheticResultEnvelopes[0] ?? null;
  const representativeResultCaptureRequest =
    resultCaptureRequestContracts[0] ?? null;
  const representativeResultCaptureResponse =
    resultCaptureResponseContracts[0] ?? null;
  const representativeResultCaptureError =
    resultCaptureErrorContracts[0] ?? null;
  const representativeResultCaptureReadiness =
    resultCaptureReadinessMatrixRecords[0] ?? null;
  const representativeResultCaptureJoinPreview =
    resultCaptureAuditApprovalJoinPreviews[0] ?? null;
  const auditApprovalJoinContracts =
    listBackendOwnedSyntheticDryRunAuditApprovalJoinContracts();
  const syntheticAuditJoinContracts = listSyntheticAuditJoinContracts();
  const syntheticApprovalJoinContracts = listSyntheticApprovalJoinContracts();
  const resultAuditApprovalLinkContracts =
    listResultAuditApprovalLinkContracts();
  const auditApprovalJoinRequestContracts =
    listAuditApprovalJoinRequestContracts();
  const auditApprovalJoinResponseContracts =
    listAuditApprovalJoinResponseContracts();
  const auditApprovalJoinErrorContracts = listAuditApprovalJoinErrorContracts();
  const auditApprovalJoinGateRecords = listAuditApprovalJoinGateRecords();
  const auditApprovalJoinReadinessMatrixRecords =
    listAuditApprovalJoinReadinessMatrixRecords();
  const auditApprovalEvidencePacketPreviews =
    listAuditApprovalEvidencePacketPreviews();
  const auditApprovalJoinContractSummary =
    buildAuditApprovalJoinContractSummary();
  const auditApprovalJoinGateSummary = buildAuditApprovalJoinGateSummary();
  const auditApprovalJoinReadinessSummary =
    buildAuditApprovalJoinReadinessSummary();
  const nextAuditApprovalJoinReviewAndRecoveryChecklist =
    buildNextAuditApprovalJoinReviewAndRecoveryChecklist();
  const auditApprovalJoinCapabilityGroups =
    groupAuditApprovalJoinContractsByCapabilityFamily();
  const auditApprovalJoinWorkspaceGroups =
    groupAuditApprovalJoinContractsByWorkspaceTarget();
  const representativeAuditApprovalJoinContract =
    auditApprovalJoinContracts[0] ?? null;
  const representativeSyntheticAuditJoinContract =
    syntheticAuditJoinContracts[0] ?? null;
  const representativeSyntheticApprovalJoinContract =
    syntheticApprovalJoinContracts[0] ?? null;
  const representativeResultAuditApprovalLinkContract =
    resultAuditApprovalLinkContracts[0] ?? null;
  const representativeAuditApprovalJoinRequestContract =
    auditApprovalJoinRequestContracts[0] ?? null;
  const representativeAuditApprovalJoinResponseContract =
    auditApprovalJoinResponseContracts[0] ?? null;
  const representativeAuditApprovalJoinErrorContract =
    auditApprovalJoinErrorContracts[0] ?? null;
  const representativeAuditApprovalJoinReadiness =
    auditApprovalJoinReadinessMatrixRecords[0] ?? null;
  const representativeAuditApprovalEvidencePacket =
    auditApprovalEvidencePacketPreviews[0] ?? null;
  const resultCaptureReviewRecords =
    listBackendOwnedSyntheticDryRunResultCaptureReviews();
  const resultCaptureDecisionReviewRecords = listResultCaptureDecisionReviews();
  const resultCaptureGateFailureReviewRecords =
    listResultCaptureGateFailureReviewRecords();
  const resultCaptureGateFailureReviewsForDisplay = uniqueRecordsByString(
    resultCaptureGateFailureReviewRecords,
    (record) => record.failedGateId
  );
  const resultCaptureRecoveryPlanPreviewRecords =
    listResultCaptureRecoveryPlanPreviews();
  const resultCaptureRecoveryReadinessChecklistRecords =
    listResultCaptureRecoveryReadinessChecklistRecords();
  const resultCaptureReviewAuditSummaryRecords =
    listResultCaptureReviewAuditSummaries();
  const resultCaptureAcceptancePostureRecords =
    listResultCaptureAcceptancePostureRecords();
  const resultCaptureReviewSummary = buildResultCaptureReviewSummary();
  const resultCaptureGateFailureSummary =
    buildResultCaptureGateFailureSummary();
  const resultCaptureRecoverySummary = buildResultCaptureRecoverySummary();
  const auditAndApprovalJoinContractChecklist =
    buildAuditAndApprovalJoinContractChecklist();
  const resultCaptureReviewCapabilityGroups =
    groupResultCaptureReviewsByCapabilityFamily();
  const resultCaptureReviewWorkspaceGroups =
    groupResultCaptureReviewsByWorkspaceTarget();
  const representativeResultCaptureReview =
    resultCaptureReviewRecords[0] ?? null;
  const representativeResultCaptureDecisionReview =
    resultCaptureDecisionReviewRecords[0] ?? null;
  const representativeResultCaptureGateFailureReview =
    resultCaptureGateFailureReviewsForDisplay[0] ?? null;
  const representativeResultCaptureRecoveryPlan =
    resultCaptureRecoveryPlanPreviewRecords[0] ?? null;
  const representativeResultCaptureReviewAuditSummary =
    resultCaptureReviewAuditSummaryRecords[0] ?? null;
  const representativeResultCaptureAcceptancePosture =
    resultCaptureAcceptancePostureRecords[0] ?? null;
  const blockedResultCaptureRecoveryReadinessChecklistRecords =
    resultCaptureRecoveryReadinessChecklistRecords.filter(
      (record) => record.state === "blocked"
    );
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

      <section
        className={styles.panel}
        aria-label="Model provider run admission review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Held admission review</p>
            <h2 className={styles.panelTitle}>
              Model provider run admission review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Held / not admitted
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can review why model provider run admission is held. admission
          review is preview-only. run admission state: not admitted. admission
          decision state: held. admission token is not issued. admission lease
          is not created. admission ticket is not issued. provider execution is
          blocked. queue dispatch is blocked. worker dispatch is blocked. job
          execution is blocked. No prompt sending. No model calls yet. No
          provider SDKs imported. backend-owned run admission contract comes
          next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Review posture</p>
                <h3 className={styles.placeholderTitle}>
                  {admissionReviewSummary.currentBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Reviews: ${admissionReviewSummary.reviewCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {admissionReviewSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "admission-review-summary",
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
              {`Decision reviews: ${admissionReviewSummary.decisionReviewCount} | Gate failures: ${admissionReviewSummary.gateFailureReviewCount} | Recovery plans: ${admissionReviewSummary.recoveryPlanCount} | Readiness checks: ${admissionReviewSummary.recoveryReadinessChecklistCount}`}
            </p>
          </article>
          {representativeAdmissionReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative review</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionReview.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdmissionReview.admissionReviewPosture}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeAdmissionReview.operatorRequestPhrase}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeAdmissionReview.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${representativeAdmissionReview.selectedCapabilityFamily.label}`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.blockedPill}>
                  {`provider slot label: ${representativeAdmissionReview.providerSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`backup provider slot label: ${representativeAdmissionReview.backupProviderSlotLabel}`}
                </span>
                <span className={styles.blockedPill}>
                  {`local/private alternative label: ${representativeAdmissionReview.localPrivateAlternativeLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`admission decision state: ${representativeAdmissionReview.admissionDecisionState}`}
              </p>
              <p className={styles.railBody}>
                {`admission token state: ${representativeAdmissionReview.admissionTokenState}`}
              </p>
              <p className={styles.railBody}>
                {`admission lease state: ${representativeAdmissionReview.admissionLeaseState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAdmissionReview.nextBackendOwnedRunAdmissionContractRequirement}
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next safe batch</p>
                <h3 className={styles.placeholderTitle}>
                  {admissionReviewSummary.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Next likely batch
              </span>
            </div>
            <div className={styles.nextActionList}>
              {backendOwnedRunAdmissionContractChecklist.map((item, index) => (
                <article
                  key={buildScopedItemKey(
                    "backend-owned-run-admission-contract-checklist",
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
                  Admission review stays capability-aware
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {admissionReviewCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "admission-review-capability-group",
                    "group",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.metaPill}
                >{`${group.capabilityFamilyLabel}: ${group.reviewCount}`}</span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Grouped by workspace target</p>
                <h3 className={styles.placeholderTitle}>
                  Admission review stays workspace-specific
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                Visible
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {admissionReviewWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "admission-review-workspace-group",
                    "group",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.metaPill}
                >{`${group.workspaceTarget}: ${group.reviewCount}`}</span>
              ))}
            </div>
          </article>
          {representativeAdmissionRecoveryAuditSummary ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Audit summary</p>
                  <h3 className={styles.placeholderTitle}>preview-only audit</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  {representativeAdmissionRecoveryAuditSummary.auditPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeAdmissionRecoveryAuditSummary.evidenceSummary}
              </p>
              <p className={styles.railBody}>
                {representativeAdmissionRecoveryAuditSummary.failedGateSummary}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAdmissionRecoveryAuditSummary
                    .backendOwnedContractRequirement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.panel} aria-label="Admission decision review">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Held decision review</p>
            <h2 className={styles.panelTitle}>Admission decision review</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Held / not admitted
          </span>
        </div>
        <p className={styles.panelBody}>
          decision state: held / not admitted. admission reason summary. top
          blocking gates. top missing evidence. operator review notes. manual
          recovery requirement. next safe action. explicit
          no-admission-no-execution statement.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Decision review posture</p>
                <h3 className={styles.placeholderTitle}>
                  preview-only decision reviews
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Decision reviews: ${admissionDecisionReviews.length}`}
              </span>
            </div>
            <p className={styles.railBody}>
              decision review is preview-only. decision state: held / not
              admitted.
            </p>
            <p className={styles.railBody}>
              top blocking gates and top missing evidence remain review-only.
            </p>
            <p className={styles.railFooter}>
              No admission. No execution. No provider execution. No model
              calls.
            </p>
          </article>
          {representativeAdmissionDecisionReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative decision</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionDecisionReview.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdmissionDecisionReview.decisionState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeAdmissionDecisionReview.admissionReasonSummary}
              </p>
              <div className={styles.workspaceMeta}>
                {representativeAdmissionDecisionReview.topBlockingGates.map(
                  (gate, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeAdmissionDecisionReview.key,
                        "top-blocking-gate",
                        index,
                        gate
                      )}
                      className={styles.blockedPill}
                    >
                      {gate}
                    </span>
                  )
                )}
              </div>
              <div className={styles.workspaceMeta}>
                {representativeAdmissionDecisionReview.topMissingEvidence.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeAdmissionDecisionReview.key,
                        "top-missing-evidence",
                        index,
                        item
                      )}
                      className={styles.metaPill}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
              <p className={styles.railBody}>
                {`manual recovery requirement: ${representativeAdmissionDecisionReview.manualRecoveryRequirement}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAdmissionDecisionReview.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {admissionDecisionReviews.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Decision review</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.decisionState}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {record.admissionReasonSummary}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${record.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${record.selectedCapabilityFamily.label}`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {record.topBlockingGates.map((gate, index) => (
                  <span
                    key={buildScopedItemKey(
                      record.key,
                      "top-blocking-gate",
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
                {record.topMissingEvidence.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      record.key,
                      "top-missing-evidence",
                      index,
                      item
                    )}
                    className={styles.metaPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.nextActionList}>
                {record.operatorReviewNotes.map((note, index) => (
                  <article
                    key={buildScopedItemKey(
                      record.key,
                      "operator-review-note",
                      index,
                      note
                    )}
                    className={styles.railCard}
                  >
                    <p className={styles.railBody}>{note}</p>
                  </article>
                ))}
              </div>
              <p className={styles.railBody}>
                {`manual recovery requirement: ${record.manualRecoveryRequirement}`}
              </p>
              <p className={styles.railBody}>
                {`next safe action: ${record.nextSafeAction}`}
              </p>
              <p className={styles.railFooter}>
                {record.explicitNoAdmissionNoExecutionStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Gate failure review">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Held gate failures</p>
            <h2 className={styles.panelTitle}>Gate failure review</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Held / not admitted
          </span>
        </div>
        <p className={styles.panelBody}>
          operator approval gate failure. manual confirmation gate failure.
          kill switch gate failure. audit gate failure. server-only adapter
          gate failure. opaque credential gate failure. prompt payload review
          gate failure. privacy/redaction gate failure. cost/rate/timeout gate
          failure. idempotency/replay gate failure. single-run lock gate
          failure. dry-run result review gate failure. acceptance matrix gate
          failure. approval expiry/revocation gate failure. persistence gate
          failure. queue/worker/job gates blocked.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate failure posture</p>
                <h3 className={styles.placeholderTitle}>
                  preview-only gate failures
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Gate failures: ${gateFailureSummary.gateFailureReviewCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {gateFailureSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "gate-failure-summary",
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
              {`Critical: ${gateFailureSummary.criticalGateFailureCount} | High: ${gateFailureSummary.highGateFailureCount} | Medium: ${gateFailureSummary.mediumGateFailureCount}`}
            </p>
          </article>
          {representativeGateFailureReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative gate</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeGateFailureReview.failedGateLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeGateFailureReview.severity}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {representativeGateFailureReview.operatorFacingExplanation}
              </p>
              <p className={styles.railBody}>
                {`gate state: ${representativeGateFailureReview.gateState}`}
              </p>
              <p className={styles.railBody}>
                {`required evidence to unblock: ${representativeGateFailureReview.requiredEvidenceToUnblock}`}
              </p>
              <p className={styles.railFooter}>
                {representativeGateFailureReview.explicitNoGatePassStatement}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {gateFailureReviewsForDisplay.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate failure review</p>
                  <h3 className={styles.placeholderTitle}>
                    {record.failedGateLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.severity}
                </span>
              </div>
              <p className={styles.placeholderSummary}>
                {record.operatorFacingExplanation}
              </p>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`affected capability family: ${record.affectedCapabilityFamily.label}`}
                </span>
                <span className={styles.metaPill}>
                  {`affected workspace target: ${record.affectedWorkspaceTarget}`}
                </span>
              </div>
              <p className={styles.railBody}>{`gate state: ${record.gateState}`}</p>
              <p className={styles.railBody}>
                {`required evidence to unblock: ${record.requiredEvidenceToUnblock}`}
              </p>
              <p className={styles.railBody}>
                {`required recovery action: ${record.requiredRecoveryAction}`}
              </p>
              <p className={styles.railBody}>
                {`next safe action: ${record.nextSafeAction}`}
              </p>
              <p className={styles.railFooter}>
                {record.explicitNoGatePassStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Admission recovery plan">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Manual review recovery</p>
            <h2 className={styles.panelTitle}>Admission recovery plan</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Manual review only
          </span>
        </div>
        <p className={styles.panelBody}>
          recovery is manual review only. retry disabled. fallback disabled.
          missing approval recovery. kill switch active recovery. approval
          expiry/revocation recovery. missing opaque credential recovery.
          prompt payload review recovery. privacy/redaction recovery.
          cost/rate/timeout recovery. dry-run review recovery. acceptance
          matrix recovery. persistence recovery. queue/worker/job blocked
          recovery. backend-owned run admission contract comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Recovery posture</p>
                <h3 className={styles.placeholderTitle}>
                  preview-only recovery plans
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Recovery plans: ${admissionRecoverySummary.recoveryPlanCount}`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {admissionRecoverySummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "admission-recovery-summary",
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
              {`Manual review only: ${admissionRecoverySummary.manualReviewOnlyCount} | Retry disabled: ${admissionRecoverySummary.retryDisabledCount} | Fallback disabled: ${admissionRecoverySummary.fallbackDisabledCount}`}
            </p>
          </article>
          {representativeAdmissionRecoveryPlan ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative recovery</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionRecoveryPlan.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAdmissionRecoveryPlan.recoveryPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeAdmissionRecoveryPlan.missingManualApprovalRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeAdmissionRecoveryPlan.killSwitchActiveRecovery}
              </p>
              <p className={styles.railBody}>
                {
                  representativeAdmissionRecoveryPlan
                    .acceptanceMatrixUnresolvedRecovery
                }
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAdmissionRecoveryPlan
                    .explicitNoRetryNoFallbackNoExecutionStatement
                }
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next safe batch</p>
                <h3 className={styles.placeholderTitle}>
                  {admissionRecoverySummary.nextLikelyBatch}
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Next likely batch
              </span>
            </div>
            <div className={styles.nextActionList}>
              {backendOwnedRunAdmissionContractChecklist.map((item, index) => (
                <article
                  key={buildScopedItemKey(
                    "admission-recovery-backend-contract-checklist",
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
          {admissionRecoveryPlanPreviews.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Recovery plan</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.retryPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${record.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${record.selectedCapabilityFamily.label}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {record.missingManualApprovalRecovery}
              </p>
              <p className={styles.railBody}>
                {record.promptPayloadNotReviewedRecovery}
              </p>
              <p className={styles.railBody}>
                {record.costRateTimeoutIncompleteRecovery}
              </p>
              <p className={styles.railBody}>
                {record.queueDispatchBlockedRecovery}
              </p>
              <p className={styles.railBody}>
                {record.workerDispatchBlockedRecovery}
              </p>
              <p className={styles.railBody}>
                {record.jobExecutionBlockedRecovery}
              </p>
              <p className={styles.railFooter}>
                {record.explicitNoRetryNoFallbackNoExecutionStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Admission recovery readiness">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact readiness review</p>
            <h2 className={styles.panelTitle}>Admission recovery readiness</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Current blocked posture
          </span>
        </div>
        <p className={styles.panelBody}>
          recovery readiness is preview-only. readiness checklist records stay
          visible while queue dispatch, worker dispatch, job execution, and
          persistence remain blocked until the backend-owned admission contract
          exists.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness posture</p>
                <h3 className={styles.placeholderTitle}>
                  preview-only readiness checklist
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`Checklist records: ${admissionRecoveryReadinessChecklistRecords.length}`}
              </span>
            </div>
            <p className={styles.railBody}>
              current blocked posture remains explicit. backend contract
              dependency remains explicit.
            </p>
            <div className={styles.workspaceMeta}>
              {blockedAdmissionRecoveryReadinessChecklistRecords.map(
                (record, index) => (
                  <span
                    key={buildScopedItemKey(
                      "admission-recovery-readiness-blocked",
                      "item",
                      index,
                      record.checklistId
                    )}
                    className={styles.blockedPill}
                  >
                    {record.label}
                  </span>
                )
              )}
            </div>
            <p className={styles.railFooter}>
              {`Blocked records: ${blockedAdmissionRecoveryReadinessChecklistRecords.length}`}
            </p>
          </article>
          {representativeAdmissionRecoveryAuditSummary ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Audit-ready summary</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAdmissionRecoveryAuditSummary.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                  {representativeAdmissionRecoveryAuditSummary.auditPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeAdmissionRecoveryAuditSummary.recoverySummary}
              </p>
              <p className={styles.railBody}>
                {representativeAdmissionRecoveryAuditSummary.blockedActionSummary}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAdmissionRecoveryAuditSummary
                    .backendOwnedContractRequirement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {admissionRecoveryReadinessChecklistRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Readiness checklist</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.state}
                </span>
              </div>
              <p className={styles.placeholderSummary}>{record.evidenceRequired}</p>
              <p className={styles.railBody}>
                {`recovery action: ${record.recoveryAction}`}
              </p>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railBody}>
                {`current posture: ${record.currentPosture}`}
              </p>
              <p className={styles.railBody}>
                {`backend contract dependency: ${record.backendContractDependency}`}
              </p>
              <p className={styles.railFooter}>
                {`next safe action: ${record.nextSafeAction}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend-owned model provider run admission contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend-owned contract layer</p>
            <h2 className={styles.panelTitle}>
              Backend-owned model provider run admission contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Draft / preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview the backend-owned run admission contract.
          backend-owned contract is preview-only. contract state: draft /
          preview-only. admission request is not created. backend response is
          not received. admission token is not issued. admission lease is not
          created. provider execution is blocked. queue dispatch is blocked.
          worker dispatch is blocked. job execution is blocked. No prompt
          sending. No model calls yet. No provider SDKs imported. Athena can
          now preview backend-owned model provider dry-run runner contracts.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Preview-only contract</p>
                <h3 className={styles.placeholderTitle}>
                  Athena can preview the backend-owned run admission contract
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {backendAdmissionContractSummary.contractState}
              </span>
            </div>
            <p className={styles.railBody}>backend-owned contract is preview-only</p>
            <p className={styles.railBody}>contract state: draft / preview-only</p>
            <p className={styles.railBody}>admission request is not created</p>
            <p className={styles.railBody}>backend response is not received</p>
            <p className={styles.railBody}>admission token is not issued</p>
            <p className={styles.railBody}>admission lease is not created</p>
            <p className={styles.railBody}>provider execution is blocked</p>
            <p className={styles.railBody}>queue dispatch is blocked</p>
            <p className={styles.railBody}>worker dispatch is blocked</p>
            <p className={styles.railBody}>job execution is blocked</p>
            <p className={styles.railFooter}>
              Athena can now preview backend-owned model provider dry-run
              runner contracts
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {backendAdmissionContractSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${backendAdmissionContractSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${backendAdmissionContractSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${backendAdmissionContractSummary.nextLikelyBatch}`}
            </p>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>
                {`Contracts: ${backendAdmissionContractSummary.contractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Request previews: ${backendAdmissionContractSummary.requestContractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Response previews: ${backendAdmissionContractSummary.responseContractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Error previews: ${backendAdmissionContractSummary.errorContractCount}`}
              </span>
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Covered capability families</p>
                <h3 className={styles.placeholderTitle}>
                  Backend-owned contract coverage
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${backendCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-contract-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Backend-owned contract workspaces
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${backendWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-contract-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeBackendAdmissionContract ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative contract</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendAdmissionContract.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeBackendAdmissionContract.executionPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeBackendAdmissionContract.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${representativeBackendAdmissionContract.selectedCapabilityFamily.label}`}
                </span>
                <span className={styles.metaPill}>
                  {`Provider slot: ${representativeBackendAdmissionContract.providerSlotLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`Backup provider slot label: ${representativeBackendAdmissionContract.backupProviderSlotLabel}`}
              </p>
              <p className={styles.railBody}>
                {`Local/private alternative label: ${representativeBackendAdmissionContract.localPrivateAlternativeLabel}`}
              </p>
              <p className={styles.railBody}>
                {`source admission review reference: ${representativeBackendAdmissionContract.sourceAdmissionReviewReference}`}
              </p>
              <p className={styles.railBody}>
                {`source admission decision review reference: ${representativeBackendAdmissionContract.sourceAdmissionDecisionReviewReference}`}
              </p>
              <p className={styles.railBody}>
                {`source gate failure review reference: ${representativeBackendAdmissionContract.sourceGateFailureReviewReference}`}
              </p>
              <p className={styles.railFooter}>
                {representativeBackendAdmissionContract.nextBackendOwnedDryRunRunnerContractRequirement}
              </p>
            </article>
          </div>
        ) : null}
        <div className={styles.summaryGrid}>
          {backendAdmissionContracts.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Backend-owned contract</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.admissionContractState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${record.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>{record.previewOnlyStatement}</p>
              <p className={styles.railBody}>
                {`run admission posture: ${record.runAdmissionPosture}`}
              </p>
              <p className={styles.railBody}>
                {`provider call posture: ${record.providerCallPosture} | model call posture: ${record.modelCallPosture}`}
              </p>
              <p className={styles.railBody}>
                {`frontend posture: ${record.frontendPosture} | backend posture: ${record.backendPosture}`}
              </p>
              <p className={styles.railBody}>
                {`admission request state: ${record.admissionRequestState} | admission ticket state: ${record.admissionTicketState}`}
              </p>
              <p className={styles.railBody}>
                {`queue dispatch state: ${record.queueDispatchState} | worker dispatch state: ${record.workerDispatchState} | job execution state: ${record.jobExecutionState}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  record.manualApprovalRequired,
                  record.manualConfirmationRequired,
                  record.killSwitchRequired,
                  record.auditRequired,
                  record.privacyRedactionRequired,
                  record.costAcknowledgementRequired,
                  record.rateLimitGuardRequired,
                  record.timeoutCancelGuardRequired,
                  record.idempotencyRequired,
                  record.replayBlockRequired,
                  record.singleRunLockRequired,
                  record.dryRunResultReviewRequired,
                  record.acceptanceMatrixReviewRequired,
                  record.approvalExpiryReviewRequired,
                  record.approvalRevocationReviewRequired,
                  record.noRetryExecution,
                  record.noFallbackExecution,
                ].map((item, index) => (
                  <span
                    key={buildScopedItemKey(record.key, "requirement", index, item)}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend admission request/response contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend request boundary</p>
            <h2 className={styles.panelTitle}>
              Backend admission request/response contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only triplets
          </span>
        </div>
        <p className={styles.panelBody}>
          request contract preview. response contract preview. error contract
          preview. prompt payload is redacted placeholder only. prompt
          transmission state: not sent. credential reference posture: opaque
          label only. backend admission request is not created. backend
          admission response is not received. backend admission error is not
          received.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Request posture</p>
                <h3 className={styles.placeholderTitle}>
                  request contract preview
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Not created
              </span>
            </div>
            <p className={styles.railBody}>
              prompt payload is redacted placeholder only
            </p>
            <p className={styles.railBody}>prompt transmission state: not sent</p>
            <p className={styles.railBody}>
              credential reference posture: opaque label only
            </p>
            <p className={styles.railFooter}>
              backend admission request is not created
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Response and error posture</p>
                <h3 className={styles.placeholderTitle}>
                  response contract preview
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Not received
              </span>
            </div>
            <p className={styles.railBody}>backend admission response is not received</p>
            <p className={styles.railBody}>error contract preview</p>
            <p className={styles.railBody}>backend admission error is not received</p>
            <p className={styles.railFooter}>
              request/response/error contracts stay preview-only
            </p>
          </article>
          {representativeBackendAdmissionTriplet ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative triplet</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendAdmissionTriplet.contract.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  Redacted request only
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeBackendAdmissionTriplet.request?.explicitNoBackendRequestCreatedStatement ??
                  "No backend admission request is created from the frontend preview."}
              </p>
              <p className={styles.railBody}>
                {representativeBackendAdmissionTriplet.response?.explicitNoBackendResponseReceivedStatement ??
                  "No backend admission response is received from the frontend preview."}
              </p>
              <p className={styles.railBody}>
                {representativeBackendAdmissionTriplet.error?.explicitNoBackendErrorReceivedStatement ??
                  "No backend admission error is received from the frontend preview."}
              </p>
              <p className={styles.railFooter}>
                {representativeBackendAdmissionTriplet.contract.nextBackendOwnedDryRunRunnerContractRequirement}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {backendAdmissionTripletRecords.map(({ contract, request, response, error }) => (
            <article key={contract.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Request/response/error preview</p>
                  <h3 className={styles.placeholderTitle}>{contract.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {contract.workspaceTarget}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {contract.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{contract.providerSlotLabel}</span>
                <span className={styles.metaPill}>
                  {request?.requestContractVersion ?? "request preview missing"}
                </span>
              </div>
              <p className={styles.railBody}>
                {`request contract preview: ${request?.requestCreationState ?? "not created"}`}
              </p>
              <p className={styles.railBody}>
                {`prompt payload posture: ${request?.promptPayloadPosture ?? "redacted placeholder only"}`}
              </p>
              <p className={styles.railBody}>
                {`response contract preview: ${response?.responseState ?? "not received"} | admission decision state: ${response?.admissionDecisionState ?? "not evaluated"}`}
              </p>
              <p className={styles.railBody}>
                {`error contract preview: ${error?.errorState ?? "not received"} | retry posture: ${error?.retryPosture ?? "disabled"} | fallback posture: ${error?.fallbackPosture ?? "disabled"}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  request?.promptTransmissionState ?? "not sent",
                  request?.credentialReferencePosture ?? "opaque label only",
                  response?.queueDispatchState ?? "not dispatched",
                  response?.workerDispatchState ?? "not dispatched",
                  response?.jobExecutionState ?? "not executed",
                  error?.recoveryPosture ?? "manual review only",
                ].map((item, index) => (
                  <span
                    key={buildScopedItemKey(contract.key, "triplet", index, item)}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {error ? (
                <div className={styles.workspaceMeta}>
                  {error.validationErrorExamples.map((item, index) => (
                    <span
                      key={buildScopedItemKey(
                        contract.key,
                        "validation-error",
                        index,
                        item
                      )}
                      className={styles.blockedPill}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className={styles.railFooter}>
                {request?.blockedDefaultReason ??
                  contract.blockedDefaultReason}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Backend admission gate schema">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend gate contract</p>
            <h2 className={styles.panelTitle}>Backend admission gate schema</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only gates
          </span>
        </div>
        <p className={styles.panelBody}>
          operator approval. manual confirmation. approval expiry/revocation.
          kill switch. audit. server-only boundary. no frontend provider call.
          no provider SDK import in frontend. no prompt sending from frontend.
          opaque credential reference. privacy/redaction. cost/rate/timeout.
          idempotency/replay block. single-run lock. dry-run result review.
          acceptance matrix review. no queue dispatch until backend runner
          contract. no worker dispatch until backend runner contract. no job
          execution until backend runner contract.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate schema posture</p>
                <h3 className={styles.placeholderTitle}>Gate schema is preview-only</h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${backendContractGateSummary.gateCount} gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendContractGateSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-gate-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate ownership</p>
                <h3 className={styles.placeholderTitle}>
                  Backend-owned contract review lanes
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateApproval}`}
              >
                Review-first
              </span>
            </div>
            <p className={styles.railBody}>
              {`backend-owned contract gates: ${backendContractGateSummary.backendOwnedGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`operator gates: ${backendContractGateSummary.operatorOwnedGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`safety review gates: ${backendContractGateSummary.safetyReviewGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Next likely batch: ${backendContractGateSummary.nextLikelyBatch}`}
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {backendContractGateOwnerGroups.map((ownerGroup, ownerIndex) => (
            <article
              key={buildScopedItemKey(
                "backend-gate-owner-group",
                "item",
                ownerIndex,
                ownerGroup.owner
              )}
              className={styles.summaryCard}
            >
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate owner</p>
                  <h3 className={styles.placeholderTitle}>{ownerGroup.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {`${ownerGroup.records.length} gates`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {ownerGroup.records.map((record, index) => (
                  <span
                    key={buildScopedItemKey(
                      ownerGroup.owner,
                      "gate-label",
                      index,
                      record.id
                    )}
                    className={styles.blockedPill}
                  >
                    {record.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className={styles.summaryGrid}>
          {backendContractGateSchemaRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate schema record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentFrontendState}
                </span>
              </div>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railBody}>
                {`required state: ${record.requiredState}`}
              </p>
              <p className={styles.railBody}>
                {`evidence requirement: ${record.evidenceRequirement}`}
              </p>
              <p className={styles.railBody}>{record.blockedDefaultReason}</p>
              <p className={styles.railFooter}>
                {record.nextBackendContractRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend contract readiness matrix"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend readiness review</p>
            <h2 className={styles.panelTitle}>Backend contract readiness matrix</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Contract-only
          </span>
        </div>
        <p className={styles.panelBody}>
          contract draft state. request contract state. response contract state.
          error contract state. gate schema state. credential boundary state.
          safety boundary state. audit boundary state. approval boundary state.
          queue/worker/job boundary state. persistence boundary state. current
          readiness: not executable / contract-only. next safe action.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness posture</p>
                <h3 className={styles.placeholderTitle}>
                  current readiness: not executable / contract-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${backendContractReadinessSummary.readinessMatrixCount} readiness records`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendContractReadinessSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-readiness-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next safe action</p>
                <h3 className={styles.placeholderTitle}>
                  Dry-run runner contract is next
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {backendContractReadinessSummary.nextLikelyBatch}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {backendContractReadinessSummary.nextSafeAction}
            </p>
          </article>
          {representativeBackendContractReadiness ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative readiness</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendContractReadiness.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeBackendContractReadiness.currentReadiness}
                </span>
              </div>
              <p className={styles.railBody}>
                {`contract draft state: ${representativeBackendContractReadiness.contractDraftState}`}
              </p>
              <p className={styles.railBody}>
                {`request contract state: ${representativeBackendContractReadiness.requestContractState}`}
              </p>
              <p className={styles.railBody}>
                {`response contract state: ${representativeBackendContractReadiness.responseContractState}`}
              </p>
              <p className={styles.railBody}>
                {`error contract state: ${representativeBackendContractReadiness.errorContractState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeBackendContractReadiness.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {backendContractReadinessMatrixRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Readiness matrix record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentReadiness}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${record.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.dryRunRunnerDependency}</span>
              </div>
              <p className={styles.railBody}>
                {`contract draft state: ${record.contractDraftState}`}
              </p>
              <p className={styles.railBody}>
                {`request contract state: ${record.requestContractState} | response contract state: ${record.responseContractState}`}
              </p>
              <p className={styles.railBody}>
                {`error contract state: ${record.errorContractState} | gate schema state: ${record.gateSchemaState}`}
              </p>
              <p className={styles.railBody}>
                {`credential boundary state: ${record.credentialBoundaryState} | safety boundary state: ${record.safetyBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`audit boundary state: ${record.auditBoundaryState} | approval boundary state: ${record.approvalBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`queue boundary state: ${record.queueBoundaryState} | worker boundary state: ${record.workerBoundaryState} | job boundary state: ${record.jobBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`persistence boundary state: ${record.persistenceBoundaryState}`}
              </p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend-owned model provider dry-run runner contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend-owned runner layer</p>
            <h2 className={styles.panelTitle}>
              Backend-owned model provider dry-run runner contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Draft / preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview the backend-owned dry-run runner contract.
          backend-owned dry-run runner contract is preview-only. runner
          contract state: draft / preview-only. dry-run request is not created.
          dry-run invocation is not invoked. dry-run execution is not executed.
          provider response is not received. model output is not generated.
          fixture result is not produced. provider execution is blocked. queue
          dispatch is blocked. worker dispatch is blocked. job execution is
          blocked. No prompt sending. No model calls yet. No provider SDKs
          imported. Athena can now preview backend-owned dry-run runner
          reviews. synthetic dry-run runner skeleton comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Preview-only runner</p>
                <h3 className={styles.placeholderTitle}>
                  Athena can preview the backend-owned dry-run runner contract
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {backendDryRunRunnerContractSummary.runnerContractState}
              </span>
            </div>
            <p className={styles.railBody}>
              backend-owned dry-run runner contract is preview-only
            </p>
            <p className={styles.railBody}>
              runner contract state: draft / preview-only
            </p>
            <p className={styles.railBody}>dry-run request is not created</p>
            <p className={styles.railBody}>dry-run invocation is not invoked</p>
            <p className={styles.railBody}>dry-run execution is not executed</p>
            <p className={styles.railBody}>provider response is not received</p>
            <p className={styles.railBody}>model output is not generated</p>
            <p className={styles.railBody}>fixture result is not produced</p>
            <p className={styles.railBody}>provider execution is blocked</p>
            <p className={styles.railBody}>queue dispatch is blocked</p>
            <p className={styles.railBody}>worker dispatch is blocked</p>
            <p className={styles.railBody}>job execution is blocked</p>
            <p className={styles.railFooter}>
              synthetic dry-run runner skeleton comes next
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {backendDryRunRunnerContractSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${backendDryRunRunnerContractSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${backendDryRunRunnerContractSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${backendDryRunRunnerContractSummary.nextLikelyBatch}`}
            </p>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>
                {`Contracts: ${backendDryRunRunnerContractSummary.contractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Request previews: ${backendDryRunRunnerContractSummary.requestContractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Response previews: ${backendDryRunRunnerContractSummary.responseContractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Error previews: ${backendDryRunRunnerContractSummary.errorContractCount}`}
              </span>
              <span className={styles.metaPill}>
                {`Handoff previews: ${backendDryRunRunnerContractSummary.handoffPreviewCount}`}
              </span>
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Covered capability families</p>
                <h3 className={styles.placeholderTitle}>
                  Dry-run runner coverage
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${backendDryRunRunnerCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendDryRunRunnerCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Dry-run runner workspaces
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${backendDryRunRunnerWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendDryRunRunnerWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeBackendDryRunRunnerContract ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative contract</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendDryRunRunnerContract.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeBackendDryRunRunnerContract.executionPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeBackendDryRunRunnerContract.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {`selected capability family: ${representativeBackendDryRunRunnerContract.selectedCapabilityFamily.label}`}
                </span>
                <span className={styles.metaPill}>
                  {`Provider slot: ${representativeBackendDryRunRunnerContract.providerSlotLabel}`}
                </span>
              </div>
              <p className={styles.railBody}>
                {`source backend admission contract reference: ${representativeBackendDryRunRunnerContract.sourceBackendAdmissionContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source backend admission request contract reference: ${representativeBackendDryRunRunnerContract.sourceBackendAdmissionRequestContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source backend admission response contract reference: ${representativeBackendDryRunRunnerContract.sourceBackendAdmissionResponseContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source backend admission error contract reference: ${representativeBackendDryRunRunnerContract.sourceBackendAdmissionErrorContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source backend contract readiness matrix reference: ${representativeBackendDryRunRunnerContract.sourceBackendContractReadinessMatrixReference}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeBackendDryRunRunnerContract.nextDryRunRunnerReviewRecoveryRequirement
                }
              </p>
            </article>
            {representativeBackendDryRunRunnerHandoff ? (
              <article className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Representative handoff</p>
                    <h3 className={styles.placeholderTitle}>
                      {representativeBackendDryRunRunnerContract.label}
                    </h3>
                  </div>
                  <span
                    className={`${styles.panelBadge} ${styles.metricStateBlocked}`}
                  >
                    {representativeBackendDryRunRunnerHandoff.handoffState}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {`backend runner target: ${representativeBackendDryRunRunnerHandoff.backendRunnerTarget}`}
                </p>
                <p className={styles.railBody}>
                  {`dry-run request state: ${representativeBackendDryRunRunnerHandoff.dryRunRequestState}`}
                </p>
                <p className={styles.railBody}>
                  {`runner invocation state: ${representativeBackendDryRunRunnerHandoff.runnerInvocationState}`}
                </p>
                <p className={styles.railBody}>
                  {`provider call state: ${representativeBackendDryRunRunnerHandoff.providerCallState}`}
                </p>
                <p className={styles.railBody}>
                  {`queue/worker/job state summary: ${representativeBackendDryRunRunnerHandoff.queueWorkerJobStateSummary}`}
                </p>
                <p className={styles.railFooter}>
                  {
                    representativeBackendDryRunRunnerHandoff.explicitNoHandoffNoExecutionStatement
                  }
                </p>
              </article>
            ) : null}
          </div>
        ) : null}
        <div className={styles.summaryGrid}>
          {backendDryRunRunnerContracts.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Dry-run runner contract</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.dryRunRunnerContractState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${record.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>{record.previewOnlyStatement}</p>
              <p className={styles.railBody}>
                {`dry-run runner posture: ${record.dryRunRunnerPosture}`}
              </p>
              <p className={styles.railBody}>
                {`runner invocation posture: ${record.runnerInvocationPosture} | provider call posture: ${record.providerCallPosture}`}
              </p>
              <p className={styles.railBody}>
                {`model call posture: ${record.modelCallPosture} | prompt sending posture: ${record.promptSendingPosture}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run request state: ${record.dryRunRequestState} | dry-run invocation state: ${record.dryRunInvocationState} | dry-run execution state: ${record.dryRunExecutionState}`}
              </p>
              <p className={styles.railBody}>
                {`provider response state: ${record.providerResponseState} | model output state: ${record.modelOutputState} | fixture result state: ${record.fixtureResultState}`}
              </p>
              <p className={styles.railBody}>
                {`queue dispatch state: ${record.queueDispatchState} | worker dispatch state: ${record.workerDispatchState} | job execution state: ${record.jobExecutionState}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  record.manualApprovalRequired,
                  record.manualConfirmationRequired,
                  record.killSwitchRequired,
                  record.auditRequired,
                  record.privacyRedactionRequired,
                  record.costAcknowledgementRequired,
                  record.rateLimitGuardRequired,
                  record.timeoutCancelGuardRequired,
                  record.idempotencyRequired,
                  record.replayBlockRequired,
                  record.singleRunLockRequired,
                  record.dryRunResultReviewRequiredInFuture,
                  record.acceptanceMatrixReviewRequired,
                  record.approvalExpiryReviewRequired,
                  record.approvalRevocationReviewRequired,
                  record.noRetryExecution,
                  record.noFallbackExecution,
                ].map((item, index) => (
                  <span
                    key={buildScopedItemKey(record.key, "requirement", index, item)}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Dry-run runner request/response contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Dry-run request boundary</p>
            <h2 className={styles.panelTitle}>
              Dry-run runner request/response contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only triplets
          </span>
        </div>
        <p className={styles.panelBody}>
          dry-run request contract preview. dry-run response contract preview.
          dry-run error contract preview. prompt payload is redacted placeholder
          only. prompt transmission state: not sent. credential reference
          posture: opaque label only. dry-run request is not created. dry-run
          response is not received. dry-run error is not received. runner
          invocation is not invoked.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Request posture</p>
                <h3 className={styles.placeholderTitle}>
                  dry-run request contract preview
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Not created
              </span>
            </div>
            <p className={styles.railBody}>
              prompt payload is redacted placeholder only
            </p>
            <p className={styles.railBody}>prompt transmission state: not sent</p>
            <p className={styles.railBody}>
              credential reference posture: opaque label only
            </p>
            <p className={styles.railBody}>runner invocation is not invoked</p>
            <p className={styles.railFooter}>dry-run request is not created</p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Response and error posture</p>
                <h3 className={styles.placeholderTitle}>
                  dry-run response contract preview
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Not received
              </span>
            </div>
            <p className={styles.railBody}>dry-run response is not received</p>
            <p className={styles.railBody}>dry-run error contract preview</p>
            <p className={styles.railBody}>dry-run error is not received</p>
            <p className={styles.railFooter}>
              dry-run request/response/error contracts stay preview-only
            </p>
          </article>
          {representativeBackendDryRunRunnerTriplet ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative triplet</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendDryRunRunnerTriplet.contract.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  Redacted request only
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeBackendDryRunRunnerTriplet.request?.explicitNoBackendDryRunRequestCreatedStatement ??
                  "No backend dry-run request is created from the frontend preview."}
              </p>
              <p className={styles.railBody}>
                {representativeBackendDryRunRunnerTriplet.response?.explicitNoBackendDryRunResponseReceivedStatement ??
                  "No backend dry-run response is received from the frontend preview."}
              </p>
              <p className={styles.railBody}>
                {representativeBackendDryRunRunnerTriplet.error?.explicitNoBackendDryRunErrorReceivedStatement ??
                  "No backend dry-run error is received from the frontend preview."}
              </p>
              <p className={styles.railFooter}>
                {representativeBackendDryRunRunnerTriplet.handoff?.explicitNoHandoffNoExecutionStatement ??
                  representativeBackendDryRunRunnerTriplet.contract.nextDryRunRunnerReviewRecoveryRequirement}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {backendDryRunRunnerTripletRecords.map(
            ({ contract, request, response, error, handoff }) => (
              <article key={contract.key} className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>
                      Request/response/error preview
                    </p>
                    <h3 className={styles.placeholderTitle}>{contract.label}</h3>
                  </div>
                  <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                    {contract.workspaceTarget}
                  </span>
                </div>
                <div className={styles.workspaceMeta}>
                  <span className={styles.metaPill}>
                    {contract.selectedCapabilityFamily.label}
                  </span>
                  <span className={styles.metaPill}>{contract.providerSlotLabel}</span>
                  <span className={styles.metaPill}>
                    {request?.requestContractVersion ?? "request preview missing"}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {`dry-run request contract preview: ${request?.requestCreationState ?? "not created"}`}
                </p>
                <p className={styles.railBody}>
                  {`prompt payload posture: ${request?.promptPayloadPosture ?? "redacted placeholder only"}`}
                </p>
                <p className={styles.railBody}>
                  {`dry-run response contract preview: ${response?.responseState ?? "not received"} | dry-run decision state: ${response?.dryRunDecisionState ?? "not evaluated"}`}
                </p>
                <p className={styles.railBody}>
                  {`dry-run error contract preview: ${error?.errorState ?? "not received"} | retry posture: ${error?.retryPosture ?? "disabled"} | fallback posture: ${error?.fallbackPosture ?? "disabled"}`}
                </p>
                <div className={styles.workspaceMeta}>
                  {[
                    request?.runnerInvocationState ?? "not invoked",
                    request?.promptTransmissionState ?? "not sent",
                    request?.credentialReferencePosture ?? "opaque label only",
                    request?.timeoutCancelPosture ?? "timeout/cancel guard required",
                    response?.queueDispatchState ?? "not dispatched",
                    response?.workerDispatchState ?? "not dispatched",
                    response?.jobExecutionState ?? "not executed",
                    error?.recoveryPosture ?? "manual review only",
                  ].map((item, index) => (
                    <span
                      key={buildScopedItemKey(contract.key, "triplet", index, item)}
                      className={styles.blockedPill}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {error ? (
                  <div className={styles.workspaceMeta}>
                    {error.validationErrorExamples.map((item, index) => (
                      <span
                        key={buildScopedItemKey(
                          contract.key,
                          "validation-error",
                          index,
                          item
                        )}
                        className={styles.blockedPill}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
                <p className={styles.railFooter}>
                  {handoff?.blockedDefaultReason ??
                    request?.blockedDefaultReason ??
                    contract.blockedDefaultReason}
                </p>
              </article>
            )
          )}
        </div>
      </section>

      <section className={styles.panel} aria-label="Dry-run runner gate schema">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Dry-run runner gates</p>
            <h2 className={styles.panelTitle}>Dry-run runner gate schema</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only gates
          </span>
        </div>
        <p className={styles.panelBody}>
          backend admission contract. admission token. admission lease. operator
          approval. manual confirmation. approval expiry/revocation. kill
          switch. audit. server-only boundary. no frontend provider call. no
          provider SDK import in frontend. no prompt sending from frontend.
          opaque credential reference. privacy/redaction. cost/rate/timeout.
          idempotency/replay block. single-run lock. no queue dispatch until
          backend runner implementation. no worker dispatch until backend runner
          implementation. no job execution until backend runner implementation.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate schema posture</p>
                <h3 className={styles.placeholderTitle}>
                  dry-run runner gate schema is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${backendDryRunRunnerGateSummary.gateCount} gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendDryRunRunnerGateSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-gate-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate ownership</p>
                <h3 className={styles.placeholderTitle}>
                  Dry-run runner review lanes
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateApproval}`}
              >
                Review-first
              </span>
            </div>
            <p className={styles.railBody}>
              {`backend-owned runner contract gates: ${backendDryRunRunnerGateSummary.backendOwnedGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`operator gates: ${backendDryRunRunnerGateSummary.operatorOwnedGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`safety review gates: ${backendDryRunRunnerGateSummary.safetyReviewGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Next likely batch: ${backendDryRunRunnerGateSummary.nextLikelyBatch}`}
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {backendDryRunRunnerGateOwnerGroups.map((ownerGroup, ownerIndex) => (
            <article
              key={buildScopedItemKey(
                "backend-dry-run-runner-gate-owner-group",
                "item",
                ownerIndex,
                ownerGroup.owner
              )}
              className={styles.summaryCard}
            >
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate owner</p>
                  <h3 className={styles.placeholderTitle}>{ownerGroup.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {`${ownerGroup.records.length} gates`}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {ownerGroup.records.map((record, index) => (
                  <span
                    key={buildScopedItemKey(
                      ownerGroup.owner,
                      "gate-label",
                      index,
                      record.id
                    )}
                    className={styles.blockedPill}
                  >
                    {record.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className={styles.summaryGrid}>
          {backendDryRunRunnerGateSchemaRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate schema record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentFrontendState}
                </span>
              </div>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railBody}>
                {`required state: ${record.requiredState}`}
              </p>
              <p className={styles.railBody}>
                {`evidence requirement: ${record.evidenceRequirement}`}
              </p>
              <p className={styles.railBody}>{record.blockedDefaultReason}</p>
              <p className={styles.railFooter}>
                {record.nextBackendRunnerRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Dry-run runner readiness matrix"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Dry-run runner readiness</p>
            <h2 className={styles.panelTitle}>Dry-run runner readiness matrix</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Contract-only
          </span>
        </div>
        <p className={styles.panelBody}>
          runner contract draft state. dry-run request contract state. dry-run
          response contract state. dry-run error contract state. runner gate
          schema state. admission dependency state. provider adapter boundary
          state. queue/worker/job boundary state. persistence boundary state.
          current readiness: not executable / contract-only. next safe action.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness posture</p>
                <h3 className={styles.placeholderTitle}>
                  current readiness: not executable / contract-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${backendDryRunRunnerReadinessSummary.readinessMatrixCount} readiness records`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {backendDryRunRunnerReadinessSummary.summaryLines.map(
                (item, index) => (
                  <span
                    key={buildScopedItemKey(
                      "backend-dry-run-runner-readiness-summary",
                      "item",
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
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next safe action</p>
                <h3 className={styles.placeholderTitle}>
                  Synthetic dry-run runner skeleton comes next
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              Athena can now review why the backend-owned dry-run runner remains
              held. The next safe batch is the synthetic backend-owned dry-run
              runner skeleton.
            </p>
          </article>
          {representativeBackendDryRunRunnerReadiness ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative readiness</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendDryRunRunnerReadiness.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeBackendDryRunRunnerReadiness.currentReadiness}
                </span>
              </div>
              <p className={styles.railBody}>
                {`runner contract draft state: ${representativeBackendDryRunRunnerReadiness.runnerContractDraftState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run request contract state: ${representativeBackendDryRunRunnerReadiness.dryRunRequestContractState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run response contract state: ${representativeBackendDryRunRunnerReadiness.dryRunResponseContractState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run error contract state: ${representativeBackendDryRunRunnerReadiness.dryRunErrorContractState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeBackendDryRunRunnerReadiness.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {backendDryRunRunnerReadinessMatrixRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Readiness matrix record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentReadiness}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${record.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>
                  {record.dryRunReviewRecoveryDependency}
                </span>
              </div>
              <p className={styles.railBody}>
                {`runner contract draft state: ${record.runnerContractDraftState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run request contract state: ${record.dryRunRequestContractState} | dry-run response contract state: ${record.dryRunResponseContractState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run error contract state: ${record.dryRunErrorContractState} | runner gate schema state: ${record.runnerGateSchemaState}`}
              </p>
              <p className={styles.railBody}>
                {`admission dependency state: ${record.admissionContractDependencyState} | provider adapter boundary state: ${record.providerAdapterBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`credential boundary state: ${record.credentialBoundaryState} | safety boundary state: ${record.safetyBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`queue boundary state: ${record.queueBoundaryState} | worker boundary state: ${record.workerBoundaryState} | job boundary state: ${record.jobBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`persistence boundary state: ${record.persistenceBoundaryState}`}
              </p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend-owned dry-run runner review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Review-only runner posture</p>
            <h2 className={styles.panelTitle}>
              Backend-owned dry-run runner review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can review why the backend-owned dry-run runner is held.
          dry-run runner review is preview-only. dry-run request is not created.
          dry-run invocation is not invoked. dry-run execution is not executed.
          dry-run response is not received. dry-run error is not received.
          provider response is not received. model output is not generated.
          fixture result is not produced. provider execution is blocked. queue
          dispatch is blocked. worker dispatch is blocked. job execution is
          blocked. No prompt sending. No model calls yet. No provider SDKs
          imported. synthetic dry-run runner skeleton comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Review posture</p>
                <h3 className={styles.placeholderTitle}>
                  dry-run runner review is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerReviewSummary.reviewCount} reviews`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {dryRunRunnerReviewSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-review-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {dryRunRunnerReviewSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${dryRunRunnerReviewSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${dryRunRunnerReviewSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${dryRunRunnerReviewSummary.nextLikelyBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Decision reviews: ${dryRunRunnerReviewSummary.decisionReviewCount} | Gate failures: ${dryRunRunnerReviewSummary.gateFailureReviewCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Recovery plans: ${dryRunRunnerReviewSummary.recoveryPlanCount} | Acceptance posture records: ${dryRunRunnerReviewSummary.acceptancePostureCount}`}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Capability coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Review lanes by capability family
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${dryRunRunnerReviewCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {dryRunRunnerReviewCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-review-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.reviewCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Review lanes by workspace
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${dryRunRunnerReviewWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {dryRunRunnerReviewWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-review-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.reviewCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeBackendOwnedDryRunRunnerReview ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative review</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeBackendOwnedDryRunRunnerReview.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeBackendOwnedDryRunRunnerReview.reviewPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeBackendOwnedDryRunRunnerReview.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {representativeBackendOwnedDryRunRunnerReview.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>
                  {representativeBackendOwnedDryRunRunnerReview.providerSlotLabel}
                </span>
              </div>
              <p className={styles.railBody}>
                {`source backend dry-run runner contract reference: ${representativeBackendOwnedDryRunRunnerReview.sourceBackendDryRunRunnerContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run request contract reference: ${representativeBackendOwnedDryRunRunnerReview.sourceDryRunRequestContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run response contract reference: ${representativeBackendOwnedDryRunRunnerReview.sourceDryRunResponseContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run error contract reference: ${representativeBackendOwnedDryRunRunnerReview.sourceDryRunErrorContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run runner gate schema reference: ${representativeBackendOwnedDryRunRunnerReview.sourceDryRunRunnerGateSchemaReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run runner readiness matrix reference: ${representativeBackendOwnedDryRunRunnerReview.sourceDryRunRunnerReadinessMatrixReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run runner handoff preview reference: ${representativeBackendOwnedDryRunRunnerReview.sourceDryRunRunnerHandoffPreviewReference}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  representativeBackendOwnedDryRunRunnerReview.dryRunRunnerContractState,
                  representativeBackendOwnedDryRunRunnerReview.dryRunRequestState,
                  representativeBackendOwnedDryRunRunnerReview.dryRunInvocationState,
                  representativeBackendOwnedDryRunRunnerReview.dryRunExecutionState,
                  representativeBackendOwnedDryRunRunnerReview.dryRunResponseState,
                  representativeBackendOwnedDryRunRunnerReview.dryRunErrorState,
                  representativeBackendOwnedDryRunRunnerReview.providerResponseState,
                  representativeBackendOwnedDryRunRunnerReview.modelOutputState,
                  representativeBackendOwnedDryRunRunnerReview.fixtureResultState,
                ].map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      representativeBackendOwnedDryRunRunnerReview.key,
                      "state",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>
                {
                  representativeBackendOwnedDryRunRunnerReview.nextSyntheticDryRunRunnerSkeletonRequirement
                }
              </p>
            </article>
            {representativeDryRunRunnerReviewAuditSummary ? (
              <article className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Audit summary</p>
                    <h3 className={styles.placeholderTitle}>
                      dry-run runner review audit summary is preview-only
                    </h3>
                  </div>
                  <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                    {representativeDryRunRunnerReviewAuditSummary.auditPosture}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {representativeDryRunRunnerReviewAuditSummary.evidenceSummary}
                </p>
                <p className={styles.railBody}>
                  {`failed gate summary: ${representativeDryRunRunnerReviewAuditSummary.failedGateSummary}`}
                </p>
                <p className={styles.railBody}>
                  {`recovery summary: ${representativeDryRunRunnerReviewAuditSummary.recoverySummary}`}
                </p>
                <p className={styles.railBody}>
                  {`blocked action summary: ${representativeDryRunRunnerReviewAuditSummary.blockedActionSummary}`}
                </p>
                <p className={styles.railFooter}>
                  {
                    representativeDryRunRunnerReviewAuditSummary.syntheticRunnerSkeletonRequirement
                  }
                </p>
              </article>
            ) : null}
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next safe batch</p>
                  <h3 className={styles.placeholderTitle}>
                    Synthetic dry-run runner skeleton comes next
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  {commandCenter.nextLikelyBatch}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {syntheticDryRunRunnerSkeletonChecklist.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      "synthetic-dry-run-runner-skeleton-checklist",
                      "item",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        ) : null}
        <div className={styles.summaryGrid}>
          {backendOwnedDryRunRunnerReviews.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Review record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.executionPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>
                {`dry-run request state: ${record.dryRunRequestState} | dry-run invocation state: ${record.dryRunInvocationState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run execution state: ${record.dryRunExecutionState} | dry-run response state: ${record.dryRunResponseState}`}
              </p>
              <p className={styles.railBody}>
                {`provider response state: ${record.providerResponseState} | model output state: ${record.modelOutputState}`}
              </p>
              <p className={styles.railBody}>
                {`queue dispatch state: ${record.queueDispatchState} | worker dispatch state: ${record.workerDispatchState} | job execution state: ${record.jobExecutionState}`}
              </p>
              <p className={styles.railFooter}>
                {record.nextSyntheticDryRunRunnerSkeletonRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Dry-run runner decision review">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Held decision posture</p>
            <h2 className={styles.panelTitle}>Dry-run runner decision review</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Held / not executable
          </span>
        </div>
        <p className={styles.panelBody}>
          decision state: held / not executable. runner reason summary. top
          blocking gates. top missing evidence. operator review notes. manual
          recovery requirement. backend skeleton dependency. next safe action.
          explicit no-runner-invocation-no-execution statement.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Decision posture</p>
                <h3 className={styles.placeholderTitle}>
                  decision state: held / not executable
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerDecisionReviewRecords.length} decision reviews`}
              </span>
            </div>
            <p className={styles.railBody}>runner reason summary</p>
            <p className={styles.railBody}>top blocking gates</p>
            <p className={styles.railBody}>top missing evidence</p>
            <p className={styles.railBody}>operator review notes</p>
            <p className={styles.railBody}>manual recovery requirement</p>
            <p className={styles.railBody}>backend skeleton dependency</p>
            <p className={styles.railBody}>next safe action</p>
            <p className={styles.railFooter}>
              explicit no-runner-invocation-no-execution statement
            </p>
          </article>
          {representativeDryRunRunnerDecisionReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative decision</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeDryRunRunnerDecisionReview.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunRunnerDecisionReview.decisionState}
                </span>
              </div>
              <p className={styles.railBody}>runner reason summary</p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerDecisionReview.runnerReasonSummary}
              </p>
              <p className={styles.railBody}>top blocking gates</p>
              <div className={styles.workspaceMeta}>
                {representativeDryRunRunnerDecisionReview.topBlockingGates.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeDryRunRunnerDecisionReview.key,
                        "top-gate",
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
              <p className={styles.railBody}>top missing evidence</p>
              <div className={styles.workspaceMeta}>
                {representativeDryRunRunnerDecisionReview.topMissingEvidence.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeDryRunRunnerDecisionReview.key,
                        "missing-evidence",
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
              <p className={styles.railBody}>operator review notes</p>
              <div className={styles.workspaceMeta}>
                {representativeDryRunRunnerDecisionReview.operatorReviewNotes.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeDryRunRunnerDecisionReview.key,
                        "operator-note",
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
              <p className={styles.railBody}>manual recovery requirement</p>
              <p className={styles.railBody}>
                {
                  representativeDryRunRunnerDecisionReview.manualRecoveryRequirement
                }
              </p>
              <p className={styles.railBody}>backend skeleton dependency</p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerDecisionReview.backendSkeletonDependency}
              </p>
              <p className={styles.railBody}>next safe action</p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerDecisionReview.nextSafeAction}
              </p>
              <p className={styles.railBody}>
                explicit no-runner-invocation-no-execution statement
              </p>
              <p className={styles.railFooter}>
                {
                  representativeDryRunRunnerDecisionReview.explicitNoRunnerInvocationNoExecutionStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {dryRunRunnerDecisionReviewRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Decision record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.workspaceTarget}
                </span>
              </div>
              <p className={styles.railBody}>{record.runnerReasonSummary}</p>
              <div className={styles.workspaceMeta}>
                {record.topBlockingGates.map((item, index) => (
                  <span
                    key={buildScopedItemKey(record.key, "top-gate", index, item)}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{record.manualRecoveryRequirement}</p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Dry-run runner gate failure review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Blocked gate posture</p>
            <h2 className={styles.panelTitle}>
              Dry-run runner gate failure review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Blocked by default
          </span>
        </div>
        <p className={styles.panelBody}>
          backend admission contract gate failure. admission token gate
          failure. admission lease gate failure. operator approval gate failure.
          manual confirmation gate failure. kill switch gate failure. audit
          gate failure. server-only boundary gate failure. opaque credential
          gate failure. prompt payload review gate failure. privacy/redaction
          gate failure. cost/rate/timeout gate failure. dry-run
          request/response/error contract gate failure. runner invocation gate
          failure. provider adapter boundary gate failure. queue/worker/job
          gates blocked. persistence gate failure.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate failure coverage</p>
                <h3 className={styles.placeholderTitle}>
                  dry-run runner gate failure review is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerGateFailureSummary.uniqueFailedGateCount} unique failed gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {dryRunRunnerGateFailureSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-gate-failure-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Severity mix</p>
                <h3 className={styles.placeholderTitle}>Held gate profile</h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerGateFailureSummary.gateFailureReviewCount} total records`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`critical gate failures: ${dryRunRunnerGateFailureSummary.criticalGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`high gate failures: ${dryRunRunnerGateFailureSummary.highGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`medium gate failures: ${dryRunRunnerGateFailureSummary.mediumGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Next likely batch: ${dryRunRunnerGateFailureSummary.nextLikelyBatch}`}
            </p>
          </article>
          {representativeDryRunRunnerGateFailureReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative failure</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeDryRunRunnerGateFailureReview.failedGateLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunRunnerGateFailureReview.gateState}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeDryRunRunnerGateFailureReview.operatorFacingExplanation}
              </p>
              <p className={styles.railBody}>
                {`required evidence to unblock: ${representativeDryRunRunnerGateFailureReview.requiredEvidenceToUnblock}`}
              </p>
              <p className={styles.railBody}>
                {`required recovery action: ${representativeDryRunRunnerGateFailureReview.requiredRecoveryAction}`}
              </p>
              <p className={styles.railFooter}>
                {representativeDryRunRunnerGateFailureReview.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {dryRunRunnerGateFailureReviewsForDisplay.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate failure record</p>
                  <h3 className={styles.placeholderTitle}>
                    {record.failedGateLabel}
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${
                    record.severity === "critical"
                      ? styles.metricStateBlocked
                      : styles.metricStateApproval
                  }`}
                >
                  {record.severity}
                </span>
              </div>
              <p className={styles.railBody}>{record.gateState}</p>
              <p className={styles.railBody}>
                {record.operatorFacingExplanation}
              </p>
              <p className={styles.railBody}>
                {record.requiredRecoveryAction}
              </p>
              <p className={styles.railFooter}>
                {record.explicitNoGatePassStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Dry-run runner recovery plan">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Manual recovery posture</p>
            <h2 className={styles.panelTitle}>Dry-run runner recovery plan</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Manual review only
          </span>
        </div>
        <p className={styles.panelBody}>
          recovery is manual review only. retry disabled. fallback disabled.
          runner contract incomplete recovery. dry-run request not created
          recovery. runner invocation not invoked recovery. dry-run execution
          not executed recovery. provider response not received recovery. model
          output not generated recovery. fixture result not produced recovery.
          queue/worker/job blocked recovery. persistence recovery. synthetic
          dry-run runner skeleton comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Recovery posture</p>
                <h3 className={styles.placeholderTitle}>
                  recovery is manual review only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerRecoverySummary.recoveryPlanCount} recovery plans`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {dryRunRunnerRecoverySummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-recovery-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness posture</p>
                <h3 className={styles.placeholderTitle}>
                  current blocked posture
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerRecoverySummary.blockedChecklistCount} blocked checklist items`}
              </span>
            </div>
            <p className={styles.railBody}>retry disabled</p>
            <p className={styles.railBody}>fallback disabled</p>
            <p className={styles.railBody}>
              {`acceptance posture records: ${dryRunRunnerRecoverySummary.acceptancePostureCount}`}
            </p>
            <p className={styles.railFooter}>
              {dryRunRunnerRecoverySummary.nextSafeAction}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next batch checklist</p>
                <h3 className={styles.placeholderTitle}>
                  Synthetic dry-run runner skeleton comes next
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {dryRunRunnerRecoverySummary.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {syntheticDryRunRunnerSkeletonChecklist.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "backend-dry-run-runner-recovery-checklist",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeDryRunRunnerRecoveryPlan ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative recovery</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeDryRunRunnerRecoveryPlan.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunRunnerRecoveryPlan.recoveryPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.runnerContractIncompleteRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.dryRunRequestNotCreatedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.runnerInvocationNotInvokedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.dryRunExecutionNotExecutedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.providerResponseNotReceivedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.modelOutputNotGeneratedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.fixtureResultNotProducedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.queueDispatchBlockedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.workerDispatchBlockedRecovery}
              </p>
              <p className={styles.railBody}>
                {representativeDryRunRunnerRecoveryPlan.jobExecutionBlockedRecovery}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeDryRunRunnerRecoveryPlan.explicitNoRetryNoFallbackNoExecutionStatement
                }
              </p>
            </article>
          </div>
        ) : null}
      </section>

      <section
        className={styles.panel}
        aria-label="Dry-run runner recovery readiness"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact readiness view</p>
            <h2 className={styles.panelTitle}>
              Dry-run runner recovery readiness
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only checklist
          </span>
        </div>
        <p className={styles.panelBody}>
          dry-run runner recovery readiness is preview-only. checklist records
          stay compact. current blocked posture remains visible. synthetic
          dry-run runner skeleton comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Checklist counts</p>
                <h3 className={styles.placeholderTitle}>
                  Recovery readiness checklist records
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerRecoveryReadinessChecklistRecords.length} checklist records`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`blocked posture: ${blockedDryRunRunnerRecoveryReadinessChecklistRecords.length} records`}
            </p>
            <p className={styles.railBody}>
              {`manual review required: ${
                dryRunRunnerRecoveryReadinessChecklistRecords.filter(
                  (record) => record.state === "manual review required"
                ).length
              } records`}
            </p>
            <p className={styles.railBody}>
              {`backend future required: ${
                dryRunRunnerRecoveryReadinessChecklistRecords.filter(
                  (record) => record.state === "backend future required"
                ).length
              } records`}
            </p>
            <p className={styles.railFooter}>current blocked posture</p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Current posture</p>
                <h3 className={styles.placeholderTitle}>preview-only</h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <p className={styles.railBody}>
              queue dispatch still blocked. worker dispatch still blocked. job
              execution still blocked. persistence still blocked.
            </p>
            <p className={styles.railFooter}>
              provider adapter boundary still blocked
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {dryRunRunnerRecoveryReadinessChecklistRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Checklist record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${
                    record.state === "blocked"
                      ? styles.metricStateBlocked
                      : record.state === "manual review required"
                        ? styles.metricStateApproval
                        : styles.metricStateSecondary
                  }`}
                >
                  {record.state}
                </span>
              </div>
              <p className={styles.railBody}>{`severity: ${record.severity}`}</p>
              <p className={styles.railBody}>
                {`evidence required: ${record.evidenceRequired}`}
              </p>
              <p className={styles.railBody}>
                {`recovery action: ${record.recoveryAction}`}
              </p>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Dry-run runner acceptance posture"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Acceptance remains blocked</p>
            <h2 className={styles.panelTitle}>
              Dry-run runner acceptance posture
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Not accepted / preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          acceptance state: not accepted / preview-only. acceptance blockers.
          safety blockers. privacy blockers. cost/rate blockers. audit
          blockers. approval blockers. runner blockers. queue/worker/job
          blockers. persistence blockers.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Acceptance posture</p>
                <h3 className={styles.placeholderTitle}>
                  acceptance state: not accepted / preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${dryRunRunnerAcceptancePostureRecords.length} posture records`}
              </span>
            </div>
            <p className={styles.railBody}>acceptance blockers</p>
            <p className={styles.railBody}>safety blockers</p>
            <p className={styles.railBody}>privacy blockers</p>
            <p className={styles.railBody}>cost/rate blockers</p>
            <p className={styles.railBody}>audit blockers</p>
            <p className={styles.railBody}>approval blockers</p>
            <p className={styles.railBody}>runner blockers</p>
            <p className={styles.railBody}>queue/worker/job blockers</p>
            <p className={styles.railFooter}>persistence blockers</p>
          </article>
          {representativeDryRunRunnerAcceptancePosture ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative posture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeDryRunRunnerAcceptancePosture.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeDryRunRunnerAcceptancePosture.acceptanceState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {representativeDryRunRunnerAcceptancePosture.acceptanceBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeDryRunRunnerAcceptancePosture.key,
                        "acceptance-blocker",
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
              <div className={styles.workspaceMeta}>
                {representativeDryRunRunnerAcceptancePosture.safetyBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeDryRunRunnerAcceptancePosture.key,
                        "safety-blocker",
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
              <div className={styles.workspaceMeta}>
                {representativeDryRunRunnerAcceptancePosture.privacyBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeDryRunRunnerAcceptancePosture.key,
                        "privacy-blocker",
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
              <p className={styles.railFooter}>
                {
                  representativeDryRunRunnerAcceptancePosture.explicitNoAcceptanceNoExecutionStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {dryRunRunnerAcceptancePostureRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Acceptance record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.workspaceTarget}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {record.runnerBlockers.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      record.key,
                      "runner-blocker",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {record.queueWorkerJobBlockers.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      record.key,
                      "dispatch-blocker",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{record.nextSafeAction}</p>
              <p className={styles.railFooter}>
                {record.explicitNoAcceptanceNoExecutionStatement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend-owned synthetic dry-run runner skeleton"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only backend skeleton</p>
            <h2 className={styles.panelTitle}>
              Backend-owned synthetic dry-run runner skeleton
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview the backend-owned synthetic dry-run runner
          skeleton. synthetic runner skeleton is preview-only. runner state:
          skeleton / not executable. dry-run request is not created. runner
          invocation is not invoked. dry-run execution is not executed.
          provider response is not received. model output is not generated.
          synthetic fixture result is static placeholder only. provider
          execution is blocked. queue dispatch is blocked. worker dispatch is
          blocked. job execution is blocked. No prompt sending. No model calls
          yet. No provider SDKs imported. synthetic dry-run result capture
          contract comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Skeleton posture</p>
                <h3 className={styles.placeholderTitle}>
                  synthetic runner skeleton is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${syntheticRunnerSkeletonSummary.skeletonCount} skeletons`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {syntheticRunnerSkeletonSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "synthetic-runner-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {syntheticRunnerSkeletonSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${syntheticRunnerSkeletonSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${syntheticRunnerSkeletonSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${syntheticRunnerSkeletonSummary.nextLikelyBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Input fixtures: ${syntheticRunnerSkeletonSummary.inputFixtureCount} | Output fixtures: ${syntheticRunnerSkeletonSummary.outputFixtureCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Error fixtures: ${syntheticRunnerSkeletonSummary.errorFixtureCount} | Gates: ${syntheticRunnerSkeletonSummary.gateCount}`}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Capability coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Synthetic skeleton lanes by capability family
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${syntheticRunnerCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {syntheticRunnerCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "synthetic-runner-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.skeletonCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Synthetic skeleton lanes by workspace
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${syntheticRunnerWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {syntheticRunnerWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "synthetic-runner-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.skeletonCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeSyntheticRunnerSkeleton ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative skeleton</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticRunnerSkeleton.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticRunnerSkeleton.runnerState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeSyntheticRunnerSkeleton.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {representativeSyntheticRunnerSkeleton.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>
                  {representativeSyntheticRunnerSkeleton.providerSlotLabel}
                </span>
              </div>
              <p className={styles.railBody}>
                {`source dry-run runner contract reference: ${representativeSyntheticRunnerSkeleton.sourceDryRunRunnerContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source dry-run runner review reference: ${representativeSyntheticRunnerSkeleton.sourceDryRunRunnerReviewReference}`}
              </p>
              <p className={styles.railBody}>
                {`source backend admission contract reference: ${representativeSyntheticRunnerSkeleton.sourceBackendAdmissionContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source run intent reference: ${representativeSyntheticRunnerSkeleton.sourceRunIntentReference}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  representativeSyntheticRunnerSkeleton.dryRunRequestState,
                  representativeSyntheticRunnerSkeleton.runnerInvocationState,
                  representativeSyntheticRunnerSkeleton.dryRunExecutionState,
                  representativeSyntheticRunnerSkeleton.providerResponseState,
                  representativeSyntheticRunnerSkeleton.modelOutputState,
                  representativeSyntheticRunnerSkeleton.syntheticFixtureResultState,
                ].map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      representativeSyntheticRunnerSkeleton.key,
                      "state",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticRunnerSkeleton.nextSyntheticDryRunResultCaptureContractRequirement
                }
              </p>
            </article>
            {representativeSyntheticRunnerHandoff ? (
              <article className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Handoff preview</p>
                    <h3 className={styles.placeholderTitle}>
                      preview-only / not handed off
                    </h3>
                  </div>
                  <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                    {representativeSyntheticRunnerHandoff.backendRunnerTarget}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {`dry-run request state: ${representativeSyntheticRunnerHandoff.dryRunRequestState}`}
                </p>
                <p className={styles.railBody}>
                  {`runner invocation state: ${representativeSyntheticRunnerHandoff.runnerInvocationState}`}
                </p>
                <p className={styles.railBody}>
                  {`provider call state: ${representativeSyntheticRunnerHandoff.providerCallState} | model output state: ${representativeSyntheticRunnerHandoff.modelOutputState}`}
                </p>
                <p className={styles.railBody}>
                  {`fixture result state: ${representativeSyntheticRunnerHandoff.fixtureResultState} | queue/worker/job state summary: ${representativeSyntheticRunnerHandoff.queueWorkerJobStateSummary}`}
                </p>
                <p className={styles.railFooter}>
                  {
                    representativeSyntheticRunnerHandoff.explicitNoHandoffNoExecutionStatement
                  }
                </p>
              </article>
            ) : null}
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next contract</p>
                  <h3 className={styles.placeholderTitle}>
                    synthetic dry-run result capture contract comes next
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  {syntheticRunnerSkeletonSummary.nextLikelyBatch}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {nextSyntheticDryRunResultCaptureContractChecklist.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        "synthetic-runner-next-contract-checklist",
                        "item",
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
        <div className={styles.summaryGrid}>
          {syntheticRunnerSkeletons.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Synthetic skeleton</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.runnerState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>
                {`backup provider slot label: ${record.backupProviderSlotLabel}`}
              </p>
              <p className={styles.railBody}>
                {`local/private alternative label: ${record.localPrivateAlternativeLabel}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run request state: ${record.dryRunRequestState} | runner invocation state: ${record.runnerInvocationState}`}
              </p>
              <p className={styles.railBody}>
                {`dry-run execution state: ${record.dryRunExecutionState} | provider response state: ${record.providerResponseState}`}
              </p>
              <p className={styles.railBody}>
                {`model output state: ${record.modelOutputState} | synthetic fixture result state: ${record.syntheticFixtureResultState}`}
              </p>
              <p className={styles.railFooter}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Synthetic dry-run fixture packet">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Static fixture-only packet</p>
            <h2 className={styles.panelTitle}>Synthetic dry-run fixture packet</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          synthetic input fixture. synthetic output fixture. synthetic error
          fixture. prompt payload is redacted placeholder only. prompt
          transmission state: not sent. credential reference posture: opaque
          label only. provider response is not received. model output is not
          generated. synthetic result is placeholder only. no real input, no
          real output, no real error.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Fixture packet summary</p>
                <h3 className={styles.placeholderTitle}>
                  No real input, no real output, no real error
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Preview-only
              </span>
            </div>
            <p className={styles.railBody}>
              {`synthetic input fixtures: ${syntheticInputFixtures.length}`}
            </p>
            <p className={styles.railBody}>
              {`synthetic output fixtures: ${syntheticOutputFixtures.length}`}
            </p>
            <p className={styles.railBody}>
              {`synthetic error fixtures: ${syntheticErrorFixtures.length}`}
            </p>
            <p className={styles.railFooter}>
              prompt payload is redacted placeholder only
            </p>
          </article>
          {representativeSyntheticInputFixture ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Synthetic input fixture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticInputFixture.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticInputFixture.fixtureMode}
                </span>
              </div>
              <p className={styles.railBody}>
                {`prompt payload posture: ${representativeSyntheticInputFixture.promptPayloadPosture}`}
              </p>
              <p className={styles.railBody}>
                {`prompt transmission state: ${representativeSyntheticInputFixture.promptTransmissionState}`}
              </p>
              <p className={styles.railBody}>
                {`credential reference posture: ${representativeSyntheticInputFixture.credentialReferencePosture}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticInputFixture.explicitNoRealInputNoPromptSentStatement
                }
              </p>
            </article>
          ) : null}
          {representativeSyntheticOutputFixture ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Synthetic output fixture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticOutputFixture.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticOutputFixture.outputMode}
                </span>
              </div>
              <p className={styles.railBody}>
                {`provider response state: ${representativeSyntheticOutputFixture.providerResponseState}`}
              </p>
              <p className={styles.railBody}>
                {`model output state: ${representativeSyntheticOutputFixture.modelOutputState}`}
              </p>
              <p className={styles.railBody}>
                {`synthetic result state: ${representativeSyntheticOutputFixture.syntheticResultState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticOutputFixture.explicitNoRealOutputNoModelOutputStatement
                }
              </p>
            </article>
          ) : null}
          {representativeSyntheticErrorFixture ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Synthetic error fixture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticErrorFixture.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticErrorFixture.errorMode}
                </span>
              </div>
              <p className={styles.railBody}>
                {`provider error state: ${representativeSyntheticErrorFixture.providerErrorState}`}
              </p>
              <p className={styles.railBody}>
                {representativeSyntheticErrorFixture.runnerInvocationDeniedExample}
              </p>
              <p className={styles.railBody}>
                {representativeSyntheticErrorFixture.queueDispatchBlockedExample}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticErrorFixture.explicitNoRealErrorNoProviderErrorStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {syntheticFixturePacketRecords.map((record) => (
            <article key={record.skeleton.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Synthetic fixture packet</p>
                  <h3 className={styles.placeholderTitle}>
                    {record.skeleton.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.skeleton.workspaceTarget}
                </span>
              </div>
              <p className={styles.railBody}>
                {`synthetic input fixture: ${record.input?.promptPayloadPosture ?? "missing"}`}
              </p>
              <p className={styles.railBody}>
                {`synthetic output fixture: ${record.output?.syntheticResultState ?? "missing"}`}
              </p>
              <p className={styles.railBody}>
                {`synthetic error fixture: ${record.error?.errorMode ?? "missing"}`}
              </p>
              <p className={styles.railBody}>
                {`readiness: ${record.readiness?.currentReadiness ?? "missing"}`}
              </p>
              <p className={styles.railFooter}>
                {record.handoff?.explicitNoHandoffNoExecutionStatement ?? "No handoff. No execution."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Synthetic runner skeleton gates">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only gate schema</p>
            <h2 className={styles.panelTitle}>Synthetic runner skeleton gates</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only / blocked
          </span>
        </div>
        <p className={styles.panelBody}>
          synthetic runner gates are preview-only. backend admission contract.
          dry-run runner contract. dry-run runner review. synthetic input
          fixture. synthetic output fixture. synthetic error fixture. operator
          approval. manual confirmation. kill switch. audit. server-only
          boundary. no frontend provider call. no provider SDK import in
          frontend. no prompt sending. opaque credential reference. no
          plaintext secrets. privacy/redaction. cost/rate/timeout.
          idempotency/replay block. single-run lock. no queue dispatch. no
          worker dispatch. no job execution. no persistence until future
          backend batch.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate summary</p>
                <h3 className={styles.placeholderTitle}>
                  synthetic runner gates are preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${syntheticRunnerGateSummary.gateCount} gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {syntheticRunnerGateSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "synthetic-runner-gate-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Owner counts</p>
                <h3 className={styles.placeholderTitle}>Backend, operator, safety</h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                Required
              </span>
            </div>
            <p className={styles.railBody}>
              {`backend skeleton: ${syntheticRunnerGateSummary.backendSkeletonGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`operator: ${syntheticRunnerGateSummary.operatorGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`safety review: ${syntheticRunnerGateSummary.safetyReviewGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Next likely batch: ${syntheticRunnerGateSummary.nextLikelyBatch}`}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next result capture checklist</p>
                <h3 className={styles.placeholderTitle}>
                  synthetic dry-run result capture contract comes next
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                Next likely batch
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {nextSyntheticDryRunResultCaptureContractChecklist.map(
                (item, index) => (
                  <span
                    key={buildScopedItemKey(
                      "synthetic-runner-gate-next-checklist",
                      "item",
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
        <div className={styles.summaryGrid}>
          {syntheticRunnerGates.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentState}
                </span>
              </div>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railBody}>
                {`required state: ${record.requiredState}`}
              </p>
              <p className={styles.railBody}>
                {`evidence requirement: ${record.evidenceRequirement}`}
              </p>
              <p className={styles.railBody}>{record.blockedDefaultReason}</p>
              <p className={styles.railFooter}>
                {record.nextResultCaptureContractRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Synthetic runner readiness matrix">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact readiness matrix</p>
            <h2 className={styles.panelTitle}>Synthetic runner readiness matrix</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            skeleton-only / not executable
          </span>
        </div>
        <p className={styles.panelBody}>
          skeleton state. input fixture state. output fixture state. error
          fixture state. gate schema state. admission dependency state. runner
          contract dependency state. runner review dependency state.
          queue/worker/job boundary state. persistence boundary state. result
          capture dependency. current readiness: skeleton-only / not
          executable. next safe action.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness summary</p>
                <h3 className={styles.placeholderTitle}>
                  current readiness: skeleton-only / not executable
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${syntheticRunnerReadinessSummary.readinessRecordCount} readiness records`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {syntheticRunnerReadinessSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "synthetic-runner-readiness-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeSyntheticRunnerReadiness ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative readiness</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticRunnerReadiness.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticRunnerReadiness.currentReadiness}
                </span>
              </div>
              <p className={styles.railBody}>
                {`skeleton state: ${representativeSyntheticRunnerReadiness.skeletonState}`}
              </p>
              <p className={styles.railBody}>
                {`input fixture state: ${representativeSyntheticRunnerReadiness.inputFixtureState} | output fixture state: ${representativeSyntheticRunnerReadiness.outputFixtureState}`}
              </p>
              <p className={styles.railBody}>
                {`error fixture state: ${representativeSyntheticRunnerReadiness.errorFixtureState} | gate schema state: ${representativeSyntheticRunnerReadiness.gateSchemaState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticRunnerReadiness.resultCaptureDependency
                }
              </p>
            </article>
          ) : null}
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next safe action</p>
                <h3 className={styles.placeholderTitle}>Keep the skeleton inert</h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {syntheticRunnerReadinessSummary.nextLikelyBatch}
              </span>
            </div>
            <p className={styles.placeholderSummary}>
              {syntheticRunnerReadinessSummary.nextSafeAction}
            </p>
            <p className={styles.railBody}>
              queue dispatch is blocked. worker dispatch is blocked. job
              execution is blocked.
            </p>
            <p className={styles.railFooter}>
              persistence boundary state: not implemented
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {syntheticRunnerReadinessMatrixRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Readiness record</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentReadiness}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
              </div>
              <p className={styles.railBody}>
                {`skeleton state: ${record.skeletonState}`}
              </p>
              <p className={styles.railBody}>
                {`input fixture state: ${record.inputFixtureState} | output fixture state: ${record.outputFixtureState}`}
              </p>
              <p className={styles.railBody}>
                {`error fixture state: ${record.errorFixtureState} | gate schema state: ${record.gateSchemaState}`}
              </p>
              <p className={styles.railBody}>
                {`admission dependency state: ${record.admissionContractDependencyState} | runner contract dependency state: ${record.runnerContractDependencyState}`}
              </p>
              <p className={styles.railBody}>
                {`runner review dependency state: ${record.runnerReviewDependencyState}`}
              </p>
              <p className={styles.railBody}>
                {`queue/worker/job boundary state: ${record.queueBoundaryState} / ${record.workerBoundaryState} / ${record.jobBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`persistence boundary state: ${record.persistenceBoundaryState}`}
              </p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend-owned synthetic dry-run result capture contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend-owned contract layer</p>
            <h2 className={styles.panelTitle}>
              Backend-owned synthetic dry-run result capture contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview the backend-owned synthetic dry-run result capture
          contract. synthetic result capture contract is preview-only. result
          capture state: not captured. result persistence is not implemented.
          audit persistence is not implemented. approval persistence is not
          implemented. database write is not implemented. file write is not
          implemented. provider response is not received. model output is not
          generated. synthetic fixture result is static placeholder only. result
          envelope is preview-only. result id is not issued. No prompt sending.
          No model calls yet. No provider SDKs imported. synthetic dry-run
          result capture review and recovery preview comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Contract summary</p>
                <h3 className={styles.placeholderTitle}>
                  synthetic result capture contract is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureContractSummary.contractCount} contracts`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureContractSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-contract-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {resultCaptureContractSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${resultCaptureContractSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${resultCaptureContractSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${resultCaptureContractSummary.nextLikelyBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Result envelopes: ${resultCaptureContractSummary.resultEnvelopeCount} | Requests: ${resultCaptureContractSummary.requestContractCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Responses: ${resultCaptureContractSummary.responseContractCount} | Errors: ${resultCaptureContractSummary.errorContractCount}`}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Capability coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Result capture lanes by capability family
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${resultCaptureCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Result capture lanes by workspace
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${resultCaptureWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeResultCaptureContract ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative contract</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureContract.resultCaptureState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeResultCaptureContract.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {
                    representativeResultCaptureContract.selectedCapabilityFamily
                      .label
                  }
                </span>
                <span className={styles.metaPill}>
                  {representativeResultCaptureContract.providerSlotLabel}
                </span>
              </div>
              <p className={styles.railBody}>
                {`source synthetic runner skeleton reference: ${representativeResultCaptureContract.sourceSyntheticRunnerSkeletonReference}`}
              </p>
              <p className={styles.railBody}>
                {`source synthetic input fixture reference: ${representativeResultCaptureContract.sourceSyntheticInputFixtureReference}`}
              </p>
              <p className={styles.railBody}>
                {`source synthetic output fixture reference: ${representativeResultCaptureContract.sourceSyntheticOutputFixtureReference}`}
              </p>
              <p className={styles.railBody}>
                {`source synthetic error fixture reference: ${representativeResultCaptureContract.sourceSyntheticErrorFixtureReference}`}
              </p>
              <p className={styles.railBody}>
                {`source synthetic runner readiness reference: ${representativeResultCaptureContract.sourceSyntheticRunnerReadinessReference}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureContract
                    .nextResultCaptureReviewRecoveryRequirement
                }
              </p>
            </article>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next review path</p>
                  <h3 className={styles.placeholderTitle}>
                    synthetic dry-run result capture review and recovery preview
                    comes next
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  {resultCaptureContractSummary.nextLikelyBatch}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {nextResultCaptureReviewAndRecoveryChecklist.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        "result-capture-next-checklist",
                        "item",
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
        <div className={styles.summaryGrid}>
          {resultCaptureContracts.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Capture contract</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.resultCaptureState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>
                {`result persistence state: ${record.resultPersistenceState} | audit persistence state: ${record.auditPersistenceState}`}
              </p>
              <p className={styles.railBody}>
                {`approval persistence state: ${record.approvalPersistenceState} | artifact persistence state: ${record.artifactPersistenceState}`}
              </p>
              <p className={styles.railBody}>
                {`database write state: ${record.databaseWriteState} | file write state: ${record.fileWriteState}`}
              </p>
              <p className={styles.railFooter}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Synthetic result envelope contract">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only envelope</p>
            <h2 className={styles.panelTitle}>Synthetic result envelope contract</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          result envelope mode: preview-only. result payload posture: static
          placeholder only. result digest posture: deterministic preview digest
          only. no real result. no result persistence. no audit persistence. no
          approval persistence.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Envelope summary</p>
                <h3 className={styles.placeholderTitle}>
                  no real result. no result persistence
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${syntheticResultEnvelopes.length} envelopes`}
              </span>
            </div>
            <p className={styles.railBody}>result envelope mode: preview-only</p>
            <p className={styles.railBody}>
              result payload posture: static placeholder only
            </p>
            <p className={styles.railBody}>
              result digest posture: deterministic preview digest only
            </p>
            <p className={styles.railFooter}>
              no real result. no result persistence.
            </p>
          </article>
          {representativeSyntheticResultEnvelope ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative envelope</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticResultEnvelope.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticResultEnvelope.resultEnvelopeMode}
                </span>
              </div>
              <p className={styles.railBody}>
                {`provider response state: ${representativeSyntheticResultEnvelope.providerResponseState}`}
              </p>
              <p className={styles.railBody}>
                {`model output state: ${representativeSyntheticResultEnvelope.modelOutputState}`}
              </p>
              <p className={styles.railBody}>
                {`token/cost accounting state: ${representativeSyntheticResultEnvelope.tokenCostAccountingState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticResultEnvelope
                    .explicitNoRealResultNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {syntheticResultEnvelopes.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Result envelope</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.resultEnvelopeMode}
                </span>
              </div>
              <p className={styles.railBody}>
                {`result payload posture: ${record.resultPayloadPosture}`}
              </p>
              <p className={styles.railBody}>
                {`result id state: ${record.resultIdState} | result digest posture: ${record.resultDigestPosture}`}
              </p>
              <p className={styles.railBody}>
                {`audit join state: ${record.auditJoinState} | approval join state: ${record.approvalJoinState}`}
              </p>
              <p className={styles.railFooter}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result capture request/response contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only request lifecycle</p>
            <h2 className={styles.panelTitle}>
              Result capture request/response contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          capture request is not created. capture invocation is not invoked.
          capture response is not received. capture error is not received.
          result capture is not captured. persistence target is not
          implemented. no database writes. no file writes.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Contract counts</p>
                <h3 className={styles.placeholderTitle}>
                  preview-only request/response/error contracts
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureRequestContracts.length}/${resultCaptureResponseContracts.length}/${resultCaptureErrorContracts.length}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`requests: ${resultCaptureRequestContracts.length} | responses: ${resultCaptureResponseContracts.length}`}
            </p>
            <p className={styles.railBody}>
              {`errors: ${resultCaptureErrorContracts.length}`}
            </p>
            <p className={styles.railFooter}>
              capture request is not created. capture response is not received.
            </p>
          </article>
          {representativeResultCaptureRequest ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative request</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureRequest.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureRequest.captureRequestState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`capture invocation state: ${representativeResultCaptureRequest.captureInvocationState}`}
              </p>
              <p className={styles.railBody}>
                {`result payload posture: ${representativeResultCaptureRequest.resultPayloadPosture}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureRequest
                    .explicitNoCaptureRequestCreatedStatement
                }
              </p>
            </article>
          ) : null}
          {representativeResultCaptureResponse ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative response</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureResponse.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureResponse.responseState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`capture decision state: ${representativeResultCaptureResponse.captureDecisionState}`}
              </p>
              <p className={styles.railBody}>
                {`result location state: ${representativeResultCaptureResponse.resultLocationState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureResponse
                    .explicitNoCaptureResponseNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
          {representativeResultCaptureError ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative error</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureError.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureError.errorState}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeResultCaptureError.missingSyntheticOutputExample}
              </p>
              <p className={styles.railBody}>
                {representativeResultCaptureError.databaseWriteBlockedExample}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureError
                    .explicitNoCaptureErrorNoRetryNoFallbackStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {resultCapturePreviewRecords.map((record) => (
            <article key={record.contract.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Capture lifecycle</p>
                  <h3 className={styles.placeholderTitle}>
                    {record.contract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.contract.resultCaptureState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`request: ${record.request?.captureRequestState ?? "missing"} | invocation: ${record.request?.captureInvocationState ?? "missing"}`}
              </p>
              <p className={styles.railBody}>
                {`response: ${record.response?.responseState ?? "missing"} | decision: ${record.response?.captureDecisionState ?? "missing"}`}
              </p>
              <p className={styles.railBody}>
                {`error: ${record.error?.errorState ?? "missing"} | retry posture: ${record.error?.retryPosture ?? "missing"}`}
              </p>
              <p className={styles.railFooter}>
                {record.request?.blockedDefaultReason ?? record.contract.blockedDefaultReason}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Result capture gates">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only gate schema</p>
            <h2 className={styles.panelTitle}>Result capture gates</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only / blocked
          </span>
        </div>
        <p className={styles.panelBody}>
          synthetic runner skeleton. synthetic output fixture. synthetic error
          fixture. synthetic result envelope. result capture request. result
          capture response. result capture error. operator approval. manual
          confirmation. kill switch. audit. server-only boundary. no frontend
          provider call. no provider SDK import in frontend. no prompt
          sending. opaque credential reference. no plaintext secrets.
          privacy/redaction. cost/rate/timeout. idempotency/replay block.
          single-run lock. no queue dispatch. no worker dispatch. no job
          execution. no result persistence. no audit persistence. no approval
          persistence. no database writes. no file writes.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate summary</p>
                <h3 className={styles.placeholderTitle}>
                  result capture gates are preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureGateSummary.gateCount} gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureGateSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-gate-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Owner counts</p>
                <h3 className={styles.placeholderTitle}>
                  Backend contract, operator, safety
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                Required
              </span>
            </div>
            <p className={styles.railBody}>
              {`backend capture contract: ${resultCaptureGateSummary.backendCaptureContractGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`operator: ${resultCaptureGateSummary.operatorGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`safety review: ${resultCaptureGateSummary.safetyReviewGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Next likely batch: ${resultCaptureGateSummary.nextLikelyBatch}`}
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureGateRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentState}
                </span>
              </div>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railBody}>
                {`required state: ${record.requiredState}`}
              </p>
              <p className={styles.railBody}>
                {`evidence requirement: ${record.evidenceRequirement}`}
              </p>
              <p className={styles.railFooter}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result capture readiness matrix"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact readiness matrix</p>
            <h2 className={styles.panelTitle}>Result capture readiness matrix</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            capture-contract-only / not persistent
          </span>
        </div>
        <p className={styles.panelBody}>
          capture contract state. result envelope state. capture request
          contract state. capture response contract state. capture error
          contract state. result persistence boundary state. audit persistence
          boundary state. approval persistence boundary state. database
          boundary state. file boundary state. current readiness:
          capture-contract-only / not persistent. next safe action.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness summary</p>
                <h3 className={styles.placeholderTitle}>
                  current readiness: capture-contract-only / not persistent
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureReadinessSummary.readinessRecordCount} readiness records`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureReadinessSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-readiness-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeResultCaptureReadiness ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative readiness</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureReadiness.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureReadiness.currentReadiness}
                </span>
              </div>
              <p className={styles.railBody}>
                {`capture contract state: ${representativeResultCaptureReadiness.captureContractState}`}
              </p>
              <p className={styles.railBody}>
                {`result envelope state: ${representativeResultCaptureReadiness.resultEnvelopeState} | capture request contract state: ${representativeResultCaptureReadiness.captureRequestContractState}`}
              </p>
              <p className={styles.railBody}>
                {`capture response contract state: ${representativeResultCaptureReadiness.captureResponseContractState} | capture error contract state: ${representativeResultCaptureReadiness.captureErrorContractState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeResultCaptureReadiness.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureReadinessMatrixRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Readiness record</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentReadiness}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
              </div>
              <p className={styles.railBody}>
                {`result persistence boundary state: ${record.resultPersistenceBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`audit persistence boundary state: ${record.auditPersistenceBoundaryState} | approval persistence boundary state: ${record.approvalPersistenceBoundaryState}`}
              </p>
              <p className={styles.railBody}>
                {`database boundary state: ${record.databaseBoundaryState} | file boundary state: ${record.fileBoundaryState}`}
              </p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result capture audit and approval join preview"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only join posture</p>
            <h2 className={styles.panelTitle}>
              Result capture audit and approval join preview
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          audit join state: not persisted. approval join state: not persisted.
          result reference state: not persisted. no database write. no file
          write.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Join summary</p>
                <h3 className={styles.placeholderTitle}>
                  audit and approval joins are not persisted
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureAuditApprovalJoinPreviews.length} join previews`}
              </span>
            </div>
            <p className={styles.railBody}>audit join state: not persisted</p>
            <p className={styles.railBody}>approval join state: not persisted</p>
            <p className={styles.railFooter}>
              result reference state: not persisted
            </p>
          </article>
          {representativeResultCaptureJoinPreview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative join</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureJoinPreview.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureJoinPreview.auditJoinState}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeResultCaptureJoinPreview.evidenceSummary}
              </p>
              <p className={styles.railBody}>
                {representativeResultCaptureJoinPreview.blockedActionSummary}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureJoinPreview
                    .nextReviewRecoveryRequirement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureAuditApprovalJoinPreviews.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Join preview</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.resultReferenceState}
                </span>
              </div>
              <p className={styles.railBody}>{record.noResultPersistenceStatement}</p>
              <p className={styles.railBody}>{record.noAuditPersistenceStatement}</p>
              <p className={styles.railBody}>
                {record.noApprovalPersistenceStatement}
              </p>
              <p className={styles.railFooter}>
                {`${record.noDatabaseWriteStatement} ${record.noFileWriteStatement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Backend-owned synthetic dry-run result capture review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Review-only result capture posture</p>
            <h2 className={styles.panelTitle}>
              Backend-owned synthetic dry-run result capture review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can review why synthetic dry-run result capture is held.
          synthetic result capture review is preview-only. result capture state:
          not captured. result persistence is not implemented. audit
          persistence is not implemented. approval persistence is not
          implemented. database write is not implemented. file write is not
          implemented. provider response is not received. model output is not
          generated. synthetic fixture result is static placeholder only. No
          prompt sending. No model calls yet. No provider SDKs imported. audit
          and approval join contract comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Review posture</p>
                <h3 className={styles.placeholderTitle}>
                  synthetic result capture review is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureReviewSummary.reviewCount} reviews`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureReviewSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-review-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {resultCaptureReviewSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${resultCaptureReviewSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${resultCaptureReviewSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${resultCaptureReviewSummary.nextLikelyBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Decision reviews: ${resultCaptureReviewSummary.decisionReviewCount} | Gate failures: ${resultCaptureReviewSummary.gateFailureReviewCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Recovery plans: ${resultCaptureReviewSummary.recoveryPlanCount} | Acceptance posture records: ${resultCaptureReviewSummary.acceptancePostureCount}`}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Capability coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Review lanes by capability family
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${resultCaptureReviewCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureReviewCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-review-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.reviewCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Review lanes by workspace
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${resultCaptureReviewWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureReviewWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-review-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.reviewCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeResultCaptureReview ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative review</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureReview.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureReview.reviewPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {`Workspace: ${representativeResultCaptureReview.workspaceTarget}`}
                </span>
                <span className={styles.metaPill}>
                  {representativeResultCaptureReview.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>
                  {representativeResultCaptureReview.providerSlotLabel}
                </span>
              </div>
              <p className={styles.railBody}>
                {`source result capture contract reference: ${representativeResultCaptureReview.sourceResultCaptureContractReference}`}
              </p>
              <p className={styles.railBody}>
                {`source synthetic result envelope reference: ${representativeResultCaptureReview.sourceSyntheticResultEnvelopeReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture request reference: ${representativeResultCaptureReview.sourceResultCaptureRequestReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture response reference: ${representativeResultCaptureReview.sourceResultCaptureResponseReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture error reference: ${representativeResultCaptureReview.sourceResultCaptureErrorReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture gate reference: ${representativeResultCaptureReview.sourceResultCaptureGateReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture readiness reference: ${representativeResultCaptureReview.sourceResultCaptureReadinessReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture audit approval join reference: ${representativeResultCaptureReview.sourceResultCaptureAuditApprovalJoinReference}`}
              </p>
              <div className={styles.workspaceMeta}>
                {[
                  representativeResultCaptureReview.resultCaptureState,
                  representativeResultCaptureReview.resultPersistenceState,
                  representativeResultCaptureReview.auditPersistenceState,
                  representativeResultCaptureReview.approvalPersistenceState,
                  representativeResultCaptureReview.artifactPersistenceState,
                  representativeResultCaptureReview.databaseWriteState,
                  representativeResultCaptureReview.fileWriteState,
                  representativeResultCaptureReview.providerResponseState,
                  representativeResultCaptureReview.modelOutputState,
                  representativeResultCaptureReview.syntheticFixtureResultState,
                  representativeResultCaptureReview.resultEnvelopeState,
                  representativeResultCaptureReview.resultIdState,
                ].map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      representativeResultCaptureReview.key,
                      "state",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureReview
                    .nextAuditAndApprovalJoinContractRequirement
                }
              </p>
            </article>
            {representativeResultCaptureReviewAuditSummary ? (
              <article className={styles.summaryCard}>
                <div className={styles.placeholderHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Audit summary</p>
                    <h3 className={styles.placeholderTitle}>
                      result capture review audit summary is preview-only
                    </h3>
                  </div>
                  <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                    {representativeResultCaptureReviewAuditSummary.auditPosture}
                  </span>
                </div>
                <p className={styles.railBody}>
                  {representativeResultCaptureReviewAuditSummary.evidenceSummary}
                </p>
                <p className={styles.railBody}>
                  {`failed gate summary: ${representativeResultCaptureReviewAuditSummary.failedGateSummary}`}
                </p>
                <p className={styles.railBody}>
                  {`recovery summary: ${representativeResultCaptureReviewAuditSummary.recoverySummary}`}
                </p>
                <p className={styles.railBody}>
                  {`blocked action summary: ${representativeResultCaptureReviewAuditSummary.blockedActionSummary}`}
                </p>
                <p className={styles.railFooter}>
                  {
                    representativeResultCaptureReviewAuditSummary
                      .auditApprovalJoinContractRequirement
                  }
                </p>
              </article>
            ) : null}
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next safe batch</p>
                  <h3 className={styles.placeholderTitle}>
                    audit and approval join contract comes next
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  {resultCaptureReviewSummary.nextLikelyBatch}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {auditAndApprovalJoinContractChecklist.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      "result-capture-review-next-batch",
                      "item",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        ) : null}
        <div className={styles.summaryGrid}>
          {resultCaptureReviewRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Review record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.executionPosture}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>
                {`result capture state: ${record.resultCaptureState} | result persistence state: ${record.resultPersistenceState}`}
              </p>
              <p className={styles.railBody}>
                {`audit persistence state: ${record.auditPersistenceState} | approval persistence state: ${record.approvalPersistenceState}`}
              </p>
              <p className={styles.railBody}>
                {`provider response state: ${record.providerResponseState} | model output state: ${record.modelOutputState}`}
              </p>
              <p className={styles.railFooter}>
                {record.nextAuditAndApprovalJoinContractRequirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Result capture decision review">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Held decision posture</p>
            <h2 className={styles.panelTitle}>Result capture decision review</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Held / not captured
          </span>
        </div>
        <p className={styles.panelBody}>
          decision state: held / not captured. capture reason summary. top
          blocking gates. top missing evidence. operator review notes. manual
          recovery requirement. audit/approval join dependency. explicit
          no-result-capture-no-persistence statement.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Decision posture</p>
                <h3 className={styles.placeholderTitle}>
                  decision state: held / not captured
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureDecisionReviewRecords.length} decision reviews`}
              </span>
            </div>
            <p className={styles.railBody}>capture reason summary</p>
            <p className={styles.railBody}>top blocking gates</p>
            <p className={styles.railBody}>top missing evidence</p>
            <p className={styles.railBody}>operator review notes</p>
            <p className={styles.railBody}>manual recovery requirement</p>
            <p className={styles.railBody}>audit/approval join dependency</p>
            <p className={styles.railFooter}>
              explicit no-result-capture-no-persistence statement
            </p>
          </article>
          {representativeResultCaptureDecisionReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative decision</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureDecisionReview.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureDecisionReview.decisionState}
                </span>
              </div>
              <p className={styles.railBody}>capture reason summary</p>
              <p className={styles.railBody}>
                {representativeResultCaptureDecisionReview.captureReasonSummary}
              </p>
              <p className={styles.railBody}>top blocking gates</p>
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureDecisionReview.topBlockingGates.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureDecisionReview.key,
                        "result-capture-decision-top-gate",
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
              <p className={styles.railBody}>top missing evidence</p>
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureDecisionReview.topMissingEvidence.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureDecisionReview.key,
                        "missing-evidence",
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
              <p className={styles.railBody}>operator review notes</p>
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureDecisionReview.operatorReviewNotes.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureDecisionReview.key,
                        "operator-note",
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
              <p className={styles.railBody}>
                {representativeResultCaptureDecisionReview.manualRecoveryRequirement}
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureDecisionReview
                    .auditApprovalJoinDependency
                }
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureDecisionReview
                    .explicitNoResultCaptureNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureDecisionReviewRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Decision record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.workspaceTarget}
                </span>
              </div>
              <p className={styles.railBody}>{record.captureReasonSummary}</p>
              <p className={styles.railBody}>{record.manualRecoveryRequirement}</p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result capture gate failure review"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Blocked gate posture</p>
            <h2 className={styles.panelTitle}>
              Result capture gate failure review
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Gate failures
          </span>
        </div>
        <p className={styles.panelBody}>
          synthetic result envelope gate failure. capture request gate failure.
          capture response gate failure. capture error gate failure. audit join
          gate failure. approval join gate failure. result persistence gate
          failure. audit persistence gate failure. approval persistence gate
          failure. database write gate failure. file write gate failure.
          queue/worker/job gates blocked.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate failure summary</p>
                <h3 className={styles.placeholderTitle}>
                  result capture gate failure review is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureGateFailureSummary.uniqueFailedGateCount} failed gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureGateFailureSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-gate-failure-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Severity split</p>
                <h3 className={styles.placeholderTitle}>
                  critical, high, and medium blockers
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                Required
              </span>
            </div>
            <p className={styles.railBody}>
              {`critical: ${resultCaptureGateFailureSummary.criticalGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`high: ${resultCaptureGateFailureSummary.highGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`medium: ${resultCaptureGateFailureSummary.mediumGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {resultCaptureGateFailureSummary.nextLikelyBatch}
            </p>
          </article>
          {representativeResultCaptureGateFailureReview ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative failure</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureGateFailureReview.failedGateLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureGateFailureReview.severity}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeResultCaptureGateFailureReview.gateState}
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureGateFailureReview
                    .operatorFacingExplanation
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureGateFailureReview
                    .requiredEvidenceToUnblock
                }
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureGateFailureReview
                    .explicitNoGatePassStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureGateFailureReviewsForDisplay.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate failure</p>
                  <h3 className={styles.placeholderTitle}>
                    {record.failedGateLabel}
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${
                    record.severity === "critical"
                      ? styles.metricStateBlocked
                      : styles.metricStateApproval
                  }`}
                >
                  {record.severity}
                </span>
              </div>
              <p className={styles.railBody}>{record.gateState}</p>
              <p className={styles.railBody}>
                {record.operatorFacingExplanation}
              </p>
              <p className={styles.railBody}>
                {record.requiredRecoveryAction}
              </p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Result capture recovery plan">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Manual recovery posture</p>
            <h2 className={styles.panelTitle}>Result capture recovery plan</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Manual review only
          </span>
        </div>
        <p className={styles.panelBody}>
          recovery is manual review only. retry disabled. fallback disabled.
          result envelope review recovery. capture request not created
          recovery. capture response not received recovery. audit join missing
          recovery. approval join missing recovery. persistence recovery.
          database/file blocked recovery. audit and approval join contract
          comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Recovery posture</p>
                <h3 className={styles.placeholderTitle}>
                  recovery is manual review only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureRecoverySummary.recoveryPlanCount} recovery plans`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {resultCaptureRecoverySummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-recovery-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness posture</p>
                <h3 className={styles.placeholderTitle}>
                  current blocked posture
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureRecoverySummary.blockedChecklistCount} blocked checklist items`}
              </span>
            </div>
            <p className={styles.railBody}>retry disabled</p>
            <p className={styles.railBody}>fallback disabled</p>
            <p className={styles.railBody}>
              {`acceptance posture records: ${resultCaptureRecoverySummary.acceptancePostureCount}`}
            </p>
            <p className={styles.railFooter}>
              {resultCaptureRecoverySummary.nextSafeAction}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next batch checklist</p>
                <h3 className={styles.placeholderTitle}>
                  audit and approval join contract comes next
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {resultCaptureRecoverySummary.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {auditAndApprovalJoinContractChecklist.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "result-capture-recovery-checklist",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeResultCaptureRecoveryPlan ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative recovery</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureRecoveryPlan.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureRecoveryPlan.recoveryPosture}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeResultCaptureRecoveryPlan.resultEnvelopeReviewRecovery}
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .captureRequestNotCreatedRecovery
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .captureResponseNotReceivedRecovery
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .auditJoinMissingRecovery
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .approvalJoinMissingRecovery
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .resultPersistenceMissingRecovery
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .databaseWriteBlockedRecovery
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeResultCaptureRecoveryPlan
                    .fileWriteBlockedRecovery
                }
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureRecoveryPlan
                    .explicitNoRetryNoFallbackNoPersistenceStatement
                }
              </p>
            </article>
          </div>
        ) : null}
        <div className={styles.summaryGrid}>
          {resultCaptureRecoveryPlanPreviewRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Recovery record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.workspaceTarget}
                </span>
              </div>
              <p className={styles.railBody}>
                {record.captureRequestNotCreatedRecovery}
              </p>
              <p className={styles.railBody}>
                {record.captureResponseNotReceivedRecovery}
              </p>
              <p className={styles.railBody}>
                {record.queueDispatchBlockedRecovery}
              </p>
              <p className={styles.railFooter}>{record.operatorActionRequired}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result capture recovery readiness"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact readiness view</p>
            <h2 className={styles.panelTitle}>
              Result capture recovery readiness
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only checklist
          </span>
        </div>
        <p className={styles.panelBody}>
          result capture recovery readiness is preview-only. checklist records
          stay compact. current blocked posture remains visible.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Checklist counts</p>
                <h3 className={styles.placeholderTitle}>
                  Recovery readiness checklist records
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureRecoveryReadinessChecklistRecords.length} checklist records`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`blocked posture: ${blockedResultCaptureRecoveryReadinessChecklistRecords.length} records`}
            </p>
            <p className={styles.railBody}>
              {`manual review required: ${
                resultCaptureRecoveryReadinessChecklistRecords.filter(
                  (record) => record.state === "manual review required"
                ).length
              } records`}
            </p>
            <p className={styles.railBody}>
              {`backend future required: ${
                resultCaptureRecoveryReadinessChecklistRecords.filter(
                  (record) => record.state === "backend future required"
                ).length
              } records`}
            </p>
            <p className={styles.railFooter}>current blocked posture</p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Current posture</p>
                <h3 className={styles.placeholderTitle}>preview-only</h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {resultCaptureReviewSummary.nextLikelyBatch}
              </span>
            </div>
            <p className={styles.railBody}>
              result persistence still blocked. audit persistence still
              blocked. approval persistence still blocked.
            </p>
            <p className={styles.railBody}>
              database writes still blocked. file writes still blocked.
            </p>
            <p className={styles.railFooter}>
              queue dispatch still blocked. worker dispatch still blocked. job
              execution still blocked.
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureRecoveryReadinessChecklistRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Checklist record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${
                    record.state === "blocked"
                      ? styles.metricStateBlocked
                      : record.state === "manual review required"
                        ? styles.metricStateApproval
                        : styles.metricStateSecondary
                  }`}
                >
                  {record.state}
                </span>
              </div>
              <p className={styles.railBody}>{`severity: ${record.severity}`}</p>
              <p className={styles.railBody}>
                {`evidence required: ${record.evidenceRequired}`}
              </p>
              <p className={styles.railBody}>
                {`recovery action: ${record.recoveryAction}`}
              </p>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result capture acceptance posture"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Acceptance remains blocked</p>
            <h2 className={styles.panelTitle}>
              Result capture acceptance posture
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Not accepted / preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          acceptance state: not accepted / preview-only. acceptance blockers.
          safety blockers. privacy blockers. cost/rate blockers. audit
          blockers. approval blockers. capture blockers. persistence blockers.
          database/file blockers. queue/worker/job blockers.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Acceptance posture</p>
                <h3 className={styles.placeholderTitle}>
                  acceptance state: not accepted / preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultCaptureAcceptancePostureRecords.length} posture records`}
              </span>
            </div>
            <p className={styles.railBody}>acceptance blockers</p>
            <p className={styles.railBody}>safety blockers</p>
            <p className={styles.railBody}>privacy blockers</p>
            <p className={styles.railBody}>cost/rate blockers</p>
            <p className={styles.railBody}>audit blockers</p>
            <p className={styles.railBody}>approval blockers</p>
            <p className={styles.railBody}>capture blockers</p>
            <p className={styles.railBody}>persistence blockers</p>
            <p className={styles.railBody}>database/file blockers</p>
            <p className={styles.railFooter}>queue/worker/job blockers</p>
          </article>
          {representativeResultCaptureAcceptancePosture ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative posture</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultCaptureAcceptancePosture.label}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeResultCaptureAcceptancePosture.acceptanceState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureAcceptancePosture.acceptanceBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureAcceptancePosture.key,
                        "result-capture-acceptance-blocker",
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
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureAcceptancePosture.safetyBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureAcceptancePosture.key,
                        "safety-blocker",
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
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureAcceptancePosture.privacyBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureAcceptancePosture.key,
                        "privacy-blocker",
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
              <div className={styles.workspaceMeta}>
                {representativeResultCaptureAcceptancePosture.queueWorkerJobBlockers.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        representativeResultCaptureAcceptancePosture.key,
                        "result-capture-queue-worker-job-blocker",
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
              <p className={styles.railFooter}>
                {
                  representativeResultCaptureAcceptancePosture
                    .explicitNoAcceptanceNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {resultCaptureAcceptancePostureRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Acceptance record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.workspaceTarget}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {record.captureBlockers.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      record.key,
                      "capture-blocker",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles.workspaceMeta}>
                {record.persistenceBlockers.map((item, index) => (
                  <span
                    key={buildScopedItemKey(
                      record.key,
                      "persistence-blocker",
                      index,
                      item
                    )}
                    className={styles.blockedPill}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className={styles.railBody}>{record.nextSafeAction}</p>
              <p className={styles.railFooter}>
                {record.explicitNoAcceptanceNoPersistenceStatement}
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

      <section
        className={styles.panel}
        aria-label="Backend-owned synthetic dry-run audit and approval join contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Backend-owned join contract layer</p>
            <h2 className={styles.panelTitle}>
              Backend-owned synthetic dry-run audit and approval join contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          Athena can preview backend-owned synthetic dry-run audit and approval
          join contracts. audit and approval join contract is preview-only.
          audit join state: not persisted. approval join state: not
          persisted. result reference state: not persisted. evidence packet is
          preview-only. join request is not created. join invocation is not
          invoked. join response is not received. join error is not received.
          database write is not implemented. file write is not implemented. No
          prompt sending. No model calls yet. No provider SDKs imported. audit
          and approval join review and recovery preview comes next.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Contract summary</p>
                <h3 className={styles.placeholderTitle}>
                  audit and approval join contract is preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${auditApprovalJoinContractSummary.contractCount} contracts`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {auditApprovalJoinContractSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "audit-approval-join-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Batch identity</p>
                <h3 className={styles.placeholderTitle}>
                  {auditApprovalJoinContractSummary.latestCompletedBatch}
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
              >
                {`Phase ${auditApprovalJoinContractSummary.highestDetectedPhase}`}
              </span>
            </div>
            <p className={styles.railBody}>
              {`Previous completed batch: ${auditApprovalJoinContractSummary.previousCompletedBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Next likely batch: ${auditApprovalJoinContractSummary.nextLikelyBatch}`}
            </p>
            <p className={styles.railBody}>
              {`Audit joins: ${auditApprovalJoinContractSummary.auditJoinContractCount} | Approval joins: ${auditApprovalJoinContractSummary.approvalJoinContractCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Links: ${auditApprovalJoinContractSummary.resultLinkContractCount} | Evidence packets: ${auditApprovalJoinContractSummary.evidencePacketCount}`}
            </p>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Capability coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Join lanes by capability family
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${auditApprovalJoinCapabilityGroups.length} capability families`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {auditApprovalJoinCapabilityGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "audit-approval-join-capability-group",
                    "item",
                    index,
                    group.capabilityFamilyId
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.capabilityFamilyLabel} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Workspace coverage</p>
                <h3 className={styles.placeholderTitle}>
                  Join lanes by workspace
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateReady}`}>
                {`${auditApprovalJoinWorkspaceGroups.length} workspace targets`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {auditApprovalJoinWorkspaceGroups.map((group, index) => (
                <span
                  key={buildScopedItemKey(
                    "audit-approval-join-workspace-group",
                    "item",
                    index,
                    group.workspaceTarget
                  )}
                  className={styles.blockedPill}
                >
                  {`${group.workspaceTarget} (${group.contractCount})`}
                </span>
              ))}
            </div>
          </article>
        </div>
        {representativeAuditApprovalJoinContract ? (
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative contract</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAuditApprovalJoinContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAuditApprovalJoinContract.auditJoinState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>
                  {representativeAuditApprovalJoinContract.workspaceTarget}
                </span>
                <span className={styles.metaPill}>
                  {
                    representativeAuditApprovalJoinContract.selectedCapabilityFamily
                      .label
                  }
                </span>
                <span className={styles.metaPill}>
                  {representativeAuditApprovalJoinContract.providerSlotLabel}
                </span>
              </div>
              <p className={styles.railBody}>
                {`source result capture review reference: ${representativeAuditApprovalJoinContract.sourceResultCaptureReviewReference}`}
              </p>
              <p className={styles.railBody}>
                {`source result capture acceptance posture reference: ${representativeAuditApprovalJoinContract.sourceResultCaptureAcceptancePostureReference}`}
              </p>
              <p className={styles.railBody}>
                {`source synthetic result envelope reference: ${representativeAuditApprovalJoinContract.sourceSyntheticResultEnvelopeReference}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAuditApprovalJoinContract.nextSafeAction}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Next review path</p>
                  <h3 className={styles.placeholderTitle}>
                    audit and approval join review and recovery preview comes next
                  </h3>
                </div>
                <span
                  className={`${styles.panelBadge} ${styles.metricStateSecondary}`}
                >
                  {auditApprovalJoinContractSummary.nextLikelyBatch}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                {nextAuditApprovalJoinReviewAndRecoveryChecklist.map(
                  (item, index) => (
                    <span
                      key={buildScopedItemKey(
                        "audit-approval-join-next-checklist",
                        "item",
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
        <div className={styles.summaryGrid}>
          {auditApprovalJoinContracts.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Join contract</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.joinRequestState}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
                <span className={styles.metaPill}>{record.providerSlotLabel}</span>
              </div>
              <p className={styles.railBody}>
                {`audit join posture: ${record.auditJoinPosture} | approval join posture: ${record.approvalJoinPosture}`}
              </p>
              <p className={styles.railBody}>
                {`result reference posture: ${record.resultReferencePosture} | evidence packet posture: ${record.evidencePacketPosture}`}
              </p>
              <p className={styles.railBody}>
                {`database write state: ${record.databaseWriteState} | file write state: ${record.fileWriteState}`}
              </p>
              <p className={styles.railFooter}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-label="Synthetic audit join contract">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only audit join</p>
            <h2 className={styles.panelTitle}>Synthetic audit join contract</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          audit join mode: preview-only. audit reference state: not
          persisted. audit envelope state: not created. audit append state:
          not appended. audit persistence state: not implemented. no audit
          persistence. no database write. no file write.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Audit join summary</p>
                <h3 className={styles.placeholderTitle}>
                  no audit persistence
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${syntheticAuditJoinContracts.length} audit joins`}
              </span>
            </div>
            <p className={styles.railBody}>audit join mode: preview-only</p>
            <p className={styles.railBody}>audit reference state: not persisted</p>
            <p className={styles.railBody}>audit envelope state: not created</p>
            <p className={styles.railFooter}>audit append state: not appended</p>
          </article>
          {representativeSyntheticAuditJoinContract ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative audit join</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticAuditJoinContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeSyntheticAuditJoinContract.auditJoinMode}
                </span>
              </div>
              <p className={styles.railBody}>
                {representativeSyntheticAuditJoinContract.evidenceSummary}
              </p>
              <p className={styles.railBody}>
                {representativeSyntheticAuditJoinContract.failedGateSummary}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticAuditJoinContract
                    .explicitNoAuditJoinNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Synthetic approval join contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only approval join</p>
            <h2 className={styles.panelTitle}>
              Synthetic approval join contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          approval join mode: preview-only. approval reference state: not
          persisted. approval envelope state: not created. approval append
          state: not appended. approval persistence state: not implemented. no
          approval persistence. operator approval required. manual confirmation
          required.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Approval join summary</p>
                <h3 className={styles.placeholderTitle}>
                  no approval persistence
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                Required
              </span>
            </div>
            <p className={styles.railBody}>approval join mode: preview-only</p>
            <p className={styles.railBody}>
              approval reference state: not persisted
            </p>
            <p className={styles.railBody}>
              approval envelope state: not created
            </p>
            <p className={styles.railFooter}>
              approval append state: not appended
            </p>
          </article>
          {representativeSyntheticApprovalJoinContract ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>
                    Representative approval join
                  </p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeSyntheticApprovalJoinContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                  {representativeSyntheticApprovalJoinContract.operatorApprovalRequirement}
                </span>
              </div>
              <p className={styles.railBody}>
                {
                  representativeSyntheticApprovalJoinContract
                    .approvalScopeSummary
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeSyntheticApprovalJoinContract
                    .approvalBlockerSummary
                }
              </p>
              <p className={styles.railFooter}>
                {
                  representativeSyntheticApprovalJoinContract
                    .explicitNoApprovalJoinNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Result to audit and approval link contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only result linkage</p>
            <h2 className={styles.panelTitle}>
              Result to audit and approval link contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          result reference state: not persisted. result id state: not issued.
          result digest posture: deterministic preview digest only. audit link
          state: preview-only / not persisted. approval link state:
          preview-only / not persisted. join consistency state: preview-only.
          no result-audit-approval link persisted.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Link summary</p>
                <h3 className={styles.placeholderTitle}>
                  no result-audit-approval link persisted
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${resultAuditApprovalLinkContracts.length} link contracts`}
              </span>
            </div>
            <p className={styles.railBody}>result reference state: not persisted</p>
            <p className={styles.railBody}>result id state: not issued</p>
            <p className={styles.railBody}>
              result digest posture: deterministic preview digest only
            </p>
            <p className={styles.railFooter}>
              join consistency state: preview-only
            </p>
          </article>
          {representativeResultAuditApprovalLinkContract ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative link</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeResultAuditApprovalLinkContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {
                    representativeResultAuditApprovalLinkContract
                      .resultReferenceState
                  }
                </span>
              </div>
              <p className={styles.railBody}>
                {`audit link state: ${representativeResultAuditApprovalLinkContract.auditLinkState}`}
              </p>
              <p className={styles.railBody}>
                {`approval link state: ${representativeResultAuditApprovalLinkContract.approvalLinkState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeResultAuditApprovalLinkContract
                    .explicitNoResultAuditApprovalLinkPersistedStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Audit and approval join request/response contract"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only join lifecycle</p>
            <h2 className={styles.panelTitle}>
              Audit and approval join request/response contract
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          join request is not created. join invocation is not invoked. join
          response is not received. join error is not received. audit join is
          not persisted. approval join is not persisted. result reference is
          not persisted. no database writes. no file writes.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Contract counts</p>
                <h3 className={styles.placeholderTitle}>
                  Request / response / error
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                Preview-only
              </span>
            </div>
            <p className={styles.railBody}>
              {`requests: ${auditApprovalJoinRequestContracts.length}`}
            </p>
            <p className={styles.railBody}>
              {`responses: ${auditApprovalJoinResponseContracts.length}`}
            </p>
            <p className={styles.railFooter}>
              {`errors: ${auditApprovalJoinErrorContracts.length}`}
            </p>
          </article>
          {representativeAuditApprovalJoinRequestContract ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative request</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAuditApprovalJoinRequestContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAuditApprovalJoinRequestContract.joinRequestState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`join invocation state: ${representativeAuditApprovalJoinRequestContract.joinInvocationState}`}
              </p>
              <p className={styles.railBody}>
                {`result reference posture: ${representativeAuditApprovalJoinRequestContract.resultReferencePosture}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAuditApprovalJoinRequestContract
                    .explicitNoJoinRequestCreatedStatement
                }
              </p>
            </article>
          ) : null}
          {representativeAuditApprovalJoinResponseContract ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative response</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAuditApprovalJoinResponseContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAuditApprovalJoinResponseContract.responseState}
                </span>
              </div>
              <p className={styles.railBody}>
                {`join decision state: ${representativeAuditApprovalJoinResponseContract.joinDecisionState}`}
              </p>
              <p className={styles.railBody}>
                {`audit join state: ${representativeAuditApprovalJoinResponseContract.auditJoinState} | approval join state: ${representativeAuditApprovalJoinResponseContract.approvalJoinState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAuditApprovalJoinResponseContract
                    .explicitNoJoinResponseNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
          {representativeAuditApprovalJoinErrorContract ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative error</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAuditApprovalJoinErrorContract.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAuditApprovalJoinErrorContract.errorState}
                </span>
              </div>
              <p className={styles.railBody}>
                {
                  representativeAuditApprovalJoinErrorContract
                    .missingResultReferenceExample
                }
              </p>
              <p className={styles.railBody}>
                {
                  representativeAuditApprovalJoinErrorContract
                    .databaseWriteBlockedExample
                }
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAuditApprovalJoinErrorContract
                    .explicitNoJoinErrorNoRetryNoFallbackStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.panel} aria-label="Audit and approval join gates">
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only gate schema</p>
            <h2 className={styles.panelTitle}>Audit and approval join gates</h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only / blocked
          </span>
        </div>
        <p className={styles.panelBody}>
          synthetic result envelope. result capture review. result capture
          acceptance posture. audit join contract. approval join contract.
          result-to-audit-approval link contract. join request contract. join
          response contract. join error contract. operator approval. manual
          confirmation. kill switch. audit. server-only boundary. no frontend
          provider call. no provider SDK import in frontend. no prompt sending.
          opaque credential reference. no plaintext secrets. privacy/redaction.
          cost/rate/timeout. idempotency/replay block. single-run lock. no
          queue dispatch. no worker dispatch. no job execution. no result
          persistence. no audit persistence. no approval persistence. no
          database writes. no file writes.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Gate summary</p>
                <h3 className={styles.placeholderTitle}>
                  audit and approval join gates are preview-only
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${auditApprovalJoinGateSummary.gateCount} gates`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {auditApprovalJoinGateSummary.summaryLines.map((item, index) => (
                <span
                  key={buildScopedItemKey(
                    "audit-approval-join-gate-summary",
                    "item",
                    index,
                    item
                  )}
                  className={styles.blockedPill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Owner counts</p>
                <h3 className={styles.placeholderTitle}>
                  Backend join contract, operator, safety
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                Required
              </span>
            </div>
            <p className={styles.railBody}>
              {`backend join contract: ${auditApprovalJoinGateSummary.backendJoinContractGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`operator: ${auditApprovalJoinGateSummary.operatorGateCount}`}
            </p>
            <p className={styles.railBody}>
              {`safety review: ${auditApprovalJoinGateSummary.safetyReviewGateCount}`}
            </p>
            <p className={styles.railFooter}>
              {`Next likely batch: ${auditApprovalJoinGateSummary.nextLikelyBatch}`}
            </p>
          </article>
        </div>
        <div className={styles.summaryGrid}>
          {auditApprovalJoinGateRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gate record</p>
                  <h3 className={styles.placeholderTitle}>{record.label}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentState}
                </span>
              </div>
              <p className={styles.railBody}>{`owner: ${record.owner}`}</p>
              <p className={styles.railBody}>
                {`required state: ${record.requiredState}`}
              </p>
              <p className={styles.railBody}>
                {`evidence requirement: ${record.evidenceRequirement}`}
              </p>
              <p className={styles.railFooter}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Audit and approval join readiness matrix"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Compact readiness matrix</p>
            <h2 className={styles.panelTitle}>
              Audit and approval join readiness matrix
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            join-contract-only / not persistent
          </span>
        </div>
        <p className={styles.panelBody}>
          join contract state. audit join contract state. approval join
          contract state. result link contract state. join request contract
          state. join response contract state. join error contract state.
          result capture review dependency. result envelope dependency.
          evidence packet dependency. audit persistence boundary state.
          approval persistence boundary state. database boundary state. file
          boundary state. current readiness: join-contract-only / not
          persistent. next safe action.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Readiness summary</p>
                <h3 className={styles.placeholderTitle}>
                  current readiness: join-contract-only / not persistent
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${auditApprovalJoinReadinessSummary.readinessRecordCount} readiness records`}
              </span>
            </div>
            <div className={styles.workspaceMeta}>
              {auditApprovalJoinReadinessSummary.summaryLines.map(
                (item, index) => (
                  <span
                    key={buildScopedItemKey(
                      "audit-approval-join-readiness-summary",
                      "item",
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
          {representativeAuditApprovalJoinReadiness ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative readiness</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAuditApprovalJoinReadiness.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {representativeAuditApprovalJoinReadiness.currentReadiness}
                </span>
              </div>
              <p className={styles.railBody}>
                {`join contract state: ${representativeAuditApprovalJoinReadiness.joinContractState}`}
              </p>
              <p className={styles.railBody}>
                {`audit join contract state: ${representativeAuditApprovalJoinReadiness.auditJoinContractState} | approval join contract state: ${representativeAuditApprovalJoinReadiness.approvalJoinContractState}`}
              </p>
              <p className={styles.railBody}>
                {`database boundary state: ${representativeAuditApprovalJoinReadiness.databaseBoundaryState} | file boundary state: ${representativeAuditApprovalJoinReadiness.fileBoundaryState}`}
              </p>
              <p className={styles.railFooter}>
                {representativeAuditApprovalJoinReadiness.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
        <div className={styles.summaryGrid}>
          {auditApprovalJoinReadinessMatrixRecords.map((record) => (
            <article key={record.key} className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Readiness record</p>
                  <h3 className={styles.placeholderTitle}>{record.requestLabel}</h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {record.currentReadiness}
                </span>
              </div>
              <div className={styles.workspaceMeta}>
                <span className={styles.metaPill}>{record.workspaceTarget}</span>
                <span className={styles.metaPill}>
                  {record.selectedCapabilityFamily.label}
                </span>
              </div>
              <p className={styles.railBody}>
                {`result capture review dependency: ${record.resultCaptureReviewDependency} | result envelope dependency: ${record.resultEnvelopeDependency}`}
              </p>
              <p className={styles.railBody}>
                {`evidence packet dependency: ${record.evidencePacketDependency} | result digest dependency: ${record.resultDigestDependency}`}
              </p>
              <p className={styles.railBody}>
                {`audit persistence boundary state: ${record.auditPersistenceBoundaryState} | approval persistence boundary state: ${record.approvalPersistenceBoundaryState}`}
              </p>
              <p className={styles.railFooter}>{record.nextSafeAction}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.panel}
        aria-label="Audit and approval evidence packet preview"
      >
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>Preview-only evidence packet</p>
            <h2 className={styles.panelTitle}>
              Audit and approval evidence packet preview
            </h2>
          </div>
          <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
            Preview-only
          </span>
        </div>
        <p className={styles.panelBody}>
          evidence packet state: preview-only. evidence digest posture:
          deterministic preview digest only. approval evidence state:
          preview-only. audit evidence state: preview-only. result evidence
          state: preview-only. persistence state: not implemented. no evidence
          packet persistence.
        </p>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Evidence packet summary</p>
                <h3 className={styles.placeholderTitle}>
                  no evidence packet persistence
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                {`${auditApprovalEvidencePacketPreviews.length} evidence packets`}
              </span>
            </div>
            <p className={styles.railBody}>evidence packet state: preview-only</p>
            <p className={styles.railBody}>
              evidence digest posture: deterministic preview digest only
            </p>
            <p className={styles.railBody}>approval evidence state: preview-only</p>
            <p className={styles.railFooter}>audit evidence state: preview-only</p>
          </article>
          {representativeAuditApprovalEvidencePacket ? (
            <article className={styles.summaryCard}>
              <div className={styles.placeholderHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Representative packet</p>
                  <h3 className={styles.placeholderTitle}>
                    {representativeAuditApprovalEvidencePacket.requestLabel}
                  </h3>
                </div>
                <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
                  {
                    representativeAuditApprovalEvidencePacket
                      .evidencePacketState
                  }
                </span>
              </div>
              <p className={styles.railBody}>
                {`result evidence state: ${representativeAuditApprovalEvidencePacket.resultEvidenceState}`}
              </p>
              <p className={styles.railBody}>
                {`blocked action evidence state: ${representativeAuditApprovalEvidencePacket.blockedActionEvidenceState} | privacy/redaction evidence state: ${representativeAuditApprovalEvidencePacket.privacyRedactionEvidenceState}`}
              </p>
              <p className={styles.railFooter}>
                {
                  representativeAuditApprovalEvidencePacket
                    .explicitNoEvidencePacketPersistenceStatement
                }
              </p>
            </article>
          ) : null}
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
                  Next audit and approval join review and recovery checklist
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                {commandCenter.nextLikelyBatch}
              </span>
            </div>
            <div className={styles.nextActionList}>
              {nextAuditApprovalJoinReviewAndRecoveryChecklist.map((item, index) => (
                <article
                  key={buildScopedItemKey("athena-panel", "item", index, item)}
                  className={styles.railCard}
                >
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
