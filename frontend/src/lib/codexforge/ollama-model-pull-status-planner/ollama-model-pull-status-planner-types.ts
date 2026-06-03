export type OllamaPullReadiness = "manual-ready" | "approved-daemon-required" | "blocked";
export type OllamaStatusCheckReadiness = "manual-only" | "approved-local-boundary-required" | "blocked";

export type OllamaModelPullStatusPlan = {
  id: string;
  requestedModel: string;
  localRuntimeTarget: "Ollama local runtime";
  pullReadiness: OllamaPullReadiness;
  statusCheckReadiness: OllamaStatusCheckReadiness;
  diskVramNote: string;
  networkDownloadApprovalNote: string;
  manualCommandHandoff: string;
  localOnlyRuntimeNote: string;
  cancelRetryGuidance: string;
  secretPosture: "no secrets";
};

export type OllamaModelPullStatusBoundary = {
  localOnly: true;
  modelPullsManual: true;
  futureApprovedLocalDaemonOnly: true;
  livePullButtonAllowed: false;
  ollamaApiCallsAllowed: false;
  downloadsAllowed: false;
  shellCommandsAllowed: false;
  credentialsStored: false;
  liveStatusClaimAllowed: false;
};

export type OllamaModelPullStatusPlannerModel = {
  title: "Ollama model pull and status planner";
  summary: string;
  plans: OllamaModelPullStatusPlan[];
  boundary: OllamaModelPullStatusBoundary;
  advancedDetails: string[];
};

export function buildOllamaModelPlannerStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
