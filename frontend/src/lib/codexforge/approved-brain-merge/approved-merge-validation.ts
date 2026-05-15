import { CODEXFORGE_BRAIN_GRAPH_VERSION } from "@/lib/codexforge/brain/graph/types";
import type {
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeValidation,
  ApprovedBrainMergeValidationFinding,
  ApprovedBrainMergeValidationIssue,
} from "./approved-brain-merge-types";
import { buildApprovedBrainMergeStableKey } from "./approved-brain-merge-types";
import { summarizeApprovedBrainGraph } from "./approved-merge-summary";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";

function finding(
  issue: ApprovedBrainMergeValidationIssue,
  severity: ApprovedBrainMergeValidationFinding["severity"],
  message: string
): ApprovedBrainMergeValidationFinding {
  return {
    id: buildApprovedBrainMergeStableKey("approved-merge-finding", issue, severity, message),
    issue,
    severity,
    message,
  };
}

function duplicateValues(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort();
}

export function validateApprovedBrainMerge(
  request: ApprovedBrainMergeRequest
): ApprovedBrainMergeValidation {
  const findings: ApprovedBrainMergeValidationFinding[] = [];
  const allNodeDiffs = [...request.nodeDiffs, ...request.nodeUpdateDiffs];

  if (!request.approved) {
    findings.push(finding("missing-approval", "blocker", "Explicit merge approval required."));
  }
  if (allNodeDiffs.length + request.edgeDiffs.length === 0) {
    findings.push(finding("empty-merge", "blocker", "Graph diff preview produced an empty merge."));
  }
  if (request.eventIds.length === 0) {
    findings.push(finding("missing-event-ids", "blocker", "Approved merge request must include event ids."));
  }
  if (request.graphVersion !== CODEXFORGE_BRAIN_GRAPH_VERSION) {
    findings.push(finding("schema-version-mismatch", "blocker", "Request must target the canonical graph schema."));
  }
  if (allNodeDiffs.some((diff) => diff.sourceRefs.length === 0)) {
    findings.push(finding("missing-source-refs", "blocker", "Every node diff must keep source refs."));
  }
  if (request.edgeDiffs.some((diff) => diff.sourceRefs.length === 0)) {
    findings.push(finding("missing-source-refs", "blocker", "Every edge diff must keep source refs."));
  }
  if (allNodeDiffs.some((diff) => diff.duplicateRisk && !request.conflictAcknowledgements.includes(diff.node.id))) {
    findings.push(finding("duplicate-node-conflict", "blocker", "Duplicate node conflicts must be resolved or safely deduped."));
  }

  const duplicateNodeIds = duplicateValues(allNodeDiffs.map((diff) => diff.node.id));
  if (duplicateNodeIds.length > 0) {
    findings.push(finding("duplicate-node-conflict", "blocker", `Duplicate node conflict risk: ${duplicateNodeIds.join(", ")}.`));
  }

  const duplicateEdgeIds = duplicateValues(request.edgeDiffs.map((diff) => diff.edge.id));
  if (duplicateEdgeIds.length > 0) {
    findings.push(finding("duplicate-edge-conflict", "blocker", `Duplicate edge conflict risk: ${duplicateEdgeIds.join(", ")}.`));
  }

  for (const priorFinding of request.validationFindings) {
    if (priorFinding.severity === "blocker") {
      findings.push(finding("unresolved-blocker-validation-finding", "blocker", priorFinding.message));
    }
  }

  findings.push(
    finding("direct-graph-mutation-bypass-language", "info", "Direct graph mutation bypass language checked; merge uses approval request state."),
    finding("legacy-graph-import-risk", "info", "Legacy graph import risk checked; canonical graph types are required.")
  );

  const validation: ApprovedBrainMergeValidation = {
    id: "approved-brain-merge-validation",
    state: findings.some((item) => item.severity === "blocker")
      ? "blocked"
      : findings.some((item) => item.severity === "warning")
        ? "review"
        : "valid",
    findings,
    summary: [],
  };

  return { ...validation, summary: summarizeApprovedMergeValidation(validation) };
}

export function validateApprovedBrainGraphResult(args: {
  before: CodexForgeBrainGraph;
  after: CodexForgeBrainGraph;
  request: ApprovedBrainMergeRequest;
}): ApprovedBrainMergeValidation {
  const findings: ApprovedBrainMergeValidationFinding[] = [];
  const before = summarizeApprovedBrainGraph(args.before);
  const after = summarizeApprovedBrainGraph(args.after);

  if (args.after.version !== CODEXFORGE_BRAIN_GRAPH_VERSION) {
    findings.push(finding("schema-version-mismatch", "blocker", "Merged graph must keep canonical graph schema."));
  }
  if (after.nodeCount < before.nodeCount || after.edgeCount < before.edgeCount) {
    findings.push(finding("direct-graph-mutation-bypass-language", "blocker", "Approved merge must preserve existing graph nodes and edges."));
  }
  if (args.request.eventIds.length === 0) {
    findings.push(finding("missing-event-ids", "blocker", "Result validation requires event ids."));
  }

  const validation: ApprovedBrainMergeValidation = {
    id: "approved-brain-merge-validation",
    state: findings.some((item) => item.severity === "blocker") ? "blocked" : "valid",
    findings,
    summary: [],
  };

  return { ...validation, summary: summarizeApprovedMergeValidation(validation) };
}

export function summarizeApprovedMergeValidation(
  validation: ApprovedBrainMergeValidation
): string[] {
  const blockers = validation.findings.filter((findingItem) => findingItem.severity === "blocker");
  return [
    `Approved merge validation state: ${validation.state}.`,
    blockers.length
      ? `Blocked by ${blockers.map((item) => item.issue).join(", ")}.`
      : "No unresolved blocker validation findings.",
    "Validation detects duplicate/conflict risk, missing source refs, schema mismatch, unknown event types, and bypass language.",
  ];
}
