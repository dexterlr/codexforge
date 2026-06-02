import type { UpscaleSafetyReview } from "./local-upscale-workflow-types";

export function buildUpscaleSafetyReview(input: Partial<UpscaleSafetyReview> = {}): UpscaleSafetyReview {
  return {
    id: input.id ?? "upscale-safety-review",
    localFirst: input.localFirst ?? true,
    approvalRequired: input.approvalRequired ?? true,
    noAutoRunGuarantee: input.noAutoRunGuarantee ?? true,
    blockedUntilApprovedExecution: input.blockedUntilApprovedExecution ?? true,
    safeSettings:
      input.safeSettings ??
      [
        "source draft reviewed",
        "target resolution chosen",
        "artifact destination planned",
        "future approved execution required",
        "no-auto-run guarantee",
      ],
  };
}
