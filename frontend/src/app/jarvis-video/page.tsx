import { buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview } from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/server";
import JarvisVideoWorkspacePageClient from "./page-client";

export default function JarvisVideoWorkspacePage() {
  const backendDryRunAdmissionPreview =
    buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview();

  return (
    <JarvisVideoWorkspacePageClient
      backendDryRunAdmissionPreview={backendDryRunAdmissionPreview}
    />
  );
}
