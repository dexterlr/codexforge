import type {
  ProjectRiskSecretsScanLiveTrial,
  ProjectRiskSecretsScanLiveTrialBoundary,
  ProjectRiskSecretsScanLiveTrialModel,
} from "./project-risk-secrets-scan-live-trial-types";
import { buildProjectRiskSecretsScanLiveTrialStableKey } from "./project-risk-secrets-scan-live-trial-types";

export const PROJECT_RISK_SECRETS_SCAN_LIVE_TRIAL_LANGUAGE = [
  "Project risk secrets scan live trial",
  "Suspected secrets are redacted",
  "Arbitrary local scanning is not allowed",
  "Findings are not sent to providers automatically",
  "Severity summary",
  "Recommended action",
] as const;

export function buildProjectRiskSecretsScanLiveTrial(
  input: Omit<ProjectRiskSecretsScanLiveTrial, "id"> & { idHint: string }
): ProjectRiskSecretsScanLiveTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildProjectRiskSecretsScanLiveTrialStableKey(
      "project-risk-secrets-scan-live-trial",
      idHint,
      input.status,
      input.severity
    ),
    ...trial,
  };
}

export function buildProjectRiskSecretsScanLiveTrials(): ProjectRiskSecretsScanLiveTrial[] {
  return [
    buildProjectRiskSecretsScanLiveTrial({
      idHint: "redacted-bounded-findings",
      status: "redacted-preview",
      severity: "high",
      scanTrialIdentity:
        "Scan trial identity: project-risk-secrets-scan-live-trial-redacted-findings, a reviewed readiness shape for bounded risk and suspected secret review.",
      sourceTrialSummary:
        "Source index/search/dependency trial: /project-indexer-live-trial, /project-search-live-trial, and /project-dependency-live-trial provide approved bounded workspace data before scan findings are reviewed.",
      approvedScanScope:
        "Approved scan scope: scan remains behind approved bounded workspace data from the trusted canonical frontend; arbitrary local scanning is not allowed.",
      riskCategories:
        "Risk categories: suspected secret indicator, risky file path, provider-facing configuration, generated output, command-heavy area, stale dependency metadata, and review-blocked local boundary.",
      suspectedSecretIndicator:
        "Suspected secret indicator: redacted marker only; suspected secrets are redacted and secret values are never displayed.",
      redactionStatus:
        "Redaction status: secret values are redacted before review and remain hidden in advanced findings.",
      severitySummary:
        "Severity summary: high attention when a suspected secret indicator, provider-facing configuration, or stale dependency metadata appears in approved bounded metadata.",
      recommendedAction:
        "Recommended action: review the redacted indicator, confirm scope, route any future file preview through /jarvisd-file-preview-bridge, and keep file or command action behind approval.",
      resultReviewRoute:
        "Result review route: /review-inbox receives redacted risk summaries for operator review, not secret values or raw file content.",
      auditHandoff:
        "Audit handoff: record scan trial identity, source trial summary, approved scan scope, risk categories, redaction status, severity summary, recommended action, result review route, and blocked reasons without calling appendEvent from UI.",
      blockedReasons: [
        "Suspected secrets are redacted",
        "Arbitrary local scanning is not allowed",
        "Findings are not sent to providers automatically",
      ],
      advancedFindingDetails:
        "Advanced findings: collapsed redacted metadata only. This page does not display secret values, browse arbitrary files, scan arbitrary local paths, mutate files, write files, delete files, execute commands, run tests, run git commands, call Jarvisd directly, send findings to providers automatically, call provider APIs, call GitHub APIs, apply patches, or install packages.",
    }),
    buildProjectRiskSecretsScanLiveTrial({
      idHint: "scan-boundary-blocked",
      status: "blocked",
      severity: "blocked",
      scanTrialIdentity:
        "Scan trial identity: project-risk-secrets-scan-live-trial-blocked-boundary.",
      sourceTrialSummary:
        "Source index/search/dependency trial: blocked until approved bounded workspace data exists.",
      approvedScanScope:
        "Approved scan scope: unavailable; arbitrary local scanning is not allowed.",
      riskCategories:
        "Risk categories: unavailable while the bounded scan scope is blocked.",
      suspectedSecretIndicator:
        "Suspected secret indicator: unavailable and redacted; no secret value is read or displayed.",
      redactionStatus:
        "Redaction status: blocked and redacted by default.",
      severitySummary:
        "Severity summary: blocked because the scan boundary is not approved.",
      recommendedAction:
        "Recommended action: review workspace trust, project indexer live trial, search live trial, and dependency live trial before risk scan review.",
      resultReviewRoute:
        "Result review route: /review-inbox remains the review destination once redacted findings exist.",
      auditHandoff:
        "Audit handoff: preserve blocked readiness as review copy only; the UI does not mutate audit logs.",
      blockedReasons: [
        "Approved bounded workspace data missing",
        "Arbitrary local scanning is not allowed",
        "Suspected secrets are redacted",
      ],
      advancedFindingDetails:
        "Advanced findings: blocked state remains redacted and cannot expose suspected secret values.",
    }),
  ];
}

export function buildProjectRiskSecretsScanLiveTrialBoundary(): ProjectRiskSecretsScanLiveTrialBoundary {
  return {
    approvedBoundedWorkspaceDataRequired: true,
    sourceIndexSearchDependencyRequired: true,
    arbitraryLocalScanningAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    suspectedSecretsRedacted: true,
    secretValuesDisplayedAllowed: false,
    findingsSentToProvidersAutomaticallyAllowed: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProjectRiskSecretsScanLiveTrial(
  model: Pick<ProjectRiskSecretsScanLiveTrialModel, "trials">
): string {
  return `Project risk secrets scan live trial prepares ${model.trials.length} redacted risk review shape(s). Suspected secrets are redacted, scan remains behind approved bounded workspace data, arbitrary local scanning is not allowed, and findings are not sent to providers automatically.`;
}

export function buildProjectRiskSecretsScanLiveTrialModel(): ProjectRiskSecretsScanLiveTrialModel {
  const trials = buildProjectRiskSecretsScanLiveTrials();
  const model: ProjectRiskSecretsScanLiveTrialModel = {
    title: "Project risk secrets scan live trial",
    summary: "",
    trials,
    boundary: buildProjectRiskSecretsScanLiveTrialBoundary(),
    trialLanguage: [...PROJECT_RISK_SECRETS_SCAN_LIVE_TRIAL_LANGUAGE],
    advancedDetails: [
      "Project risk secrets scan live trial",
      "Suspected secrets are redacted",
      "Arbitrary local scanning is not allowed",
      "Findings are not sent to providers automatically",
      "Scan trial identity",
      "Source index/search/dependency trial",
      "Approved scan scope",
      "Risk categories",
      "Suspected secret indicator",
      "Redaction status",
      "Severity summary",
      "Recommended action",
      "Result review route",
      "Audit handoff",
      "Blocked reasons",
      "Scan remains behind approved bounded workspace data",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectRiskSecretsScanLiveTrial(model) };
}
