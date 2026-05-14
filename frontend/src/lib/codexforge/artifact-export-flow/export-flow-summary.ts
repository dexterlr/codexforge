import { CODEXFORGE_ARTIFACT_WORKSPACE_ROOT } from "@/lib/codexforge/artifact-workspace";
import { buildExportApprovalChecklist, isExportApprovedForWorkspace } from "./export-flow-approval";
import { buildExportResultLedger } from "./export-flow-ledger";
import { buildExportRequestReview } from "./export-flow-review";
import type {
  ArtifactExportFlow,
  ArtifactExportFlowStateName,
  ArtifactExportFlowStep,
} from "./export-flow-types";
import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";

export function buildArtifactExportFlow(args: {
  sourcePackId: string;
  exportRequests: ArtifactExportRequest[];
  userApprovedExport?: boolean;
  progressState?: ArtifactExportFlowStateName;
}): ArtifactExportFlow {
  const approvalChecklist = buildExportApprovalChecklist({
    requests: args.exportRequests,
    userApprovedExport: args.userApprovedExport,
  });
  const review = buildExportRequestReview({
    sourcePackId: args.sourcePackId,
    requests: args.exportRequests,
  });
  const blockedReasons = [
    ...approvalChecklist.summary.filter((line) => line.includes("blocked") || line.includes("detected")),
    ...review.items
      .filter((item) => item.riskGroup === "blocked")
      .map((item) => `${item.title}: ${item.targetRelativePath}`),
  ];
  const progressState =
    args.progressState ?? inferFlowState(args.exportRequests, approvalChecklist.approved, blockedReasons);
  const flow: ArtifactExportFlow = {
    id: `artifact-export-flow-${args.sourcePackId}`,
    sourcePackId: args.sourcePackId,
    exportRequests: args.exportRequests,
    approvalChecklist,
    guardedWorkspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    progressState,
    resultsLedger: buildExportResultLedger({ sourcePackId: args.sourcePackId }),
    review,
    blockedReasons,
    nextAction: selectExportFlowNextAction(progressState),
    steps: [
      buildArtifactExportFlowStep("review", "Review export requests", progressState),
      buildArtifactExportFlowStep("approval", "Approve artifact-only export", progressState),
      buildArtifactExportFlowStep("export", "Submit guarded export API", progressState),
      buildArtifactExportFlowStep("refresh", "Refresh artifact workspace", progressState),
    ],
    summary: [],
  };

  return { ...flow, summary: summarizeArtifactExportFlow(flow) };
}

export function buildArtifactExportFlowStep(
  id: string,
  label: string,
  flowState: ArtifactExportFlowStateName
): ArtifactExportFlowStep {
  const active =
    (id === "review" && flowState === "review-required") ||
    (id === "approval" && flowState === "approval-required") ||
    (id === "export" && (flowState === "ready-to-export" || flowState === "exporting")) ||
    (id === "refresh" && (flowState === "exported" || flowState === "partially-exported"));
  const complete =
    (id === "review" && flowState !== "draft" && flowState !== "review-required") ||
    (id === "approval" && ["ready-to-export", "exporting", "exported", "partially-exported"].includes(flowState)) ||
    (id === "export" && ["exported", "partially-exported"].includes(flowState));

  return {
    id,
    label,
    state: flowState === "blocked" || flowState === "failed" ? "blocked" : complete ? "complete" : active ? "active" : "pending",
    detail: `${label} for safe artifact workspace export.`,
  };
}

export function summarizeArtifactExportFlow(flow: ArtifactExportFlow): string[] {
  return [
    `${flow.exportRequests.length} request(s) in ${flow.progressState}.`,
    `Workspace root: ${flow.guardedWorkspaceRoot}.`,
    flow.nextAction,
  ];
}

export function selectExportFlowNextAction(state: ArtifactExportFlowStateName): string {
  const actions: Record<ArtifactExportFlowStateName, string> = {
    draft: "Prepare review requests from the production pack.",
    "review-required": "Review target paths, extensions, overwrite state, and safety warnings.",
    "approval-required": "Capture explicit approval before any guarded export API call.",
    "ready-to-export": "Submit approved requests to POST /api/codexforge/artifacts/export one item at a time.",
    exporting: "Wait for guarded export API results.",
    exported: "Refresh the guarded artifact workspace list.",
    "partially-exported": "Review failed ledger items before retrying approved requests.",
    blocked: "Resolve blocked paths, extensions, or safety wording.",
    failed: "Inspect API failures and retry only after review.",
  };
  return actions[state];
}

function inferFlowState(
  requests: ArtifactExportRequest[],
  approved: boolean,
  blockedReasons: string[]
): ArtifactExportFlowStateName {
  if (requests.length === 0) return "draft";
  if (blockedReasons.length > 0) return "blocked";
  if (!requests.every((request) => request.approved)) return "review-required";
  if (!isExportApprovedForWorkspace({ ...buildExportApprovalChecklist({ requests, userApprovedExport: approved }), approved })) {
    return "approval-required";
  }
  return "ready-to-export";
}
