export type EndToEndDailyBetaOperatorHandoffStatus = "ready-for-review" | "blocked";

export type EndToEndDailyBetaOperatorHandoff = {
  id: string;
  endToEndDailyBetaOperatorHandoffIdentity: string;
  handoffGroups: string[];
  operatorRunbookSummary: string[];
  approvalBoundarySummary: string[];
  liveBoundaryLimitationSummary: string[];
  rolloutLimitationSummary: string[];
  validationChecklist: string[];
  deniedHandoffActions: string[];
  unresolvedHandoffBlockers: string[];
  dailyBetaCandidateRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: EndToEndDailyBetaOperatorHandoffStatus;
  advancedEndToEndDailyBetaOperatorHandoffDetails: string;
};

export type EndToEndDailyBetaOperatorHandoffBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  handoffSendAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndDailyBetaOperatorHandoffModel = {
  title: "End-to-end Daily Beta operator handoff";
  summary: string;
  handoffs: EndToEndDailyBetaOperatorHandoff[];
  boundary: EndToEndDailyBetaOperatorHandoffBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndDailyBetaOperatorHandoffStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
