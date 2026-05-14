import {
  isArtifactExtensionAllowed,
  isArtifactPathTraversal,
  isArtifactSourceMutationPath,
  validateArtifactWorkspacePath,
  type ArtifactExportRequest,
} from "@/lib/codexforge/artifact-workspace";
import type { ExportApprovalChecklist } from "./export-flow-types";

const COMMAND_INTENT = ["run command", "execute command", "child_process", "spawn(", "exec(", "broker-execution"];

export function buildExportApprovalChecklist(args: {
  requests: ArtifactExportRequest[];
  userApprovedExport?: boolean;
}): ExportApprovalChecklist {
  const paths = args.requests.map((request) => request.targetRelativePath);
  const joinedText = args.requests
    .map((request) => `${request.content}\n${request.approvalNote}\n${request.targetRelativePath}`)
    .join("\n")
    .toLowerCase();
  const userApprovedExport = args.userApprovedExport === true;
  const safeWorkspaceTarget = paths.every((target) => validateArtifactWorkspacePath(target).allowed);
  const extensionAllowed = paths.every(isArtifactExtensionAllowed);
  const noTraversal = paths.every((target) => !isArtifactPathTraversal(target));
  const noSourceMutationPath = paths.every((target) => !isArtifactSourceMutationPath(target));
  const noCommandExecutionIntent = !COMMAND_INTENT.some((marker) => joinedText.includes(marker));
  const previewOnlyLanguage = args.requests.every((request) =>
    `${request.content}\n${request.approvalNote}`.toLowerCase().includes("preview") ||
    String(request.type).toLowerCase().includes("preview")
  );
  const approved =
    userApprovedExport &&
    safeWorkspaceTarget &&
    extensionAllowed &&
    noTraversal &&
    noSourceMutationPath &&
    noCommandExecutionIntent &&
    previewOnlyLanguage;

  const checklist: ExportApprovalChecklist = {
    id: "artifact-export-flow-approval-checklist",
    userApprovedExport,
    safeWorkspaceTarget,
    extensionAllowed,
    noTraversal,
    noSourceMutationPath,
    noCommandExecutionIntent,
    previewOnlyLanguage,
    approved,
    summary: [],
  };

  return { ...checklist, summary: summarizeExportApprovalChecklist(checklist) };
}

export function isExportApprovedForWorkspace(checklist: ExportApprovalChecklist): boolean {
  return checklist.approved;
}

export function summarizeExportApprovalChecklist(checklist: ExportApprovalChecklist): string[] {
  return [
    checklist.userApprovedExport ? "User approval captured." : "Explicit approval required before export.",
    checklist.safeWorkspaceTarget ? "Safe artifact workspace target confirmed." : "Workspace target is blocked.",
    checklist.extensionAllowed ? "Allowed artifact extension confirmed." : "Unsupported extension blocked.",
    checklist.noTraversal ? "Path traversal blocked." : "Traversal marker detected.",
    checklist.noSourceMutationPath ? "Source mutation blocked." : "Source mutation path detected.",
    checklist.noCommandExecutionIntent ? "No command execution intent." : "Command execution wording detected.",
    checklist.previewOnlyLanguage ? "Preview-only artifact language present." : "Preview-only language missing.",
  ];
}
