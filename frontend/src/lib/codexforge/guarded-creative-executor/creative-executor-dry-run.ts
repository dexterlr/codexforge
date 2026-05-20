import type {
  CreativeExecutorDryRun,
  CreativeExecutorDryRunItem,
  CreativeExecutorRequest,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";
import { buildCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorDryRunItem(input: CreativeExecutorDryRunItem): CreativeExecutorDryRunItem {
  return input;
}

export function buildCreativeExecutorDryRun(
  request: CreativeExecutorRequest = buildCreativeExecutorRequest()
): CreativeExecutorDryRun {
  const items = [
    buildCreativeExecutorDryRunItem({
      itemId: buildCreativeExecutorStableId("dry-run-item", [request.requestId, "validate-request"]),
      order: 1,
      label: "Validate request structure",
      wouldDoSummary: `Validate ${request.sourcePacketId}, ${request.adapterId}, inputs, outputs, and requested mode.`,
      sideEffectSummary: "No real execution; no file writes; no endpoint calls.",
      blocked: false,
      riskLevel: "low",
      requiredApproval: "operator review",
      expectedArtifact: "request validation summary",
    }),
    buildCreativeExecutorDryRunItem({
      itemId: buildCreativeExecutorStableId("dry-run-item", [request.requestId, "local-tool"]),
      order: 2,
      label: "Identify local tool requirement",
      wouldDoSummary: `Future executor would require ${request.requestedExecutorKind} availability through ${request.localBridgeProfileId}.`,
      sideEffectSummary: "Local app launch remains blocked unless future guarded executor is enabled.",
      blocked: true,
      riskLevel: "high",
      requiredApproval: "future guarded executor approval",
      expectedArtifact: "local bridge readiness note",
    }),
    buildCreativeExecutorDryRunItem({
      itemId: buildCreativeExecutorStableId("dry-run-item", [request.requestId, "capture"]),
      order: 3,
      label: "Plan artifact capture",
      wouldDoSummary: `Plan capture for ${request.expectedOutputArtifacts.join(", ")}.`,
      sideEffectSummary: "Capture plan is metadata only; no artifact files are written.",
      blocked: false,
      riskLevel: "medium",
      requiredApproval: "artifact output boundary acknowledgement",
      expectedArtifact: "artifact capture plan",
    }),
    buildCreativeExecutorDryRunItem({
      itemId: buildCreativeExecutorStableId("dry-run-item", [request.requestId, "blocked-side-effects"]),
      order: 4,
      label: "Show blocked side effects",
      wouldDoSummary: "Show renderer launch, command execution, endpoint calls, provider calls, and file writes as blocked.",
      sideEffectSummary: "No real execution; execution remains blocked unless future guarded executor is enabled.",
      blocked: true,
      riskLevel: "critical",
      requiredApproval: "not available in Phase 67",
      expectedArtifact: "blocked side-effect ledger",
    }),
  ];

  return {
    dryRunId: buildCreativeExecutorStableId("creative-executor-dry-run", [request.requestId]),
    requestId: request.requestId,
    items,
    status: "dry-run-complete",
    noRealExecutionGuarantee:
      "Dry-run says no real execution, no file writes, no endpoint calls, and no renderer launch.",
    summary: summarizeCreativeExecutorDryRun({ items, status: "dry-run-complete" }),
  };
}

export function summarizeCreativeExecutorDryRun(dryRun: Pick<CreativeExecutorDryRun, "items" | "status">): string[] {
  return [
    `Dry-run status: ${dryRun.status}.`,
    `${dryRun.items.length} dry-run steps are visible.`,
    `${dryRun.items.filter((item) => item.blocked).length} side-effect steps are blocked.`,
    "No real execution. No file writes. No endpoint calls.",
  ];
}
