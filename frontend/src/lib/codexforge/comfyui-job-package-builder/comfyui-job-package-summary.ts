import type { ComfyUiJobPackageSummary } from "./comfyui-job-package-types";
import { buildDefaultComfyUiJobPackage } from "./comfyui-job-package";
import { buildComfyUiJobPackageHandoff } from "./comfyui-job-package-handoff";

export function buildComfyUiJobPackageSummary(): ComfyUiJobPackageSummary {
  const jobPackage = buildDefaultComfyUiJobPackage();
  const handoff = buildComfyUiJobPackageHandoff();

  return {
    jobPackage,
    handoff,
    summary: summarizeComfyUiJobPackage({ jobPackage, handoff, summary: "" }),
  };
}

export function summarizeComfyUiJobPackage(summary: ComfyUiJobPackageSummary): string {
  return `${summary.jobPackage.inputs.length} inputs, ${summary.jobPackage.approvalChecks.length} readiness checks, future submit blocked until approval.`;
}
