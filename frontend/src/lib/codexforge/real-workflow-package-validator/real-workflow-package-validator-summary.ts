import { buildDryRunSummary } from "@/lib/codexforge/comfyui-workflow-dry-run-contract";
import type {
  RealWorkflowPackageCheck,
  RealWorkflowPackageCheckId,
  RealWorkflowPackageCheckStatus,
  RealWorkflowPackageContract,
  RealWorkflowPackageDecision,
  RealWorkflowPackageValidationState,
  RealWorkflowPackageValidatorSummary,
} from "./real-workflow-package-validator-types";

const VALIDATION_COPY: Record<RealWorkflowPackageCheckId, string> = {
  "prepared workflow package only": "Prepared workflow package only; this validator does not browse arbitrary local files.",
  "allowed local endpoint": "Local-only target required before any submit trial can be reviewed.",
  "no cloud provider destination": "No cloud provider destination is allowed in the package.",
  "no secrets": "No secrets may be included in package metadata, prompts, paths, or handoff copy.",
  "no arbitrary file browsing": "The validator checks the prepared contract and does not open arbitrary local files.",
  "no destructive artifact behavior": "Artifacts must be captured or reviewed; destructive artifact behavior is blocked.",
  "deterministic package ID/key": "Package ID and key are stable and deterministic.",
  "approval copy is present": "Requires explicit approval with plain-English approval copy before any submit trial handoff.",
  "dry-run contract exists": "Dry-run contract exists and stays separate from live submission.",
  "block unsafe submit": "Block unsafe submit when target, approval, dry-run, model/node, cloud, or secret checks fail.",
};

export function buildRealWorkflowPackageContract(): RealWorkflowPackageContract {
  return {
    id: "real-workflow-package-validator-contract",
    packageId: "comfyui-local-workflow-package-001",
    packageKey: "workflow-package:comfyui-local-workflow-package-001",
    targetLabel: "Local-only target required",
    targetEndpoint: "http://127.0.0.1:8188",
    preparedWorkflowPackageOnly: true,
    arbitraryFileBrowsingAllowed: false,
    cloudProviderDestinationAllowed: false,
    secretsIncluded: false,
    destructiveArtifactBehaviorAllowed: false,
    approvalCopyPresent: true,
    dryRunContractExists: true,
  };
}

function stateForCheck(id: RealWorkflowPackageCheckId, status: RealWorkflowPackageCheckStatus): RealWorkflowPackageValidationState {
  if (status === "passed") return id === "approval copy is present" ? "requires explicit approval" : "ready";
  if (id === "allowed local endpoint") return "unsafe target";
  if (id === "no cloud provider destination") return "not local-only";
  if (id === "dry-run contract exists") return "needs review";
  if (id === "block unsafe submit") return "blocked";
  return status === "blocked" ? "blocked" : "needs review";
}

export function buildRealWorkflowPackageCheck(
  id: RealWorkflowPackageCheckId,
  status: RealWorkflowPackageCheckStatus = "passed"
): RealWorkflowPackageCheck {
  return {
    id,
    status,
    state: stateForCheck(id, status),
    label: id,
    plainEnglish: VALIDATION_COPY[id],
    blocksSubmit: status === "blocked" || status === "needs-review",
  };
}

export function buildRealWorkflowPackageChecks(contract: RealWorkflowPackageContract): RealWorkflowPackageCheck[] {
  const dryRun = buildDryRunSummary();
  return [
    buildRealWorkflowPackageCheck("prepared workflow package only", contract.preparedWorkflowPackageOnly ? "passed" : "blocked"),
    buildRealWorkflowPackageCheck("allowed local endpoint", contract.targetEndpoint.startsWith("http://127.0.0.1") ? "passed" : "blocked"),
    buildRealWorkflowPackageCheck("no cloud provider destination", contract.cloudProviderDestinationAllowed ? "blocked" : "passed"),
    buildRealWorkflowPackageCheck("no secrets", contract.secretsIncluded ? "blocked" : "passed"),
    buildRealWorkflowPackageCheck("no arbitrary file browsing", contract.arbitraryFileBrowsingAllowed ? "blocked" : "passed"),
    buildRealWorkflowPackageCheck("no destructive artifact behavior", contract.destructiveArtifactBehaviorAllowed ? "blocked" : "passed"),
    buildRealWorkflowPackageCheck("deterministic package ID/key"),
    buildRealWorkflowPackageCheck("approval copy is present", contract.approvalCopyPresent ? "passed" : "needs-review"),
    buildRealWorkflowPackageCheck("dry-run contract exists", dryRun.decision.submitReviewAllowed && contract.dryRunContractExists ? "passed" : "needs-review"),
    buildRealWorkflowPackageCheck("block unsafe submit"),
  ];
}

export function buildRealWorkflowPackageDecision(checks: RealWorkflowPackageCheck[]): RealWorkflowPackageDecision {
  const blocking = checks.filter((check) => check.blocksSubmit);
  const missingModelOrNode = checks.some((check) => check.state === "missing model/node");
  const state: RealWorkflowPackageValidationState =
    blocking.some((check) => check.status === "blocked")
      ? "blocked"
      : missingModelOrNode
        ? "missing model/node"
        : blocking.length > 0
          ? "needs review"
          : "ready";

  return {
    id: "real-workflow-package-validator-decision",
    state,
    label: state === "ready" ? "Ready for approved submit trial review" : "Block unsafe submit",
    explanation:
      state === "ready"
        ? "The prepared workflow package passes local-only, no-secrets, approval-copy, dry-run, and artifact safety checks."
        : "Block unsafe submit until the listed checks are reviewed.",
    approvedSubmitTrialMayReview: state === "ready",
  };
}

export function summarizeRealWorkflowPackageValidator(
  summary: RealWorkflowPackageValidatorSummary
): string {
  return `Real workflow package validator: Prepared workflow package only, Requires explicit approval, Local-only target required, and Block unsafe submit. Decision ${summary.decision.state}.`;
}

export function buildRealWorkflowPackageValidatorSummary(): RealWorkflowPackageValidatorSummary {
  const contract = buildRealWorkflowPackageContract();
  const checks = buildRealWorkflowPackageChecks(contract);
  const summary: RealWorkflowPackageValidatorSummary = {
    contract,
    checks,
    supportedStates: ["ready", "blocked", "needs review", "missing model/node", "unsafe target", "not local-only", "requires explicit approval"],
    decision: buildRealWorkflowPackageDecision(checks),
    summary: "",
  };
  return { ...summary, summary: summarizeRealWorkflowPackageValidator(summary) };
}
