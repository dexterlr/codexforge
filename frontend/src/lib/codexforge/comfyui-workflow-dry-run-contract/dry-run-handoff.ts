import type { DryRunDecision, DryRunHandoff } from "./comfyui-dry-run-types";

export function buildDryRunHandoff(decision: DryRunDecision): DryRunHandoff {
  return {
    id: "dry-run-handoff",
    copyLabel: "Copy dry run report allowed",
    nextStep:
      decision.submitReviewAllowed
        ? "Review the ComfyUI submit boundary next. Submit still requires explicit approval and a future guarded executor."
        : "Resolve the missing dry run checks before preparing a submit boundary.",
    safetyNote: "Dry run means review and simulation, not final render. It does not submit workflows, mutate queues, or generate media.",
  };
}
