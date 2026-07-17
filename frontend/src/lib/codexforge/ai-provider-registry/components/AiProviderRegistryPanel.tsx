"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildAthenaProviderSelectionPreviewFromExactStaticExamples,
  buildBlockedProviderExecutionSummary,
  buildCapabilityMatrixPreview,
  buildProviderReadinessSummary,
  groupCapabilitiesByWorkspaceTarget,
  listModelProviderSlots,
} from "@/lib/codexforge/ai-provider-registry";
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
  buildNextModelRoutingAndProviderSelectionChecklist,
  listDryRunAcceptanceMatrixRecords,
  listDryRunQualityReviews,
  listDryRunRecoveryPlanPreviews,
  listDryRunSafetyRedactionReviews,
  listModelAdapterDryRunResultReviews,
} from "@/lib/codexforge/model-adapter-dry-run-result-review-recovery";
import {
  buildNextSyntheticDryRunResultCaptureContractChecklist,
  buildSyntheticRunnerGateSummary,
  buildSyntheticRunnerReadinessSummary,
  buildSyntheticRunnerSkeletonSummary,
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons,
  listSyntheticDryRunErrorFixtures,
  listSyntheticDryRunInputFixtures,
  listSyntheticDryRunOutputFixtures,
  listSyntheticRunnerSkeletonGates,
  listSyntheticRunnerSkeletonReadinessMatrixRecords,
} from "@/lib/codexforge/backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
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
  buildSyntheticEndToEndPacketGateSummary,
  buildSyntheticEndToEndPacketReadinessSummary,
  buildSyntheticEndToEndPacketSummary,
  groupSyntheticEndToEndPacketsByCapabilityFamily,
  groupSyntheticEndToEndPacketsByWorkspaceTarget,
  listBackendOwnedSyntheticDryRunEndToEndPacketContracts,
  listSyntheticEndToEndPacketAcceptancePostureRecords,
  listSyntheticEndToEndPacketErrorContracts,
  listSyntheticEndToEndPacketGateRecords,
  listSyntheticEndToEndPacketLineageRecords,
  listSyntheticEndToEndPacketReadinessMatrixRecords,
  listSyntheticEndToEndPacketRequestContracts,
  listSyntheticEndToEndPacketResponseContracts,
  listSyntheticEndToEndPacketStageRecords,
} from "@/lib/codexforge/backend-owned-synthetic-dry-run-end-to-end-packet-contract";
import {
  buildEndToEndPacketGateFailureSummary,
  buildEndToEndPacketReviewSummary,
  buildEndToEndPacketStageFailureSummary,
  buildManualApprovalHandoffContractChecklist,
  listBackendOwnedSyntheticDryRunEndToEndPacketReviews,
  listEndToEndPacketAcceptancePostureRecords,
  listEndToEndPacketDecisionReviewRecords,
  listEndToEndPacketGateFailureReviewRecords,
  listEndToEndPacketRecoveryPlanPreviews,
  listEndToEndPacketRecoveryReadinessChecklistRecords,
  listEndToEndPacketStageFailureReviewRecords,
} from "@/lib/codexforge/backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import {
  buildManualApprovalDecisionContractChecklist,
  buildManualApprovalHandoffReviewSummary,
  listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews,
  listManualApprovalHandoffAcceptancePostureRecords,
  listManualApprovalHandoffDecisionReviewRecords,
  listManualApprovalHandoffGateFailureReviewRecords,
  listManualApprovalHandoffRecoveryPlanPreviews,
  listManualApprovalHandoffRecoveryReadinessChecklistRecords,
} from "@/lib/codexforge/backend-owned-synthetic-dry-run-manual-approval-handoff-review-recovery-preview";

function buildProviderScopedKey(
  scope: string,
  index: number,
  value: string
): string {
  return `${scope}-${index}-${value}`;
}

export function AiProviderRegistryPanel() {
  const providerSlots = listModelProviderSlots();
  const readinessSummary = buildProviderReadinessSummary();
  const blockedExecutionSummary = buildBlockedProviderExecutionSummary();
  const capabilityMatrixPreview = buildCapabilityMatrixPreview();
  const selectionPreview =
    buildAthenaProviderSelectionPreviewFromExactStaticExamples();
  const workspaceCapabilityGroups = groupCapabilitiesByWorkspaceTarget();
  const adapterContracts = listServerOnlyModelAdapterContracts();
  const adapterRequestEnvelopePreviews = listModelAdapterRequestEnvelopePreviews();
  const adapterResponseEnvelopePreviews =
    listModelAdapterResponseEnvelopePreviews();
  const adapterErrorEnvelopePreviews = listModelAdapterErrorEnvelopePreviews();
  const adapterReadinessSummary = buildAdapterReadinessSummary();
  const blockedModelExecutionSummary = buildBlockedModelExecutionSummary();
  const adapterContractsByCapabilityFamily =
    groupAdapterContractsByCapabilityFamily();
  const adapterContractsByWorkspaceTarget =
    groupAdapterContractsByWorkspaceTarget();
  const serverOnlyAdapterGateChecklist = listServerOnlyAdapterGateChecklist();
  const dryRunHarness = getManualGatedModelAdapterDryRunHarness();
  const dryRunReadinessSummary = buildDryRunReadinessSummary();
  const blockedDryRunExecutionSummary = buildBlockedDryRunExecutionSummary();
  const resultReviewSummary = buildDryRunResultReviewSummary();
  const recoverySummary = buildDryRunRecoverySummary();
  const acceptanceSummary = buildDryRunAcceptanceSummary();
  const nextModelRoutingProviderSelectionChecklist =
    buildNextModelRoutingAndProviderSelectionChecklist();
  const dryRunScenarios = listManualGatedModelAdapterDryRunScenarios();
  const dryRunRequestPacketPreviews = listDryRunRequestPacketPreviews();
  const dryRunFixtureResultPreviews = listDryRunFixtureResultPreviews();
  const dryRunDenialFailurePreviews = listDryRunDenialFailurePreviews();
  const manualDryRunGateChecklist = listManualDryRunGateChecklist();
  const resultReviews = listModelAdapterDryRunResultReviews();
  const qualityReviews = listDryRunQualityReviews();
  const safetyReviews = listDryRunSafetyRedactionReviews();
  const recoveryPlanPreviews = listDryRunRecoveryPlanPreviews();
  const acceptanceMatrixRecords = listDryRunAcceptanceMatrixRecords();
  const representativeRequestEnvelope = adapterRequestEnvelopePreviews[0] ?? null;
  const representativeResponseEnvelope =
    adapterResponseEnvelopePreviews[0] ?? null;
  const representativeErrorEnvelope = adapterErrorEnvelopePreviews[0] ?? null;
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
  const syntheticRunnerSkeletons =
    listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons();
  const syntheticInputFixtures = listSyntheticDryRunInputFixtures();
  const syntheticOutputFixtures = listSyntheticDryRunOutputFixtures();
  const syntheticErrorFixtures = listSyntheticDryRunErrorFixtures();
  const syntheticRunnerGates = listSyntheticRunnerSkeletonGates();
  const syntheticRunnerReadinessMatrixRecords =
    listSyntheticRunnerSkeletonReadinessMatrixRecords();
  const syntheticRunnerSkeletonSummary = buildSyntheticRunnerSkeletonSummary();
  const syntheticRunnerGateSummary = buildSyntheticRunnerGateSummary();
  const syntheticRunnerReadinessSummary = buildSyntheticRunnerReadinessSummary();
  const nextSyntheticDryRunResultCaptureContractChecklist =
    buildNextSyntheticDryRunResultCaptureContractChecklist();
  const representativeSyntheticRunnerSkeleton =
    syntheticRunnerSkeletons[0] ?? null;
  const representativeSyntheticInputFixture = syntheticInputFixtures[0] ?? null;
  const representativeSyntheticOutputFixture =
    syntheticOutputFixtures[0] ?? null;
  const representativeSyntheticErrorFixture = syntheticErrorFixtures[0] ?? null;
  const representativeSyntheticRunnerReadiness =
    syntheticRunnerReadinessMatrixRecords[0] ?? null;
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
  const resultCaptureCapabilityGroups =
    groupResultCaptureContractsByCapabilityFamily();
  const resultCaptureWorkspaceGroups =
    groupResultCaptureContractsByWorkspaceTarget();
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
  const endToEndPacketContracts =
    listBackendOwnedSyntheticDryRunEndToEndPacketContracts();
  const endToEndPacketStageRecords = listSyntheticEndToEndPacketStageRecords();
  const endToEndPacketLineageRecords =
    listSyntheticEndToEndPacketLineageRecords();
  const endToEndPacketRequestContracts =
    listSyntheticEndToEndPacketRequestContracts();
  const endToEndPacketResponseContracts =
    listSyntheticEndToEndPacketResponseContracts();
  const endToEndPacketErrorContracts =
    listSyntheticEndToEndPacketErrorContracts();
  const endToEndPacketGateRecords = listSyntheticEndToEndPacketGateRecords();
  const endToEndPacketReadinessMatrixRecords =
    listSyntheticEndToEndPacketReadinessMatrixRecords();
  const endToEndPacketAcceptancePostureRecords =
    listSyntheticEndToEndPacketAcceptancePostureRecords();
  const endToEndPacketSummary = buildSyntheticEndToEndPacketSummary();
  const endToEndPacketGateSummary = buildSyntheticEndToEndPacketGateSummary();
  const endToEndPacketReadinessSummary =
    buildSyntheticEndToEndPacketReadinessSummary();
  const endToEndPacketCapabilityGroups =
    groupSyntheticEndToEndPacketsByCapabilityFamily();
  const endToEndPacketWorkspaceGroups =
    groupSyntheticEndToEndPacketsByWorkspaceTarget();
  const representativeEndToEndPacketContract =
    endToEndPacketContracts[0] ?? null;
  const representativeEndToEndPacketLineage =
    endToEndPacketLineageRecords[0] ?? null;
  const representativeEndToEndPacketRequest =
    endToEndPacketRequestContracts[0] ?? null;
  const representativeEndToEndPacketResponse =
    endToEndPacketResponseContracts[0] ?? null;
  const representativeEndToEndPacketError =
    endToEndPacketErrorContracts[0] ?? null;
  const representativeEndToEndPacketReadiness =
    endToEndPacketReadinessMatrixRecords[0] ?? null;
  const representativeEndToEndPacketAcceptancePosture =
    endToEndPacketAcceptancePostureRecords[0] ?? null;
  const representativeEndToEndPacketStageRecords =
    representativeEndToEndPacketContract
      ? endToEndPacketStageRecords.filter(
          (record) =>
            record.packetContractId === representativeEndToEndPacketContract.id
        )
      : [];
  const endToEndPacketReviewRecords =
    listBackendOwnedSyntheticDryRunEndToEndPacketReviews();
  const endToEndPacketDecisionReviewRecords =
    listEndToEndPacketDecisionReviewRecords();
  const endToEndPacketStageFailureReviewRecords =
    listEndToEndPacketStageFailureReviewRecords();
  const endToEndPacketGateFailureReviewRecords =
    listEndToEndPacketGateFailureReviewRecords();
  const endToEndPacketRecoveryPlanPreviewRecords =
    listEndToEndPacketRecoveryPlanPreviews();
  const endToEndPacketRecoveryReadinessChecklistRecords =
    listEndToEndPacketRecoveryReadinessChecklistRecords();
  const endToEndPacketAcceptancePostureReviewRecords =
    listEndToEndPacketAcceptancePostureRecords();
  const endToEndPacketReviewSummary = buildEndToEndPacketReviewSummary();
  const endToEndPacketStageFailureSummary =
    buildEndToEndPacketStageFailureSummary();
  const endToEndPacketReviewGateFailureSummary =
    buildEndToEndPacketGateFailureSummary();
  const manualApprovalHandoffContractChecklist =
    buildManualApprovalHandoffContractChecklist();
  const manualApprovalHandoffReviewRecords =
    listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews();
  const manualApprovalHandoffDecisionReviewRecords =
    listManualApprovalHandoffDecisionReviewRecords();
  const manualApprovalHandoffGateFailureReviewRecords =
    listManualApprovalHandoffGateFailureReviewRecords();
  const manualApprovalHandoffRecoveryPlanPreviewRecords =
    listManualApprovalHandoffRecoveryPlanPreviews();
  const manualApprovalHandoffRecoveryReadinessChecklistRecords =
    listManualApprovalHandoffRecoveryReadinessChecklistRecords();
  const manualApprovalHandoffAcceptancePostureRecords =
    listManualApprovalHandoffAcceptancePostureRecords();
  const manualApprovalHandoffReviewSummary =
    buildManualApprovalHandoffReviewSummary();
  const manualApprovalDecisionContractChecklist =
    buildManualApprovalDecisionContractChecklist();
  const representativeEndToEndPacketReview = endToEndPacketReviewRecords[0] ?? null;
  const representativeEndToEndPacketDecisionReview =
    endToEndPacketDecisionReviewRecords[0] ?? null;
  const representativeEndToEndPacketStageFailureReview =
    endToEndPacketStageFailureReviewRecords[0] ?? null;
  const representativeEndToEndPacketGateFailureReview =
    endToEndPacketGateFailureReviewRecords[0] ?? null;
  const representativeEndToEndPacketRecoveryPlan =
    endToEndPacketRecoveryPlanPreviewRecords[0] ?? null;
  const representativeEndToEndPacketAcceptancePostureReview =
    endToEndPacketAcceptancePostureReviewRecords[0] ?? null;
  const blockedEndToEndPacketRecoveryReadinessChecklistRecords =
    endToEndPacketRecoveryReadinessChecklistRecords.filter(
      (record) => record.state === "blocked"
    );
  const representativeManualApprovalHandoffReview =
    manualApprovalHandoffReviewRecords[0] ?? null;
  const representativeManualApprovalHandoffDecisionReview =
    manualApprovalHandoffDecisionReviewRecords[0] ?? null;
  const representativeManualApprovalHandoffGateFailureReview =
    manualApprovalHandoffGateFailureReviewRecords[0] ?? null;
  const representativeManualApprovalHandoffRecoveryPlan =
    manualApprovalHandoffRecoveryPlanPreviewRecords[0] ?? null;
  const representativeManualApprovalHandoffAcceptancePosture =
    manualApprovalHandoffAcceptancePostureRecords[0] ?? null;
  const blockedManualApprovalHandoffRecoveryReadinessChecklistRecords =
    manualApprovalHandoffRecoveryReadinessChecklistRecords.filter(
      (record) => record.state === "blocked"
    );
  const providerLabelsById = new Map(
    providerSlots.map((slot) => [slot.id, slot.label] as const)
  );

  return (
    <div
      style={shell}
      data-codexforge-ai-provider-registry="4682-4713 - AI Model Provider Registry and Capability Matrix 4714-4745 - Server-Only Model Adapter Contracts 4746-4777 - Manual Gated Model Adapter Dry-Run Harness 4778-4809 - Model Adapter Dry-Run Result Review and Recovery 5034-5065 - Backend-Owned Model Provider Synthetic Dry-Run Runner Skeleton 5066-5097 - Backend-Owned Synthetic Dry-Run Result Capture Contract 5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview 5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract 5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview 5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract 5226-5257 - Backend-Owned Synthetic Dry-Run End-to-End Packet Review and Recovery Preview 5258-5289 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract 5290-5321 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Review and Recovery Preview 5322-5353 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract AI model provider registry Capability matrix Provider selection preview Server-only model adapter contracts Adapter envelope preview Server-only adapter gates Manual gated model adapter dry-run harness Dry-run scenario preview Fixture result preview Manual dry-run gates Model adapter dry-run result review Dry-run quality and safety review Dry-run recovery plan Dry-run acceptance matrix Backend-owned synthetic dry-run runner skeleton Synthetic dry-run fixture packet Synthetic runner skeleton gates Synthetic runner readiness matrix Backend-owned synthetic dry-run result capture contract Backend-owned synthetic dry-run result capture review Result capture decision review Result capture gate failure review Result capture recovery plan Result capture recovery readiness Result capture acceptance posture Backend-owned synthetic dry-run audit and approval join contract Synthetic audit join contract Synthetic approval join contract Result to audit and approval link contract Audit and approval join request/response contract Audit and approval join gates Audit and approval join readiness matrix Audit and approval evidence packet preview Backend-owned synthetic dry-run audit and approval join review Audit and approval join decision review Audit and approval join gate failure review Audit and approval join recovery plan Audit and approval join recovery readiness Audit and approval join acceptance posture Backend-owned synthetic dry-run end-to-end packet contract Synthetic end-to-end stage contract Synthetic end-to-end lineage End-to-end packet request/response contract End-to-end packet gates End-to-end packet readiness matrix End-to-end packet acceptance posture Backend-owned synthetic dry-run end-to-end packet review End-to-end packet decision review End-to-end packet stage failure review End-to-end packet gate failure review End-to-end packet recovery plan End-to-end packet recovery readiness End-to-end packet acceptance posture Backend-owned synthetic dry-run manual approval handoff contract Manual approval handoff packet Manual approval handoff request/response contract Manual approval scope Manual approval handoff gates Manual approval handoff readiness matrix Manual approval handoff evidence summary Backend-owned synthetic dry-run manual approval handoff review Manual approval handoff decision review Manual approval handoff gate failure review Manual approval handoff recovery plan Manual approval handoff recovery readiness Manual approval handoff acceptance posture Backend-owned synthetic dry-run manual approval decision contract Manual approval decision packet Manual approval decision request/response contract Approval outcome preview Manual approval decision gates Manual approval decision readiness matrix Manual approval decision evidence summary manual approval decision contract is preview-only decision request is not created operator approval state: not requested manual confirmation state: not captured approval outcome state: not decided manual approval decision review and recovery preview comes next No model calls yet No prompt sending No provider SDKs imported Provider execution is blocked"
    >
      <section style={hero}>
        <div>
          <span style={eyebrow}>{`Phase ${endToEndPacketReviewSummary.highestDetectedPhase}`}</span>
          <h1 style={headline}>AI model provider registry</h1>
          <p style={lede}>
            Athena can see model provider slots, capability families, workspace
            targets, blocked routing posture, server-only model adapter
            contracts, adapter envelope previews, the current fixture-only manual gated
            dry-run harness previews, and fixture-only dry-run result review
            and recovery previews. Provider slots are registry-only.
            Capability matrix is preview-only. Server-only model adapter
            contracts are preview-only. Adapter envelope preview is
            preview-only. dry-run review is fixture-only. quality review is
            static preview only. safety review is static preview only.
            redaction review is static preview only. Athena can now preview
            backend-owned synthetic dry-run result capture reviews. Athena can
            now preview backend-owned synthetic dry-run audit and approval join
            reviews, audit and approval join decision reviews, audit and
            approval join gate failure reviews, audit and approval join
            recovery plans, audit and approval join recovery readiness, and
            audit and approval join acceptance posture. Athena can now preview
            backend-owned synthetic dry-run end-to-end packet contracts,
            synthetic end-to-end stage contracts, synthetic end-to-end
            lineage, end-to-end packet request/response contracts, end-to-end
            packet gates, end-to-end packet readiness matrices, and end-to-end
            packet acceptance posture. Athena can now preview backend-owned
            synthetic dry-run end-to-end packet review, end-to-end packet
            decision review, end-to-end packet stage failure review,
            end-to-end packet gate failure review, end-to-end packet recovery
            plan, end-to-end packet recovery readiness, and end-to-end packet
            acceptance posture. end-to-end packet review is preview-only.
            decision state: held / not accepted. packet request is not
            created. packet invocation is not invoked. packet response is not
            received. audit join state: not persisted. approval join state:
            not persisted. Athena can now preview backend-owned synthetic
            dry-run manual approval decision contract, manual approval
            decision packet, manual approval decision request/response
            contract, approval outcome preview, manual approval decision
            gates, manual approval decision readiness matrix, and manual
            approval decision evidence summary. manual approval decision
            contract is preview-only. decision request is not created.
            operator approval state: not requested. manual confirmation state:
            not captured. approval outcome state: not decided. manual
            approval decision review and recovery preview comes next. No
            model calls yet. No prompt sending. No provider SDKs imported.
            Frontend provider calls are blocked.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/jarvis" style={primaryLink}>Open Athena Command Center</Link>
          <Link href="/jarvis-video" style={link}>Open Jarvis Video Studio</Link>
          <Link href="/jarvis-safety" style={link}>Safety / Settings</Link>
          <Link href="/jarvis-audit" style={link}>Audit / Runs</Link>
        </div>
      </section>

      <section style={metricGrid}>
        <div style={metric}>
          <span>Provider slots</span>
          <strong>{readinessSummary.providerSlotCount}</strong>
        </div>
        <div style={metric}>
          <span>Capability rows</span>
          <strong>{capabilityMatrixPreview.capabilityCount}</strong>
        </div>
        <div style={metric}>
          <span>Workspace targets</span>
          <strong>{readinessSummary.workspaceTargetCount}</strong>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Registry posture</span>
            <h2 style={sectionTitle}>AI model provider registry</h2>
          </div>
          <span style={sectionBadge}>Registry-only</span>
        </div>
        <p style={copy}>
          Provider slots are registry-only. No model calls yet. No prompt
          sending. No provider SDKs imported. Server-only adapters required.
          Credential isolation required. Operator approval required. Kill switch
          required. Audit required.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Registry summary</span>
            <h3 style={cardTitle}>Athena / Jarvis Model Gateway</h3>
            <p style={copy}>Source: Athena / Jarvis Model Gateway.</p>
            <p style={copy}>Registry mode: preview-only.</p>
            <p style={copy}>Provider status: registry-only / not connected.</p>
            <div style={list}>
              {readinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Blocked posture</span>
            <h3 style={cardTitle}>Execution remains blocked</h3>
            <p style={copy}>{blockedExecutionSummary.summary}</p>
            <div style={list}>
              {blockedExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Next batch</span>
            <h3 style={cardTitle}>
              Backend-owned synthetic dry-run result capture review
            </h3>
            <p style={copy}>
              Athena can now preview backend-owned synthetic dry-run result
              capture reviews in the provider hub.
            </p>
            <div style={list}>
              {[
                "Backend-owned synthetic dry-run result capture review",
                "Result capture decision review",
                "Result capture gate failure review",
                "Result capture recovery plan",
                "Result capture recovery readiness",
                "Result capture acceptance posture",
                "synthetic result capture review is preview-only",
                "audit and approval join contract comes next",
              ].map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {providerSlots.map((slot) => (
            <article key={slot.key} style={card}>
              <span style={tag}>Provider slot</span>
              <h3 style={cardTitle}>{slot.label}</h3>
              <p style={copy}>{slot.description}</p>
              <p style={copy}>
                {`Status: ${slot.providerStatus}. Current state: ${slot.currentState}.`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${slot.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                {slot.capabilityFamilies.map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
              <p style={copy}>{`Blocked by: ${slot.blockedBy.join(" | ")}`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${slot.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Capability families</span>
            <h2 style={sectionTitle}>Capability matrix</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          text/chat, code, image, video, audio/voice, transcription,
          embeddings/search, safety/moderation, and local inference stay blocked
          / registry-only. Each capability is not connected yet. Each capability
          requires a server-only adapter before execution.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Matrix summary</span>
            <h3 style={cardTitle}>Capability matrix is preview-only</h3>
            <p style={copy}>
              {`${capabilityMatrixPreview.blockedCapabilityCount} of ${capabilityMatrixPreview.capabilityCount} capability rows are blocked / registry-only.`}
            </p>
            <div style={list}>
              <span style={pill}>No model calls yet</span>
              <span style={pill}>No prompt sending</span>
              <span style={pill}>No provider SDKs imported</span>
              <span style={pill}>Server-only adapters required</span>
              <span style={pill}>Credential isolation required</span>
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Workspace coverage</span>
            <h3 style={cardTitle}>Which plugin/workspace each capability can serve</h3>
            <div style={list}>
              {workspaceCapabilityGroups.map((group) => (
                <span key={group.workspaceTarget} style={pill}>
                  {`${group.workspaceTarget}: ${group.capabilityRows.length}`}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {capabilityMatrixPreview.matrixRows.map((row) => (
            <article key={row.key} style={card}>
              <span style={tag}>Capability row</span>
              <h3 style={cardTitle}>{row.label}</h3>
              <p style={copy}>{row.description}</p>
              <p style={copy}>
                {`Provider slots: ${row.providerSlotIds
                  .map((slotId) => providerLabelsById.get(slotId) ?? slotId)
                  .join(" | ")}`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${row.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                <span style={pill}>{row.approvalRequirement}</span>
                <span style={pill}>{row.safetyRequirement}</span>
                <span style={pill}>{row.auditRequirement}</span>
                <span style={pill}>{row.credentialIsolationRequirement}</span>
                <span style={pill}>{row.backendOnlyAdapterRequirement}</span>
                <span style={pill}>{row.executionPosture}</span>
              </div>
              <p style={copy}>{`Current state: ${row.currentState}.`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${row.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Routing-readiness preview</span>
            <h2 style={sectionTitle}>Provider selection preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          command planning -&gt; text/planning capability. product video -&gt;
          video capability. storyboard -&gt; image capability. narration -&gt;
          audio/voice capability. captions -&gt; transcription capability.
          private/local task -&gt; local inference capability.
        </p>
        <div style={grid}>
          {selectionPreview.map((item) => (
            <article key={item.id} style={card}>
              <span style={tag}>Static example</span>
              <h3 style={cardTitle}>{item.requestLabel}</h3>
              <p style={copy}>
                {`${item.providerFamilyLabel} -> ${item.capabilityLabel}`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${item.workspaceTargets.join(" | ")}`}
              </p>
              <p style={copy}>{`Execution posture: ${item.executionPosture}.`}</p>
              <p style={copy}>{`Current state: ${item.currentState}.`}</p>
              <p style={copy}>{`Blocked by: ${item.blockedBy.join(" | ")}`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${item.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Model Gateway contract layer</span>
            <h2 style={sectionTitle}>Server-only model adapter contracts</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          Server-only model adapter contracts. model adapters must run
          server-only. Frontend provider calls are blocked. No model calls yet.
          No prompt sending. No provider SDKs imported. Opaque credential
          references only. Manual gated model adapter dry-run harness is now
          available as a fixture-only preview. Model adapter dry-run result
          review is now available. Athena model routing and provider selection
          preview comes next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Contract posture</span>
            <h3 style={cardTitle}>model adapters must run server-only</h3>
            <p style={copy}>{blockedModelExecutionSummary.summary}</p>
            <div style={list}>
              {blockedModelExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Coverage</span>
            <h3 style={cardTitle}>Typed capability families stay inert</h3>
            <p style={copy}>
              {`${adapterReadinessSummary.contractCount} contracts | ${adapterContractsByCapabilityFamily.length} capability families | ${adapterContractsByWorkspaceTarget.length} workspace targets.`}
            </p>
            <div style={list}>
              {adapterContractsByCapabilityFamily.map((group) => (
                <span key={group.capabilityFamilyId} style={pill}>
                  {`${group.capabilityFamilyLabel}: ${group.contractCount}`}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Next likely batch</span>
            <h3 style={cardTitle}>
              Model adapter dry-run result review and recovery
            </h3>
            <p style={copy}>
              {`Latest completed batch: ${resultReviewSummary.latestCompletedBatch}. Previous completed batch: ${resultReviewSummary.previousCompletedBatch}.`}
            </p>
            <div style={list}>
              {nextModelRoutingProviderSelectionChecklist.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {adapterContracts.map((contract) => (
            <article key={contract.key} style={card}>
              <span style={tag}>Capability family</span>
              <h3 style={cardTitle}>{contract.label}</h3>
              <p style={copy}>{contract.summary}</p>
              <p style={copy}>
                {`Workspace targets: ${contract.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                <span style={pill}>{contract.contractVersion}</span>
                <span style={pill}>{contract.contractMode}</span>
                <span style={pill}>{contract.adapterPosture}</span>
                <span style={pill}>{contract.credentialPosture}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only envelopes</span>
            <h2 style={sectionTitle}>Adapter envelope preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          Adapter envelope preview. request envelope preview. response envelope
          preview. error envelope preview. prompt payload is redacted placeholder
          only. provider response is not received. result is placeholder only.
          audit/approval/result persistence not implemented.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Envelope summary</span>
            <h3 style={cardTitle}>adapter envelopes are preview-only</h3>
            <p style={copy}>
              {`${adapterReadinessSummary.requestEnvelopeCount} request envelope previews | ${adapterReadinessSummary.responseEnvelopeCount} response envelope previews | ${adapterReadinessSummary.errorEnvelopeCount} error envelope previews.`}
            </p>
            <div style={list}>
              {adapterReadinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeRequestEnvelope ? (
            <article style={card}>
              <span style={tag}>request envelope preview</span>
              <h3 style={cardTitle}>
                {representativeRequestEnvelope.capabilityLabel}
              </h3>
              <p style={copy}>
                {`request envelope version: ${representativeRequestEnvelope.requestEnvelopeVersion}.`}
              </p>
              <p style={copy}>
                {`prompt payload posture: ${representativeRequestEnvelope.promptPayloadPosture}.`}
              </p>
              <p style={copy}>
                {`workspace target: ${representativeRequestEnvelope.workspaceTarget}.`}
              </p>
            </article>
          ) : null}
          {representativeResponseEnvelope ? (
            <article style={card}>
              <span style={tag}>response envelope preview</span>
              <h3 style={cardTitle}>result is placeholder only</h3>
              <p style={copy}>
                {`response envelope version: ${representativeResponseEnvelope.responseEnvelopeVersion}.`}
              </p>
              <p style={copy}>
                {`provider response state: ${representativeResponseEnvelope.providerResponseState}.`}
              </p>
              <p style={copy}>
                {`result capture state: ${representativeResponseEnvelope.resultCaptureState}.`}
              </p>
            </article>
          ) : null}
          {representativeErrorEnvelope ? (
            <article style={card}>
              <span style={tag}>error envelope preview</span>
              <h3 style={cardTitle}>provider error state is not received</h3>
              <p style={copy}>
                {`error envelope version: ${representativeErrorEnvelope.errorEnvelopeVersion}.`}
              </p>
              <p style={copy}>
                {`retry/fallback posture: ${representativeErrorEnvelope.retryFallbackPosture}.`}
              </p>
              <div style={list}>
                {representativeErrorEnvelope.localValidationErrorExamples.map(
                  (item) => (
                    <span key={item} style={pill}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Release gate posture</span>
            <h2 style={sectionTitle}>Server-only adapter gates</h2>
          </div>
          <span style={sectionBadge}>Required</span>
        </div>
        <p style={copy}>
          Server-only adapter gates. No model calls yet. No prompt sending. No
          provider SDKs imported. Frontend provider calls are blocked. Opaque
          credential references only. Manual gated model adapter dry-run
          harness is fixture-only. Dry-run result review and recovery comes
          next.
        </p>
        <div style={grid}>
          {serverOnlyAdapterGateChecklist.map((gate) => (
            <article key={gate.id} style={card}>
              <span style={tag}>Required gate</span>
              <h3 style={cardTitle}>{gate.label}</h3>
              <p style={copy}>{gate.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Fixture-only harness</span>
            <h2 style={sectionTitle}>Manual gated model adapter dry-run harness</h2>
          </div>
          <span style={sectionBadge}>Fixture-only</span>
        </div>
        <p style={copy}>
          dry-run harness is fixture-only. manual operator approval is
          required. manual confirmation is required. kill switch required.
          audit required. server-only adapter contract required. No model calls
          yet. No prompt sending. No provider SDKs imported. Provider
          execution is blocked. Model adapter dry-run result review is now
          available. Athena model routing and provider selection preview comes
          next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Harness posture</span>
            <h3 style={cardTitle}>{dryRunHarness.currentBatch}</h3>
            <p style={copy}>
              {`Source: ${dryRunHarness.source}. Harness mode: ${dryRunHarness.harnessMode}. Fixture mode: ${dryRunHarness.fixtureMode}.`}
            </p>
            <div style={list}>
              {[
                "dry-run harness is fixture-only",
                dryRunHarness.manualOperatorApprovalRequired,
                dryRunHarness.manualConfirmationRequired,
                dryRunHarness.killSwitchRequired,
                dryRunHarness.auditRequired,
                "server-only adapter contract required",
              ].map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Blocked execution</span>
            <h3 style={cardTitle}>Provider execution is blocked</h3>
            <p style={copy}>{blockedDryRunExecutionSummary.summary}</p>
            <div style={list}>
              {blockedDryRunExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>What comes next</span>
            <h3 style={cardTitle}>{resultReviewSummary.nextLikelyBatch}</h3>
            <div style={list}>
              {nextModelRoutingProviderSelectionChecklist.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Blocked scenario catalog</span>
            <h2 style={sectionTitle}>Dry-run scenario preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          text planning. code assistance. image storyboard. video prompt
          planning. audio narration. transcription/caption. embeddings/search.
          safety/moderation. local/private inference. each scenario is blocked
          by default. each scenario uses fixture-only packets.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Scenario readiness</span>
            <h3 style={cardTitle}>
              {`${dryRunReadinessSummary.scenarioCount} dry-run scenarios`}
            </h3>
            <p style={copy}>
              {`${dryRunReadinessSummary.requestPacketCount} request packets | ${dryRunReadinessSummary.fixtureResultCount} fixture results | ${dryRunReadinessSummary.denialFailureCount} denial/failure previews.`}
            </p>
            <div style={list}>
              {dryRunReadinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeDryRunRequestPacket ? (
            <article style={card}>
              <span style={tag}>Fixture packet posture</span>
              <h3 style={cardTitle}>
                {representativeDryRunRequestPacket.operatorObjective}
              </h3>
              <p style={copy}>
                {`Prompt payload posture: ${representativeDryRunRequestPacket.promptPayloadPosture}.`}
              </p>
              <p style={copy}>
                {`Prompt transmission state: ${representativeDryRunRequestPacket.promptTransmissionState}.`}
              </p>
              <p style={copy}>
                {`Approval reference posture: ${representativeDryRunRequestPacket.approvalReferencePosture}.`}
              </p>
              <p style={copy}>
                {`Audit reference posture: ${representativeDryRunRequestPacket.auditReferencePosture}.`}
              </p>
            </article>
          ) : null}
        </div>
        <div style={grid}>
          {dryRunScenarios.map((scenario) => (
            <article key={scenario.key} style={card}>
              <span style={tag}>Static scenario</span>
              <h3 style={cardTitle}>{scenario.label}</h3>
              <p style={copy}>{scenario.summary}</p>
              <p style={copy}>{`Workspace target: ${scenario.workspaceTarget}`}</p>
              <div style={list}>
                <span style={pill}>{scenario.capabilityFamilyLabel}</span>
                <span style={pill}>{scenario.fixturePacketPosture}</span>
                <span style={pill}>{`Provider slot: ${scenario.providerSlotId}`}</span>
              </div>
              <p style={copy}>{scenario.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Static placeholder outputs</span>
            <h2 style={sectionTitle}>Fixture result preview</h2>
          </div>
          <span style={sectionBadge}>Static preview only</span>
        </div>
        <p style={copy}>
          static fixture result only. provider response is not received. model
          output is not generated. audit/approval/result persistence not
          implemented. denial/failure preview remains static. recovery is
          future manual review only.
        </p>
        <div style={grid}>
          {representativeDryRunFixtureResult ? (
            <article style={card}>
              <span style={tag}>Fixture result posture</span>
              <h3 style={cardTitle}>
                {representativeDryRunFixtureResult.fixtureResultState}
              </h3>
              <p style={copy}>
                {`Provider response state: ${representativeDryRunFixtureResult.providerResponseState}.`}
              </p>
              <p style={copy}>
                {`Model output state: ${representativeDryRunFixtureResult.modelOutputState}.`}
              </p>
              <p style={copy}>
                {`Result capture state: ${representativeDryRunFixtureResult.resultCaptureState}.`}
              </p>
            </article>
          ) : null}
          {representativeDryRunDenialFailure ? (
            <article style={card}>
              <span style={tag}>Denial/failure preview</span>
              <h3 style={cardTitle}>Future manual review only</h3>
              <p style={copy}>
                {representativeDryRunDenialFailure.promptNotSentReason}
              </p>
              <p style={copy}>
                {representativeDryRunDenialFailure.providerNotCalledReason}
              </p>
              <p style={copy}>
                {representativeDryRunDenialFailure.noProviderErrorReceivedStatement}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Required gate checklist</span>
            <h2 style={sectionTitle}>Manual dry-run gates</h2>
          </div>
          <span style={sectionBadge}>Required</span>
        </div>
        <p style={copy}>
          Manual dry-run gates keep approval, confirmation, kill switch, audit,
          server-only boundary, prompt redaction, credential isolation,
          fixture-only result posture, and non-persistence visible together.
        </p>
        <div style={grid}>
          {manualDryRunGateChecklist.map((gate) => (
            <article key={gate.id} style={card}>
              <span style={tag}>Required gate</span>
              <h3 style={cardTitle}>{gate.label}</h3>
              <p style={copy}>{gate.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Fixture-only review layer</span>
            <h2 style={sectionTitle}>Model adapter dry-run result review</h2>
          </div>
          <span style={sectionBadge}>Fixture-only</span>
        </div>
        <p style={copy}>
          dry-run result review is fixture-only. Provider response is not
          received. Model output is not generated. static fixture result only.
          manual operator review required. audit required. result persistence
          not implemented. No model calls yet. No prompt sending. Provider
          execution is blocked.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Review checkpoint</span>
            <h3 style={cardTitle}>{resultReviewSummary.latestCompletedBatch}</h3>
            <p style={copy}>
              {`Result reviews: ${resultReviewSummary.resultReviewCount}. Quality reviews: ${resultReviewSummary.qualityReviewCount}. Safety reviews: ${resultReviewSummary.safetyReviewCount}.`}
            </p>
            <div style={list}>
              {resultReviewSummary.summaryLines.slice(0, 8).map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeResultReview ? (
            <article style={card}>
              <span style={tag}>Representative review</span>
              <h3 style={cardTitle}>
                {representativeResultReview.capabilityFamilyLabel}
              </h3>
              <p style={copy}>
                {representativeResultReview.noLiveResultReviewStatement}
              </p>
              <div style={list}>
                <span style={pill}>
                  {`Workspace: ${representativeResultReview.workspaceTarget}`}
                </span>
                <span style={pill}>
                  {representativeResultReview.manualOperatorReviewRequired}
                </span>
                <span style={pill}>
                  {representativeResultReview.operatorApprovalRequired}
                </span>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Static quality and safety checks</span>
            <h2 style={sectionTitle}>Dry-run quality and safety review</h2>
          </div>
          <span style={sectionBadge}>Static preview only</span>
        </div>
        <p style={copy}>
          quality review is static preview only. safety review is static
          preview only. redaction review is static preview only. prompt leakage
          check. credential leakage check. token leakage check. unsafe output
          check. operator review required.
        </p>
        <div style={grid}>
          {representativeQualityReview ? (
            <article style={card}>
              <span style={tag}>Quality posture</span>
              <h3 style={cardTitle}>
                {representativeQualityReview.capabilityFamilyLabel}
              </h3>
              <p style={copy}>
                {representativeQualityReview.noLiveQualityResultStatement}
              </p>
              <div style={list}>
                {representativeQualityReview.acceptanceCriteria.map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
          {representativeSafetyReview ? (
            <article style={card}>
              <span style={tag}>Safety posture</span>
              <h3 style={cardTitle}>
                {representativeSafetyReview.capabilityFamilyLabel}
              </h3>
              <p style={copy}>
                {representativeSafetyReview.noLiveSafetyResultStatement}
              </p>
              <div style={list}>
                {[
                  "prompt leakage check",
                  "credential leakage check",
                  "token leakage check",
                  "unsafe output check",
                  representativeSafetyReview.requiredOperatorReview,
                ].map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Manual recovery only</span>
            <h2 style={sectionTitle}>Dry-run recovery plan</h2>
          </div>
          <span style={sectionBadge}>Retry/fallback disabled</span>
        </div>
        <p style={copy}>
          retry disabled. fallback disabled. recovery is manual review only.
          missing approval recovery. kill switch blocked recovery. missing
          opaque credential recovery. provider not called recovery. result not
          generated recovery. next safe batch recommendation.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Recovery posture</span>
            <h3 style={cardTitle}>{recoverySummary.currentBatch}</h3>
            <div style={list}>
              {recoverySummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeRecoveryPlan ? (
            <article style={card}>
              <span style={tag}>Representative recovery</span>
              <h3 style={cardTitle}>
                {representativeRecoveryPlan.capabilityFamilyLabel}
              </h3>
              <p style={copy}>
                {representativeRecoveryPlan.noRetryNoFallbackNoExecutionStatement}
              </p>
              <div style={list}>
                {[
                  representativeRecoveryPlan.missingApprovalRecovery,
                  representativeRecoveryPlan.killSwitchBlockedRecovery,
                  representativeRecoveryPlan.missingOpaqueCredentialRecovery,
                ].map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Blocked / fixture-only criteria</span>
            <h2 style={sectionTitle}>Dry-run acceptance matrix</h2>
          </div>
          <span style={sectionBadge}>Pending manual review</span>
        </div>
        <p style={copy}>
          acceptance, blocker, safety, privacy, cost/rate, audit, approval,
          server-only, and credential isolation criteria stay visible together.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Acceptance posture</span>
            <h3 style={cardTitle}>{acceptanceSummary.currentBatch}</h3>
            <div style={list}>
              {acceptanceSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeAcceptanceMatrix ? (
            <article style={card}>
              <span style={tag}>Representative matrix</span>
              <h3 style={cardTitle}>
                {representativeAcceptanceMatrix.capabilityFamilyLabel}
              </h3>
              <p style={copy}>{representativeAcceptanceMatrix.nextAction}</p>
              <div style={list}>
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
                ].map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only backend skeleton</span>
            <h2 style={sectionTitle}>
              Backend-owned synthetic dry-run runner skeleton
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
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
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Skeleton summary</span>
            <h3 style={cardTitle}>
              {syntheticRunnerSkeletonSummary.latestCompletedBatch}
            </h3>
            <p style={copy}>
              {`Phase ${syntheticRunnerSkeletonSummary.highestDetectedPhase}. Previous completed batch: ${syntheticRunnerSkeletonSummary.previousCompletedBatch}.`}
            </p>
            <div style={list}>
              {syntheticRunnerSkeletonSummary.summaryLines.slice(0, 8).map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "synthetic-runner-summary",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
          {representativeSyntheticRunnerSkeleton ? (
            <article style={card}>
              <span style={tag}>Representative skeleton</span>
              <h3 style={cardTitle}>
                {representativeSyntheticRunnerSkeleton.requestLabel}
              </h3>
              <p style={copy}>
                {`Workspace: ${representativeSyntheticRunnerSkeleton.workspaceTarget}. Capability: ${representativeSyntheticRunnerSkeleton.selectedCapabilityFamily.label}.`}
              </p>
              <p style={copy}>
                {`Provider slot label: ${representativeSyntheticRunnerSkeleton.providerSlotLabel}. Backup provider slot label: ${representativeSyntheticRunnerSkeleton.backupProviderSlotLabel}.`}
              </p>
              <p style={copy}>
                {`dry-run request state: ${representativeSyntheticRunnerSkeleton.dryRunRequestState}. runner invocation state: ${representativeSyntheticRunnerSkeleton.runnerInvocationState}.`}
              </p>
              <p style={copy}>
                {`dry-run execution state: ${representativeSyntheticRunnerSkeleton.dryRunExecutionState}. provider response state: ${representativeSyntheticRunnerSkeleton.providerResponseState}.`}
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>What comes next</span>
            <h3 style={cardTitle}>
              synthetic dry-run result capture contract comes next
            </h3>
            <div style={list}>
              {nextSyntheticDryRunResultCaptureContractChecklist.map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "synthetic-runner-next",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
        </div>
        <div style={grid}>
          {syntheticRunnerSkeletons.map((record) => (
            <article key={record.key} style={card}>
              <span style={tag}>Synthetic skeleton</span>
              <h3 style={cardTitle}>{record.requestLabel}</h3>
              <p style={copy}>{record.blockedDefaultReason}</p>
              <p style={copy}>
                {`runner state: ${record.runnerState}. dry-run request state: ${record.dryRunRequestState}.`}
              </p>
              <p style={copy}>
                {`runner invocation state: ${record.runnerInvocationState}. dry-run execution state: ${record.dryRunExecutionState}.`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Static fixture-only packet</span>
            <h2 style={sectionTitle}>Synthetic dry-run fixture packet</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          synthetic input fixture. synthetic output fixture. synthetic error
          fixture. prompt payload is redacted placeholder only. prompt
          transmission state: not sent. credential reference posture: opaque
          label only. provider response is not received. model output is not
          generated. synthetic result is placeholder only. no real input, no
          real output, no real error.
        </p>
        <div style={grid}>
          {representativeSyntheticInputFixture ? (
            <article style={card}>
              <span style={tag}>Synthetic input fixture</span>
              <h3 style={cardTitle}>
                {representativeSyntheticInputFixture.requestLabel}
              </h3>
              <p style={copy}>
                {`prompt payload posture: ${representativeSyntheticInputFixture.promptPayloadPosture}.`}
              </p>
              <p style={copy}>
                {`prompt transmission state: ${representativeSyntheticInputFixture.promptTransmissionState}.`}
              </p>
              <p style={copy}>
                {representativeSyntheticInputFixture.explicitNoRealInputNoPromptSentStatement}
              </p>
            </article>
          ) : null}
          {representativeSyntheticOutputFixture ? (
            <article style={card}>
              <span style={tag}>Synthetic output fixture</span>
              <h3 style={cardTitle}>
                {representativeSyntheticOutputFixture.requestLabel}
              </h3>
              <p style={copy}>
                {`provider response state: ${representativeSyntheticOutputFixture.providerResponseState}.`}
              </p>
              <p style={copy}>
                {`model output state: ${representativeSyntheticOutputFixture.modelOutputState}.`}
              </p>
              <p style={copy}>
                {representativeSyntheticOutputFixture.explicitNoRealOutputNoModelOutputStatement}
              </p>
            </article>
          ) : null}
          {representativeSyntheticErrorFixture ? (
            <article style={card}>
              <span style={tag}>Synthetic error fixture</span>
              <h3 style={cardTitle}>
                {representativeSyntheticErrorFixture.requestLabel}
              </h3>
              <p style={copy}>
                {`provider error state: ${representativeSyntheticErrorFixture.providerErrorState}.`}
              </p>
              <p style={copy}>
                {representativeSyntheticErrorFixture.queueDispatchBlockedExample}
              </p>
              <p style={copy}>
                {representativeSyntheticErrorFixture.explicitNoRealErrorNoProviderErrorStatement}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only gate schema</span>
            <h2 style={sectionTitle}>Synthetic runner skeleton gates</h2>
          </div>
          <span style={sectionBadge}>Preview-only / blocked</span>
        </div>
        <p style={copy}>
          backend admission contract. dry-run runner contract. dry-run runner
          review. synthetic input fixture. synthetic output fixture. synthetic
          error fixture. operator approval. manual confirmation. kill switch.
          audit. server-only boundary. no frontend provider call. no provider
          SDK import in frontend. no prompt sending. opaque credential
          reference. no plaintext secrets. privacy/redaction. cost/rate/timeout.
          idempotency/replay block. single-run lock. no queue dispatch. no
          worker dispatch. no job execution. no persistence until future
          backend batch.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Gate summary</span>
            <h3 style={cardTitle}>
              {`${syntheticRunnerGateSummary.gateCount} synthetic runner gates`}
            </h3>
            <p style={copy}>
              {`backend skeleton: ${syntheticRunnerGateSummary.backendSkeletonGateCount}. operator: ${syntheticRunnerGateSummary.operatorGateCount}. safety review: ${syntheticRunnerGateSummary.safetyReviewGateCount}.`}
            </p>
            <div style={list}>
              {syntheticRunnerGateSummary.summaryLines.slice(0, 8).map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "synthetic-runner-gates",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
          {syntheticRunnerGates.slice(0, 3).map((record) => (
            <article key={record.key} style={card}>
              <span style={tag}>Gate record</span>
              <h3 style={cardTitle}>{record.label}</h3>
              <p style={copy}>{`owner: ${record.owner}.`}</p>
              <p style={copy}>{`current state: ${record.currentState}.`}</p>
              <p style={copy}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Compact readiness matrix</span>
            <h2 style={sectionTitle}>Synthetic runner readiness matrix</h2>
          </div>
          <span style={sectionBadge}>skeleton-only / not executable</span>
        </div>
        <p style={copy}>
          skeleton state. input fixture state. output fixture state. error
          fixture state. gate schema state. admission dependency state. runner
          contract dependency state. runner review dependency state.
          queue/worker/job boundary state. persistence boundary state. result
          capture dependency. current readiness: skeleton-only / not
          executable. next safe action.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Readiness summary</span>
            <h3 style={cardTitle}>
              {syntheticRunnerReadinessSummary.currentReadiness}
            </h3>
            <p style={copy}>
              {`Readiness records: ${syntheticRunnerReadinessSummary.readinessRecordCount}.`}
            </p>
            <p style={copy}>{syntheticRunnerReadinessSummary.nextSafeAction}</p>
          </article>
          {representativeSyntheticRunnerReadiness ? (
            <article style={card}>
              <span style={tag}>Representative readiness</span>
              <h3 style={cardTitle}>
                {representativeSyntheticRunnerReadiness.requestLabel}
              </h3>
              <p style={copy}>
                {`skeleton state: ${representativeSyntheticRunnerReadiness.skeletonState}.`}
              </p>
              <p style={copy}>
                {`queue/worker/job boundary state: ${representativeSyntheticRunnerReadiness.queueBoundaryState} / ${representativeSyntheticRunnerReadiness.workerBoundaryState} / ${representativeSyntheticRunnerReadiness.jobBoundaryState}.`}
              </p>
              <p style={copy}>
                {`result capture dependency: ${representativeSyntheticRunnerReadiness.resultCaptureDependency}.`}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Backend-owned contract layer</span>
            <h2 style={sectionTitle}>
              Backend-owned synthetic dry-run result capture contract
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          synthetic result capture review is preview-only. result capture
          state: not captured. result persistence is not implemented. audit
          persistence is not implemented. approval persistence is not
          implemented. provider response is not received. model output is not
          generated. synthetic fixture result is static placeholder only.
          result id is not issued. audit and approval join contract comes
          next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Contract summary</span>
            <h3 style={cardTitle}>
              {resultCaptureContractSummary.latestCompletedBatch}
            </h3>
            <p style={copy}>
              {`Phase ${resultCaptureContractSummary.highestDetectedPhase}. Previous completed batch: ${resultCaptureContractSummary.previousCompletedBatch}.`}
            </p>
            <div style={list}>
              {resultCaptureContractSummary.summaryLines.slice(0, 10).map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "result-capture-summary",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Coverage</span>
            <h3 style={cardTitle}>Capability and workspace coverage</h3>
            <p style={copy}>
              {`${resultCaptureCapabilityGroups.length} capability families. ${resultCaptureWorkspaceGroups.length} workspace targets.`}
            </p>
            <div style={list}>
              {resultCaptureCapabilityGroups.map((group, index) => (
                <span
                  key={buildProviderScopedKey(
                    "result-capture-capability-group",
                    index,
                    group.capabilityFamilyId
                  )}
                  style={pill}
                >
                  {`${group.capabilityFamilyLabel}: ${group.contractCount}`}
                </span>
              ))}
            </div>
            <div style={list}>
              {resultCaptureWorkspaceGroups.map((group, index) => (
                <span
                  key={buildProviderScopedKey(
                    "result-capture-workspace-group",
                    index,
                    group.workspaceTarget
                  )}
                  style={pill}
                >
                  {`${group.workspaceTarget}: ${group.contractCount}`}
                </span>
              ))}
            </div>
          </article>
          {representativeResultCaptureContract ? (
            <article style={card}>
              <span style={tag}>Representative contract</span>
              <h3 style={cardTitle}>
                {representativeResultCaptureContract.requestLabel}
              </h3>
              <p style={copy}>
                {`Workspace: ${representativeResultCaptureContract.workspaceTarget}. Capability: ${representativeResultCaptureContract.selectedCapabilityFamily.label}.`}
              </p>
              <p style={copy}>
                {`result persistence state: ${representativeResultCaptureContract.resultPersistenceState}. audit persistence state: ${representativeResultCaptureContract.auditPersistenceState}.`}
              </p>
              <p style={copy}>
                {`approval persistence state: ${representativeResultCaptureContract.approvalPersistenceState}. artifact persistence state: ${representativeResultCaptureContract.artifactPersistenceState}.`}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only envelope</span>
            <h2 style={sectionTitle}>Synthetic result envelope contract</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          result envelope mode: preview-only. result payload posture: static
          placeholder only. result digest posture: deterministic preview digest
          only. no real result. no result persistence. no audit persistence. no
          approval persistence.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Envelope summary</span>
            <h3 style={cardTitle}>No real result. No result persistence.</h3>
            <p style={copy}>{`Envelope count: ${syntheticResultEnvelopes.length}.`}</p>
            <div style={list}>
              <span style={pill}>result envelope mode: preview-only</span>
              <span style={pill}>result payload posture: static placeholder only</span>
              <span style={pill}>result digest posture: deterministic preview digest only</span>
            </div>
          </article>
          {representativeSyntheticResultEnvelope ? (
            <article style={card}>
              <span style={tag}>Representative envelope</span>
              <h3 style={cardTitle}>
                {representativeSyntheticResultEnvelope.requestLabel}
              </h3>
              <p style={copy}>
                {`provider response state: ${representativeSyntheticResultEnvelope.providerResponseState}.`}
              </p>
              <p style={copy}>
                {`model output state: ${representativeSyntheticResultEnvelope.modelOutputState}.`}
              </p>
              <p style={copy}>
                {
                  representativeSyntheticResultEnvelope
                    .explicitNoRealResultNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only request lifecycle</span>
            <h2 style={sectionTitle}>Result capture request/response contract</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          capture request is not created. capture invocation is not invoked.
          capture response is not received. capture error is not received.
          result capture is not captured. persistence target is not
          implemented. no database writes. no file writes.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Contract counts</span>
            <h3 style={cardTitle}>Request / response / error</h3>
            <p style={copy}>
              {`requests: ${resultCaptureRequestContracts.length}. responses: ${resultCaptureResponseContracts.length}. errors: ${resultCaptureErrorContracts.length}.`}
            </p>
          </article>
          {representativeResultCaptureRequest ? (
            <article style={card}>
              <span style={tag}>Representative request</span>
              <h3 style={cardTitle}>
                {representativeResultCaptureRequest.requestLabel}
              </h3>
              <p style={copy}>
                {`capture request state: ${representativeResultCaptureRequest.captureRequestState}.`}
              </p>
              <p style={copy}>
                {`capture invocation state: ${representativeResultCaptureRequest.captureInvocationState}.`}
              </p>
            </article>
          ) : null}
          {representativeResultCaptureResponse ? (
            <article style={card}>
              <span style={tag}>Representative response</span>
              <h3 style={cardTitle}>
                {representativeResultCaptureResponse.requestLabel}
              </h3>
              <p style={copy}>
                {`response state: ${representativeResultCaptureResponse.responseState}.`}
              </p>
              <p style={copy}>
                {`capture decision state: ${representativeResultCaptureResponse.captureDecisionState}.`}
              </p>
            </article>
          ) : null}
          {representativeResultCaptureError ? (
            <article style={card}>
              <span style={tag}>Representative error</span>
              <h3 style={cardTitle}>
                {representativeResultCaptureError.requestLabel}
              </h3>
              <p style={copy}>
                {representativeResultCaptureError.missingSyntheticOutputExample}
              </p>
              <p style={copy}>
                {representativeResultCaptureError.databaseWriteBlockedExample}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only gate schema</span>
            <h2 style={sectionTitle}>Result capture gates</h2>
          </div>
          <span style={sectionBadge}>Preview-only / blocked</span>
        </div>
        <p style={copy}>
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
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Gate summary</span>
            <h3 style={cardTitle}>{`${resultCaptureGateSummary.gateCount} result capture gates`}</h3>
            <p style={copy}>
              {`backend capture contract: ${resultCaptureGateSummary.backendCaptureContractGateCount}. operator: ${resultCaptureGateSummary.operatorGateCount}. safety review: ${resultCaptureGateSummary.safetyReviewGateCount}.`}
            </p>
            <div style={list}>
              {resultCaptureGateSummary.summaryLines.slice(0, 10).map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "result-capture-gates",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
          {resultCaptureGateRecords.map((record) => (
            <article key={record.key} style={card}>
              <span style={tag}>Gate record</span>
              <h3 style={cardTitle}>{record.label}</h3>
              <p style={copy}>{`owner: ${record.owner}.`}</p>
              <p style={copy}>{`current state: ${record.currentState}.`}</p>
              <p style={copy}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Compact readiness matrix</span>
            <h2 style={sectionTitle}>Result capture readiness matrix</h2>
          </div>
          <span style={sectionBadge}>capture-contract-only / not persistent</span>
        </div>
        <p style={copy}>
          capture contract state. result envelope state. capture request
          contract state. capture response contract state. capture error
          contract state. result persistence boundary state. audit persistence
          boundary state. approval persistence boundary state. database
          boundary state. file boundary state. current readiness:
          capture-contract-only / not persistent. next safe action.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Readiness summary</span>
            <h3 style={cardTitle}>
              {resultCaptureReadinessSummary.currentReadiness}
            </h3>
            <p style={copy}>
              {`Readiness records: ${resultCaptureReadinessSummary.readinessRecordCount}.`}
            </p>
            <p style={copy}>{resultCaptureReadinessSummary.nextSafeAction}</p>
          </article>
          {representativeResultCaptureReadiness ? (
            <article style={card}>
              <span style={tag}>Representative readiness</span>
              <h3 style={cardTitle}>
                {representativeResultCaptureReadiness.requestLabel}
              </h3>
              <p style={copy}>
                {`capture contract state: ${representativeResultCaptureReadiness.captureContractState}.`}
              </p>
              <p style={copy}>
                {`result persistence boundary state: ${representativeResultCaptureReadiness.resultPersistenceBoundaryState}.`}
              </p>
              <p style={copy}>
                {`database boundary state: ${representativeResultCaptureReadiness.databaseBoundaryState}. file boundary state: ${representativeResultCaptureReadiness.fileBoundaryState}.`}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only join posture</span>
            <h2 style={sectionTitle}>
              Result capture audit and approval join preview
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          audit join state: not persisted. approval join state: not persisted.
          result reference state: not persisted. no database write. no file
          write.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Join summary</span>
            <h3 style={cardTitle}>Audit and approval joins are not persisted</h3>
            <p style={copy}>
              {`Join previews: ${resultCaptureAuditApprovalJoinPreviews.length}.`}
            </p>
          </article>
          {representativeResultCaptureJoinPreview ? (
            <article style={card}>
              <span style={tag}>Representative join</span>
              <h3 style={cardTitle}>
                {representativeResultCaptureJoinPreview.requestLabel}
              </h3>
              <p style={copy}>
                {representativeResultCaptureJoinPreview.blockedActionSummary}
              </p>
              <p style={copy}>
                {
                  representativeResultCaptureJoinPreview
                    .noDatabaseWriteStatement
                }
              </p>
              <p style={copy}>
                {representativeResultCaptureJoinPreview.noFileWriteStatement}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Backend-owned join contract layer</span>
            <h2 style={sectionTitle}>
              Backend-owned synthetic dry-run audit and approval join contract
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          Athena can preview backend-owned synthetic dry-run audit and approval
          join contracts. Athena can preview backend-owned synthetic dry-run
          audit and approval join review, audit and approval join decision
          review, audit and approval join gate failure review, audit and
          approval join recovery plan, audit and approval join recovery
          readiness, and audit and approval join acceptance posture. audit and
          approval join review is preview-only. audit join state: not
          persisted. approval join state: not persisted. result reference
          state: not persisted. evidence packet state: preview-only. join
          request is not created. join invocation is not invoked. join
          response is not received. join error is not received. database write
          is not implemented. file write is not implemented. No prompt
          sending. No model calls yet. No provider SDKs imported. end-to-end
          packet contract comes next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Contract summary</span>
            <h3 style={cardTitle}>
              {auditApprovalJoinContractSummary.latestCompletedBatch}
            </h3>
            <p style={copy}>
              {`Phase ${auditApprovalJoinContractSummary.highestDetectedPhase}. Previous completed batch: ${auditApprovalJoinContractSummary.previousCompletedBatch}.`}
            </p>
            <div style={list}>
              {auditApprovalJoinContractSummary.summaryLines.slice(0, 12).map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "audit-approval-join-summary",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Coverage</span>
            <h3 style={cardTitle}>Capability and workspace coverage</h3>
            <p style={copy}>
              {`${auditApprovalJoinCapabilityGroups.length} capability families. ${auditApprovalJoinWorkspaceGroups.length} workspace targets.`}
            </p>
            <div style={list}>
              {auditApprovalJoinCapabilityGroups.map((group, index) => (
                <span
                  key={buildProviderScopedKey(
                    "audit-approval-join-capability-group",
                    index,
                    group.capabilityFamilyId
                  )}
                  style={pill}
                >
                  {`${group.capabilityFamilyLabel}: ${group.contractCount}`}
                </span>
              ))}
            </div>
            <div style={list}>
              {auditApprovalJoinWorkspaceGroups.map((group, index) => (
                <span
                  key={buildProviderScopedKey(
                    "audit-approval-join-workspace-group",
                    index,
                    group.workspaceTarget
                  )}
                  style={pill}
                >
                  {`${group.workspaceTarget}: ${group.contractCount}`}
                </span>
              ))}
            </div>
          </article>
          {representativeAuditApprovalJoinContract ? (
            <article style={card}>
              <span style={tag}>Representative contract</span>
              <h3 style={cardTitle}>
                {representativeAuditApprovalJoinContract.requestLabel}
              </h3>
              <p style={copy}>
                {`audit join state: ${representativeAuditApprovalJoinContract.auditJoinState}. approval join state: ${representativeAuditApprovalJoinContract.approvalJoinState}.`}
              </p>
              <p style={copy}>
                {`result reference state: ${representativeAuditApprovalJoinContract.resultReferenceState}. evidence packet posture: ${representativeAuditApprovalJoinContract.evidencePacketPosture}.`}
              </p>
              <p style={copy}>
                {representativeAuditApprovalJoinContract.nextSafeAction}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only audit join</span>
            <h2 style={sectionTitle}>Synthetic audit join contract</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          audit join mode: preview-only. audit reference state: not
          persisted. audit envelope state: not created. audit append state:
          not appended. audit persistence state: not implemented. no audit
          persistence. no database write. no file write.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Audit join summary</span>
            <h3 style={cardTitle}>No audit persistence</h3>
            <p style={copy}>{`Audit joins: ${syntheticAuditJoinContracts.length}.`}</p>
          </article>
          {representativeSyntheticAuditJoinContract ? (
            <article style={card}>
              <span style={tag}>Representative audit join</span>
              <h3 style={cardTitle}>
                {representativeSyntheticAuditJoinContract.requestLabel}
              </h3>
              <p style={copy}>
                {representativeSyntheticAuditJoinContract.failedGateSummary}
              </p>
              <p style={copy}>
                {
                  representativeSyntheticAuditJoinContract
                    .explicitNoAuditJoinNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only approval join</span>
            <h2 style={sectionTitle}>Synthetic approval join contract</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          approval join mode: preview-only. approval reference state: not
          persisted. approval envelope state: not created. approval append
          state: not appended. approval persistence state: not implemented. no
          approval persistence. operator approval required. manual confirmation
          required.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Approval join summary</span>
            <h3 style={cardTitle}>No approval persistence</h3>
            <p style={copy}>{`Approval joins: ${syntheticApprovalJoinContracts.length}.`}</p>
          </article>
          {representativeSyntheticApprovalJoinContract ? (
            <article style={card}>
              <span style={tag}>Representative approval join</span>
              <h3 style={cardTitle}>
                {representativeSyntheticApprovalJoinContract.requestLabel}
              </h3>
              <p style={copy}>
                {
                  representativeSyntheticApprovalJoinContract
                    .approvalBlockerSummary
                }
              </p>
              <p style={copy}>
                {
                  representativeSyntheticApprovalJoinContract
                    .explicitNoApprovalJoinNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only result linkage</span>
            <h2 style={sectionTitle}>
              Result to audit and approval link contract
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          result reference state: not persisted. result id state: not issued.
          result digest posture: deterministic preview digest only. audit link
          state: preview-only / not persisted. approval link state:
          preview-only / not persisted. join consistency state: preview-only.
          no result-audit-approval link persisted.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Link summary</span>
            <h3 style={cardTitle}>No result-audit-approval link persisted</h3>
            <p style={copy}>{`Link contracts: ${resultAuditApprovalLinkContracts.length}.`}</p>
          </article>
          {representativeResultAuditApprovalLinkContract ? (
            <article style={card}>
              <span style={tag}>Representative link</span>
              <h3 style={cardTitle}>
                {representativeResultAuditApprovalLinkContract.requestLabel}
              </h3>
              <p style={copy}>
                {`audit link state: ${representativeResultAuditApprovalLinkContract.auditLinkState}. approval link state: ${representativeResultAuditApprovalLinkContract.approvalLinkState}.`}
              </p>
              <p style={copy}>
                {
                  representativeResultAuditApprovalLinkContract
                    .explicitNoResultAuditApprovalLinkPersistedStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only join lifecycle</span>
            <h2 style={sectionTitle}>
              Audit and approval join request/response contract
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          join request is not created. join invocation is not invoked. join
          response is not received. join error is not received. audit join is
          not persisted. approval join is not persisted. result reference is
          not persisted. no database writes. no file writes.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Contract counts</span>
            <h3 style={cardTitle}>Request / response / error</h3>
            <p style={copy}>
              {`requests: ${auditApprovalJoinRequestContracts.length}. responses: ${auditApprovalJoinResponseContracts.length}. errors: ${auditApprovalJoinErrorContracts.length}.`}
            </p>
          </article>
          {representativeAuditApprovalJoinRequestContract ? (
            <article style={card}>
              <span style={tag}>Representative request</span>
              <h3 style={cardTitle}>
                {representativeAuditApprovalJoinRequestContract.requestLabel}
              </h3>
              <p style={copy}>
                {`join request state: ${representativeAuditApprovalJoinRequestContract.joinRequestState}. join invocation state: ${representativeAuditApprovalJoinRequestContract.joinInvocationState}.`}
              </p>
            </article>
          ) : null}
          {representativeAuditApprovalJoinResponseContract ? (
            <article style={card}>
              <span style={tag}>Representative response</span>
              <h3 style={cardTitle}>
                {representativeAuditApprovalJoinResponseContract.requestLabel}
              </h3>
              <p style={copy}>
                {`response state: ${representativeAuditApprovalJoinResponseContract.responseState}. join decision state: ${representativeAuditApprovalJoinResponseContract.joinDecisionState}.`}
              </p>
            </article>
          ) : null}
          {representativeAuditApprovalJoinErrorContract ? (
            <article style={card}>
              <span style={tag}>Representative error</span>
              <h3 style={cardTitle}>
                {representativeAuditApprovalJoinErrorContract.requestLabel}
              </h3>
              <p style={copy}>
                {
                  representativeAuditApprovalJoinErrorContract
                    .databaseWriteBlockedExample
                }
              </p>
              <p style={copy}>
                {
                  representativeAuditApprovalJoinErrorContract
                    .explicitNoJoinErrorNoRetryNoFallbackStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only gate schema</span>
            <h2 style={sectionTitle}>Audit and approval join gates</h2>
          </div>
          <span style={sectionBadge}>Preview-only / blocked</span>
        </div>
        <p style={copy}>
          audit and approval join gates show the synthetic result envelope,
          result capture review, result capture acceptance posture, audit join
          contract, approval join contract, result-to-audit-approval link
          contract, join lifecycle, operator approval, safety gates, backend
          boundary, and persistence blockers together.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Gate summary</span>
            <h3 style={cardTitle}>{`${auditApprovalJoinGateSummary.gateCount} join gates`}</h3>
            <p style={copy}>
              {`backend join contract: ${auditApprovalJoinGateSummary.backendJoinContractGateCount}. operator: ${auditApprovalJoinGateSummary.operatorGateCount}. safety review: ${auditApprovalJoinGateSummary.safetyReviewGateCount}.`}
            </p>
            <div style={list}>
              {auditApprovalJoinGateSummary.summaryLines.slice(0, 10).map(
                (item, index) => (
                  <span
                    key={buildProviderScopedKey(
                      "audit-approval-join-gates",
                      index,
                      item
                    )}
                    style={pill}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </article>
          {auditApprovalJoinGateRecords.map((record) => (
            <article key={record.key} style={card}>
              <span style={tag}>Gate record</span>
              <h3 style={cardTitle}>{record.label}</h3>
              <p style={copy}>{`owner: ${record.owner}.`}</p>
              <p style={copy}>{`current state: ${record.currentState}.`}</p>
              <p style={copy}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Compact readiness matrix</span>
            <h2 style={sectionTitle}>Audit and approval join readiness matrix</h2>
          </div>
          <span style={sectionBadge}>join-contract-only / not persistent</span>
        </div>
        <p style={copy}>
          join contract state. audit join contract state. approval join
          contract state. result link contract state. join request contract
          state. join response contract state. join error contract state.
          result capture review dependency. result envelope dependency.
          evidence packet dependency. audit persistence boundary state.
          approval persistence boundary state. database boundary state. file
          boundary state. current readiness: join-contract-only / not
          persistent. next safe action.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Readiness summary</span>
            <h3 style={cardTitle}>
              {auditApprovalJoinReadinessSummary.currentReadiness}
            </h3>
            <p style={copy}>
              {`Readiness records: ${auditApprovalJoinReadinessSummary.readinessRecordCount}.`}
            </p>
            <p style={copy}>{auditApprovalJoinReadinessSummary.nextSafeAction}</p>
          </article>
          {representativeAuditApprovalJoinReadiness ? (
            <article style={card}>
              <span style={tag}>Representative readiness</span>
              <h3 style={cardTitle}>
                {representativeAuditApprovalJoinReadiness.requestLabel}
              </h3>
              <p style={copy}>
                {`join contract state: ${representativeAuditApprovalJoinReadiness.joinContractState}.`}
              </p>
              <p style={copy}>
                {`audit persistence boundary state: ${representativeAuditApprovalJoinReadiness.auditPersistenceBoundaryState}. approval persistence boundary state: ${representativeAuditApprovalJoinReadiness.approvalPersistenceBoundaryState}.`}
              </p>
              <p style={copy}>
                {`database boundary state: ${representativeAuditApprovalJoinReadiness.databaseBoundaryState}. file boundary state: ${representativeAuditApprovalJoinReadiness.fileBoundaryState}.`}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only evidence packet</span>
            <h2 style={sectionTitle}>Audit and approval evidence packet preview</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          evidence packet state: preview-only. evidence digest posture:
          deterministic preview digest only. approval evidence state:
          preview-only. audit evidence state: preview-only. result evidence
          state: preview-only. persistence state: not implemented. no evidence
          packet persistence.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Evidence packet summary</span>
            <h3 style={cardTitle}>No evidence packet persistence</h3>
            <p style={copy}>
              {`Evidence packets: ${auditApprovalEvidencePacketPreviews.length}.`}
            </p>
          </article>
          {representativeAuditApprovalEvidencePacket ? (
            <article style={card}>
              <span style={tag}>Representative packet</span>
              <h3 style={cardTitle}>
                {representativeAuditApprovalEvidencePacket.requestLabel}
              </h3>
              <p style={copy}>
                {`result evidence state: ${representativeAuditApprovalEvidencePacket.resultEvidenceState}. blocked action evidence state: ${representativeAuditApprovalEvidencePacket.blockedActionEvidenceState}.`}
              </p>
              <p style={copy}>
                {
                  representativeAuditApprovalEvidencePacket
                    .explicitNoEvidencePacketPersistenceStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only packet contract</span>
            <h2 style={sectionTitle}>
              Backend-owned synthetic dry-run end-to-end packet contract
            </h2>
          </div>
          <span style={sectionBadge}>Draft / preview-only</span>
        </div>
        <p style={copy}>
          end-to-end packet contract is preview-only. packet state: draft /
          preview-only. packet request is not created. packet invocation is
          not invoked. packet response is not received. audit join state: not
          persisted. approval join state: not persisted. end-to-end packet
          review is now preview-only. manual approval handoff contract comes
          next.
        </p>
        {/* Historical smoke marker preserved for prior batch coverage:
            end-to-end packet review and recovery preview comes next. */}
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Packet summary</span>
            <h3 style={cardTitle}>{endToEndPacketSummary.latestCompletedBatch}</h3>
            <p style={copy}>
              {`Packet contracts: ${endToEndPacketSummary.packetContractCount}. stages: ${endToEndPacketSummary.stageContractCount}. lineage: ${endToEndPacketSummary.lineageRecordCount}.`}
            </p>
            <p style={copy}>{endToEndPacketSummary.currentReadiness}</p>
          </article>
          {representativeEndToEndPacketContract ? (
            <article style={card}>
              <span style={tag}>Representative packet</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketContract.requestLabel}
              </h3>
              <p style={copy}>
                {`packet request: ${representativeEndToEndPacketContract.packetRequestState}. packet invocation: ${representativeEndToEndPacketContract.packetInvocationState}.`}
              </p>
              <p style={copy}>
                {`result capture: ${representativeEndToEndPacketContract.resultCaptureState}. evidence packet: ${representativeEndToEndPacketContract.evidencePacketState}.`}
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>Coverage</span>
            <h3 style={cardTitle}>
              {`${endToEndPacketCapabilityGroups.length} capability families`}
            </h3>
            <p style={copy}>
              {endToEndPacketCapabilityGroups
                .map((group) => `${group.capabilityFamilyLabel} (${group.packetCount})`)
                .join(" | ")}
            </p>
            <p style={copy}>
              {endToEndPacketWorkspaceGroups
                .map((group) => `${group.workspaceTarget} (${group.packetCount})`)
                .join(" | ")}
            </p>
          </article>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Stage contract</span>
            <h2 style={sectionTitle}>Synthetic end-to-end stage contract</h2>
          </div>
          <span style={sectionBadge}>Preview-only / blocked</span>
        </div>
        <p style={copy}>
          synthetic end-to-end stage contract records stay typed, inert, and
          preview-only. No stage execution. Preview-only.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Stage coverage</span>
            <h3 style={cardTitle}>{`${endToEndPacketStageRecords.length} stages`}</h3>
            <p style={copy}>
              run intent, approval packet, admission, runner, fixture, result
              envelope, capture, join, evidence, and final packet stages stay
              linked by typed reference only.
            </p>
          </article>
          {representativeEndToEndPacketStageRecords.slice(0, 2).map((record) => (
            <article key={record.key} style={card}>
              <span style={tag}>Representative stage</span>
              <h3 style={cardTitle}>{record.stageLabel}</h3>
              <p style={copy}>{record.requiredEvidence}</p>
              <p style={copy}>{record.currentBlockedReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Static lineage</span>
            <h2 style={sectionTitle}>Synthetic end-to-end lineage</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          lineage mode: preview-only. lineage persistence state: not
          implemented. result reference state: not persisted. audit reference
          state: not persisted. approval reference state: not persisted.
        </p>
        <div style={grid}>
          {representativeEndToEndPacketLineage ? (
            <article style={card}>
              <span style={tag}>Representative lineage</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketLineage.packetContractId}
              </h3>
              <p style={copy}>
                {`run intent: ${representativeEndToEndPacketLineage.runIntentReference}. admission: ${representativeEndToEndPacketLineage.admissionReference}.`}
              </p>
              <p style={copy}>
                {
                  representativeEndToEndPacketLineage
                    .explicitNoLineagePersistenceStatement
                }
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>Lineage count</span>
            <h3 style={cardTitle}>{`${endToEndPacketLineageRecords.length} records`}</h3>
            <p style={copy}>
              evidence packet references stay linked while database and file
              writes remain blocked.
            </p>
          </article>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Request and response posture</span>
            <h2 style={sectionTitle}>
              End-to-end packet request/response contract
            </h2>
          </div>
          <span style={sectionBadge}>Not created / not received</span>
        </div>
        <p style={copy}>
          packet request is not created. packet invocation is not invoked.
          packet response is not received. packet error is not received.
        </p>
        <div style={grid}>
          {representativeEndToEndPacketRequest ? (
            <article style={card}>
              <span style={tag}>Request contract</span>
              <h3 style={cardTitle}>{representativeEndToEndPacketRequest.packetContractId}</h3>
              <p style={copy}>{representativeEndToEndPacketRequest.payloadPosture}</p>
              <p style={copy}>
                {
                  representativeEndToEndPacketRequest
                    .explicitNoPacketRequestCreatedStatement
                }
              </p>
            </article>
          ) : null}
          {representativeEndToEndPacketResponse ? (
            <article style={card}>
              <span style={tag}>Response contract</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketResponse.packetContractId}
              </h3>
              <p style={copy}>
                {`packet acceptance state: ${representativeEndToEndPacketResponse.packetAcceptanceState}.`}
              </p>
              <p style={copy}>
                {
                  representativeEndToEndPacketResponse
                    .explicitNoPacketResponseNoPersistenceStatement
                }
              </p>
            </article>
          ) : null}
          {representativeEndToEndPacketError ? (
            <article style={card}>
              <span style={tag}>Error contract</span>
              <h3 style={cardTitle}>{representativeEndToEndPacketError.packetContractId}</h3>
              <p style={copy}>
                {representativeEndToEndPacketError.missingRunIntentExample}
              </p>
              <p style={copy}>
                {
                  representativeEndToEndPacketError
                    .explicitNoPacketErrorNoRetryNoFallbackStatement
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Blocked gates</span>
            <h2 style={sectionTitle}>End-to-end packet gates</h2>
          </div>
          <span style={sectionBadge}>Preview-only / blocked</span>
        </div>
        <p style={copy}>
          No prompt sending. No model calls yet. No provider SDKs imported.
          queue dispatch is blocked. worker dispatch is blocked. job execution
          is blocked.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Gate summary</span>
            <h3 style={cardTitle}>{`${endToEndPacketGateSummary.gateCount} gates`}</h3>
            <p style={copy}>
              {endToEndPacketGateSummary.summaryLines.slice(0, 8).join(" | ")}
            </p>
          </article>
          {endToEndPacketGateRecords.slice(0, 2).map((record) => (
            <article key={record.key} style={card}>
              <span style={tag}>Representative gate</span>
              <h3 style={cardTitle}>{record.label}</h3>
              <p style={copy}>{record.requiredState}</p>
              <p style={copy}>{record.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Readiness matrix</span>
            <h2 style={sectionTitle}>End-to-end packet readiness matrix</h2>
          </div>
          <span style={sectionBadge}>Not executable / not persistent</span>
        </div>
        <p style={copy}>
          current readiness: end-to-end-packet-contract-only / not executable /
          not persistent.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Readiness summary</span>
            <h3 style={cardTitle}>{endToEndPacketReadinessSummary.currentReadiness}</h3>
            <p style={copy}>
              {`Readiness records: ${endToEndPacketReadinessSummary.readinessRecordCount}.`}
            </p>
            <p style={copy}>{endToEndPacketReadinessSummary.nextSafeAction}</p>
          </article>
          {representativeEndToEndPacketReadiness ? (
            <article style={card}>
              <span style={tag}>Representative readiness</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketReadiness.requestLabel}
              </h3>
              <p style={copy}>
                {`safety: ${representativeEndToEndPacketReadiness.safetyBoundaryState}. privacy: ${representativeEndToEndPacketReadiness.privacyBoundaryState}.`}
              </p>
              <p style={copy}>
                {`database: ${representativeEndToEndPacketReadiness.databaseBoundaryState}. file: ${representativeEndToEndPacketReadiness.fileBoundaryState}.`}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Acceptance posture</span>
            <h2 style={sectionTitle}>End-to-end packet acceptance posture</h2>
          </div>
          <span style={sectionBadge}>Not accepted / preview-only</span>
        </div>
        <p style={copy}>acceptance state: not accepted / preview-only.</p>
        <div style={grid}>
          {representativeEndToEndPacketAcceptancePosture ? (
            <article style={card}>
              <span style={tag}>Representative posture</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketAcceptancePosture.packetContractId}
              </h3>
              <p style={copy}>
                {representativeEndToEndPacketAcceptancePosture.requiredEvidence.join(
                  " | "
                )}
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>Acceptance count</span>
            <h3 style={cardTitle}>
              {`${endToEndPacketAcceptancePostureRecords.length} posture records`}
            </h3>
            <p style={copy}>
              queue/worker/job blockers remain visible while acceptance stays
              preview-only.
            </p>
          </article>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Held packet review</span>
            <h2 style={sectionTitle}>
              Backend-owned synthetic dry-run end-to-end packet review
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only / held</span>
        </div>
        <p style={copy}>
          end-to-end packet review is preview-only. decision state: held / not
          accepted. packet request is not created. packet invocation is not
          invoked. packet response is not received. audit join state: not
          persisted. approval join state: not persisted. manual approval
          handoff contract comes next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Review summary</span>
            <h3 style={cardTitle}>{endToEndPacketReviewSummary.latestCompletedBatch}</h3>
            <p style={copy}>{endToEndPacketReviewSummary.currentReadiness}</p>
          </article>
          {representativeEndToEndPacketReview ? (
            <article style={card}>
              <span style={tag}>Representative review</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketReview.requestLabel}
              </h3>
              <p style={copy}>
                {`decision: ${representativeEndToEndPacketReview.packetDecisionState}. packet state: ${representativeEndToEndPacketReview.packetState}.`}
              </p>
              <p style={copy}>{representativeEndToEndPacketReview.nextSafeAction}</p>
            </article>
          ) : null}
          {representativeEndToEndPacketDecisionReview ? (
            <article style={card}>
              <span style={tag}>End-to-end packet decision review</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketDecisionReview.endToEndPacketReviewId}
              </h3>
              <p style={copy}>
                {representativeEndToEndPacketDecisionReview.packetReasonSummary}
              </p>
            </article>
          ) : null}
          {representativeEndToEndPacketStageFailureReview ? (
            <article style={card}>
              <span style={tag}>End-to-end packet stage failure review</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketStageFailureReview.failedStageLabel}
              </h3>
              <p style={copy}>
                {
                  representativeEndToEndPacketStageFailureReview
                    .operatorFacingExplanation
                }
              </p>
            </article>
          ) : null}
          {representativeEndToEndPacketGateFailureReview ? (
            <article style={card}>
              <span style={tag}>End-to-end packet gate failure review</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketGateFailureReview.failedGateLabel}
              </h3>
              <p style={copy}>
                {representativeEndToEndPacketGateFailureReview.operatorFacingExplanation}
              </p>
            </article>
          ) : null}
          {representativeEndToEndPacketRecoveryPlan ? (
            <article style={card}>
              <span style={tag}>End-to-end packet recovery plan</span>
              <h3 style={cardTitle}>
                {representativeEndToEndPacketRecoveryPlan.endToEndPacketReviewId}
              </h3>
              <p style={copy}>
                {representativeEndToEndPacketRecoveryPlan.operatorActionRequired}
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>End-to-end packet recovery readiness</span>
            <h3 style={cardTitle}>
              {`${blockedEndToEndPacketRecoveryReadinessChecklistRecords.length} blocked checklist records`}
            </h3>
            <p style={copy}>
              {blockedEndToEndPacketRecoveryReadinessChecklistRecords
                .slice(0, 3)
                .map((record) => record.label)
                .join(" | ")}
            </p>
          </article>
          {representativeEndToEndPacketAcceptancePostureReview ? (
            <article style={card}>
              <span style={tag}>End-to-end packet acceptance posture</span>
              <h3 style={cardTitle}>
                {
                  representativeEndToEndPacketAcceptancePostureReview
                    .endToEndPacketReviewId
                }
              </h3>
              <p style={copy}>
                {
                  representativeEndToEndPacketAcceptancePostureReview
                    .acceptanceState
                }
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Held approval review</span>
            <h2 style={sectionTitle}>
              Backend-owned synthetic dry-run manual approval handoff review
            </h2>
          </div>
          <span style={sectionBadge}>Preview-only / held</span>
        </div>
        <p style={copy}>
          manual approval decision contract is preview-only. decision request
          is not created. operator approval state: not requested. manual
          confirmation state: not captured. approval outcome state: not
          decided. manual approval decision review and recovery preview comes
          next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Review summary</span>
            <h3 style={cardTitle}>
              {manualApprovalHandoffReviewSummary.latestCompletedBatch}
            </h3>
            <p style={copy}>{manualApprovalHandoffReviewSummary.currentReadiness}</p>
            <p style={copy}>
              {`Reviews: ${manualApprovalHandoffReviewRecords.length}. Decision reviews: ${manualApprovalHandoffDecisionReviewRecords.length}.`}
            </p>
          </article>
          {representativeManualApprovalHandoffReview ? (
            <article style={card}>
              <span style={tag}>Manual approval handoff decision review</span>
              <h3 style={cardTitle}>
                {representativeManualApprovalHandoffReview.requestLabel}
              </h3>
              <p style={copy}>
                {representativeManualApprovalHandoffDecisionReview?.approvalReasonSummary}
              </p>
            </article>
          ) : null}
          {representativeManualApprovalHandoffGateFailureReview ? (
            <article style={card}>
              <span style={tag}>Manual approval handoff gate failure review</span>
              <h3 style={cardTitle}>
                {representativeManualApprovalHandoffGateFailureReview.failedGateLabel}
              </h3>
              <p style={copy}>
                {
                  representativeManualApprovalHandoffGateFailureReview
                    .operatorFacingExplanation
                }
              </p>
            </article>
          ) : null}
          {representativeManualApprovalHandoffRecoveryPlan ? (
            <article style={card}>
              <span style={tag}>Manual approval handoff recovery plan</span>
              <h3 style={cardTitle}>
                {representativeManualApprovalHandoffRecoveryPlan.handoffReviewId}
              </h3>
              <p style={copy}>
                {
                  representativeManualApprovalHandoffRecoveryPlan
                    .operatorActionRequired
                }
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>Manual approval handoff recovery readiness</span>
            <h3 style={cardTitle}>
              {`${blockedManualApprovalHandoffRecoveryReadinessChecklistRecords.length} blocked checklist records`}
            </h3>
            <p style={copy}>
              {blockedManualApprovalHandoffRecoveryReadinessChecklistRecords
                .slice(0, 3)
                .map((record) => record.label)
                .join(" | ")}
            </p>
          </article>
          {representativeManualApprovalHandoffAcceptancePosture ? (
            <article style={card}>
              <span style={tag}>Manual approval handoff acceptance posture</span>
              <h3 style={cardTitle}>
                {representativeManualApprovalHandoffAcceptancePosture.handoffReviewId}
              </h3>
              <p style={copy}>
                {
                  representativeManualApprovalHandoffAcceptancePosture
                    .acceptanceState
                }
              </p>
            </article>
          ) : null}
          <article style={card}>
            <span style={tag}>Manual approval decision contract</span>
            <h3 style={cardTitle}>What comes next</h3>
            <div style={list}>
              {manualApprovalDecisionContractChecklist.map((item, index) => (
                <span
                  key={buildProviderScopedKey(
                    "manual-approval-decision-contract",
                    index,
                    item
                  )}
                  style={pill}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section style={notice}>
        <p>{`${endToEndPacketStageFailureSummary.topFailedStageLabels.length} stage labels remain held across the preview-only review layer.`}</p>
        <p>{`${endToEndPacketReviewGateFailureSummary.topFailedGateLabels.length} gate labels remain blocked across the preview-only review layer.`}</p>
        {manualApprovalHandoffContractChecklist.map((item, index) => (
          <p
            key={buildProviderScopedKey(
              "end-to-end-packet-next-review",
              index,
              item
            )}
          >
            {item}
          </p>
        ))}
      </section>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, color: "#f8fafc", minWidth: 0 };
const hero: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.22)",
  background: "rgba(15,23,42,0.72)",
  borderRadius: 8,
  padding: 18,
};
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1, margin: "8px 0", letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { maxWidth: 780, color: "rgba(226,232,240,0.76)", lineHeight: 1.55, margin: 0, fontSize: 14 };
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" };
const link: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  padding: "9px 11px",
  fontSize: 12,
  fontWeight: 900,
  textDecoration: "none",
};
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const metricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 10 };
const metric: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148,163,184,0.16)",
  borderRadius: 8,
  padding: 12,
  background: "rgba(15,23,42,0.62)",
  display: "grid",
  gap: 4,
};
const section: CSSProperties = { display: "grid", gap: 12 };
const sectionHeader: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const sectionTitle: CSSProperties = { margin: "8px 0 0", fontSize: 24, letterSpacing: 0 };
const sectionBadge: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125,211,252,0.22)",
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 11,
  fontWeight: 900,
  color: "#dbeafe",
};
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 };
const card: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148,163,184,0.16)",
  borderRadius: 8,
  background: "rgba(2,6,23,0.68)",
  padding: 14,
  display: "grid",
  gap: 8,
};
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const list: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const pill: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.18)",
  borderRadius: 999,
  padding: "4px 8px",
  fontSize: 11,
  color: "#ccfbf1",
};
const notice: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.16)",
  borderRadius: 8,
  padding: 12,
  background: "rgba(20,83,45,0.16)",
  color: "#dcfce7",
  fontSize: 13,
};
