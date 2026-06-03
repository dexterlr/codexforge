import type {
  PatchApplyApproval,
  PatchApplyApprovalBoundary,
  PatchApplyApprovalBoundaryModel,
} from "./patch-apply-approval-boundary-types";
import { buildPatchApplyApprovalBoundaryStableKey } from "./patch-apply-approval-boundary-types";

export const PATCH_APPLY_APPROVAL_BOUNDARY_LANGUAGE = [
  "Patch apply approval boundary",
  "Patches are not applied from this page",
  "Applying requires explicit approval",
  "Future execution remains behind approved local boundary",
  "Allowed scope",
  "Rollback and recovery note",
] as const;

export function buildPatchApplyApproval(
  input: Omit<PatchApplyApproval, "id"> & { idHint: string }
): PatchApplyApproval {
  const { idHint, ...approval } = input;
  return {
    id: buildPatchApplyApprovalBoundaryStableKey(
      "patch-apply-approval-boundary",
      idHint,
      input.status,
      input.riskLevel
    ),
    ...approval,
  };
}

export function buildPatchApplyApprovals(): PatchApplyApproval[] {
  return [
    buildPatchApplyApproval({
      idHint: "reviewed-patch-boundary",
      status: "review-required",
      riskLevel: "high",
      patchIdentity:
        "Patch identity: reviewed preview packet awaiting explicit human approval; patches are not applied from this page.",
      previewStatus:
        "Preview status: /patch-preview-workbench must be reviewed, redacted, and accepted before any apply boundary can be considered.",
      fileOperationApprovalStatus:
        "File operation approval status: /local-file-approval must confirm named write scope before future local apply execution.",
      workspaceTrustStatus:
        "Workspace trust status: /workspace-trust-policy must confirm the trusted workspace and allowed roots.",
      riskSecretsStatus:
        "Risk/secrets status: suspected secrets are redacted and risk follow-up must be reviewed before approval.",
      approvalCopy:
        "Approval copy: I explicitly approve this patch identity, reviewed file scope, rollback plan, and local-only boundary for a future apply request.",
      allowedScope:
        "Allowed scope: only the named patch identity, reviewed file targets, explicit approval packet, and approved local boundary.",
      deniedScope:
        "Denied scope: arbitrary local browsing, unreviewed files, secret values, command execution, provider calls, direct Jarvisd calls from arbitrary UI, and silent mutation.",
      rollbackRecoveryNote:
        "Rollback and recovery note: capture restore plan, failed-apply handling, and review inbox handoff before any future local daemon apply.",
      blockedReasons: [
        "Patches are not applied from this page",
        "Applying requires explicit approval",
        "Future execution remains behind approved local boundary",
      ],
      advancedApprovalDetails:
        "Advanced approval details: this page represents the approval boundary only. It does not apply patches, write files, execute commands, call Jarvisd directly from arbitrary UI, call providers, or mutate memory.",
    }),
    buildPatchApplyApproval({
      idHint: "missing-preview-blocked",
      status: "blocked",
      riskLevel: "blocked",
      patchIdentity:
        "Patch identity: blocked because no reviewed patch preview is ready.",
      previewStatus:
        "Preview status: blocked until /patch-preview-workbench confirms hunk summary, risk status, and approval copy.",
      fileOperationApprovalStatus:
        "File operation approval status: not approved while preview readiness is missing.",
      workspaceTrustStatus:
        "Workspace trust status: not approved until trusted workspace scope is reviewed.",
      riskSecretsStatus:
        "Risk/secrets status: blocked until suspected secrets remain redacted and reviewed.",
      approvalCopy:
        "Approval copy: stop here. Applying requires explicit approval, and no approval is present.",
      allowedScope:
        "Allowed scope: explanation of the blocked state and next review route only.",
      deniedScope:
        "Denied scope: patch application, file mutation, command execution, arbitrary browsing, and direct daemon calls.",
      rollbackRecoveryNote:
        "Rollback and recovery note: no recovery action is needed because patches are not applied from this page.",
      blockedReasons: [
        "Reviewed preview missing",
        "File operation approval missing",
        "Approved local boundary required",
      ],
      advancedApprovalDetails:
        "Advanced approval details: blocked approvals remain review-only and cannot trigger a local daemon.",
    }),
  ];
}

export function buildPatchApplyApprovalBoundary(): PatchApplyApprovalBoundary {
  return {
    patchesAppliedFromPageAllowed: false,
    explicitApprovalRequired: true,
    futureExecutionBehindApprovedLocalBoundary: true,
    jarvisdDirectCallAllowedFromUi: false,
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

export function summarizePatchApplyApprovalBoundary(
  model: Pick<PatchApplyApprovalBoundaryModel, "approvals">
): string {
  return `Patch apply approval boundary prepares ${model.approvals.length} explicit approval shape(s). Patches are not applied from this page, applying requires explicit approval, and future execution remains behind approved local boundary.`;
}

export function buildPatchApplyApprovalBoundaryModel(): PatchApplyApprovalBoundaryModel {
  const approvals = buildPatchApplyApprovals();
  const model: PatchApplyApprovalBoundaryModel = {
    title: "Patch apply approval boundary",
    summary: "",
    approvals,
    boundary: buildPatchApplyApprovalBoundary(),
    approvalLanguage: [...PATCH_APPLY_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Patch apply approval boundary",
      "Patches are not applied from this page",
      "Applying requires explicit approval",
      "Future execution remains behind approved local boundary",
      "Patch identity",
      "Preview status",
      "File operation approval status",
      "Workspace trust status",
      "Risk/secrets status",
      "Approval copy",
      "Allowed scope",
      "Denied scope",
      "Rollback and recovery note",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced approval details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePatchApplyApprovalBoundary(model) };
}
