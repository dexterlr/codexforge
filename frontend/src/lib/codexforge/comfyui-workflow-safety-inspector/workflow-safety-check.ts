import type { WorkflowSafetyCheck } from "./comfyui-workflow-safety-types";

export function buildWorkflowSafetyCheck(input: Partial<WorkflowSafetyCheck> = {}): WorkflowSafetyCheck {
  return {
    id: input.id ?? "workflow-safety-check-unknown-nodes",
    label: input.label ?? "Unknown custom nodes",
    plainEnglish: input.plainEnglish ?? "Custom nodes should be named and reviewed before a future render is allowed.",
    status: input.status ?? "needs-review",
  };
}

export function buildDefaultWorkflowSafetyChecks(): WorkflowSafetyCheck[] {
  return [
    ["unknown custom nodes", "Custom nodes need a name and purpose before the workflow moves forward."],
    ["missing models", "Missing model files must be confirmed locally."],
    ["missing assets", "Input images, LoRAs, and style files should be listed before use."],
    ["risky output path", "Output locations should point to the planned artifact workspace."],
    ["large resolution", "Very large frames can be slow or run out of memory."],
    ["long duration", "Long drafts should be shortened for a first safe test."],
    ["high frame count", "Frame count affects render time and local machine load."],
    ["huge batch count", "Batch count should stay small for first review."],
    ["cloud URL references", "Cloud links need review before they are trusted."],
    ["external download references", "Downloads are blocked in this preview foundation."],
    ["unsupported node types", "Unknown node types must be handled before parameter mapping."],
    ["expected VRAM/time posture", "The workflow should explain likely local cost before submission."],
    ["artifact destination planned", "A future output needs a clear review destination."],
    ["approval required", "A human approval step is still required before any execution path."],
  ].map(([label, plainEnglish], index) =>
    buildWorkflowSafetyCheck({
      id: `workflow-safety-check-${index + 1}`,
      label,
      plainEnglish,
      status: label === "approval required" ? "safe-preview-only" : "needs-review",
    })
  );
}
