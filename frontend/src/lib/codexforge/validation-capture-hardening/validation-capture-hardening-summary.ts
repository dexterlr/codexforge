import { buildValidationCaptureHardeningItem } from "./validation-capture-hardening-types";
import type { ValidationCaptureHardeningItem, ValidationCaptureHardeningSummary } from "./validation-capture-hardening-types";

export function buildValidationHandoffHardening(): ValidationCaptureHardeningItem {
  return buildValidationCaptureHardeningItem("validation-capture-hardening-summary", "Harden validation capture", "Paste validation output to review it; copy commands only; passed / failed / unknown; failures route to /closed-loop; pass routes to /workflow-results and /run-history; no fake pass; no auto-run; preserve latest-message authority");
}

export function buildValidationCopyGuidance(): import("./validation-capture-hardening-types").ValidationCaptureHardeningItem {
  return buildValidationCaptureHardeningItem("buildValidationCopyGuidance", "Harden validation capture", "Paste validation output to review it; copy commands only; passed / failed / unknown; failures route to /closed-loop; pass routes to /workflow-results and /run-history; no fake pass; no auto-run; preserve latest-message authority");
}

export function buildValidationCaptureHardeningSummary(): ValidationCaptureHardeningSummary {
  return {
    title: "Harden validation capture",
    status: "review",
    primaryAction: "Review validation handoff",
    nextRoute: "/validation-results/hardening",
    items: [buildValidationCaptureHardeningItem("summary-01", "Harden validation capture", "Paste validation output to review it; copy commands only; passed / failed / unknown; failures route to /closed-loop; pass routes to /workflow-results and /run-history; no fake pass; no auto-run; preserve latest-message authority")]
  };
}
