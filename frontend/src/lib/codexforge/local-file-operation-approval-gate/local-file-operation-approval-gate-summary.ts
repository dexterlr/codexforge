import type {
  LocalFileOperationApproval,
  LocalFileOperationApprovalBoundary,
  LocalFileOperationApprovalGateModel,
} from "./local-file-operation-approval-gate-types";
import { buildLocalFileOperationApprovalGateStableKey } from "./local-file-operation-approval-gate-types";

export const LOCAL_FILE_OPERATION_APPROVAL_GATE_LANGUAGE = [
  "Local file operation approval gate",
  "No file operation runs automatically",
  "Arbitrary local browsing is not allowed",
  "Delete requests require separate explicit review",
  "Allowed scope",
  "Rollback and recovery note",
] as const;

export function buildLocalFileOperationApproval(
  input: Omit<LocalFileOperationApproval, "id"> & { idHint: string }
): LocalFileOperationApproval {
  const { idHint, ...operation } = input;
  return {
    id: buildLocalFileOperationApprovalGateStableKey(
      "local-file-operation-approval-gate",
      idHint,
      input.operationType,
      input.status
    ),
    ...operation,
  };
}

export function buildLocalFileOperationApprovals(): LocalFileOperationApproval[] {
  return [
    buildLocalFileOperationApproval({
      idHint: "reviewed-read-preview",
      operationIdentity:
        "Operation identity: reviewed read preview request for a named workspace scope.",
      operationType: "read preview",
      targetScopeSummary:
        "Target scope summary: a future request may preview a small, named path summary only after the approved local boundary confirms the workspace scope.",
      allowedScope:
        "Allowed scope: reviewed metadata and plain-English preview summary inside the approved local boundary.",
      deniedScope:
        "Denied scope: arbitrary local browsing, hidden directory scans, secret files, environment values, command execution, file writes, moves, and deletes.",
      riskLevel: "medium",
      approvalCopy:
        "Approval copy: I approve a local-only file operation preview for the reviewed scope; no file operation runs automatically.",
      auditNote:
        "Audit note: record operation identity, type, reviewed target summary, allowed scope, denied scope, approval copy, and blocked reasons without file contents or secrets.",
      rollbackRecoveryNote:
        "Rollback and recovery note: no recovery action is needed in this phase because this gate does not browse files, write files, move files, or delete files.",
      blockedReasons: [
        "Approved local boundary required",
        "Arbitrary local browsing is not allowed",
        "No Jarvisd capability is called from this page",
      ],
      status: "review-required",
      advancedOperationDetails:
        "Advanced operation details: this surface prepares review copy only. It does not call Jarvisd directly from arbitrary UI, browse local files, mutate files, call providers, display secrets, or run commands.",
    }),
    buildLocalFileOperationApproval({
      idHint: "delete-request-separate-review",
      operationIdentity:
        "Operation identity: delete request remains blocked until separate explicit review.",
      operationType: "delete request",
      targetScopeSummary:
        "Target scope summary: no delete target is accepted here; future delete requests must be isolated and reviewed separately.",
      allowedScope:
        "Allowed scope: explanation of the blocked delete request and the recovery plan that would be required later.",
      deniedScope:
        "Denied scope: file deletion, broad path approval, unreviewed workspace roots, secret inspection, command execution, and background daemon calls.",
      riskLevel: "blocked",
      approvalCopy:
        "Approval copy: delete is not approved here; delete requests require separate explicit review and are not performed here.",
      auditNote:
        "Audit note: record the delete request as blocked with the human-readable reason and no file contents.",
      rollbackRecoveryNote:
        "Rollback and recovery note: a future delete review must include a restore path, backup evidence, and a stop condition before any approved local boundary can proceed.",
      blockedReasons: [
        "Delete requests require separate explicit review",
        "This page cannot delete files",
        "No approved local boundary has been granted",
      ],
      status: "blocked",
      advancedOperationDetails:
        "Advanced operation details: delete requests stay blocked here. Future recovery evidence must be reviewed separately before any local daemon capability is considered.",
    }),
  ];
}

export function buildLocalFileOperationApprovalBoundary(): LocalFileOperationApprovalBoundary {
  return {
    fileOperationAutoRunAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    deleteRequestPerformedHereAllowed: false,
    jarvisdDirectCallAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeLocalFileOperationApprovalGate(
  model: Pick<LocalFileOperationApprovalGateModel, "operations">
): string {
  return `Local file operation approval gate prepares ${model.operations.length} reviewed operation shape(s). No file operation runs automatically, arbitrary local browsing is not allowed, and delete requests require separate explicit review.`;
}

export function buildLocalFileOperationApprovalGateModel(): LocalFileOperationApprovalGateModel {
  const operations = buildLocalFileOperationApprovals();
  const model: LocalFileOperationApprovalGateModel = {
    title: "Local file operation approval gate",
    summary: "",
    operations,
    boundary: buildLocalFileOperationApprovalBoundary(),
    approvalLanguage: [...LOCAL_FILE_OPERATION_APPROVAL_GATE_LANGUAGE],
    advancedDetails: [
      "Local file operation approval gate",
      "No file operation runs automatically",
      "Arbitrary local browsing is not allowed",
      "Delete requests require separate explicit review",
      "Operation identity",
      "Operation type",
      "Target scope summary",
      "Allowed scope",
      "Denied scope",
      "Risk level",
      "Approval copy",
      "Audit note",
      "Rollback and recovery note",
      "Blocked reasons",
      "Approved local boundary required",
      "Nothing executes from arbitrary UI",
    ],
  };
  return { ...model, summary: summarizeLocalFileOperationApprovalGate(model) };
}
