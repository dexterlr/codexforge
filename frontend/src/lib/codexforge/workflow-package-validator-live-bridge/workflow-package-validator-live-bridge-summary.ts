import { buildComfyUiMetadataLiveBridgeModel } from "@/lib/codexforge/comfyui-metadata-live-bridge";
import { buildRealWorkflowPackageValidatorSummary } from "@/lib/codexforge/real-workflow-package-validator";
import type {
  WorkflowPackageValidatorLiveBridge,
  WorkflowPackageValidatorLiveBridgeBoundary,
  WorkflowPackageValidatorLiveBridgeModel,
} from "./workflow-package-validator-live-bridge-types";
import { buildWorkflowPackageValidatorLiveBridgeStableKey } from "./workflow-package-validator-live-bridge-types";

export const WORKFLOW_PACKAGE_VALIDATOR_LIVE_BRIDGE_LANGUAGE = [
  "Workflow package validator live bridge",
  "Workflow validation does not mutate files",
  "Validation does not submit ComfyUI jobs",
  "Suspected secrets are redacted",
  "Missing dependency summary",
  "Submit trial route",
] as const;

export function buildWorkflowPackageValidatorLiveBridge(
  input: Omit<WorkflowPackageValidatorLiveBridge, "id"> & { idHint: string }
): WorkflowPackageValidatorLiveBridge {
  const { idHint, ...validator } = input;
  return {
    id: buildWorkflowPackageValidatorLiveBridgeStableKey(
      "workflow-package-validator-live-bridge",
      idHint,
      input.status
    ),
    ...validator,
  };
}

export function buildWorkflowPackageValidatorLiveBridges(): WorkflowPackageValidatorLiveBridge[] {
  const metadataBridge = buildComfyUiMetadataLiveBridgeModel();
  const validator = buildRealWorkflowPackageValidatorSummary();
  const blockedChecks = validator.checks.filter((check) => check.blocksSubmit);

  return [
    buildWorkflowPackageValidatorLiveBridge({
      idHint: "prepared-package-validation-review",
      status:
        validator.decision.state === "ready"
          ? "ready-for-submit-trial-review"
          : blockedChecks.length > 0
            ? "needs-review"
            : "blocked",
      validatorIdentity:
        "Validator identity: workflow-package-validator-live-bridge-prepared-package, a live bridge review surface for future approved workflow package validation results.",
      sourceMetadataBridge:
        `Source metadata bridge: ${metadataBridge.summary} Node and model risk must be visible before validation hands off to submit review.`,
      workflowPackageSummary:
        `Workflow package summary: ${validator.summary} The package is summarized as a prepared contract, not browsed from arbitrary local files.`,
      requiredNodeModelSummary:
        "Required node/model summary: required custom nodes, model checkpoints, LoRAs, VAEs, and unknowns stay in compact plain-English summary form.",
      missingDependencySummary:
        `Missing dependency summary: ${blockedChecks.length} validation check(s) need review before submit trial handoff.`,
      compatibilityStatus:
        `Compatibility status: ${validator.decision.state}; ${validator.decision.explanation}`,
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: suspected secrets are redacted, full local paths stay secondary, and no secret values are displayed.",
      submitTrialRoute:
        "Submit trial route: /approved-comfyui-submit-trial-bridge for explicit final approval review.",
      recoveryRoute:
        "Recovery route: /missing-model-node-resolver for missing nodes, models, and unknown dependency review before retry.",
      blockedReasons: [
        "Workflow validation does not mutate files",
        "Validation does not submit ComfyUI jobs",
        "Suspected secrets are redacted",
      ],
      advancedValidationDetails:
        "Advanced validation details: this validator bridge does not mutate files, submit ComfyUI jobs, browse arbitrary local files, expose secrets, call local endpoints from UI, create raw polling loops, execute commands, run tests, call provider APIs, send prompts or files, spend tokens, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildWorkflowPackageValidatorLiveBridge({
      idHint: "blocked-unsafe-package-handoff",
      status: "blocked",
      validatorIdentity:
        "Validator identity: workflow-package-validator-live-bridge-blocked-unsafe-handoff.",
      sourceMetadataBridge:
        "Source metadata bridge: blocked when metadata readiness is missing, stale, unredacted, or not approved through the local boundary.",
      workflowPackageSummary:
        "Workflow package summary: blocked if a package is not prepared, not local-only, lacks approval copy, or depends on arbitrary local file browsing.",
      requiredNodeModelSummary:
        "Required node/model summary: blocked if required nodes, models, or unknowns cannot be summarized safely before submit review.",
      missingDependencySummary:
        "Missing dependency summary: blocked dependencies route to recovery before any submit trial review.",
      compatibilityStatus:
        "Compatibility status: blocked until unsafe target, missing dependency, secret risk, and approval-copy gaps are reviewed.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: blocked if suspected secret values, endpoint values, or full local paths would be exposed.",
      submitTrialRoute:
        "Submit trial route: /approved-comfyui-submit-trial-bridge remains blocked until validation is safe.",
      recoveryRoute:
        "Recovery route: /workflow-compatibility-checker for compatibility review before prepared package validation is retried.",
      blockedReasons: [
        "Prepared package missing",
        "Missing dependency summary missing",
        "Risk/secrets redaction status missing",
      ],
      advancedValidationDetails:
        "Advanced validation details: blocked records stay secondary and cannot mutate packages, read arbitrary files, submit queue work, or reveal secrets.",
    }),
  ];
}

export function buildWorkflowPackageValidatorLiveBridgeBoundary(): WorkflowPackageValidatorLiveBridgeBoundary {
  return {
    preparedWorkflowPackageOnly: true,
    workflowValidationMutatesFiles: false,
    validationSubmitsComfyUiJobs: false,
    arbitraryLocalFileBrowsingAllowed: false,
    secretDisplayAllowed: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    rawComfyUiPollingLoopsAllowedFromUi: false,
    localFileMutationAllowedFromUi: false,
    localProcessMutationAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
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
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeWorkflowPackageValidatorLiveBridge(
  model: Pick<WorkflowPackageValidatorLiveBridgeModel, "validators">
): string {
  return `Workflow package validator live bridge reviews ${model.validators.length} validation bridge record(s). Workflow validation does not mutate files, validation does not submit ComfyUI jobs, and suspected secrets are redacted.`;
}

export function buildWorkflowPackageValidatorLiveBridgeModel(): WorkflowPackageValidatorLiveBridgeModel {
  const validators = buildWorkflowPackageValidatorLiveBridges();
  const model: WorkflowPackageValidatorLiveBridgeModel = {
    title: "Workflow package validator live bridge",
    summary: "",
    validators,
    boundary: buildWorkflowPackageValidatorLiveBridgeBoundary(),
    bridgeLanguage: [...WORKFLOW_PACKAGE_VALIDATOR_LIVE_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Workflow package validator live bridge",
      "Workflow validation does not mutate files",
      "Validation does not submit ComfyUI jobs",
      "Suspected secrets are redacted",
      "Validator identity",
      "Source metadata bridge",
      "Workflow package summary",
      "Required node/model summary",
      "Missing dependency summary",
      "Compatibility status",
      "Risk/secrets redaction status",
      "Submit trial route",
      "Recovery route",
      "Blocked reasons",
      "Advanced validation details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeWorkflowPackageValidatorLiveBridge(model) };
}
