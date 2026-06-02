import type {
  CloudFinalRenderJustification,
  CloudFinalRenderJustificationCheck,
  CloudFinalRenderJustificationCheckId,
  CloudFinalRenderRequest,
} from "./cloud-final-render-types";

const REQUIRED_CHECKS: CloudFinalRenderJustificationCheckId[] = [
  "local draft reviewed",
  "local final attempt considered",
  "cloud capability needed",
  "budget/credit risk understood",
  "privacy reviewed",
  "prompt/assets reviewed",
  "manual approval required",
  "no-auto-submit guarantee",
];

export function buildCloudFinalRenderJustification(
  request: CloudFinalRenderRequest,
  input: Partial<CloudFinalRenderJustification> = {}
): CloudFinalRenderJustification {
  const checks =
    input.checks ??
    REQUIRED_CHECKS.map((check) =>
      buildCloudFinalRenderJustificationCheck(check, {
        status:
          check === "privacy reviewed" || check === "budget/credit risk understood" || check === "cloud capability needed"
            ? "warn"
            : "pass",
      })
    );
  const justifiedForReview = input.justifiedForReview ?? checks.every((check) => check.status !== "block");

  return {
    id: input.id ?? `${request.id}-justification`,
    checks,
    justifiedForReview,
    plainEnglish:
      input.plainEnglish ??
      "Cloud final render review asks whether cloud quality is worth the possible credit cost before anything is sent.",
  };
}

export function buildCloudFinalRenderJustificationCheck(
  check: CloudFinalRenderJustificationCheckId,
  input: Partial<CloudFinalRenderJustificationCheck> = {}
): CloudFinalRenderJustificationCheck {
  return {
    id: input.id ?? `cloud-final-render-check-${check.replace(/[^a-z0-9]+/g, "-")}`,
    check: input.check ?? check,
    status: input.status ?? "warn",
    plainEnglish:
      input.plainEnglish ??
      `${check} must be understood before a future manual cloud render handoff is approved.`,
  };
}
