import type { ValidationCaptureHardeningItem } from "./validation-capture-hardening-types";

export function selectValidationNextRoute(input?: Partial<ValidationCaptureHardeningItem>): string {
  if (input?.status === "failed") return "/closed-loop";
  if (input?.status === "passed") return "/workflow-results";
  return "Copy the handoff and continue manually.";
}
