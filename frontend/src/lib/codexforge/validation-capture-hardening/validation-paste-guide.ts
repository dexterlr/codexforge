import { buildValidationCaptureHardeningItem } from "./validation-capture-hardening-types";
import type { ValidationCaptureHardeningItem } from "./validation-capture-hardening-types";

export function buildValidationPasteGuide(): ValidationCaptureHardeningItem {
  return buildValidationCaptureHardeningItem("validation-paste-guide", "Harden validation capture", "Paste validation output to review it; copy commands only; passed / failed / unknown; failures route to /closed-loop; pass routes to /workflow-results and /run-history; no fake pass; no auto-run; preserve latest-message authority");
}
