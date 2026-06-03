import type {
  PatchPreview,
  PatchPreviewWorkbenchBoundary,
  PatchPreviewWorkbenchModel,
} from "./patch-preview-workbench-types";
import { buildPatchPreviewWorkbenchStableKey } from "./patch-preview-workbench-types";

export const PATCH_PREVIEW_WORKBENCH_LANGUAGE = [
  "Patch preview workbench",
  "Preview does not apply patches",
  "Raw diffs stay secondary",
  "Suspected secrets are redacted",
  "Hunk summary",
  "Apply boundary route",
] as const;

export function buildPatchPreview(
  input: Omit<PatchPreview, "id"> & { idHint: string }
): PatchPreview {
  const { idHint, ...preview } = input;
  return {
    id: buildPatchPreviewWorkbenchStableKey(
      "patch-preview-workbench",
      idHint,
      input.status
    ),
    ...preview,
  };
}

export function buildPatchPreviews(): PatchPreview[] {
  return [
    buildPatchPreview({
      idHint: "reviewed-change-plan-preview",
      status: "review-required",
      patchIdentity:
        "Patch identity: reviewed preview packet for a named change plan; preview does not apply patches.",
      sourceChangePlan:
        "Source change plan: /codebase-change-plan supplies the reviewed request, proposed targets, non-goals, and approval requirement.",
      affectedFilesSummary:
        "Affected files summary: named files are summarized as patch metadata only. The workbench does not write files or browse arbitrary paths.",
      hunkSummary:
        "Hunk summary: proposed hunks are summarized in plain English before raw diff details are opened.",
      riskSecretsScanStatus:
        "Risk/secrets scan status: suspected secrets are redacted and /project-risk-secrets-scan remains the review path.",
      testPlanSummary:
        "Test plan summary: validation steps are listed for later review; commands are not executed from this page.",
      approvalCopy:
        "Approval copy: review the preview, confirm redaction, then route to an explicit apply boundary if the plan still makes sense.",
      applyBoundaryRoute:
        "Apply boundary route: /patch-apply-approval is required before any future local daemon could apply a patch.",
      rollbackNote:
        "Rollback note: rollback expectations are captured before apply; no rollback action is performed here because no patch is applied.",
      blockedReasons: [
        "Preview does not apply patches",
        "Raw diffs stay secondary",
        "Suspected secrets are redacted",
      ],
      advancedDiffDetails:
        "Advanced diff details: raw diffs stay secondary/collapsed. This page does not apply patches, write files, execute commands, browse arbitrary files, call providers, or expose suspected secrets.",
    }),
    buildPatchPreview({
      idHint: "risk-review-blocked",
      status: "blocked",
      patchIdentity:
        "Patch identity: blocked preview because risk or source-plan review is incomplete.",
      sourceChangePlan:
        "Source change plan: missing or unreviewed, so no patch preview can move forward.",
      affectedFilesSummary:
        "Affected files summary: unavailable while the source plan is blocked.",
      hunkSummary:
        "Hunk summary: unavailable until a reviewed source plan and redacted risk signal exist.",
      riskSecretsScanStatus:
        "Risk/secrets scan status: blocked until suspected secrets are redacted and reviewed.",
      testPlanSummary:
        "Test plan summary: not ready. No command execution is attempted from this page.",
      approvalCopy:
        "Approval copy: stop here and review the change plan, risk scan, and file operation boundary first.",
      applyBoundaryRoute:
        "Apply boundary route: /patch-apply-approval remains blocked until preview readiness is reviewed.",
      rollbackNote:
        "Rollback note: no rollback action is needed for a blocked preview because nothing applies automatically.",
      blockedReasons: [
        "Source change plan missing",
        "Risk/secrets scan incomplete",
        "Approved local boundary required",
      ],
      advancedDiffDetails:
        "Advanced diff details: blocked previews do not show raw diffs as primary content and cannot trigger local actions.",
    }),
  ];
}

export function buildPatchPreviewWorkbenchBoundary(): PatchPreviewWorkbenchBoundary {
  return {
    previewOnly: true,
    rawDiffsPrimaryAllowed: false,
    suspectedSecretsRedacted: true,
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
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizePatchPreviewWorkbench(
  model: Pick<PatchPreviewWorkbenchModel, "previews">
): string {
  return `Patch preview workbench prepares ${model.previews.length} preview packet shape(s). Preview does not apply patches, raw diffs stay secondary, and suspected secrets are redacted.`;
}

export function buildPatchPreviewWorkbenchModel(): PatchPreviewWorkbenchModel {
  const previews = buildPatchPreviews();
  const model: PatchPreviewWorkbenchModel = {
    title: "Patch preview workbench",
    summary: "",
    previews,
    boundary: buildPatchPreviewWorkbenchBoundary(),
    previewLanguage: [...PATCH_PREVIEW_WORKBENCH_LANGUAGE],
    advancedDetails: [
      "Patch preview workbench",
      "Preview does not apply patches",
      "Raw diffs stay secondary",
      "Suspected secrets are redacted",
      "Patch identity",
      "Source change plan",
      "Affected files summary",
      "Hunk summary",
      "Risk/secrets scan status",
      "Test plan summary",
      "Approval copy",
      "Apply boundary route",
      "Rollback note",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced diff details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePatchPreviewWorkbench(model) };
}
