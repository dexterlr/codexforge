export type RealWorkflowPackageValidationState =
  | "ready"
  | "blocked"
  | "needs review"
  | "missing model/node"
  | "unsafe target"
  | "not local-only"
  | "requires explicit approval";

export type RealWorkflowPackageCheckId =
  | "prepared workflow package only"
  | "allowed local endpoint"
  | "no cloud provider destination"
  | "no secrets"
  | "no arbitrary file browsing"
  | "no destructive artifact behavior"
  | "deterministic package ID/key"
  | "approval copy is present"
  | "dry-run contract exists"
  | "block unsafe submit";

export type RealWorkflowPackageCheckStatus = "passed" | "needs-review" | "blocked";

export type RealWorkflowPackageContract = {
  id: "real-workflow-package-validator-contract";
  packageId: "comfyui-local-workflow-package-001";
  packageKey: "workflow-package:comfyui-local-workflow-package-001";
  targetLabel: "Local-only target required";
  targetEndpoint: "http://127.0.0.1:8188";
  preparedWorkflowPackageOnly: true;
  arbitraryFileBrowsingAllowed: false;
  cloudProviderDestinationAllowed: false;
  secretsIncluded: false;
  destructiveArtifactBehaviorAllowed: false;
  approvalCopyPresent: true;
  dryRunContractExists: true;
};

export type RealWorkflowPackageCheck = {
  id: RealWorkflowPackageCheckId;
  status: RealWorkflowPackageCheckStatus;
  state: RealWorkflowPackageValidationState;
  label: string;
  plainEnglish: string;
  blocksSubmit: boolean;
};

export type RealWorkflowPackageDecision = {
  id: "real-workflow-package-validator-decision";
  state: RealWorkflowPackageValidationState;
  label: string;
  explanation: string;
  approvedSubmitTrialMayReview: boolean;
};

export type RealWorkflowPackageValidatorSummary = {
  contract: RealWorkflowPackageContract;
  checks: RealWorkflowPackageCheck[];
  supportedStates: RealWorkflowPackageValidationState[];
  decision: RealWorkflowPackageDecision;
  summary: string;
};

export function buildRealWorkflowPackageValidatorStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
