import {
  buildStaticJarvisVideoFirstGatedProviderExecutionTrialRuntimePreview,
  buildStaticJarvisVideoFirstGatedProviderExecutionTrialPreparationPreview,
  buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview,
  buildStaticJarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview,
  buildStaticJarvisVideoFirstRealProviderAdapterWiringPreview,
  buildStaticJarvisVideoFirstProviderTrialResultReviewRecoveryPreview,
  buildStaticResultCaptureAuditEnvelopeApprovalJoinPreview,
  buildStaticJarvisVideoServerOnlyRunnerSyntheticDryRunPreview,
} from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/server";
import JarvisVideoWorkspacePageClient from "./page-client";

export default function JarvisVideoWorkspacePage() {
  const firstGatedProviderTrialRuntimePreview =
    buildStaticJarvisVideoFirstGatedProviderExecutionTrialRuntimePreview();
  const firstGatedProviderTrialPreparationPreview =
    buildStaticJarvisVideoFirstGatedProviderExecutionTrialPreparationPreview();
  const firstManualProviderTrialResultCaptureUxReviewPreview =
    buildStaticJarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview();
  const firstRealProviderAdapterWiringPreview =
    buildStaticJarvisVideoFirstRealProviderAdapterWiringPreview();
  const firstProviderTrialResultReviewRecoveryPreview =
    buildStaticJarvisVideoFirstProviderTrialResultReviewRecoveryPreview();
  const resultCaptureAuditApprovalJoinPreview =
    buildStaticResultCaptureAuditEnvelopeApprovalJoinPreview();
  const backendDryRunAdmissionPreview =
    buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview();
  const serverOnlySyntheticDryRunPreview =
    buildStaticJarvisVideoServerOnlyRunnerSyntheticDryRunPreview();

  return (
    <JarvisVideoWorkspacePageClient
      firstGatedProviderTrialRuntimePreview={
        firstGatedProviderTrialRuntimePreview
      }
      firstGatedProviderTrialPreparationPreview={
        firstGatedProviderTrialPreparationPreview
      }
      firstManualProviderTrialResultCaptureUxReviewPreview={
        firstManualProviderTrialResultCaptureUxReviewPreview
      }
      firstRealProviderAdapterWiringPreview={
        firstRealProviderAdapterWiringPreview
      }
      firstProviderTrialResultReviewRecoveryPreview={
        firstProviderTrialResultReviewRecoveryPreview
      }
      resultCaptureAuditApprovalJoinPreview={
        resultCaptureAuditApprovalJoinPreview
      }
      backendDryRunAdmissionPreview={backendDryRunAdmissionPreview}
      serverOnlySyntheticDryRunPreview={serverOnlySyntheticDryRunPreview}
    />
  );
}
