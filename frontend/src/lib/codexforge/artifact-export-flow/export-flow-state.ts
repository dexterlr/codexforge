import { buildExportApiPayload } from "./export-flow-client";
import { buildExportResultLedger } from "./export-flow-ledger";
import { buildArtifactExportFlow } from "./export-flow-summary";
import type {
  ExportFlowReducerAction,
  ExportFlowReducerState,
  ExportResultLedgerItem,
} from "./export-flow-types";
import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";

export function buildInitialExportFlowState(args: {
  sourcePackId: string;
  exportRequests: ArtifactExportRequest[];
}): ExportFlowReducerState {
  const flow = buildArtifactExportFlow({
    sourcePackId: args.sourcePackId,
    exportRequests: args.exportRequests.map((request) => ({ ...request, approved: false })),
  });

  return {
    flow,
    preparedPayloads: [],
    workspaceRefreshCount: 0,
    statusMessage: "Export requests default to not approved unless user toggles explicit approval.",
  };
}

export function reduceExportFlowState(
  state: ExportFlowReducerState,
  action: ExportFlowReducerAction
): ExportFlowReducerState {
  if (action.type === "review.created") {
    const requests = action.requests.map((request) => ({ ...request, approved: false }));
    return {
      ...state,
      flow: buildArtifactExportFlow({ sourcePackId: state.flow.sourcePackId, exportRequests: requests }),
      preparedPayloads: [],
      statusMessage: "Review created. Explicit approval required before export.",
    };
  }

  if (action.type === "approval.toggled") {
    const requests = state.flow.exportRequests.map((request) => ({
      ...request,
      approved: action.approved === true,
    }));
    const flow = buildArtifactExportFlow({
      sourcePackId: state.flow.sourcePackId,
      exportRequests: requests,
      userApprovedExport: action.approved,
    });
    return {
      ...state,
      flow,
      preparedPayloads: action.approved ? requests.map(buildExportApiPayload) : [],
      statusMessage: action.approved
        ? "Approved payloads prepared for guarded artifact export API only."
        : "Approval removed. Export payloads cleared.",
    };
  }

  if (action.type === "export.started") {
    return {
      ...state,
      flow: { ...state.flow, progressState: "exporting", nextAction: "Wait for guarded export API results." },
      statusMessage: "Submitting approved requests one item at a time.",
    };
  }

  if (action.type === "export.item.completed" || action.type === "export.item.failed") {
    const items = upsertLedgerItem(state.flow.resultsLedger.items, action.item);
    return {
      ...state,
      flow: {
        ...state.flow,
        resultsLedger: buildExportResultLedger({ sourcePackId: state.flow.sourcePackId, items }),
      },
      statusMessage: action.item.status === "exported" ? "Artifact exported by guarded API." : "Artifact export failed or blocked.",
    };
  }

  if (action.type === "export.completed") {
    const failed = state.flow.resultsLedger.items.some((item) => item.status !== "exported");
    const exported = state.flow.resultsLedger.items.some((item) => item.status === "exported");
    const progressState = failed && exported ? "partially-exported" : failed ? "failed" : "exported";
    return {
      ...state,
      flow: {
        ...state.flow,
        progressState,
        nextAction: progressState === "exported" ? "Refresh the guarded artifact workspace list." : "Review failed ledger items before retry.",
      },
      statusMessage: progressState === "exported" ? "Export completed. Workspace refresh recommended." : "Export finished with blocked items.",
    };
  }

  if (action.type === "workspace.refreshed") {
    return {
      ...state,
      workspaceRefreshCount: state.workspaceRefreshCount + 1,
      statusMessage: "Safe artifact workspace refreshed.",
    };
  }

  return state;
}

export function summarizeExportFlowState(state: ExportFlowReducerState): string[] {
  return [
    `state: ${state.flow.progressState}`,
    `prepared payloads: ${state.preparedPayloads.length}`,
    `workspace refreshes: ${state.workspaceRefreshCount}`,
    state.statusMessage,
  ];
}

function upsertLedgerItem(
  items: ExportResultLedgerItem[],
  nextItem: ExportResultLedgerItem
): ExportResultLedgerItem[] {
  return [...items.filter((item) => item.id !== nextItem.id), nextItem];
}
