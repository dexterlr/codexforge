import {
  buildApprovedPatchApplyStableId,
  type ApprovedPatchApplyRequest,
  type ApprovedPatchApplyValidationCapture,
  type ApprovedPatchApplyValidationCommand,
} from "./approved-patch-apply-types";

export function buildApprovedPatchApplyValidationCommand(args: {
  requestId: string;
  label: string;
  command: string;
  required?: boolean | null;
}): ApprovedPatchApplyValidationCommand {
  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-validation-command", args.requestId, args.label),
    label: args.label,
    command: args.command,
    copyOnly: true,
    required: args.required ?? true,
  };
}

function targetedSmokeCommand(filePath: string): string {
  if (filePath.includes("approved-patch-apply")) {
    return "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-approved-patch-apply.ps1";
  }
  if (filePath.includes("real-patch-preview")) {
    return "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-patch-preview.ps1";
  }
  if (filePath.includes("local-project-reader") || filePath.includes("/files/")) {
    return "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-local-project-reader.ps1";
  }
  return "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-approved-patch-apply.ps1";
}

export function buildApprovedPatchApplyValidationCapture(args: {
  request: ApprovedPatchApplyRequest;
  manualResultText?: string | null;
}): ApprovedPatchApplyValidationCapture {
  const request = args.request;
  const commands: ApprovedPatchApplyValidationCommand[] = [
    buildApprovedPatchApplyValidationCommand({
      requestId: request.requestId,
      label: "Build",
      command: "npm run build",
    }),
    buildApprovedPatchApplyValidationCommand({
      requestId: request.requestId,
      label: "Targeted smoke for changed surface",
      command: targetedSmokeCommand(request.selectedFilePath),
    }),
    buildApprovedPatchApplyValidationCommand({
      requestId: request.requestId,
      label: "Managed server smoke",
      command: "npm run smoke:codexforge:server",
    }),
    buildApprovedPatchApplyValidationCommand({
      requestId: request.requestId,
      label: "Diff whitespace check",
      command: "git diff --check",
    }),
    buildApprovedPatchApplyValidationCommand({
      requestId: request.requestId,
      label: "Working tree status",
      command: "git status --short",
    }),
    buildApprovedPatchApplyValidationCommand({
      requestId: request.requestId,
      label: "Diff stats",
      command: "git diff --stat",
    }),
  ];
  const manualResultText = String(args.manualResultText ?? "").trim();

  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-validation-capture", request.requestId),
    requestId: request.requestId,
    commands,
    manualResultText,
    commandExecutionFromUi: false,
    ready: commands.length > 0,
    summary: summarizeApprovedPatchApplyValidationCapture({
      id: "",
      requestId: request.requestId,
      commands,
      manualResultText,
      commandExecutionFromUi: false,
      ready: commands.length > 0,
      summary: [],
    }),
  };
}

export function summarizeApprovedPatchApplyValidationCapture(
  capture: ApprovedPatchApplyValidationCapture
): string[] {
  return [
    `${capture.commands.length} validation command(s) are visible and copy-only.`,
    "UI can copy commands only and cannot run commands.",
    capture.manualResultText
      ? "Manual validation result text has been captured as operator-supplied context."
      : "Manual validation result text is empty until supplied by the operator.",
    "Validation includes npm run build, targeted smoke, npm run smoke:codexforge:server, git diff --check, git status --short, and git diff --stat.",
  ];
}
