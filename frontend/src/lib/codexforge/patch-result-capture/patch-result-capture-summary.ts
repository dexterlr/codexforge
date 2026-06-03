import type {
  PatchResult,
  PatchResultCaptureBoundary,
  PatchResultCaptureModel,
} from "./patch-result-capture-types";
import { buildPatchResultCaptureStableKey } from "./patch-result-capture-types";

export const PATCH_RESULT_CAPTURE_LANGUAGE = [
  "Patch result capture",
  "Results are reviewed before promotion",
  "Failed patches are retained for recovery",
  "Memory is not auto-promoted",
  "Changed files summary",
  "Review inbox handoff",
] as const;

export function buildPatchResult(
  input: Omit<PatchResult, "id"> & { idHint: string }
): PatchResult {
  const { idHint, ...result } = input;
  return {
    id: buildPatchResultCaptureStableKey(
      "patch-result-capture",
      idHint,
      input.applyStatus
    ),
    ...result,
  };
}

export function buildPatchResults(): PatchResult[] {
  return [
    buildPatchResult({
      idHint: "needs-review-result",
      resultIdentity:
        "Result identity: reviewed patch apply outcome packet captured after a future approved local boundary reports back.",
      patchIdentity:
        "Patch identity: links back to the reviewed patch preview and explicit apply approval boundary.",
      applyStatus: "needs review",
      changedFilesSummary:
        "Changed files summary: changed files are summarized for review; this page does not mutate files or hide failures.",
      validationSummary:
        "Validation summary: validation evidence is captured as a review note, not by running commands from this page.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: suspected secrets remain redacted and follow-up stays visible until reviewed.",
      rollbackStatus:
        "Rollback status: rollback readiness is shown before promotion; failed patches are retained for recovery.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives the human review handoff before any memory promotion.",
      nextRecommendedRoute:
        "Next recommended route: /review-inbox for result review, then /validation-results if separate validation evidence is needed.",
      blockedReasons: [
        "Results are reviewed before promotion",
        "Memory is not auto-promoted",
        "No direct graph mutation from UI",
      ],
      advancedResultDetails:
        "Advanced result details: this page does not apply patches, mutate files, call appendEvent, call saveBrainGraph, auto-promote memory, execute commands, call providers, or hide failed outcomes.",
    }),
    buildPatchResult({
      idHint: "failed-retained-result",
      resultIdentity:
        "Result identity: failed future apply result retained for recovery review.",
      patchIdentity:
        "Patch identity: failed patch remains linked to preview, approval copy, and rollback guidance.",
      applyStatus: "failed",
      changedFilesSummary:
        "Changed files summary: failed or partial changes stay visible as a summary for recovery review.",
      validationSummary:
        "Validation summary: failed validation is retained and not hidden behind success copy.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: redacted indicators remain visible for human review.",
      rollbackStatus:
        "Rollback status: recovery route stays recommended until a human confirms the outcome.",
      reviewInboxHandoff:
        "Review inbox handoff: failed patches route to /review-inbox and /recovery before any promotion.",
      nextRecommendedRoute:
        "Next recommended route: /recovery for rollback review, then /review-inbox for final disposition.",
      blockedReasons: [
        "Failed patches are retained for recovery",
        "Promotion requires review",
        "Approved local boundary required",
      ],
      advancedResultDetails:
        "Advanced result details: failed results are not deleted, auto-promoted, or silently converted into success.",
    }),
  ];
}

export function buildPatchResultCaptureBoundary(): PatchResultCaptureBoundary {
  return {
    reviewBeforePromotionRequired: true,
    failedPatchesRetainedForRecovery: true,
    memoryAutoPromotionAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    patchApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    localActionsWithoutReviewAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizePatchResultCapture(
  model: Pick<PatchResultCaptureModel, "results">
): string {
  return `Patch result capture prepares ${model.results.length} result review shape(s). Results are reviewed before promotion, failed patches are retained for recovery, and memory is not auto-promoted.`;
}

export function buildPatchResultCaptureModel(): PatchResultCaptureModel {
  const results = buildPatchResults();
  const model: PatchResultCaptureModel = {
    title: "Patch result capture",
    summary: "",
    results,
    boundary: buildPatchResultCaptureBoundary(),
    resultLanguage: [...PATCH_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Patch result capture",
      "Results are reviewed before promotion",
      "Failed patches are retained for recovery",
      "Memory is not auto-promoted",
      "Result identity",
      "Patch identity",
      "Apply status",
      "Changed files summary",
      "Validation summary",
      "Risk/secrets follow-up",
      "Rollback status",
      "Review inbox handoff",
      "Next recommended route",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced result details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePatchResultCapture(model) };
}
