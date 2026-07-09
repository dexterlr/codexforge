import {
  buildStaticJarvisVideoFirstGatedProviderExecutionTrialRuntimePreview,
  buildStaticJarvisVideoFirstGatedProviderExecutionTrialPreparationPreview,
  buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview,
  buildStaticResultCaptureAuditEnvelopeApprovalJoinPreview,
  buildStaticJarvisVideoServerOnlyRunnerSyntheticDryRunPreview,
} from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/server";
import JarvisVideoWorkspacePageClient from "./page-client";

export default function JarvisVideoWorkspacePage() {
  const firstGatedProviderTrialRuntimePreview =
    buildStaticJarvisVideoFirstGatedProviderExecutionTrialRuntimePreview();
  const firstGatedProviderTrialPreparationPreview =
    buildStaticJarvisVideoFirstGatedProviderExecutionTrialPreparationPreview();
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
      resultCaptureAuditApprovalJoinPreview={
        resultCaptureAuditApprovalJoinPreview
      }
      backendDryRunAdmissionPreview={backendDryRunAdmissionPreview}
      serverOnlySyntheticDryRunPreview={serverOnlySyntheticDryRunPreview}
    />
  );
}
