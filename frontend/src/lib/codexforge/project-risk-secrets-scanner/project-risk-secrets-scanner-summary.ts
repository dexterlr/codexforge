import type {
  ProjectRiskSecretsScan,
  ProjectRiskSecretsScannerBoundary,
  ProjectRiskSecretsScannerModel,
} from "./project-risk-secrets-scanner-types";
import { buildProjectRiskSecretsScannerStableKey } from "./project-risk-secrets-scanner-types";

export const PROJECT_RISK_SECRETS_SCANNER_LANGUAGE = [
  "Project risk secrets scanner",
  "Suspected secrets are redacted",
  "Scanning remains behind approved local boundary",
  "Arbitrary local scanning is not allowed",
  "Do not display secret values",
  "Recommended action",
] as const;

export function buildProjectRiskSecretsScan(
  input: Omit<ProjectRiskSecretsScan, "id"> & { idHint: string }
): ProjectRiskSecretsScan {
  const { idHint, ...scan } = input;
  return {
    id: buildProjectRiskSecretsScannerStableKey(
      "project-risk-secrets-scanner",
      idHint,
      input.status,
      input.severity
    ),
    ...scan,
  };
}

export function buildProjectRiskSecretsScans(): ProjectRiskSecretsScan[] {
  return [
    buildProjectRiskSecretsScan({
      idHint: "redacted-metadata-review",
      status: "redacted-preview",
      severity: "high",
      scanScopeSummary:
        "Scan scope summary: approved indexed workspace metadata only, scoped to trusted project paths and safety categories after local-boundary approval.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: workspace trust, allowed roots, and the safe local project indexer must be reviewed first.",
      riskCategories:
        "Risk categories: suspected secret indicator, risky file path, generated output, command-heavy area, provider-facing config, and stale dependency metadata.",
      suspectedSecretIndicator:
        "Suspected secret indicator: redacted marker only; suspected secrets are redacted and values are never displayed.",
      redactionStatus:
        "Redaction status: redacted before review. Do not display secret values.",
      recommendedAction:
        "Recommended action: review the redacted indicator, confirm scope, then route any future file action through /local-file-approval.",
      approvalRoute:
        "Approval route: /local-file-approval for file actions and /local-command-approval for any future command-based verification.",
      auditNote:
        "Audit note: record scan scope summary, trusted workspace dependency, risk category, redaction status, severity, recommended action, approval route, and blocked reasons without secret values.",
      blockedReasons: [
        "Suspected secrets are redacted",
        "Scanning remains behind approved local boundary",
        "Arbitrary local scanning is not allowed",
      ],
      advancedFindingDetails:
        "Advanced findings: secondary redacted metadata only. This page does not scan arbitrary files, browse local paths, mutate files, delete files, execute commands, call providers, send findings to providers automatically, or install packages.",
    }),
    buildProjectRiskSecretsScan({
      idHint: "scan-boundary-blocked",
      status: "blocked",
      severity: "blocked",
      scanScopeSummary:
        "Scan scope summary: blocked when approved indexed workspace metadata or trust scope is missing.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: blocked until the approved local boundary confirms the workspace.",
      riskCategories:
        "Risk categories: unavailable while the scan boundary is blocked.",
      suspectedSecretIndicator:
        "Suspected secret indicator: unavailable and redacted; no secret value is read or displayed.",
      redactionStatus:
        "Redaction status: blocked and redacted by default. Do not display secret values.",
      recommendedAction:
        "Recommended action: review workspace trust and safe project indexer readiness before any risk scan request.",
      approvalRoute:
        "Approval route: /workspace-trust-policy and /safe-project-indexer must be reviewed first.",
      auditNote:
        "Audit note: record blocked readiness without file content, command output, provider calls, or secret values.",
      blockedReasons: [
        "Approved local boundary required",
        "No approved indexed workspace data",
        "Arbitrary local scanning is not allowed",
      ],
      advancedFindingDetails:
        "Advanced findings: blocked state remains redacted and cannot expose suspected secret values.",
    }),
  ];
}

export function buildProjectRiskSecretsScannerBoundary(): ProjectRiskSecretsScannerBoundary {
  return {
    scanningBehindApprovedLocalBoundary: true,
    arbitraryLocalScanningAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    suspectedSecretsRedacted: true,
    secretValuesDisplayedAllowed: false,
    localActionsWithoutReviewAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProjectRiskSecretsScanner(
  model: Pick<ProjectRiskSecretsScannerModel, "scans">
): string {
  return `Project risk secrets scanner prepares ${model.scans.length} redacted risk review shape(s). Suspected secrets are redacted, scanning remains behind approved local boundary, arbitrary local scanning is not allowed, and findings are not sent to providers automatically.`;
}

export function buildProjectRiskSecretsScannerModel(): ProjectRiskSecretsScannerModel {
  const scans = buildProjectRiskSecretsScans();
  const model: ProjectRiskSecretsScannerModel = {
    title: "Project risk secrets scanner",
    summary: "",
    scans,
    boundary: buildProjectRiskSecretsScannerBoundary(),
    scannerLanguage: [...PROJECT_RISK_SECRETS_SCANNER_LANGUAGE],
    advancedDetails: [
      "Project risk secrets scanner",
      "Suspected secrets are redacted",
      "Scanning remains behind approved local boundary",
      "Arbitrary local scanning is not allowed",
      "Do not display secret values",
      "Scan scope summary",
      "Trusted workspace dependency",
      "Risk categories",
      "Suspected secret indicator",
      "Redaction status",
      "Severity",
      "Recommended action",
      "Approval route",
      "Audit note",
      "Blocked reasons",
      "Approved local boundary required",
      "No automatic provider send",
    ],
  };
  return { ...model, summary: summarizeProjectRiskSecretsScanner(model) };
}
