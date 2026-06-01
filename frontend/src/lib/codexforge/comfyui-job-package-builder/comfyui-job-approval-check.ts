import type { ComfyUiJobApprovalCheck } from "./comfyui-job-package-types";

export function buildComfyUiJobApprovalCheck(input: Partial<ComfyUiJobApprovalCheck> = {}): ComfyUiJobApprovalCheck {
  return {
    id: input.id ?? "comfyui-job-approval-check-prompt",
    label: input.label ?? "prompt ready",
    passed: input.passed ?? true,
    plainEnglish: input.plainEnglish ?? "This part is ready for a reviewed package, but it still cannot auto-run.",
  };
}
