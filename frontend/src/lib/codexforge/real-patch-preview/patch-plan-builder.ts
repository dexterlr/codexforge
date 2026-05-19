import { buildRealPatchPreviewRollbackPlan } from "./patch-preview-rollback";
import { buildRealPatchPreviewTestPlan } from "./patch-preview-tests";
import {
  buildRealPatchPreviewStableId,
  projectRiskToRealPatchRisk,
  uniqueRealPatchPreviewStrings,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type RealPatchPreviewPlan,
  type RealPatchPreviewStep,
  type RealPatchPreviewStepStatus,
} from "./real-patch-preview-types";

function summarizeCurrentBehavior(context: PatchPreviewContext): string {
  const purpose = context.filePurpose.summary || context.fileMetadata.probableRole;
  const imports = context.importMarkers.length;
  const exports = context.exportMarkers.length;
  return `${context.filePath} currently appears to be ${purpose} with ${imports} import marker(s), ${exports} export marker(s), and ${context.fileRisk.level} reader risk.`;
}

function summarizeProposedBehavior(request: PatchChangeRequest): string {
  return request.requestedChangeText || "No requested change supplied.";
}

export function buildRealPatchPreviewStep(input: {
  id: string;
  label: string;
  status?: RealPatchPreviewStepStatus;
  detail: string;
  groundedIn?: readonly string[];
}): RealPatchPreviewStep {
  return {
    id: buildRealPatchPreviewStableId("real-patch-step", input.id, input.label),
    label: input.label,
    status: input.status ?? "ready",
    detail: input.detail,
    groundedIn: [...(input.groundedIn ?? [])],
  };
}

export function buildRealPatchPreviewPlan(input: {
  request: PatchChangeRequest;
  context: PatchPreviewContext;
}): RealPatchPreviewPlan {
  const { request, context } = input;
  const expectedTouchedFiles = uniqueRealPatchPreviewStrings([request.selectedFilePath, context.filePath]);
  const testPlan = buildRealPatchPreviewTestPlan({ filePath: context.filePath, context, request });
  const rollbackPlan = buildRealPatchPreviewRollbackPlan(context.filePath);
  const riskPosture = projectRiskToRealPatchRisk(context.fileRisk.level);
  const safetyBoundaries = [
    "Preview-only unified diff; no file writes.",
    "No apply, no apply-diff call, and no write-file call from UI.",
    "No command execution; validation commands are copy-only.",
    "No Brain graph mutation, no auto-persistence, and no memory promotion.",
    "Patch Application Gate is required before any future apply.",
    "Preserve latest-message authority.",
  ];
  const steps = [
    buildRealPatchPreviewStep({
      id: "inspect",
      label: "Inspect selected file context",
      status: context.contentExcerpt ? "ready" : "blocked",
      detail: "Use the supplied capped file content, metadata, purpose, and risk before composing the preview.",
      groundedIn: [context.filePath, context.filePurpose.kind, context.fileRisk.level],
    }),
    buildRealPatchPreviewStep({
      id: "request",
      label: "Validate requested change",
      status: request.validation.valid ? "ready" : "blocked",
      detail: request.validation.valid
        ? "Requested change has a selected file and non-empty change text."
        : request.validation.blockedReasons.join(" "),
      groundedIn: [request.id, request.operatorIntent],
    }),
    buildRealPatchPreviewStep({
      id: "plan",
      label: "Plan deterministic preview",
      detail: "Summarize expected target, behavior shift, imports/exports, safety boundaries, tests, and rollback.",
      groundedIn: context.relatedWorkflowHints,
    }),
    buildRealPatchPreviewStep({
      id: "diff-preview",
      label: "Compose preview-only diff",
      detail: "Build a heuristic unified diff preview or structured pseudo-diff without applying it.",
      groundedIn: [context.noFilesystemReadGuarantee, request.noWriteGuarantee],
    }),
    buildRealPatchPreviewStep({
      id: "handoff",
      label: "Prepare approval handoff",
      status: "review",
      detail: "Copy review and apply-gate prompts only; mutation requires future explicit approval outside this panel.",
      groundedIn: ["Patch Application Gate before apply", request.latestMessageAuthorityReminder],
    }),
  ];

  const plan: RealPatchPreviewPlan = {
    id: buildRealPatchPreviewStableId("real-patch-plan", request.id, context.id),
    goal: request.operatorIntent,
    selectedFile: context.filePath,
    expectedTouchedFiles,
    currentBehaviorSummary: summarizeCurrentBehavior(context),
    proposedBehaviorSummary: summarizeProposedBehavior(request),
    steps,
    affectedImports: context.importMarkers,
    affectedExports: context.exportMarkers,
    safetyBoundaries,
    riskPosture,
    tests: testPlan.commands,
    rollbackNotes: rollbackPlan.notes,
    approvalBoundary:
      "Approval boundary: Real Patch Preview v1 stops at preview and handoff; use Patch Application Gate before apply.",
    noMutationGuarantee:
      "No mutation guarantee: this plan does not apply diffs, write files, execute commands, or mutate Brain graph.",
    summary: "",
  };

  return {
    ...plan,
    summary: summarizeRealPatchPreviewPlan(plan),
  };
}

export function summarizeRealPatchPreviewPlan(plan: RealPatchPreviewPlan): string {
  return `Plan ${plan.id} previews ${plan.expectedTouchedFiles.length} file target(s) for ${plan.selectedFile}; ${plan.steps.length} step(s), ${plan.tests.length} copy-only validation command(s), ${plan.riskPosture} risk posture.`;
}
