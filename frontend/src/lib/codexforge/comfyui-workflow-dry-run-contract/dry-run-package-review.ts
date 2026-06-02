import type { DryRunCheck, DryRunPackageReview } from "./comfyui-dry-run-types";

export function buildDryRunPackageReview(checks: DryRunCheck[]): DryRunPackageReview {
  return {
    id: "dry-run-package-review",
    complete: checks.some((check) => check.id === "package built" && check.status === "passed"),
    checks: ["job inputs present", "parameter set present", "artifact plan present", "approval checks present", "future submit still blocked"],
    plainEnglish: "Package review asks whether the packet is complete enough to discuss. It does not submit the packet.",
  };
}
