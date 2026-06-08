import type {
  ProviderGovernanceMvpAudit,
  ProviderGovernanceMvpAuditBoundary,
  ProviderGovernanceMvpAuditModel,
} from "./provider-governance-mvp-audit-types";
import { buildProviderGovernanceMvpAuditStableKey } from "./provider-governance-mvp-audit-types";

export const PROVIDER_GOVERNANCE_MVP_AUDIT_LANGUAGE = [
  "Provider governance MVP audit",
  "Governance audit does not enable live routing",
  "Provider policy changes require explicit review",
  "Secrets are not inspected or displayed",
  "Audit decision",
  "Known gaps",
] as const;

export function buildProviderGovernanceMvpAudit(
  input: Omit<ProviderGovernanceMvpAudit, "id"> & { idHint: string }
): ProviderGovernanceMvpAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildProviderGovernanceMvpAuditStableKey(
      "provider-governance-mvp-audit",
      idHint,
      input.auditDecision
    ),
    ...audit,
  };
}

export function buildProviderGovernanceMvpAudits(): ProviderGovernanceMvpAudit[] {
  return [
    buildProviderGovernanceMvpAudit({
      idHint: "mvp-ready-with-fixes",
      auditIdentity:
        "Audit identity: provider-governance-mvp-audit-ready-with-fixes, a review of provider safety, testing, persistence, routing, retry, cost, privacy, and bundle surfaces.",
      coveredProviderSurfaces: [
        "Provider live test runner boundary",
        "Provider live test gate",
        "Provider test result persistence",
        "Provider cost latency result calibration",
        "Router recommendation apply review",
        "Provider failure retry trial",
        "Prompt privacy classifier",
        "Provider policy bundle export review",
      ],
      liveTestBoundaryReadiness:
        "Live-test boundary readiness: ready for review because live tests remain behind explicit approval and no provider API call runs here.",
      testResultPersistenceReadiness:
        "Test result persistence readiness: ready for review because results stay redacted, compact, and secondary before router or policy use.",
      costLatencyCalibrationReadiness:
        "Cost/latency calibration readiness: ready with advisory estimates, reliability signals, and blocked reasons, not billing truth.",
      routerRecommendationReadiness:
        "Router recommendation readiness: ready with fixes because apply review is approval-gated and never auto-routes live provider traffic.",
      retrySafetyReadiness:
        "Retry safety readiness: ready with fixes because retry is never automatic and token spend requires explicit approval.",
      privacyPolicyReadiness:
        "Privacy/policy readiness: ready for review because secrets are not inspected or displayed and provider policy changes require explicit review.",
      knownGaps: [
        "Future approved live test execution remains outside this audit",
        "Future router apply boundary remains separate",
        "Future provider registry writes remain separate and approval-gated",
      ],
      auditDecision: "ready with fixes",
      auditDecisionLabel:
        "Audit decision: ready with fixes for MVP review after smoke scripts pass and live execution remains separately approval-gated.",
      nextRecommendedRoute:
        "Next recommended route: /provider-policy-bundle-export-review for a non-secret policy bundle handoff review.",
      advancedAuditDetails:
        "Advanced audit details: this audit does not call provider APIs, retry provider requests, send prompts or files, inspect or display secrets, auto-spend tokens, auto-route live provider traffic, mutate provider registry silently, export secrets, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderGovernanceMvpAudit({
      idHint: "blocked-live-routing",
      auditIdentity:
        "Audit identity: provider-governance-mvp-audit-blocked-live-routing.",
      coveredProviderSurfaces: [
        "Live routing",
        "Provider registry apply",
        "Provider retry execution",
        "Policy bundle export use",
      ],
      liveTestBoundaryReadiness:
        "Live-test boundary readiness: blocked for automatic live execution from this audit page.",
      testResultPersistenceReadiness:
        "Test result persistence readiness: blocked until reviewed result evidence exists for the requested provider/model.",
      costLatencyCalibrationReadiness:
        "Cost/latency calibration readiness: blocked until reviewed metrics exist and are understood as advisory.",
      routerRecommendationReadiness:
        "Router recommendation readiness: blocked if a request expects automatic router apply or silent provider registry mutation.",
      retrySafetyReadiness:
        "Retry safety readiness: blocked if a request expects automatic retry or token spend without approval.",
      privacyPolicyReadiness:
        "Privacy/policy readiness: blocked if raw secrets, credentials, prompts, or file contents must be inspected or displayed.",
      knownGaps: [
        "No automatic live routing in this audit",
        "No automatic provider retry in this audit",
        "No secret inspection in this audit",
      ],
      auditDecision: "blocked",
      auditDecisionLabel:
        "Audit decision: blocked for automatic provider execution, router apply, registry mutation, or secret inspection.",
      nextRecommendedRoute:
        "Next recommended route: /provider-live-test-gate or /provider-failure-retry-trial after the blocked reason is reviewed.",
      advancedAuditDetails:
        "Advanced audit details: blocked audit items remain read-only and do not enable provider policy, routing, retry, registry, file, command, or Brain graph changes.",
    }),
  ];
}

export function buildProviderGovernanceMvpAuditBoundary(): ProviderGovernanceMvpAuditBoundary {
  return {
    governanceAuditEnablesLiveRoutingAllowed: false,
    providerPolicyAutoChangeAllowed: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    secretsInspectionAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    rawFetchAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProviderGovernanceMvpAudit(
  model: Pick<ProviderGovernanceMvpAuditModel, "audits">
): string {
  return `Provider governance MVP audit reviews ${model.audits.length} MVP readiness decision(s). Governance audit does not enable live routing, provider policy changes require explicit review, and secrets are not inspected or displayed.`;
}

export function buildProviderGovernanceMvpAuditModel(): ProviderGovernanceMvpAuditModel {
  const audits = buildProviderGovernanceMvpAudits();
  const model: ProviderGovernanceMvpAuditModel = {
    title: "Provider governance MVP audit",
    summary: "",
    audits,
    boundary: buildProviderGovernanceMvpAuditBoundary(),
    auditLanguage: [...PROVIDER_GOVERNANCE_MVP_AUDIT_LANGUAGE],
    advancedDetails: [
      "Provider governance MVP audit",
      "Governance audit does not enable live routing",
      "Provider policy changes require explicit review",
      "Secrets are not inspected or displayed",
      "Audit identity",
      "Covered provider surfaces",
      "Live-test boundary readiness",
      "Test result persistence readiness",
      "Cost/latency calibration readiness",
      "Router recommendation readiness",
      "Retry safety readiness",
      "Privacy/policy readiness",
      "Known gaps",
      "Audit decision",
      "Next recommended route",
      "Advanced audit details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderGovernanceMvpAudit(model) };
}
