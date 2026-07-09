import {
  buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview,
  buildStaticResultCaptureAuditEnvelopeApprovalJoinPreview,
  buildStaticJarvisVideoServerOnlyRunnerSyntheticDryRunPreview,
} from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/server";
import JarvisVideoWorkspacePageClient from "./page-client";

export default function JarvisVideoWorkspacePage() {
  const resultCaptureAuditApprovalJoinPreview =
    buildStaticResultCaptureAuditEnvelopeApprovalJoinPreview();
  const backendDryRunAdmissionPreview =
    buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview();
  const serverOnlySyntheticDryRunPreview =
    buildStaticJarvisVideoServerOnlyRunnerSyntheticDryRunPreview();

  return (
    <JarvisVideoWorkspacePageClient
      resultCaptureAuditApprovalJoinPreview={
        resultCaptureAuditApprovalJoinPreview
      }
      backendDryRunAdmissionPreview={backendDryRunAdmissionPreview}
      serverOnlySyntheticDryRunPreview={serverOnlySyntheticDryRunPreview}
    />
  );
}
