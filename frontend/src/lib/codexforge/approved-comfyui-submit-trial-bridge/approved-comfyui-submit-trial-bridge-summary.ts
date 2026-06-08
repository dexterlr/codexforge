import { buildComfyUiHealthProbeLiveBridgeModel } from "@/lib/codexforge/comfyui-health-probe-live-bridge";
import { buildComfyUiMetadataLiveBridgeModel } from "@/lib/codexforge/comfyui-metadata-live-bridge";
import { buildRealApprovedComfyUiSubmitTrialSummary } from "@/lib/codexforge/real-approved-comfyui-submit-trial";
import { buildWorkflowPackageValidatorLiveBridgeModel } from "@/lib/codexforge/workflow-package-validator-live-bridge";
import type {
  ApprovedComfyUiSubmitTrialBridge,
  ApprovedComfyUiSubmitTrialBridgeBoundary,
  ApprovedComfyUiSubmitTrialBridgeModel,
} from "./approved-comfyui-submit-trial-bridge-types";
import { buildApprovedComfyUiSubmitTrialBridgeStableKey } from "./approved-comfyui-submit-trial-bridge-types";

export const APPROVED_COMFY_UI_SUBMIT_TRIAL_BRIDGE_LANGUAGE = [
  "Approved ComfyUI submit trial bridge",
  "ComfyUI submit trials require explicit approval",
  "No ComfyUI request is sent from this page",
  "Local endpoint secrets are never displayed",
  "Allowed submit scope",
  "Required confirmation copy",
] as const;

export function buildApprovedComfyUiSubmitTrialBridge(
  input: Omit<ApprovedComfyUiSubmitTrialBridge, "id"> & { idHint: string }
): ApprovedComfyUiSubmitTrialBridge {
  const { idHint, ...trial } = input;
  return {
    id: buildApprovedComfyUiSubmitTrialBridgeStableKey(
      "approved-comfyui-submit-trial-bridge",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildApprovedComfyUiSubmitTrialBridges(): ApprovedComfyUiSubmitTrialBridge[] {
  const healthBridge = buildComfyUiHealthProbeLiveBridgeModel();
  const metadataBridge = buildComfyUiMetadataLiveBridgeModel();
  const validatorBridge = buildWorkflowPackageValidatorLiveBridgeModel();
  const submitTrial = buildRealApprovedComfyUiSubmitTrialSummary();

  return [
    buildApprovedComfyUiSubmitTrialBridge({
      idHint: "explicit-approval-final-boundary",
      status: "explicit-approval-required",
      submitTrialIdentity:
        "Submit trial identity: approved-comfyui-submit-trial-bridge-final-approval, the explicit final approval boundary before any future local ComfyUI prompt/workflow submission.",
      healthProbeDependency:
        `Health probe dependency: ${healthBridge.summary}`,
      metadataDependency:
        `Metadata dependency: ${metadataBridge.summary}`,
      workflowValidatorDependency:
        `Workflow validator dependency: ${validatorBridge.summary}`,
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: ComfyUI submit trials require explicit approval through the approved local boundary before any future queue handoff.",
      promptWorkflowSummary:
        "Prompt/workflow summary: prepared prompt and workflow package are summarized for review; raw prompt and workflow details stay secondary and are not sent from this page.",
      allowedSubmitScope:
        "Allowed submit scope: one reviewed local-only ComfyUI trial handoff after health, metadata, workflow validation, artifact capture, review inbox, recovery route, timeout, cancel, and exact confirmation copy are approved.",
      deniedSubmitScope:
        "Denied submit scope: no arbitrary UI submit, no cloud fallback, no unreviewed prompt/workflow send, no endpoint secret display, no file mutation, no process mutation, and no queue call from this page.",
      timeoutCancelPolicy:
        "Timeout/cancel policy: future executor timeout and cancel handling must be reviewed before submission; this page has no raw polling loop and no process kill, restart, or shutdown control.",
      requiredConfirmationCopy:
        `Required confirmation copy: ${submitTrial.approvalCopy}`,
      blockedReasons: [
        "ComfyUI submit trials require explicit approval",
        "No ComfyUI request is sent from this page",
        "Local endpoint secrets are never displayed",
      ],
      advancedSubmitDetails:
        "Advanced submit details: this bridge does not submit ComfyUI jobs, send prompts, send workflows, call arbitrary local endpoints from UI, create raw polling loops, mutate local files or processes, kill or restart local processes, call provider APIs, send files, auto-spend tokens, execute commands, browse local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildApprovedComfyUiSubmitTrialBridge({
      idHint: "blocked-unapproved-submit-trial",
      status: "blocked",
      submitTrialIdentity:
        "Submit trial identity: approved-comfyui-submit-trial-bridge-blocked-unapproved-trial.",
      healthProbeDependency:
        "Health probe dependency: blocked until health readiness is reviewed through the live bridge.",
      metadataDependency:
        "Metadata dependency: blocked until metadata source, version, capability, node, and model summaries are safe.",
      workflowValidatorDependency:
        "Workflow validator dependency: blocked until prepared package validation is ready and suspected secrets are redacted.",
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: blocked when explicit approved local boundary is missing.",
      promptWorkflowSummary:
        "Prompt/workflow summary: blocked if raw prompt/workflow details would be sent, shown as giant JSON, or reviewed outside the approved boundary.",
      allowedSubmitScope:
        "Allowed submit scope: none while required dependencies are blocked.",
      deniedSubmitScope:
        "Denied submit scope: all ComfyUI requests, arbitrary endpoint calls, prompt/workflow sends, queue mutation, file mutation, and process mutation remain denied.",
      timeoutCancelPolicy:
        "Timeout/cancel policy: blocked until reviewed timeout, cancel, and recovery handling exist outside arbitrary UI.",
      requiredConfirmationCopy:
        "Required confirmation copy: blocked until exact approval wording is present and reviewed.",
      blockedReasons: [
        "Health dependency missing",
        "Metadata dependency missing",
        "Workflow validator dependency missing",
        "Required confirmation copy missing",
      ],
      advancedSubmitDetails:
        "Advanced submit details: blocked records stay secondary and cannot submit queue work, send prompt/workflow payloads, call endpoints, or mutate local state.",
    }),
  ];
}

export function buildApprovedComfyUiSubmitTrialBridgeBoundary(): ApprovedComfyUiSubmitTrialBridgeBoundary {
  return {
    explicitApprovalRequired: true,
    noComfyUiRequestSentFromPage: true,
    localEndpointSecretsDisplayed: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    promptWorkflowSendAllowedFromPage: false,
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

export function summarizeApprovedComfyUiSubmitTrialBridge(
  model: Pick<ApprovedComfyUiSubmitTrialBridgeModel, "trials">
): string {
  return `Approved ComfyUI submit trial bridge reviews ${model.trials.length} submit trial bridge record(s). ComfyUI submit trials require explicit approval, no ComfyUI request is sent from this page, and local endpoint secrets are never displayed.`;
}

export function buildApprovedComfyUiSubmitTrialBridgeModel(): ApprovedComfyUiSubmitTrialBridgeModel {
  const trials = buildApprovedComfyUiSubmitTrialBridges();
  const model: ApprovedComfyUiSubmitTrialBridgeModel = {
    title: "Approved ComfyUI submit trial bridge",
    summary: "",
    trials,
    boundary: buildApprovedComfyUiSubmitTrialBridgeBoundary(),
    bridgeLanguage: [...APPROVED_COMFY_UI_SUBMIT_TRIAL_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Approved ComfyUI submit trial bridge",
      "ComfyUI submit trials require explicit approval",
      "No ComfyUI request is sent from this page",
      "Local endpoint secrets are never displayed",
      "Submit trial identity",
      "Health probe dependency",
      "Metadata dependency",
      "Workflow validator dependency",
      "Approved local boundary dependency",
      "Prompt/workflow summary",
      "Allowed submit scope",
      "Denied submit scope",
      "Timeout/cancel policy",
      "Required confirmation copy",
      "Blocked reasons",
      "Advanced submit details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeApprovedComfyUiSubmitTrialBridge(model) };
}
