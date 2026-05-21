import { buildApplyValidationStableId, buildApplyValidationStableKey, type ApplyValidationResultStatus, type ValidationOutputReview, type ValidationOutputReviewItem } from "./apply-validation-hardening-types";

const OUTPUT_CAP = 1600;

function statusFromOutput(output: string, exitCode?: number | null): ApplyValidationResultStatus {
  if (typeof exitCode === "number") return exitCode === 0 ? "pass" : "fail";
  if (!output.trim()) return "unknown";
  return /(error|failed|failure|exception|exit code 1)/i.test(output) ? "fail" : "pass";
}

export function buildValidationOutputReviewItem(args: { command: string; output?: string | null; exitCode?: number | null }): ValidationOutputReviewItem {
  const supplied = String(args.output ?? "");
  const truncated = supplied.length > OUTPUT_CAP;
  const excerpt = supplied.slice(0, OUTPUT_CAP);
  const status = statusFromOutput(excerpt, args.exitCode);
  const lowerCommand = args.command.toLowerCase();
  const recommendedRoute = status === "fail"
    ? lowerCommand.includes("build")
      ? "/closed-loop"
      : lowerCommand.includes("smoke")
        ? "/closed-loop"
        : "/apply-validation"
    : status === "pass"
      ? "/apply-validation"
      : "/validation";
  return {
    id: buildApplyValidationStableKey("validation-output-review-item", args.command, String(args.exitCode ?? "unknown")),
    command: args.command,
    suppliedOutputExcerpt: excerpt,
    exitCode: typeof args.exitCode === "number" ? args.exitCode : null,
    status,
    detectedErrorSummary: /(error|failed|failure|exception)/i.test(excerpt) ? "Potential error text detected in supplied output." : "No supplied error text detected.",
    detectedWarningSummary: /warning/i.test(excerpt) ? "Warning text detected in supplied output." : "No supplied warning text detected.",
    truncated,
    recommendedRoute,
    nextAction: status === "fail" ? "Route to Closed Loop with the captured output." : status === "pass" ? "Continue to completion guidance." : "Paste or capture validation output before deciding.",
  };
}

export function buildValidationOutputReview(args: { requestId?: string | null; items?: readonly ValidationOutputReviewItem[] | null } = {}): ValidationOutputReview {
  const items = [...(args.items ?? [])];
  const status: ApplyValidationResultStatus = items.length < 1 ? "unknown" : items.some((item) => item.status === "fail") ? "fail" : items.every((item) => item.status === "pass") ? "pass" : "unknown";
  const review: ValidationOutputReview = {
    id: buildApplyValidationStableId("validation-output-review", args.requestId ?? "manual", String(items.length), status),
    items,
    status,
    outputIsSuppliedManual: true,
    doesNotFabricateOutput: true,
    summary: [],
  };
  return { ...review, summary: summarizeValidationOutputReview(review) };
}

export function summarizeValidationOutputReview(review: ValidationOutputReview): string[] {
  return [
    `Output review status is ${review.status}.`,
    `${review.items.length} supplied/manual output item(s) reviewed.`,
    "Output review does not fabricate output and caps excerpts for display.",
  ];
}
