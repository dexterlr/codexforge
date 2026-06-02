import type {
  CloudFinalRenderCostReview,
  CloudFinalRenderJustification,
  CloudFinalRenderPrivacyReview,
  CloudFinalRenderReadiness,
  CloudFinalRenderReadinessStatus,
  CloudFinalRenderRequest,
} from "./cloud-final-render-types";

function selectCloudFinalRenderReadinessStatus(
  request: CloudFinalRenderRequest,
  justification: CloudFinalRenderJustification,
  costReview: CloudFinalRenderCostReview,
  privacyReview: CloudFinalRenderPrivacyReview
): CloudFinalRenderReadinessStatus {
  if (privacyReview.risk === "blocked") return "blocked-needs-privacy-review";
  if (costReview.risk === "high") return "blocked-needs-budget-review";
  if (!request.providerOption || request.providerOption === "unknown") return "blocked-no-provider";
  if (!justification.justifiedForReview) return "blocked-policy";
  if (privacyReview.risk === "needs-review") return "cloud-review-needed";
  return "ready-for-manual-cloud-handoff";
}

export function buildCloudFinalRenderReadiness(
  request: CloudFinalRenderRequest,
  justification: CloudFinalRenderJustification,
  costReview: CloudFinalRenderCostReview,
  privacyReview: CloudFinalRenderPrivacyReview,
  input: Partial<CloudFinalRenderReadiness> = {}
): CloudFinalRenderReadiness {
  const status = input.status ?? selectCloudFinalRenderReadinessStatus(request, justification, costReview, privacyReview);
  const blockers =
    input.blockers ??
    [
      ...(privacyReview.risk === "needs-review" ? ["privacy review still needed"] : []),
      ...(costReview.risk === "credit-based" ? ["budget and retry limit still need operator approval"] : []),
    ];

  return {
    id: input.id ?? "cloud-final-render-readiness",
    status,
    plainEnglish:
      input.plainEnglish ??
      "Local-first remains recommended until privacy, budget, provider choice, and manual approval are reviewed.",
    blockers,
    nextStep:
      input.nextStep ??
      (status === "ready-for-manual-cloud-handoff"
        ? "Copy a manual handoff only after approval."
        : "Review local-vs-cloud reasoning, privacy, and budget before any future cloud step."),
  };
}
