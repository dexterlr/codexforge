import type { DryRunContract } from "./comfyui-dry-run-types";

export function buildDryRunContract(input: Partial<DryRunContract> = {}): DryRunContract {
  return {
    id: input.id ?? "comfyui-workflow-dry-run-contract",
    label: input.label ?? "ComfyUI workflow dry run contract",
    scope: input.scope ?? [
      "verify package completeness",
      "verify safety checks",
      "verify parameters",
      "verify artifact plan",
      "verify queue plan",
      "verify approval posture",
    ],
    dryRunMeans: input.dryRunMeans ?? [
      "review and simulation",
      "no final render",
      "no ComfyUI workflow run",
      "no prompt sent",
      "no queue submit",
    ],
    runningComfyUiAllowed: false,
  };
}

export function buildDefaultDryRunContract(): DryRunContract {
  return buildDryRunContract();
}
